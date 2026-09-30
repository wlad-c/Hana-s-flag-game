// Audits the bundled city-flag-meaning explanations in src/data/cityFlagMeanings.ts.
//
// Enforces the "Flag-meaning explanations must be sourced and must separate
// myth from fact" hard rule in CLAUDE.md for the capital-city flag explainer —
// the exact same guarantees as scripts/check-flag-meanings.mjs, just against the
// city dataset. Like that check, this is a SAFETY NET, not a substitute for
// verifying each claim against its cited source by hand.
//
// Checks (each FAILS the build):
//   A. Empty/whitespace `description`.
//   B. No `sources` at all (must have ≥1 authoritative citation).
//   C. A source with an empty title, or a url that is not a real http(s) URL.
//   D. A malformed myth: missing/empty `claim` or `reality`.
//
// And, between the explainers, the omission list (scripts/data/capital-meaning-omitted.txt)
// and the bundled capital flags (src/data/capitalFlags.ts):
//   E. A code that is both explained and listed as omitted.
//   F. An explainer or an omission line for a code with no bundled capital flag.
//   G. An omission line that says the flag cannot be shown (name guard, unreachable,
//      shared with the subdivision) while the flag is bundled and not suppressed.
//
// Why E–G exist (2026-09 audit, batch 7e): the omission list recorded 46 capital
// flags as "structurally unreachable — name-guard mismatch". Once the quiz and panel
// capitals were reconciled (batches 7c–7d), every one of those flags rendered, with
// no explainer, and the stale reasons kept them out of the sweep's queue. A reason
// that claims a flag cannot be shown must stay true.
//
// Run: node scripts/check-city-flag-meanings.mjs   (also part of `npm run flags:check`)

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
// Both city-flag-meaning datasets are validated identically: the subdivision-
// keyed CITY_FLAG_MEANINGS and the national-capital NATIONAL_CAPITAL_FLAG_MEANINGS
// (capitals that head no subdivision — Amsterdam, Ottawa, …).
const DATASETS = [
  { path: resolve(__dirname, "..", "src", "data", "cityFlagMeanings.ts"), marker: "export const CITY_FLAG_MEANINGS" },
  { path: resolve(__dirname, "..", "src", "data", "nationalCapitalFlagMeanings.ts"), marker: "export const NATIONAL_CAPITAL_FLAG_MEANINGS" },
];

// ── Load a meanings literal without invoking tsc ────────────────────────────
// The object literal after `= {` is pure data (strings/arrays/objects/comments)
// — no TS-specific syntax inside — so brace-matching the literal and evaluating
// it yields the real runtime value (same approach as check-flag-meanings.mjs).
function loadMeanings(DATA_PATH, marker) {
  const src = readFileSync(DATA_PATH, "utf8");
  const start = src.indexOf(marker);
  if (start < 0) throw new Error(`Could not locate ${marker} export`);
  const eq = src.indexOf("= {", start);
  if (eq < 0) throw new Error(`Could not locate ${marker} literal`);
  const open = src.indexOf("{", eq);
  let depth = 0, i = open, inStr = null;
  for (; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (c === "\\") { i++; continue; }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") { inStr = c; continue; }
    if (c === "/" && src[i + 1] === "/") { i = src.indexOf("\n", i); if (i < 0) break; continue; }
    if (c === "{") depth++;
    else if (c === "}") { depth--; if (depth === 0) { i++; break; } }
  }
  const literal = src.slice(open, i);
  // eslint-disable-next-line no-new-func
  return Function(`"use strict"; return (${literal});`)();
}

