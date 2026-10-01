/**
 * Generate src/data/capitalDetails.ts from Wikidata.
 * Run: node scripts/build-capital-details.mjs
 *
 * WHY THIS EXISTS: the Learn-mode "View capital" drill-down (a third card under
 * the sub-national widget) shows, for the selected subdivision's capital city:
 * its name, a population estimate + the share it represents of the national
 * population, and — via the sibling downloader — the city's own flag. This
 * generator sources the NAME and POPULATION of each subdivision's capital.
 *
 * WHY WIKIDATA: it carries an authoritative capital (P36) whose own item holds a
 * population (P1082) qualified with a point-in-time (P585) and a
 * determination-method (P459, census vs estimate), plus a flag image (P41) —
 * keyed to the ISO 3166-2 code (P300) the app already uses. Same authoritative
 * lineage as scripts/build-subdivision-capitals.mjs and
 * scripts/build-subdivision-population.mjs; the CLAUDE.md hard rule "City overlay
 * data must be sourced, never fabricated" applies here exactly as it does there.
 *
 * WHAT IT EMITS:
 *   1. src/data/capitalDetails.ts   — per ISO 3166-2 code: { name, population?,
 *      year?, basis? }. `name` is the Wikidata P36 capital's English label; it is
 *      stored so the app can confirm the population/flag belong to the SAME city
 *      the sub-national panel already displays (from src/lib/cityRoles.ts) before
 *      showing them — never a mismatched figure.
 *   2. scripts/data/capital-flag-sources.json — per code: the Commons flag
 *      filename (P41) for scripts/download-capital-flags.mjs to bundle. Not the
 *      app's data; a build-time manifest only.
 *
 * DISCIPLINE (mirrors the population generator):
 *   - Only DATED population statements are kept, so every emitted figure can
 *     state its year. The statement with the most-recent point-in-time wins.
 *   - A floor of year >= 1970 drops purely-historical city figures (e.g.
 *     Wikidata's year-800 population for Kyoto) that are not a current estimate.
 *   - basis = "census" iff the winning statement's P459 is Q39825 (census), else
 *     "estimate".
 *   - The generator only re-formats authoritative source data — it never invents
 *     a name, a figure or a flag. A capital Wikidata carries no usable data for
 *     is simply omitted, exactly like a fact-sheet row that renders only when
 *     present.
 *
 * Requires network egress to query.wikidata.org. One query per country (filtered
 * by the ISO 3166-2 prefix) keeps each request small.
 */

import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { CODE_ALIASES } from "./data/wikidata-subdivision-code-aliases.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const META = join(projectRoot, "src", "lib", "subdivisionMeta.ts");
const OUTPUT = join(projectRoot, "src", "data", "capitalDetails.ts");
const FLAG_MANIFEST = join(__dirname, "data", "capital-flag-sources.json");

const ENDPOINT = "https://query.wikidata.org/sparql";
const USER_AGENT =
  "HanaFlagGame-capital-details/1.0 (https://github.com/wladimirchagas/Hana-s-flag-game)";
const CENSUS_QID = "Q39825"; // "census" (determination method P459)
const YEAR_FLOOR = 1970; // drop purely-historical city populations

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

/** Every code SUBDIVISION_META carries, INCLUDING disputed "~" codes. */
function allMetaCodes() {
  const codes = new Set();
  for (const m of readFileSync(META, "utf8").matchAll(/code:\s*"([^"]+)"/g)) {
    codes.add(m[1].trim().toUpperCase());
  }
  return codes;
}

/**
 * Disputed/claimed territories the app renders as standalone subdivision cards.
 * Their capital (and the capital's population + flag) is fetched from the
 * TERRITORY's own Wikidata item (P36 → the capital's data). Keyed app code →
 * territory QID. Mirrors scripts/build-subdivision-capitals.mjs so the capital
 * NAME here can never disagree with the capital shown on the map overlay.
 */
const DISPUTED_TERRITORY_QIDS = {
  "TR-NC~": "Q23681", // Northern Cyprus → North Nicosia
  "GB-FK": "Q9648", // Falkland Islands → Stanley
  "GB-GI": "Q1410", // Gibraltar → Gibraltar
  "CN-TW": "Q865", // Taiwan → Taipei
  "RS-KM~": "Q1246", // Kosovo → Pristina
  "SO-SL~": "Q34754", // Somaliland → Hargeisa
  "CY-NC~": "Q23681", // Northern Cyprus under Cyprus → North Nicosia
};

/**
 * Disputed territories whose OWN item has no P36; keyed instead by the capital
 * CITY's own QID (its population/flag are read directly). Mirrors
 * DISPUTED_CAPITAL_CITY_QIDS in scripts/build-subdivision-capitals.mjs.
 */
