// Build the bundled, offline-safe city dataset for the Learn-mode map overlays
// (src/data/cities.ts) — national capitals + largest city, and per-subdivision
// capitals + largest city, for every UN member state and every country whose
// subdivisions the game shows.
//
// Re-run with:  node scripts/build-cities.mjs
//
// SOURCING (hard rule — see CLAUDE.md "City data must be sourced, never
// fabricated"):
//   • Geography (which cities exist, capital classification, coordinates) and
//     the candidate-city list come from Natural Earth 10m populated places
//     (nvkelso/natural-earth-vector) — the same dataset lineage as the bundled
//     basemap. A filtered, all-country extract is committed at
//     scripts/data/ne_places.geojson so this build is reproducible without
//     network egress. (To refresh it, re-download ne_10m_populated_places.geojson
//     and re-run the filter that produced it — see the extract's provenance.)
//   • NATIONAL capitals are RECONCILED against the authoritative, already-bundled
//     COUNTRY_FACTS.capital (from mledoze/countries — the same source the country
//     widget trusts). Natural Earth's adm0cap tag is stale/ambiguous for a number
//     of countries (it tags Dar es Salaam for Tanzania — the capital is Dodoma;
//     the former seat for Benin/Burundi; the pre-2022 name "Nur-Sultan" for
//     Kazakhstan's Astana), so where NE's adm0cap city disagrees with the
//     authoritative capital we trust COUNTRY_FACTS and take only the coordinates
//     from NE. Where NE genuinely tags several national capitals AND the
//     authoritative capital is one of them, every capital is kept (multi-capital
//     nations — South Africa, Bolivia, Côte d'Ivoire — are represented honestly).
//   • Natural Earth's `pop_max` is an URBAN-AGGLOMERATION figure and is known to
//     misrank "largest city" in some countries; those cases are corrected via the
//     curated LARGEST_OVERRIDE table below, each with a cited reason.
//   • Multi-capital arrangements and de-facto capitals carry a sourced role note
//     from CAPITAL_ROLES.
//
// This generator only RE-FORMATS authoritative source data and applies a small,
// individually-cited correction layer. It never invents a city, a coordinate, or
// a population — anything it cannot resolve from the source is omitted, exactly
// like the country-facts and subdivision-population generators.

import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const NE = resolve(__dirname, "data/ne_places.geojson");
const FACTS = resolve(__dirname, "../src/data/countryFacts.ts");
const SUBDIV_DIR = resolve(__dirname, "../public/subdivisions");
const OUT = resolve(__dirname, "../src/data/cities.ts");

// --- Authoritative capital names (mledoze/countries via COUNTRY_FACTS) --------
// Parsed from the committed src/data/countryFacts.ts so national capitals stay in
// lock-step with the country widget's capital. Keyed by ISO 3166-1 alpha-2.
function loadCountryFactsCapitals() {
  const txt = readFileSync(FACTS, "utf8");
  const caps = {};
  for (const m of txt.matchAll(/^\s*([A-Z]{2}): (\{.*\}),?\s*$/gm)) {
    try {
      const obj = JSON.parse(m[2]);
      if (obj.capital) caps[m[1]] = obj.capital;
    } catch {
      /* skip malformed line */
    }
  }
  return caps;
}
const FACT_CAPITAL = loadCountryFactsCapitals();

// National scope = every country the widget/game knows (the UN member +
// observer set that COUNTRY_FACTS covers). Subnational scope = every country
// with a bundled subdivision polygon file.
const NATIONAL_ISO = Object.keys(FACT_CAPITAL).sort();
const SUBNATIONAL_ISO = readdirSync(SUBDIV_DIR)
  .filter((f) => /^[A-Z]{2}\.json$/.test(f))
  .map((f) => f.slice(0, 2))
  .sort();

// --- Curated correction layer (each entry cited) -----------------------------

// Explicit national-capital sets that override BOTH Natural Earth and the
// single-value COUNTRY_FACTS capital — only for genuine multi-capital nations
// the authoritative single-capital field cannot express on its own. City names
// are resolved to coordinates from the NE extract.
//   • Eswatini — Mbabane is the administrative (executive) capital; Lobamba is
//     the royal and legislative capital. COUNTRY_FACTS carries only Lobamba.
const NATIONAL_CAPITAL_OVERRIDE = {
  SZ: ["Mbabane", "Lobamba"],
};

