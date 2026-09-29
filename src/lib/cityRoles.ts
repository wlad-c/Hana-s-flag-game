import {
  NATIONAL_CITIES,
  SUBNATIONAL_CITIES,
  type City,
} from "../data/cities";
import { SUBDIVISION_CAPITALS } from "../data/subdivisionCapitals";

/**
 * Role flags for a capital marker. A single city can hold several at once — e.g.
 * a subdivision capital that is ALSO the national capital (Buenos Aires is
 * Argentina's capital and the capital of the Autonomous City, AR-C) — so roles
 * are a bitmask and coincident cities merge into one marker carrying every role.
 *
 * The overlay shows CAPITALS ONLY: national capital(s) on the world map, and
 * national capital(s) + each subdivision's capital on the subdivision map.
 * Largest-city data still lives in `src/data/cities.ts` but is intentionally
 * NOT displayed (simplified per owner request, 2026-07).
 */
export const CityRole = {
  NationalCapital: 1,
  SubnationalCapital: 2,
} as const;

export type PlacedCity = {
  /** Stable key (name + rounded coordinates). */
  id: string;
  name: string;
  lon: number;
  lat: number;
  /** Bitmask of CityRole values this city holds in the current view. */
  roles: number;
  /**
   * ISO code of the territory this marker "belongs to" for name-reveal: the
   * subdivision code on the subdivision map (e.g. "JP-13"), or the country code
   * on the world map (e.g. "JP"). The parent map reveals a marker's label when
   * its `ownerCode` matches the currently hovered/selected territory. A
   * subdivision code (with a hyphen) always wins over a plain country code when a
   * city is both a national and a subdivision capital.
   */
  ownerCode?: string;
  /**
   * EVERY territory this marker is the capital of (subdivision and country
   * codes), for name-reveal. One city can serve several: Oslo is the capital of
   * Oslo and the seat of Akershus; Addis Ababa of its own city-state and of
   * Oromia. `ownerCode` keeps a single primary owner; match against this list so
   * hovering any of them reveals the name.
   */
  ownerCodes?: string[];
  /** Sourced capital role note (e.g. "Executive capital"), if any. */
  note?: string;
  population?: number;
};

const key = (c: City) => `${c.name}|${c.lon.toFixed(3)},${c.lat.toFixed(3)}`;

/** True for a subdivision code (has a hyphen, e.g. "JP-13") vs a country code. */
const isSubdivisionCode = (code?: string) => !!code && code.includes("-");

// A city that is BOTH a national capital and a subdivision capital (e.g. Kyiv is
// Ukraine's capital and the capital of Kyiv Oblast) can arrive from two sources
// with SLIGHTLY different coordinates — the national capital from Natural Earth,
// the subdivision capital from the Wikidata fallback layer — so an exact-key merge
// misses them and renders TWO overlapping stars ("two Kievs"). Treat same-named
// capitals within this many degrees (~11 km) as the same city so they merge into
// one dual-level marker. Kept tight so two genuinely distinct same-named towns in
// one country are never wrongly merged.
const COINCIDENT_DEG = 0.1;

/** Find an already-placed city with the same name at (nearly) the same spot. */
function findCoincident(acc: Map<string, PlacedCity>, c: City): PlacedCity | undefined {
  const hit = acc.get(key(c));
  if (hit) return hit;
  for (const p of acc.values()) {
    if (p.name === c.name && Math.abs(p.lon - c.lon) <= COINCIDENT_DEG && Math.abs(p.lat - c.lat) <= COINCIDENT_DEG)
      return p;
  }
  return undefined;
}

/** Merge a city into the accumulator, OR-ing roles and keeping richest data. */
function add(acc: Map<string, PlacedCity>, c: City, role: number, ownerCode?: string) {
  const existing = findCoincident(acc, c);
  if (existing) {
    existing.roles |= role;
    if (!existing.note && c.note) existing.note = c.note;
    // Prefer a subdivision code over a country code so hovering the subdivision
    // reveals a city that is both a national and a subdivision capital.
    if (ownerCode && (!existing.ownerCode || (isSubdivisionCode(ownerCode) && !isSubdivisionCode(existing.ownerCode))))
      existing.ownerCode = ownerCode;
    if (ownerCode && !existing.ownerCodes?.includes(ownerCode))
      existing.ownerCodes = [...(existing.ownerCodes ?? []), ownerCode];
    if (c.population != null && (existing.population == null || c.population > existing.population))
      existing.population = c.population;
    return;
  }
  const k = key(c);
  acc.set(k, {
    id: k,
    name: c.name,
    lon: c.lon,
    lat: c.lat,
    roles: role,
    ownerCode,
    ownerCodes: ownerCode ? [ownerCode] : [],
    note: c.note,
    population: c.population,
  });
}

/**
 * Markers for the world map: each country's national capital(s) only.
 * `codes` defaults to every country with city data.
 */
export function worldCityMarkers(codes?: Iterable<string>): PlacedCity[] {
  const acc = new Map<string, PlacedCity>();
  const list = codes ? [...codes] : Object.keys(NATIONAL_CITIES);
  for (const code of list) {
    const nat = NATIONAL_CITIES[code];
    if (!nat) continue;
    // ownerCode = country code so hovering the country reveals its capital.
    for (const cap of nat.capitals ?? []) add(acc, cap, CityRole.NationalCapital, code);
  }
  return [...acc.values()];
}

/**
 * Markers for a country's subdivision map: the national capital(s) PLUS each
 * listed subdivision's capital. Coincident cities (e.g. a state capital that is
 * also the national capital) merge into one marker carrying both roles.
 */
export function subdivisionCityMarkers(
  countryCode: string,
  subdivisionCodes: Iterable<string>,
): PlacedCity[] {
  const acc = new Map<string, PlacedCity>();
  const nat = NATIONAL_CITIES[countryCode];
  if (nat) {
    for (const cap of nat.capitals ?? []) add(acc, cap, CityRole.NationalCapital, countryCode);
  }
  for (const code of subdivisionCodes) {
    // ownerCode = subdivision code so hovering/selecting the subdivision reveals it.
    // Natural Earth (already reconciled against COUNTRY_FACTS) wins where it has a
    // capital; otherwise fall back to the authoritative Wikidata capital layer,
    // which fills the ~1,800 subdivisions NE tags no capital for (e.g. Norfolk
    // Island → Kingston). See src/data/subdivisionCapitals.ts.
    const neCapital = SUBNATIONAL_CITIES[code]?.capital;
    const capital = neCapital ?? SUBDIVISION_CAPITALS[code];
    if (capital) add(acc, capital, CityRole.SubnationalCapital, code);
  }
  return [...acc.values()];
}

/**
 * The authoritative capital of a single subdivision (by ISO 3166-2 code), or
 * undefined if no source has one. Uses the SAME NE→Wikidata fallback order as
 * the map overlay (`subdivisionCityMarkers`) so the Learn widget's "Capital"
 * row can never disagree with the ★ marker on the map. Never fabricated — a
 * subdivision no source carries a capital for simply returns undefined.
 */
export function subdivisionCapital(code: string): City | undefined {
  return SUBNATIONAL_CITIES[code]?.capital ?? SUBDIVISION_CAPITALS[code];
}

// --- Role helpers used by the marker renderer + legend ----------------------

export const isNational = (r: number) => (r & CityRole.NationalCapital) !== 0;
export const isSubnational = (r: number) => (r & CityRole.SubnationalCapital) !== 0;
