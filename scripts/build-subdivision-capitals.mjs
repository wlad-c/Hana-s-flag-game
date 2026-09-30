/**
 * Generate src/data/subdivisionCapitals.ts from Wikidata.
 * Run: node scripts/build-subdivision-capitals.mjs
 *
 * WHY THIS EXISTS: the primary city dataset (src/data/cities.ts) sources each
 * subdivision's capital from Natural Earth's populated-places layer, which only
 * tags a capital for the subdivisions NE happens to carry a capital point for.
 * ~1,800 of the app's ~4,170 subdivisions (Slovenia's municipalities, Latvia's,
 * Italy's provinces, Australia's external territories such as Norfolk Island,
 * etc.) get NO capital that way, so the Learn-mode map's capital overlay shows
 * nothing for them.
 *
 * WHY WIKIDATA: it carries an authoritative capital (P36) with the capital
 * city's coordinates (P625), keyed to the ISO 3166-2 code (P300) we already
 * use — the same lineage the population generator relies on. This fills the
 * gap NE leaves, from an authoritative source, exactly as the CLAUDE.md hard
 * rule "City overlay data must be sourced, never fabricated" requires.
 *
 * FALLBACK, NOT OVERRIDE: this file is consumed by src/lib/cityRoles.ts ONLY
 * for subdivisions that have no NE capital in cities.ts — NE (already
 * reconciled against COUNTRY_FACTS) always wins where it has data. So the
 * generator emits a row ONLY for a code that (a) the app actually renders
 * (exists in SUBDIVISION_META), and (b) lacks a `capital` in cities.ts.
 *
 * Requires network egress to query.wikidata.org. One query per country
 * (filtered by the ISO 3166-2 prefix) keeps each request small. The generator
 * only re-formats authoritative source data — it never invents a capital or a
 * coordinate; a subdivision Wikidata has no P36+P625 for is simply left absent,
 * exactly like a fact-sheet row that renders only when present.
 */

import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { CODE_ALIASES } from "./data/wikidata-subdivision-code-aliases.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const META = join(projectRoot, "src", "lib", "subdivisionMeta.ts");
const CITIES = join(projectRoot, "src", "data", "cities.ts");

// Subdivision capitals Wikidata gets wrong (a P36 that names another place).
// Shared with build-capital-details.mjs so the map marker and the capital card
// drop the same wrong city. See scripts/data/wikidata-capital-rejected.json.
const REJECTED_WIKIDATA_CAPITALS = JSON.parse(
  readFileSync(join(__dirname, "data", "wikidata-capital-rejected.json"), "utf8"),
);
const OUTPUT = join(projectRoot, "src", "data", "subdivisionCapitals.ts");

const ENDPOINT = "https://query.wikidata.org/sparql";
const USER_AGENT =
  "HanaFlagGame-subdiv-cap/1.0 (https://github.com/wladimirchagas/Hana-s-flag-game)";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function sparql(query, attempt = 0) {
  const url = `${ENDPOINT}?format=json&query=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT, Accept: "application/sparql-results+json" },
    });
    if (res.status === 429 || res.status >= 500) throw new Error(`HTTP ${res.status}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.results.bindings;
  } catch (e) {
    if (attempt < 4) {
      const wait = 2000 * 2 ** attempt;
      console.warn(`  retry in ${wait}ms (${e.message})`);
      await sleep(wait);
      return sparql(query, attempt + 1);
    }
    throw e;
  }
}

/** Country codes the app actually shows subdivisions for. */
function countryCodes() {
  return [...readFileSync(META, "utf8").matchAll(/^  "([A-Z]{2})":\s*\{/gm)].map((m) => m[1]);
}

/** Every subdivision code the app renders (excludes ~ and -X# placeholders). */
function appSubdivisionCodes() {
  const codes = new Set();
  for (const m of readFileSync(META, "utf8").matchAll(/code:\s*"([^"]+)"/g)) {
    const code = m[1].trim().toUpperCase();
    if (code.endsWith("~") || /-X\d/.test(code)) continue;
    codes.add(code);
  }
  return codes;
}

/** Every code SUBDIVISION_META carries, INCLUDING disputed "~" codes (which the
 *  app still renders). Used to confirm a curated disputed capital will show. */
