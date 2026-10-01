/**
 * Generate src/data/subdivisionPopulation.ts from Wikidata.
 * Run: node scripts/build-subdivision-population.mjs
 *
 * WHY WIKIDATA: it is the only reachable source that carries an authoritative
 * population (P1082) *with a point-in-time qualifier* (P585) and a
 * determination-method qualifier (P459, census vs estimate), keyed to the
 * ISO 3166-2 code (P300) we already use. That gives, for essentially every
 * subdivision the app shows, a population, the year of the figure, and whether
 * it is a census or an estimate — exactly what the Learn-mode panel needs.
 *
 * Requires network egress to query.wikidata.org. The query is run once per
 * country (filtered by the ISO 3166-2 prefix) so each request stays small and
 * never times out. For every code we keep the population statement with the
 * most recent point-in-time; statements with no point-in-time are ignored, so
 * every emitted entry can state its year (no undated figures are shipped).
 *
 * National reference totals (the share denominator's offline fallback) come
 * from the country item's own latest dated P1082.
 *
 * The generator only re-formats authoritative source data — it never invents a
 * figure. A subdivision with no dated Wikidata population is simply omitted,
 * exactly like the country fact-sheet rows that render only when present.
 */

import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const META = join(projectRoot, "src", "lib", "subdivisionMeta.ts");
const OUTPUT = join(projectRoot, "src", "data", "subdivisionPopulation.ts");

const ENDPOINT = "https://query.wikidata.org/sparql";
const USER_AGENT =
  "HanaFlagGame-subdiv-pop/1.0 (https://github.com/wladimirchagas/Hana-s-flag-game)";
const CENSUS_QID = "Q39825"; // "census" (determination method)

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
  const t = readFileSync(META, "utf8");
  return [...t.matchAll(/^  "([A-Z]{2})":\s*\{/gm)].map((m) => m[1]);
}

const yearOf = (iso) => (iso ? Number(iso.slice(0, 4)) : null);

// Wikidata P300 → app subdivisionMeta code remap. Shared with
// scripts/build-subdivision-capitals.mjs so the two generators stay in sync.
import { CODE_ALIASES } from "./data/wikidata-subdivision-code-aliases.mjs";

/**
 * Subdivisions whose Wikidata item carries a dated P1082 population but NO
 * P300 (ISO 3166-2 code) property at all, so the P300-filtered queries above
 * can never find them even via CODE_ALIASES (there is no Wikidata code to
 * alias from). New Zealand's two states in free association, plus its
 * external territory, are not modelled as ISO-coded subdivisions in
 * Wikidata's data model. Fetched directly by QID below; each QID was
 * confirmed by checking the item's label/description against the country it
 * belongs to before use.
 */
const NO_ISO_CODE_QIDS = {
  "NZ-CK": "Q26988", // Cook Islands — self-governing state in free association with NZ
  "NZ-NU": "Q34020", // Niue — self-governing state in free association with NZ
  "NZ-TK": "Q36823", // Tokelau — NZ external territory
};

/**
 * Subdivisions with no P300 link AND no usable code-bearing item at all —
 * found instead by an exact (or administrative-suffix-variant) name match
 * against the subdivision's own name in subdivisionMeta.ts, scoped to the
 * correct country via P17, then independently verified by checking the
 * matched item's Wikidata description/P31 classes to rule out a same-name
 * collision (a different place that merely shares the name) before being
 * trusted — exactly the verification this project's "never trust a
 * bulk-imported subdivision flag as correct by default" rule requires for
 * any unsupervised match, applied here to population data. Each entry below
 * was individually confirmed this way; many other same-name candidates found
 * by the same search were REJECTED for failing this check (e.g. it would
 * have matched Madagascar's MG-T "Antananarivo" to the city of Antananarivo
 * rather than the autonomous province; Mexico's MX-DIF to the country of
 * Mexico itself; Venezuela's VE-M "Miranda" state to an unrelated Miranda
 * Municipality in Anzoátegui State; Italy's province codes to their
 * same-named capital comune, which is a much smaller population) — those are
 * deliberately left absent rather than shipped, per the "never invent or
 * guess" rule.
 */
const VERIFIED_NAME_MATCH_QIDS = {
  "AZ-NA": "Q152825", // Naftalan — city in Azerbaijan; AZ-NA is itself a city-level Municipality
  "BS-AK": "Q341919", // Acklins — district-island of the Bahamas
  "CV-BR": "Q492528", // Brava — island of Cape Verde, coterminous with the Brava concelho
  "CV-BV": "Q110440", // Boa Vista — island of Cape Verde, coterminous with the Boa Vista concelho
  "CV-SL": "Q111989", // Sal — island of Cape Verde, coterminous with the Sal concelho
  "CV-MA": "Q492551", // Maio — island of Cape Verde, coterminous with the Maio concelho
  "GB-GS": "Q35086", // South Georgia and the South Sandwich Islands — British Overseas Territory
  "GB-IO": "Q43448", // British Indian Ocean Territory
  "IN-CH": "Q5071071", // Chandigarh district — matches the Chandigarh Union Territory
  "KN-14": "Q376738", // Trinity Palmetto Point Parish
  "MD-SN": "Q907112", // Transnistria — the Stînga Nistrului territory MD-SN represents
  "NP-KO": "Q2284812", // Bhojpur District, Koshi Province
  "NZ-CIT": "Q86771569", // Chatham Islands Territory — NZ Special Island Authority
  "PS-WBK": "Q36678", // West Bank
  "PS-GZZ": "Q39760", // Gaza Strip
  "PW-350": "Q14752295", // Peleliu — island of Palau, coterminous with Peleliu State
  "RS-KM~": "Q1255", // Kosovo and Metohija — Serbia's autonomous province (disputed territory)
  "SO-SL~": "Q34754", // Somaliland — de facto state (disputed territory, claimed by Somalia)
  "TO-01": "Q423528", // ʻEua — island of Tonga, coterminous with the ʻEua division
  "TO-04": "Q620452", // Tongatapu — main island of Tonga, coterminous with the Tongatapu division
  "TT-ETO": "Q185111", // Tobago — island of Trinidad and Tobago
  // Sint Eustatius DOES carry P300 = "NL-BQ3" and a dated P1082, but the general
  // per-country P300 pass did not return it (its item also carries a second,
  // non-NL-prefixed P300 value "BQ-SE" — possibly confusing the property-path
  // query); fetched directly by QID instead so its siblings Bonaire (NL-BQ1) and
  // Saba (NL-BQ2) aren't left with population data while Sint Eustatius has none.
  "NL-BQ3": "Q26180",
};

/**
 * Subdivisions with NO Wikidata coverage at all (no P300 code, no QID with a
 * dated P1082, no name-matchable item) — population, year and basis sourced
 * directly from each subdivision's own national statistics authority and
 * independently verified, never copied from an unverified (including
 * LLM-generated) table. Every figure below was cross-checked against the
 * primary publication before being trusted; entries that could not be pinned
 * to an exact, sourced figure are deliberately left out rather than
 * approximated, per the "never invent or guess" rule.
 */
