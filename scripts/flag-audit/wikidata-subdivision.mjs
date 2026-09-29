#!/usr/bin/env node
/**
 * The entity check: what the app shows for a subdivision next to what Wikidata
 * says about the item carrying its ISO 3166-2 code.
 *
 *   node scripts/flag-audit/wikidata-subdivision.mjs IT-TR IT-UD SY-DI
 *
 * For each app code it prints the app's name, its capital and the flag files it
 * bundles, then every Wikidata item whose P300 is that code (or a code that
 * scripts/data/wikidata-subdivision-code-aliases.mjs maps onto it): its label,
 * its current P41 flag files with rank, and its P36 capitals with each
 * capital's own P41.
 *
 * Read the result as evidence, not an answer. The 2026-09 audit found P36 with
 * two values (North Sulawesi), P36 naming the wrong place (Schellenberg →
 * Vaduz), P41 on a city item pointing at the NATIONAL flag (Porto), ISO codes
 * that moved (Iran, Morocco, Latvia) and an app name that belongs to a
 * different item (Posavina carrying Republika Srpska's code). A name that does
 * not match the app's is the first thing to chase.
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { CODE_ALIASES } from "../data/wikidata-subdivision-code-aliases.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const read = (rel) => readFileSync(join(root, rel), "utf8");
const codes = process.argv.slice(2);
if (!codes.length) {
  console.error("usage: node scripts/flag-audit/wikidata-subdivision.mjs CODE [CODE…]");
  process.exit(1);
}

const meta = read("src/lib/subdivisionMeta.ts");
const appName = (c) => meta.match(new RegExp(`code: "${c}", name: "([^"]+)", typeLabel: "([^"]+)"`))?.slice(1).join(" — ") ?? "(not in SUBDIVISION_META)";
const capital = (c) => read("src/data/capitalDetails.ts").match(new RegExp(`"${c}": \\{"name":"([^"]+)"`))?.[1] ?? "(none)";
const capFlag = (c) => read("src/data/capitalFlags.ts").match(new RegExp(`"${c}": "(capital-flags/[^"]+)"`))?.[1] ?? "(none)";
const index = read("src/lib/subdivisionFlagIndex.ts");
const divFlag = (c) => (index.includes(`"${c}"`) ? `public/flags/sub/${c.split("-")[0]}/${c}.*` : "(not bundled)");

const wdCodes = new Map(); // wikidata code -> app code
for (const c of codes) wdCodes.set(c, c);
for (const [wd, app] of Object.entries(CODE_ALIASES)) if (codes.includes(app)) wdCodes.set(wd, app);

const query = `SELECT ?code ?item ?itemLabel ?flag ?rank ?cap ?capLabel ?capFlag WHERE {
  VALUES ?code { ${[...wdCodes.keys()].map((c) => JSON.stringify(c)).join(" ")} }
  ?item wdt:P300 ?code .
  OPTIONAL { ?item p:P41 ?fs . ?fs ps:P41 ?flag ; wikibase:rank ?rank . FILTER NOT EXISTS { ?fs pq:P582 [] } }
  OPTIONAL { ?item wdt:P36 ?cap . OPTIONAL { ?cap wdt:P41 ?capFlag } }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en,mul". }
}`;
const res = await fetch(`https://query.wikidata.org/sparql?query=${encodeURIComponent(query)}`, {
  headers: { accept: "application/sparql-results+json", "user-agent": "HanaFlagGameAudit/1.0 (https://github.com/wladimirchagas/Hana-s-flag-game)" },
});
if (!res.ok) {
  console.error(`Wikidata answered ${res.status}`);
  process.exit(2);
}
const rows = (await res.json()).results.bindings;
const file = (u) => (u ? decodeURIComponent(u.split("/").pop()) : "");
for (const c of codes) {
  console.log(`\n${c}  app: ${appName(c)} | capital ${capital(c)} | flag ${divFlag(c)} | capital flag ${capFlag(c)}`);
  const mine = rows.filter((r) => wdCodes.get(r.code.value) === c);
  if (!mine.length) console.log("  Wikidata: no item carries this code (check the aliases and the ISO 3166-2 history)");
  const items = [...new Set(mine.map((r) => r.item.value))];
  for (const it of items) {
    const rs = mine.filter((r) => r.item.value === it);
    console.log(`  ${it.split("/").pop()} "${rs[0].itemLabel.value}" (P300 ${rs[0].code.value})`);
    const flags = [...new Set(rs.filter((r) => r.flag).map((r) => `${file(r.flag.value)} [${r.rank.value.split("#").pop()}]`))];
    console.log(`    P41: ${flags.join(" | ") || "-"}`);
    const caps = [...new Set(rs.filter((r) => r.cap).map((r) => `${r.capLabel.value} (${r.cap.value.split("/").pop()})${r.capFlag ? ` flag ${file(r.capFlag.value)}` : ""}`))];
    console.log(`    P36: ${caps.join(" | ") || "-"}`);
  }
}
