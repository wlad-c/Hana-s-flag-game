// Build a bundled, offline-safe country-facts dataset for the Learn-mode
// country widget (src/data/countryFacts.ts).
//
// WHY THIS EXISTS — hard rule (see CLAUDE.md "Country widget information"):
// The Learn-mode panel shows Capital, Official name, Languages, Currencies,
// Calling code, Internet domain, GDP (local and USD), GDP per capita (local and USD),
// Democracy ratings/ranks (Freedom House, V-Dem, EIU Economist), the
// Corruption Perceptions Index (Transparency International), and the
// Democracy Perception Index (Nira Data / Alliance of Democracies).
//
// Source: mledoze/countries, World Bank API (NY.GDP.MKTP.CD, NY.GDP.MKTP.CN,
// NY.GDP.PCAP.CD, NY.GDP.PCAP.CN), curated Democracy index datasets,
// Transparency International CPI (scripts/data/cpi2025Data.mjs), and
// DPI 2026 (scripts/data/dpi2026Data.mjs).
//
// Re-run with:  node scripts/build-country-facts.mjs

import { writeFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { DEMOCRACY_DATA } from "./data/democracyData.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../src/data/countryFacts.ts");
const SOURCE =
  "https://raw.githubusercontent.com/mledoze/countries/master/countries.json";

// The 195 UN member + permanent-observer states the game uses. Kept in sync
// with src/lib/unMemberStates.ts (the only codes the widget ever looks up).
const UN_MEMBER_CODES = new Set([
  "AF","AL","DZ","AD","AO","AG","AR","AM","AU","AT","AZ","BS","BH","BD","BB",
  "BY","BE","BZ","BJ","BT","BO","BA","BW","BR","BN","BG","BF","BI","CV","KH",
  "CM","CA","CF","TD","CL","CN","CO","KM","CG","CD","CR","CI","HR","CU","CY",
  "CZ","DK","DJ","DM","DO","EC","EG","SV","GQ","ER","EE","SZ","ET","FJ","FI",
  "FR","GA","GM","GE","DE","GH","GR","GD","GT","GN","GW","GY","HT","HN","HU",
  "IS","IN","ID","IR","IQ","IE","IL","IT","JM","JP","JO","KZ","KE","KI","KP",
  "KR","KW","KG","LA","LV","LB","LS","LR","LY","LI","LT","LU","MG","MW","MY",
  "MV","ML","MT","MH","MR","MU","MX","FM","MD","MC","MN","ME","MA","MZ","MM",
  "NA","NR","NP","NL","NZ","NI","NE","NG","MK","NO","OM","PK","PW","PA","PG",
  "PY","PE","PH","PL","PT","QA","RO","RU","RW","KN","LC","VC","WS","SM","ST",
  "SA","SN","RS","SC","SL","SG","SK","SI","SB","SO","ZA","SS","ES","LK","SD",
  "SR","SE","CH","SY","TJ","TZ","TH","TL","TG","TO","TT","TN","TR","TM","TV",
  "UG","UA","AE","GB","US","UY","UZ","VU","VE","VN","YE","ZM","ZW","PS","VA",
]);

const FACT_OVERRIDES = {
  NR: { nameOfficial: "Republic of Naoero" },
};

// Sourced corrections to mledoze fields (languages, currencies, capital …). The
// same file is applied by src/api/countries.ts after the live REST merge, so a
// correction cannot be undone by either the regen or the live API.
const FACT_CORRECTIONS = JSON.parse(
  readFileSync(resolve(__dirname, "../src/data/countryFactCorrections.json"), "utf8"),
).corrections;
const CORRECTABLE_FIELDS = ["nameOfficial", "capital", "languages", "currencies"];
for (const [code, c] of Object.entries(FACT_CORRECTIONS)) {
  const fields = Object.fromEntries(CORRECTABLE_FIELDS.filter((f) => f in c).map((f) => [f, c[f]]));
  FACT_OVERRIDES[code] = { ...(FACT_OVERRIDES[code] ?? {}), ...fields };
}

