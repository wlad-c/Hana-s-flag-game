/**
 * Era catalogue for the Learn-mode time slider.
 *
 * Historical eras load hand-curated GeoJSON files from the
 * aourednik/historical-basemaps dataset (mirrored in /public/historical-maps).
 * Each file is a FeatureCollection whose features represent actual
 * historical polities of that era (Roman Empire, Mongol Empire, etc.) with
 * their borders as they were — NOT modern country outlines.
 *
 * Each polity's display name comes from the GeoJSON's `NAME` property. The
 * POLITY_REGISTRY below maps a subset of those names to flag images and
 * editorial notes. Polities not in the registry still appear on the map
 * and get a sensible fallback in the detail panel (name only, no flag).
 *
 * "Today" is the one exception — it keeps the modern world-atlas TopoJSON
 * + flagcdn flags so the page still answers "what does the world look like
 * right now?" without any historical-data caveats.
 */

// NOTE: the ".ts" extension is deliberate (allowImportingTsExtensions is on). The
// node-side scripts — historical-era-remaining.mjs, check-historical-maps.mjs — import
// this module directly via Node's type stripping, and Node will not resolve an
// extensionless TypeScript path. Keep the extension so the tracker and the app agree
// on flag resolution.
import { FLAG_ADOPTION_YEAR } from "../data/flagAdoptionYears.ts";
import {
  curatedFlagVerdict,
  type CuratedFlagVerdict,
} from "../data/historicalFlagValidity.ts";
import {
  POLITY_CONTINENT,
  POLITY_CONTINENT_BY_ERA,
} from "../data/polityContinents.ts";

export type Era = {
  /** Stable id (used as React key + URL slug). */
  id: string;
  /** Short label shown on the pill (e.g., "117 AD"). */
  label: string;
  /** Short kid-friendly caption combined with the label on the pill. */
  caption: string;
  /** Year display string (used in the summary line). */
  year: string;
  /** Longer educational summary shown below the slider. */
  summary: string;
  /**
   * Path to the era's GeoJSON file (relative to BASE_URL). Undefined for
   * "Today" — that one falls back to the modern world-atlas behaviour.
   */
  dataUrl?: string;
};

export type PolityInfo = {
  /** Image path relative to BASE_URL. Optional — some entities (cultures,
   *  hunter-gatherer peoples) had no flags in the modern sense. */
  flag?: string;
  /** Display continent / region in the detail panel. */
  continent?: string;
  /** One-line note about the entity, shown below the name in the panel. */
  note?: string;
  /** If set, the polity's flag falls back to the modern country with this
   *  exact `Country.name` (loaded from REST Countries) — useful for the
   *  many post-1815 features whose NAME is just the modern country name
   *  (Brazil, France, etc.) or a close historical variant (Burma → Myanmar,
   *  Ceylon → Sri Lanka, Persia → Iran). Lets us cover hundreds of polities
   *  without curating a flag image for each one. */
  modernName?: string;
  /** Scholarly peak/representative population estimate (people) for this
   *  polity. Optional and intentionally rough — most ancient populations
   *  are debated within ±30%. Shown in the panel summary as e.g. "pop.
   *  ~70 M at peak". Only added for entities with well-documented
   *  estimates; many small city-states are deliberately left undefined. */
  population?: number;
  /** Explicit "show no flag" marker. Suppresses both the curated-flag
   *  path and the modern-country-name auto-fallback even in eras where
   *  the auto-fallback would otherwise apply (1914+). Use for ancient
   *  entities whose NAME happens to match a modern country (Egypt,
   *  Armenia) and for occupied / between-states polities (Korea 1945,
   *  Saar Protectorate, Yemen pre-1990) where no national flag applies. */
  noFlag?: true;
  /** WHY no flag is shown for this polity at this date — one sourced sentence,
   *  rendered verbatim in the panel in place of the generic fallback line.
   *
   *  `noFlag` records only THAT a flag is withheld; before this field existed the
   *  panel had to guess the reason and always guessed the same one ("this polity
   *  predates modern flag design or none survives"), which is false for every
   *  19th/20th-century polity — Nazi Germany (whose flag we deliberately do not
   *  show), the 1938 Netherlands (whose present-day flag flew), the Kingdom of
   *  Hawaii (whose own note describes its flag). Any deliberate suppression in an
   *  era from 1880 on MUST carry this; scripts/check-era-flag-explanations.mjs
   *  fails the build otherwise. Same sourcing discipline as every other fact here:
   *  state what was actually flown, never invent. */
  noFlagReason?: string;
  /** The state that GOVERNED this polity at this era's date, when the dataset's own
   *  SUBJECTO does not say so (it names many colonies as their own sovereign: 1920 and
   *  1960 Angola and Mozambique are `SUBJECTO: "Angola"` / `"Mozambique"` though both
   *  were Portuguese provinces).
   *
   *  Setting it does two things the alias path could not: the polity inherits the
   *  RULER's era-legal flag, and the panel captions it "Flew the flag of X — it had no
   *  national flag of its own at this date" plus a "Ruled by" row. Without the caption a
   *  colony's card implies the ruler's flag was its own, which the historical-era flag
   *  rule forbids — and that is exactly what the colonial entries in
   *  MODERN_NAME_ALIASES ("Gold Coast" → "United Kingdom") used to do.
   *
   *  Sourced like every other field here: name the power that actually governed the
   *  territory at that date, never a guess and never a later successor. */
  ruler?: string;
};

/* --------------------------------------------------------------------------
 * Era list, oldest → newest. Default = "Today" (rightmost).
 *
 * Each label combines the period with a kid-friendly caption, per the
 * design feedback: "117 AD · Roman peak", "1300 · Mongols", etc.
 * --------------------------------------------------------------------- */

const MAP = (file: string) => `historical-maps/${file}.geojson`;

export const ERAS: readonly Era[] = [
  {
    id: "bc2000",
    label: "2000 BC",
    caption: "Bronze Age",
    year: "2000 BC",
    summary: "Bronze Age — Middle Kingdom Egypt, Sumerian city-states, Indus Valley civilisation.",
    dataUrl: MAP("world_bc2000"),
  },
  {
    id: "bc500",
    label: "500 BC",
    caption: "Classical antiquity",
    year: "500 BC",
    summary: "Achaemenid Persia at its peak, Greek city-states, the Warring States in China, early Maurya in India.",
    dataUrl: MAP("world_bc500"),
  },
  {
    id: "bc323",
    label: "323 BC",
    caption: "Alexander's empire",
    year: "323 BC",
    summary: "The Macedonian empire at Alexander's death — Greece to the Indus — about to be divided among his generals.",
    dataUrl: MAP("world_bc323"),
  },
  {
    id: "ad100",
    label: "100 AD",
    caption: "Roman peak",
    year: "100 AD",
    summary: "The Roman Empire under Trajan, Han China, Parthian Empire, Kushans on the Silk Road.",
    dataUrl: MAP("world_100"),
  },
  {
    id: "ad600",
    label: "600 AD",
    caption: "Pre-Islamic",
    year: "600 AD",
    summary: "Byzantine and Sassanid superpowers, Sui China, Maya classic — the Islamic conquests are about to begin.",
    dataUrl: MAP("world_600"),
  },
  {
    id: "ad800",
    label: "800 AD",
    caption: "Carolingian & Abbasid",
    year: "800 AD",
    summary: "Charlemagne crowned in the West, the Abbasid Caliphate at its peak in Baghdad, Tang China.",
    dataUrl: MAP("world_800"),
  },
  {
    id: "ad1000",
    label: "1000",
    caption: "Turn of the millennium",
    year: "1000 AD",
    summary: "Song China's boom, the Fatimids in Egypt, a resurgent Byzantium, Norse voyages to the Atlantic — and Europe's feudal kingdoms taking shape.",
    dataUrl: MAP("world_1000"),
  },
  {
    id: "ad1200",
    label: "1200",
    caption: "Before the Mongols",
    year: "1200 AD",
    summary: "Angkor at its height, the Almohads across the Maghreb, Kamakura Japan — and on the steppe, Genghis Khan is about to unite the Mongol tribes.",
    dataUrl: MAP("world_1200"),
  },
  {
    id: "ad1300",
    label: "1300",
    caption: "Mongol Empire",
    year: "1300 AD",
    summary: "The Mongol Empire — the largest contiguous land empire in history — spans from Korea to the Black Sea.",
    dataUrl: MAP("world_1300"),
  },
  {
    id: "ad1500",
    label: "1500",
    caption: "Age of Discovery",
    year: "1500 AD",
    summary: "Ottoman expansion, Ming China, Aztec and Inca empires, European explorers reach the Americas.",
    dataUrl: MAP("world_1500"),
  },
  {
    id: "ad1600",
    label: "1600",
    caption: "Gunpowder empires",
    year: "1600 AD",
    summary: "Ming China, the Ottomans, Safavid Persia and Mughal India at their heights, while Dutch and English chartered companies push into the Indian Ocean.",
    dataUrl: MAP("world_1600"),
  },
  {
    id: "ad1700",
    label: "1700",
    caption: "Early modern empires",
    year: "1700 AD",
    summary: "Mughal India at its zenith, Qing China, declining Ottoman, rising French / Spanish / British colonial powers.",
    dataUrl: MAP("world_1700"),
  },
  {
    id: "ad1815",
    label: "1815",
    caption: "Post-Napoleonic",
    year: "1815",
    summary: "Congress of Vienna redraws Europe, Latin American independence wars, Qing China at its largest extent.",
    dataUrl: MAP("world_1815"),
  },
  // 1880 replaces the former "1850" era. There is no upstream world_1850 map;
  // the file this app shipped was world_1815.geojson with 12 labels rewritten by
  // a local script, so the "1850" era drew 1815 borders (no Texas, Oregon or the
  // Mexican Cession; no independent Greece or Belgium). 1880 is a real dated
  // upstream map — see docs/historical-eras-improvement-plan.md §5.1. Never
  // re-create an era by relabelling a neighbouring year's map.
  {
    id: "ad1880",
    label: "1880",
    caption: "Scramble for Africa",
    year: "1880",
    summary: "Africa on the eve of partition — Sokoto, Asante, Zululand and the Wassoulou Empire still independent; the Qing, Ottoman and Russian empires intact; Germany and Italy newly unified.",
    dataUrl: MAP("world_1880"),
  },
  {
    id: "ad1900",
    label: "1900",
    caption: "High imperialism",
    year: "1900",
    summary: "Africa partitioned between European powers, the Boxer Rebellion in Qing China, and the Ottoman Empire in its final decades.",
    dataUrl: MAP("world_1900"),
  },
  {
    id: "ad1914",
    label: "1914",
    caption: "WWI eve",
    year: "1914",
    summary: "Europe on the brink of WWI — Austria-Hungary, Ottoman, German and Russian empires still intact.",
    dataUrl: MAP("world_1914"),
  },
  {
    id: "ad1920",
    label: "1920",
    caption: "After WWI",
    year: "1920",
    summary: "Three empires gone — Habsburg, Russian and German — and the defeated Ottoman Empire being partitioned (its sultanate was abolished in 1922). New states across Central Europe, and League of Nations mandates in the Middle East and Africa.",
    dataUrl: MAP("world_1920"),
  },
  {
    id: "ad1938",
    label: "1938",
    caption: "Eve of WWII",
    year: "1938",
    summary: "Nazi Germany annexes Austria and the Sudetenland, Italy holds Ethiopia, Japan is at war in China — and the European empires are still intact.",
    dataUrl: MAP("world_1938"),
  },
  {
    id: "ad1945",
    label: "1945",
    caption: "End of WWII",
    year: "1945",
    summary: "USSR, divided Germany, the British and French colonial empires on the verge of decolonisation.",
    dataUrl: MAP("world_1945"),
  },
  {
    id: "ad1960",
    label: "1960",
    caption: "Cold War",
    year: "1960",
    summary: "Cold War — USSR, Yugoslavia, Czechoslovakia still intact; African decolonisation begins.",
    dataUrl: MAP("world_1960"),
  },
  {
    id: "ad1994",
    label: "1994",
    caption: "After the Cold War",
    year: "1994",
    summary: "The USSR has broken into 15 states, Yugoslavia into five, Czechoslovakia into two — and South Africa has just held its first democratic election.",
    dataUrl: MAP("world_1994"),
  },
  {
    id: "today",
    label: "Today",
    caption: `${new Date().getFullYear()} · Present day`,
    year: String(new Date().getFullYear()),
    summary: `The modern world in ${new Date().getFullYear()}: 195 countries — the 193 UN member states plus the two UN observer states, the Holy See and Palestine.`,
    // No dataUrl → falls back to world-atlas modern map.
  },
];

export const DEFAULT_ERA_ID: Era["id"] = "today";

/**
 * Whether a given era is "close enough to modern" that we can fall back to
 * a modern country's flag when a polity NAME happens to match a modern
 * country name (e.g., "Brazil" → flagcdn br.svg).
 *
 * Most national flags only stabilised in their current form during the
 * 19th–20th centuries (US: 50-star 1960; France tricolour 1830; Brazil
 * republican 1889; Italy 1861; Germany 1949; PRC 1949). So for any era
 * before ~1900, that loose match produces flat-out wrong flags — the
 * Bourbon white flag, the Star-Spangled Banner with 15 stars, the
 * Habsburg yellow-black, the Qing dragon banner.
 *
 * For pre-1900 eras we require an explicit registry entry or alias to
 * resolve a flag — anything unmapped renders as "no flag image", which
 * is more honest than rendering a 21st-century flag in the 1500s.
 */
export function eraAllowsModernFlagFallback(eraId: Era["id"]): boolean {
  // Every era from 1880 on. This used to be the ONLY protection against
  // anachronism, so it was kept to 1914+; now flagExistedInEra() checks each
  // country's actual adoption year, which is both stricter (it refuses South
  // Africa in 1914) and more generous (it allows Denmark in 1700 — the Dannebrog
  // really did fly). Pre-1880 eras still require an explicit registry entry,
  // because a bare NAME match that far back is as likely to be a different polity
  // that merely shares a modern country's name (the Mali Empire, the Kingdom of
  // Kongo, the Kingdom of Georgia) as it is to be the same state.
  return (
    eraId === "ad1880" ||
    eraId === "ad1900" ||
    eraId === "ad1914" ||
    eraId === "ad1920" ||
    eraId === "ad1938" ||
    eraId === "ad1945" ||
    eraId === "ad1960" ||
    eraId === "ad1994" ||
    eraId === "today"
  );
}

/** Numeric year of an era, for comparisons against flag-adoption dates. */
export function eraYear(eraId: Era["id"]): number {
  switch (eraId) {
    case "bc2000": return -2000;
    case "bc500": return -500;
    case "bc323": return -323;
    case "ad100": return 100;
    case "ad600": return 600;
    case "ad800": return 800;
    case "ad1000": return 1000;
    case "ad1200": return 1200;
    case "ad1300": return 1300;
    case "ad1500": return 1500;
    case "ad1600": return 1600;
    case "ad1700": return 1700;
    case "ad1815": return 1815;
    case "ad1880": return 1880;
    case "ad1900": return 1900;
    case "ad1914": return 1914;
    case "ad1920": return 1920;
    case "ad1938": return 1938;
    case "ad1945": return 1945;
    case "ad1960": return 1960;
    case "ad1994": return 1994;
    default: return new Date().getFullYear();
  }
}

/**
 * May a polity in this era be shown the MODERN flag of `countryCode`?
 *
 * Only if that flag already existed at the era's date. Before this gate the app
 * handed today's flag to any polity whose NAME matched a modern country — 99 in
 * 1914, 140 in 1945, 115 in 1960 — so South Africa's 1994 flag flew over the 1914
 * map, Uganda's 1962 flag over 1960, and the 1945 map showed Bangladesh (1971).
 *
 * A code with no known adoption year is BLOCKED, not allowed: a missing flag is
 * honest, a flag decades out of period is not. That is the same asymmetry as every
 * other flag rule in this repo.
 */
export function flagExistedInEra(countryCode: string, eraId: Era["id"]): boolean {
  if (eraId === "today") return true;
  const adopted = FLAG_ADOPTION_YEAR[countryCode];
  if (adopted == null) return false;
  return adopted <= eraYear(eraId);
}

/**
 * May a polity in this era be shown the CURATED historical flag at `flagPath`?
 *
 * The sibling of `flagExistedInEra()` for layer 1 of the flag resolution. The registry
 * is era-agnostic, so one curated image was shown in EVERY era whose GeoJSON carries
 * the polity's NAME — which put the 1889 Qing dragon banner on the 1700 map, the 1816
 * United-Kingdom-of-Portugal arms on 1994 Angola, and ten 19th/20th-century Malay state
 * flags on the 1815 map. A curated file is not safer than a modern flag just because it
 * lives under public/historical-flags/; it is an image with a date.
 *
 * A path with no window in HISTORICAL_FLAG_VALIDITY is REFUSED, never allowed — same
 * asymmetry, same reason: a missing flag is honest, one centuries out of period is not.
 */
export function curatedFlagValidInEra(
  flagPath: string,
  eraId: Era["id"],
): CuratedFlagVerdict {
  if (eraId === "today") return { ok: true };
  return curatedFlagVerdict(flagPath, eraYear(eraId));
}

export function getEra(id: string): Era {
  return ERAS.find((e) => e.id === id) ?? ERAS[ERAS.length - 1]!;
}

/**
 * Polity registry — display info for major historical entities.
 *
 * Keys MUST match the `NAME` property exactly as it appears in the
 * historical-basemaps GeoJSON files. Many entities are missing here on
 * purpose (cultures, tribal confederations, hunter-gatherer peoples) —
 * those render on the map but have a name-only panel in the UI.
 */
export const POLITY_REGISTRY: ReadonlyMap<string, PolityInfo> = new Map([
  // Ancient (2000 BC – 100 AD) ---------------------------------------------
  // NOTE: keys must match dataset NAME values exactly — including British
  // spelling vs American, dataset typos, and punctuation. The historical-
  // basemaps GeoJSONs are mostly American-English ("civilization") and use
  // "Sumer" / "Minoan" / "Indus valley civilization" (lowercase v).
  // No modernName / noFlag on the registry entry for ancient Egypt —
  // ancient Egypt is what's left of the 2000 BC entry; modern-era Egypts
  // (1914 Khedivate, 1945 Kingdom, 1960 UAR, today) are handled via
  // ERA_OVERRIDES below.
  ["Egypt", { continent: "North Africa", note: "Ancient kingdom along the Nile.", population: 3_000_000, noFlag: true }],
  ["Sumer", { continent: "Mesopotamia", note: "City-states of the southern Tigris-Euphrates.", population: 1_000_000 }],
  ["Indus valley civilization", { continent: "South Asia", note: "Bronze-Age cities of Harappa and Mohenjo-Daro.", population: 5_000_000 }],
  ["Minoan", { continent: "Mediterranean", note: "Bronze-Age civilisation of Crete.", population: 250_000 }],
  ["Hittites", { continent: "Anatolia", note: "Bronze-Age empire of Anatolia; rivals of Egypt.", population: 1_500_000 }],
  ["Elam", { continent: "Western Asia", note: "Ancient civilisation of south-west Iran.", population: 1_000_000 }],
  ["Ur", { continent: "Mesopotamia", note: "Sumerian city of Ur, ziggurat of Ur-Nammu.", population: 65_000 }],
  ["Canaan", { continent: "Levant", note: "Ancient Levantine peoples, ancestors of the Phoenicians.", population: 500_000 }],
  ["Xia", { continent: "East Asia", note: "Legendary first Chinese dynasty (Bronze Age).", population: 1_000_000 }],
  ["Kerma", { continent: "Northeast Africa", note: "Bronze-Age Nubian kingdom in modern Sudan.", population: 100_000 }],
  ["Achaemenid Empire", { noFlagReason: "No flag shown — no Achaemenid flag survives. Xenophon describes the royal standard as a golden eagle mounted on a spear, carried before the king rather than flown as a national flag.", continent: "Western Asia", note: "Persian Empire founded by Cyrus the Great.", population: 50_000_000 }],
  ["Greek city-states", { continent: "Mediterranean", note: "Independent poleis: Athens, Sparta, and many more.", population: 3_000_000 }],
  ["Carthaginian Empire", { continent: "Mediterranean", note: "Phoenician maritime empire centred on Carthage.", population: 4_000_000 }],
  ["Etrurians", { continent: "Mediterranean", note: "Pre-Roman civilisation of central Italy.", population: 1_000_000 }],
  ["Magadha", { continent: "South Asia", note: "Powerful kingdom of north-east India.", population: 5_000_000 }],
  ["Rome", { flag: "historical-flags/roman-empire.png", continent: "Mediterranean", note: "Roman Republic — by 500 BC still a city-state, soon to dominate Italy.", population: 100_000 }],
  ["Roman Empire", { flag: "historical-flags/roman-empire.png", continent: "Mediterranean", note: "Ruled the entire Mediterranean basin. Capital: Rome.", population: 70_000_000 }],
  ["Han", { continent: "East Asia", note: "Han dynasty — China's classical age, contemporary with Rome.", population: 57_000_000 }],
  ["Parthian Empire", { flag: "historical-flags/parthian-empire.png", continent: "Western Asia", note: "Rome's eastern rival; Arsacid dynasty.", population: 5_000_000 }],
  ["Kushan Empire", { continent: "Central / South Asia", note: "Buddhist trading empire of the Silk Road.", population: 13_000_000 }],
  ["Axum", { continent: "East Africa", note: "Aksumite Kingdom — major trading power on the Red Sea.", population: 3_000_000 }],
  ["Oromo", { continent: "East Africa", note: "Oromo people — Cushitic pastoralists of the Horn of Africa, whose expansion southward from the 16th century shaped the region's geopolitics and cultures." }],
  ["Meroe", { continent: "Northeast Africa", note: "Kingdom of Kush, successor to Nubia, in modern Sudan.", population: 250_000 }],
  ["Maya chiefdoms and states", { continent: "Mesoamerica", note: "Network of Maya city-states across modern Guatemala / Belize / S. Mexico.", population: 3_000_000 }],
  ["Teotihuacán", { continent: "Mesoamerica", note: "Massive city-state in the Valley of Mexico.", population: 200_000 }],
  // The 600 AD file spells the same city with a grave accent ("Teotihuacàn").
  // Registry keys must match the dataset NAME verbatim, so both spellings are
  // listed — otherwise the era that uses the variant renders a bare name.
  ["Teotihuacàn", { continent: "Mesoamerica", note: "Massive city-state in the Valley of Mexico.", population: 200_000 }],
  ["Moche", { continent: "South America", note: "Andean civilisation of coastal Peru.", population: 500_000 }],
  ["Mogollon", { continent: "North America", note: "Mogollon peoples — ancestral Puebloans of the American Southwest (3rd–12th centuries), known for distinctive pottery and pit houses, occupying Arizona, New Mexico and northern Mexico." }],
  ["Nazca", { continent: "South America", note: "Andean civilisation famous for the desert geoglyphs.", population: 50_000 }],
  ["Himyarite Kingdom", { continent: "Arabia", note: "Incense kingdom of southern Arabia.", population: 1_000_000 }],
  ["Nabatean Kingdom", { continent: "Arabia", note: "Trading kingdom whose capital was Petra.", population: 200_000 }],
  // Modern Armenian tricolour adopted 1990 — wrong for ancient Armenia.
  // Modern Armenia in 1914 was inside the Russian Empire / Ottoman, no
  // independent flag — see ERA_OVERRIDES below for 1914.
  ["Armenia", { continent: "Western Asia", note: "Ancient Armenian kingdom, often caught between Rome and Parthia.", population: 2_000_000, noFlag: true }],
  ["Koguryo", { continent: "East Asia", note: "Korean Three-Kingdoms-era state in the north.", population: 3_000_000 }],
  ["Paekche", { continent: "East Asia", note: "Korean Three-Kingdoms-era state in the south-west.", population: 1_500_000 }],
  ["Post-Ming Warlords", { continent: "East Asia", note: "Chinese warlords and regional military governors who emerged during the Ming–Qing transition (17th century), ruling fragmented territories before Qing reunification.", noFlag: true }],
  ["Silla", { continent: "East Asia", note: "Korean Three-Kingdoms-era state, eventual unifier of Korea.", population: 1_000_000 }],
  ["Koreans", { continent: "East Asia", note: "Korean peoples and kingdoms of the Korean peninsula — from the Three Kingdoms era through to unified dynasties of Goryeo and Joseon." }],
  ["Pagan", { continent: "Southeast Asia", note: "Pagan (Bagan) — a powerful Burmese kingdom (11th–13th c.) whose kings built thousands of temples in the Irrawaddy valley, making it a center of Theravada Buddhism." }],
  ["Shan states", { continent: "Southeast Asia", note: "Shan peoples and their city-states of the uplands of present-day Myanmar — independent kingdoms such as Hsipaw, Keng Tung and others, long a distinct political zone from Burma." }],
  ["Palas", { continent: "South Asia", note: "Pala Empire — a Buddhist dynasty ruling Bengal and Bihar (8th–12th c.), famous for patronizing Nalanda University and exporting Buddhism to Tibet and Central Asia.", population: 2_000_000 }],
  ["Oirat Confederation", { continent: "Eurasian Steppe", note: "Oirat confederation — a powerful Mongol-descended confederation of the western steppe, rivals of the Khalkha Mongols in the 16th–17th centuries." }],
  ["Yayoi", { continent: "East Asia", note: "Pre-state cultures of early Japan.", population: 1_500_000 }],
  ["Scythians", { continent: "Eurasian Steppe", note: "Nomadic peoples of the Pontic-Caspian steppe.", population: 1_000_000 }],
  ["Sarmatians", { continent: "Eurasian Steppe", note: "Nomadic Iranian peoples; later allies + rivals of Rome.", population: 500_000 }],
  ["Dacia", { continent: "Eastern Europe", note: "Iron-Age kingdom in modern Romania; conquered by Rome in 106 AD.", population: 1_000_000 }],

  // === Polities introduced by the 323 BC / 1000 / 1200 / 1600 eras ============
  ["Empire of Alexander", { noFlagReason: "No flag shown — Macedonian armies marched under the Argead royal standard and unit banners; no flag of Alexander's empire survives, and the Vergina Sun is known from royal tombs and coins, not from a flag.", continent: "Eurasia", note: "Alexander the Great's empire at his death in 323 BC — Macedonia and Greece to Egypt, Persia and the Indus. His generals divided it within a generation.", population: 30_000_000 }],
  ["Song Empire", { continent: "East Asia", note: "Song dynasty China — a boom in cities, printing, paper money and iron production; the world's largest economy of its day.", population: 100_000_000 }],
  ["Kimek-Kipchak khaganate", { continent: "Eurasian Steppe", note: "Turkic confederation of the Irtysh and the Kazakh steppe; its Kipchak successors would dominate the Pontic steppe until the Mongols." }],
  ["Kara Khitai Khaganate", { continent: "Central Asia", note: "Qara Khitai (Western Liao) — founded by Khitan refugees from northern China, and conquered by the Mongols in 1218." }],
  ["Tuareg Nomadic Tribes", { continent: "West Africa", note: "Tuareg confederations of the central Sahara, whose caravans carried the salt and gold of the trans-Saharan trade." }],
  // AUDIT 2026-08-07: the dataset spells this polity "Chinese Warlords" in 1920 and
  // "Chinese warlords" in 1938, and the registry had grown a SEPARATE entry for each —
  // disagreeing about the flag (the 1912 five-coloured one vs the 1928 blue-sky one). Now
  // one entry with no era-agnostic flag; each era carries the flag of its own date.
  ["Chinese warlords", { continent: "East Asia", note: "Warlord-era China — the Republic's authority was nominal while regional militarists ruled the provinces.", population: 470_000_000 }],
  // The dataset draws this on the EAST AFRICAN coast (lon 37.7–47.6, lat -11.2–4.1), not
  // in the Deccan: it is the Swahili city-states, not the Indian sultanates an earlier
  // note described. "Islamic and Hindu states" is the Deccan entry.
  ["Islamic city-states", { continent: "East Africa", note: "Swahili city-states — the Muslim merchant towns of the East African coast, from Mogadishu through Malindi and Mombasa to Kilwa and Zanzibar, grown rich on the Indian Ocean trade in gold, ivory and mangrove poles." }],
  ["Islamic and Hindu states", { continent: "South Asia", note: "The patchwork of Deccan sultanates, Rajput kingdoms and southern Hindu states between the Mughal north and Vijayanagara's collapse." }],

  // === Peoples and lifeways, not states =====================================
  // The historical-basemaps files fill the land no state claimed with broad
  // anthropological labels — hunter-gatherer ranges, herding zones, farming
  // traditions. They are the largest features on every ancient map (a single entry
  // here covers 8–13 era slots), and they rendered as bare words. Each note below
  // describes the way of life the label stands for; none carries a population,
  // because population estimates at this granularity are not sourceable — the
  // "omit rather than invent" rule applies to numbers as much as to flags.
  ["Australian aboriginal hunter-gatherers", { continent: "Australia", note: "Aboriginal Australian peoples — hundreds of language groups, each with its own Country, laws and songlines, sustaining the world's oldest continuous cultures for over 50,000 years." }],
  ["Khoiasan", { continent: "Southern Africa", note: "Khoisan peoples — San hunter-gatherers and Khoikhoi herders of southern Africa, speakers of the click languages, whose ancestry is among the deepest branches of humanity." }],
  ["Khoisan", { continent: "Southern Africa", note: "Khoisan peoples — San hunter-gatherers and Khoikhoi herders of southern Africa, speakers of the click languages." }],
  ["Tasmanian hunter-gatherers", { continent: "Australia", note: "Aboriginal Tasmanians — isolated island populations maintaining specialized hunting, fishing and gathering traditions for thousands of years until European settlement in 1803." }],
  ["Bantou", { continent: "Sub-Saharan Africa", note: "Bantu-speaking farming peoples, whose expansion from West-Central Africa carried iron-working, cattle and cereal agriculture across the continent's south and east." }],
  ["Bantu", { continent: "Sub-Saharan Africa", note: "Bantu-speaking farming peoples, whose expansion from West-Central Africa carried iron-working, cattle and cereal agriculture across the continent's south and east." }],
  ["Catacomb culture", { continent: "Eurasian Steppe", note: "Catacomb culture — pastoral peoples of the Pontic-Caspian steppe (3rd–2nd millennium BC), known for burial in catacomb chambers and horse-and-livestock economy, ancestral to later Indo-European groups." }],
  // Drawn across peninsular India (lon 72.8–84.7, lat 8–21.2), not West Africa.
  ["Iron Age megalith cultures", { continent: "South Asia", note: "South India's Iron Age megalith builders — the dolmens, cists and stone circles of the Deccan and the peninsula, from about 1000 BC, buried with black-and-red ware and the subcontinent's earliest iron." }],
  ["Ethiopian highland farmers", { continent: "Northeast Africa", note: "Highland farming societies of Ethiopia — communities practicing terraced agriculture on the Ethiopian plateau and surrounding highlands, ancestors of Amhara and Tigrayans." }],
  ["West African cereal farmers", { continent: "West Africa", note: "Farming societies of the Sahel and savanna growing millet, sorghum and African rice — the agricultural base the empires of Ghana, Mali and Songhai would rise from." }],
  ["Paleo-Siberian hunter-gatherers", { continent: "North Asia", note: "Peoples of the Siberian taiga and tundra — reindeer herders, river fishers and forest hunters, ancestral to today's Chukchi, Koryak, Yukaghir and Evenk." }],
  ["Siberians", { continent: "North Asia", note: "The many peoples of Siberia — Evenk, Yakut, Nenets, Chukchi and others — herding reindeer, hunting and fishing across taiga and tundra." }],
  ["Arctic marine mammal hunters", { continent: "Arctic North America", note: "Arctic coastal peoples who lived by hunting seal, walrus and whale from the ice edge — the Thule tradition and its descendants, the Inuit and Yupik." }],
  ["Thule", { continent: "Arctic North America", note: "Thule culture — the whale-hunting Arctic tradition that spread from Alaska across northern Canada to Greenland from about 1000 AD; ancestors of today's Inuit." }],
  ["Subarctic forest hunter-gatherers", { continent: "North America", note: "Peoples of the boreal forest between tundra and prairie, following moose, caribou and fish through the seasons across what is now Canada and interior Alaska." }],
  ["Athabaskan", { continent: "North America", note: "Athabaskan-speaking peoples of the northwestern forests — a language family stretching from interior Alaska to the Southwest, where it includes the Navajo and Apache." }],
  ["Eastern North Amercian hunter-gatherers", { continent: "North America", note: "Peoples of the eastern woodlands, combining hunting and fishing with maize, beans and squash — the tradition from which the Mississippian mound cities and the Haudenosaunee confederacy grew." }],
  ["Hopewell Culture", { continent: "North America", note: "Hopewell — a Woodland Period culture (200 BC–500 AD) of the Ohio River valley, known for large earthen mounds, intricate artwork, and far-flung trade networks linking the Great Lakes to the Gulf." }],
  ["Plain bison hunters", { continent: "North America", note: "Peoples of the Great Plains, whose lives turned on the bison herds — on foot for millennia, and transformed by the horse after its arrival with the Spanish." }],
  // Drawn over the upper Dnieper, Desna and Oka (lon 29–38.5, lat 50.9–56.7), not the
  // Great Plains.
  ["Plain-Pottery culture", { continent: "Eastern Europe", note: "Plain Pottery culture — Early Iron Age communities of the upper Dnieper, Desna and Oka basins, living in fortified hilltop villages in the East European forest zone." }],
  ["Plateau fichers and hunter gatherers", { continent: "North America", note: "Peoples of the Columbia and Fraser plateaus, whose year centred on the salmon runs, traded along rivers from the Pacific to the Rockies." }],
  ["Desert hunter-gatherers", { continent: "North America", note: "Peoples of the Great Basin and the arid Southwest, living on piñon nuts, small game and seasonal water in one of the continent's harshest environments." }],
  ["Archaic Amerindian hunter-gatherers", { continent: "Americas", note: "Archaic-period peoples of the Americas — mobile hunting, fishing and gathering societies in the millennia between the first settlement of the continents and the rise of farming villages." }],
  ["Amazon hunter-gatherers", { continent: "South America", note: "Peoples of the Amazon basin, combining hunting and fishing with manioc gardens and managed forest — far more numerous and settled than the rainforest's 'empty' reputation suggests." }],
  ["Manioc farmers", { continent: "South America", note: "Lowland South American societies built on manioc (cassava) — a root crop that stores in the ground and feeds dense riverside settlements." }],
  // Drawn on the Brazilian Atlantic coast (lon -49.8–-43, lat -28.5–-21.6).
  ["Shellfish gatherers", { continent: "South America", note: "The sambaqui builders of the Brazilian coast — fisher-hunter-gatherers whose shell mounds, some tens of metres high, run for 3,000 km of Atlantic shoreline and served as dwellings, cemeteries and territorial markers." }],
  ["Papuan neolithic farmers", { continent: "Oceania", note: "Neolithic farming societies of New Guinea — early adopters of agriculture in Oceania, cultivating yams, taro and sago in highland and lowland valleys." }],
  ["Pampas cultures", { continent: "South America", note: "Peoples of the southern grasslands and Patagonia — guanaco hunters on foot until the horse reached the pampas, after which they became formidable riders." }],
  // Drawn across the Bolivian and Brazilian interior (lon -69.3–-34.9, lat -31.8–-4.4).
  ["Savanna hunter-gatherers", { continent: "South America", note: "Hunting and gathering peoples of the South American savannas — the cerrado, the Llanos de Mojos and the Chaco — living alongside, and trading with, the farming societies around them." }],
  ["Saharan Pastoral Nomads", { continent: "Sahara", note: "Saharan herding peoples, moving cattle, sheep and later camels between seasonal pasture and oasis — and carrying the trans-Saharan trade between them." }],
  ["Saharan pastoral nomads", { continent: "Sahara", note: "Saharan herding peoples, moving cattle, sheep and later camels between seasonal pasture and oasis — and carrying the trans-Saharan trade between them." }],
  ["Finno-Ugric taiga hunter-gatherers", { continent: "Northern Europe / North Asia", note: "Finno-Ugric peoples of the northern forests — Sámi, Komi, Mari, Khanty and their neighbours — hunting, fishing and herding reindeer from Scandinavia to the Ob." }],
  ["Austroasian rice cultures", { continent: "Southeast Asia", note: "Rice-farming societies of mainland Southeast Asia, whose wet-field cultivation supported the villages from which the Khmer, Mon and Vietnamese states would grow." }],
  ["Proto-Altaic pastoralists", { continent: "Eurasian Steppe", note: "Herding peoples of the eastern steppe, ancestral to the Turkic and Mongolic confederations that would later dominate inner Asia." }],
  ["Tupis", { continent: "South America", note: "Tupi-speaking peoples of the Brazilian coast and interior — village farmers of manioc and maize, and the first peoples the Portuguese encountered in 1500." }],
  ["Papou", { continent: "Oceania", note: "Papuan peoples of New Guinea — one of the most linguistically diverse regions on earth, and home to some of the world's earliest agriculture in the Highlands." }],
  ["Antarctica", { continent: "Antarctica", note: "Antarctica — the one continent with no indigenous population and no state. Since 1959 the Antarctic Treaty has set its territorial claims aside and reserved it for peaceful science.", noFlag: true, noFlagReason: "No flag shown — Antarctica is not a state and has no national flag; the Antarctic Treaty sets every territorial claim aside." }],

  ["Andean hunter-gatherers", { continent: "South America", note: "Peoples of the high Andes and its dry coast before the great states — herding llama and alpaca, fishing the Humboldt current, and terracing the first mountain fields." }],
  ["Caribbean hunter-gatherers", { continent: "Caribbean", note: "The islands' first peoples — Ortoiroid and Saladoid seafarers who island-hopped from South America, ancestors of the Taíno and Kalinago." }],
  ["North American Pacifi foraging, hunting and fishing peoples", { continent: "North America", note: "Peoples of the Pacific Northwest coast — salmon, cedar and the potlatch supported dense permanent towns without farming, a rarity among foraging societies." }],
  ["Mesoamerican hunter-gatherers and maïze farmers", { continent: "Mesoamerica", note: "The societies that domesticated maize in the Mexican highlands — the crop that would underwrite every later Mesoamerican civilisation." }],
  ["Dorset", { continent: "Arctic North America", note: "Dorset culture — Arctic hunters of seal and walrus who preceded the Thule across northern Canada and Greenland, and vanished as the Thule expanded." }],
  ["Andronovo", { continent: "Eurasian Steppe", note: "Andronovo culture — Bronze-Age herders of the Kazakh steppe, associated with the chariot, the horse and the early Indo-Iranian languages." }],
  ["Tibetan Empire", { continent: "Central Asia", note: "Tibetan Empire — at its height it took the Tang capital, ruled the Silk Road oases and rivalled China and the Abbasids across inner Asia.", population: 3_000_000 }],
  ["Sui Empire", { continent: "East Asia", note: "Sui dynasty — reunified China after three centuries of division and dug the Grand Canal, then collapsed within a generation and gave way to the Tang.", population: 46_000_000 }],
  ["Ouighurs", { continent: "Central Asia", note: "Uyghur Khaganate — a Turkic steppe empire that propped up Tang China after the An Lushan rebellion and adopted Manichaeism as its state religion." }],
  ["Buwayhid Emirates", { continent: "Western Asia", note: "Buyid emirates — Shia Iranian dynasties that took Baghdad in 945 and ruled while the Abbasid caliph reigned in name only." }],
  ["Fatimid Caliphate", { continent: "North Africa / Middle East", note: "Fatimid Caliphate — Ismaili Shia rulers of Egypt and North Africa who founded Cairo and its al-Azhar mosque-university.", population: 6_000_000 }],
  ["Union of South Africa", { continent: "Southern Africa", note: "Union of South Africa (1910–1961) — a self-governing British dominion flying British flags; the modern South African flag came only in 1994.", modernName: "United Kingdom", population: 6_000_000 }],
  ["Arabia", { continent: "Arabia", note: "The Arabian interior — Bedouin tribal confederations and the emirates of Nejd and Hejaz, before the Saudi state unified the peninsula in 1932.", noFlag: true, noFlagReason: "No flag shown — the Bedouin confederations and the emirates of the interior carried tribal and dynastic banners, not one national flag." }],
  ["Arabia (Nejd)", { continent: "Arabia", note: "Nejd — the central Arabian plateau, ruled by the House of Saud since 1744; one of the few Arabian powers independent of Ottoman or European control in 1914, strengthening through the 1920s–30s before fully unifying Arabia in 1932." }],
  ["French West Africa", { continent: "West Africa", note: "French West Africa (1895–1958) — a federation of eight colonies from Senegal to Niger, governed from Dakar.", modernName: "France", population: 15_000_000 }],
  ["French Equatorial Africa", { continent: "Central Africa", note: "French Equatorial Africa (1910–1958) — Gabon, Middle Congo, Ubangi-Shari and Chad, governed from Brazzaville.", modernName: "France", population: 4_000_000 }],
  ["Greenland", { continent: "North America", note: "Greenland — Inuit homeland (Kalaallit Nunaat), colonised by Denmark from 1721 and granted home rule in 1979.", modernName: "Denmark" }],

  ["Patagonian shellfish and marine mammal hunters", { continent: "South America", note: "Peoples of the Patagonian channels and Tierra del Fuego — Yaghan and Kawésqar canoe nomads who lived on shellfish, seal and sea lion in one of the coldest inhabited coasts on earth." }],
  ["Madagascar", { continent: "East Africa", note: "Madagascar — settled from Borneo across the Indian Ocean and from East Africa, giving it an Austronesian language on an African coast; unified under the Merina kingdom in the 19th century.", noFlag: true }],
  ["Saami", { continent: "Northern Europe", note: "Sámi people — reindeer herders, fishers and hunters of Sápmi, spanning northern Norway, Sweden, Finland and the Kola peninsula." }],
  ["Sámi", { continent: "Northern Europe", note: "Sámi people — reindeer herders, fishers and hunters of Sápmi, spanning northern Norway, Sweden, Finland and the Kola peninsula." }],
  ["Samis", { continent: "Northern Europe", note: "Sámi people — reindeer herders, fishers and hunters of Sápmi, spanning northern Norway, Sweden, Finland and the Kola peninsula." }],
  ["Austronesians", { continent: "Maritime SE Asia / Pacific", note: "Austronesian seafarers — from Taiwan they settled island Southeast Asia, Madagascar and the whole Pacific, the widest maritime expansion of the pre-modern world." }],
  ["Semites", { continent: "Middle East", note: "Semitic-speaking peoples of the Levant, Mesopotamia and Arabia — Akkadians, Amorites, Canaanites, Arameans and their neighbours." }],
  ["Berber Tribes", { continent: "North Africa", note: "Amazigh (Berber) peoples of the Maghreb and Sahara — farmers of the Atlas valleys and camel nomads of the desert, from whom the Almoravid and Almohad empires arose." }],
  ["T'atsaot'ine", { continent: "North America", note: "Tatsanottine (Yellowknives) — a Dene people of the Great Slave Lake, named for the native copper they worked and traded across the subarctic." }],
  ["Thai", { continent: "Southeast Asia", note: "Tai-speaking peoples migrating south from what is now southern China into the valleys of mainland Southeast Asia — the ancestors of the Thai, Lao and Shan." }],
  ["Göktürks", { continent: "Eurasian Steppe", note: "Göktürk Khaganate — the first empire to call itself Türk, ruling from Manchuria to the Black Sea and leaving the oldest known Turkic inscriptions." }],
  ["Cuman Khanates", { continent: "Eurasian Steppe", note: "Cuman-Kipchak confederation — Turkic horsemen of the Pontic steppe, scattered by the Mongol invasion of the 1240s." }],
  ["Quazaq Khanate", { continent: "Central Asia", note: "Kazakh Khanate — founded in the 1460s, it gathered the steppe tribes into the three jüz that still structure Kazakh society." }],
  ["Tang Empire", { continent: "East Asia", note: "Tang dynasty — China's cosmopolitan golden age, its capital Chang'an the largest city on earth and the eastern terminus of the Silk Road.", population: 80_000_000 }],
  ["Srivijaya Empire", { continent: "Maritime SE Asia", note: "Srivijaya — a Buddhist maritime power based at Palembang that controlled the Malacca and Sunda straits, and with them the China–India sea trade.", population: 2_500_000 }],
  ["Suren Kingdom", { continent: "Western Asia", note: "Suren Kingdom — an Indo-Parthian kingdom of Mesopotamia and Persia (3rd–1st c. BC), a rival and client of the great Parthian Empire." }],
  ["Ghaznavid Emirate", { continent: "Central / South Asia", note: "Ghaznavid Empire — Turkic slave-soldiers turned rulers of Khorasan and the Punjab, whose raids opened northern India to Muslim rule." }],
  ["Makkura", { continent: "Northeast Africa", note: "Makuria — a Christian Nubian kingdom on the middle Nile that held off Arab conquest for six centuries under the Baqt treaty." }],
  ["Denmark-Norway", { continent: "Northern Europe", note: "Denmark–Norway — a single realm from 1537 to 1814, ruling Norway, Iceland, Greenland and the Faroes from Copenhagen.", modernName: "Denmark" }],

  ["Khazars", { continent: "Eurasian Steppe", note: "Khazar Khaganate — a Turkic steppe empire between the Black and Caspian seas whose elite adopted Judaism, and which shielded Europe from Arab expansion through the Caucasus." }],
  ["Khiva Khanate", { continent: "Central Asia", note: "Khanate of Khiva — an oasis state on the Amu Darya in Khwarezm, a Russian protectorate from 1873 until the Soviets abolished it in 1920." }],
  ["Tiahuanaco Empire", { continent: "South America", note: "Tiwanaku — a highland state on Lake Titicaca whose monumental stonework and llama caravans shaped the Andes for five centuries before the Inca." }],
  ["Huari Empire", { continent: "South America", note: "Wari Empire — the first Andean empire of roads and provincial capitals, whose administrative model the Inca would later inherit." }],
  ["Anasazi", { continent: "North America", note: "Ancestral Puebloan peoples of the Colorado Plateau — builders of the Chaco great houses and the Mesa Verde cliff dwellings." }],
  ["Cree", { continent: "North America", note: "Cree (Nēhiyawak) — the most widespread Indigenous nation of the Canadian subarctic, whose territory stretched from the Rockies to Labrador." }],
  ["Chukchi", { continent: "North Asia", note: "Chukchi people of the far northeast — reindeer herders inland, sea-mammal hunters on the coast, and the one Siberian people the Russian Empire never subdued by force." }],
  ["Comanche", { continent: "North America", note: "Comanche — Shoshone-descended mounted warriors of the Great Plains and Southwest, dominant from the 17th–19th centuries until the Indian Wars." }],
  ["Innu", { continent: "North America", note: "Innu (Montagnais and Naskapi) — a subarctic Algonquian people of Quebec and Labrador, traditionally nomadic hunters of caribou and maritime hunters." }],
  ["Inupiaq", { continent: "Arctic North America", note: "Iñupiat people — an Inuit nation of Alaska, living by marine mammal hunting, whaling and fishing along the Beaufort and Chukchi seas." }],
  ["Naskapi Innu", { continent: "North America", note: "Naskapi and Innu peoples of Labrador — eastern subarctic Algonquian hunters and fishers of the Labrador plateau." }],
  ["Assiniboin", { continent: "North America", note: "Assiniboine — a Sioux-speaking people of the northern Great Plains, known as traders and buffalo hunters with historical presence across Canada and northern US." }],
  ["Ute", { continent: "North America", note: "Ute people — a Native American nation of the Rocky Mountain region (Colorado, Utah), traditional hunters and gatherers adapted to high-altitude and semi-arid environments." }],
  ["Natchez", { continent: "North America", note: "Natchez — a Mississippi Valley Muskogean-speaking people, powerful and hierarchical, eventually dispersed by French colonialism in the 18th century." }],
  ["Shoshoni", { continent: "North America", note: "Shoshone — a Native American people of the intermountain region (Wyoming, Utah, Nevada), skilled at using limited resources in desert and mountain environments." }],
  ["Apache", { continent: "North America", note: "Apache peoples — Athabaskan-speaking nations of the American Southwest (Arizona, New Mexico), including the Chiricahua, Western Apache and Lipan, known as fierce warriors and skilled mounted raiders." }],
  ["Athabascan", { continent: "North America", note: "Athabaskan-speaking peoples of the northwestern forests — a family reaching from interior Alaska to the Southwest, where it includes the Navajo and Apache." }],
  ["Maori", { continent: "Oceania", note: "Māori people of New Zealand — Polynesian settlers who arrived around 1300 AD and developed a distinctive culture of whakapapa genealogy, whānau kinship and tā moko body art." }],
  ["Papuans", { continent: "Oceania", note: "Papuan peoples of New Guinea — diverse populations speaking hundreds of Papuan languages, with distinct lifestyles from coastal fishing to highland agriculture." }],
  ["Papous", { continent: "Oceania", note: "Papuan societies — the indigenous peoples and cultures of New Guinea and surrounding islands, with extraordinary linguistic and cultural diversity." }],
  ["Permians", { continent: "Northern Europe", note: "Finno-Ugric peoples of the Urals and Volga region (Permyaks, Komi, Udmurts) — forest dwellers speaking Uralic languages, eventually incorporated into the Russian Empire." }],
  ["Tungus", { continent: "North Asia", note: "Tungusic peoples of the Siberian and Manchurian forests — Evenk reindeer herders and the Jurchen, whose descendants founded the Qing dynasty." }],
  ["Tungusic Tribes", { continent: "North Asia", note: "Tungusic-speaking peoples of Siberia and Manchuria — diverse groups including Evenks, Ewenki and others, traditionally reindeer herders and hunters of the taiga." }],
  ["Slavonic tribes", { continent: "Eastern Europe", note: "Early Slavic tribal groups spreading across eastern and central Europe, from whom the Rus', Polish, Czech, Serb and Bulgarian states would form." }],
  ["Arabs", { continent: "Arabia", note: "Arab tribal societies of the peninsula — camel nomads and caravan-city traders, on the eve of the Islamic conquests that would carry their language from Iberia to the Indus." }],
  ["Darfur", { continent: "Northeast Africa", note: "Darfur — a sultanate in western Sudan, the Fur kingdom that maintained independence from Ottoman and Egyptian rule until 19th-century conquest, known for its Islamic scholarship and Saharan-Sudanic culture." }],
  ["Ifat", { continent: "Northeast Africa", note: "Ifat sultanate — an early Islamic state and trade power of the Horn of Africa (13th–15th c.), centered on the Ethiopian highlands and Red Sea trade routes." }],
  ["Yemen", { continent: "Arabia", note: "Yemen — a region and state of the Arabian Peninsula, historically fragmented between mountain kingdoms, port cities and tribal confederations, with deep Shia and Sunni communities." }],
  ["Pakistan", { continent: "South Asia", note: "Pakistan — an Islamic republic formed in 1947 from British India, initially comprising West Pakistan (Indus valley) and East Pakistan (now Bangladesh), with Karachi and Lahore as major cities." }],
  ["Bengal", { continent: "South Asia", note: "Bengal — a historic region and state of the Indian subcontinent, center of the British Raj and later a province of independent India and Bangladesh, known for its literary and intellectual culture." }],
  ["Rajput Kingdoms", { continent: "South Asia", note: "Rajput kingdoms of northern India — warrior clans holding hill forts across Rajasthan and Malwa, long the fiercest resistance to Delhi's sultans." }],
  ["Rajput kingdoms", { continent: "South Asia", note: "Rajput kingdoms of northern India — warrior clans holding hill forts across Rajasthan and Malwa, long the fiercest resistance to Delhi's sultans." }],
  ["Zhou states", { continent: "East Asia", note: "The Zhou states — the ritual overlordship of the Zhou kings dissolving into the rival kingdoms of the Spring and Autumn period." }],
  ["Zhow states", { continent: "East Asia", note: "The Zhou states — the ritual overlordship of the Zhou kings dissolving into the rival kingdoms of the Spring and Autumn period." }],
  ["Hadramaut", { continent: "Arabia", note: "Hadhramaut — the incense valleys of southern Arabia, whose merchant families settled across the Indian Ocean from East Africa to Indonesia." }],
  ["Emirate of Bin Shal'an", { noFlagReason: "No flag shown — the Ruwallah emirate of the Sha'lan family was a tribal confederation whose banners are not documented as a state flag.", continent: "Arabia", note: "The Ruwallah emirate of the Al Sha'lan — a Bedouin power of the Syrian desert, controlling the caravan routes between Damascus and Nejd." }],
  ["Emirate of the White Sheep Turks", { continent: "Western Asia", note: "Aq Qoyunlu (\"White Sheep\") — a Turkoman confederation that ruled eastern Anatolia and Persia until the Safavids displaced it in 1501." }],
  ["Turan", { noFlagReason: "No flag shown — \"Turan\" is the dataset's label for the Central Asian khanates, which each used their own dynastic banners rather than a shared flag.", continent: "Central Asia", note: "Turan — the old Persian name for the steppe lands beyond the Oxus, home to the Turkic and Iranian nomads who bordered the settled Persian world." }],
  ["Mongolia", { continent: "East Asia", note: "Mongolia — under Qing rule until 1911 and a Soviet-aligned People's Republic from 1924; the modern soyombo flag dates from 1992.", noFlag: true, population: 800_000 }],
  ["Papua New Guinea", { continent: "Oceania", note: "New Guinea — Papuan and Austronesian societies of extraordinary linguistic diversity, divided between German, British and later Australian administration before independence in 1975.", noFlag: true }],
  ["Hadhramaut", { continent: "Arabia", note: "Hadhramaut — the incense valleys of southern Arabia and their far-flung merchant diaspora." }],

  ["Liao", { continent: "East Asia", note: "Liao dynasty — the Khitan empire of Manchuria and northern China, whose name reached Europe as \"Cathay\".", population: 9_000_000 }],
  ["Xixia", { continent: "East Asia", note: "Western Xia — the Tangut kingdom of the Ordos and Gansu corridor, which held the Silk Road until Genghis Khan destroyed it in 1227.", population: 3_000_000 }],
  ["Alwa", { continent: "Northeast Africa", note: "Alodia — the southernmost of the Christian Nubian kingdoms, with its capital at Soba on the Blue Nile." }],
  ["Afanasevo", { continent: "Eurasian Steppe", note: "Afanasevo culture — the earliest pastoral herders of the Yenisei region and southern Siberia (4th–2nd millennium BC), marked by stone kurgans and livestock economies." }],
  ["Saka Kingdom", { continent: "Central Asia", note: "Saka peoples — Iranian-speaking nomads of Central Asia and the steppes, skilled horsemen and archers feared by Chinese empires, known from Herodotus and the Scythian tradition." }],
  ["Volga Bulgars", { continent: "Eastern Europe", note: "Volga Bulgaria — a Muslim trading state at the Volga–Kama confluence, the northern terminus of the fur and silver routes, destroyed by the Mongols in 1236." }],
  ["Bulgar Khanate", { continent: "Eastern Europe", note: "Balkan Bulgar Khanate — the first Bulgarian state in the Balkans (679–1018), founded by Turkic-speaking Bulgars who mixed with Slavic peoples. Powerful under Simeon the Great but ultimately conquered by the Byzantine Empire." }],
  ["Ainu", { continent: "East Asia", note: "Ainu people of Hokkaido, Sakhalin and the Kurils — hunters, fishers and traders whose language is unrelated to Japanese." }],
  ["Tibeto-Burmanese", { continent: "East / South Asia", note: "Tibeto-Burman speaking peoples of the eastern Himalaya and the upper Irrawaddy, from whom the Burmese, Tibetan and Yi societies descend." }],
  ["Maize farmers", { continent: "Americas", note: "Maize-farming societies of the Americas — the crop domesticated in Mexico that spread from the Andes to the Great Lakes and underwrote every farming civilisation of the hemisphere." }],
  ["Hindu kingdoms and republics", { continent: "South Asia", note: "The mahajanapadas — the kingdoms and gana-sangha republics of the Ganges plain, the political world in which Buddhism and Jainism arose." }],
  ["Mesoamerican city-states and chiefdoms", { continent: "Mesoamerica", note: "The city-states and chiefdoms of Mesoamerica between its great powers — Zapotec, Mixtec, Totonac, Tlaxcalan and their neighbours." }],
  ["Far Eastern SSR", { continent: "North Asia", note: "Far Eastern Republic (1920–1922) — a nominally independent buffer state between Soviet Russia and Japanese-occupied Siberia, absorbed once Japan withdrew.", noFlag: true, noFlagReason: "No flag shown — the buffer republic lasted barely two years and no period-accurate image of its flag is bundled." }],
  // Drawn from the Danube to the Volga-Ural (lon 28.9–62, lat 41.1–52.5) — the Pechenegs,
  // not a North American woodland people.
  ["Peshemegs", { continent: "Eurasian Steppe", note: "Pechenegs — a Turkic nomad confederation of eight tribes that held the Pontic-Caspian steppe from the late 9th century, raiding and hiring out to Kievan Rus and Byzantium until the Rus broke them in 1036." }],

  // Kingdom of Italy 1861–1946: the tricolour with the Savoy arms. Modern Italy's
  // plain tricolour is a 1946 flag, so the gate refuses it for every earlier era —
  // which left Italy AND its colonies blank across five eras.
  ["Austria Hungary", { flag: "historical-flags/austria-hungary.png", continent: "Central Europe", note: "Austria-Hungary — the Habsburg dual monarchy created by the 1867 Compromise.", population: 45_000_000 }],
  ["Imperial Japan", { flag: "historical-flags/japan-1870.svg", continent: "East Asia", note: "Empire of Japan — industrialising fast after the 1868 Meiji Restoration. The Hinomaru it flew was the 1870 Meiji specification: seven by ten, with the disc set slightly toward the hoist. (The 16-ray Rising Sun flag of the period was the army's war flag and the navy's ensign, not the national flag.)" }],
  ["Malay", { continent: "Southeast Asia", note: "Malay peoples and sultanates of the Malay Archipelago — a maritime trading civilization with distinct city-states and sultanates from Malacca to Brunei." }],
  ["Malays", { continent: "Southeast Asia", note: "Malay-speaking peoples of the Malay Peninsula and archipelago — diverse polities united by language, Islam and commerce." }],
  ["Malaysia", { continent: "Southeast Asia", note: "Malay states and Malaysia — from the sultanates of the peninsula to the modern Federation of Malaysia, established after British decolonization." }],
  ["Malaya", { modernName: "United Kingdom", continent: "Southeast Asia", note: "British Malaya — the Straits Settlements and the protected Malay states; the Federation's own flag came in 1950." }],
  ["Xinjiang", { flag: "historical-flags/roc-1912.png", continent: "Central Asia", note: "Xinjiang — a Chinese province run as a personal fiefdom by successive governors, flying the Republic's five-coloured flag.", population: 2_500_000 }],
  ["Manchuria", { flag: "historical-flags/roc-1912.png", continent: "East Asia", note: "Manchuria under the warlord Zhang Zuolin — nominally part of the Republic of China, and flying its five-coloured flag.", population: 20_000_000 }],

  // Medieval (600 AD – 1300 AD) --------------------------------------------
  // 600 AD uses "Eastern Roman Empire" and "Sasanian Empire"; from 800 onwards
  // the dataset says "Byzantine Empire" and there's no Sassanid Persia.
  ["Eastern Roman Empire", { flag: "historical-flags/byzantine-empire.png", continent: "Eastern Mediterranean", note: "Byzantine Empire; capital Constantinople.", population: 26_000_000 }],
  ["Byzantine Empire", { flag: "historical-flags/byzantine-empire.png", continent: "Eastern Mediterranean", note: "Eastern Roman Empire; capital Constantinople.", population: 12_000_000 }],
  ["Sasanian Empire", { noFlagReason: "No flag shown — the Sasanian royal standard, the Derafsh Kaviani, was cut up and its jewels divided after the Arab conquest of 651, and no depiction of it survives from the period.", continent: "Western Asia", note: "Last pre-Islamic Persian empire.", population: 22_000_000 }],
  ["Tang", { continent: "East Asia", note: "Tang dynasty — China's cosmopolitan golden age.", population: 80_000_000 }],
  ["Abbasid Caliphate", { noFlagReason: "No flag shown — the Abbasids' emblem was the plain black banner, carried as a dynastic standard rather than flown as a state flag.", continent: "Middle East", note: "Islamic caliphate; capital Baghdad.", population: 50_000_000 }],
  ["Umayyad Caliphate", { noFlagReason: "No flag shown — the Umayyads fought under plain white banners, and the Abbasids who replaced them under black; neither was a national flag in the modern sense.", continent: "Middle East", note: "Earlier Islamic caliphate; capital Damascus.", population: 33_000_000 }],
  ["Almohad Caliphate", { continent: "North Africa / Iberia", note: "Almohad Caliphate — a Berber-based Islamic empire that ruled North Africa and Islamic Iberia (12th–13th c.), known for strict theology and Andalusian architecture." }],
  ["Caliphate of Córdoba", { continent: "Iberia", note: "Córdoba Caliphate — the western Islamic caliphate ruling Andalusia from the 10th–11th centuries, centered on the magnificent city of Córdoba with its great mosque and library." }],
  ["Carolingian Empire", { continent: "Western Europe", note: "Charlemagne's Frankish empire.", population: 15_000_000 }],
  ["Frankish Kingdom", { continent: "Western Europe", note: "Merovingian / early Frankish kingdom; ancestor of France + Germany.", population: 6_000_000 }],
  ["Kingdom of France", { continent: "Western Europe", note: "Medieval Kingdom of France — Capetian and later rulers holding the Île-de-France and gradually expanding through feudal claims and conquest. The Fleur-de-lis symbol predates the modern tricolour by centuries.", noFlag: true, population: 15_000_000 }],
  ["Holy Roman Empire", { flag: "historical-flags/holy-roman-empire.png", continent: "Central Europe", note: "Successor to the Carolingian Empire in Central Europe.", population: 26_000_000 }],
  ["Mongol Empire", { noFlagReason: "No flag shown — the Mongols rallied to the tug, a standard of horse-tails on a staff (white in peace, black in war), rather than to a flag.", continent: "Eurasia", note: "The largest contiguous land empire in human history.", population: 110_000_000 }],
  ["Great Khanate", { continent: "East Asia", note: "Yuan dynasty — Kublai Khan's Mongol-ruled China.", population: 85_000_000 }],
  ["Khanate of the Golden Horde", { continent: "Eurasian Steppe", note: "Western successor of the Mongol Empire over Russia + Kazakhstan.", population: 10_000_000 }],
  ["Golden Horde", { continent: "Eurasian Steppe", note: "Western successor of the Mongol Empire over Russia + Kazakhstan.", population: 10_000_000 }],
  ["Chagatai Khanate", { continent: "Central Asia", note: "Central-Asian successor of the Mongol Empire.", population: 5_000_000 }],
  ["Nogai Horde", { continent: "Eurasian Steppe", note: "Nogai Horde — a Turkic confederation of the western steppe (15th–18th c.), eventually absorbed by Russian and Ottoman expansion, with descendants still living in the Caucasus." }],
  ["Ilkhanate", { continent: "Western Asia", note: "Persian successor of the Mongol Empire.", population: 15_000_000 }],
  ["Yuan", { continent: "East Asia", note: "Mongol-ruled dynasty of China.", population: 85_000_000 }],
  ["Song", { continent: "East Asia", note: "Song dynasty — Chinese economic + technological boom.", population: 100_000_000 }],
  ["Khmer Empire", { continent: "Southeast Asia", note: "Builders of Angkor Wat.", population: 1_500_000 }],
  ["Srivijaya", { continent: "Southeast Asia", note: "Maritime empire of Sumatra.", population: 2_500_000 }],
  ["Nan Chao", { continent: "Southeast Asia", note: "Nanzhao Kingdom — a powerful medieval kingdom of what is now southern China (Yunnan), built by the Tai people; dominated the region from the 8th–13th centuries before falling to the Mongols.", noFlag: true, population: 1_000_000 }],
  ["Mali Empire", { continent: "West Africa", note: "Wealthy West African empire of Mansa Musa.", population: 50_000_000 }],
  ["Mali", { continent: "West Africa", note: "Medieval Mali Empire of Mansa Musa.", population: 50_000_000 }],
  ["Ghana Empire", { continent: "West Africa", note: "Earlier West African trans-Saharan trading power.", population: 4_000_000 }],
  ["Ghana", { continent: "West Africa", note: "Medieval Ghana Empire — trans-Saharan gold trade.", population: 4_000_000 }],
  ["Empire of Ghana", { continent: "West Africa", note: "Medieval Ghana Empire — trans-Saharan gold trade.", population: 4_000_000 }],
  ["Kanem", { continent: "West Africa", note: "Kanem-Bornu — a powerful Saharan trading state centred at Lake Chad, famous for its mounted warriors and control of the trans-Saharan salt and slave routes from the 9th–19th centuries.", population: 3_000_000 }],
  ["Kanem-Bornu", { continent: "West Africa", note: "Later Kanem-Bornu — successor state to Kanem, a long-lived Saharan power that lasted into the 19th century under Ottoman influence." }],
  ["Aghlabid Emirate", { continent: "North Africa", note: "Aghlabid Emirate — an Arab dynasty ruling North Africa and Sicily (9th–10th c.), known for their naval power and for eventually being replaced by the Fatimids." }],
  ["Great Zimbabwe", { continent: "Southern Africa", note: "Iron-Age trading state and stone-walled capital.", population: 150_000 }],
  ["Mwenemutapa", { continent: "Southern Africa", note: "Mutapa Empire (Mwenemutapa) — a powerful Bantu state that succeeded Great Zimbabwe in southern Africa (15th–17th c.), known for gold and ivory trade with the Portuguese and Arab merchants." }],
  ["Luba", { continent: "Central Africa", note: "Luba Empire — a powerful Bantu state of central Africa (15th–19th c.), known for a divine kingship system and a sophisticated administrative structure that influenced neighboring Lunda." }],
  ["Visigothic Kingdom", { continent: "Iberia", note: "Germanic kingdom in Iberia after Rome's fall.", population: 6_000_000 }],
  ["Lombard principalities", { continent: "Italy", note: "Germanic kingdoms that ruled post-Roman Italy.", population: 3_000_000 }],
  ["Lombard duchies", { continent: "Italy", note: "Lombard polities of central + southern Italy.", population: 2_000_000 }],
  ["Avars", { continent: "Eastern Europe", note: "Nomadic confederation; rivals of the Byzantines.", population: 500_000 }],
  ["Bulgars", { continent: "Eastern Europe", note: "First Bulgarian Empire of the Balkans.", population: 5_000_000 }],

  // Early modern (1500 – 1815) ----------------------------------------------
  ["Aztec Empire", { continent: "Mesoamerica", note: "Triple-alliance empire centred on Tenochtitlan.", population: 5_000_000 }],
  ["Inca Empire", { continent: "South America", note: "Andean empire stretching from Ecuador to Chile.", population: 12_000_000 }],
  ["Ming", { continent: "East Asia", note: "Ming dynasty — Great Wall, Forbidden City, voyages of Zheng He.", population: 160_000_000 }],
  ["Qin", { continent: "East Asia", note: "Qin dynasty — the first unified Chinese empire (221–206 BC), famous for the Great Wall, the Terracotta Army and the Legalist philosophy that bound the empire together.", noFlag: true, population: 20_000_000 }],
  ["Qing", { flag: "historical-flags/qing-dynasty.png", continent: "East Asia", note: "Last imperial Chinese dynasty. The yellow dragon banner was China's national flag from 1889 until the 1912 revolution.", population: 432_000_000 }],
  ["Manchu Empire", { flag: "historical-flags/qing-dynasty.png", continent: "East Asia", note: "Qing dynasty — China's last imperial dynasty. The yellow dragon banner was the national flag from 1889 until the 1912 revolution.", population: 432_000_000 }],
  ["Zhangzhung Kingdom", { continent: "Central Asia", note: "Zhangzhung Kingdom — an ancient kingdom of the Tibetan plateau (2nd millennium BC – 7th century AD) that predated and influenced later Tibetan civilization, known for its own language and religious traditions." }],
  ["Mughal Empire", { flag: "historical-flags/mughal-empire.png", continent: "South Asia", note: "Persianate Muslim empire that built the Taj Mahal.", population: 150_000_000 }],
  ["Ottoman Empire", { flag: "historical-flags/ottoman-empire.png", continent: "SE Europe / Western Asia", note: "Sultanate ruling Anatolia, the Balkans, and the Middle East.", population: 35_000_000 }],
  ["Turkey", { continent: "Western Asia", note: "Ottoman Turkish empire and successor states — from the Ottomans (1299–1922) through the transition to the Turkish Republic (1923–present).", noFlag: true, population: 8_000_000 }],
  ["Spanish Empire", { continent: "Global", note: "First truly global empire; covered the Americas, Philippines, and parts of Africa.", population: 70_000_000 }],
  ["Portuguese Empire", { continent: "Global", note: "Maritime empire — Brazil, Africa, India, Macau, Timor.", population: 22_000_000 }],
  ["French Empire", { continent: "Global", note: "Napoleonic France at its peak.", population: 44_000_000 }],
  ["Austrian Empire", { flag: "historical-flags/austrian-empire.png", continent: "Central Europe", note: "Habsburg empire (1804–1867), before Austria-Hungary. The red-white-red civil ensign is one of Europe's oldest national symbols, in use since the 13th century.", population: 30_000_000 }],
  ["Russian Empire", { flag: "historical-flags/russian-empire.png", continent: "Eastern Europe / North Asia", note: "Vast Eurasian empire under the Romanovs.", population: 178_000_000 }],
  ["Tokugawa Shogunate", { flag: "historical-flags/japan-shogunate.png", continent: "East Asia", note: "Edo-period Japan.", population: 32_000_000 }],
  ["Safavid Empire", { continent: "Western Asia", note: "Iranian Shia empire; rival of the Ottomans.", population: 10_000_000 }],
  ["Prussia", { continent: "Central Europe", note: "Kingdom of Prussia — the dominant German state that unified Germany in 1871. Flew the black eagle on white; the German tricolour didn't exist until 1848.", noFlag: true, population: 11_000_000 }],
  ["Maratha Confederacy", { noFlagReason: "No flag shown — Maratha armies fought under the saffron bhagwa dhwaj, a dynastic and religious banner rather than a state flag, and no period-accurate image of it is bundled.", continent: "South Asia", note: "Hindu confederation that broke Mughal power in 18th-century India.", population: 80_000_000 }],
  ["minor Hindu kingdoms", { continent: "South Asia", note: "Small Hindu kingdoms and principalities of the Indian subcontinent — diverse regional powers ruling valleys, plateaus and coastal strips, often tributary to larger empires." }],
  ["Rajput Clans and Small States", { continent: "South Asia", note: "Rajput warrior clans and their feudal states — smaller principalities and fiefdoms of Rajasthan and central India, often at odds with each other and with Delhi's sultans." }],
  ["Viceroyalty of Brazil", { ruler: "Portugal", continent: "South America", note: "United Kingdom of Portugal, Brazil and the Algarves (1815–1825) — Brazil was part of a joint kingdom with Portugal, not yet independent." }],
  ["Vice Royalty of New Spain", { continent: "North America / Mesoamerica", note: "Spanish Viceroyalty of New Spain (1535–1821) — Spain's largest American possession, controlling Mexico, Central America, the Caribbean, the Philippines and other vast territories. The viceroy governed from Mexico City, second only to the King of Spain in the American empire." }],
  ["Botswana", { continent: "Southern Africa", note: "British Bechuanaland and the Bechuanaland Protectorate — the British-controlled territory that became independent Botswana in 1966. Despite the harsh environment, it became one of Africa's most stable democracies.", noFlag: true }],
  ["Cameroon", { continent: "Central Africa", note: "German Kamerun and later French and British Cameroons — a colony partitioned between European powers, it became independent Cameroon in 1960 and united as a federal republic." }],
  ["Ivory Coast", { continent: "West Africa", note: "French Ivory Coast (Côte d'Ivoire) — a French colonial possession in West Africa, gained independence in 1960, and became a center of cocoa production." }],
  ["Mauritania", { continent: "West Africa", note: "French West Africa and the Mauritania territory — a French colonial possession in the Sahel that became independent in 1960. Spans desert and river valley, historically home to Arab, Berber and Black African peoples.", noFlag: true }],
  ["Zimbabwe", { continent: "Southern Africa", note: "Southern Rhodesia — a British settler colony in south-central Africa, named after the Great Zimbabwe ruins. After a long anti-colonial war, it became independent Zimbabwe in 1980.", noFlag: true }],
  ["Western Sahara", { continent: "North Africa", noFlagReason: "No flag shown — the territory flew Spain's flag until 1975 and its status has been disputed ever since; the Sahrawi flag dates from 1976 and the game takes no side.", note: "Western Sahara — a disputed territory in the Sahara, claimed by Morocco and the Sahrawi Arab Democratic Republic; historically governed as a Spanish colony until 1975." }],
  ["Guyana", { continent: "South America", note: "British Guiana — a British colony on the Caribbean coast of South America. It gained independence in 1966 as Guyana, the only English-speaking nation on the continent.", noFlag: true }],
  ["Suriname", { continent: "South America", note: "Dutch Guiana — a Dutch colony in northeastern South America, home to diverse populations including Creoles, Hindus, and Javanese. It became independent in 1975 as Suriname.", noFlag: true }],
  ["French Guiana", { continent: "South America", noFlagReason: "No flag shown — French Guiana flies the French tricolour; France recognises no official flag for its regions or overseas departments.", note: "French Guiana — a French overseas territory and penal colony in South America, historically a place of exile and later a rocket launch site; it remains an overseas department of France." }],

  // === Hausa Bakwai (Hausa-State city-states, 1500/1700) ====================
  // The 7 "true" Hausa city-states plus a couple of "Banza Bakwai". Each
  // had its own king (sarki) and walled capital. None had modern-style
  // national flags, so all are flag-less by design.
  ["Kano",    { continent: "West Africa", note: "Largest and richest Hausa city-state; major trans-Saharan trade hub.", population: 250_000 }],
  ["Katsina", { continent: "West Africa", note: "Northern Hausa city-state; great Islamic learning centre.", population: 150_000 }],
  ["Daura",   { continent: "West Africa", note: "Considered the oldest of the Hausa Bakwai by tradition.", population: 50_000 }],
  ["Zazzau",  { continent: "West Africa", note: "Southernmost Hausa city-state (modern Zaria); ruled by the famed Queen Amina in the late 16th c.", population: 100_000 }],
  ["Gobir",   { continent: "West Africa", note: "Northern Hausa city-state; would later resist the Sokoto Caliphate's jihad in the early 19th c.", population: 80_000 }],
  ["Rano",    { continent: "West Africa", note: "Smaller Hausa state, ally of Kano.", population: 40_000 }],
  ["Biram",   { continent: "West Africa", note: "Founder-state of the Hausa Bakwai by tradition, centred on Hadejia.", population: 30_000 }],
  ["Kebbi",   { continent: "West Africa", note: "Banza Bakwai (\"bastard seven\") Hausa state — Kebbi Sultanate.", population: 80_000 }],

  // === Mossi kingdoms (Burkina Faso, 1500–1815) =============================
  // Three / four independent Mossi naam (chiefdoms) of the Volta basin,
  // founded c. 11th–15th c. They resisted both Mali and Songhai for
  // centuries. No flags survive from the period.
  ["Kingdom of Wagadugu",     { continent: "West Africa", note: "Most prominent Mossi kingdom; its capital became modern Ouagadougou.", population: 500_000 }],
  ["Kingdom of Yatenga",      { continent: "West Africa", note: "Northern Mossi kingdom centred on Ouahigouya.", population: 250_000 }],
  ["Kingdom of Tenkodogo",    { continent: "West Africa", note: "Considered the oldest Mossi kingdom by tradition.", population: 150_000 }],
  ["Kingdom of Fada N'Gourma", { continent: "West Africa", note: "Easternmost Mossi kingdom.", population: 150_000 }],

  // === Burmese kingdoms (1500) ==============================================
  // After Ava's collapse the Burmese world fragmented into competing
  // kingdoms. The unified Toungoo dynasty would re-emerge in the mid-16th c.
  ["Ava",                  { continent: "Southeast Asia", note: "Upper-Burmese kingdom on the Irrawaddy; successor to Pagan.", population: 2_000_000 }],
  ["Pegu (Hanthawaddy)",   { continent: "Southeast Asia", note: "Mon kingdom of southern Burma; rivals of Ava.", population: 1_000_000 }],
  ["Mrauk U",              { continent: "Southeast Asia", note: "Coastal Arakanese kingdom on the Bay of Bengal.", population: 500_000 }],
  ["Shan principalities",  { continent: "Southeast Asia", note: "Patchwork of Tai/Shan principalities in the eastern hills, often vassals of Ava or China.", population: 500_000 }],

  // === Aymara kingdoms (1300) — Lake Titicaca altiplano =====================
  // Network of small Aymara-speaking kingdoms after the fall of Tiwanaku
  // and before the Inca conquest (c. 1450). All flag-less.
  ["Lupaca",   { continent: "South America", note: "Western lake-shore Aymara kingdom; later allies of the Inca.", population: 150_000 }],
  ["Colla",    { continent: "South America", note: "Northern lake-shore Aymara kingdom; resisted Inca expansion.", population: 200_000 }],
  ["Pacajes",  { continent: "South America", note: "Southern Aymara kingdom of the altiplano.", population: 100_000 }],
  ["Carangas", { continent: "South America", note: "Western altiplano Aymara kingdom (modern Oruro region).", population: 80_000 }],
  ["Charcas",  { continent: "South America", note: "South-eastern Aymara confederation in modern southern Bolivia.", population: 100_000 }],

  // === Indian patchworks (500 BC – 800 AD) =================================
  // Modern Indian admin-1 boundaries used to subdivide the dataset's
  // "Hindu kingdoms" / "Hindu states" lumped polygon into the dominant
  // polities of each era. Borders are heavily approximate — ancient
  // kingdoms didn't follow modern state lines — but the labels track the
  // era's history. All flag-less by design (none had a national flag).
  ["Anarta region", { continent: "South Asia", note: "North-western coast — the Mahabharata's land of Krishna's Dwaraka.", population: 1_000_000 }],
  ["Avanti Mahajanapada", { continent: "South Asia", note: "Powerful central-Indian realm with capital Ujjayini.", population: 3_000_000 }],
  ["Bengal kingdoms", { continent: "South Asia", note: "Vanga and Pundra kingdoms of the Ganges delta.", population: 4_000_000 }],
  ["Chalukya of Vatapi", { continent: "South Asia", note: "Powerful Deccan dynasty, soon to fight the Pallavas.", population: 10_000_000 }],
  ["Chera Kingdom", { continent: "South Asia", note: "Westernmost of the three classical Tamil kingdoms.", population: 2_000_000 }],
  ["Chera Kingdoms", { continent: "South Asia", note: "Smaller Chera principalities of the west coast.", population: 2_500_000 }],
  ["Chola state", { continent: "South Asia", note: "Chola Empire — a Tamil dynasty that dominated southern India and maritime trade, especially under Rajendra the Great (1014–1044), whose name (Chola, Chulamandalam) marks the heart of their domain.", population: 2_500_000 }],
  ["Chola / Pandya kingdoms", { continent: "South Asia", note: "Two of the three classical Tamil kingdoms — Chola in the centre, Pandya in the south.", population: 5_000_000 }],
  ["Eastern Ganga dynasty", { continent: "South Asia", note: "Builders of the Konark Sun Temple, in later centuries.", population: 5_000_000 }],
  ["Gauda Kingdom", { continent: "South Asia", note: "Shashanka's kingdom of Bengal.", population: 4_000_000 }],
  ["Gurjara dynasty", { continent: "South Asia", note: "Predecessors of the Pratiharas.", population: 3_000_000 }],
  ["Gurjara-Pratihara", { continent: "South Asia", note: "Northern Indian dynasty; held off Arab incursions across the Sindh.", population: 50_000_000 }],
  // The 800 AD file carries BOTH the hyphenated and the space-separated
  // spelling as separate features; keep both keys so neither renders bare.
  ["Gurjara Pratihara", { continent: "South Asia", note: "Northern Indian dynasty; held off Arab incursions across the Sindh.", population: 50_000_000 }],
  ["Kuru Mahajanapada", { continent: "South Asia", note: "One of the great Vedic-age realms, north-west of the Ganges.", population: 1_500_000 }],
  ["Late Gupta successors", { continent: "South Asia", note: "Petty kingdoms of the late-Gupta collapse.", population: 5_000_000 }],
  ["Late Pallava / early Chola", { continent: "South Asia", note: "End of Pallava power; the Cholas would soon rise to imperial heights.", population: 8_000_000 }],
  ["Later Gupta dynasty", { continent: "South Asia", note: "Smaller successor of the imperial Guptas.", population: 8_000_000 }],
  ["Maitraka Kingdom", { continent: "South Asia", note: "Western kingdom centred on Valabhi.", population: 2_000_000 }],
  ["Matsya Mahajanapada", { continent: "South Asia", note: "Centred on Viratanagara in modern Rajasthan.", population: 1_000_000 }],
  ["Maukhari Kingdom", { continent: "South Asia", note: "Centred on Kanyakubja (Kannauj); soon to fall to Harsha.", population: 8_000_000 }],
  ["Maukharis / small kingdoms", { continent: "South Asia", note: "Post-Mauryan principalities of the Ganges plain.", population: 10_000_000 }],
  ["Pala Empire", { continent: "South Asia", note: "Buddhist dynasty of Bengal and Bihar; sponsors of Nalanda.", population: 30_000_000 }],
  ["Pallava Kingdom", { continent: "South Asia", note: "Builders of Mahabalipuram; centred on Kanchipuram.", population: 7_000_000 }],
  ["Pancala / Kosala", { continent: "South Asia", note: "Twin great realms of the Ganges plain — Pancala in the west, Kosala in the east around Ayodhya.", population: 3_000_000 }],
  ["Rashtrakuta Empire", { continent: "South Asia", note: "Deccan empire of the 8th–10th centuries — the era's true superpower.", population: 40_000_000 }],
  ["Satavahana Empire", { continent: "South Asia", note: "Deccan empire bridging north and south India.", population: 15_000_000 }],
  ["Vakataka successors", { continent: "South Asia", note: "Local powers in the post-Vakataka Deccan.", population: 6_000_000 }],
  ["Western Satraps / Saka", { continent: "South Asia", note: "Indo-Scythian satrapies of the north-west.", population: 3_000_000 }],
  ["Yaudheya Confederation", { continent: "South Asia", note: "Republican confederation of warriors in the north-western plains.", population: 1_500_000 }],

  // === Maya world (100 AD – 1500) ===========================================
  // The dataset uses several closely-related lumped NAMEs for the Maya
  // (chiefdoms and states / states / city-states) across eras. Splitting
  // by modern Mexican / Guatemalan / Belizean / Honduran admin-1 gives
  // one feature per major Maya polity per era. None had flags.
  ["Belize Maya city-states", { continent: "Mesoamerica", note: "Caracol and other Belizean Maya polities.", population: 200_000 }],
  ["Calakmul", { continent: "Mesoamerica", note: "Tikal's great rival, the 'Kingdom of the Snake'.", population: 200_000 }],
  ["Caracol", { continent: "Mesoamerica", note: "Major Belizean Maya city-state, defeated Tikal in 562 AD.", population: 140_000 }],
  ["Caribbean Maya", { continent: "Mesoamerica", note: "Coastal Maya polities along the Caribbean.", population: 100_000 }],
  ["Cerros", { continent: "Mesoamerica", note: "Preclassic-Classic Belize Maya site.", population: 5_000 }],
  ["Champotón", { continent: "Mesoamerica", note: "Postclassic Maya port-state.", population: 25_000 }],
  ["Chontal Maya", { continent: "Mesoamerica", note: "Maritime trader Maya of the Gulf coast.", population: 80_000 }],
  ["Cobá", { continent: "Mesoamerica", note: "Late-Classic Maya city-state of the Caribbean coast.", population: 50_000 }],
  ["Copán", { continent: "Mesoamerica", note: "Southernmost major Maya city, famous for its stelae and hieroglyphic stairway.", population: 25_000 }],
  ["Ekab + Cocom", { continent: "Mesoamerica", note: "Eastern Yucatec city-states.", population: 60_000 }],
  ["Highland Maya", { continent: "Mesoamerica", note: "Highland Maya polities of the Verapaz.", population: 400_000 }],
  ["Itzá", { continent: "Mesoamerica", note: "Last independent Maya kingdom (Nojpetén) — held out until 1697.", population: 60_000 }],
  ["K'iche'", { continent: "Mesoamerica", note: "Highland Maya kingdom; would resist Pedro de Alvarado in 1524.", population: 200_000 }],
  ["Lacandon Maya", { continent: "Mesoamerica", note: "Forest-dwelling Maya who resisted the Spanish for centuries.", population: 30_000 }],
  ["Lamanai", { continent: "Mesoamerica", note: "Belize Maya city; one of the longest-occupied Maya sites.", population: 20_000 }],
  ["Lubaantun", { continent: "Mesoamerica", note: "Late-Classic Belizean Maya site.", population: 5_000 }],
  ["Mam", { continent: "Mesoamerica", note: "Highland Maya people of north-western Guatemala.", population: 150_000 }],
  ["Maya city-states (Belize)", { continent: "Mesoamerica", population: 100_000 }],
  ["Mayapán", { continent: "Mesoamerica", note: "Dominant Postclassic Yucatec capital, the last Maya 'state'.", population: 17_000 }],
  ["Mayapán successors", { continent: "Mesoamerica", note: "After Mayapán's 1441 fall, Yucatec split into ~16 chiefdoms.", population: 200_000 }],
  ["Northern Maya", { continent: "Mesoamerica", note: "Northern lowland city-states (Dzibilchaltun, Cobá).", population: 250_000 }],
  ["Palenque", { continent: "Mesoamerica", note: "Classic Maya city-state famed for its temple architecture and inscriptions.", population: 8_000 }],
  ["Preclassic Maya (Belize)", { continent: "Mesoamerica", note: "Early Cerros, Cuello, and Lamanai.", population: 30_000 }],
  ["Preclassic Maya (Calakmul region)", { continent: "Mesoamerica", note: "Early settlements of what would become Calakmul + El Mirador.", population: 250_000 }],
  ["Preclassic Maya (Caribbean coast)", { continent: "Mesoamerica", note: "Eastern Maya coastal settlements.", population: 40_000 }],
  ["Preclassic Maya (Chiapas)", { continent: "Mesoamerica", note: "Late-Preclassic Maya cities of the western Maya world (Izapa, early Palenque).", population: 80_000 }],
  ["Preclassic Maya (Copán region)", { continent: "Mesoamerica", note: "Southern Maya periphery — early settlements of Copán.", population: 20_000 }],
  ["Preclassic Maya (Petén)", { continent: "Mesoamerica", note: "Heart of the Maya jungle — early Tikal and El Mirador region.", population: 150_000 }],
  ["Preclassic Maya (Tabasco)", { continent: "Mesoamerica", note: "Western Maya lowlands — Comalcalco area.", population: 30_000 }],
  ["Preclassic Maya (Yucatán)", { continent: "Mesoamerica", note: "Earliest Yucatec Maya settlements.", population: 50_000 }],
  ["Preclassic Maya (highland)", { continent: "Mesoamerica", note: "Highland Maya of north Guatemala.", population: 100_000 }],
  ["Q'eqchi' Maya", { continent: "Mesoamerica", population: 200_000 }],
  ["Tikal", { continent: "Mesoamerica", note: "Major lowland Maya city-state in modern Guatemala.", population: 90_000 }],
  ["Tulum / Cobá", { continent: "Mesoamerica", note: "Postclassic Yucatec city-states of the Caribbean coast.", population: 40_000 }],
  ["Uxmal", { continent: "Mesoamerica", note: "Late-Classic Puuc-style city of northern Yucatán.", population: 25_000 }],

  // === Andean states & chiefdoms (1300) =====================================
  // Pre-Inca Andean polities of modern Peru and Ecuador, split by
  // department. The Chimú Empire is drawn separately by the dataset.
  ["Cajamarca Kingdom", { continent: "South America", note: "Northern highland kingdom — soon a key Inca tributary.", population: 80_000 }],
  ["Cañari Kingdom", { continent: "South America", note: "Southern Ecuadorian kingdom of the Andes.", population: 200_000 }],
  ["Chachapoya", { continent: "South America", note: "'Cloud forest people' of the eastern Andes.", population: 300_000 }],
  ["Chanka", { continent: "South America", note: "Highland confederation; defeated by Pachacuti Inca.", population: 70_000 }],
  ["Chincha", { continent: "South America", note: "Wealthy coastal kingdom famed for long-distance trade.", population: 100_000 }],
  ["Coastal chiefdoms (Arequipa)", { continent: "South America", note: "Southern coastal polities.", population: 50_000 }],
  ["Highland chiefdoms (Ancash)", { continent: "South America", note: "Pre-Inca highland polities — heirs of Chavín and Recuay.", population: 200_000 }],
  ["Huancavilca", { continent: "South America", note: "Coastal Huancavilca polities of southern Ecuador.", population: 150_000 }],
  ["Ichma", { continent: "South America", note: "Coastal kingdom around Pachacamac, the famed Andean oracle.", population: 50_000 }],
  ["Kingdom of Cuzco", { continent: "South America", note: "Highland kingdom that would soon become the heart of the Inca Empire (1438+).", population: 150_000 }],
  ["Manteño", { continent: "South America", note: "Coastal Manteño culture, famed for their long-distance balsa-raft trade.", population: 100_000 }],
  ["Palta", { continent: "South America", note: "Southernmost Ecuadorian Andean chiefdoms.", population: 50_000 }],
  ["Quitu / Caranqui", { continent: "South America", note: "Northern Andean chiefdoms of modern Ecuador.", population: 200_000 }],
  ["Wanka", { continent: "South America", note: "Central-highland Wanka confederation.", population: 200_000 }],

  // === Greek city-states (500 BC) ===========================================
  // The dataset draws three separate "Greek city-states" features —
  // Aegean, Magna Graecia in Italy, and a small Iberian polygon for the
  // Phocaean colonies. We split by modern Greek / Italian / Spanish
  // admin-1 to surface the most-famous poleis of each. None had a flag.
  ["Aegean islands", { continent: "Mediterranean", note: "Hundreds of small poleis — Naxos, Paros, Melos, Lesbos, Chios, Samos…", population: 600_000 }],
  ["Athens", { continent: "Mediterranean", note: "Democracy + naval power; emblem of the owl of Athena.", population: 300_000 }],
  ["Cretan poleis", { continent: "Mediterranean", note: "Knossos, Gortyn — Doric-speaking Cretan city-states.", population: 250_000 }],
  ["Emporion", { continent: "Mediterranean", note: "Phocaean Greek colony in modern Catalonia — a key trading post.", population: 5_000 }],
  ["Epirote tribes", { continent: "Mediterranean", note: "Tribal Greek kingdoms on the Adriatic coast.", population: 200_000 }],
  ["Greek trading colonies (Iberia)", { continent: "Mediterranean", note: "Hemeroskopeion and other small Phocaean outposts on the Iberian coast.", population: 10_000 }],
  ["Macedon + Thracian cities", { continent: "Mediterranean", note: "Macedon would soon absorb the rest under Philip II + Alexander.", population: 500_000 }],
  ["Magna Graecia (Sicily)", { continent: "Mediterranean", note: "Syracuse, Akragas, Selinunte, Gela — the great Dorian colonies of Sicily.", population: 600_000 }],
  ["Magna Graecia (mainland)", { continent: "Mediterranean", note: "Greek colonies in southern Italy — Sybaris, Croton, Taras (Tarentum), Cumae.", population: 400_000 }],
  ["Sparta + Corinth", { continent: "Mediterranean", note: "Sparta dominated the Peloponnese; Corinth held the isthmus.", population: 300_000 }],
  ["Thebes", { continent: "Mediterranean", note: "Boeotian polis; rival of both Athens and Sparta.", population: 150_000 }],

  // === Swahili-coast city-states (1300 + 1500) =============================
  // The dataset's "Islamic city-states" polygon is actually the East
  // African coast — Mogadishu, Pate, Mombasa, Malindi, Kilwa, Sofala —
  // not the post-Abbasid Middle East as the NAME might suggest. We split
  // by modern Somalia / Kenya / Tanzania / Mozambique coastal admin-1
  // boundaries.
  ["Ajuran Sultanate", { continent: "East Africa", note: "Rising Somali power that resisted the Portuguese.", population: 600_000 }],
  ["Bagamoyo / Kaole sultanates", { continent: "East Africa", note: "Mainland-coast Swahili settlements opposite Zanzibar.", population: 30_000 }],
  ["Kilwa Sultanate", { continent: "East Africa", note: "Greatest of the Swahili sultanates — its 14th-century gold trade made it fabulously rich.", population: 30_000 }],
  ["Malindi", { continent: "East Africa", note: "Famous medieval Swahili city — visited by Zheng He's treasure fleet (1418).", population: 15_000 }],
  ["Mogadishu Sultanate", { continent: "East Africa", note: "Wealthiest Swahili-coast city; commanded the Indian-Ocean gold trade.", population: 30_000 }],
  ["Mombasa Sultanate", { continent: "East Africa", note: "Rival of Malindi and Kilwa; key Indian-Ocean port.", population: 20_000 }],
  ["Mozambique Island sultanate", { continent: "East Africa", note: "Northernmost Mozambican Swahili port.", population: 10_000 }],
  ["Northern Tanzanian Swahili cities", { continent: "East Africa", note: "Small coastal sultanates between Mombasa and Zanzibar.", population: 20_000 }],
  ["Pate Sultanate", { continent: "East Africa", note: "City-state of the Lamu archipelago; Indian-Ocean trading hub.", population: 15_000 }],
  ["Sofala Sultanate", { continent: "East Africa", note: "Gold-trade emporium serving Great Zimbabwe's mines.", population: 10_000 }],
  ["Somali coastal sultanates", { continent: "East Africa", note: "Patchwork of Hawiye / Ajuran emerging powers.", population: 200_000 }],
  ["Zanzibar Sultanates", { continent: "East Africa", note: "Stone Town and the Zanzibar archipelago.", population: 30_000 }],

  // === Malaysian Islamic sultanates (1500) =================================
  // Maritime Southeast Asia in 1500 was a patchwork of Muslim sultanates
  // (Pasai, Demak, Banten, Ternate, Tidore, Brunei, Sulu…) plus the
  // still-Hindu Bali. The dataset shows them all under one "Malaysian
  // Islamic states" polygon — we split by modern Indonesian /
  // Malaysian / Bruneian / Philippine admin-1 boundaries.
  ["Malaysian Islamic states", { continent: "Maritime SE Asia", note: "Collective description for the many independent Muslim sultanates and chiefdoms of Maritime Southeast Asia (the Indonesian and Malaysian archipelagos), united by Islamic faith and maritime trade rather than political control." }],
  ["Bangka tin sultanates", { continent: "Maritime SE Asia", population: 20_000 }],
  ["Banjar Sultanate", { continent: "Maritime SE Asia", note: "Major Kalimantan Muslim sultanate centred on Banjarmasin.", population: 300_000 }],
  ["Banten / Cirebon", { continent: "Maritime SE Asia", note: "West-Java Muslim sultanates — Banten and Cirebon.", population: 600_000 }],
  ["Banten Sultanate", { continent: "Maritime SE Asia", note: "Rising west-Java sultanate; would soon control the Sunda Strait pepper trade.", population: 200_000 }],
  ["Bengkulu chiefdoms", { continent: "Maritime SE Asia", population: 50_000 }],
  ["Bima Sultanate", { continent: "Maritime SE Asia", note: "Eastern Indonesian Muslim sultanate on Sumbawa.", population: 80_000 }],
  ["Brunei satellites", { continent: "Maritime SE Asia", note: "Northern Kalimantan, under Brunei's expanding influence.", population: 100_000 }],
  ["Buton Sultanate", { continent: "Maritime SE Asia", note: "Small Muslim sultanate of south-east Sulawesi.", population: 100_000 }],
  ["Demak Sultanate", { continent: "Maritime SE Asia", note: "First major Muslim sultanate on Java (founded c. 1475); soon to topple Majapahit.", population: 1_000_000 }],
  ["Gowa-Tallo Sultanate", { continent: "Maritime SE Asia", note: "Rising Bugis-Makassar twin sultanate of southern Sulawesi.", population: 400_000 }],
  ["Hindu Bali (Gelgel)", { continent: "Maritime SE Asia", note: "Bali remained Hindu — last hold-out of pre-Islamic Java.", population: 250_000 }],
  ["Jambi Sultanate", { continent: "Maritime SE Asia", note: "Sumatran Malay sultanate on the Batang Hari river.", population: 60_000 }],
  ["Kutai Sultanate", { continent: "Maritime SE Asia", note: "East Kalimantan Muslim sultanate.", population: 30_000 }],
  ["Lampung principalities", { continent: "Maritime SE Asia", note: "Patchwork of small Muslim chiefdoms in southern Sumatra.", population: 80_000 }],
  ["Mandar chiefdoms", { continent: "Maritime SE Asia", note: "Mandar coastal chiefdoms.", population: 50_000 }],
  ["Minahasa / Gorontalo", { continent: "Maritime SE Asia", note: "Northern Sulawesi chiefdoms.", population: 80_000 }],
  ["Minangkabau realm", { continent: "Maritime SE Asia", note: "Highland matrilineal Muslim society of central Sumatra.", population: 400_000 }],
  ["Palembang Sultanate", { continent: "Maritime SE Asia", note: "Late-Srivijaya successor; gradually Islamising in the 15th–16th c.", population: 150_000 }],
  ["Papuan coastal chiefdoms", { continent: "Melanesia", note: "Bird's-head Papua under loose Ternate / Tidore tribute.", population: 100_000 }],
  ["Pasai Sultanate", { continent: "Maritime SE Asia", note: "Earliest Indonesian Muslim sultanate (founded c. 1297) — the gateway of Islam to the archipelago.", population: 150_000 }],
  ["Riau-Lingga sultanates", { continent: "Maritime SE Asia", note: "Strait-of-Malacca Muslim trading polities.", population: 80_000 }],
  ["Sambas / Sukadana sultanates", { continent: "Maritime SE Asia", note: "Western Kalimantan Muslim sultanates.", population: 50_000 }],
  ["Solor / Larantuka", { continent: "Maritime SE Asia", note: "Mixed Muslim and Catholic chiefdoms after Portuguese arrival.", population: 30_000 }],
  ["Sulawesi chiefdoms", { continent: "Maritime SE Asia", note: "Mostly still pre-Islamic in 1500; would Islamise in the 17th c.", population: 200_000 }],
  ["Sulu Sultanate", { continent: "Maritime SE Asia", note: "Muslim sultanate of the Sulu archipelago; Brunei's southern rival.", population: 100_000 }],
  ["Ternate / Tidore Sultanates", { continent: "Maritime SE Asia", note: "Rival Spice-Islands sultanates that controlled the world clove trade.", population: 150_000 }],

  // === Indian Muslim sultanates (1500) =====================================
  // Three separate "Islamic states" dataset polygons — Sindh, Gujarat,
  // and the Deccan. The Deccan polygon splits into the five Bahmani
  // successor sultanates that broke off c. 1490.
  ["Ahmadnagar Sultanate", { continent: "South Asia", note: "Nizam Shahi dynasty, declared independent from Bahmani in 1490.", population: 3_000_000 }],
  ["Baluch tribal confederations", { continent: "South Asia", note: "Tribal Baluch and Makran polities.", population: 500_000 }],
  ["Bidar Sultanate", { continent: "South Asia", note: "Barid Shahi dynasty centred on Bidar's massive fort.", population: 1_500_000 }],
  ["Bijapur Sultanate", { continent: "South Asia", note: "Adil Shahi dynasty — would build the Gol Gumbaz and rule Karnataka for two centuries.", population: 4_000_000 }],
  ["Golkonda Sultanate", { continent: "South Asia", note: "Qutb Shahi dynasty famed for its diamond mines — Hyderabad's founders.", population: 3_500_000 }],
  ["Gujarat Sultanate (Muzaffarid)", { continent: "South Asia", note: "Wealthy maritime Muslim sultanate — its capital Ahmedabad was one of India's largest cities.", population: 6_000_000 }],
  ["Punjab marches (Delhi Sultanate frontier)", { continent: "South Asia", note: "Western frontier of the Lodi Delhi Sultanate.", population: 4_000_000 }],
  ["Samma dynasty (Sindh Sultanate)", { continent: "South Asia", note: "Muslim Sindhi dynasty centred on Thatta; would soon fall to the Arghuns.", population: 2_000_000 }],

  // === Era-agnostic entries that happen to fit 1815 well too =================
  // These polities used essentially the same flag well before 1815 AND today,
  // so they're safe to keep in the global registry without an era-override.
  ["Spain", { flag: "historical-flags/spain-1785.png", continent: "Iberia", note: "Spain's red-yellow-red flag, adopted by Charles III in 1785 — essentially the same design as today's." }],
  ["United Kingdom", { continent: "Northern Europe", note: "The Union Jack as we know it today was adopted in 1801 when the UK was formed.", modernName: "United Kingdom" }],
  ["Netherlands", { continent: "Western Europe", note: "The Dutch tricolour has been used (in the same colours) since the 1570s.", modernName: "Netherlands" }],
  ["Denmark", { continent: "Northern Europe", note: "The Dannebrog is one of the oldest national flags in continuous use — documented since the 14th century.", modernName: "Denmark" }],
  ["Sweden", { continent: "Northern Europe", note: "The Swedish flag has flown in roughly its current form since the 16th century.", modernName: "Sweden" }],
  ["Switzerland", { continent: "Central Europe", note: "The Swiss white-cross-on-red banner dates to the 14th century, though the modern square form was formalised in 1841.", modernName: "Switzerland" }],
  // Spanish viceroyalties only appear in the 1815 dataset, so this entry
  // is era-safe — Spain in 1815 already flew the 1785 flag.
  ["Vice-Royalty of New Spain", { ruler: "Spain", continent: "Mesoamerica", note: "Viceroyalty of New Spain (modern Mexico + Central America), Spanish colony." }],
  ["Vice-Royalty of New Granada", { ruler: "Spain", continent: "South America", note: "Viceroyalty of New Granada (modern Colombia, Venezuela, Ecuador, Panama), Spanish colony." }],
  ["Vice-Royalty of Peru", { ruler: "Spain", continent: "South America", note: "Viceroyalty of Peru, Spanish colony in the Andes." }],
  // Rattanakosin Siam (1782–1932) used the red-with-white-elephant flag
  // until the modern Thai tricolour was adopted in 1917.
  ["Rattanakosin Kingdom", { noFlag: true, noFlagReason: "No flag shown for this date — Siam's flag changed three times in this period: a red field with a white chakra (1782), a white elephant within the chakra (1817), a plain white elephant (1855) and the trirong tricolour (1917).", continent: "Southeast Asia", note: "Rattanakosin Kingdom — modern Thailand's predecessor (founded 1782, capital Bangkok). Red field with white elephant was used until the tricolour came in 1917.", population: 5_000_000 }],
  // Qajar Persia used the Lion-and-Sun banner, not the modern Iran flag —
  // intentionally no modernName so the panel shows "no flag image".
  ["Persia", { continent: "Western Asia", note: "Qajar-era Persia (forerunner of modern Iran). Used the Lion-and-Sun banner — different from the modern flag.", population: 10_000_000 }],
  ["Sweden–Norway", { continent: "Northern Europe", note: "Personal union of Sweden and Norway, 1814–1905. Sweden's tricross banner was very close to today's Swedish flag.", modernName: "Sweden", population: 4_500_000 }],
  // These were independent states in 1815, decades before Italy unified
  // (1861). No modernName — modern Italian tricolour is anachronistic.
  ["Kingdom of Sardinia", { continent: "Italy", note: "Piedmont-Sardinia — would later lead Italian unification, but used the Savoy flag in 1815.", population: 4_000_000 }],
  ["Kingdom of the Two Sicilies", { continent: "Italy", note: "Bourbon kingdom of southern Italy and Sicily — its own flag, not the Italian tricolour.", population: 7_400_000 }],
  // 1914 "Kingdom of Italy" (dataset typo "Kingfom"). By 1914 unified Italy
  // flew the green-white-red tricolour with the Savoy arms — close enough
  // to today's flag for kid-level recognition.
  ["Kingfom of Italy", { continent: "Italy", note: "Kingdom of Italy, 1861–1946 (dataset has a typo of \"Kingdom\").", modernName: "Italy", population: 36_000_000 }],

  // === 1815 / 1850 independent states ======================================
  // These polities had established national identities and flags (or clear
  // colonial-power flags) well before 1850. Added explicitly because the
  // modern-flag auto-fallback only applies to 1914+ eras.

  // Latin American republics — all adopted national flags at independence
  // (1810s–1820s) that are essentially the same as today's.
  ["Haiti", { continent: "Caribbean", note: "Republic of Haiti — the world's first Black republic, independent since 1804. The blue-and-red bicolour with coat of arms has been in use since 1820.", modernName: "Haiti", population: 700_000 }],
  ["United Provinces of La Plata", { continent: "South America", note: "United Provinces of the Río de la Plata — the revolutionary predecessor of Argentina (1810–1831). The sky-blue and white flag with the Sun of May was adopted in 1818.", modernName: "Argentina", population: 500_000 }],
  ["Paraguay", { continent: "South America", note: "Republic of Paraguay, independent since 1811. The distinctive tricolour with different emblems on each face has been in use since 1842.", modernName: "Paraguay", population: 600_000 }],

  // Asian monarchies with long-established flags or symbols
  ["Nepal", { continent: "South Asia", note: "Kingdom of Nepal — the unique double-pennant crimson flag is one of the world's oldest national symbols, formalised in 1962 but in use for centuries.", modernName: "Nepal", population: 3_000_000 }],
  ["Bhutan", { continent: "South Asia", note: "Kingdom of Bhutan — the Druk (Thunder Dragon) flag has been in use since at least the 18th century.", modernName: "Bhutan", population: 300_000 }],
  // Modern Oman flag adopted 1970 — wrong for 1815/1850 (they flew a plain red flag).
  ["Oman", { continent: "Arabia", note: "Sultanate of Oman — the Al Said dynasty has flown a red flag since 1744; the modern design with white stripe and emblem was formalised in 1970.", noFlag: true, population: 700_000 }],

  // Joseon Korea — no modern-style national flag until the Taegukgi (1882)
  ["Korea", { noFlagReason: "No flag shown — Joseon Korea had no national flag until the Taegukgi was designed in 1882 and adopted in 1883.", continent: "East Asia", note: "Joseon (Yi) dynasty of Korea. No standardised national flag until the Taegukgi was introduced in 1882.", noFlag: true, population: 7_000_000 }],

  // Malay peninsula & Borneo sultanates — the same dynasties whose
  // modern Malaysian state flags descend directly from them. Safe to use
  // as both 1815 and 1850 representations.
  ["Johor Sultanate", { noFlag: true, noFlagReason: "No flag shown — Johor's dark-blue flag with the crescent and star dates from 1871; no earlier Johor state flag is documented.", continent: "Southeast Asia", note: "Independent Malay sultanate of the southern peninsula and Singapore, founded 1528 by the heirs of Malacca.", population: 150_000 }],
  ["Kedah Sultanate", { noFlag: true, noFlagReason: "No flag shown — Kedah's red flag with the shield and wreath dates from 1912.", continent: "Southeast Asia", note: "Oldest sultanate on the peninsula (founded c. 1136); paid tribute to Siam.", population: 100_000 }],
  ["Perak Sultanate", { noFlag: true, noFlagReason: "No flag shown — Perak's white, yellow and black bands date from 1879.", continent: "Southeast Asia", note: "Sultanate of the silver-rich Perak River valley.", population: 80_000 }],
  ["Selangor Sultanate", { noFlag: true, noFlagReason: "No flag shown — Selangor's red-and-yellow quartered flag in its present form dates from 1965.", continent: "Southeast Asia", note: "Sultanate founded by Bugis migrants in the 18th century.", population: 60_000 }],
  ["Pahang Sultanate", { noFlag: true, noFlagReason: "No flag shown — Pahang's white-over-black flag dates from 1903.", continent: "Southeast Asia", note: "Largest east-coast sultanate by land area.", population: 60_000 }],
  ["Terengganu Sultanate", { noFlag: true, noFlagReason: "No flag shown — Terengganu's black flag with the white crescent and star dates from 1953.", continent: "Southeast Asia", note: "East-coast sultanate famed for its songket weaving.", population: 70_000 }],
  ["Kelantan Sultanate", { noFlag: true, noFlagReason: "No flag shown — Kelantan's red flag with the crescent, star and kris dates from 1923.", continent: "Southeast Asia", note: "North-east sultanate, long under Siamese influence.", population: 90_000 }],
  ["Negeri Sembilan", { noFlag: true, noFlagReason: "No flag shown — Negeri Sembilan's yellow flag with the black-and-red canton dates from 1895, when the nine states federated as one confederacy.", continent: "Southeast Asia", note: "Confederation of nine Minangkabau-descended chieftaincies.", population: 30_000 }],
  ["Perlis", { noFlag: true, noFlagReason: "No flag shown — Perlis's yellow-over-blue flag dates from 1870, after the state was separated from Kedah.", continent: "Southeast Asia", note: "Small northern principality; vassal of Kedah and Siam.", population: 15_000 }],
  ["Brunei", { noFlag: true, noFlagReason: "No flag shown — Brunei had no state flag before 1888; until then the sultan and his high officials used their own personal standards.", continent: "Southeast Asia", note: "Brunei Sultanate — in this era Brunei controlled most of northern Borneo and flew a plain yellow flag (the modern design with stripes dates from 1906).", population: 500_000 }],
  ["Brunei Sultanate", { noFlag: true, noFlagReason: "No flag shown — Brunei had no state flag before 1888; until then the sultan and his high officials used their own personal standards.", continent: "Southeast Asia", note: "Brunei Sultanate — in 1815/1850 Brunei still controlled most of northern Borneo; the plain yellow flag was used until 1906 when the modern design was formalised.", population: 600_000 }],
  ["British Penang", { flag: "historical-flags/penang.png", continent: "Southeast Asia", note: "Penang — ceded to the British East India Company in 1786, the first British foothold on the Malay Peninsula.", population: 25_000 }],
  ["British Malacca", { modernName: "United Kingdom", continent: "Southeast Asia", note: "British Malacca — part of the Straits Settlements with Penang and Singapore from 1826, flying the Union Jack.", population: 30_000 }],

  // === 1815 / 1850 European minor states ====================================
  ["San Marino", { continent: "Italy", note: "Most Serene Republic of San Marino — one of the world's oldest republics; the blue-and-white flag has been in use since at least the 19th century.", modernName: "San Marino", population: 20_000 }],
  ["Papal States", { continent: "Italy", note: "The Pope's temporal domains in central Italy — yellow-and-white flag. The papacy lost these territories to united Italy in 1870.", noFlag: true, population: 3_000_000 }],
  ["Luxembourg", { continent: "Western Europe", note: "Grand Duchy of Luxembourg — the tricolour (red-white-light blue) has been in use since 1845.", modernName: "Luxembourg", population: 300_000 }],

  // === Caribbean colonial territories ======================================
  // British West Indies — Union Jack flew over these territories in 1815/1850
  ["Anguilla", { modernName: "United Kingdom", continent: "Caribbean", note: "British colony — the Union Jack was the official flag.", population: 3_000 }],
  ["Antigua and Barbuda", { modernName: "United Kingdom", continent: "Caribbean", note: "British colony — the Union Jack was the official flag.", population: 37_000 }],
  ["Barbados", { modernName: "United Kingdom", continent: "Caribbean", note: "British crown colony since 1625 — the Union Jack flew until independence in 1966.", population: 100_000 }],
  ["Dominica", { modernName: "United Kingdom", continent: "Caribbean", note: "British colony — the Union Jack was the official flag.", population: 22_000 }],
  ["Grenada", { modernName: "United Kingdom", continent: "Caribbean", note: "British colony — the Union Jack was the official flag.", population: 30_000 }],
  ["Montserrat", { modernName: "United Kingdom", continent: "Caribbean", note: "British colony — the Union Jack was the official flag.", population: 10_000 }],
  ["Saint Kitts and Nevis", { modernName: "United Kingdom", continent: "Caribbean", note: "British colony — the Union Jack was the official flag.", population: 30_000 }],
  ["Saint Lucia", { modernName: "United Kingdom", continent: "Caribbean", note: "British colony — the Union Jack was the official flag.", population: 30_000 }],
  ["Saint Vincent and the Grenadines", { modernName: "United Kingdom", continent: "Caribbean", note: "British colony — the Union Jack was the official flag.", population: 30_000 }],
  ["Trinidad", { modernName: "United Kingdom", continent: "Caribbean", note: "British colony from 1797 — the Union Jack flew until independence in 1962.", population: 90_000 }],
  // French West Indies — the French tricolour flew over these territories
  ["Guadeloupe", { modernName: "France", continent: "Caribbean", note: "French colony — the tricolour was the official flag.", population: 120_000 }],
  ["Martinique", { modernName: "France", continent: "Caribbean", note: "French colony — the tricolour was the official flag.", population: 100_000 }],
  ["Saint Barthelemy", { modernName: "France", continent: "Caribbean", note: "French colony (briefly Swedish 1784–1878) — the French tricolour was the official flag in 1815.", population: 3_000 }],
  ["Saint Martin", { modernName: "France", continent: "Caribbean", note: "Northern half French, southern half Dutch — the French tricolour flew on the French side.", population: 5_000 }],
  ["Guiana", { modernName: "France", continent: "South America", note: "French Guiana — French colony on the South American mainland; the tricolour was the official flag.", population: 20_000 }],
  // Dutch Caribbean
  ["Netherlands Antilles", { modernName: "Netherlands", continent: "Caribbean", note: "Dutch Caribbean colonies — the Dutch tricolour was the official flag.", population: 50_000 }],

  // === African kingdoms (1815 / 1850) =======================================
  // These were powerful pre-colonial African polities with their own
  // royal symbols, but no standardised modern-style national flags.
  ["Asante", { continent: "West Africa", note: "Asante Empire (Ashanti) — one of West Africa's most powerful kingdoms, in modern Ghana. Famous for Kente cloth and the Golden Stool.", noFlag: true, noFlagReason: "No flag shown — Asante statehood was embodied in the Golden Stool, and its armies fought under many appliqué war banners rather than one national flag; no period image is bundled.", population: 3_000_000 }],
  ["Sokoto Caliphate", { continent: "West Africa", note: "Sokoto Caliphate (Fulani Empire) — founded 1804 by Usman dan Fodio; the largest state in 19th-century sub-Saharan Africa, covering most of northern Nigeria.", noFlag: true, noFlagReason: "No flag shown — the caliphate's emirates rode under Islamic war banners rather than a single national flag, and no period image of them is bundled.", population: 10_000_000 }],
  ["Fulani Empire", { continent: "West Africa", note: "The Fulani Empire is another name for the Sokoto Caliphate — see Sokoto Caliphate.", noFlag: true, population: 10_000_000 }],
  ["Bornu-Kanem", { continent: "West Africa", note: "Kanem-Bornu Empire — one of the longest-lasting states in African history (around Lake Chad, in modern Nigeria and Chad).", noFlag: true, population: 5_000_000 }],
  ["Fante", { continent: "West Africa", note: "Fante Confederation — a loose alliance of Akan peoples of coastal Ghana, rivals of the Asante.", noFlag: true, population: 800_000 }],
  ["Kaarta", { continent: "West Africa", note: "Kingdom of Kaarta — a Bambara state in modern western Mali, sibling rival of the Ségou empire.", noFlag: true, population: 300_000 }],
  ["Buganda", { continent: "East Africa", note: "Kingdom of Buganda — the largest of the Great Lakes kingdoms, in modern Uganda.", noFlag: true, noFlagReason: "No flag shown — the kabaka's court used royal drums and standards, not a national flag; Buganda's own flag dates from the 20th century and no period image is bundled.", population: 1_500_000 }],
  ["Bunyoro", { continent: "East Africa", note: "Kingdom of Bunyoro-Kitara — ancient rival of Buganda, in modern Uganda.", noFlag: true, noFlagReason: "No flag shown — the Bunyoro-Kitara kingship was embodied in royal regalia and drums rather than a flag, and no period flag is bundled.", population: 800_000 }],
  ["Nkore", { continent: "East Africa", note: "Kingdom of Nkore (Ankole) — one of the inter-lacustrine Great Lakes kingdoms, in modern Uganda.", noFlag: true, population: 600_000 }],
  ["Rwanda", { continent: "East Africa", note: "Kingdom of Rwanda — pre-colonial Great Lakes monarchy; the modern nation's flag dates from 2001.", noFlag: true, population: 1_000_000 }],
  ["Burundi", { continent: "East Africa", note: "Kingdom of Burundi (Urundi) — pre-colonial Great Lakes monarchy; the modern flag dates from 1966.", noFlag: true, population: 1_200_000 }],
  ["Lozi", { continent: "Southern Africa", note: "Lozi Kingdom (Barotseland) — in modern western Zambia.", noFlag: true, noFlagReason: "No flag shown — the Lozi kingdom's authority rested on royal regalia and the litunga's barge, not on a national flag; no period flag is bundled.", population: 500_000 }],
  ["Lunda", { continent: "Central Africa", note: "Lunda Empire — a major Central African trading state straddling modern Angola/DRC/Zambia.", noFlag: true, noFlagReason: "No flag shown — the Lunda empire was held together by the mwant yav's court and tribute, not by a national flag; no period flag is bundled.", population: 1_000_000 }],
  ["Kazembe", { continent: "Central Africa", note: "Kingdom of Kazembe — eastern branch of the Lunda Empire, in modern Zambia.", noFlag: true, population: 500_000 }],
  ["Imbangala", { continent: "Central Africa", note: "Imbangala (Jaga) polities of modern Angola — warrior states in the Angolan interior.", noFlag: true, population: 300_000 }],
  ["Zanzibar", { continent: "East Africa", note: "Sultanate of Zanzibar — governed by the Omani Busaidi dynasty from the 1690s. Flew a plain red flag (same as Omani Muscat); the modern Oman flag was only adopted in 1970.", noFlag: true, population: 200_000 }],
  ["Somalia", { continent: "East Africa", note: "Patchwork of Somali sultanates (Majeerteen, Geledi, etc.) — no unified Somali state or flag until 1960.", noFlag: true, population: 2_000_000 }],
  ["Zulu", { continent: "Southern Africa", note: "Zulu Kingdom under Shaka and his successors — the most powerful state in 19th-century southern Africa.", noFlag: true, population: 600_000 }],
  ["Xhosa", { continent: "Southern Africa", note: "Xhosa-speaking chiefdoms of the Eastern Cape — no standardised national flag.", noFlag: true, population: 500_000 }],
  ["Sotho", { continent: "Southern Africa", note: "Basotho Kingdom founded by Moshoeshoe I (c. 1820) — precursor to modern Lesotho.", noFlag: true, population: 300_000 }],
  ["Congo", { continent: "Central Africa", note: "Kingdom of Kongo (or successor Loango / Kakongo states) — pre-colonial Central African kingdom in modern Angola / DRC / Congo-Brazzaville.", noFlag: true, population: 2_000_000 }],

  // === South and Southeast Asian states =====================================
  ["Travancore", { continent: "South Asia", note: "Kingdom of Travancore — Indian princely state on the Malabar coast; under British paramountcy after 1795.", noFlag: true, population: 3_000_000 }],
  ["Oudh", { continent: "South Asia", note: "Kingdom of Oudh (Awadh) — Indian princely state in the Ganges plain, annexed by the British in 1856.", noFlag: true, population: 11_000_000 }],
  ["Mysore (Indian princely state)", { continent: "South Asia", note: "Kingdom of Mysore — reduced to a British-protected princely state after Tipu Sultan's defeat in 1799.", noFlag: true, population: 6_000_000 }],
  ["Sikkim (Indian princely state)", { continent: "South Asia", note: "Kingdom of Sikkim — small Himalayan Buddhist monarchy, became a British protectorate in 1890.", noFlag: true, population: 100_000 }],
  ["Assam", { continent: "South Asia", note: "Ahom Kingdom of Assam — Southeast Asian dynasty that ruled Assam for 600 years; annexed by Britain in 1826.", noFlag: true, population: 3_000_000 }],
  ["Arakan", { continent: "Southeast Asia", note: "Kingdom of Arakan (Mrauk-U) — coastal kingdom in modern Rakhine State, Myanmar; annexed by the Konbaung Burmese in 1785.", noFlag: true, population: 1_000_000 }],
  ["Afghanistan", { continent: "Central Asia", note: "Durrani/Barakzai emirate. The Black-Red-Green tricolour wasn't formalised until 1928; no standardised national flag in this era.", noFlag: true, population: 4_000_000 }],
  ["Arakan (Indian princely state)", { continent: "Southeast Asia", note: "Arakan under British-Indian administration.", noFlag: true, population: 800_000 }],

  // === British Crown Colonies / territories =================================
  ["Canada", { modernName: "United Kingdom", continent: "North America", note: "British North America — the Union Jack flew over the colonial territories that would unite as Canada in 1867.", population: 400_000 }],
  ["Hong Kong", { modernName: "United Kingdom", continent: "East Asia", note: "British Crown Colony of Hong Kong — ceded from Qing China in 1842; the Union Jack flew until 1997.", population: 100_000 }],
  ["Sierra Leone", { modernName: "United Kingdom", continent: "West Africa", note: "British Crown Colony of Sierra Leone — established 1808; the Union Jack was the official flag.", population: 500_000 }],
  ["Senegal", { modernName: "France", continent: "West Africa", note: "French colonial Senegal (Saint-Louis, Gorée) — the tricolour was the official flag.", population: 700_000 }],
  ["Angola", { ruler: "Portugal", continent: "Central Africa", note: "Portuguese Angola — a Portuguese possession from the 16th century until independence in 1975; it flew Portugal's flag of the day throughout.", population: 1_500_000 }],

  // === Oceania / Pacific ===================================================
  ["Kongldom of Hawaii", { continent: "Pacific", note: "Kingdom of Hawaiʻi — an independent Polynesian monarchy from 1810 until the US-backed overthrow of Queen Liliuokalani in 1893. The kingdom's flag combined the Union Jack with horizontal stripes.", noFlag: true, population: 130_000 }],
  ["Tuʻi Tonga Empire", { continent: "Pacific", note: "Tuʻi Tonga Empire — a maritime Polynesian empire centred on Tonga that influenced much of the Pacific.", noFlag: true, population: 30_000 }],
  ["Expansionist Kingdom of Merina", { continent: "East Africa", note: "Kingdom of Merina — the dominant Malagasy kingdom that was unifying Madagascar in the early 19th century.", noFlag: true, population: 1_000_000 }],

  // === European minor states (1815 / 1850) ==================================
  // The German Confederation had ~39 member states; the larger ones shown
  // here all had their own dynastic flags but the modern German flag is
  // entirely anachronistic (Germany didn't unify until 1871). Better to
  // show no flag than the wrong one.
  ["Bavaria", { continent: "Central Europe", note: "Kingdom of Bavaria — major German state in the pre-unification era.", noFlag: true, population: 4_200_000 }],
  ["Saxony", { continent: "Central Europe", note: "Kingdom of Saxony — German state in the pre-unification era.", noFlag: true, population: 1_900_000 }],
  ["Hanover", { continent: "Central Europe", note: "Kingdom of Hanover — German state in the pre-unification era; the British monarch was also King of Hanover until 1837.", noFlag: true, population: 1_800_000 }],
  ["Württemberg", { continent: "Central Europe", note: "Kingdom of Württemberg — German state in the pre-unification era.", noFlag: true, population: 1_600_000 }],
  ["Baden", { continent: "Central Europe", note: "Grand Duchy of Baden — German state in the pre-unification era.", noFlag: true, population: 1_000_000 }],
  ["Lombardy", { continent: "Italy", note: "Lombardy-Venetia — Austrian crownland in northern Italy until the 1859 Italian wars of independence.", noFlag: true, population: 2_500_000 }],
  ["Venetia", { continent: "Italy", note: "The Venetia (former Republic of Venice) — Austrian crownland until 1866.", noFlag: true, population: 2_300_000 }],
  ["Tuscany", { continent: "Italy", note: "Grand Duchy of Tuscany — Habsburg-Lorraine dynasty; Italian unification ended it in 1859.", noFlag: true, population: 1_100_000 }],
  ["Republic of Kraków", { continent: "Central Europe", note: "Free City of Kraków — a nominally independent republic 1815–1846, then annexed by Austria.", noFlag: true, population: 80_000 }],
  ["Tripolitania", { continent: "North Africa", note: "Ottoman Vilayet of Tripolitania (western Libya) — the Ottoman flag flew over it until Italian conquest in 1912.", noFlag: true, population: 500_000 }],
  ["Cyrenaica", { continent: "North Africa", note: "Ottoman Vilayet of Cyrenaica (eastern Libya) — the Ottoman flag flew over it until Italian conquest in 1912.", noFlag: true, population: 200_000 }],
  ["Tunis", { continent: "North Africa", note: "Beylik of Tunis — autonomous Ottoman regency; had its own red flag with crescent and star (forerunner of modern Tunisia's flag).", noFlag: true, population: 1_000_000 }],
  ["Algiers", { continent: "North Africa", note: "Regency of Algiers — autonomous Ottoman state until France invaded in 1830. No standardised national flag.", noFlag: true, population: 3_000_000 }],
  ["central Asian khanates", { continent: "Central Asia", note: "Khanates of the Central Asian steppe (Khiva, Bukhara, Kokand) — independent Islamic successor states of the Mongol era.", noFlag: true, noFlagReason: "No flag shown — Khiva, Bukhara and Kokand were separate states with their own dynastic banners; there was never one shared flag, and no period image of them is bundled.", population: 5_000_000 }],
  ["Kuril Islands", { continent: "East Asia", note: "Kuril Islands — disputed between Russia and Japan; the 1825 Simoda Treaty began clarifying boundaries.", noFlag: true, population: 5_000 }],

  // Modern (1914 – today) --------------------------------------------------
  ["Austro-Hungarian Empire", { flag: "historical-flags/austria-hungary.png", continent: "Central Europe", note: "Dual monarchy of the Habsburgs.", population: 51_000_000 }],
  ["German Empire", { flag: "historical-flags/german-empire.png", continent: "Central Europe", note: "Kaiserreich under Wilhelm II.", population: 67_000_000 }],
  ["Soviet Union", { flag: "historical-flags/ussr.png", continent: "Eastern Europe / North Asia", note: "Union of Soviet Socialist Republics, 1922–1991.", population: 293_000_000 }],
  ["USSR", { flag: "historical-flags/ussr.png", continent: "Eastern Europe / North Asia", note: "Union of Soviet Socialist Republics, 1922–1991.", population: 293_000_000 }],
  ["Yugoslavia", { flag: "historical-flags/yugoslavia.png", continent: "SE Europe", note: "Socialist Federal Republic of Yugoslavia, 1945–1992.", population: 23_000_000 }],
  ["Czechoslovakia", { flag: "historical-flags/czechoslovakia.png", continent: "Central Europe", note: "Federal Republic of Czechs and Slovaks, 1918–1992.", population: 15_000_000 }],
  ["British Empire", { continent: "Global", note: "Largest empire in history at its 1922 peak.", population: 458_000_000 }],
  ["British Raj", { continent: "South Asia", note: "British rule of India, 1858–1947.", population: 390_000_000 }],
  ["British East India Company", { continent: "South Asia", note: "Company rule of India before the 1858 Raj.", population: 200_000_000 }],
  ["Belgian Congo", { continent: "Central Africa", note: "Colonial Belgian rule of modern DRC.", population: 13_000_000 }],
  ["French Indochina", { continent: "Southeast Asia", note: "French colonial rule of Vietnam / Laos / Cambodia.", population: 22_000_000 }],
  ["Dutch East Indies", { continent: "Southeast Asia", note: "Dutch colonial rule of modern Indonesia.", population: 60_000_000 }],
  ["Netherlands Indies", { modernName: "Netherlands", continent: "Southeast Asia", note: "Netherlands East Indies — Dutch colonial rule over what is now Indonesia.", population: 60_000_000 }],
  ["Abyssinia", { continent: "East Africa", note: "Historical name for Ethiopia, never colonised by Europe.", modernName: "Ethiopia", population: 11_000_000 }],
  ["Empire of Japan", { flag: "historical-flags/japan-1870.svg", continent: "East Asia", note: "Imperial Japan, 1868–1947 — flying the 1870 Meiji Hinomaru: seven by ten, with the disc set slightly toward the hoist. Today's flag, squarer and a brighter crimson, dates from the 1999 flag law.", population: 105_000_000 }],
  ["Burma", { continent: "Southeast Asia", note: "Pre-1989 name for Myanmar.", modernName: "Myanmar", population: 17_000_000 }],
  ["Ceylon", { continent: "South Asia", note: "Pre-1972 name for Sri Lanka.", modernName: "Sri Lanka", population: 10_000_000 }],
  ["Siam", { continent: "Southeast Asia", note: "Pre-1939 name for Thailand.", modernName: "Thailand", population: 15_000_000 }],
  ["Zaire", { flag: "historical-flags/zaire.png", continent: "Central Africa", note: "Name of the DRC under Mobutu, 1971–1997. The Zairian flag (green with yellow torch and arm) is very different from today's DRC flag.", population: 30_000_000 }],
  ["United Kingdom of Great Britain and Ireland", { continent: "Northern Europe", note: "Pre-1922 UK including all of Ireland.", modernName: "United Kingdom", population: 46_000_000 }],
  ["Gambia, The", { continent: "West Africa", modernName: "Gambia" }],
  ["Tanzania, United Republic of", { continent: "East Africa", modernName: "Tanzania" }],
  ["Korea, Democratic People's Republic of", { continent: "East Asia", modernName: "North Korea" }],
  ["Korea, Republic of", { continent: "East Asia", modernName: "South Korea" }],

  // === Medieval European kingdoms (1300–1700) ================================
  // Added to provide info panels for eras without specific ERA_OVERRIDES.
  // All flag-less here (medieval heraldry ≠ national flags); ERA_OVERRIDES
  // for ad1500/ad1700 add flag images where appropriate.
  ["France", { continent: "Western Europe", note: "Medieval Kingdom of France — Capetian and Valois rulers. Fleur-de-lis heraldry predates the Bourbon white royal banner.", noFlag: true, population: 18_000_000 }],
  ["Portugal", { continent: "Iberia", note: "Kingdom of Portugal — the Quinas (five blue shields) banner dates from the 12th century but no standard national flag existed in the modern sense.", noFlag: true, population: 1_500_000 }],
  ["England", { flag: "historical-flags/england-stgeorge.png", continent: "Northern Europe", note: "Kingdom of England — flew the Cross of St George (white field, red cross) from the medieval era.", population: 4_000_000 }],
  ["English territory", { continent: "Northern Europe", note: "English-controlled territory — the Cross of St George was the English national emblem.", noFlag: true, population: 3_500_000 }],
  ["Castile", { continent: "Iberia", note: "Crown of Castile — the castle banner; would merge with Aragón to form Spain.", noFlag: true, population: 5_000_000 }],
  ["Castille", { continent: "Iberia", note: "Crown of Castile — the castle banner; would later unite with Aragón to form Spain.", noFlag: true, population: 5_200_000 }],
  ["Aragón", { continent: "Iberia", note: "Crown of Aragón — a Mediterranean power controlling Sicily and Sardinia in the later Middle Ages.", noFlag: true, population: 3_000_000 }],
  ["Navarre", { continent: "Iberia", note: "Kingdom of Navarre — small but strategically placed kingdom between France and Spain.", noFlag: true, population: 200_000 }],
  ["Hungary", { continent: "Central Europe", note: "Kingdom of Hungary — major power in Central Europe; the Apostolic Double Cross banner.", noFlag: true, population: 3_500_000 }],
  ["Imperial Hungary", { continent: "Central Europe", note: "Habsburg-ruled Hungary — contested between the Habsburgs, local nobles, and the Ottomans.", noFlag: true, population: 3_000_000 }],
  ["Poland", { continent: "Eastern Europe", note: "Kingdom of Poland — later merged with Lithuania into the Polish-Lithuanian Commonwealth.", noFlag: true, population: 2_500_000 }],
  ["Lithuania", { continent: "Eastern Europe", note: "Grand Duchy of Lithuania — one of the largest states in 14th-century Europe.", noFlag: true, population: 2_000_000 }],
  ["Poland-Lithuania", { flag: "historical-flags/poland-lithuania.png", continent: "Eastern Europe", note: "Polish-Lithuanian Commonwealth — a major European power from 1569 to 1795.", population: 11_000_000 }],
  ["Polish–Lithuanian Commonwealth", { flag: "historical-flags/poland-lithuania.png", continent: "Eastern Europe", note: "Polish-Lithuanian Commonwealth (Rzeczpospolita) — a vast noble republic stretching from the Baltic to the Black Sea.", population: 11_000_000 }],
  ["Kyivan Rus", { continent: "Eastern Europe", note: "Kievan Rus — the medieval federation of Slavic city-states (9th–13th c.), centred on Kyiv; the cultural ancestor of Russia, Ukraine and Belarus. Fragmented by the Mongol invasions (1237–1240).", noFlag: true, population: 3_000_000 }],
  ["Novgorod", { continent: "Eastern Europe", note: "Novgorod Republic — a wealthy trading republic of north-western Russia; member of the Hanseatic League.", noFlag: true, population: 400_000 }],
  ["Ryazan", { continent: "Eastern Europe", note: "Principality of Ryazan — a medieval Russian state of the Volga region; one of the early victims of the Mongol invasions (1237–1240).", noFlag: true, population: 200_000 }],
  ["Georgia", { continent: "Western Asia", note: "Kingdom of Georgia — a medieval Christian kingdom at its peak in the 12th–13th centuries before the Mongol invasion.", noFlag: true, population: 2_000_000 }],
  ["Venice", { flag: "historical-flags/venice.png", continent: "Italy", note: "Most Serene Republic of Venice — a maritime trading empire; the golden Lion of St Mark on red was its emblem.", population: 800_000 }],
  ["Scotland", { continent: "Northern Europe", note: "Kingdom of Scotland — the Cross of St Andrew (Saltire), white diagonal cross on blue, is one of Europe's oldest national symbols.", noFlag: true, population: 1_000_000 }],
  ["Scottland", { continent: "Northern Europe", note: "Kingdom of Scotland (dataset spelling variant) — Saltire, white diagonal cross on blue.", noFlag: true, population: 1_000_000 }],
  ["Teutonic Knights", { continent: "Central Europe", note: "Teutonic Order state — crusading military-religious order that colonised Prussia and the Baltic.", noFlag: true, population: 700_000 }],
  ["Kalmar Union", { continent: "Northern Europe", note: "Kalmar Union (1397–1523) — personal union of Denmark, Sweden and Norway under one Scandinavian monarch.", noFlag: true, population: 3_000_000 }],
  ["Raška", { continent: "SE Europe", note: "Raška (medieval Serbia) — the Nemanjić dynasty's kingdom; ancestor of the Serbian state.", noFlag: true, population: 1_000_000 }],
  ["Trebizond", { continent: "Anatolia", note: "Empire of Trebizond — last surviving remnant of the Byzantine Empire, on the Black Sea coast.", noFlag: true, population: 200_000 }],
  ["Norway", { continent: "Northern Europe", note: "Kingdom of Norway — the red-field-with-golden-lion banner (before the Dannebrog-influenced modern flag).", noFlag: true, population: 500_000 }],
  ["Genoa", { continent: "Italy", note: "Republic of Genoa — rival of Venice; the red cross on white (St George Cross) was its banner.", noFlag: true, population: 400_000 }],
  ["Florence", { continent: "Italy", note: "Republic of Florence — the great centre of the Italian Renaissance.", noFlag: true, population: 600_000 }],
  ["Milan", { continent: "Italy", note: "Duchy of Milan — wealthy northern Italian state; Visconti and later Sforza rulers.", noFlag: true, population: 800_000 }],
  ["Naples", { continent: "Italy", note: "Kingdom of Naples — southern Italy under Angevin and later Aragonese rule.", noFlag: true, population: 2_000_000 }],
  ["Sardinia", { continent: "Italy", note: "Kingdom of Sardinia (medieval) — contested between Aragon and Genoa.", noFlag: true, population: 200_000 }],
  ["Corsica", { continent: "Mediterranean", note: "Medieval Corsica — nominally Genoese after 1346.", noFlag: true, population: 50_000 }],
  ["Granada", { continent: "Iberia", note: "Emirate of Granada — last Muslim kingdom of Iberia; fell to Castile and Aragón in 1492.", noFlag: true, population: 500_000 }],
  ["Morocco", { continent: "North Africa", note: "Medieval Morocco — Marinid/Wattasid sultantes. No standardised national flag in this era.", noFlag: true, population: 3_000_000 }],
  ["Ethiopia", { continent: "East Africa", note: "Ethiopian highlands in this era — Solomon dynasty rule of the Zagwe successors. No national flag.", noFlag: true, population: 3_000_000 }],
  ["Benin", { continent: "West Africa", note: "Kingdom of Benin — the Benin Empire of modern southern Nigeria, famous for its bronze plaques.", noFlag: true, population: 1_000_000 }],
  ["Oyo", { continent: "West Africa", note: "Oyo Empire — Yoruba empire of modern south-western Nigeria; one of the largest West African states in the 17th–18th centuries.", noFlag: true, noFlagReason: "No flag shown — the alaafin's authority was carried by court regalia and Yoruba war banners rather than a single national flag; no period flag is bundled.", population: 2_000_000 }],
  // === Medieval/early-modern Asian kingdoms (1300–1700) ======================
  ["Shogun Japan (Kamakura)", { continent: "East Asia", note: "Kamakura Shogunate Japan (1185–1333) — samurai government that coexisted with the emperor.", modernName: "Japan", population: 8_000_000 }],
  ["Sukhothai", { continent: "Southeast Asia", note: "Sukhothai Kingdom — the first Thai kingdom; developed the Thai script; preceded the Ayutthaya Kingdom.", noFlag: true, population: 500_000 }],
  ["Ayutthaya", { flag: "historical-flags/ayutthaya.png", continent: "Southeast Asia", note: "Ayutthaya Kingdom (1351–1767) — the predecessor to the Bangkok-based Rattanakosin Kingdom; a major trading state.", population: 3_000_000 }],
  ["Sultanate of Delhi", { continent: "South Asia", note: "Delhi Sultanate — the first major Islamic sultanate of northern India; five successive dynasties.", noFlag: true, population: 20_000_000 }],
  ["Vijayanagara", { continent: "South Asia", note: "Vijayanagara Empire — the last great Hindu empire of South India; centre of art, architecture and learning.", noFlag: true, population: 25_000_000 }],
  ["Songhai", { continent: "West Africa", note: "Songhai Empire — the largest empire in West African history at its peak (15th–16th c.); controlled Timbuktu and the trans-Saharan gold trade.", noFlag: true, population: 4_000_000 }],
  ["Tibet", { continent: "Central Asia", note: "Phagmodrupa dynasty's Tibet — nominally subject to the Yuan and Ming Chinese empires but practically independent.", noFlag: true, noFlagReason: "No flag shown — Tibet's monasteries and armies used their own banners rather than a national flag; the snow-lion flag was designed only in 1916.", population: 2_000_000 }],
  ["Malacca", { continent: "Southeast Asia", note: "Sultanate of Malacca — dominant maritime trading state of the Malay world; fell to the Portuguese in 1511.", noFlag: true, population: 300_000 }],
  ["Grand Duchy of Moscow", { continent: "Eastern Europe", note: "Grand Duchy of Moscow — the rising principality that would unify Russia and become the Tsardom of Muscovy.", noFlag: true, population: 3_000_000 }],
  ["Tsardom of Muscovy", { continent: "Eastern Europe", note: "Tsardom of Muscovy — Ivan the Terrible's centralised Russian state (1547–1721); precursor to the Russian Empire.", noFlag: true, population: 6_000_000 }],
  ["Ming Chinese Empire", { continent: "East Asia", note: "Ming dynasty China (dataset label 'Ming Chinese Empire') — the Great Wall, the Forbidden City, and Zheng He's treasure voyages.", population: 160_000_000, modernName: "China", noFlag: true }],
  ["Đại Việt", { continent: "Southeast Asia", note: "Đại Việt — medieval Vietnamese kingdom, centred on the Red River delta; long period of independence from China.", noFlag: true, population: 5_000_000 }],
  ["Orissa", { continent: "South Asia", note: "Gajapati Kingdom of Orissa — a major Hindu dynasty of eastern India (14th–16th c.).", noFlag: true, population: 3_000_000 }],
  ["Hafsid Caliphate", { continent: "North Africa", note: "Hafsid Caliphate — Arab Berber rulers of Ifriqiya (modern Tunisia and Libya); nominal successors of the Abbasids.", noFlag: true, population: 2_000_000 }],
  ["Mamluke Sultanate", { continent: "Middle East", note: "Mamluk Sultanate of Egypt and Syria — slave-soldier dynasty that defeated the Mongols at Ain Jalut (1260).", noFlag: true, population: 5_000_000 }],
  ["Seljuk Caliphate", { continent: "Western Asia", note: "Rum Sultanate (Seljuks of Anatolia) — the Turkic successor in Anatolia after the main Seljuk empire fragmented.", noFlag: true, population: 2_500_000 }],
  ["Timurid Emirates", { continent: "Central Asia", note: "Timurid Empire — Timur (Tamerlane)'s successors ruled Persia and Central Asia; great patrons of the arts.", noFlag: true, population: 8_000_000 }],
  ["White Horde", { continent: "Eurasian Steppe", note: "White Horde — eastern division of the Golden Horde; the Ural and Caspian steppes.", noFlag: true, population: 1_000_000 }],
  ["Crimean Khanate", { continent: "Eastern Europe", note: "Crimean Khanate — Mongol successor state; a major slavers and raiders of the Black Sea steppe until 1783.", noFlag: true, population: 500_000 }],
  ["Khanate of Sibir", { continent: "Central Asia", note: "Khanate of Siberia — Mongol successor state in western Siberia; conquered by Yermak for Russia in the 1580s.", noFlag: true, population: 300_000 }],
  ["Wattasid Caliphate", { continent: "North Africa", note: "Wattasid Sultanate of Morocco (1472–1554) — Berber dynasty; contemporaries of the Ottoman expansion.", noFlag: true, population: 1_500_000 }],
  ["Zayyanid Caliphate", { continent: "North Africa", note: "Zayyanid Kingdom of Tlemcen (1235–1556) — Berber dynasty of western Algeria; rivals of the Hafsids and Marinids.", noFlag: true, population: 700_000 }],
  // === 1700-era specific entries =============================================
  ["Dutch Republic", { flag: "historical-flags/dutch-republic.png", continent: "Western Europe", note: "Dutch Republic (Republic of the Seven United Netherlands) — a global maritime and trading empire; the Dutch tricolour was introduced by the Prince of Orange in the 1570s.", population: 2_000_000 }],
  ["England and Ireland", { flag: "historical-flags/england-stgeorge.png", continent: "Northern Europe", note: "England and Ireland under a personal union (pre-1707). Did not yet fly the Union Jack — the Cross of St George (England) flew as the national flag.", population: 7_500_000 }],
  ["New France", { continent: "North America", note: "New France — French colonial territory in Canada; the Bourbon royal banner and later the French tricolour flew over it.", noFlag: true, population: 20_000 }],
  ["New Amsterdam", { continent: "North America", note: "New Amsterdam (the Dutch colony on Manhattan Island) — became British New York in 1664. Dutch tricolour in the earlier period.", modernName: "Netherlands", population: 9_000 }],
  ["Portuguese Brazil", { continent: "South America", note: "Colonial Brazil — Portuguese Crown colony before 1815; royal Portuguese banner flew (not the modern red-green flag).", noFlag: true, population: 2_000_000 }],
  ["Vice Royalty of Peru", { ruler: "Spain", continent: "South America", note: "Spanish Viceroyalty of Peru — 1700 spelling variant in the dataset. The Crown of Castile's red-yellow-red flag flew.", population: 2_000_000 }],
  ["Middag Kingdom", { continent: "East Asia", note: "Middag Kingdom — one of several Taiwanese aboriginal chiefdoms in the 17th-century central plains.", noFlag: true, population: 50_000 }],
  ["Central African Republic", { continent: "Central Africa", note: "Central African Republic — landlocked state in the heart of the African continent, a French colonial creation (Ubangui-Shari) with abundant natural resources and a history of political instability.", noFlag: true, population: 600_000 }],
  ["Idrisid Caliphate", { continent: "North Africa", note: "Idrisid dynasty — first independent Islamic state in the Maghreb (8th–10th c.), based in Fez; pioneered the medina city plan and patronized Islamic scholarship.", noFlag: true, population: 400_000 }],
  ["Magyars", { continent: "Eastern Europe", note: "Magyar peoples — Finno-Ugric warriors of the Pontic steppe who migrated westward to Pannonia in the 9th century, eventually establishing the Hungarian kingdom." }],
  ["Nejd", { continent: "Arabia", note: "Nejd — the central Arabian plateau region, heartland of the Al Saud dynasty and birthplace of Wahhabi Islam in the 18th century, politically fragmented until unified under Ibn Saud." }],
  ["Obiwa", { continent: "North America", note: "Ojibwe (Anishinaabe) people — Algonquian-speaking Great Lakes peoples with a sophisticated birch-bark canoe technology and wild-rice harvesting tradition." }],
  ["Satavahana", { continent: "South Asia", note: "Satavahana Empire — major south Indian dynasty (2nd c. BC – 2nd c. AD), powerful under leaders like Gautamiputra Satakarni, known for coin-making and trade on the Deccan plateau.", population: 10_000_000 }],
  ["Sultanate of Utetera", { continent: "East Africa", note: "Utetera Sultanate — one of the Swahili coast sultanates, a maritime trading power in the East African network of city-states.", noFlag: true, noFlagReason: "No flag shown — this Swahili trading state flew the plain red flag of its Zanzibari overlords rather than one of its own, and no period image is bundled.", population: 50_000 }],
  ["Syria", { continent: "Western Asia", note: "Syria — Levantine state with ancient Mesopotamian and Mediterranean heritage; a French mandate after WWI, it became independent in 1946 but faced political volatility and conflicts.", noFlag: true, population: 3_000_000 }],
  ["Ahmadnagar", { continent: "South Asia", note: "Ahmadnagar Sultanate — Deccan Muslim dynasty (1490–1636) that resisted Mughal expansion through military innovation and diplomacy.", noFlag: true, population: 2_000_000 }],
  ["Bell-shaped burials culture", { continent: "Eurasian Steppe", note: "Bronze-Age pastoral societies of the steppes, named for their distinctive burial mounds — ancestors of Indo-European peoples." }],
  // Drawn over eastern Lithuania and Belarus (lon 21.9–29.9, lat 52–57.8), not China.
  ["Brushed Pottery culture", { continent: "Eastern Europe", note: "Brushed Pottery culture — the Bronze and Iron Age culture of eastern Lithuania, Belarus and south-east Latvia, named for pots whose outer surface was brushed with bundled straw; ancestral to the East Baltic tribes." }],
  ["Burkina Faso", { continent: "West Africa", note: "Burkina Faso — landlocked West African state; French colony of Upper Volta until independence in 1960, renamed Burkina Faso in 1984.", noFlag: true, population: 5_000_000 }],
  ["Chalukya Empire", { continent: "South Asia", note: "Chalukya dynasty — powerful medieval South Indian empire (6th–12th c.) that rivaled the Pallavas; known for temple architecture and administrative systems.", population: 8_000_000 }],
  ["Chalukyas", { continent: "South Asia", note: "Chalukyas — South Indian dynasty of the Deccan, rivals of the Pallavas and patrons of Dravidian temple culture." }],
  ["Chorrera", { continent: "South America", note: "Chorrera culture — early pottery tradition of coastal Ecuador (1500–500 BC), evidence of maritime trade networks." }],
  ["Crow", { continent: "North America", note: "Crow people (Apsáalooke) — Great Plains Siouan peoples known for horsemanship, tipi culture and rich oral traditions." }],
  ["Emirate of Córdoba", { continent: "Iberia", note: "Emirate of Córdoba — independent Islamic state in Iberia (929–1031), a center of learning and culture in medieval al-Andalus.", noFlag: true, population: 500_000 }],
  ["Eyaq", { continent: "North America", note: "Eyak people — Indigenous peoples of the Alaska-Canada coast; fishers and cedar-workers whose language was last spoken natively in 2008." }],
  ["Imperial Japan (Fujiwara)", { continent: "East Asia", note: "Fujiwara regency in Imperial Japan — the Fujiwara clan dominated Japanese politics (9th–11th c.), wielding power while emperors were figurehead rulers." }],
  ["Kalinga", { continent: "South Asia", note: "Kalinga — ancient kingdom of eastern India (Odisha), known for its maritime trade, distinctive art and the Maurya Empire's final conquest of it (260 BC).", population: 1_000_000 }],
  ["Kanauj", { continent: "South Asia", note: "Kanauj (Kannauj) — strategic city-state of the Ganges plain, frequently contested by Indian powers; capital of several medieval dynasties.", noFlag: true, population: 300_000 }],
  ["Malagasy", { continent: "East Africa", note: "Malagasy peoples — Austronesian settlers of Madagascar who mixed with Bantu and Arab traders, developing the Merina kingdom in the highlands." }],
  ["Mardu", { continent: "Oceania", note: "Mardu people — Aboriginal peoples of the Australian Western Desert, hunter-gatherers with deep knowledge of desert ecology and songlines." }],
  ["M?ori", { continent: "Oceania", note: "Māori people — Polynesian populations of New Zealand, with sophisticated warfare traditions (toa), whānau kinship and haka performance culture." }],
  ["Montagnais Innu", { continent: "North America", note: "Montagnais/Innu peoples — Algonquian-speaking subarctic hunters of the St. Lawrence region, known for birch-bark canoes and hunting technology." }],
  ["Mossi States", { continent: "West Africa", note: "Mossi kingdoms and states — West African powers of the Sahel (e.g., Ouagadougou, Yatenga) known for cavalry warfare and trading cities." }],
  ["Other Rus Principalities", { continent: "Eastern Europe", note: "Smaller Rus' principalities of medieval Eastern Europe — regional powers like Ryazan, Smolensk and others competing for dominance before Mongol conquest." }],
  ["Poland-Llituania", { continent: "Eastern Europe", note: "Polish-Lithuanian Commonwealth — variant spelling of the 1569 Union creating the largest European state east of France, known for elected kings and religious toleration." }],
  ["Pomo", { continent: "North America", note: "Pomo people — Indigenous Californians of the Coast Ranges and Clear Lake region, known for sophisticated basketry and acorn-based economy." }],
  ["Pintupi", { continent: "Oceania", note: "Pintupi people — Aboriginal Australians of the Western Desert, one of the last groups to maintain fully nomadic lifestyles into the 1960s." }],
  ["Rajastan", { continent: "South Asia", note: "Rajasthan — region of north-western India; historically a confederation of Hindu Rajput kingdoms, many becoming British protectorates." }],
  ["Rashtrakuta state", { continent: "South Asia", note: "Rashtrakuta dynasty — powerful Deccan empire (8th–10th c.) that challenged the Pallavas and Pratiharas for supremacy in southern India.", population: 5_000_000 }],
  ["Satavahanihara", { continent: "South Asia", note: "Satavahana — variant spelling of the major south Indian dynasty; ruled the Deccan as one of the early great powers, known for extensive coinage." }],
  ["Taino", { continent: "Caribbean", note: "Taíno people — Arawakan seafarers of the Caribbean islands; agricultural societies that encountered Columbus in 1492; largely enslaved and decimated." }],
  ["Vazimba", { continent: "East Africa", note: "Vazimba — legendary first inhabitants of Madagascar, possibly hunter-gatherers displaced by later Merina and Arab-influenced settlers." }],
  ["Adena Culture", { continent: "North America", note: "Adena culture — early woodland Mississippian culture of eastern North America (1000–100 BC), mound-builders known for sacred geometry and extensive trade networks." }],
  ["Algeria", { continent: "North Africa", note: "Algeria — North African state and former French colony; long war of independence (1954–1962) and strategic position on the Mediterranean.", noFlag: true, population: 9_000_000 }],
  ["Bashkirs", { continent: "Eurasian Steppe", note: "Bashkir people — Turkic-speaking horsemen and herders of the southern Urals, with strong traditions of horsemanship and martial prowess." }],
  ["Champa", { continent: "Southeast Asia", note: "Champa Kingdom — Hindu-Buddhist maritime kingdom of central Vietnam (2nd–15th c.), a seafaring power in the South China Sea with a distinctive culture.", population: 2_000_000 }],
  ["Chen-La", { continent: "Southeast Asia", note: "Chenla (Chen-La) — medieval kingdom of Cambodia, successor to Funan in the Mekong Delta region, known for irrigation and temple construction." }],
  ["Cherokee", { continent: "North America", note: "Cherokee people — Southeastern Iroquoian nation known for agricultural settlement patterns, syllabary invention and sovereignty struggles with the U.S." }],
  ["French Indo-China", { continent: "Southeast Asia", note: "French Indo-China — French colonial federation in Southeast Asia (Annam, Tonkin, Cochinchina, Cambodia, Laos); independent movements grew from WWII onward.", noFlag: true, noFlagReason: "No flag shown — the federation was governed under the French tricolour and had no national flag of its own.", population: 25_000_000 }],
  ["Huron", { continent: "North America", note: "Huron (Wendat) people — Iroquoian-speaking confederacy of the Great Lakes region; major traders and agriculturalists before European contact." }],
  ["Illinnois", { continent: "North America", note: "Illinois Confederacy — Algonquian peoples of the Mississippi Valley, powerful traders who fell to Iroquois raids in the 17th century." }],
  ["Iraq", { continent: "Western Asia", note: "Iraq — Mesopotamian state, British mandate after WWI; contains the ancient cities of Ur and Babylon; strategically important for oil and the Tigris-Euphrates rivers.", noFlag: true, population: 3_000_000 }],
  ["Kokatha", { continent: "Oceania", note: "Kokatha people — Aboriginal Australians of the Eyre Peninsula, hunter-gatherers with distinctive marine resource exploitation traditions." }],
  ["Mescalero", { continent: "North America", note: "Mescalero Apache — southwestern U.S. Apache people known for nomadic hunting of desert mescal plants and pastoral traditions." }],
  ["Mi'kma'ki", { continent: "North America", note: "Mi'kmaq (Mi'kma'ki) people — Maritime Algonquian nation of the northeastern coast, known for canoe technology and fish/seal hunting." }],
  ["minor Hindu and Buddhist states", { continent: "South Asia", note: "Small Hindu and Buddhist kingdoms of medieval India — regional powers and feudal states, tributary to larger empires." }],
  ["Northern Paiute", { continent: "North America", note: "Northern Paiute people — Great Basin-Plateau peoples of Nevada and Oregon, known for adaptation to semi-arid environments and seed-gathering traditions." }],
  ["Osage", { continent: "North America", note: "Osage nation — Siouan peoples of the central plains and Mississippi valley; powerful traders and horsemen with hierarchical society." }],
  ["Ukraine", { continent: "Eastern Europe", note: "Ukraine — Eastern European state at the crossroads of Europe and Russia; Soviet republic until 1991, now independent with strategic geopolitical significance.", noFlag: true, population: 45_000_000 }],
  ["Warlpiri", { continent: "Oceania", note: "Warlpiri people — Aboriginal Australians of the central desert, known for intricate dot-painting tradition and deep land knowledge." }],
  ["Watjarri", { continent: "Oceania", note: "Watjarri people — Aboriginal Australians of the Western Desert, hunter-gatherers with sophisticated knowledge of water sources and bush tucker." }],
  ["Yup'ik & Cup'ik", { continent: "North America", note: "Yup'ik and Cup'ik peoples — Eskimo-Aleut speakers of southwestern Alaska and the Bering Sea coast, marine mammal hunters with rich artistic traditions." }],
  ["Adal", { continent: "East Africa", note: "Adal Sultanate — maritime Islamic state of the Horn of Africa (13th–16th c.), rival to Christian Ethiopia and a major Red Sea trader.", noFlag: true, population: 300_000 }],
  ["Alans", { continent: "Eurasian Steppe", note: "Alani (Alans) — Iranian-speaking nomadic warriors of the steppes; allied with Rome and later subsumed into the Mongol and Russian dominions." }],
  ["Arapaho", { continent: "North America", note: "Arapaho people — Algonquian-speaking plains peoples known for warrior societies, sacred ceremonies and tipis, later confined to reservations." }],
  ["Arrernte", { continent: "Oceania", note: "Arrernte (Aranda) people — Aboriginal Australians of central Australia, known for Dreaming songlines, dot painting and intricate kinship systems." }],
  ["Beothuk", { continent: "North America", note: "Beothuk people — Indigenous inhabitants of Newfoundland; distinct culture with red ochre body paint; driven to extinction by European colonization by 1829." }],
  ["Blemmyes", { continent: "Northeast Africa", note: "Blemmyes (Beja) — nomadic pastoralists of the Red Sea Hills, documented in ancient texts; ancestors of modern Beja peoples." }],
  ["Buyid Emirate", { continent: "Western Asia", note: "Buyid dynasty — Persian Shiite dynasty that ruled Iraq and Iran (10th–11th c.), wielding power while Abbasid caliphs were figureheads.", noFlag: true, population: 5_000_000 }],
  ["Chauhans", { continent: "South Asia", note: "Chauhan (Cahamana) dynasty — Rajput kingdom of north-central India (7th–12th c.); powerful rivals of the Ghaznavids and Ghurids." }],
  ["Delaware", { continent: "North America", note: "Delaware (Lenape) people — Algonquian-speaking nation of the northeastern woodland; suffered displacement westward through treaties and forced removal." }],
  ["Dominion of Newfoundland", { continent: "North America", note: "Dominion of Newfoundland and Labrador — British dominion with distinct status until confederation with Canada in 1949; isolated, maritime culture.", noFlag: true, noFlagReason: "No flag shown — the dominion used the Union Flag as its national flag (formally so from 1931); Newfoundland's own flag dates from 1980, long after it joined Canada.", population: 300_000 }],
  ["East Java", { continent: "Southeast Asia", note: "East Java (Majapahit region) — Javanese kingdom and later province; center of Hindu-Buddhist culture and part of the Majapahit Empire." }],
  ["Harapunchai", { continent: "Southeast Asia", note: "Hariphunchai (Harapunchai) — northern Thai kingdom of the Chao Phraya valley; known for Buddhist temples and eventually absorbed into Sukhothai." }],
  ["Iroquois", { continent: "North America", note: "Haudenosaunee (Iroquois Confederacy) — powerful alliance of six Iroquoian nations (Mohawk, Oneida, Onondaga, Cayuga, Seneca, Tuscarora) with democratic confederation structure." }],
  ["Koryaks", { continent: "North Asia", note: "Koryak people — Siberian reindeer herders and maritime hunters of the Kamchatka Peninsula, with distinctive dog-sledding traditions." }],
  ["Kwarizm-Shah", { continent: "Central Asia", note: "Khwarazmian Empire — dynasty ruling the Aral Sea region (10th–13th c.), center of Islamic learning before Mongol conquest.", noFlag: true, population: 2_000_000 }],
  ["Laurel complex", { continent: "North America", note: "Laurel complex — archaeological culture of the Great Lakes-St. Lawrence region (1500–500 BC), known for copper tools and burial mounds." }],
  ["minor Hindu and Buddhist kingdoms", { continent: "South Asia", note: "Small Hindu and Buddhist kingdoms of southern India — feudal states and regional powers, tributaries to Chola and Chalukyan empires." }],
  ["minor states under Indian influence", { continent: "Southeast Asia", note: "Minor states under Indian cultural influence — smaller Southeast Asian kingdoms adopting Hindu and Buddhist traditions from Indian traders and missionaries." }],
  ["Muscat", { continent: "Arabia", note: "Muscat and Oman — sultanate of the Arabian Peninsula (established 1650s), Omani maritime traders controlling Red Sea and Indian Ocean routes.", noFlag: true, population: 400_000 }],
  ["Nyanganyatjara", { continent: "Oceania", note: "Nyanganyatjara people — Aboriginal Australians of the Western Desert (WA, SA, NT); hunter-gatherers with knowledge of desert water sources and bush foods." }],
  ["Portuguese East Africa", { continent: "East Africa", note: "Portuguese East Africa (Mozambique) — Portuguese colony in southeastern Africa; independence achieved 1975 after lengthy liberation war.", noFlag: true, population: 7_000_000 }],
  ["Principality of Novgorod", { continent: "Eastern Europe", note: "Novgorod Principality — variant name for the Novgorod Republic; a wealthy trading republic of northwest Russia with a distinct veche (assembly) democracy." }],
  ["Sahtu", { continent: "North America", note: "Sahtu Dene (Mountain Dene) — subarctic Athapaskan peoples of the Mackenzie Mountains, hunters and trappers in the northern Canadian interior." }],
  ["Shawnee", { continent: "North America", note: "Shawnee people — Algonquian nation originally of the Ohio Valley, known as skilled warriors and hunters; displaced westward by European expansion." }],
  ["Tlinoit", { continent: "North America", note: "Tlingit (Tlinoit) people — Pacific Northwest coastal peoples of Alaska and British Columbia, known for cedar carving, potlatch ceremonies and totem poles." }],
  ["Tukular Caliphate", { continent: "West Africa", note: "Tukulor Caliphate (Fouta Toro) — Fulani-led Islamic state of the Senegal River region; used Islamic law and military power to resist French colonization.", noFlag: true, noFlagReason: "No flag shown — El Hadj Umar Tall's jihad state fought under Islamic war banners rather than a national flag, and no period image of them is bundled.", population: 1_000_000 }],
  ["Watassid Morocco", { continent: "North Africa", note: "Wattasid dynasty — Berber dynasty ruling northern Morocco (1415–1554); competitors with the Saadians and Portuguese in North African geopolitics." }],
  ["Wiradjuri", { continent: "Oceania", note: "Wiradjuri people — Aboriginal Australians of inland New South Wales, known for sophisticated water management and exchange networks." }],
  ["Yeke", { continent: "Central Africa", note: "Yeke kingdom — Luba-based kingdom of southeastern Congo (Katanga region), known for Yeke rulers and mining of copper and ivory." }],
  ["Algonquin", { continent: "North America", note: "Algonquin people (Omamiwininiwag) — Algonquian-speaking nation of the Ottawa River region, known for birch-bark canoes and fur trading." }],
  ["Anatolian tribes", { continent: "Western Asia", note: "Bronze-Age Anatolian tribal peoples — diverse groups in ancient Asia Minor, predecessors to the Hittites and Phrygia." }],
  ["Bagan", { continent: "Southeast Asia", note: "Bagan — variant name for Pagan; an ancient Burmese city-state and major Buddhist center with thousands of temples." }],
  ["Caloosahatchee cultureure", { continent: "North America", note: "Caloosahatchee culture — archaeological culture of southern Florida (2000 BC–AD 500) with sophisticated shell-working and maritime adaptation." }],
  ["Cherookee", { continent: "North America", note: "Cherokee (Cherookee) — Southeastern Iroquoian nation; powerful and hierarchical, known for agriculture, syllabary, and later resistance to removal." }],
  ["Dravidians", { continent: "South Asia", note: "Dravidian peoples — southern Indian population speaking Dravidian languages; builders of urban Indus Valley Civilization sites." }],
  ["Finland", { continent: "Northern Europe", note: "Finland — Nordic country with Finno-Ugric language roots; Russian Grand Duchy until independence in 1917; modern welfare-state model.", noFlag: true, population: 3_000_000 }],
  ["Gabon", { continent: "Central Africa", note: "Gabon — Central African state; French colony until 1960; located on the Congo coast with rainforests and oil resources.", noFlag: true, population: 600_000 }],
  ["Hopi", { continent: "North America", note: "Hopi people — Pueblo peoples of Arizona's high desert; known for kachina ceremonies, dry farming and distinctive cosmology." }],
  ["Iceland", { continent: "Northern Europe", note: "Iceland — Nordic island nation with Norse settlement (870 AD), world's oldest parliament (Althing), and geothermal energy; independent 1944.", modernName: "Iceland", population: 300_000 }],
  ["Itelmen", { continent: "North Asia", note: "Itelmen (Kamchadal) people — Siberian peoples of the Kamchatka Peninsula, maritime hunters and fishers with distinctive dog-sledding technology." }],
  ["Kalaamaya", { continent: "Oceania", note: "Kalaamaya people — Aboriginal Australians of the interior desert regions, adapted to arid environments with specialized gathering and hunting knowledge." }],
  ["Kamarupa", { continent: "South Asia", note: "Kamarupa — ancient kingdom of Assam (4th–12th c.); ruled by various dynasties and known for Hindu temples and cultural synthesis." }],
  ["Karelians", { continent: "Northern Europe", note: "Karelian people — Finno-Ugric peoples of Karelia (Russia-Finland border); historically distinct with Orthodox and Catholic cultural influences." }],
  ["Kiowa", { continent: "North America", note: "Kiowa people — Apache-related Siouan-language plains people; fierce warriors known for horsemanship and later artistic traditions." }],
  ["Malawi", { continent: "East Africa", note: "Malawi — Southern African state; British protectorate of Nyasaland until independence in 1964; lake-based culture along Lake Nyasa.", noFlag: true, population: 5_000_000 }],
  ["Milograd culture", { continent: "Eastern Europe", note: "Milograd culture — Iron-Age archaeological culture of the Dnieper-Bug region (7th–3rd c. BC), early Slav ancestry." }],
  ["Mirambo Unyanyembe Ukimbu", { continent: "East Africa", note: "Mirambo's states (Unyanyembe/Ukimbu) — 19th-century East African trading polities in the Tanzanian interior, rivals in the slave and ivory trades." }],
  ["Mirning", { continent: "Oceania", note: "Mirning people — Aboriginal Australians of the South Australian coast and Nullarbor Plain, marine hunters with whale-stranding traditions." }],
  ["Northmen", { continent: "Northern Europe", note: "Northmen (Norse/Vikings) — Scandinavian seafarers and raiders (8th–11th c.), establishing trade routes and settlements across Europe." }],
  ["Nyangumarda", { continent: "Oceania", note: "Nyangumarda people — Aboriginal Australians of the Kimberley region (Western Australia), with rock-art traditions and maritime knowledge." }],
  ["Principality of Vladimir-Suzdal", { continent: "Eastern Europe", note: "Vladimir-Suzdal — Russian principality of the Upper Volga region; powerful medieval state, predecessor to Moscow-led unification." }],
  ["Rajputana", { continent: "South Asia", note: "Rajputana — region of northwest India; confederation of Hindu Rajput kingdoms, later becoming British protectorates and Indian states." }],
  ["Sasanian dependencies", { continent: "Western Asia", note: "Sasanian Persian Empire's tributary states and client kingdoms — vassal polities across Mesopotamia and Central Asia under Sassanid overlordship." }],
  // Drawn over Bengal and Odisha (lon 84–91.7, lat 19.6–26.5) — King Shashanka of Gauda,
  // not a Great Basin people.
  ["Shaskanka", { continent: "South Asia", note: "Shashanka — the first independent king of Gauda, ruling Bengal from Karnasuvarna in the early 7th century and pushing west up the Ganges against the Maukharis." }],
  ["Shona", { continent: "Southern Africa", note: "Shona people — Bantu peoples of Zimbabwe and southern Africa; builders of Great Zimbabwe and sophisticated farming societies." }],
  ["Sultinate of Zanzibar", { continent: "East Africa", note: "Zanzibar Sultanate — Omani-Arab ruled trading empire of the East African coast; center of clove trade and Indian Ocean commerce.", noFlag: true, noFlagReason: "No flag shown — the Busaidi sultans flew a plain red flag, and no period-accurate image of it is bundled.", population: 200_000 }],
  ["Thai Kingdoms", { continent: "Southeast Asia", note: "Thai kingdoms — Tai-speaking states of mainland Southeast Asia, including Sukhothai, Ayutthaya and others, distinct from Khmer and Lao polities." }],
  ["Norte Chico", { continent: "South America", note: "Norte Chico — pre-ceramic Andean civilization of coastal Peru (3000–1800 BC); early monumental architecture before agriculture." }],
  ["Angevin Empire", { continent: "Western Europe", note: "Angevin Empire — vast 12th-century realm of Henry II across England, Normandy and Aquitaine; rivals to the Capetian French.", noFlag: true, population: 2_000_000 }],
  ["Beaker", { continent: "Western Europe", note: "Beaker culture — Bronze-Age people of Europe (3rd–2nd millennium BC), identified by distinctive bell-shaped pottery vessels." }],
  ["Borgu States", { continent: "West Africa", note: "Borgu states — confederation of West African kingdoms in the Niger-Volta region; independent powers resisting Songhai expansion." }],
  ["Caddo", { continent: "North America", note: "Caddo people — southeastern U.S. nation with mound-building civilization, sophisticated agriculture and confederacy governance." }],
  ["Celts", { continent: "Western Europe", note: "Celtic peoples — Indo-European speakers of the Iron Age; warriors and farmers spreading across Europe, known for metalwork and oral traditions." }],
  // Drawn across the Pacific Northwest (lon -124.7–-120.2, lat 40.3–48.5), not maritime
  // South-East Asia. No sourced account of the polity under this name was found, so the
  // wrong note is dropped rather than replaced with a guess.
  ["Coqs", { continent: "North America" }],
  ["Dvaravati", { continent: "Southeast Asia", note: "Dvaravati — Mon-speaking kingdom of central Thailand (6th–11th c.); center of Buddhist culture and predecessor to Thai kingdoms." }],
  ["Eritrea", { continent: "East Africa", note: "Eritrea — horn of Africa state, Italian colony until WWII, then federated with Ethiopia until independence in 1993.", noFlag: true, population: 3_000_000 }],
  ["Harer (Egypt)", { continent: "Northeast Africa", note: "Harar — walled city and sultanate of Ethiopia; center of Islamic learning and trade; contested by various powers in the Horn of Africa." }],
  ["Hausa States", { continent: "West Africa", note: "Hausa city-states — West African confederation of trading cities (Kano, Katsina, Zaria, etc.) dominated by merchant guilds and emirs." }],
  ["Japan", { continent: "East Asia", note: "Japan — island nation with indigenous peoples (Ainu, Yamato); complex feudal period, unified shogunate and modern empire.", noFlag: true, population: 100_000_000 }],
  ["Japan (Warring States)", { continent: "East Asia", note: "Sengoku period (Warring States) Japan — era of fragmentation before unification (1467–1615); power held by daimyo warlords." }],
  ["Kashmir and Ladakh", { continent: "South Asia", note: "Kashmir and Ladakh — Himalayan region with disputed status; historically kingdoms and sultanates, now split between India and Pakistan.", noFlag: true }],
  ["Kingdom of Pagan", { continent: "Southeast Asia", note: "Pagan (Bagan) — variant name for the Burmese kingdom; powerful medieval state with thousands of Buddhist temples." }],
  ["Late Jomon culture", { continent: "East Asia", note: "Late Jomon — Japanese Neolithic culture (2500–300 BC); hunter-gatherers with sophisticated pottery and marine adaptation." }],
  ["Maoris", { continent: "Oceania", note: "Māori — Polynesian peoples of New Zealand; variant spelling of indigenous New Zealanders with rich cultural traditions." }],
  ["Maya city-states", { continent: "Mesoamerica", note: "Maya city-states — independent city-kingdoms of Mesoamerica (Tikal, Copán, Chichén Itzá, etc.) with shared language and culture but distinct polities." }],
  ["Nicaragua", { continent: "Central America", note: "Nicaragua — Central American state; Spanish colony until independence; site of Miskito kingdom in the east; contested by various colonial powers.", noFlag: true, population: 2_000_000 }],
  ["Ottoman Sultanate", { continent: "SE Europe / Western Asia", note: "Ottoman Empire — long-lived Islamic dynasty and successor to Byzantine Anatolia; one of history's largest empires (1299–1922).", noFlag: true, population: 30_000_000 }],
  ["Oxus", { continent: "Central Asia", note: "Oxus civilization — Bronze-Age culture of Central Asia and Afghanistan (2300–1600 BC); connected to Indus Valley trade networks." }],
  ["Point Peninsula", { continent: "North America", note: "Point Peninsula culture — archaeological culture of the Great Lakes-St. Lawrence region (1400–600 BC); precursor to later Algonquian peoples." }],
  ["Pratiharas", { continent: "South Asia", note: "Pratihara dynasty — north Indian power (8th–11th c.) that rivaled the Palas and Rashtrakutas; Rajput warriors ruling the Ganges plain.", population: 6_000_000 }],
  ["Qataban", { continent: "Arabia", note: "Qatabanian Kingdom — South Arabian state; powerful incense trader rivaling Sheba and Hadramawt in the Yemen highlands." }],
  ["Santee", { continent: "North America", note: "Santee Sioux — Dakota people of the Great Lakes region; skilled hunters and traders; later displaced by Lakota expansion." }],
  ["Simhala", { continent: "South Asia", note: "Sinhalese (Simhala) — Indo-Aryan peoples of Sri Lanka; Buddhist culture, kingdoms and empires on the island throughout history." }],
  ["Teton", { continent: "North America", note: "Teton Sioux (Lakota) — Great Plains peoples; powerful warriors and buffalo hunters with sophisticated tipi culture and equestrian traditions." }],
  ["Transvaal", { continent: "Southern Africa", note: "Transvaal — Boer republic in southern Africa; British colony after Anglo-Boer Wars; incorporated into the Union of South Africa.", noFlag: true, noFlagReason: "No flag shown — the South African Republic flew the Vierkleur, the Dutch tricolour with a green band at the hoist; no period-accurate image of it is bundled.", population: 500_000 }],
  ["Wadai Empire", { continent: "Central Africa", note: "Wadai Empire — Saharan sultanate (16th–19th c.) of present-day Chad; rival to Bornu and a major player in the trans-Saharan trade." }],
  ["Wawula", { continent: "Oceania", note: "Wawula people — Aboriginal Australians; indigenous group with traditional knowledge of Australian ecosystems and songlines." }],
  ["Ainus", { continent: "East Asia", note: "Ainu people — indigenous Hokkaido peoples predating Yamato Japanese; hunter-gatherers and fishers with distinct Austronesian-derived language." }],
  ["Bidjara", { continent: "Oceania", note: "Bidjara people — Aboriginal Australians of Queensland; desert peoples with extensive knowledge of water sources and seasonal migrations." }],
  ["Blackfoot", { continent: "North America", note: "Blackfoot Confederacy — powerful Plains nations (Siksika, Kainai, Piikani) known for buffalo hunting, warrior societies and tipi culture." }],
  ["Celtic kingdoms", { continent: "Western Europe", note: "Celtic kingdoms — pre-Roman and Roman-era Celtic polities across western Europe; warrior societies with chivalric traditions and tribal governance." }],
  ["city-states", { continent: "Mesopotamia / Greece", note: "Ancient city-states — independent urban centers with surrounding territories; fundamental political unit of ancient Mesopotamia and Greece." }],
  ["Eastern Masurian culture", { continent: "Northern Europe", note: "Eastern Masurian culture — Iron-Age archaeological culture of eastern Prussia (3rd–1st c. BC); predecessor to later Baltic peoples." }],
  ["Erie", { continent: "North America", note: "Erie people — Iroquoian nation of the Great Lakes region; powerful until conquered by the Haudenosaunee in the Beaver Wars of the 1650s." }],
  ["Finns", { continent: "Northern Europe", note: "Finns (Finno-Ugric peoples) — northern European peoples with Uralic language roots; settled Scandinavia and developed into modern Finnish nation." }],
  ["Hail", { noFlagReason: "No flag shown — the Rashidi emirate of Ha'il flew plain red and white banners bearing the shahada; no period-accurate image of one is bundled.", continent: "Arabia", note: "Hail — important Arabian oasis city and regional power; controlled trade routes in the central Nejd region." }],
  ["Hejaz", { continent: "Arabia", note: "Hejaz — western Arabian region containing Mecca and Medina; holy Islamic heartland; independent kingdom before Saudi consolidation." }],
  ["Imerina", { continent: "East Africa", note: "Imerina — highland kingdom of Madagascar; Merina people and their realm; unified Madagascar before French colonization." }],
  ["Kong Empire", { continent: "West Africa", note: "Kong Empire — Manding-speaking power of the West African Sahel (17th–19th c.); rival to Bambara and Mossi powers." }],
  ["Laotian states", { continent: "Southeast Asia", note: "Laotian states — Lao-speaking kingdoms of the Mekong valley (Vientiane, Luang Prabang, etc.); distinct from Thai and Khmer polities." }],
  ["Mahra", { continent: "Arabia", note: "Mahra sultanate — Omani-influenced sultanate of southeastern Arabia; minor Gulf power with Bedouin-influenced culture." }],
  ["minor Hindu & Buddhist states", { continent: "South Asia", note: "Minor Hindu and Buddhist states — smaller Indian kingdoms and principalities, tributaries to larger empires like Chola and Rajendra." }],
  ["Navajo", { continent: "North America", note: "Navajo (Diné) people — southwestern U.S. nation; pastoral herders and weavers; largest indigenous U.S. nation by population." }],
  ["Ngaanyatjarra", { continent: "Oceania", note: "Ngaanyatjarra people — Aboriginal Australians of the Western Desert; hunter-gatherers with deep ecological knowledge and songline traditions." }],
  ["Ngatatjara", { continent: "Oceania", note: "Ngatatjara people — Aboriginal Australians of the Great Victoria Desert; nomadic hunters with sophisticated navigation and survival skills." }],
  ["Pallavas", { continent: "South Asia", note: "Pallava dynasty — major south Indian power (4th–9th c.); patrons of Dravidian art, architecture and the development of the Tamil script." }],
  ["Parhae", { continent: "East Asia", note: "Parhae (Bohai) — kingdom in Manchuria (698–926 AD); Tungusic state rivaling the Tang dynasty, known for cultural synthesis." }],
  ["Pawnee", { continent: "North America", note: "Pawnee people — Great Plains nation; agricultural and nomadic peoples known for earth lodges, star-based cosmology and federation governance." }],
  ["Principality of Galicia-Volhynia", { continent: "Eastern Europe", note: "Galicia-Volhynia — east Slavic principality of medieval times; powerful state rivaling Kiev and Moscow, center of Ruthenian culture." }],
  ["Serbia", { continent: "Eastern Europe", note: "Serbia — Balkan state with Orthodox Christian heritage; medieval kingdom, Ottoman vassal, independent nation; central to Balkan geopolitics.", noFlag: true, population: 7_000_000 }],
  ["Southern Paiute", { continent: "North America", note: "Southern Paiute — Great Basin peoples of Nevada and Utah; hunter-gatherers adapted to desert conditions with sophisticated plant knowledge." }],
  ["Swift Creek Culture", { continent: "North America", note: "Swift Creek culture — southeastern U.S. pottery tradition (500 BC–AD 700); archaeological culture of the Mississippian precursor." }],
  ["Toltec Empire", { continent: "Mesoamerica", note: "Toltec Empire — Mesoamerican power (10th–12th c.); warrior society ruling central Mexico; legendary predecessors to the Aztecs." }],
  ["Warumungu", { continent: "Oceania", note: "Warumungu people — Aboriginal Australians of central Australia; desert dwellers with specialized knowledge of spinifex grasslands and star lore." }],
  ["Wichita", { continent: "North America", note: "Wichita people — southern Great Plains nation; agricultural peoples living in grass-house villages; traders between Plains and Caddo peoples." }],
  ["Yamato", { continent: "East Asia", note: "Yamato people — proto-Japanese ethnic group; established early Japanese states and eventually became the dominant group of Japan." }],
  ["Wirangu", { continent: "Oceania", note: "Wirangu people — Aboriginal Australians of the Lower Eyre Peninsula, South Australia; maritime hunter-gatherers with distinct language and sea knowledge." }],
  ["Paleo-Inuit", { continent: "North America", note: "Paleo-Inuit peoples — ancestral Arctic cultures of the far north, precursors to modern Inuit and Yupik groups." }],
  ["Mandjindja", { continent: "Oceania", note: "Mandjindja people — Aboriginal Australians of the Northern Territory, inhabiting the Roper River region with a rich oral tradition." }],
  // Drawn in the Yemeni highlands (lon 41.6–45.4, lat 14.6–18.7) — the Sabaean kingdom,
  // not the Dutch island in the Lesser Antilles.
  ["Saba", { continent: "Arabia", note: "Saba — the Sabaean kingdom of south-west Arabia, centred on Marib and its great dam, the dominant power of the incense trade." }],
  ["Pyu state", { continent: "Southeast Asia", note: "Pyu civilization — ancient societies of the Irrawaddy Valley (200 BC–900 AD), precursors to Bamar peoples and foundational to Burmese culture." }],
  ["Luritja", { continent: "Oceania", note: "Luritja people — Aboriginal Australians of central Australia near Uluru; desert specialists with intricate songline traditions." }],
  ["Buyiids", { continent: "Asia", note: "Buyid dynasty — Shi'a Persian dynasty ruling Persia and parts of Iraq in the 10th–11th centuries; patrons of learning and literature." }],
  ["Akan", { continent: "West Africa", note: "Akan peoples — major West African ethnic group of present-day Ghana; includes Asante, Fante, and other confederations; traders and political powers." }],
  ["Haripunjaya", { continent: "Southeast Asia", note: "Haripunjaya — early Buddhist kingdom of what is now Lamphun, Thailand; Mon kingdom ruling northern Siam (7th–11th centuries)." }],
  ["Cappadocia", { continent: "Asia", note: "Cappadocia — historical region in central Anatolia; Hittite heartland and later independent kingdom; known for cave dwellings and early Christianity." }],
  ["Kamilaroi", { continent: "Oceania", note: "Kamilaroi people — Aboriginal Australians of New South Wales; complex kinship systems and sophisticated trade networks across inland Australia." }],
  ["Wangkathaa", { continent: "Oceania", note: "Wangkathaa people — Aboriginal Australians of Western Australia; desert dwellers with deep knowledge of native plant foods and water sources." }],
  ["Mataram", { continent: "Southeast Asia", note: "Mataram kingdom — early Hindu-Buddhist state of Java (8th–9th centuries); seat of the Sailendra dynasty; center of Javanese culture." }],
  ["Illyrians", { continent: "Europe", note: "Illyrians — Indo-European peoples of the Balkans and Adriatic coast; pre-Roman Balkan civilization; rivals to Greek city-states." }],
  ["Yankuntjatjara", { continent: "Oceania", note: "Yankuntjatjara people — Aboriginal Australians of the central desert (SA/WA/NT); language group with strong ties to Uluru-Kata Tjuta region." }],
  ["Burmese kingdoms", { continent: "Southeast Asia", note: "Burmese kingdoms — term for early Bamar polities that succeeded the Pyu civilization in Myanmar; predecessors to Bagan and later Burmese empires." }],
  ["Arakanese kingdoms", { continent: "Southeast Asia", note: "Arakanese kingdoms — Rakhine state polities on the Bay of Bengal; rivals to Burmese kingdoms; maritime trading powers." }],
  ["Tocharians", { continent: "Asia", note: "Tocharians — Indo-European peoples of Chinese Turkestan (Tarim Basin); speakers of an early Indo-European language; influenced by Silk Road trade." }],
  ["Caddo Confederacy", { continent: "North America", note: "Caddo Confederacy — southeastern North American peoples; agricultural societies; complex chiefdoms in present-day Texas, Louisiana, Arkansas, Oklahoma." }],
  ["Powhatan Confederacy", { continent: "North America", note: "Powhatan Confederacy — Algonquian-speaking peoples of Virginia; paramount chiefdom under Powhatan; first English colonists of Jamestown encountered them." }],
  ["Calusa", { continent: "North America", note: "Calusa peoples — southeastern North American peoples of Florida; maritime societies with complex chiefdoms; dominant in southern peninsula." }],
  ["Lampung", { continent: "Southeast Asia", note: "Lampung peoples — inhabitants of southern Sumatra; maritime traders; distinct language and culture within Indonesian archipelago." }],
  ["Minangkabau", { continent: "Southeast Asia", note: "Minangkabau peoples — West Sumatran ethnic group; matrilineal society; traders and scholars of Islam in the archipelago." }],
  ["Bugis", { continent: "Southeast Asia", note: "Bugis peoples — South Sulawesi maritime traders and warriors; renowned shipbuilders and sailors of the Indonesian archipelago." }],
  ["Makassar", { continent: "Southeast Asia", note: "Makassar peoples — Sulawesi-based maritime power; rival traders to Bugis; known for shipbuilding and involvement in spice trade." }],
  ["Sundanese", { continent: "Southeast Asia", note: "Sundanese peoples — West Javanese ethnic group; distinct language and Hindu-Buddhist traditions; agricultural societies in fertile uplands." }],
  ["Javanese kingdoms", { continent: "Southeast Asia", note: "Javanese kingdoms — various polities of Java; successors to Mataram; centers of Hindu-Buddhist and later Islamic learning." }],
  ["United Arab Emirates", { continent: "Asia", note: "UAE — Gulf state formed by federation of seven emirates in 1971; modern Arab nation built on oil wealth and trade." }],
  ["Cheyenne", { continent: "North America", note: "Cheyenne people — Great Plains nation; historically divided into northern and southern groups; warrior culture and horse nomads." }],
  ["Mon state", { continent: "Southeast Asia", note: "Mon kingdoms — Theravada Buddhist civilizations of Myanmar and Thailand; maritime traders; culturally influential across Southeast Asia." }],
  ["Barotse", { continent: "Southern Africa", note: "Barotse kingdom — state of present-day Zambia; Lozi-speaking people; ruled by a paramount chief; major trade network." }],
  ["Goryeo", { continent: "East Asia", note: "Goryeo — Korean kingdom (918–1392); unified Korean peninsula; Buddhist state; introduced Hangul and Celadon ceramics." }],
  ["Pitjantjatjara", { continent: "Oceania", note: "Pitjantjatjara people — Aboriginal Australians of the central and western desert; largest Aboriginal language group by speakers." }],
  ["Nakako", { continent: "Oceania", note: "Nakako people — Aboriginal Australians of the arid interior; desert specialists with deep songline and kinship traditions." }],
  ["Kalaako", { continent: "Oceania", note: "Kalaako people — Aboriginal Australians; central desert inhabitants with intricate knowledge of water and seasonal resources." }],
  ["Atropatene", { continent: "Asia", note: "Atropatene — ancient kingdom of Azerbaijan; Zoroastrian state; named for the satrap Atropates under Alexander; later called Media Atropatene." }],
  ["Yankontai", { continent: "North America", note: "Yankton Dakota — Sioux peoples of the Missouri River; Yankton Sioux; semi-sedentary prairie dwellers; traders and warriors." }],
  ["León", { continent: "Europe", note: "Kingdom of León — Iberian Christian kingdom; emerged from Asturias after the Reconquista; unified with Castile in 1479." }],
  ["Kediri", { continent: "Southeast Asia", note: "Kediri kingdom — early Javanese state (11th–12th centuries); Hindu-Buddhist center; rival to East Java kingdoms." }],
  // Drawn in Dhofar, southern Arabia (lon 54–58.8, lat 17.8–21.8). The earlier note put it
  // in the Sahara; no account of the polity as the dataset draws it could be sourced, and a
  // missing note beats a wrong one.
  ["Gharra", { continent: "Arabia" }],
  ["Senas", { continent: "Asia", note: "Sena dynasty — Bengal-based Hindu dynasty ruling eastern India (12th–13th centuries); overthrown by Muslim invasions." }],
  ["Southern Xiongnu", { continent: "East Asia", note: "Southern Xiongnu — Xiongnu confederation that submitted to Han China; established in Inner Mongolia; gradually sinicized." }],
  ["First Samori Empire", { continent: "West Africa", note: "Samori Touré's empire — Mandinka state of West Africa (1860s–1890s); powerful resistance to French colonization; military innovations." }],
  ["Ciboney", { continent: "Caribbean", note: "Ciboney people — Indigenous Caribbean peoples of Cuba and Hispaniola; earlier settlers than the Taíno; hunter-gatherers." }],
  ["Bokhara Khanate", { continent: "Central Asia", note: "Khanate of Bukhara — Turkic Central Asian state centered at Bukhara; Islamic learning center; Silk Road trade hub." }],
  ["Hindu kingdoms", { continent: "Asia", note: "Hindu kingdoms — term for various Hindu-Buddhist polities across Southeast Asia and South Asia; diverse political organizations." }],
  ["Belize", { continent: "Central America", note: "Belize — Central American nation; British Honduras until 1981; Caribbean location; English-speaking former colony." }],
  ["Glades Culture", { continent: "North America", note: "Glades culture — archaeological culture of southern Florida (ca. 1200 BC–1500 AD); precursor to Seminole peoples." }],
  ["Bijapur", { continent: "Asia", note: "Bijapur Sultanate — Islamic state of South India (16th–17th centuries); patron of architecture; rival to Mughal empire." }],
  ["Potawatomi", { continent: "North America", note: "Potawatomi people — Great Lakes and Midwest Algonquian nation; traders and warriors; allied with French then British." }],
  ["Jōmon", { continent: "East Asia", note: "Jōmon culture — prehistoric Japan (14,000–300 BC); hunter-gatherers with pottery traditions; influenced by Arctic and Asian cultures." }],
  ["Nganasan", { continent: "Asia", note: "Nganasan people — Arctic Siberian peoples; northernmost Samoyedic group; reindeer herders of the Taimyr Peninsula." }],
  ["Pegu", { continent: "Southeast Asia", note: "Pegu kingdom — Southeast Asian state of lower Burma; Mon-speaking kingdom; major port and Buddhist center." }],
  ["Yulparitja", { continent: "Oceania", note: "Yulparitja people — Aboriginal Australians of central Australia; western desert peoples with connection to Uluru region traditions." }],
  ["Yankton", { continent: "North America", note: "Yankton Dakota — middle division of the Sioux; Missouri River valley dwellers; traders between Plains and woodland peoples." }],
  ["Ngarinyin", { continent: "Oceania", note: "Ngarinyin people — Aboriginal Australians of the Kimberley region, Western Australia; known for Wandjina rock art tradition." }],
  ["Chavin", { continent: "South America", note: "Chavín culture — early Andean civilization (900–200 BC); influential religious and artistic traditions; known for textiles and stone carving." }],
  ["Tonkawa", { continent: "North America", note: "Tonkawa people — Texas-based Indigenous peoples; nomadic hunter-gatherers; affected by Comanche pressure and European colonization." }],
  ["Quapaw", { continent: "North America", note: "Quapaw people — Mississippi River valley nation; Dhegihan Sioux group; traders and warriors of the Arkansas and Missouri valleys." }],
  ["Wudjari", { continent: "Oceania", note: "Wudjari people — Aboriginal Australians of southern Western Australia; Noongar nation; maritime foragers of the coast." }],
  ["Valdivia", { continent: "South America", note: "Valdivia culture — early Ecuadorian civilization (3500–1500 BC); among the earliest pottery makers in the Americas; coastal fishers." }],
  ["Iowa", { continent: "North America", note: "Iowa people — Mississippi River valley nation; Siouan-speaking peoples; agricultural and hunting traditions along the upper Mississippi." }],
  ["Rozwi", { continent: "Southern Africa", note: "Rozwi Empire — Shona-speaking state of south-central Africa (17th–19th centuries); successor to Great Zimbabwe; cattle wealth." }],
  ["El Paraiso", { continent: "South America", note: "El Paraiso culture — Peruvian preceramic civilization (3500–1800 BC); early monumental architecture; cotton cultivators." }],
  ["Suspiaq", { continent: "North America", note: "Supiaq people — Alaskan Inuit peoples of the Pacific coast; sea mammal hunters; ancestral to modern Alutiiq populations." }],
  ["Teke", { continent: "Central Africa", note: "Teke peoples — Central African peoples of the Congo Basin; Bantu-speaking groups; organized in chiefdoms along river trade routes." }],
  ["Mordvinians", { continent: "Europe", note: "Mordvinians — Finno-Ugric peoples of European Russia; indigenous to the Volga region; semi-nomadic herders and agriculturalists." }],
  ["Veps", { continent: "Europe", note: "Veps people — Finno-Ugric ethnic group of northwestern Russia; small indigenous population of forests and lake regions." }],
  ["Antakarinja", { continent: "Oceania", note: "Antakarinja people — Aboriginal Australians of central Australia; desert dwellers with extensive songline networks linking distant lands." }],
  ["Funj", { continent: "Africa", note: "Funj Sultanate — Islamic state of Sudan (16th–19th centuries); major Nile Valley power; control of gold and trade routes." }],
  ["Chinchorro culture", { continent: "South America", note: "Chinchorro culture — pre-ceramic Chilean coastal civilization (7000–1500 BC); known for mummification practices; marine foragers." }],
  ["Iningai", { continent: "Oceania", note: "Iningai people — Aboriginal Australians of south-central Australia; desert nation with deep connection to Flinders Ranges." }],
  ["Yaka", { continent: "Central Africa", note: "Yaka peoples — Congo Basin peoples; Bantu-speaking groups; wood carvers known for masks and sculptural traditions." }],
  ["Hainan", { continent: "Asia", note: "Hainan — Chinese island; varying political status from independent kingdoms to tributary to Ming, Qing dynasties; strategic South China Sea location." }],
  ["Kaytej", { continent: "Oceania", note: "Kaytej people — Aboriginal Australians of central Australia; desert nation near the MacDonnell Ranges." }],
  ["Marksville Culture", { continent: "North America", note: "Marksville culture — Mississippian precursor culture of Louisiana (500 BC–AD 500); mound-building tradition; river-valley dwellers." }],
  ["Panama", { continent: "Central America", note: "Panama — Central American nation; Isthmus of Panama strategic location; former Spanish colony; critical to Caribbean trade." }],
  ["Mbailundu", { continent: "Southern Africa", note: "Mbailundu kingdom — Angolan kingdom of the Benguela plateau; Ovimbundu-speaking peoples; trading network for ivory and slaves." }],
  ["Awsa", { continent: "Africa", note: "Awsa Sultanate — Afar sultanate of northeastern Ethiopia; Islamic state of the Danakil Depression; regional trade power." }],
  ["Baltic tribes", { continent: "Europe", note: "Baltic peoples — pre-Christian Balts of the Baltic region; distinct language family; pagan societies later subsumed by Christianization." }],
  ["Kuwarra", { continent: "Oceania", note: "Kuwarra people — Aboriginal Australians of south Australia; coastal and inland regions with rich marine and land food traditions." }],
  ["Kija", { continent: "Oceania", note: "Kija people — Aboriginal Australians of the far northern Kimberley; complex kinship and ceremonial traditions; saltwater and savanna country." }],
  ["Sintashta", { continent: "Eurasian Steppe", note: "Sintashta culture — Bronze Age steppe civilization (2100–1800 BC) of Central Asia; early chariot warfare; pastoral Indo-Europeans." }],
  ["Nez Perce", { continent: "North America", note: "Nez Perce people — Pacific Northwest nation; Plateau region dwellers; salmon fishers; mounted warriors; known for Appaloosa horses." }],
  ["Nobatia", { continent: "Africa", note: "Nobatia — Nubian kingdom of upper Egypt and Sudan (4th–6th centuries); Christian Nubian state; rival to Axum." }],
  ["Sicily", { continent: "Europe", note: "Sicily — Mediterranean island; complex political history under Greek, Roman, Norman, Arab, Spanish and Italian rule; strategic trade crossroads." }],
  ["Ngarti", { continent: "Oceania", note: "Ngarti people — Aboriginal Australians of the western desert; central Australia inhabitants; desert and spinifex country specialists." }],
  ["Nyaki-nyaki", { continent: "Oceania", note: "Nyaki-nyaki people — Aboriginal Australians; inland Australia inhabitants; semi-nomadic desert dwellers with complex kinship traditions." }],
  ["Caohuiltecs", { continent: "North America", note: "Caohuiltecs — Indigenous peoples of south Texas; semi-nomadic hunter-gatherers; adapted to arid and semi-arid environments." }],
  ["Bangladesh", { continent: "Asia", note: "Bangladesh — South Asian nation of the Ganges Delta; gained independence in 1971; densely populated river delta civilization." }],
  ["Ngalea", { continent: "Oceania", note: "Ngalea people — Aboriginal Australians of inland Australia; desert nation with complex astronomical and songline traditions." }],
  ["Catawba", { continent: "North America", note: "Catawba people — Southeastern Woodlands nation of the Carolinas; agricultural peoples; traders and political powers; river dwellers." }],
  ["Funan", { continent: "Southeast Asia", note: "Funan — early Southeast Asian state of the Mekong Delta (1st–6th centuries); early Hindu-Buddhist influence in the region." }],
  ["White Russia", { noFlagReason: "No flag shown — the Belarusian People's Republic's white-red-white flag flew in 1918–19, but by 1920 the territory was the Byelorussian SSR, whose red flag with gold cyrillic initials is not bundled.", continent: "Europe", note: "White Russia — European land (Belarus); historical region with complex political overlaps between Polish, Lithuanian and Russian claims." }],
  ["Alyawarre", { continent: "Oceania", note: "Alyawarre people — Aboriginal Australians of central Australia; desert dwellers near Alice Springs region with distinct language." }],
  ["Chimú Empire", { continent: "South America", note: "Chimú Empire — Andean coastal civilization (1000–1470 AD); precursor to Inca conquest; organized irrigation agriculture." }],
  ["Pandya state", { continent: "Asia", note: "Pandya kingdom — South Indian Tamil dynasty; maritime power controlling trade across Indian Ocean; Hindu temple patrons." }],
  ["Gugu-Badhun", { continent: "Oceania", note: "Gugu-Badhun people — Aboriginal Australians of northern Queensland; rainforest inhabitants; complex kinship and trade networks." }],
  ["Mangala", { continent: "Oceania", note: "Mangala people — Aboriginal Australians of inland Australia; desert nation with deep dreaming and songline connections." }],
  ["Rus' Khaganate", { continent: "Europe", note: "Khaganate of Rus' — early Eastern Slavic state centered at Kiev; bridge between Byzantine and Scandinavian cultures; emerging Christendom." }],
  ["Sinhalese kingdoms", { continent: "Asia", note: "Sinhalese kingdoms — Sri Lankan Buddhist states; maritime powers controlling Indian Ocean trade; Buddhist religious centers." }],
  ["Dendi Kingdom", { continent: "West Africa", note: "Dendi kingdom — successor state to Songhai in West Africa; Islamic state of Niger River region; Songhai cultural continuation." }],
  ["Ovimbundu", { continent: "Southern Africa", note: "Ovimbundu peoples — Angolan ethnic group; pastoral and trade-oriented; organized chiefdoms of the Benguela plateau." }],
  ["Kuba", { continent: "Central Africa", note: "Kuba kingdom — Congo Basin state; Bantu peoples; renowned for raffia cloth and complex political organization; artistic traditions." }],
  ["Lesotho", { continent: "Southern Africa", note: "Lesotho — Southern African nation; landlocked mountain kingdom; Sotho peoples; emerged from Mfecane upheavals under Moshoeshoe." }],
  ["Aceh", { continent: "Southeast Asia", note: "Aceh Sultanate — Islamic maritime power of northern Sumatra; major spice trade center; sophisticated naval and commercial networks." }],
  ["Jaru", { continent: "Oceania", note: "Jaru people — Aboriginal Australians of central Australia; desert inhabitants with connection to Uluru and Kata Tjuta regions." }],
  ["Danes", { continent: "Europe", note: "Danes — Viking maritime powers; Scandinavian traders and raiders; Danish kingdoms emerged controlling Baltic and North Sea trade." }],
  ["Ndebele", { continent: "Southern Africa", note: "Ndebele peoples — Southern African ethnic group; warrior society; cavalry traditions; organized under Mzilikazi and successors." }],
  ["Lipan", { continent: "North America", note: "Lipan Apache — southern Great Plains and Texas Apache peoples; nomadic raiders; adaptively mobile in response to Comanche expansion." }],
  ["Atakapa", { continent: "North America", note: "Atakapa people — Gulf Coast of Texas and Louisiana; maritime traders; shell middens and fishing traditions; encountered by French explorers." }],
  ["Wakaya", { continent: "Oceania", note: "Wakaya people — Aboriginal Australians of southern Australia; inland and coastal dwellers with maritime knowledge." }],
  ["Ibadites", { continent: "Africa", note: "Ibadite Imamate — Islamic North African state; Kharijite Islamic tradition; established caliphates in North Africa and Arabian Peninsula." }],
  ["Albania", { continent: "Europe", note: "Albania — Balkan state; complex history under Ottoman rule, Venetian trade, and eventually independence; mountainous Balkan nation." }],
  ["Wangkangurru", { continent: "Oceania", note: "Wangkangurru people — Aboriginal Australians of south Australia; coastal and inland dwellers with maritime traditions." }],
  ["Tjupany", { continent: "Oceania", note: "Tjupany people — Aboriginal Australians of central Australia; inland desert inhabitants with complex song and story traditions." }],
  ["Nyamal", { continent: "Oceania", note: "Nyamal people — Aboriginal Australians; Pilbara and inland regions; desert dwellers with knowledge of native food and water sources." }],
  ["Burgandy", { continent: "Europe", note: "Burgundy — historical region of eastern France; powerful duchy; seat of Valois dukes; cultural center of medieval Europe." }],
  ["Mixtec Empire", { continent: "Mesoamerica", note: "Mixtec Empire — Mesoamerican civilization of Oaxaca; skilled craftspeople; warriors; rivals to Aztecs; codices and manuscripts preserved." }],
  ["Arabana", { continent: "Oceania", note: "Arabana people — Aboriginal Australians of south Australia; inland dwellers with strong connection to Lake Torrens region." }],
  ["Banggarla", { continent: "Oceania", note: "Banggarla people — Aboriginal Australians of South Australian Eyre Peninsula; maritime and inland hunting traditions." }],
  ["Dharawala", { continent: "Oceania", note: "Dharawala people — Aboriginal Australians of inland Australia; desert nation with intricate kinship and ceremonial systems." }],
  ["Tjalkanti", { continent: "Oceania", note: "Tjalkanti people — Aboriginal Australians of central Australia; desert specialists with deep connection to Finke River region." }],
  ["Kukatja", { continent: "Oceania", note: "Kukatja people — Aboriginal Australians of central Australia west of Uluru; desert dwellers with connection to Pintupi peoples." }],
  ["Warlmanpa", { continent: "Oceania", note: "Warlmanpa people — Aboriginal Australians of central Australia; desert inhabitants near MacDonnell Ranges region." }],
  ["Mudburra", { continent: "Oceania", note: "Mudburra people — Aboriginal Australians of the Northern Territory; inland desert dwellers with pastoral knowledge." }],
  ["Brittany", { continent: "Europe", note: "Brittany — historical duchy of northwestern France; Celtic culture; Breton language; autonomous region with distinct heritage." }],
  ["Bagirmi", { continent: "Africa", note: "Bagirmi sultanate — Chad-based Islamic state; Saharan power; rival to Bornu and Kanem; trading networks and cavalry warriors." }],
  ["Wongaibon", { continent: "Oceania", note: "Wongaibon people — Aboriginal Australians of New South Wales; inland peoples with complex trade and language networks." }],
  ["Barundji", { continent: "Oceania", note: "Barundji people — Aboriginal Australians of inland Australia; semi-nomadic with specialized hunting and gathering traditions." }],
  ["Muskogee", { continent: "North America", note: "Muskogee people — Southeastern North America; Creek Confederacy peoples; agricultural societies; traders and political powers." }],
  ["Trucial Oman", { continent: "Asia", noFlagReason: "No flag shown — each Trucial emirate flew its own red-and-white flag under British protection; the shared UAE flag dates only from 1971.", note: "Trucial Oman — Gulf emirates under British protection; precursor to UAE formation; pearling and trading economies." }],
  ["Griqualand West", { continent: "Southern Africa", note: "Griqualand West — South African territory; Griqua peoples (mixed descent); diamond-rich region; contested colonial territory." }],
  ["Guanches", { continent: "Africa", note: "Guanches — Indigenous peoples of the Canary Islands; Berber-descended population; endemic to Atlantic islands; unique culture and language." }],
  ["Walmatjarri", { continent: "Oceania", note: "Walmatjarri people — Aboriginal Australians of the Kimberley region; remote desert and sandhill dwellers with ancestral traditions." }],
  ["Swaziland", { continent: "Southern Africa", note: "Swaziland (Eswatini) — Southern African kingdom; Nguni peoples; former British protectorate; independent Bantu-speaking nation." }],
  ["Rabih az-Zubayr", { continent: "Africa", note: "Rabih az-Zubayr Empire — Saharan conqueror (late 1800s); established state in Central Sudan; resistance to European colonization." }],
  // Drawn west of Lake Carnegie in the Western Australian desert (lon 120.8–123.2,
  // lat -28–-26), not in the Guinea region.
  ["Nana", { continent: "Australia", note: "Nana — a name recorded for the Aboriginal peoples of the Western Australian desert west of Lake Carnegie and Lake Wells, applied to the Pini and the Ngaanyatjarra." }],
  ["Veracruz civilization", { continent: "Mesoamerica", note: "Veracruz culture — ancient Mesoamerican civilization of Gulf coast Mexico; complex societies; influenced by Olmec traditions." }],
  ["Neustria", { continent: "Europe", note: "Neustria — Frankish kingdom of northwestern Europe; early medieval power; foundation for later French kingdoms." }],
  ["Alawa", { continent: "Oceania", note: "Alawa people — Aboriginal Australians of the Northern Territory; inland dwellers with distinct language and cultural traditions." }],
  ["Maiawali", { continent: "Oceania", note: "Maiawali people — Aboriginal Australians; inland Australia inhabitants with complex kinship and land-connection systems." }],
  ["Swiss Confederation", { continent: "Europe", note: "Swiss Confederation — Alpine state; federal structure of cantons; emerged as independent power; banking and trade center." }],
  ["Chickasaw", { continent: "North America", note: "Chickasaw people — Southeastern North American nation; Mississippi peoples; warriors and traders; allied with colonizers." }],
  ["Equatorial Guinea", { continent: "Africa", note: "Equatorial Guinea — Central African nation; former Spanish colony; unique position as Spanish-speaking African country." }],
  ["Guachichiles", { continent: "North America", note: "Guachichiles people — Northern Mexico indigenous peoples; nomadic hunters of the desert regions; resistant to Spanish conquest." }],
  ["Gurindji", { continent: "Oceania", note: "Gurindji people — Aboriginal Australians of the Northern Territory; pastoral land knowledge; industrial workers in cattle stations." }],
  ["Missouri", { continent: "North America", note: "Missouri people — Great Plains Siouan nation; river valley dwellers; traders between Plains and agricultural regions." }],
  ["Tonga", { continent: "Oceania", note: "Kingdom of Tonga — Polynesian island monarchy; never colonised; retained independence through diplomacy and trade partnerships; constitutional monarchy established 1875." }],
  ["United States", { continent: "North America", note: "United States of America — federal republic formed 1776; expanded across North America; major power by 19th century; became global superpower by 20th century." }],
  ["Italy", { continent: "Europe", note: "Kingdom of Italy — Italian peninsula united as modern nation-state 1861; Mediterranean and Alpine power; major European nation; reformed after 1900s." }],
  ["American Samoa", { continent: "Oceania", noFlagReason: "No flag shown — a United States territory, flying the Stars and Stripes; American Samoa's own flag was adopted only in 1960.", note: "American Samoa — US territory in South Pacific; Polynesian islands; strategic Pacific presence; unincorporated territory administered from Washington." }],
  ["Qatar", { continent: "Asia", note: "Qatar — Arabian Peninsula nation; emerged as independent state from Ottoman and then British rule; modern absolute monarchy; energy-rich nation." }],
  ["Wallis and Futuna Islands", { continent: "Oceania", noFlagReason: "No flag shown — a French protectorate and then an overseas collectivity, flying the French tricolour; France recognises no official flag of its own for the islands.", note: "Wallis and Futuna — French overseas collectivity in South Pacific; Polynesian islands; dual monarchy preserved under French protection." }],
  ["Samoa", { continent: "Oceania", note: "Samoa (formerly Western Samoa) — Independent Polynesian nation in South Pacific; self-governing from 1962; parliamentary democracy; cultural heart of Polynesia." }],
  ["Dominican Republic", { continent: "North America", note: "Dominican Republic — Caribbean nation on Hispaniola; gained independence 1844; distinct Spanish-speaking Caribbean culture; sugar and agricultural economy." }],
  ["Costa Rica", { continent: "Central America", note: "Costa Rica — Central American nation; early democratic stability; abolished military 1949; coffee and banana republic; peaceful neutrality in regional conflicts." }],
  ["Argentina", { continent: "South America", note: "Argentina — South American nation; vast territory; strong European settlement; economically powerful through 20th century; Buenos Aires a major Latin American capital." }],
  ["Belgium", { continent: "Europe", note: "Belgium — Low Countries nation; independent from Netherlands 1830; Flemish-Walloon linguistic divide; strategic gateway between France and northern Europe." }],
  ["Guatemala", { continent: "Central America", note: "Guatemala — Largest Central American nation; successor to colonial Guatemala; Mayan heritage; mountainous terrain; agricultural economy; political instability." }],
  ["Honduras", { continent: "Central America", note: "Honduras — Central American nation; Spanish colonial heritage; Caribbean coast; Bay Islands region; tropical economy; US influence." }],
  ["El Salvador", { continent: "Central America", note: "El Salvador — Smallest Central American nation; Coffee Triangle; densely populated; Spanish colonial legacy; Pacific coast settlements." }],
  ["Uruguay", { continent: "South America", note: "Uruguay — South American nation; smallest independent state in continent; strong democratic traditions; early welfare state; cultural diversity from European immigration." }],
  ["Venezuela", { continent: "South America", note: "Venezuela — South American nation; vast oil reserves (largest known reserves globally); Caribbean coast; Orinoco River delta; diverse ecosystems from Andes to Amazon." }],
  ["Ecuador", { continent: "South America", note: "Ecuador — South American nation; Andes, Amazon and Pacific coast; indigenous populations; Spanish colonial heritage; Galápagos Islands territory; Quechua-speaking regions." }],
  ["Chile", { continent: "South America", note: "Chile — South American nation; narrow territory stretching from Atacama Desert to Patagonia; Andes mountains; Pacific coast; influential in regional politics." }],
  ["Peru", { continent: "South America", note: "Peru — South American nation; Andes mountains; Amazon basin; Pacific coast; Incan heritage; Spanish colonial legacy; indigenous Quechua and Aymara peoples." }],
  ["Mexico", { continent: "North America", note: "Mexico — Large North American nation; Aztec heritage; Spanish colonial territory; US neighbor; significant pre-Columbian civilizations; resource-rich economy." }],
  ["Liberia", { continent: "West Africa", note: "Liberia — West African nation founded by freed American slaves 1821; only African nation not colonised by European powers; English-speaking; iron ore and rubber economy." }],
  ["Bolivia", { continent: "South America", note: "Bolivia — South American nation; Andes and Amazon regions; landlocked; indigenous majority (Quechua, Aymara); tin and mineral resources; high altitude capitals." }],
  ["Romania", { continent: "Europe", note: "Romania — Eastern European nation; Carpathian mountains; Danube delta; Vlach and Eastern Orthodox heritage; carved from Ottoman and Austro-Hungarian empires; Latin-rooted language." }],
  ["Bulgaria", { continent: "Europe", note: "Bulgaria — Southeastern European nation; Balkan Peninsula; Black Sea coast; Bulgarian Orthodox tradition; emerged from Ottoman rule; Cyrillic script birthplace." }],
  ["Greece", { continent: "Europe", note: "Greece — Mediterranean nation; Balkan Peninsula; Aegean and Ionian islands; Hellenic cultural heritage; Orthodox Christianity; classical antiquity origins." }],
  ["Colombia", { continent: "South America", note: "Colombia — South American nation; Andes, Amazon and Caribbean; Pacific and Atlantic coasts; coffee production; diverse ecosystems; colonial Spanish legacy." }],
  ["Niue", { continent: "Oceania", noFlagReason: "No flag shown — a British protectorate and then a New Zealand dependency, flying their flags; Niue's own flag was adopted only in 1975.", note: "Niue — Small island nation in South Pacific; self-governing in free association with New Zealand; Polynesian culture; tropical island economy." }],
  ["United States Virgin Islands", { continent: "North America", noFlagReason: "No flag shown — Danish until 1917 and a United States territory since, flying first the Dannebrog and then the Stars and Stripes; the islands' own flag dates from 1921.", note: "US Virgin Islands — Caribbean territory of United States; St Croix, St John and St Thomas islands; tropical location; tourism and port economy; formerly Danish colonial." }],
  ["Tunisia", { continent: "North Africa", note: "Tunisia — North African nation on Mediterranean coast; Carthage heritage; Arab-Berber culture; emerged from French protectorate; Saharan and coastal regions." }],
  ["Rapa Nui", { continent: "Oceania", note: "Rapa Nui (Easter Island) — Polynesian island; remote Pacific location; famous for moai statues; Chilean territory; Rapa Nui people and language." }],
  // Drawn at King George Sound in south-west Australia (lon 116.4–119.1, lat -35.2–-34.3):
  // the Noongar Minang, not the Minangkabau of Sumatra an earlier note described.
  ["Minang", { continent: "Australia", note: "Minang (Mineng) — a Noongar people of south-west Australia, whose country runs from King George Sound north to the Stirling Range; their name comes from minaq, \"south\". They fished the Sound with stone traps built thousands of years ago." }],
  ["Germany", { continent: "Europe", note: "Germany — Central European nation; emerged as unified state 1871; industrial powerhouse; cultural and philosophical center; major European power through 20th century." }],
  ["Cuba", { continent: "Caribbean", note: "Cuba — Caribbean island nation; largest Caribbean island; Spanish colonial heritage; sugar economy; close to United States; tropical biodiversity." }],
  ["Puerto Rico", { continent: "Caribbean", noFlagReason: "No flag shown — a United States territory, flying the Stars and Stripes; Puerto Rico's own flag, designed in 1895, became official only in 1952.", note: "Puerto Rico — Caribbean island; US territory; Spanish colonial legacy; distinct culture; linguistic and cultural blend of Spanish and English influences." }],
  ["New Zealand", { continent: "Oceania", note: "New Zealand — Island nation in South Pacific; Aotearoa to Māori people; British settler colony; dual European-Polynesian heritage; isolated ecosystems." }],
  ["Brazil", { continent: "South America", note: "Brazil — Largest South American nation; Amazon basin; Portuguese colonial heritage; vast biodiversity; Portuguese-speaking; diverse indigenous populations and Afro-Brazilian culture." }],
  ["Australia", { continent: "Oceania", note: "Australia — Island continent; Aboriginal peoples; British settler colony; vast interior (Outback); distinct fauna and flora; isolated from other continents." }],
  ["Nigeria", { continent: "West Africa", note: "Nigeria — West African nation; most populous African nation; Niger River delta; former British colony; petroleum economy; diverse ethnic and religious groups." }],
  ["Uganda", { continent: "East Africa", note: "Uganda — East African nation; Great Lakes region; Nile River source; landlocked; diverse kingdoms; former British protectorate; wildlife-rich savannas." }],
  ["Annam", { continent: "Southeast Asia", note: "Annam — Historical region of Vietnam; central coastal kingdom; French colonial territory; Vietnamese ethnic heartland; rice-growing region; passed to Vietnam in 1887." }],
  ["Cyprus", { continent: "Western Asia", note: "Cyprus — Mediterranean island nation; Greek and Turkish communities; ancient kingdom; independent from Britain 1960; strategic location at Eastern Mediterranean crossroads." }],
  ["Mauritius", { continent: "Africa", note: "Mauritius — Island nation in Indian Ocean off East Africa; Hindu, Muslim and Christian communities; former British colony; sugar and textile economy; multicultural society." }],
  ["Seychelles", { continent: "Africa", note: "Seychelles — Island nation in Indian Ocean; archipelago east of Africa; Franco-British colonial heritage; tourism and fishing; Creole culture and language." }],
  ["Fiji", { continent: "Oceania", note: "Fiji — Island nation in South Pacific; Melanesian and Indo-Fijian populations; former British colony; tropical islands; sugar and tourism economy." }],
  ["Palau", { continent: "Oceania", note: "Palau — Small island nation in Micronesia; archipelago in western Pacific; self-governing in free association with US; rock islands and coral reefs; marine biodiversity." }],
  ["Kiribati", { continent: "Oceania", note: "Kiribati — Island nation in central Pacific; Gilbert, Phoenix and Line islands; coral atolls; low elevation; vulnerable to rising sea levels; I-Kiribati culture." }],
  ["Marshall Islands", { continent: "Oceania", note: "Marshall Islands — North Pacific island nation; Micronesian; self-governing in free association with US; atolls; history of nuclear testing; Marshallese language." }],
  ["Nauru", { continent: "Oceania", note: "Nauru — Small island nation in Micronesia; smallest independent nation by area; former phosphate economy; tropical Pacific island; vulnerable island state." }],
  ["Tuvalu", { continent: "Oceania", note: "Tuvalu — Island nation in South Pacific; Polynesian; low-lying coral atolls; extremely vulnerable to climate change and rising seas; sparse population; limited resources." }],
  ["Solomon Islands", { continent: "Oceania", note: "Solomon Islands — Melanesian island nation in South Pacific; archipelago; former British protectorate; tropical rainforests; WWII strategic importance; diverse indigenous groups." }],
  ["Vanuatu", { continent: "Oceania", note: "Vanuatu — Island nation in South Pacific; Melanesian; volcanic islands; highly biodiverse; former British-French condominium; Bislama and other indigenous languages." }],
  ["Micronesia", { continent: "Oceania", note: "Federated States of Micronesia — Micronesian island nation; self-governing in free association with US; scattered atolls; Pacific strategic location; Palauan, Chuukese, Kosraean peoples." }],
  ["Timor-Leste", { continent: "Asia", note: "Timor-Leste (East Timor) — Island nation in Southeast Asia; eastern part of Timor island; Portuguese colonial heritage; gained independence 2002; mountainous and agricultural." }],
  ["Philippines", { continent: "Asia", note: "Philippines — Island nation in Southeast Asia; Spanish colonial heritage; Christian majority; tropical archipelago; rice and coconut agriculture; significant trade gateway." }],
  ["Singapore", { continent: "Asia", note: "Singapore — City-state at tip of Malay Peninsula; strategic port; British colonial legacy; became independent trading power; Chinese, Malay and Indian communities; financial hub." }],
  ["Thailand", { continent: "Asia", note: "Thailand — Southeast Asian nation; never colonised; Buddhist kingdom; Siamese cultural heritage; Mekong River region; rice-growing heartland; monarchy-centered society." }],
  ["Vietnam", { continent: "Asia", note: "Vietnam — Southeast Asian nation; Mekong River delta; rice-growing region; French colonial past; split 1954–1975; Tonkinese, Annamite and Cochinese regions historically." }],
  ["Laos", { continent: "Asia", note: "Laos — Southeast Asian nation; landlocked; Mekong River heartland; French colonial past; Lao ethnic majority; Buddhist kingdom; mountainous regions; upland peoples." }],
  ["Cambodia", { continent: "Asia", note: "Cambodia — Southeast Asian nation; Mekong delta; Khmer heritage; Angkor temples; French protectorate; Buddhist kingdom; monsoon-fed agriculture." }],
  ["Taiwan", { continent: "Asia", note: "Taiwan (Formosa) — Island off southeast China coast; Portuguese and Dutch colonial; Qing dynasty territory; Han Chinese settlement; Japanese colonial 1895–1945; Republic of China (ROC) since 1949." }],
  ["Portuguese Guinea", { continent: "Africa", note: "Portuguese Guinea — West African territory; Portuguese colonial possession; Guinea-Bissau region; peanut and cashew economy; became independent Guinea-Bissau in 1974." }],
  ["Mozambique", { continent: "Africa", note: "Mozambique — Southeastern African nation; Portuguese colonial; Swahili and Bantu heritage; Zambezi River crossing; Indian Ocean ports; FRELIMO independence 1975." }],
  ["India", { continent: "Asia", note: "India — South Asian nation; Hindu, Muslim and other religious communities; British colonial Raj; independence 1947; vast subcontinent; Mughal and Hindu empires heritage." }],
  ["Kuwait", { continent: "Asia", note: "Kuwait — Arabian Peninsula nation on Persian Gulf; oil-rich; Ottoman and British protection; independent 1961; wealthy trading emirate; strategic Gulf location." }],
  ["Togo", { continent: "West Africa", note: "Togo — West African nation; long north-south strip; former German colony then French mandate; Ewe and other ethnic groups; slavery trade legacy; Lome as major Atlantic port." }],
  ["Sudan", { continent: "Africa", note: "Sudan — Northeast African nation; Nile River heartland; Saharan north and sub-Saharan south; Arabic-speaking Islamic culture; Egyptian and British colonial legacy; diverse ethnic groups." }],
  ["Kenya", { continent: "East Africa", note: "Kenya — East African nation; Mount Kenya and Great Rift Valley; Swahili coast; Maasai and Kikuyu peoples; British colony; wildlife-rich savanna; Nairobi as hub." }],
  ["Iran", { continent: "Asia", note: "Iran (Persia) — Middle Eastern nation; Persian culture and history; Islamic revolution 1979; oil-rich; Shi'a Islamic majority; successor to Persian Empire; mountain and desert geography." }],
  ["Arawaks", { continent: "Caribbean", note: "Arawak people — Caribbean indigenous peoples; lived in islands before European contact; displaced by Spanish colonisation; cultural and linguistic heritage; Taíno subgroup prominent in Caribbean." }],
  ["Cochin China", { continent: "Asia", note: "Cochin China — Southern Vietnam region; French colonial territory; Mekong delta; rice-growing heartland; economically developed portion of French Indochina; Vietnamese ethnic majority." }],
  ["Montenegro", { continent: "Europe", note: "Montenegro — Balkan nation; mountain terrain; Adriatic coast; Orthodox Christian tradition; Serbian heritage; Ottoman and Austro-Hungarian rule; independent from Serbia 2006." }],
  ["Malta", { continent: "Mediterranean", note: "Malta — Mediterranean island nation; strategic location between Europe and Africa; former British colony; Italian-influenced culture; Arabic linguistic heritage; fortress island." }],
  ["Madagascar (France)", { continent: "Africa", note: "Madagascar (French) — Island nation off East Africa coast; French colonial possession; Malagasy and Asian heritage; unique wildlife; became independent 1960; French language legacy." }],
  ["South Africa", { continent: "Africa", note: "South Africa — Southern African nation; British colonial and settler dominion; Afrikaans and English speakers; Bantu and Khoisan heritage; apartheid 1948–1994; mineral-rich." }],
  ["Djibouti", { continent: "Africa", note: "Djibouti — Horn of Africa nation; Red Sea and Gulf of Aden straits; former French Somaliland; strategic location for shipping; Afar and Somali peoples; French language." }],
  ["Libya", { continent: "North Africa", note: "Libya — North African nation; Mediterranean coast; Saharan interior; Italian colonial; Arab-Berber population; oil-rich; Islamic culture; emerged as independent nation 1951." }],
  ["British Somaliland", { continent: "Africa", note: "British Somaliland — Horn of Africa territory; British colonial possession; Somali peoples; pastoral nomadic society; merged with Italian Somaliland to form Somalia 1960." }],
  ["Jamaica", { continent: "Caribbean", note: "Jamaica — Caribbean island nation; largest English-speaking Caribbean island; sugar and plantation legacy; African-descended majority; British colony; tropical island; reggae culture." }],
  ["Austria", { continent: "Europe", note: "Austria — Central European nation; Alpine mountains; emerged from Austro-Hungarian Empire; German-speaking; Habsburg dynasty heritage; landlocked; Vienna as cultural capital." }],
  ["Guinea-Bissau", { continent: "West Africa", note: "Guinea-Bissau — West African nation; former Portuguese Guinea; low-lying coast and interior; Creole culture; independence struggle; cashew and peanut economy; diverse ethnic groups." }],
  ["Ireland", { continent: "Europe", note: "Ireland — Island nation; Celtic heritage; Catholic-majority population; independence from Britain 1922; English language; literary and cultural tradition; independent republic 1949." }],
  ["Jordan", { continent: "Asia", note: "Jordan — Middle Eastern nation; Levantine region; Arab-majority; emerged from Ottoman and British mandate; Trans-Jordan kingdom; Palestinian refugee populations; Desert Arab heritage." }],
  ["Saudi Arabia", { continent: "Asia", note: "Saudi Arabia — Arabian Peninsula nation; birthplace of Islam; Wahhabi Islamic tradition; oil-wealthy monarchy; Mecca and Medina religious centers; Bedouin heritage; absolute monarchy." }],
  ["Turks and Caicos Islands", { continent: "Caribbean", noFlagReason: "No flag shown — a British colony flying the colonial ensign; the islands' own badged flag was granted in 1968.", note: "Turks and Caicos Islands — Caribbean territory; British overseas territory; salt and cotton trade history; tropical islands; tourism economy; southeastern Caribbean location." }],
  ["Bahamas", { continent: "Caribbean", note: "Bahamas — Caribbean island nation; archipelago; British colonial heritage; tourism and financial services; African-descended majority; hurricane zone; tropical island culture." }],
  ["Andorra", { continent: "Europe", note: "Andorra — Pyrenees mountain microstate; between France and Spain; co-princes as joint rulers; ski tourism; Catalan language and culture; independent until 1993; mountain communities." }],
  ["Indonesia", { continent: "Asia", note: "Indonesia — Southeast Asian archipelago nation; world's largest island nation; Dutch colonial; Javanese, Sundanese and many ethnic groups; Islamic-majority; diverse languages; Equatorial geography." }],
  ["Ostrogoths", { continent: "Europe", note: "Ostrogoths — Germanic peoples; Pannonia and Eastern Europe; rivals of Western Goths; allied with Rome; defeated by Byzantine Empire in Italian wars (535–554 AD); Germanic heritage." }],
  ["Pomeranian culture", { continent: "Europe", note: "Pomeranian culture — Bronze Age culture of Baltic Sea region; coastal settlements; maritime trading tradition; pottery and amber; ancestor to later Baltic and Slavic peoples." }],
  ["Sambian-Nothangian culture", { continent: "Europe", note: "Sambian-Nothangian — Pre-historic Baltic culture; Baltic Sea region; Bronze Age to Iron Age transition; amber trading; ancestor to later Baltic peoples (Prussians, Lithuanians, Latvians)." }],
  ["Curonians", { continent: "Europe", note: "Curonians — Baltic people; Latvia coast; maritime traders and pirates; resistance to German crusaders and Teutonic Knights; Baltic cultural heritage; eventually Christianised." }],
  ["Croatia", { continent: "Europe", note: "Croatia — Balkan nation; Adriatic coast; Yugoslav successor state; Dalmatian maritime heritage; Catholic-majority; Central European and Mediterranean cultural blend; independent 1991." }],
  ["Guanahatabeyes", { continent: "Caribbean", note: "Guanahatabeyes — Caribbean indigenous peoples of Cuba and Hispaniola; hunter-gatherer tradition; cave dwellers; resisted Spanish colonization; linguistic and cultural distinction from Taíno." }],
  ["Kalaako/Malpa", { continent: "Oceania", note: "Kalaako/Malpa — Aboriginal Australian peoples of northern Australia; language groups; maritime and inland dwelling traditions; deep historical presence in the continent." }],
  ["Kadjerong", { continent: "Oceania", note: "Kadjerong — Aboriginal Australian people; Northern Territory dwellers; distinctive language and cultural practices; traditional land management and hunting traditions." }],
  ["Gooniyandi", { continent: "Oceania", note: "Gooniyandi — Aboriginal Australian people of Western Australia; Kimberley region; Gooniyandi language speakers; songlines and story traditions; pastoral and hunting practices." }],
  ["Pinikura", { continent: "Oceania", note: "Pinikura — Aboriginal Australian people; inland Australia inhabitants; traditional nomadic and semi-nomadic lifestyles; deep connection to specific country and songlines." }],
  ["Yiiji", { continent: "Oceania", note: "Yiiji — Aboriginal Australian people; Northern Australia dwellers; distinctive language; traditional ecological knowledge; seasonal movement patterns across country." }],
  ["Martuthunira", { continent: "Oceania", note: "Martuthunira — Aboriginal Australian people of Western Australia; Pilbara region; pastoral and hunting traditions; traditional trade networks and gatherings." }],
  ["Yinhawangka", { continent: "Oceania", note: "Yinhawangka — Aboriginal Australian people; Northern Australia; traditional language speakers; land custodians; songline traditions and cultural practices." }],
  ["Jabirrjabirr", { continent: "Oceania", note: "Jabirrjabirr — Aboriginal Australian people; Northern Territory dwellers; maritime and riverine hunter-gatherers; distinctive cultural and linguistic heritage." }],
  ["Payungu", { continent: "Oceania", note: "Payungu — Aboriginal Australian people of Western Australia; Pilbara and inland regions; traditional land connections; hunting and gathering knowledge systems." }],
  // Drawn on the Gascoyne coast of Western Australia (lon 113.4–115.3, lat -25.1–-23.8).
  // The Mesoamerican Maya are "Maya chiefdoms and states", a separate entry.
  ["Maya", { continent: "Australia", note: "Maia (Maya) — an Aboriginal Australian people of the Gascoyne coast facing the Indian Ocean, from Lake MacLeod down to the Gascoyne floodplain, speakers of a dialect close to Yinggarda." }],
  ["Malkana", { continent: "Oceania", note: "Malkana — Aboriginal Australian people; Northern Australia; traditional languages and practices; deep historical roots; land management and songline traditions." }],
  ["Yawuru", { continent: "Oceania", note: "Yawuru — Aboriginal Australian people of Western Australia; Broome and Kimberley region; maritime culture; traditional language; pearling connection to Broome." }],
  ["Kaniyang", { continent: "Oceania", note: "Kaniyang — Aboriginal Australian people; Northern Australia dwellers; traditional language speakers; land custodians with deep country connections." }],
  ["Ngarinman", { continent: "Oceania", note: "Ngarinman — Aboriginal Australian people of Northern Territory; traditional country dwellers; distinctive language; Dreaming tracks and songlines." }],
  // The dataset draws this at Broome in the Kimberley (lon 122.2–122.8, lat -18.1–-17.7):
  // it is the Djugun, not the Jukun of the Nigerian Benue valley an earlier note described.
  ["Jukun", { continent: "Australia", note: "Djugun (Jukun) — an Aboriginal Australian people of the Kimberley coast, whose country runs along the northern shore of Roebuck Bay at Broome and up the coast to Willie Creek." }],
  ["Maranunggu", { continent: "Oceania", note: "Maranunggu — Aboriginal Australian people of Northern Territory; coastal and riverine dwellers; maritime traditions; traditional languages and practices." }],
  ["Thiin", { continent: "Oceania", note: "Thiin — Aboriginal Australian people; Northern Australia inhabitants; traditional language speakers; land custodians; hunting and gathering traditions." }],
  ["Doolboong/Miriwoong", { continent: "Oceania", note: "Doolboong/Miriwoong — Aboriginal Australian people of Kimberley region (WA/NT border); language speakers; pastoral and hunting knowledge; songline traditions." }],
  ["Jaburrara", { continent: "Oceania", note: "Jaburrara — Aboriginal Australian people of Western Australia; coastal and inland regions; traditional maritime knowledge; distinctive cultural practices." }],
  ["Ngarluma", { continent: "Oceania", note: "Ngarluma — Aboriginal Australian people of Western Australia; Pilbara region; traditional language; connection to Ngarluma country; hunting and gathering knowledge." }],
  ["Marramaninjsji", { continent: "Oceania", note: "Marramaninjsji — Aboriginal Australian people of Northern Territory; traditional language speakers; land custodians; distinctive cultural and songline traditions." }],
  ["Punuba", { continent: "Oceania", note: "Punuba — Aboriginal Australian people; Northern Australia inhabitants; traditional language speakers; deep country knowledge; hunting and gathering practices." }],
  ["Worla", { continent: "Oceania", note: "Worla — Aboriginal Australian people; Northern Territory dwellers; traditional language community; songlines and country connection; land management knowledge." }],
  ["Kariyarra", { continent: "Oceania", note: "Kariyarra — Aboriginal Australian people of Western Australia; Pilbara region; traditional language; pastoral knowledge; trading relationships with neighboring groups." }],
  ["Nyul Nyul", { continent: "Oceania", note: "Nyul Nyul — Aboriginal Australian people of Western Australia; Kimberley coast; maritime traditions; language speakers; songline and trading traditions." }],
  ["Karangpurru", { continent: "Oceania", note: "Karangpurru — Aboriginal Australian people; Northern Australia; distinctive language; traditional land custodians; connection to country through songlines." }],
  ["Gunibidji", { continent: "Oceania", note: "Gunibidji — Aboriginal Australian people of Northern Territory; distinctive language; land custodians; traditional hunting and gathering practices." }],
  ["Mangarayi", { continent: "Oceania", note: "Mangarayi — Aboriginal Australian people of Northern Territory; coastal and inland dwellers; language speakers; traditional maritime and hunting knowledge." }],
  ["Yuat", { continent: "Oceania", note: "Yuat people — Papuan (New Guinea) indigenous peoples; river valley dwellers; linguistic and cultural distinctness; traditional trading and social networks." }],
  ["Wajuk", { continent: "Oceania", note: "Wajuk — Aboriginal Australian people of Western Australia; southwestern region; traditional language and practices; songline traditions; land custodians." }],
  ["Jingili", { continent: "Oceania", note: "Jingili — Aboriginal Australian people of Northern Territory; distinctive language; traditional country dwellers; songlines and Dreaming traditions; cultural knowledge systems." }],
  ["Nhuwala", { continent: "Oceania", note: "Nhuwala — Aboriginal Australian people of Northern Territory; language speakers; land custodians; traditional practices and songline connections to country." }],
  ["Ngan'gikurunggurr", { continent: "Oceania", note: "Ngan'gikurunggurr — Aboriginal Australian people of Northern Territory; distinctive language; traditional dwellers; country connection through songlines and Dreaming." }],
  ["Limilngan", { continent: "Oceania", note: "Limilngan — Aboriginal Australian people of Northern Territory; coastal region dwellers; maritime traditions; language speakers; trading and cultural practices." }],
  ["Jiwarli", { continent: "Oceania", note: "Jiwarli — Aboriginal Australian people of Western Australia; coastal and inland regions; traditional language speakers; hunting and gathering knowledge; country custodians." }],
  ["Wunambul", { continent: "Oceania", note: "Wunambul — Aboriginal Australian people of Kimberley region; Northwestern Australia; distinctive language; songline and trading traditions; pastoral and hunting practices." }],
  ["Ngalkbun", { continent: "Oceania", note: "Ngalkbun — Aboriginal Australian people of Northern Territory; language speakers; traditional country dwellers; distinctive cultural practices and songlines." }],
  ["Ngalawangka", { continent: "Oceania", note: "Ngalawangka — Aboriginal Australian people of Northern Territory; coastal dwellers; distinctive language; maritime traditions; songline and country connections." }],
  ["Bukurnidja", { continent: "Oceania", note: "Bukurnidja — Aboriginal Australian people of Northern Territory; traditional language; land custodians; hunting and gathering knowledge; songline traditions." }],
  ["Tharrgari", { continent: "Oceania", note: "Tharrgari — Aboriginal Australian people of Western Australia; inland and coastal regions; traditional language speakers; country custodians." }],
  ["Worora", { continent: "Oceania", note: "Worora — Aboriginal Australian people of Kimberley region; Western Australia; distinctive language; maritime and inland hunting traditions; songlines." }],
  ["Unggarangi", { continent: "Oceania", note: "Unggarangi — Aboriginal Australian people of Northern Territory; distinctive language; traditional country dwellers; hunting and gathering practices." }],
  ["Nimanburu", { continent: "Oceania", note: "Nimanburu — Aboriginal Australian people; Northern Australia inhabitants; traditional language speakers; land custodians; cultural and songline traditions." }],
  ["Gunbalang", { continent: "Oceania", note: "Gunbalang — Aboriginal Australian people of Northern Territory; language speakers; coastal and inland regions; traditional knowledge systems." }],
  ["Kungarakany", { continent: "Oceania", note: "Kungarakany — Aboriginal Australian people of Northern Territory; distinctive language; traditional country dwellers; fishing and hunting practices." }],
  ["Ngalakan", { continent: "Oceania", note: "Ngalakan — Aboriginal Australian people of Northern Territory; language speakers; traditional country custodians; hunting traditions and songlines." }],
  ["Nungali", { continent: "Oceania", note: "Nungali — Aboriginal Australian people of Northern Territory; distinctive language; land custodians; traditional practices and cultural knowledge." }],
  ["Yindjibarndi", { continent: "Oceania", note: "Yindjibarndi — Aboriginal Australian people of Western Australia; Pilbara region; distinctive language; pastoral and hunting knowledge; country custodians." }],
  ["Karajarri", { continent: "Oceania", note: "Karajarri — Aboriginal Australian people of Western Australia; Kimberley region; traditional language; hunting and gathering practices; trading traditions." }],
  ["Bilinara", { continent: "Oceania", note: "Bilinara — Aboriginal Australian people; Northern Australia inhabitants; distinctive language; traditional land custodians; hunting and gathering knowledge." }],
  ["Tjerratj", { continent: "Oceania", note: "Tjerratj — Aboriginal Australian people of Northern Territory; language speakers; traditional country dwellers; distinctive cultural practices." }],
  ["Goreng", { continent: "Oceania", note: "Goreng — Aboriginal Australian people; Northern Australia; distinctive language; land custodians; traditional hunting and gathering practices." }],
  ["Gunwinggu", { continent: "Oceania", note: "Gunwinggu — Aboriginal Australian people of Northern Territory; distinctive language; Arnhem Land dwellers; hunting and gathering traditions." }],
  ["Yinggarda", { continent: "Oceania", note: "Yinggarda — Aboriginal Australian people of Western Australia; distinctive language; inland and coastal regions; country custodians." }],
  ["Konbudj", { continent: "Oceania", note: "Konbudj — Aboriginal Australian people; Northern Australia; distinctive language; traditional country dwellers; hunting practices." }],
  ["Wagiman", { continent: "Oceania", note: "Wagiman — Aboriginal Australian people of Northern Territory; language speakers; traditional inhabitants; hunting and gathering knowledge; riverine dwellers." }],
  ["Ngombur", { continent: "Oceania", note: "Ngombur — Aboriginal Australian people; Northern Territory inhabitants; distinctive language; traditional land custodians; cultural practices." }],
  ["Iwaidja", { continent: "Oceania", note: "Iwaidja — Aboriginal Australian people of Northern Territory; Croker Island region; distinctive language; maritime and hunting traditions; island dwellers." }],
  ["Mbukarla", { continent: "Oceania", note: "Mbukarla — Aboriginal Australian people of Northern Territory; language speakers; traditional country custodians; hunting traditions." }],
  ["Warriyangga", { continent: "Oceania", note: "Warriyangga — Aboriginal Australian people; Northern Australia inhabitants; distinctive language; traditional practices; hunting knowledge." }],
  ["Gagudju", { continent: "Oceania", note: "Gagudju — Aboriginal Australian people of Northern Territory; Kakadu region; distinctive language; hunting and gathering knowledge; country custodians." }],
  ["Bardi", { continent: "Oceania", note: "Bardi — Aboriginal Australian people of Western Australia; Kimberley coast; distinctive language; maritime trading traditions; island dwellers." }],
  ["Maung", { continent: "Oceania", note: "Maung — Aboriginal Australian people of Northern Territory; Melville and Bathurst islands; maritime traditions; distinctive language; island culture." }],
  ["Marringarr", { continent: "Oceania", note: "Marringarr — Aboriginal Australian people of Northern Territory; distinctive language; coastal regions; hunting and maritime knowledge." }],
  ["Bibbulman", { continent: "Oceania", note: "Bibbulman — Aboriginal Australian people of Western Australia; southwestern regions; distinctive language; hunting and gathering traditions; country custodians." }],
  ["Gamberre", { continent: "Oceania", note: "Gamberre — Aboriginal Australian people; Western Australia inhabitants; distinctive language; traditional practices; hunting knowledge." }],
  ["Kwini", { continent: "Oceania", note: "Kwini — Aboriginal Australian people of Western Australia; Kimberley region; distinctive language; hunting traditions; country custodians." }],
  ["Larrakia", { continent: "Oceania", note: "Larrakia — Aboriginal Australian people of Northern Territory; Darwin region; distinctive language; maritime and coastal hunting traditions." }],
  ["Gungurugoni", { continent: "Oceania", note: "Gungurugoni — Aboriginal Australian people; Northern Territory inhabitants; distinctive language; traditional country custodians; hunting practices." }],
  ["Ngaliwuru", { continent: "Oceania", note: "Ngaliwuru — Aboriginal Australian people; Northern Australia inhabitants; distinctive language; land custodians; hunting traditions." }],
  ["Thalanyji", { continent: "Oceania", note: "Thalanyji — Aboriginal Australian people of Western Australia; coastal regions; distinctive language; maritime and beach hunting traditions." }],
  ["Woolna", { continent: "Oceania", note: "Woolna — Aboriginal Australian people of Western Australia; inland regions; distinctive language; hunting and gathering knowledge; country custodians." }],
  ["Rembarnga", { continent: "Oceania", note: "Rembarnga — Aboriginal Australian people of Northern Territory; distinctive language; Arnhem Land dwellers; hunting and gathering traditions." }],
  ["Murrinh-patha", { continent: "Oceania", note: "Murrinh-patha — Aboriginal Australian people of Northern Territory; language speakers; Daly River region; fishing and hunting traditions." }],
  ["Wardandi", { continent: "Oceania", note: "Wardandi — Aboriginal Australian people of Western Australia; southwestern coastal regions; distinctive language; maritime and beach hunting traditions." }],
  ["Amarak", { continent: "Oceania", note: "Amarak — Aboriginal Australian people; Northern Territory inhabitants; distinctive language; traditional country dwellers; hunting practices." }],
  ["Cape Colony", { continent: "Africa", note: "Cape Colony — South African British colony; established 1806; Dutch and British settlement; Cape Town as capital; agricultural and mercantile economy; expansion into interior." }],
  ["Angola (Portugal)", { continent: "Africa", note: "Angola — Portuguese colonial territory; Southern African nation; Portuguese colonial administration; Bantu peoples; slave trade legacy; oil and mineral resources." }],
  ["Spanish Sahara", { continent: "Africa", note: "Spanish Sahara — Northwest African Spanish colonial territory; former colony; Sahrawi people; Western Sahara region; transferred to Morocco 1975; disputed territory." }],
  ["Rio De Oro", { continent: "Africa", note: "Rio De Oro — Western Sahara region under Spanish colonial rule; part of Spanish Sahara; Sahrawi pastoral and trading peoples; phosphate resources." }],
  ["Gold Coast", { continent: "Africa", note: "Gold Coast — West African British colony (modern Ghana); British coastal settlements and inland territory; gold mining; palm oil economy; slave trade legacy; became Ghana 1957." }],
  ["Italian Somaliland", { continent: "Africa", note: "Italian Somaliland — East African Italian colonial territory; Somali peoples; pastoral nomadic society; Italian colonial administration; merged with British Somaliland to form Somalia 1960." }],
  ["Zambia", { continent: "Africa", note: "Zambia — Southern African nation; formerly Northern Rhodesia; British colony; Zambezi River; copper mining economy; emerged independent 1964; diverse ethnic groups." }],
  ["Estonia", { continent: "Europe", note: "Estonia — Baltic nation; Northern Europe; formerly Russian and Soviet; Estonian language (Finno-Ugric); independent 1918; historical ties to Scandinavian region." }],
  ["Latvia", { noFlagReason: "No flag shown for this date — Latvia's carmine-and-white flag was designed in 1917 and used from independence, but its proportions and shade were only fixed by law in 1921–23, which is the date the modern flag record carries.", continent: "Europe", note: "Latvia — Baltic nation; Eastern Europe; formerly Russian and Soviet; Latvian language; independent 1918; maritime Hanseatic heritage; German landlord tradition." }],
  ["Niger", { continent: "Africa", note: "Niger — West African nation; Sahel and Saharan regions; Niger River valley; French colonial past; Hausa, Tuareg and Fulani peoples; uranium and agricultural economy." }],
  ["Chad", { continent: "Africa", note: "Chad — Central African nation; Sahara and Sahel regions; Lake Chad; French colonial past; diverse ethnic and religious groups; oil resources; nomadic and settled traditions." }],
  ["Sri Lanka", { continent: "Asia", note: "Sri Lanka (Ceylon) — South Asian island nation; Indian Ocean; Sinhalese Buddhist majority; Tamil minority; British colonial past; tea and spice economy; Hindu cultural heritage." }],
  ["Namibia", { continent: "Africa", note: "Namibia — Southern African nation; formerly South-West Africa; German colonial heritage; diamond-rich; desert regions; independent 1990; Nama and other Khoisan peoples." }],
  ["Lebanon", { continent: "Asia", note: "Lebanon — Eastern Mediterranean nation; Levantine region; Christian and Muslim communities; Cedars of Lebanon; French mandate; Port of Beirut; mountain and coastal regions." }],
  ["Israel", { continent: "Asia", note: "Israel — Eastern Mediterranean nation; emerged 1948; Jewish homeland; disputed territories; Palestinian populations; Negev Desert and Mediterranean coast; Levantine heritage." }],
  ["Guinea", { continent: "Africa", note: "Guinea — West African nation; French colonial past; Guinea-Bissau's neighbor; diverse ethnic groups; mining economy; rainforest and savanna; Conakry as capital." }],
  ["China", { continent: "Asia", note: "China — East Asian nation; world's most populous nation; vast territory; ancient civilization with continuous history; Qin, Han, Tang, Ming, Qing dynasties; communist state since 1949." }],
  ["Umida", { continent: "Oceania", note: "Umida — Aboriginal Australian people; Northern Territory inhabitants; distinctive language; traditional country dwellers; hunting and gathering practices." }],
  ["Kundjey'mi", { continent: "Oceania", note: "Kundjey'mi — Aboriginal Australian people; Northern Territory; distinctive language; land custodians; traditional hunting practices." }],
  ["Warwa", { continent: "Oceania", note: "Warwa — Aboriginal Australian people; Northern Australia inhabitants; distinctive language; country connection; hunting traditions." }],
  ["Dangbon", { continent: "Oceania", note: "Dangbon — Aboriginal Australian people; Northern Territory; distinctive language; traditional country dwellers; hunting practices." }],
  ["Wardaman", { continent: "Oceania", note: "Wardaman — Aboriginal Australian people of Northern Territory; language speakers; Victoria River region; hunting and gathering traditions." }],
  ["Wiilman", { continent: "Oceania", note: "Wiilman — Aboriginal Australian people of Western Australia; southwestern regions; distinctive language; hunting traditions; country custodians." }],
  ["Warray", { continent: "Oceania", note: "Warray — Aboriginal Australian people; Northern Territory inhabitants; distinctive language; land custodians; traditional hunting practices." }],
  ["Jurruru", { continent: "Oceania", note: "Jurruru — Aboriginal Australian people; Northern Australia inhabitants; distinctive language; traditional country dwellers; hunting knowledge." }],
  ["Purduna", { continent: "Oceania", note: "Purduna — Aboriginal Australian people; Northern Territory; distinctive language; land custodians; hunting and gathering traditions." }],
  ["Miwa", { continent: "Oceania", note: "Miwa — Aboriginal Australian people; Northern Territory inhabitants; distinctive language; traditional country dwellers; hunting practices." }],
  ["Kuwema", { continent: "Oceania", note: "Kuwema — Aboriginal Australian people; Northern Australia; distinctive language; land custodians; hunting traditions." }],
  ["Marrithiyel", { continent: "Oceania", note: "Marrithiyel — Aboriginal Australian people of Northern Territory; language speakers; riverine dwellers; fishing and hunting knowledge." }],
  ["Malak malak", { continent: "Oceania", note: "Malak malak — Aboriginal Australian people of Northern Territory; distinctive language; land custodians; hunting and fishing traditions." }],
  ["Unggumi", { continent: "Oceania", note: "Unggumi — Aboriginal Australian people; Northern Territory inhabitants; distinctive language; traditional country dwellers; hunting practices." }],
  ["Ngumbarl", { continent: "Oceania", note: "Ngumbarl — Aboriginal Australian people; Northern Territory; distinctive language; land custodians; traditional hunting knowledge." }],
  ["Nhanta", { continent: "Oceania", note: "Nhanta — Aboriginal Australian people of Western Australia; southwestern coastal regions; distinctive language; maritime traditions." }],
  ["Ngarla", { continent: "Oceania", note: "Ngarla — Aboriginal Australian people of Western Australia; Pilbara region; distinctive language; pastoral and hunting knowledge; country custodians." }],
  ["Jaminjung", { continent: "Oceania", note: "Jaminjung — Aboriginal Australian people of Northern Territory; distinctive language; Victoria River region; hunting and gathering traditions." }],
  ["Wuningangk", { continent: "Oceania", note: "Wuningangk — Aboriginal Australian people; Northern Territory inhabitants; distinctive language; land custodians; hunting practices." }],
  ["Ngan'giwumirri", { continent: "Oceania", note: "Ngan'giwumirri — Aboriginal Australian people of Northern Territory; language speakers; Ngan'giwumirri country dwellers; distinctive cultural traditions." }],
  ["Pinjarup", { continent: "Oceania", note: "Pinjarup — Aboriginal Australian people of Western Australia; southwestern regions; distinctive language; hunting traditions; country custodians." }],
  ["Bidar", { continent: "Asia", note: "Bidar Sultanate — Medieval kingdom of the Deccan, India; independent Islamic state; competing with other Deccan sultanates; located in north-central Deccan region." }],
  ["Golkonda", { continent: "Asia", note: "Golkonda Sultanate — Medieval kingdom of southern India; powerful Deccan sultanate; diamond-producing region; Persian-influenced culture; competing with Bijapur and other powers." }],
  ["Cuba (Spain)", { continent: "Caribbean", note: "Cuba — Spanish colonial territory; Caribbean island; Spanish settlement and administration; sugar and plantation economy; strategic location in Caribbean; eventually independent." }],
  ["Hispaniola (Spain)", { continent: "Caribbean", note: "Hispaniola — Spanish colonial territory; Caribbean island (Haiti and Dominican Republic); Spanish settlement; sugar and tobacco plantation economy; slave labor foundation." }],
  ["Wadai", { continent: "Africa", note: "Wadai Kingdom — Central African sultanate; Chad region; Islamic state; competing with other Sahel powers; trade-based economy; camel caravan routes." }],
  ["Chtimacha", { continent: "North America", note: "Chtimacha people — Indigenous peoples of Louisiana; bayou and waterway dwellers; distinctive culture; fishing and hunting; resistance to European colonization." }],
  ["Alabama", { continent: "North America", note: "Alabama people — Southeastern North American nation; Creek Confederacy member; warriors and farmers; Mississippi region; traded with European colonists." }],
  ["Serano", { continent: "North America", note: "Serano people — Southeastern North American indigenous peoples; Carolina region; hunter-gatherers; distinctive culture; colonial-era societies." }],
  ["Arikara", { continent: "North America", note: "Arikara people — Great Plains Native American nation; Missouri River valley; agricultural and hunting tradition; earth lodge dwellers; trading partners with other tribes." }],
  ["Miwok", { continent: "North America", note: "Miwok people — California Native Americans; diverse language groups; California valley and sierra dwellers; acorn-based diet; distinct from other California nations." }],
  ["Kawaiisu", { continent: "North America", note: "Kawaiisu people — Southern California Native Americans; Kern County region; hunter-gatherers; adapted to arid California landscape; distinctive language and traditions." }],
  ["Cayuse", { continent: "North America", note: "Cayuse people — Pacific Northwest Native American nation; Oregon and Washington regions; horse traders; pastoral and hunting traditions; allied with neighboring tribes." }],
  ["Houma", { continent: "North America", note: "Houma people — Louisiana and Mississippi coastal peoples; waterway dwellers; fishing and hunting economy; colonial-era adaptations; Southeastern Native traditions." }],
  ["Cusabo", { continent: "North America", note: "Cusabo people — Southeastern coastal North American nation; South Carolina region; maritime and terrestrial hunters; early European contact societies." }],
  ["Yuchi", { continent: "North America", note: "Yuchi people — Southeastern North American nation; mobile hunter-gatherers; adopted by Creek Confederacy; trading relationships; linguistic distinctness." }],
  ["Tano", { continent: "North America", note: "Tano people — Caribbean and Southeastern North American peoples; maritime and agricultural traditions; distinctive language and culture; colonial-era encounters." }],
  ["Omaha", { continent: "North America", note: "Omaha people — Great Plains Native American nation; Missouri River valley; agricultural and hunting tradition; trade network members; earth lodge dwellers." }],
  ["Ponca", { continent: "North America", note: "Ponca people — Great Plains Native American nation; Nebraska and Dakota regions; buffalo hunters; earth lodge dwellers; nomadic and settled traditions." }],
  ["Mandan", { continent: "North America", note: "Mandan people — Great Plains Native American nation; Missouri River valley; agricultural farmers; earth lodge dwellers; distinctive trade economy and culture." }],
  ["Fox", { continent: "North America", note: "Fox (Mesquakie) people — Great Lakes and Great Plains Native American nation; woodland and prairie dwellers; hunting and gathering; trading traditions." }],
  ["Winnebago", { continent: "North America", note: "Winnebago (Ho-Chunk) people — Great Lakes and Wisconsin region; woodland dwellers; fishing, hunting and gathering; distinctive language and culture." }],
  ["Menominee", { continent: "North America", note: "Menominee people — Great Lakes Native American nation; Wisconsin region; woodland hunters; rice gatherers; forest and waterway knowledge." }],
  ["Kalapuya", { continent: "North America", note: "Kalapuya people — Willamette Valley Native Americans; Oregon region; diverse bands; hunting, gathering and fishing; distinctive language family." }],
  ["Kalispel", { continent: "North America", note: "Kalispel people — Pacific Northwest Native American nation; inland waterway dwellers; fishing and hunting traditions; Salish language family." }],
  ["Yakima", { continent: "North America", note: "Yakima people — Pacific Northwest Native American nation; Columbia Plateau region; fishing and hunting; seasonal movement; trading relationships." }],
  ["Umatilla", { continent: "North America", note: "Umatilla people — Pacific Northwest Native American nation; Oregon and Washington regions; salmon fishing; hunting traditions; Sahaptian language speakers." }],
  ["Tenino", { continent: "North America", note: "Tenino people — Pacific Northwest Native American nation; Columbia River region; salmon fishing; trading partners; Sahaptian language group." }],
  ["Modoc", { continent: "North America", note: "Modoc people — Northern California and Oregon Native American nation; volcanic plateau region; hunting and gathering; distinctive tribal identity." }],
  ["Maidu", { continent: "North America", note: "Maidu people — Northern California Native Americans; Sierra Nevada and valley dwellers; hunting, gathering and fishing; acorn harvesting traditions." }],
  ["Republic of the Seven United Provinces", { continent: "Europe", note: "Dutch Golden Age — Seven United Provinces of the Netherlands; Dutch Republic; independent from Spanish rule; major maritime and trading power; Protestant culture." }],
  ["Eora", { continent: "Oceania", note: "Eora people — Aboriginal Australians of Sydney region; coastal dwellers; maritime hunter-gatherers; early European contact; distinctive language and culture." }],
  ["Ganggalida", { continent: "Oceania", note: "Ganggalida people — Aboriginal Australians of Queensland coast; maritime traditions; island and coastal dwellers; hunting and fishing knowledge." }],
  ["Umpila", { continent: "Oceania", note: "Umpila people — Aboriginal Australians of Queensland; coastal and island dwellers; maritime hunter-gatherers; distinctive cultural traditions." }],
  ["Awngthim", { continent: "Oceania", note: "Awngthim people — Aboriginal Australians of Northern Territory; distinctive language; traditional country dwellers; hunting and gathering practices." }],
  ["Hopie", { continent: "North America", note: "Hopie — Variant spelling of Hopi; Southwestern North American nation; pueblo dwellers; agricultural tradition; Arizona region." }],
  ["Kawahsu", { continent: "North America", note: "Kawahsu — Variant or related group to Kawaiisu; Southern California Native Americans; adaptive to arid landscape." }],
  ["Kuyani", { continent: "Oceania", note: "Kuyani people — Aboriginal Australians; distinctive group; traditional country dwellers; hunting and gathering knowledge." }],
  ["Nari Nari", { continent: "Oceania", note: "Nari Nari people — Aboriginal Australians of Victoria region; southeastern Australia; distinctive language; hunting traditions." }],
  ["Wambaya", { continent: "Oceania", note: "Wambaya people — Aboriginal Australians of Northern Territory; distinctive language; country custodians; hunting and gathering practices." }],
  ["Dainggatti", { continent: "Oceania", note: "Dainggatti people — Aboriginal Australians of New South Wales; southeastern region; distinctive language; hunting and gathering traditions." }],
  ["Andegerebenha", { continent: "Oceania", note: "Andegerebenha people — Aboriginal Australians; distinctive group; traditional country dwellers; hunting practices." }],
  ["Madi Madi", { continent: "Oceania", note: "Madi Madi people — Aboriginal Australians of Murray River region; southeastern Australia; riverine traditions; fishing and hunting." }],
  ["Gunu", { continent: "Oceania", note: "Gunu people — Aboriginal Australians; distinctive group; traditional country dwellers; hunting and gathering knowledge." }],
  ["Dyungungoo", { continent: "Oceania", note: "Dyungungoo (Gubbi Gubbi) — Aboriginal Australians of Queensland coast; coastal dwellers; maritime hunting and gathering traditions." }],
  ["Nguburinji", { continent: "Oceania", note: "Nguburinji people — Aboriginal Australians; distinctive group; traditional country dwellers; hunting practices." }],
  ["Dja Dja Wurrung", { continent: "Oceania", note: "Dja Dja Wurrung people — Aboriginal Australians of Victoria; central Victoria region; hunting and gathering; distinctive language." }],
  ["Yir Yoront", { continent: "Oceania", note: "Yir Yoront people — Aboriginal Australians of Queensland coast; Cape York region; distinctive language; maritime and hunting traditions." }],
  ["Karangura", { continent: "Oceania", note: "Karangura people — Aboriginal Australians of Queensland; distinctive group; traditional country dwellers; hunting knowledge." }],
  ["Yilba", { continent: "Oceania", note: "Yilba people — Aboriginal Australians; distinctive group; traditional country dwellers; hunting and gathering practices." }],
  ["Yawarawarka", { continent: "Oceania", note: "Yawarawarka people — Aboriginal Australians of South Australia; distinctive group; hunting and gathering traditions." }],
  ["Nakara", { continent: "Oceania", note: "Nakara people — Aboriginal Australians of Northern Territory; distinctive language; country custodians; hunting practices." }],
  ["Mara", { continent: "Oceania", note: "Mara people — Aboriginal Australians of Northern Territory; distinctive language; traditional country dwellers; hunting and gathering knowledge." }],
  ["Kuungkari", { continent: "Oceania", note: "Kuungkari people — Aboriginal Australians; distinctive group; traditional country dwellers; hunting practices." }],
  ["Kureinji", { continent: "Oceania", note: "Kureinji people — Aboriginal Australians of Northern Territory; distinctive group; country custodians; hunting traditions." }],
  ["Dadi Dadi", { continent: "Oceania", note: "Dadi Dadi people — Aboriginal Australians of Queensland; distinctive group; hunting and gathering traditions." }],
  ["Kaurna Pangkarra", { continent: "Oceania", note: "Kaurna Pangkarra people — Aboriginal Australians of South Australia; Adelaide region; distinctive language; hunting and gathering." }],
  ["Waka Waka", { continent: "Oceania", note: "Waka Waka people — Aboriginal Australians of Queensland; distinctive group; traditional country dwellers; hunting knowledge." }],
  ["Thaayorre", { continent: "Oceania", note: "Thaayorre people — Aboriginal Australians of Queensland coast; Cape York region; distinctive language; maritime traditions." }],
  ["Yorta Yorta", { continent: "Oceania", note: "Yorta Yorta people — Aboriginal Australians of Victoria and New South Wales; Murray River valley; riverine traditions; fishing knowledge." }],
  ["Ngarigo", { continent: "Oceania", note: "Ngarigo people — Aboriginal Australians of New South Wales; Southern Tablelands; distinctive language; hunting and gathering." }],
  ["Muruwari", { continent: "Oceania", note: "Muruwari people — Aboriginal Australians of New South Wales; western regions; distinctive language; hunting traditions." }],
  ["Mbara", { continent: "Oceania", note: "Mbara people — Aboriginal Australians; distinctive group; traditional country dwellers; hunting practices." }],
  ["Gumbainggir", { continent: "Oceania", note: "Gumbainggir people — Aboriginal Australians of New South Wales; coastal region; distinctive language; maritime and hunting traditions." }],
  ["Yinwum", { continent: "Oceania", note: "Yinwum people — Aboriginal Australians; distinctive group; traditional country dwellers; hunting and gathering knowledge." }],
  ["Barna", { continent: "Oceania", note: "Barna people — Aboriginal Australians; distinctive group; traditional country dwellers; hunting practices." }],
  ["Uutaalnganu", { continent: "Oceania", note: "Uutaalnganu people — Aboriginal Australians; distinctive group; traditional country dwellers; hunting and gathering." }],
  ["Nguri", { continent: "Oceania", note: "Nguri people — Aboriginal Australians; distinctive group; traditional country dwellers; hunting knowledge." }],
  ["Nganyaywana", { continent: "Oceania", note: "Nganyaywana people — Aboriginal Australians; distinctive group; traditional country dwellers; hunting practices." }],
  ["Kalkadoon", { continent: "Oceania", note: "Kalkadoon people — Aboriginal Australians of Queensland; distinctive language; hunting and gathering traditions." }],
  ["Jaitmatang", { continent: "Oceania", note: "Jaitmatang people — Aboriginal Australians; distinctive group; traditional country dwellers; hunting knowledge." }],
  ["Wurundjeri", { continent: "Oceania", note: "Wurundjeri people — Aboriginal Australians of Victoria; Melbourne region; distinctive language; hunting and gathering." }],
  ["Gadubanud", { continent: "Oceania", note: "Gadubanud people — Aboriginal Australians; distinctive group; traditional country dwellers; hunting practices." }],
  ["Ngurraiillam", { continent: "Oceania", note: "Ngurraiillam people — Aboriginal Australians; distinctive group; traditional country dwellers; hunting knowledge." }],
  ["Taungurung", { continent: "Oceania", note: "Taungurung people — Aboriginal Australians of Victoria; Upper Goulburn River region; distinctive language; hunting traditions." }],
  ["Karuwali", { continent: "Oceania", note: "Karuwali people — Aboriginal Australians; distinctive group; traditional country dwellers; hunting practices." }],
  ["Gabalbara", { continent: "Oceania", note: "Gabalbara people — Aboriginal Australians; distinctive group; traditional country dwellers; hunting knowledge." }],
  ["Narangga", { continent: "Oceania", note: "Narangga people — Aboriginal Australians of South Australia; Eyre Peninsula region; distinctive language; hunting traditions." }],
  ["Yuggera", { continent: "Oceania", note: "Yuggera people — Aboriginal Australians of Queensland; Brisbane region; distinctive language; hunting and gathering." }],
  ["Barindji", { continent: "Oceania", note: "Barindji people — Aboriginal Australians of New South Wales; Darling River region; distinctive language; riverine traditions." }],
  ["Bundjalung", { continent: "Oceania", note: "Bundjalung people — Aboriginal Australians of New South Wales; northern coast region; distinctive language; maritime and hunting." }],
  ["Ngunawal", { continent: "Oceania", note: "Ngunawal people — Aboriginal Australians of New South Wales; Canberra and surrounding region; distinctive language; hunting traditions." }],
  ["Mayi-Thakurti", { continent: "Oceania", note: "Mayi-Thakurti people — Aboriginal Australians; distinctive group; traditional country dwellers; hunting knowledge." }],
  ["Teppathiggi", { continent: "Oceania", note: "Teppathiggi people — Aboriginal Australians; distinctive group; traditional country dwellers; hunting practices." }],
  ["Binbinga", { continent: "Oceania", note: "Binbinga people — Aboriginal Australians of Northern Territory; distinctive group; country custodians; hunting knowledge." }],
  ["Gunindiri", { continent: "Oceania", note: "Gunindiri people — Aboriginal Australians; distinctive group; traditional country dwellers; hunting practices." }],
  ["Wargamaygan", { continent: "Oceania", note: "Wargamaygan people — Aboriginal Australians; distinctive group; traditional country dwellers; hunting knowledge." }],
  ["Bandjigali", { continent: "Oceania", note: "Bandjigali people — Aboriginal Australians; distinctive group; traditional country dwellers; hunting practices." }],
  ["Gangulu", { continent: "Oceania", note: "Gangulu people — Aboriginal Australians of Queensland; distinctive group; hunting and gathering traditions." }],
  ["Mayi-Kulan", { continent: "Oceania", note: "Mayi-Kulan people — Aboriginal Australians; distinctive group; traditional country dwellers; hunting knowledge." }],
  ["Kuku-yalanji", { continent: "Oceania", note: "Kuku-yalanji people — Aboriginal Australians of Queensland; north Queensland region; distinctive language; hunting traditions." }],
  ["Mpalitjanh", { continent: "Oceania", note: "Mpalitjanh people — Aboriginal Australians; distinctive group; traditional country dwellers; hunting practices." }],
  ["Yiman", { continent: "Oceania", note: "Yiman people — Aboriginal Australians of New South Wales; southwestern inland region; distinctive language; hunting knowledge." }],
  ["Yitha Yitha", { continent: "Oceania", note: "Yitha Yitha people — Aboriginal Australians of South Australia; lower Murray region; distinctive language; riverine traditions." }],
  ["Boethuk", { continent: "North America", note: "Boethuk — Variant/alternate spelling of Beothuk people; Newfoundland indigenous nation; maritime hunters." }],
  ["Winebago", { continent: "North America", note: "Winebago — Variant/alternate spelling of Winnebago (Ho-Chunk) people; Great Lakes and Wisconsin region." }],
  ["Menomini", { continent: "North America", note: "Menomini — Variant/alternate spelling of Menominee people; Great Lakes Native American nation; Wisconsin region." }],
  ["Tenimo", { continent: "North America", note: "Tenimo — Variant/alternate spelling of Tenino people; Pacific Northwest Native American nation; Columbia River region." }],
  ["Maiou", { continent: "North America", note: "Maiou — Variant or related group to North American indigenous peoples; uncertain classification; possible alternate spelling." }],
  ["Republic of the Seven Zenden", { continent: "Europe", note: "Zenden — Medieval Low Countries political entities; regional councils; federation structure; predecessor to Dutch administrative traditions." }],
  ["Yirandali", { continent: "Oceania", note: "Yirandali people — Aboriginal Australians of Queensland; inland dwellers with hunting and gathering traditions." }],
  ["Western Masurian culture", { continent: "Europe", note: "Western Masurian culture — Baltic Bronze Age culture; archaeological tradition of northeastern European peoples." }],
  ["Palyku", { continent: "Oceania", note: "Palyku people — Aboriginal Australians of the Kimberley region; inland and river region dwellers; complex land traditions." }],
  ["Swedes and Goths", { continent: "Europe", note: "Swedes and Goths — Scandinavian peoples; Germanic peoples of Sweden; traders and Vikings; foundational to Swedish identity." }],
  ["Ngatjumay", { continent: "Oceania", note: "Ngatjumay people — Aboriginal Australians of central Australia; desert dwellers with connection to Uluru region." }],
  ["Nyikina", { continent: "Oceania", note: "Nyikina people — Aboriginal Australians of the Kimberley region; river and coastal dwellers with maritime knowledge." }],
  ["Futa Toro", { continent: "West Africa", note: "Futa Toro — West African state of the Senegal River valley; Islamic sultanate; pastoral and agricultural peoples." }],
  ["Vallabhi", { continent: "Asia", note: "Vallabhi kingdom — Gujarat-based Indian kingdom (6th–8th centuries); Buddhist center; Hindu-Buddhist cultural synthesis." }],
  ["Badimaya", { continent: "Oceania", note: "Badimaya people — Aboriginal Australians of Western Australia; southwestern inland region dwellers." }],
  ["Kunjen", { continent: "Oceania", note: "Kunjen people — Aboriginal Australians of far northeastern Australia; remote tropical region inhabitants." }],
  ["Miami", { continent: "North America", note: "Miami people — Great Lakes and Ohio River valley nation; Algonquian speakers; adaptable traders and warriors." }],
  ["Yokuts", { continent: "North America", note: "Yokuts people — Central Valley California nation; agricultural and hunting peoples; complex trade networks." }],
  ["Zapotec Empire", { continent: "Mesoamerica", note: "Zapotec Empire — Mesoamerican civilization of Oaxaca; sophisticated writing system; urban centers; rivals to Mixtecs." }],
  ["Chiricahua", { continent: "North America", note: "Chiricahua Apache — Southwest Apache nation; mountain dwellers; warriors and raiders; led by Geronimo." }],
  ["Comté de Toulouse", { continent: "Europe", note: "County of Toulouse — medieval European feudal state; Languedoc region; cultural center; eventually integrated into French kingdom." }],
  ["Suomi", { continent: "Europe", note: "Suomi (Finland) — Nordic nation; Finno-Ugric peoples; emerged from Swedish and Russian overlordship; independent republic." }],
  ["Yavapai", { continent: "North America", note: "Yavapai people — Arizona desert nation; southwestern indigenous peoples; adaptable to arid environments." }],
  ["Enets", { continent: "North Asia", note: "Enets people — Arctic Siberian peoples; northern dwellers; reindeer herders of the tundra; Samoyedic language group." }],
  ["Zacatecs", { continent: "North America", note: "Zacatecs people — North-central Mexico indigenous peoples; semi-nomadic desert dwellers; miners and traders." }],
  ["Barunggam", { continent: "Oceania", note: "Barunggam people — Aboriginal Australians of inland Australia; semi-nomadic with specialized knowledge of interior resources." }],
  ["Azerbaijan", { continent: "Asia", note: "Azerbaijan — Caucasus nation; Turkic peoples; oil-rich region; emerged from Persian and Russian overlordship." }],
  ["Pitta-Pitta", { continent: "Oceania", note: "Pitta-Pitta people — Aboriginal Australians of inland Australia; desert nation with connection to songline traditions." }],
  ["Icelandic Commonwealth", { continent: "Europe", note: "Icelandic Commonwealth — medieval Nordic state; island settlement; self-governing republic with ancient assembly (Althing)." }],
  ["Takrur", { continent: "West Africa", note: "Takrur — West African state of the Senegal River; Islamic kingdom; early conversion to Islam; trade connections across Sahara." }],
  ["Polynesians", { continent: "Oceania", note: "Polynesian peoples — vast Pacific island network spanning from Hawaii to New Zealand; maritime navigators; complex chiefdoms and societies." }],
  ["Wergaia", { continent: "Oceania", note: "Wergaia people — Aboriginal Australians of Victoria; inland dwellers; complex kinship and seasonal movement patterns." }],
  ["Wunumara", { continent: "Oceania", note: "Wunumara people — Aboriginal Australians; inland Australia inhabitants with specialized desert knowledge." }],
  ["Birria", { continent: "Oceania", note: "Birria people — Aboriginal Australians of inland Australia; semi-nomadic with hunting and gathering traditions." }],
  ["Mayas", { continent: "Mesoamerica", note: "Maya peoples — Mesoamerican civilization of Yucatan and Central America; sophisticated writing, astronomy, and mathematics; city-states and kingdoms." }],
  ["Amangu", { continent: "Oceania", note: "Amangu people — Aboriginal Australians of inland central Australia; desert nation with connection to Macdonnell Ranges region." }],
  ["Choctaw", { continent: "North America", note: "Choctaw people — Southeastern North American nation; Mississippi Valley dwellers; agricultural peoples; removed to Oklahoma in the Trail of Tears." }],
  ["Wangkumara", { continent: "Oceania", note: "Wangkumara people — Aboriginal Australians of inland Australia; semi-nomadic desert dwellers." }],
  ["Irlanda", { continent: "Europe", note: "Ireland — European island; complex history of Celtic kingdoms, Viking settlement, English conquest, and eventual independence." }],
  ["Ibadan", { continent: "West Africa", note: "Ibadan kingdom — Yoruba state of southwestern Nigeria; major city-state power; cultural and trading center." }],
  ["Gunggari", { continent: "Oceania", note: "Gunggari people — Aboriginal Australians of inland Australia; semi-nomadic with knowledge of water sources and food plants." }],
  ["Wailwan", { continent: "Oceania", note: "Wailwan people — Aboriginal Australians of inland Australia; desert dwellers with strong connection to native resources." }],
  ["Shuar", { continent: "South America", note: "Shuar peoples — Amazonian peoples of Ecuador and Peru; independent warrior culture; known for knowledge of rainforest and plants." }],
  ["Bosporan Kingdom", { continent: "Europe", note: "Bosporan Kingdom — ancient state controlling the Bosporus and Black Sea trade; Greek and Scythian influences; wealth from grain trade." }],
  ["Futa Jalon", { continent: "West Africa", note: "Futa Jalon — West African Islamic state of Guinea highlands; pastoral Fulani peoples; theocratic government; Islamic learning center." }],
  ["Castilla", { continent: "Europe", note: "Castile — medieval Iberian kingdom; driving force of the Reconquista; unified with Aragon to form Spanish monarchy." }],
  ["Keresan", { continent: "North America", note: "Keresan peoples — Pueblo peoples of New Mexico; settled agricultural societies; kachina ceremonies; distinctive architecture and pottery." }],
  ["Oto", { continent: "North America", note: "Oto people — Great Plains Siouan nation; Missouri River valley dwellers; agricultural and hunting peoples; traders." }],
  ["Kaw", { continent: "North America", note: "Kaw people — Great Plains Siouan nation; Missouri River valley dwellers; hunters and traders; European contact brought disease and displacement." }],
  ["Tunica", { continent: "North America", note: "Tunica peoples — Lower Mississippi Valley dwellers; agricultural societies; organized chiefdoms; linguistic group with Yoruban connections." }],
  ["Biloxi", { continent: "North America", note: "Biloxi people — Gulf Coast and Mississippi Delta nation; maritime and river dwellers; traders and hunters." }],
  ["Opata", { continent: "North America", note: "Opata people — Sonora (Mexico) indigenous peoples; agricultural societies; semi-nomadic in river valleys." }],
  ["Tarascan", { continent: "Mesoamerica", note: "Tarascan (Purépecha) Empire — Mesoamerican civilization of western Mexico; rivals to Aztecs; sophisticated metallurgy and political organization." }],
  ["Pirahã", { continent: "South America", note: "Pirahã peoples — Amazonian peoples of Brazil; hunter-gatherers and fishers; unique language and culture distinct from neighboring groups." }],
  ["Abnaki", { continent: "North America", note: "Abenaki people — northeastern North American nation; Maritime woodlands dwellers; Algonquian-speaking confederation; traded with French." }],
  ["Jicarilla", { continent: "North America", note: "Jicarilla Apache — southwestern Apache peoples; mountain and plains dwellers; semi-nomadic hunters and gatherers." }],
  ["Mercia", { continent: "Europe", note: "Mercia — Anglo-Saxon kingdom of central England; major power competing with Wessex; eventually subsumed into unified England." }],
  ["Banjima", { continent: "Oceania", note: "Banjima people — Aboriginal Australians of inland central Australia; semi-nomadic with deep connection to Pilbara region." }],
  ["Namazga", { continent: "Asia", note: "Namazga culture — Bronze Age Central Asian civilization; archaeological culture of the ancient steppes and oases." }],
  ["Wangkamana", { continent: "Oceania", note: "Wangkamana people — Aboriginal Australians of inland Australia; desert dwellers with specialized plant and water knowledge." }],
  ["Kansa", { continent: "North America", note: "Kansa people — Great Plains Siouan nation; Missouri River valley dwellers; agricultural and hunting peoples; originally confederated." }],
  ["Kurrama", { continent: "Oceania", note: "Kurrama people — Aboriginal Australians of the Pilbara region, Western Australia; inland and mountain dwellers." }],
  ["Ballardong", { continent: "Oceania", note: "Ballardong people — Aboriginal Australians of southwestern Western Australia; coastal and inland Noongar nation." }],
  ["Agwarmin", { continent: "Oceania", note: "Agwarmin people — Aboriginal Australians of inland Australia; semi-nomadic with hunting and gathering traditions." }],
  ["Hurrian Kingdoms", { continent: "Asia", note: "Hurrians — Bronze Age peoples of northern Mesopotamia and Syria; established organized kingdoms; influential in ancient Near East." }],
  // Drawn along the South Australian Murray (lon 139.1–142.1, lat -35.2–-33.3), not on
  // Mount Kenya.
  ["Meru", { continent: "Australia", note: "Meru — \"humankind\" in the languages of the River Murray, and the collective name early writers gave the Riverland peoples of the middle Murray: the Ngaiawang, Ngawait and Erawirung." }],
  ["Asturias", { continent: "Europe", note: "Kingdom of Asturias — Christian Iberian kingdom; began the Reconquista against Islamic Al-Andalus; foundation of Portugal and Spain." }],
  ["Dutchy of Benevento", { continent: "Europe", note: "Duchy of Benevento — early medieval Italian state; Lombard principality; rival to papal territories and Byzantine Calabria." }],
  ["Andyamathanha", { continent: "Oceania", note: "Andyamathanha people — Aboriginal Australians of South Australia; mountain and valley dwellers of Flinders Ranges." }],
  ["Jawoyn", { continent: "Oceania", note: "Jawoyn people — Aboriginal Australians of the Northern Territory; inland region dwellers; river valley inhabitants." }],
  ["Anmatyerre", { continent: "Oceania", note: "Anmatyerre people — Aboriginal Australians of central Australia; desert dwellers near MacDonnell Ranges with strong songline connections." }],
  ["Aaniiih", { continent: "North America", note: "Gros Ventre (Aaniiih) — Great Plains Algonquian peoples; nomadic hunters; traders and warriors of northern High Plains." }],
  ["Gros Ventre", { continent: "North America", note: "Gros Ventre (Atsina) — Great Plains nation allied with Blackfoot; northern High Plains dwellers; horse nomads." }],
  ["Nguni", { continent: "Southern Africa", note: "Nguni peoples — Southern African Bantu group; major ethnic family including Zulu, Xhosa, and Swazi; warriors and traders." }],
  ["Fourche Maline Culture", { continent: "North America", note: "Fourche Maline culture — archaeological culture of southeastern U.S.; pre-Mississippian complex societies." }],
  ["Bigambul", { continent: "Oceania", note: "Bigambul people — Aboriginal Australians of inland Australia; semi-nomadic with hunting and gathering knowledge." }],
  ["Yangman", { continent: "Oceania", note: "Yangman people — Aboriginal Australians of inland Australia; desert inhabitants with ceremonial and songline traditions." }],
  ["Danggali", { continent: "Oceania", note: "Danggali people — Aboriginal Australians of inland South Australia; semi-nomadic desert and grassland dwellers." }],
  ["Britany", { continent: "Europe", note: "Brittany — French regional duchy; Celtic culture distinct from France; Breton language and traditions; historically independent." }],
  ["Champa City States", { continent: "Southeast Asia", note: "Champa kingdoms — Hindu-Buddhist Southeast Asian polities of central Vietnam; maritime traders; rivals to Vietnamese expansion." }],
  ["Principality of Kyiv", { continent: "Europe", note: "Principality of Kyiv — early Eastern Slavic state; center of Kievan Rus'; Orthodox Christian culture foundational to Eastern Europe." }],

  /* ---------------------------------------------------------------------------
   * Period names a POLITY_NAME_FOR_ERA remap SHOWS.
   *
   * `polityInfo` resolves the SHOWN name before the raw dataset NAME, so a
   * territory relabelled for its date (Belize → British Honduras, Djibouti →
   * French Somaliland) would otherwise keep the raw name's entry — an
   * era-agnostic blurb about the modern independent state, under a colonial
   * heading. These entries give the shown name its own description.
   *
   * Only names whose entity is the SAME across every era that remaps to them
   * live here; where the period differs materially (Upper Volta in 1945 vs 1960,
   * Dahomey the kingdom vs the French colony) the entry belongs in ERA_OVERRIDES
   * instead, which wins over this map for the era it names.
   * ------------------------------------------------------------------------ */
  // https://en.wikipedia.org/wiki/British_Honduras — renamed Belize 1 June 1973.
  ["British Honduras", { continent: "Central America", note: "British Honduras — the British colony on the Caribbean coast of Central America, long claimed by Guatemala. It was renamed Belize in 1973 and became independent in 1981." }],
  // https://en.wikipedia.org/wiki/Basutoland — renamed Lesotho at independence, 4 Oct 1966.
  ["Basutoland", { continent: "Southern Africa", note: "Basutoland — the Sotho kingdom of Moshoeshoe I under British protection from 1868, ruled separately from South Africa. It became independent as Lesotho in 1966." }],
  // https://en.wikipedia.org/wiki/Nyasaland — renamed Malawi at independence, 6 July 1964.
  ["Nyasaland", { continent: "East Africa", note: "Nyasaland — the British protectorate along Lake Nyasa, joined to the Rhodesias in the Central African Federation from 1953. It became independent as Malawi in 1964." }],
  // https://en.wikipedia.org/wiki/Spanish_Guinea — renamed Equatorial Guinea at independence, 12 Oct 1968.
  ["Spanish Guinea", { continent: "Central Africa", note: "Spanish Guinea — Spain's only colony in sub-Saharan Africa, combining the mainland of Río Muni with the island of Fernando Pó. It became independent as Equatorial Guinea in 1968." }],
  // https://en.wikipedia.org/wiki/French_Somaliland — became the French Territory of the
  // Afars and the Issas in 1967 and independent Djibouti in 1977.
  ["French Somaliland", { continent: "Horn of Africa", note: "French Somaliland — the French port colony on the Gulf of Aden, built around Djibouti city and the railway to Addis Ababa. It was renamed the French Territory of the Afars and the Issas in 1967 and became independent Djibouti in 1977." }],
  // https://en.wikipedia.org/wiki/Trucial_States — federated as the UAE on 2 Dec 1971.
  ["Trucial States", { continent: "Western Asia", note: "The Trucial States — the sheikhdoms of the lower Gulf bound to Britain by the maritime truces of the 19th century. Six federated as the United Arab Emirates in December 1971, joined by Ras al-Khaimah in 1972." }],
  // https://en.wikipedia.org/wiki/French_Congo — Middle Congo (Moyen-Congo) became the
  // Republic of the Congo in 1958.
  ["Middle Congo", { continent: "Central Africa", note: "Middle Congo (Moyen-Congo) — the French territory on the north bank of the Congo, governed from Brazzaville, which was also the capital of French Equatorial Africa. It became the Republic of the Congo in 1958." }],
  // https://en.wikipedia.org/wiki/Aden_Protectorate
  ["Aden Protectorate", { continent: "Western Asia", note: "The Aden Protectorate — the sultanates and sheikhdoms of southern Arabia under British protection, separate from the Zaydi imamate of Yemen to the north. Its territory became South Yemen in 1967 and united with the north in 1990." }],
  // https://en.wikipedia.org/wiki/Western_Samoa — renamed Samoa on 4 July 1997.
  ["Western Samoa", { continent: "Oceania", note: "Western Samoa — the western Samoan islands, a New Zealand mandate from 1920 and independent in 1962, the first Pacific colony to regain independence. It dropped \"Western\" from its name in 1997." }],
  // https://en.wikipedia.org/wiki/German_Samoa — German colony 1900–1914.
  ["German Samoa", { continent: "Oceania", note: "German Samoa — the western Samoan islands, taken by Germany in the 1899 partition that gave the east to the United States. New Zealand forces occupied it in August 1914." }],
  // https://en.wikipedia.org/wiki/Mandatory_Palestine
  ["Mandatory Palestine", { continent: "Western Asia", note: "Mandatory Palestine — the territory Britain governed under a League of Nations mandate from 1920. The mandate ended on 14 May 1948, the day Israel declared independence." }],
  // https://en.wikipedia.org/wiki/North_Macedonia — renamed North Macedonia in Feb 2019
  // under the Prespa agreement with Greece.
  ["Republic of Macedonia", { modernName: "North Macedonia", continent: "Europe", note: "The Republic of Macedonia — independent from Yugoslavia in 1991, and admitted to the UN in 1993 under the provisional name \"the former Yugoslav Republic of Macedonia\" because of Greece's objection. The Prespa agreement settled the dispute in 2019, renaming it North Macedonia." }],
]);

/**
 * Lightweight alias table: dataset NAME → modern country name.
 *
 * For polities whose only useful info is "this is what kids would today call
 * country X" — no need for a curated note. Many post-1815 colonial labels
 * and dataset typos land here. Falls back to the modern flagcdn flag via
 * the loaded Country list.
 *
 * Keys must match dataset NAME values verbatim, including any typos.
 */
export const MODERN_NAME_ALIASES: ReadonlyMap<string, string> = new Map([
  // Dataset names that ARE a modern country under an older or anglicised name.
  // Without these the bare NAME match fails (the country list holds "Türkiye",
  // "Côte d’Ivoire", "Eswatini", "North Macedonia") and the polity fell through to
  // the no-flag branch — the 1994 map showed no flag at all for Türkiye, whose
  // flag has flown since 1844. Each still passes flagExistedInEra(), so an era
  // BEFORE the country's flag existed gets the dated explanation rather than an
  // anachronistic flag (Côte d'Ivoire 1880 → "adopted in 1959"; Macedonia 1994 →
  // "adopted in 1995", which is right: the Vergina Sun flag flew until 1995).
  ["Turkey", "Türkiye"],
  ["Ivory Coast", "Côte d’Ivoire"],
  ["Swaziland", "Eswatini"],
  ["Macedonia", "North Macedonia"],
  // 1914 colonial labels — route to the COLONIAL POWER (whose flag
  // actually flew over the territory at the time), not to the
  // post-independence successor state whose flag is anachronistic.
  ["Anglo-Egyption Sudan", "United Kingdom"],
  ["British East Africa", "United Kingdom"],
  ["British Somaliland", "United Kingdom"],
  ["German E. Africa (Tanganyika)", "German Empire"],
  ["German South-West Africa", "German Empire"],
  ["Italian Somaliland", "Italy"],
  ["Spanish Morocco", "Spain"],
  ["Spanish Sahara", "Spain"],
  ["Rio De Oro", "Spain"],
  ["Madagascar (France)", "France"],
  ["French Equatorial Africa", "France"],
  ["French West Africa", "France"],
  ["Gold Coast", "United Kingdom"],
  ["Togoland", "German Empire"], // 1914 still German (lost 1916, then UK/France mandates)
  ["Kamerun", "German Empire"], // 1914 still German
  ["Rhodesia", "United Kingdom"],
  ["Northern Rhodesia", "United Kingdom"],
  ["Nyasaland", "United Kingdom"],
  ["Arabia (Nejd)", "Saudi Arabia"], // emerging Saudi state — modern flag close enough by ~1932
  ["Nejd", "Saudi Arabia"],
  ["Sakhalin (RU)", "Russian Empire"], // 1914 Russian Empire flag, not modern Russia
  // 1945 occupation / colonial labels — route to the actual occupying /
  // colonial power as of 1945, not the eventual successor.
  ["Angola (Portugal)", "Portugal"],
  ["Guinea-Bissau (Portugal)", "Portugal"],
  ["Mozambique (Portugal)", "Portugal"],
  ["Cyraneica (UK Lybia)", "United Kingdom"], // UK military administration
  ["Tripolitana (UK Lybia)", "United Kingdom"],
  ["Fezzan (Frech Lybia)", "France"], // French military administration
  ["Germany (France)", "Germany"], // French zone — modern German flag is approximately the post-1949 West German one
  ["Germany (Soviet)", "Germany"],
  ["Germany (UK)", "Germany"],
  ["Germany (USA)", "Germany"],
  ["East Germany", "Germany"], // GDR flag had the coat of arms; modern flag is approximation
  ["West Germany", "Germany"],
  ["Jamaica (UK)", "United Kingdom"], // British colony in 1945
  ["Japan (USA)", "Japan"], // occupied Japan still flew the Hinomaru
  ["Martinique (France)", "France"],
  // Cochin China / Tonkin / Annam in 1945 represent the French-Indochinese
  // portions just before / during the Viet Minh independence declaration.
  // For accuracy in 1945, route to France (the de jure power was still
  // French Indochina until Sep 1945).
  ["Cochin China", "France"],
  ["Tonkin", "France"],
  ["Annam", "France"],
  ["Southern Cameroon", "United Kingdom"], // British Cameroons mandate
  // Korea (USA)/(USSR), Saar Protectorate, Manchuria 1945 — handled via
  // ERA_OVERRIDES below (need flag-less treatment or curated ROC flag).
  // 1815 — only map names that are genuinely the same polity as a modern
  // country (just renamed/translated). Anything that was a colony, vassal,
  // or independent pre-modern state is OMITTED on purpose so the panel
  // shows a "no flag image" placeholder rather than an anachronistic flag.
  // We DO route colonies to the colonising power's modern flag where that
  // is historically accurate (it really WAS their flag).
  // 1815 Ottoman regencies — flag was the Ottoman flag, NOT modern
  // Algeria/Tunisia/Libya. Best handled as no-flag rather than wrong-flag.
  // (Removed: Algiers/Tunis/Tripolitania/Cyrenaica aliases.)
  // British colonies in 1815 → Union Jack (correct):
  ["Cape Colony", "United Kingdom"],
  ["British East India Company", "United Kingdom"],
  // Portuguese colonies in 1815 → in this app we route to the UKPBA flag
  // via registry entries, because mainland Portugal didn't fly the modern
  // red-green flag until 1911. See POLITY_REGISTRY for these.
  // Viceroyalty of Brazil — handled by an explicit registry entry below
  // because in 1815 the flag was the United Kingdom of Portugal, Brazil
  // and the Algarves banner (a blue armillary sphere on white), NOT the
  // modern red/green Portuguese flag. See POLITY_REGISTRY.
  ["Vice-Royalty of New Granada", "Spain"],
  ["Vice-Royalty of New Spain", "Spain"],
  ["Vice-Royalty of Peru", "Spain"],
  // Independent African / Asian / Indian polities in 1815 — these had their
  // own kingdoms / cultures and DID NOT use the modern country flag. Better
  // to show no flag than the wrong one. Intentionally omitted:
  //   Asante, Oyo, Bornu-Kanem, Mossi States, Buganda, Bunyoro, Zanzibar,
  //   Lozi, Lunda, Xhosa, Zulu, Sotho, Hong Kong (Qing China then),
  //   Kingdom of Hawaii, Republic of Kraków, Indian princely states,
  //   Arakan, Malaya, United Provinces of La Plata (mid-revolution).
  // German and Italian pre-unification states (1815): intentionally NOT
  // aliased. Each had its own flag — modern Germany / Italy are anachronistic
  // (those countries didn't exist yet, 1871 and 1861 respectively). Showing
  // no flag is more honest. Same reasoning excludes Papal States, Kingdom
  // of Sardinia, Kingdom of the Two Sicilies, etc.
  // 1500/1700 European names — DELIBERATELY SPARSE.
  // Pre-modern kingdoms had their own heraldry that bears no resemblance
  // to modern flags. England (1500) flew the Cross of St George, not the
  // Union Jack; Castile a castle banner; Denmark-Norway the Dannebrog —
  // OK that one is fine. Most intentionally omitted to avoid showing the
  // modern flag for the wrong era.
  ["Denmark-Norway", "Denmark"], // Dannebrog has been Denmark's flag since the 14th c.
  ["Mongolia", "Mongolia"],
  ["Japan", "Japan"], // 1700 Tokugawa used various banners but the Hinomaru is older than most
  // Persia — pre-1933 name for Iran. Qajar dynasty used the Lion and Sun banner
  // from at least the 18th century; the modern Islamic Republic flag came only in 1980.
  // For eras where "Persia" appears but no era-specific override exists, route to
  // Iran's flag (Lion and Sun is closer than the modern green-white-red).
  ["Persia", "Iran"],
  // Misc — only modern names or near-equivalents that genuinely match today.
  // Hainan in pre-modern eras was Qing/Ming Chinese — no flag in modern
  // sense. For 1914+ era it appears subsumed into China. Drop alias.
  // Hejaz was Ottoman vassal until 1916; the modern Saudi flag is post-1932
  // and visually distinct from the Hashemite/Sharifian/Ottoman banners.
  // Drop alias — leave flag-less for the relevant eras.
  // Yemen — modern flag adopted 1990 (post-unification); pre-1990 was the
  // YAR + PDRY split. For 1300/1500/1815/1945 the modern flag is wrong.
  // Drop alias — leave flag-less; 1960 YAR/PDRY handled separately if needed.

  // 1700-era colonial territories → route to the colonial power that actually
  // flew its national flag over these territories.
  ["Cuba (Spain)", "Spain"],
  ["Hispaniola (Spain)", "Spain"],
  ["Florida", "Spain"],       // Spanish Florida (1700)
  ["Virginia", "United Kingdom"],
  ["South Carolina", "United Kingdom"],
  ["Massachusetts Bay", "United Kingdom"],
  ["Dutch East Indies", "Netherlands"],
  ["Surinam", "Netherlands"],
  ["Essequibo", "Netherlands"],
  ["Cayenne", "France"],
  ["Portuguese East Africa", "Portugal"],
  ["Portuguese Guinea", "Portugal"],
  // Delagoa Bay was a Portuguese trading post — flag: UKPBA entry in 1815 registry
  // handles this already for 1815+. For 1700 fall through to noFlag.
  // "Dutch Formosa" and "Dutch Brazil" were historical (ended before 1700)
  // so they are dataset anachronisms; route to Netherlands as closest.
  ["Dutch Formosa", "Netherlands"],
  ["Dutch Brazil", "Netherlands"],
  // Lan Na — northern Thai kingdom, essentially absorbed by Ayutthaya.
  // No standardised flag; leave flag-less via missing-entry behaviour.
  // Laotian states — multiple Lao principalities in 1700; no unified flag.
]);

/**
 * Era-specific overrides — checked BEFORE the global POLITY_REGISTRY.
 *
 * Use when the same polity NAME means different flags across eras. The
 * canonical case is "France": Bourbon white flag in 1500/1700/1815, the
 * tricolour from 1830 onwards. Without an override the global registry
 * would have to pick one, which is wrong for the others.
 *
 * Era keys must match Era["id"] values. Only the ENTRY's eraId triggers
 * the override; the registry fallback still runs for every other era.
 */
const ERA_OVERRIDES: ReadonlyMap<Era["id"], ReadonlyMap<string, PolityInfo>> = new Map([
  // === 2000 BC (Bronze Age) overrides ========================================
  ["bc2000", new Map<string, PolityInfo>([
    ["Egyptian Middle Kingdom", { continent: "North Africa / Eastern Mediterranean", noFlag: true, note: "Egyptian Middle Kingdom — established dynasty controlling the Nile valley; Mentuhotep II reunified Egypt.", population: 3_000_000 }],
    ["Indus Valley Civilization", { continent: "South Asia", noFlag: true, note: "Indus Valley Civilization — sophisticated urban culture in the Indian subcontinent (Harappa, Mohenjo-daro).", population: 4_000_000 }],
    ["Akkadian Empire", { continent: "Western Asia", noFlag: true, note: "Post-Akkadian period in Mesopotamia — fragmented into city-states after Akkadian collapse; Ur-III city-states.", population: 2_000_000 }],
    ["Minoan Civilization", { continent: "Eastern Mediterranean", noFlag: true, note: "Minoan Civilization on Crete — Bronze Age maritime culture; palace centers at Knossos.", population: 500_000 }],
    ["Nubian Kingdom", { continent: "Northeast Africa", noFlag: true, note: "Nubian Kingdom (Kush) in 2000 BC — trading power; interactions with Egypt.", population: 1_000_000 }],
    ["Assyrian Kingdom", { continent: "Western Asia", noFlag: true, note: "Old Assyrian Kingdom — rising power in northern Mesopotamia.", population: 1_000_000 }],
    ["Kingdom of Ebla", { continent: "Western Asia", noFlag: true, note: "Kingdom of Ebla in Syria — city-state and trading power; early urban center.", population: 200_000 }],
    ["Mari", { continent: "Western Asia", noFlag: true, note: "Kingdom of Mari on the Euphrates — important city-state and trading center.", population: 300_000 }],
    ["Syria/Damascus", { continent: "Western Asia", noFlag: true, note: "Syria/Damascus region — various city-states competing for control.", population: 400_000 }],
    ["Kingdom of Ugarit", { continent: "Western Asia", noFlag: true, note: "Kingdom of Ugarit — major Levantine trading city-state.", population: 300_000 }],
    ["Xia Dynasty (traditional)", { continent: "East Asia", noFlag: true, note: "Xia Dynasty (traditional/legendary) in China — earliest Chinese dynasty in traditional history.", population: 5_000_000 }],
    ["Troy", { continent: "Western Asia", noFlag: true, note: "Kingdom of Troy in Anatolia — city-state; later immortalized in Homer's epics.", population: 100_000 }],
  ])],

  // === 500 BC (Classical Antiquity) overrides ================================
  ["bc500", new Map<string, PolityInfo>([
    ["Classical Greece", { continent: "Southern Europe / Eastern Mediterranean", noFlag: true, note: "Classical Greek city-states — height of the Classical period; Persian Wars; Athens at peak of power.", population: 2_000_000 }],
    ["Persian Empire", { continent: "Western Asia / North Africa / Eastern Mediterranean", noFlag: true, note: "Achaemenid Persian Empire — greatest empire of the ancient world under Darius I; from Egypt to India.", population: 50_000_000 }],
    ["Kingdom of Magadha", { continent: "South Asia", noFlag: true, note: "Kingdom of Magadha in India — rising power in eastern India; Maurya dynasty would emerge from this region.", population: 5_000_000 }],
    ["Warring States China", { continent: "East Asia", noFlag: true, note: "Warring States period China — Zhou Dynasty fractured; various states competing for dominance.", population: 20_000_000 }],
    ["Roman Republic", { continent: "Southern Europe", noFlag: true, note: "Roman Republic in its early period — expanding from the Italian peninsula.", population: 1_000_000 }],
    ["Carthaginian Republic", { continent: "North Africa / Western Mediterranean", noFlag: true, note: "Carthaginian Republic — major Phoenician trading power centered in North Africa.", population: 1_500_000 }],
    ["Etruscan Confederation", { continent: "Southern Europe", noFlag: true, note: "Etruscan city-states in Italy — pre-Roman Italian culture; gradually absorbed by Rome.", population: 500_000 }],
    ["Nubian Kingdoms", { continent: "Northeast Africa", noFlag: true, note: "Nubian Kingdoms in the upper Nile valley — trade partners and rivals with Egypt.", population: 2_000_000 }],
    // Greek City-States
    ["Athens", { continent: "Southern Europe", noFlag: true, note: "City-state of Athens in Classical period — height of Athenian power under Pericles; birthplace of democracy.", population: 300_000 }],
    ["Sparta", { continent: "Southern Europe", noFlag: true, note: "City-state of Sparta in Classical period — military superpower of Greece; oligarchic warrior society.", population: 250_000 }],
    ["Corinth", { continent: "Southern Europe", noFlag: true, note: "City-state of Corinth in Classical period — major trading center; wealthy commercial city.", population: 100_000 }],
    ["Thebes", { continent: "Southern Europe", noFlag: true, note: "City-state of Thebes — Central Greek power; competing with Athens and Sparta.", population: 80_000 }],
    ["Syracuse", { continent: "Southern Europe", noFlag: true, note: "City-state of Syracuse on Sicily — Greek colony; major Mediterranean power.", population: 150_000 }],
    ["Rhodes", { continent: "Southern Europe / Eastern Mediterranean", noFlag: true, note: "Island city-state of Rhodes — Greek trading power in the Eastern Mediterranean.", population: 60_000 }],
    ["Delphi", { continent: "Southern Europe", noFlag: true, note: "Religious city-state of Delphi — sanctuary and trading center; seat of the Oracle.", population: 30_000 }],
    // Persian Satrapies/Regions
    ["Lydia", { continent: "Western Asia", noFlag: true, note: "Satrapy of Lydia in Persian Empire — wealthy region in Anatolia; kingdom before Persian conquest.", population: 1_000_000 }],
    ["Phrygia", { continent: "Western Asia", noFlag: true, note: "Satrapy of Phrygia in Persian Empire — region in Anatolia.", population: 500_000 }],
    ["Cilicia", { continent: "Western Asia", noFlag: true, note: "Satrapy of Cilicia in Persian Empire — Mediterranean coastal region in Anatolia.", population: 400_000 }],
    ["Egypt (Satrapy)", { continent: "North Africa", noFlag: true, note: "Egypt under Persian rule in 500 BC — satrapy of the Achaemenid Empire; recently reconquered by Cambyses II.", population: 5_000_000 }],
    ["Babylon", { continent: "Western Asia", noFlag: true, note: "Babylon in Persian Empire — major city; administrative center; under Achaemenid rule.", population: 1_500_000 }],
    // Indian Kingdoms Beyond Magadha
    ["Nanda Empire", { continent: "South Asia", noFlag: true, note: "Nanda Empire in ancient India — rising power; precedes the Mauryan Empire.", population: 10_000_000 }],
    ["Chola Empire", { continent: "South Asia", noFlag: true, note: "Chola Empire in southern India — Tamil kingdom; major regional power in the south.", population: 3_000_000 }],
    ["Pandya Kingdom", { continent: "South Asia", noFlag: true, note: "Pandya Kingdom in southern India — Tamil kingdom; trading power.", population: 2_000_000 }],
    ["Mauryan Empire (earlier)", { continent: "South Asia", noFlag: true, note: "Pre-Mauryan kingdoms in India — various powers before Ashoka's great empire.", population: 5_000_000 }],
    // Chinese Warring States (specific states)
    ["State of Chu", { continent: "East Asia", noFlag: true, note: "Chu state in Warring States China — major southern power; competing for dominance.", population: 5_000_000 }],
    ["State of Qi", { continent: "East Asia", noFlag: true, note: "Qi state in Warring States China — major eastern power.", population: 4_000_000 }],
    ["State of Yan", { continent: "East Asia", noFlag: true, note: "Yan state in Warring States China — northern frontier state.", population: 2_000_000 }],
    ["State of Zhao", { continent: "East Asia", noFlag: true, note: "Zhao state in Warring States China — northern power.", population: 3_000_000 }],
    // Mediterranean and Atlantic
    ["Iberian tribes", { continent: "Western Europe", noFlag: true, note: "Iberian peoples on the Iberian Peninsula — various tribal confederations; not yet unified.", population: 2_000_000 }],
    ["Celtic tribes (Gaul)", { continent: "Western Europe", noFlag: true, note: "Celtic peoples in Gaul (modern France) — diverse tribal societies; not yet unified.", population: 5_000_000 }],
    ["Celtic tribes (Britain)", { continent: "Northern Europe", noFlag: true, note: "Celtic peoples in Britain — tribal societies; Iron Age culture.", population: 500_000 }],
    ["Germanic tribes", { continent: "Northern Europe", noFlag: true, note: "Germanic peoples in Central/Northern Europe — tribal societies; not yet unified.", population: 3_000_000 }],
    // African Kingdoms
    ["Axumite Kingdom", { continent: "East Africa", noFlag: true, note: "Axumite Kingdom in Ethiopia/Eritrea region — rising power; eventual rival to Rome and Persia.", population: 2_000_000 }],
    ["Meroe Kingdom", { continent: "Northeast Africa", noFlag: true, note: "Meroe Kingdom in Sudan — Nubian kingdom; trading power on the Nile.", population: 1_000_000 }],
    ["Saba Kingdom", { continent: "Western Asia", noFlag: true, note: "Saba Kingdom in Arabia — trading power in southwestern Arabia (Yemen region).", population: 500_000 }],
    ["Nabataean Kingdom", { continent: "Western Asia", noFlag: true, note: "Nabataean Kingdom in Arabia — rising trade power; controls desert trade routes.", population: 400_000 }],
  ])],

  // === 323 BC (Hellenistic Age) overrides ===================================
  ["bc323", new Map<string, PolityInfo>([
    ["Macedonian Empire", { continent: "Southern Europe / Western Asia / North Africa", noFlag: true, note: "Macedonian Empire under Alexander the Great's successors — fragmented after his death; Seleucid, Ptolemaic, Antigonid kingdoms.", population: 30_000_000 }],
    ["Seleucid Empire", { continent: "Western Asia / Central Asia", noFlag: true, note: "Seleucid Empire — Hellenistic state controlling much of Alexander's Asian conquests; capital Antioch.", population: 20_000_000 }],
    ["Ptolemaic Egypt", { continent: "North Africa / Eastern Mediterranean", noFlag: true, note: "Ptolemaic Kingdom of Egypt — Hellenized Greek dynasty ruling Egypt; one of the most powerful Hellenistic states.", population: 8_000_000 }],
    ["Antigonid Macedonia", { continent: "Southern Europe", noFlag: true, note: "Antigonid Kingdom of Macedonia — Hellenistic Macedonian state; power base in Greece.", population: 2_000_000 }],
    ["Maurya Empire", { noFlagReason: "No flag shown — Mauryan sources describe royal and army standards bearing animal and wheel emblems; no flag of the empire survives.", continent: "South Asia", noFlag: true, note: "Maurya Empire under Ashoka — dominant Indian empire established shortly after Alexander's invasion; Ashoka's reign (268-232 BC) was the peak.", population: 50_000_000 }],
    ["Greek city-states", { continent: "Southern Europe / Eastern Mediterranean", noFlag: true, note: "Independent Greek city-states and leagues — Athens, Sparta, Corinth, and others; still politically autonomous but weakened.", population: 3_000_000 }],
    ["Roman Republic", { continent: "Southern Europe", noFlag: true, note: "Roman Republic — expanding influence; beginning to dominate the Mediterranean.", population: 4_000_000 }],
    ["Carthaginian Republic", { continent: "North Africa / Western Mediterranean", noFlag: true, note: "Carthaginian Republic — at height of power; major naval force; rivalry with Rome beginning.", population: 2_000_000 }],
    ["Parthian Kingdom", { continent: "Western Asia / Central Asia", noFlag: true, note: "Parthian Kingdom — emerging power in Persia; would grow to rival Rome.", population: 5_000_000 }],
    ["Athens", { continent: "Southern Europe", noFlag: true, note: "City-state of Athens — independent but reduced power after losing hegemony; major cultural center.", population: 250_000 }],
    ["Sparta", { continent: "Southern Europe", noFlag: true, note: "City-state of Sparta — still influential military power; oligarchic warrior state.", population: 200_000 }],
    ["Corinth", { continent: "Southern Europe", noFlag: true, note: "City-state of Corinth — trading center; recovered from earlier destruction.", population: 150_000 }],
    ["Thebes", { continent: "Southern Europe", noFlag: true, note: "City-state of Thebes — Central Greek power; competing with Athens and Sparta.", population: 120_000 }],
    ["Rhodes", { continent: "Southern Europe / Eastern Mediterranean", noFlag: true, note: "Island city-state of Rhodes — major Hellenistic trading power; famous for naval strength.", population: 100_000 }],
    ["Syracuse", { continent: "Southern Europe", noFlag: true, note: "City-state of Syracuse on Sicily — Greek colony; Hellenistic power in the western Mediterranean.", population: 200_000 }],
    ["Aetolian League", { continent: "Southern Europe", noFlag: true, note: "Aetolian League in Greece — federal alliance of city-states; rising power in Hellenistic Greece.", population: 500_000 }],
    ["Achaean League", { continent: "Southern Europe", noFlag: true, note: "Achaean League in Greece — confederation of southern Greek city-states; rising power.", population: 400_000 }],
    ["Pergamum", { continent: "Western Asia", noFlag: true, note: "Pergamum in Anatolia — Hellenistic city-state; major power rising under the Attalids.", population: 300_000 }],
    ["Cappadocia", { continent: "Western Asia", noFlag: true, note: "Kingdom of Cappadocia under Hellenistic influence — Anatolian kingdom; subject to Seleucid overlordship.", population: 1_000_000 }],
    ["Pontus", { continent: "Western Asia", noFlag: true, note: "Kingdom of Pontus on the Black Sea — Hellenistic kingdom; would grow to rival Rome and Egypt.", population: 1_500_000 }],
    ["Bithynia", { continent: "Western Asia", noFlag: true, note: "Kingdom of Bithynia in Anatolia — Hellenistic Anatolian kingdom.", population: 800_000 }],
    ["Armenia", { continent: "Western Asia", noFlag: true, note: "Kingdom of Armenia — emerging as independent Hellenistic power under Artaxiad dynasty.", population: 1_200_000 }],
    ["Bactrian Kingdom", { continent: "Central Asia", noFlag: true, note: "Bactrian Kingdom in Central Asia — Hellenistic kingdom controlling the Silk Road; major power in the east.", population: 2_000_000 }],
    ["Indo-Greek Kingdoms", { continent: "Central Asia / South Asia", noFlag: true, note: "Indo-Greek Kingdoms in Afghanistan and northern India — blend of Greek and Indian cultures.", population: 2_500_000 }],
    ["Galatian Kingdom", { continent: "Western Asia", noFlag: true, note: "Galatian Kingdom in Anatolia — Celtic tribe settlement; independent tribal confederation.", population: 500_000 }],
    ["Celtic tribes (Gaul)", { continent: "Western Europe", noFlag: true, note: "Celtic peoples in Gaul — diverse independent tribes; not yet unified; occasional contacts with Hellenistic world.", population: 5_000_000 }],
    ["Celtic tribes (Britain)", { continent: "Northern Europe", noFlag: true, note: "Celtic peoples in Britain — tribal societies; Iron Age culture; isolated from Mediterranean.", population: 500_000 }],
    ["Iberian tribes", { continent: "Western Europe", noFlag: true, note: "Iberian peoples on Iberian Peninsula — various tribal confederations; not yet unified.", population: 2_000_000 }],
    ["Germanic tribes", { continent: "Northern Europe", noFlag: true, note: "Germanic peoples in Central/Northern Europe — tribal societies; limited contact with Hellenistic world.", population: 3_000_000 }],
    ["Nubian Kingdoms", { continent: "Northeast Africa", noFlag: true, note: "Nubian Kingdoms in upper Nile valley — independent powers; trade partners and rivals with Ptolemaic Egypt.", population: 2_000_000 }],
    ["Axumite Kingdom", { continent: "East Africa", noFlag: true, note: "Axumite Kingdom in Ethiopia — rising power; eventual rival to Rome and Egypt.", population: 1_500_000 }],
    ["Saba Kingdom", { continent: "Western Asia", noFlag: true, note: "Saba Kingdom in Arabia — trading power in southwestern Arabia; rising merchant state.", population: 600_000 }],
    ["Nabataean Kingdom", { continent: "Western Asia", noFlag: true, note: "Nabataean Kingdom in Arabia — rising desert trade power; controls trade routes.", population: 500_000 }],
    ["Chola Empire", { continent: "South Asia", noFlag: true, note: "Chola Empire in southern India — major Tamil kingdom; contemporary with Maurya; wealthy trading power.", population: 3_000_000 }],
    ["Pandya Kingdom", { continent: "South Asia", noFlag: true, note: "Pandya Kingdom in southern India — Tamil kingdom; trading power; competing with Chola.", population: 2_000_000 }],
    ["Seleucid Satrapies (Levant)", { continent: "Western Asia", noFlag: true, note: "Levantine satrapies under Seleucid rule — including Syria, Phoenicia, and Palestinian regions.", population: 2_000_000 }],
    ["Ptolemaic Satrapies (Mediterranean)", { continent: "Eastern Mediterranean / North Africa", noFlag: true, note: "Mediterranean holdings of Ptolemaic Egypt — including Cyprus and Aegean territories.", population: 1_500_000 }],
    ["Egyptian Regions", { continent: "North Africa", noFlag: true, note: "Upper and Lower Egyptian regions under Ptolemaic rule — administratively organized provinces.", population: 4_000_000 }],
  ])],

  // === 100 AD (Roman Classical Period) overrides ============================
  ["ad100", new Map<string, PolityInfo>([
    ["Roman Empire", { flag: "historical-flags/roman-empire.png", continent: "Europe / Western Asia / North Africa", note: "Roman Empire under Trajan — at its greatest territorial extent after the conquest of Dacia (106 AD). Capital Rome.", population: 70_000_000 }],
    ["Parthian Empire", { continent: "Western Asia", noFlag: true, note: "Parthian Empire — dominant power in Persia and Central Asia, rival to Rome. Capital Ctesiphon.", population: 15_000_000 }],
    ["Han Dynasty", { noFlagReason: "No flag shown — Han armies carried silk banners identifying each unit and commander. China had no national flag at all until the Qing adopted the dragon banner in 1862.", continent: "East Asia", noFlag: true, note: "Han Dynasty China during the Eastern Han period — politically fragmented but culturally unified under the Han.", population: 55_000_000 }],
    ["Kushan Empire", { continent: "Central Asia / South Asia", noFlag: true, note: "Kushan Empire — controlled the Silk Road from Central Asia through northern India; Kanishka (127-150 AD) was a great patron of Buddhism.", population: 20_000_000 }],
    ["Satavahana Empire", { continent: "South Asia", noFlag: true, note: "Satavahana Empire of southern India — contemporaneous with the Kushans in northern India; controlled major sea trade routes.", population: 15_000_000 }],
    ["Axum Kingdom", { continent: "East Africa", noFlag: true, note: "Axumite Kingdom in the Horn of Africa — rising power controlling Red Sea trade; later became a Christian empire (4th century).", population: 3_000_000 }],
    ["Meroe Kingdom", { continent: "Northeast Africa", noFlag: true, note: "Kingdom of Meroe in Nubia — Kushite civilization in the Upper Nile valley; predecessor to later Nubian kingdoms.", population: 1_000_000 }],
    ["Koguryo", { continent: "East Asia", noFlag: true, note: "Koguryo Kingdom (Goguryeo) on the Korean peninsula — one of the Three Kingdoms of Korea, controlling northern territories.", population: 3_000_000 }],
    ["Paekche", { continent: "East Asia", noFlag: true, note: "Paekche Kingdom (Baekje) on the Korean peninsula — one of the Three Kingdoms, controlling southwestern territories.", population: 1_500_000 }],
    ["Silla", { continent: "East Asia", noFlag: true, note: "Silla Kingdom on the Korean peninsula — one of the Three Kingdoms, controlling southeastern territories.", population: 1_000_000 }],
    ["Bengal Kingdoms", { continent: "South Asia", noFlag: true, note: "Bengal Kingdoms in eastern India — including Vakataka and other regional powers; politically fragmented region.", population: 8_000_000 }],
    ["Chola / Pandya kingdoms", { continent: "South Asia", noFlag: true, note: "Chola and Pandya kingdoms in South India — Cholas rising to prominence, rivals to the Satavahanas.", population: 5_000_000 }],
    ["Arakan Kingdom", { continent: "Southeast Asia", noFlag: true, note: "Arakan Kingdom in Burma — Indian-influenced kingdom with Brahmanical culture; precursor to later Burmese states.", population: 1_000_000 }],
    ["Teotihuacán", { continent: "Mesoamerica", noFlag: true, note: "Teotihuacán city-state in Mesoamerica — greatest city in the Americas at this period (peak ~200-600 AD).", population: 200_000 }],
    ["Moche Civilization", { continent: "South America", noFlag: true, note: "Moche civilization on the Peruvian coast — sophisticated ceramic artisans; pre-Inca Andean power.", population: 500_000 }],
    ["Nabatean Kingdom", { continent: "Western Asia", noFlag: true, note: "Nabatean Kingdom in Arabia — controlled trade routes from Arabia to the Mediterranean; centered at Petra.", population: 400_000 }],
    ["Himyarite Kingdom", { continent: "Western Asia", noFlag: true, note: "Himyarite Kingdom in South Arabia (Yemen) — major Arabian power controlling spice trade.", population: 1_000_000 }],
    ["Hadramaut Kingdom", { continent: "Western Asia", noFlag: true, note: "Hadramaut Kingdom in South Arabia — wealthy trading kingdom in the Arabian peninsula.", population: 500_000 }],
    ["Bosporian Kingdom", { continent: "Northern Europe / Western Asia", noFlag: true, note: "Bosporian Kingdom on the Black Sea Strait — client state of Rome; wealthy trading center.", population: 200_000 }],
    ["Dacia", { continent: "Eastern Europe", noFlag: true, note: "Kingdom of Dacia north of the Danube — independent kingdom until the Roman conquest under Trajan (106 AD).", population: 1_500_000 }],
    ["Germanic Tribes", { continent: "Northern Europe", noFlag: true, note: "Germanic tribes (Marcomanni, Quadi, Alemanni) in Central and Northern Europe — not yet unified; major threat to Rome.", population: 5_000_000 }],
    ["Celtic Tribes", { continent: "Western Europe", noFlag: true, note: "Celtic tribes in Gaul and western regions — independent kingdoms and tribes; fiercely independent culture.", population: 3_000_000 }],
    ["Caledonian Tribes", { continent: "Northern Europe", noFlag: true, note: "Caledonian tribes in Scotland — fierce warriors; resisted Roman expansion under Agricola (83–84 AD).", population: 1_000_000 }],
    ["Lusitanian Kingdom", { continent: "Iberia", noFlag: true, note: "Lusitania in Iberia (modern Portugal) — under Roman rule since 139 BC but maintaining distinct Lusitanian culture.", population: 2_000_000 }],
    ["Galatian Kingdom", { continent: "Anatolia", noFlag: true, note: "Galatian Kingdom in Anatolia (modern Turkey) — Celtic tribe settled in Asia Minor; Roman client state.", population: 500_000 }],
    ["Jewish Kingdoms", { continent: "Levant", noFlag: true, note: "Jewish Kingdoms in Palestine/Judea — Roman province (annexed 63 BC); maintained distinct Jewish cultural identity.", population: 2_000_000 }],
    ["Palmyrene Empire", { continent: "Syria", noFlag: true, note: "Palmyrene Kingdom in Syria — wealthy desert trading city under Roman suzerainty; controlled caravan routes.", population: 200_000 }],
    ["Roman Egypt", { continent: "North Africa", noFlag: true, note: "Egypt as Roman province — major grain producer for Rome; center of Hellenistic culture in North Africa.", population: 8_000_000 }],
    ["Numidia", { continent: "North Africa", noFlag: true, note: "Kingdom of Numidia in Algeria — Roman client state; granary of Rome; center of Libyan civilization.", population: 3_000_000 }],
    ["Mauretania", { continent: "North Africa", noFlag: true, note: "Kingdom of Mauretania in northwest Africa — Roman client state; wealthy trading power on the Atlantic coast.", population: 2_000_000 }],
    ["Berber Kingdoms", { continent: "North Africa", noFlag: true, note: "Berber Kingdoms in North Africa — independent regional powers; maintained distinct culture and trade networks.", population: 5_000_000 }],
    ["Pontic Kingdom", { continent: "Western Asia", noFlag: true, note: "Kingdom of Pontus in Asia Minor — wealthy kingdom on the Black Sea; conquered by Rome in 64 BC but still culturally distinct.", population: 1_500_000 }],
    ["Sarmatian Confederation", { continent: "Central Asia", noFlag: true, note: "Sarmatian Confederation on the steppes — nomadic warrior confederation; rivals to the Scythians.", population: 3_000_000 }],
    ["Bactrian Kingdom", { continent: "Central Asia", noFlag: true, note: "Bactrian Kingdom (Greco-Bactrian) in Central Asia — Hellenistic kingdom controlling the upper Silk Road.", population: 2_000_000 }],
    ["Indo-Greek Kingdoms", { continent: "Central Asia", noFlag: true, note: "Indo-Greek Kingdoms in Afghanistan and northern India — blend of Greek and Indian cultures; active in Silk Road trade.", population: 3_000_000 }],
    ["Sabaean Kingdom", { continent: "Arabia", noFlag: true, note: "Sabaean Kingdom in South Arabia (Yemen) — wealthy trading power controlling the incense routes; capital Marib.", population: 1_500_000 }],
    ["Nubian Kingdoms", { continent: "Northeast Africa", noFlag: true, note: "Nubian Kingdoms in Upper Nile valley — distinct from Meroe; independent regional powers with their own dynasties.", population: 2_000_000 }],
    ["Somali Port Cities", { continent: "East Africa", noFlag: true, note: "Somali port cities on the East African coast — trading centers connected to Indian Ocean commerce networks.", population: 500_000 }],
    ["Swahili Trading States", { continent: "East Africa", noFlag: true, note: "Early Swahili trading states on the East African coast — centers of Indian Ocean trade and cultural exchange.", population: 1_000_000 }],
    ["Funan Kingdom", { continent: "Southeast Asia", noFlag: true, note: "Funan Kingdom in Cambodia/Southeast Asia — major maritime trading power controlling the Gulf of Siam.", population: 1_000_000 }],
    ["Champa Kingdom", { continent: "Southeast Asia", noFlag: true, note: "Champa Kingdom in Vietnam — Hindu-Buddhist kingdom; important maritime trader in Southeast Asia.", population: 800_000 }],
    ["Yayoi Culture", { continent: "East Asia", noFlag: true, note: "Yayoi Culture in Japan — transitional period before classical Japanese civilization; introduced wet-rice farming.", population: 2_000_000 }],
    ["Siamese Kingdoms", { continent: "Southeast Asia", noFlag: true, note: "Early Siamese/Thai kingdoms in Thailand — precursors to the Sukhothai and Ayutthaya kingdoms.", population: 2_000_000 }],
    ["Maya City-States", { continent: "Mesoamerica", noFlag: true, note: "Maya city-states in Mesoamerica — flourishing during the Classic period; Tikal, Palenque, and major centers at peak.", population: 5_000_000 }],
    ["Paracas Culture", { continent: "South America", noFlag: true, note: "Paracas Culture in Peru — pre-Inca Andean civilization; renowned for textiles and distinctive trophy heads.", population: 500_000 }],
    ["Illyrian Kingdoms", { continent: "Balkans", noFlag: true, note: "Illyrian Kingdoms in the Balkans — independent kingdoms; gradually coming under Roman control.", population: 1_000_000 }],
    ["Thracian Kingdoms", { continent: "Balkans", noFlag: true, note: "Thracian Kingdoms in the Balkans — warrior culture; gradually incorporated into the Roman Empire.", population: 2_000_000 }],
    ["Scythian Confederation", { continent: "Central Asia", noFlag: true, note: "Scythian Confederation on the Black Sea and Central Asian steppes — nomadic warrior confederation.", population: 2_000_000 }],
    ["Arabian Trading Cities", { continent: "Arabia", noFlag: true, note: "Arabian Trading Cities across the Arabian Peninsula — centers of incense and spice trade; connected to Indian Ocean networks.", population: 2_000_000 }],
  ])],

  // === 400 AD (Late Antiquity) overrides ====================================
  ["ad400", new Map<string, PolityInfo>([
    ["Western Roman Empire", { continent: "Europe / North Africa", noFlag: true, note: "Western Roman Empire in 400 AD — severely weakened by invasions and internal strife; ruled from Rome.", population: 25_000_000 }],
    ["Eastern Roman Empire", { continent: "Eastern Mediterranean / Western Asia", noFlag: true, note: "Eastern Roman (Byzantine) Empire in 400 AD — more stable than the West; ruled from Constantinople.", population: 30_000_000 }],
    ["Visigothic Kingdom", { continent: "Iberia / Southern France", noFlag: true, note: "Visigothic Kingdom established in Hispania — Germanic tribe that settled within Roman borders; capital Toledo.", population: 2_000_000 }],
    ["Frankish Kingdoms", { continent: "Western Europe", noFlag: true, note: "Frankish Kingdoms in Gaul — not yet united; still evolving toward the future Merovingian empire.", population: 3_000_000 }],
    ["Ostrogothic Kingdom", { continent: "Italy", noFlag: true, note: "Ostrogothic Kingdom in Italy — Germanic kingdom emerging in the Italian peninsula.", population: 2_000_000 }],
    ["Sasanian Empire", { noFlagReason: "No flag shown — the Sasanian royal standard, the Derafsh Kaviani, was cut up and its jewels divided after the Arab conquest of 651, and no depiction of it survives from the period.", continent: "Western Asia / Central Asia", noFlag: true, note: "Sasanian (Persian) Empire — at its height; rival to Rome for control of the Near East and trade routes.", population: 30_000_000 }],
    ["Gupta Empire", { noFlagReason: "No flag shown — the Guptas used the Garuda standard as a dynastic emblem; no flag of the empire survives.", continent: "South Asia", noFlag: true, note: "Gupta Empire in India — in decline by 400 AD but still the dominant Indian power; known for art and science.", population: 40_000_000 }],
    ["Northern Wei", { continent: "East Asia", noFlag: true, note: "Northern Wei Dynasty in China — Xiongnu (Xianbei) origin; controlled northern China amid the period of disunion.", population: 20_000_000 }],
    ["Liu Song", { continent: "East Asia", noFlag: true, note: "Liu Song Dynasty in southern China — one of the Southern Dynasties during the Six Dynasties period.", population: 8_000_000 }],
    ["Koguryo Empire", { continent: "East Asia", noFlag: true, note: "Koguryo (Goguryeo) Empire in Korea — dominant Korean power; frequently in conflict with China.", population: 4_000_000 }],
    ["Baekje Kingdom", { continent: "East Asia", noFlag: true, note: "Baekje Kingdom of Korea — one of the Three Kingdoms; major cultural intermediary between China and Japan.", population: 2_500_000 }],
    ["Silla Kingdom", { continent: "East Asia", noFlag: true, note: "Silla Kingdom of Korea — rising power among the Three Kingdoms; would eventually unify Korea.", population: 2_000_000 }],
    ["Japanese Kofun period", { continent: "East Asia", noFlag: true, note: "Kofun period Japan — characterized by large burial mounds; the Yamato state consolidating authority.", population: 3_000_000 }],
    ["Nubian kingdoms", { continent: "Northeast Africa", noFlag: true, note: "Nubian kingdoms south of Egypt — Kushite and Meroitic period ending; transitioning to Axumite expansion.", population: 2_000_000 }],
    ["Sub-Saharan African kingdoms", { continent: "Sub-Saharan Africa", noFlag: true, note: "Various sub-Saharan African kingdoms and chiefdoms circa 400 AD — Bantu expansion ongoing.", population: 5_000_000 }],
    ["Mayan civilization", { continent: "Mesoamerica", noFlag: true, note: "Maya Classic period city-states circa 400 AD — height of Maya civilization before the 9th-century collapse.", population: 3_000_000 }],
    ["Andean cultures", { continent: "South America", noFlag: true, note: "Pre-Incan Andean cultures and kingdoms — various highland and coastal polities in flux.", population: 2_000_000 }],
    ["Burgundian Kingdom", { continent: "Western Europe", noFlag: true, note: "Burgundian Kingdom in eastern Gaul — Germanic tribe establishing kingdom; would last for centuries.", population: 1_500_000 }],
    ["Vandal Kingdom", { continent: "North Africa", noFlag: true, note: "Vandal Kingdom in North Africa — Germanic tribe controlling Carthage and Mediterranean trade; powerful naval force.", population: 2_000_000 }],
    ["Anglo-Saxon Kingdoms", { continent: "Northern Europe", noFlag: true, note: "Anglo-Saxon kingdoms in Britain (Northumbria, Mercia, Wessex, Kent) — germinating Germanic settlements; still pagan.", population: 1_500_000 }],
    ["Pictish Kingdom", { continent: "Northern Europe", noFlag: true, note: "Pictish kingdom in Scotland — independent Celtic power; distinct culture and language.", population: 500_000 }],
    ["Galatian Kingdom", { continent: "Western Asia", noFlag: true, note: "Galatian Kingdom in Anatolia — Celtic remnant; independent until Roman and later Persian pressure.", population: 500_000 }],
    ["Palmyrene state", { continent: "Western Asia", noFlag: true, note: "Palmyrene city-state in Syria — trading center under Byzantine suzerainty; controlling caravan routes.", population: 300_000 }],
    ["Arabian tribes (Byzantine allies)", { continent: "Arabia", noFlag: true, note: "Arab tribes allied with Byzantine Empire — Ghassanids and other Arab confederations; client states.", population: 2_000_000 }],
    ["Arabian tribes (Persian allies)", { continent: "Arabia", noFlag: true, note: "Arab tribes allied with Sasanian Persia — Lakhmids and other confederations; client states.", population: 2_000_000 }],
    ["Aksumite Kingdom", { continent: "East Africa", noFlag: true, note: "Aksumite Kingdom of Ethiopia — major power in the Horn of Africa; rival to Byzantine and Sasanian empires.", population: 3_000_000 }],
    ["Nubian Kush Kingdoms", { continent: "Northeast Africa", noFlag: true, note: "Late Kushite kingdoms of Nubia — independent powers transitioning toward Aksumite expansion.", population: 1_500_000 }],
    ["Egyptian Roman Province", { continent: "North Africa", noFlag: true, note: "Egypt under Roman/Byzantine rule — grain-producing province; major urban centers (Alexandria, Memphis).", population: 8_000_000 }],
    ["Berber kingdoms (North Africa)", { continent: "North Africa", noFlag: true, note: "Berber kingdoms and tribal confederations in North Africa — resisting Roman decline; various local powers.", population: 3_000_000 }],
    ["Iberian Celtic tribes", { continent: "Iberia", noFlag: true, note: "Iberian Celtic tribes and kingdoms — under pressure from Visigothic encroachment; competing for territory.", population: 2_000_000 }],
    ["Lusitanian kingdom", { continent: "Iberia", noFlag: true, note: "Lusitanian kingdom in Iberia — under Roman/Visigothic pressure; transitional period.", population: 1_500_000 }],
    ["Suevic kingdom", { continent: "Iberia", noFlag: true, note: "Suevic kingdom in Galicia (northwestern Iberia) — Germanic tribe establishing independent kingdom.", population: 800_000 }],
    ["Picts and Britons", { continent: "Northern Europe", noFlag: true, note: "Picts in Scotland and Britons in Wales/Cornwall — independent Celtic kingdoms; Germanic migrations ongoing.", population: 1_000_000 }],
    ["Irish kingdoms", { continent: "Northern Europe", noFlag: true, note: "High Kings and kingdoms of Ireland — Celtic confederations; monastic culture flourishing.", population: 1_000_000 }],
    ["Heptarchy Anglo-Saxons", { continent: "Northern Europe", noFlag: true, note: "Anglo-Saxon Heptarchy kingdoms in England — seven competing kingdoms (Kent, Sussex, Surrey, Essex, East Anglia, Mercia, Northumbria).", population: 1_000_000 }],
    ["Avar Confederation", { continent: "Eastern Europe", noFlag: true, note: "Avar Confederation on the steppes — nomadic confederation controlling Central European plains; threatening Byzantine and Germanic kingdoms.", population: 2_000_000 }],
    ["Early Slavic tribes", { continent: "Eastern Europe", noFlag: true, note: "Slavic tribal confederations in Eastern Europe — migrating westward and southward; establishing settlements.", population: 3_000_000 }],
    ["Hunnic remnants", { continent: "Central Asia", noFlag: true, note: "Hunnic peoples and fragmenting confederation — after Attila's death, declining power; various tribal groups.", population: 1_500_000 }],
    ["Chola Empire", { continent: "South Asia", noFlag: true, note: "Chola Empire of South India — rising power; competing with Pallava and Pandya kingdoms.", population: 5_000_000 }],
  ])],

  // === 600 AD overrides =====================================================
  // The Palaiologos dynasty flag (1261–1453) is the global Byzantine entry,
  // but in 600 AD the Byzantine Empire was the Justinian/Heraclian dynasty —
  // 661 years before Palaiologos. No surviving standardised flag for this era.
  ["ad600", new Map<string, PolityInfo>([
    ["Eastern Roman Empire", { continent: "Eastern Mediterranean", noFlag: true, note: "Byzantine Empire in 600 AD — Heraclian dynasty, capital Constantinople. No standardised flag; the Palaiologos double-eagle (our only Byzantine PNG) is 661 years too late.", population: 26_000_000 }],
    // Western Europe 600 AD
    ["Frankish kingdoms", { continent: "Western Europe", noFlag: true, note: "Merovingian Frankish kingdoms — divided among the Merovingian kings; Charlemagne's Carolingians were still centuries away.", population: 5_000_000 }],
    ["Visigothic Spain", { continent: "Iberia", noFlag: true, note: "Visigothic Kingdom of Spain — 6th century, the realm of the Liuvigild dynasty. Conquered by Islamic forces in 711.", population: 4_000_000 }],
    ["Ostrogothic Kingdom", { continent: "Southern Europe", noFlag: true, note: "Ostrogothic Kingdom of Italy — under Theodoric and successors; would be conquered by the Eastern Roman Empire in the Gothic War (535–554).", population: 3_000_000 }],
    // Middle East 600 AD
    ["Sasanian Empire", { noFlagReason: "No flag shown — the Sasanian royal standard, the Derafsh Kaviani, was cut up and its jewels divided after the Arab conquest of 651, and no depiction of it survives from the period.", continent: "Western Asia", noFlag: true, note: "Sasanian (Sassanid) Empire — last Persian empire before Arab conquest; at its 600 AD height under Khosrau II.", population: 50_000_000 }],
    ["Arabian Peninsula", { continent: "Arabia", noFlag: true, note: "Pre-Islamic Arabian Peninsula — a century before Prophet Muhammad. Divided among various Arab tribes and kingdoms.", population: 8_000_000 }],
    // India 600 AD
    ["Chalukya Empire", { continent: "South Asia", noFlag: true, note: "Chalukya Empire of the Deccan — major power in 6th century India under Pulakeshin II.", population: 15_000_000 }],
    ["Harsha Empire", { continent: "South Asia", noFlag: true, note: "Empire of Harsha — the last great pre-Islamic Indian empire; capital Kanauj. Dominated 606–647 AD.", population: 25_000_000 }],
    ["Pallava Kingdom", { continent: "South Asia", noFlag: true, note: "Pallava Empire of southern India — rivals to the Chalukyas; built the temples of Mahabalipuram.", population: 10_000_000 }],
    // China 600 AD
    ["Tang Dynasty", { noFlagReason: "No flag shown — Tang armies used unit banners and imperial standards; China had no national flag until 1862.", continent: "East Asia", noFlag: true, note: "Tang dynasty China — founded 618 AD, but by 600 AD the Sui dynasty ruled. The Tang would become one of history's greatest empires.", population: 50_000_000 }],
    ["Sui Dynasty", { continent: "East Asia", noFlag: true, note: "Sui dynasty China (589–618) — brief period between the Southern and Northern Dynasties and the Tang.", population: 45_000_000 }],
    ["Southeast Asian kingdoms", { continent: "Southeast Asia", noFlag: true, note: "Khmer Empire, Sailendra maritime empire, and other Southeast Asian states at 600 AD.", population: 8_000_000 }],
    ["Aksumite Empire", { continent: "East Africa", noFlag: true, note: "Aksumite Kingdom of the Horn of Africa — at its height in 600 AD; major Red Sea power.", population: 5_000_000 }],
    ["Korean kingdoms", { continent: "East Asia", noFlag: true, note: "Three Kingdoms of Korea (Goguryeo, Baekje, Silla) circa 600 AD — engaged in constant rivalry for dominance.", population: 8_000_000 }],
    ["Japanese Asuka period", { continent: "East Asia", noFlag: true, note: "Asuka period Japan circa 600 AD — the introduction of Buddhism and Chinese culture to the Japanese islands.", population: 4_000_000 }],
    ["Berber kingdoms", { continent: "North Africa", noFlag: true, note: "North African Berber kingdoms and dynasties — resisting Byzantine and Arab expansion. No standardised flags.", population: 3_000_000 }],
    ["Celtic kingdoms", { continent: "Western Europe", noFlag: true, note: "Celtic kingdoms of Ireland, Wales, and northern Britain circa 600 AD — fragmented and often in conflict.", population: 2_000_000 }],
    ["Visigothic Iberia", { continent: "Iberia", noFlag: true, note: "Visigothic Kingdom fragmented — various regional powers vying for control; would fall to Islamic conquest in 711.", population: 3_000_000 }],
    ["Maya city-states", { continent: "Mesoamerica", noFlag: true, note: "Maya city-states at the height of the Classic period around 600 AD — Tikal, Palenque, and other ceremonial centers.", population: 2_000_000 }],
    ["North Andean kingdoms", { continent: "South America", noFlag: true, note: "Pre-Incan Andean kingdoms and cultures circa 600 AD — various highland and lowland polities.", population: 2_000_000 }],
    ["Lombard Kingdom", { continent: "Southern Europe", noFlag: true, note: "Lombard Kingdom of Italy — Germanic tribe controlling northern Italy; rivals to the Byzantine Exarchate of Ravenna.", population: 2_000_000 }],
    ["Anglo-Saxon Kingdoms", { continent: "Northern Europe", noFlag: true, note: "Anglo-Saxon kingdoms in England (Northumbria, Mercia, Wessex, Kent) — competing for dominance; still pagan or recently Christian.", population: 2_000_000 }],
    ["Pictish Kingdom", { continent: "Northern Europe", noFlag: true, note: "Pictish kingdom in Scotland — independent Celtic power; gradually merging with Scots.", population: 500_000 }],
    ["Celtic Kingdoms of Ireland", { continent: "Northern Europe", noFlag: true, note: "High Kings of Ireland — various Celtic kingdoms and monasteries; monastic scholarship flourishing.", population: 800_000 }],
    ["Visigothic Lusitania", { continent: "Iberia", noFlag: true, note: "Visigothic territory in Lusitania (Portugal region) — part of the broader Visigothic kingdom; would fall to Islamic forces.", population: 1_500_000 }],
    ["Kingdom of the Lombards", { continent: "Southern Europe", noFlag: true, note: "Lombard dukedoms of Italy — regional powers competing within the broader Lombard kingdom.", population: 1_500_000 }],
    ["Byzantine Egypt", { continent: "North Africa", noFlag: true, note: "Egypt under Byzantine rule — province of the Byzantine Empire; rich grain-producing region.", population: 8_000_000 }],
    ["Byzantine North Africa", { continent: "North Africa", noFlag: true, note: "Byzantine North Africa (Carthage, Libya region) — provinces of the Byzantine Empire; would fall to Arab conquest.", population: 4_000_000 }],
    ["Nubian Kingdoms", { continent: "Northeast Africa", noFlag: true, note: "Nubian kingdoms south of Egypt — independent powers; trade partners with both Byzantine and Arabian powers.", population: 2_000_000 }],
    ["Kingdom of Aksum", { continent: "East Africa", noFlag: true, note: "Aksumite Kingdom in Ethiopia/Eritrea — major power declining by 600 AD; eventually would Christianize fully.", population: 3_000_000 }],
    ["Bedouin Arab tribes", { continent: "Arabia", noFlag: true, note: "Bedouin Arab tribal confederations — nomadic societies; soon to be unified by Prophet Muhammad.", population: 5_000_000 }],
    ["Yemen kingdoms", { continent: "Arabia", noFlag: true, note: "Kingdoms of Yemen (Himyarite, Sabaean region) — wealthy trading powers; would fall to Islamic expansion.", population: 2_000_000 }],
    ["Persian Gulf trading cities", { continent: "Western Asia", noFlag: true, note: "Persian Gulf port cities and trading centers — maritime commerce between Persia, Arabia, and India.", population: 1_000_000 }],
    ["Sogdian trading cities", { continent: "Central Asia", noFlag: true, note: "Sogdian trading cities on the Silk Road — major commercial powers connecting China, Persia, and the West.", population: 1_500_000 }],
    ["Tibetan Kingdoms", { continent: "Central Asia", noFlag: true, note: "Early Tibetan kingdoms and principalities — before unified Tibetan empire; regional powers.", population: 2_000_000 }],
    ["Srivijaya Empire", { continent: "Southeast Asia", noFlag: true, note: "Srivijaya maritime empire in Southeast Asia — thalassocracy controlling island trade routes.", population: 3_000_000 }],
    ["Sailendra maritime dynasty", { continent: "Southeast Asia", noFlag: true, note: "Sailendra dynasty in Indonesia — early period before Borobudur construction; maritime and temple-building power.", population: 2_000_000 }],
    ["Champa Kingdom", { continent: "Southeast Asia", noFlag: true, note: "Champa Kingdom in Vietnam — Hindu-Buddhist state; emerging maritime trader.", population: 1_500_000 }],
    ["Dvaravati Mon kingdom", { continent: "Southeast Asia", noFlag: true, note: "Dvaravati Mon kingdom in Thailand — early Siamese/Mon power; Buddhist center.", population: 1_000_000 }],
  ])],

  // === 800 AD overrides =====================================================
  // "Byzantine Empire" name used from 800 onwards in the dataset.
  // The Palaiologos dynasty (1261–1453) is the global entry; in 800 AD the
  // Macedonian dynasty was ruling — 461 years before Palaiologos.
  // Holy Roman Empire: the post-1400 imperial banner is the global entry;
  // in 800 AD the Carolingian Empire was just forming (HRE formally 962 AD).
  ["ad800", new Map<string, PolityInfo>([
    ["Byzantine Empire", { noFlagReason: "No flag shown for this date — Byzantine armies used the labarum and Chi-Rho military standards; the tetragrammatic cross flag bundled for the later empire is the Palaiologan dynasty's, from 1261 onward.", continent: "Eastern Mediterranean", noFlag: true, note: "Byzantine Empire in 800 AD — Macedonian dynasty era. No standardised flag; the Palaiologos double-eagle (our only Byzantine PNG) is 461 years too late.", population: 20_000_000 }],
    ["Holy Roman Empire", { continent: "Central Europe", noFlag: true, note: "Holy Roman Empire — Carolingian/Ottonian era, 800–962 AD. The post-1400 imperial banner (our only HRE PNG) is 400+ years too late for this dynasty.", population: 20_000_000 }],
    // Western Europe 800 AD — age of Charlemagne
    ["Frankish Empire", { continent: "Western Europe", noFlag: true, note: "Carolingian Empire of Charlemagne — crowned Holy Roman Emperor in 800 AD. No standardised flag.", population: 8_000_000 }],
    ["Abbasid Caliphate", { noFlagReason: "No flag shown — the Abbasids' emblem was the plain black banner, carried as a dynastic standard rather than flown as a state flag.", continent: "Western Asia", noFlag: true, note: "Abbasid Caliphate — height of Islamic empire; capital Baghdad, founded 762 AD. No national flag in modern sense.", population: 50_000_000 }],
    ["Umayyad Caliphate", { noFlagReason: "No flag shown — the Umayyads fought under plain white banners, and the Abbasids who replaced them under black; neither was a national flag in the modern sense.", continent: "Western Asia", noFlag: true, note: "Umayyad Caliphate — ruling the western Islamic world; rival to the Abbasids after the Abbasid Revolution (750 AD).", population: 15_000_000 }],
    // India 800 AD
    ["Gurjara-Pratihara", { continent: "South Asia", noFlag: true, note: "Gurjara-Pratihara Empire of northern India — one of the three great powers battling for supremacy in the Tripartite Struggle.", population: 40_000_000 }],
    ["Rashtrakuta Empire", { continent: "South Asia", noFlag: true, note: "Rashtrakuta Empire of the Deccan — at its 8th-9th century height, rivals to the Pratiharas.", population: 35_000_000 }],
    ["Pallava Kingdom", { continent: "South Asia", noFlag: true, note: "Late Pallava Kingdom of South India — weakening by 800 AD before the rise of the Cholas.", population: 12_000_000 }],
    // Southeast Asia 800 AD
    ["Sailendra Empire", { continent: "Southeast Asia", noFlag: true, note: "Sailendra maritime empire — built Borobudur temple in Java. Dominated Southeast Asian trade.", population: 5_000_000 }],
    ["Khmer Empire", { continent: "Southeast Asia", noFlag: true, note: "Angkor period Khmer Empire — capital Angkor; builders of the great temples (Angkor Wat built later, 12th century).", population: 2_000_000 }],
    // China 800 AD
    ["Tang Dynasty", { noFlagReason: "No flag shown — Tang armies used unit banners and imperial standards; China had no national flag until 1862.", continent: "East Asia", noFlag: true, note: "Tang dynasty China — height of the golden age under various emperors; thriving international trade along the Silk Road.", population: 50_000_000 }],
    // Americas 800 AD
    ["Maya civilization", { continent: "Mesoamerica", noFlag: true, note: "Maya civilization at height of the Classic period (ended c. 900 AD) — great city-states like Tikal and Copan.", population: 3_000_000 }],
    ["Ummayad Caliphate (Spain)", { continent: "Iberia", noFlag: true, note: "Emirate of Córdoba in Al-Andalus (Islamic Spain) — caliphate proclaimed in 929, but this is the early 9th century predecessor state.", population: 3_000_000 }],
    ["Visigothic Remnants", { continent: "Iberia", noFlag: true, note: "Visigothic Kingdom remnants in northern Iberia — Christian Asturian kingdoms emerging against Islamic expansion.", population: 1_500_000 }],
    ["Anglo-Saxon Kingdoms", { continent: "Northern Europe", noFlag: true, note: "Anglo-Saxon kingdoms of Britain — Northumbria, Mercia, Wessex, and others; competing for dominance.", population: 2_000_000 }],
    ["Kingdom of the Picts", { continent: "Northern Europe", noFlag: true, note: "Pictish kingdom in Scotland — independent Celtic kingdom; would merge with Scots to form Scotland.", population: 500_000 }],
    ["Celtic Kingdoms of Ireland", { continent: "Northern Europe", noFlag: true, note: "High Kings of Ireland — various Celtic kingdoms and tribal confederations in Ireland.", population: 800_000 }],
    ["Mercian Kingdom", { continent: "Northern Europe", noFlag: true, note: "Kingdom of Mercia in England — dominant Anglo-Saxon power under kings like Offa; builder of Offa's Dyke.", population: 1_000_000 }],
    ["Danish Viking Settlements", { continent: "Northern Europe", noFlag: true, note: "Early Danish and Norse Viking settlements and raids — establishing footholds in England and Normandy.", population: 200_000 }],
    ["Scandinavian Kingdoms", { continent: "Northern Europe", noFlag: true, note: "Early Scandinavian kingdoms (Sweden, Denmark, Norway) — rising Viking powers; beginning of Viking Age expansion.", population: 800_000 }],
    ["Byzantine Iconoclasm Era", { continent: "Eastern Mediterranean", noFlag: true, note: "Byzantine Empire during Iconoclastic period — various emperors; religious and political turmoil.", population: 5_000_000 }],
    ["Bulgarian Empire", { continent: "Eastern Europe", noFlag: true, note: "First Bulgarian Empire — established by Turkic Bulgars and South Slavs; expanding power in the Balkans.", population: 1_500_000 }],
    ["Serbian Kingdoms", { continent: "Eastern Europe", noFlag: true, note: "Early Serbian kingdoms — emerging South Slavic powers; rising independence from Byzantine control.", population: 1_000_000 }],
    ["Rus' Principalities", { continent: "Eastern Europe", noFlag: true, note: "Rus' principalities fragmenting — various successor states to Kievan Rus; Viking Varangian influence.", population: 4_000_000 }],
    ["Islamic Iberia Fragmentation", { continent: "Iberia", noFlag: true, note: "Early Islamic Iberia — taifas (petty kingdoms) and various Islamic states; competing for power and trade.", population: 4_000_000 }],
    ["Sogdian Cities", { continent: "Central Asia", noFlag: true, note: "Sogdian trading cities on the Silk Road — major commercial powers; centers of East-West trade.", population: 1_000_000 }],
    ["Tibetan Kingdom", { continent: "Central Asia", noFlag: true, note: "Tibetan Empire — at height under the Yarlung dynasty; powerful highland kingdom.", population: 2_000_000 }],
    ["Early Srivijaya", { continent: "Southeast Asia", noFlag: true, note: "Srivijaya maritime empire in Southeast Asia — expanding thalassocracy controlling maritime trade.", population: 3_000_000 }],
    ["Sailendra Dynasty", { continent: "Southeast Asia", noFlag: true, note: "Sailendra maritime dynasty — builders of Borobudur; dominant naval power in Indonesia.", population: 2_000_000 }],
    ["Khmer Empire (Pre-Angkor)", { continent: "Southeast Asia", noFlag: true, note: "Pre-Angkor Khmer kingdom — early Khmer civilization before the great city of Angkor was built (9th-12th centuries).", population: 1_500_000 }],
    ["Nanchao/Dali Kingdom", { continent: "East Asia", noFlag: true, note: "Nanzhao (Nanchao) kingdom in southern China — independent kingdom; later became Dali Kingdom.", population: 2_000_000 }],
    ["Japanese Nara period", { continent: "East Asia", noFlag: true, note: "Nara period Japan (710-794) — classical Japanese civilization; capital city of Nara.", population: 5_000_000 }],
    ["Korean Three Kingdoms", { continent: "East Asia", noFlag: true, note: "Three Kingdoms of Korea (Goguryeo, Baekje, Silla) — still competing despite unified periods.", population: 8_000_000 }],
    ["Pala Empire", { continent: "South Asia", noFlag: true, note: "Pala Empire of Bengal — height of Buddhist learning; major power in eastern India.", population: 20_000_000 }],
    ["Gurjara-Pratihara Empire", { continent: "South Asia", noFlag: true, note: "Gurjara-Pratihara Empire — expanding power in northern India during the Tripartite Struggle.", population: 35_000_000 }],
    ["Chola Empire", { continent: "South Asia", noFlag: true, note: "Early Chola Empire — rising power in southern India; would become dominant later.", population: 8_000_000 }],
  ])],

  // === 1000 AD (Early Medieval) overrides ===================================
  ["ad1000", new Map<string, PolityInfo>([
    // AUDIT 2026-08 (goal 3): the global England entry carries the St George's Cross, which
    // the curated-flag gate now refuses here — records of it as an English emblem begin in
    // the 1270s. https://en.wikipedia.org/wiki/Flag_of_England
    ["England", { continent: "Northern Europe", noFlag: true, note: "Anglo-Saxon England under Æthelred the Unready — a single kingdom, soon to be conquered by Cnut of Denmark.", population: 2_000_000, noFlagReason: "No flag shown — England had none in 1000. The St George's Cross first appears as an English emblem in the 1270s; before that kings fought under personal, dynastic and saints' standards." }],
    ["Fatimid Caliphate", { continent: "North Africa / Western Asia", noFlag: true, note: "Fatimid Caliphate at height — controlled Egypt, North Africa, and the Levant; rival to the Abbasid Caliphate.", population: 25_000_000 }],
    ["Holy Roman Empire", { continent: "Central Europe", noFlag: true, note: "Holy Roman Empire under the Ottonian dynasty — Otto III (983-1002) ruled during this era.", population: 15_000_000 }],
    ["Kingdom of France", { continent: "Western Europe", noFlag: true, note: "Capetian Kingdom of France — newly founded by Hugh Capet (987); still weak compared to feudal lords.", population: 7_000_000 }],
    ["Anglo-Saxon England", { continent: "Northern Europe", noFlag: true, note: "Anglo-Saxon England — under various kings including Aethelred the Unready and Canute the Great (who also ruled Denmark/Norway).", population: 2_000_000 }],
    ["Kingdom of Denmark", { continent: "Northern Europe", noFlag: true, note: "Kingdom of Denmark — Canute the Great (1016-1035) ruled England, Denmark, and Norway in personal union.", population: 1_000_000 }],
    ["Christian Spanish kingdoms", { continent: "Iberia", noFlag: true, note: "Christian Spanish kingdoms (Castile, Aragon, Portugal, Navarre, León) — gradually reconquering from Islamic Al-Andalus.", population: 3_000_000 }],
    ["Al-Andalus", { continent: "Iberia", noFlag: true, note: "Al-Andalus (Islamic Spain) — fragmenting into taifas (petty kingdoms) after the Caliphate of Córdoba's collapse in 1031.", population: 4_000_000 }],
    ["Kingdom of Norway", { continent: "Northern Europe", noFlag: true, note: "Kingdom of Norway — under Danish/Norwegian kings; part of Canute's North Sea Empire.", population: 400_000 }],
    ["Kingdom of Poland", { continent: "Eastern Europe", noFlag: true, note: "Kingdom of Poland under the Piast dynasty — newly emerged as a Catholic state under Bolesław I the Brave.", population: 2_000_000 }],
    ["Kingdom of Hungary", { continent: "Eastern Europe", noFlag: true, note: "Kingdom of Hungary under the Arpád dynasty — newly established Catholic kingdom; bulwark against steppe invasions.", population: 2_000_000 }],
    ["Kievan Rus", { continent: "Eastern Europe", noFlag: true, note: "Kievan Rus — medieval federation of East Slavic city-states; capital Kiev (Kyiv). Christianized in 988 AD.", population: 5_000_000 }],
    ["Byzantine Empire", { noFlagReason: "No flag shown for this date — Byzantine armies used the labarum and Chi-Rho military standards; the tetragrammatic cross flag bundled for the later empire is the Palaiologan dynasty's, from 1261 onward.", continent: "Eastern Mediterranean", noFlag: true, note: "Byzantine Empire — under the Macedonian dynasty; at territorial height after reconquests in Balkans and Anatolia.", population: 14_000_000 }],
    ["Venice", { continent: "Southern Europe", noFlag: true, note: "Republic of Venice — emerging as a major Mediterranean maritime power and trading republic.", population: 100_000 }],
    ["Papal States", { continent: "Southern Europe", noFlag: true, note: "Papal States (Kingdom of the Pope) — temporal domain of the Papacy in central Italy.", population: 500_000 }],
    ["Chola Empire", { continent: "South Asia", noFlag: true, note: "Chola Empire at imperial height under Rajendra Chola I — greatest maritime power in the Indian Ocean.", population: 20_000_000 }],
    ["Pala Empire", { continent: "South Asia", noFlag: true, note: "Pala Empire of Bengal — declining but still a major power; important Buddhist university at Nalanda.", population: 15_000_000 }],
    ["Ghaznavid Empire", { continent: "Central Asia / South Asia", noFlag: true, note: "Ghaznavid Empire — Turkic empire in Afghanistan/Central Asia/northern India; raiders who challenged Hindu kingdoms.", population: 8_000_000 }],
    ["Song Dynasty", { continent: "East Asia", noFlag: true, note: "Northern Song dynasty China — classic Chinese civilization; thriving commerce and technology.", population: 50_000_000 }],
    ["Khmer Empire", { continent: "Southeast Asia", noFlag: true, note: "Khmer Empire (Angkor) — height of classical Cambodian civilization; capital city of Angkor built later (12th c.).", population: 1_500_000 }],
    ["Srivijaya", { continent: "Southeast Asia", noFlag: true, note: "Srivijaya maritime empire — dominated maritime trade in Southeast Asia from Sumatra base.", population: 3_000_000 }],
    ["Vietnam (Ly dynasty)", { continent: "Southeast Asia", noFlag: true, note: "Early Ly dynasty Vietnam — newly independent from Chinese rule (938-1009); capital Thang Long (Hanoi).", population: 3_000_000 }],
    ["Heian Japan", { continent: "East Asia", noFlag: true, note: "Heian period Japan — height of classical Japanese court culture; Fujiwara regency. The samurai class beginning to rise.", population: 5_000_000 }],
  ])],

  // === 1200 AD (High Medieval) overrides ====================================
  ["ad1200", new Map<string, PolityInfo>([
    // AUDIT 2026-08 (goal 3): the bundled imperial banner is the DOUBLE-headed eagle, adopted
    // c. 1430. In 1200 the emperor's banner was a single-headed black eagle on gold.
    // https://en.wikipedia.org/wiki/Flag_of_the_Holy_Roman_Empire
    ["Holy Roman Empire", { continent: "Central Europe", noFlag: true, note: "Holy Roman Empire under the Hohenstaufen — Philip of Swabia and Otto IV contesting the throne, with Frederick II to follow.", population: 18_000_000, noFlagReason: "No flag shown — the imperial banner of 1200 was a single-headed black eagle on gold; the double-headed eagle bundled for the later empire was adopted only around 1430." }],
    ["Hohenstaufen Empire", { continent: "Central Europe", noFlag: true, note: "Holy Roman Empire under the Hohenstaufen dynasty — Frederick Barbarossa (1152-1190) and his successors.", population: 18_000_000 }],
    ["Kingdom of France", { continent: "Western Europe", noFlag: true, note: "Capetian Kingdom of France under Philip II Augustus — expanding royal power at expense of feudal lords.", population: 10_000_000 }],
    ["Plantagenet England", { continent: "Northern Europe", noFlag: true, note: "Kingdom of England under the Plantagenet dynasty — Richard the Lionheart and King John ruled around this era.", population: 3_500_000 }],
    ["Kingdom of Denmark", { continent: "Northern Europe", noFlag: true, note: "Kingdom of Denmark — expanding under the Valdemar dynasty; major Baltic power.", population: 1_200_000 }],
    ["Kingdom of Norway", { continent: "Northern Europe", noFlag: true, note: "Kingdom of Norway — independent union with Iceland and Greenland.", population: 500_000 }],
    ["Christian Iberia", { continent: "Iberia", noFlag: true, note: "Christian Spanish kingdoms — Castile, Aragon, Portugal, and others advancing the Reconquista against Al-Andalus.", population: 5_000_000 }],
    ["Al-Andalus", { continent: "Iberia", noFlag: true, note: "Almohad Al-Andalus — Islamic Spain under the Almohad dynasty. Granada would be the last Islamic stronghold (until 1492).", population: 3_000_000 }],
    ["Kingdom of Poland", { continent: "Eastern Europe", noFlag: true, note: "Kingdom of Poland — fragmented into competing principalities after the Piast dynasty's decline.", population: 2_500_000 }],
    ["Kingdom of Hungary", { continent: "Eastern Europe", noFlag: true, note: "Kingdom of Hungary — under the Arpád dynasty; expanding territorial power in Central Europe.", population: 3_000_000 }],
    ["Kievan Rus", { continent: "Eastern Europe", noFlag: true, note: "Kievan Rus — fragmenting into competing principalities; Mongol invasions would begin in 1237.", population: 7_000_000 }],
    ["Byzantine Empire", { noFlagReason: "No flag shown for this date — Byzantine armies used the labarum and Chi-Rho military standards; the tetragrammatic cross flag bundled for the later empire is the Palaiologan dynasty's, from 1261 onward.", continent: "Eastern Mediterranean", noFlag: true, note: "Byzantine Empire — weakened by the Fourth Crusade (1204); Constantinople would fall to Crusaders.", population: 8_000_000 }],
    ["Latin Empire", { continent: "Eastern Mediterranean", noFlag: true, note: "Latin Empire — Crusader state established in Constantinople after the Fourth Crusade (1204-1261).", population: 1_500_000 }],
    ["Sultanate of Delhi", { continent: "South Asia", noFlag: true, note: "Delhi Sultanate — Islamic state in northern India; replacing Hindu kingdoms. Iltutmish was ruling around 1211-1236.", population: 20_000_000 }],
    ["Chola Empire", { continent: "South Asia", noFlag: true, note: "Late Chola Empire — declining but still influential in South India; Chola power would end by mid-13th century.", population: 10_000_000 }],
    ["Song Dynasty", { continent: "East Asia", noFlag: true, note: "Southern Song dynasty China — after losing the north to the Jin dynasty (1127). Height of Chinese civilization.", population: 60_000_000 }],
    ["Jin Dynasty", { continent: "East Asia", noFlag: true, note: "Jin dynasty China — Jurchen conquest of northern China; ruled 1115-1234 until Mongol conquest.", population: 35_000_000 }],
    ["Khmer Empire", { continent: "Southeast Asia", noFlag: true, note: "Khmer Empire at peak — Angkor Wat completed in 12th century represents the height of Khmer civilization.", population: 2_000_000 }],
    ["Pagan Empire", { continent: "Southeast Asia", noFlag: true, note: "Pagan Empire of Burma — height of classical Burmese civilization; built thousands of temples.", population: 2_500_000 }],
    ["Sukhothai", { continent: "Southeast Asia", noFlag: true, note: "Sukhothai Kingdom of Thailand — height of early Thai state; culturally innovative period.", population: 800_000 }],
    ["Kamakura Shogunate", { continent: "East Asia", noFlag: true, note: "Kamakura Shogunate Japan — samurai military government; Minamoto clan dominated.", population: 6_000_000 }],
    ["Mali Empire", { continent: "West Africa", noFlag: true, note: "Mali Empire — powerful Mandinka state consolidating control over West African gold trade; height of Mali civilization.", population: 2_000_000 }],
  ])],

  // === 1300 (High/Late Medieval) overrides ==================================
  // The 1300 era uses the same polity NAMEs as the global POLITY_REGISTRY but
  // some need era-specific notes (the registry's generic entry may describe the
  // wrong century). In particular, we suppress any flag fallback for states
  // whose modern-sounding names exist in MODERN_NAME_ALIASES but whose 1300
  // situation was very different (e.g. Morocco was Marinid, not modern).
  ["ad1300", new Map<string, PolityInfo>([
    ["Cyprus", { continent: "Western Asia", noFlag: true, noFlagReason: "No flag shown — the Lusignan kings used their dynastic arms and the banner of Jerusalem rather than a national flag.", note: "Kingdom of Cyprus under the Lusignan dynasty — a crusader kingdom, later sold to Venice.", population: 150_000 }],
    // France (Capetian/Valois): the fleur-de-lis banner ≠ Bourbon white flag
    ["France", { continent: "Western Europe", note: "Kingdom of France — Capetian dynasty in 1300; the Valois would follow in 1328. The fleur-de-lis azure banner predates the Bourbon white standard.", noFlag: true, population: 14_000_000 }],
    // Portugal: medieval Quinas banner — no modern-style flag
    ["Portugal", { continent: "Iberia", note: "Kingdom of Portugal — the Quinas (five blue shields) banner was used, but no standardised flag in the modern sense.", noFlag: true, population: 1_200_000 }],
    // English territory (Plantagenet England in 1300)
    ["English territory", { flag: "historical-flags/england-stgeorge.png", continent: "Northern Europe", note: "Plantagenet England — the Cross of St George (white field, red cross) was the English emblem.", population: 5_000_000 }],
    // Morocco (Marinid Sultanate in 1300): not the modern flag
    ["Morocco", { continent: "North Africa", note: "Marinid Sultanate of Morocco — the Marinids had their own banner; the modern red flag with green pentagram didn't exist.", noFlag: true, population: 3_000_000 }],
    // Yemen (Rasulid Sultanate in 1300)
    ["Yemen", { continent: "Arabia", note: "Rasulid Sultanate — based in Aden and Zabid; the modern Yemeni flag is 20th-century.", noFlag: true, population: 1_500_000 }],
    // Ethiopia (Solomonic dynasty in 1300)
    ["Ethiopia", { continent: "East Africa", note: "Solomonic dynasty of Ethiopia (restored 1270) — the Lion of Judah emblem pre-dates the modern flag by centuries.", noFlag: true, population: 3_000_000 }],
    // Japan (Kamakura Shogunate → shortly after, the Muromachi)
    ["Shogun Japan (Kamakura)", { continent: "East Asia", note: "Kamakura Shogunate Japan — samurai government alongside the emperor. The Hinomaru dates to medieval Japan.", modernName: "Japan", population: 7_000_000 }],
    // Thailand (Sukhothai Kingdom in 1300)
    ["Sukhothai", { continent: "Southeast Asia", note: "Sukhothai Kingdom — earliest Thai state; developed the Thai script.", noFlag: true, population: 500_000 }],
    // Khmer (Angkor period ending)
    ["Khmer Empire", { continent: "Southeast Asia", note: "Khmer Empire at the end of the classical Angkor period — the great temple city of Angkor Wat was built here.", noFlag: true, population: 1_000_000 }],
    // Delhi Sultanate (Khalji dynasty in 1300)
    ["Sultanate of Delhi", { continent: "South Asia", note: "Khalji dynasty Delhi Sultanate — at its 1300 peak it briefly reached southern India. No national flag.", noFlag: true, population: 15_000_000 }],
    // Trebizond in 1300 — Byzantine splinter state
    ["Trebizond", { continent: "Anatolia", note: "Empire of Trebizond — Komnenian dynasty clinging to the Black Sea coast after the Latin sack of Constantinople.", noFlag: true, population: 150_000 }],
    // Georgia (weakened after Mongol invasions)
    ["Georgia", { continent: "Western Asia", note: "Kingdom of Georgia — weakened by repeated Mongol invasions; its golden age (12th–13th c.) was over.", noFlag: true, population: 1_500_000 }],
    // Ottoman Empire in 1300: the 1844–1922 crescent-and-star flag is 544
    // years too late. Pre-Ottoman Seljuk / early Anatolian beyliks — no
    // standardised Ottoman flag yet (Ottomans only founded c.1299).
    ["Ottoman Empire", { continent: "SE Europe / Western Asia", noFlag: true, note: "Ottoman Sultanate in 1300 — newly founded (c.1299) under Osman I; no standardised flag. The familiar crescent-and-star wasn't formalised until 1844.", population: 2_000_000 }],
    // Holy Roman Empire in 1300: the post-1400 imperial banner is the global
    // entry, but in 1300 the double-headed eagle was only beginning to emerge.
    ["Holy Roman Empire", { continent: "Central Europe", noFlag: true, note: "Holy Roman Empire in 1300 — late Hohenstaufen / early Habsburg era. The post-1400 imperial banner (our only HRE PNG) had not yet been formalised.", population: 12_000_000 }],
    // Additional Major Powers of 1300
    ["Mongol Yuan Dynasty", { continent: "East Asia", noFlag: true, note: "Yuan Dynasty China — Kublai Khan's Mongol-led empire; still dominant in East Asia; would fall to Ming in 1368.", population: 120_000_000 }],
    ["Ming Dynasty (pre-founding)", { continent: "East Asia", noFlag: true, note: "Southern Song remnants and regional powers pre-Ming — would be consolidated into Ming Dynasty in 1368.", population: 30_000_000 }],
    ["Vijayanagara Empire", { continent: "South Asia", noFlag: true, note: "Vijayanagara Empire in South India (founded 1336) — rising Hindu power resisting Islamic sultanates.", population: 10_000_000 }],
    ["Bengal Sultanate", { continent: "South Asia", noFlag: true, note: "Bengal Sultanate — Islamic sultanate in eastern India; independent of Delhi; major trading center.", population: 12_000_000 }],
    ["Jaunpur Sultanate", { continent: "South Asia", noFlag: true, note: "Jaunpur Sultanate in northern India — smaller sultanate co-existing with Delhi and Bengal sultanates.", population: 3_000_000 }],
    ["Gujarat Sultanate", { continent: "South Asia", noFlag: true, note: "Gujarat Sultanate in western India — emerging power in the prosperous Gujarat region.", population: 5_000_000 }],
    ["Mamluk Sultanate", { continent: "North Africa / Western Asia", noFlag: true, note: "Mamluk Sultanate of Egypt — still the dominant Islamic power in the eastern Mediterranean; held Jerusalem and Mecca.", population: 6_000_000 }],
    ["Byzantine Empire (remnants)", { continent: "Eastern Mediterranean", noFlag: true, note: "Late Byzantine Empire — shrunk to Constantinople and a few remaining territories; declining power.", population: 1_000_000 }],
    ["Kingdom of Hungary", { continent: "Eastern Europe", noFlag: true, note: "Kingdom of Hungary under the Angevin and early Sigismund dynasties — major Central European power.", population: 3_000_000 }],
    ["Poland-Lithuania", { continent: "Eastern Europe", noFlag: true, note: "Polish-Lithuanian union forming in 1300s — Eastern European power; would grow stronger after 1569.", population: 5_000_000 }],
    ["Grand Duchy of Moscow", { continent: "Eastern Europe", noFlag: true, note: "Grand Duchy of Moscow in 1300 — tiny principality; would eventually unite Russia and emerge as major power.", population: 500_000 }],
    ["Venetian Republic", { continent: "Italy", noFlag: true, note: "Republic of Venice in 1300 — at its peak as a Mediterranean maritime and trading power.", population: 1_500_000 }],
    ["Genoa", { continent: "Italy", noFlag: true, note: "Republic of Genoa in 1300 — rival to Venice for Mediterranean trade dominance.", population: 500_000 }],
    ["Kingdom of Sicily", { continent: "Italy", noFlag: true, note: "Kingdom of Sicily in 1300 — ruled by the House of Aragon; major Mediterranean state.", population: 1_000_000 }],
    ["Papal States", { continent: "Italy", noFlag: true, note: "Papal States in 1300 — territories ruled by the Pope across central Italy; period of Avignon Papacy begins.", population: 2_000_000 }],
    ["Kingdom of Aragon", { continent: "Iberia", noFlag: true, note: "Kingdom of Aragon in 1300 — expanding Mediterranean power; would eventually unify with Castile.", population: 1_500_000 }],
    ["Kingdom of Castile", { continent: "Iberia", noFlag: true, note: "Kingdom of Castile in 1300 — dominant Iberian Christian power; slowly reconquering from Islamic Granada.", population: 2_000_000 }],
    ["Nasrid Granada", { continent: "Iberia", noFlag: true, note: "Emirate of Granada (Nasrid dynasty) in 1300 — last Islamic state in Iberia; would fall to Castile in 1492.", population: 500_000 }],
    ["Ilkhanate (Persia)", { continent: "Western Asia", noFlag: true, note: "Ilkhanate in Persia — Mongol khanate founded by Hulagu Khan; would fall in early 1300s.", population: 8_000_000 }],
    ["Chagatai Khanate", { continent: "Central Asia", noFlag: true, note: "Chagatai Khanate in Central Asia — Mongol khanate controlling the Silk Road; gradually fragmenting.", population: 5_000_000 }],
    ["Golden Horde", { continent: "Eastern Europe / Western Asia", noFlag: true, note: "Golden Horde in southern Russia — Mongol khanate that dominated the steppes and Eastern Europe.", population: 10_000_000 }],
    ["Timurid Empire (emerging)", { continent: "Central Asia", noFlag: true, note: "Timurid Empire (Timur's empire, founded 1369) — emerging Central Asian power challenging the established khanates.", population: 15_000_000 }],
  ])],

  ["ad1500", new Map<string, PolityInfo>([
    // AUDIT 2026-08 (goal 3): the global France entry carries the WHITE Bourbon flag (1590+).
    // In 1500 the Valois royal banner was azure with three gold fleurs-de-lis ("France
    // moderne", from Charles V's reduction of the semé in 1376).
    // https://en.wikipedia.org/wiki/Coat_of_arms_of_France
    // Brunei's plain yellow flag dates from 1888; before that its sultans used personal
    // standards. https://en.wikipedia.org/wiki/Flag_of_Brunei
    ["Brunei Sultanate", { continent: "Southeast Asia", noFlag: true, note: "Sultanate of Brunei at its height — its thalassocracy reached along the coasts of Borneo and into the Philippines.", noFlagReason: "No flag shown — Brunei had no state flag until 1888; before then the sultan and his high officials used their own personal standards." }],
    ["France", { flag: "historical-flags/france-royal-banner.svg", continent: "Western Europe", note: "Kingdom of France under Louis XII — the Valois monarchy at the start of the Italian Wars. Its royal banner was azure with three gold fleurs-de-lis (\"France moderne\"); the white Bourbon flag came only in 1590.", population: 16_000_000 }],
    // Spain flew the Cross of Burgundy (a red ragged saltire on white)
    // from the Habsburg union (1506) until 1701 — Bourbon ascension
    // changed the design. The familiar red-yellow-red flag is from 1785.
    ["Spain", { flag: "historical-flags/spain-burgundy.png", continent: "Iberia", note: "Habsburg Spain under the Cross of Burgundy — the red-yellow-red flag we know today wasn't adopted until 1785.", population: 7_500_000 }],
    // England 1500 = Plantagenet/Tudor monarchy. Cross of St George.
    ["England", { flag: "historical-flags/england-stgeorge.png", continent: "Northern Europe", note: "Tudor England — Henry VII/VIII's era. The Cross of St George (white with red cross) was England's national emblem; the Union Jack wasn't designed until 1606.", population: 2_500_000 }],
    // Portugal 1500 = Age of Discoveries. Quinas banner.
    ["Portugal", { continent: "Iberia", note: "Age-of-Discoveries Portugal — Vasco da Gama reached India (1498), Cabral claimed Brazil (1500). Flew the Quinas banner (white with blue shields).", noFlag: true, population: 1_400_000 }],
    // Scottland (dataset typo for Scotland)
    // Ming Chinese Empire (different dataset name from "Ming")
    ["Ming Chinese Empire", { continent: "East Asia", note: "Ming dynasty China at the height of the Yongle era — the Great Wall expanded, Zheng He's treasure fleets, the Forbidden City built.", noFlag: true, population: 100_000_000 }],
    // Vijayanagara — the last great Hindu empire of South India
    ["Vijayanagara", { continent: "South Asia", note: "Vijayanagara Empire — at its 1500s peak the largest state in the subcontinent south of the Deccan. No standardised national flag.", noFlag: true, population: 25_000_000 }],
    // Songhai — largest empire in West African history
    ["Songhai", { continent: "West Africa", note: "Songhai Empire under Askia Muhammad — the largest empire in West African history; Timbuktu was its intellectual capital.", noFlag: true, population: 4_000_000 }],
    // Ayutthaya 1500 = mature trading kingdom
    ["Ayutthaya", { noFlag: true, noFlagReason: "No flag shown — Siam's plain red ensign is attested only from about 1680, and no flag is documented for Ayutthaya in 1500.", continent: "Southeast Asia", note: "Ayutthaya Kingdom — the dominant state of mainland Southeast Asia, trading with China, India, and Europe.", population: 3_000_000 }],
    // Japan 1500 = Sengoku (Warring States)
    ["Japan", { modernName: "Japan", continent: "East Asia", note: "Sengoku (Warring States) Japan — a century of civil war between rival warlords (daimyo). The Hinomaru pre-dates this era.", population: 15_000_000 }],
    // Korea 1500 = Joseon dynasty
    ["Korea", { noFlagReason: "No flag shown — Joseon Korea had no national flag until the Taegukgi was designed in 1882 and adopted in 1883.", continent: "East Asia", note: "Joseon dynasty Korea — classical period; Hangul script and the great King Sejong. No national flag until the Taegukgi in 1882.", noFlag: true, population: 8_000_000 }],
    // Tibet 1500 = Phagmodrupa/Rinpungpa
    ["Tibet", { continent: "Central Asia", note: "Tibet in 1500 was under the Rinpungpa Tibetan warlords; nominally under the Ming but practically independent.", noFlag: true, population: 2_000_000 }],
    // Malacca 1500 = about to fall to Portugal (fell 1511)
    ["Malacca", { continent: "Southeast Asia", note: "Sultanate of Malacca — the greatest Malay maritime power; conquered by Portugal in 1511, just after this snapshot.", noFlag: true, population: 300_000 }],
    // Grand Duchy of Moscow 1500 = Ivan III expanding
    ["Grand Duchy of Moscow", { continent: "Eastern Europe", note: "Grand Duchy of Moscow under Ivan III — the 'Gatherer of Russian Lands'; just conquered Novgorod and expelled the Tatars.", noFlag: true, population: 5_000_000 }],
    // Teutonic Knights (still independent in 1500, secularised 1525)
    ["Teutonic Knights", { continent: "Central Europe", note: "Teutonic Order state — still controlling Prussia and Livonia in 1500; the Grand Master would secularise it as the Duchy of Prussia in 1525.", noFlag: true, population: 700_000 }],
    // Poland-Lithuania (Commonwealth created 1569 — not yet in 1500)
    ["Poland-Lithuania", { noFlag: true, continent: "Eastern Europe", note: "Jagiellonian Poland-Lithuania (1385–1569) — the precursor to the Polish-Lithuanian Commonwealth, which was only founded in 1569. The Commonwealth flag is anachronistic here.", population: 7_500_000 }],
    // Ottoman Empire 1500: the 1844–1922 crescent-and-star flag is 344 years
    // too late. The Ottomans used various red-crescent banners before 1844.
    ["Ottoman Empire", { noFlag: true, continent: "SE Europe / Western Asia", note: "Ottoman Empire under Suleiman the Magnificent's predecessors. The familiar crescent-and-star flag wasn't formalised until 1844 — 344 years after this era.", population: 12_000_000 }],
    // Morocco 1500 = Wattasid (Marinid successor)
    ["Morocco", { continent: "North Africa", note: "Wattasid Sultanate of Morocco in 1500 — a weakened Marinid successor facing the rise of the Saadian dynasty and Portuguese coastal raids.", noFlag: true, population: 2_000_000 }],
    // Ethiopia 1500 = Solomonic dynasty
    ["Ethiopia", { continent: "East Africa", note: "Solomonic-dynasty Ethiopia in 1500 — prospering until the devastating Adal jihad (1527–1543).", noFlag: true, population: 4_000_000 }],
    // Benin 1500 = golden age
    ["Benin", { continent: "West Africa", note: "Kingdom of Benin at its golden age — the famous bronze plaques, sophisticated court culture, and expanding trade with the Portuguese.", noFlag: true, population: 1_500_000 }],
    // Congo 1500 = Kongo Kingdom
    ["Congo", { continent: "Central Africa", note: "Kingdom of Kongo — the dominant Central African kingdom; just beginning to trade with and convert to Christianity via Portugal.", noFlag: true, population: 3_000_000 }],
    // Oyo 1500 = early Oyo kingdom
    ["Oyo", { continent: "West Africa", note: "Early Oyo Kingdom — the Yoruba empire was still in its formative stage in 1500, before its great expansion in the 17th–18th centuries.", noFlag: true, population: 500_000 }],
    // Venice 1500 = still the major Mediterranean trading power
    ["Venice", { flag: "historical-flags/venice.png", continent: "Italy", note: "Most Serene Republic of Venice — still a major Mediterranean power in 1500, though the Portuguese rerouting of the spice trade was beginning to undermine it.", population: 800_000 }],
    // Kalmar Union (dissolved 1523)
    ["Kalmar Union", { continent: "Northern Europe", note: "Kalmar Union — the Scandinavian personal union was unravelling; Sweden would break free under Gustav Vasa in 1521.", noFlag: true, population: 2_000_000 }],
    // Cambodia (Khmer, declining in 1500)
    ["Cambodia", { continent: "Southeast Asia", note: "Post-Angkor Khmer Kingdom — the empire had declined and abandoned Angkor in 1431; Phnom Penh became the new capital.", noFlag: true, population: 800_000 }],
    // Novgorod — annexed by Moscow in 1478, no longer independent
    ["Novgorod-Seversky", { continent: "Eastern Europe", note: "Principality of Novgorod-Seversky — a small Russian principality that resisted Muscovite unification.", noFlag: true, population: 100_000 }],
    // Additional 1500 AD Powers
    ["Ming Dynasty", { noFlag: true, continent: "East Asia", note: "Ming Dynasty China in 1500 — at the peak of its power; major naval expeditions under Zheng He had ended; great wall construction ongoing.", population: 130_000_000 }],
    ["Joseon Dynasty Korea", { noFlag: true, continent: "East Asia", note: "Joseon Dynasty Korea in 1500 — Confucian kingdom; period of cultural flourishing and hangul development under King Sejong's legacy.", population: 8_000_000 }],
    ["Sengoku Japan", { noFlag: true, continent: "East Asia", note: "Sengoku period Japan in 1500 — the Ashikaga Shogunate was fragmenting; feudal daimyos ruled their own domains.", population: 15_000_000 }],
    ["Annam (Vietnam)", { noFlag: true, continent: "Southeast Asia", note: "Annam and Champa in Vietnam in 1500 — Vietnamese expansion continuing southward; Champa Kingdom in decline.", population: 6_000_000 }],
    ["Burma (Toungoo)", { noFlag: true, continent: "Southeast Asia", note: "Toungoo Dynasty Burma in 1500 — rising power that would expand and unify Burma.", population: 2_000_000 }],
    ["Aceh", { noFlag: true, continent: "Southeast Asia", note: "Aceh Sultanate in 1500 — Islamic sultanate rising to prominence as a spice-trade power.", population: 1_000_000 }],
    ["Mughal Empire", { noFlag: true, continent: "South Asia", note: "Early Mughal Empire in 1500 — Babur had just recently established the empire (1526 founding); still consolidating power.", population: 40_000_000 }],
    ["Delhi Sultanate", { noFlag: true, continent: "South Asia", note: "Lodi Dynasty Delhi Sultanate in 1500 — last Islamic sultanate before Mughal conquest in 1526.", population: 15_000_000 }],
    ["Gujarat Sultanate", { noFlag: true, continent: "South Asia", note: "Gujarat Sultanate in 1500 — major trading power; major port sultanates controlling Arabian Sea trade.", population: 8_000_000 }],
    ["Bengal Sultanate", { noFlag: true, continent: "South Asia", note: "Bengal Sultanate in 1500 — eastern India; prosperous trading kingdom.", population: 15_000_000 }],
    ["Vijayanagara Empire", { noFlag: true, continent: "South Asia", note: "Vijayanagara Empire in 1500 — at its peak as the major Hindu power in South India; resisting Islamic expansion.", population: 25_000_000 }],
    ["Safavid Empire", { noFlag: true, continent: "Western Asia", note: "Safavid Empire in 1500 — just founded by Shah Ismail (1501); establishing Shi'a Islam across Persia.", population: 5_000_000 }],
    ["Mamluk Sultanate", { noFlag: true, continent: "North Africa / Western Asia", note: "Mamluk Sultanate in 1500 — still dominant in Egypt and the eastern Mediterranean; would fall to Ottomans in 1517.", population: 6_000_000 }],
    ["Kingdom of Hungary", { noFlag: true, continent: "Eastern Europe", note: "Kingdom of Hungary under Mátyás Corvinus (1440-1490) and successors — a major Central European power.", population: 4_000_000 }],
    ["Polish-Lithuanian Commonwealth", { noFlag: true, continent: "Eastern Europe", note: "Polish-Lithuanian Commonwealth forming — Eastern European power; would become much stronger after 1569.", population: 8_000_000 }],
    ["Safavid Persia", { noFlag: true, continent: "Western Asia", note: "Safavid Persia in 1500 (early Safavid period) — Shah Ismail (1501-1524) establishing Shi'a Islam; rival to Ottoman Empire.", population: 6_000_000 }],
    ["Khanate of Kazan", { noFlag: true, continent: "Eastern Europe / Western Asia", note: "Khanate of Kazan in 1500 — Mongol successor state on the Volga; would be conquered by Moscow in 1552.", population: 500_000 }],
    ["Crimean Khanate", { noFlag: true, continent: "Eastern Europe", note: "Crimean Khanate in 1500 — Tatar khanate under Ottoman suzerainty.", population: 300_000 }],
    ["Papal States", { noFlag: true, continent: "Italy", note: "Papal States in 1500 — at the height of papal temporal power under the Borgia Pope Alexander VI; controlled extensive Italian territories.", population: 2_000_000 }],
    ["Kingdom of Naples", { noFlag: true, continent: "Italy", note: "Kingdom of Naples in 1500 — Spanish/Aragonese possession; major Mediterranean power.", population: 2_000_000 }],
    ["Duchy of Milan", { noFlag: true, noFlagReason: "No flag shown — the Sforza dukes used dynastic banners quartering the imperial eagle with the Visconti biscione rather than a single state flag, and no authoritative image of one is bundled.", continent: "Italy", note: "Duchy of Milan in 1500 — ruled by the Sforza dynasty; a major Italian power-state during the Italian Renaissance.", population: 1_000_000 }],
  ])],

  // === 1600 AD (Early Modern) overrides =====================================
  ["ad1600", new Map<string, PolityInfo>([
    // AUDIT 2026-08 (goal 3): the bundled Ayutthaya flag is the plain red ensign attested only
    // from about 1680. https://en.wikipedia.org/wiki/Flag_of_Thailand
    ["Ayutthaya", { continent: "Southeast Asia", noFlag: true, note: "Ayutthaya — the Siamese kingdom at the height of its trade with Europe, China and Japan.", population: 2_000_000, noFlagReason: "No flag shown — Siam's plain red ensign is attested only from about 1680; no flag is documented for Ayutthaya in 1600." }],
    ["Cambodia", { continent: "Southeast Asia", noFlag: true, noFlagReason: "No flag shown — the post-Angkor Khmer kingdom used royal and Buddhist banners, not a national flag; Cambodia's first national flag came under the French protectorate of 1863.", note: "Post-Angkor Khmer kingdom, squeezed between Siam and the Vietnamese lords.", population: 1_000_000 }],
    // Major Empires
    ["Ottoman Empire", { continent: "Western Asia / Southeastern Europe / North Africa", noFlag: true, note: "Ottoman Empire at its height under the Sultanate — the longest-lived Islamic empire; controlled vast territories across three continents.", population: 30_000_000 }],
    ["Safavid Empire", { continent: "Western Asia", noFlag: true, note: "Safavid Persia — established Shi'a Islam; rivals to the Ottomans for control of the Near East. Capital Isfahan.", population: 8_000_000 }],
    ["Mughal Empire", { continent: "South Asia", noFlag: true, note: "Mughal Empire in India at its height — one of the richest empires of the world under Akbar and his successors. Architecture and art flourished.", population: 110_000_000 }],
    ["Ming Dynasty", { continent: "East Asia", noFlag: true, note: "Ming Dynasty China — the last Han-led Chinese dynasty; famous for the Forbidden City and the Great Wall. Peak of Chinese power.", population: 120_000_000 }],
    ["Qing Dynasty (Manchu)", { continent: "East Asia", noFlag: true, note: "Qing Dynasty — Jurchen (Manchu) conquest of China beginning (1644 final conquest); not yet dominant in 1600.", population: 5_000_000 }],
    // European Powers
    ["Iberian Union", { continent: "Iberia / Americas / Africa / Asia", noFlag: true, note: "Iberian Union (1580–1640) — Philip II of Spain succeeded to the Portuguese throne in 1580, uniting the two crowns in one monarch. It was a personal union, not a merged state: under the Statute of Tomar (1581) Portugal kept its own laws, Cortes, currency, and a colonial empire administered separately from Spain's. The two crowns separated again in 1640.", population: 8_500_000 }],
    ["France", { flag: "historical-flags/france-bourbon.png", continent: "Western Europe", note: "Kingdom of France under Henri IV, the first Bourbon — the white royal flag semé of fleurs-de-lis dates from his accession in 1590.", population: 18_000_000 }],
    ["England and Ireland", { continent: "Northern Europe / Western Europe", noFlag: true, note: "Kingdom of England and Ireland under the Tudors — rising naval power; colonizing North America; defeating the Spanish Armada (1588).", population: 7_000_000 }],
    ["Holy Roman Empire", { continent: "Central Europe", noFlag: true, note: "Holy Roman Empire — fragmented confederation of Germanic states; increasingly dominated by Austria. Peak decentralization during 30 Years War.", population: 20_000_000 }],
    ["Tsardom of Muscovy", { continent: "Eastern Europe / Western Asia", noFlag: true, note: "Russian Tsardom under the early Romanovs — expanding across Siberia; establishing itself as a major power.", population: 12_000_000 }],
    ["Polish-Lithuanian Commonwealth", { continent: "Eastern Europe", noFlag: true, note: "Polish-Lithuanian Commonwealth (Polish-Lithuanian Union) — major Eastern European power; elective monarchy.", population: 9_000_000 }],
    ["Swedish Empire", { continent: "Northern Europe", noFlag: true, note: "Swedish Empire under Gustav Vasa and successors — rising power; dominating the Baltic; beginning its imperial expansion.", population: 1_500_000 }],
    ["Dutch Republic", { continent: "Western Europe", noFlag: true, note: "Dutch Republic (United Provinces) — newly independent from Spain; becoming a major trading and naval power; Golden Age.", population: 2_000_000 }],
    // Asian Powers
    ["Japan (Edo period)", { continent: "East Asia", noFlag: true, note: "Japan in the Edo period — unified under the Tokugawa Shogunate (from 1603); peaceful, isolated society.", population: 30_000_000 }],
    ["Korea (Joseon)", { continent: "East Asia", noFlag: true, note: "Joseon Dynasty Korea — Chinese-influenced Confucian society; later suffering Ming-Qing transition wars.", population: 8_000_000 }],
    ["Vijayanagara Empire", { continent: "South Asia", noFlag: true, note: "Vijayanagara Empire of southern India — major Hindu power; resisting Islamic sultanates; already declining by 1600.", population: 15_000_000 }],
    ["Bengal Sultanate", { continent: "South Asia", noFlag: true, note: "Bengal Sultanate — Islamic sultanate in eastern India; major trading center; conflicts with Mughal expansion.", population: 8_000_000 }],
    ["Shan States", { continent: "Southeast Asia", noFlag: true, note: "Shan States in Burma (Myanmar) — multiple independent princely states competing with Burma proper.", population: 2_000_000 }],
    ["Ayutthaya Kingdom", { continent: "Southeast Asia", noFlag: true, note: "Ayutthaya Kingdom in Siam (Thailand) — major Southeast Asian power; cosmopolitan trading center.", population: 4_000_000 }],
    ["Aceh Sultanate", { continent: "Southeast Asia", noFlag: true, note: "Aceh Sultanate in Sumatra — Islamic state and trading power; rivals to the Portuguese and Dutch for control of spice trade.", population: 1_500_000 }],
    // African Powers
    ["Ethiopia", { continent: "East Africa", noFlag: true, note: "Ethiopian Empire — Christian kingdom; resisting Islamic expansion; maintains independence against Ottoman and Adal threats.", population: 4_000_000 }],
    ["Mali Empire", { continent: "West Africa", noFlag: true, note: "Mali Empire (declining) — once dominant West African power; fragmented and declining by 1600; local sultanates replace it.", population: 3_000_000 }],
    ["Songhai Empire", { continent: "West Africa", noFlag: true, note: "Songhai Empire — dominant West African power; controls the Niger valley; world's largest empire by territory in 1600.", population: 5_000_000 }],
    ["Hausa States", { continent: "West Africa", noFlag: true, note: "Hausa States in Nigeria — confederation of city-states; major trading centers (Kano, Katsina, Zaria); Islamic sultanates.", population: 2_000_000 }],
    ["Oyo Empire", { continent: "West Africa", noFlag: true, note: "Oyo Empire in Yorubaland — powerful West African state; cavalry-based military; peak period.", population: 5_000_000 }],
    ["Benin Kingdom", { continent: "West Africa", noFlag: true, note: "Kingdom of Benin — West African maritime power; sophisticated court; trade with Portuguese.", population: 800_000 }],
    ["Kongo Kingdom", { continent: "Central Africa", noFlag: true, note: "Kingdom of Kongo in Central Africa — major African state; early European contact; Portuguese colonial influence growing.", population: 3_000_000 }],
    ["Mwenemutapa Empire", { continent: "Southeast Africa", noFlag: true, note: "Mwenemutapa Empire in Zimbabwe — major East African power; gold trade; Portuguese encroachment beginning.", population: 2_000_000 }],
    // Americas
    ["Inca Empire", { continent: "South America", noFlag: true, note: "Inca Empire — largest pre-Columbian state; already conquered by Spanish (conquest complete 1572) but still organizationally intact.", population: 12_000_000 }],
    ["Aztec Empire", { continent: "Mesoamerica", noFlag: true, note: "Aztec Empire (already conquered 1521) — still surviving as organizations and cultural remnants; Spanish colonial rule.", population: 3_000_000 }],
    ["Maya states", { continent: "Mesoamerica", noFlag: true, note: "Maya city-states in Yucatán — independent kingdoms still resisting Spanish conquest; organized societies.", population: 2_000_000 }],
    // Minor European States
    ["Venice", { continent: "Italy", noFlag: true, note: "Republic of Venice — declining maritime power; still wealthy from Eastern trade but Portuguese competition undermining.", population: 600_000 }],
    ["Papal States", { continent: "Italy", noFlag: true, note: "Papal States (Vatican territories) — small Italian states ruled by the Pope; threatened by larger powers.", population: 800_000 }],
    ["Tuscany (Florence)", { continent: "Italy", noFlag: true, note: "Grand Duchy of Tuscany (Florence) — Italian state; independent but increasingly overshadowed by larger powers.", population: 600_000 }],
    // North American Indigenous Confederacies
    ["Haudenosaunee Confederacy", { continent: "North America", noFlag: true, note: "Iroquois/Haudenosaunee Confederacy of Five Nations — powerful indigenous confederation northeast of English colonies.", population: 20_000 }],
    ["Powhatan Confederacy", { continent: "North America", noFlag: true, note: "Powhatan Confederacy in Virginia region — influential before English Jamestown settlement (1607).", population: 30_000 }],
    ["Cherokee Nation", { continent: "North America", noFlag: true, note: "Cherokee Nation in southeastern North America — major indigenous power; conflict with European colonists.", population: 25_000 }],
    ["Creek Confederacy", { continent: "North America", noFlag: true, note: "Muscogee Creek Confederacy in southeastern North America — confederation of towns and peoples.", population: 20_000 }],
    ["Shawnee", { continent: "North America", noFlag: true, note: "Shawnee Nation in Ohio valley and beyond — nomadic and semi-nomadic people resisting European expansion.", population: 15_000 }],
    ["Muskogee", { continent: "North America", noFlag: true, note: "Muskogee peoples in southeastern North America — powerful confederation of allied towns.", population: 20_000 }],
    ["Blackfoot Confederacy", { continent: "North America", noFlag: true, note: "Blackfoot Confederacy on the Great Plains — powerful nomadic confederation; allied Siksika, Kainai, Piikani nations.", population: 30_000 }],
    ["Comanche", { continent: "North America", noFlag: true, note: "Comanche Nation on the southern Great Plains — powerful horse-riding nomadic people.", population: 20_000 }],
    ["Navajo", { continent: "North America", noFlag: true, note: "Navajo people in the Southwest — semi-sedentary; known for weaving and pastoral herding.", population: 15_000 }],
    ["Pueblo peoples", { continent: "North America", noFlag: true, note: "Pueblo peoples in the Southwest (Keres, Tiwa, Tewa, Tano, Kiawe) — sedentary agricultural societies.", population: 20_000 }],
    // More Southeast Asian Sultanates
    ["Brunei Sultanate", { continent: "Southeast Asia", noFlag: true, note: "Brunei Sultanate on Borneo — Islamic sultanate; early trade power in Southeast Asia.", population: 150_000 }],
    ["Sulu Sultanate", { continent: "Southeast Asia", noFlag: true, note: "Sulu Sultanate in the southern Philippines — Islamic state; major maritime power and center of piracy.", population: 500_000 }],
    ["Banjar Sultanate", { continent: "Southeast Asia", noFlag: true, note: "Banjar Sultanate on Borneo — Islamic sultanate competing with Dutch; major pepper trading center.", population: 400_000 }],
    ["Minangkabau Sultanates", { continent: "Southeast Asia", noFlag: true, note: "Minangkabau sultanates in Sumatra — confederation of Islamic states; centers of Islamic learning.", population: 300_000 }],
    ["Champa Kingdom", { continent: "Southeast Asia", noFlag: true, note: "Champa Kingdom in Vietnam — declining Hindu kingdom; pressed by Vietnamese and Southeast Asian neighbors.", population: 500_000 }],
    ["Lan Xang", { continent: "Southeast Asia", noFlag: true, note: "Lan Xang Kingdom in Laos — major Southeast Asian Buddhist kingdom; capital Vientiane.", population: 800_000 }],
    ["Kingdom of Burma", { continent: "Southeast Asia", noFlag: true, note: "Kingdom of Burma (Myanmar) — powerful Buddhist kingdom; multiple competing centers of power.", population: 3_000_000 }],
    // More Indian Sultanates and Kingdoms
    ["Bijapur Sultanate", { continent: "South Asia", noFlag: true, note: "Adil Shahi Sultanate of Bijapur in Deccan — Islamic sultanate; major military power; rival to Mughal Empire.", population: 4_000_000 }],
    ["Golkonda Sultanate", { continent: "South Asia", noFlag: true, note: "Bahmani Sultanate (Golkonda) in Deccan — Islamic sultanate; known for diamonds; conflicts with Mughal expansion.", population: 3_000_000 }],
    ["Ahmadnagar Sultanate", { continent: "South Asia", noFlag: true, note: "Ahmadnagar Sultanate in Deccan — Islamic sultanate; independent power in south-central India.", population: 2_000_000 }],
    ["Gujarat Sultanate", { continent: "South Asia", noFlag: true, note: "Gujarat Sultanate — Islamic sultanate; major trading center; conflicts with Mughal expansion.", population: 3_000_000 }],
    ["Malwa Sultanate", { continent: "South Asia", noFlag: true, note: "Malwa Sultanate in central India — Islamic state; major regional power.", population: 1_000_000 }],
    ["Jaunpur Sultanate", { continent: "South Asia", noFlag: true, note: "Jaunpur Sultanate in northern India — Islamic sultanate; seat of SharkiRajput culture.", population: 1_500_000 }],
    ["Arakan Kingdom", { continent: "Southeast Asia", noFlag: true, note: "Arakan (Rakhine) Kingdom in Burma — independent Buddhist kingdom; maritime trading power.", population: 1_000_000 }],
    // North African and Mediterranean States
    ["Saadian Dynasty (Morocco)", { continent: "North Africa", noFlag: true, note: "Saadian Dynasty ruling Morocco — Islamic sultanate; military power opposing Ottoman expansion in Maghreb.", population: 5_000_000 }],
    ["Hafsid Dynasty (Tunis)", { continent: "North Africa", noFlag: true, note: "Hafsid Dynasty ruling Tunisia — Islamic dynasty; Mediterranean naval power; Ottoman vassal.", population: 1_500_000 }],
    ["Dey of Algiers", { continent: "North Africa", noFlag: true, note: "Dey (Ottoman governor) of Algiers — Ottoman regency; major Barbary corsair base.", population: 500_000 }],
    ["Regency of Tripoli", { continent: "North Africa", noFlag: true, note: "Regency of Tripoli — Ottoman regency; Barbary corsair stronghold in North Africa.", population: 300_000 }],
    ["Darfur Sultanate", { continent: "North Africa", noFlag: true, note: "Sultanate of Darfur in Sudan — Islamic sultanate; independent power in central Africa.", population: 800_000 }],
    ["Kingdom of Funj", { continent: "East Africa", noFlag: true, note: "Sultanate of Sennar (Funj) in Sudan — Islamic sultanate; controls Nile valley.", population: 1_000_000 }],
    // West and Central African Kingdoms
    ["Wolof Empire", { continent: "West Africa", noFlag: true, note: "Wolof Empire in Senegambia — West African state; early European contact.", population: 400_000 }],
    ["Senegambia States", { continent: "West Africa", noFlag: true, note: "Senegambia region states — multiple kingdoms and sultanates in the Senegal-Gambia valley.", population: 500_000 }],
    ["Ashanti Confederacy", { continent: "West Africa", noFlag: true, note: "Ashanti Confederacy in West Africa — powerful military confederation (consolidated ~1670s); major slave trade power.", population: 2_000_000 }],
    ["Dahomey Kingdom", { continent: "West Africa", noFlag: true, note: "Kingdom of Dahomey in West Africa — rising military power; major Atlantic slave trade participant.", population: 500_000 }],
    ["Lunda Empire", { continent: "Central Africa", noFlag: true, note: "Lunda Empire in Central Africa — large African state; major regional power.", population: 2_000_000 }],
    ["Luba Kingdom", { continent: "Central Africa", noFlag: true, note: "Luba Kingdom in Central Africa — major African state; sophisticated governance.", population: 1_500_000 }],
    ["Kasanje Kingdom", { continent: "Central Africa", noFlag: true, note: "Kasanje Kingdom in Central Africa — regional power; involved in slave trade networks.", population: 400_000 }],
    // More Central Asian Khanates
    ["Bukhara Khanate", { continent: "Central Asia", noFlag: true, note: "Khanate of Bukhara — Central Asian Islamic khanate; major Silk Road trading center.", population: 500_000 }],
    ["Samarkand", { continent: "Central Asia", noFlag: true, note: "Samarkand khanate — Central Asian city-state and trading power; seat of Timurid culture.", population: 200_000 }],
    ["Khorezm", { continent: "Central Asia", noFlag: true, note: "Khorezm state in Central Asia — region around Khiva; Islamic khanate.", population: 600_000 }],
    ["Yarkand Khanate", { continent: "Central Asia", noFlag: true, note: "Yarkand Khanate in Xinjiang — Silk Road oasis state; Islamic sultanate.", population: 150_000 }],
    ["Kashgar Khanate", { continent: "Central Asia", noFlag: true, note: "Kashgar Khanate in Xinjiang — major Silk Road trading center; Islamic sultanate.", population: 200_000 }],
    // Additional European States
    ["Denmark", { continent: "Northern Europe", noFlag: true, note: "Kingdom of Denmark in 1600 — Nordic power; personal union with Norway; involved in early colonial ventures.", population: 800_000 }],
    ["Iceland", { continent: "Northern Europe", noFlag: true, note: "Iceland in 1600 — Danish-governed island; isolated Norse culture; volcanic landscape.", population: 50_000 }],
    ["Swiss Cantons", { continent: "Central Europe", noFlag: true, note: "Swiss Confederacy — confederation of independent cantons; neutral in European conflicts.", population: 1_000_000 }],
    ["Savoy", { continent: "Italy", noFlag: true, note: "Duchy of Savoy — Alpine state between France and Italy; minor Italian power.", population: 500_000 }],
    ["Genoa", { continent: "Italy", noFlag: true, note: "Republic of Genoa — declining Italian maritime republic; still wealthy from Mediterranean trade.", population: 300_000 }],
    ["Naples", { continent: "Italy", noFlag: true, note: "Kingdom of Naples — southern Italian kingdom; Spanish possession; major Mediterranean center.", population: 2_000_000 }],
    ["Sicily", { continent: "Italy", noFlag: true, note: "Kingdom of Sicily — southern Italian kingdom; under Spanish rule; feudal aristocracy.", population: 1_200_000 }],
    ["Modena", { continent: "Italy", noFlag: true, note: "Duchy of Modena — small Italian state; Este dynasty; minor power.", population: 200_000 }],
    ["Parma", { continent: "Italy", noFlag: true, note: "Duchy of Parma — small Italian state; Farnese dynasty; minor power.", population: 250_000 }],
    ["Brandenburg-Prussia", { continent: "Central Europe", noFlag: true, note: "Electorate of Brandenburg — Germanic state; rising power under Hohenzollern dynasty.", population: 1_500_000 }],
    ["Bohemia", { continent: "Central Europe", noFlag: true, note: "Kingdom of Bohemia in 1600 — integral part of Holy Roman Empire; major regional power.", population: 2_000_000 }],
    // Additional Asian Regions
    ["Kokand Khanate", { continent: "Central Asia", noFlag: true, note: "Kokand region — Central Asian territory; will become khanate later; currently under various rulers.", population: 300_000 }],
    ["Turfan Khanate", { continent: "Central Asia", noFlag: true, note: "Turfan oasis state in Xinjiang — Silk Road trading center; Islamic khanate.", population: 100_000 }],
    ["Hami Sultanate", { continent: "Central Asia", noFlag: true, note: "Hami (Kumul) Sultanate in Xinjiang — Silk Road oasis; Islamic sultanate competing with Ming/Qing.", population: 80_000 }],
    ["Tripoli (Libya)", { continent: "North Africa", noFlag: true, note: "Ottoman Regency of Tripoli — North African port city; Barbary corsair base under Ottoman authority.", population: 40_000 }],
    ["Ryukyu Kingdom", { continent: "East Asia", noFlag: true, note: "Ryukyu Kingdom (Okinawa) — tributary state between Japan and China; unique culture.", population: 400_000 }],
    ["Siam (Ayutthaya alternative)", { continent: "Southeast Asia", noFlag: true, note: "Siam/Ayutthaya Kingdom — major Southeast Asian power; cosmopolitan Buddhist civilization.", population: 5_000_000 }],
    ["Majapahit remnants", { continent: "Southeast Asia", noFlag: true, note: "Majapahit successor states in Java — fragmented remnants of once-great Hindu-Buddhist empire.", population: 2_000_000 }],
    ["Mataram Sultanate", { continent: "Southeast Asia", noFlag: true, note: "Mataram Sultanate in Java — rising Islamic power; will become major force by 1700s.", population: 1_000_000 }],
    // Australian and Pacific Aboriginal Nations (representative)
    ["Yolngu peoples", { continent: "Australia", noFlag: true, note: "Yolngu peoples of northeastern Australia — Aboriginal nation with complex kinship and ceremonial systems.", population: 10_000 }],
    ["Wiradjuri Nation", { continent: "Australia", noFlag: true, note: "Wiradjuri Nation of inland southeastern Australia — large Aboriginal confederation.", population: 15_000 }],
    ["Koori peoples", { continent: "Australia", noFlag: true, note: "Koori peoples of southeastern Australia — Aboriginal nations of the coastal and inland regions.", population: 20_000 }],
    ["Noongar peoples", { continent: "Australia", noFlag: true, note: "Noongar (Nyungar) peoples of southwestern Australia — Aboriginal nation of Western Australia.", population: 10_000 }],
    ["Hawaiian Kingdom", { continent: "Pacific", noFlag: true, note: "Hawaiian Kingdom — Pacific island confederation; not yet unified; multiple chiefdoms competing.", population: 300_000 }],
    ["Tongan Empire", { continent: "Pacific", noFlag: true, note: "Tongan Empire/Tonga — Pacific island kingdom; sophisticated Polynesian civilization.", population: 40_000 }],
    ["Samoan confederacy", { continent: "Pacific", noFlag: true, note: "Samoan confederation — Pacific island societies; multiple chiefdoms; complex oral traditions.", population: 30_000 }],
    // Additional American Colonial Entities
    ["French North America", { continent: "North America", noFlag: true, note: "New France — French colonial territories in North America; competing with English colonies.", population: 20_000 }],
    ["Spanish Florida", { continent: "North America", noFlag: true, note: "Spanish Florida — Spanish colonial territory in southeastern North America; frontier with English colonies.", population: 50_000 }],
    ["Spanish Texas", { continent: "North America", noFlag: true, note: "Spanish Texas — Spanish colonial province; frontier territory with indigenous peoples.", population: 30_000 }],
    ["Spanish New Mexico", { continent: "North America", noFlag: true, note: "Spanish New Mexico — Spanish colonial province in the American Southwest; established 1598.", population: 25_000 }],
    ["Portuguese Angola", { continent: "Africa", noFlag: true, note: "Portuguese Angola — Portuguese colonial territory in Angola; early colonial outpost.", population: 100_000 }],
    ["Portuguese Mozambique", { continent: "Southeast Africa", noFlag: true, note: "Portuguese Mozambique — Portuguese colonial territory; major trade routes to India.", population: 200_000 }],
    ["Spanish Philippines", { continent: "East Asia", noFlag: true, note: "Spanish Philippines — Spanish colonial archipelago; named after King Philip II; major Spanish possession.", population: 500_000 }],
    // === Additional West African kingdoms ===
    ["Ife Kingdom", { continent: "West Africa", noFlag: true, note: "Kingdom of Ife — ancient Yoruba city-state; cultural and spiritual center; in decline by 1600 but still influential.", population: 300_000 }],
    ["Kano Emirate", { continent: "West Africa", noFlag: true, note: "Kano Emirate — Hausa city-state in northern Nigeria; major commercial and craft center on Saharan trade routes.", population: 400_000 }],
    ["Katsina Emirate", { continent: "West Africa", noFlag: true, note: "Katsina Emirate — Hausa state; competing power with Kano on the trans-Saharan trade routes.", population: 300_000 }],
    ["Bornu Empire", { continent: "West Africa", noFlag: true, note: "Bornu Empire — successor to Kanem-Bornu; still powerful in Central Sudan; Islamic state controlling Lake Chad region.", population: 1_500_000 }],
    // === Central African kingdoms ===
    ["Kingdom of Kongo", { continent: "Central Africa", noFlag: true, note: "Kingdom of Kongo — one of the oldest and largest African kingdoms; Christian state; major trading partner with Portugal.", population: 2_500_000 }],
    ["Kingdom of Ndongo", { continent: "Central Africa", noFlag: true, note: "Kingdom of Ndongo — Angola region; resisting Portuguese expansion; home of the warrior queen Nzinga.", population: 800_000 }],
    ["Kanem-Bornu", { continent: "West / Central Africa", noFlag: true, note: "Kanem-Bornu — ancient Saharan state; still powerful in 1600 controlling Lake Chad region.", population: 2_000_000 }],
    // === East African states ===
    ["Omani Sultanate", { continent: "Western Asia / East Africa", noFlag: true, note: "Sultanate of Oman — Arabian maritime power; controlling Indian Ocean trade; expanding influence along East African coast.", population: 300_000 }],
    ["Mombasa City-State", { continent: "East Africa", noFlag: true, note: "Mombasa — Swahili city-state and major East African port; Islamic trading center competing with other city-states.", population: 100_000 }],
    ["Zanzibar City-State", { continent: "East Africa", noFlag: true, note: "Zanzibar — Swahili city-state; Islamic trading center on the East African coast; major spice and ivory market.", population: 80_000 }],
    ["Kilwa Sultanate", { continent: "East Africa", noFlag: true, note: "Kilwa Sultanate — Swahili city-state; major trading power in southern East Africa; declining but still important.", population: 50_000 }],
    ["Funj Sultanate", { continent: "East Africa / Northeast Africa", noFlag: true, note: "Funj Sultanate (Sinnar) — Sudanese state; Islamic sultanate controlling the upper Nile region.", population: 1_500_000 }],
    ["Mutapa Empire", { continent: "Southern Africa", noFlag: true, note: "Mutapa Empire (Mwene Mutapa) — Zimbabwe region; major African power; trading gold with Portuguese; declining by 1600.", population: 1_000_000 }],
    ["Kingdom of Zimbabwe", { continent: "Southern Africa", noFlag: true, note: "Zimbabwe Kingdom — Southern African power; successor state traditions; cattle-based economy.", population: 500_000 }],
    // === North African states (Barbary and Hausa) ===
    ["Regency of Algiers", { continent: "North Africa", noFlag: true, note: "Regency of Algiers — Ottoman regency; Barbary corsair base; major Mediterranean naval power.", population: 400_000 }],
    ["Regency of Tunis", { continent: "North Africa", noFlag: true, note: "Regency of Tunis — Ottoman regency; Barbary corsair base; trading with Mediterranean powers.", population: 300_000 }],
    ["Hausa Confederation", { continent: "West Africa", noFlag: true, note: "Hausa Confederation — seven major Hausa city-states in northern Nigeria; trading confederation.", population: 2_000_000 }],
    // === Arabian peninsula states ===
    ["Sharjah Sheikhdom", { continent: "Western Asia", noFlag: true, note: "Sharjah — Sheikhdom on the Persian Gulf coast; trading port; pearl fishing and maritime commerce.", population: 50_000 }],
    ["Dubai Sheikhdom", { continent: "Western Asia", noFlag: true, note: "Dubai — Small sheikhdom on the Persian Gulf; pearl fishing village; modest trading port.", population: 30_000 }],
    ["Oman Sultanate", { continent: "Western Asia", noFlag: true, note: "Oman — Arabian sultanate; maritime power controlling strategic straits of Hormuz region.", population: 300_000 }],
    ["Hadramawt Sultanate", { continent: "Western Asia / Arabia", noFlag: true, note: "Hadramawt — Arabian sultanate in modern Yemen; wealthy trading state; Hadramis were merchants throughout Indian Ocean.", population: 500_000 }],
    ["Qatban Kingdom", { continent: "Western Asia / Arabia", noFlag: true, note: "Qatban — Arabian kingdom in Yemen region; competing with other Arabian states for frankincense and myrrh trade.", population: 300_000 }],
    // === South Asian sultanates (additional) ===
    ["Adil Shahi Dynasty", { continent: "South Asia", noFlag: true, note: "Adil Shahi of Bijapur — South Indian sultanate; major power in Deccan; competing with Golkonda and Mughals.", population: 3_000_000 }],
    ["Qutb Shahi Dynasty", { continent: "South Asia", noFlag: true, note: "Qutb Shahi of Golkonda — South Indian sultanate; major Deccan power; famed for diamonds and cultural patronage.", population: 2_000_000 }],
    ["Bahmani Sultanate fragments", { continent: "South Asia", noFlag: true, note: "Bahmani successor sultanates in Deccan — five regional sultanates emerged after Bahmani fragmentation in 1482.", population: 5_000_000 }],
    ["Nizam Shahi of Ahmadnagar", { continent: "South Asia", noFlag: true, note: "Nizam Shahi of Ahmadnagar — Deccan sultanate; major power; competing with Bijapur and Golkonda.", population: 2_000_000 }],
    ["Imad Shahi of Berar", { continent: "South Asia", noFlag: true, note: "Imad Shahi of Berar — Deccan sultanate; smaller power sandwiched between larger sultanates.", population: 800_000 }],
    ["Kingdom of Travancore", { continent: "South Asia", noFlag: true, note: "Travancore — Kerala kingdom; Hindu power; major trading center with spice exports to Europe.", population: 1_000_000 }],
    ["Kingdom of Cochin", { continent: "South Asia", noFlag: true, note: "Cochin — Kerala kingdom; Hindu power; competing with Travancore; Portuguese trading posts in region.", population: 600_000 }],
    // === Southeast Asian sultanates and kingdoms ===
    ["Minangkabau Sultanate", { continent: "Southeast Asia", noFlag: true, note: "Minangkabau Kingdom — West Sumatran kingdom; Islamic state; major spice-producing region.", population: 600_000 }],
    ["Palembang Sultanate", { continent: "Southeast Asia", noFlag: true, note: "Palembang — Sumatran sultanate; trading sultanate on Musi River; pepper and other spice exports.", population: 300_000 }],
    ["Jambi Sultanate", { continent: "Southeast Asia", noFlag: true, note: "Jambi Sultanate — Sumatran sultanate; trading state on upper Musi River; spice commerce.", population: 200_000 }],
    ["Makassar Sultanate", { continent: "Southeast Asia", noFlag: true, note: "Makassar (Gowa) — Major Bugis sultanate in Sulawesi; Islamic maritime power competing with Portuguese.", population: 500_000 }],
    ["Lannathai", { continent: "Southeast Asia", noFlag: true, note: "Lannathai (Lan Na) — Northern Thai kingdom; Buddhist state; competing with Ayutthaya for influence.", population: 800_000 }],
    // === Central Asian khanates and states ===
    ["Khwarezm Khanate", { continent: "Central Asia", noFlag: true, note: "Khwarezm — Central Asian khanate; Silk Road oasis state; competing with other khanates.", population: 500_000 }],
    ["Turpan Oasis State", { continent: "East Asia", noFlag: true, note: "Turpan — Oasis state in Xinjiang; trading point on Silk Road; between Chinese and Central Asian control.", population: 100_000 }],
    // === East Asian kingdoms (additional) ===
    ["Daimyo of Osaka", { continent: "East Asia", noFlag: true, note: "Osaka daimyo — Major Japanese feudal domain; influential in civil politics; powerful regional lord.", population: 1_000_000 }],
    ["Daimyo of Kyoto", { continent: "East Asia", noFlag: true, note: "Kyoto daimyo — Major Japanese feudal domain; home of the imperial court and Buddhist temples.", population: 500_000 }],
    ["Daimyo of Nagasaki", { continent: "East Asia", noFlag: true, note: "Nagasaki daimyo — Major Japanese feudal domain; only port open to foreigners during sakoku; Dutch trading post.", population: 300_000 }],
    ["Daimyo of Satsuma", { continent: "East Asia", noFlag: true, note: "Satsuma daimyo — Powerful Japanese feudal domain in southern Kyushu; rival to central authority.", population: 400_000 }],
    ["Joseon Korea", { continent: "East Asia", noFlag: true, note: "Joseon — Korean kingdom; unified state; Confucian culture; tributary to Qing China.", population: 8_000_000 }],
    // === Additional European/Mediterranean ===
    ["Republic of Genoa", { continent: "Western Europe", noFlag: true, note: "Republic of Genoa — Italian maritime republic; rival to Venice; colonial territories in Mediterranean.", population: 300_000 }],
    ["Republic of Venice", { continent: "Western Europe", noFlag: true, note: "Republic of Venice — Major Italian maritime republic; trading empire; competing with Genoa.", population: 400_000 }],
    ["Duchy of Urbino", { continent: "Western Europe", noFlag: true, note: "Duchy of Urbino — Italian duchy; center of Renaissance culture; competing Italian state.", population: 150_000 }],
    ["Duchy of Mantua", { continent: "Western Europe", noFlag: true, note: "Duchy of Mantua — Italian duchy; important Renaissance power; competing with Milan and Venice.", population: 200_000 }],
    ["Republic of Lucca", { continent: "Western Europe", noFlag: true, note: "Republic of Lucca — Italian city-state; rival republic competing with Genoa and Venice.", population: 100_000 }],
    ["Duchy of Modena", { continent: "Western Europe", noFlag: true, note: "Duchy of Modena — Italian duchy; Este family rule; competing Italian state.", population: 120_000 }],
    ["Duchy of Parma", { continent: "Western Europe", noFlag: true, note: "Duchy of Parma — Italian duchy; Farnese family rule; competing with Genoa and Milan.", population: 150_000 }],
    ["County Palatine", { continent: "Central Europe", noFlag: true, note: "Palatinate — German principality on the Rhine; competing Holy Roman Empire territory.", population: 400_000 }],
    ["Duchy of Bavaria", { continent: "Central Europe", noFlag: true, note: "Bavaria — Large German principality; major Holy Roman Empire territory; competing with Austria.", population: 1_500_000 }],
    ["Duchy of Saxony", { continent: "Central Europe", noFlag: true, note: "Saxony — German principality; competing Holy Roman Empire territory; influential in German affairs.", population: 1_000_000 }],
    ["Electorate of Hanover", { continent: "Central Europe", noFlag: true, note: "Hanover — German principality; rising power in northern Germany.", population: 600_000 }],
    ["Electorate of Cologne", { continent: "Central Europe", noFlag: true, note: "Cologne — German ecclesiastical principality; powerful bishopric; Rhine region power.", population: 400_000 }],
    ["Duchy of Cleves", { continent: "Central Europe", noFlag: true, note: "Cleves — German principality on the Rhine; competing territory in central Europe.", population: 300_000 }],
    ["County of Berg", { continent: "Central Europe", noFlag: true, note: "Berg — German principality; competing territory in central Germany.", population: 200_000 }],
    ["Electorate of Brandenburg", { continent: "Central Europe", noFlag: true, note: "Brandenburg — German principality; rising power in northern Europe; future Prussia.", population: 1_200_000 }],
    ["Principality of Lüneburg", { continent: "Central Europe", noFlag: true, note: "Lüneburg — German principality in northern Germany.", population: 300_000 }],
    ["Kingdom of Sweden", { continent: "Northern Europe", noFlag: true, note: "Sweden — Nordic kingdom; rising Baltic power; competing with Poland and Russia.", population: 1_200_000 }],
    ["Kingdom of Poland-Lithuania", { continent: "Eastern Europe", noFlag: true, note: "Polish-Lithuanian Commonwealth — Large Eastern European state; major power; competing with Russia and Sweden.", population: 8_000_000 }],
    ["Cossack Confederacies", { continent: "Eastern Europe", noFlag: true, note: "Cossack Confederacies — Semi-nomadic warriors; semi-independent forces on Ukraine steppes.", population: 200_000 }],
    ["Crimean Khanate", { continent: "Eastern Europe / Western Asia", noFlag: true, note: "Crimean Khanate — Tatar khanate; Ottoman vassal; powerful in Black Sea region.", population: 300_000 }],
    ["Ottoman Regencies", { continent: "North Africa / Western Asia", noFlag: true, note: "Various Ottoman Regencies — Barbary States under Ottoman suzerainty; semi-autonomous corsair bases.", population: 1_000_000 }],
  ])],

  ["ad1700", new Map<string, PolityInfo>([
    // AUDIT 2026-08 (goal 3): the global Manchu Empire entry carries the 1889 yellow dragon
    // banner. Qing China had no national flag in 1700 at all — the first was the triangular
    // dragon banner of 1862. https://en.wikipedia.org/wiki/Flag_of_the_Qing_dynasty
    ["Manchu Empire", { continent: "East Asia", noFlag: true, note: "Qing China under the Kangxi Emperor — the empire at its administrative height, with Taiwan taken in 1683 and the Russian frontier fixed at Nerchinsk in 1689.", population: 150_000_000, noFlagReason: "No flag shown — imperial China had no national flag in 1700. The Qing adopted their first, the triangular yellow dragon banner, only in 1862, and the rectangular version in 1889." }],
    ["France", { flag: "historical-flags/france-bourbon.png", continent: "Western Europe", note: "Bourbon France under Louis XIV. White royal banner with fleur-de-lis — the tricolour wasn't adopted until 1790.", population: 21_500_000 }],
    ["Spain", { flag: "historical-flags/spain-burgundy.png", continent: "Iberia", note: "Spain at the start of the War of Spanish Succession — still flying the Cross of Burgundy as it had since 1506. The Bourbon white royal flag would come in 1701, the modern red-yellow-red in 1785.", population: 8_000_000 }],
    // Dutch Republic 1700 = still independent; the familiar Dutch tricolour
    ["Dutch Republic", { flag: "historical-flags/dutch-republic.png", continent: "Western Europe", note: "Dutch Republic — still at the height of its global trading empire; the VOC dominated Asian trade. The Prince's Flag (tricolour) was in use.", population: 2_000_000 }],
    // Polish-Lithuanian Commonwealth 1700 = in decline
    ["Polish–Lithuanian Commonwealth", { flag: "historical-flags/poland-lithuania.png", continent: "Eastern Europe", note: "Polish-Lithuanian Commonwealth — entering its period of decline; the 'liberum veto' paralysed its parliament. A unique noble republic.", population: 11_000_000 }],
    // Tsardom of Muscovy → just before Peter the Great's reforms; the Russian tricolour was introduced ~1699
    ["Tsardom of Muscovy", { flag: "historical-flags/russian-empire.png", continent: "Eastern Europe", note: "Tsardom of Muscovy under Peter the Great — on the cusp of becoming the Russian Empire (formally 1721). Peter adopted the Russian tricolour around 1699.", population: 14_000_000 }],
    // Austria 1700 = Habsburg Monarchy (not yet 'Austrian Empire', created 1804)
    ["Austrian Empire", { flag: "historical-flags/austrian-empire.png", continent: "Central Europe", note: "Habsburg Monarchy — in 1700 not yet officially called the 'Austrian Empire' (created 1804). Flew the red-white-red civil ensign, one of Europe's oldest national symbols. Fighting the War of Spanish Succession.", population: 8_000_000 }],
    // England and Ireland (pre-Union Jack, 1707 union hadn't happened)
    ["England and Ireland", { flag: "historical-flags/england-stgeorge.png", continent: "Northern Europe", note: "Kingdom of England and Kingdom of Ireland — a personal union before the Act of Union (1707) that created Great Britain. The Cross of St George was England's flag.", population: 6_500_000 }],
    // Japan 1700 = Tokugawa Shogunate (covered by "Tokugawa Shogunate" entry but dataset says "Japan")
    ["Japan", { flag: "historical-flags/japan-shogunate.png", continent: "East Asia", note: "Tokugawa Shogunate Japan — the Edo period (1603–1868); peace and isolation policy (sakoku). The Tokugawa mon (three hollyhock leaves) was the shogunate's emblem.", population: 28_000_000 }],
    // Korea 1700 = Joseon dynasty
    ["Korea", { noFlagReason: "No flag shown — Joseon Korea had no national flag until the Taegukgi was designed in 1882 and adopted in 1883.", continent: "East Asia", note: "Joseon dynasty Korea in 1700 — a sophisticated Confucian kingdom; no national flag until the Taegukgi in 1882.", noFlag: true, population: 7_000_000 }],
    // Morocco 1700 = Alaouite dynasty
    ["Morocco", { continent: "North Africa", note: "Alaouite Sultanate of Morocco — the same dynasty that rules today, established in 1631. Flew a plain red flag; the green pentagram was added in 1915.", noFlag: true, population: 2_500_000 }],
    // Portuguese Brazil 1700 = major colony. No accurate historical flag available
    // for colonial Portugal in 1700 (the UKPBA flag is 1815-era; the 1830 flag is too modern).
    ["Portuguese Brazil", { noFlag: true, continent: "South America", note: "Colonial Brazil — Portuguese Crown colony. Portugal in 1700 flew a blue-and-white royal standard; no matching historical flag available.", population: 1_500_000 }],
    // Portugal 1700 = Blue-and-white royal standard (not the 1911 red-green flag)
    ["Portugal", { continent: "Iberia", note: "Kingdom of Portugal in 1700 — a major colonial power (Brazil, Africa, India). Flew a blue-and-white royal standard; the modern red-and-green wasn't adopted until 1911.", noFlag: true, population: 2_000_000 }],
    // New France 1700 = major French colonial territory in Canada
    ["New France", { continent: "North America", note: "New France — French colonial territory in Canada and the Mississippi valley, under the Bourbon royal banner.", population: 15_000 }],
    // Vietnamese states in 1700
    ["Đại Việt", { continent: "Southeast Asia", note: "Đại Việt in 1700 — divided between the Trịnh lords in the north and Nguyễn lords in the south; nominally one Lê dynasty kingdom.", noFlag: true, population: 4_000_000 }],
    // Ayutthaya 1700 = still a major trading kingdom
    ["Ayutthaya", { flag: "historical-flags/ayutthaya.png", continent: "Southeast Asia", note: "Ayutthaya Kingdom in 1700 — at its peak as a major trading hub. Destroyed by Burma in 1767.", population: 3_000_000 }],
    // Kan Na (northern Thai kingdom under Burmese suzerainty in 1700)
    ["Lan Na", { continent: "Southeast Asia", note: "Lan Na Kingdom (Chiang Mai) — northern Thailand; under Burmese suzerainty from the late 16th century.", noFlag: true, population: 400_000 }],
    // Cambodia 1700 = post-Angkor Khmer under Vietnamese / Siamese pressure
    ["Cambodia", { continent: "Southeast Asia", note: "Post-Angkor Khmer Kingdom — reduced to the Phnom Penh-centred rump, squeezed between Vietnam and Siam.", noFlag: true, population: 700_000 }],
    // Ethiopia 1700 = Zemene Mesafint (Era of Princes) approaching
    ["Ethiopia", { continent: "East Africa", note: "Ethiopian Empire in 1700 — the centralised Solomonic state was beginning to fragment into the Zemene Mesafint (Era of Princes) period.", noFlag: true, population: 4_000_000 }],
    // Tibet 1700 = Dzungar Mongol invasion approaching
    ["Tibet", { continent: "Central Asia", note: "Tibet in 1700 — the Dalai Lama's temporal rule; the 5th Dalai Lama had recently died and the Dzungar Mongols would soon invade (1717).", noFlag: true, population: 2_000_000 }],
    // Oyo 1700 = peak of the Oyo Empire
    ["Oyo", { continent: "West Africa", note: "Oyo Empire at or near its peak — the Yoruba empire dominated the West African savanna and was a major force in the Atlantic slave trade.", noFlag: true, population: 3_000_000 }],
    // Congo 1700 = Kingdom of Kongo in decline after civil wars
    ["Congo", { continent: "Central Africa", note: "Kingdom of Kongo in 1700 — torn by decades of civil wars (the Mwissikongo succession crises) and Portuguese interference.", noFlag: true, population: 2_000_000 }],
    // Benin 1700 = still a powerful state
    ["Benin", { continent: "West Africa", note: "Benin Kingdom (Edo) in 1700 — still a sophisticated and powerful state despite increasing contact with European slavers.", noFlag: true, population: 1_200_000 }],
    // Ottoman Empire 1700: 1844 flag is 144 years too late.
    ["Ottoman Empire", { noFlag: true, continent: "SE Europe / Western Asia", note: "Ottoman Empire in 1700 — still a major power under the Köprülü viziers. The crescent-and-star flag wasn't standardised until 1844.", population: 30_000_000 }],
    // Major Asian Powers
    ["Mughal Empire", { noFlag: true, continent: "South Asia", note: "Mughal Empire in 1700 — under Aurangzeb; the last great emperor. Already showing signs of decline that would accelerate after his death (1707).", population: 120_000_000 }],
    ["Qing Dynasty", { noFlag: true, continent: "East Asia", note: "Qing Dynasty China in 1700 — height of Kangxi Emperor's reign; the empire was expansionist and at its peak territorial extent.", population: 150_000_000 }],
    ["Safavid Persia", { noFlag: true, continent: "Western Asia", note: "Safavid Empire of Persia in 1700 — in decline; the dynasty would fall by 1736. Capital Isfahan; once the world's largest city by some accounts.", population: 8_000_000 }],
    // Central Asian Khanates
    ["Khiva Khanate", { noFlag: true, continent: "Central Asia", note: "Khanate of Khiva in 1700 — Central Asian power controlling Khorezm; still independent, not yet subsumed by Russia.", population: 500_000 }],
    ["Quazaq Khanate", { noFlag: true, continent: "Central Asia", note: "Kazakh Khanate in 1700 — nomadic confederation of steppe peoples; loosely organized into three hordes (Great, Middle, Little).", population: 2_000_000 }],
    ["Crimean Khanate", { noFlag: true, continent: "Eastern Europe", note: "Crimean Khanate in 1700 — Tatar state under Ottoman suzerainty; vassal to the Sublime Porte.", population: 400_000 }],
    // European Powers
    ["Sweden", { noFlag: true, continent: "Northern Europe", note: "Swedish Empire in 1700 — the Great Northern War with Russia was just beginning (1700-1721). Still the dominant Baltic power.", population: 1_500_000 }],
    ["Denmark-Norway", { noFlag: true, continent: "Northern Europe", note: "Kalmar Union (Denmark-Norway) in 1700 — personal union of the two kingdoms under the Danish crown.", population: 1_200_000 }],
    ["Prussia", { noFlag: true, continent: "Central Europe", note: "Kingdom of Prussia in 1700 — under Frederick William I; a rising power that would dominate Central Europe under Frederick the Great (1740-1786).", population: 2_500_000 }],
    ["Venice", { noFlag: true, continent: "Italy", note: "Republic of Venice in 1700 — a declining maritime power; holding its Adriatic and Mediterranean colonies but losing trade dominance to Atlantic powers.", population: 1_500_000 }],
    ["Papal States", { noFlag: true, continent: "Italy", note: "Papal States in 1700 — ecclesiastical territories ruled by the Pope; stretched across central Italy.", population: 2_000_000 }],
    ["Sardinia", { noFlag: true, continent: "Italy", note: "Kingdom of Sardinia (Piedmont and Sardinia) in 1700 — Italian state that would become a leader in Italian unification in the 19th century.", population: 1_000_000 }],
    ["Naples", { noFlag: true, continent: "Italy", note: "Kingdom of Naples in 1700 — Spanish possession under Philip V following the War of Spanish Succession.", population: 4_000_000 }],
    // Indian Sultanates
    ["Deccan Sultanates", { noFlag: true, continent: "South Asia", note: "Deccan Sultanates in 1700 — including Bijapur, Golkonda, and Ahmadnagar; already declining and falling to Mughal expansion.", population: 8_000_000 }],
    ["Bengal Sultanate", { noFlag: true, continent: "South Asia", note: "Bengal Sultanate in 1700 — eastern India; semi-autonomous from the Mughal Empire; major trade center.", population: 15_000_000 }],
    ["Kingdom of Malabar", { noFlag: true, continent: "South Asia", note: "Hindu kingdoms of Malabar (Kerala) in 1700 — southern India; resisting both Mughal and European colonial expansion.", population: 2_000_000 }],
    // African Powers
    ["Songhai Empire (remnants)", { noFlag: true, continent: "West Africa", note: "Songhai Empire remnants in 1700 — the once-great empire had collapsed in 1591, fragmenting into smaller states.", population: 2_000_000 }],
    ["Mali Empire (remnants)", { noFlag: true, continent: "West Africa", note: "Mali Empire remnants in 1700 — the ancient empire was now small and declining; Songhai had replaced it as West Africa's dominant power.", population: 1_000_000 }],
    ["Mwenemutapa Empire", { noFlag: true, continent: "Southeast Africa", note: "Mwenemutapa Empire in 1700 — East/Southeast African gold-trading power; already under Portuguese pressure.", population: 2_000_000 }],
    ["Kongo Kingdom", { noFlag: true, continent: "Central Africa", note: "Kingdom of Kongo in 1700 — Central African state; torn by internal conflicts and Portuguese colonial interference.", population: 2_500_000 }],
    // Americas — European Colonial Powers
    ["British North America", { noFlag: true, continent: "North America", note: "British North America in 1700 — colonial settlements along the Atlantic coast; would grow into the Thirteen Colonies.", population: 250_000 }],
    ["Spanish Americas", { noFlag: true, continent: "South America / Central America / North America", note: "Spanish America in 1700 — vast colonial territories in Mexico, Central America, and South America under Spanish crown.", population: 8_000_000 }],
    ["Dutch Caribbean", { noFlag: true, continent: "Caribbean", note: "Dutch Caribbean colonies in 1700 — trading posts and sugar-producing islands under Dutch colonial control.", population: 100_000 }],
    // Additional Southeast Asian States
    ["Brunei Sultanate", { noFlag: true, continent: "Southeast Asia", note: "Brunei Sultanate in 1700 — Islamic sultanate on Borneo; maritime trading power competing with Dutch.", population: 200_000 }],
    ["Sulu Sultanate", { noFlag: true, continent: "Southeast Asia", note: "Sulu Sultanate in 1700 — Islamic state in southern Philippines; major pirate and trading power.", population: 600_000 }],
    ["Banjar Sultanate", { noFlag: true, continent: "Southeast Asia", note: "Banjar Sultanate in 1700 — Islamic sultanate on Borneo; pepper trading center.", population: 500_000 }],
    ["Mataram Sultanate", { noFlag: true, continent: "Southeast Asia", note: "Mataram Sultanate in 1700 — major Islamic power in Java; competing with Dutch influence.", population: 3_000_000 }],
    ["Aceh Sultanate", { noFlag: true, continent: "Southeast Asia", note: "Aceh Sultanate in 1700 — independent Islamic state in Sumatra; rival to Dutch and British traders.", population: 2_000_000 }],
    ["Champa remnants", { noFlag: true, continent: "Southeast Asia", note: "Champa remnants in 1700 — declining Hindu Kingdom in southern Vietnam; under Vietnamese and Siamese pressure.", population: 200_000 }],
    ["Minangkabau Sultanates", { noFlag: true, continent: "Southeast Asia", note: "Minangkabau sultanates in 1700 — confederation of Islamic states in Sumatra; trade centers.", population: 400_000 }],
    ["Burma (Myanmar)", { noFlag: true, continent: "Southeast Asia", note: "Kingdom of Burma in 1700 — Buddhist kingdom competing with Siam and smaller sultanates.", population: 3_500_000 }],
    ["Shan States", { noFlag: true, continent: "Southeast Asia", note: "Shan States in 1700 — semi-independent principalities in Burma; ethnic Shan peoples.", population: 1_000_000 }],
    // Additional Indian Regional Powers
    ["Bijapur Sultanate", { noFlag: true, continent: "South Asia", note: "Bijapur Sultanate in 1700 — Deccan Islamic sultanate; military power independent of Mughal Empire.", population: 4_000_000 }],
    ["Golkonda Sultanate", { noFlag: true, continent: "South Asia", note: "Golkonda Sultanate in 1700 — Deccan Islamic state; diamond trade center; independent from Mughal control.", population: 3_500_000 }],
    ["Hyderabad Nizam", { noFlag: true, continent: "South Asia", note: "Nizam of Hyderabad in 1700 — powerful Deccan region ruler; semi-autonomous from Mughal Empire.", population: 4_000_000 }],
    ["Mysore Kingdom", { noFlag: true, continent: "South Asia", note: "Mysore Kingdom in 1700 — Hindu kingdom in south India; resisting Islamic sultanates and European colonialism.", population: 3_000_000 }],
    ["Vijayanagara remnants", { noFlag: true, continent: "South Asia", note: "Vijayanagara remnants in 1700 — declining Hindu empire; fragmented into smaller kingdoms.", population: 2_000_000 }],
    ["Travancore Kingdom", { noFlag: true, continent: "South Asia", note: "Kingdom of Travancore (Kerala) in 1700 — Hindu kingdom in southern India; early European contacts.", population: 1_200_000 }],
    ["Cochin Kingdom", { noFlag: true, continent: "South Asia", note: "Kingdom of Cochin in 1700 — small Hindu kingdom in Kerala; involved in spice trade.", population: 600_000 }],
    // Additional North African and Mediterranean States
    ["Saadian Morocco", { noFlag: true, continent: "North Africa", note: "Saadian Dynasty in 1700 — ruling Morocco; Islamic sultanate; opposes Ottoman expansion.", population: 5_500_000 }],
    ["Hafsid Tunisia", { noFlag: true, continent: "North Africa", note: "Hafsid Dynasty in 1700 — ruling Tunisia; Ottoman tributary; Mediterranean naval power.", population: 2_000_000 }],
    ["Regency of Algiers", { noFlag: true, continent: "North Africa", note: "Ottoman Regency of Algiers in 1700 — North African province under Ottoman governance; Barbary corsair stronghold.", population: 1_000_000 }],
    ["Regency of Tunis", { noFlag: true, continent: "North Africa", note: "Ottoman Regency of Tunis in 1700 — Ottoman province; Barbary corsair base.", population: 600_000 }],
    ["Regency of Tripoli", { noFlag: true, continent: "North Africa", note: "Ottoman Regency of Tripoli in 1700 — Ottoman province in Libya; corsair and trade center.", population: 400_000 }],
    ["Darfur Sultanate", { noFlag: true, continent: "North Africa", note: "Sultanate of Darfur in 1700 — Islamic sultanate in Sudan; independent regional power.", population: 1_000_000 }],
    ["Funj Sultanate", { noFlag: true, continent: "East Africa", note: "Sultanate of Sennar (Funj) in 1700 — Islamic sultanate in Sudan; Nile valley power.", population: 1_200_000 }],
    // Additional West and Central African Kingdoms
    ["Ashanti Confederacy", { noFlag: true, continent: "West Africa", note: "Ashanti Confederacy in 1700 — powerful Akan confederation in West Africa; rising empire.", population: 2_500_000 }],
    ["Dahomey Kingdom", { noFlag: true, continent: "West Africa", note: "Kingdom of Dahomey in 1700 — rising West African military power; major slave trade participant.", population: 600_000 }],
    ["Wolof Empire", { noFlag: true, continent: "West Africa", note: "Wolof Empire in 1700 — West African power in Senegambia; declining but still influential.", population: 500_000 }],
    ["Hausa States", { noFlag: true, continent: "West Africa", note: "Hausa States in 1700 — confederation of Islamic city-states in Nigeria (Kano, Katsina, Zaria).", population: 2_500_000 }],
    ["Kanem-Bornu", { noFlag: true, continent: "West Africa", note: "Kanem-Bornu Empire in 1700 — ancient West African state; Islamic sultanate; declining but persistent.", population: 2_000_000 }],
    ["Lunda Empire", { noFlag: true, continent: "Central Africa", note: "Lunda Empire in 1700 — large Central African state; sophisticated political organization.", population: 2_500_000 }],
    ["Luba Kingdom", { noFlag: true, continent: "Central Africa", note: "Luba Kingdom in 1700 — Central African state; organized kingdom structure.", population: 1_800_000 }],
    ["Kasanje Kingdom", { noFlag: true, continent: "Central Africa", note: "Kasanje Kingdom in 1700 — Central African state; involved in slave trade networks.", population: 500_000 }],
    // Additional European States
    ["Saxony", { noFlag: true, continent: "Central Europe", note: "Saxony in 1700 — Germanic principality; major Central European power.", population: 2_000_000 }],
    ["Bavaria", { noFlag: true, continent: "Central Europe", note: "Bavaria in 1700 — major Germanic state in Holy Roman Empire; participant in War of Spanish Succession.", population: 1_500_000 }],
    ["Hanover", { noFlag: true, continent: "Central Europe", note: "Hanover in 1700 — German principality; would become important after 1714 (George I to Britain).", population: 800_000 }],
    ["Burgundy", { noFlag: true, continent: "Western Europe", note: "Free County of Burgundy in 1700 — Spanish possession; border territory between France and Spanish Netherlands.", population: 400_000 }],
    ["Spanish Netherlands", { noFlag: true, continent: "Western Europe", note: "Spanish Netherlands in 1700 — Spanish-controlled territories in Low Countries (after War of Spanish Succession went to Austria).", population: 2_000_000 }],
    ["Savoy", { noFlag: true, continent: "Italy", note: "Duchy of Savoy in 1700 — Italian alpine state; treaty-maker between France and Italy.", population: 600_000 }],
    ["Genoa", { noFlag: true, continent: "Italy", note: "Republic of Genoa in 1700 — declining maritime republic; still wealthy from Mediterranean trade.", population: 500_000 }],
    ["Modena", { noFlag: true, continent: "Italy", note: "Duchy of Modena in 1700 — small Italian state; Este dynasty.", population: 300_000 }],
    ["Parma", { noFlag: true, continent: "Italy", note: "Duchy of Parma in 1700 — small Italian state; Farnese dynasty.", population: 400_000 }],
    // Central Asian Khanates
    ["Bukhara Khanate", { noFlag: true, continent: "Central Asia", note: "Khanate of Bukhara in 1700 — Central Asian Islamic khanate; Silk Road trading center.", population: 600_000 }],
    ["Samarkand Khanate", { noFlag: true, continent: "Central Asia", note: "Samarkand region in 1700 — Central Asian city-state; major trading hub.", population: 300_000 }],
    ["Khorezm Khanate", { noFlag: true, continent: "Central Asia", note: "Khorezm khanate in 1700 — Central Asian state; Islamic sultanate.", population: 700_000 }],
    ["Kokand Khanate", { noFlag: true, continent: "Central Asia", note: "Kokand region in 1700 — Central Asian territory; will become khanate later; semi-autonomous.", population: 400_000 }],
    ["Yarkand Khanate", { noFlag: true, continent: "Central Asia", note: "Yarkand Khanate in 1700 — Silk Road oasis state in Xinjiang.", population: 200_000 }],
    ["Kashgar Khanate", { noFlag: true, continent: "Central Asia", note: "Kashgar Khanate in 1700 — Silk Road city-state in Xinjiang; major trading center.", population: 250_000 }],
    // Additional East Asian and Southeast Asian Powers
    ["Ryukyu Kingdom", { noFlag: true, continent: "East Asia", note: "Ryukyu Kingdom in 1700 — island kingdom (Okinawa) between Japan and China; tributary state.", population: 500_000 }],
    ["Nguyen Lords", { noFlag: true, continent: "Southeast Asia", note: "Nguyễn Lords in 1700 — ruling southern Vietnam; competing with Trịnh lords in north.", population: 3_000_000 }],
    ["Trinh Lords", { noFlag: true, continent: "Southeast Asia", note: "Trịnh Lords in 1700 — ruling northern Vietnam; competing with Nguyễn lords in south.", population: 2_000_000 }],
    ["Majapahit remnants", { noFlag: true, continent: "Southeast Asia", note: "Majapahit successor states in 1700 — fragmented remnants of Hindu-Buddhist empire in Java.", population: 1_500_000 }],
    // Australian Aboriginal Nations
    ["Yolngu peoples", { noFlag: true, continent: "Australia", note: "Yolngu peoples in 1700 — Aboriginal nation of northern Australia; sophisticated kinship systems.", population: 15_000 }],
    ["Wiradjuri Nation", { noFlag: true, continent: "Australia", note: "Wiradjuri Nation in 1700 — large Aboriginal confederation of inland southeastern Australia.", population: 20_000 }],
    ["Koori peoples", { noFlag: true, continent: "Australia", note: "Koori peoples in 1700 — Aboriginal nations of southeastern Australia; diverse communities.", population: 25_000 }],
    ["Noongar peoples", { noFlag: true, continent: "Australia", note: "Noongar peoples in 1700 — Aboriginal nation of southwestern Australia.", population: 12_000 }],
    // Pacific Island Kingdoms
    ["Hawaiian Islands", { noFlag: true, continent: "Pacific", note: "Hawaiian Islands in 1700 — multiple independent chiefdoms; not yet unified under single kingdom.", population: 400_000 }],
    ["Tongan Empire", { noFlag: true, continent: "Pacific", note: "Tongan Empire in 1700 — Polynesian kingdom; sophisticated political structure.", population: 50_000 }],
    ["Samoan confederation", { noFlag: true, continent: "Pacific", note: "Samoan confederation in 1700 — Polynesian societies; multiple chiefdoms.", population: 40_000 }],
    ["Fiji confederation", { noFlag: true, continent: "Pacific", note: "Fijian chiefdoms in 1700 — Pacific island confederation; semi-independent communities.", population: 120_000 }],
    // === Additional West African kingdoms (1700s) ===
    ["Oyo Empire (1700s)", { noFlag: true, continent: "West Africa", note: "Oyo Empire in 1700 — Height of Yoruba power; cavalry-based empire dominating West African interior.", population: 3_000_000 }],
    ["Ife Kingdom (1700s)", { noFlag: true, continent: "West Africa", note: "Kingdom of Ife in 1700 — Yoruba cultural center; declining but spiritually important.", population: 300_000 }],
    ["Benin Kingdom (1700s)", { noFlag: true, continent: "West Africa", note: "Kingdom of Benin in 1700 — Still powerful; continuing cultural tradition; declining trade with Portugal.", population: 1_200_000 }],
    ["Kano Emirate (1700s)", { noFlag: true, continent: "West Africa", note: "Kano Emirate in 1700 — Major Hausa trading city; commercial and manufacturing power.", population: 500_000 }],
    ["Katsina Emirate (1700s)", { noFlag: true, continent: "West Africa", note: "Katsina Emirate in 1700 — Hausa state; rival trading center on Saharan routes.", population: 400_000 }],
    ["Bornu Empire (1700s)", { noFlag: true, continent: "West / Central Africa", note: "Bornu Empire in 1700 — Still powerful; controlling Lake Chad region; continuing Islamic state.", population: 2_000_000 }],
    ["Songhai successor states", { noFlag: true, continent: "West Africa", note: "Songhai successor kingdoms in 1700 — Fragmented remnants of once-great empire; regional powers.", population: 1_500_000 }],
    ["Mali Empire remnants", { noFlag: true, continent: "West Africa", note: "Mali Kingdom in 1700 — Weakened remnant of once-great empire; regional power.", population: 500_000 }],
    // === Central African kingdoms (1700s) ===
    ["Kingdom of Kongo (1700s)", { noFlag: true, continent: "Central Africa", note: "Kingdom of Kongo in 1700 — Still major power; Christian state; declining Portuguese influence.", population: 3_000_000 }],
    ["Kingdom of Ndongo (1700s)", { noFlag: true, continent: "Central Africa", note: "Kingdom of Ndongo in 1700 — Weakened by Portuguese wars; still independent.", population: 1_000_000 }],
    ["Lunda Empire (1700s)", { noFlag: true, continent: "Central Africa", note: "Lunda Empire in 1700 — At height of power; vast Central African trading network.", population: 2_500_000 }],
    ["Luba Kingdom (1700s)", { noFlag: true, continent: "Central Africa", note: "Luba Kingdom in 1700 — Expanding power; competing with Lunda for regional dominance.", population: 2_000_000 }],
    ["Kanem-Bornu (1700s)", { noFlag: true, continent: "Central Africa", note: "Kanem-Bornu in 1700 — Still powerful Saharan state; controlling Lake Chad region.", population: 2_500_000 }],
    // === East African states (1700s) ===
    ["Omani Sultanate (1700s)", { noFlag: true, continent: "Western Asia / East Africa", note: "Sultanate of Oman in 1700 — At height of Arabian maritime power; controlling East African coast.", population: 400_000 }],
    ["Mombasa City-State (1700s)", { noFlag: true, continent: "East Africa", note: "Mombasa in 1700 — Swahili city-state; major East African trading port.", population: 120_000 }],
    ["Zanzibar City-State (1700s)", { noFlag: true, continent: "East Africa", note: "Zanzibar in 1700 — Swahili city-state; emerging as major spice and ivory market.", population: 100_000 }],
    ["Kilwa Sultanate (1700s)", { noFlag: true, continent: "East Africa", note: "Kilwa Sultanate in 1700 — Swahili trading city; declining from earlier prominence.", population: 70_000 }],
    ["Funj Sultanate (1700s)", { noFlag: true, continent: "East Africa / Northeast Africa", note: "Funj Sultanate (Sinnar) in 1700 — Sudanese Islamic state; controlling upper Nile region.", population: 2_000_000 }],
    ["Mutapa Empire (1700s)", { noFlag: true, continent: "Southern Africa", note: "Mutapa Empire in 1700 — Declining regional power; still significant in Zimbabwe region.", population: 1_200_000 }],
    // === North African states (1700s, Barbary) ===
    ["Regency of Algiers (1700s)", { noFlag: true, continent: "North Africa", note: "Regency of Algiers in 1700 — Ottoman Barbary regency; powerful corsair base.", population: 500_000 }],
    ["Regency of Tunis (1700s)", { noFlag: true, continent: "North Africa", note: "Regency of Tunis in 1700 — Ottoman Barbary regency; major Mediterranean power.", population: 400_000 }],
    ["Regency of Tripoli (1700s)", { noFlag: true, continent: "North Africa", note: "Regency of Tripoli in 1700 — Ottoman Barbary regency; controlling Libyan coast.", population: 300_000 }],
    ["Hausa Confederation (1700s)", { noFlag: true, continent: "West Africa", note: "Hausa Confederation in 1700 — Seven major city-states; trading confederation in northern Nigeria.", population: 2_500_000 }],
    // === Arabian peninsula (1700s) ===
    ["Oman Sultanate (1700s)", { noFlag: true, continent: "Western Asia", note: "Sultanate of Oman in 1700 — Arabian maritime sultanate; controlling strategic Indian Ocean routes.", population: 400_000 }],
    ["Hadramawt (1700s)", { noFlag: true, continent: "Western Asia / Arabia", note: "Hadramawt in 1700 — Arabian sultanate in Yemen region; wealthy merchant republic.", population: 600_000 }],
    ["Qatban (1700s)", { noFlag: true, continent: "Western Asia / Arabia", note: "Qatban in 1700 — Arabian kingdom; frankincense and myrrh trading power.", population: 350_000 }],
    ["Saudi Wahhabi Movement", { noFlag: true, continent: "Western Asia / Arabia", note: "Saudi Wahhabi Movement in 1700 — Emerging Islamic reform movement; 1744 alliance would establish Saud dynasty.", population: 100_000 }],
    // === South Asian sultanates (1700s) ===
    ["Adil Shahi (Bijapur) (1700s)", { noFlag: true, continent: "South Asia", note: "Adil Shahi of Bijapur in 1700 — Declining Deccan sultanate; annexed by Mughals in 1686.", population: 1_500_000 }],
    ["Qutb Shahi (Golkonda) (1700s)", { noFlag: true, continent: "South Asia", note: "Qutb Shahi of Golkonda in 1700 — Declining Deccan sultanate; annexed by Mughals in 1687.", population: 1_200_000 }],
    ["Nizam Shahi (Ahmadnagar) (1700s)", { noFlag: true, continent: "South Asia", note: "Nizam Shahi of Ahmadnagar in 1700 — Declining Deccan sultanate; annexed by Mughals in 1636.", population: 1_000_000 }],
    ["Kingdom of Travancore (1700s)", { noFlag: true, continent: "South Asia", note: "Kingdom of Travancore in 1700 — Thriving Hindu Kerala kingdom; major spice exporter.", population: 1_200_000 }],
    ["Kingdom of Cochin (1700s)", { noFlag: true, continent: "South Asia", note: "Kingdom of Cochin in 1700 — Hindu Kerala kingdom; competing with Travancore.", population: 800_000 }],
    // === Southeast Asian sultanates and kingdoms (1700s) ===
    ["Aceh Sultanate (1700s)", { noFlag: true, continent: "Southeast Asia", note: "Aceh Sultanate in 1700 — Major Islamic maritime power; still controlling pepper trade.", population: 1_200_000 }],
    ["Banjar Sultanate (1700s)", { noFlag: true, continent: "Southeast Asia", note: "Banjar Sultanate in 1700 — Emerging Islamic power in Kalimantan; trading sultanate.", population: 600_000 }],
    ["Minangkabau Kingdom (1700s)", { noFlag: true, continent: "Southeast Asia", note: "Minangkabau Kingdom in 1700 — West Sumatran Islamic state; spice-producing region.", population: 700_000 }],
    ["Palembang Sultanate (1700s)", { noFlag: true, continent: "Southeast Asia", note: "Palembang in 1700 — Sumatran sultanate; pepper trading sultanate.", population: 350_000 }],
    ["Makassar Sultanate (1700s)", { noFlag: true, continent: "Southeast Asia", note: "Makassar (Gowa) in 1700 — Major Bugis sultanate in Sulawesi; Islamic maritime power.", population: 600_000 }],
    ["Brunei Sultanate (1700s)", { noFlag: true, continent: "Southeast Asia", note: "Brunei in 1700 — Sultanate of northern Borneo; trading state; Muslim sultanate.", population: 120_000 }],
    ["Sulu Sultanate (1700s)", { noFlag: true, continent: "Southeast Asia", note: "Sulu Sultanate in 1700 — Philippine sultanate; Islamic maritime confederation; trading and raiding power.", population: 250_000 }],
    ["Champa (1700s)", { noFlag: true, continent: "Southeast Asia", note: "Champa in 1700 — Declining kingdom; absorbed by Đại Việt by 1693.", population: 300_000 }],
    ["Lannathai (1700s)", { noFlag: true, continent: "Southeast Asia", note: "Lannathai (Lan Na) in 1700 — Northern Thai kingdom; Buddhist state; competing with Ayutthaya.", population: 1_000_000 }],
    ["Shan States (1700s)", { noFlag: true, continent: "Southeast Asia", note: "Shan States in 1700 — Multiple Shan principalities in Burma region; semi-independent states.", population: 1_000_000 }],
    // === Central Asian khanates (1700s) ===
    ["Khwarezm (1700s)", { noFlag: true, continent: "Central Asia", note: "Khwarezm in 1700 — Central Asian khanate; Silk Road oasis state.", population: 600_000 }],
    ["Kashgar Khanate (1700s)", { noFlag: true, continent: "Central Asia / China", note: "Kashgar in 1700 — Silk Road oasis city-state; Islamic trading center.", population: 250_000 }],
    ["Yarkand Khanate (1700s)", { noFlag: true, continent: "Central Asia / China", note: "Yarkand in 1700 — Silk Road oasis state in Xinjiang; Islamic state.", population: 200_000 }],
    ["Kokand Khanate (1700s)", { noFlag: true, continent: "Central Asia", note: "Kokand in 1700 — Central Asian khanate; emerging Silk Road power.", population: 400_000 }],
    // === European states (1700s) ===
    ["Italian Duchy of Tuscany", { noFlag: true, continent: "Western Europe", note: "Duchy of Tuscany in 1700 — Italian state; competing power in Medici era.", population: 600_000 }],
    ["Republic of Genoa (1700s)", { noFlag: true, continent: "Western Europe", note: "Republic of Genoa in 1700 — Italian maritime republic; colonial power declining.", population: 350_000 }],
    ["Republic of Venice (1700s)", { noFlag: true, continent: "Western Europe", note: "Republic of Venice in 1700 — Major Italian maritime republic; still significant power.", population: 500_000 }],
    ["Duchy of Urbino (1700s)", { noFlag: true, continent: "Western Europe", note: "Duchy of Urbino in 1700 — Italian duchy; center of culture.", population: 180_000 }],
    ["Duchy of Mantua (1700s)", { noFlag: true, continent: "Western Europe", note: "Duchy of Mantua in 1700 — Italian duchy; competing power.", population: 250_000 }],
    ["Electorate of Bavaria (1700s)", { noFlag: true, continent: "Central Europe", note: "Bavaria in 1700 — Large German principality; major Holy Roman Empire territory.", population: 1_800_000 }],
    ["Electorate of Saxony (1700s)", { noFlag: true, continent: "Central Europe", note: "Saxony in 1700 — German principality; competing Holy Roman Empire territory.", population: 1_200_000 }],
    ["Electorate of Hanover (1700s)", { noFlag: true, continent: "Central Europe", note: "Hanover in 1700 — German principality; rising power in northern Germany.", population: 800_000 }],
    ["Electorate of Brandenburg (1700s)", { noFlag: true, continent: "Central Europe", note: "Brandenburg in 1700 — German principality; future Prussia; rising power.", population: 1_400_000 }],
    ["Kingdom of Prussia (1700s)", { noFlag: true, continent: "Central Europe", note: "Prussia in 1700 — Emerging German kingdom; rising military power; became major European force.", population: 1_600_000 }],
    ["Duchy of Silesia", { noFlag: true, continent: "Central Europe", note: "Silesia in 1700 — Central European duchy; disputed territory between states.", population: 1_200_000 }],
    ["Kingdom of Poland (1700s)", { noFlag: true, continent: "Eastern Europe", note: "Polish-Lithuanian Commonwealth in 1700 — Large Eastern European state; declining power.", population: 8_500_000 }],
    ["Kingdom of Denmark (1700s)", { noFlag: true, continent: "Northern Europe", note: "Denmark in 1700 — Nordic kingdom; Baltic power; competing with Sweden.", population: 800_000 }],
    ["Kingdom of Sweden (1700s)", { noFlag: true, continent: "Northern Europe", note: "Sweden in 1700 — Nordic kingdom; Baltic power; competing with Russia and Denmark.", population: 1_500_000 }],
    ["Kingdom of Scotland (1700s)", { noFlag: true, continent: "Northern Europe", note: "Scotland in 1700 — Independent kingdom until 1707 union with England.", population: 1_200_000 }],
    ["Kingdom of Ireland (1700s)", { noFlag: true, continent: "Northern Europe", note: "Ireland in 1700 — Under English rule; Irish parliament; competing for independence.", population: 1_500_000 }],
    ["Portuguese Empire (1700s)", { noFlag: true, continent: "Iberia / Worldwide", note: "Portugal in 1700 — European kingdom; vast overseas colonial empire.", population: 2_500_000 }],
    ["Spanish Empire (1700s)", { noFlag: true, continent: "Iberia / Worldwide", note: "Spain in 1700 — Major European power; huge overseas colonial empire.", population: 9_000_000 }],
    ["Grand Duchy of Moscow (1700s)", { noFlag: true, continent: "Eastern Europe", note: "Russia (Tsardom) in 1700 — Expanding Eastern European power; Peter the Great era begins.", population: 15_000_000 }],
  ])],
  ["ad1815", new Map<string, PolityInfo>([
    // Filed under the name POLITY_NAME_FOR_ERA shows, so the panel describes the Caribbean
    // colonies rather than inheriting Britain's own registry entry. `ruler` (not
    // `modernName`) is what makes the panel caption the Union Jack as the ruler's flag and
    // fill the "Ruled by" row — a colony's card must never imply the flag was its own.
    ["British West Indies", { ruler: "United Kingdom", continent: "Caribbean", note: "Britain's Caribbean colonies in 1815 — Jamaica, the Bahamas, Barbados and the Leeward and Windward islands, together with the Belize logwood settlement and the Mosquito Coast. Sugar islands run by planter assemblies under the Union Jack; the slave trade had been abolished in 1807, slavery itself would last until 1833.", population: 900_000 }],
    // AUDIT 2026-08 (goal 3): Siam's flag changed four times between 1782 and 1917, so the one
    // curated image the registry carried could only ever be right for one era. In 1815 the state
    // flag was the red field with a white chakra. https://en.wikipedia.org/wiki/Flag_of_Thailand
    ["Rattanakosin Kingdom", { flag: "historical-flags/siam-1782.svg", continent: "Southeast Asia", note: "Rattanakosin Siam under Rama II — the early Chakri kingdom, its state flag a white chakra on red.", population: 4_000_000 }],
    ["France", { flag: "historical-flags/france-bourbon.png", continent: "Western Europe", note: "Bourbon Restoration (1814–1830) — France flew the white royal banner with fleur-de-lis. The tricolour wasn't readopted until 1830.", population: 30_500_000 }],
    ["United States", { flag: "historical-flags/us-15star.png", continent: "North America", note: "The Star-Spangled Banner, 1795–1818: 15 stars and 15 stripes. A star+stripe pair was added for every new state until 1818.", population: 8_400_000 }],
    ["Portugal", { flag: "historical-flags/portugal-1750.svg", continent: "Iberia", note: "United Kingdom of Portugal, Brazil and the Algarves (1815–1825). The familiar red-and-green Portuguese flag wasn't adopted until 1911.", population: 3_100_000 }],
    ["Portuguese East Africa", { ruler: "Portugal", continent: "East Africa", note: "Portuguese Mozambique, ruled from Lisbon under the UKPBA banner.", population: 2_000_000 }],
    ["Portuguese Guinea", { ruler: "Portugal", continent: "West Africa", note: "Portuguese colony in modern Guinea-Bissau.", population: 200_000 }],
    ["Delagoa Bay", { ruler: "Portugal", continent: "East Africa", note: "Portuguese trading post in modern Mozambique.", population: 5_000 }],
    ["Goa", { ruler: "Portugal", continent: "South Asia", note: "Portuguese India — held until 1961.", population: 250_000 }],
    // Dutch Malacca — held by the Dutch until 1825 cession to Britain.
    ["Dutch Malacca", { modernName: "Netherlands", continent: "Southeast Asia", note: "Former Malay sultanate; held by the Dutch 1641–1825 before being ceded to Britain. Flew the Dutch tricolour.", population: 25_000 }],
    // Note: Johor, Kedah, Perak, Selangor, Pahang, Terengganu, Kelantan,
    // Negeri Sembilan, Perlis, Brunei Sultanate, British Penang are all in
    // the global POLITY_REGISTRY and don't need era-specific overrides here.
    // Burma in 1815 = Konbaung dynasty. Used golden-peacock royal banners
    // but had no standardised national flag.
    ["Burma", { continent: "Southeast Asia", note: "Konbaung dynasty of Burma, 1752–1885. Royal banners used the green peacock; no standardised national flag.", population: 3_500_000, noFlag: true }],
    ["Ceylon", { modernName: "United Kingdom", continent: "South Asia", note: "Ceded by the Dutch to the British in 1796; in 1815 the British annexed the Kandyan Kingdom. Ceylon became a Crown Colony flying the Union Jack.", population: 1_500_000 }],
    ["Egypt", { continent: "North Africa", note: "Ottoman Egypt under Muhammad Ali — autonomous viceroyalty. The Khedive's 3-star crescent flag was adopted later under Ismail; in 1815 the Ottoman banner flew.", population: 4_500_000, noFlag: true }],
    ["Yemen", { continent: "Arabia", note: "Zaydi Imamate of Yemen plus Ottoman garrisons on the coast — no national flag.", population: 2_000_000, noFlag: true }],
    ["Annam", { continent: "Southeast Asia", note: "Annam in 1815 was part of Nguyen-dynasty Vietnam (Đại Nam) under Emperor Gia Long. Royal banners used yellow with red imperial characters.", population: 6_500_000, noFlag: true }],
    ["Cochin China", { continent: "Southeast Asia", note: "Cochinchina under the Nguyen dynasty — southern Vietnam. Same Nguyen royal yellow banner as Annam.", population: 3_000_000, noFlag: true }],
    ["Morocco", { continent: "North Africa", note: "Alawi Sultanate of Morocco — flew a plain red flag in 1815; the green pentagram wasn't added until 1915.", population: 3_500_000, noFlag: true }],
    ["Ethiopia", { continent: "East Africa", note: "Era of the Princes (Zemene Mesafint) — emperors in Gondar held only nominal authority; no national flag.", population: 4_000_000, noFlag: true }],
    // Haiti — independent republic since 1804; the blue-and-red bicolour
    // adopted in 1820 is essentially the same as today's.
    ["Haiti", { modernName: "Haiti", continent: "Caribbean", note: "Republic of Haiti — the world's first Black republic, independent since 1804. The blue-and-red bicolour has been in use since 1820.", population: 700_000 }],
    // United Provinces of La Plata — precursor to Argentina (1810–1831).
    ["United Provinces of La Plata", { modernName: "Argentina", continent: "South America", note: "United Provinces of the Río de la Plata — precursor to Argentina. The sky-blue and white flag with the Sun of May was adopted in 1818.", population: 500_000 }],
    // Japan in 1815 = Tokugawa Shogunate. Use the Tokugawa shogunate banner.
    ["Japan", { flag: "historical-flags/japan-shogunate.png", continent: "East Asia", note: "Tokugawa Shogunate Japan — late Edo period. The Tokugawa mon (three hollyhock leaves) was the shogunate's emblem; the Hinomaru became the official national flag only in 1870.", population: 30_000_000 }],
    // Korea in 1815 = Joseon (Yi) dynasty, no national flag.
    ["Korea", { noFlagReason: "No flag shown — Joseon Korea had no national flag until the Taegukgi was designed in 1882 and adopted in 1883.", continent: "East Asia", note: "Joseon (Yi) dynasty of Korea — no standardised national flag until the Taegukgi in 1882.", noFlag: true, population: 7_000_000 }],
    // Afghanistan — no standardised flag.
    ["Afghanistan", { continent: "Central Asia", note: "Durrani/Barakzai emirate — no standardised national flag in this era.", noFlag: true, population: 4_000_000 }],
    // Cambodia — no flag before French colonisation.
    ["Cambodia", { continent: "Southeast Asia", note: "Khmer kingdom under Vietnamese and Siamese pressure — no standardised flag before the French colonial period.", noFlag: true, population: 1_000_000 }],
    // Hong Kong in 1815 was still Qing China — British sovereignty began 1842.
    ["Hong Kong", { continent: "East Asia", note: "In 1815 Hong Kong Island was Qing Chinese territory — Britain didn't acquire it until the Treaty of Nanking (1842).", noFlag: true, population: 5_000 }],
    // Philippines in 1815 = Spanish colony
    ["Philippines", { flag: "historical-flags/spain-1785.png", continent: "Southeast Asia", note: "Spanish colonial Philippines — the red-yellow-red Crown of Castile flag flew until the 1898 revolution.", population: 2_500_000 }],
    // New South Wales in 1815 = British Crown Colony (est. 1788).
    ["New South Wales", { modernName: "United Kingdom", continent: "Oceania", note: "British Crown Colony of New South Wales — established as a penal colony in 1788. The Union Jack flew over the colony until Australian federation in 1901.", population: 30_000 }],
    // Luxembourg tricolour adopted 1845 — wrong for 1815 (part of German Confederation).
    ["Luxembourg", { noFlag: true, continent: "Western Europe", note: "Grand Duchy of Luxembourg in 1815 — member of the German Confederation after the Congress of Vienna. The red-white-blue tricolour wasn't adopted until 1845.", population: 300_000 }],
    // Siam (Rattanakosin) used the red elephant flag — different from the 1917 tricolour.
    ["Siam", { flag: "historical-flags/siam.png", continent: "Southeast Asia", note: "Kingdom of Siam (Rattanakosin) — Chakri dynasty, capital Bangkok. The red-field white elephant flag was in use; the modern Thai tricolour wasn't adopted until 1917.", population: 4_000_000 }],
    // Ottoman Empire in 1815: the 1844 crescent-and-star was 29 years away.
    // Red crescent banners were used informally but not standardised yet.
    ["Ottoman Empire", { noFlag: true, continent: "SE Europe / Western Asia", note: "Ottoman Empire in 1815 — under Mahmud II. The crescent-and-star flag wasn't standardised until 1844, 29 years after this era.", population: 25_000_000 }],
    // Russian Empire — consolidated feature in world_1815.geojson
    ["Russian Empire", { flag: "historical-flags/russian-empire.png", continent: "Eastern Europe / Asia", note: "Russian Empire in 1815 — under Tsar Alexander I, spanning from Eastern Europe across Asia. The white-blue-red flag was the imperial standard (modern tricolour dating from 1696).", population: 41_000_000 }],
    // United Kingdom of Great Britain and Ireland — consolidated feature in world_1815.geojson
    ["United Kingdom of Great Britain and Ireland", { modernName: "United Kingdom", continent: "Western Europe", note: "United Kingdom of Great Britain and Ireland — the union of England, Scotland, Ireland and Wales under the Union Jack (adopted 1801 after the Act of Union).", population: 18_500_000 }],
    // Manchu Empire (Qing China) in 1815 — no standardised national flag yet
    ["Manchu Empire", { noFlagReason: "No flag shown — imperial China had no national flag at this date. The Qing adopted their first, the triangular yellow dragon banner, only in 1862.", noFlag: true, continent: "East Asia", note: "Qing China under the Jiaqing and Daoguang emperors — no standardised national flag. The Yellow Dragon banner wouldn't be adopted until 1889.", population: 360_000_000 }],
    // --- German Confederation states (post-Congress of Vienna, 1815) -----------
    ["Austrian Empire", { flag: "historical-flags/austrian-empire.png", noFlag: true, continent: "Central Europe", note: "Austrian Empire — dominant German state; President of the German Confederation.", population: 14_000_000 }],
    ["Bavaria", { noFlag: true, continent: "Central Europe", note: "Kingdom of Bavaria — major German state post-Vienna Congress; retained independence.", population: 3_500_000 }],
    ["Württemberg", { noFlag: true, continent: "Central Europe", note: "Kingdom of Württemberg — German state; promoted to kingdom status at the Congress of Vienna.", population: 1_500_000 }],
    ["Saxony", { noFlag: true, continent: "Central Europe", note: "Kingdom of Saxony — major German power; one of the original members of the German Confederation.", population: 2_000_000 }],
    ["Prussia", { noFlag: true, continent: "Central Europe / Eastern Europe", note: "Kingdom of Prussia — major German power; rising military dominance. The black-white-red flag wasn't standardised until later.", population: 10_000_000 }],
    ["Hanover", { noFlag: true, continent: "Northern Europe", note: "Kingdom of Hanover — German state; personal union with Britain under George III.", population: 1_800_000 }],
    ["Hesse-Darmstadt", { noFlag: true, continent: "Central Europe", note: "Grand Duchy of Hesse — German state, member of the Confederation.", population: 500_000 }],
    ["Baden", { noFlag: true, continent: "Central Europe", note: "Grand Duchy of Baden — southwestern German state; liberal-leaning.", population: 1_100_000 }],
    ["Mecklenburg-Schwerin", { noFlag: true, continent: "Northern Europe", note: "Grand Duchy of Mecklenburg-Schwerin — Baltic German state.", population: 600_000 }],
    ["Holstein", { noFlag: true, continent: "Northern Europe", note: "Duchy of Holstein — under Danish rule as a German Confederation member.", population: 400_000 }],
    // --- Italian states (post-Napoleonic) -----------------------------------------
    ["Two Sicilies", { noFlag: true, continent: "Italy", note: "Kingdom of the Two Sicilies (Naples and Sicily) — Italian kingdom on the southern peninsula.", population: 7_500_000 }],
    ["Papal States", { noFlag: true, continent: "Italy", note: "Papal States — territories ruled directly by the Pope; independent Italian state until 1870.", population: 1_200_000 }],
    ["Tuscany", { noFlag: true, continent: "Italy", note: "Grand Duchy of Tuscany (Florence) — Italian state restored by Vienna Congress.", population: 1_100_000 }],
    ["Parma", { noFlag: true, continent: "Italy", note: "Duchy of Parma — small Italian state restored to legitimist rule after Napoleonic Wars.", population: 450_000 }],
    ["Modena", { noFlag: true, continent: "Italy", note: "Duchy of Modena and Reggio — Italian state; Este dynasty restored.", population: 350_000 }],
    ["Sardinia", { noFlag: true, continent: "Italy", note: "Kingdom of Sardinia — Italian state including Piedmont, capital Turin. Later became Kingdom of Italy.", population: 2_400_000 }],
    // --- Swiss and Lowland states ------------------------------------------------
    ["Switzerland", { noFlag: true, continent: "Central Europe", note: "Swiss Confederation (post-Vienna) — federal system of cantons; restored independence.", population: 1_700_000 }],
    ["Belgium", { noFlag: true, continent: "Western Europe", note: "United Kingdom of the Netherlands — Belgium remained under Dutch rule; independence in 1830.", population: 3_600_000 }],
    // --- Iberian & smaller European states ---------------------------------------
    ["Norway", { noFlag: true, continent: "Northern Europe", note: "Kingdom of Norway — personal union with Sweden (1814-1905); nominally independent.", population: 900_000 }],
    ["Denmark", { flag: "flags/dk.svg", noFlag: true, continent: "Northern Europe", note: "Kingdom of Denmark — European power; ruled Norway and various European and Atlantic territories.", population: 900_000 }],
    ["Greece", { noFlag: true, continent: "SE Europe", note: "Ottoman Greece — enslaved Ottoman province; War of Independence 1821-1829 lay just ahead.", population: 800_000 }],
    ["Serbia", { noFlag: true, continent: "SE Europe", note: "Principality of Serbia — Ottoman subject; autonomy growing after 1815 revolts against Ottoman rule.", population: 400_000 }],
    ["Wallachia", { noFlag: true, continent: "SE Europe", note: "Principality of Wallachia — Ottoman vassal in the Balkans; Romanian-speaking principality.", population: 1_500_000 }],
    ["Moldavia", { noFlag: true, continent: "SE Europe", note: "Principality of Moldavia — Ottoman vassal; Romanian principality.", population: 800_000 }],
    ["Polish-Lithuanian Commonwealth", { noFlag: true, continent: "Eastern Europe", note: "Congress Poland (part of Russian Empire) — puppet state; remainder partitioned among Russia, Prussia, Austria.", population: 3_200_000 }],
    // --- South American republics (early) ----------------------------------------
    ["Gran Colombia", { noFlag: true, continent: "South America", note: "Gran Colombia — newly independent state formed 1819-1821 combining modern Colombia, Venezuela, Ecuador, Panama.", population: 1_500_000 }],
    ["Peru", { noFlag: true, continent: "South America", note: "Viceroyalty of Peru — Spanish colonial territory; independent republic from 1821.", population: 1_200_000 }],
    ["Chile", { noFlag: true, continent: "South America", note: "Chile — Spanish colonial territory on the Pacific; independence 1810, secured by 1818.", population: 1_000_000 }],
    ["Rio de la Plata", { noFlag: true, continent: "South America", note: "United Provinces of the Río de la Plata — early name for Argentina; independence from Spain 1810.", population: 600_000 }],
    ["Empire of Brazil", { flag: "historical-flags/empire-of-brazil.png", continent: "South America", note: "Empire of Brazil under Dom João VI — Portuguese royal family fled to Brazil in 1808; ruled from Rio de Janeiro.", population: 4_000_000 }],
  ])],

  // === 1880 (Scramble for Africa) overrides =================================
  // Replaces the former 1850 block, which was written against a fabricated map
  // (see the era list above). Every entry below is keyed to a NAME that actually
  // occurs in world_1880.geojson and states 1880's flag situation, not 1850's.
  // Pre-1900 eras never auto-borrow a modern flag, so `modernName` is used ONLY
  // where the flag flown in 1880 is the same design the country flies today.
  ["ad1880", new Map<string, PolityInfo>([
    ["Oman", { flag: "historical-flags/muscat-oman.svg", continent: "Western Asia", note: "Sultanate of Muscat and Oman — its East African empire lost with Zanzibar's separation in 1856; a plain red flag flew until 1970.", population: 800_000 }],
    // Nepal's double-pennon predates every era on this map; the version bundled here is the
    // one flown before the 1962 constitution standardised its geometry.
    ["Nepal", { flag: "historical-flags/nepal-1743.svg", continent: "South Asia", note: "Kingdom of Nepal under the Rana prime ministers — the Shah kings reigned but did not rule. Its double-pennon is the world's only non-quadrilateral national flag.", population: 5_000_000 }],
    // AUDIT 2026-08 (goal 3): the modern Montenegrin flag dates from 2004, so the card was
    // blank; the principality flew this one from 1860.
    ["Montenegro", { flag: "historical-flags/montenegro-1860.svg", continent: "Southeast Europe", note: "Principality of Montenegro — recognised as independent by the Congress of Berlin in 1878 after centuries of resisting Ottoman rule.", population: 200_000 }],
    // AUDIT 2026-08 (goal 3): Mongkut's white elephant on red, 1855–1917 — the chakra flag the
    // registry carried had been replaced 25 years earlier.
    ["Rattanakosin Kingdom", { flag: "historical-flags/siam-1855.svg", continent: "Southeast Asia", note: "Siam under Chulalongkorn (Rama V) — modernising fast and the only Southeast Asian state to stay independent; its flag was the white elephant on red.", population: 6_000_000 }],
    ["Italy", { flag: "historical-flags/italy-kingdom.svg", continent: "Italy", note: "Kingdom of Italy — the green-white-red tricolour carried the Savoy arms from unification in 1861 until the republic removed them in 1946.", population: 28_400_000 }],
    // --- Great powers -------------------------------------------------------
    // 38-star flag, in use 4 Jul 1877 - 3 Jul 1890 (Colorado's admission).
    ["United States of America", { flag: "historical-flags/us-38star.svg", continent: "North America", note: "The United States in 1880 flew the 38-star flag (1877-1890) - Colorado had just been admitted. Twelve more stars were added before the 50-star flag of 1960.", population: 50_200_000 }],
    // Qing in 1880 used the TRIANGULAR yellow dragon banner (1862-1889); the
    // rectangular version we have bundled was only promulgated in 1888/89, so
    // showing it here would be the wrong flag rather than no flag.
    ["Manchu Empire", { noFlag: true, continent: "East Asia", noFlagReason: "No flag shown — the Qing dragon banner of 1880 was the TRIANGULAR version used from 1862; the familiar rectangular Yellow Dragon flag came only in 1889, and no image of the triangular one is bundled.", note: "Qing China under the Guangxu Emperor. The Yellow Dragon banner of 1880 was TRIANGULAR (1862-1889, naval and government use); the familiar rectangular dragon flag was not adopted until 1889.", population: 380_000_000 }],
    ["Germany", { flag: "historical-flags/german-empire.png", continent: "Central Europe", note: "German Empire - unified in 1871 under Wilhelm I and Bismarck. The black-white-red tricolour flew until 1918; today's black-red-gold dates from 1949.", population: 45_200_000 }],
    ["Austria Hungary", { flag: "historical-flags/austria-hungary.png", continent: "Central Europe", note: "Austria-Hungary - the Habsburg dual monarchy created by the 1867 Compromise.", population: 37_800_000 }],
    ["France", { modernName: "France", continent: "Western Europe", note: "French Third Republic (1870-1940), founded after defeat in the Franco-Prussian War. The tricolour of 1880 is the flag France flies today.", population: 37_700_000 }],
    ["Russian Empire", { flag: "historical-flags/russia-1858.svg", continent: "Eastern Europe / North Asia", note: "Russian Empire under Alexander II, in the last year of his reign.", population: 97_700_000 }],
    ["Ottoman Empire", { flag: "historical-flags/ottoman-empire.png", continent: "SE Europe / Western Asia", note: "Ottoman Empire after the 1877-78 Russo-Turkish War, which cost it most of its Balkan territory. The crescent-and-star flag was standardised in 1844.", population: 20_000_000 }],
    // Consolidated features from world_1880.geojson
    ["United Kingdom of Great Britain and Ireland", { modernName: "United Kingdom", continent: "Western Europe", note: "United Kingdom of Great Britain and Ireland at the height of the British Empire, ruling India, Canada, Australia, and numerous colonies worldwide.", population: 35_000_000 }],
    ["Kingdom of Brazil", { flag: "historical-flags/empire-of-brazil.png", continent: "South America", note: "Empire of Brazil under Dom Pedro II — the monarchy flew the green flag with the golden lozenge and imperial arms. The empire would fall in 1889, giving way to a republic.", population: 10_000_000 }],
    ["Imperial Japan", { flag: "historical-flags/japan-1870.svg", continent: "East Asia", note: "Meiji Japan - rapidly industrialising after the 1868 Restoration. The Hinomaru became the national flag in 1870, in the seven-by-ten form shown here; today's proportions and brighter crimson date from the 1999 flag law.", population: 36_600_000 }],
    ["Portugal", { flag: "historical-flags/portugal-1830.png", continent: "Iberia", note: "Kingdom of Portugal - the blue-and-white constitutional monarchy flag flew from 1830 to 1910; the modern green-and-red was adopted in 1911.", population: 4_600_000 }],
    // --- Colonies and dependencies (they flew the ruling power's flag) ------
    ["Algeria", { ruler: "France", continent: "North Africa", note: "French Algeria - administered as departments of France since 1848.", population: 3_300_000 }],
    ["Senegal", { ruler: "France", continent: "West Africa", note: "French Senegal - Saint-Louis and Goree, the base for France's West African expansion.", population: 800_000 }],
    ["French Indochina", { modernName: "France", continent: "Southeast Asia", note: "French Cochinchina and the Cambodian protectorate; Annam and Tonkin followed in 1883-85.", population: 10_000_000 }],
    ["Annam", { noFlag: true, continent: "Southeast Asia", noFlagReason: "No flag shown — Nguyễn-dynasty Vietnam used imperial yellow court banners, not a national flag in the modern sense; Vietnam's first national flags date from the 20th century.", note: "Nguyen-dynasty Vietnam under mounting French pressure - the French protectorate came in 1883. Royal yellow banners were used; there was no modern-style national flag.", population: 8_000_000 }],
    ["Angola", { ruler: "Portugal", continent: "Central Africa", note: "Portuguese Angola - coastal control only; the interior was conquered after the 1884-85 Berlin Conference.", population: 2_000_000 }],
    ["Mozambique", { continent: "East Africa", note: "Portuguese Mozambique - a chain of coastal stations rather than the later colony.", population: 2_500_000 }],
    ["Portuguese Guinea", { flag: "historical-flags/portugal-1830.png", continent: "West Africa", note: "Portuguese Guinea, in modern Guinea-Bissau.", population: 300_000 }],
    ["Philippines", { flag: "historical-flags/spain-1785.png", continent: "Southeast Asia", note: "Spanish colonial Philippines - the red-yellow-red flag flew until the 1898 revolution.", population: 5_500_000 }],
    ["British Raj", { modernName: "United Kingdom", continent: "South Asia", note: "British India - Victoria had been proclaimed Empress of India in 1876. The Union Jack and the Star of India flew over it.", population: 250_000_000 }],
    ["Ceylon", { modernName: "United Kingdom", continent: "South Asia", note: "British Crown Colony of Ceylon - the Union Jack flew until independence in 1948.", population: 2_800_000 }],
    ["Hong Kong", { modernName: "United Kingdom", continent: "East Asia", note: "British Crown Colony of Hong Kong, ceded by Qing China in 1842.", population: 160_000 }],
    ["Malaya", { modernName: "United Kingdom", continent: "Southeast Asia", note: "The Straits Settlements and the Malay states drawn into British protection from 1874.", population: 1_000_000 }],
    ["Canada", { modernName: "United Kingdom", continent: "North America", note: "Dominion of Canada - self-governing since 1867 but flying British flags; the Maple Leaf is from 1965.", population: 4_300_000 }],
    ["Cape Colony", { modernName: "United Kingdom", continent: "Southern Africa", note: "British Cape Colony, self-governing since 1872.", population: 720_000 }],
    ["Natal", { modernName: "United Kingdom", continent: "Southern Africa", note: "British Colony of Natal, annexed in 1843.", population: 400_000 }],
    ["Basutoland", { modernName: "United Kingdom", continent: "Southern Africa", note: "Basutoland (modern Lesotho) - a British protectorate from 1868; the Gun War against disarmament broke out in 1880.", population: 130_000 }],
    ["Gold Coast (GB)", { modernName: "United Kingdom", continent: "West Africa", note: "British Gold Coast, a crown colony since 1874 after the Anglo-Asante wars.", population: 500_000 }],
    ["New South Wales (UK)", { modernName: "United Kingdom", continent: "Oceania", note: "British colony of New South Wales - the Australian colonies did not federate until 1901.", population: 750_000 }],
    ["Victoria (UK)", { modernName: "United Kingdom", continent: "Oceania", note: "British colony of Victoria, enriched by the 1850s gold rushes.", population: 860_000 }],
    ["Queensland (UK)", { modernName: "United Kingdom", continent: "Oceania", note: "British colony of Queensland, separated from New South Wales in 1859.", population: 210_000 }],
    ["South Australia (UK)", { modernName: "United Kingdom", continent: "Oceania", note: "British colony of South Australia, founded 1836.", population: 270_000 }],
    ["Western Australia (UK)", { modernName: "United Kingdom", continent: "Oceania", note: "British colony of Western Australia.", population: 30_000 }],
    ["Northern Territory (UK)", { modernName: "United Kingdom", continent: "Oceania", note: "The Northern Territory, administered by South Australia from 1863.", population: 5_000 }],
    ["British Guiana", { modernName: "United Kingdom", continent: "South America", note: "British Guiana (modern Guyana) - the modern flag dates from independence in 1966.", population: 250_000 }],
    ["Dutch Guiana", { modernName: "Netherlands", continent: "South America", note: "Dutch Guiana (modern Suriname) - Dutch until independence in 1975.", population: 60_000 }],
    ["Netherlands Indies", { modernName: "Netherlands", continent: "Southeast Asia", note: "Netherlands East Indies - the Aceh War was in its eighth year.", population: 28_000_000 }],
    // --- Independent states whose 1880 flag is the flag they fly today -----
    ["Mexico", { flag: "historical-flags/mexico-1823.svg", modernName: "Mexico", continent: "Mesoamerica", note: "Mexico under Porfirio Diaz. The green-white-red tricolour dates from independence in 1821.", population: 9_400_000 }],
    ["Argentina", { modernName: "Argentina", continent: "South America", note: "Argentina - Buenos Aires had just been federalised as the national capital (1880). The Sun of May flag dates from 1818.", population: 2_500_000 }],
    ["Empire of Brazil", { flag: "historical-flags/empire-of-brazil.png", continent: "South America", note: "Empire of Brazil under Pedro II. The green flag with the golden lozenge and imperial arms was replaced when Brazil became a republic in 1889.", population: 11_700_000 }],
    ["Chile", { modernName: "Chile", continent: "South America", note: "Chile, at war with Peru and Bolivia in the War of the Pacific (1879-1884). The lone-star flag dates from 1817.", population: 2_200_000 }],
    ["Peru", { modernName: "Peru", continent: "South America", note: "Peru, fighting the War of the Pacific. The red-white-red tricolour dates from 1825.", population: 2_700_000 }],
    ["Bolivia", { modernName: "Bolivia", continent: "South America", note: "Bolivia, which lost its coastline in the War of the Pacific. The red-yellow-green tricolour dates from 1851.", population: 1_200_000 }],
    ["Colombia", { modernName: "Colombia", continent: "South America", note: "The United States of Colombia - the yellow-blue-red tricolour descends from Gran Colombia (1819).", population: 3_000_000 }],
    ["Venezuela", { flag: "historical-flags/venezuela-1863.svg", modernName: "Venezuela", continent: "South America", note: "Venezuela under Antonio Guzman Blanco; the tricolour descends from Gran Colombia.", population: 2_100_000 }],
    ["Ecuador", { modernName: "Ecuador", continent: "South America", note: "Ecuador - the yellow-blue-red flag with the coat of arms was adopted in 1860.", population: 1_100_000 }],
    ["Uruguay", { modernName: "Uruguay", continent: "South America", note: "Uruguay - the Sun of May flag dates from 1830.", population: 440_000 }],
    ["Paraguay", { modernName: "Paraguay", continent: "South America", note: "Paraguay, recovering from the catastrophic War of the Triple Alliance (1864-70).", population: 340_000 }],
    ["Haiti", { modernName: "Haiti", continent: "Caribbean", note: "Republic of Haiti - the blue-and-red bicolour with the arms has been used since 1820.", population: 1_000_000 }],
    ["Dominican Republic", { modernName: "Dominican Republic", continent: "Caribbean", note: "Dominican Republic - the flag dates from independence from Haiti in 1844.", population: 400_000 }],
    ["Liberia", { modernName: "Liberia", continent: "West Africa", note: "Republic of Liberia - independent since 1847; the Lone Star flag is unchanged.", population: 700_000 }],
    ["Tonga", { modernName: "Tonga", continent: "Pacific", note: "Kingdom of Tonga - the red flag with its canton cross was fixed in the 1875 constitution and is unchanged today.", population: 25_000 }],
    ["Sweden\u2013Norway", { modernName: "Sweden", continent: "Northern Europe", note: "The union of Sweden and Norway (1814\u20131905); Sweden's blue-and-gold cross is essentially today's flag.", population: 6_400_000 }],
    // --- Independent states whose 1880 flag is NOT today's flag -------------
    ["Egypt", { noFlag: true, noFlagReason: "No flag shown — the khedivate flew a red flag with a white crescent and three stars from 1867, and the version bundled here is the 1882 one used under the British occupation.", continent: "North Africa", note: "Khedivate of Egypt - nominally Ottoman, deep in the debt crisis that brought British occupation in 1882. Red with a white crescent and three stars.", population: 6_800_000 }],
    ["Ethiopia", { noFlag: true, continent: "East Africa", noFlagReason: "No flag shown — in 1880 Ethiopia's green, yellow and red flew as three separate pennants; they were combined into the single tricolour with the Lion of Judah only in 1897.", note: "Ethiopian Empire under Yohannes IV. The green-yellow-red tricolour with the Lion of Judah was not adopted until 1897.", population: 9_000_000 }],
    ["Morocco", { noFlag: true, continent: "North Africa", noFlagReason: "No flag shown — the Alawi sultanate flew a plain red flag at this date; the green pentagram that makes today's Moroccan flag was added only in 1915.", note: "Alawi Sultanate of Morocco - still independent, flying a plain red flag; the green pentagram was added in 1915.", population: 5_000_000 }],
    ["Persia", { noFlag: true, noFlagReason: "No flag shown — Persia's Lion and Sun tricolour was standardised in 1886; the Qajar flags before it varied from reign to reign and none is bundled.", continent: "Western Asia", note: "Qajar Persia under Naser al-Din Shah - the Lion and Sun banner was Persia's flag until 1933, when Reza Shah changed the name to Iran.", population: 7_500_000 }],
    ["Korea", { noFlag: true, continent: "East Asia", noFlagReason: "No flag shown — Joseon Korea had no national flag in 1880; the Taegukgi was created in 1882, two years after this map's date.", note: "Joseon Korea, forced open by Japan's 1876 Treaty of Ganghwa. The Taegukgi was not adopted until 1882.", population: 10_000_000 }],
    ["Greece", { noFlag: true, continent: "SE Europe", noFlagReason: "No flag shown — the Kingdom's land flag was a white cross on blue beneath a royal crown; the nine-striped flag was then only the sea flag and became the sole national flag in 1978.", note: "Kingdom of Greece - its 1880 flag was the blue-and-white cross beneath a royal crown; the plain nine-stripe flag became the sole national flag in 1978.", population: 1_700_000 }],
    ["Kingdom of Hawaii", { flag: "flags/sub/US/US-HI.svg", continent: "Pacific", note: "Kingdom of Hawaii under Kalākaua - independent until the US-backed overthrow of 1893. Its flag, the Union Jack over eight stripes for the eight islands, has flown unchanged since 1845 and is still Hawaii's today.", population: 58_000 }],
    ["Taiwan", { noFlag: true, continent: "East Asia", noFlagReason: "No flag shown — Taiwan was a prefecture of Qing Fujian in 1880 with no flag of its own; the Qing dragon banner was the empire's.", note: "Taiwan was a prefecture of Qing Fujian in 1880; Japan annexed it in 1895.", population: 2_500_000 }],
    // --- African states independent on the eve of partition ----------------
    ["Sokoto Caliphate", { noFlag: true, continent: "West Africa", noFlagReason: "No flag shown — the caliphate's emirates rode under Islamic war banners rather than a single national flag, and no period image of them is bundled.", note: "Sokoto Caliphate - still the largest state in sub-Saharan Africa, and independent until the British conquest of 1903.", population: 10_000_000 }],
    ["Asante", { noFlag: true, continent: "West Africa", noFlagReason: "No flag shown — Asante statehood was embodied in the Golden Stool, and its armies fought under many appliqué war banners rather than one national flag; no period image is bundled.", note: "Asante Empire - defeated by Britain in 1874 but still independent inland; annexed in 1902.", population: 3_000_000 }],
    ["Zululand", { noFlag: true, continent: "Southern Africa", noFlagReason: "No flag shown — the Zulu kingdom identified its regiments by shield markings rather than flags, and by 1880 Britain had broken it into thirteen chiefdoms.", note: "Zululand, broken up by Britain after the 1879 Anglo-Zulu War and the defeat of Cetshwayo.", population: 300_000 }],
    ["Transvaal", { noFlag: true, continent: "Southern Africa", noFlagReason: "No flag shown — the South African Republic flew the Vierkleur, the Dutch tricolour with a green band at the hoist; no period-accurate image of it is bundled.", note: "South African Republic (Transvaal) - Boer republic that rose against British annexation in December 1880. It flew the Vierkleur, not a modern national flag.", population: 120_000 }],
    ["Orange Free State", { flag: "historical-flags/orange-free-state.svg", noFlag: true, continent: "Southern Africa", noFlagReason: "No flag shown — the republic flew its own orange-and-white striped flag with the Dutch tricolour in the canton, but no period-accurate image of it is bundled.", note: "Orange Free State - independent Boer republic (1854-1902) with its own orange-and-white flag.", population: 130_000 }],
    ["Wassoulou Empire", { noFlag: true, continent: "West Africa", noFlagReason: "No flag shown — Samori Touré's empire fought under Islamic war banners rather than a national flag, and no period image of them is bundled.", note: "Wassoulou Empire - Samori Toure's state, which resisted French conquest until 1898.", population: 1_000_000 }],
    ["Tukular Caliphate", { noFlag: true, continent: "West Africa", noFlagReason: "No flag shown — the Toucouleur jihad state fought under Islamic war banners rather than a national flag, and no period image of them is bundled.", note: "Toucouleur Empire - El Hadj Umar Tall's jihad state on the upper Niger, conquered by France in 1890-93.", population: 2_000_000 }],
    ["Dahomey", { noFlag: true, continent: "West Africa", noFlagReason: "No flag shown — Dahomey's regiments carried appliqué war banners rather than one national flag, and no period-accurate image of them is bundled.", note: "Kingdom of Dahomey - famed for its women's regiments; annexed by France in 1894.", population: 500_000 }],
    ["Imerina", { noFlag: true, continent: "East Africa", noFlagReason: "No flag shown — the Merina monarchy used red-and-white royal standards rather than a national flag, and no period-accurate image of them is bundled; Madagascar's flag dates from 1958.", note: "Kingdom of Imerina (Madagascar) under Ranavalona II - independent until the French protectorate of 1895.", population: 2_500_000 }],
    ["Sultinate of Zanzibar", { noFlag: true, continent: "East Africa", noFlagReason: "No flag shown — the Busaidi sultans flew a plain red flag, and no period-accurate image of it is bundled.", note: "Sultanate of Zanzibar - the Busaidi dynasty's clove and ivory empire, flying a plain red flag.", population: 200_000 }],
    // --- Additional African states independent or semi-independent in 1880 -----
    ["Buganda", { noFlag: true, continent: "East Africa", noFlagReason: "No flag shown — the kabaka's court used royal drums and standards, not a national flag; Buganda's own flag dates from the 20th century and no period image is bundled.", note: "Kingdom of Buganda — powerful East African kingdom (modern Uganda); independent until British protectorate 1894.", population: 1_000_000 }],
    ["Borno Sultanate", { noFlag: true, continent: "West Africa", note: "Sultanate of Borno — large Islamic state in Central Sahel; surviving but declining by 1880.", population: 2_000_000 }],
    ["Kano Emirate", { noFlag: true, continent: "West Africa", note: "Emirate of Kano — major Hausa city-state in Nigeria; center of Islamic learning and trade.", population: 500_000 }],
    ["Katsina Emirate", { noFlag: true, continent: "West Africa", note: "Emirate of Katsina — historic Hausa city-state; rival to Kano.", population: 400_000 }],
    ["Ife Kingdom", { noFlag: true, continent: "West Africa", note: "Kingdom of Ife — Yoruba city-state in Nigeria; center of art and culture; semi-independent.", population: 200_000 }],
    ["Tivland", { noFlag: true, continent: "West Africa", note: "Tiv people confederation — decentralized people in modern Nigeria/Cameroon; resisting external control.", population: 500_000 }],
    ["Mutapa Empire", { noFlag: true, continent: "East Africa", note: "Mutapa Empire — Zimbabwe-based empire; declining but still controlling interior trade routes.", population: 3_000_000 }],
    ["Yao Kingdom", { noFlag: true, continent: "East Africa", note: "Yao Kingdom — Bantu people in Mozambique/Tanzania region; slave trade participants.", population: 300_000 }],
    ["Shona Confederacy", { noFlag: true, continent: "East Africa", note: "Shona Confederacy — southern African people; resisting European colonization.", population: 1_500_000 }],
    // --- Asian sultanates and kingdoms in 1880 ----------------------------------
    ["Johore Sultanate", { noFlag: true, continent: "Southeast Asia", note: "Sultanate of Johore — Malay state; British protectorate by 1895.", population: 300_000 }],
    ["Selangor", { noFlag: true, continent: "Southeast Asia", note: "Sultanate of Selangor — Malay state; tin-rich, soon under British protection.", population: 150_000 }],
    ["Perak", { noFlag: true, continent: "Southeast Asia", note: "Sultanate of Perak — Malay state; tin mining important; British resident installed 1875.", population: 200_000 }],
    ["Kedah", { noFlag: true, continent: "Southeast Asia", note: "Sultanate of Kedah — Malay state; British protectorate from 1909.", population: 250_000 }],
    ["Terengganu", { noFlag: true, continent: "Southeast Asia", note: "Sultanate of Terengganu — East Coast Malay state.", population: 100_000 }],
    ["Brunei", { noFlag: true, noFlagReason: "No flag shown — Brunei's plain yellow flag was adopted in 1888, the year it became a British protectorate; before then the sultan used his personal standard.", continent: "Southeast Asia", note: "Sultanate of Brunei — the sultan's plain yellow flag still flew in 1880; the white and black stripes were added in 1906 and the crest in 1959. A British protectorate from 1888.", population: 80_000 }],
    ["Sulu Sultanate", { noFlag: true, continent: "Southeast Asia", note: "Sultanate of Sulu — southern Philippines; independent Islamic sultanate until American colonization.", population: 300_000 }],
    ["Maguindanao", { noFlag: true, continent: "Southeast Asia", note: "Sultanate of Maguindanao — Mindanao sultanate; resisting Spanish and later American colonization.", population: 400_000 }],
    ["Tonkin", { noFlag: true, continent: "Southeast Asia", note: "Kingdom of Tonkin — Vietnamese kingdom; French protectorate established 1883.", population: 5_000_000 }],
    ["Luang Prabang", { noFlag: true, continent: "Southeast Asia", note: "Kingdom of Luang Prabang — Laotian kingdom; French protectorate from 1893.", population: 300_000 }],
    ["Johor", { noFlag: true, continent: "Southeast Asia", note: "Kingdom of Johor — Malay state; British protectorate by 1895.", population: 250_000 }],
    ["Burma", { noFlag: true, continent: "Southeast Asia", note: "Kingdom of Burma — Konbaung dynasty; third Anglo-Burmese War brought British rule in 1886.", population: 5_000_000 }],
    // --- Pacific and Asian island states ----------------------------------------
    ["Samoa", { noFlag: true, continent: "Pacific", noFlagReason: "No flag shown — the rival Samoan royal factions flew several banners before the 1899 partition, and no period-accurate image of them is bundled; today's Samoan flag dates from 1949.", note: "Independent Samoa — Pacific kingdom; partition agreed 1899 between US and Germany.", population: 30_000 }],
    ["Fiji", { noFlag: true, continent: "Pacific", noFlagReason: "No flag shown — Fiji was a British colony from 1874 and flew the colonial ensign; the modern Fijian flag came with independence in 1970.", note: "Fiji — a British colony since the 1874 cession; the Kingdom of Fiji's own flag was hauled down that year.", population: 150_000 }],
    ["Tahiti", { noFlag: true, continent: "Pacific", note: "Kingdom of Tahiti — French Polynesia; French protectorate (colony from 1880).", population: 20_000 }],
    // --- Indian subcontinent kingdoms -------------------------------------------
    ["Kashmir", { noFlag: true, continent: "South Asia", note: "Kingdom of Kashmir — princely state; ruled by Hindu maharaja under British suzerainty.", population: 2_000_000 }],
    ["Hyderabad", { noFlag: true, continent: "South Asia", note: "State of Hyderabad — largest Indian princely state; Nizam's territories.", population: 4_000_000 }],
    ["Rajputana States", { noFlag: true, continent: "South Asia", note: "Rajputana States — confederation of Rajput kingdoms under British paramountcy.", population: 2_500_000 }],
  ])],

  // === 1900 (high imperialism) overrides ====================================
  ["ad1900", new Map<string, PolityInfo>([
    ["Venezuela", { flag: "historical-flags/venezuela-1863.svg", continent: "South America", note: "Venezuela. The 1863 seven-star pattern; the stars were rearranged into a circle in 1905." }],
    ["Mexico", { flag: "historical-flags/mexico-1893.svg", continent: "Mesoamerica", note: "Mexico under Porfirio Diaz. The tricolour carried the front-facing eagle of the 1893 pattern; Carranza turned the eagle side-on in 1916." }],
    ["Orange Free State", { flag: "historical-flags/orange-free-state.svg", continent: "Southern Africa", note: "Orange Free State — the Boer republic in the middle of the South African War; Britain annexed it in 1900 and formally in 1902.", population: 200_000 }],
    // AUDIT 2026-08 (goal 3): keyed on the SHOWN name, because the era remaps the dataset's
    // "Kingdom of Brazil" to "Brazil" and polityInfo resolves the shown name first — an entry
    // under the raw name is silently shadowed by the registry's era-agnostic "Brazil".
    // The republican flag has flown since 1889; only its star count has changed.
    ["Brazil", { flag: "historical-flags/brazil-1889.svg", continent: "South America", note: "United States of Brazil — the Old Republic, a decade after the 1889 coup that ended the empire. Its flag carried 21 stars at this date.", population: 17_400_000 }],
    ["Oman", { flag: "historical-flags/muscat-oman.svg", continent: "Western Asia", note: "Sultanate of Muscat and Oman — bound to Britain by treaty; the plain red flag flew until Sultan Qaboos added the state emblem in 1970.", population: 800_000 }],
    // Nepal's double-pennon predates every era on this map; the version bundled here is the
    // one flown before the 1962 constitution standardised its geometry.
    ["Nepal", { flag: "historical-flags/nepal-1743.svg", continent: "South Asia", note: "Kingdom of Nepal under the Rana prime ministers — the Shah kings reigned but did not rule. Its double-pennon is the world's only non-quadrilateral national flag.", population: 5_000_000 }],
    ["Rattanakosin Kingdom", { flag: "historical-flags/siam-1855.svg", continent: "Southeast Asia", note: "Siam under Chulalongkorn — ceding territory to France and Britain to preserve its independence. The white elephant flew until 1917.", population: 7_000_000 }],
    // Brunei's plain yellow flag, 1888–1906 — the one era where this image is period-correct.
    ["Brunei", { flag: "historical-flags/brunei-1888.png", continent: "Southeast Asia", note: "Sultanate of Brunei — a British protectorate since 1888, reduced to two enclaves by Sarawak's expansion. Its flag was plain yellow until 1906.", population: 30_000 }],
    // The upstream file still calls Brazil a kingdom in 1900 and records Portugal as
    // its sovereign; the empire actually fell in 1889 (and independence came in 1822).
    // The name is remapped for display below and the false ruler refused in FALSE_SUBJECTO.
    // Hawaii was annexed by the United States in 1898, so the upstream map's
    // "Kingdom of Hawaii" label is already two years out of date here — but the flag
    // itself carried on: the same Union-Jack-and-eight-stripes design served as the
    // territorial flag, as it still serves as the state flag today.
    ["Kingdom of Hawaii", { flag: "flags/sub/US/US-HI.svg", continent: "Pacific", note: "Hawaii — annexed by the United States in 1898, five years after the overthrow of Queen Lili\u02bbuokalani. The kingdom's flag was kept on as the territorial flag and is Hawaii's state flag today.", population: 154_000 }],
    ["Italy", { flag: "historical-flags/italy-kingdom.svg", continent: "Italy", note: "Kingdom of Italy — the green-white-red tricolour carried the Savoy arms from unification in 1861 until the republic removed them in 1946.", population: 32_500_000 }],
    ["Germany", { flag: "historical-flags/german-empire.png", continent: "Central Europe", note: "German Empire under Wilhelm II — the black-white-red tricolour flew until 1918.", population: 56_400_000 }],
    ["Eritrea", { flag: "historical-flags/italy-kingdom.svg", continent: "East Africa", note: "Italian Eritrea — Italy's first African colony, taken in 1890.", population: 250_000 }],
    ["India", { modernName: "United Kingdom", continent: "South Asia", note: "British India at its imperial height, Victoria's Raj covering today's India, Pakistan, Bangladesh and Burma.", population: 285_000_000 }],
    ["United States of America", { flag: "historical-flags/us-45star.svg", continent: "North America", note: "The United States flew the 45-star flag (1896–1908, after Utah's admission); the 50-star flag dates from 1960.", }],
    // By 1900 the Qing HAD a standardised national flag: the rectangular Yellow
    // Dragon banner, promulgated 1889 (the 1880 era shows none, because until then
    // it was the triangular naval version).
    ["Manchu Empire", { flag: "historical-flags/qing-dynasty.png", continent: "East Asia", note: "Qing China during the Boxer Rebellion. The rectangular Yellow Dragon banner had been the national flag since 1889.", population: 400_000_000 }],
    // Brazil became a republic in 1889 — the United States of Brazil (1889-1967) with a
    // 21-star flag adopted then and used until 1960. The design evolved as states joined.
    ["United States of Brazil", { modernName: "Brazil", continent: "South America", note: "Republic of Brazil — the monarchy fell in 1889 and the republican flag with stars representing states was adopted. The design varied as states joined the federation.", population: 17_400_000 }],
    ["Egypt", { flag: "historical-flags/egypt-khedive.png", continent: "North Africa", note: "Khedivate of Egypt under British occupation since 1882, still nominally Ottoman.", population: 10_000_000 }],
    ["Ethiopia", { flag: "historical-flags/abyssinia.png", continent: "East Africa", note: "Ethiopian Empire under Menelik II, which had crushed the Italian invasion at Adwa in 1896 — the one African state to defeat a European power and stay independent. Menelik combined the green, yellow and red into a single flag with the Lion of Judah in 1897.", population: 11_000_000 }],
    ["Persia", { flag: "historical-flags/persia-1886.svg", continent: "Western Asia", note: "Qajar Persia during the Constitutional Revolution (1905-1911) — the Lion and Sun banner was Persia's national flag.", population: 8_500_000 }],
    ["Korea", { noFlag: true, continent: "East Asia", noFlagReason: "No flag shown — the Korean Empire flew the Taegukgi from 1882, but its taeguk and trigrams were drawn differently from today's South Korean flag (standardised in 1949), and no period image is bundled.", note: "Korean Empire (1897–1910) — independent in name, under mounting Japanese and Russian pressure. The Taegukgi dates from 1882.", population: 12_000_000 }],
    // --- European powers and their colonies in 1900 ----------------------------
    // Consolidated features from world_1900.geojson
    ["Russian Empire", { flag: "historical-flags/russian-empire.png", continent: "Eastern Europe / Asia", note: "Russian Empire under Nicholas II — vast transcontinental empire stretching from Eastern Europe to the Pacific.", population: 128_200_000 }],
    ["United Kingdom of Great Britain and Ireland", { modernName: "United Kingdom", continent: "Western Europe", note: "United Kingdom of Great Britain and Ireland at the height of the British Empire, ruling India, Canada, Australia, and numerous colonies worldwide.", population: 41_500_000 }],
    ["Ottoman Empire", { flag: "historical-flags/ottoman-empire.png", continent: "SE Europe / Western Asia / North Africa", note: "Ottoman Empire in 1900 — in its final decades of decline, losing territory to European powers in the Balkans and North Africa. The crescent-and-star flag was standardised in 1844.", population: 21_000_000 }],
    // Individual entries for Britain and Russia (fallback for alternate names)
    ["France", { modernName: "France", continent: "Western Europe", note: "French Third Republic — extending its global empire with Indochina, North Africa, and sub-Saharan colonies.", population: 38_900_000 }],
    ["Britain", { modernName: "United Kingdom", continent: "Western Europe", note: "United Kingdom at the height of the British Empire, ruling India, Canada, Australia, and numerous colonies worldwide.", population: 41_500_000 }],
    ["Spain", { flag: "historical-flags/spain-1785.png", continent: "Western Europe", note: "Kingdom of Spain — still holding Cuba, Puerto Rico, Guam, and the Philippines before the 1898 Spanish-American War.", population: 18_400_000 }],
    ["Portugal", { flag: "historical-flags/portugal-1830.png", continent: "Western Europe", note: "Kingdom of Portugal — holding Mozambique, Angola, Goa, Macao, and East Timor in its overseas empire.", population: 5_100_000 }],
    ["Netherlands", { modernName: "Netherlands", continent: "Western Europe", note: "Kingdom of the Netherlands — ruling the Dutch East Indies (modern Indonesia), Suriname, Curaçao, and other territories.", population: 5_100_000 }],
    ["Belgium", { continent: "Western Europe", note: "Kingdom of Belgium — Leopold II's absolute control over the Congo (Belgian Congo from 1908).", population: 7_000_000 }],
    ["Russia", { flag: "historical-flags/russian-empire.png", continent: "Eastern Europe / Asia", note: "Russian Empire under Nicholas II — vast transcontinental empire stretching from Eastern Europe to the Pacific.", population: 128_200_000 }],
    ["Austria-Hungary", { flag: "historical-flags/austria-hungary.png", continent: "Central Europe", note: "Austria-Hungary — the dual monarchy of the Austro-Hungarian Empire at its height.", population: 51_400_000 }],
    ["Greece", { modernName: "Greece", continent: "SE Europe", note: "Kingdom of Greece — expanded after the Greco-Turkish Wars; controlling Crete and various Aegean islands.", population: 2_400_000 }],
    ["Romania", { continent: "SE Europe", note: "Kingdom of Romania — independent since 1877. The blue-yellow-red civil tricolour it flew dates from 1848 and is Romania's flag today; only the state flag carried the royal arms in the centre.", population: 1_900_000 }],
    ["Serbia", { noFlag: true, continent: "SE Europe", noFlagReason: "No flag shown — the Kingdom flew the red-blue-white tricolour with the royal arms; today's Serbian flag was adopted in 2010 and no period image of the royal one is bundled.", note: "Kingdom of Serbia — Balkan power; the tricolour was adopted 1835.", population: 2_100_000 }],
    ["Bulgaria", { continent: "SE Europe", note: "Principality of Bulgaria — autonomous from Ottoman rule since 1878, fully independent in 1908. The white-green-red tricolour it adopted in 1879 is the flag Bulgaria flies today.", population: 3_700_000 }],
    // --- Colonies and holdings ------------------------------------------------
    ["Algeria", { modernName: "France", continent: "North Africa", note: "French Algeria — administered as French departments; colonial territory.", population: 4_500_000 }],
    ["Tunisia", { continent: "North Africa", note: "Tunisia — a French protectorate since 1881, but the Beylik kept its own flag: the red field with a white disc bearing a crescent and star, created in 1831 and essentially unchanged today.", population: 1_900_000 }],
    ["Morocco", { noFlag: true, continent: "North Africa", noFlagReason: "No flag shown — the sultanate flew a plain red flag at this date; the green pentagram that makes today's Moroccan flag was added only in 1915.", note: "Morocco — independent sultanate; French protectorate after 1912 Treaty of Fez.", population: 5_200_000 }],
    ["Sudan (Egypt-Sudan Condominium)", { modernName: "United Kingdom", continent: "North Africa", note: "Sudan — Anglo-Egyptian Condominium (1899–1956); joint British-Egyptian administration.", population: 1_900_000 }],
    ["Kenya", { modernName: "United Kingdom", continent: "East Africa", note: "Kenya — British East Africa Protectorate; part of the British colonial empire.", population: 3_000_000 }],
    ["Tanzania", { modernName: "United Kingdom", continent: "East Africa", note: "Tanganyika — German East Africa until WWI; German colony in 1900.", population: 4_500_000 }],
    ["Rhodesia", { modernName: "United Kingdom", continent: "Southern Africa", note: "Rhodesia (Zimbabwe) — colonized by Cecil Rhodes's British South Africa Company.", population: 500_000 }],
    ["Nyasaland", { modernName: "United Kingdom", continent: "East Africa", note: "Nyasaland (Malawi) — British Central African Protectorate; colonial territory.", population: 1_000_000 }],
    ["Zambia", { modernName: "United Kingdom", continent: "East Africa", note: "Zambia — British North-Western Rhodesia; colonial protectorate.", population: 700_000 }],
    ["Cameroon (Germany)", { ruler: "German Empire", continent: "West Africa", note: "Cameroon — German Cameroon; German colonial possession until 1918.", population: 2_500_000 }],
    ["Togo (Germany)", { ruler: "German Empire", continent: "West Africa", note: "Togo — German Togoland; German colonial territory until 1918.", population: 1_000_000 }],
    ["German East Africa", { ruler: "German Empire", continent: "East Africa", note: "German East Africa — German colonial possession; modern Tanzania/Burundi/Rwanda/Mozambique.", population: 5_000_000 }],
    ["South-West Africa", { ruler: "German Empire", continent: "Southern Africa", note: "South-West Africa — German colony; modern Namibia.", population: 100_000 }],
    ["Hawaii", { noFlag: true, continent: "Pacific", note: "Territory of Hawaii — annexed by the United States in 1898; not a state until 1959.", population: 150_000 }],
    ["Puerto Rico (US)", { modernName: "United States", continent: "Caribbean", note: "Puerto Rico — ceded to the United States from Spain in 1898.", population: 900_000 }],
    ["Guam (US)", { modernName: "United States", continent: "Pacific", note: "Guam — ceded to the United States from Spain in 1898.", population: 8_000 }],
    ["Philippines (US)", { modernName: "United States", continent: "Southeast Asia", note: "Philippines — ceded to the United States from Spain in 1898; American colonial rule began.", population: 7_600_000 }],
    // Pacific island territories — added after consolidating fragmented polities
    ["Fiji", { noFlag: true, continent: "Pacific", noFlagReason: "No flag shown — Fiji was a British colony and flew the colonial ensign; the modern Fijian flag came with independence in 1970.", note: "Fiji — a British colony since the 1874 cession; the modern Fijian flag came with independence in 1970.", population: 150_000 }],
    ["Tonga", { modernName: "Tonga", continent: "Pacific", note: "Kingdom of Tonga — the red flag with its canton cross was fixed in the 1875 constitution and is unchanged today; the only Pacific kingdom never colonised.", population: 25_000 }],
    ["American Samoa", { modernName: "United States", continent: "Pacific", note: "American Samoa — U.S. territory in the South Pacific since 1899; Polynesian islands.", population: 8_000 }],
  ])],

  // === 1914 (eve of WWI) overrides ==========================================
  // Modern country names in 1914 that were under colonial rule, plus a
  // few cases that need their period-correct national flag (Egypt under
  // the Khedivate, Ethiopia under Menelik II, China still as the early
  // Republic of China after the 1912 revolution, etc.).
  ["ad1914", new Map<string, PolityInfo>([
    ["Venezuela", { flag: "historical-flags/venezuela-1905.svg", continent: "South America", note: "Venezuela under Juan Vicente Gomez. Seven stars in a circle — the 1905 pattern." }],
    ["Mexico", { flag: "historical-flags/mexico-1893.svg", continent: "Mesoamerica", note: "Mexico during the Revolution. The 1893 pattern, with the front-facing eagle, was still the national flag; Carranza's decree turning the eagle side-on came in 1916." }],
    ["Kuwait", { flag: "historical-flags/kuwait-1914.svg", continent: "Western Asia", note: "Sheikhdom of Kuwait — under British protection since the 1899 agreement, and still nominally an Ottoman district. Its own red flag carried the state's name in Arabic.", population: 35_000 }],
    ["Arabia (Nejd)", { flag: "historical-flags/nejd-1902.svg", continent: "Western Asia", note: "The Emirate of Nejd and Hasa under Ibn Saud — the third Saudi state, which would take the Hejaz in 1925 and become Saudi Arabia in 1932.", population: 1_000_000 }],
    ["Panama", { flag: "historical-flags/panama-1903.svg", continent: "Central America", note: "Republic of Panama — independent of Colombia since 1903, the year the canal treaty was signed; the canal opened in August 1914.", population: 400_000 }],
    // Nepal's double-pennon predates every era on this map; the version bundled here is the
    // one flown before the 1962 constitution standardised its geometry.
    ["Nepal", { flag: "historical-flags/nepal-1743.svg", continent: "South Asia", note: "Kingdom of Nepal under the Rana prime ministers — the Shah kings reigned but did not rule. Its double-pennon is the world's only non-quadrilateral national flag.", population: 5_000_000 }],
    ["Montenegro", { flag: "historical-flags/montenegro-1905.png", continent: "Southeast Europe", note: "Kingdom of Montenegro under Nicholas I — a kingdom since 1910, and about to enter the war alongside Serbia.", population: 500_000 }],
    ["Albania", { flag: "historical-flags/albania-1914.svg", continent: "Southeast Europe", note: "Principality of Albania — independent of the Ottomans since 1912, and in 1914 under the six-month reign of Prince Wilhelm of Wied.", population: 800_000 }],
    // AUDIT 2026-08 (goal 3): the Bogd Khanate declared independence from Qing China in
    // 1911 and flew its own soyombo flag; the modern Mongolian flag dates from 1992, so the
    // adoption gate refused it and the card showed nothing.
    ["Mongolia", { flag: "historical-flags/mongolia-1911.svg", continent: "East Asia", note: "The Bogd Khanate of Mongolia — independent of Qing China since 1911 under the Jebtsundamba Khutughtu, with Russian backing.", population: 600_000 }],
    ["Rattanakosin Kingdom", { flag: "historical-flags/siam-1855.svg", continent: "Southeast Asia", note: "Siam under Vajiravudh (Rama VI) — the white elephant flag flew until he replaced it with the trirong tricolour in 1917.", population: 8_300_000 }],
    // Brunei's white-and-black striped flag was added in 1906; the crest came in 1959.
    ["Brunei", { flag: "historical-flags/brunei-1906.svg", continent: "Southeast Asia", note: "Brunei under a British Resident since 1906 — the year the white and black stripes were added to the sultan's yellow flag.", population: 30_000 }],
    // Tibet was de facto independent from 1912. (This text used to sit in the
    // registry, where a duplicate "Tibet" key for the medieval period shadowed it.)
    ["Tibet", { noFlag: true, continent: "Central Asia", noFlagReason: "No flag shown — the 13th Dalai Lama's snow-lion flag was designed only in 1916, two years after this map's date.", note: "Tibet — de facto independent since 1912, when the last Qing garrison was expelled; the People's Republic annexed it in 1950–51.", population: 1_200_000 }],
    ["Ottoman Empire", { flag: "historical-flags/ottoman-empire.png", continent: "SE Europe / Western Asia / North Africa", note: "Ottoman Empire in terminal decline — on the eve of World War I, the Ottomans had already lost most of their European and North African territories in the Balkans Wars (1912–1913). Still controlling Anatolia, parts of the Levant, Mesopotamia, and Arabian Peninsula. The crescent-and-star flag was standardised in 1844.", population: 12_000_000 }],
    ["Austro-Hungarian Empire", { flag: "historical-flags/austria-hungary.png", continent: "Central Europe", note: "Austro-Hungarian Empire on the eve of World War I — the dual monarchy of the Habsburgs, spanning Central Europe. The monarchy would collapse in November 1918 after Austria-Hungary's military defeat, leading to the emergence of Austria, Hungary, Yugoslavia, Czechoslovakia and the addition of territory to Romania and Poland.", population: 51_000_000 }],
    ["Kingdom of Italy", { flag: "historical-flags/italy-kingdom.svg", continent: "Italy", note: "Kingdom of Italy — the green-white-red tricolour carried the Savoy arms from unification in 1861 until the republic removed them in 1946.", population: 36_000_000 }],
    ["Libya", { flag: "historical-flags/italy-kingdom.svg", continent: "North Africa", note: "Italian Libya — taken from the Ottomans in 1911–12 and still being fought over when the war began.", population: 1_000_000 }],
    ["Italian Somaliland", { flag: "historical-flags/italy-kingdom.svg", continent: "East Africa", note: "Italian Somaliland, on the Indian Ocean coast.", population: 500_000 }],
    ["Eritrea", { flag: "historical-flags/italy-kingdom.svg", continent: "East Africa", note: "Italian Eritrea.", population: 300_000 }],
    ["Netherlands Indies", { modernName: "Netherlands", continent: "Southeast Asia", note: "Netherlands East Indies — Dutch rule over today's Indonesia.", population: 48_000_000 }],
    ["South Africa", { modernName: "United Kingdom", continent: "Southern Africa", note: "Union of South Africa — a British dominion since 1910, flying the Union Jack and Red Ensign; today's flag dates from 1994.", population: 6_000_000 }],
    ["Uganda", { modernName: "United Kingdom", continent: "East Africa", note: "Uganda Protectorate — British-ruled since 1894; the crested-crane flag came at independence in 1962.", population: 2_900_000 }],
    ["Nigeria", { modernName: "United Kingdom", continent: "West Africa", note: "Britain had just amalgamated its northern and southern Nigerian protectorates (1914); the green-white-green flag dates from 1960.", population: 17_000_000 }],
    ["Mozambique", { ruler: "Portugal", continent: "East Africa", note: "Portuguese Mozambique — the Nyassa and Mozambique chartered companies still ran much of it for Lisbon.", population: 3_000_000 }],
    ["United States", { flag: "historical-flags/us-48star.svg", continent: "North America", note: "The United States flew the 48-star flag (1912–1959, after Arizona and New Mexico); the 50-star flag dates from 1960.", }],
    // Manchu Empire in 1914 = Republic of China (ROC). The Qing dynasty was
    // overthrown in January 1912 and the ROC was proclaimed. In 1914 the ROC
    // was using the Five-Colored Flag (五色旗) — five horizontal stripes of
    // red, yellow, blue, white, and black representing the five main peoples.
    // The blue-sky/white-sun flag wasn't standardised until 1928.
    ["Manchu Empire", { flag: "historical-flags/roc-1912.png", continent: "East Asia", note: "Republic of China (ROC) — the Qing dynasty was overthrown in January 1912. In 1914 the ROC flew the Five-Colored Flag (五色旗): five horizontal stripes of red, yellow, blue, white, and black representing the Han, Manchu, Mongol, Hui, and Tibetan peoples. The current blue-sky flag wasn't adopted until 1928.", population: 430_000_000 }],
    // Egypt 1914 — nominally Ottoman until Dec 1914, then British
    // protectorate as the Sultanate of Egypt. Both periods flew the
    // red+white-crescent+3-stars Khedive flag.
    ["Egypt", { flag: "historical-flags/egypt-khedive.png", continent: "North Africa", note: "Khedivate of Egypt (autonomous Ottoman territory until Dec 1914, then British protectorate as the Sultanate of Egypt). Red with white crescent and 3 stars.", population: 11_300_000 }],
    // Abyssinia 1914 — Menelik II's flag (green-yellow-red with the Lion
    // of Judah) adopted 1897, used until 1936 + 1941–1974. The modern
    // Ethiopian flag with the central blue star is from 1996.
    ["Abyssinia", { flag: "historical-flags/abyssinia.png", continent: "East Africa", note: "Empire of Ethiopia under Menelik II's successors. Green-yellow-red with the Lion of Judah — the star-emblem flag came in 1996.", population: 11_000_000 }],
    // Modern country names that were colonies in 1914 — route to the
    // colonial power's contemporaneous flag.
    ["Algeria", { continent: "North Africa", note: "French Algeria — integrated as French départements since 1848. The French tricolour flew.", modernName: "France", population: 5_500_000 }],
    ["Tunisia", { continent: "North Africa", note: "French protectorate of Tunisia (1881–1956). The French tricolour was used alongside the bey's flag.", modernName: "France", population: 2_000_000 }],
    ["Morocco", { continent: "North Africa", note: "Just established as a French (and partly Spanish) protectorate in 1912. The Alawi red flag added the green pentagram in 1915.", modernName: "France", population: 5_000_000 }],
    // Armenia in 1914 — split between the Russian Empire and the Ottoman
    // Empire. No independent Armenian state. The modern Armenian flag
    // (1990) is wildly anachronistic.
    ["Armenia", { continent: "Western Asia", noFlagReason: "No flag shown — there was no Armenian state in 1914 to have one: these lands were divided between the Russian and Ottoman empires, whose flags flew over them. Armenia's own tricolour came with the 1918 republic.", note: "Armenian-populated lands of Transcaucasia were divided between the Russian and Ottoman empires; no independent Armenian state existed in 1914.", population: 1_700_000, noFlag: true }],
    // Ceylon in 1914 — Crown Colony, Union Jack.
    ["Ceylon", { continent: "South Asia", note: "British Ceylon — Crown Colony from 1815 to 1948. Flew the Union Jack.", modernName: "United Kingdom", population: 4_200_000 }],
    // Yemen in 1914 — Ottoman, no national flag.
    ["Yemen", { continent: "Arabia", note: "Ottoman Vilayet of Yemen — under Ottoman rule (with the Zaydi Imam in interior revolt). No Yemeni national flag yet.", population: 3_500_000, noFlag: true }],
    // Ethiopia (1914 dataset spells it Abyssinia — handled above; if it
    // appears as 'Ethiopia' separately, mirror the Menelik flag).
    ["Ethiopia", { flag: "historical-flags/abyssinia.png", continent: "East Africa", note: "Empire of Ethiopia — same Menelik II flag (1897–1936).", population: 11_000_000 }],
    // Persia in 1914 — the constitutional period, flying the Lion and Sun.
    ["Persia", { flag: "historical-flags/persia-1907.svg", continent: "Western Asia", note: "Persia during WWI — the Lion and Sun banner was its national flag until 1933. The modern Islamic Republic flag came in 1980.", population: 8_900_000 }],
    // Burma in 1914 = British Burma (part of British India since 1886). Union Jack.
    ["Burma", { modernName: "United Kingdom", continent: "Southeast Asia", note: "British Burma — under British colonial rule as part of British India from 1886. The Union Jack flew over the territory.", population: 10_000_000 }],
    // Siam in 1914 = Rattanakosin Kingdom, still using the red elephant flag.
    // The modern Thai tricolour wasn't adopted until 1917.
    ["Siam", { flag: "historical-flags/siam.png", continent: "Southeast Asia", note: "Kingdom of Siam — the red-field white elephant flag was in use in 1914; the modern Thai tricolour was adopted in 1917.", population: 8_000_000 }],
    // Afghanistan in 1914 — independent under Habibullah Khan (1901–1919).
    ["Afghanistan", { flag: "historical-flags/afghanistan-1901.svg", continent: "Central Asia", note: "Emirate of Afghanistan under Habibullah Khan. The black-red-green tricolour was standardised as the national flag in 1901 and remained until 1919.", population: 5_000_000 }],
    // Philippines in 1914 — U.S. territory (American-Philippine War ended 1902).
    // The revolutionary Philippine flag adopted in 1898 was superseded by U.S. governance; independence and the modern flag came in 1946.
    ["Philippines", { flag: "historical-flags/us-48star.svg", continent: "Southeast Asia", note: "Philippine Islands, U.S. territory — administered by the United States following the 1898 revolution and Spanish-American War. The U.S. 48-star flag flew over the territory until independence in 1946.", population: 9_000_000 }],
    ["Brazil", { flag: "historical-flags/brazil-1889.svg", modernName: "Brazil", continent: "South America", note: "United States of Brazil — the republican flag adopted in 1889 with stars representing states. The design evolved as states joined the federation.", population: 23_000_000 }],
    ["Serbia", { flag: "historical-flags/serbia-1882.svg", modernName: "Serbia", continent: "Europe", note: "Kingdom of Serbia — Balkan state emerging as major regional power; joined Balkan Wars in 1912–1913 against Ottoman Empire. The white-blue-red tricolour is Serbia's historical flag.", population: 2_900_000 }],
  ])],

  ["ad1920", new Map<string, PolityInfo>([
    ["Venezuela", { flag: "historical-flags/venezuela-1905.svg", continent: "South America", note: "Venezuela. The 1905 circular seven-star pattern, flown until the 1930 arc." }],
    ["Mexico", { flag: "historical-flags/mexico-1916.svg", continent: "Mesoamerica", note: "Mexico after the Revolution. Venustiano Carranza's 1916 decree turned the eagle side-on; this pattern flew until 1934." }],
    ["Chinese warlords", { flag: "historical-flags/roc-1912.png", continent: "East Asia", note: "Warlord-era China — Beiyang governments came and went in Beijing while regional militarists held the provinces; the Republic's five-coloured flag flew until 1928.", population: 470_000_000 }],
    ["Ukraine", { flag: "historical-flags/ukraine-1917.svg", continent: "Eastern Europe", note: "The Ukrainian People's Republic — proclaimed in 1917 and fighting Bolshevik, White and Polish armies at once; the Soviets took Kyiv for the last time in 1920.", population: 25_000_000 }],
    ["Kuwait", { flag: "historical-flags/kuwait-1914.svg", continent: "Western Asia", note: "Sheikhdom of Kuwait — a British protectorate; the year of the Battle of Jahra against Ibn Saud's Ikhwan.", population: 50_000 }],
    ["Georgia", { flag: "historical-flags/georgia-1918.svg", continent: "Western Asia", note: "Democratic Republic of Georgia — independent since May 1918, and occupied by the Red Army in February 1921.", population: 2_500_000 }],
    ["Panama", { flag: "historical-flags/panama-1903.svg", continent: "Central America", note: "Republic of Panama — the canal in American hands under the 1903 treaty. The flag's proportions were standardised in 1925.", population: 450_000 }],
    // Nepal's double-pennon predates every era on this map; the version bundled here is the
    // one flown before the 1962 constitution standardised its geometry.
    ["Nepal", { flag: "historical-flags/nepal-1743.svg", continent: "South Asia", note: "Kingdom of Nepal under the Rana prime ministers — the Shah kings reigned but did not rule. Its double-pennon is the world's only non-quadrilateral national flag.", population: 5_000_000 }],
    // Iceland became a sovereign kingdom in personal union with Denmark in 1918 and had
    // flown its own flag since 1915; the modern adoption year (1944) refused it.
    ["Iceland", { flag: "historical-flags/iceland-1915.png", continent: "Northern Europe", note: "Kingdom of Iceland — sovereign since 1 December 1918, sharing only its monarch and foreign policy with Denmark. The republic came in 1944.", population: 95_000 }],
    // AUDIT 2026-08 (goal 3): the display remap "Iran" → "Persia" made polityInfo resolve
    // the era-agnostic registry entry for "Persia", which carries no flag, so the 1920 card
    // lost the Lion and Sun flag that the ad1920 "Iran" entry had. Keyed on the SHOWN name,
    // it resolves first. (This is the trap the era-name rule warns about.)
    ["Persia", { flag: "historical-flags/persia-1907.svg", continent: "Western Asia", note: "Persia under the last Qajar shahs — Reza Khan's 1921 coup was months away. The Lion and Sun flag of 1907 flew until 1933.", population: 11_000_000 }],
    // AUDIT 2026-08 (goal 3): the trirong replaced the white elephant on 28 September 1917, so
    // by 1920 Siam flew the flag Thailand flies today.
    ["Rattanakosin Kingdom", { modernName: "Thailand", continent: "Southeast Asia", note: "Siam after the First World War — a victor power and founder member of the League of Nations. Its trirong tricolour, adopted in 1917, is the flag Thailand still flies.", population: 9_200_000 }],
    ["Brunei", { flag: "historical-flags/brunei-1906.svg", continent: "Southeast Asia", note: "Brunei under British protection — oil was struck at Seria in 1929, transforming the tiny sultanate.", population: 30_000 }],
    // The three Transcaucasian republics were independent in 1920 (the dataset records
    // them as Soviet, two years before the USSR existed — see FALSE_SUBJECTO).
    ["Armenia", { noFlag: true, continent: "Western Asia", noFlagReason: "No flag shown — the First Republic (1918–20) flew the red-blue-orange tricolour that Armenia readopted in 1990; no period image of it is bundled.", note: "First Republic of Armenia — independent from 1918 until the Red Army took Yerevan in December 1920.", population: 1_300_000 }],
    // By 1920 the Balkan and Arab provinces were gone and the 1920 file draws the
    // Sultanate as Anatolia alone — so, unlike earlier eras, it is not a European power.
    ["Ottoman Sultanate", { flag: "historical-flags/ottoman-empire.png", continent: "Western Asia", note: "Ottoman Empire after the 1877-78 Russo-Turkish War; in terminal decline as the Turkish War of Independence began in 1919. The crescent-and-star flag was standardised in 1844.", population: 18_000_000 }],
    ["USSR", { flag: "historical-flags/rsfsr-1918.svg", continent: "Eastern Europe / Northern Asia", note: "Union of Soviet Socialist Republics — the Soviet Union was formed on 30 December 1922 from the remnants of the Russian Empire following the Russian Civil War (1918–1922). The red flag with the hammer and sickle became the national symbol of the communist state.", population: 110_000_000 }],
    ["Czechoslovakia", { flag: "historical-flags/czechoslovakia.png", continent: "Central Europe", note: "Czechoslovak Republic (1918–1938) — newly formed from the dissolution of Austria-Hungary, uniting Czech and Slovak lands. The red-white-blue tricolour was adopted as the national flag in 1920.", population: 14_000_000 }],
    ["Yugoslavia", { noFlag: true, continent: "SE Europe", noFlagReason: "No flag shown — the Kingdom of Serbs, Croats and Slovenes flew a PLAIN blue-white-red tricolour; the red star was added only by the socialist federation in 1945, so the bundled Yugoslav flag would be a quarter-century out of period.", note: "Kingdom of Serbs, Croats and Slovenes (1918–1929, renamed Kingdom of Yugoslavia in 1929) — formed from South Slavic territories of the dissolved Austria-Hungary.", population: 12_000_000 }],
    ["British Raj", { modernName: "United Kingdom", continent: "South Asia", note: "British India — the Raj at its height, covering today's India, Pakistan, Bangladesh and Burma. The Union Jack was the official flag; the Indian tricolour was adopted at independence in 1947.", population: 306_000_000 }],
    ["Ceylon", { modernName: "United Kingdom", continent: "South Asia", note: "British Crown Colony of Ceylon under direct British rule since 1815; flew the Union Jack. Independence and the distinctive lion flag came in 1948.", population: 3_500_000 }],
    ["Malaysia", { modernName: "United Kingdom", continent: "Southeast Asia", note: "British Malaya — the Straits Settlements and protected Malay sultanates; not yet federated as Malaysia, which formed in 1963.", population: 2_000_000 }],
    ["Italy", { flag: "historical-flags/italy-kingdom.svg", continent: "Italy", note: "Kingdom of Italy — the green-white-red tricolour carried the Savoy arms from unification in 1861 until the republic removed them in 1946.", population: 37_000_000 }],
    ["Libya (IT)", { continent: "North Africa", note: "Italian Libya — Rome's reconquest of the interior would run through the 1920s.", population: 1_000_000 }],
    ["Italian Somaliland", { continent: "East Africa", note: "Italian Somaliland.", population: 600_000 }],
    ["Eritrea", { flag: "historical-flags/italy-kingdom.svg", continent: "East Africa", note: "Italian Eritrea.", population: 350_000 }],
    ["Ethiopia", { flag: "historical-flags/abyssinia.png", continent: "East Africa", note: "Ethiopian Empire under Empress Zewditu — still independent, flying Menelik II's green-yellow-red with the Lion of Judah.", population: 9_500_000 }],
    ["Mongolia", { noFlag: true, noFlagReason: "No flag shown — Mongolia's autonomy was revoked on 1 January 1920 and the Republic of China's five-coloured flag was raised over Urga; the revolutionary government's own flag came in 1921.", continent: "East Asia", note: "Mongolian People's Republic (1921–1992) — established after the withdrawal of Chinese warlord forces, with the red field and golden Soyombo emblem.", population: 850_000 }],
    ["Tibet", { flag: "historical-flags/tibet.svg", continent: "East Asia", note: "Tibet under the Lhasa government (1913–1951), after the withdrawal of Chinese forces following the 1911 revolution. The snow lions and sun-with-rays flag represented the Tibetan administration.", population: 1_200_000 }],
    ["Afghanistan", { flag: "historical-flags/afghanistan-1919.svg", continent: "Central Asia", note: "Kingdom of Afghanistan under King Amanullah Khan (1919–1929), who declared independence from British influence on 8 August 1919. The black-red-green tricolour was the national flag from 1919 onwards.", population: 6_000_000 }],
    ["Hejaz", { flag: "historical-flags/hejaz-1920.svg", continent: "Western Asia", note: "Kingdom of Hejaz (1916–1925) — Hashemite kingdom containing the holy cities Mecca and Medina. Its flag of 1920–1926 carried black, white and green horizontal bands with a red triangle at the hoist, the colours of the Arab Revolt. The Sultanate of Nejd conquered it in 1925.", population: 400_000 }],
    ["Iraq", { continent: "Western Asia", note: "Iraq under British League of Nations Mandate (1920–1932). The flag shows the red-white-black tricolour which Iraq would retain as its kingdom flag through 1959.", population: 2_800_000 }],
    ["Tanzania, United Republic of", { modernName: "United Kingdom", continent: "East Africa", note: "Tanganyika — German East Africa until the war, now a British League of Nations mandate; the Tanzanian flag dates from 1964.", population: 4_100_000 }],
    ["Kenya", { modernName: "United Kingdom", continent: "East Africa", note: "Kenya Colony, proclaimed in 1920 out of the East Africa Protectorate; the Kenyan flag came with independence in 1963.", population: 2_900_000 }],
    ["Uganda", { modernName: "United Kingdom", continent: "East Africa", note: "Uganda Protectorate under British rule.", population: 3_100_000 }],
    ["Nigeria", { modernName: "United Kingdom", continent: "West Africa", note: "Colony and Protectorate of Nigeria under British rule.", population: 18_000_000 }],
    ["Zambia", { modernName: "United Kingdom", continent: "Southern Africa", note: "Northern Rhodesia, administered by the British South Africa Company until 1924; Zambia's flag dates from 1964.", population: 1_000_000 }],
    ["Mozambique", { ruler: "Portugal", continent: "East Africa", note: "Portuguese Mozambique.", population: 3_300_000 }],
    // Weimar Germany flew black-red-gold from 1919 — the same design the Federal
    // Republic readopted in 1949, so this era legitimately shows today's flag.
    ["Germany", { modernName: "Germany", continent: "Central Europe", note: "Weimar Republic — the black-red-gold tricolour it adopted in 1919 is the flag Germany flies today, though the Nazi state replaced it from 1933 to 1945.", population: 62_000_000 }],
    ["Sudan", { modernName: "United Kingdom", continent: "Northeast Africa", note: "Anglo-Egyptian Sudan — a condominium ruled from Khartoum by Britain in Egypt's name; the Sudanese flag came at independence in 1956.", population: 6_000_000 }],
    ["India", { modernName: "United Kingdom", continent: "South Asia", note: "British India — the Raj still covered today's India, Pakistan, Bangladesh and Burma; the tricolour was adopted at independence in 1947.", population: 306_000_000 }],
    ["Algeria", { modernName: "France", continent: "North Africa", note: "French Algeria, administered as departments of France; the independence flag dates from 1962.", population: 5_800_000 }],
    ["South Africa", { modernName: "United Kingdom", continent: "Southern Africa", note: "Union of South Africa — a British dominion flying the Union Jack and Red Ensign; the orange-white-blue came in 1928 and today's flag only in 1994.", population: 6_900_000 }],
    ["United States", { flag: "historical-flags/us-48star.svg", continent: "North America", note: "The United States flew the 48-star flag (1912–1959); the 50-star flag dates from 1960.", }],
    ["Yemen", { flag: "historical-flags/yemen-1918.svg", continent: "Arabia", note: "Mutawakkilite Kingdom of Yemen, established 1918. The red flag with white sword and five stars became the national flag of the independent kingdom after the Ottoman withdrawal.", population: 3_200_000 }],
    ["Philippines", { modernName: "Philippines", continent: "Southeast Asia", note: "Philippines Commonwealth (1935–1946) — a U.S. territory with increasing self-governance under the Commonwealth Constitution of 1935. Independence and the modern flag both came in 1946. The white sun and three stars flag has been in use since 1898.", population: 10_000_000 }],
    ["Hungary", { noFlag: true, continent: "Central Europe", noFlagReason: "No flag shown — the Kingdom flew the red-white-green tricolour charged with the crowned royal arms; today's plain tricolour dates from 1957, and no period image of the crowned version is bundled.", note: "Kingdom of Hungary — a kingdom without a king, under Regent Miklós Horthy after the Austro-Hungarian collapse of 1918. Its red-white-green tricolour dates from 1848.", population: 7_600_000 }],
    ["Egypt", { flag: "historical-flags/egypt-khedive.png", continent: "North Africa", note: "Kingdom of Egypt (1922–1952) after nominal independence from Ottoman rule in 1922. The khedive's crescent and star flag (red with white crescent and three stars) represented Egypt during the interwar period.", population: 12_000_000 }],
    ["Albania", { noFlag: true, continent: "Europe", noFlagReason: "No flag shown — Albania flew the red flag with Skanderbeg's black double-headed eagle from 1912, but the eagle was crowned or crested differently under each regime; today's plain eagle flag dates from 1992 and no period image is bundled.", note: "Albania after independence from Ottoman rule — the red flag with the black double-headed eagle flew from 1912, its crest changing with each regime.", population: 1_000_000 }],
    ["Brazil", { flag: "historical-flags/brazil-1889.svg", noFlag: true, continent: "South America", noFlagReason: "No flag shown — Brazil has flown the republican flag since 1889, but its star field was redrawn each time states were added, so today's 27-star version is not the one that flew at this date, and no period-accurate image is bundled.", note: "United States of Brazil — the republican flag was adopted in 1889 with a star for each state.", population: 30_600_000 }],
  ])],

  ["ad1938", new Map<string, PolityInfo>([
    ["Venezuela", { flag: "historical-flags/venezuela-1930.svg", continent: "South America", note: "Venezuela under Eleazar Lopez Contreras. Seven stars in an arc — the eighth, for Guayana Province, was not added until 2006." }],
    ["Mexico", { flag: "historical-flags/mexico-1934.svg", continent: "Mesoamerica", note: "Mexico under Lazaro Cardenas. The 1934 pattern, the eagle in profile within a full circular oak-and-laurel wreath." }],
    ["Kuwait", { flag: "historical-flags/kuwait-1921.svg", continent: "Western Asia", note: "Sheikhdom of Kuwait — oil was struck at Burgan in 1938, four years after the concession was signed.", population: 75_000 }],
    ["Qatar", { flag: "historical-flags/qatar-1936.svg", continent: "Western Asia", note: "Sheikhdom of Qatar — a British protectorate since 1916, with the pearl trade collapsed and oil not yet flowing.", population: 25_000 }],
    ["Andorra", { flag: "historical-flags/andorra-1866.svg", continent: "Southern Europe", note: "Principality of Andorra — a co-principality of the French head of state and the Bishop of Urgell. The arms were added to its flag in 1971.", population: 5_000 }],
    // Nepal's double-pennon predates every era on this map; the version bundled here is the
    // one flown before the 1962 constitution standardised its geometry.
    ["Nepal", { flag: "historical-flags/nepal-1743.svg", continent: "South Asia", note: "Kingdom of Nepal under the Rana prime ministers — the Shah kings reigned but did not rule. Its double-pennon is the world's only non-quadrilateral national flag.", population: 5_000_000 }],
    ["Brunei", { flag: "historical-flags/brunei-1906.svg", continent: "Southeast Asia", note: "Brunei in 1938 — a British protectorate living off the Seria oilfield; the crest was added to its flag only in 1959.", population: 40_000 }],
    // AUDIT 2026-08 (goal 3): Xinjiang was flying the ROC five-coloured flag here, which the
    // Nationalists replaced nationally in 1928. https://en.wikipedia.org/wiki/Flag_of_the_Republic_of_China
    ["Xinjiang", { flag: "historical-flags/roc.png", continent: "Central Asia", note: "Xinjiang under Sheng Shicai — a Soviet-backed warlord governing in the Republic of China's name, flying its Blue Sky with a White Sun.", population: 4_000_000 }],
    // French Indochina in 1938 — the dataset records these as Japanese, but the
    // occupation began only in September 1940 (see FALSE_SUBJECTO).
    ["Cambodia", { noFlag: true, continent: "Southeast Asia", noFlagReason: "No flag shown — the French tricolour flew over the protectorate; Cambodia's own blue-and-red flag with Angkor Wat dates from 1948.", note: "The Kingdom of Cambodia as a French protectorate within French Indo-China; Japan's occupation was still two years away.", population: 3_000_000 }],
    ["USSR", { flag: "historical-flags/ussr.png", continent: "Eastern Europe / Northern Asia", note: "Union of Soviet Socialist Republics — the Soviet Union established on 30 December 1922. In 1938, under Stalin's leadership, the USSR was a fully consolidated totalitarian state spanning from Eastern Europe across Asia to the Pacific. The red flag with the hammer and sickle was its national symbol.", population: 168_000_000 }],
    ["Turkey", { modernName: "Türkiye", continent: "Western Asia", note: "Turkish Republic (1923–present) — established under Mustafa Kemal Atatürk after the collapse of the Ottoman Empire. The red flag with white crescent and star was adopted in 1923 and remains Turkey's flag today.", population: 16_000_000 }],
    ["Italy", { flag: "historical-flags/italy-kingdom.svg", continent: "Italy", note: "Fascist Italy under Mussolini — the green-white-red tricolour carried the Savoy arms of the Kingdom. The monarchy remained until 1946, when the republic removed the arms from the flag.", population: 43_000_000 }],
    ["Libya", { flag: "historical-flags/italy-kingdom.svg", continent: "North Africa", note: "Italian Libya, declared an integral part of Italy in 1939.", population: 850_000 }],
    ["Ethiopia (Italy)", { continent: "East Africa", note: "Italian East Africa — Ethiopia had been invaded in 1935–36 and would be liberated in 1941.", population: 10_000_000 }],
    ["Italian Somaliland", { continent: "East Africa", note: "Italian Somaliland, part of Italian East Africa from 1936.", population: 1_000_000 }],
    ["Eritrea", { flag: "historical-flags/italy-kingdom.svg", continent: "East Africa", note: "Italian Eritrea, part of Italian East Africa from 1936.", population: 600_000 }],
    ["Tanzania, United Republic of", { modernName: "United Kingdom", continent: "East Africa", note: "Tanganyika Territory — a British mandate between the wars.", population: 5_300_000 }],
    ["Kenya", { modernName: "United Kingdom", continent: "East Africa", note: "Kenya Colony under British rule.", population: 3_600_000 }],
    ["Uganda", { modernName: "United Kingdom", continent: "East Africa", note: "Uganda Protectorate under British rule.", population: 3_800_000 }],
    ["Nigeria", { modernName: "United Kingdom", continent: "West Africa", note: "Colony and Protectorate of Nigeria under British rule.", population: 20_000_000 }],
    // Nazi Germany. Black-red-gold was abolished in 1933 and only readopted in 1949,
    // so the Weimar/Federal flag is wrong here — the flag that actually flew in 1938
    // was the 1935–1945 national flag, which this educational game shows in period.
    ["Germany", { flag: "historical-flags/germany-nazi.svg", continent: "Central Europe", note: "Nazi Germany, which had just annexed Austria and the Sudetenland. The 1935–1945 national flag replaced the black-red-gold tricolour, which had been abolished in 1933 and was restored only in 1949.", population: 69_000_000 }],
    ["Hungary", { noFlag: true, continent: "Central Europe", noFlagReason: "No flag shown — the Kingdom flew the red-white-green tricolour charged with the crowned royal arms; today's plain tricolour dates from 1957, and no period image of the crowned version is bundled.", note: "Kingdom of Hungary under Regent Miklós Horthy — a kingdom without a king. Its red-white-green tricolour dates from 1848.", population: 9_000_000 }],
    ["Albania", { noFlag: true, continent: "Europe", noFlagReason: "No flag shown — Zog's kingdom flew the red flag with the black double-headed eagle beneath a helmet of Skanderbeg; today's plain eagle flag dates from 1992 and no period image of the helmeted version is bundled.", note: "Kingdom of Albania under King Zog I (1928–1939), a year from the Italian invasion of April 1939.", population: 1_050_000 }],
    ["Sudan", { modernName: "United Kingdom", continent: "Northeast Africa", note: "Anglo-Egyptian Sudan — the condominium ruled from Khartoum until independence in 1956.", population: 6_500_000 }],
    ["India", { modernName: "United Kingdom", continent: "South Asia", note: "British India on the eve of the war — still one Raj, ten years from partition.", population: 377_000_000 }],
    ["British Raj", { modernName: "United Kingdom", continent: "South Asia", note: "British India on the eve of the war — still one Raj, ten years from partition.", population: 377_000_000 }],
    ["Algeria", { modernName: "France", continent: "North Africa", note: "French Algeria, administered as departments of France.", population: 7_200_000 }],
    ["South Africa", { modernName: "United Kingdom", continent: "Southern Africa", note: "Union of South Africa — a dominion flying British flags alongside the 1928 orange-white-blue; today's flag dates from 1994.", population: 9_600_000 }],
    ["Iran", { flag: "historical-flags/persia-1933.svg", continent: "Western Asia", note: "Iran under Reza Shah Pahlavi, newly renamed from Persia — the Lion and Sun flag, used from 1907 until replaced by the Islamic Republic flag in 1980.", population: 15_000_000 }],
    ["Saudi Arabia", { flag: "historical-flags/saudi-arabia-1938.svg", continent: "Arabia", note: "Kingdom of Saudi Arabia (unified 1932) — the green flag with the white shahada text and curved sabre represents Islamic sovereignty. The design was standardised in 1938, though it was later revised in 1973.", population: 3_000_000 }],
    ["Egypt", { flag: "historical-flags/egypt-kingdom.svg", continent: "North Africa", note: "Kingdom of Egypt (1922–1952) — the green field with white crescent and three stars flew until the 1952 revolution that led to the modern red-white-black flag.", population: 16_000_000 }],
    ["Mongolia", { flag: "historical-flags/mongolia-1924.svg", continent: "East Asia", note: "Mongolian People's Republic — the red field with golden Soyombo (the flame/sun emblem with the three prongs) represented the Mongolian state from the 1920s through 1992.", population: 900_000 }],
    ["Tibet", { flag: "historical-flags/tibet.svg", continent: "East Asia", note: "Tibet in 1938 — the Tibetan snow lions and sun-with-rays flag on the blue field represented the Tibetan administration; Chinese occupation would not solidify until after 1951.", population: 1_400_000 }],
    ["Afghanistan", { flag: "historical-flags/afghanistan-1929.svg", continent: "Central Asia", note: "Kingdom of Afghanistan under King Mohammad Zahir Shah (1933–1973), the last Afghan king. The black-red-green tricolour was the national flag throughout his reign until the 1973 coup.", population: 8_500_000 }],
    ["Iraq", { flag: "historical-flags/iraq-1924.svg", continent: "Western Asia", note: "Kingdom of Iraq (1932–1958) — independent nation after the British mandate ended. The red-white-black tricolour with stars was the national flag from 1924 through the 1958 revolution.", population: 3_200_000 }],
    ["Malaysia", { modernName: "United Kingdom", continent: "Southeast Asia", note: "Malaya and the British territories of Sarawak, Brunei and North Borneo — not yet federated as Malaysia, which formed in 1963.", population: 3_500_000 }],
    ["Siam", { modernName: "Thailand", continent: "Southeast Asia", note: "Kingdom of Siam, renamed Thailand in 1939 — the striped red-white-blue flag (chakri flag) has been the national flag since 1917.", population: 15_000_000 }],
    ["Empire of Japan", { flag: "historical-flags/japan-1870.svg", continent: "East Asia", note: "Empire of Japan at the height of territorial expansion before the Pacific War. Its national flag was the 1870 Meiji Hinomaru shown here; the 16-ray Rising Sun so often pictured for this period was the army's war flag and the navy's ensign, never the national flag.", population: 73_000_000 }],
    ["Chinese warlords", { flag: "historical-flags/roc.png", modernName: "China", continent: "East Asia", note: "China, fragmented between competing warlord factions — national unification would not occur until the 1928 completion of the Northern Expedition.", population: 500_000_000 }],
    ["United States", { flag: "historical-flags/us-48star.svg", continent: "North America", note: "The United States flew the 48-star flag (1912–1959); the 50-star flag dates from 1960.", }],
    ["Yemen", { flag: "historical-flags/mutawakkilite-yemen.svg", continent: "Arabia", note: "Mutawakkilite Kingdom of Yemen — the red flag with white sword and five stars represented the kingdom from its establishment in 1918 until the 1962 revolution.", population: 4_200_000 }],
    ["Philippines", { modernName: "Philippines", continent: "Southeast Asia", note: "Commonwealth of the Philippines, a U.S. territory with internal self-governance under the 1935 Commonwealth Constitution. Independence and the modern flag both came in 1946. The white sun and three stars flag has been in use since 1898.", population: 16_000_000 }],
    ["Brazil", { flag: "historical-flags/brazil-1889.svg", noFlag: true, continent: "South America", noFlagReason: "No flag shown — Brazil has flown the republican flag since 1889, but its star field was redrawn each time states were added, so today's 27-star version is not the one that flew at this date, and no period-accurate image is bundled.", note: "United States of Brazil under Getúlio Vargas's Estado Novo — the republican flag was adopted in 1889 with a star for each state.", population: 39_000_000 }],
    // --- Additional European and other states for 1938 -------------------------
    ["Spain", { noFlag: true, continent: "Western Europe", noFlagReason: "No flag shown — in 1938 two flags flew over Spain: the Republic's red-yellow-purple tricolour and the Nationalists' red-yellow-red. No single national flag applies to this date, and neither period image is bundled.", note: "Spain in the middle of the Civil War (1936–1939), the country split between Republican and Nationalist control.", population: 23_000_000 }],
    ["Poland", { continent: "Eastern Europe", note: "Second Polish Republic (1919–1939) — independent state between Germany and the Soviet Union. The white-and-red bicolour was adopted in 1919.", population: 34_500_000 }],
    ["Czechoslovakia", { flag: "historical-flags/czechoslovakia.png", continent: "Central Europe", note: "Czechoslovakia in 1938 — months from being dismantled by Nazi Germany. Its white-red flag with the blue hoist triangle, adopted in 1920, is the flag Czechia flies today.", population: 15_000_000 }],
    ["Netherlands", { continent: "Western Europe", note: "Kingdom of the Netherlands in 1938 — neutral until the German invasion of 1940. Its red-white-blue tricolour is unchanged today.", population: 8_700_000 }],
    ["Belgium", { continent: "Western Europe", note: "Kingdom of Belgium in 1938 — officially neutral, though Germany would invade in 1940. Its black-yellow-red tricolour has flown since 1831.", population: 8_400_000 }],
    ["Greece", { noFlag: true, continent: "SE Europe", noFlagReason: "No flag shown — Greece's national land flag in 1938 was a plain white cross on blue; the nine-striped flag was then the sea flag, and became the sole national flag only in 1978.", note: "Kingdom of Greece in 1938 — under the Metaxas dictatorship.", population: 6_500_000 }],
    ["Romania", { continent: "SE Europe", note: "Kingdom of Romania in 1938, under Carol II's royal dictatorship. Its blue-yellow-red civil tricolour dates from 1848 and is Romania's flag today; only the state flag carried the royal arms.", population: 19_000_000 }],
    ["Yugoslavia", { noFlag: true, continent: "SE Europe", noFlagReason: "No flag shown — the Kingdom flew a plain blue-white-red tricolour; the red star of the bundled Yugoslav flag was added only in 1945, and no period image of the royal flag is bundled.", note: "Kingdom of Yugoslavia in 1938 — three years from the Axis invasion of 1941.", population: 15_700_000 }],
    ["Persia", { flag: "historical-flags/persia-1907.svg", continent: "Western Asia", note: "Persia (renamed Iran in 1935) in 1938 — under Reza Shah Pahlavi. The Lion and Sun flag represented the nation until 1980.", population: 14_500_000 }],
    ["Netherlands Indies", { modernName: "Netherlands", continent: "Southeast Asia", note: "Netherlands East Indies in 1938 — Dutch colonial possession; Japanese occupation would begin in 1942.", population: 70_000_000 }],
  ])],

  // === 1945 (end of WWII) overrides =========================================
  ["ad1945", new Map<string, PolityInfo>([
    ["Venezuela", { flag: "historical-flags/venezuela-1930.svg", continent: "South America", note: "Venezuela. The seven-star tricolour adopted in 1930; the eighth star followed in 2006." }],
    ["Mexico", { flag: "historical-flags/mexico-1934.svg", continent: "Mesoamerica", note: "Mexico. The 1934 pattern was still the national flag; the arms the modern flag carries were adopted in 1968." }],
    // The four occupation zones. Germany had NO national flag from 1945 to 1949 — the
    // black-red-gold was abolished in 1935 and readopted by the Federal Republic in 1949 —
    // so each zone flies its occupying power's flag, captioned.
    // https://en.wikipedia.org/wiki/Allied-occupied_Germany
    ["American occupation zone", { continent: "Central Europe", note: "The American zone of occupied Germany — Bavaria, Hesse and northern Baden-Württemberg, plus the Bremen enclave. It merged into Bizonia with the British zone in 1947.", population: 17_200_000 }],
    ["British occupation zone", { continent: "Central Europe", note: "The British zone of occupied Germany — the industrial Ruhr, Lower Saxony and Schleswig-Holstein, and the most heavily bombed part of the country.", population: 22_300_000 }],
    ["French occupation zone", { continent: "Central Europe", note: "The French zone of occupied Germany — the Rhineland-Palatinate, southern Baden and the Saar, which France administered separately from 1947.", population: 5_900_000 }],
    ["Kuwait", { noFlag: true, continent: "Western Asia", note: "Sheikhdom of Kuwait — a British protectorate; independence came in 1961, with the modern flag.", population: 90_000, noFlagReason: "No flag shown — Kuwait flew a red flag bearing its name in Arabic, revised in 1940; only the 1921–1940 version is bundled, and the modern flag dates from 1961." }],
    ["Qatar", { flag: "historical-flags/qatar-1936.svg", continent: "Western Asia", note: "Sheikhdom of Qatar — a British protectorate; oil exports began in 1949.", population: 25_000 }],
    ["Oman", { flag: "historical-flags/muscat-oman.svg", continent: "Western Asia", note: "Sultanate of Muscat and Oman under Said bin Taimur — closed to the outside world; the plain red flag flew until 1970.", population: 500_000 }],
    ["Syria", { flag: "historical-flags/syria-1930.svg", continent: "Western Asia", note: "Syria — the French mandate ended in 1946 after nationalist pressure and British intervention; the last French troops left that April.", population: 3_000_000 }],
    ["Ethiopia", { flag: "historical-flags/abyssinia.png", continent: "East Africa", note: "Empire of Ethiopia — Haile Selassie restored in 1941 after five years of Italian occupation, and a founder member of the United Nations.", population: 16_000_000 }],
    // Nepal's double-pennon predates every era on this map; the version bundled here is the
    // one flown before the 1962 constitution standardised its geometry.
    ["Nepal", { flag: "historical-flags/nepal-1743.svg", continent: "South Asia", note: "Kingdom of Nepal under the Rana prime ministers — the Shah kings reigned but did not rule. Its double-pennon is the world's only non-quadrilateral national flag.", population: 5_000_000 }],
    ["Brunei", { flag: "historical-flags/brunei-1906.svg", continent: "Southeast Asia", note: "Brunei in 1945 — just liberated from Japanese occupation, under British military administration.", population: 40_000 }],
    // AUDIT 2026-08 (goal 3): see ad1938 — the five-coloured flag ended in 1928.
    ["Xinjiang", { flag: "historical-flags/roc.png", continent: "Central Asia", note: "Xinjiang in 1945 — back under Nationalist control after Sheng Shicai's break with Moscow, and flying the Republic of China's flag.", population: 4_000_000 }],
    // AUDIT 2026-08 (goal 3): the global Spain entry carries the 1785 royal ensign, which the
    // Second Republic replaced in 1931 and Franco's state replaced again — the flag flying in
    // 1945 was the Eagle of Saint John version. https://en.wikipedia.org/wiki/Flag_of_Spain
    ["Spain", { flag: "historical-flags/spain-1945.svg", continent: "Western Europe", note: "Francoist Spain — neutral in the war but diplomatically isolated after it; the red-yellow-red flag carried the Eagle of Saint John from 1945 to 1977.", population: 26_400_000 }],
    ["Japan (USA)", { flag: "historical-flags/japan-1870.svg", continent: "East Asia", note: "Japan under Allied occupation from September 1945. The Hinomaru still flew — at first only with the occupation authorities' permission — in the 1870 Meiji form; today's proportions and brighter crimson date from the 1999 flag law.", population: 72_000_000 }],
    // The dataset spells Turkey "Türkiye" from 1945 on; without an entry the panel fell
    // back to the era-agnostic registry note, which describes the Ottoman empire.
    // The English name "Türkiye" dates from Turkey's 2022 request to the UN, so the era
    // remap shows "Turkey" — and the shown name needs its own entry, or the panel falls
    // through to the registry's Ottoman "Turkey" entry (which is noFlag, losing the flag).
    ["Turkey", { modernName: "Türkiye", continent: "Western Asia", note: "Republic of Turkey — neutral for almost all of the war, declaring on Germany only in February 1945. Its red flag with the white crescent and star dates from 1844. It asked the world to use the Turkish spelling, Türkiye, only in 2022.", population: 19_000_000 }],
    // French West/Equatorial Africa in 1945 — shown under the names they actually bore.
    // https://en.wikipedia.org/wiki/Upper_Volta
    ["Upper Volta", { modernName: "France", continent: "West Africa", note: "Upper Volta — a French colony from 1919, dissolved in 1932 and shared out between Côte d'Ivoire, French Sudan and Niger; it was re-established in 1947, became independent in 1960 and was renamed Burkina Faso in 1984. In 1945 the French tricolour flew over it." }],
    // https://en.wikipedia.org/wiki/French_Dahomey
    ["Dahomey", { modernName: "France", continent: "West Africa", note: "French Dahomey — the colony built on the conquered Kingdom of Dahomey, part of French West Africa. It became independent in 1960 and was renamed Benin in 1975." }],
    // https://en.wikipedia.org/wiki/French_Sudan
    ["French Sudan", { modernName: "France", continent: "West Africa", note: "French Sudan (Soudan français) — the vast interior colony of French West Africa, governed from Bamako. It became the Sudanese Republic in 1958 and the Republic of Mali in 1960." }],
    // https://en.wikipedia.org/wiki/Ubangi-Shari
    ["Ubangi-Shari", { modernName: "France", continent: "Central Africa", note: "Ubangi-Shari (Oubangui-Chari) — the French Equatorial African colony between the Ubangi and Chari rivers, renamed the Central African Republic when it became self-governing in 1958." }],
    ["USSR", { flag: "historical-flags/ussr.png", continent: "Eastern Europe / Northern Asia", note: "Union of Soviet Socialist Republics — the Soviet Union at the end of World War II, after defeating Nazi Germany. The USSR emerged as one of two superpowers, with control over Eastern Europe and major influence in Asia. The red flag with the hammer and sickle was its national symbol until 1991.", population: 194_000_000 }],
    ["India", { modernName: "United Kingdom", continent: "South Asia", note: "British India at the war's end — partition and independence came two years later, in 1947.", population: 389_000_000 }],
    ["South Africa", { modernName: "United Kingdom", continent: "Southern Africa", note: "Union of South Africa — a dominion that fought with the Allies, flying British flags and the 1928 orange-white-blue; today's flag dates from 1994.", population: 11_400_000 }],
    ["Tanzania, United Republic of", { modernName: "United Kingdom", continent: "East Africa", note: "Tanganyika — a British mandate, soon a UN trust territory; independent in 1961.", population: 6_000_000 }],
    ["Kenya", { modernName: "United Kingdom", continent: "East Africa", note: "Kenya Colony under British rule; independence came in 1963.", population: 5_200_000 }],
    ["Uganda", { modernName: "United Kingdom", continent: "East Africa", note: "Uganda Protectorate under British rule; independence came in 1962.", population: 4_900_000 }],
    ["Nigeria", { modernName: "United Kingdom", continent: "West Africa", note: "Colony and Protectorate of Nigeria; independence came in 1960.", population: 23_000_000 }],
    ["Mauritania", { modernName: "France", continent: "West Africa", note: "French Mauritania, part of French West Africa; independence came in 1960.", population: 500_000 }],
    ["Namibia", { modernName: "United Kingdom", continent: "Southern Africa", note: "South West Africa — German until 1915, then governed by South Africa under a League mandate. It became Namibia only in 1990.", population: 350_000 }],
    ["Sudan", { modernName: "United Kingdom", continent: "Northeast Africa", note: "Anglo-Egyptian Sudan — independence, and a Sudanese flag, came in 1956.", population: 7_500_000 }],
    ["Iran", { flag: "historical-flags/persia-1933.svg", continent: "Western Asia", note: "Iran under Mohammad Reza Shah, occupied by Britain and the USSR during the war — the Lion and Sun flag, used from 1907 until 1980.", population: 15_500_000 }],
    ["Saudi Arabia", { flag: "historical-flags/saudi-arabia-1938.svg", continent: "Arabia", note: "Kingdom of Saudi Arabia — the green flag with white shahada and sabre, standardised in 1938 and used through 1973.", population: 3_500_000 }],
    ["Egypt", { flag: "historical-flags/egypt-kingdom.svg", continent: "North Africa", note: "Kingdom of Egypt under King Farouk — the green field with white crescent and three stars; replaced after the 1952 revolution by the modern red-white-black flag.", population: 19_000_000 }],
    ["Mongolia", { flag: "historical-flags/mongolia-1945.svg", continent: "East Asia", note: "Mongolian People's Republic — the red flag with the golden Soyombo emblem represented Mongolia through 1992.", population: 1_000_000 }],
    ["Tibet", { flag: "historical-flags/tibet.svg", continent: "East Asia", note: "Tibet in 1945 — the snow lions and sun-with-rays flag on the blue field; Chinese occupation would follow 1951.", population: 1_500_000 }],
    ["Afghanistan", { flag: "historical-flags/afghanistan-1929.svg", continent: "Central Asia", note: "Kingdom of Afghanistan under King Mohammad Zahir Shah during WWII — neutral and independent. The black-red-green flag flew throughout his reign (1933–1973).", population: 9_000_000 }],
    ["Iraq", { flag: "historical-flags/iraq-1924.svg", continent: "Western Asia", note: "Kingdom of Iraq at the end of WWII — still independent under the Hashemite dynasty. The red-white-black tricolour was the national flag until the 1958 revolution.", population: 4_000_000 }],
    ["Italy", { flag: "historical-flags/italy-kingdom.svg", continent: "Italy", note: "Italy at the war's end in May 1945 — the Kingdom still flew the tricolour with Savoy arms. The monarchy fell in May 1946, and the new republic removed the arms from the flag.", population: 45_000_000 }],
    ["United States", { flag: "historical-flags/us-48star.svg", continent: "North America", note: "The United States flew the 48-star flag (1912–1959); the 50-star flag dates from 1960.", }],
    // China in 1945 — Republic of China (KMT) flag, blue-sky/white-sun
    // on red. The PRC (modern flag) wouldn't be founded until Oct 1949.
    ["China", { flag: "historical-flags/roc.png", continent: "East Asia", note: "Republic of China under the Nationalists (Chiang Kai-shek). Blue-sky / white-sun on red — adopted 1928. The PRC and its 5-star red flag came in October 1949.", population: 540_000_000 }],
    // Manchuria 1945 — Manchukuo (Japanese puppet state) until Aug 1945,
    // then handed to ROC. Use ROC flag for end-of-1945 representation.
    ["Manchuria", { flag: "historical-flags/roc.png", continent: "East Asia", note: "Manchukuo (Japanese puppet state) until August 1945, then occupied by Soviet then Nationalist (ROC) forces.", population: 50_000_000 }],
    // Burma 1945 — under British military administration (SEAC) after
    // Japanese withdrawal. Independence and the 1948 flag both came in 1948.
    // Showing the 1948 flag for 1945 is a 3-year anachronism; use UK flag.
    ["Burma", { modernName: "United Kingdom", continent: "Southeast Asia", note: "Burma in 1945 — just liberated from Japanese occupation, under British South East Asia Command (SEAC) military administration. Independence and the Union of Burma flag came in 1948.", population: 17_500_000 }],
    ["Malaysia", { modernName: "United Kingdom", continent: "Southeast Asia", note: "Malaya and British Borneo territories in 1945 — still under Japanese occupation or just liberated; the Malayan Union formed in 1946, and the Federation of Malaya in 1948, but Malaysia as such was not established until 1963.", population: 3_500_000 }],
    // Yemen 1945 — Mutawakkilite Kingdom (1918–1962). Flag was red with white sword + 5 stars.
    ["Yemen", { flag: "historical-flags/mutawakkilite-yemen.svg", continent: "Arabia", note: "Mutawakkilite Kingdom of Yemen — the red flag with white sword and five stars was the national flag from 1918 to 1962.", population: 4_700_000 }],
    // Korea 1945 — Allied occupation zones. No national flag yet (the
    // Taegukgi for the South was formalised in 1948; the DPRK flag also
    // in 1948).
    ["Korea (USA)", { continent: "East Asia", noFlagReason: "No flag shown — under the United States Army Military Government (1945–48) no Korean national flag flew officially; the Taegukgi was formalised by the new Republic of Korea in 1948.", note: "United States Army Military Government in Korea (1945–1948). No Korean national flag flew officially — the Taegukgi was formalised by the new ROK in 1948.", population: 16_000_000, noFlag: true }],
    ["Korea (USSR)", { continent: "East Asia", noFlagReason: "No flag shown — under the Soviet Civil Administration (1945–48) northern Korea had no national flag; the DPRK's was adopted in 1948.", note: "Soviet Civil Administration in northern Korea (1945–1948). No national flag — the DPRK flag was adopted in 1948.", population: 9_000_000, noFlag: true }],
    // Saar Protectorate — French zone, then French protectorate
    // 1947–1956 with its own blue-and-red cross flag. No curated PNG.
    ["Saar Protectorate", { continent: "Western Europe", noFlagReason: "No flag shown — in 1945 the Saar was still a French occupation zone with no flag of its own; the protectorate's Nordic-cross flag followed in 1948, and it joined West Germany in 1957.", note: "Initial French occupation zone then French protectorate 1947–1956. Used its own flag with a Scandinavian-style cross — joined West Germany in 1957.", population: 850_000, noFlag: true }],
    // Zaire is the dataset's anachronistic 1945 label for the Belgian
    // Congo (the name 'Zaire' only existed from 1971 under Mobutu).
    // "Dutch Guinea" is upstream's misspelling of Dutch NEW Guinea — the western half
    // of New Guinea (135.5°E), not Dutch Guiana in South America (which the 1945 file
    // carries separately as "Suriname"). https://en.wikipedia.org/wiki/Netherlands_New_Guinea
    ["Dutch Guinea", { continent: "Oceania / New Guinea", note: "Netherlands New Guinea — the western half of the island of New Guinea, governed as part of the Dutch East Indies and kept by the Netherlands when Indonesia became independent; transferred to Indonesia in 1963. The Dutch tricolour flew over it.", modernName: "Netherlands" }],
    // Cyrenaica, Tripolitania, Fezzan 1945 — UK and French military
    // administrations over former Italian Libya. Already aliased.
    // Modern country names that were still under colonial rule in 1945:
    ["Algeria", { continent: "North Africa", note: "Still legally French — three Algerian départements of metropolitan France. The independence war wouldn't start until 1954.", modernName: "France", population: 8_500_000 }],
    ["Tunisia", { continent: "North Africa", note: "French protectorate (1881–1956). The French tricolour flew alongside the bey's flag.", modernName: "France", population: 3_200_000 }],
    ["Morocco", { continent: "North Africa", note: "French and Spanish protectorate (1912–1956). The French tricolour was the dominant flag.", modernName: "France", population: 10_000_000 }],
    // Sri Lanka in 1945 = British Crown Colony of Ceylon (until 1948).
    // The Ceylon dominion flag was adopted in 1948; the 1951 version (our PNG)
    // came even later. Show Union Jack — the correct flag for 1945.
    // Taiwan in 1945 = surrendered to the Republic of China (KMT) after
    // Japan's defeat. Use the ROC flag.
    ["Taiwan", { flag: "historical-flags/roc.png", continent: "East Asia", note: "Taiwan (Formosa) reverted to Republic of China (ROC) control in October 1945 after Japan's surrender — the ROC's blue-sky/white-sun flag flew.", population: 6_000_000 }],
    // French Indochina in 1945: Annam, Tonkin still referenced as French;
    // Cochin China alias already routes to France. No extra overrides needed.
    ["Philippines", { modernName: "Philippines", continent: "Southeast Asia", note: "Republic of the Philippines — independent since 1946, just out of the Japanese occupation and American reconstruction. The white sun and three stars flag has been in use since 1898.", population: 19_000_000 }],
    ["Hungary", { noFlag: true, continent: "Central Europe", noFlagReason: "No flag shown — the red-white-green tricolour flew here with the crowned royal arms, and after 1949 with communist ones; today's plain tricolour dates from 1957 and no period image of either charged version is bundled.", note: "Hungary under Soviet occupation at the war's end — the kingdom formally lasted until the republic of 1946.", population: 9_300_000 }],
    ["Albania", { noFlag: true, continent: "Europe", noFlagReason: "No flag shown — the 1945 provisional government flew the red flag with the black double-headed eagle beneath a gold star; today's plain eagle flag dates from 1992 and no period image of the star version is bundled.", note: "Albania between states — the kingdom ended in 1944 and the People's Republic was proclaimed in January 1946.", population: 1_100_000 }],
    ["Brazil", { flag: "historical-flags/brazil-1889.svg", noFlag: true, continent: "South America", noFlagReason: "No flag shown — Brazil has flown the republican flag since 1889, but its star field was redrawn each time states were added, so today's 27-star version is not the one that flew at this date, and no period-accurate image is bundled.", note: "United States of Brazil — the only South American country to send troops to fight in Europe. Its republican flag dates from 1889.", population: 45_000_000 }],
  ])],

  // === 1960 (Cold War snapshot) overrides ==================================
  ["ad1960", new Map<string, PolityInfo>([
    ["Venezuela", { flag: "historical-flags/venezuela-1930.svg", continent: "South America", note: "Venezuela in the democratic era after 1958. The flag carried seven stars until 2006." }],
    ["Mexico", { flag: "historical-flags/mexico-1934.svg", continent: "Mesoamerica", note: "Mexico. The 1934 pattern; Francisco Eppens Helguera's arms, which the modern flag carries, followed on 16 September 1968." }],
    ["Oman", { flag: "historical-flags/muscat-oman.svg", continent: "Western Asia", note: "Sultanate of Muscat and Oman — the Jebel Akhdar war had just ended; the plain red flag flew until 1970.", population: 550_000 }],
    ["Nepal", { flag: "historical-flags/nepal-1743.svg", continent: "South Asia", note: "Kingdom of Nepal — King Mahendra dismissed the elected government in December 1960 and ruled directly. The flag's geometry was fixed by the 1962 constitution.", population: 9_800_000 }],
    ["Ethiopia", { flag: "historical-flags/abyssinia.png", continent: "East Africa", note: "Empire of Ethiopia under Haile Selassie — the Lion of Judah flag flew until the 1974 revolution.", population: 22_000_000 }],
    // Syria and Egypt were one state, the United Arab Republic, from 1958 to 1961.
    ["Syria", { flag: "historical-flags/uar-1958.svg", continent: "Western Asia", note: "The Syrian Region of the United Arab Republic — Syria's union with Egypt, which it left in 1961.", population: 4_500_000 }],
    ["Mali", { flag: "historical-flags/mali-1959.svg", continent: "West Africa", note: "Republic of Mali — independent in September 1960 after the Mali Federation with Senegal broke up. The kanaga figure was dropped from the flag in 1961.", population: 4_500_000 }],
    ["Cameroon", { flag: "historical-flags/cameroon-1957.svg", continent: "Central Africa", note: "Republic of Cameroon — independent from France on 1 January 1960; the British Southern Cameroons joined in 1961, when stars were added to the flag.", population: 5_200_000 }],
    ["Eritrea (federated with Ethiopia)", { flag: "historical-flags/eritrea-1952.svg", continent: "East Africa", note: "Eritrea — federated with Ethiopia by UN resolution in 1952 and flying its own flag until Haile Selassie annexed it outright in 1962.", population: 1_200_000 }],
    // AUDIT 2026-08 (goal 3): see the ad1945 entry — the 1785 ensign had not flown since 1931.
    ["Spain", { flag: "historical-flags/spain-1945.svg", continent: "Western Europe", note: "Francoist Spain — the Eagle of Saint John flag flew until 1977; the present arms date from 1981.", population: 30_500_000 }],
    ["Japan", { flag: "historical-flags/japan-1870.svg", continent: "East Asia", note: "Japan in its post-war economic miracle, hosting the Olympics four years later. The Hinomaru still flew in its 1870 Meiji form; today's proportions and brighter crimson date from the 1999 flag law.", population: 94_000_000 }],
    // "Türkiye" is the raw dataset spelling; the era remap shows "Turkey", the English
    // name until the 2022 UN request, and the shown name needs its own entry so the
    // panel does not fall through to the registry's Ottoman "Turkey" (which is noFlag).
    ["Turkey", { modernName: "Türkiye", continent: "Western Asia", note: "Republic of Turkey — a NATO member since 1952, in the year its army took power in the coup of May 1960. Its red flag with the white crescent and star dates from 1844. It asked the world to use the Turkish spelling, Türkiye, only in 2022.", population: 28_000_000 }],
    // Independent in 1960, but under the names they carried then: Upper Volta was renamed
    // Burkina Faso in 1984 (https://en.wikipedia.org/wiki/Upper_Volta) and Dahomey became
    // Benin in 1975 (https://en.wikipedia.org/wiki/Republic_of_Dahomey).
    ["Upper Volta", { flag: "historical-flags/upper-volta-1959.svg", modernName: "Burkina Faso", continent: "West Africa", note: "The Republic of Upper Volta — independent from France on 5 August 1960. Thomas Sankara renamed it Burkina Faso, \"land of upright people\", in 1984, and the country adopted a new flag with the name.", population: 4_400_000 }],
    ["Dahomey", { modernName: "Benin", continent: "West Africa", note: "The Republic of Dahomey — independent from France on 1 August 1960, named after the pre-colonial kingdom. It was renamed Benin, after the Bight of Benin, in 1975.", population: 2_100_000 }],
    // As for 1994 — the ROC flag flew over Taiwan in 1960; "Taiwan" is not a name
    // the modern-country fallback can match, so it needs an explicit entry.
    ["Taiwan", { flag: "historical-flags/roc.png", continent: "East Asia", note: "Taiwan under the Republic of China, whose government had withdrawn to the island in 1949 and still held China's UN seat. The blue-sky/white-sun flag has flown since 1928.", population: 10_800_000 }],
    ["USSR", { flag: "historical-flags/ussr.png", continent: "Eastern Europe / Northern Asia", note: "Union of Soviet Socialist Republics — the Soviet Union in 1960 at the height of the Cold War, spanning from Eastern Europe to the Pacific under Nikita Khrushchev. The red flag with hammer and sickle was its national symbol.", population: 214_000_000 }],
    ["Yugoslavia", { flag: "historical-flags/yugoslavia.png", continent: "SE Europe", note: "Socialist Federal Republic of Yugoslavia (1945–1992) — the unified Yugoslav state under Josip Broz Tito, spanning South Slavic territories. The blue-white-red tricolour represented the socialist federation.", population: 18_500_000 }],
    ["Czechoslovakia", { flag: "historical-flags/czechoslovakia.png", continent: "Central Europe", note: "Czechoslovak Socialist Republic (1948–1968) — formally communist from 1948, though relative liberalization occurred by 1960. The red-white-blue tricolour represented the unified Czechoslovak state until the 1989 Velvet Revolution.", population: 14_000_000 }],
    ["Namibia", { noFlag: true, continent: "Southern Africa", noFlagReason: "No flag shown — South West Africa was governed by South Africa and flew South Africa's orange-white-blue flag of 1928; Namibia's own flag came with independence in 1990.", note: "South West Africa — still ruled by South Africa against UN objection; it became independent Namibia, with its own flag, in 1990.", population: 600_000 }],
    ["Mozambique", { ruler: "Portugal", continent: "East Africa", note: "Portuguese Mozambique — the independence war began in 1964 and ended in 1975.", population: 7_000_000 }],
    ["Zambia", { modernName: "United Kingdom", continent: "Southern Africa", note: "Northern Rhodesia, part of the Central African Federation; Zambia and its flag came in 1964.", population: 3_100_000 }],
    ["Kenya", { modernName: "United Kingdom", continent: "East Africa", note: "Kenya Colony in its last years of British rule, after the Mau Mau uprising; independence came in 1963.", population: 8_100_000 }],
    ["Uganda", { modernName: "United Kingdom", continent: "East Africa", note: "Uganda Protectorate — independence, and the crested-crane flag, came in 1962.", population: 6_800_000 }],
    ["Tanzania, United Republic of", { modernName: "United Kingdom", continent: "East Africa", note: "Tanganyika — a UN trust territory under Britain; independent in 1961 and united with Zanzibar as Tanzania in 1964.", population: 10_000_000 }],
    ["Mauritania", { flag: "historical-flags/mauritania-1959.svg", continent: "West Africa", note: "Islamic Republic of Mauritania, independent from France in November 1960 — its green flag with star and crescent was adopted 1959.", modernName: "Mauritania", population: 900_000 }],
    ["India", { modernName: "India", continent: "South Asia", note: "Republic of India — independent since 1947; the Ashoka-chakra tricolour was adopted that year.", population: 450_000_000 }],
    ["South Africa", { modernName: "United Kingdom", continent: "Southern Africa", note: "Union of South Africa in its last year before becoming a republic — flying the 1928 orange-white-blue; today's flag dates from 1994.", population: 17_400_000 }],
    ["Sudan", { flag: "historical-flags/sudan-1956.svg", modernName: "Sudan", continent: "Northeast Africa", note: "Republic of the Sudan, independent from the Anglo-Egyptian condominium in 1956.", population: 11_200_000 }],
    ["Iran", { flag: "historical-flags/persia-1933.svg", continent: "Western Asia", note: "Imperial Iran under the Shah — the Lion and Sun flag, used from 1907 until replaced by the Islamic Republic's in 1980.", population: 21_000_000 }],
    ["Saudi Arabia", { flag: "historical-flags/saudi-arabia-1938.svg", continent: "Arabia", note: "Kingdom of Saudi Arabia — the green flag with white shahada and sabre, standardised in 1938; it was revised in 1973 to the current design.", population: 4_000_000 }],
    ["Afghanistan", { flag: "historical-flags/afghanistan-1929.svg", continent: "Central Asia", note: "Kingdom of Afghanistan under King Mohammad Zahir Shah — independent, non-aligned, and modernizing. The black-red-green flag was the national flag throughout his reign until 1973.", population: 11_000_000 }],
    ["Iraq", { flag: "historical-flags/iraq-1959.svg", continent: "Western Asia", note: "Iraq in 1960 — two years after the 1958 revolution that overthrew the Hashemite kingdom and proclaimed the Iraqi Republic. The old royal flag represents the kingdom that had just ended.", population: 6_200_000 }],
    ["Mongolia", { flag: "historical-flags/mongolia-1945.svg", continent: "East Asia", note: "Mongolian People's Republic — the red flag with golden Soyombo emblem, used until the flag change in 1992.", population: 1_200_000 }],
    ["Tibet", { noFlag: true, noFlagReason: "No flag shown — Tibet was annexed by the People's Republic of China in 1951 and the snow-lion flag was suppressed; after the 1959 uprising it survived only in exile.", continent: "East Asia", note: "Tibet in 1960 — the snow lions and sun-with-rays flag represented the Tibetan cultural identity, though Chinese control was consolidating after 1951.", population: 1_800_000 }],
    // Burma in 1960 was the Union of Burma — still on the 1948 flag.
    ["Burma", { flag: "historical-flags/burma-1948.png", continent: "Southeast Asia", note: "Union of Burma — the 1948 flag (red with blue canton + 1 large + 5 small stars) flew from 1948 until 1974.", population: 22_000_000 }],
    ["Malaysia", { flag: "historical-flags/malaya-1950.svg", modernName: "Malaysia", continent: "Southeast Asia", note: "Malaya and British territories in Borneo (Sarawak, North Borneo, Brunei) — the Malayan Federation existed from 1948, but the modern federation of Malaysia was not formally established until 1963; shown here as its historical configuration.", population: 4_500_000 }],
    // China in 1960 = People's Republic of China. The modern PRC flag
    // adopted in 1949 is the correct one — auto-fallback gives this.
    // No override needed.
    // Egypt in 1960 = United Arab Republic (Egypt + Syria, 1958–1971).
    // Red-white-black with 2 green stars. Visually similar to today's
    // flag but with different central emblem. Without curated PNG, no flag.
    ["Egypt", { flag: "historical-flags/uar-1958.svg", noFlag: true, continent: "North Africa", noFlagReason: "No flag shown — in 1960 this was the United Arab Republic, flying the red-white-black tricolour with two green stars for its two member states; no period-accurate image of that flag is bundled.", note: "United Arab Republic — Nasser's union of Egypt and Syria (1958–1971).", population: 27_000_000 }],
    // Algeria in 1960 still French (independence 1962).
    ["Algeria", { continent: "North Africa", note: "Still legally part of France — bitter independence war (1954–1962) was raging. The French tricolour was the official flag.", modernName: "France", population: 11_000_000 }],
    // Yemen in 1960 — Mutawakkilite Kingdom (North) until the 1962 revolution + Aden Protectorate (South).
    ["Yemen", { flag: "historical-flags/mutawakkilite-yemen.svg", continent: "Arabia", note: "The Mutawakkilite Kingdom in the north (1918–1962) flew the red flag with white sword and stars; the south was under British rule as the Aden Protectorate.", population: 5_300_000 }],
    // Zaire is again the dataset's anachronistic label — in 1960 was
    // the Belgian Congo (independent in June 1960 as the Republic of
    // the Congo, then Congo-Léopoldville). Used a blue+yellow flag
    // until 1971 when it became Zaire. Modern DRC flag is from 2006.
    ["Zaire", { continent: "Central Africa", note: "Belgian Congo until June 1960 independence, then Republic of the Congo / Congo-Léopoldville. The name \"Zaire\" wasn't adopted until 1971.", modernName: "Belgium", population: 16_000_000 }],
    // Ceylon — Dominion of Ceylon (1948–1972). Distinct lion-on-yellow
    // flag with green/orange panels (added 1951). Use the Dominion flag.
    ["Ceylon", { flag: "historical-flags/ceylon.png", continent: "South Asia", note: "Dominion of Ceylon (1948–1972). The lion + bo-leaves flag was adopted in 1951; minor changes in 1972 became the modern Sri Lankan flag.", population: 10_000_000 }],
    // Libya 1960 — Kingdom of Libya (1951–1969) under King Idris. Black
    // field with red+green stripes + white crescent and star. The modern
    // flag (1977-2011 green, 2011 reverted to Idris). The modern Libyan
    // flag IS visually equivalent to the Idris flag. OK to use modern.
    // Vietnam in 1960 was split into North and South. The dataset labels it
    // "Vietnam" — the modern flag (red with yellow star) represents the
    // victorious North / reunified Vietnam (1976). Use modernName for
    // North Vietnam since the flag is essentially the same from 1955.
    ["Vietnam", { modernName: "Vietnam", continent: "Southeast Asia", note: "Vietnam in 1960 was divided: the Democratic Republic of Vietnam (North, communist) and the Republic of Vietnam (South, US-backed). The modern red-star flag represents the North/reunified Vietnam.", population: 30_000_000 }],
    // Sri Lanka in 1960 = Dominion of Ceylon. Use the Ceylon flag.
    ["Philippines", { modernName: "Philippines", continent: "Southeast Asia", note: "Republic of the Philippines — independent since 1946, with 14 years of post-independence nation-building underway. The white sun and three stars flag has been in use since 1898.", population: 27_000_000 }],
    ["Hungary", { continent: "Central Europe", note: "Hungarian People's Republic — a Soviet satellite since 1948, and four years on from the crushed uprising of 1956. The plain red-white-green tricolour it flies today was restored in 1957, after the uprising tore the communist arms out of the flag.", population: 10_000_000 }],
    ["Albania", { noFlag: true, continent: "Europe", noFlagReason: "No flag shown — the People's Republic flew the red flag with the black double-headed eagle beneath a gold star; today's plain eagle flag dates from 1992 and no period image of the star version is bundled.", note: "People's Republic of Albania under Enver Hoxha — aligned with the Soviet bloc until the split of 1961.", population: 1_600_000 }],
    ["Brazil", { flag: "historical-flags/brazil-1960.svg", noFlag: true, continent: "South America", noFlagReason: "No flag shown — Brazil has flown the republican flag since 1889, but its star field was redrawn each time states were added, so today's 27-star version is not the one that flew at this date, and no period-accurate image is bundled.", note: "United States of Brazil in the year Brasília became its capital. The republican flag dates from 1889.", population: 70_000_000 }],
    ["Greece", { modernName: "Greece", continent: "Europe", note: "Kingdom of Greece — independent Balkan state, member of NATO since 1952. The blue-and-white cross flag with nine stripes has been the national flag since 1828.", population: 8_500_000 }],
  ])],

  ["ad1994", new Map<string, PolityInfo>([
    ["Venezuela", { flag: "historical-flags/venezuela-1930.svg", continent: "South America", note: "Venezuela. Still the seven-star flag — the eighth star was added on 12 March 2006." }],
    ["Oman", { flag: "historical-flags/oman-1970.svg", continent: "Western Asia", note: "Sultanate of Oman under Qaboos bin Said — the flag he introduced in 1970; its proportions were fixed in 1995.", population: 2_000_000 }],
    ["Syria", { flag: "historical-flags/syria-1980.svg", continent: "Western Asia", note: "Syria under Hafez al-Assad — the two-star flag of the former United Arab Republic, readopted in 1980.", population: 14_000_000 }],
    ["Turkish Cypriot-administered area", { flag: "flags/trnc.svg", continent: "Eastern Mediterranean", note: "Northern Cyprus — self-declared in 1983 after the 1974 division of the island, and recognised only by Türkiye.", population: 200_000 }],
    // AUDIT 2026-08 (goal 3): every one of these countries has REDESIGNED its flag since
    // 1994, so the adoption-year gate refused the modern one and the card came up blank.
    // Each now carries the flag that actually flew in 1994.
    ["Ethiopia", { flag: "historical-flags/ethiopia-1991.svg", continent: "East Africa", note: "Ethiopia under the transitional government after the Derg's fall in 1991; the blue disc emblem was added to the flag in 1996.", population: 55_000_000 }],
    ["Myanmar", { flag: "historical-flags/myanmar-1974.svg", continent: "Southeast Asia", note: "Myanmar under the SLORC military junta, which renamed the country from Burma in 1989. This flag flew until 2010.", population: 44_000_000 }],
    ["Afghanistan", { flag: "historical-flags/afghanistan-1992.svg", continent: "Central Asia", note: "The Islamic State of Afghanistan — mujahideen factions fighting for Kabul; the Taliban took the city in 1996.", population: 17_000_000 }],
    ["Iraq", { flag: "historical-flags/iraq-1991.svg", continent: "Western Asia", note: "Iraq under sanctions after the Gulf War; the takbir was added to the flag in 1991.", population: 19_000_000 }],
    ["Belarus", { flag: "historical-flags/belarus-1991.svg", continent: "Eastern Europe", note: "Belarus three years after independence — the historic white-red-white flag flew until a 1995 referendum restored a Soviet-derived design.", population: 10_200_000 }],
    ["Eritrea", { flag: "historical-flags/eritrea-1993.svg", continent: "East Africa", note: "Eritrea in its first year of independence, won from Ethiopia in 1993 after a thirty-year war.", population: 3_200_000 }],
    ["Serbia", { flag: "historical-flags/serbia-montenegro.svg", continent: "Southeast Europe", note: "Serbia within the Federal Republic of Yugoslavia, under UN sanctions during the Bosnian war.", population: 7_800_000 }],
    ["Montenegro", { flag: "historical-flags/montenegro-1993.svg", continent: "Southeast Europe", note: "Montenegro, the smaller republic of the Federal Republic of Yugoslavia; it became independent in 2006.", population: 620_000 }],
    ["Georgia", { flag: "historical-flags/georgia-1990.svg", continent: "Western Asia", note: "Georgia three years after independence, in civil war and having lost control of Abkhazia. The five-cross flag came in 2004.", population: 5_400_000 }],
    ["Bosnia and Herzegovina", { flag: "historical-flags/bosnia-1992.svg", continent: "Southeast Europe", note: "Bosnia and Herzegovina in the third year of the war; this fleur-de-lis flag was replaced in 1998 by the neutral design.", population: 3_700_000 }],
    ["Lesotho", { flag: "historical-flags/lesotho-1987.svg", continent: "Southern Africa", note: "Lesotho, returned to civilian rule in 1993 after two decades of military and one-party government.", population: 1_800_000 }],
    ["Rwanda", { flag: "historical-flags/rwanda-1962.svg", continent: "East Africa", note: "Rwanda in the year of the genocide. The R was dropped from the flag in 2001, when the country adopted an entirely new design.", population: 5_500_000 }],
    ["Republic of Macedonia", { flag: "historical-flags/macedonia-1992.svg", continent: "Southeast Europe", note: "The Republic of Macedonia, independent since 1991 and admitted to the UN in 1993 under a provisional name. Its Vergina Sun flag was replaced in 1995.", population: 2_000_000 }],
    ["Mauritania", { flag: "historical-flags/mauritania-1959.svg", continent: "West Africa", note: "Mauritania — the green flag with the gold crescent and star, in use from 1959 until red bands were added in 2017.", population: 2_300_000 }],
    // AUDIT 2026-08 (goal 3): the global Spain entry's 1785 ensign was still being shown on the
    // 1994 map. The flag of 1994 is the present one, with the 1981 arms.
    ["Spain", { modernName: "Spain", continent: "Western Europe", note: "Kingdom of Spain — a democracy since 1978 and in the European Community from 1986; the present flag carries the arms adopted in 1981.", population: 39_300_000 }],
    ["Japan", { flag: "historical-flags/japan-1870.svg", continent: "East Asia", note: "Japan five years before the 1999 flag law, which set today's two-by-three proportions and brighter crimson. Until then the Hinomaru kept the 1870 Meiji form shown here.", population: 125_000_000 }],
    // Taiwan flew (and flies) the Republic of China's blue-sky/white-sun flag —
    // the same file already bundled for the 1945 map. Without an entry the polity
    // fell through to the no-flag branch, because "Taiwan" is not in the modern
    // UN-member country list the name-match fallback searches.
    ["Taiwan", { flag: "historical-flags/roc.png", continent: "East Asia", note: "Taiwan — governed by the Republic of China, which held its first direct presidential election two years later, in 1996. The blue-sky/white-sun flag has flown since 1928.", population: 21_000_000 }],
    // Without this the era fell back to the era-agnostic registry entry, which
    // describes the OTTOMAN empire and carries its population — for a 1994 map.
    ["Turkey", { modernName: "Türkiye", continent: "Western Asia", note: "Republic of Türkiye — still called Turkey internationally in 1994; it asked the UN to use the Turkish name in 2022. Its red flag with the white crescent and star dates from 1844.", population: 60_000_000 }],
    ["Philippines", { modernName: "Philippines", continent: "Southeast Asia", note: "Republic of the Philippines — the white sun and three stars flag on blue and red has been the national flag since 1898.", population: 68_000_000 }],
    ["Croatia", { modernName: "Croatia", continent: "Southern Europe", note: "Republic of Croatia — independent since 1991 following the breakup of Yugoslavia. The red-white-blue checkerboard with crown shield has been the national flag since independence.", population: 4_600_000 }],
    ["Slovenia", { modernName: "Slovenia", continent: "Central Europe", note: "Republic of Slovenia — independent since 1991. The white-blue-red tricolour with the national coat of arms (Mount Triglav) has been the flag since independence.", population: 2_000_000 }],
    ["Czech Republic", { modernName: "Czechia", continent: "Central Europe", note: "Czech Republic — officially independent nation since 1993 after the peaceful split of Czechoslovakia. The white-red-blue flag with the silver lion and dual tails is the national emblem.", population: 10_300_000 }],
    ["Slovakia", { modernName: "Slovakia", continent: "Central Europe", note: "Slovak Republic — independent since 1993 after the split from Czechoslovakia. The white-blue-red tricolour with the national shield (double cross with crowns) is the flag.", population: 5_400_000 }],
    ["North Macedonia", { modernName: "North Macedonia", continent: "Southern Europe", note: "Republic of North Macedonia — independent since 1991, formerly known as the \"Republic of Macedonia\" within Yugoslavia. The red flag with the golden sun of Vergina has been the national flag.", population: 2_100_000 }],
    ["Rapa Nui", { continent: "Oceania", note: "Easter Island (Rapa Nui) — part of Chile. The flag of Rapa Nui reflects its indigenous Polynesian heritage with the tangata manu birdman motif.", population: 4_000 }],
    ["Montserrat", { continent: "North America", note: "Montserrat — a British Overseas Territory in the Caribbean. The flag features the heraldic harp and cross.", population: 4_000 }],
  ])],
]);

/**
 * Display-name corrections for misspelled / mis-encoded dataset NAMEs.
 *
 * The historical-basemaps GeoJSONs are the app's only source of polity names, and
 * they are shown to the user verbatim — so upstream's typos ship as UI text:
 * "Kingfom of Italy", "Anglo-Egyption Sudan", "Scottland", "Fezzan (Frech Lybia)".
 * This table maps the dataset key to what should be RENDERED. It never changes the
 * key: every lookup (registry, aliases, era overrides, selection matching, the
 * per-era name set from the GeoJSON) still uses the verbatim NAME, so a correction
 * here can never break resolution — see `polityDisplayName`.
 *
 * Only obvious misspellings, mis-encodings and expansions of an abbreviation the
 * dataset itself uses are corrected. A name that is merely an older or foreign
 * form of a modern name (Persia, Siam, Abyssinia, Ceylon) is period-correct and
 * must be left alone — this is a spell-check, not a renaming layer.
 */
export const DISPLAY_NAME_FIXES: ReadonlyMap<string, string> = new Map([
  // Straight misspellings
  ["Kingfom of Italy", "Kingdom of Italy"],
  ["Anglo-Egyption Sudan", "Anglo-Egyptian Sudan"],
  ["Kongldom of Hawaii", "Kingdom of Hawaii"],
  ["Scottland", "Scotland"],
  ["Castille", "Castile"],
  ["Poland-Llituania", "Poland-Lithuania"],
  ["Khoiasan", "Khoisan"],
  ["Eastern North Amercian hunter-gatherers", "Eastern North American hunter-gatherers"],
  ["Sultinate of Zanzibar", "Sultanate of Zanzibar"],
  ["Silia", "Silla"],
  // Mis-encoded characters (the source file lost the diacritic)
  ["M?ori", "Māori"],
  ["Byelarus", "Belarus"],
  ["North American Pacifi foraging, hunting and fishing peoples", "North American Pacific foraging, hunting and fishing peoples"],
  ["Mesoamerican hunter-gatherers and maïze farmers", "Mesoamerican hunter-gatherers and maize farmers"],
  ["Plateau fichers and hunter gatherers", "Plateau fishers and hunter-gatherers"],
  ["Turkish Cypriot-administered area", "Northern Cyprus"],
  ["Monte Alb?n", "Monte Albán"],
  // The 323 BC file lost the same two diacritics to U+FFFD rather than "?".
  ["Teotihuac\uFFFDn", "Teotihuacán"],
  ["Monte Alb\uFFFDn", "Monte Albán"],
  ["Teotihuacàn", "Teotihuacán"],
  // "Dutch Guinea" is upstream's misspelling of Dutch NEW Guinea — the western half
  // of the island of New Guinea, Dutch until 1962. It is NOT Dutch Guiana: the
  // feature's centroid is 135.5°E / 4.1°S (Papua), and the 1945 file already carries
  // Suriname separately at 55.9°W. An earlier fix here read it as Dutch Guiana and
  // relabelled a Pacific colony as a South American one.
  // https://en.wikipedia.org/wiki/Netherlands_New_Guinea
  ["Dutch Guinea", "Netherlands New Guinea"],
  // Libya's three provinces under British / French military administration.
  ["Cyraneica (UK Lybia)", "Cyrenaica (British Libya)"],
  ["Tripolitana (UK Lybia)", "Tripolitania (British Libya)"],
  ["Fezzan (Frech Lybia)", "Fezzan (French Libya)"],
  // Transliteration variants of the same names used elsewhere in the dataset.
  ["Quazaq Khanate", "Kazakh Khanate"],
  ["Bantou", "Bantu"],
  ["Papou", "Papuan peoples"],
  ["Gurjara Pratihara", "Gurjara-Pratihara"],
  ["Austria Hungary", "Austria-Hungary"],
  ["CochimÃ­", "Cochimí"],

  /* --- AUDIT 2026-08-07, goal-2 name pass: CASE drift ---------------------------
   * The dataset spells the same descriptive polity differently in different eras, and
   * the label is the selection key the panel, the flag grid and the cross-era selection
   * persistence all match on — so "Chinese Warlords" in 1920 and "Chinese warlords" in
   * 1938 read as two different entities. Normalised to the lower-case form the dataset's
   * other descriptive labels use ("Australian aboriginal hunter-gatherers").
   */
  ["Saharan Pastoral Nomads", "Saharan pastoral nomads"],
  ["Hindu Kingdoms", "Hindu kingdoms"],
  ["Rajput Kingdoms", "Rajput kingdoms"],
  ["Baltic Tribes", "Baltic tribes"],
  ["Chinese Warlords", "Chinese warlords"],

  /* --- AUDIT 2026-08-07, goal-2 name pass: dataset ruler TAGS ------------------
   * Upstream appends the ruling power to the NAME — "Western Australia (UK)",
   * "Algeria (France)", "Angola (Portugal)". That tag is not part of the polity's name,
   * and the panel already has a "Ruled by" row that says the same thing properly, so the
   * tag was pure duplication in the one place the user reads as the polity's identity.
   * Stripped here; the ruler still reaches the panel through SUBJECTO / ERA_RULER.
   * Where the tagged form has an accepted period name of its own (Italian Libya, Italian
   * Eritrea, Italian Ethiopia) that name is used instead, in POLITY_NAME_FOR_ERA.
   */
  ["Western Australia (UK)", "Western Australia"],
  ["Queensland (UK)", "Queensland"],
  ["Northern Territory (UK)", "Northern Territory"],
  ["South Australia (UK)", "South Australia"],
  ["New South Wales (UK)", "New South Wales"],
  ["Victoria (UK)", "Victoria"],
  ["Algeria (FR)", "Algeria"],
  ["Algeria (France)", "Algeria"],
  ["Senegal (FR)", "Senegal"],
  ["Madagascar (France)", "Madagascar"],
  ["Morocco (France)", "Morocco"],
  ["Syria (France)", "Syria"],
  ["Angola (Portugal)", "Angola"],
  ["Mozambique (Portugal)", "Mozambique"],
  ["Guinea-Bissau (Portugal)", "Portuguese Guinea"],
  ["Cuba (Spain)", "Cuba"],
  ["Hispaniola (Spain)", "Hispaniola"],
  ["Sakhalin (RU)", "Sakhalin"],
  // Harar, the walled city and emirate of eastern Ethiopia. Egypt occupied it 1875–85;
  // Menelik II took it for Ethiopia in 1887, so the "(Egypt)" tag is wrong for 1900 as
  // well as being a tag. https://en.wikipedia.org/wiki/Harar
  ["Harer (Egypt)", "Harar"],
  // The dataset hyphenates the viceroyalties inconsistently ("Vice Royalty", "Vice-Royalty");
  // the standard English form has neither space nor hyphen.
  ["Vice Royalty of Peru", "Viceroyalty of Peru"],
  ["Vice-Royalty of Peru", "Viceroyalty of Peru"],
  ["Vice-Royalty of New Spain", "Viceroyalty of New Spain"],
  ["Vice-Royalty of New Granada", "Viceroyalty of New Granada"],
]);

/**
 * Era-specific polity name remappings for historical accuracy.
 *
 * When a GeoJSON feature's NAME appears as an independent nation in a map, but was
 * not yet independent at that historical date, this table remaps the display name to
 * what the polity was actually called. The feature's NAME and geometry stay unchanged
 * (they are still used for lookups, registry matching, etc.); only the rendered label
 * to the user is remapped. Examples:
 *   - Namibia was "South West Africa" (German then SA mandate) until 1990
 *   - Zimbabwe was "Southern Rhodesia" until 1980
 *   - Uganda was not independent until 1962 (appears in 1960 map as though it were)
 *
 * The mapping is ERA → POLITY_NAME → DISPLAY_NAME. A polity without an era entry
 * falls through to DISPLAY_NAME_FIXES, then to the raw NAME.
 */
const POLITY_NAME_FOR_ERA: ReadonlyMap<Era["id"], ReadonlyMap<string, string>> = new Map([
  // Medieval West Africa: the dataset's "Ghana" in these eras is the Wagadou/Ghana
  // Empire (c. 300–1200), an entirely different polity from the modern state that took
  // its name at independence in 1957.
  ["bc323", new Map<string, string>([
    // "Empire of Alexander" is a description, not the polity's name; the literature calls
    // it the Macedonian Empire (Argead dynasty). https://en.wikipedia.org/wiki/Macedonia_(ancient_kingdom)
    ["Empire of Alexander", "Macedonian Empire"],
    // The Orontid satrapy, not the 1918 republic — see POLITY_EXISTENCE["Armenia"].
    ["Armenia", "Satrapy of Armenia"],
  ])],
  ["ad100", new Map<string, string>([
    ["Armenia", "Kingdom of Armenia"],     // the Arsacid kingdom, 12–428 AD
  ])],
  ["ad800", new Map<string, string>([
    // Cyprus was neither independent nor solely Byzantine in 800: from 688 to 965 the island
    // was a condominium, its revenues split between Byzantium and the caliphate.
    // https://en.wikipedia.org/wiki/History_of_Cyprus
    ["Cyprus", "Cyprus (Byzantine–Arab condominium)"],["Ghana", "Ghana Empire"]])],
  ["ad1000", new Map<string, string>([
    ["Cyprus", "Byzantine Cyprus"],   // reconquered outright by Nikephoros II in 965
    // The upper-Niger polygon predates both the Sosso Empire (c. 1140) and the Mali Empire
    // (c. 1235); at this date Manden was a group of chiefdoms in the Ghana Empire's orbit.
    // https://en.wikipedia.org/wiki/Mali_Empire
    ["Mali", "Manden chiefdoms"],
    // The highland polygon (centroid 46.8°E, 19.4°S) is Imerina, but the Merina kingdom
    // dates from c. 1540 — before that the highlands held separate chiefdoms.
    // https://en.wikipedia.org/wiki/Merina_Kingdom
    ["Madagascar", "Malagasy chiefdoms"],
    ["Ghana", "Ghana Empire"],
    ["Armenia", "Bagratid Armenia"],       // the Bagratuni kingdom, 885–1045
  ])],
  ["ad1200", new Map<string, string>([
    // The Sosso Empire (Kaniaga) ruled Manden from c. 1140 until Sundiata's victory at
    // Kirina in c. 1235 founded the Mali Empire. https://en.wikipedia.org/wiki/Mali_Empire
    ["Mali", "Sosso Empire"],
    ["Madagascar", "Malagasy chiefdoms"],
    // Nepal was unified by Prithvi Narayan Shah in 1768–69. In 1200 the Kathmandu valley
    // was ruled by the Malla dynasty. https://en.wikipedia.org/wiki/Malla_(Nepal)
    ["Nepal", "Malla kingdoms"],
    ["Ghana", "Ghana Empire"],
    ["Armenia", "Zakarid Armenia"],        // Greater Armenia under the Zakarids, 1201–1360
  ])],
  // The Iberian Union (1580–1640): Philip II of Spain became Philip I of Portugal in
  // 1580, so in 1600 both crowns were held by one monarch. The dataset keeps them as two
  // features — which is right, because the Statute of Tomar (1581) left Portugal its own
  // laws, Cortes, currency and colonial administration — but at this date the polity a
  // user is looking at IS the union, so both display under that name and highlight
  // together. Neither polygon is touched.
  // The Kingdom of Benin (Edo, in modern southern Nigeria) is a wholly different
  // polity from the modern West African state that took the name in 1975 — exactly
  // the Ghana Empire situation above. Saying so on the label keeps the two apart,
  // and lets POLITY_EXISTENCE hold a window for the modern state.
  // https://en.wikipedia.org/wiki/Kingdom_of_Benin
  ["ad1300", new Map<string, string>([
    ["Madagascar", "Malagasy chiefdoms"],
    // The Mali Empire, not the modern republic that took the name in 1960 — the same
    // distinction the Ghana Empire entries above draw.
    // https://en.wikipedia.org/wiki/Mali_Empire
    ["Mali", "Mali Empire"],["Benin", "Kingdom of Benin"]])],
  ["ad1500", new Map<string, string>([
    ["Madagascar", "Malagasy chiefdoms"],
    ["Mali", "Mali Empire"],
    // The Kingdom of Kongo (c. 1390–1914), not the modern Congo republics.
    // https://en.wikipedia.org/wiki/Kingdom_of_Kongo
    ["Congo", "Kingdom of Kongo"],
    // Lan Xang, the Lao kingdom of 1353–1707; "Laos" is the French colonial-era name.
    // https://en.wikipedia.org/wiki/Lan_Xang
    ["Laos", "Lan Xang"],
    ["Benin", "Kingdom of Benin"],
    ["Papua New Guinea", "New Guinea"],      // the name dates from 1971; before that, the island
  ])],
  ["ad1600", new Map<string, string>([
    // Imerina, the Merina kingdom of the central highlands from c. 1540 — the same polity the
    // 1880 and 1900 maps label Imerina. https://en.wikipedia.org/wiki/Merina_Kingdom
    ["Madagascar", "Imerina"],
    // The Tsardom of Russia, proclaimed by Ivan IV in 1547. "Muscovy" is the older English
    // exonym for it, not the state's own name. https://en.wikipedia.org/wiki/Tsardom_of_Russia
    ["Tsardom of Muscovy", "Tsardom of Russia"],
    ["Congo", "Kingdom of Kongo"],
    ["Laos", "Lan Xang"],
    ["Spain", "Iberian Union"],
    ["Portugal", "Iberian Union"],
    ["Benin", "Kingdom of Benin"],
  ])],
  ["ad1700", new Map<string, string>([
    ["Madagascar", "Imerina"],
    // The Mali Empire collapsed c. 1610 and the Keita retreated to Kangaba, ruling as
    // provincial chiefs — which is what this polygon is by 1700.
    // https://en.wikipedia.org/wiki/Mali_Empire
    ["Mali", "Kangaba"],
    // The Baymen's logwood camps in the Bay of Honduras — Britain won cutting rights by
    // treaty in 1763 and the colony was named British Honduras only in 1862.
    // https://en.wikipedia.org/wiki/British_Honduras
    ["Belize", "Bay of Honduras settlements"],
    ["Tsardom of Muscovy", "Tsardom of Russia"],
    // "Manchu Empire" is a dated English exonym. The dynasty called itself the Great Qing,
    // and the literature calls the state the Qing Empire.
    // https://en.wikipedia.org/wiki/Qing_dynasty
    ["Manchu Empire", "Qing Empire"],
    ["Congo", "Kingdom of Kongo"],
    ["Benin", "Kingdom of Benin"],
    // The Austrian Empire was proclaimed in 1804; in 1700 these were the Habsburg
    // hereditary lands, held by the Holy Roman Emperor.
    ["Austrian Empire", "Habsburg Monarchy"],
  ])],
  ["ad1815", new Map<string, string>([
    ["Manchu Empire", "Qing Empire"],
    ["Congo", "Kingdom of Kongo"],
    // There was no polity called Canada in 1815. Britain's remaining North American
    // colonies — Upper and Lower Canada, Nova Scotia, New Brunswick, Prince Edward Island,
    // Newfoundland and Rupert's Land — were collectively British North America; "Canada"
    // first named a single polity in 1841. https://en.wikipedia.org/wiki/British_North_America
    ["Canada", "British North America"],
    // The 1815 file already carries "United Kingdom of Great Britain and Ireland" for the
    // metropole and "British North America" for Canada; its bare "United Kingdom" feature
    // is the 40 Caribbean islands and Central American coastal holdings, from Belize and
    // the Mosquito Coast through Jamaica and the Bahamas to the Virgin Islands. Shown
    // under its own name it looked like a second, misplaced Britain — filed under Europe
    // while all of its land is in the Americas.
    // https://en.wikipedia.org/wiki/British_West_Indies
    ["United Kingdom", "British West Indies"],
    // The Durrani Empire (1747–1823). "Afghanistan" as the state's name belongs to the
    // Barakzai emirate that followed. https://en.wikipedia.org/wiki/Durrani_Empire
    ["Afghanistan", "Durrani Empire"],
    // Ottoman Egypt under Muhammad Ali — an autonomous eyalet, not an independent Egypt.
    // https://en.wikipedia.org/wiki/Egypt_Eyalet
    ["Egypt", "Egypt Eyalet"],
    // "Turan" is a Persian literary term for the lands beyond the Oxus, not a polity. The
    // territory held the khanates of Khiva, Bukhara and Kokand.
    // https://en.wikipedia.org/wiki/Turan
    ["Turan", "central Asian khanates"],
    ["Rwanda", "Kingdom of Rwanda"],       // the precolonial monarchy; the republic dates from 1962
    ["Burundi", "Kingdom of Burundi"],     // the precolonial monarchy (Urundi); the modern state 1962
    ["Antigua and Barbuda", "Antigua"],    // the British colony; the state dates from 1981
    ["Saint Kitts and Nevis", "Saint Christopher and Nevis"], // separate British colonies until 1882
    ["Saint Vincent and the Grenadines", "Saint Vincent"],    // the colony; the state dates from 1979
    // No Somali state existed in 1815 — the registry's own note calls this a patchwork
    // of sultanates. "Somalia" is the 1960 union of the British and Italian territories.
    ["Somalia", "Somali sultanates"],
  ])],
  ["ad1880", new Map<string, string>([
    ["Manchu Empire", "Qing Empire"],
    ["Rwanda", "Kingdom of Rwanda"],
    ["Burundi", "Kingdom of Burundi"],
    ["Antigua and Barbuda", "Antigua"],
    ["Saint Kitts and Nevis", "Saint Christopher and Nevis"],
    ["Benin", "Kingdom of Benin"],
    ["Belize", "British Honduras"],          // the colony was renamed Belize only in 1973
    ["Papua New Guinea", "New Guinea"],      // no colonial claim yet; PNG is a 1971 name
  ])],
  ["ad1900", new Map<string, string>([
    ["Manchu Empire", "Qing Empire"],
    ["Kingdom of Hawaii", "Territory of Hawaii"], // overthrown 1893, annexed 1898, a US territory from 30 April 1900
    ["Rwanda", "Kingdom of Rwanda"],
    ["Burundi", "Kingdom of Burundi"],
    ["Antigua and Barbuda", "Antigua"],
    ["Saint Kitts and Nevis", "Saint Christopher-Nevis-Anguilla"], // the colony, 1882–1983
    ["India", "British India"],              // Republic of India dates from the 1947 partition
    ["Kingdom of Brazil", "Brazil"],         // the empire fell in 1889; 1900 is the Old Republic
    ["Benin", "Kingdom of Benin"],
    ["Belize", "British Honduras"],          // renamed Belize 1 June 1973
    ["Papua New Guinea", "New Guinea"],      // British New Guinea + German New Guinea in 1900
  ])],
  ["ad1914", new Map<string, string>([
    // The Qing fell in February 1912, so the 1914 map's "Manchu Empire" is the wrong polity
    // as well as a dated exonym: this territory was the Republic of China, which is what the
    // era's own entry already describes and flies the five-coloured flag for.
    // https://en.wikipedia.org/wiki/Xinhai_Revolution
    ["Manchu Empire", "Republic of China"],
    ["Armenia", "Russian Armenia"],        // Russian rule 1828–1918; the First Republic came in 1918
    ["Azerbaijan", "Russian Transcaucasia"], // the Baku and Elisabethpol Governorates
    ["Georgia", "Russian Georgia"],        // annexed by Russia in 1801; the republic came in 1918
    ["Antigua and Barbuda", "Antigua"],
    ["Saint Kitts and Nevis", "Saint Christopher-Nevis-Anguilla"],
    ["Saint Vincent and the Grenadines", "Saint Vincent"],
    ["Eritrea", "Italian Eritrea"],          // Italian colony 1890–1947; independence 1993
    ["Rhodesia", "Southern Rhodesia"],       // "Rhodesia" is the 1965–79 UDI state
    ["Belize", "British Honduras"],          // renamed Belize 1973
    ["Botswana", "Bechuanaland"],            // Bechuanaland Protectorate; Botswana 1966
    ["Lesotho", "Basutoland"],               // Basutoland; renamed Lesotho at independence 1966
    ["Malawi", "Nyasaland"],                 // Nyasaland; renamed Malawi at independence 1964
    ["Guyana", "British Guiana"],            // renamed Guyana at independence 1966
    ["Equatorial Guinea", "Spanish Guinea"], // Spanish Guinea; renamed at independence 1968
    ["Djibouti", "French Somaliland"],       // French Somaliland → Afars and Issas 1967 → Djibouti 1977
    ["Samoa", "German Samoa"],               // German Samoa 1900–1914; NZ mandate from 1920
    ["Papua New Guinea", "New Guinea"],      // Territory of Papua + German New Guinea
  ])],
  ["ad1920", new Map<string, string>([
    ["Rwanda (Belgium)", "Ruanda-Urundi"],
    // Italian Libya, the accepted name for the unified colony from 1912.
    // https://en.wikipedia.org/wiki/Italian_Libya
    ["Libya (IT)", "Italian Libya"],
    ["Iraq", "Mandatory Mesopotamia"],     // the Kingdom of Iraq was founded in August 1921
    ["Rwanda", "Ruanda-Urundi"],           // Belgian mandate from 1922, one territory until 1962
    ["Burundi", "Ruanda-Urundi"],
    ["Antigua and Barbuda", "Antigua"],
    ["Saint Kitts and Nevis", "Saint Christopher-Nevis-Anguilla"],
    ["Saint Vincent and the Grenadines", "Saint Vincent"],
    ["Iran", "Persia"],                      // Persia asked to be called Iran only in 1935
    ["Ghana", "Gold Coast"],                 // Gold Coast until independence in 1957
    ["Malaysia", "British Malaya"],          // Malaysia was formed in 1963
    ["Eritrea", "Italian Eritrea"],          // Italian colony 1890–1947
    ["Zimbabwe", "Southern Rhodesia"],       // independence, and the name, came in 1980
    ["Zaire (Belgium)", "Belgian Congo"],    // "Zaire" was the name only from 1971 to 1997
    ["Belize", "British Honduras"],          // renamed Belize 1973
    ["Botswana", "Bechuanaland"],            // Botswana 1966
    ["Lesotho", "Basutoland"],               // Lesotho 1966
    ["Malawi", "Nyasaland"],                 // Malawi 1964
    ["Zambia", "Northern Rhodesia"],         // Zambia 1964
    ["Guyana", "British Guiana"],            // Guyana 1966
    ["Equatorial Guinea", "Spanish Guinea"], // Equatorial Guinea 1968
    ["Guinea-Bissau", "Portuguese Guinea"],  // Guinea-Bissau 1973
    ["Tanzania, United Republic of", "Tanganyika"], // Tanganyika + Zanzibar = Tanzania, 1964
    ["Samoa", "Western Samoa"],              // Western Samoa until 1997
    ["Papua New Guinea", "New Guinea"],      // Territory of Papua + New Guinea mandate
  ])],
  ["ad1938", new Map<string, string>([
    ["Rwanda (Belgium)", "Ruanda-Urundi"],
    // Ethiopia was annexed into Italian East Africa in 1936; the occupied territory is
    // called Italian Ethiopia. https://en.wikipedia.org/wiki/Italian_East_Africa
    ["Ethiopia (Italy)", "Italian Ethiopia"],
    ["Eritrea (Italy)", "Italian Eritrea"],
    ["Jordan", "Transjordan"],             // the Emirate of Transjordan; renamed Jordan only in 1949
    ["Rwanda", "Ruanda-Urundi"],
    ["Burundi", "Ruanda-Urundi"],
    ["Antigua and Barbuda", "Antigua"],
    ["Saint Kitts and Nevis", "Saint Christopher-Nevis-Anguilla"],
    ["Saint Vincent and the Grenadines", "Saint Vincent"],
    ["India", "British India"],              // partition 1947
    ["Malaysia", "British Malaya"],          // Malaysia formed 1963
    ["Belize", "British Honduras"],          // renamed Belize 1973
    ["Botswana", "Bechuanaland"],            // Botswana 1966
    ["Lesotho", "Basutoland"],               // Lesotho 1966
    ["Malawi", "Nyasaland"],                 // Malawi 1964
    ["Guyana", "British Guiana"],            // Guyana 1966
    ["Equatorial Guinea", "Spanish Guinea"], // Equatorial Guinea 1968
    ["Guinea-Bissau", "Portuguese Guinea"],  // Guinea-Bissau 1973
    ["Tanzania, United Republic of", "Tanganyika"], // Tanzania 1964
    ["Congo (France)", "Middle Congo"],      // Moyen-Congo; Republic of the Congo from 1958
    ["Yemen (UK)", "Aden Protectorate"],     // the British-protected south, not the Yemeni imamate
    ["Samoa", "Western Samoa"],              // Western Samoa until 1997
  ])],
  ["ad1945", new Map<string, string>([
    /* --- AUDIT 2026-08-07, goal-2 name pass: the OCCUPATION ZONES ---------------
     * These are the one case where the dataset's parenthetical is not a redundant ruler
     * tag but the polity's actual 1945 identity, so stripping it would leave four
     * identically-named "Germany" polygons and two "Korea"s. Renamed to the accepted
     * names instead. https://en.wikipedia.org/wiki/Allied-occupied_Germany
     */
    ["Germany (USA)", "American occupation zone"],
    ["Germany (UK)", "British occupation zone"],
    ["Germany (France)", "French occupation zone"],
    // https://en.wikipedia.org/wiki/Division_of_Korea — the peninsula was split at the
    // 38th parallel in August 1945; both zones ended with the 1948 republics.
    ["Korea (USSR)", "Soviet occupation zone of Korea"],
    ["Korea (USA)", "American occupation zone of Korea"],
    // https://en.wikipedia.org/wiki/Occupation_of_Japan — 1945–1952, under SCAP.
    ["Japan (USA)", "Allied-occupied Japan"],
    // Ordinary ruler tags, stripped: the "Ruled by" row already carries the power.
    ["Jamaica (UK)", "Jamaica"],
    ["Martinique (France)", "Martinique"],
    ["Jordan", "Transjordan"],             // renamed the Hashemite Kingdom of Jordan in 1949
    ["Rwanda", "Ruanda-Urundi"],
    ["Burundi", "Ruanda-Urundi"],
    ["Antigua and Barbuda", "Antigua"],
    ["Saint Kitts and Nevis", "Saint Christopher-Nevis-Anguilla"],
    ["Saint Vincent and the Grenadines", "Saint Vincent"],
    // After WWII, the 1945 file shows several African territories as independent
    // when they were not yet. These were mandates, protectorates, or colonial territories.
    ["Namibia", "South West Africa"],        // German mandate → SA mandate; independence 1990
    ["Zimbabwe", "Southern Rhodesia"],       // British territory; independence 1980
    ["Botswana", "Bechuanaland"],            // British protectorate; independence 1966
    ["Rhodesia", "Southern Rhodesia"],       // "Rhodesia" is the 1965–79 UDI state
    ["Sri Lanka", "Ceylon"],                 // renamed Sri Lanka on becoming a republic in 1972
    ["Zaire", "Belgian Congo"],              // Zaire was the name only from 1971 to 1997
    ["Malaysia", "British Malaya"],          // Malaysia formed 1963
    ["Israel", "Mandatory Palestine"],       // Israel declared 14 May 1948
    ["Eritrea", "Eritrea (British administration)"], // British military administration 1941–52
    // The English name "Türkiye" dates from the 2022 UN request; in 1945 it was Turkey.
    ["Türkiye", "Turkey"],
    ["Burkina Faso", "Upper Volta"],         // Upper Volta; renamed Burkina Faso 4 Aug 1984
    ["Benin", "Dahomey"],                    // French Dahomey; renamed Benin 30 Nov 1975
    ["Mali", "French Sudan"],                // Soudan français; Republic of Mali from Sept 1960
    ["Central African Republic", "Ubangi-Shari"], // Oubangui-Chari; renamed CAR 1 Dec 1958
    ["Djibouti", "French Somaliland"],       // Djibouti is the 1977 name
    ["Somalia", "Italian Somaliland"],       // under British military administration in 1945; Somalia 1960
    ["Western Sahara", "Spanish Sahara"],    // Spanish colony until 1975
    ["United Arab Emirates", "Trucial States"], // the UAE federation dates from 2 Dec 1971
    ["Belize", "British Honduras"],          // renamed Belize 1973
    ["Lesotho", "Basutoland"],               // Lesotho 1966
    ["Guyana", "British Guiana"],            // Guyana 1966
    ["Equatorial Guinea", "Spanish Guinea"], // Equatorial Guinea 1968
    ["Guinea-Bissau (Portugal)", "Portuguese Guinea"], // Guinea-Bissau 1973
    ["Tanzania, United Republic of", "Tanganyika"],    // Tanzania 1964
    ["Congo", "Middle Congo"],               // Moyen-Congo; Republic of the Congo from 1958
    ["Samoa", "Western Samoa"],              // Western Samoa until 1997
    ["Papua New Guinea", "Papua and New Guinea"], // the 1949–1971 territory's own name
  ])],
  ["ad1960", new Map<string, string>([
    ["Rwanda", "Ruanda-Urundi"],           // independent as two states on 1 July 1962
    ["Burundi", "Ruanda-Urundi"],
    ["Antigua and Barbuda", "Antigua"],
    ["Saint Kitts and Nevis", "Saint Christopher-Nevis-Anguilla"],
    ["Saint Vincent and the Grenadines", "Saint Vincent"],
    // The 1960 decolonisation wave. Many territories shown on the map as independent
    // were not yet independent at that exact date; they became independent during 1960+.
    ["Uganda", "Uganda (British protectorate)"],  // Independent 26 Oct 1962
    ["Zambia", "Northern Rhodesia"],              // Independent 24 Oct 1964
    ["Botswana", "Bechuanaland"],                 // Independent 30 Sept 1966
    ["Zimbabwe", "Southern Rhodesia"],            // Independent 1980
    ["Namibia", "South West Africa"],             // Independence 1990
    ["Sri Lanka", "Ceylon"],                      // Renamed Sri Lanka in 1972
    ["Zaire", "Congo-Léopoldville"],              // Named Zaire only 1971–1997
    ["Malaysia", "Federation of Malaya"],         // Malaysia formed 1963
    ["Eritrea", "Eritrea (federated with Ethiopia)"], // Federated 1952; annexed 1962; independent 1993
    ["Türkiye", "Turkey"],                        // the English name changed only in 2022
    ["Burkina Faso", "Upper Volta"],              // Republic of Upper Volta; renamed 1984
    ["Benin", "Dahomey"],                         // Republic of Dahomey; renamed 1975
    ["Western Sahara", "Spanish Sahara"],         // Spanish colony until 1975
    ["United Arab Emirates", "Trucial States"],   // UAE formed 1971
    ["Belize", "British Honduras"],               // renamed Belize 1973
    ["Lesotho", "Basutoland"],                    // Lesotho 1966
    ["Malawi", "Nyasaland"],                      // Malawi 1964
    ["Guyana", "British Guiana"],                 // Guyana 1966
    ["Equatorial Guinea", "Spanish Guinea"],      // Equatorial Guinea 1968
    ["Guinea-Bissau", "Portuguese Guinea"],       // Guinea-Bissau 1973
    ["Tanzania, United Republic of", "Tanganyika"], // Tanzania 1964
    ["Djibouti", "French Somaliland"],            // Djibouti 1977
    ["Samoa", "Western Samoa"],                   // Western Samoa until 1997
    ["Papua New Guinea", "Papua and New Guinea"], // the territory's own 1949–1971 name
  ])],
  ["ad1994", new Map<string, string>([
    ["Samoa", "Western Samoa"],                   // renamed Samoa on 4 July 1997
    ["Macedonia", "Republic of Macedonia"],       // constitutional name until the 2019 Prespa change
  ])],
]);

/**
 * The name to SHOW for a dataset polity — corrected where upstream misspelled it,
 * and remapped for historical accuracy if it was not a state at the given era.
 *
 * Always render through this; never use it as a lookup key. Callers that match a
 * selection, read the registry or compare against the era's GeoJSON name set must
 * keep using the raw dataset NAME.
 */
export function polityDisplayName(name: string, eraId?: Era["id"]): string {
  // First check for era-specific name remapping (statehood corrections)
  if (eraId) {
    const eraNames = POLITY_NAME_FOR_ERA.get(eraId);
    if (eraNames?.has(name)) {
      return eraNames.get(name) ?? name;
    }
  }
  // Then check for typo/encoding corrections
  return DISPLAY_NAME_FIXES.get(name) ?? name;
}

/**
 * Era remaps that change WHICH ENTITY the name refers to, rather than correcting the
 * entity's own name for the period.
 *
 * `POLITY_NAME_FOR_ERA` is keyed by dataset NAME, and the panel renders RULER strings
 * through it too — which is right for a period-name correction, because the ruler is the
 * same state under its proper name of the day ("Austrian Empire" → Habsburg Monarchy in
 * 1700, "Manchu Empire" → Qing Empire, "Austria Hungary" → Austria-Hungary). It is wrong
 * when the dataset NAME means something different from what it says: 1815's "United
 * Kingdom" feature is Britain's CARIBBEAN colonies, while "United Kingdom" as a RULER
 * still means Britain. Remapping both captioned Canada "Ruled by British West Indies".
 */
const ENTITY_CHANGING_NAME_REMAP: ReadonlySet<string> = new Set(["ad1815|United Kingdom"]);

/**
 * Display name for a string used as a RULER (the "Ruled by" row and the "Flew the flag
 * of …" caption) rather than as a polity's own feature name. Applies the era's period-name
 * corrections but never a remap that would rename the ruler into a different entity.
 */
export function rulerDisplayName(name: string, eraId?: Era["id"]): string {
  if (eraId && ENTITY_CHANGING_NAME_REMAP.has(`${eraId}|${name}`)) {
    return DISPLAY_NAME_FIXES.get(name) ?? name;
  }
  return polityDisplayName(name, eraId);
}

/**
 * Look up a polity by NAME, optionally biased by era.
 *
 * Era-specific overrides win over global registry entries; falls back to
 * an empty object so callers can compose with the alias / modern-country
 * lookup paths.
 */
export function polityInfo(name: string, eraId?: Era["id"]): PolityInfo {
  if (eraId) {
    // A polity REMAPPED for this era carries its facts under the name actually shown, and
    // that must win over an entry filed under the raw name — otherwise 1600's Iberian
    // Union would show the note and population of the Spain entry it supersedes.
    const shown = polityDisplayName(name, eraId);
    if (shown !== name) {
      const remapped = ERA_OVERRIDES.get(eraId)?.get(shown) ?? POLITY_REGISTRY.get(shown);
      if (remapped) return remapped;
    }
    const eraEntry = ERA_OVERRIDES.get(eraId)?.get(name);
    if (eraEntry) return eraEntry;
  }
  return POLITY_REGISTRY.get(name) ?? {};
}

/**
 * The region label a polity is shown and grouped under — ALWAYS a fact about where the
 * polity's own land is, never about who ruled it.
 *
 * Resolution order:
 *   1. the curated `continent` on the entry for the name actually SHOWN this era, then
 *      the entry for the raw dataset NAME (era override before global registry) — these
 *      are the fine-grained labels the detail panel's Region row renders
 *      ("Eurasian Steppe", "Mesoamerica", "Levant");
 *   2. failing that, the continent measured from the polity's OWN polygons, baked into
 *      `src/data/polityContinents.ts` by scripts/build-polity-continents.mjs.
 *
 * What it deliberately does NOT do is fall back to the continent of whichever country the
 * polity borrows a FLAG from. That fallback shipped, and it filed every 1914 colony that
 * flew its ruler's flag under the ruler's continent: Togoland, Kamerun, German South-West
 * Africa, German East Africa, Anglo-Egyptian Sudan, British East Africa, Southern
 * Rhodesia and Spanish Morocco all appeared under EUROPE. A flag is borrowed; a continent
 * is not. See CLAUDE.md, "A polity's continent is where its land is".
 *
 * Step 1 walking the SHOWN name and then the raw NAME also stops an era remap from losing
 * the region: "Samoa" → "Western Samoa" and "Kingdom of Hawaii" → "Territory of Hawaii"
 * have no entry of their own under the remapped name, and used to resolve to nothing.
 */
export function polityContinent(name: string, eraId?: Era["id"]): string | undefined {
  const curated = (key: string): string | undefined =>
    (eraId ? ERA_OVERRIDES.get(eraId)?.get(key)?.continent : undefined) ??
    POLITY_REGISTRY.get(key)?.continent;

  if (eraId) {
    const shown = polityDisplayName(name, eraId);
    if (shown !== name) {
      const fromShown = curated(shown);
      if (fromShown) return fromShown;
    }
  }
  const fromRaw = curated(name);
  if (fromRaw) return fromRaw;

  return (
    (eraId ? POLITY_CONTINENT_BY_ERA.get(`${eraId}|${name}`) : undefined) ??
    POLITY_CONTINENT.get(name)
  );
}

/**
 * Is this polity's `noFlag` a deliberate statement about THIS era?
 *
 * `noFlag` in the global registry is written for the entity's OLDEST appearance —
 * "France" is the medieval Capetian kingdom, "Norway" the Viking-age one — and the
 * registry is era-agnostic, so that flag suppression silently followed those names
 * into 1900 and 1914, where the tricolour and the Norwegian cross plainly did fly.
 * Only an entry in ERA_OVERRIDES for the era being asked about is a claim about that
 * era; a global one must not outrank the adoption-year gate, which already refuses
 * anything genuinely out of period.
 *
 * Pre-1880 eras keep trusting the global entry: they have no name-match fallback, so
 * there is nothing for it to wrongly suppress.
 */
export function noFlagIsEraSpecific(name: string, eraId: Era["id"]): boolean {
  return ERA_OVERRIDES.get(eraId)?.get(name)?.noFlag === true;
}

/**
 * Dataset SUBJECTO values that are WRONG for the era they appear in.
 *
 * Every feature carries SUBJECTO, the state that governed it, and the panel trusts it
 * for two things: the "Ruled by" row, and letting a colony inherit its ruler's flag.
 * Upstream gets some of them badly wrong, and a wrong ruler is worse than a missing
 * one — it puts a foreign flag on an independent country's card. Keyed `eraId|NAME`,
 * each with the sourced reason it is refused. Same discipline as POLITY_EXISTENCE:
 * we disclose/withhold rather than invent a replacement ruler.
 */
const FALSE_SUBJECTO: ReadonlyMap<string, string> = new Map([
  // Brazil was independent from Portugal in 1822 and a republic from 1889 — the 1900
  // file still records Portugal as its sovereign (and the 1880 file does not).
  ["ad1900|Kingdom of Brazil", "Portugal — Brazil had been independent since 1822"],
  // The USSR was founded in December 1922. In 1920 these three were independent
  // republics (the Red Army took them in 1920–21), so they could not be Soviet subjects.
  ["ad1920|Armenia", "USSR — the union was not founded until December 1922"],
  ["ad1920|Azerbaijan", "USSR — the union was not founded until December 1922"],
  ["ad1920|Georgia", "USSR — the union was not founded until December 1922"],
  // Japan occupied French Indochina from September 1940, two years after this map.
  ["ad1938|Cambodia", "Empire of Japan — Japan occupied French Indochina only from 1940"],
  ["ad1938|Cochin China", "Empire of Japan — Japan occupied French Indochina only from 1940"],
  // Iraq's mandate ended in 1932, when it joined the League of Nations as a sovereign
  // state; Britain kept bases and influence, but not sovereignty.
  ["ad1938|Iraq", "United Kingdom — the mandate ended and Iraq became sovereign in 1932"],
]);

/**
 * The power that GOVERNED a polity at a given era's date, keyed `eraId|NAME` (the raw
 * dataset NAME, which is what the map hands us).
 *
 * WHY: the upstream files record most colonies as their own sovereign — 1960 Bechuanaland
 * is `SUBJECTO: "Botswana"`, 1938 Ceylon is `SUBJECTO: "Ceylon"` — so the ruler layer of
 * the flag resolution never fired for them, and the adoption-year gate then refused the
 * successor state's modern flag (Botswana's dates from 1966). The result was a colony's
 * card with no flag at all, in an era when the Union Jack was flying over it. Measured
 * 2026-08: 23–31 such polities per era from 1914 on.
 *
 * A polity listed here inherits its ruler's ERA-LEGAL flag and the panel captions it
 * ("Flew the flag of the United Kingdom — it had no national flag of its own at this
 * date") plus a "Ruled by" row, which is what the historical-era flag rule requires of an
 * inherited flag. The gate still applies: the ruler's own flag must exist at that date.
 *
 * Keyed per ERA on purpose. Most of these names belong to an independent state in a later
 * era — Fiji, Jamaica, Suriname, Swaziland, Qatar — so an era-agnostic entry would fly the
 * Union Jack over the 1994 map. Only names that were NEVER independent (Nyasaland,
 * Basutoland, Ruanda-Urundi …) may instead carry `PolityInfo.ruler` on their registry entry.
 *
 * Sourced, like every other fact here: each line names the power that actually governed
 * the territory at that date. Never a guess, and never a later successor.
 */
const ERA_RULER: ReadonlyMap<string, string> = new Map([
  /* --- 1880: the eve of the Scramble for Africa ------------------------------- */
  ["ad1880|Belize", "United Kingdom"],            // British Honduras, a colony since 1862
  ["ad1880|Fiji", "United Kingdom"],              // ceded to Britain in 1874
  /* --- 1900 ------------------------------------------------------------------- */
  ["ad1900|Belize", "United Kingdom"],
  ["ad1900|Fiji", "United Kingdom"],
  ["ad1900|Ceylon", "United Kingdom"],            // British crown colony from 1802
  ["ad1900|Dutch Guiana", "Netherlands"],
  ["ad1900|British Guiana", "United Kingdom"],
  ["ad1900|Congo", "France"],                     // French Congo, organised 1882
  /* --- 1914: the last year of the old empires --------------------------------- */
  ["ad1914|Guyana", "United Kingdom"],            // British Guiana
  ["ad1914|Belize", "United Kingdom"],
  ["ad1914|Lesotho", "United Kingdom"],           // Basutoland, a British protectorate
  ["ad1914|Swaziland", "United Kingdom"],         // British protectorate from 1903
  ["ad1914|Fiji", "United Kingdom"],
  ["ad1914|Malta", "United Kingdom"],             // British from 1800
  ["ad1914|Gambia, The", "United Kingdom"],
  ["ad1914|Suriname", "Netherlands"],
  ["ad1914|Iceland", "Denmark"],                  // Danish dependency; its own flag came 1915
  ["ad1914|Finland", "Russian Empire"],           // Grand Duchy of Finland
  ["ad1914|Georgia", "Russian Empire"],           // annexed 1801; the republic came in 1918
  ["ad1914|Azerbaijan", "Russian Empire"],        // Baku and Elisabethpol Governorates
  ["ad1914|Equatorial Guinea", "Spain"],          // Spanish Guinea
  ["ad1914|Samoa", "German Empire"],              // German Samoa until August 1914
  /* --- 1920: mandates and protectorates --------------------------------------- */
  ["ad1920|Guyana", "United Kingdom"],
  ["ad1920|Belize", "United Kingdom"],
  ["ad1920|Lesotho", "United Kingdom"],
  ["ad1920|Botswana", "United Kingdom"],          // Bechuanaland Protectorate
  ["ad1920|Malawi", "United Kingdom"],            // Nyasaland
  ["ad1920|Zimbabwe", "United Kingdom"],          // Southern Rhodesia, a British colony
  ["ad1920|Jamaica", "United Kingdom"],
  ["ad1920|Fiji", "United Kingdom"],
  ["ad1920|Gambia, The", "United Kingdom"],
  ["ad1920|Suriname", "Netherlands"],
  ["ad1920|Guinea-Bissau", "Portugal"],           // Portuguese Guinea
  ["ad1920|Equatorial Guinea", "Spain"],
  ["ad1920|Burundi", "Belgium"],                  // Ruanda-Urundi, Belgian mandate
  ["ad1920|Rwanda", "Belgium"],
  ["ad1920|Togo", "France"],                      // French Togoland mandate (the larger part)
  ["ad1920|Samoa", "New Zealand"],                // Western Samoa, a New Zealand mandate
  /* --- 1938 ------------------------------------------------------------------- */
  ["ad1938|Guyana", "United Kingdom"],
  ["ad1938|Belize", "United Kingdom"],
  ["ad1938|Malawi", "United Kingdom"],
  ["ad1938|Jamaica", "United Kingdom"],
  ["ad1938|Fiji", "United Kingdom"],
  ["ad1938|Bahamas", "United Kingdom"],
  ["ad1938|Gambia, The", "United Kingdom"],
  ["ad1938|Ceylon", "United Kingdom"],
  ["ad1938|Suriname", "Netherlands"],
  ["ad1938|Guinea-Bissau", "Portugal"],
  ["ad1938|Burundi", "Belgium"],
  ["ad1938|Rwanda", "Belgium"],
  ["ad1938|Togo", "France"],
  ["ad1938|Laos", "France"],                      // French protectorate within Indochina
  ["ad1938|Samoa", "New Zealand"],
  /* --- 1945 ------------------------------------------------------------------- */
  ["ad1945|Guyana", "United Kingdom"],
  ["ad1945|Belize", "United Kingdom"],
  ["ad1945|Lesotho", "United Kingdom"],
  ["ad1945|Fiji", "United Kingdom"],
  ["ad1945|Bahamas", "United Kingdom"],
  ["ad1945|Gambia, The", "United Kingdom"],
  ["ad1945|Jamaica", "United Kingdom"],
  ["ad1945|Suriname", "Netherlands"],
  ["ad1945|Burundi", "Belgium"],
  ["ad1945|Rwanda", "Belgium"],
  ["ad1945|Samoa", "New Zealand"],
  ["ad1945|Western Sahara", "Spain"],             // Spanish Sahara
  ["ad1945|United Arab Emirates", "United Kingdom"], // the Trucial States
  ["ad1945|Central African Republic", "France"],   // Ubangi-Shari
  ["ad1945|Congo", "France"],                     // Moyen-Congo
  ["ad1945|Cameroon", "France"],                  // French Cameroun, a UN trust territory
  ["ad1945|Burkina Faso", "France"],              // Upper Volta, then part of French Sudan
  ["ad1945|Gabon", "France"],
  ["ad1945|Benin", "France"],                     // French Dahomey
  ["ad1945|Togo", "France"],
  ["ad1945|Djibouti", "France"],                  // French Somaliland
  ["ad1945|Equatorial Guinea", "Spain"],          // Spanish Guinea
  ["ad1945|Papua New Guinea", "Australia"],
  ["ad1945|Israel", "United Kingdom"],            // Mandatory Palestine until 14 May 1948
  ["ad1920|Ghana", "United Kingdom"],             // the Gold Coast colony
  ["ad1945|Sri Lanka", "United Kingdom"],         // the crown colony of Ceylon; independence 1948
  ["ad1945|Zaire", "Belgium"],                    // the Belgian Congo
  ["ad1880|Bosnia-Herzegovina", "Austria Hungary"],  // occupied and administered from 1878
  ["ad1900|Bosnia-Herzegovina", "Austria Hungary"],
  ["ad1880|Griqualand West", "United Kingdom"],       // annexed 1871, joined the Cape in 1880
  ["ad1900|Griqualand West", "United Kingdom"],
  ["ad1880|Lagos", "United Kingdom"],                 // a crown colony from 1861
  ["ad1900|Lagos", "United Kingdom"],
  ["ad1900|Natal", "United Kingdom"],                 // self-governing British colony
  ["ad1900|Zululand", "United Kingdom"],              // annexed 1887, part of Natal from 1897
  ["ad1900|Basutoland", "United Kingdom"],
  ["ad1900|Dahomey", "France"],                       // conquered 1894
  ["ad1900|Accra", "United Kingdom"],                 // the Gold Coast capital
  ["ad1938|French Somaliland", "France"],
  ["ad1945|Pakistan", "United Kingdom"],           // British India until the 1947 partition
  ["ad1945|Bangladesh", "United Kingdom"],         // the Bengal Presidency of British India
  ["ad1920|Swaziland", "United Kingdom"],
  ["ad1920|East Prussia", "Germany"],             // a German exclave after the Polish Corridor
  ["ad1815|Canada", "United Kingdom"],            // British North America: the Canadas, the Maritimes, Rupert's Land
  ["ad1945|Germany (USA)", "United States"],      // the American occupation zone
  ["ad1945|Germany (UK)", "United Kingdom"],
  ["ad1945|Germany (France)", "France"],
  ["ad1945|Korea (USA)", "United States"],        // US Army Military Government in Korea
  ["ad1945|Korea (USSR)", "Soviet Union"],        // Soviet Civil Administration
  /* --- the ex-tagged colonies. Stripping "(France)" from the NAME must not lose the
   * fact it carried, so each names its ruler here and the panel captions the flag. --- */
  ["ad1880|Algeria (FR)", "France"],
  ["ad1880|Senegal (FR)", "France"],
  ["ad1880|Angola (Portugal)", "Portugal"],
  ["ad1900|Madagascar (France)", "France"],
  ["ad1914|Madagascar (France)", "France"],
  ["ad1920|Madagascar (France)", "France"],
  ["ad1920|Syria (France)", "France"],
  ["ad1920|Libya (IT)", "Italy"],
  ["ad1938|Algeria (France)", "France"],
  ["ad1938|Madagascar (France)", "France"],
  ["ad1938|Morocco (France)", "France"],
  ["ad1938|Syria (France)", "France"],
  ["ad1938|Angola (Portugal)", "Portugal"],
  ["ad1938|Mozambique (Portugal)", "Portugal"],
  // Ethiopia was annexed into Italian East Africa in 1936 and Eritrea had been Italian
  // since 1890; both flew Italy's flag. https://en.wikipedia.org/wiki/Italian_East_Africa
  ["ad1938|Ethiopia (Italy)", "Italy"],
  ["ad1938|Eritrea (Italy)", "Italy"],
  ["ad1945|Jamaica (UK)", "United Kingdom"],
  ["ad1945|Martinique (France)", "France"],
  ["ad1700|New France", "France"],
  ["ad1880|Mozambique", "Portugal"],
  ["ad1920|Italian Somaliland", "Italy"],
  ["ad1938|Italian Somaliland", "Italy"],
  /* --- 1960: the year of African independence, and what was still ruled ------- */
  ["ad1960|Guyana", "United Kingdom"],
  ["ad1960|Belize", "United Kingdom"],
  ["ad1960|Lesotho", "United Kingdom"],
  ["ad1960|Botswana", "United Kingdom"],
  ["ad1960|Malawi", "United Kingdom"],
  ["ad1960|Zimbabwe", "United Kingdom"],
  ["ad1960|Swaziland", "United Kingdom"],
  ["ad1960|Jamaica", "United Kingdom"],
  ["ad1960|Fiji", "United Kingdom"],
  ["ad1960|Bahamas", "United Kingdom"],
  ["ad1960|Gambia, The", "United Kingdom"],
  ["ad1960|Suriname", "Netherlands"],
  ["ad1960|Guinea-Bissau", "Portugal"],
  ["ad1960|Equatorial Guinea", "Spain"],
  ["ad1960|Western Sahara", "Spain"],
  ["ad1960|Burundi", "Belgium"],
  ["ad1960|Rwanda", "Belgium"],
  ["ad1960|United Arab Emirates", "United Kingdom"],
  ["ad1960|Djibouti", "France"],                  // French Somaliland
  ["ad1960|Papua New Guinea", "Australia"],       // the Territory of Papua and New Guinea
  ["ad1960|Uganda", "United Kingdom"],            // Uganda Protectorate; independence 1962
]);

/**
 * The dataset's ruling power for a polity, or null when the dataset's SUBJECTO is
 * refuted for this era (see FALSE_SUBJECTO). Callers must use this rather than
 * reading SUBJECTO directly, so a refuted ruler can neither lend its flag nor appear
 * in the "Ruled by" row.
 */
/**
 * The curated ruling power for this (era, polity), if one is declared — from ERA_RULER or
 * from the entry's own `ruler`. Exported because the flag resolution must know a ruler
 * exists BEFORE it tries the modern-country layer: a polity we know was ruled had no flag
 * of its own, so the modern layer would hand it a successor state's flag, uncaptioned.
 *
 * That is not hypothetical. The 1945 occupation zones resolved through the modern layer to
 * Germany's black-red-gold flag — which the Allies had not restored (it was abolished in
 * 1935 and readopted in 1949), so the 1949 West German flag flew over the 1945 map.
 */
export function curatedRulerFor(name: string, eraId: Era["id"]): string | null {
  return ERA_RULER.get(`${eraId}|${name}`) ?? polityInfo(name, eraId).ruler ?? null;
}

export function eraRuler(
  name: string,
  eraId: Era["id"],
  datasetRuler: string | undefined,
): string | null {
  // A curated `ruler` wins: it exists precisely because the dataset's SUBJECTO is silent
  // or self-referential for this polity at this date.
  const perEra = ERA_RULER.get(`${eraId}|${name}`);
  if (perEra) return perEra;
  const curated = polityInfo(name, eraId).ruler;
  if (curated) return curated;
  if (!datasetRuler || datasetRuler === name) return null;
  // A SUBJECTO that is merely another spelling of the polity is not a ruler: the 1994 file
  // records Belarus as subject to "Byelarus", which would have put a "Ruled by: Belarus" row
  // on Belarus and made its own flag look inherited.
  if (polityDisplayName(datasetRuler, eraId) === polityDisplayName(name, eraId)) return null;
  if (FALSE_SUBJECTO.has(`${eraId}|${name}`)) return null;
  return datasetRuler;
}

/**
 * Best-effort modern-country-name lookup for a dataset polity NAME.
 *
 * Falls through three layers:
 *   1. POLITY_REGISTRY entry's `modernName` field
 *   2. MODERN_NAME_ALIASES exact match
 *   3. The NAME itself if it matches a real country name (handled by the caller)
 *
 * Returns null when no mapping exists — the caller should then leave the
 * polity flag-less, since most pre-1815 entities have no real flag anyway.
 */
export function polityModernName(name: string, eraId?: Era["id"]): string | null {
  if (eraId) {
    const eraEntry = ERA_OVERRIDES.get(eraId)?.get(name);
    if (eraEntry?.modernName) return eraEntry.modernName;
  }
  const info = POLITY_REGISTRY.get(name);
  if (info?.modernName) return info.modernName;
  const alias = MODERN_NAME_ALIASES.get(name);
  if (alias) return alias;
  return null;
}