function allMetaCodes() {
  const codes = new Set();
  for (const m of readFileSync(META, "utf8").matchAll(/code:\s*"([^"]+)"/g)) {
    codes.add(m[1].trim().toUpperCase());
  }
  return codes;
}

/** Subdivision codes that ALREADY have a capital in cities.ts (NE-sourced). */
function codesWithNeCapital() {
  const text = readFileSync(CITIES, "utf8");
  const sec = text.slice(text.indexOf("SUBNATIONAL_CITIES"));
  const have = new Set();
  for (const m of sec.matchAll(/^ {2}"([^"]+)":\s*(\{.*\}),?$/gm)) {
    if (m[2].includes('"capital":')) have.add(m[1].toUpperCase());
  }
  return have;
}

/**
 * Subdivisions whose Wikidata item has a capital (P36) with coordinates but NO
 * P300 (ISO 3166-2 code), so the P300-prefixed country queries can never reach
 * them — mostly external territories modelled in Wikidata without an ISO code.
 * Fetched directly by QID; each QID was confirmed by checking the item's
 * English label/description matches the app's subdivision before use.
 */
const NO_ISO_CODE_QIDS = {
  "AU-NF": "Q31057", // Norfolk Island → Kingston (Australian external territory)
  // UK Crown Dependencies / Overseas Territories — each is its own ISO 3166-1
  // entity (JE, GG, IM, IO, GS, AI, BM, VG, KY, SH, TC, PN), not an ISO 3166-2:GB
  // code, so the normal P300-keyed query can never reach it. Each QID confirmed
  // against its enwiki sitelink before use (2026-07 audit).
  "GB-JE": "Q785", // Jersey → Saint Helier
  "GB-GG": "Q25230", // Bailiwick of Guernsey → Saint Peter Port
  "GB-IM": "Q9676", // Isle of Man → Douglas
  "GB-IO": "Q43448", // British Indian Ocean Territory → Diego Garcia
  "GB-GS": "Q35086", // South Georgia and the South Sandwich Islands → King Edward Point (current seat since 2001/2010; Grytviken is the former, normal-rank capital)
  "GB-AI": "Q25228", // Anguilla → The Valley
  "GB-BM": "Q23635", // Bermuda → Hamilton
  "GB-VG": "Q25305", // British Virgin Islands → Road Town
  "GB-KY": "Q5785", // Cayman Islands → George Town
  "GB-SH": "Q192184", // Saint Helena, Ascension and Tristan da Cunha → Jamestown
  "GB-TC": "Q18221", // Turks and Caicos Islands → Cockburn Town
  "GB-PN": "Q35672", // Pitcairn Islands → Adamstown
  // Other dependent territories with their own ISO 3166-1 code, same gap.
  "AU-CC": "Q36004", // Cocos (Keeling) Islands → West Island
  "AU-CX": "Q31063", // Christmas Island → Flying Fish Cove
  "DK-FO": "Q4628", // Faroe Islands → Tórshavn
  "NZ-CK": "Q26988", // Cook Islands → Avarua
  "NZ-NU": "Q34020", // Niue → Alofi
  "US-VI": "Q11703", // United States Virgin Islands → Charlotte Amalie
  // NZ-TK (Tokelau, Q36823) is intentionally NOT here: it has no wdt:P36 and its
  // own en.wikipedia infobox states "capital = None" (each atoll has its own
  // administrative centre) — a genuine absence, not a sourcing gap.
};

/**
 * Territories whose app code needs a capital but where the QID given IS the
 * capital city itself — either because the item has more than one current (equal
 * NormalRank) wdt:P36 candidate so a P36 hop would be ambiguous (Montserrat: both
 * Plymouth and Brades are NormalRank; Brades is the current de facto seat of
 * government since Plymouth was evacuated/abandoned after the 1997 volcanic
 * eruption — Plymouth remains the nominal de jure capital but is uninhabited), or
 * because the subdivision IS a single city (a "city-territory", see
 * src/data/cityTerritories.ts): Hong Kong and Macau are each "city and special
 * administrative region of China" in their own Wikidata description, and
 * Naypyidaw Union Territory is coterminous with Myanmar's capital city (which is
 * ALSO the national capital — see NATIONAL_CITIES["MM"] — so it merges into the
 * dual-ring marker like Beijing/CN-BJ already does).
 */