const CAPITAL_CITY_QIDS = {
  "MA-EH~": "Q47837", // Western Sahara → El Aaiún (Laâyoune)
  "AU-NF": "Q31057", // Norfolk Island → Kingston (external territory, no P300)
  "GB-MS": "Q31006", // Montserrat → Brades (current de facto capital; Plymouth is de jure but abandoned/uninhabited since 1997)
  "CN-HK": "Q8646", // Hong Kong (self — city-territory)
  "CN-MO": "Q14773", // Macau (self — city-territory)
  "MM-18": "Q37400", // Naypyidaw Union Territory → Naypyidaw (self — city-territory)
  // North Sulawesi's item (Q5068) carries two P36 values, Manado and Gorontalo.
  // Gorontalo is the capital of the province split off in 2000 (ID-GO), so the
  // P300 pass named it as North Sulawesi's capital and bundled Gorontalo City's
  // flag. Manado is its capital (en.wikipedia "Manado"). 2026-09 audit.
  "ID-SA": "Q15847", // North Sulawesi → Manado
  // Norway, batch 8d: Agder's and Trøndelag's items list two P36 values each; the
  // pin matches SUBNATIONAL_OVERRIDE in build-cities.mjs (the county municipality's seat).
  "NO-42": "Q26772254", // Agder → Kristiansand (county hall); the county governor sits in Arendal
  "NO-50": "Q7606901", // Trøndelag → Steinkjer (administrative centre); Trondheim hosts the county mayor
  // Moldova, batch 8h: the left-bank territorial unit's item (Q648767, "Administrative-Territorial
  // Units of the Left Bank of the Dniester") carries no P36. Tiraspol is the seat of the authorities
  // that administer it, and the Transnistria item (Q907112) names it as capital.
  "MD-SN": "Q132572", // Transnistria (Stînga Nistrului) → Tiraspol
  // 2026-09 audit, batch 7d. Each item lists more than one P36, and the P300
  // pass kept one that disagrees with the map. Where the subdivision genuinely
  // has two seats, the pin names the SAME city as GAP_CAPITAL_CITY_QIDS in
  // build-subdivision-capitals.mjs, so the map and the capital card agree.
  // Wikidata also lists another place (en.wikipedia confirms the capital):
  "ID-BA": "Q11506", // Bali → Denpasar (Singaraja was the colonial capital, 1849–1960)
  "ID-SG": "Q15379", // Southeast Sulawesi → Kendari (Wikidata also lists Bau-Bau)
  "ID-KT": "Q14409", // Central Kalimantan → Palangka Raya (Pahandut is a district of the city)
  // Two seats: the seat of government where one is named, else the one the map shows.
  "CH-AR": "Q63970", // Appenzell Ausserrhoden → Herisau, seat of government and parliament (Trogen: the courts)
  "PT-20": "Q208149", // Azores → Ponta Delgada, seat of the Regional Government (Angra: judiciary; Horta: assembly)
  "IT-PU": "Q13134", // Pesaro and Urbino → Pesaro, home of the provincial offices (2022 statute: both are capitals)
  "IT-FC": "Q6662", // Forlì-Cesena → Cesena (both are capitals, decree-law 7/2024)
  "IT-OT": "Q13630", // Olbia-Tempio → Olbia (both were capitals; province abolished 2016)
  "IT-VS": "Q13656", // Medio Campidano → Sanluri (Sanluri and Villacidro were both capitals)
  "IE-TA": "Q918372", // Tipperary → Nenagh (county towns Nenagh and Clonmel; the council meets in both)
  // Ukraine moved these oblast administrations in 2014; the de jure centres are unchanged.
  "UA-09": "Q134279", // Luhansk Oblast → Luhansk (not the temporary seat Sievierodonetsk)
  "UA-14": "Q43070", // Donetsk Oblast → Donetsk (not the temporary seat Kramatorsk)
  // Guyana. Region 4's Regional Democratic Council sits at Triumph, East Coast Demerara (DPI Guyana,
  // "Substantial upgrades slated for Region Four roads, bridges"; the Ministry of Education's
  // Social Studies Made Easy gives Triumph as its regional democratic centre). Wikidata's P36 for
  // the region is the neighbouring village of Paradise, and the map showed Georgetown, the
  // national capital. Region 5's item has no P36; its centre is Fort Wellington (same sources,
  // en.wikipedia "Mahaica-Berbice"). Codex F105, 2026-09-30.
  "GY-DE": "Q6152928", // Demerara-Mahaica → Triumph
  "GY-MA": "Q2332581", // Mahaica-Berbice → Fort Wellington
};

/**
 * UK Crown Dependencies / Overseas Territories and other dependent territories
 * with their own ISO 3166-1 code (not an ISO 3166-2:{parent} code), so the
 * normal P300-keyed query never reaches them. Mirrors NO_ISO_CODE_QIDS in
 * scripts/build-subdivision-capitals.mjs — same QIDs, same reasoning, so the
 * capital NAME here can never disagree with the one shown on the map overlay.
 */
const NO_ISO_CODE_TERRITORY_QIDS = {
  "GB-JE": "Q785",
  "GB-GG": "Q25230",
  "GB-IM": "Q9676",
  "GB-IO": "Q43448",
  "GB-GS": "Q35086",
  "GB-AI": "Q25228",
  "GB-BM": "Q23635",
  "GB-VG": "Q25305",
  "GB-KY": "Q5785",
  "GB-SH": "Q192184",
  "GB-TC": "Q18221",
  "GB-PN": "Q35672",
  "AU-CC": "Q36004",
  "AU-CX": "Q31063",
  "DK-FO": "Q4628",
  "NZ-CK": "Q26988",
  "NZ-NU": "Q34020",
  "US-VI": "Q11703",
};

/**
 * Curated capital-flag source overrides — a FALLBACK/CORRECTION layer for the
 * capital city's `wdt:P41`, keyed app subdivision code → Commons flag filename.
 *
 * WHY THIS EXISTS: sourcing a capital's flag ONLY from the city's Wikidata P41
 * has two failure modes the audit (2026-07) found:
 *   1. MISS — a real municipal flag exists on Commons but is not recorded in the
 *      capital item's P41 (Sydney: the flag belongs to the City of Sydney LGA,
 *      not the "Sydney" item), so it is silently absent though the city HAS a
 *      flag. "No P41" must never be read as "no flag exists".
 *   2. WRONG — the capital item's P41 points to the NATIONAL flag (Porto/Q45's
 *      P41 is "Flag of Portugal (official).svg"), which would bundle the national
 *      flag as a "city flag" — the same class as the parent-flag-collision bug.
 * Each entry is an authoritative Commons file VISUALLY VERIFIED to be that city's
 * OWN municipal flag and NOT the national/parent flag. Never add a hypothetical,
 * proposed or fictional flag here (Commons has e.g. "Hypothetical flag of …"
 * files — those are forbidden, exactly like inventing flag content). A subdivision
 * code appears only if src/lib/subdivisionMeta.ts already carries it and
 * CAPITAL_DETAILS has the capital's name (so the app can name-match before showing
 * the flag). The national-flag guard below still applies to overrides.
 */
