import { UN_MEMBER_CODES } from "../lib/unMemberStates";
import { ALL_COUNTRY_OPTIONS } from "../lib/countrySelection";
import { CONTINENT_GROUPS, SUBREGION_GROUPS } from "../lib/continentGroups";
import { COUNTRY_FACTS } from "../data/countryFacts";
import countryFactCorrections from "../data/countryFactCorrections.json";

type FactCorrection = Partial<Pick<Country, "nameOfficial" | "capital" | "languages" | "currencies">>;

/**
 * Sourced corrections (audit F39): they outrank BOTH the REST Countries values
 * and the bundle, because the upstream aggregator is itself wrong for these
 * fields. The fallback path already reads them through the regenerated bundle.
 */
const FACT_CORRECTIONS: Readonly<Record<string, FactCorrection>> =
  countryFactCorrections.corrections as Record<string, FactCorrection>;
import type { QuizSymbol, SymbolClue } from "../lib/quizSymbols";

import type { DemocracyData } from "../data/countryFacts";

export type Country = {
  name: string;
  /** Long official name from REST Countries (e.g., "Federative Republic of
   *  Brazil"). Used for the entity-summary panel. */
  nameOfficial?: string;
  code: string;
  flagSvg: string;
  continent: Continent;
  /** Sub-region (e.g., "South America", "Western Asia"). Optional. */
  subregion?: string;
  /** Capital city. Some countries have multiple — we keep the first. */
  capital?: string;
  /** Population (last known REST Countries figure). */
  population?: number;
  /** Official languages, deduplicated. */
  languages?: string[];
  /** Currencies — one per row in the panel summary. */
  currencies?: { code: string; name: string; symbol?: string }[];
  /** International dialing / phone code (e.g., "+61", "+55", "+60"). */
  callingCode?: string;
  /** Country top-level internet domain(s) (e.g., [".au"], [".br"]). */
  tld?: string[];
  /** GDP in USD (World Bank / UN data). */
  gdpUsd?: number;
  /** GDP in local currency unit. */
  gdpLcu?: number;
  /** GDP per capita in USD. */
  gdpPerCapitaUsd?: number;
  /** GDP per capita in local currency unit. */
  gdpPerCapitaLcu?: number;
  /** Democracy ratings & ranks (Freedom House, V-Dem, EIU Economist), CPI, and DPI. */
  democracy?: DemocracyData;
  /**
   * Set only when the game is quizzing a national SYMBOL rather than the flag
   * (a coat of arms, a passport cover, a football crest, a former flag …).
   * `flagSvg` then holds that symbol's image, so every consumer — the card, the
   * answer burst, the results grid — shows what was actually asked without
   * knowing packs exist. The three fields below carry what only a symbol
   * question needs.
   */
  symbolPack?: QuizSymbol;
  /** The symbol's name, dates and sourced attribution, shown on reveal. */
  symbolCaption?: string;
  /** The sourced explainer, for the text pack (which shows no image at all). */
  symbolClue?: SymbolClue;
  /** The country's real national flag, kept so "Match the pair" can offer it as
   *  an ANSWER while `flagSvg` shows the arms as the question. */
  nationalFlagSvg?: string;
};

export type Continent =
  | "Africa"
  | "Americas"
  | "Asia"
  | "Europe"
  | "Oceania";

type RestCountry = {
  name?: { common?: string; official?: string };
  cca2?: string;
  flags?: { svg?: string; png?: string };
  region?: string;
  subregion?: string;
  capital?: string[];
  population?: number;
  languages?: Record<string, string>;
  currencies?: Record<string, { name?: string; symbol?: string }>;
  idd?: { root?: string; suffixes?: string[] };
  tld?: string[];
};

const API_URL =
  "https://restcountries.com/v3.1/all?fields=name,flags,cca2,region,subregion,capital,population,languages,currencies,idd,tld";

/**
 * World Bank "Population, total" indicator. The most-current authoritative
 * single source for national populations — updated annually by the Bank
 * from UN Population Division and national census data. We use it to
 * override the REST Countries population (which is often a few years
 * stale) so the panel always reflects current figures.
 */