/** Verified estimates for countries missing from World Bank GDP endpoints */
const GDP_FALLBACKS = {
  CU: { gdpUsd: 107300000000, gdpPerCapitaUsd: 9500 },
  ER: { gdpUsd: 2100000000, gdpPerCapitaUsd: 600 },
  KP: { gdpUsd: 24500000000, gdpPerCapitaUsd: 960 },
  SS: { gdpUsd: 7000000000, gdpPerCapitaUsd: 590 },
  YE: { gdpUsd: 21000000000, gdpPerCapitaUsd: 650 },
};

export function parseCallingCode(idd, code) {
  if (!idd || !idd.root) return undefined;
  if (!idd.suffixes || idd.suffixes.length === 0) return idd.root;
  if (idd.suffixes.length === 1) return idd.root + idd.suffixes[0];
  if (code === "US" || code === "CA" || code === "DO") return "+1";
  if (code === "RU" || code === "KZ") return "+7";
  if (code === "VA") return "+39";
  return idd.root;
}

async function fetchWorldBankEconomicData() {
  const indicators = [
    { key: "gdpUsd", url: "https://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.CD?format=json&date=2021:2024&per_page=4000" },
    { key: "gdpLcu", url: "https://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.CN?format=json&date=2021:2024&per_page=4000" },
    { key: "gdpPerCapitaUsd", url: "https://api.worldbank.org/v2/country/all/indicator/NY.GDP.PCAP.CD?format=json&date=2021:2024&per_page=4000" },
    { key: "gdpPerCapitaLcu", url: "https://api.worldbank.org/v2/country/all/indicator/NY.GDP.PCAP.CN?format=json&date=2021:2024&per_page=4000" },
  ];
  const out = {};
  for (const ind of indicators) {
    try {
      const res = await fetch(ind.url);
      if (!res.ok) continue;
      const json = await res.json();
      for (const row of json[1] || []) {
        const code = row.country?.id?.toUpperCase();
        if (!code || !UN_MEMBER_CODES.has(code) || typeof row.value !== "number" || row.value <= 0) continue;
        if (!out[code]) out[code] = {};
        const dateKey = ind.key + "Date";
        if (!out[code][dateKey] || row.date > out[code][dateKey]) {
          out[code][ind.key] = Math.round(row.value * 100) / 100;
          out[code][dateKey] = row.date;
        }
      }
    } catch (e) {
      console.warn(`WB indicator fetch error for ${ind.key}:`, e);
    }
  }
  return out;
}

console.log("Fetching mledoze/countries and World Bank economic indicators...");
const [res, wbEcon] = await Promise.all([
  fetch(SOURCE),
  fetchWorldBankEconomicData(),
]);

if (!res.ok) {
  console.error(`Failed to fetch ${SOURCE}: HTTP ${res.status}`);
  process.exit(1);
}
const data = await res.json();

/** @type {Record<string, object>} */
const facts = {};
let count = 0;

for (const c of data) {
  const code = (c.cca2 || "").toUpperCase();
  if (!code || !UN_MEMBER_CODES.has(code)) continue;

  const entry = {};

  const official = c.name?.official?.trim();
  if (official) entry.nameOfficial = official;

  const capital = Array.isArray(c.capital) ? c.capital[0]?.trim() : undefined;
  if (capital) entry.capital = capital;

  if (c.languages && typeof c.languages === "object") {
    const langs = Array.from(
      new Set(Object.values(c.languages).map((l) => String(l).trim()).filter(Boolean)),
    );
    if (langs.length > 0) entry.languages = langs;
  }

  if (c.currencies && typeof c.currencies === "object") {
    const currencies = Object.entries(c.currencies)
      .map(([currCode, info]) => {
        const out = { code: currCode, name: (info?.name ?? "").trim() || currCode };
        if (info?.symbol && String(info.symbol).trim()) out.symbol = String(info.symbol).trim();
        return out;
      })
      .filter((x) => x.name);
    if (currencies.length > 0) entry.currencies = currencies;
  }

  const callingCode = parseCallingCode(c.idd, code);
  if (callingCode) entry.callingCode = callingCode;

  if (Array.isArray(c.tld)) {
    const tlds = c.tld.map((t) => String(t).trim()).filter(Boolean);
    if (tlds.length > 0) entry.tld = tlds;
  }

  // Economic indicators (World Bank or fallback)
  const econ = wbEcon[code] || GDP_FALLBACKS[code];
  if (econ) {
    if (econ.gdpUsd) entry.gdpUsd = econ.gdpUsd;
    if (econ.gdpLcu) entry.gdpLcu = econ.gdpLcu;
    if (econ.gdpPerCapitaUsd) entry.gdpPerCapitaUsd = econ.gdpPerCapitaUsd;
    if (econ.gdpPerCapitaLcu) entry.gdpPerCapitaLcu = econ.gdpPerCapitaLcu;
  } else if (GDP_FALLBACKS[code]) {
    Object.assign(entry, GDP_FALLBACKS[code]);
  }

  // Democracy ratings & ranks
  const demo = DEMOCRACY_DATA[code];
  if (demo && Object.keys(demo).length > 0) {
    entry.democracy = demo;
  }

  const override = FACT_OVERRIDES[code];
  if (override) Object.assign(entry, override);

  if (Object.keys(entry).length > 0) {
    facts[code] = entry;
    count++;
  }
}

