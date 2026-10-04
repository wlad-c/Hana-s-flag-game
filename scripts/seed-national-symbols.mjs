// Seed the "National symbols" manifest with the BASELINE every country owes:
// its current national flag, in the official section (badged as the flag in force).
// The current flag is NOT seeded into the historical section — that section holds
// only older, superseded flags.
//
//   node scripts/seed-national-symbols.mjs           → add what is missing
//   node scripts/seed-national-symbols.mjs --dry-run → report only
//
// WHY THIS IS SAFE TO GENERATE, when nothing else in this manifest is
// ---------------------------------------------------------------------------
// Every field it writes is copied from data this repo already sources:
//
//   • the flag IMAGE is the country's own bundled public/flags/{cc}.svg — the same
//     file the fact-sheet shows, downloaded by scripts/download-flags.mjs from an
//     authoritative source;
//   • the ADOPTION YEAR comes from src/data/flagAdoptionYears.ts, which is generated
//     from Wikidata (flag P163 → inception P571) with cited overrides, and is already
//     trusted to gate every historical era map;
//   • the NAME comes from UN_MEMBERS in src/lib/countrySelection.ts;
//   • the SOURCE url is verified to exist against the Wikipedia API before it is
//     written, so no entry can cite a dead page.
//
// It writes NO visual description and NO symbolism: the `design` line states only
// what is certainly true (this is the flag the country flies, adopted in a sourced
// year), and `meaning` is left absent for a human to source. Depth beyond this
// baseline — historical flags, military and maritime flags, standards, arms and
// passports — is added per country by hand, exactly as the first thirteen were.
//
// A country already present in the manifest is left completely alone.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const R = (p) => resolve(__dirname, p);
const MANIFEST = R("data/national-flag-sources.json");
const UA = "HanaFlagGame/1.0 (national-symbols baseline; https://github.com/wlad-c/hana-s-flag-game)";
const dryRun = process.argv.includes("--dry-run");

// countrySelection.ts pulls in the app's runtime modules, which Node cannot resolve
// (extensionless imports), so the UN member list is read as text — the same way the
// CI-coverage check parses the workflow YAML.
const UN_MEMBERS = [
  ...readFileSync(R("../src/lib/countrySelection.ts"), "utf8")
    .split("export const ALL_COUNTRY_OPTIONS")[0]
    .matchAll(/\{\s*code:\s*"([A-Z]{2})",\s*name:\s*"([^"]+)"\s*\}/g),
].map((m) => ({ code: m[1], name: m[2] }));
const { FLAG_ADOPTION_YEAR } = await import("../src/data/flagAdoptionYears.ts");

const manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));

/** Ask Wikipedia which of these titles exist, 50 at a time. */
async function existingTitles(titles) {
  const found = new Set();
  for (let i = 0; i < titles.length; i += 50) {
    const batch = titles.slice(i, i + 50);
    const url =
      "https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&redirects=1&titles=" +
      encodeURIComponent(batch.join("|"));
    let json = null;
    for (let attempt = 0; attempt < 4; attempt++) {
      const res = await fetch(url, { headers: { "User-Agent": UA } });
      if (res.status === 429 || res.status === 503) {
        await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
        continue;
      }
      if (!res.ok) break;
      json = await res.json();
      break;
    }
    // A batch we could not check contributes nothing — the caller then falls back
    // to the country article, which always exists.
    for (const p of json?.query?.pages ?? []) if (!p.missing) found.add(p.title);
    for (const n of json?.query?.normalized ?? []) {
      if (found.has(n.to)) found.add(n.from);
    }
    for (const r of json?.query?.redirects ?? []) {
      if (found.has(r.to)) found.add(r.from);
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  return found;
}

const missing = UN_MEMBERS.filter((c) => !manifest.countries[c.code]);
const flagTitles = missing.map((c) => `Flag of ${c.name}`);
const live = await existingTitles(flagTitles);

let added = 0;
const noYear = [];
const noFile = [];

for (const { code, name } of missing) {
  const cc = code.toUpperCase();
  const lower = cc.toLowerCase();
  const file = ["svg", "png"].map((ext) => `flags/${lower}.${ext}`).find((p) => existsSync(R(`../public/${p}`)));
  if (!file) {
    noFile.push(cc);
    continue;
  }
  const year = FLAG_ADOPTION_YEAR[cc];
  const source = live.has(`Flag of ${name}`)
    ? `https://en.wikipedia.org/wiki/Flag_of_${encodeURIComponent(name.replace(/ /g, "_"))}`
    : `https://en.wikipedia.org/wiki/${encodeURIComponent(name.replace(/ /g, "_"))}`;

  const base = {
    name: `Flag of ${name}`,
    reuse: file,
    design: year
      ? `The national flag of ${name}, in the form adopted in ${year}.`
      : `The national flag of ${name}.`,
    source,
  };

  // The baseline is the OFFICIAL section only — the flag the country flies. The
  // historical section holds only OLDER, superseded flags (owner request), so the
  // current flag is never seeded there; a country with no sourced past flag simply
  // has no historical section until one is added by hand.
  const flags = [{ id: `${lower}-official-national`, category: "official", ...(year ? { from: year, to: 9999 } : {}), ...base }];
  if (!year) noYear.push(cc);

  manifest.countries[cc] = { flags };
  added++;
}

// Keep the file ordered by country code so diffs stay readable.
manifest.countries = Object.fromEntries(
  Object.entries(manifest.countries).sort(([a], [b]) => a.localeCompare(b)),
);

if (!dryRun && added > 0) {
  writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
}

console.log(`${dryRun ? "[dry run] " : ""}${added} country baseline(s) added.`);
if (noYear.length) console.log(`  official entry only (no sourced adoption year): ${noYear.join(", ")}`);
if (noFile.length) console.log(`  SKIPPED, no bundled flag file: ${noFile.join(", ")}`);
console.log(`manifest now covers ${Object.keys(manifest.countries).length} countries.`);