const MANUAL_VERIFIED_POPULATION = {
  // No census is ever held in the Sovereign Base Areas (not part of the Cypriot
  // census, and the UK conducts none there); 18,195 is the widely-cited 2020
  // estimate given in the territory's Wikipedia infobox and consistent with the
  // CIA World Factbook's last published figure before its 2025 sunset. Preferred
  // over Wikidata's own P1082 statement (18,000), whose only reference is a single
  // 2026 Italian news article rather than an official statistical estimate.
  "GB-AKD": { population: 18195, year: 2020, basis: "estimate" }, // Akrotiri and Dhekelia
  // 2011 Population and Housing Census, Antigua and Barbuda Statistics Division
  "AG-04": { population: 51737, year: 2011, basis: "census" }, // Saint John
  // 2002 census, State Statistical Office of the Republic of North Macedonia
  "MK-31": { population: 11605, year: 2002, basis: "census" }, // Zajas
  "MK-28": { population: 3249, year: 2002, basis: "census" }, // Drugovo
  // 2005 regional estimate, Eritrean Ministry of Local Government (no census has been held)
  "ER-DK": { population: 83500, year: 2005, basis: "estimate" }, // Southern Red Sea
  "ER-SK": { population: 653300, year: 2005, basis: "estimate" }, // Northern Red Sea
  "ER-GB": { population: 708800, year: 2005, basis: "estimate" }, // Gash-Barka
  // 2020 census, Planning and Statistics Authority, Qatar
  "QA-RA": { population: 826786, year: 2020, basis: "census" }, // Al Rayyan
  "QA-MS": { population: 16730, year: 2020, basis: "census" }, // Madinat ash Shamal
  "QA-US": { population: 149701, year: 2020, basis: "census" }, // Umm Salal
  // 2013 census, Gambia Bureau of Statistics
  "GM-M": { population: 226018, year: 2013, basis: "census" }, // Central River
  "GM-L": { population: 82361, year: 2013, basis: "census" }, // Lower River
  "GM-W": { population: 699704, year: 2013, basis: "census" }, // West Coast
  // 2015 census, Statistics Sierra Leone — district figures summed to the province
  // (Kailahun 526,379 + Kenema 609,891 + Kono 506,100; Western Area Rural 444,270 +
  // Western Area Urban 1,055,964)
  "SL-E": { population: 1642370, year: 2015, basis: "census" }, // Eastern Province
  "SL-W": { population: 1500234, year: 2015, basis: "census" }, // Western Area
  // 2022 Census of Gibraltar, HM Government of Gibraltar
  "ES-GIB~": { population: 37936, year: 2022, basis: "census" }, // Gibraltar (claimed by Spain)
  // 2012 census, Algemeen Bureau voor de Statistiek, Suriname
  "SR-WA": { population: 118222, year: 2012, basis: "census" }, // Wanica
  // 2023 census (7th Population and Housing Census), Pakistan Bureau of Statistics
  "PK-SD": { population: 55696147, year: 2023, basis: "census" }, // Sindh
  "PK-IS": { population: 2363863, year: 2023, basis: "census" }, // Islamabad Capital Territory

  // Population estimates "al 01/01/2026" (tuttitalia.it, sourced from ISTAT)
  "IT-AO": { population: 122554, year: 2026, basis: "estimate" }, // Aosta
  "IT-RN": { population: 341244, year: 2026, basis: "estimate" }, // Rimini
  "IT-PU": { population: 349556, year: 2026, basis: "estimate" }, // Pesaro and Urbino
  "IT-TS": { population: 227840, year: 2026, basis: "estimate" }, // Trieste
  "IT-PD": { population: 934540, year: 2026, basis: "estimate" }, // Padua
  "IT-RO": { population: 227183, year: 2026, basis: "estimate" }, // Rovigo
  "IT-FE": { population: 340482, year: 2026, basis: "estimate" }, // Ferrara
  "IT-FC": { population: 394337, year: 2026, basis: "estimate" }, // Forlì-Cesena
  "IT-AN": { population: 461613, year: 2026, basis: "estimate" }, // Ancona
  "IT-MC": { population: 301689, year: 2026, basis: "estimate" }, // Macerata
  "IT-FM": { population: 166772, year: 2026, basis: "estimate" }, // Fermo
  "IT-AP": { population: 200202, year: 2026, basis: "estimate" }, // Ascoli Piceno
  "IT-CB": { population: 207723, year: 2026, basis: "estimate" }, // Campobasso
  "IT-BA": { population: 1218073, year: 2026, basis: "estimate" }, // Bari
  "IT-MT": { population: 187754, year: 2026, basis: "estimate" }, // Matera
  "IT-TP": { population: 410602, year: 2026, basis: "estimate" }, // Trapani
  "IT-ME": { population: 594074, year: 2026, basis: "estimate" }, // Messina
  "IT-PA": { population: 1195307, year: 2026, basis: "estimate" }, // Palermo
  "IT-AG": { population: 407041, year: 2026, basis: "estimate" }, // Agrigento
  "IT-CL": { population: 243501, year: 2026, basis: "estimate" }, // Caltanissetta
  "IT-RG": { population: 323144, year: 2026, basis: "estimate" }, // Ragusa
  "IT-SR": { population: 382450, year: 2026, basis: "estimate" }, // Syracuse
  "IT-SS": { population: 311128, year: 2026, basis: "estimate" }, // Sassari
  "IT-EN": { population: 151525, year: 2026, basis: "estimate" }, // Enna
  "IT-AT": { population: 207059, year: 2026, basis: "estimate" }, // Asti
  "IT-NO": { population: 365930, year: 2026, basis: "estimate" }, // Novara
  "IT-VI": { population: 855212, year: 2026, basis: "estimate" }, // Vicenza
  "IT-VR": { population: 930842, year: 2026, basis: "estimate" }, // Verona
  "IT-TV": { population: 878341, year: 2026, basis: "estimate" }, // Treviso
  "IT-PC": { population: 287745, year: 2026, basis: "estimate" }, // Piacenza
  "IT-PR": { population: 457509, year: 2026, basis: "estimate" }, // Parma
  "IT-MO": { population: 711502, year: 2026, basis: "estimate" }, // Modena
  "IT-BO": { population: 1024290, year: 2026, basis: "estimate" }, // Bologna
  "IT-PN": { population: 311114, year: 2026, basis: "estimate" }, // Pordenone
  "IT-IS": { population: 78217, year: 2026, basis: "estimate" }, // Isernia
  // Last available estimate before the province was abolished in 2016 (tuttitalia.it/ISTAT)
  "IT-CI": { population: 126324, year: 2016, basis: "estimate" }, // Carbonia-Iglesias

  // 2019 RGPH census, Institut National de la Statistique et de la Démographie, Burkina Faso (citypopulation.de)
  "BF-KMP": { population: 117682, year: 2019, basis: "census" }, // Kompienga
  "BF-LER": { population: 179423, year: 2019, basis: "census" }, // Léraba
  "BF-COM": { population: 633043, year: 2019, basis: "census" }, // Comoé
  "BF-PON": { population: 356918, year: 2019, basis: "census" }, // Poni
  "BF-NOU": { population: 98915, year: 2019, basis: "census" }, // Noumbiel
  "BF-SOM": { population: 363661, year: 2019, basis: "census" }, // Soum
  "BF-SOR": { population: 285011, year: 2019, basis: "census" }, // Sourou
  "BF-KOS": { population: 357089, year: 2019, basis: "census" }, // Kossi
  "BF-HOU": { population: 1510638, year: 2019, basis: "census" }, // Houet
  "BF-KEN": { population: 399949, year: 2019, basis: "census" }, // Kénédougou
  "BF-SEN": { population: 404716, year: 2019, basis: "census" }, // Séno
  "BF-YAG": { population: 171594, year: 2019, basis: "census" }, // Yagha
  "BF-KMD": { population: 105604, year: 2019, basis: "census" }, // Komondjari
  "BF-KOP": { population: 362644, year: 2019, basis: "census" }, // Koulpélogo
  "BF-BLG": { population: 737843, year: 2019, basis: "census" }, // Boulgou
  "BF-NAO": { population: 195816, year: 2019, basis: "census" }, // Nahouri
  "BF-SIS": { population: 337078, year: 2019, basis: "census" }, // Sissili
  "BF-IOB": { population: 265956, year: 2019, basis: "census" }, // Ioba
  "BF-BAL": { population: 297468, year: 2019, basis: "census" }, // Balé
  "BF-SNG": { population: 391617, year: 2019, basis: "census" }, // Sanguié
  "BF-TUI": { population: 329253, year: 2019, basis: "census" }, // Tuy
  "BF-BGR": { population: 153653, year: 2019, basis: "census" }, // Bougouriba
  "BF-KOT": { population: 480021, year: 2019, basis: "census" }, // Kouritenga
  "BF-GAN": { population: 482763, year: 2019, basis: "census" }, // Ganzourgou
  "BF-ZOU": { population: 312045, year: 2019, basis: "census" }, // Zoundwéogo
  "BF-ZIR": { population: 241731, year: 2019, basis: "census" }, // Ziro
  "BF-BLK": { population: 689709, year: 2019, basis: "census" }, // Boulkiemdé
  "BF-OUB": { population: 314609, year: 2019, basis: "census" }, // Oubritenga
  "BF-GOU": { population: 437310, year: 2019, basis: "census" }, // Gourma
  "BF-GNA": { population: 676476, year: 2019, basis: "census" }, // Gnagna
  "BF-BAZ": { population: 280870, year: 2019, basis: "census" }, // Bazèga
  "BF-KOW": { population: 181242, year: 2019, basis: "census" }, // Kourwéogo
  "BF-NAY": { population: 223151, year: 2019, basis: "census" }, // Nayala
  "BF-PAS": { population: 457930, year: 2019, basis: "census" }, // Passoré
  "BF-ZON": { population: 240018, year: 2019, basis: "census" }, // Zondoma
  "BF-SMT": { population: 884819, year: 2019, basis: "census" }, // Sanmatenga

  // 2018 Malawi Population and Housing Census Main Report (via Wikipedia)
  "MW-CT": { population: 234927, year: 2018, basis: "census" }, // Chitipa
  "MW-RU": { population: 229161, year: 2018, basis: "census" }, // Rumphi
  "MW-NB": { population: 284681, year: 2018, basis: "census" }, // Nkhata Bay
  "MW-LK": { population: 14527, year: 2018, basis: "census" }, // Likoma
  "MW-MZ": { population: 1161456, year: 2018, basis: "census" }, // Mzimba
  "MW-KS": { population: 842953, year: 2018, basis: "census" }, // Kasungu
  "MW-MC": { population: 602305, year: 2018, basis: "census" }, // Mchinji
  "MW-NK": { population: 393077, year: 2018, basis: "census" }, // Nkhotakota
  "MW-SA": { population: 478346, year: 2018, basis: "census" }, // Salima
  "MW-MG": { population: 1148611, year: 2018, basis: "census" }, // Mangochi
  "MW-MH": { population: 735438, year: 2018, basis: "census" }, // Machinga
  "MW-DE": { population: 830512, year: 2018, basis: "census" }, // Dedza
  "MW-LI": { population: 2626901, year: 2018, basis: "census" }, // Lilongwe
  "MW-NS": { population: 299168, year: 2018, basis: "census" }, // Nsanje
  "MW-CK": { population: 564684, year: 2018, basis: "census" }, // Chikwawa
  "MW-MW": { population: 130949, year: 2018, basis: "census" }, // Mwanza
  "MW-NE": { population: 138291, year: 2018, basis: "census" }, // Neno
  "MW-NU": { population: 659608, year: 2018, basis: "census" }, // Ntcheu
  "MW-ZO": { population: 851737, year: 2018, basis: "census" }, // Zomba
  "MW-PH": { population: 429450, year: 2018, basis: "census" }, // Phalombe
  "MW-MU": { population: 684107, year: 2018, basis: "census" }, // Mulanje
  "MW-TH": { population: 721456, year: 2018, basis: "census" }, // Thyolo
  "MW-DO": { population: 772569, year: 2018, basis: "census" }, // Dowa
  "MW-BA": { population: 438379, year: 2018, basis: "census" }, // Balaka
  "MW-CR": { population: 356875, year: 2018, basis: "census" }, // Chiradzulu
  "MW-BL": { population: 1251484, year: 2018, basis: "census" }, // Blantyre
  "MW-NI": { population: 317069, year: 2018, basis: "census" }, // Ntchisi

  // 2014 RGPH3 census, Institut National de la Statistique, Guinea (via Wikipedia)
  "GN-FA": { population: 280511, year: 2014, basis: "census" }, // Faranah
  "GN-MM": { population: 318738, year: 2014, basis: "census" }, // Mamou Prefecture
  "GN-FO": { population: 244649, year: 2014, basis: "census" }, // Forécariah Prefecture
  "GN-GU": { population: 291823, year: 2014, basis: "census" }, // Guéckédou Prefecture
  "GN-BE": { population: 325482, year: 2014, basis: "census" }, // Beyla Prefecture
  "GN-LO": { population: 175213, year: 2014, basis: "census" }, // Lola Prefecture
  "GN-KN": { population: 130205, year: 2014, basis: "census" }, // Koundara Prefecture
  "GN-ML": { population: 290320, year: 2014, basis: "census" }, // Mali Prefecture
  "GN-MC": { population: 298282, year: 2014, basis: "census" }, // Macenta Prefecture
  "GN-YO": { population: 176664, year: 2014, basis: "census" }, // Yomou Prefecture
  "GN-NZ": { population: 396118, year: 2014, basis: "census" }, // Nzérékoré Prefecture
  "GN-GA": { population: 194245, year: 2014, basis: "census" }, // Gaoual Prefecture
  "GN-SI": { population: 695449, year: 2014, basis: "census" }, // Siguiri Prefecture
  "GN-KB": { population: 101171, year: 2014, basis: "census" }, // Koubia Prefecture
  "GN-TO": { population: 122959, year: 2014, basis: "census" }, // Tougué Prefecture
  "GN-DI": { population: 195662, year: 2014, basis: "census" }, // Dinguiraye Prefecture
  "GN-BF": { population: 211063, year: 2014, basis: "census" }, // Boffa Prefecture
  "GN-DU": { population: 328418, year: 2014, basis: "census" }, // Dubréka Prefecture
  "GN-CO": { population: 264164, year: 2014, basis: "census" }, // Coyah Prefecture
  "GN-KS": { population: 283609, year: 2014, basis: "census" }, // Kissidougou Prefecture
  "GN-TE": { population: 283639, year: 2014, basis: "census" }, // Télimélé Prefecture
  "GN-DL": { population: 136320, year: 2014, basis: "census" }, // Dalaba Prefecture
  "GN-LA": { population: 318633, year: 2014, basis: "census" }, // Labé Prefecture
  "GN-PI": { population: 277059, year: 2014, basis: "census" }, // Pita Prefecture
  "GN-KO": { population: 268224, year: 2014, basis: "census" }, // Kouroussa Prefecture
  "GN-FR": { population: 96527, year: 2014, basis: "census" }, // Fria Prefecture

  // 2012 Census of Sri Lanka, Department of Census and Statistics (via Wikipedia)
  "LK-53": { population: 379541, year: 2012, basis: "census" }, // Trincomalee
  "LK-45": { population: 92238, year: 2012, basis: "census" }, // Mullaitivu
  "LK-41": { population: 583882, year: 2012, basis: "census" }, // Jaffna
  "LK-42": { population: 113510, year: 2012, basis: "census" }, // Kilinochchi
  "LK-43": { population: 99570, year: 2012, basis: "census" }, // Mannar
  "LK-12": { population: 2304833, year: 2012, basis: "census" }, // Gampaha
  "LK-11": { population: 2324349, year: 2012, basis: "census" }, // Colombo
  "LK-13": { population: 1221948, year: 2012, basis: "census" }, // Kalutara
  "LK-32": { population: 814048, year: 2012, basis: "census" }, // Matara
  "LK-33": { population: 599903, year: 2012, basis: "census" }, // Hambantota
  "LK-52": { population: 649402, year: 2012, basis: "census" }, // Ampara
  "LK-51": { population: 526567, year: 2012, basis: "census" }, // Batticaloa
  "LK-91": { population: 1088007, year: 2012, basis: "census" }, // Ratnapura
  "LK-82": { population: 451058, year: 2012, basis: "census" }, // Monaragala
  "LK-92": { population: 840648, year: 2012, basis: "census" }, // Kegalle
  "LK-81": { population: 815405, year: 2012, basis: "census" }, // Badulla
  "LK-22": { population: 484531, year: 2012, basis: "census" }, // Matale
  "LK-72": { population: 406088, year: 2012, basis: "census" }, // Polonnaruwa
  "LK-61": { population: 1618465, year: 2012, basis: "census" }, // Kurunegala
  "LK-23": { population: 711644, year: 2012, basis: "census" }, // Nuwara Eliya
  "LK-44": { population: 172115, year: 2012, basis: "census" }, // Vavuniya
  "LK-21": { population: 1375382, year: 2012, basis: "census" }, // Kandy

  // 2022 census, National Statistics Bureau, Seychelles (citypopulation.de)
  // SC-13 and SC-14 are both mislabelled "Grand'Anse Praslin" in subdivisionMeta.ts; the ISO
  // 3166-2:SC standard defines SC-13 = Grand'Anse Mahé and SC-14 = Grand'Anse Praslin, and the
  // figures below are assigned per the correct ISO code identity, not the existing (buggy) label.
  "SC-15": { population: 3934, year: 2022, basis: "census" }, // La Digue
  "SC-13": { population: 4140, year: 2022, basis: "census" }, // Grand'Anse Mahé
  "SC-06": { population: 4795, year: 2022, basis: "census" }, // Baie Lazare
  "SC-23": { population: 3871, year: 2022, basis: "census" }, // Takamaka
  "SC-05": { population: 5046, year: 2022, basis: "census" }, // Anse Royale
  "SC-04": { population: 5974, year: 2022, basis: "census" }, // Au Cap
  "SC-20": { population: 3750, year: 2022, basis: "census" }, // Pointe La Rue
  "SC-11": { population: 7263, year: 2022, basis: "census" }, // Cascade
  "SC-25": { population: 3828, year: 2022, basis: "census" }, // Roche Caiman
  "SC-19": { population: 4622, year: 2022, basis: "census" }, // Plaisance
  "SC-18": { population: 4055, year: 2022, basis: "census" }, // Mont Fleuri
  "SC-09": { population: 3129, year: 2022, basis: "census" }, // Bel Air
  "SC-16": { population: 4236, year: 2022, basis: "census" }, // La Rivière Anglaise (English River)
  "SC-03": { population: 6555, year: 2022, basis: "census" }, // Anse Etoile
  "SC-12": { population: 4496, year: 2022, basis: "census" }, // Glacis
  "SC-08": { population: 5603, year: 2022, basis: "census" }, // Beau Vallon
  "SC-10": { population: 4829, year: 2022, basis: "census" }, // Bel Ombre
  "SC-21": { population: 3243, year: 2022, basis: "census" }, // Port Glaud
  "SC-07": { population: 5063, year: 2022, basis: "census" }, // Baie Sainte Anne
  "SC-14": { population: 4344, year: 2022, basis: "census" }, // Grand'Anse Praslin
  "SC-17": { population: 3383, year: 2022, basis: "census" }, // Mont Buxton
  "SC-22": { population: 3692, year: 2022, basis: "census" }, // Saint Louis
  "SC-24": { population: 2719, year: 2022, basis: "census" }, // Les Mamelles

  // 2022 census, Maldives Bureau of Statistics (Table P2: Resident population by place of
  // enumeration and administrative division and intercensal growth rate, 2014 & 2022)
  "MV-29": { population: 9166, year: 2022, basis: "census" }, // Gnaviyani Atoll
  "MV-28": { population: 12775, year: 2022, basis: "census" }, // Gaafu Dhaalu Atoll
  "MV-27": { population: 9174, year: 2022, basis: "census" }, // Gaafu Alif Atoll
  "MV-00": { population: 10532, year: 2022, basis: "census" }, // Alif Dhaal Atoll
  "MV-26": { population: 17714, year: 2022, basis: "census" }, // Kaafu Atoll
  "MV-02": { population: 7997, year: 2022, basis: "census" }, // Alif Alif Atoll
  "MV-20": { population: 10655, year: 2022, basis: "census" }, // Baa Atoll
  "MV-03": { population: 8969, year: 2022, basis: "census" }, // Lhaviyani Atoll
  "MV-13": { population: 17565, year: 2022, basis: "census" }, // Raa Atoll
  "MV-24": { population: 13686, year: 2022, basis: "census" }, // Shaviyani Atoll
  "MV-05": { population: 14642, year: 2022, basis: "census" }, // Laamu Atoll
  "MV-08": { population: 10249, year: 2022, basis: "census" }, // Thaa Atoll
  "MV-17": { population: 6628, year: 2022, basis: "census" }, // Dhaalu Atoll
  "MV-12": { population: 5471, year: 2022, basis: "census" }, // Meemu Atoll
  "MV-14": { population: 4858, year: 2022, basis: "census" }, // Faafu Atoll
  "MV-04": { population: 1995, year: 2022, basis: "census" }, // Vaavu Atoll
  "MV-25": { population: 12481, year: 2022, basis: "census" }, // Noonu Atoll
  "MV-23": { population: 22534, year: 2022, basis: "census" }, // Haa Dhaalu Atoll
  "MV-07": { population: 14603, year: 2022, basis: "census" }, // Haa Alif Atoll

  // 2022 census, Bahamas Department of Statistics (geo-ref.net "Census Bahamas 2022"). Black
  // Point, Mangrove Cay, Central Eleuthera, Moore's Island and Central Abaco are deliberately
  // left unfilled: they do not appear as standalone rows in the primary source's district table.
  "BS-IN": { population: 831, year: 2022, basis: "census" }, // Inagua
  "BS-MG": { population: 203, year: 2022, basis: "census" }, // Mayaguana
  "BS-CK": { population: 293, year: 2022, basis: "census" }, // Crooked Island
  "BS-LI": { population: 2718, year: 2022, basis: "census" }, // Long Island
  "BS-SS": { population: 819, year: 2022, basis: "census" }, // San Salvador Island
  "BS-SA": { population: 3666, year: 2022, basis: "census" }, // South Andros
  "BS-NS": { population: 4029, year: 2022, basis: "census" }, // North Andros
  "BS-NE": { population: 3893, year: 2022, basis: "census" }, // North Eleuthera
  "BS-SE": { population: 5211, year: 2022, basis: "census" }, // South Eleuthera
  "BS-WG": { population: 5884, year: 2022, basis: "census" }, // West Grand Bahama
  "BS-EG": { population: 11194, year: 2022, basis: "census" }, // East Grand Bahama
  "BS-SO": { population: 6523, year: 2022, basis: "census" }, // South Abaco
  "BS-NO": { population: 10172, year: 2022, basis: "census" }, // North Abaco
  "BS-HI": { population: 1843, year: 2022, basis: "census" }, // Harbour Island

  // 2006 census, Libyan General Information Authority (via Wikipedia's 22-district table).
  // Ghadames, Nuqat al Khams, Ajdabiya, Al Qubbah and Mizdah are deliberately left unfilled:
  // they appear only in the older, uncited 32-district (2001-2007) table.
  "LY-MQ": { population: 78621, year: 2006, basis: "census" }, // Murzuq
  "LY-BU": { population: 159536, year: 2006, basis: "census" }, // Butnan
  "LY-WS": { population: 78532, year: 2006, basis: "census" }, // Ash Shati (Wadi al Shatii)
  "LY-GT": { population: 23518, year: 2006, basis: "census" }, // Ghat
  "LY-MI": { population: 550938, year: 2006, basis: "census" }, // Misrata
  "LY-MB": { population: 432202, year: 2006, basis: "census" }, // Murqub
  "LY-TN": { population: 1065405, year: 2006, basis: "census" }, // Tripoli District
  "LY-ZA": { population: 290993, year: 2006, basis: "census" }, // Zawiya
  "LY-JA": { population: 203156, year: 2006, basis: "census" }, // Jabal al Akhdar
  "LY-MJ": { population: 185848, year: 2006, basis: "census" }, // Marj
  "LY-JI": { population: 453198, year: 2006, basis: "census" }, // Jafara
  "LY-JU": { population: 52342, year: 2006, basis: "census" }, // Jufra
  "LY-SB": { population: 134162, year: 2006, basis: "census" }, // Sabha
  "LY-WD": { population: 76858, year: 2006, basis: "census" }, // Wadi al Hayaa (Wadi al Hayat)

  // Papua New Guinea, National Statistical Office 2011 Census (via citypopulation.de aggregation)
  "PG-CPM": { population: 269756, year: 2011, basis: "census" }, // Central
  "PG-CPK": { population: 376473, year: 2011, basis: "census" }, // Chimbu (Simbu)
  "PG-EBR": { population: 328369, year: 2011, basis: "census" }, // East New Britain
  "PG-ESW": { population: 450530, year: 2011, basis: "census" }, // East Sepik
  "PG-EHG": { population: 579825, year: 2011, basis: "census" }, // Eastern Highlands
  "PG-EPW": { population: 432045, year: 2011, basis: "census" }, // Enga
  "PG-GPK": { population: 158197, year: 2011, basis: "census" }, // Gulf
  "PG-MPM": { population: 493906, year: 2011, basis: "census" }, // Madang
  "PG-MRL": { population: 60485, year: 2011, basis: "census" }, // Manus
  "PG-MBA": { population: 276512, year: 2011, basis: "census" }, // Milne Bay
  "PG-MPL": { population: 674810, year: 2011, basis: "census" }, // Morobe
  "PG-NIK": { population: 194067, year: 2011, basis: "census" }, // New Ireland
  "PG-NPP": { population: 186309, year: 2011, basis: "census" }, // Oro (Northern)
  "PG-NSB": { population: 249358, year: 2011, basis: "census" }, // Bougainville
  "PG-SAN": { population: 248411, year: 2011, basis: "census" }, // Sandaun (West Sepik)
  "PG-SHM": { population: 510245, year: 2011, basis: "census" }, // Southern Highlands
  "PG-WBK": { population: 264264, year: 2011, basis: "census" }, // West New Britain

  // Solomon Islands, National Statistics Office (SINSO) 2019 Census
  "SB-CE": { population: 30318, year: 2019, basis: "census" }, // Central
  "SB-CH": { population: 30775, year: 2019, basis: "census" }, // Choiseul
  "SB-GU": { population: 154022, year: 2019, basis: "census" }, // Guadalcanal
  "SB-CT": { population: 129569, year: 2019, basis: "census" }, // Honiara
  "SB-IS": { population: 31420, year: 2019, basis: "census" }, // Isabel
  "SB-MK": { population: 51587, year: 2019, basis: "census" }, // Makira-Ulawa
  "SB-ML": { population: 172740, year: 2019, basis: "census" }, // Malaita
  "SB-RB": { population: 4100, year: 2019, basis: "census" }, // Rennell and Bellona
  "SB-TE": { population: 22319, year: 2019, basis: "census" }, // Temotu
  "SB-WE": { population: 94106, year: 2019, basis: "census" }, // Western

  // Vanuatu, National Statistics Office 2020 Census. Sanma and Shefa omitted —
  // two independent queries against the same secondary source returned
  // conflicting figures that could not be reconciled against the primary PDF.
  "VU-MAP": { population: 42499, year: 2020, basis: "census" }, // Malampa
  "VU-PAM": { population: 35607, year: 2020, basis: "census" }, // Penama
  "VU-TAE": { population: 45714, year: 2020, basis: "census" }, // Tafea
  "VU-TOB": { population: 11330, year: 2020, basis: "census" }, // Torba

  // Samoa, Samoa Bureau of Statistics 2021 Census
  "WS-AA": { population: 24563, year: 2021, basis: "census" }, // A'ana
  "WS-AL": { population: 5000, year: 2021, basis: "census" }, // Aiga-i-le-Tai
  "WS-AT": { population: 23926, year: 2021, basis: "census" }, // Atua
  "WS-FA": { population: 14831, year: 2021, basis: "census" }, // Fa'asaleleaga
  "WS-GE": { population: 5548, year: 2021, basis: "census" }, // Gaga'emauga
  "WS-GI": { population: 4797, year: 2021, basis: "census" }, // Gaga'ifomauga
  "WS-PA": { population: 9251, year: 2021, basis: "census" }, // Palauli
  "WS-SA": { population: 5403, year: 2021, basis: "census" }, // Satupa'itea
  "WS-TU": { population: 103801, year: 2021, basis: "census" }, // Tuamasaga
  "WS-VF": { population: 1680, year: 2021, basis: "census" }, // Va'a-o-Fonoti
  "WS-VS": { population: 6757, year: 2021, basis: "census" }, // Vaisigano

  // Tonga, Statistics Department 2021 Census
  "TO-02": { population: 5665, year: 2021, basis: "census" }, // Ha'apai
  "TO-03": { population: 1148, year: 2021, basis: "census" }, // Niuas
  "TO-04": { population: 74320, year: 2021, basis: "census" }, // Tongatapu
  "TO-05": { population: 14182, year: 2021, basis: "census" }, // Vava'u
  "TO-01": { population: 4864, year: 2021, basis: "census" }, // 'Eua

  // Bermuda, Dept of Statistics 2016 Census Parish Profiles (gov.bm). BM-SG
  // omitted — two conflicting figures (1,298 vs 1,527) both attributed to the
  // 2016 census, neither resolvable against a single confirmed source PDF.
  "BM-DEV": { population: 8127, year: 2016, basis: "census" }, // Devonshire
  "BM-HAM": { population: 4131, year: 2016, basis: "census" }, // Hamilton Parish
  "BM-HA": { population: 854, year: 2016, basis: "census" }, // City of Hamilton
  "BM-PAG": { population: 4708, year: 2016, basis: "census" }, // Paget
  "BM-PEM": { population: 10118, year: 2016, basis: "census" }, // Pembroke
  "BM-SAN": { population: 8593, year: 2016, basis: "census" }, // Sandys
  "BM-SGE": { population: 4549, year: 2016, basis: "census" }, // St. George's Parish
  "BM-SMI": { population: 4773, year: 2016, basis: "census" }, // Smith's
  "BM-SOU": { population: 5816, year: 2016, basis: "census" }, // Southampton
  "BM-WAR": { population: 8077, year: 2016, basis: "census" }, // Warwick

  // Trinidad and Tobago, CSO 2011 Population & Housing Census Community
  // Register (official xlsx, cso.gov.tt), subtotal rows
  "TT-POS": { population: 37074, year: 2011, basis: "census" }, // Port of Spain
  "TT-SFO": { population: 55419, year: 2011, basis: "census" }, // San Fernando
  "TT-ARI": { population: 33606, year: 2011, basis: "census" }, // Arima
  "TT-CHA": { population: 83516, year: 2011, basis: "census" }, // Chaguanas
  "TT-PTF": { population: 20083, year: 2011, basis: "census" }, // Point Fortin
  "TT-DMN": { population: 105910, year: 2011, basis: "census" }, // Diego Martin
  "TT-SJL": { population: 156792, year: 2011, basis: "census" }, // San Juan-Laventille
  "TT-TUP": { population: 212170, year: 2011, basis: "census" }, // Tunapuna-Piarco
  "TT-CTT": { population: 80049, year: 2011, basis: "census" }, // Couva-Tabaquite-Talparo
  "TT-RCM": { population: 33486, year: 2011, basis: "census" }, // Mayaro-Rio Claro
  "TT-PRT": { population: 72175, year: 2011, basis: "census" }, // Princes Town
  "TT-SGE": { population: 87866, year: 2011, basis: "census" }, // Sangre Grande
  "TT-SIP": { population: 152217, year: 2011, basis: "census" }, // Siparia
  "TT-PED": { population: 55708, year: 2011, basis: "census" }, // Penal-Debe

  // Saint Vincent and the Grenadines, Statistical Office 2012 Census
  // Preliminary Report. Only the Grenadines split maps cleanly to an ISO
  // parish; the 13 census divisions don't align 1:1 with the other 5 parishes.
  "VC-06": { population: 10234, year: 2012, basis: "census" }, // Grenadines (Northern 6,184 + Southern 4,050)

  // Grenada, Central Statistical Office 2011 National Population & Housing
  // Census Report (Table 1.3.1/1.3.2) — supersedes the conflicting
  // "Population Estimates by Parish 2011-2019" secondary series; all 7
  // figures sum exactly to the document's stated total of 106,669.
  "GD-01": { population: 26501, year: 2011, basis: "census" }, // Saint Andrew
  "GD-02": { population: 12877, year: 2011, basis: "census" }, // Saint David
  "GD-03": { population: 38249, year: 2011, basis: "census" }, // Saint George
  "GD-04": { population: 8469, year: 2011, basis: "census" }, // Saint John
  "GD-05": { population: 4408, year: 2011, basis: "census" }, // Saint Mark
  "GD-06": { population: 10504, year: 2011, basis: "census" }, // Saint Patrick
  "GD-10": { population: 5661, year: 2011, basis: "census" }, // Carriacou and Petite Martinique

  // Haiti, IHSI/DSDS "Estimations Désagrégées de la Population Haïtienne en
  // 2024" (July 2024) — all 10 figures sum exactly to the document's stated
  // national total of 11,867,032.
  "HT-OU": { population: 4038816, year: 2024, basis: "estimate" }, // Ouest
  "HT-SE": { population: 749803, year: 2024, basis: "estimate" }, // Sud-Est
  "HT-ND": { population: 1172476, year: 2024, basis: "estimate" }, // Nord
  "HT-NE": { population: 430925, year: 2024, basis: "estimate" }, // Nord-Est
  "HT-AR": { population: 1896380, year: 2024, basis: "estimate" }, // Artibonite
  "HT-CE": { population: 852280, year: 2024, basis: "estimate" }, // Centre
  "HT-SD": { population: 955607, year: 2024, basis: "estimate" }, // Sud
  "HT-GA": { population: 570687, year: 2024, basis: "estimate" }, // Grand'Anse
  "HT-NO": { population: 797013, year: 2024, basis: "estimate" }, // Nord-Ouest
  "HT-NI": { population: 403045, year: 2024, basis: "estimate" }, // Nippes

  // Zambia, Zambia Statistics Agency 2022 Census of Population and Housing
  // (checksum-verified against the national total)
  "ZM-01": { population: 1043159, year: 2022, basis: "census" }, // Western
  "ZM-02": { population: 2204426, year: 2022, basis: "census" }, // Central
  "ZM-03": { population: 2191047, year: 2022, basis: "census" }, // Eastern
  "ZM-04": { population: 1156629, year: 2022, basis: "census" }, // Luapula
  "ZM-05": { population: 1747177, year: 2022, basis: "census" }, // Northern
  "ZM-06": { population: 961385, year: 2022, basis: "census" }, // North-Western
  "ZM-07": { population: 1855426, year: 2022, basis: "census" }, // Southern
  "ZM-08": { population: 2706609, year: 2022, basis: "census" }, // Copperbelt
  "ZM-09": { population: 3360918, year: 2022, basis: "census" }, // Lusaka
  "ZM-10": { population: 1042841, year: 2022, basis: "census" }, // Muchinga

  // Benin, INSAE RGPH-4 2013 census (instad.bj)
  "BJ-AL": { population: 861166, year: 2013, basis: "census" }, // Alibori
  "BJ-AK": { population: 769337, year: 2013, basis: "census" }, // Atakora
  "BJ-AQ": { population: 1396671, year: 2013, basis: "census" }, // Atlantique
  "BJ-BO": { population: 1212646, year: 2013, basis: "census" }, // Borgou
  "BJ-CO": { population: 717763, year: 2013, basis: "census" }, // Collines
  "BJ-KO": { population: 741895, year: 2013, basis: "census" }, // Kouffo
  "BJ-LI": { population: 678874, year: 2013, basis: "census" }, // Littoral (Cotonou)
  "BJ-DO": { population: 543130, year: 2013, basis: "census" }, // Donga
  "BJ-MO": { population: 495307, year: 2013, basis: "census" }, // Mono
  "BJ-OU": { population: 1100404, year: 2013, basis: "census" }, // Ouémé
  "BJ-PL": { population: 622372, year: 2013, basis: "census" }, // Plateau
  "BJ-ZO": { population: 851580, year: 2013, basis: "census" }, // Zou

  // Republic of the Congo, INS-Congo RGPH-5 2023 census (checksum-verified
  // against press-cited totals)
  "CG-BZV": { population: 2295127, year: 2023, basis: "census" }, // Brazzaville
  "CG-16": { population: 1268706, year: 2023, basis: "census" }, // Pointe-Noire
  "CG-11": { population: 275531, year: 2023, basis: "census" }, // Bouenza
  "CG-8": { population: 269408, year: 2023, basis: "census" }, // Cuvette
  "CG-15": { population: 94254, year: 2023, basis: "census" }, // Cuvette-Ouest
  "CG-7": { population: 145378, year: 2023, basis: "census" }, // Likouala
  "CG-2": { population: 104728, year: 2023, basis: "census" }, // Lékoumou
  "CG-9": { population: 259884, year: 2023, basis: "census" }, // Niari
  "CG-14": { population: 261636, year: 2023, basis: "census" }, // Plateaux
  "CG-12": { population: 308162, year: 2023, basis: "census" }, // Pool
  "CG-13": { population: 104645, year: 2023, basis: "census" }, // Sangha
  "CG-5": { population: 149375, year: 2023, basis: "census" }, // Kouilou

  // Comoros, INSEED RGPH 2017 census
  "KM-G": { population: 361308, year: 2017, basis: "census" }, // Andjazîdja (Grande Comore)
  "KM-A": { population: 327382, year: 2017, basis: "census" }, // Anjouan
  "KM-M": { population: 40310, year: 2017, basis: "census" }, // Mohéli

  // Ghana, Ghana Statistical Service 2021 PHC. The codebase carries the
  // pre-2018 10-region boundaries; the 2021 census reports only the 16 new
  // regions directly, so figures are reconstituted by summing each old
  // region's known successor regions per GSS's own documented split lineage.
  // Checksum exact against the published national total (30,792,608).
  "GH-WP": { population: 2938080, year: 2021, basis: "census" }, // Western (Western + Western North)
  "GH-CP": { population: 2859821, year: 2021, basis: "census" }, // Central
  "GH-AA": { population: 5446237, year: 2021, basis: "census" }, // Greater Accra
  "GH-TV": { population: 2396750, year: 2021, basis: "census" }, // Volta (Volta + Oti)
  "GH-EP": { population: 2917039, year: 2021, basis: "census" }, // Eastern
  "GH-AH": { population: 5432485, year: 2021, basis: "census" }, // Ashanti
  "GH-BA": { population: 2976807, year: 2021, basis: "census" }, // Brong-Ahafo (Bono + Bono East + Ahafo)
  "GH-NP": { population: 3619473, year: 2021, basis: "census" }, // Northern (Northern + Savannah + North East)
  "GH-UE": { population: 1301221, year: 2021, basis: "census" }, // Upper East
  "GH-UW": { population: 904695, year: 2021, basis: "census" }, // Upper West

  // Somalia, UNFPA Population Estimation Survey 2014 — pre-war 18-region
  // basis; no government census has been held since 1975, so basis is
  // "estimate" throughout.
  "SO-NU": { population: 392698, year: 2014, basis: "estimate" }, // Nugal
  "SO-MU": { population: 717863, year: 2014, basis: "estimate" }, // Mudug
  "SO-GA": { population: 569434, year: 2014, basis: "estimate" }, // Galguduud
  "SO-HI": { population: 520685, year: 2014, basis: "estimate" }, // Hiran
  "SO-BK": { population: 367226, year: 2014, basis: "estimate" }, // Bakool
  "SO-GE": { population: 508405, year: 2014, basis: "estimate" }, // Gedo
  "SO-BR": { population: 719512, year: 2014, basis: "estimate" }, // Bari
  "SO-JH": { population: 489307, year: 2014, basis: "estimate" }, // Lower Juba
  "SO-JD": { population: 362921, year: 2014, basis: "estimate" }, // Middle Juba
  "SO-SH": { population: 1202219, year: 2014, basis: "estimate" }, // Lower Shebelle
  "SO-BN": { population: 1650227, year: 2014, basis: "estimate" }, // Banaadir
  "SO-SD": { population: 516036, year: 2014, basis: "estimate" }, // Middle Shebelle
  "SO-BY": { population: 792182, year: 2014, basis: "estimate" }, // Bay

  // Sudan, 2008 Fifth Population Census (CBS Sudan). SD-DE (East Darfur) and
  // SD-DC (Central Darfur) omitted — both states were created in 2012 from
  // South/West Darfur and did not exist as separate units in 2008; SD-GK
  // (West Kordofan) and SD-DS (South Darfur) below are 2008-era figures
  // retrofitted onto states later split, per the source's own documentation.
  "SD-KH": { population: 5274321, year: 2008, basis: "census" }, // Khartoum
  "SD-GZ": { population: 3575280, year: 2008, basis: "census" }, // Al Jazirah
  "SD-NW": { population: 1480015, year: 2008, basis: "census" }, // White Nile
  "SD-NR": { population: 1130412, year: 2008, basis: "census" }, // River Nile
  "SD-NO": { population: 706055, year: 2008, basis: "census" }, // Northern
  "SD-RS": { population: 1396097, year: 2008, basis: "census" }, // Red Sea
  "SD-KA": { population: 1781999, year: 2008, basis: "census" }, // Kassala
  "SD-GD": { population: 1448591, year: 2008, basis: "census" }, // Al Qadarif
  "SD-SI": { population: 1285717, year: 2008, basis: "census" }, // Sennar
  "SD-NB": { population: 832112, year: 2008, basis: "census" }, // Blue Nile
  "SD-KN": { population: 2920992, year: 2008, basis: "census" }, // North Kordofan
  "SD-KS": { population: 1406404, year: 2008, basis: "census" }, // South Kordofan
  "SD-GK": { population: 1665725, year: 2008, basis: "census" }, // West Kordofan
  "SD-DN": { population: 2113626, year: 2008, basis: "census" }, // North Darfur
  "SD-DW": { population: 1264043, year: 2008, basis: "census" }, // West Soudan (West Darfur)
  "SD-DS": { population: 4093594, year: 2008, basis: "census" }, // South Darfur

  // Mauritania, ANSADE recensement 2023-12-25 (checksum exact: sum 4,927,530
  // against published national total 4,927,532)
  "MR-01": { population: 625643, year: 2023, basis: "census" }, // Hodh Ech Chargui
  "MR-02": { population: 403089, year: 2023, basis: "census" }, // Hodh El Gharbi
  "MR-03": { population: 451804, year: 2023, basis: "census" }, // Assaba
  "MR-04": { population: 442490, year: 2023, basis: "census" }, // Gorgol
  "MR-05": { population: 391310, year: 2023, basis: "census" }, // Brakna
  "MR-06": { population: 323903, year: 2023, basis: "census" }, // Trarza
  "MR-07": { population: 71623, year: 2023, basis: "census" }, // Adrar
  "MR-08": { population: 184459, year: 2023, basis: "census" }, // Dakhlet Nouadhibou
  "MR-09": { population: 114760, year: 2023, basis: "census" }, // Tagant
  "MR-10": { population: 363075, year: 2023, basis: "census" }, // Guidimaka
  "MR-11": { population: 79129, year: 2023, basis: "census" }, // Tiris Zemmour
  "MR-12": { population: 29484, year: 2023, basis: "census" }, // Inchiri
  "MR-NKC": { population: 1446761, year: 2023, basis: "census" }, // Nouakchott

  // Gambia, Gambia Bureau of Statistics 2013 Population and Housing Census
  // (checksum exact against the national total 1,857,181)
  "GM-B": { population: 31054, year: 2013, basis: "census" }, // Banjul
  "GM-W": { population: 688744, year: 2013, basis: "census" }, // West Coast
  "GM-L": { population: 81042, year: 2013, basis: "census" }, // Lower River
  "GM-N": { population: 220080, year: 2013, basis: "census" }, // North Bank
  "GM-M": { population: 221907, year: 2013, basis: "census" }, // Central River (Kuntaur + Janjanbureh LGAs)
  "GM-U": { population: 237220, year: 2013, basis: "census" }, // Upper River

  // Mauritius, Statistics Mauritius / Central Statistical Office, 2022 census.
  // The 9 mainland districts sum to 1,189,493 vs. the official island total
  // of 1,191,280 — a small (~0.15%) unreconciled gap; Rodrigues and Agalega
  // are taken directly from the official press release. The 4 city codes
  // (MU-BR/QB/VP/CU) are not broken out in any source found and are omitted.
  "MU-PL": { population: 106332, year: 2022, basis: "census" }, // Port Louis
  "MU-PA": { population: 140856, year: 2022, basis: "census" }, // Pamplemousses
  "MU-RR": { population: 111195, year: 2022, basis: "census" }, // Rivière du Rempart
  "MU-FL": { population: 138529, year: 2022, basis: "census" }, // Flacq
  "MU-GP": { population: 110783, year: 2022, basis: "census" }, // Grand Port
  "MU-SA": { population: 67779, year: 2022, basis: "census" }, // Savanne
  "MU-PW": { population: 340780, year: 2022, basis: "census" }, // Plaines Wilhems
  "MU-MO": { population: 85538, year: 2022, basis: "census" }, // Moka
  "MU-BL": { population: 87701, year: 2022, basis: "census" }, // Rivière Noire
  "MU-RO": { population: 43650, year: 2022, basis: "census" }, // Rodrigues
  "MU-AG": { population: 330, year: 2022, basis: "census" }, // Agaléga

  // Botswana, Statistics Botswana 2022 PHC Preliminary Results. 6 of these 15
  // are sums of official census-district components per Statistics
  // Botswana's own reconciliation notes (Appendix 3); total under-counts the
  // true national figure (2,346,179) by ~16,500 — gap not resolved.
  "BW-GA": { population: 244107, year: 2022, basis: "census" }, // Gaborone
  "BW-FR": { population: 102444, year: 2022, basis: "census" }, // Francistown
  "BW-LO": { population: 29457, year: 2022, basis: "census" }, // Lobatse
  "BW-SP": { population: 41839, year: 2022, basis: "census" }, // Selebi-Phikwe
  "BW-JW": { population: 18576, year: 2022, basis: "census" }, // Jwaneng
  "BW-ST": { population: 2901, year: 2022, basis: "census" }, // Sowa
  "BW-SO": { population: 221968, year: 2022, basis: "census" }, // Southern (Ngwaketse + Barolong + Ngwaketse West)
  "BW-SE": { population: 111474, year: 2022, basis: "census" }, // South-East
  "BW-KW": { population: 387703, year: 2022, basis: "census" }, // Kweneng (East + West)
  "BW-KL": { population: 121411, year: 2022, basis: "census" }, // Kgatleng
  "BW-CE": { population: 668854, year: 2022, basis: "census" }, // Central
  "BW-NE": { population: 68910, year: 2022, basis: "census" }, // North-East
  "BW-NW": { population: 196224, year: 2022, basis: "census" }, // North-West (Ngamiland East + West)
  "BW-GH": { population: 55884, year: 2022, basis: "census" }, // Ghanzi (Ghanzi + CKGR)
  "BW-KG": { population: 58375, year: 2022, basis: "census" }, // Kgalagadi (South + North)

  // Zimbabwe, ZIMSTAT 2022 PHC Preliminary Report, Table 1.2 (checksum exact
  // against the national total 15,178,979)
  "ZW-BU": { population: 665940, year: 2022, basis: "census" }, // Bulawayo
  "ZW-MA": { population: 2037762, year: 2022, basis: "census" }, // Manicaland
  "ZW-MC": { population: 1384891, year: 2022, basis: "census" }, // Mashonaland Central
  "ZW-ME": { population: 1731181, year: 2022, basis: "census" }, // Mashonaland East
  "ZW-MW": { population: 1893578, year: 2022, basis: "census" }, // Mashonaland West
  "ZW-MN": { population: 827626, year: 2022, basis: "census" }, // Matabeleland North
  "ZW-MS": { population: 760345, year: 2022, basis: "census" }, // Matabeleland South
  "ZW-MI": { population: 1811908, year: 2022, basis: "census" }, // Midlands
  "ZW-MV": { population: 1638539, year: 2022, basis: "census" }, // Masvingo
  "ZW-HA": { population: 2427209, year: 2022, basis: "census" }, // Harare

  // Djibouti, INSTAD RGPH-3 2024-05-20 (checksum exact against the national
  // total 1,066,809)
  "DJ-DJ": { population: 767250, year: 2024, basis: "census" }, // Djibouti (city/region)
  "DJ-AS": { population: 76414, year: 2024, basis: "census" }, // Ali Sabieh
  "DJ-AR": { population: 48922, year: 2024, basis: "census" }, // Arta
  "DJ-DI": { population: 66196, year: 2024, basis: "census" }, // Dikhil
  "DJ-TA": { population: 60645, year: 2024, basis: "census" }, // Tadjourah
  "DJ-OB": { population: 47382, year: 2024, basis: "census" }, // Obock

  // Azerbaijan, State Statistical Committee 2019 census. AZ-CAB (Jabrayil)
  // omitted — the district was occupied/depopulated until liberated Nov 2020
  // and has no official published population figure during resettlement.
  "AZ-TAR": { population: 73627, year: 2019, basis: "census" }, // Tartar
  "AZ-BAR": { population: 182633, year: 2019, basis: "census" }, // Barda
  "AZ-KUR": { population: 111483, year: 2019, basis: "census" }, // Kurdamir
  "AZ-AGS": { population: 103267, year: 2019, basis: "census" }, // Agdash
  "AZ-CAL": { population: 207565, year: 2019, basis: "census" }, // Jalilabad
  "AZ-IMI": { population: 129259, year: 2019, basis: "census" }, // Imishli
  "AZ-FUZ": { population: 63582, year: 2019, basis: "census" }, // Fuzuli
  "AZ-SIY": { population: 40896, year: 2019, basis: "census" }, // Siyazan
  "AZ-DAS": { population: 33797, year: 2019, basis: "census" }, // Dashkasan
  "AZ-KAN": { population: 32621, year: 2019, basis: "census" }, // Kangarli
  "AZ-AGU": { population: 77712, year: 2019, basis: "census" }, // Agsu
  "AZ-TOV": { population: 164119, year: 2019, basis: "census" }, // Tovuz

  // Kuwait, Central Statistical Office 2021 census (registered population, 30 June 2021)
  "KW-JA": { population: 566861, year: 2021, basis: "census" }, // Al Jahra
  "KW-MU": { population: 279666, year: 2021, basis: "census" }, // Mubarak Al-Kabeer
  "KW-HA": { population: 926170, year: 2021, basis: "census" }, // Hawally
  "KW-KU": { population: 574839, year: 2021, basis: "census" }, // Capital
  "KW-FA": { population: 1110560, year: 2021, basis: "census" }, // Al Farwaniyah

  // Jordan, Department of Statistics, General Population and Housing Census
  // 2015 (census date 30 Nov 2015)
  "JO-IR": { population: 1770158, year: 2015, basis: "census" }, // Irbid
  "JO-AT": { population: 96291, year: 2015, basis: "census" }, // Tafilah
  "JO-AQ": { population: 188160, year: 2015, basis: "census" }, // Aqaba
  "JO-AZ": { population: 1364878, year: 2015, basis: "census" }, // Zarqa

  // Lebanon, Ministry of Public Health / UNHCR / Lebanese Palestinian
  // Dialogue Committee 2017 composite estimate — same source pattern already
  // used for the other bundled Lebanon entries (CAS has not run a full census since 1932)
  "LB-AS": { population: 790951, year: 2017, basis: "estimate" }, // North
  "LB-BA": { population: 433249, year: 2017, basis: "estimate" }, // Beirut

  // Malaysia, Department of Statistics Malaysia, Census 2020 (MyCensus 2020)
  "MY-08": { population: 2611600, year: 2020, basis: "census" }, // Perak
  "MY-06": { population: 1750100, year: 2020, basis: "census" }, // Pahang

  // Philippines, Philippine Statistics Authority 2024 Census of Population (POPCEN)
  "PH-BCD": { population: 624787, year: 2024, basis: "census" }, // Bacolod
  "PH-MDE": { population: 364482, year: 2024, basis: "census" }, // Mandaue
  "PH-LAP": { population: 497813, year: 2024, basis: "census" }, // Lapu-Lapu
  "PH-MNL": { population: 14001751, year: 2024, basis: "census" }, // Metro Manila (as of 1 July 2024)

  // Uzbekistan, State Statistics Committee (Stat.uz), permanent population as of 1 January 2024
  "UZ-SI": { population: 914000, year: 2024, basis: "estimate" }, // Sirdaryo
  "UZ-SU": { population: 2877100, year: 2024, basis: "estimate" }, // Surxondaryo

  // North Macedonia, State Statistical Office
  "MK-29": { population: 44844, year: 2021, basis: "census" }, // Gjorče Petrov
  "MK-15": { population: 1322, year: 2002, basis: "census" }, // Vraneštica (dissolved into Kičevo Municipality in 2013; no later count exists)
  "MK-20": { population: 3233, year: 2021, basis: "census" }, // Gradsko

  // Portugal, Instituto Nacional de Estatística, Census 2021 (21 March 2021)
  "PT-02": { population: 144401, year: 2021, basis: "census" }, // Beja
  "PT-11": { population: 2275385, year: 2021, basis: "census" }, // Lisbon
  "PT-13": { population: 1785405, year: 2021, basis: "census" }, // Porto

  // Saint Helena, Ascension and Tristan da Cunha, St Helena Government
  // Statistics Office 2021 census
  "SH-HL": { population: 4439, year: 2021, basis: "census" }, // Saint Helena (7 Feb 2021)
  "SH-AC": { population: 1023, year: 2021, basis: "census" }, // Ascension (March 2021)
  "SH-TA": { population: 260, year: 2021, basis: "census" }, // Tristan da Cunha (March 2021)

  // Statistics Faroe Islands (Hagstova Føroya), population register, 1 July 2025
  "DK-FO": { population: 55042, year: 2025, basis: "estimate" }, // Faroe Islands
  // Statistics Norway (SSB), Population Register of Svalbard, 1 Jan 2026.
  // Norwegian-administered settlements only (Longyearbyen + Ny-Ålesund) — per project
  // rule, a subdivision's population follows its parent country's own administrative
  // count, not a total that includes the Russian-administered Barentsburg/Pyramiden.
  "NO-21": { population: 2512, year: 2026, basis: "estimate" }, // Svalbard
  // Statistics Norway (SSB), table 07459, population 1 January 2026 (published
  // 25 Feb 2026), for the 15 counties in force since 1 January 2024. The 15 sum
  // exactly to SSB's national total of 5,627,400 (batch 8d).
  "NO-32": { population: 749207, year: 2026, basis: "estimate" }, // Akershus
  "NO-03": { population: 728714, year: 2026, basis: "estimate" }, // Oslo
  "NO-46": { population: 658342, year: 2026, basis: "estimate" }, // Vestland
  "NO-11": { population: 508922, year: 2026, basis: "estimate" }, // Rogaland
  "NO-50": { population: 489166, year: 2026, basis: "estimate" }, // Trøndelag
  "NO-34": { population: 379488, year: 2026, basis: "estimate" }, // Innlandet
  "NO-42": { population: 323930, year: 2026, basis: "estimate" }, // Agder
  "NO-31": { population: 316448, year: 2026, basis: "estimate" }, // Østfold
  "NO-15": { population: 273169, year: 2026, basis: "estimate" }, // Møre og Romsdal
  "NO-33": { population: 272981, year: 2026, basis: "estimate" }, // Buskerud
  "NO-39": { population: 259332, year: 2026, basis: "estimate" }, // Vestfold
  "NO-18": { population: 243272, year: 2026, basis: "estimate" }, // Nordland
  "NO-40": { population: 177923, year: 2026, basis: "estimate" }, // Telemark
  "NO-55": { population: 171218, year: 2026, basis: "estimate" }, // Troms
  "NO-56": { population: 75288, year: 2026, basis: "estimate" }, // Finnmark
  // Central Statistics Office (CSO) Ireland, Census of Population 2022 (3 Apr 2022)
  "IE-DL": { population: 167084, year: 2022, basis: "census" }, // Donegal
  // Statistical Office in Katowice / GUS (Statistics Poland), end-2024 estimate.
  // PL-SL is the pre-2018 ISO 3166-2 code for the same entity as PL-24 (Śląskie).
  "PL-SL": { population: 4291400, year: 2024, basis: "estimate" }, // Śląskie
  // State Statistical Office of North Macedonia, Census 2021 (5 Sep 2021)
  "MK-50": { population: 5042, year: 2021, basis: "census" }, // Mavrovo and Rostuša
  // TRNC Statistical Institute, 2011 census (4 Dec 2011), via citypopulation.de.
  // Northern Cyprus is administered by the unrecognised Turkish Republic of
  // Northern Cyprus; no Republic-of-Cyprus or UN-recognised figure exists for the
  // territory as actually administered. CY-06~ is the Kyrenia/Girne district
  // specifically (Cyprus's own district-level view); TR-NC~ is the standalone
  // disputed entity for the whole TRNC territory shown under Turkey, so it takes
  // the territory-wide total, not the Kyrenia district figure.
  "CY-06~": { population: 69163, year: 2011, basis: "census" }, // Kyrenia/Girne district (Northern Cyprus)
  "TR-NC~": { population: 286257, year: 2011, basis: "census" }, // Turkish Republic of Northern Cyprus (whole territory)
  // Dubăsari district (MD-DU): Moldova's 2024 census, final results (NBS, published
  // 26 March 2026, Anexa_Localitati_RPL2024.xlsx table 8.2). The census covers only the
  // Moldovan-administered communes; Wikidata still carries the 2014 figure. (Batch 8h also
  // removed the MD-CAM and MD-GRI rows: Camenca and Grigoriopol were Natural Earth pieces of
  // Transnistria, not ISO 3166-2 units, and are now part of MD-SN.)
  "MD-DU": { population: 21781, year: 2024, basis: "census" }, // Dubăsari district (2024 census)

  // Uninhabited — no permanent population (US Fish & Wildlife Service refuges)
  "UM-67": { population: 0, year: 2005, basis: "estimate" }, // Johnston Atoll (uninhabited since 2005; personnel withdrew May 2005)
  "UM-86": { population: 0, year: 2024, basis: "estimate" }, // Jarvis Island (never permanently inhabited)
  "UM-95": { population: 0, year: 2024, basis: "estimate" }, // Palmyra Atoll (never permanently inhabited)
  // Nauru Bureau of Statistics / PRISM, 2021 census (30 Oct 2021), via citypopulation.de
  "NR-01": { population: 1258, year: 2021, basis: "census" }, // Aiwo
  "NR-02": { population: 565, year: 2021, basis: "census" }, // Anabar
  "NR-03": { population: 795, year: 2021, basis: "census" }, // Anetan
  "NR-04": { population: 373, year: 2021, basis: "census" }, // Anibare
  "NR-05": { population: 523, year: 2021, basis: "census" }, // Baiti
  "NR-06": { population: 845, year: 2021, basis: "census" }, // Boe
  "NR-07": { population: 969, year: 2021, basis: "census" }, // Buada
  "NR-08": { population: 1874, year: 2021, basis: "census" }, // Denigomodu
  "NR-09": { population: 537, year: 2021, basis: "census" }, // Ewa
  "NR-10": { population: 276, year: 2021, basis: "census" }, // Ijuw
  "NR-11": { population: 1797, year: 2021, basis: "census" }, // Meneng
  "NR-12": { population: 724, year: 2021, basis: "census" }, // Nibok
  "NR-13": { population: 341, year: 2021, basis: "census" }, // Uaboe
  "NR-14": { population: 803, year: 2021, basis: "census" }, // Yaren
  // Palau Bureau of Budget & Planning / Office of Planning & Statistics, 2020 census,
  // via citypopulation.de
  "PW-002": { population: 363, year: 2020, basis: "census" }, // Aimeliik
  "PW-004": { population: 2529, year: 2020, basis: "census" }, // Airai
  "PW-010": { population: 114, year: 2020, basis: "census" }, // Angaur
  "PW-050": { population: 39, year: 2020, basis: "census" }, // Hatohobei
  "PW-100": { population: 41, year: 2020, basis: "census" }, // Kayangel
  "PW-150": { population: 11199, year: 2020, basis: "census" }, // Koror
  "PW-212": { population: 318, year: 2020, basis: "census" }, // Melekeok
  "PW-214": { population: 396, year: 2020, basis: "census" }, // Ngaraard
  "PW-218": { population: 384, year: 2020, basis: "census" }, // Ngarchelong
  "PW-222": { population: 238, year: 2020, basis: "census" }, // Ngardmau
  "PW-224": { population: 289, year: 2020, basis: "census" }, // Ngatpang
  "PW-226": { population: 319, year: 2020, basis: "census" }, // Ngchesar
  "PW-227": { population: 349, year: 2020, basis: "census" }, // Ngeremlengui
  "PW-228": { population: 312, year: 2020, basis: "census" }, // Ngiwal
  "PW-350": { population: 470, year: 2020, basis: "census" }, // Peleliu
  "PW-370": { population: 53, year: 2020, basis: "census" }, // Sonsorol
  // Papua New Guinea National Statistical Office, 2011 census. Hela and Jiwaka did
  // not yet exist as separate provinces (created 17 May 2012 from Southern Highlands
  // and Western Highlands respectively); figures are the territory's 2011 count.
  "PG-HLA": { population: 249449, year: 2011, basis: "census" }, // Hela
  "PG-JWK": { population: 343987, year: 2011, basis: "census" }, // Jiwaka
  "PG-WHM": { population: 362850, year: 2011, basis: "census" }, // Western Highlands (pre-Jiwaka-split boundary)
  "PG-WPD": { population: 201351, year: 2011, basis: "census" }, // Western
  // Fiji Bureau of Statistics, 2017 Population and Housing Census, Release 1
  "FJ-C": { population: 378148, year: 2017, basis: "census" }, // Central Division
  "FJ-N": { population: 131918, year: 2017, basis: "census" }, // Northern Division
  "FJ-W": { population: 337071, year: 2017, basis: "census" }, // Western Division
  "FJ-R": { population: 1594, year: 2017, basis: "census" }, // Rotuma (on-island population only)

  // National Statistics and Information Authority (NSIA) of Afghanistan, ~2021
  // population estimate, via UNFPA Afghanistan and IOM PLACES factsheets (Afghanistan
  // has held no full census since 1979; NSIA figures are projections)
  "AF-NIM": { population: 186963, year: 2021, basis: "estimate" }, // Nimroz
  // Oman National Centre for Statistics and Information (NCSI), 2010 census.
  // Ash Sharqiyah split into North/South governorates on 28 Oct 2011; this is the
  // sum of the two successor governorates' 2010 figures (162,482 + 188,032), the
  // last year a figure for the unified pre-split boundary can be derived.
  "OM-SH": { population: 350514, year: 2010, basis: "census" }, // Ash Sharqiyah (pre-2011-split boundary)

  // Institut National de la Statistique (INS) / BTPR Côte d'Ivoire, RGPH-98 census
  // (Tableau 1.7), for regions abolished in the 2011/2015 district reorganisation.
  // Dix-Huit Montagnes (CI-06) is deliberately omitted: the only figure circulating
  // (936,510) covers the smaller post-2000-split remainder territory, not the
  // region as it existed at the 1998 census, and would misrepresent it.
  "CI-03": { population: 929673, year: 1998, basis: "census" }, // Savanes
  "CI-05": { population: 394761, year: 1998, basis: "census" }, // Moyen-Comoé
  "CI-07": { population: 476235, year: 1998, basis: "census" }, // Lacs
  "CI-10": { population: 222446, year: 1998, basis: "census" }, // Denguélé
  "CI-15": { population: 682021, year: 1998, basis: "census" }, // Sud-Bandama
  "CI-18": { population: 542992, year: 1998, basis: "census" }, // Fromager
  "CI-19": { population: 508733, year: 1998, basis: "census" }, // Moyen-Cavally
  // Instituto Nacional de Estatística de Cabo Verde (INE-CV), RGPH-2021, Tabela 21
  "CV-CA": { population: 37982, year: 2021, basis: "census" }, // Santa Catarina
  "CV-CF": { population: 4743, year: 2021, basis: "census" }, // Santa Catarina do Fogo
  "CV-CR": { population: 25152, year: 2021, basis: "census" }, // Santa Cruz
  "CV-MO": { population: 8084, year: 2021, basis: "census" }, // Mosteiros
  "CV-PR": { population: 145378, year: 2021, basis: "census" }, // Praia
  "CV-RS": { population: 7757, year: 2021, basis: "census" }, // Ribeira Grande de Santiago
  "CV-SD": { population: 14051, year: 2021, basis: "census" }, // São Domingos
  "CV-SM": { population: 12966, year: 2021, basis: "census" }, // São Miguel
  "CV-SO": { population: 6328, year: 2021, basis: "census" }, // São Lourenço dos Órgãos
  "CV-SS": { population: 7482, year: 2021, basis: "census" }, // São Salvador do Mundo
  "CV-TA": { population: 16892, year: 2021, basis: "census" }, // Tarrafal
  // INSTAT-Mali, RGPH-2009 regional result sheets
  "ML-1": { population: 1996812, year: 2009, basis: "census" }, // Kayes
  "ML-2": { population: 2418305, year: 2009, basis: "census" }, // Koulikoro
  // Instituto Nacional de Estadística de Guinea Ecuatorial (INEGE), "Guinea en
  // Cifras 2016", IV Censo General de Población y Viviendas 2015
  "GQ-BS": { population: 34627, year: 2015, basis: "census" }, // Bioko Sur
  "GQ-CS": { population: 141903, year: 2015, basis: "census" }, // Centro Sur
  "GQ-KN": { population: 183331, year: 2015, basis: "census" }, // Kié-Ntem
  "GQ-WN": { population: 191383, year: 2015, basis: "census" }, // Wele-Nzas

  // Libya General Census, 1995-08-25, via statoids.com — legacy municipalities
  // abolished in the 2007/2010 reorganisation into 22 current codes
  "LY-AJ": { population: 108139, year: 1995, basis: "census" }, // Ajdabiya
  "LY-GD": { population: 15280, year: 1995, basis: "census" }, // Ghadamis
  "LY-MZ": { population: 29580, year: 1995, basis: "census" }, // Mizdah
  "LY-NQ": { population: 166067, year: 1995, basis: "census" }, // An Nuqat al Khams
  "LY-QB": { population: 58810, year: 1995, basis: "census" }, // Al Qubbah
  // Haut-Commissariat au Plan (HCP), "La Région en Chiffres", Guelmim regional
  // office, legal population 2014 (pre-Sept-2015 16-region boundary)
  "MA-14": { population: 501921, year: 2014, basis: "census" }, // Guelmim-Es Semara
  // Sudan Central Bureau of Statistics, 2008 census, district figures summed to the
  // state boundary (per citypopulation.de methodology note) — Central and East
  // Darfur states were both created in 2012, after the 2008 census
  "SD-DC": { population: 553515, year: 2008, basis: "census" }, // Central Darfur
  "SD-DE": { population: 1213784, year: 2008, basis: "census" }, // East Darfur
  // National Statistics and Evaluation Office, Eritrea, 2005 regional estimate
  "ER-MA": { population: 675700, year: 2005, basis: "estimate" }, // Maekel
  "ER-DU": { population: 952100, year: 2005, basis: "estimate" }, // Debub
  "ER-AN": { population: 549000, year: 2005, basis: "estimate" }, // Anseba
  // Ethiopian Statistics Service, 2022 projection, via citypopulation.de. Sidama
  // Region was created 18 June 2020 by splitting from SNNPR.
  "ET-SI": { population: 4623162, year: 2022, basis: "estimate" }, // Sidama

  // Instituto Nacional de Estadística de Venezuela (INE), XIV Censo Nacional de
  // Población y Vivienda, 2011
  "VE-A": { population: 1943901, year: 2011, basis: "census" }, // Distrito Capital
  "VE-E": { population: 816264, year: 2011, basis: "census" }, // Barinas
  "VE-L": { population: 828592, year: 2011, basis: "census" }, // Mérida
  "VE-M": { population: 2675165, year: 2011, basis: "census" }, // Miranda
  "VE-P": { population: 876496, year: 2011, basis: "census" }, // Portuguesa
  "VE-S": { population: 1168908, year: 2011, basis: "census" }, // Táchira
  "VE-T": { population: 686367, year: 2011, basis: "census" }, // Trujillo
  "VE-V": { population: 3704404, year: 2011, basis: "census" }, // Zulia
  "VE-X": { population: 352920, year: 2011, basis: "census" }, // Vargas/La Guaira
  // Algemeen Bureau voor de Statistiek (Suriname), Achtste Volks- en Woningtelling,
  // reference date 13 August 2012
  "SR-BR": { population: 15909, year: 2012, basis: "census" }, // Brokopondo
  "SR-CM": { population: 31420, year: 2012, basis: "census" }, // Commewijne
  "SR-CR": { population: 3391, year: 2012, basis: "census" }, // Coronie
  "SR-NI": { population: 34233, year: 2012, basis: "census" }, // Nickerie
  "SR-PR": { population: 24700, year: 2012, basis: "census" }, // Para
  "SR-SA": { population: 17480, year: 2012, basis: "census" }, // Saramacca
  // MX-DIF is the pre-2016 ISO 3166-2 code for the same entity as MX-CMX (Mexico
  // City, then named "Distrito Federal"); aliases MX-CMX's INEGI 2020 census figure
  "MX-DIF": { population: 9209944, year: 2020, basis: "census" }, // Mexico City (legacy code)

  // Bermuda Government, 2016 Census Parish Profile (20 May 2016)
  "BM-SG": { population: 5659, year: 2016, basis: "census" }, // Saint George's Parish
  // Bahamas Department of Statistics, 2010 census, via citypopulation.de
  "BS-BP": { population: 414, year: 2010, basis: "census" }, // Black Point
  "BS-MC": { population: 892, year: 2010, basis: "census" }, // Mangrove Cay
  "BS-CE": { population: 2363, year: 2010, basis: "census" }, // Central Eleuthera
  "BS-MI": { population: 593, year: 2010, basis: "census" }, // Moore's Island
  "BS-CO": { population: 9196, year: 2010, basis: "census" }, // Central Abaco
  // Uninhabited — no permanent population (Redonda Annexation Act; abandoned
  // mining camp, last occupied ~1930. Saint Anthony and Saint Georges parishes lie
  // entirely within Montserrat's volcanic exclusion zone, evacuated since 1995-97)
  "AG-11": { population: 0, year: 2011, basis: "estimate" }, // Redonda
  "MS-A": { population: 0, year: 2011, basis: "estimate" }, // Saint Anthony
  "MS-G": { population: 0, year: 2011, basis: "estimate" }, // Saint Georges
  // Montserrat Statistics Department, 2011 Population & Housing Census. The census
  // tabulates 22 enumeration districts and the island's entire surveyed population
  // (4,922) by geographic region, all of which lie within Saint Peter parish — the
  // other two parishes (Saint Anthony, Saint Georges) are uninhabited exclusion zone.
  "MS-P": { population: 4922, year: 2011, basis: "census" }, // Saint Peter
  // Trinidad and Tobago Central Statistical Office (CSO), 2011 Population and
  // Housing Census Community Register — sum of Saint Andrew, Saint David and Saint
  // Patrick parishes. TT-WTO was deleted from ISO 3166-2 in 2015 (replaced by the
  // single ward TT-TOB) but the figure remains a real, sourced 2011 count.
  "TT-WTO": { population: 41829, year: 2011, basis: "census" }, // Western Tobago (legacy code)

  // Malaysia, DOSM Population and Housing Census 2020 (Banci Penduduk dan
  // Perumahan Malaysia 2020 / MyCensus 2020) — the latest authoritative
  // enumeration. Wikidata's dated P1082 pass had left several states on stale
  // 2010-census/2017-estimate figures (Selangor, Johor, Terengganu, Negeri
  // Sembilan, Perlis), mislabelled non-census figures as census (Pahang, Perak),
  // and — worst — keyed a Greater-KL metropolitan figure (~9,000,000) to the
  // Kuala Lumpur federal territory (whose true 2020 census count is 1,982,112).
  // All 16 are pinned here to the exact 2020 census figure; the 16 sum exactly to
  // the published national total of 32,447,385 (checksum-verified).
  "MY-01": { population: 4009670, year: 2020, basis: "census" }, // Johor
  "MY-02": { population: 2131427, year: 2020, basis: "census" }, // Kedah
  "MY-03": { population: 1792501, year: 2020, basis: "census" }, // Kelantan
  "MY-04": { population: 998428, year: 2020, basis: "census" }, // Melaka
  "MY-05": { population: 1199974, year: 2020, basis: "census" }, // Negeri Sembilan
  "MY-06": { population: 1591295, year: 2020, basis: "census" }, // Pahang
  "MY-07": { population: 1740405, year: 2020, basis: "census" }, // Pulau Pinang (Penang)
  "MY-08": { population: 2496041, year: 2020, basis: "census" }, // Perak
  "MY-09": { population: 284885, year: 2020, basis: "census" }, // Perlis
  "MY-10": { population: 6994423, year: 2020, basis: "census" }, // Selangor
  "MY-11": { population: 1149440, year: 2020, basis: "census" }, // Terengganu
  "MY-12": { population: 3418785, year: 2020, basis: "census" }, // Sabah
  "MY-13": { population: 2453677, year: 2020, basis: "census" }, // Sarawak
  "MY-14": { population: 1982112, year: 2020, basis: "census" }, // Kuala Lumpur (Federal Territory)
  "MY-15": { population: 95120, year: 2020, basis: "census" }, // Labuan (Federal Territory)
  "MY-16": { population: 109202, year: 2020, basis: "census" }, // Putrajaya (Federal Territory)

  // Mexico, INEGI Censo de Población y Vivienda 2020 — the latest census
  // (supersedes the 2015 Encuesta Intercensal our data carried for most states,
  // and older 2010 figures for Coahuila/BCS). All 32 federal entities; the 32
  // sum exactly to the published national total 126,014,024 (checksum-verified).
  // The legacy MX-DIF code (pre-2016 name for Mexico City) keeps its own 2020
  // census figure = MX-CMX.
  "MX-AGU": { population: 1425607, year: 2020, basis: "census" },
  "MX-BCN": { population: 3769020, year: 2020, basis: "census" },
  "MX-BCS": { population: 798447, year: 2020, basis: "census" },
  "MX-CAM": { population: 928363, year: 2020, basis: "census" },
  "MX-CHP": { population: 5543828, year: 2020, basis: "census" },
  "MX-CHH": { population: 3741869, year: 2020, basis: "census" },
  "MX-CMX": { population: 9209944, year: 2020, basis: "census" },
  "MX-COA": { population: 3146771, year: 2020, basis: "census" },
  "MX-COL": { population: 731391, year: 2020, basis: "census" },
  "MX-DUR": { population: 1832650, year: 2020, basis: "census" },
  "MX-GUA": { population: 6166934, year: 2020, basis: "census" },
  "MX-GRO": { population: 3540685, year: 2020, basis: "census" },
  "MX-HID": { population: 3082841, year: 2020, basis: "census" },
  "MX-JAL": { population: 8348151, year: 2020, basis: "census" },
  "MX-MEX": { population: 16992418, year: 2020, basis: "census" },
  "MX-MIC": { population: 4748846, year: 2020, basis: "census" },
  "MX-MOR": { population: 1971520, year: 2020, basis: "census" },
  "MX-NAY": { population: 1235456, year: 2020, basis: "census" },
  "MX-NLE": { population: 5784442, year: 2020, basis: "census" },
  "MX-OAX": { population: 4132148, year: 2020, basis: "census" },
  "MX-PUE": { population: 6583278, year: 2020, basis: "census" },
  "MX-QUE": { population: 2368467, year: 2020, basis: "census" },
  "MX-ROO": { population: 1857985, year: 2020, basis: "census" },
  "MX-SLP": { population: 2822255, year: 2020, basis: "census" },
  "MX-SIN": { population: 3026943, year: 2020, basis: "census" },
  "MX-SON": { population: 2944840, year: 2020, basis: "census" },
  "MX-TAB": { population: 2402598, year: 2020, basis: "census" },
  "MX-TAM": { population: 3527735, year: 2020, basis: "census" },
  "MX-TLA": { population: 1342977, year: 2020, basis: "census" },
  "MX-VER": { population: 8062579, year: 2020, basis: "census" },
  "MX-YUC": { population: 2320898, year: 2020, basis: "census" },
  "MX-ZAC": { population: 1622138, year: 2020, basis: "census" },

  // Mongolia, NSO 2020 Population and Housing Census — supersedes the 2015
  // intercensal/registration figures our data carried. All 21 aimags + the
  // capital Ulaanbaatar (MN-1); the 22 sum exactly to the published national
  // total 3,253,283 (checksum-verified).
  "MN-035": { population: 105361, year: 2020, basis: "census" }, // Orkhon
  "MN-037": { population: 103580, year: 2020, basis: "census" }, // Darkhan-Uul
  "MN-039": { population: 78507, year: 2020, basis: "census" }, // Khentii
  "MN-041": { population: 136058, year: 2020, basis: "census" }, // Khövsgöl
  "MN-043": { population: 88974, year: 2020, basis: "census" }, // Khovd
  "MN-046": { population: 84294, year: 2020, basis: "census" }, // Uvs
  "MN-047": { population: 93332, year: 2020, basis: "census" }, // Töv
  "MN-049": { population: 108370, year: 2020, basis: "census" }, // Selenge
  "MN-051": { population: 64307, year: 2020, basis: "census" }, // Sükhbaatar
  "MN-053": { population: 71248, year: 2020, basis: "census" }, // Ömnögovi
  "MN-055": { population: 116785, year: 2020, basis: "census" }, // Övörkhangai
  "MN-057": { population: 73231, year: 2020, basis: "census" }, // Zavkhan
  "MN-059": { population: 47274, year: 2020, basis: "census" }, // Dundgovi
  "MN-061": { population: 83473, year: 2020, basis: "census" }, // Dornod
  "MN-063": { population: 71233, year: 2020, basis: "census" }, // Dornogovi
  "MN-064": { population: 18008, year: 2020, basis: "census" }, // Govisümber
  "MN-065": { population: 58343, year: 2020, basis: "census" }, // Govi-Altai
  "MN-067": { population: 61516, year: 2020, basis: "census" }, // Bulgan
  "MN-069": { population: 89329, year: 2020, basis: "census" }, // Bayankhongor
  "MN-071": { population: 105853, year: 2020, basis: "census" }, // Bayan-Ölgii
  "MN-073": { population: 95067, year: 2020, basis: "census" }, // Arkhangai
  "MN-1": { population: 1499140, year: 2020, basis: "census" }, // Ulaanbaatar

  // Poland, GUS Narodowy Spis Powszechny 2021 (NSP 2021 census) — supersedes
  // the 2011–2020 estimates our data carried for most voivodeships. Keyed by the
  // ISO letter codes the app's subdivisionMeta uses (PL-MZ…); the stale legacy
  // numeric-code duplicates (PL-14…, aliased to the letter codes via
  // CODE_ALIASES) and a stray PL-KI were dropped from the generated file. The 16
  // sum exactly to the published national total 38,036,118 (checksum-verified).
  "PL-MZ": { population: 5514699, year: 2021, basis: "census" }, // Masovian
  "PL-SL": { population: 4402950, year: 2021, basis: "census" }, // Silesian
  "PL-WP": { population: 3504579, year: 2021, basis: "census" }, // Greater Poland
  "PL-MA": { population: 3432295, year: 2021, basis: "census" }, // Lesser Poland
  "PL-DS": { population: 2904894, year: 2021, basis: "census" }, // Lower Silesian
  "PL-LD": { population: 2410286, year: 2021, basis: "census" }, // Łódź
  "PL-PM": { population: 2357320, year: 2021, basis: "census" }, // Pomeranian
  "PL-PK": { population: 2093360, year: 2021, basis: "census" }, // Podkarpackie
  "PL-LU": { population: 2052340, year: 2021, basis: "census" }, // Lublin
  "PL-KP": { population: 2027261, year: 2021, basis: "census" }, // Kuyavian-Pomeranian
  "PL-ZP": { population: 1657716, year: 2021, basis: "census" }, // West Pomeranian
  "PL-WN": { population: 1382232, year: 2021, basis: "census" }, // Warmian-Masurian
  "PL-SK": { population: 1196557, year: 2021, basis: "census" }, // Świętokrzyskie
  "PL-PD": { population: 1154283, year: 2021, basis: "census" }, // Podlaskie
  "PL-LB": { population: 991213, year: 2021, basis: "census" }, // Lubusz
  "PL-OP": { population: 954133, year: 2021, basis: "census" }, // Opole
};

