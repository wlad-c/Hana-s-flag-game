#!/usr/bin/env node
/**
 * Validate bundled migrant-origin data against the committed UN DESA extract.
 * Never invent a stock figure — if the CSV and generated file drift, fail.
 *
 * Also guards Learn-mode UI wiring: MigrantOriginsMapControl must exist, and
 * LearnPage must call getMigrantOriginsColorOverlay / render the legend /
 * show sourced panel rows.
 *
 * Run: node scripts/check-migrant-origins.mjs
 *      npm run flags:check:migrant-origins
 */
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const R = (p) => resolve(__dirname, p);

const CSV = R("data/undesa-ims-2024-bilateral-iso2.csv");
const GENERATED = R("../src/data/migrantOrigins.ts");
const UN_CODES_FILE = R("../src/lib/unMemberStates.ts");
const LEARN = R("../src/pages/LearnPage.tsx");
const CONTROL = R("../src/components/MigrantOriginsMapControl.tsx");
const LEGEND = R("../src/components/MigrantOriginsMapLegend.tsx");
const LIB = R("../src/lib/migrantOriginsColors.ts");
const PANEL = R("../src/components/MigrantOriginsPanelRows.tsx");

function loadUnCodes(src) {
  const m = src.match(/UN_MEMBER_CODES[\s\S]*?=[\s\S]*?new Set\(\[([\s\S]*?)\]\)/);
  if (!m) throw new Error("Could not parse UN_MEMBER_CODES");
  return new Set([...m[1].matchAll(/"([A-Z]{2})"/g)].map((x) => x[1]));
}

function parseGenerated(src) {
  const shaM = src.match(/csvSha256:\s*"([a-f0-9]{64})"/);
  const yearM = src.match(/year:\s*(\d{4})/);
  if (!shaM) throw new Error("Generated file missing csvSha256");
  if (!yearM) throw new Error("Generated file missing year");
  /** @type {Map<string, Map<string, number>>} */
  const data = new Map();
  let dest = null;
  for (const line of src.split("\n")) {
    const d = line.match(/^  "([A-Z]{2})": \{$/);
    if (d) {
      dest = d[1];
      data.set(dest, new Map());
      continue;
    }
    const o = line.match(/^    "([A-Z]{2})": (\d+),$/);
    if (o && dest) {
      data.get(dest).set(o[1], Number(o[2]));
    }
  }
  return { sha: shaM[1], year: Number(yearM[1]), data };
}

const errors = [];
const unCodes = loadUnCodes(readFileSync(UN_CODES_FILE, "utf8"));
if (unCodes.size !== 195) errors.push(`UN_MEMBER_CODES size ${unCodes.size} ≠ 195`);

const csvBytes = readFileSync(CSV);
const csvSha = createHash("sha256").update(csvBytes).digest("hex");
const lines = csvBytes.toString("utf8").trim().split(/\r?\n/);
if (lines[0] !== "destination,origin,stock_2024") {
  errors.push(`Unexpected CSV header: ${lines[0]}`);
}

/** @type {Map<string, Map<string, number>>} */
const expected = new Map();
for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  if (!line) continue;
  const [dest, origin, stockRaw] = line.split(",");
  const stock = Number(stockRaw);
  if (!unCodes.has(dest) || !unCodes.has(origin)) {
    errors.push(`CSV non-UN pair ${dest}←${origin}`);
    continue;
  }
  if (dest === origin) {
    errors.push(`CSV self pair ${dest}`);
    continue;
  }
  if (!Number.isInteger(stock) || stock < 0) {
    errors.push(`CSV bad stock ${dest}←${origin}: ${stockRaw}`);
    continue;
  }
  if (!expected.has(dest)) expected.set(dest, new Map());
  if (expected.get(dest).has(origin)) {
    errors.push(`CSV duplicate ${dest}←${origin}`);
  }
  expected.get(dest).set(origin, stock);
}