const NO_ISO_CODE_CITY_QIDS = {
  "GB-MS": "Q31006", // Montserrat → Brades (current de facto capital; Plymouth Q30990 is de jure but abandoned)
  "CN-HK": "Q8646", // Hong Kong (self — city-territory)
  "CN-MO": "Q14773", // Macau (self — city-territory)
  "MM-18": "Q37400", // Naypyidaw Union Territory → Naypyidaw (self — city-territory, also Myanmar's national capital)
  "GB-AKD": "Q37362", // Akrotiri and Dhekelia → Episkopi Cantonment (UK Sovereign Base Areas; no ISO 3166-2 code)
  // Sint Eustatius DOES have an ISO 3166-2 code (NL-BQ3) and a Wikidata P36, but
  // the general per-country P300 pass misses it (its item carries a second,
  // non-NL-prefixed P300 value "BQ-SE" alongside "NL-BQ3"); fetched directly by
  // QID so it isn't left without a capital while its siblings Bonaire (NL-BQ1)
  // and Saba (NL-BQ2) have one.
  "NL-BQ3": "Q26180",
  // Jan Mayen DOES have P300 = "NO-22" and a P36, but the general per-country
  // pass didn't return it either (same unexplained gap as NL-BQ3 above); fetched
  // directly by QID. Capital is Olonkinbyen, the Norwegian meteorological/Coast
  // Guard station — Jan Mayen's only settlement, not a "capital" in the usual
  // sense, but the same authoritative P36 path as every other row here.
  "NO-22": "Q14056",
};

/**
 * Disputed/claimed territories the app renders as standalone subdivision cards
 * (their code is in SUBDIVISION_META) but which the normal gap fill skips —
 * either because the code carries a "~" custom suffix (excluded as a placeholder)
 * or because Natural Earth simply tags no capital for them. Their capital is
 * fetched from the TERRITORY's own Wikidata item (P36 → the capital's P625), the
 * same authoritative path as every other row here. Keyed by app code → the
 * territory's QID; each QID was confirmed against the item's English label. The
 * game takes no political side — showing a territory's capital is neutral fact,
 * exactly as its flag and population already are.
 */
const DISPUTED_CAPITAL_QIDS = {
  "TR-NC~": "Q23681", // Northern Cyprus → North Nicosia (recognised only by Türkiye)
  "GB-FK": "Q9648", // Falkland Islands → Stanley (UK; claimed by Argentina)
  "GB-GI": "Q1410", // Gibraltar → Gibraltar (UK; claimed by Spain)
  "CN-TW": "Q865", // Taiwan → Taipei (ROC; claimed by the PRC)
  "RS-KM~": "Q1246", // Kosovo → Pristina (declared independence 2008; claimed by Serbia)
  "SO-SL~": "Q34754", // Somaliland → Hargeisa (declared independence 1991; claimed by Somalia)
  "CY-NC~": "Q23681", // Northern Cyprus under Cyprus → North Nicosia (same territory as TR-NC~)
};

/**
 * Disputed territories whose OWN Wikidata item carries no `capital` (P36) at all —
 * Western Sahara (Q6250) deliberately has none — so they are keyed instead by the
 * QID of the capital CITY itself, and the city's own coordinates (P625) are used.
 * Each city was individually confirmed to be the territory's largest city and
 * administrative centre. Neutral, sourced fact (the game takes no political side).
 */
const DISPUTED_CAPITAL_CITY_QIDS = {
  // El Aaiún (Laâyoune) — the largest city and administrative centre of Western
  // Sahara; Morocco's regional capital of Laâyoune-Sakia El Hamra and the SADR's
  // de jure claimed capital. (Western Sahara's own item Q6250 has no P36.)
  "MA-EH~": "Q47837",
};

/**
 * Subdivisions whose Wikidata item lists more than one current capital (P36),
 * usually because former capitals were never given an end date. The P300 pass
 * keeps whichever comes first, which can be a former capital. Keyed by the
 * capital CITY's QID, and applied only where Natural Earth has no capital (a
 * gap). Each must name the same city as CAPITAL_CITY_QIDS in
 * build-capital-details.mjs where the code is pinned there too.
 */
