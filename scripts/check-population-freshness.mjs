/**
 * check-population-freshness.mjs — enforce the "population figures must use the
 * latest authoritative enumeration" hard rule (see CLAUDE.md).
 *
 * Run: node scripts/check-population-freshness.mjs
 * Also runs as part of `npm run flags:check` and the flag-integrity CI workflow.
 *
 * This is the guard against the class of bug the owner reported: a subdivision
 * left on a *superseded* census/estimate (e.g. Malaysia's states on 2010-census
 * figures instead of the 2020 census), and the metro-vs-administrative confusion
 * that put a ~9,000,000 Greater-Kuala-Lumpur metropolitan figure onto the Kuala
 * Lumpur federal territory (true 2020 census: 1,982,112).
 *
 * It performs three checks over src/data/subdivisionPopulation.ts:
 *
 *   1. FRESHNESS FLOOR — for every country listed in LATEST_ENUMERATION_YEAR
 *      (a curated, sourced table of each country's latest authoritative
 *      enumeration), no subdivision figure may predate that year. This is what
 *      forbids shipping a 2010 figure once a 2020 census exists. The table grows
 *      as audits establish a newer enumeration for more countries — it is the
 *      "hard-coded rule" the owner asked for, enforced.
 *
 *   2. PER-SUBDIVISION PLAUSIBILITY — no single subdivision may exceed its own
 *      country's national reference total (a physical impossibility that signals
 *      a wrong-entity figure).
 *
 *   3. COUNTRY-SUM PLAUSIBILITY — for countries in SUM_CHECK, the sum of all
 *      subdivision figures must not exceed the national reference total by more
 *      than a small tolerance. A metropolitan figure keyed to an administrative
 *      subdivision (the KL bug) inflates the country's subdivision sum well past
 *      the national total; this catches that even when the bad figure is "recent".
 *
 * The check never invents a figure — it only refuses stale/impossible ones, so a
 * subdivision that is honestly absent from the data is fine.
 */

import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const SUBDIV_POP = join(projectRoot, "src", "data", "subdivisionPopulation.ts");

/**
 * Latest authoritative enumeration year per country. Every subdivision figure
 * for a listed country MUST be from this year or later. Add a country here once
 * you have verified (against an authoritative national-statistics source) that a
 * newer complete enumeration exists AND you have refreshed all its subdivisions
 * to it. Each entry cites the enumeration so the floor is auditable.
 */
const LATEST_ENUMERATION_YEAR = {
  // DOSM Population & Housing Census of Malaysia 2020 (MyCensus 2020) — the
  // latest census; supersedes the 2010 census. Next census is 2030.
  MY: { year: 2020, source: "DOSM Population and Housing Census of Malaysia 2020 (MyCensus 2020)" },
  // INEGI Censo de Población y Vivienda 2020 — supersedes the 2015 Encuesta
  // Intercensal. Next census is 2030.
  MX: { year: 2020, source: "INEGI Censo de Población y Vivienda 2020" },
  // NSO Mongolia 2020 Population and Housing Census — supersedes 2015.
  MN: { year: 2020, source: "Mongolia NSO 2020 Population and Housing Census" },
  // GUS Narodowy Spis Powszechny 2021 (NSP 2021) — supersedes the 2011 census
  // and interim estimates. Keyed to the ISO letter codes the app uses.
  PL: { year: 2021, source: "Poland GUS Narodowy Spis Powszechny 2021 (NSP 2021)" },
  // SSB table 07459, population 1 January 2026, for the 15 counties in force since
  // 2024 (Svalbard from SSB's Svalbard register, same date). Batch 8d.
  NO: { year: 2026, source: "Statistics Norway (SSB) table 07459, population 1 January 2026" },
};

/**
 * Countries for which the sum of subdivision figures is checked against the
 * national reference total (tolerance below). Restricted to a curated set so a
 * country with legitimately overlapping/disputed subdivisions never
 * false-positives; add a country here only when its subdivision set is a clean
 * partition of the nation.
 */