const WORLDBANK_POP_URL =
  "https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL" +
  "?format=json&date=2024&per_page=400";

type WorldBankRow = {
  country?: { id?: string };
  date?: string;
  value?: number | null;
};

/**
 * Build a (alpha-2 code → most-current population) lookup from the World
 * Bank API. Falls back silently to an empty map if the request fails —
 * the caller then keeps the REST-Countries population data.
 */
async function fetchWorldBankPopulation(): Promise<Map<string, number>> {
  try {
    const res = await fetch(WORLDBANK_POP_URL);
    if (!res.ok) return new Map();
    const json = (await res.json()) as [unknown, WorldBankRow[]];
    if (!Array.isArray(json) || json.length < 2) return new Map();
    const out = new Map<string, number>();
    for (const row of json[1]) {
      const code = row.country?.id?.toUpperCase();
      const val = row.value;
      if (code && typeof val === "number" && val > 0) out.set(code, val);
    }
    return out;
  } catch {
    return new Map();
  }
}

const UN_CONTINENTS: ReadonlySet<Continent> = new Set([
  "Africa",
  "Americas",
  "Asia",
  "Europe",
  "Oceania",
]);

/** Vite base URL — resolves to "/" in dev and "/<repo>/" on GitHub Pages. */
const BASE = import.meta.env.BASE_URL;

/**
 * Hardcoded flag SVG overrides for countries where the upstream CDN
 * (flagcdn.com / restcountries.com) serves an outdated or politically
 * disputed version. Values here always win over whatever the API returns.
 *
 * Afghanistan: flagcdn.com reverted to the pre-2021 Republic flag; we pin
 * the Islamic Emirate (Taliban) flag — the de facto national flag since
 * August 2021. Served from a bundled local SVG (public/flags/af.svg, the
 * Wikimedia Thuluth-calligraphy artwork) so it is always available and can
 * never silently revert to whatever the CDN happens to serve.
 */
const FLAG_OVERRIDES: Readonly<Record<string, string>> = {
  AF: `${BASE}flags/af.svg`,
};


/**
 * Offline / API-outage fallback: build the 195-country list entirely from
 * data bundled with the app. restcountries.com has a history of outages and
 * is blocked on some networks; when it fails, the previous behaviour was a
 * "Couldn't load countries" dead-end (and, until the rules-of-hooks fix in
 * LearnPage, a blank-page crash). The bundled UN_MEMBERS name list,
 * CONTINENT_GROUPS and SUBREGION_GROUPS cover name / code / continent /
 * subregion for every UN state, and the flag SVGs come from flagcdn.com —
 * the exact same URLs REST Countries returns. The panel extras (official
 * name, capital, languages, currencies) come from the bundled COUNTRY_FACTS
 * dataset (src/data/countryFacts.ts), so the Learn-mode widget stays complete
 * even when restcountries.com is blocked or down — see the "Country widget
 * information" hard rule in CLAUDE.md. Population still comes from the World
 * Bank fetch when that succeeds.
 */
function parseCallingCode(
  idd: { root?: string; suffixes?: string[] } | undefined,
  code: string,
): string | undefined {
  if (!idd || !idd.root) return undefined;
  if (!idd.suffixes || idd.suffixes.length === 0) return idd.root;
  if (idd.suffixes.length === 1) return idd.root + idd.suffixes[0];
  if (code === "US" || code === "CA" || code === "DO") return "+1";
  if (code === "RU" || code === "KZ") return "+7";
  if (code === "VA") return "+39";
  return idd.root;
}