const CAPITAL_FLAG_SOURCE_OVERRIDES = {
  "ID-SA": "City Flag of Manado.png", // Manado — the city arms on white ("Bendera Kota Manado", PD Indonesia); matches FOTW id-sa-c.html. Wikidata's Manado item has no P41. Replaces Gorontalo City's flag, see capital-flag-rejected.json.
  "PT-13": "Flag of Porto.svg", // Porto (Porto district) — municipal flag; the city item's P41 is Portugal's national flag
  "AU-NSW": "Flag of the City of Sydney.svg", // Sydney (New South Wales) — City of Sydney banner of arms; the "Sydney" item has no P41
  "AU-WA": "Flag of Perth.svg", // Perth (Western Australia) — official City of Perth flag (St George cross + black swan; perth.wa.gov.au); no P41
  "AU-NT": "Flag of Darwin.svg", // Darwin (Northern Territory) — City of Darwin flag (arms on green/white/red); no P41
  "AU-ACT": "Flag of the Australian Capital Territory.svg", // Canberra (ACT) — the ACT flag bears the City of Canberra coat of arms and Canberra is coextensive with the territory, so it functions as the capital's own flag (blue/gold, Southern Cross + Canberra arms; adopted 25 Mar 1993). Ref: en.wikipedia.org/wiki/Flag_of_the_Australian_Capital_Territory.
  "AU-TAS": "City of Hobart Flag.svg", // Hobart (Tasmania) — official City of Hobart municipal flag (the city arms: red lion of Tasmania over the gold star of Lord Hobart; designed 1951, first flown 1953). Ref: en.wikipedia.org/wiki/Coat_of_arms_of_Hobart.
  "MY-01": "Flag of Johor Bahru.svg", // Johor Bahru — official Johor Bahru City Council flag (horizontal red/white/blue tricolour with a yellow crescent and star), owner-confirmed against FOTW (crwflags.com/fotw/flags/my-j-jbc.html). Pinned because the earlier correction pointed at "Flag of Johor Bahru, Johor.svg", which is the Johor STATE flag, not the city's.
  "MY-05": "Flag of Seremban.png", // Seremban — the Seremban City Council (Majlis Bandaraya Seremban, city since 1 Jan 2020) flag: vertical yellow/black/red with the council emblem (FOTW crwflags.com/fotw/flags/my-05-se.html). Hosted locally on en.wikipedia (PD-Malaysia). Replaces "Flag of Sungei Ujong.svg", the flag of the Sungai Ujong chiefdom — see scripts/data/capital-flag-rejected.json.
  "MY-14": "Flag of Kuala Lumpur, Malaysia.svg", // Kuala Lumpur (Federal Territory) — official DBKL city flag adopted 14 May 1990 (blue central band with a yellow crescent + 14-pointed star, red/white stripes on white above and below). NOT the national flag (blue is the dominant field). Ref: en.wikipedia.org/wiki/Flag_and_coat_of_arms_of_Kuala_Lumpur.
  "MY-16": "Flag of Putrajaya.svg", // Putrajaya (Federal Territory) — official city flag: three vertical bands blue/yellow(double-width)/blue with the Malaysian coat of arms in the yellow band. Ref: en.wikipedia.org/wiki/Flag_of_the_Federal_Territories.
  "DK-FO": "Flag of Tórshavn, Faroe Islands.svg", // Tórshavn (Faroe Islands) — the municipality's own flag, per its en.wikipedia infobox (`image_flag`); Tórshavn has no P41 statement on Wikidata.
  "UA-68": "Прапор Хмельницького.png", // Khmelnytskyi — the city flag set by council decision No. 13 of 22 March 2017: azure, the arms' three crossed arrows in a sun of SIXTEEN gold rays (khm.gov.ua "Символи міста"). This Commons file is the council's own artwork, byte-identical to khm.gov.ua/sites/default/files/flag_0.png. "Flag of Khmelnytskyi (3-2).svg" is a redraw with twelve rays (Codex F106, 2026-09-30), so it is not used. Wikidata's P41 is the square 1997 flag, which that decision made the MAYOR's standard — see capital-flag-rejected.json.
  "GT-HU": "Flag of Huehuetenango Department.svg", // Huehuetenango — the 1955 Mackepeace flag, official for both the municipality and the department since 1987 (mihuehue.com; FOTW gt-hu-hu.html). It duplicates the department flag, so SHARED_CAPITAL_FLAGS suppresses it; the old P41 file is in capital-flag-rejected.json.
  // Norway's county seats (batch 8e, SF-18). The capital pipeline reads the TOWN items,
  // which carry no P41; the flags belong to the municipality items. Each checked against
  // FOTW (no-11-03, no-18-04, no-06-02, no-04-03, no-19-02, no-20-03, no-17-02/no-17-24).
  "NO-11": "Flag of Stavanger.gif", // Stavanger — gold vine branch on blue; arms and flag by royal resolution of 11 August 1939; kept by the merged municipality of 2020 (FOTW)
  "NO-18": "Flag of Bodø.svg", // Bodø — gold sun on red, the midnight sun; arms and flag of 24 July 1959 (Lovdata 1959-07-24-1; redrawn from the National Archives' approved drawing)
  "NO-33": "Flag of Drammen.png", // Drammen — the 1930 city flag, a wavy white stripe on blue for the river; kept by the merged municipality of 2020 (FOTW, December 2024)
  "NO-34": "Flag of Hamar.png", // Hamar — black grouse on a pine on white; arms and flag approved by royal resolution of 9 July 1993 (Lovdata 1993-07-09-648)
  "NO-50": "Flag of Verran.gif", // Steinkjer — since the 2020 merger Steinkjer uses Verran's arms and flag: a white boat with square sail and topsail on blue (FOTW no-17-02, no-17-24); Steinkjer's old six-pointed-star flag is retired
  "NO-55": "Flag of Tromsø.svg", // Tromsø — white reindeer on blue; arms and flag by royal resolution of 22 July 1983 (Lovdata 1983-07-22-1290)
  "NO-56": "Flag of Vadsø.png", // Vadsø — white reindeer's head on red; arms and flag by royal resolution of 20 February 1976 (FOTW no-20-03)
  "GT-QZ": "Flag of Quetzaltenango Department.svg", // Quetzaltenango — FOTW gt-qz-qz.html: the city uses the same symbols as the department. Shared, like GT-HU; the plain tricolour is rejected.
};

/**
 * Capital codes whose Wikidata P41 resolves to the TERRITORY's own flag rather
 * than a distinct city flag — the "capital-city flag must never duplicate its
 * own subdivision's flag" rule, but for a code that isn't a plain CITY_TERRITORY
 * (Diego Garcia is one settlement within British Indian Ocean Territory, not
 * coextensive with it, so it doesn't belong in cityTerritories.ts). Diego
 * Garcia's Wikidata P41 is "Flag of the British Indian Ocean Territory
 * 2025.svg" — the territory's own flag, already the GB-IO subdivision's flag
 * (public/flags/io.svg) — so it is never a distinct city flag and must be
 * dropped rather than bundled as if it were Diego Garcia's own.
 */
