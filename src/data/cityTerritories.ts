// City-territories: subdivisions that ARE a single city (coterminous with one
// municipality), so calling the city "the capital of" the subdivision is
// tautological — "Putrajaya is the capital city of Putrajaya."
//
// In the Sub-national flags game these are treated as ONE entity: they appear
// only in the sub-national (division) set — shown by their own name, with the
// city's own flag — and are NEVER emitted as a separate "capital city" question
// or given a "capital of X" reveal. (Owner decision, 2026-07.)
//
// This is DISTINCT from a region that is merely named after its capital — a
// Swiss canton (Zürich), an Italian province (Como), a department (Cochabamba).
// Those are genuinely larger than their same-named capital city, so the city
// really is the region's capital; they stay as two separate entities and, when
// they share a coat-of-arms flag, both answers are accepted. Only entities whose
// official status is a single city belong here.
//
// Every entry is a subdivision whose ISO 3166-2 status is a city / city-state /
// autonomous city / federal city-territory / city-municipality (sourced below).
// Never add a province/department/canton/district here just because its name
// matches its capital — research the status first (subdivision-research rule).

/** Subdivision codes that are a single city (see file header). */
export const CITY_TERRITORY_CODES: ReadonlySet<string> = new Set([
  "MY-14", // Kuala Lumpur — Malaysian Federal Territory coterminous with the city
  "MY-16", // Putrajaya — Malaysian Federal Territory, a planned city (federal admin capital)
  "ES-CE", // Ceuta — Spanish Autonomous City
  "US-DC", // Washington — Federal District coterminous with the city of Washington
  "BY-HM", // Minsk — Horad Minsk, the city with special status (ISO 3166-2:BY). BY-MI is Minsk Region, which surrounds it.
  "RS-00", // Belgrade — City of Belgrade (grad), the capital-city administrative unit
  "MD-CU", // Chișinău — Moldovan municipality (city)
  "MD-BA", // Bălți — Moldovan municipality (city)
  "MD-BD", // Bender — Moldovan municipality (city)
  "ZW-BU", // Bulawayo — Zimbabwean city (metropolitan province)
  "MU-PL", // Port Louis — Mauritian city/district coterminous with the capital city
  "KR-11", // Seoul — South Korean Special City (single city)
  "KR-26", // Busan — South Korean Metropolitan City (single city)
  "CZ-PR", // Prague — Act No. 131/2000 Coll. on the Capital City of Prague, §1(1): Prague is at once the capital, a region (kraj) and a municipality (obec).
  "RU-MOW", // Moscow — federal city, a federal subject that is one city (Constitution of Russia, art. 65; ISO 3166-2:RU "autonomous city").
  "RU-SPE", // Saint Petersburg — federal city on the same footing as Moscow (Constitution of Russia, art. 65; ISO 3166-2:RU "autonomous city").
  "AU-ACT", // Australian Capital Territory — federal capital territory essentially
            // the city of Canberra (no separate city government); Canberra has no
            // distinct civic flag — the ACT flag serves both, like Washington DC.
  "CN-HK", // Hong Kong — Wikidata: "city and special administrative region of China"; the SAR IS the city, no separate municipal government/flag.
  "CN-MO", // Macau — Wikidata: "city and special administrative region of China"; same city-territory status as Hong Kong.
  "MM-18", // Nay Pyi Taw Union Territory — coterminous with the planned capital city of Naypyidaw (also Myanmar's national capital; en.wikipedia "Naypyidaw Union Territory").
]);
