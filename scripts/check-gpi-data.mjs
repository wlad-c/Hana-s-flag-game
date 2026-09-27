#!/usr/bin/env node
/**
 * Validate bundled Global Peace Index 2026 data against the committed
 * extract (scripts/data/gpi2026Data.mjs / gpi-2026.csv).
 *
 * Fails on: wrong rank/score/rankChange, wrong State of Peace band, drift
 * between democracyData.mjs and countryFacts.ts, fabricating entries for
 * codes absent from the official GPI, or UI wiring dropping the index.
 *
 * Run: node scripts/check-gpi-data.mjs
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DEMOCRACY_DATA } from "./data/democracyData.mjs";
import { GPI_2026_DATA } from "./data/gpi2026Data.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CSV = resolve(__dirname, "data/gpi-2026.csv");
const FACTS_TS = resolve(__dirname, "../src/data/countryFacts.ts");

/** IEP 2026 State of Peace map-band cutoffs (score ≤ upper bound). */
function band(score) {
  if (score <= 1.435) return "Very High";
  if (score <= 1.903) return "High";
  if (score <= 2.333) return "Medium";
  if (score <= 2.882) return "Low";
  return "Very Low";
}

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const cols = line.split(",");
    const row = {};
    headers.forEach((h, i) => {
      row[h] = cols[i];
    });
    return row;
  });
}

/** Pull `democracy.gpi` out of the generated countryFacts.ts without importing TS. */
function loadFactsGpi(src) {
  /** @type {Map<string, object>} */
  const out = new Map();
  const lineRe = /^  ([A-Z]{2}): (\{.*\}),$/gm;
  let m;
  while ((m = lineRe.exec(src))) {
    const code = m[1];
    const obj = JSON.parse(m[2]);
    const gpi = obj.democracy?.gpi;
    if (gpi) out.set(code, gpi);
  }
  return out;
}

const csvRows = parseCsv(readFileSync(CSV, "utf8"));
if (csvRows.length !== 160) {
  console.error(`Expected 160 GPI CSV rows, got ${csvRows.length}`);
  process.exit(1);
}

const expected = new Map();
for (const r of csvRows) {
  const code = r.iso.trim().toUpperCase();
  const score = Number(r.score);
  const entry = {
    year: Number(r.year),
    rating: r.rating,
    rank: Number(r.rank),
    rankChange: Number(r.rankChange),
    score,
  };
  if (band(score) !== entry.rating) {
    console.error(`${code}: CSV rating ${entry.rating} ≠ band(${score})=${band(score)}`);
    process.exit(1);
  }
  expected.set(code, entry);
}

const extractKeys = Object.keys(GPI_2026_DATA);
if (extractKeys.length !== 160) {
  console.error(`Expected 160 GPI extract entries, got ${extractKeys.length}`);
  process.exit(1);
}

const factsGpi = loadFactsGpi(readFileSync(FACTS_TS, "utf8"));
const errors = [];

for (const [code, exp] of expected) {
  const extract = GPI_2026_DATA[code];
  const demo = DEMOCRACY_DATA[code]?.gpi;
  const facts = factsGpi.get(code);
  if (!extract) errors.push(`${code}: missing from gpi2026Data.mjs`);
  if (!demo) errors.push(`${code}: missing gpi in democracyData`);
  if (!facts) errors.push(`${code}: missing gpi in countryFacts`);
  if (extract && JSON.stringify(extract) !== JSON.stringify(exp)) {
    errors.push(
      `${code}: gpi2026Data mismatch\n  got ${JSON.stringify(extract)}\n  exp ${JSON.stringify(exp)}`,
    );
  }
  if (demo && JSON.stringify(demo) !== JSON.stringify(exp)) {
    errors.push(
      `${code}: democracyData mismatch\n  got ${JSON.stringify(demo)}\n  exp ${JSON.stringify(exp)}`,
    );
  }
  if (facts && JSON.stringify(facts) !== JSON.stringify(exp)) {
    errors.push(
      `${code}: countryFacts mismatch\n  got ${JSON.stringify(facts)}\n  exp ${JSON.stringify(exp)}`,
    );
  }
  if (DEMOCRACY_DATA[code]?.freedomHouse?.gpi) {
    errors.push(`${code}: gpi wrongly nested under freedomHouse`);
  }
}

