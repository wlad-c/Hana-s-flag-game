/**
 * Build src/lib/subdivisionMeta.ts from public/subdivisions/*.json files.
 * Run: node scripts/build-subdivision-meta.mjs
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

const INPUT_DIR = join(projectRoot, 'public', 'subdivisions');
const OUTPUT = join(projectRoot, 'src', 'lib', 'subdivisionMeta.ts');

// Plural overrides
function pluralize(type) {
  const t = (type || '').trim();
  if (!t) return 'Divisions';
  // Special cases
  if (t === 'Land') return 'Länder';
  if (t === 'Territory') return 'Territories';
  if (t === 'External Territory') return 'External Territories';
  if (t === 'Unincorporated Territory') return 'Unincorporated Territories';
  if (t === 'County') return 'Counties';
  if (t === 'City') return 'Cities';
  if (t === 'Dependency') return 'Dependencies';
  if (t === 'Duchy') return 'Duchies';
  if (t === 'Autonomous Community') return 'Autonomous Communities';
  if (t === 'Autonomous Region') return 'Autonomous Regions';
  if (t === 'Autonomous Republic') return 'Autonomous Republics';
  if (t === 'Federal District') return 'Federal Districts';
  if (t === 'Union Territory') return 'Union Territories';
  // Default: append s
  return t + 's';
}

const PLURAL_LABEL_OVERRIDES = {
  "AU": "States & Territories",
  "CN": "Provinces & Special Territories",
  "DK": "Regions & Autonomous Territories",
  "ES": "Provinces, Autonomous Communities & Claimed Territory",
  "FI": "Provinces & Autonomous Territory",
  "FR": "Departments & Overseas Territories",
  "GB": "Countries, Crown Dependencies & Territories",
  "KR": "Provinces & Metropolitan Cities",
  "NL": "Provinces & Special Territories",
  "NO": "Counties & Dependencies",
  "NZ": "Regional Councils, Associated States & External Territories",
  "US": "States & Territories"
};

const SUBDIVISION_TYPE_OVERRIDES = {
  "AU-X03~": "Territory", // Macquarie Island
  "AU-X04~": "Territory", // Ashmore and Cartier Islands
  "CN-X01~": "Territory", // Paracel Islands
  "NO-X01~": "Territory", // Bouvet Island
  "NZ-X01~": "Territory", // Kermadec Islands
  "NZ-X03~": "Territory", // Three Kings Islands
  "NZ-X04~": "Territory", // Antipodes Islands
  "NZ-X05~": "Territory", // Campbell Islands
  "NZ-X06~": "Territory", // Auckland Islands
  "NZ-X07~": "Territory", // Snares Islands
  "SY-X01~": "Territory"  // Western al-Samadania
};

const SUBDIVISION_NAME_OVERRIDES_NEW = {
  // Countries below share ONE display name across two sibling subdivisions —
  // the national capital's own city-level unit and the surrounding
  // region/province of the same name (Natural Earth's name_en collapses both
  // to the plain place name). Besides being confusing in the flag grid, this
  // fed a real bug: the hierarchy chart/table used a name-only lookup to find
  // "the subdivision that IS the capital", and with two identically-named
  // siblings it could pick either one depending on array order — Argentina's
  // Buenos Aires Province (AR-B) wrongly got the "★ National capital" badge
  // instead of the Autonomous City (AR-C), which is Argentina's actual federal
  // capital (Const. art. 129) (reported 2026-07). `hierarchyData.ts` now
  // disambiguates via the authoritative NATIONAL_CAPITAL_SUBDIVISION
  // point-in-polygon host, but the two cards still need distinct names so a
  // user isn't looking at "Buenos Aires" / "Buenos Aires" side by side.
  // Names below are the official/ISO-3166-2 English designation for each.
  //
  // AR-C was ALSO left at the bare name "Buenos Aires" for a time, relying
  // solely on its typeLabel override ("Autonomous City") to disambiguate it
  // from AR-B in the flag grid — but the division search dropdown
  // (SubdivisionDropdown) shows no type badge at all, just the plain name, so
  // "Buenos Aires" there was still ambiguous with "Buenos Aires Province"
  // (reported 2026-07). Both siblings now carry a distinct, sourced name.
  "AR": {
    "AR-B": "Buenos Aires Province", // ISO 3166-2:AR — surrounding province, not the capital
    // Officially "Ciudad Autónoma de Buenos Aires" per ISO 3166-2:AR and
    // Argentina's 1994 Constitution art. 129; English per the en.wikipedia
    // title "Autonomous City of Buenos Aires" (the same translation already
    // cited for its flag's source in flagMeanings.ts).
    "AR-C": "Autonomous City of Buenos Aires"
  },
  "BG": {
    "BG-22": "Sofia (Capital)", // ISO 3166-2:BG official EN name "Sofia (stolitsa)" — the capital city-district
    // ISO 3166-2:BG names the surrounding province plain "Sofia"; English
    // Wikipedia's "Sofia Province" keeps it apart from the city (2026-09 audit:
    // the quiz named both "Sofia" when accepting either as the capital).
    "BG-23": "Sofia Province"
  },
  "HR": {
    "HR-01": "Zagreb County", // ISO 3166-2:HR official EN name
    "HR-21": "Zagreb City" // ISO 3166-2:HR official EN name
  },
  "MX": {
    // Natural Earth's name_en for the capital is just "Mexico", the name of the country and
    // (near enough) of the surrounding State of Mexico (MX-MEX). The 2016 constitutional reform
    // (decree of 29 January 2016) turned the Distrito Federal into Ciudad de México, and ISO
    // 3166-2:MX recoded it MX-CMX, "Mexico City (Ciudad de México)". The app keeps Natural
    // Earth's MX-DIF code. 2026-09 audit.
    "MX-DIF": "Mexico City"
  },
  "VE": {
    // Natural Earth's name_en is just "Capital", so the capital card read "Capital of Capital".
    // ISO 3166-2:VE: VE-A "Distrito Capital"; en.wikipedia "Capital District (Venezuela)". 2026-09 audit.
    "VE-A": "Capital District"
  },
  "RU": {
    "UA-43": "Republic of Crimea",
    "UA-40": "Sevastopol",
    // ISO 3166-2:RU — RU-MOW is Moskva (the federal city), RU-MOS is Moskovskaya
    // oblast'. Natural Earth had the two codes SWAPPED; this override used to paper
    // over that by renaming RU-MOW "Moscow Oblast", which made every Wikidata-keyed
    // figure land on the wrong card (the city showed the oblast's population and
    // Krasnogorsk as its capital). RU.json now carries the correct ISO codes
    // (2026-09 subnational flag audit), so only the oblast needs an English name.
    "RU-MOS": "Moscow Oblast"
  },
  "UA": {
    "UA-32": "Kyiv Oblast" // the surrounding region; UA-30 is Kyiv City itself
  },
  "UZ": {
    "UZ-TO": "Tashkent Region", // the surrounding region
    "UZ-TK": "Tashkent City" // ISO 3166-2:UZ official EN name — the capital city
  },
  "YE": {
    "YE-SA": "Sanaa City" // Amanat Al-Asimah, the capital municipality; YE-SN is the surrounding governorate
  },
  "FR": {
    // Natural Earth's name_en for FR-64 is the anglicised, mis-spelled
    // "Pyrenees-Atlantics". Correct it to the official French spelling.
    "FR-64": "Pyrénées-Atlantiques"
  },
  "PA": {
    // Natural Earth mislabels PA-1: its name_en is "comarca Ngäbe-Buglé"
    // (which is actually PA-NB) while its name/geometry is Bocas del Toro.
    // PA-1 is the Province of Bocas del Toro per ISO 3166-2:PA.
    "PA-1": "Bocas del Toro"
  },
  "PG": {
    // Source name_en for PG-NSB is a truncated "of Bougainville" (from
    // "Autonomous Region of Bougainville"); its name is the former "North
    // Solomons". Use the current short name.
    "PG-NSB": "Bougainville"
  },
  "BR": {
    // Natural Earth's name_en for BR-DF is the truncated "Federal" (from
    // "Distrito Federal"). Correct it to the official Portuguese name.
    "BR-DF": "Distrito Federal"
  },
  "MY": {
    // Natural Earth gives the Malay "Melaka" for MY-04 but anglicises its
    // sibling MY-07 to "Penang" — an inconsistency. The app's convention is the
    // common English name (Penang, not Pulau Pinang), and the capital city is
    // already "Malacca" (capitalDetails/cities), so standardise the state on
    // "Malacca" too: one romanisation for the state and its capital.
    "MY-04": "Malacca"
  },
  "GR": {
    // Natural Earth's name_en is the transliterated Greek, not the established
    // English exonym: GR-E "Thessalia" → "Thessaly"; GR-B "Centre Macedonia" is
    // a mistranslation of "Κεντρική Μακεδονία" → "Central Macedonia".
    "GR-E": "Thessaly",
    "GR-B": "Central Macedonia"
  },
  "CZ": {
    // Natural Earth's name_en for CZ-PL is the truncated "Plzeň-" (from
    // "Plzeňský kraj"). Use the established English exonym for the city the
    // region is named after: Pilsen.
    "CZ-PL": "Pilsen"
  },
  "IT": {
    // Natural Earth's name_en for IT-GE is the region, "Liguria". The unit is
    // the Metropolitan City of Genoa (ISO 3166-2:IT "Genova"); the app uses the
    // English city name for every Italian province, as for Milan and Naples.
    "IT-GE": "Genoa"
  },
  "BY": {
    // Natural Earth names both Minsk units "Minsk". BY-MI is Minsk Region (the
    // large polygon, with a hole for the city) and BY-HM is the city of Minsk
    // (ISO 3166-2:BY: Minskaja voblasć / Horad Minsk). 2026-09 audit.
    "BY-MI": "Minsk Region"
  },
  "CO": {
    // Natural Earth's name_en for CO-SAP is "Archipelago of Saint Andréws", a
    // garbled translation. English Wikipedia names the department "San Andrés and
    // Providencia" (Spanish: San Andrés y Providencia). 2026-09 audit.
    "CO-SAP": "San Andrés and Providencia"
  },
  "US": {
    // Natural Earth's name_en for US-DC is the bare "Washington" — identical
    // to the display name of the State of Washington (US-WA), a completely
    // unrelated subdivision, so the two show as two identically-labelled
    // "Washington" cards in the flag grid/hierarchy/dropdown (reported
    // 2026-07). US-DC's own capital-city record (cities.ts/capitalDetails.ts)
    // is already "Washington, D.C." everywhere else in the app — use that
    // same, disambiguating name for the subdivision itself too.
    "US-DC": "Washington, D.C."
  }
};

const SUBDIVISION_TYPE_OVERRIDES_NEW = {
  "KR": {
    // Natural Earth's type_en is wrong for South Korea: it tags South Jeolla (KR-46)
    // and North Gyeongsang (KR-47) as "Metropolitan City" (they are provinces), and
    // Seoul as "Capital Metropolitan City". Categories follow ISO 3166-2:KR (special
    // city / metropolitan city / province / special self-governing province / special
    // self-governing city) and Korean law, which made Gangwon (11 June 2023, Gangwon
    // State) and Jeonbuk (18 January 2024, Jeonbuk State) special self-governing
    // provinces like Jeju (2006). ISO still lists Jeonbuk as a province. 2026-09 audit.
    "KR-11": "Special City",
    "KR-41": "Province", "KR-43": "Province", "KR-44": "Province",
    "KR-46": "Province", "KR-47": "Province", "KR-48": "Province",
    "KR-42": "Special Self-Governing Province", "KR-45": "Special Self-Governing Province",
    "KR-49": "Special Self-Governing Province",
    "KR-50": "Special Self-Governing City",
  },
  "BY": {
    // Natural Earth swaps the two Minsk types: it calls the region (BY-MI, which
    // surrounds the city) a "Municipality" and the city (BY-HM) a "Region".
    // ISO 3166-2:BY: BY-MI is an oblast (region) like the other five, and BY-HM,
    // Horad Minsk, is a city. 2026-09 audit.
    "BY-MI": "Region", "BY-HM": "City",
  },
  "MX": {
    // The Distrito Federal ended with the 2016 reform: Mexico City is a federal entity with a
    // status equal to a state's, and ISO 3166-2:MX lists it as "federal entity" beside the 31
    // states. 2026-09 audit.
    "MX-DIF": "Federal Entity",
  },
  "CO": {
    // Natural Earth keeps Colombia's pre-1991 statuses, misspelling one of them
    // ("Commissiary"). The 1991 Constitution, art. 309, made the intendancies of Arauca,
    // Casanare and Putumayo and the commissaries of Amazonas, Guaviare, Guainía, Vaupés
    // and Vichada departments. Caquetá was made a department on 15 December 1981. Bogotá
    // "se organiza como Distrito Capital" (art. 322): a capital district, not a federal
    // district. ISO 3166-2:CO lists 32 departments and one capital district. 2026-09 audit.
    "CO-ARA": "Department", "CO-CAS": "Department", "CO-PUT": "Department",
    "CO-AMA": "Department", "CO-GUV": "Department", "CO-GUA": "Department",
    "CO-VAU": "Department", "CO-VID": "Department", "CO-CAQ": "Department",
    "CO-DC": "Capital District",
  },
  "EE": {
    // Natural Earth types Saare as "Novads" / "Municipality" (novads is the Latvian word
    // for a municipality). EE-74 is Saare County, one of Estonia's 15 counties
    // (maakonnad) in ISO 3166-2:EE, like the other 14 cards. 2026-09 audit.
    "EE-74": "County",
  },
  "ES": {
    // Natural Earth tags every Spanish PROVINCE with the type of the autonomous
    // community it belongs to ("Comunidad Autónoma"), so all 50 cards read
    // "Autonomous Community". The app's ES codes are ISO 3166-2:ES PROVINCE codes
    // (the 17 communities have their own codes, ES-AN, ES-CT…). The seven
    // single-province communities (Asturias ES-O, Cantabria ES-S, Balearic
    // Islands ES-PM, La Rioja ES-LO, Madrid ES-M, Murcia ES-MU, Navarre ES-NA)
    // are both at once and keep "Autonomous Community"; the other 43 are
    // provinces (ISO 3166-2:ES; Spanish Constitution art. 141). 2026-09 audit.
    "ES-A": "Province", "ES-AB": "Province", "ES-AL": "Province", "ES-AV": "Province", "ES-B": "Province",
    "ES-BA": "Province", "ES-BI": "Province", "ES-BU": "Province", "ES-C": "Province", "ES-CA": "Province",
    "ES-CC": "Province", "ES-CO": "Province", "ES-CR": "Province", "ES-CS": "Province", "ES-CU": "Province",
    "ES-GC": "Province", "ES-GI": "Province", "ES-GR": "Province", "ES-GU": "Province", "ES-H": "Province",
    "ES-HU": "Province", "ES-J": "Province", "ES-L": "Province", "ES-LE": "Province", "ES-LU": "Province",
    "ES-MA": "Province", "ES-OR": "Province", "ES-P": "Province", "ES-PO": "Province", "ES-SA": "Province",
    "ES-SE": "Province", "ES-SG": "Province", "ES-SO": "Province", "ES-SS": "Province", "ES-T": "Province",
    "ES-TE": "Province", "ES-TF": "Province", "ES-TO": "Province", "ES-V": "Province", "ES-VA": "Province",
    "ES-VI": "Province", "ES-Z": "Province", "ES-ZA": "Province",
  },
  "RU": {
    "UA-43": "Republic",
    "UA-40": "Federal City"
  },
  "UA": {
    "UA-40": "Special Status City"
  },
  "AR": {
    // AR-C is the Autonomous City of Buenos Aires (Ciudad Autónoma de Buenos
    // Aires) — Argentina's federal capital under Const. art. 129, a city-level
    // entity with province-equivalent status, distinct from AR-B (Buenos
    // Aires Province, an ordinary province). Natural Earth's type_en wrongly
    // tags BOTH "Federal District" (only AR-C is any kind of federal seat;
    // AR-B is a plain province). ISO 3166-2:AR category for AR-C is "city";
    // "Autonomous City" is the same typeLabel already used for Spain's Ceuta
    // and Melilla (ES-CE/ES-ML).
    "AR-B": "Province",
    "AR-C": "Autonomous City"
  },
  "UZ": {
    // Natural Earth tags UZ-TK (Tashkent City, ISO 3166-2:UZ category "city")
    // as "Region" — same as its sibling UZ-TO (Tashkent Region, the
    // surrounding oblast). Tashkent City is administered separately as an
    // independent city, not a wiloyat.
    "UZ-TK": "City"
  },
  "YE": {
    // YE-SA is Amanat Al-Asimah ("Capital Municipality"), ISO 3166-2:YE
    // category "municipality" — a distinct capital-city unit, not one of
    // Yemen's ordinary governorates (YE-SN, the surrounding Sanaa Governorate).
    "YE-SA": "Municipality"
  }
};

const DISPUTED_SUBDIV_CODES = new Set([
  "UA-43", "UA-40", "GB-GI", "ES-GIB~", "GB-FK", "AR-ML~", "TR-NC~", "CY-06~", "CN-TW"
]);

// Features whose iso_3166_2 code belongs to a larger entity they are physically part of.
// Natural Earth gives these their own polygons, but they are NOT distinct administrative
// subdivisions and must not appear as separate entries in the flag grid.
// Format: "CODE|feature name" to be maximally specific.
const SUBDIVISION_FEATURE_EXCLUDE = new Set([
  "AU-NSW|Lord Howe Island", // Island dependency of NSW; governed under NSW law, not Commonwealth law
]);

// Primary (tier-0) subdivisions that genuinely exist under the country's own law
// but are ABSENT from the Natural Earth admin-1 topology (the geometry source).
// Natural Earth's admin-1 dataset is stale: it never added several subdivisions
// created/redrawn in the 2010s–2020s, so they were silently dropped from the flag
// grid and the Sub-national flags game even though their flags are bundled in
// public/flags/sub/<CC>/. Unlike TERRITORIES_TO_APPEND (external/dependent
// tier-1 territories), these are core administrative divisions and use a
// primary typeLabel so they group with their siblings (tier 0).
//
// Each entry is verified against ISO 3166-2 and the country's own territorial
// law (see inline source notes), per the "subdivision research" hard rule in
// CLAUDE.md. Their flags are bundled and pass scripts/check-parent-flag-collision.mjs.
// They have no polygon in the per-country GeoJSON, so they appear in the flag
// grid / game but their landmass is not separately drawn on the subdivision map
// (it remains part of the parent division it was split from) until Natural Earth
// ships geometry for them.
const PRIMARY_SUBDIVISIONS_TO_APPEND = {
  "PA": [
    // Created 2014 by Law 119 from the eastern part of Panamá Province.
    { code: "PA-10", name: "Panamá Oeste", typeLabel: "Province" },
    // Comarca created 2020 by Law 156 from parts of Bocas del Toro province.
    { code: "PA-NT", name: "Naso Tjër Di", typeLabel: "Indigenous Territory" }
  ],
  "ET": [
    // Sidama Region — established 2020 after the 2019 referendum, split from the
    // former Southern Nations, Nationalities and Peoples' Region.
    { code: "ET-SI", name: "Sidama", typeLabel: "Administrative State" }
  ],
  "MM": [
    // Nay Pyi Taw Union Territory — created 2010 as the seat of government,
    // administered directly by the Union (President), not a state/region.
    { code: "MM-18", name: "Nay Pyi Taw", typeLabel: "Union Territory" }
  ],
  "PG": [
    // Hela and Jiwaka provinces — created 2012, split from Southern Highlands
    // and Western Highlands respectively.
    { code: "PG-HLA", name: "Hela", typeLabel: "Province" },
    { code: "PG-JWK", name: "Jiwaka", typeLabel: "Province" }
  ],
  "SD": [
    // West Kordofan State — re-established 2013 from parts of North and
    // South Kordofan.
    { code: "SD-GK", name: "West Kordofan", typeLabel: "State" }
  ]
};

const TERRITORIES_TO_APPEND = {
  "DK": [
    { code: "DK-GL", name: "Greenland", typeLabel: "Autonomous Territory" },
    { code: "DK-FO", name: "Faroe Islands", typeLabel: "Autonomous Territory" }
  ],
  "CN": [
    { code: "CN-HK", name: "Hong Kong", typeLabel: "Special Administrative Region" },
    { code: "CN-MO", name: "Macau", typeLabel: "Special Administrative Region" },
    { code: "CN-TW", name: "Taiwan", typeLabel: "Disputed Territory" }
  ],
  "NL": [
    { code: "NL-AW", name: "Aruba", typeLabel: "Constituent Country" },
    { code: "NL-CW", name: "Curaçao", typeLabel: "Constituent Country" },
    { code: "NL-SX", name: "Sint Maarten", typeLabel: "Constituent Country" }
    // NOTE: Bonaire (NL-BQ1), Saba (NL-BQ2) and Sint Eustatius (NL-BQ3) do NOT
    // belong here — they are already regular features inside public/subdivisions/
    // NL.json (real iso_3166_2 codes assigned by the normal per-country scan
    // below), unlike Aruba/Curaçao/Sint Maarten whose geometry lives in separate
    // AW.json/CW.json/SX.json files merged in via TERRITORY_GEO_FOR_PARENT. Adding
    // them here previously produced a DUPLICATE entry per island in
    // SUBDIVISION_META (two flag-grid cards each) — do not re-add.
  ],
  "GB": [
    { code: "GB-JE", name: "Jersey", typeLabel: "Crown Dependency" },
    { code: "GB-GG", name: "Guernsey", typeLabel: "Crown Dependency" },
    { code: "GB-IM", name: "Isle of Man", typeLabel: "Crown Dependency" },
    { code: "GB-GI", name: "Gibraltar", typeLabel: "Disputed Territory" },
    { code: "GB-FK", name: "Falkland Islands", typeLabel: "Disputed Territory" },
    { code: "GB-IO", name: "British Indian Ocean Territory", typeLabel: "Overseas Territory" },
    { code: "GB-GS", name: "South Georgia and South Sandwich Islands", typeLabel: "Overseas Territory" },
    { code: "GB-AI", name: "Anguilla", typeLabel: "Overseas Territory" },
    { code: "GB-BM", name: "Bermuda", typeLabel: "Overseas Territory" },
    { code: "GB-VG", name: "British Virgin Islands", typeLabel: "Overseas Territory" },
    { code: "GB-KY", name: "Cayman Islands", typeLabel: "Overseas Territory" },
    { code: "GB-MS", name: "Montserrat", typeLabel: "Overseas Territory" },
    { code: "GB-SH", name: "Saint Helena", typeLabel: "Overseas Territory" },
    { code: "GB-TC", name: "Turks and Caicos Islands", typeLabel: "Overseas Territory" },
    { code: "GB-PN", name: "Pitcairn Islands", typeLabel: "Overseas Territory" },
    // Akrotiri and Dhekelia (Sovereign Base Areas) — the 14th and final British
    // Overseas Territory per the UK Government's own list (gov.uk), commonly
    // overlooked because it has no ISO 3166-1 alpha-2 code of its own (unlike
    // Bermuda, Gibraltar, etc. above) and no separate landmass polygon in the
    // Natural Earth 50m topology this app otherwise draws territories from —
    // its geometry (public/subdivisions/AKD.json) was extracted from Natural
    // Earth's 10m admin-0 countries layer instead, which does carry it as two
    // distinct "Akrotiri" and "Dhekelia" enclave polygons within Cyprus.
    { code: "GB-AKD", name: "Akrotiri and Dhekelia", typeLabel: "Overseas Territory" }
  ],
  "US": [
    { code: "US-PR", name: "Puerto Rico", typeLabel: "Unincorporated Territory" },
    { code: "US-MP", name: "Northern Mariana Islands", typeLabel: "Unincorporated Territory" },
    { code: "US-VI", name: "U.S. Virgin Islands", typeLabel: "Unincorporated Territory" },
    { code: "US-AS", name: "American Samoa", typeLabel: "Unincorporated Territory" },
    { code: "US-GU", name: "Guam", typeLabel: "Unincorporated Territory" },
    // United States Minor Outlying Islands — nine uninhabited atolls/reefs (Baker,
    // Howland, Jarvis, Johnston, Kingman Reef, Midway, Navassa, Palmyra, Wake)
    // grouped under one ISO 3166-1 code (UM); shown as a single dissolved territory
    // like French Polynesia's or Saint Helena's multi-island geometry. No permanent
    // civilian population (some had rotating military/wildlife-service staff).
    { code: "US-UM", name: "United States Minor Outlying Islands", typeLabel: "Unincorporated Territory" }
  ],
  "FR": [
    { code: "FR-BL", name: "Saint Barthélemy", typeLabel: "Overseas Collectivity" },
    { code: "FR-MF", name: "Saint Martin", typeLabel: "Overseas Collectivity" },
    { code: "FR-PM", name: "Saint Pierre and Miquelon", typeLabel: "Overseas Collectivity" },
    { code: "FR-WF", name: "Wallis and Futuna", typeLabel: "Overseas Collectivity" },
    { code: "FR-PF", name: "French Polynesia", typeLabel: "Overseas Collectivity" },
    // New Caledonia is a sui generis collectivity, a unique status distinct from
    // the standard Overseas Collectivities. Defined by Title XIII of the French
    // Constitution (Arts. 76–77) following the 1998 Nouméa Accord.
    { code: "FR-NC", name: "New Caledonia", typeLabel: "Sui generis collectivity" },
    // French Southern and Antarctic Lands (TAAF) — ONLY its four subantarctic
    // island districts (Crozet, Kerguelen, Saint-Paul & Amsterdam, Scattered
    // Islands), all north of 60°S. Adélie Land, TAAF's fifth district and an
    // Antarctic continental claim, is excluded per CLAUDE.md's "No Antarctic
    // territorial claim may ever be represented" rule and is not part of the
    // bundled geometry (public/subdivisions/TF.json has 4 features, not 5).
    // No population is shown: TAAF has NO permanent population — only rotating
    // scientific/military personnel (INSEE counts 0 permanent residents). No
    // capital marker is shown either: TAAF's administrative seat (Wikidata P36)
    // is Saint-Pierre, on Réunion — thousands of km away and outside the
    // territory's own geometry entirely, so plotting it would misplace a marker
    // on Réunion's landmass. Both omissions are genuine (not oversights).
    { code: "FR-TF", name: "French Southern and Antarctic Lands", typeLabel: "Overseas Territory" }
  ],
  "NZ": [
    { code: "NZ-CK", name: "Cook Islands", typeLabel: "Associated State" },
    { code: "NZ-NU", name: "Niue", typeLabel: "Associated State" },
    { code: "NZ-TK", name: "Tokelau", typeLabel: "External Territory" }
  ],
  "FI": [
    { code: "FI-AX", name: "Åland Islands", typeLabel: "Autonomous Territory" }
  ],
  "AU": [
    { code: "AU-CC", name: "Cocos (Keeling) Islands", typeLabel: "External Territory" },
    { code: "AU-CX", name: "Christmas Island", typeLabel: "External Territory" },
    { code: "AU-NF", name: "Norfolk Island", typeLabel: "External Territory" },
    // Heard Island and McDonald Islands — uninhabited subantarctic external
    // territory (no permanent population, ever; visited only by rare scientific
    // expeditions). Not to be confused with an Antarctic claim: HIMI lies at
    // ~53°S, north of the 60°S Antarctic Treaty line, so it is unaffected by the
    // Antarctic-claim exclusion rule.
    { code: "AU-HM", name: "Heard Island and McDonald Islands", typeLabel: "External Territory" }
  ],
  "NO": [
    // Jan Mayen (NO-22) — a real ISO 3166-2:NO code, distinct from Svalbard
    // (NO-21, already a native feature of NO.json with its own meta/population/
    // capital). Jan Mayen has NO feature in this app's NO.json (nor in Natural
    // Earth's admin-0/admin-1 layers, which fold it into a Svalbard-only entry
    // via a shared "Svalbard, SJ, Svalbard and Jan Mayen" label) — its geometry
    // (public/subdivisions/NO-22.json) was extracted from Natural Earth's
    // separate admin-0 MAP SUBUNITS layer, the only one that carries it as its
    // own polygon ("Jan Mayen I."). No permanent civilian population (~18-20,
    // rotating meteorological/military station staff only) and no capital.
    { code: "NO-22", name: "Jan Mayen", typeLabel: "Territory" },
    // Bouvet Island — a Norwegian dependency (not a Svalbard/Jan Mayen-style
    // "Territory" under the same statute, but likewise a real subdivision-like
    // entity this app's flag grid was missing). Lies at ~54.4°S, north of the
    // 60°S Antarctic Treaty line, so it is NOT an Antarctic claim and is
    // unaffected by CLAUDE.md's Antarctic-claim exclusion rule. Permanently
    // uninhabited nature reserve — no population ever (not even a research
    // station; only an automated weather station visited rarely), no capital,
    // no flag (flies the Norwegian flag; no distinct one is documented anywhere).
    // Geometry (public/subdivisions/BV.json) extracted from Natural Earth's
    // admin-0 MAP SUBUNITS layer, the only one carrying it as its own polygon.
    { code: "NO-BV", name: "Bouvet Island", typeLabel: "Dependency" }
  ],
  "AR": [
    { code: "AR-ML~", name: "Malvinas Islands", typeLabel: "Claimed Territory" }
  ],
  "ES": [
    { code: "ES-GIB~", name: "Gibraltar", typeLabel: "Claimed Territory" }
  ],
  "TR": [
    { code: "TR-NC~", name: "Turkish Republic of Northern Cyprus", typeLabel: "Claimed State" }
  ],
  "CY": [
    // Northern Cyprus — the TRNC, recognised only by Türkiye; the Republic of
    // Cyprus claims it. The merged geometry (XN.json) is the WHOLE of Northern
    // Cyprus, so it must be one disputed-territory card (CY-NC~), not mislabelled
    // as the single "Kyrenia" district (CY-06~) it used to carry.
    { code: "CY-NC~", name: "Northern Cyprus", typeLabel: "Disputed Territory" }
  ],
  "MA": [
    // Western Sahara — Morocco administers and claims most of it as its "Southern
    // Provinces"; the SADR/Polisario dispute it. Shown as a single disputed
    // territory under Morocco (geometry merged from EH.json as MA-EH~).
    { code: "MA-EH~", name: "Western Sahara", typeLabel: "Disputed Territory" }
  ],
  "RS": [
    // Kosovo — declared independence 2008; Serbia claims it as its Autonomous
    // Province of Kosovo and Metohija. Shown as a single disputed territory under
    // Serbia (its own internal municipalities are dissolved away at render time),
    // not a UN member. typeLabel "Disputed Territory" per the CLAUDE.md rule.
    { code: "RS-KM~", name: "Kosovo", typeLabel: "Disputed Territory" }
  ],
  "SO": [
    // Somaliland — declared independence from Somalia in 1991; unrecognised by any
    // UN member. Somalia claims it. Shown as a single disputed territory under
    // Somalia (geometry merged from XS.json as SO-SL~), so it is a proper card with
    // its own flag ("not officially recognised by Somalia") and capital (Hargeisa).
    { code: "SO-SL~", name: "Somaliland", typeLabel: "Disputed Territory" }
  ],
  "UA": [
    { code: "UA-43", name: "Autonomous Republic of Crimea", typeLabel: "Autonomous Republic" },
    { code: "UA-40", name: "Sevastopol", typeLabel: "Special Status City" }
  ]
};

// Load flagCodes from the flag index and subdivisions override file
const flagIndexText = readFileSync(join(projectRoot, 'src', 'lib', 'subdivisionFlagIndex.ts'), 'utf8');
const flagCodes = new Set();
const matches = flagIndexText.match(/"[A-Z0-9~_-]+"/g) || [];
for (const m of matches) {
  flagCodes.add(m.slice(1, -1));
}

const apiText = readFileSync(join(projectRoot, 'src', 'api', 'subdivisions.ts'), 'utf8');
const overrideMatches = apiText.match(/"[A-Z0-9~_-]+"\s*:/g) || [];
for (const m of overrideMatches) {
  const code = m.replace(/["\s:]/g, '');
  flagCodes.add(code);
}

const files = readdirSync(INPUT_DIR).filter(f => {
  // Only include valid ISO 3166-1 alpha-2 codes (2 uppercase letters)
  const code = f.replace('.json', '');
  return f.endsWith('.json') && /^[A-Z]{2}$/.test(code);
});
console.log(`Processing ${files.length} country files...`);

const entries = [];

for (const file of files.sort()) {
  const code = file.replace('.json', '');
  const raw = readFileSync(join(INPUT_DIR, file), 'utf8');
  let fc;
  try {
    fc = JSON.parse(raw);
  } catch {
    console.warn(`Failed to parse ${file}`);
    continue;
  }

  if (!fc.features || fc.features.length === 0) continue;

  // Count type_en occurrences to find the most common type
  const typeCounts = new Map();
  for (const f of fc.features) {
    const t = f.properties?.type_en || '';
    typeCounts.set(t, (typeCounts.get(t) || 0) + 1);
  }

  // Find most common non-empty type
  let bestType = '';
  let bestCount = 0;
  for (const [t, c] of typeCounts) {
    if (t && c > bestCount) {
      bestType = t;
      bestCount = c;
    }
  }
  if (!bestType) bestType = 'Division';

  let pluralLabel = pluralize(bestType);
  if (PLURAL_LABEL_OVERRIDES[code]) {
    pluralLabel = PLURAL_LABEL_OVERRIDES[code];
  }

  // Build divisions list
  const divisions = [];
  // Multiple polygons can legitimately share a code after dedupe-subdivision-codes.mjs
  // (Pattern A "same place" merges and Pattern B "absorb sub-units" groups keep the
  // shared code so every polygon highlights together on the map, but must appear as a
  // SINGLE card in the flag grid). Collapse those to one division per code.
  const seenCodes = new Set();
  for (const f of fc.features) {
    const p = f.properties || {};
    const divCode = p.iso_3166_2 || p.name || '';
    if (!divCode) continue;
    let name = p.name_en || p.name || divCode;
    
    // Custom PLACEHOLDER island codes are `-X` + DIGITS (e.g. CN-X01~, AU-X03~,
    // AI-X00). Legitimate ISO 3166-2 codes that merely START with X are `-X` + a
    // LETTER (Xinjiang CN-XJ, Xorazm UZ-XO, Laos LA-XA/XI/XE, Azerbaijan AZ-XAC…)
    // and MUST NOT be treated as placeholders — matching them on the old
    // `includes('-X')` silently dropped those real subdivisions from the meta,
    // making them unselectable on the map (see CLAUDE.md hard rule below).
    const isPlaceholderXCode = /-X\d/.test(divCode);

    // Skip nameless placeholder features
    if (name === divCode && isPlaceholderXCode) {
      continue;
    }

    // Skip custom-coded subdivisions (~ or placeholder -X#) that do not have a flag
    if ((divCode.includes('~') || isPlaceholderXCode) && !flagCodes.has(divCode)) {
      continue;
    }

    // Skip features that share a code with a larger entity they are part of
    if (SUBDIVISION_FEATURE_EXCLUDE.has(`${divCode}|${name}`)) {
      continue;
    }
    
    let typeLabel = p.type_en || p.type || bestType;
    if (SUBDIVISION_TYPE_OVERRIDES_NEW[code]?.[divCode]) {
      typeLabel = SUBDIVISION_TYPE_OVERRIDES_NEW[code][divCode];
    } else if (SUBDIVISION_TYPE_OVERRIDES[divCode]) {
      typeLabel = SUBDIVISION_TYPE_OVERRIDES[divCode];
    }

    if (SUBDIVISION_NAME_OVERRIDES_NEW[code]?.[divCode]) {
      name = SUBDIVISION_NAME_OVERRIDES_NEW[code][divCode];
    }

    // One card per code — see seenCodes note above.
    if (seenCodes.has(divCode)) continue;
    seenCodes.add(divCode);

    divisions.push({ code: divCode, name, typeLabel });
  }

  if (PRIMARY_SUBDIVISIONS_TO_APPEND[code]) {
    // Only append entries not already present from the geometry source, so a
    // future Natural Earth update that adds them does not create duplicates.
    const existing = new Set(divisions.map(d => d.code));
    for (const d of PRIMARY_SUBDIVISIONS_TO_APPEND[code]) {
      if (!existing.has(d.code)) divisions.push(d);
    }
  }

  if (TERRITORIES_TO_APPEND[code]) {
    divisions.push(...TERRITORIES_TO_APPEND[code]);
  }

  if (divisions.length === 0) continue;

  entries.push({ countryCode: code, pluralLabel, divisions });
}

console.log(`Building meta for ${entries.length} countries...`);

// Generate TypeScript content
let ts = `// Auto-generated by scripts/build-subdivision-meta.mjs — DO NOT EDIT MANUALLY
// Source: Natural Earth 10m admin-1 states/provinces

export type SubdivisionMeta = {
  code: string;       // ISO 3166-2 (e.g. "US-CA") or name fallback
  name: string;
  typeLabel: string;  // "State", "Province", "Prefecture", etc.
  isDisputed?: boolean;
};

export type CountrySubdivisionMeta = {
  countryCode: string;
  pluralLabel: string; // "States", "Provinces", etc.
  divisions: SubdivisionMeta[];
};

export const SUBDIVISION_META: Record<string, CountrySubdivisionMeta> = {\n`;

for (const entry of entries) {
  const divsJson = entry.divisions
    .map(d => {
      const parts = [
        `code: ${JSON.stringify(d.code)}`,
        `name: ${JSON.stringify(d.name)}`,
        `typeLabel: ${JSON.stringify(d.typeLabel)}`
      ];
      if (DISPUTED_SUBDIV_CODES.has(d.code)) {
        parts.push(`isDisputed: true`);
      }
      return `    { ${parts.join(', ')} }`;
    })
    .join(',\n');
  ts += `  ${JSON.stringify(entry.countryCode)}: {\n`;
  ts += `    countryCode: ${JSON.stringify(entry.countryCode)},\n`;
  ts += `    pluralLabel: ${JSON.stringify(entry.pluralLabel)},\n`;
  ts += `    divisions: [\n${divsJson}\n    ],\n`;
  ts += `  },\n`;
}

ts += `};\n`;

writeFileSync(OUTPUT, ts);
console.log(`Written ${OUTPUT}`);
console.log(`Total lines: ${ts.split('\n').length}`);