// Rename a Natural Earth place to its current authoritative name (same city,
// same coordinates — NE's label is simply out of date). Keyed `${iso}|${neName}`.
//   • Kazakhstan — NE still labels the capital "Nur-Sultan"; it was renamed back
//     to Astana in September 2022. COUNTRY_FACTS already says "Astana", but that
//     name is absent from NE, so we keep NE's coordinates and correct the label.
const NE_NAME_ALIAS = {
  "KZ|Nur-Sultan": "Astana",
};

// Cities Natural Earth tags as a national-capital "alt" that are NOT a current
// capital (historical / former seats). All current NE "Admin-0 capital alt"
// entries carry adm0cap=0 and are therefore already excluded by the adm0cap
// filter; this set is kept as belt-and-braces for the few tagged adm0cap=1.
const HISTORICAL_CAPITAL_BLOCK = new Set([
  "JP|Kyoto", // Imperial capital until 1869; NE tags it "Admin-0 capital alt".
]);

// National capitals NE does not flag with adm0cap=1 but which are a real, current
// (co-)capital. Coordinates are resolved from the NE extract by name.
//   • Putrajaya — Malaysia's administrative capital / seat of the federal
//     government and judiciary since 1999 (Kuala Lumpur remains the
//     constitutional/national capital and seat of parliament).
const EXTRA_NATIONAL_CAPITALS = {
  MY: ["Putrajaya"],
};

// Sourced role note shown next to a capital marker. Keyed `${iso}|${cityName}`.
// Only multi-capital / de-facto arrangements need a note; a sole capital shows none.
const CAPITAL_ROLES = {
  // Bolivia — Sucre is the constitutional capital and seat of the judiciary;
  // La Paz is the seat of the executive and legislative branches.
  "BO|Sucre": "Constitutional capital",
  "BO|La Paz": "Seat of government",
  // South Africa — three capitals, one per branch of government.
  "ZA|Pretoria": "Executive capital",
  "ZA|Cape Town": "Legislative capital",
  "ZA|Bloemfontein": "Judicial capital",
  // Côte d'Ivoire — Yamoussoukro is the official political capital; Abidjan is
  // the economic capital and de-facto seat of government.
  "CI|Yamoussoukro": "Political capital",
  "CI|Abidjan": "Economic capital / seat of government",
  // Eswatini — two capitals.
  "SZ|Mbabane": "Administrative capital",
  "SZ|Lobamba": "Royal & legislative capital",
  // Switzerland has no de jure capital; Bern is the "federal city" (de facto).
  "CH|Bern": "De facto capital (federal city)",
  // Malaysia — constitutional vs administrative capital.
  "MY|Kuala Lumpur": "Constitutional capital",
  "MY|Putrajaya": "Administrative capital",
};

// Largest-city corrections where NE's urban-agglomeration pop_max misranks the
// city-proper largest city. Each is the well-established largest city of its
// country by city-proper population. (Not shown by the current capitals-only
// overlay, but kept so the data stays correct if largest cities are shown again.)
const LARGEST_OVERRIDE = {
  // NE ranks George Town (Penang conurbation) first; Kuala Lumpur is Malaysia's
  // largest city (and is also its constitutional capital).
  MY: "Kuala Lumpur",
  // NE ranks Geneva first (its agglomeration spills across the French border);
  // Zürich is Switzerland's largest city.
  CH: "Zürich",
};

