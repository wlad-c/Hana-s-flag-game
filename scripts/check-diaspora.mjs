#!/usr/bin/env node
/**
 * Validate bundled diaspora STOCK + FLOW extracts and Learn-mode UI wiring.
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

const STOCK_CSV = R("data/diaspora-migrant-stock-2020-wb.csv");
const STOCK_META = R("data/diaspora-migrant-stock-2020-wb.meta.json");
const FLOW_CSV = R("data/diaspora-migrant-flow-2015-2020.csv");
const FLOW_META = R("data/diaspora-migrant-flow-2015-2020.meta.json");
const GENERATED = R("../src/data/diaspora.ts");
const UN_CODES_FILE = R("../src/lib/unMemberStates.ts");
const LEARN = R("../src/pages/LearnPage.tsx");
const CONTROL = R("../src/components/DiasporaMapControl.tsx");
const LEGEND = R("../src/components/DiasporaMapLegend.tsx");
const LIB = R("../src/lib/diasporaColors.ts");

const STOCK_ALLOWED_MISSING = new Set(["ME", "VA"]);

function loadUnCodes(src) {
  const m = src.match(/UN_MEMBER_CODES[\s\S]*?=[\s\S]*?new Set\(\[([\s\S]*?)\]\)/);
  if (!m) throw new Error("Could not parse UN_MEMBER_CODES");
  return new Set([...m[1].matchAll(/"([A-Z]{2})"/g)].map((x) => x[1]));
}

function parseGenerated(src) {
  const stockSha = src.match(/DIASPORA_STOCK_SOURCE[\s\S]*?csvSha256:\s*"([a-f0-9]{64})"/)?.[1];
  const flowSha = src.match(/DIASPORA_FLOW_SOURCE[\s\S]*?csvSha256:\s*"([a-f0-9]{64})"/)?.[1];
  if (!stockSha || !flowSha) throw new Error("Generated file missing stock/flow csvSha256");

  /** @type {Map<string, Map<string, number>>} */
  const stock = new Map();
  /** @type {Map<string, Map<string, number>>} */
  const flow = new Map();
  let target = null;
  let origin = null;
  for (const line of src.split("\n")) {
    if (line.startsWith("export const DIASPORA_STOCK")) {
      target = stock;
      origin = null;
      continue;
    }
    if (line.startsWith("export const DIASPORA_FLOW")) {
      target = flow;
      origin = null;
      continue;
    }
    if (line.startsWith("export const DIASPORA ")) break;
    if (!target) continue;
    const o = line.match(/^  "([A-Z]{2})": \{$/);
    if (o) {
      origin = o[1];
      target.set(origin, new Map());
      continue;
    }
    const d = line.match(/^    "([A-Z]{2})": (\d+),$/);
    if (d && origin) target.get(origin).set(d[1], Number(d[2]));
  }
  return { stockSha, flowSha, stock, flow };
}

function loadCsv(path, valueName, unCodes) {
  const bytes = readFileSync(path);
  const sha = createHash("sha256").update(bytes).digest("hex");
  const lines = bytes.toString("utf8").trim().split(/\r?\n/);
  const expected = valueName === "stock" ? "origin,destination,stock" : "origin,destination,flow";
  /** @type {Map<string, Map<string, number>>} */
  const data = new Map();
  const errors = [];
  if (lines[0] !== expected) errors.push(`bad header ${path}: ${lines[0]}`);
  for (let i = 1; i < lines.length; i++) {
    const [origin, destination, raw] = lines[i].split(",");
    const n = Number(raw);
    if (!unCodes.has(origin) || !unCodes.has(destination)) {
      errors.push(`${path} non-UN ${origin}→${destination}`);
      continue;
    }
    if (origin === destination) errors.push(`${path} home cell ${origin}`);
    if (!Number.isInteger(n) || n <= 0) errors.push(`${path} bad value line ${i + 1}`);
    if (!data.has(origin)) data.set(origin, new Map());
    data.get(origin).set(destination, n);
  }
  return { sha, data, pairCount: lines.length - 1, errors };
}

