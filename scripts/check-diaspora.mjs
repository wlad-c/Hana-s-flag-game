#!/usr/bin/env node
/**
 * Validate bundled diaspora data against the committed UN DESA extract, and
 * guard the Learn-mode UI wiring for the diaspora heatmap.
 *
 * Run: node scripts/check-diaspora.mjs
 *      npm run flags:check:diaspora
 */
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const R = (p) => resolve(__dirname, p);

const CSV = R("data/diaspora-migrant-stock-2024.csv");
const META = R("data/diaspora-migrant-stock-2024.meta.json");
const GENERATED = R("../src/data/diaspora.ts");
const UN_CODES_FILE = R("../src/lib/unMemberStates.ts");
const LEARN = R("../src/pages/LearnPage.tsx");
const CONTROL = R("../src/components/DiasporaMapControl.tsx");
const LEGEND = R("../src/components/DiasporaMapLegend.tsx");
const LIB = R("../src/lib/diasporaColors.ts");

function loadUnCodes(src) {
  const m = src.match(/UN_MEMBER_CODES[\s\S]*?=[\s\S]*?new Set\(\[([\s\S]*?)\]\)/);
  if (!m) throw new Error("Could not parse UN_MEMBER_CODES");
  return new Set([...m[1].matchAll(/"([A-Z]{2})"/g)].map((x) => x[1]));
}

function parseGenerated(src) {
  const shaM = src.match(/csvSha256:\s*"([a-f0-9]{64})"/);
  if (!shaM) throw new Error("Generated file missing csvSha256");
  /** @type {Map<string, Map<string, number>>} */
  const data = new Map();
  let origin = null;
  for (const line of src.split("\n")) {
    const o = line.match(/^  "([A-Z]{2})": \{$/);
    if (o) {
      origin = o[1];
      data.set(origin, new Map());
      continue;
    }
    const d = line.match(/^    "([A-Z]{2})": (\d+),$/);
    if (d && origin) data.get(origin).set(d[1], Number(d[2]));
  }
  return { sha: shaM[1], data };
}

const errors = [];
const unCodes = loadUnCodes(readFileSync(UN_CODES_FILE, "utf8"));
if (unCodes.size !== 195) errors.push(`UN_MEMBER_CODES size ${unCodes.size} ≠ 195`);

const meta = JSON.parse(readFileSync(META, "utf8"));
const csvBytes = readFileSync(CSV);
const csvSha = createHash("sha256").update(csvBytes).digest("hex");
const gen = parseGenerated(readFileSync(GENERATED, "utf8"));

if (gen.sha !== csvSha) {
  errors.push(`diaspora.ts csvSha256 drifted from CSV — re-run build-diaspora.mjs`);
}
if (meta.xlsxSha256?.length !== 64) {
  errors.push("meta missing upstream xlsxSha256");
}

/** @type {Map<string, Map<string, number>>} */
const expected = new Map();
const lines = csvBytes.toString("utf8").trim().split(/\r?\n/);
if (lines[0] !== "origin,destination,stock") {
  errors.push(`bad CSV header ${lines[0]}`);
}
for (let i = 1; i < lines.length; i++) {
  const [origin, destination, stockRaw] = lines[i].split(",");
  const stock = Number(stockRaw);
  if (!unCodes.has(origin) || !unCodes.has(destination)) {
    errors.push(`CSV non-UN ${origin}→${destination}`);
    continue;
  }
  if (origin === destination) errors.push(`CSV home cell ${origin}`);
  if (!Number.isInteger(stock) || stock <= 0) errors.push(`CSV bad stock line ${i + 1}`);
  if (!expected.has(origin)) expected.set(origin, new Map());
  expected.get(origin).set(destination, stock);
}

for (const code of unCodes) {
  if (!expected.has(code)) errors.push(`${code}: missing origin in CSV`);
  if (!gen.data.has(code)) errors.push(`${code}: missing origin in diaspora.ts`);
}

for (const [origin, dests] of expected) {
  const got = gen.data.get(origin);
  if (!got) continue;
  if (dests.size !== got.size) {
    errors.push(`${origin}: dest count CSV=${dests.size} gen=${got.size}`);
  }
  for (const [dest, n] of dests) {
    if (got.get(dest) !== n) errors.push(`${origin}→${dest}: CSV=${n} gen=${got.get(dest)}`);
  }
}

const learn = readFileSync(LEARN, "utf8");
const control = readFileSync(CONTROL, "utf8");
const legend = readFileSync(LEGEND, "utf8");
const lib = readFileSync(LIB, "utf8");

for (const [label, src, needle] of [
  ["LearnPage", learn, "DiasporaMapControl"],
  ["LearnPage", learn, "getDiasporaColorOverlay"],
  ["LearnPage", learn, "DiasporaMapLegend"],
  ["DiasporaMapControl", control, "People born in"],
  ["DiasporaMapLegend", legend, "DIASPORA_HEATMAP"],
  ["DiasporaMapLegend", legend, "diasporaScale"],
  ["diasporaColors", lib, "getDiasporaColorOverlay"],
  ["diasporaColors", lib, "diasporaHeatColor"],
  ["diasporaColors", lib, "DIASPORA_HEATMAP"],
]) {
  if (!src.includes(needle)) errors.push(`${label} no longer references ${needle}`);
}

if (!/light:\s*"#d8f3e0"/.test(lib) || !/dark:\s*"#004d1a"/.test(lib)) {
  errors.push("diasporaColors heatmap endpoints drifted");
}
if (!/home:\s*"#000000"/.test(lib)) {
  errors.push("diasporaColors origin/home must be black (#000000)");
}
if (!/Math\.log/.test(lib)) {
  errors.push("diasporaColors must use a log scale for the heatmap");
}

if (errors.length) {
  console.error(`✗ diaspora check failed (${errors.length}):`);
  for (const e of errors.slice(0, 40)) console.error(`  ${e}`);
  if (errors.length > 40) console.error(`  …and ${errors.length - 40} more`);
  process.exit(1);
}

console.log(
  `✓ diaspora: ${expected.size} origins, ${lines.length - 1} pairs; sha256 ${csvSha.slice(0, 12)}…; UI wired`,
);