const GAP_CAPITAL_CITY_QIDS = {
  // Laguna's item lists Bay (capital until 1688), Pagsanjan (until 1858) and
  // Santa Cruz, its capital since 1858 (en.wikipedia "Laguna (province)"). 2026-09 audit.
  "PH-LAG": "Q75938", // Santa Cruz, Laguna
  // Two seats; the same city as CAPITAL_CITY_QIDS in build-capital-details.mjs,
  // so the map and the capital card agree (2026-09 audit, batch 7d).
  "IT-FC": "Q6662", // Forlì-Cesena → Cesena
  "IT-PU": "Q13134", // Pesaro and Urbino → Pesaro
  "IT-OT": "Q13630", // Olbia-Tempio → Olbia
  "IT-VS": "Q13656", // Medio Campidano → Sanluri
  "IE-TA": "Q918372", // Tipperary → Nenagh
  // Guyana: the regional centres, the same cities as CAPITAL_CITY_QIDS in build-capital-details.mjs.
  // GY-DE is a gap because build-cities.mjs blocks NE's Georgetown (NE_CAPITAL_BLOCK). Codex F105.
  "GY-DE": "Q6152928", // Demerara-Mahaica → Triumph (preferred P625 6.80873, -58.05654)
  "GY-MA": "Q2332581", // Mahaica-Berbice → Fort Wellington
};

/**
 * Keep, per code, the current capital. `wdt:P36` returns only best-rank
 * (current) values, so former capitals with an end-date qualifier are already
 * excluded. If an item still lists more than one, the first is kept and a
 * warning is printed so a genuine ambiguity is never silently resolved.
 */
function collectCapitals(rows, seenWarn) {
  const out = new Map();
  for (const r of rows) {
    const rawCode = r.code?.value;
    if (!rawCode) continue;
    const code = (CODE_ALIASES[rawCode] ?? rawCode).toUpperCase();
    const name = r.capitalLabel?.value?.trim();
    const lon = Number(r.lon?.value);
    const lat = Number(r.lat?.value);
    if (!name || !Number.isFinite(lon) || !Number.isFinite(lat)) continue;
    // A label service that couldn't resolve a name returns the bare QID.
    if (/^Q\d+$/.test(name)) continue;
    const prev = out.get(code);
    if (prev) {
      if (prev.name !== name && seenWarn) {
        console.warn(`  ⚠ ${code}: multiple current capitals (${prev.name}, ${name}) — keeping ${prev.name}`);
      }
      continue;
    }
    out.set(code, { name, lon: round(lon), lat: round(lat) });
  }
  return out;
}

const round = (n) => Math.round(n * 1e4) / 1e4;

async function fetchSubdivisionCapitals(cc) {
  const q = `SELECT ?code ?capital ?capitalLabel ?lon ?lat WHERE {
    ?sub wdt:P300 ?code . FILTER(STRSTARTS(?code, "${cc}-"))
    ?sub wdt:P36 ?capital .
    ?capital p:P625 ?coordStmt . ?coordStmt psv:P625 ?coordNode .
    ?coordNode wikibase:geoLongitude ?lon ; wikibase:geoLatitude ?lat .
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
  }`;
  return collectCapitals(await sparql(q), true);
}

async function fetchByQid(code, qid) {
  const q = `SELECT ?code ?capital ?capitalLabel ?lon ?lat WHERE {
    BIND("${code}" AS ?code)
    wd:${qid} wdt:P36 ?capital .
    ?capital p:P625 ?coordStmt . ?coordStmt psv:P625 ?coordNode .
    ?coordNode wikibase:geoLongitude ?lon ; wikibase:geoLatitude ?lat .
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
  }`;
  return collectCapitals(await sparql(q), false).get(code.toUpperCase()) ?? null;
}

/** Fetch a capital directly from the CITY's own QID (its P625), for territories
 *  whose item has no P36. `qid` IS the capital city, not the territory. */
async function fetchCityByQid(code, qid) {
  const q = `SELECT ?code ?capital ?capitalLabel ?lon ?lat WHERE {
    BIND("${code}" AS ?code)
    BIND(wd:${qid} AS ?capital)
    wd:${qid} p:P625 ?coordStmt . ?coordStmt psv:P625 ?coordNode .
    ?coordNode wikibase:geoLongitude ?lon ; wikibase:geoLatitude ?lat .
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
  }`;
  return collectCapitals(await sparql(q), false).get(code.toUpperCase()) ?? null;
}