const SUPPRESS_TERRITORY_DUPLICATE_FLAG = new Set(["GB-IO"]);

/**
 * Capital flags VERIFIED NOT to be the capital city's own flag — a district's or
 * a traditional chiefdom's flag that Wikidata P41, an infobox or an earlier
 * manifest attached to the capital (Kuala Terengganu got its DISTRICT's flag;
 * Seremban the Sungai Ujong chiefdom's). Shared with backfill-capital-flags.mjs
 * and enforced by check-capital-flags.mjs; each entry cites its evidence.
 */
/**
 * City-territories whose Wikidata P36 names the DISTRICT that houses city hall,
 * not a capital city. Seoul's P36 is Jung District and Busan's is Yeonje
 * District. The app shows each city-territory as its own capital (cityRoles:
 * "Capital: Seoul"), so these records only leaked — the capital widget printed
 * "Local name 중구" under "Seoul", and the Flag Master game used the Jung
 * District flag as Seoul's. The name, population, flag and endonym of the seat
 * district are never recorded for these codes. (2026-09 South Korea audit.)
 */
const SEAT_DISTRICT_NOT_A_CAPITAL = {
  "KR-11": "Jung District — the district of Seoul where City Hall stands",
  "KR-26": "Yeonje District — the district of Busan where City Hall stands",
  // Tokyo Metropolis: the app shows Tokyo as its own capital; Wikidata's P36 is
  // Shinjuku, the special ward where the Metropolitan Government stands. (2026-09.)
  "JP-13": "Shinjuku — the special ward where the Tokyo Metropolitan Government stands",
};

/**
 * Subdivision capitals Wikidata gets wrong (a P36 that names another place).
 * Shared with build-subdivision-capitals.mjs, so the capital card and the map
 * marker drop the same wrong city; check-capital-flags.mjs fails if one returns.
 */
const REJECTED_WIKIDATA_CAPITALS = JSON.parse(
  readFileSync(join(__dirname, "data", "wikidata-capital-rejected.json"), "utf8"),
);

const REJECTED_CAPITAL_FLAGS = JSON.parse(
  readFileSync(join(__dirname, "data", "capital-flag-rejected.json"), "utf8"),
);

/**
 * Curated capital-population overrides, keyed by ISO 3166-2 code →
 * { population, year, basis, source }. The Wikidata pass keeps ONLY dated
 * (P585 ≥ 1970) population statements so every figure can cite a year — correct
 * discipline, but it leaves a real GAP when a capital's Wikidata population is
 * undated even though an authoritative DATED figure plainly exists (e.g. an
 * official national-census local-authority total). This table fills those gaps
 * from a cited, dated, authoritative source (NEVER an invented or approximate
 * number — same discipline as the flag rules). Each entry MUST name its source
 * and year. Applied after the Wikidata fetch + preserve step, so it fills a
 * missing figure (and would correct a stale one) and survives every regen.
 */