async function fetchByQid(code, qid) {
  const q = `SELECT ?pop ?date ?method WHERE {
    wd:${qid} p:P1082 ?st . ?st ps:P1082 ?pop .
    OPTIONAL { ?st pq:P585 ?date . }
    OPTIONAL { ?st pq:P459 ?method . }
  }`;
  const rows = (await sparql(q)).map((r) => ({ ...r, code: { value: code } }));
  return pickLatest(rows, "code").get(code) ?? null;
}

/** Keep, per code, the row with the most recent point-in-time. */
function pickLatest(rows, codeKey, popKey = "pop", dateKey = "date", methodKey = "method") {
  const best = new Map();
  for (const r of rows) {
    const code = CODE_ALIASES[r[codeKey]?.value] ?? r[codeKey]?.value;
    const date = r[dateKey]?.value;
    const pop = Number(r[popKey]?.value);
    if (!code || !date || !Number.isFinite(pop) || pop <= 0) continue; // dated only
    const year = yearOf(date);
    const isCensus = r[methodKey]?.value?.endsWith(CENSUS_QID) ?? false;
    const prev = best.get(code);
    if (!prev || year > prev.year) {
      best.set(code, { population: Math.round(pop), year, basis: isCensus ? "census" : "estimate" });
    }
  }
  return best;
}

