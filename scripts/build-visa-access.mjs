#!/usr/bin/env node
/**
 * Generates src/data/visaAccess.ts from the committed Passport Index extract.
 *
 * Source (never fabricated):
 *   scripts/data/passport-index-tidy-iso2.csv
 *   upstream: https://github.com/imorte/passport-index-data
 *             (scraped from https://www.passportindex.org, MIT)
 *   edition: 17 February 2026
 *
 * Only the game's 195 UN members / permanent observers are emitted as
 * passport holders and as destinations. Extra Passport Index entities
 * (HK, MO, TW, XK) are dropped — they are not parent nations in this game.
 *
 * Re-run: node scripts/build-visa-access.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const CSV = resolve(__dirname, "data/passport-index-tidy-iso2.csv");
const OUT = resolve(ROOT, "src/data/visaAccess.ts");
const UN_CODES_FILE = resolve(ROOT, "src/lib/unMemberStates.ts");

/** Upstream provenance recorded into the generated file. */
const SOURCE = {
  name: "Passport Index (passportindex.org)",
  dataset: "https://github.com/imorte/passport-index-data",
  edition: "17 February 2026",
  commit: "842d43ce5045a93b051af664e955310ccc9b7341",
  csvPath: "scripts/data/passport-index-tidy-iso2.csv",
};

/**
 * Map a raw Passport Index Requirement cell to our four learner categories
 * (+ no-admission). Numeric day counts are visa-free stays. Home (`-1`) is
 * not stored — the overlay paints the selected passport purple itself.
 */
function classify(raw) {
  const v = String(raw).trim();
  if (v === "-1") return null; // home
  if (/^\d+$/.test(v)) return "visa-free";
  if (v === "visa free") return "visa-free";
  if (v === "visa on arrival") return "visa-on-arrival";
  if (v === "eta" || v === "e-visa") return "evisa";
  if (v === "visa required") return "visa-required";
  if (v === "no admission") return "no-admission";
  return undefined; // unknown — refuse rather than guess
}

function loadUnCodes(src) {
  const m = src.match(/UN_MEMBER_CODES[\s\S]*?=[\s\S]*?new Set\(\[([\s\S]*?)\]\)/);
  if (!m) throw new Error("Could not parse UN_MEMBER_CODES from unMemberStates.ts");
  const codes = [...m[1].matchAll(/"([A-Z]{2})"/g)].map((x) => x[1]);
  if (codes.length !== 195) {
    throw new Error(`Expected 195 UN codes, got ${codes.length}`);
  }
  return new Set(codes);
}

const unCodes = loadUnCodes(readFileSync(UN_CODES_FILE, "utf8"));
const csvBytes = readFileSync(CSV);
const csvSha = createHash("sha256").update(csvBytes).digest("hex");
const lines = csvBytes.toString("utf8").trim().split(/\r?\n/);
const header = lines[0];
if (header !== "Passport,Destination,Requirement") {
  throw new Error(`Unexpected CSV header: ${header}`);
}

/** @type {Map<string, Map<string, string>>} */
const byPassport = new Map();
let skippedNonUn = 0;
let skippedHome = 0;
const unknown = new Map();

for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  if (!line) continue;
  const firstComma = line.indexOf(",");
  const secondComma = line.indexOf(",", firstComma + 1);
  if (firstComma < 0 || secondComma < 0) {
    throw new Error(`Malformed CSV line ${i + 1}: ${line}`);
  }
  const passport = line.slice(0, firstComma).trim().toUpperCase();
  const destination = line.slice(firstComma + 1, secondComma).trim().toUpperCase();
  const requirement = line.slice(secondComma + 1).trim();

  if (!unCodes.has(passport) || !unCodes.has(destination)) {
    skippedNonUn++;
    continue;
  }
  const cat = classify(requirement);
  if (cat === null) {
    skippedHome++;
    continue;
  }
  if (cat === undefined) {
    unknown.set(requirement, (unknown.get(requirement) || 0) + 1);
    continue;
  }
  let dests = byPassport.get(passport);
  if (!dests) {
    dests = new Map();
    byPassport.set(passport, dests);
  }
  dests.set(destination, cat);
}

