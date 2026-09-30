// Audits the bundled flag-meaning explanations in src/data/flagMeanings.ts.
//
// Enforces the "Flag-meaning explanations must be sourced and must separate
// myth from fact" hard rule in CLAUDE.md. Like the anthem-lyrics check, this is
// a SAFETY NET, not a substitute for verifying each claim against its cited
// source by hand — it cannot tell a well-sourced fact from a plausible
// fabrication. What it CAN guarantee is that no entry ever ships uncited or
// structurally malformed.
//
// Checks (each FAILS the build):
//   A. Empty/whitespace `description`.
//   B. No `sources` at all (must have ≥1 authoritative citation).
//   C. A source with an empty title, or a url that is not a real http(s) URL.
//   D. A malformed myth: missing/empty `claim` or `reality`.
//   E. A sub-national key that is not a code the app shows (SUBDIVISION_META).
//   F. A sub-national key whose subdivision has no bundled flag, or a suppressed one.
//
// Why E–F exist (2026-09 audit, batch 8a): FlagMeaning looks an explainer up by the code the
// app shows, with no alias. Mexico City's sat under ISO's MX-CMX while the app uses Natural
// Earth's MX-DIF, so it never rendered. An explainer for a subdivision with no flag renders
// beside no flag, which the subdivision-flag rule forbids (suppression deletes the explainer).
//
// Run: node scripts/check-flag-meanings.mjs   (also part of `npm run flags:check`)

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, "..", "src", "data", "flagMeanings.ts");

// ── Load FLAG_MEANINGS without invoking tsc ─────────────────────────────────
// The object literal after `= {` is pure data (strings/arrays/objects/comments)
// — no TS-specific syntax inside — so brace-matching the literal and evaluating
// it yields the real runtime value (same approach as check-anthem-lyrics.mjs).
function loadMeanings() {
  const src = readFileSync(DATA_PATH, "utf8");
  const marker = "export const FLAG_MEANINGS";
  const start = src.indexOf(marker);
  if (start < 0) throw new Error("Could not locate FLAG_MEANINGS export");
  const eq = src.indexOf("= {", start);
  if (eq < 0) throw new Error("Could not locate FLAG_MEANINGS literal");
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

const meanings = loadMeanings();
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

// ── E–F: every sub-national explainer must be reachable and beside a flag ──
const root = resolve(__dirname, "..");
const read = (...p) => readFileSync(resolve(root, ...p), "utf8");
const between = (text, start, end) => {
  const i = text.indexOf(start);
  if (i < 0) throw new Error(`Could not locate ${start}`);
  const j = text.indexOf(end, i);
  return text.slice(i, j < 0 ? undefined : j);
};
const metaCodes = new Set([...read("src", "lib", "subdivisionMeta.ts").matchAll(/code: "([^"]+)"/g)].map((m) => m[1]));
const indexed = new Set(
  [...between(read("src", "lib", "subdivisionFlagIndex.ts"), "const FLAG_CODES", "]);").matchAll(/"([A-Z]{2}-[A-Z0-9~]+)"/g)].map(
    (m) => m[1],
  ),
);
const api = read("src", "api", "subdivisions.ts");
const overridden = new Set(
  [...between(api, "const LOCAL_FLAG_OVERRIDES", "const SUPPRESSED_SUBDIVISION_FLAGS").matchAll(/^\s*"([A-Z]{2}-[A-Z0-9~]+)":/gm)].map((m) => m[1]),
);
const suppressed = new Set(
  [...between(api, "const SUPPRESSED_SUBDIVISION_FLAGS", "]);").matchAll(/"([A-Z]{2}-[A-Z0-9~]+)"/g)].map((m) => m[1]),
);
for (const code of Object.keys(meanings)) {
  if (!code.includes("-")) continue; // national keys (ISO alpha-2)
  if (!metaCodes.has(code)) {
    record(code, "E:unreachable", "not a SUBDIVISION_META code, so the panel never looks it up; key it by the code the app shows");
  } else if (suppressed.has(code) || (!indexed.has(code) && !overridden.has(code))) {
    record(code, "F:no-flag", "its subdivision shows no flag; delete the explainer with the flag (or bundle the flag)");
  }
}

const total = Object.keys(meanings).length;
if (problems.length > 0) {
  console.error(`\n❌ Flag-meaning check failed — ${problems.length} problem(s) in ${total} entr${total === 1 ? "y" : "ies"}:\n`);
  for (const p of problems) {
    console.error(`  [${p.code}] ${p.check}: ${p.detail}`);
  }
  console.error("\nSee the 'Flag-meaning explanations must be sourced' hard rule in CLAUDE.md.\n");
  process.exit(1);
}

console.log(`✓ Flag-meaning check passed — ${total} entr${total === 1 ? "y" : "ies"}, all sourced and well-formed.`);