function buildFallbackCountries(wbPop: Map<string, number>): Country[] {
  const nameByCode = new Map(ALL_COUNTRY_OPTIONS.map((o) => [o.code, o.name]));
  const subregionByCode = new Map<string, string>();
  for (const group of SUBREGION_GROUPS) {
    for (const code of group.codes) subregionByCode.set(code, group.label);
  }
  const countries: Country[] = [];
  for (const [continent, codes] of Object.entries(CONTINENT_GROUPS) as [Continent, readonly string[]][]) {
    for (const code of codes) {
      const name = nameByCode.get(code);
      if (!name) continue;
      const facts = COUNTRY_FACTS[code];
      countries.push({
        name,
        nameOfficial: facts?.nameOfficial,
        code,
        flagSvg: FLAG_OVERRIDES[code] ?? `${BASE}flags/${code.toLowerCase()}.svg`,
        continent,
        subregion: subregionByCode.get(code),
        capital: facts?.capital,
        population: wbPop.get(code),
        languages: facts?.languages,
        currencies: facts?.currencies,
        callingCode: facts?.callingCode,
        tld: facts?.tld,
        gdpUsd: facts?.gdpUsd,
        gdpLcu: facts?.gdpLcu,
        gdpPerCapitaUsd: facts?.gdpPerCapitaUsd,
        gdpPerCapitaLcu: facts?.gdpPerCapitaLcu,
        democracy: facts?.democracy,
      });
    }
  }
  countries.sort((a, b) => a.name.localeCompare(b.name, "en"));
  return countries;
}

/**
 * The bundled country list, available SYNCHRONOUSLY — no network at all.
 *
 * `fetchCountries()` can take tens of seconds when restcountries.com is blocked
 * rather than merely down (a connection that hangs instead of refusing). Until it
 * resolves, anything keyed off the country list renders empty — including the
 * Learn-mode HISTORICAL eras, whose 1914/1945/1960 flags resolve through the same
 * list: measured at 27 s of a flagless map, with 1914 showing 20 of 142 flags
 * instead of 119. Seeding state with this and upgrading in place when the fetch
 * lands keeps the app complete from the first paint, exactly as the "country
 * widget information must never be reduced" hard rule requires.
 *
 * Population is absent here (it is the one field that genuinely needs the network);
 * EntitySummary falls back to NATIONAL_REFERENCE_POPULATION so the row still shows.
 */
export function bundledCountries(): Country[] {
  return buildFallbackCountries(new Map());
}

