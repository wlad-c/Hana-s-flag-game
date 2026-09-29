#!/usr/bin/env node
/**
 * Every capital the quiz asks about must be the capital the Learn panel shows.
 *
 *   node scripts/check-capital-name-agreement.mjs          # the gate
 *   node scripts/check-capital-name-agreement.mjs --all    # also report every
 *                                                          # capital card that disagrees
 *
 * A capital-flag question (getPlayableCapitalSubdivisions in
 * src/lib/playableSubdivisions.ts) names the capital from CAPITAL_DETAILS — the
 * Wikidata capital (P36) whose flag it shows. The Learn panel names the capital
 * from the map data (src/data/cities.ts, else the Wikidata fallback in
 * src/data/subdivisionCapitals.ts), and shows the population and flag only when
 * the two names agree (sameCity in src/lib/capitalInfo.ts). When they disagree,
 * one of them is wrong — or the flag belongs to another city.
 *
 * This shipped: 81 of 1,255 quiz capitals disagreed (2026-09 audit, batch 7).
 * Iran's map carried pre-2018 codes, so the quiz asked Tehran as Hormozgan's
 * capital; Bali asked "Singaraja" beside Denpasar's flag; Central Kalimantan
 * asked "Pahandut" beside Banjarmasin's flag, a city in another province.
 *
 * Fix a failure at its source — see "Map capital is a different city" and
 * "Wrong capital" in docs/SUBNATIONAL_FLAG_AUDIT_HANDBOOK.md — never here. It
 * fails too if the app's name check or its quiz rule change without this file.
 *
 * Reads the generated files as text, so it needs no build step or .ts loader.
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => readFileSync(join(root, rel), "utf8");
const all = process.argv.includes("--all");
const failures = [];

// The rule this gate mirrors — fail loudly if the app's version moves.
const capitalInfo = read("src/lib/capitalInfo.ts");
for (const needle of [
  'replace(/[̀-ͯ]/g, "")',
  'replace(/[^a-z0-9]+/g, "")',
  "a === b || a.startsWith(b) || b.startsWith(a)",
]) {
  if (!capitalInfo.includes(needle)) failures.push(`src/lib/capitalInfo.ts no longer contains \`${needle}\`: update this gate with sameCity()`);
}
const playable = read("src/lib/playableSubdivisions.ts");
for (const needle of [
  "d.code in DISPUTED_TERRITORY_HIERARCHY",
  "capitalFlagDuplicatesSubdivision(d.code)",
  "!CAPITAL_FLAGS[d.code] || !CAPITAL_DETAILS[d.code]?.name",
  "return CAPITAL_DETAILS[code]?.name",
]) {
  if (!playable.includes(needle)) failures.push(`src/lib/playableSubdivisions.ts no longer contains \`${needle}\`: update this gate with the quiz rule`);
}
if (!capitalInfo.includes("CITY_TERRITORY_CODES.has(code) || SHARED_CAPITAL_FLAGS.has(code)")) {
  failures.push("capitalFlagDuplicatesSubdivision() changed: update this gate");
}

const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "");
function sameCity(detailName, displayedName) {
  const a = norm(detailName);
  const b = norm(displayedName);
  if (!a || !b) return false;
  return a === b || a.startsWith(b) || b.startsWith(a);
}

function codeSet(rel, exportName, close = "]);") {
  const src = read(rel);
  const start = src.indexOf(exportName);
  if (start < 0) throw new Error(`${exportName} not found in ${rel}`);
  return new Set([...src.slice(start, src.indexOf(close, start)).matchAll(/"([A-Z0-9~_-]+)"/g)].map((x) => x[1]));
}
const hierarchySrc = read("src/lib/disputedSubdivisions.ts");
const hStart = hierarchySrc.indexOf("export const DISPUTED_TERRITORY_HIERARCHY");
const hierarchyChildren = new Set(
  [...hierarchySrc.slice(hStart, hierarchySrc.indexOf("};", hStart)).matchAll(/^\s*"([^"]+)":\s*"[^"]+",/gm)].map((x) => x[1]),
);
const cityTerritories = codeSet("src/data/cityTerritories.ts", "CITY_TERRITORY_CODES");
const shared = codeSet("src/data/sharedCapitalFlags.ts", "SHARED_CAPITAL_FLAGS");
const capitalFlags = new Set([...read("src/data/capitalFlags.ts").matchAll(/"([A-Z0-9~_-]+)":\s*"capital-flags\//g)].map((m) => m[1]));
const details = new Map([...read("src/data/capitalDetails.ts").matchAll(/^ {2}"([A-Z0-9~_-]+)": \{"name":"([^"]+)"/gm)].map((m) => [m[1], m[2]]));
const shown = new Map([...read("src/data/cities.ts").matchAll(/^ {2}"([A-Z0-9~_-]+)": \{"capital":\{"name":"([^"]+)"/gm)].map((m) => [m[1], m[2]]));
for (const m of read("src/data/subdivisionCapitals.ts").matchAll(/^ {2}"([A-Z0-9~_-]+)": \{"name":"([^"]+)"/gm)) {
  if (!shown.has(m[1])) shown.set(m[1], m[2]);
}
const divisions = [...new Set([...read("src/lib/subdivisionMeta.ts").matchAll(/\{ code: "([^"]+)", name: "[^"]+"/g)].map((m) => m[1]))];

let asked = 0;
const cardMismatches = [];
for (const code of divisions) {
  const name = details.get(code);
  if (!name) continue;
  const quizzed =
    !hierarchyChildren.has(code) && !cityTerritories.has(code) && !shared.has(code) && capitalFlags.has(code);
  const panel = shown.get(code);
  const agrees = !!panel && sameCity(name, panel);
  if (quizzed) {
    asked++;
    if (!agrees) {
      failures.push(
        `${code}: the quiz asks "${name}", but the Learn panel shows ${panel ? `"${panel}"` : "no capital"}`,
      );
    }
  } else if (all && panel && !agrees) {
    cardMismatches.push(`${code}: capital card "${panel}", Wikidata capital "${name}"`);
  }
}

if (all) {
  console.log(`Capital cards (not quizzed) whose Wikidata capital differs: ${cardMismatches.length}`);
  for (const l of cardMismatches) console.log(`  ${l}`);
}
if (failures.length) {
  console.error(`✗ Capital-name agreement: ${failures.length} problem(s)`);
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}
console.log(`✓ Capital-name agreement: all ${asked} quiz capitals are the capital the Learn panel shows.`);
