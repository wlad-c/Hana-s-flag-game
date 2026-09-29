#!/usr/bin/env node
/**
 * Validate bundled visa-access data against the committed Passport Index
 * extract. Never invent a category — if the CSV and generated file drift,
 * fail the build.
 *
 * Also guards the Learn-mode UI wiring: TravelMigrationMapControl must exist, and
 * LearnPage must call getVisaAccessColorOverlay / render the legend.
 *
 * Run: node scripts/check-visa-access.mjs
 *      npm run flags:check:visa-access
 */
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const R = (p) => resolve(__dirname, p);

const CSV = R("data/passport-index-tidy-iso2.csv");
const GENERATED = R("../src/data/visaAccess.ts");
const UN_CODES_FILE = R("../src/lib/unMemberStates.ts");
const LEARN = R("../src/pages/LearnPage.tsx");
const CONTROL = R("../src/components/TravelMigrationMapControl.tsx");
const LEGEND = R("../src/components/VisaAccessMapLegend.tsx");
const LIB = R("../src/lib/visaAccessColors.ts");

const VALID = new Set([
  "visa-free",
  "visa-on-arrival",
  "evisa",
  "visa-required",
  "no-admission",
]);

function loadUnCodes(src) {
  const m = src.match(/UN_MEMBER_CODES[\s\S]*?=[\s\S]*?new Set\(\[([\s\S]*?)\]\)/);
  if (!m) throw new Error("Could not parse UN_MEMBER_CODES");
  return new Set([...m[1].matchAll(/"([A-Z]{2})"/g)].map((x) => x[1]));
}

function classify(raw) {
  const v = String(raw).trim();
  if (v === "-1") return null;
  if (/^\d+$/.test(v)) return "visa-free";
  if (v === "visa free") return "visa-free";
  if (v === "visa on arrival") return "visa-on-arrival";
  if (v === "eta" || v === "e-visa") return "evisa";
  if (v === "visa required") return "visa-required";
  if (v === "no admission") return "no-admission";
  return undefined;
}

function parseGenerated(src) {
  const shaM = src.match(/csvSha256:\s*"([a-f0-9]{64})"/);
  if (!shaM) throw new Error("Generated file missing csvSha256");
  /** @type {Map<string, Map<string, string>>} */
  const data = new Map();
  let passport = null;
  for (const line of src.split("\n")) {
    const p = line.match(/^  "([A-Z]{2})": \{$/);
    if (p) {
      passport = p[1];
      data.set(passport, new Map());
      continue;
    }
    const d = line.match(/^    "([A-Z]{2})": "([^"]+)",$/);
    if (d && passport) {
      data.get(passport).set(d[1], d[2]);
    }
  }
  return { sha: shaM[1], data };
}

const errors = [];
const unCodes = loadUnCodes(readFileSync(UN_CODES_FILE, "utf8"));
if (unCodes.size !== 195) errors.push(`UN_MEMBER_CODES size ${unCodes.size} ≠ 195`);

const csvBytes = readFileSync(CSV);
const csvSha = createHash("sha256").update(csvBytes).digest("hex");
const gen = parseGenerated(readFileSync(GENERATED, "utf8"));

if (gen.sha !== csvSha) {
  errors.push(
    `visaAccess.ts csvSha256 (${gen.sha}) ≠ CSV sha256 (${csvSha}) — re-run build-visa-access.mjs`,
  );
}

/** Rebuild expected from CSV the same way the generator does. */
const expected = new Map();
const lines = csvBytes.toString("utf8").trim().split(/\r?\n/);
for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  if (!line) continue;
  const a = line.indexOf(",");
  const b = line.indexOf(",", a + 1);
  const passport = line.slice(0, a).trim().toUpperCase();
  const destination = line.slice(a + 1, b).trim().toUpperCase();
  const requirement = line.slice(b + 1).trim();
  if (!unCodes.has(passport) || !unCodes.has(destination)) continue;
  const cat = classify(requirement);
  if (cat === null) continue;
  if (cat === undefined) {
    errors.push(`Unknown CSV requirement ${JSON.stringify(requirement)}`);
    continue;
  }
  if (!expected.has(passport)) expected.set(passport, new Map());
  expected.get(passport).set(destination, cat);
}