/** Load the previous run's rows so a refresh can never silently drop coverage. */
function loadExisting() {
  const out = new Map();
  let text;
  try {
    text = readFileSync(OUTPUT, "utf8");
  } catch {
    return out;
  }
  const m = text.match(/SUBDIVISION_CAPITALS[^{]*\{([\s\S]*?)\n\};/);
  if (!m) return out;
  for (const e of m[1].matchAll(/"([^"]+)":\s*(\{[^}]*\})/g)) {
    try {
      const v = JSON.parse(e[2]);
      if (v && v.name) out.set(e[1].toUpperCase(), { name: v.name, lon: v.lon, lat: v.lat });
    } catch {
      /* skip malformed */
    }
  }
  return out;
}

async function main() {
  const appCodes = appSubdivisionCodes();
  const covered = codesWithNeCapital();
  // The gap the fallback must fill: rendered subdivisions with no NE capital.
  const gap = (code) => appCodes.has(code) && !covered.has(code);

  const codes = countryCodes();
  const capitals = new Map(); // code -> {name, lon, lat}

  for (let i = 0; i < codes.length; i++) {
    const cc = codes[i];
    process.stdout.write(`[${i + 1}/${codes.length}] ${cc} `);
    try {
      const found = await fetchSubdivisionCapitals(cc);
      let added = 0;
      for (const [code, v] of found) {
        if (gap(code)) {
          capitals.set(code, v);
          added++;
        }
      }
      console.log(`→ ${added} gap capital(s) filled (${found.size} returned)`);
    } catch (e) {
      console.log(`→ FAILED (${e.message})`);
    }
    await sleep(200); // be polite
  }

  console.log("\nFetching disputed-territory capitals (by territory QID)...");
  const metaCodes = allMetaCodes();
  for (const [code, qid] of Object.entries(DISPUTED_CAPITAL_QIDS)) {
    const CODE = code.toUpperCase();
    // These bypass the gap() filter (their code may carry "~" or simply have no
    // NE capital) but must still be a code the app renders.
    if (!metaCodes.has(CODE)) {
      console.log(`  ${code} (${qid}) → skipped (not in SUBDIVISION_META)`);
      continue;
    }
    try {
      const v = await fetchByQid(code, qid);
      if (v) {
        capitals.set(CODE, v);
        console.log(`  ${code} (${qid}) → ${v.name} (${v.lon}, ${v.lat})`);
      } else {
        console.log(`  ${code} (${qid}) → no capital+coordinates found`);
      }
    } catch (e) {
      console.log(`  ${code} (${qid}) → FAILED (${e.message})`);
    }
    await sleep(1000);
  }

  for (const [code, qid] of Object.entries(DISPUTED_CAPITAL_CITY_QIDS)) {
    const CODE = code.toUpperCase();
    if (!metaCodes.has(CODE)) {
      console.log(`  ${code} (city ${qid}) → skipped (not in SUBDIVISION_META)`);
      continue;
    }
    try {
      const v = await fetchCityByQid(code, qid);
      if (v) {
        capitals.set(CODE, v);
        console.log(`  ${code} (city ${qid}) → ${v.name} (${v.lon}, ${v.lat})`);
      } else {
        console.log(`  ${code} (city ${qid}) → no coordinates found`);
      }
    } catch (e) {
      console.log(`  ${code} (city ${qid}) → FAILED (${e.message})`);
    }
    await sleep(1000);
  }

  console.log("\nFetching capitals with no Wikidata P300 code (by QID)...");
  for (const [code, qid] of Object.entries(NO_ISO_CODE_QIDS)) {
    const CODE = code.toUpperCase();
    if (!gap(CODE)) {
      console.log(`  ${code} (${qid}) → skipped (not a gap)`);
      continue;
    }
    try {
      const v = await fetchByQid(code, qid);
      if (v) {
        capitals.set(CODE, v);
        console.log(`  ${code} (${qid}) → ${v.name} (${v.lon}, ${v.lat})`);
      } else {
        console.log(`  ${code} (${qid}) → no capital+coordinates found`);
      }
    } catch (e) {
      console.log(`  ${code} (${qid}) → FAILED (${e.message})`);
    }
    await sleep(1000);
  }

  console.log("\nFetching pinned capitals where Wikidata lists several (QID IS the city)...");
  for (const [code, qid] of Object.entries(GAP_CAPITAL_CITY_QIDS)) {
    const CODE = code.toUpperCase();
    if (!gap(CODE)) {
      console.log(`  ${code} (city ${qid}) → skipped (not a gap)`);
      continue;
    }
    try {
      const v = await fetchCityByQid(code, qid);
      if (v) {
        capitals.set(CODE, v);
        console.log(`  ${code} (city ${qid}) → ${v.name} (${v.lon}, ${v.lat})`);
      } else {
        console.log(`  ${code} (city ${qid}) → no coordinates found`);
      }
    } catch (e) {
      console.log(`  ${code} (city ${qid}) → FAILED (${e.message})`);
    }
    await sleep(1000);
  }

  console.log("\nFetching capitals with no Wikidata P300 code (QID IS the city)...");
  for (const [code, qid] of Object.entries(NO_ISO_CODE_CITY_QIDS)) {
    const CODE = code.toUpperCase();
    if (!gap(CODE)) {
      console.log(`  ${code} (city ${qid}) → skipped (not a gap)`);
      continue;
    }
    try {
      const v = await fetchCityByQid(code, qid);
      if (v) {
        capitals.set(CODE, v);
        console.log(`  ${code} (city ${qid}) → ${v.name} (${v.lon}, ${v.lat})`);
      } else {
        console.log(`  ${code} (city ${qid}) → no coordinates found`);
      }
    } catch (e) {
      console.log(`  ${code} (city ${qid}) → FAILED (${e.message})`);
    }
    await sleep(1000);
  }

  // Never let a refresh drop a code the new fetch didn't return (e.g. a
  // transient Wikidata failure) — preserve any previously-known capital.
  let preserved = 0;
  for (const [code, v] of loadExisting()) {
    if (!capitals.has(code) && gap(code)) {
      capitals.set(code, v);
      preserved++;
    }
  }
  if (preserved) console.log(`\nPreserved ${preserved} capital(s) from the previous run.`);

  for (const [code, rej] of Object.entries(REJECTED_WIKIDATA_CAPITALS)) {
    if (code.startsWith("_")) continue;
    if (capitals.get(code)?.name === rej.capital) {
      capitals.delete(code);
      console.log(`  ✗ ${code} → ${rej.capital} is not this subdivision's capital; dropped`);
    }
  }

  writeOutput(capitals);
}

