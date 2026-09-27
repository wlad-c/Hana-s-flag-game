#!/usr/bin/env node
/**
 * Validate bundled Brand Finance Global Soft Power Index 2026 data against the
 * committed extract (scripts/data/soft-power-2026.csv /
 * scripts/data/softPower2026Data.mjs).
 *
 * Fails on: wrong rank/score/band, drift between softPower2026Data.mjs /
 * democracyData.mjs / countryFacts.ts, fabricating entries, or UI wiring
 * dropping the index.
 *
 * Source: https://static.brandirectory.com/reports/brand-finance-soft-power-index-2026-digital.pdf
 * (Brand Finance Global Soft Power Index 2026 — all 193 UN member states).
 *
 * Run: node scripts/check-soft-power-data.mjs
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { SOFT_POWER_2026_DATA } from "./data/softPower2026Data.mjs";
import { DEMOCRACY_DATA } from "./data/democracyData.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CSV = resolve(__dirname, "data/soft-power-2026.csv");
const FACTS_TS = resolve(__dirname, "../src/data/countryFacts.ts");

/** 10-point score bands — must match softPower2026Data / democracyColors. */
function softPowerBand(score) {
  if (score >= 90) return "90–100";
  if (score >= 80) return "80–89";
  if (score >= 70) return "70–79";
  if (score >= 60) return "60–69";
  if (score >= 50) return "50–59";
  if (score >= 40) return "40–49";
  if (score >= 30) return "30–39";
  if (score >= 20) return "20–29";
  if (score >= 10) return "10–19";
  return "0–9";
}

function loadFactsSoftPower(src) {
  /** @type {Map<string, object>} */
  const out = new Map();
  const lineRe = /^  ([A-Z]{2}): (\{.*\}),$/gm;
  let m;
  while ((m = lineRe.exec(src))) {
    const code = m[1];
    const obj = JSON.parse(m[2]);
    const soft = obj.democracy?.softPower;
    if (soft) out.set(code, soft);
  }
  return out;
}

const csvLines = readFileSync(CSV, "utf8").trim().split(/\r?\n/).slice(1);
/** @type {Map<string, object>} */
const fromCsv = new Map();
for (const line of csvLines) {
  const [iso2, , rankStr, scoreStr, rankChangeStr, rating] = line.split(",");
  const score = Number(scoreStr);
  const rank = Number(rankStr);
  /** @type {{ year: number, rating: string, rank: number, rankChange?: number, score: number }} */
  const entry = {
    year: 2026,
    rating: softPowerBand(score),
    rank,
  };
  if (rankChangeStr !== "" && rankChangeStr != null) {
    entry.rankChange = Number(rankChangeStr);
  }
  entry.score = score;
  if (rating && rating !== entry.rating) {
    console.error(`${iso2}: CSV rating ${rating} ≠ band(${score})=${entry.rating}`);
    process.exit(1);
  }
  fromCsv.set(iso2, entry);
}

if (fromCsv.size !== 193) {
  console.error(`Expected 193 Soft Power CSV rows, got ${fromCsv.size}`);
  process.exit(1);
}

const errors = [];
const extractCodes = Object.keys(SOFT_POWER_2026_DATA);
if (extractCodes.length !== 193) {
  errors.push(`softPower2026Data has ${extractCodes.length} codes, expected 193`);
}

// Every rank 1–193 exactly once.
const ranks = [...fromCsv.values()].map((e) => e.rank).sort((a, b) => a - b);
for (let i = 1; i <= 193; i++) {
  if (ranks[i - 1] !== i) {
    errors.push(`Rank sequence broken at ${i}: got ${ranks[i - 1]}`);
    break;
  }
}

// Every 2026 country card prints a previous rank, so every entry carries a movement.
for (const [code, exp] of fromCsv) {
  if (exp.rankChange === undefined) errors.push(`${code}: missing rankChange (the 2026 card prints a previous rank)`);
}
if (fromCsv.get("GT")?.rankChange !== -6) errors.push("GT: 2026 rank 126, previous 120 — rankChange must be -6");