const gen = parseGenerated(readFileSync(GENERATED, "utf8"));
if (gen.sha !== csvSha) {
  errors.push(`csvSha256 drift: generated ${gen.sha.slice(0, 12)}… ≠ CSV ${csvSha.slice(0, 12)}…`);
}
if (gen.year !== 2024) errors.push(`year must be 2024, got ${gen.year}`);

// Spot-check known UN DESA 2024 figures (Table 1, both sexes) — refuse fabrication.
const spot = [
  ["US", "MX", 11279561],
  ["US", "IN", 3165238],
  ["AU", "GB", 1107102],
  ["AU", "NZ", 588088],
];
for (const [d, o, n] of spot) {
  const got = expected.get(d)?.get(o);
  if (got !== n) errors.push(`Spot-check ${d}←${o}: CSV=${got} expected ${n}`);
  const genN = gen.data.get(d)?.get(o);
  if (genN !== n) errors.push(`Spot-check ${d}←${o}: generated=${genN} expected ${n}`);
}

for (const [dest, origins] of expected) {
  const got = gen.data.get(dest);
  if (!got) {
    errors.push(`${dest}: missing from migrantOrigins.ts`);
    continue;
  }
  if (origins.size !== got.size) {
    errors.push(`${dest}: origin count CSV=${origins.size} gen=${got.size}`);
  }
  for (const [origin, stock] of origins) {
    if (got.get(origin) !== stock) {
      errors.push(`${dest}←${origin}: CSV=${stock} gen=${got.get(origin)}`);
    }
  }
  for (const origin of got.keys()) {
    if (origin === dest) errors.push(`${dest}←${origin}: self must be omitted`);
  }
}

for (const dest of gen.data.keys()) {
  if (!expected.has(dest)) errors.push(`${dest}: in generated but not CSV`);
}

// UI wiring
const learn = readFileSync(LEARN, "utf8");
const control = readFileSync(CONTROL, "utf8");
const legend = readFileSync(LEGEND, "utf8");
const lib = readFileSync(LIB, "utf8");
const panel = readFileSync(PANEL, "utf8");

for (const [label, src, needle] of [
  ["LearnPage", learn, "MigrantOriginsMapControl"],
  ["LearnPage", learn, "getMigrantOriginsColorOverlay"],
  ["LearnPage", learn, "MigrantOriginsMapLegend"],
  ["LearnPage", learn, "MigrantOriginsPanelRows"],
  ["MigrantOriginsMapControl", control, "Filter countries"],
  ["MigrantOriginsMapControl", control, "kind: \"migrant-origins\""],
  ["MigrantOriginsMapLegend", legend, "MIGRANT_ORIGINS_BLUE"],
  ["MigrantOriginsMapLegend", legend, "MIGRANT_ORIGINS_SOURCE"],
  ["migrantOriginsColors", lib, "getMigrantOriginsColorOverlay"],
  ["migrantOriginsColors", lib, "MIGRANT_ORIGINS_COLORS"],
  ["migrantOriginsColors", lib, "destination: \"#000000\""],
  ["MigrantOriginsPanelRows", panel, "MIGRANT_ORIGINS_SOURCE"],
  ["MigrantOriginsPanelRows", panel, "migrantStockFor"],
]) {
  if (!src.includes(needle)) errors.push(`${label} no longer references ${needle}`);
}

if (!lib.includes("noData:") || !/#(?:[0-9a-fA-F]{6})/.test(lib)) {
  errors.push("migrantOriginsColors must define noData grey and blue palette hexes");
}

if (errors.length) {
  console.error(`✗ migrant-origins check failed (${errors.length}):`);
  for (const e of errors.slice(0, 40)) console.error(`  ${e}`);
  if (errors.length > 40) console.error(`  …and ${errors.length - 40} more`);
  process.exit(1);
}

const pairs = [...expected.values()].reduce((n, m) => n + m.size, 0);
console.log(
  `✓ migrant-origins: ${expected.size} destinations, ${pairs} pairs; sha256 ${csvSha.slice(0, 12)}…; UI wired`,
);
