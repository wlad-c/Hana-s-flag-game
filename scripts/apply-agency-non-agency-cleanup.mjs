#!/usr/bin/env node
/**
 * Remove entries from NATIONAL_NEWS_AGENCIES that are newspapers, broadcasters,
 * or digital news portals — not wire / news agencies. Migrate genuine newspaper
 * titles into NATIONAL_NEWSPAPERS when the country still has a free top-5 slot
 * and the title is not already listed under another id.
 *
 * Run: node scripts/apply-agency-non-agency-cleanup.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const AGENCY_PATH = resolve(ROOT, "src/data/nationalNewsAgencies.ts");
const PAPER_PATH = resolve(ROOT, "src/data/nationalNewspapers.ts");

function loadConst(src, marker) {
  const start = src.indexOf(marker);
  if (start < 0) throw new Error(`Could not locate ${marker}`);
  const eq = src.indexOf("= {", start);
  const open = src.indexOf("{", eq);
  let depth = 0,
    i = open,
    inStr = null;
  for (; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (c === "\\") {
        i++;
        continue;
      }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") {
      inStr = c;
      continue;
    }
    if (c === "/" && src[i + 1] === "/") {
      i = src.indexOf("\n", i);
      if (i < 0) break;
      continue;
    }
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) {
        i++;
        break;
      }
    }
  }
  return Function(`"use strict"; return (${src.slice(open, i)});`)();
}

/** Normalise a title for duplicate detection across id variants. */
function normName(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/^(the|el|la|le|les|der|die|das|al)\s+/i, "")
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 32);
}

/**
 * Non-agency ids to remove from NATIONAL_NEWS_AGENCIES.
 * Newspapers / portals / broadcasters misfiled as wire agencies.
 */
const REMOVE = new Set([
  // Newspapers already in NATIONAL_NEWSPAPERS (drop-only)
  "at-der-standard",
  "bb-nation-news",
  "be-de-standaard",
  "bw-sunday-standard",
  "cn-china-daily",
  "cu-granma",
  "dz-el-khabar",
  "eg-al-ahram",
  "et-addis-standard",
  "gy-stabroek-news",
  "ie-irish-examiner",
  "in-hindustan-times",
  "it-la-stampa",
  "jm-jamaica-star",
  "jp-mainichi-shimbun",
  "ke-the-standard",
  "ke-the-star",
  "lc-the-voice",
  "na-the-namibian",
  "np-onlinekhabar",
  "ua-ukrainska-pravda",
  "za-the-star",
  "lv-lsm",
  "sr-starnieuws",
  "kg-24-kg",
  // Newspapers / portals already present under a different newspaper id
  "bd-daily-star", // = bd-the-daily-star
  "ca-the-toronto-star", // = ca-toronto-star
  "om-al-shabiba", // = om-shabiba
  "ph-the-philippine-star", // = ph-philippine-star
  "ve-efecto-cocuyo", // = ve-efectococuyo
  "lc-loop-slu", // = lc-loop
  // Broadcasters / TV / radio — not news agencies; do not migrate
  "sg-cna",
  "sb-sibc",
  "tt-ttt-news",
  "so-dalsan",
  // Newspapers / portals not already in newspapers — migrate only if room
  "ag-pointville",
  "am-hayastani-hanrapetutyun",
  "ar-el-cronista",
  "bd-bdnews24",
  "cf-le-potentiel-centrafricain",
  "cg-la-semaine-africaine",
  "cn-reference-news",
  "cr-elfaro-cr",
  "ec-lideres",
  "er-assenna",
  "fi-hufvudstadsbladet",
  "in-dainik-jagran",
  "kz-egemen-qazaqstan",
  "kz-kazakhstanskaya-pravda",
  "lc-the-star",
  "li-wirtschaft-regional",
  "ml-le-republicain",
  "mm-myanmar-now",
  "ne-le-republicain",
  "sb-solomon-star",
  "sl-standard-times",
  "st-jornal-transparencia",
  "tm-neytralny-turkmenistan",
  "tm-turkmenistan-gazeti",
  "va-vatican-news",
]);

/**
 * Migrate into newspapers when country has a free top-5 slot and the title
 * is not already listed. Business-only / niche titles are skipped even with room.
 */
const MIGRATE_IF_ROOM = new Set([
  "cf-le-potentiel-centrafricain",
  "cg-la-semaine-africaine",
  "er-assenna",
  "lc-the-star",
  "ne-le-republicain",
  "sb-solomon-star",
  "st-jornal-transparencia",
  "tm-neytralny-turkmenistan",
  "tm-turkmenistan-gazeti",
]);