for (const code of unCodes) {
  if (!expected.has(code)) errors.push(`${code}: missing from CSV (as passport)`);
  if (!gen.data.has(code)) errors.push(`${code}: missing from visaAccess.ts`);
}

for (const [passport, dests] of expected) {
  const got = gen.data.get(passport);
  if (!got) continue;
  if (dests.size !== got.size) {
    errors.push(`${passport}: destination count CSV=${dests.size} gen=${got.size}`);
  }
  for (const [dest, cat] of dests) {
    if (got.get(dest) !== cat) {
      errors.push(`${passport}→${dest}: CSV=${cat} gen=${got.get(dest)}`);
    }
  }
  for (const [dest, cat] of got) {
    if (!VALID.has(cat)) errors.push(`${passport}→${dest}: invalid category ${cat}`);
    if (dest === passport) errors.push(`${passport}→${dest}: home must be omitted`);
  }
}

// UI wiring — a rule nothing calls enforces nothing.
const learn = readFileSync(LEARN, "utf8");
const control = readFileSync(CONTROL, "utf8");
const legend = readFileSync(LEGEND, "utf8");
const lib = readFileSync(LIB, "utf8");

for (const [label, src, needle] of [
  ["LearnPage", learn, "TravelMigrationMapControl"],
  ["LearnPage", learn, "getVisaAccessColorOverlay"],
  ["LearnPage", learn, "VisaAccessMapLegend"],
  ["TravelMigrationMapControl", control, "visa"],
  ["TravelMigrationMapControl", control, "covers"],
  ["VisaAccessMapLegend", legend, "VISA_ACCESS_LEGEND"],
  ["VisaAccessMapLegend", legend, "VISA_ACCESS_COLORS"],
  ["VisaAccessMapLegend", legend, "formatVisaAccessCountLabel"],
  ["VisaAccessMapLegend", legend, "visaAccessCategoryCounts"],
  ["visaAccessColors", lib, "VISA_ACCESS_COLORS"],
  ["visaAccessColors", lib, "getVisaAccessColorOverlay"],
  ["visaAccessColors", lib, "visaAccessCategoryCounts"],
  ["visaAccessColors", lib, "formatVisaAccessCountLabel"],
]) {
  if (!src.includes(needle)) errors.push(`${label} no longer references ${needle}`);
}

// Colour contract the owner asked for (quoted or bare keys in the colours object).
for (const key of ["visa-free", "visa-on-arrival", "evisa", "visa-required", "home", "no-admission"]) {
  const re = new RegExp(`(?:"${key}"|${key}):\\s*"#[0-9a-fA-F]{6}"`);
  if (!re.test(lib)) errors.push(`visaAccessColors missing ${key} hex`);
}
if (!/(?:"home"|home):\s*"#000000"/.test(lib)) {
  errors.push("visaAccessColors home must be black (#000000)");
}
if (!/(?:"no-admission"|"no-admission"):\s*"#7f0000"/.test(lib) && !/no-admission:\s*"#7f0000"/.test(lib)) {
  errors.push("visaAccessColors no-admission must be dark red (#7f0000)");
}

if (errors.length) {
  console.error(`✗ visa-access check failed (${errors.length}):`);
  for (const e of errors.slice(0, 40)) console.error(`  ${e}`);
  if (errors.length > 40) console.error(`  …and ${errors.length - 40} more`);
  process.exit(1);
}

console.log(
  `✓ visa-access: ${expected.size} passports × 194 destinations; sha256 ${csvSha.slice(0, 12)}…; UI wired`,
);