for (const [code, entry] of Object.entries(DEMOCRACY_DATA)) {
  if (entry.gpi && !expected.has(code)) {
    errors.push(`${code}: gpi present but not in official GPI extract`);
  }
}
for (const code of factsGpi.keys()) {
  if (!expected.has(code)) {
    errors.push(`${code}: countryFacts gpi not in official GPI extract`);
  }
}
for (const code of extractKeys) {
  if (!expected.has(code)) {
    errors.push(`${code}: gpi2026Data has entry not in CSV`);
  }
}

// Spot-checks from the IEP 2026 report / press release.
const spots = [
  ["IS", 1, 1.161, "Very High", 0],
  ["NZ", 2, 1.343, "Very High", 1],
  ["SG", 8, 1.435, "Very High", -1],
  ["FI", 9, 1.478, "High", 1],
  ["PL", 22, 1.615, "High", 23],
  ["US", 134, 2.535, "Low", -4],
  ["UA", 160, 3.184, "Very Low", 2],
  ["RU", 163, 3.367, "Very Low", 0],
];
for (const [code, rank, score, rating, change] of spots) {
  const e = expected.get(code);
  if (
    !e ||
    e.rank !== rank ||
    e.score !== score ||
    e.rating !== rating ||
    e.rankChange !== change
  ) {
    errors.push(`spot-check failed for ${code}: ${JSON.stringify(e)}`);
  }
}

// Tied ranks must share a rank number (Jamaica/Serbia 70; Haiti/Nigeria 142).
for (const [a, b, rank] of [
  ["JM", "RS", 70],
  ["HT", "NG", 142],
]) {
  if (expected.get(a)?.rank !== rank || expected.get(b)?.rank !== rank) {
    errors.push(`tie ${a}/${b} must both be rank ${rank}`);
  }
}

// Equal rounded scores are NOT a tie unless the publisher prints one: the 2026
// report ranks Cambodia 96 and Honduras 97, both at 2.075.
if (expected.get("KH")?.rank !== 96 || expected.get("HN")?.rank !== 97) {
  errors.push("Cambodia/Honduras must keep the publisher's ranks 96/97, not a tie");
}

// Non-UN GPI territories must stay absent.
for (const code of ["TW", "XK", "PS"]) {
  if (DEMOCRACY_DATA[code]?.gpi || factsGpi.has(code) || GPI_2026_DATA[code]) {
    errors.push(`${code}: non-UN GPI territory must not be bundled`);
  }
}

const uiFiles = [
  ["src/lib/democracyColors.ts", "gpi"],
  ["src/components/DemocracyMapControl.tsx", "getDemocracyIndexMenuGroups"],
  ["src/components/DemocracyIndexChart.tsx", "getDemocracyIndexMenuGroups"],
  ["src/components/EntitySummary.tsx", "gpi"],
  ["src/components/FlagGrid.tsx", '"gpi"'],
];
for (const [rel, needle] of uiFiles) {
  const text = readFileSync(resolve(__dirname, "..", rel), "utf8");
  if (!text.includes(needle)) {
    errors.push(`${rel} no longer references ${needle}`);
  }
}

if (errors.length) {
  console.error(`GPI check FAILED (${errors.length} errors):`);
  for (const e of errors.slice(0, 40)) console.error(" -", e);
  if (errors.length > 40) console.error(` … and ${errors.length - 40} more`);
  process.exit(1);
}

console.log(
  `GPI check OK — ${expected.size} countries match official 2026 extract (rank, score, band, rankChange).`,
);