async function fetchSubdivisions(cc) {
  const q = `SELECT ?code ?pop ?date ?method WHERE {
    ?item wdt:P300 ?code . FILTER(STRSTARTS(?code, "${cc}-"))
    ?item p:P1082 ?st . ?st ps:P1082 ?pop .
    OPTIONAL { ?st pq:P585 ?date . }
    OPTIONAL { ?st pq:P459 ?method . }
  }`;
  return pickLatest(await sparql(q), "code");
}

async function fetchNational(cc) {
  const q = `SELECT ?c ?pop ?date ?method WHERE {
    ?c wdt:P297 "${cc}" .
    ?c p:P1082 ?st . ?st ps:P1082 ?pop .
    OPTIONAL { ?st pq:P585 ?date . }
    OPTIONAL { ?st pq:P459 ?method . }
  }`;
  const best = pickLatest(await sparql(q), "c");
  // there is at most one country item; return its figure
  return [...best.values()][0] ?? null;
}

/**
 * Some subdivisions (mostly external territories / crown dependencies, e.g.
 * Norfolk Island, the Cayman Islands, the US Virgin Islands) have a dated
 * Wikidata population statement but no P300 (ISO 3166-2 code) property, so
 * the P300-filtered queries above can never find them — not a missing
 * figure, just a missing link in Wikidata. Loading the *previous* run's
 * output as a baseline and only ever adding to it (never dropping a code the
 * new fetch didn't return) means a refresh can't silently regress coverage,
 * matching this project's "never reduce bundled information" rule.
 */