const CAPITAL_POPULATION_OVERRIDES = {
  // Norway's county capitals — SSB table 07459, population 1 January 2026, of the
  // capital's MUNICIPALITY (the local authority, the unit CLAUDE.md prescribes).
  // Wikidata's town items carry urban-settlement (tettsted) counts instead, some
  // stale (Stavanger 2015, Tromsø 2017), so the figures disagreed in unit and date.
  // Oslo is Akershus's capital; Oslo municipality is also Oslo county. Batch 8d.
  "NO-11": { population: 151669, year: 2026, basis: "estimate", source: "SSB table 07459, 1 January 2026: Stavanger municipality (1103)" },
  "NO-15": { population: 33291, year: 2026, basis: "estimate", source: "SSB table 07459, 1 January 2026: Molde municipality (1506)" },
  "NO-18": { population: 53638, year: 2026, basis: "estimate", source: "SSB table 07459, 1 January 2026: Bodø municipality (1804)" },
  "NO-31": { population: 60614, year: 2026, basis: "estimate", source: "SSB table 07459, 1 January 2026: Sarpsborg municipality (3105)" },
  "NO-32": { population: 728714, year: 2026, basis: "estimate", source: "SSB table 07459, 1 January 2026: Oslo municipality (0301)" },
  "NO-33": { population: 106013, year: 2026, basis: "estimate", source: "SSB table 07459, 1 January 2026: Drammen municipality (3301)" },
  "NO-34": { population: 33817, year: 2026, basis: "estimate", source: "SSB table 07459, 1 January 2026: Hamar municipality (3403)" },
  "NO-39": { population: 60246, year: 2026, basis: "estimate", source: "SSB table 07459, 1 January 2026: Tønsberg municipality (3905)" },
  "NO-40": { population: 56906, year: 2026, basis: "estimate", source: "SSB table 07459, 1 January 2026: Skien municipality (4003)" },
  "NO-42": { population: 119287, year: 2026, basis: "estimate", source: "SSB table 07459, 1 January 2026: Kristiansand municipality (4204)" },
  "NO-46": { population: 294860, year: 2026, basis: "estimate", source: "SSB table 07459, 1 January 2026: Bergen municipality (4601)" },
  "NO-50": { population: 24007, year: 2026, basis: "estimate", source: "SSB table 07459, 1 January 2026: Steinkjer municipality (5006)" },
  "NO-55": { population: 79943, year: 2026, basis: "estimate", source: "SSB table 07459, 1 January 2026: Tromsø municipality (5501)" },
  "NO-56": { population: 5808, year: 2026, basis: "estimate", source: "SSB table 07459, 1 January 2026: Vadsø municipality (5607)" },
  // Nenagh (Tipperary) — CSO Census 2022, town of Nenagh, as cited by
  // en.wikipedia "Nenagh". Wikidata has no population for Nenagh, and an earlier
  // record gave it Clonmel's 18,369. (2026-09 audit, batch 7d.)
  "IE-TA": { population: 9895, year: 2022, basis: "census", source: "CSO Census 2022, Towns: Nenagh" },
  // Manado (North Sulawesi) — BPS mid-2025 estimate, Kota Manado Dalam Angka 2026
  // (Katalog-BPS 1102001.7171), as cited by en.wikipedia "Manado"; the 2020
  // census gave 451,916. Wikidata's latest dated figure is 461,636 (2015).
  "ID-SA": { population: 462658, year: 2025, basis: "estimate", source: "BPS, Kota Manado Dalam Angka 2026 (mid-2025 estimate)" }, // Manado
  // Triumph and Fort Wellington — Statistics Guyana, 2012 Population and Housing Census,
  // "Population by Sex" by village (Region 4 p.14: Triumph 1,865 + 1,923; Region 5 p.19: Fort
  // Wellington 17 + 16). The latest village-level count published. en.wikipedia's 118 for Fort
  // Wellington adds the neighbouring Catherina's Lust (85). Codex F105, 2026-09-30.
  "GY-DE": { population: 3788, year: 2012, basis: "census", source: "Statistics Guyana, Census 2012, Population by Sex (village): Triumph" },
  "GY-MA": { population: 33, year: 2012, basis: "census", source: "Statistics Guyana, Census 2012, Population by Sex (village): Fort Wellington" },
  // Shah Alam (Selangor / MBSA) — DOSM 2020 Census, local-authority total. Its
  // Wikidata population statement is undated, so the dated-only pass drops it.
  // Same lineage as George Town (MY-07, 794,313 / 2020 census), which the
  // Wikidata pass already emits and which matches DOSM exactly.
  "MY-10": { population: 812327, year: 2020, basis: "census", source: "DOSM 2020 Census (Majlis Bandaraya Shah Alam local-authority total)" },
  // Kota Kinabalu (Sabah / DBKK) — DOSM 2020 Census, city-hall local-authority total.
  "MY-12": { population: 500425, year: 2020, basis: "census", source: "DOSM 2020 Census (Dewan Bandaraya Kota Kinabalu local-authority total)" },
  // Kuala Lumpur (MY-14 Federal Territory) — the city IS the federal territory
  // (coterminous with Dewan Bandaraya Kuala Lumpur), so the 2020 census FT total
  // is the exact city figure. Latest authoritative enumeration (MyCensus 2020).
  "MY-14": { population: 1982112, year: 2020, basis: "census", source: "DOSM 2020 Census (Federal Territory of Kuala Lumpur, coterminous with DBKL)" },
  // Putrajaya (MY-16 Federal Territory) — the planned administrative capital is
  // coterminous with its federal territory, so the 2020 census FT total is the
  // exact city figure.
  "MY-16": { population: 109202, year: 2020, basis: "census", source: "DOSM 2020 Census (Federal Territory of Putrajaya)" },

  // Remaining Malaysian state capitals — DOSM 2020 Census, each the city's own
  // LOCAL-AUTHORITY (city/municipal council) area total, the same unit as George
  // Town/MBPP (794,313), Shah Alam/MBSA (812,327) and Kota Kinabalu/DBKK (500,425)
  // already carried, NOT the surrounding district or urban agglomeration. Figures
  // from the DOSM-2020-census local-authority table (per-council area); the unit
  // was confirmed by George Town/Shah Alam/KK matching our existing entries
  // exactly. These replace stale 2000–2017 estimates.
  // South Korea (2026-09 audit). Wikidata's latest dated figures were the wrong
  // entity or stale: Jeonju's 341,545 (2023) is about half the city's own count
  // (618,908); Jeju City's 698,358 (2024) is the
  // whole PROVINCE's figure from a Jeju Chamber of Commerce report, larger than
  // the province's own census count; Chuncheon's newest was 2015. Replaced with
  // each authority's own resident-registration count (Korean nationals) for the
  // end of August 2026.
  "KR-45": { population: 618908, year: 2026, basis: "estimate", source: "Jeonju City — 동별인구현황, resident registration (Korean nationals), end of August 2026 (www.jeonju.go.kr)" }, // Jeonju
  "KR-49": { population: 484149, year: 2026, basis: "estimate", source: "Jeju Statistics Portal — 제주인구현황, Jeju-si Korean nationals, August 2026 (www.jeju.go.kr/stats)" }, // Jeju City
  "KR-42": { population: 284783, year: 2026, basis: "estimate", source: "Chuncheon City — 주민등록 인구현황, Korean nationals, end of August 2026 (www.chuncheon.go.kr)" }, // Chuncheon
  "MY-01": { population: 858118, year: 2020, basis: "census", source: "DOSM 2020 Census (Majlis Bandaraya Johor Bahru local-authority total)" }, // Johor Bahru
  "MY-02": { population: 423868, year: 2020, basis: "census", source: "DOSM 2020 Census (Majlis Bandaraya Alor Setar local-authority total)" }, // Alor Setar
  "MY-03": { population: 396193, year: 2020, basis: "census", source: "DOSM 2020 Census (Majlis Perbandaran Kota Bharu local-authority total)" }, // Kota Bharu
  "MY-04": { population: 453904, year: 2020, basis: "census", source: "DOSM 2020 Census (Majlis Bandaraya Melaka Bersejarah local-authority total)" }, // Malacca City
  "MY-05": { population: 681541, year: 2020, basis: "census", source: "DOSM 2020 Census (Majlis Bandaraya Seremban local-authority total)" }, // Seremban
  "MY-06": { population: 548014, year: 2020, basis: "census", source: "DOSM 2020 Census (Majlis Bandaraya Kuantan local-authority total)" }, // Kuantan
  "MY-07": { population: 794313, year: 2020, basis: "census", source: "DOSM 2020 Census (Majlis Bandaraya Pulau Pinang / George Town local-authority total)" }, // George Town — pin basis to census (Wikidata carried it undated/as estimate)
  "MY-08": { population: 759952, year: 2020, basis: "census", source: "DOSM 2020 Census (Majlis Bandaraya Ipoh local-authority total)" }, // Ipoh
  "MY-09": { population: 284853, year: 2020, basis: "census", source: "DOSM 2020 Census (Majlis Perbandaran Kangar local-authority total)" }, // Kangar
  "MY-11": { population: 375424, year: 2020, basis: "census", source: "DOSM 2020 Census (Majlis Bandaraya Kuala Terengganu local-authority total)" }, // Kuala Terengganu
  "MY-13": { population: 349147, year: 2020, basis: "census", source: "DOSM 2020 Census (Kuching city — DBKU + MBKS local-authority areas)" }, // Kuching

  // Saint Peter Port (Guernsey) — its Wikidata population statement is undated,
  // so the dated-only pass drops it; the States of Guernsey's own 2021 census
  // gives an authoritative dated figure (also carried in en.wikipedia's infobox).
  "GB-GG": { population: 19295, year: 2021, basis: "census", source: "States of Guernsey 2021 Census (Saint Peter Port parish)" },
  // George Town (Cayman Islands) — no dated Wikidata statement; the Cayman
  // Islands Economics and Statistics Office's most recent official population
  // estimate (2025) for the George Town district, cited in en.wikipedia's infobox.
  "GB-KY": { population: 47009, year: 2025, basis: "estimate", source: "Cayman Islands Economics and Statistics Office, 2025 estimate (George Town district)" },
};