// MX is deliberately excluded: it carries the legacy MX-DIF code (pre-2016 name
// for Mexico City) as a duplicate of MX-CMX, which double-counts ~9.2M in a naive
// subdivision sum. Its freshness floor still applies.
const SUM_CHECK = new Set(["MY", "MN", "PL", "NO"]);
const SUM_TOLERANCE = 1.1; // allow 10% for mixed reference years / rounding

function parseSubdivisions(text) {
  const m = text.match(/SUBDIVISION_POPULATION[^{]*\{([\s\S]*?)\n\};/);
  if (!m) throw new Error("could not locate SUBDIVISION_POPULATION");
  const out = [];
  const re =
    /"([^"]+)":\s*\{\s*population:\s*(\d+),\s*year:\s*(\d+),\s*basis:\s*"(\w+)"\s*\}/g;
  for (const e of m[1].matchAll(re)) {
    out.push({ code: e[1], population: Number(e[2]), year: Number(e[3]), basis: e[4] });
  }
  return out;
}

function parseNational(text) {
  const m = text.match(/NATIONAL_REFERENCE_POPULATION[^{]*\{([\s\S]*?)\n\};/);
  if (!m) throw new Error("could not locate NATIONAL_REFERENCE_POPULATION");
  const out = new Map();
  for (const e of m[1].matchAll(/"([^"]+)":\s*(\d+)/g)) out.set(e[1], Number(e[2]));
  return out;
}

function main() {
  const text = readFileSync(SUBDIV_POP, "utf8");
  const subs = parseSubdivisions(text);
  const national = parseNational(text);
  const errors = [];

  // 1. Freshness floor
  for (const s of subs) {
    const cc = s.code.split("-")[0];
    const floor = LATEST_ENUMERATION_YEAR[cc];
    if (floor && s.year < floor.year) {
      errors.push(
        `STALE  ${s.code}: year ${s.year} predates ${cc}'s latest enumeration ` +
          `(${floor.year}). Refresh from ${floor.source}.`,
      );
    }
  }

  // 2. Per-subdivision plausibility
  for (const s of subs) {
    const cc = s.code.split("-")[0];
    const nat = national.get(cc);
    if (nat && s.population > nat) {
      errors.push(
        `IMPOSSIBLE  ${s.code}: population ${s.population.toLocaleString()} exceeds ` +
          `${cc}'s national total ${nat.toLocaleString()} — wrong entity?`,
      );
    }
  }

  // 3. Country-sum plausibility
  const sums = new Map();
  for (const s of subs) {
    const cc = s.code.split("-")[0];
    sums.set(cc, (sums.get(cc) ?? 0) + s.population);
  }
  for (const cc of SUM_CHECK) {
    const nat = national.get(cc);
    const sum = sums.get(cc);
    if (nat && sum && sum > nat * SUM_TOLERANCE) {
      errors.push(
        `SUM  ${cc}: subdivisions sum to ${sum.toLocaleString()}, more than ` +
          `${SUM_TOLERANCE}× the national total ${nat.toLocaleString()} — a ` +
          `subdivision likely carries a metropolitan/wrong-entity figure.`,
      );
    }
  }

  if (errors.length) {
    console.error(`✖ population-freshness: ${errors.length} problem(s):\n`);
    for (const e of errors) console.error("  " + e);
    console.error(
      "\nFix the figure(s) from the country's latest authoritative enumeration " +
        "(see the population-freshness hard rule in CLAUDE.md). Never invent a number.",
    );
    process.exit(1);
  }

  console.log(
    `✓ population-freshness: ${subs.length} subdivisions checked; ` +
      `${Object.keys(LATEST_ENUMERATION_YEAR).length} country freshness floor(s), ` +
      `${SUM_CHECK.size} country sum-check(s) — all pass.`,
  );
}

main();