/** Business / niche — remove from agencies, do not force into top-5 newspapers. */
const SKIP_MIGRATE_NICHE = new Set([
  "ar-el-cronista",
  "ec-lideres",
  "li-wirtschaft-regional",
]);

function agencyToNewspaper(a) {
  const out = { ...a };
  // Newspapers schema is identical field-wise; keep logo XOR noImageReason as-is.
  return out;
}

function main() {
  const agencySrc = readFileSync(AGENCY_PATH, "utf8");
  const paperSrc = readFileSync(PAPER_PATH, "utf8");
  const agencies = loadConst(agencySrc, "export const NATIONAL_NEWS_AGENCIES");
  const papers = loadConst(paperSrc, "export const NATIONAL_NEWSPAPERS");

  const agencyById = new Map();
  for (const list of Object.values(agencies)) {
    for (const a of list) agencyById.set(a.id, a);
  }

  const paperIds = new Set(Object.values(papers).flat().map((p) => p.id));
  const paperNamesByCc = new Map();
  for (const [cc, list] of Object.entries(papers)) {
    paperNamesByCc.set(cc, new Set(list.map((p) => normName(p.name))));
  }

  let removed = 0;
  const migrated = [];
  const droppedOnly = [];
  const emptyCountries = [];

  const nextAgencies = {};
  for (const [cc, list] of Object.entries(agencies)) {
    const kept = [];
    for (const a of list) {
      if (!REMOVE.has(a.id)) {
        kept.push(a);
        continue;
      }
      removed++;

      const names = paperNamesByCc.get(cc) || new Set();
      const already =
        paperIds.has(a.id) || names.has(normName(a.name));
      const niche = SKIP_MIGRATE_NICHE.has(a.id);
      const wantMigrate = MIGRATE_IF_ROOM.has(a.id) && !already && !niche;
      const room = (papers[cc] || []).length < 5;

      if (wantMigrate && room) {
        if (!papers[cc]) papers[cc] = [];
        papers[cc].push(agencyToNewspaper(a));
        paperIds.add(a.id);
        names.add(normName(a.name));
        paperNamesByCc.set(cc, names);
        migrated.push(`${a.id} → newspapers[${cc}] (${papers[cc].length}/5)`);
      } else {
        droppedOnly.push(
          `${a.id} (${already ? "already in newspapers" : niche ? "niche/business" : !room ? "top-5 full" : "broadcast/portal drop"})`,
        );
      }
    }
    if (kept.length > 0) nextAgencies[cc] = kept;
    else emptyCountries.push(cc);
  }

  const agencyHeader = `import type { NewsAgency } from "../types/newsAgency";

/**
 * Curated and sourced dataset of national news agencies for Learn mode.
 *
 * A news agency is a wire / newswire service that gathers and syndicates news
 * to other outlets (e.g. Reuters, AFP, Bernama, TASS). Newspapers, television
 * broadcasters, radio networks, and consumer news portals do not belong here —
 * those live in NATIONAL_NEWSPAPERS (or are omitted). Not every country has a
 * national news agency; missing is honest.
 */

export const NATIONAL_NEWS_AGENCIES: Record<string, readonly NewsAgency[]> = `;

  const paperHeader = `import type { Newspaper } from "../types/newspaper";

/**
 * Curated and sourced dataset of top national newspapers for Learn mode.
 *
 * Selection rule (owner 2026-09): up to five general-interest titles per country,
 * prioritising largest audience and highest reputation. Business/finance-only
 * papers and mass-market tabloids are excluded when a stronger broad-news
 * alternative exists. Logo XOR noImageReason on every entry.
 */

export const NATIONAL_NEWSPAPERS: Record<string, Newspaper[]> = `;

  writeFileSync(AGENCY_PATH, agencyHeader + JSON.stringify(nextAgencies, null, 2) + ";\n");
  writeFileSync(PAPER_PATH, paperHeader + JSON.stringify(papers, null, 2) + ";\n");

  const remaining = Object.values(nextAgencies).reduce((n, l) => n + l.length, 0);
  console.log(`Removed ${removed} non-agency entries.`);
  console.log(`Migrated ${migrated.length} into newspapers:`);
  for (const line of migrated) console.log(`  + ${line}`);
  console.log(`Dropped without migrate (${droppedOnly.length}):`);
  for (const line of droppedOnly) console.log(`  - ${line}`);
  console.log(`Countries now with no agency row: ${emptyCountries.sort().join(", ")}`);
  console.log(`Remaining agencies: ${remaining} across ${Object.keys(nextAgencies).length} countries`);
}

main();