if (unknown.size > 0) {
  console.error("Unknown requirement values (refusing to invent a category):");
  for (const [k, n] of [...unknown.entries()].sort()) console.error(`  ${k}: ${n}`);
  process.exit(1);
}

const missingPassports = [...unCodes].filter((c) => !byPassport.has(c)).sort();
if (missingPassports.length) {
  console.error(`Missing passport rows for UN codes: ${missingPassports.join(", ")}`);
  process.exit(1);
}

// Every passport must have a destination entry for every other UN member.
const thin = [];
for (const code of unCodes) {
  const dests = byPassport.get(code);
  const n = dests?.size ?? 0;
  // 194 other UN members (home is omitted).
  if (n !== 194) thin.push(`${code}: ${n} destinations (expected 194)`);
}
if (thin.length) {
  console.error("Incomplete destination coverage:");
  for (const t of thin.slice(0, 20)) console.error(`  ${t}`);
  if (thin.length > 20) console.error(`  …and ${thin.length - 20} more`);
  process.exit(1);
}

const sortedPassports = [...byPassport.keys()].sort();
const body = sortedPassports
  .map((p) => {
    const dests = [...byPassport.get(p).entries()].sort(([a], [b]) => a.localeCompare(b));
    const inner = dests.map(([d, cat]) => `    ${JSON.stringify(d)}: ${JSON.stringify(cat)},`).join("\n");
    return `  ${JSON.stringify(p)}: {\n${inner}\n  },`;
  })
  .join("\n");

const out = `// GENERATED by scripts/build-visa-access.mjs — DO NOT EDIT BY HAND.
// Re-run: node scripts/build-visa-access.mjs
//
// Visa-access categories for holders of each UN-member passport, used by the
// Learn world-map passport control's "visa access" mode. SOURCED from the
// Passport Index tidy extract (passportindex.org via imorte/passport-index-data);
// never hand-written or approximated. A destination with no sourced row is
// absent — the map leaves it the neutral land colour rather than inventing one.
//
// Source: ${SOURCE.name}
// Dataset: ${SOURCE.dataset}
// Edition: ${SOURCE.edition}
// Upstream commit: ${SOURCE.commit}
// Bundled CSV: ${SOURCE.csvPath}
// CSV sha256: ${csvSha}

/** Visa requirement category for a passport→destination pair. */
export type VisaAccessCategory =
  | "visa-free"
  | "visa-on-arrival"
  | "evisa"
  | "visa-required"
  | "no-admission";

/** Provenance for the bundled visa-access matrix. */
export const VISA_ACCESS_SOURCE = {
  name: ${JSON.stringify(SOURCE.name)},
  dataset: ${JSON.stringify(SOURCE.dataset)},
  edition: ${JSON.stringify(SOURCE.edition)},
  commit: ${JSON.stringify(SOURCE.commit)},
  csvPath: ${JSON.stringify(SOURCE.csvPath)},
  csvSha256: ${JSON.stringify(csvSha)},
} as const;

/**
 * passport ISO alpha-2 → destination ISO alpha-2 → category.
 * Home (passport === destination) is omitted; the overlay paints it purple.
 */
export const VISA_ACCESS: Readonly<
  Record<string, Readonly<Record<string, VisaAccessCategory>>>
> = {
${body}
};
`;

writeFileSync(OUT, out, "utf8");
console.log(`Wrote ${OUT}`);
console.log(`  ${sortedPassports.length} passport(s); skippedNonUn=${skippedNonUn}; skippedHome=${skippedHome}`);
console.log(`  CSV sha256 ${csvSha}`);