function assertMatch(label, expected, got, errors) {
  for (const [origin, dests] of expected) {
    const g = got.get(origin);
    if (!g) {
      errors.push(`${label} gen missing origin ${origin}`);
      continue;
    }
    if (dests.size !== g.size) {
      errors.push(`${label} ${origin}: CSV=${dests.size} gen=${g.size}`);
    }
    for (const [dest, n] of dests) {
      if (g.get(dest) !== n) errors.push(`${label} ${origin}→${dest}: CSV=${n} gen=${g.get(dest)}`);
    }
  }
}

const errors = [];
const unCodes = loadUnCodes(readFileSync(UN_CODES_FILE, "utf8"));
if (unCodes.size !== 195) errors.push(`UN_MEMBER_CODES size ${unCodes.size} ≠ 195`);

const stockMeta = JSON.parse(readFileSync(STOCK_META, "utf8"));
const flowMeta = JSON.parse(readFileSync(FLOW_META, "utf8"));
const stockCsv = loadCsv(STOCK_CSV, "stock", unCodes);
const flowCsv = loadCsv(FLOW_CSV, "flow", unCodes);
errors.push(...stockCsv.errors, ...flowCsv.errors);

const gen = parseGenerated(readFileSync(GENERATED, "utf8"));
if (gen.stockSha !== stockCsv.sha) errors.push("diaspora.ts stock csvSha256 drifted — re-run build-diaspora.mjs");
if (gen.flowSha !== flowCsv.sha) errors.push("diaspora.ts flow csvSha256 drifted — re-run build-diaspora.mjs");
if (stockMeta.xlsxSha256?.length !== 64) errors.push("stock meta missing xlsxSha256");
if (flowMeta.upstreamSha256?.length !== 64) errors.push("flow meta missing upstreamSha256");
if (flowMeta.method !== "da_pb_closed") errors.push("flow method must be da_pb_closed");

for (const code of unCodes) {
  if (!stockCsv.data.has(code) && !STOCK_ALLOWED_MISSING.has(code)) {
    errors.push(`stock CSV missing origin ${code}`);
  }
  if (!gen.stock.has(code) && !STOCK_ALLOWED_MISSING.has(code)) {
    errors.push(`stock gen missing origin ${code}`);
  }
}
assertMatch("stock", stockCsv.data, gen.stock, errors);
assertMatch("flow", flowCsv.data, gen.flow, errors);

// Coverage guards: Australia stock must include the corridors DESA omitted.
for (const dest of ["US", "FR", "DE", "TH", "KR"]) {
  if (!stockCsv.data.get("AU")?.has(dest)) {
    errors.push(`AU→${dest} missing from World Bank stock extract`);
  }
}
if (!flowCsv.data.get("AU")?.has("US")) errors.push("AU→US missing from Abel–Cohen flow extract");
if (!flowCsv.data.get("JP")?.has("BR")) errors.push("JP→BR missing from Abel–Cohen flow extract");

const learn = readFileSync(LEARN, "utf8");
const control = readFileSync(CONTROL, "utf8");
const legend = readFileSync(LEGEND, "utf8");
const lib = readFileSync(LIB, "utf8");

for (const [label, src, needle] of [
  ["LearnPage", learn, "DiasporaMapControl"],
  ["LearnPage", learn, "getDiasporaColorOverlay"],
  ["LearnPage", learn, "DiasporaMapLegend"],
  ["LearnPage", learn, "diasporaMapMode.kind"],
  ["DiasporaMapControl", control, "Living abroad now"],
  ["DiasporaMapControl", control, "Moved 2015"],
  ["DiasporaMapControl", control, "draftKind"],
  ["DiasporaMapControl", control, "pickMeasure"],
  ["DiasporaMapLegend", legend, "DIASPORA_STOCK_SOURCE"],
  ["DiasporaMapLegend", legend, "DIASPORA_FLOW_SOURCE"],
  ["diasporaColors", lib, "getDiasporaColorOverlay"],
  ["diasporaColors", lib, "DIASPORA_FLOW"],
  ["diasporaColors", lib, "DIASPORA_STOCK"],
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
  `✓ diaspora: stock ${stockCsv.data.size} origins / ${stockCsv.pairCount} pairs; ` +
    `flow ${flowCsv.data.size} origins / ${flowCsv.pairCount} pairs; UI wired`,
);