export async function fetchCountries(): Promise<Country[]> {
  // Run the two fetches in parallel — REST Countries gives us names,
  // flags, capital, languages; the World Bank gives us the most-current
  // population figures (REST Countries' numbers are often years stale).
  // Each fetch is independently failure-safe: a REST Countries outage
  // falls back to the bundled country list instead of an error page.
  const [restResult, wbPop] = await Promise.all([
    fetch(API_URL).catch(() => null),
    fetchWorldBankPopulation(),
  ]);
  if (!restResult || !restResult.ok) {
    return buildFallbackCountries(wbPop);
  }
  let data: RestCountry[];
  try {
    data = (await restResult.json()) as RestCountry[];
    if (!Array.isArray(data) || data.length === 0) {
      return buildFallbackCountries(wbPop);
    }
  } catch {
    return buildFallbackCountries(wbPop);
  }

  const countries: Country[] = [];
  for (const item of data) {
    const name = item.name?.common?.trim();
    const code = item.cca2?.trim().toUpperCase();
    const flagSvg = item.flags?.svg?.trim();
    const flagPng = item.flags?.png?.trim();
    const region = item.region?.trim() as Continent | undefined;
    const flagUrl = flagSvg || flagPng;
    if (!name || !code || !flagUrl || !region) continue;
    if (!UN_CONTINENTS.has(region)) continue;
    if (!UN_MEMBER_CODES.has(code)) continue;
    // Bundled fallback facts for this country — used to backfill any field
    // restcountries.com happens to omit, so the Learn-mode widget never loses
    // information (see the "Country widget information" hard rule in CLAUDE.md).
    const facts = COUNTRY_FACTS[code];
    const subregion = item.subregion?.trim() || undefined;
    const capital = item.capital?.[0]?.trim() || facts?.capital || undefined;
    // Prefer the World Bank figure (refreshed annually); fall back to
    // REST Countries (which can be a few years stale) when the WB doesn't
    // publish a number for this country (e.g., Vatican City).
    const wbValue = wbPop.get(code);
    const population =
      typeof wbValue === "number" && wbValue > 0
        ? wbValue
        : typeof item.population === "number" && item.population > 0
          ? item.population
          : undefined;
    const restLanguages = item.languages
      ? Array.from(new Set(Object.values(item.languages).map((l) => l.trim()).filter(Boolean)))
      : undefined;
    const languages =
      restLanguages && restLanguages.length > 0 ? restLanguages : facts?.languages;
    const nameOfficial = item.name?.official?.trim() || facts?.nameOfficial || undefined;
    const restCurrencies = item.currencies
      ? Object.entries(item.currencies)
          .map(([currCode, info]) => ({
            code: currCode,
            name: (info?.name ?? "").trim() || currCode,
            symbol: info?.symbol?.trim() || undefined,
          }))
          .filter((c) => c.name)
      : undefined;
    const currencies =
      restCurrencies && restCurrencies.length > 0 ? restCurrencies : facts?.currencies;

    const restCallingCode = parseCallingCode(item.idd, code);
    const callingCode = restCallingCode || facts?.callingCode || undefined;

    const restTld = item.tld
      ? item.tld.map((t) => t.trim()).filter(Boolean)
      : undefined;
    const tld = restTld && restTld.length > 0 ? restTld : facts?.tld || undefined;

    const correction = FACT_CORRECTIONS[code];

    let finalName = name;
    let finalNameOfficial = correction?.nameOfficial ?? nameOfficial;
    if (code === "TR") {
      finalName = "Türkiye";
      finalNameOfficial = "Republic of Türkiye";
    } else if (code === "CI") {
      finalName = "Côte d’Ivoire";
      finalNameOfficial = "Republic of Côte d'Ivoire";
    } else if (code === "CV") {
      finalName = "Cabo Verde";
      finalNameOfficial = "Republic of Cabo Verde";
    } else if (code === "CD") {
      finalName = "Congo (DRC)";
    } else if (code === "CG") {
      finalName = "Congo";
    } else if (code === "NR") {
      // Nauru's parliament passed the constitutional amendment on 13 May 2026; the
      // country notified the UN on 26 June 2026, and the UN member-states list now
      // reads "Naoero" (formal: "Republic of Naoero"). ISO 3166-1 alpha-2 stays NR.
      // https://www.un.org/en/about-us/member-states/naoero
      finalName = "Naoero";
      finalNameOfficial = "Republic of Naoero";
    }

    countries.push({
      name: finalName,
      nameOfficial: finalNameOfficial,
      code,
      flagSvg: FLAG_OVERRIDES[code] ?? `${BASE}flags/${code.toLowerCase()}.svg`,
      continent: region,
      subregion,
      capital: correction?.capital ?? capital,
      population,
      languages: correction?.languages ?? languages,
      currencies:
        correction?.currencies ?? (currencies && currencies.length > 0 ? currencies : undefined),
      callingCode,
      tld: tld && tld.length > 0 ? tld : undefined,
      gdpUsd: facts?.gdpUsd,
      gdpLcu: facts?.gdpLcu,
      gdpPerCapitaUsd: facts?.gdpPerCapitaUsd,
      gdpPerCapitaLcu: facts?.gdpPerCapitaLcu,
      democracy: facts?.democracy,
    });
  }

  countries.sort((a, b) => a.name.localeCompare(b.name, "en"));
  return countries;
}

/**
 * Compose a one-line summary for a country suitable for the Learn-mode
 * detail panel: capital · subregion · approximate population · official
 * languages. Pieces are omitted gracefully when the underlying field is
 * missing, so the helper is safe to call on any Country instance.
 */
export function summarizeCountry(c: Country): string {
  const parts: string[] = [];
  if (c.capital) parts.push(`Capital: ${c.capital}`);
  if (c.subregion) parts.push(c.subregion);
  if (typeof c.population === "number") {
    if (c.population >= 1_000_000) {
      parts.push(`pop. ~${(c.population / 1_000_000).toFixed(c.population >= 10_000_000 ? 0 : 1)} M`);
    } else if (c.population >= 1_000) {
      parts.push(`pop. ~${(c.population / 1_000).toFixed(0)} k`);
    } else {
      parts.push(`pop. ${c.population}`);
    }
  }
  if (c.languages && c.languages.length > 0) {
    parts.push(c.languages.slice(0, 2).join(", "));
  }
  return parts.join(" · ");
}