// Subdivision capital/largest overrides, keyed by ISO 3166-2 code. Used where
// Natural Earth's Admin-1 capital tags do not map to this app's subdivision
// codes — most importantly the United Kingdom, whose app subdivisions are the
// four constituent countries (GB-ENG/SCT/WLS/NIR) while NE tags historic-county
// capitals. City names are resolved to coordinates from the NE extract.
const SUBNATIONAL_OVERRIDE = {
  "GB-ENG": { capital: "London", largest: "London" },
  "GB-SCT": { capital: "Edinburgh", largest: "Glasgow" },
  "GB-WLS": { capital: "Cardiff", largest: "Cardiff" },
  "GB-NIR": { capital: "Belfast", largest: "Belfast" },
  // Selangor (MY-10) — Natural Earth tags BOTH Shah Alam and Kelang (Klang) as
  // "Admin-1 capital", and the auto-picker takes the higher-population one (Klang,
  // 956k) over Shah Alam (482k). But Shah Alam has been Selangor's administrative
  // STATE capital since 1978; Klang is the state's ROYAL capital, not the seat of
  // government. Pin Shah Alam so the capital marker matches Selangor's actual
  // administrative capital (and this app's own CAPITAL_DETAILS, which already
  // records Shah Alam). Largest city stays Klang (NE's highest-pop Selangor city).
  "MY-10": { capital: "Shah Alam", largest: "Kelang" },
  // Natural Earth tags another city as the capital; the right one is in NE too.
  // Each is the subdivision's Wikidata capital (P36), confirmed on its English
  // Wikipedia article. (2026-09 audit, batch 7c.)
  "CU-12": { capital: "Bayamo" }, // Granma — not Manzanillo; Q115382
  "ES-BA": { capital: "Badajoz" }, // Province of Badajoz — Mérida is the capital of Extremadura; Q15679
  "ET-OR": { capital: "Addis Ababa" }, // Oromia's capital (Finfinne), outside the region's polygon; Q3624
  "GL-QA": { capital: "Ilulissat" }, // Qaasuitsup — not Qaanaaq; Q191047
  "KZ-ALM": { capital: "Qapshaghay" }, // Almaty Region's capital since 2022, renamed Qonayev; Q1816833
  "KZ-YUZ": { capital: "Turkistan" }, // Turkistan Region's capital since 2018, not Shymkent; Q848638
  "NO-02": { capital: "Oslo" }, // Akershus's administrative centre is Oslo, outside the county; Q585
  "NZ-HKB": { capital: "Napier" }, // Hawke's Bay Regional Council sits in Napier, not Hastings; Q203380
  "NZ-MWT": { capital: "Palmerston North" }, // Horizons Regional Council, not Whanganui; Q212289
  "PE-LIM": { capital: "Huacho" }, // Lima Region — not the neighbouring town of Huaura; Q1002052
  "SS-EC": { capital: "Juba" }, // Central Equatoria — not Yei; Q1947
  "UY-MA": { capital: "Maldonado" }, // Maldonado Department — not Punta del Este; Q16258
  "VE-A": { capital: "Caracas" }, // Capital District — Los Teques is Miranda's capital; Q1533
};

// Subdivisions whose Natural Earth capital is WRONG and whose real capital is not
// in the extract. The NE capital is dropped, so the Wikidata fallback layer
// (src/data/subdivisionCapitals.ts, build-subdivision-capitals.mjs) supplies the
// right city with its own coordinates. Each reason names what NE gets wrong and
// cites the capital's Wikidata item. (2026-09 audit, batch 7c.)
const NE_CAPITAL_BLOCK = {
  "AF-PKA": "NE's \"Zareh Sharan\" point is 50 km from Paktika's capital Sharana (Q2615863)",
  "FM-PNI": "Palikir is the national capital; Pohnpei State's capital is Kolonia (Q514165)",
  "GE-SK": "Tskhinvali is not Shida Kartli's capital; Georgia seats the region in Gori (Q19583)",
  "GY-DE": "Georgetown is the national capital, a municipality of its own; Region 4's Regional Democratic Council sits at Triumph (Q6152928)",
  "ID-KS": "Banjarmasin was South Kalimantan's capital until 2022; it is now Banjarbaru (Q14181)",
  "IL-Z": "Nazareth is the Northern District's largest city; its capital is Nof HaGalil (Q167659)",
  "NO-01": "Moss is not Østfold's administrative centre; it is Sarpsborg (Q108025)",
  "PH-BEN": "Baguio is an independent city; Benguet's capital is La Trinidad (Q30351)",
  "PY-11": "Ypacaraí is not Central Department's capital; it is Areguá (Q135975)",
  "RO-HR": "NE's \"Miercurea Cuic\" (sic) lies 21 km west of Miercurea Ciuc (Q193420)",
  "RU-IN": "Nazran was Ingushetia's capital until 2002; it is now Magas (Q5222)",
};