const isHttpUrl = (u) => {
  if (typeof u !== "string") return false;
  try {
    const parsed = new URL(u);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};
const nonEmpty = (s) => typeof s === "string" && s.trim().length > 0;

const meanings = {};
for (const { path, marker } of DATASETS) {
  Object.assign(meanings, loadMeanings(path, marker));
}
const problems = [];
const record = (code, check, detail) => problems.push({ code, check, detail });

for (const [code, m] of Object.entries(meanings)) {
  // A. description present
  if (!nonEmpty(m.description)) {
    record(code, "A:empty-description", "description is missing or empty");
  }

  // B. at least one source
  if (!Array.isArray(m.sources) || m.sources.length === 0) {
    record(code, "B:no-source", "entry has no sources — every meaning must cite ≥1 authoritative source");
  } else {
    // C. each source well-formed
    m.sources.forEach((s, i) => {
      if (!s || !nonEmpty(s.title)) {
        record(code, "C:bad-source", `source ${i} has an empty title`);
      }
      if (!s || !isHttpUrl(s.url)) {
        record(code, "C:bad-source", `source ${i} has an invalid url ${JSON.stringify(s?.url)}`);
      }
    });
  }

  // D. myths well-formed (optional array, but if present must be complete)
  if (m.myths !== undefined) {
    if (!Array.isArray(m.myths)) {
      record(code, "D:bad-myths", "myths must be an array when present");
    } else {
      m.myths.forEach((myth, i) => {
        if (!myth || !nonEmpty(myth.claim)) {
          record(code, "D:bad-myth", `myth ${i} has an empty claim`);
        }
        if (!myth || !nonEmpty(myth.reality)) {
          record(code, "D:bad-myth", `myth ${i} has an empty reality`);
        }
      });
    }
  }
}

// ── E–G: explainers vs omissions vs bundled capital flags ───────────────────
const root = resolve(__dirname, "..");
const read = (...p) => readFileSync(resolve(root, ...p), "utf8");
const codeSet = (text) => new Set([...text.matchAll(/"([A-Z]{2}-[A-Z0-9~]+)"/g)].map((m) => m[1]));
const bundled = new Set(
  [...read("src", "data", "capitalFlags.ts").matchAll(/^ {2}"([A-Z]{2}-[A-Z0-9~]+)": "capital-flags\//gm)].map((m) => m[1]),
);
const suppressed = new Set([
  ...codeSet(read("src", "data", "sharedCapitalFlags.ts")),
  ...codeSet(read("src", "data", "cityTerritories.ts")),
]);
const cityExplained = Object.keys(loadMeanings(DATASETS[0].path, DATASETS[0].marker));
const omitted = new Map(); // code -> reason
for (const raw of read("scripts", "data", "capital-meaning-omitted.txt").split("\n")) {
  const m = raw.match(/^([A-Z]{2}-[A-Z0-9~]+)\s+#\s*(.*)$/);
  if (m) omitted.set(m[1], m[2]);
}
// Claims about the FLAG not rendering. A bare "unreachable" is not one: reasons also say a
// council WEBSITE was unreachable, which is a claim about research, not about display.
const CANNOT_SHOW =
  /name.?guard|name mismatch|structurally unreachable|SHARED_CAPITAL_FLAGS|no distinct capital-flag box|capital-flag box renders|distinctCapitalFlagPath returns null|blocks the flag/i;

for (const code of cityExplained) {
  if (omitted.has(code)) record(code, "E:explained-and-omitted", "has an explainer and an omission line; drop the omission line");
  if (!bundled.has(code)) record(code, "F:no-bundled-flag", "explainer for a code with no bundled capital flag");
}
for (const [code, reason] of omitted) {
  if (!bundled.has(code)) record(code, "F:no-bundled-flag", "omission line for a code with no bundled capital flag");
  else if (CANNOT_SHOW.test(reason) && !suppressed.has(code)) {
    record(code, "G:stale-omission", "says the flag cannot be shown, but it is bundled and not suppressed, so it renders; research it or give the real reason");
  }
}

const total = Object.keys(meanings).length;
if (problems.length > 0) {
  console.error(`\n❌ City-flag-meaning check failed — ${problems.length} problem(s) in ${total} entr${total === 1 ? "y" : "ies"}:\n`);
  for (const p of problems) {
    console.error(`  [${p.code}] ${p.check}: ${p.detail}`);
  }
  console.error("\nSee the 'Flag-meaning explanations must be sourced' hard rule in CLAUDE.md.\n");
  process.exit(1);
}

console.log(`✓ City-flag-meaning check passed — ${total} entr${total === 1 ? "y" : "ies"}, all sourced and well-formed.`);