function writeOutput(capitals) {
  const byCountry = new Map();
  for (const [code, v] of capitals) {
    const cc = code.split("-")[0];
    if (!byCountry.has(cc)) byCountry.set(cc, []);
    byCountry.get(cc).push([code, v]);
  }
  const countries = [...byCountry.keys()].sort();

  let body = "";
  for (const cc of countries) {
    body += `\n  // ── ${cc} ──\n`;
    for (const [code, v] of byCountry.get(cc).sort((a, b) => a[0].localeCompare(b[0]))) {
      body += `  ${JSON.stringify(code)}: ${JSON.stringify(v)},\n`;
    }
  }

  const ts = `// Auto-generated by scripts/build-subdivision-capitals.mjs — DO NOT EDIT MANUALLY
// Source: Wikidata (capital P36 + its coordinates P625, keyed by ISO 3166-2 code
// P300; a few code-less external territories fetched by QID). This is the FALLBACK
// capital layer for the Learn-mode map overlay: it fills ONLY the subdivisions that
// have no capital in src/data/cities.ts (Natural Earth carries no capital point for
// them). Natural Earth — already reconciled against COUNTRY_FACTS — always wins
// where it has data; see src/lib/cityRoles.ts.
//
// To refresh: node scripts/build-subdivision-capitals.mjs (needs egress to
// query.wikidata.org). The generator only re-formats authoritative source data — it
// never invents a capital or a coordinate; a subdivision Wikidata has no P36+P625
// for is simply omitted.

import type { City } from "./cities";

/** Keyed by ISO 3166-2 subdivision code. Fallback capitals only (see header). */
export const SUBDIVISION_CAPITALS: Readonly<Record<string, City>> = {${body}};
`;

  writeFileSync(OUTPUT, ts);
  console.log(`\nWrote ${OUTPUT}`);
  console.log(`  ${capitals.size} fallback capitals across ${countries.length} countries`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