const yearOf = (iso) => {
  if (!iso) return null;
  // ISO 8601 point-in-time; may be BCE ("-0660-..."). Number() of the leading
  // (possibly signed) year segment gives a comparable integer.
  const m = String(iso).match(/^(-?\d{1,})-/);
  return m ? Number(m[1]) : null;
};

/** Decode a Commons Special:FilePath URL (P41 value) → the bare filename. */
function flagFilenameFromUrl(url) {
  if (!url) return null;
  const m = String(url).match(/Special:FilePath\/(.+)$/);
  if (!m) return null;
  try {
    return decodeURIComponent(m[1]).replace(/_/g, " ").trim();
  } catch {
    return null;
  }
}

/**
 * Reduce raw SPARQL rows (one per pop-statement × flag) into per-code records:
 * { name, population?, year?, basis?, flagFile? }. Keeps the most-recent dated
 * population at/after YEAR_FLOOR; keeps the first flag filename seen.
 */
function reduceRows(rows, codeOf) {
  const acc = new Map();
  for (const r of rows) {
    const code = codeOf(r);
    if (!code) continue;
    const name = r.capitalLabel?.value?.trim();
    if (!name || /^Q\d+$/.test(name)) continue; // unresolved label
    let rec = acc.get(code);
    if (!rec) {
      rec = { name, population: null, year: null, basis: null, flagFile: null };
      acc.set(code, rec);
    }
    // Population: keep the most-recent DATED statement at/after the floor.
    const pop = r.pop?.value != null ? Math.round(Number(r.pop.value)) : null;
    const yr = yearOf(r.date?.value);
    if (pop != null && Number.isFinite(pop) && pop > 0 && yr != null && yr >= YEAR_FLOOR) {
      if (rec.year == null || yr > rec.year) {
        rec.year = yr;
        rec.population = pop;
        rec.basis = r.method?.value?.endsWith(CENSUS_QID) ? "census" : "estimate";
      }
    }
    // Flag: first non-empty filename wins (wdt:P41 is best-rank only).
    if (!rec.flagFile) {
      const f = flagFilenameFromUrl(r.flag?.value);
      if (f) rec.flagFile = f;
    }
  }
  return acc;
}

async function fetchCountry(cc) {
  const q = `SELECT ?code ?capitalLabel ?pop ?date ?method ?flag WHERE {
    ?sub wdt:P300 ?code . FILTER(STRSTARTS(?code, "${cc}-"))
    ?sub wdt:P36 ?capital .
    OPTIONAL {
      ?capital p:P1082 ?ps . ?ps ps:P1082 ?pop .
      OPTIONAL { ?ps pq:P585 ?date . }
      OPTIONAL { ?ps pq:P459 ?method . }
    }
    OPTIONAL { ?capital wdt:P41 ?flag . }
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
  }`;
  const rows = await sparql(q);
  const raw = reduceRows(rows, (r) => {
    const c = r.code?.value;
    if (!c) return null;
    return (CODE_ALIASES[c] ?? c).toUpperCase();
  });
  return raw;
}

/** Details for one capital CITY QID (the QID IS the capital). */
async function fetchCityQid(code, qid) {
  const q = `SELECT ?code ?capitalLabel ?pop ?date ?method ?flag WHERE {
    BIND("${code}" AS ?code)
    BIND(wd:${qid} AS ?capital)
    OPTIONAL {
      ?capital p:P1082 ?ps . ?ps ps:P1082 ?pop .
      OPTIONAL { ?ps pq:P585 ?date . }
      OPTIONAL { ?ps pq:P459 ?method . }
    }
    OPTIONAL { ?capital wdt:P41 ?flag . }
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
  }`;
  const rows = await sparql(q);
  return reduceRows(rows, () => code.toUpperCase()).get(code.toUpperCase()) ?? null;
}

/** Details for a TERRITORY QID's capital (P36 → its data). */
async function fetchTerritoryQid(code, qid) {
  const q = `SELECT ?code ?capitalLabel ?pop ?date ?method ?flag WHERE {
    BIND("${code}" AS ?code)
    wd:${qid} wdt:P36 ?capital .
    OPTIONAL {
      ?capital p:P1082 ?ps . ?ps ps:P1082 ?pop .
      OPTIONAL { ?ps pq:P585 ?date . }
      OPTIONAL { ?ps pq:P459 ?method . }
    }
    OPTIONAL { ?capital wdt:P41 ?flag . }
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
  }`;
  const rows = await sparql(q);
  return reduceRows(rows, () => code.toUpperCase()).get(code.toUpperCase()) ?? null;
}

/**
 * National flag filename per country (ISO 3166-1 alpha-2 → set of Commons
 * filenames), used to REJECT a capital P41/override that is actually the national
 * flag — the "national flag dressed up as a city flag" failure mode. One query.
 */
async function fetchNationalFlags(ccList) {
  const values = ccList.map((c) => `"${c}"`).join(" ");
  const q = `SELECT ?iso ?flag WHERE {
    VALUES ?iso { ${values} }
    ?country wdt:P297 ?iso; wdt:P41 ?flag.
  }`;
  const map = new Map(); // CC -> Set(lowercased filename)
  try {
    for (const r of await sparql(q)) {
      const cc = r.iso.value;
      const f = flagFilenameFromUrl(r.flag?.value);
      if (!f) continue;
      if (!map.has(cc)) map.set(cc, new Set());
      map.get(cc).add(f.toLowerCase());
    }
  } catch (e) {
    console.warn(`  national-flag guard disabled (fetch failed: ${e.message})`);
  }
  return map;
}