// Rename a Natural Earth SUBDIVISION-capital label to the English name Wikidata
// gives the SAME city — the subdivision's own capital (P36), which is the item
// CAPITAL_DETAILS and CAPITAL_FLAGS are sourced from. Same city, same NE
// coordinates: NE simply romanises the name differently. It matters because the
// Learn panel shows a capital's population and flag only when the two names agree
// (sameCity() in src/lib/capitalInfo.ts), so a spelling variant silently hid them.
// Keyed `${code}|${neName}`; each row cites the Wikidata item. Never use this to
// swap in a DIFFERENT city — that is SUBNATIONAL_OVERRIDE's job, with a reason.
const SUBNATIONAL_NAME_ALIAS = {
  // Paktia (AF-PIA) — capital Gardez, Wikidata Q467632; NE "Gardiz".
  "AF-PIA|Gardiz": "Gardez",
  // Catamarca (AR-K) — San Fernando del Valle de Catamarca, Wikidata Q44162.
  "AR-K|Catamarca": "San Fernando del Valle de Catamarca",
  // East Flanders (BE-VOV) — Ghent, Wikidata Q1296.
  "BE-VOV|Gent": "Ghent",
  // West Flanders (BE-VWV) — Bruges, Wikidata Q12994.
  "BE-VWV|Brugge": "Bruges",
  // Gomel Region (BY-HO) — Gomel, Wikidata Q2678.
  "BY-HO|Homyel": "Gomel",
  // Vitebsk Region (BY-VI) — Vitebsk, Wikidata Q102217.
  "BY-VI|Vitsyebsk": "Vitebsk",
  // Cayo (BZ-CY) — San Ignacio, Wikidata Q724815; San Ignacio is also called Cayo.
  "BZ-CY|El Cayo": "San Ignacio",
  // St. Gallen (CH-SG) — St. Gallen, Wikidata Q25607.
  "CH-SG|Saint Gallen": "St. Gallen",
  // Aysén (CL-AI) — Coyhaique, Wikidata Q3810.
  "CL-AI|Coihaique": "Coyhaique",
  // Plzeň Region (CZ-PL) — Plzeň, Wikidata Q43453; NE misspells it.
  "CZ-PL|Pizen": "Plzeň",
  // Dakahlia (EG-DK) — Mansoura, Wikidata Q223587.
  "EG-DK|El Mansura": "Mansoura",
  // Minya (EG-MN) — Minya, Wikidata Q310117.
  "EG-MN|El Minya": "Minya",
  // Matrouh (EG-MT) — Marsa Matruh, Wikidata Q393829.
  "EG-MT|Matruh": "Marsa Matruh",
  // North Sinai (EG-SIN) — Arish, Wikidata Q238452.
  "EG-SIN|El Arish": "Arish",
  // Abkhazia (GE-AB) — Sokhumi, Wikidata Q40811; Wikidata's English label.
  "GE-AB|Sukhumi": "Sokhumi",
  // Bay Islands (HN-IB) — Coxen Hole, Wikidata Q2396956; the seat of Roatán municipality.
  "HN-IB|Roatán": "Coxen Hole",
  // Central Kalimantan (ID-KT) — Palangka Raya, Wikidata Q14409.
  "ID-KT|Palangkaraya": "Palangka Raya",
  // Southern District (IL-D) — Beersheba, Wikidata Q41843.
  "IL-D|Beer Sheva": "Beersheba",
  // Bushehr (IR-18) — capital Bushehr, Wikidata Q158928; NE adds "Bandar-e" (port).
  "IR-18|Bandar-e Bushehr": "Bushehr",
  // Hormozgan (IR-22) — capital Bandar Abbas, Wikidata Q154814.
  "IR-22|Bandar-e-Abbas": "Bandar Abbas",
  // North Khorasan (IR-28) — capital Bojnord, Wikidata Q317946.
  "IR-28|Bojnurd": "Bojnord",
  // Tafilah (JO-AT) — Tafilah, Wikidata Q2550996.
  "JO-AT|At Tafilah": "Tafilah",
  // Zarqa (JO-AZ) — Zarqa, Wikidata Q148062.
  "JO-AZ|Az Zarqa": "Zarqa",
  // Balqa (JO-BA) — Salt, Wikidata Q867586.
  "JO-BA|As Salt": "Salt",
  // Mafraq (JO-MA) — Mafraq, Wikidata Q276747.
  "JO-MA|Al Mafraq": "Mafraq",
  // Jalal-Abad Region (KG-J) — Manas, Wikidata Q487689; the city was renamed Manas in September 2025.
  "KG-J|Jalal Abad": "Manas",
  // Almaty Region (KZ-ALM) — Qonayev, Wikidata Q1816833; NE still has its old name, Qapshaghay (Kapchagay), renamed in 2022.
  "KZ-ALM|Qapshaghay": "Qonayev",
  // Kostanay Region (KZ-KUS) — Kostanay, Wikidata Q488990; NE misspells it.
  "KZ-KUS|Oostanay": "Kostanay",
  // Ömnögovi (MN-053) — Dalanzadgad, Wikidata Q822808.
  "MN-053|Dalandzadgad": "Dalanzadgad",
  // Puebla (MX-PUE) — Heroica Puebla de Zaragoza, Wikidata Q125293; the city's official name.
  "MX-PUE|Puebla": "Heroica Puebla de Zaragoza",
  // Querétaro (MX-QUE) — Santiago de Querétaro, Wikidata Q173121.
  "MX-QUE|Querétaro": "Santiago de Querétaro",
  // Alba (RO-AB) — Alba Iulia, Wikidata Q174665; NE misspells it.
  "RO-AB|Alba Lulia": "Alba Iulia",
  // Covasna (RO-CV) — Sfântu Gheorghe, Wikidata Q202362.
  "RO-CV|Sfintu-Gheorghe": "Sfântu Gheorghe",
  // Mureș (RO-MS) — Târgu Mureș, Wikidata Q186349.
  "RO-MS|Tirgu Mures": "Târgu Mureș",
  // Arkhangelsk Oblast (RU-ARK) — Arkhangelsk, Wikidata Q1851.
  "RU-ARK|Archangel": "Arkhangelsk",
  // Novgorod Oblast (RU-NGR) — Veliky Novgorod, Wikidata Q2235.
  "RU-NGR|Velikiy Novgorod": "Veliky Novgorod",
  // Oryol Oblast (RU-ORL) — Oryol, Wikidata Q3118.
  "RU-ORL|Orel": "Oryol",
  // Västra Götaland (SE-O) — Gothenburg, Wikidata Q25287.
  "SE-O|Göteborg": "Gothenburg",
  // La Libertad (SV-LI) — Santa Tecla, Wikidata Q723246; named Nueva San Salvador until 2003.
  "SV-LI|Nueva San Salvador": "Santa Tecla",
  // Vinnytsia Oblast (UA-05) — Vinnytsia, Wikidata Q157144.
  "UA-05|Vinnytsya": "Vinnytsia",
  // Zakarpattia Oblast (UA-21) — Uzhhorod, Wikidata Q156711.
  "UA-21|Uzhgorod": "Uzhhorod",
  // Zaporizhzhia Oblast (UA-23) — Zaporizhzhia, Wikidata Q157835.
  "UA-23|Zaporizhzhya": "Zaporizhzhia",
  // Kirovohrad Oblast (UA-35) — Kropyvnytskyi, Wikidata Q158292; renamed from Kirovohrad in 2016.
  "UA-35|Kirovohrad": "Kropyvnytskyi",
  // Mykolaiv Oblast (UA-48) — Mykolaiv, Wikidata Q41572.
  "UA-48|Mykolayiv": "Mykolaiv",
  // Odesa Oblast (UA-51) — Odesa, Wikidata Q1874.
  "UA-51|Odessa": "Odesa",
  // Khmelnytskyi Oblast (UA-68) — Khmelnytskyi, Wikidata Q156717.
  "UA-68|Khmelnytskyy": "Khmelnytskyi",
  // Minnesota (US-MN) — Saint Paul, Wikidata Q28848; NE's label is "St.  Paul" (double space, collapsed by cleanName).
  "US-MN|St. Paul": "Saint Paul",
};