const sortedCodes = Object.keys(facts).sort();
const body = sortedCodes
  .map((code) => `  ${code}: ${JSON.stringify(facts[code])},`)
  .join("\n");

const file = `// AUTO-GENERATED by scripts/build-country-facts.mjs — do not edit by hand.
// Re-run: node scripts/build-country-facts.mjs
//
// Offline-safe bundle of the Learn-mode country widget's information
// (official name, capital, official languages, currencies, calling code, internet domain,
// GDP, GDP per capita, democracy ratings/ranks, Corruption Perceptions Index, Democracy Perception Index, RSF Press Freedom, Human Development Index, WJP Rule of Law Index) for every UN member / permanent-observer state.
// Sourced from mledoze/countries, World Bank API, Freedom House, V-Dem, EIU Economist, Transparency International CPI, Nira Data DPI, RSF, UNDP HDR, World Justice Project.
//
// HARD RULE (CLAUDE.md "Country widget information"): these fields must stay
// bundled so the widget is complete even when API services are blocked or down.

export type DemocracyIndex = {
  year: number;
  rating: string;
  rank: number;
  rankChange?: number;
  score?: number;
};

export type DemocracyData = {
  freedomHouse?: DemocracyIndex;
  vDem?: DemocracyIndex;
  economist?: DemocracyIndex;
  /** Transparency International Corruption Perceptions Index */
  cpi?: DemocracyIndex;
  /** Nira Data / Alliance of Democracies Democracy Perception Index */
  perception?: DemocracyIndex;
  /** Reporters Without Borders World Press Freedom Index */
  rsfPress?: DemocracyIndex;
  /** UNDP Human Development Report — Human Development Index */
  hdi?: DemocracyIndex;
  /** World Economic Forum Global Gender Gap Index */
  genderGap?: DemocracyIndex;
  /** Institute for Economics & Peace Global Peace Index */
  gpi?: DemocracyIndex;
  /** World Happiness Report life-evaluation (Cantril ladder) ranking */
  happiness?: DemocracyIndex;
  /** Brand Finance Global Soft Power Index */
  softPower?: DemocracyIndex;
  /** Lowy Institute Global Diplomacy Index (diplomatic posts abroad) */
  gdi?: DemocracyIndex;
  /** World Justice Project Rule of Law Index */
  wjpRuleOfLaw?: DemocracyIndex;
  /** IMD World Competitiveness Ranking (overall score) */
  imdCompetitiveness?: DemocracyIndex;
  /** Institute for Economics & Peace Ecological Threat Index (ETR) */
  etr?: DemocracyIndex;
  /** Reuters Institute Digital News Report — trust in news overall (%) */
  digitalNews?: DemocracyIndex;
  /** Institute for Economics & Peace Global Terrorism Index */
  gti?: DemocracyIndex;
};

export type CountryFacts = {
  nameOfficial?: string;
  capital?: string;
  languages?: string[];
  currencies?: { code: string; name: string; symbol?: string }[];
  callingCode?: string;
  tld?: string[];
  gdpUsd?: number;
  gdpLcu?: number;
  gdpPerCapitaUsd?: number;
  gdpPerCapitaLcu?: number;
  democracy?: DemocracyData;
};

export const COUNTRY_FACTS: Readonly<Record<string, CountryFacts>> = {
${body}
};
`;

await writeFile(OUT, file, "utf8");
console.log(`Wrote ${count} country-facts entries to ${OUT}`);