/**
 * Load the previous flag-source manifest (code → Commons filename). Used to
 * PRESERVE flag sources this run didn't re-derive — chiefly the infobox-backfill
 * layer added by scripts/backfill-capital-flags.mjs (real municipal flags whose
 * capital item has no P41), so a plain regen of THIS generator never silently
 * drops them. Mirrors loadExisting() for capitalDetails.
 */
function loadExistingFlagSources() {
  try {
    return JSON.parse(readFileSync(FLAG_MANIFEST, "utf8"));
  } catch {
    return {};
  }
}

/** Load the previous run's rows so a transient failure can't drop coverage. */
function loadExisting() {
  const out = new Map();
  let text;
  try {
    text = readFileSync(OUTPUT, "utf8");
  } catch {
    return out;
  }
  const m = text.match(/CAPITAL_DETAILS[^{]*\{([\s\S]*?)\n\};/);
  if (!m) return out;
  for (const e of m[1].matchAll(/"([^"]+)":\s*(\{[^}]*\})/g)) {
    try {
      const v = JSON.parse(e[2]);
      if (v && v.name) out.set(e[1].toUpperCase(), v);
    } catch {
      /* skip malformed */
    }
  }
  return out;
}

async function main() {
  const appCodes = appSubdivisionCodes();
  const metaCodes = allMetaCodes();
  const codes = countryCodes();
  const details = new Map(); // code -> { name, population?, year?, basis? }
  const flagSources = {}; // code -> commons filename

  console.log("Fetching national flags for the collision guard...");
  const nationalFlags = await fetchNationalFlags([...new Set(codes)]);

  /** True when `filename` is `cc`'s national flag (rejected as a "city flag"). */
  const isNationalFlag = (cc, filename) =>
    !!filename && nationalFlags.get(cc)?.has(filename.toLowerCase());

  const record = (code, rec, allowSet) => {
    if (!rec || !rec.name) return false;
    if (!allowSet.has(code)) return false;
    const clean = { name: rec.name };
    if (rec.population != null && rec.year != null) {
      clean.population = rec.population;
      clean.year = rec.year;
      clean.basis = rec.basis ?? "estimate";
    }
    details.set(code, clean);
    // Guard: a capital city's P41 that IS the national flag is the "national flag
    // dressed up as a city flag" bug — never bundle it. A missing flag beats it.
    if (rec.flagFile && !isNationalFlag(code.split("-")[0], rec.flagFile)) {
      flagSources[code] = rec.flagFile;
    } else if (rec.flagFile) {
      console.log(`  ✗ ${code} → ${rec.flagFile} is the national flag; dropped`);
    }
    return true;
  };

  for (let i = 0; i < codes.length; i++) {
    const cc = codes[i];
    process.stdout.write(`[${i + 1}/${codes.length}] ${cc} `);
    try {
      const found = await fetchCountry(cc);
      let n = 0;
      for (const [code, rec] of found) {
        // Only codes the app renders as a normal (non-placeholder) subdivision.
        if (record(code, rec, appCodes)) n++;
      }
      console.log(`→ ${n} capital detail(s)`);
    } catch (e) {
      console.log(`→ FAILED (${e.message})`);
    }
    await sleep(200);
  }

  console.log("\nFetching disputed-territory capital details (by territory QID)...");
  for (const [code, qid] of Object.entries(DISPUTED_TERRITORY_QIDS)) {
    const CODE = code.toUpperCase();
    if (!metaCodes.has(CODE)) {
      console.log(`  ${code} (${qid}) → skipped (not in SUBDIVISION_META)`);
      continue;
    }
    try {
      const rec = await fetchTerritoryQid(code, qid);
      const ok = record(CODE, rec, metaCodes);
      console.log(`  ${code} (${qid}) → ${ok ? rec.name : "no data"}`);
    } catch (e) {
      console.log(`  ${code} (${qid}) → FAILED (${e.message})`);
    }
    await sleep(800);
  }

  console.log("\nFetching capital details by capital-city QID...");
  for (const [code, qid] of Object.entries(CAPITAL_CITY_QIDS)) {
    const CODE = code.toUpperCase();
    if (!metaCodes.has(CODE)) {
      console.log(`  ${code} (city ${qid}) → skipped (not in SUBDIVISION_META)`);
      continue;
    }
    try {
      const rec = await fetchCityQid(code, qid);
      const ok = record(CODE, rec, metaCodes);
      console.log(`  ${code} (city ${qid}) → ${ok ? rec.name : "no data"}`);
    } catch (e) {
      console.log(`  ${code} (city ${qid}) → FAILED (${e.message})`);
    }
    await sleep(800);
  }

  console.log("\nFetching capital details with no Wikidata P300 code (by territory QID)...");
  for (const [code, qid] of Object.entries(NO_ISO_CODE_TERRITORY_QIDS)) {
    const CODE = code.toUpperCase();
    if (!metaCodes.has(CODE)) {
      console.log(`  ${code} (${qid}) → skipped (not in SUBDIVISION_META)`);
      continue;
    }
    try {
      const rec = await fetchTerritoryQid(code, qid);
      const ok = record(CODE, rec, metaCodes);
      console.log(`  ${code} (${qid}) → ${ok ? rec.name : "no data"}`);
    } catch (e) {
      console.log(`  ${code} (${qid}) → FAILED (${e.message})`);
    }
    await sleep(800);
  }

  // Drop any capital flag that is really its territory's OWN flag reused, not a
  // distinct city flag (see SUPPRESS_TERRITORY_DUPLICATE_FLAG above).
  for (const code of SUPPRESS_TERRITORY_DUPLICATE_FLAG) {
    if (flagSources[code]) {
      console.log(`  ✗ ${code} → ${flagSources[code]} duplicates its own territory's flag; dropped`);
      delete flagSources[code];
    }
  }

  // Preserve any code the new run didn't return (transient failure) from the
  // previous output, so a refresh never silently drops coverage.
  let preserved = 0;
  for (const [code, v] of loadExisting()) {
    if (!details.has(code) && (appCodes.has(code) || metaCodes.has(code))) {
      details.set(code, v);
      preserved++;
    }
  }
  if (preserved) console.log(`\nPreserved ${preserved} detail(s) from the previous run.`);

  // Apply curated capital-population overrides (fill a real GAP the dated-only
  // Wikidata pass leaves when an authoritative figure exists but is undated on
  // Wikidata). Only for codes whose capital NAME is known, so the figure is
  // attached to the same city the app names. Never invents a number.
  let popOverrides = 0;
  for (const [code, ov] of Object.entries(CAPITAL_POPULATION_OVERRIDES)) {
    const CODE = code.toUpperCase();
    const existing = details.get(CODE);
    if (!existing || !existing.name) continue; // need the name to attach the figure
    if (existing.population != null && existing.year != null && existing.year >= ov.year) continue; // keep a fresher sourced figure
    details.set(CODE, {
      name: existing.name,
      population: ov.population,
      year: ov.year,
      basis: ov.basis ?? "estimate",
    });
    popOverrides++;
  }
  if (popOverrides) console.log(`Applied ${popOverrides} curated capital-population override(s).`);

  // Apply curated capital-flag source overrides (fill a MISS / correct a WRONG
  // P41). Only for codes whose capital NAME is known (so the app can name-match),
  // and never one that is the national flag.
  let overridden = 0;
  for (const [code, filename] of Object.entries(CAPITAL_FLAG_SOURCE_OVERRIDES)) {
    if (!details.has(code)) {
      console.log(`  override ${code} → skipped (no capital name in details)`);
      continue;
    }
    if (isNationalFlag(code.split("-")[0], filename)) {
      console.log(`  override ${code} → ${filename} is the national flag; refused`);
      continue;
    }
    flagSources[code] = filename;
    overridden++;
  }
  if (overridden) console.log(`Applied ${overridden} capital-flag source override(s).`);

  // Preserve infobox-backfilled flag sources (scripts/backfill-capital-flags.mjs)
  // that this P41+override run didn't re-derive, so a regen never drops them.
  let preservedFlags = 0;
  for (const [code, filename] of Object.entries(loadExistingFlagSources())) {
    if (!flagSources[code] && (appCodes.has(code) || metaCodes.has(code))) {
      flagSources[code] = filename;
      preservedFlags++;
    }
  }
  if (preservedFlags) console.log(`Preserved ${preservedFlags} backfilled flag source(s) from the previous manifest.`);

  // A city-territory's seat district is not its capital (see
  // SEAT_DISTRICT_NOT_A_CAPITAL): drop its name, population and flag.
  for (const [code, why] of Object.entries(SEAT_DISTRICT_NOT_A_CAPITAL)) {
    const had = details.delete(code);
    delete flagSources[code];
    if (had) console.log(`  ✗ ${code} → ${why}; not a capital`);
  }

  // A capital Wikidata gets wrong (see REJECTED_WIKIDATA_CAPITALS): drop its
  // name, population and flag, whichever layer above produced them.
  for (const [code, rej] of Object.entries(REJECTED_WIKIDATA_CAPITALS)) {
    if (code.startsWith("_")) continue;
    if (details.get(code)?.name === rej.capital) {
      details.delete(code);
      delete flagSources[code];
      console.log(`  ✗ ${code} → ${rej.capital} is not this subdivision's capital; dropped`);
    }
  }

  // Drop any flag verified NOT to be the capital's own (a district's or a
  // chiefdom's) — whichever layer above re-introduced it.
  for (const [code, rej] of Object.entries(REJECTED_CAPITAL_FLAGS)) {
    if (code.startsWith("_")) continue;
    if (flagSources[code] === rej.file) {
      console.log(`  ✗ ${code} → ${rej.file} is not the capital's own flag; dropped`);
      delete flagSources[code];
    }
  }

  writeOutput(details, flagSources);
}