function loadExisting(path, sectionRe, entryRe) {
  const map = new Map();
  let text;
  try {
    text = readFileSync(path, "utf8");
  } catch {
    return map;
  }
  const section = text.match(sectionRe);
  if (!section) return map;
  for (const m of section[1].matchAll(entryRe)) map.set(m[1], m.slice(2));
  return map;
}

function loadExistingSubdivisions() {
  const raw = loadExisting(
    OUTPUT,
    /SUBDIVISION_POPULATION:[^{]*\{([\s\S]*?)\n\};/,
    /"([^"]+)":\s*\{\s*population:\s*(\d+),\s*year:\s*(\d+),\s*basis:\s*"(\w+)"\s*\}/g,
  );
  const out = new Map();
  for (const [code, [pop, year, basis]] of raw) {
    out.set(code, { population: Number(pop), year: Number(year), basis });
  }
  return out;
}

function loadExistingNational() {
  const raw = loadExisting(
    OUTPUT,
    /NATIONAL_REFERENCE_POPULATION[^{]*\{([\s\S]*?)\n\};/,
    /"([^"]+)":\s*(\d+)/g,
  );
  const out = new Map();
  for (const [cc, [pop]] of raw) out.set(cc, Number(pop));
  return out;
}

async function main() {
  const codes = countryCodes();
  const subdivisions = new Map(); // code -> {population, year, basis}
  const national = new Map(); // CC -> population

  for (let i = 0; i < codes.length; i++) {
    const cc = codes[i];
    process.stdout.write(`[${i + 1}/${codes.length}] ${cc} `);
    try {
      const subs = await fetchSubdivisions(cc);
      for (const [k, v] of subs) subdivisions.set(k, v);
      const nat = await fetchNational(cc);
      if (nat) national.set(cc, nat.population);
      console.log(`→ ${subs.size} subdivisions`);
    } catch (e) {
      console.log(`→ FAILED (${e.message})`);
    }
    await sleep(200); // be polite
  }

  console.log("\nFetching subdivisions with no Wikidata P300 code (by QID)...");
  for (const [code, qid] of Object.entries(NO_ISO_CODE_QIDS)) {
    try {
      const v = await fetchByQid(code, qid);
      if (v) {
        subdivisions.set(code, v);
        console.log(`  ${code} (${qid}) → ${v.population} (${v.year}, ${v.basis})`);
      } else {
        console.log(`  ${code} (${qid}) → no dated population found`);
      }
    } catch (e) {
      console.log(`  ${code} (${qid}) → FAILED (${e.message})`);
    }
    await sleep(1500);
  }

  console.log("\nFetching verified name-matched subdivisions (by QID)...");
  for (const [code, qid] of Object.entries(VERIFIED_NAME_MATCH_QIDS)) {
    try {
      const v = await fetchByQid(code, qid);
      if (v) {
        subdivisions.set(code, v);
        console.log(`  ${code} (${qid}) → ${v.population} (${v.year}, ${v.basis})`);
      } else {
        console.log(`  ${code} (${qid}) → no dated population found`);
      }
    } catch (e) {
      console.log(`  ${code} (${qid}) → FAILED (${e.message})`);
    }
    await sleep(1500);
  }

  console.log("\nApplying manually verified population figures...");
  for (const [code, v] of Object.entries(MANUAL_VERIFIED_POPULATION)) {
    subdivisions.set(code, v);
    console.log(`  ${code} → ${v.population} (${v.year}, ${v.basis})`);
  }

  // Never let a refresh drop a code the new fetch didn't return — preserve
  // any previously-known figure (e.g. territories Wikidata doesn't tag with
  // P300) instead of silently losing coverage.
  let preserved = 0;
  for (const [code, v] of loadExistingSubdivisions()) {
    if (!subdivisions.has(code)) {
      subdivisions.set(code, v);
      preserved++;
    }
  }
  let preservedNational = 0;
  for (const [cc, pop] of loadExistingNational()) {
    if (!national.has(cc)) {
      national.set(cc, pop);
      preservedNational++;
    }
  }
  if (preserved > 0 || preservedNational > 0) {
    console.log(
      `\nPreserved ${preserved} subdivision(s) and ${preservedNational} national total(s) ` +
        `from the previous run that the new fetch didn't return.`,
    );
  }

  writeOutput(subdivisions, national);
}