/** A subdivision city record, carrying its SUBNATIONAL_NAME_ALIAS spelling. */
function subCityFrom(code, pl) {
  return cityFrom(pl, undefined, pl ? SUBNATIONAL_NAME_ALIAS[`${code}|${pl.name}`] : undefined);
}

// --- Load Natural Earth extract ---------------------------------------------

const fc = JSON.parse(readFileSync(NE, "utf8"));

/** Normalise a place/subdivision name for matching (diacritics, case, noise). */
function norm(s) {
  return String(s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/^(city|province|state|prefecture|emirate|canton|region|department)\s+of\s+/i, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/**
 * A place name as it is shown: NE carries invisible bidi / zero-width marks
 * ("Granada‎") and doubled spaces ("Washington,  D.C.", "St.  Petersburg")
 * in a few names. They print as-is in the capital panel and can defeat name
 * matching, so strip the marks and collapse the spaces. Spelling is untouched.
 */
function cleanName(s) {
  return String(s || "")
    .replace(/[​-‏‪-‮⁦-⁩﻿]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** All NE places, normalised to a small record. */
const places = fc.features.map((f) => {
  const p = f.properties;
  return {
    name: cleanName(p.name),
    iso: p.iso_a2,
    adm1: p.adm1name,
    adm0cap: Number(p.adm0cap) === 1,
    capalt: Number(p.capalt) === 1,
    featurecla: p.featurecla || "",
    pop: Number(p.pop_max) || 0,
    lon: Number(p.longitude),
    lat: Number(p.latitude),
  };
});

const placesByIso = new Map();
for (const pl of places) {
  if (!pl.iso) continue;
  if (!placesByIso.has(pl.iso)) placesByIso.set(pl.iso, []);
  placesByIso.get(pl.iso).push(pl);
}

/** Find a place by name within a country (normalised match). */
function findPlace(iso, name) {
  const want = norm(name);
  if (!want) return null;
  const arr = placesByIso.get(iso) || [];
  return (
    arr.find((p) => norm(p.name) === want) ||
    arr.find((p) => norm(p.name).includes(want) || want.includes(norm(p.name))) ||
    null
  );
}

/** True when two place names refer to the same city (fuzzy, diacritic-insensitive). */
function sameName(a, b) {
  const x = norm(a), y = norm(b);
  return x === y || x.includes(y) || y.includes(x);
}

const round = (n) => Math.round(n * 1e4) / 1e4;
function cityFrom(pl, note, nameOverride) {
  if (!pl || !isFinite(pl.lon) || !isFinite(pl.lat)) return null;
  const c = { name: nameOverride || pl.name, lon: round(pl.lon), lat: round(pl.lat) };
  if (pl.pop > 0) c.population = pl.pop;
  if (note) c.note = note;
  return c;
}

// --- Build national cities ---------------------------------------------------

const national = {};
const unresolvedNationalCapital = [];
for (const iso of NATIONAL_ISO) {
  const arr = placesByIso.get(iso) || [];

  // 1) Explicit curated multi-capital override wins outright.
  let capitals = null;
  if (NATIONAL_CAPITAL_OVERRIDE[iso]) {
    capitals = NATIONAL_CAPITAL_OVERRIDE[iso]
      .map((nm) => {
        const pl = findPlace(iso, nm);
        return pl ? cityFrom(pl, CAPITAL_ROLES[`${iso}|${nm}`], nm) : null;
      })
      .filter(Boolean);
  } else {
    // 2) NE adm0cap places, minus historical blocks, plus curated extras.
    let capPlaces = arr.filter(
      (p) => p.adm0cap && !HISTORICAL_CAPITAL_BLOCK.has(`${iso}|${p.name}`),
    );
    for (const extra of EXTRA_NATIONAL_CAPITALS[iso] || []) {
      const pl = findPlace(iso, extra);
      if (pl && !capPlaces.includes(pl)) capPlaces.push(pl);
    }

    // 3) Reconcile with the authoritative capital. If NE's adm0cap city/cities
    //    do not include the authoritative capital, NE is stale/wrong — trust
    //    COUNTRY_FACTS and take just the coordinates from NE.
    const factCap = FACT_CAPITAL[iso];
    if (factCap && !capPlaces.some((p) => sameName(p.name, factCap))) {
      const pl = findPlace(iso, factCap);
      if (pl) capPlaces = [pl];
      else if (capPlaces.length === 0) unresolvedNationalCapital.push(`${iso} (${factCap})`);
      // else: keep NE's adm0cap city (authoritative name absent from NE, e.g.
      // a spelling variant NE renders differently — København, Ulaanbaatar…).
    }

    capitals = capPlaces
      .map((p) => {
        const name = NE_NAME_ALIAS[`${iso}|${p.name}`] || p.name;
        return cityFrom(p, CAPITAL_ROLES[`${iso}|${name}`], name);
      })
      .filter(Boolean);
  }

  // Primary capital first (by population).
  capitals.sort((a, b) => (b.population || 0) - (a.population || 0));

  // Largest city: curated override, else NE max pop_max.
  let largest = null;
  if (LARGEST_OVERRIDE[iso]) largest = cityFrom(findPlace(iso, LARGEST_OVERRIDE[iso]));
  if (!largest) {
    const top = [...arr].sort((a, b) => b.pop - a.pop)[0];
    largest = top ? cityFrom(top) : null;
  }

  if (capitals.length || largest) {
    national[iso] = {};
    if (capitals.length) national[iso].capitals = capitals;
    if (largest) national[iso].largest = largest;
  }
}

// --- Build subnational cities ------------------------------------------------
//
// Natural Earth's `adm1name` field cannot be trusted to map a city to a
// subdivision (encoding corruption + name drift). Instead we assign each city to
// a subdivision GEOMETRICALLY: a point-in-polygon test of the city's coordinates
// against this app's own subdivision polygons (public/subdivisions/{CC}.json),
// keyed by the same iso_3166_2 code the maps use. Geography decides.

function pointInRing(pt, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0], yi = ring[i][1];
    const xj = ring[j][0], yj = ring[j][1];
    const hit =
      yi > pt[1] !== yj > pt[1] &&
      pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi;
    if (hit) inside = !inside;
  }
  return inside;
}
function pointInPolygon(pt, rings) {
  if (!pointInRing(pt, rings[0])) return false; // outside outer ring
  for (let k = 1; k < rings.length; k++) if (pointInRing(pt, rings[k])) return false; // in a hole
  return true;
}
function pointInGeometry(pt, geom) {
  if (!geom) return false;
  if (geom.type === "Polygon") return pointInPolygon(pt, geom.coordinates);
  if (geom.type === "MultiPolygon")
    return geom.coordinates.some((poly) => pointInPolygon(pt, poly));
  return false;
}

const subnational = {};
const noGeo = [];

// Group NE places by the subdivision polygon that geographically contains them.
const placesByCode = new Map();
for (const iso of SUBNATIONAL_ISO) {
  const path = resolve(SUBDIV_DIR, `${iso}.json`);
  if (!existsSync(path)) {
    noGeo.push(iso);
    continue;
  }
  const sub = JSON.parse(readFileSync(path, "utf8"));
  for (const pl of placesByIso.get(iso) || []) {
    if (!isFinite(pl.lon) || !isFinite(pl.lat)) continue;
    const pt = [pl.lon, pl.lat];
    const feat = sub.features.find((f) => pointInGeometry(pt, f.geometry));
    const code = feat?.properties?.iso_3166_2?.trim().toUpperCase();
    if (!code) continue;
    if (!placesByCode.has(code)) placesByCode.set(code, []);
    placesByCode.get(code).push(pl);
  }
}

// Auto-derive capital + largest for each subdivision.
//   • capital — the contained city Natural Earth tags as an Admin-1 capital
//     (highest-population one if several); falls back to any capital tag so a
//     national capital sitting inside a subdivision (Tokyo in JP-13, Buenos Aires
//     in AR-C) is also recognised as that subdivision's capital.
//   • largest — the highest-population contained city.
for (const [code, arr] of placesByCode) {
  const byPop = (a, b) => b.pop - a.pop;
  const capPlace =
    [...arr].filter((p) => /Admin-1.*capital/i.test(p.featurecla)).sort(byPop)[0] ||
    [...arr].filter((p) => /capital/i.test(p.featurecla)).sort(byPop)[0] ||
    null;
  const largestPlace = [...arr].sort(byPop)[0] || null;
  const entry = {};
  const cap = subCityFrom(code, capPlace);
  const lrg = subCityFrom(code, largestPlace);
  if (cap) entry.capital = cap;
  if (lrg) entry.largest = lrg;
  if (entry.capital || entry.largest) subnational[code] = entry;
}

// Apply curated subnational overrides (resolved to coordinates from NE).
for (const [code, ov] of Object.entries(SUBNATIONAL_OVERRIDE)) {
  const iso = code.split("-")[0];
  const entry = subnational[code] ? { ...subnational[code] } : {};
  if (ov.capital) {
    const c = subCityFrom(code, findPlace(iso, ov.capital));
    if (c) entry.capital = c;
  }
  if (ov.largest) {
    const c = subCityFrom(code, findPlace(iso, ov.largest));
    if (c) entry.largest = c;
  }
  if (entry.capital || entry.largest) subnational[code] = entry;
}

// Drop the Natural Earth capitals we know to be wrong (see NE_CAPITAL_BLOCK).
for (const code of Object.keys(NE_CAPITAL_BLOCK)) {
  const entry = subnational[code];
  if (!entry?.capital) continue;
  delete entry.capital;
  if (!entry.largest) delete subnational[code];
}

// --- Emit --------------------------------------------------------------------

const header = `// AUTO-GENERATED by scripts/build-cities.mjs — do not edit by hand.
// Re-run: node scripts/build-cities.mjs
//
// City overlay data for the Learn-mode maps: national capitals + largest city,
// and per-subdivision capitals + largest city, for every UN member state and
// every country whose subdivisions the game shows.
//
// SOURCING (hard rule — CLAUDE.md "City data must be sourced, never fabricated"):
// candidate cities, capital tagging, coordinates and populations come from
// Natural Earth 10m populated places; NATIONAL capitals are reconciled against
// the authoritative COUNTRY_FACTS.capital (mledoze/countries) so a stale/ambiguous
// NE adm0cap tag (e.g. Dar es Salaam for Tanzania, "Nur-Sultan" for Kazakhstan)
// is corrected. A small cited correction layer in the generator adds sourced role
// notes for multi-capital / de-facto arrangements and fixes NE's largest-city
// mis-rankings. Nothing here is invented; unresolved data is omitted.

export type City = {
  /** City name as published by the source. */
  name: string;
  /** Longitude / latitude (WGS84) for plotting on the Equal Earth projection. */
  lon: number;
  lat: number;
  /** Population (Natural Earth urban-area figure). Optional. */
  population?: number;
  /** Sourced role note for multi-capital / de-facto capitals (e.g. "Executive
   *  capital"). Absent for a sole capital or a plain largest city. */
  note?: string;
};

export type NationalCities = {
  /** One or more current capitals (Bolivia has 2, South Africa has 3). */
  capitals?: City[];
  /** The single largest city by population. */
  largest?: City;
};

export type SubnationalCities = {
  capital?: City;
  largest?: City;
};

/** Keyed by ISO 3166-1 alpha-2 country code. */
export const NATIONAL_CITIES: Readonly<Record<string, NationalCities>> = ${stringify(national)};

/** Keyed by ISO 3166-2 subdivision code. */
export const SUBNATIONAL_CITIES: Readonly<Record<string, SubnationalCities>> = ${stringify(subnational)};
`;

writeFileSync(OUT, header, "utf8");

function stringify(obj) {
  const keys = Object.keys(obj).sort();
  const lines = keys.map((k) => `  ${JSON.stringify(k)}: ${JSON.stringify(obj[k])},`);
  return `{\n${lines.join("\n")}\n}`;
}

console.log(
  `Wrote ${Object.keys(national).length} national + ${Object.keys(subnational).length} subnational entries to ${OUT}`,
);
if (unresolvedNationalCapital.length)
  console.log(`National capital unresolved (omitted): ${unresolvedNationalCapital.join(", ")}`);
if (noGeo.length) console.log(`No subdivision polygons for: ${noGeo.join(", ")}`);