function writeOutput(details, flagSources) {
  const byCountry = new Map();
  for (const [code, v] of details) {
    const cc = code.split("-")[0];
    if (!byCountry.has(cc)) byCountry.set(cc, []);
    byCountry.get(cc).push([code, v]);
  }
  const countries = [...byCountry.keys()].sort();

  let body = "";
  let withPop = 0;
  for (const cc of countries) {
    body += `\n  // ── ${cc} ──\n`;
    for (const [code, v] of byCountry.get(cc).sort((a, b) => a[0].localeCompare(b[0]))) {
      if (v.population != null) withPop++;
      body += `  ${JSON.stringify(code)}: ${JSON.stringify(v)},\n`;
    }
  }

  const ts = `// Auto-generated by scripts/build-capital-details.mjs — DO NOT EDIT MANUALLY
// Source: Wikidata — each subdivision's capital (P36), the capital city's most
// recent DATED population (P1082 + point-in-time P585 + method P459), and its
// flag image (P41). Powers the Learn-mode "View capital" drill-down under the
// sub-national widget. \`name\` is the Wikidata capital's English label, stored so
// the app only shows the population/flag when they belong to the SAME capital the
// sub-national panel already displays (see src/lib/cityRoles.ts capitalDetail()).
//
// To refresh: node scripts/build-capital-details.mjs (needs egress to
// query.wikidata.org), then node scripts/download-capital-flags.mjs to bundle the
// flags. The generator only re-formats authoritative source data — it never
// invents a name, figure or flag; a capital with no usable data is omitted.

export type CapitalDetail = {
  /** Capital city name (Wikidata English label). Used to confirm the population
   *  and flag belong to the capital the sub-national panel shows. */
  name: string;
  /** Most-recent dated city-proper population estimate. Optional. */
  population?: number;
  /** Reference year of the population figure. Present iff population is. */
  year?: number;
  /** How the figure was produced. Present iff population is. */
  basis?: "census" | "estimate";
};

/** Keyed by ISO 3166-2 subdivision code. */
export const CAPITAL_DETAILS: Readonly<Record<string, CapitalDetail>> = {${body}};
`;

  writeFileSync(OUTPUT, ts);
  writeFileSync(FLAG_MANIFEST, JSON.stringify(flagSources, null, 0) + "\n");
  console.log(`\nWrote ${OUTPUT}`);
  console.log(`  ${details.size} capitals (${withPop} with a dated population) across ${countries.length} countries`);
  console.log(`Wrote ${FLAG_MANIFEST}`);
  console.log(`  ${Object.keys(flagSources).length} capital flag source(s) for the downloader`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