function writeOutput(subdivisions, national) {
  // group subdivision codes by country prefix, sorted
  const byCountry = new Map();
  for (const [code, v] of subdivisions) {
    const cc = code.split("-")[0];
    if (!byCountry.has(cc)) byCountry.set(cc, []);
    byCountry.get(cc).push([code, v]);
  }
  const countries = [...byCountry.keys()].sort();

  let body = "";
  for (const cc of countries) {
    body += `\n  // ── ${cc} ──\n`;
    const rows = byCountry.get(cc).sort((a, b) => b[1].population - a[1].population);
    for (const [code, v] of rows) {
      body += `  ${JSON.stringify(code)}: { population: ${v.population}, year: ${v.year}, basis: ${JSON.stringify(v.basis)} },\n`;
    }
  }

  let natBody = "";
  for (const cc of [...national.keys()].sort()) {
    natBody += `  ${JSON.stringify(cc)}: ${national.get(cc)},\n`;
  }

  const ts = `// Auto-generated by scripts/build-subdivision-population.mjs — DO NOT EDIT MANUALLY
// Source: Wikidata (population P1082 + point-in-time P585 + determination method P459,
// keyed by ISO 3166-2 code P300). Each figure is the most recent *dated* population
// statement for that subdivision, so the Learn-mode panel can always state the year.
//
// To refresh: node scripts/build-subdivision-population.mjs (needs egress to
// query.wikidata.org). The generator only re-formats authoritative source data — it
// never invents a figure; a subdivision with no dated Wikidata population is omitted.

export type SubdivisionPopulation = {
  /** Total resident population of the whole subdivision. */
  population: number;
  /** Reference year of the figure (point-in-time of the Wikidata statement). */
  year: number;
  /** How the figure was produced — shown after the year ("2021 census"). */
  basis: "census" | "estimate";
};

// National totals (latest dated country-level P1082), used purely as the
// denominator when computing a subdivision's share of the national population
// if the live national figure is unavailable. Never shown as "the national
// population" — the country widget owns that, live.
export const NATIONAL_REFERENCE_POPULATION: Record<string, number> = {
${natBody}};

export const SUBDIVISION_POPULATION: Record<string, SubdivisionPopulation> = {
${body}};
`;

  writeFileSync(OUTPUT, ts);
  console.log(`\nWrote ${OUTPUT}`);
  console.log(`  ${subdivisions.size} subdivisions across ${countries.length} countries`);
  console.log(`  ${national.size} national reference totals`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