for (const [code, exp] of fromCsv) {
  const extract = SOFT_POWER_2026_DATA[code];
  const demo = DEMOCRACY_DATA[code]?.softPower;
  if (!extract) errors.push(`${code}: missing from softPower2026Data`);
  else if (JSON.stringify(extract) !== JSON.stringify(exp)) {
    errors.push(
      `${code}: extract drift\n  got ${JSON.stringify(extract)}\n  exp ${JSON.stringify(exp)}`,
    );
  }
  if (!demo) errors.push(`${code}: missing softPower in democracyData`);
  else if (JSON.stringify(demo) !== JSON.stringify(exp)) {
    errors.push(
      `${code}: democracyData drift\n  got ${JSON.stringify(demo)}\n  exp ${JSON.stringify(exp)}`,
    );
  }
}

const factsSoft = loadFactsSoftPower(readFileSync(FACTS_TS, "utf8"));
for (const [code, exp] of fromCsv) {
  const facts = factsSoft.get(code);
  if (!facts) errors.push(`${code}: missing softPower in countryFacts`);
  else if (JSON.stringify(facts) !== JSON.stringify(exp)) {
    errors.push(
      `${code}: countryFacts drift\n  got ${JSON.stringify(facts)}\n  exp ${JSON.stringify(exp)}`,
    );
  }
}

for (const [code, entry] of Object.entries(DEMOCRACY_DATA)) {
  if (entry.softPower && !fromCsv.has(code)) {
    errors.push(`${code}: democracyData has softPower but CSV does not`);
  }
}
for (const code of factsSoft.keys()) {
  if (!fromCsv.has(code)) {
    errors.push(`${code}: countryFacts has softPower but CSV does not`);
  }
}

// Spot-checks against Brand Finance Global Soft Power Index 2026 PDF / press.
const spots = [
  ["US", 1, 74.9, "70–79"],
  ["CN", 2, 73.5, "70–79"],
  ["JP", 3, 70.6, "70–79"],
  ["GB", 4, 69.2, "60–69"],
  ["DE", 5, 67.7, "60–69"],
  ["FR", 6, 65.8, "60–69"],
  ["CH", 7, 63.2, "60–69"],
  ["CA", 8, 63.2, "60–69"],
  ["IT", 9, 61.6, "60–69"],
  ["AE", 10, 59.4, "50–59"],
  ["KR", 11, 59.2, "50–59"],
  ["SE", 13, 58.8, "50–59"],
  ["AU", 16, 57.5, "50–59"],
  ["NZ", 26, 51.6, "50–59"],
  ["BR", 29, 49.2, "40–49"],
  ["IN", 32, 48.0, "40–49"],
  ["MC", 36, 45.5, "40–49"],
  ["IL", 39, 44.8, "40–49"],
  ["KP", 63, 38.9, "30–39"],
  ["RW", 122, 31.7, "30–39"],
  ["AF", 151, 28.3, "20–29"],
  ["KI", 193, 19.7, "10–19"],
];
for (const [code, rank, score, rating] of spots) {
  const e = fromCsv.get(code);
  if (!e || e.rank !== rank || e.score !== score || e.rating !== rating) {
    errors.push(`spot-check failed for ${code}: ${JSON.stringify(e)}`);
  }
}

const uiFiles = [
  ["src/lib/democracyColors.ts", "soft-power"],
  ["src/components/DemocracyMapControl.tsx", "getDemocracyIndexMenuGroups"],
  ["src/components/DemocracyIndexChart.tsx", "getDemocracyIndexMenuGroups"],
  ["src/components/EntitySummary.tsx", "softPower"],
  ["src/components/FlagGrid.tsx", "soft-power"],
];
for (const [rel, needle] of uiFiles) {
  const text = readFileSync(resolve(__dirname, "..", rel), "utf8");
  if (!text.includes(needle)) {
    errors.push(`${rel} no longer references ${needle}`);
  }
}

if (errors.length) {
  console.error(`Soft Power check FAILED (${errors.length} errors):`);
  for (const e of errors.slice(0, 40)) console.error(" -", e);
  if (errors.length > 40) console.error(` … and ${errors.length - 40} more`);
  process.exit(1);
}

console.log(
  `Soft Power check OK — ${fromCsv.size} countries match Brand Finance Global Soft Power Index 2026 (rank, score, band).`,
);
