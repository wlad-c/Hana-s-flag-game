import {
  COUNTRY_FACTS,
  type DemocracyData,
  type DemocracyIndex,
} from "../data/countryFacts.ts";

export type DemocracyIndexKey =
  | "freedom-house"
  | "v-dem"
  | "economist"
  | "cpi"
  | "perception"
  | "rsf-press"
  | "hdi"
  | "gender-gap"
  | "gpi"
  | "happiness"
  | "soft-power"
  | "gdi"
  | "wjp-rule-of-law"
  | "imd-competitiveness"
  | "etr"
  | "digital-news"
  | "gti";

/**
 * World Values Survey map colour mode — one question with one or more answer
 * columns summed. Kept as a structured object (not a string key) so the Indexes
 * popover can edit answer checkboxes without re-encoding on every toggle.
 */
export type WvsMapMode = {
  kind: "wvs";
  questionId: string;
  answerIndexes: number[];
};

/** Colour the map by Country Persona (src/data/countryPersonas.ts). Categorical, NOT an
 *  index: it never enters DEMOCRACY_INDEX_KEYS and never uses the green→red index palette. */
export type PersonaMapMode = { kind: "persona" };

export type DemocracyMapMode = DemocracyIndexKey | WvsMapMode | PersonaMapMode | null;

export function isWvsMapMode(mode: DemocracyMapMode): mode is WvsMapMode {
  return typeof mode === "object" && mode !== null && mode.kind === "wvs";
}

export function isPersonaMapMode(mode: DemocracyMapMode): mode is PersonaMapMode {
  return typeof mode === "object" && mode !== null && mode.kind === "persona";
}

export function isDemocracyIndexMode(
  mode: DemocracyMapMode,
): mode is DemocracyIndexKey {
  return typeof mode === "string";
}

/** Ordered list of every democracy / governance index the map and chart can use.
 *  New indexes land here so the chart axis pickers and map colour modes stay in
 *  sync without a second hand-maintained menu. Display order for menus is
 *  `DEMOCRACY_INDEX_MENU_GROUPS` (thematic groups, A–Z within each) — this
 *  array is the coverage set, not a display order. */
export const DEMOCRACY_INDEX_KEYS: readonly DemocracyIndexKey[] = [
  "freedom-house",
  "v-dem",
  "economist",
  "cpi",
  "perception",
  "rsf-press",
  "hdi",
  "gender-gap",
  "gpi",
  "happiness",
  "soft-power",
  "gdi",
  "wjp-rule-of-law",
  "imd-competitiveness",
  "etr",
  "digital-news",
  "gti",
] as const;

/**
 * Thematic group id for Learn-mode index menus. Group order is fixed in
 * `DEMOCRACY_INDEX_THEME_GROUPS`; indexes within a group sort alphabetically
 * by display name. Adding an index means assigning it a group here.
 */
export type DemocracyIndexThemeId =
  | "state-of-democracy"
  | "governance"
  | "press-media"
  | "human-development"
  | "peace-security"
  | "soft-power-diplomacy";

export type DemocracyIndexThemeGroup = {
  id: DemocracyIndexThemeId;
  /** Short heading shown above the group's options (map control / optgroups). */
  label: string;
};

/** Theme groups in menu order — separators sit between these. */
export const DEMOCRACY_INDEX_THEME_GROUPS: readonly DemocracyIndexThemeGroup[] = [
  { id: "state-of-democracy", label: "State of democracy" },
  { id: "governance", label: "Governance & integrity" },
  { id: "press-media", label: "Press & media" },
  { id: "human-development", label: "Human development" },
  { id: "peace-security", label: "Peace & security" },
  { id: "soft-power-diplomacy", label: "Soft power & diplomacy" },
] as const;

/**
 * Canonical per-index display metadata. EVERY Learn-mode index label in the
 * app (map dropdown, chart axes, Group-by, country widget, legend) MUST come
 * from `getDemocracyIndexLabel()` / this registry — never a hand-written
 * string. Rules (enforced by `scripts/check-index-labels.mjs`):
 *   - `name` never contains "Global" (coverage is already global)
 *   - label format is always `{name}, {year} ({publisher})`
 *   - `year` matches the bundled COUNTRY_FACTS edition for that index
 *   - every DEMOCRACY_INDEX_KEYS entry has a row, and vice versa
 */
export type DemocracyIndexMeta = {
  key: DemocracyIndexKey;
  /** Short index name — no "Global", no publisher acronym prefix. */
  name: string;
  /** Edition / data year shown after the name. */
  year: number;
  /** Organisation responsible for the index. */
  publisher: string;
  theme: DemocracyIndexThemeId;
};

export const DEMOCRACY_INDEX_META: Readonly<
  Record<DemocracyIndexKey, DemocracyIndexMeta>
> = {
  "freedom-house": {
    key: "freedom-house",
    name: "Freedom in the World",
    year: 2026,
    publisher: "Freedom House",
    theme: "state-of-democracy",
  },
  "v-dem": {
    key: "v-dem",
    name: "V-Dem Regime Type",
    year: 2026,
    publisher: "V-Dem Institute",
    theme: "state-of-democracy",
  },
  economist: {
    key: "economist",
    name: "Democracy Index",
    year: 2025,
    publisher: "Economist Intelligence Unit",
    theme: "state-of-democracy",
  },
  perception: {
    key: "perception",
    name: "Democracy Perception Index",
    year: 2026,
    publisher: "Alliance of Democracies",
    theme: "state-of-democracy",
  },
  cpi: {
    key: "cpi",
    name: "Corruption Perceptions Index",
    year: 2025,
    publisher: "Transparency International",
    theme: "governance",
  },
  "wjp-rule-of-law": {
    key: "wjp-rule-of-law",
    name: "Rule of Law Index",
    year: 2025,
    publisher: "World Justice Project",
    theme: "governance",
  },
  "imd-competitiveness": {
    key: "imd-competitiveness",
    name: "World Competitiveness Ranking",
    year: 2025,
    publisher: "IMD",
    theme: "governance",
  },
  "rsf-press": {
    key: "rsf-press",
    name: "Press Freedom Index",
    year: 2026,
    publisher: "Reporters Without Borders",
    theme: "press-media",
  },
  "digital-news": {
    key: "digital-news",
    name: "Digital News Report",
    year: 2026,
    publisher: "Reuters Institute",
    theme: "press-media",
  },
  hdi: {
    key: "hdi",
    name: "Human Development Index",
    year: 2023,
    publisher: "UNDP",
    theme: "human-development",
  },
  "gender-gap": {
    key: "gender-gap",
    name: "Gender Gap Index",
    year: 2026,
    publisher: "World Economic Forum",
    theme: "human-development",
  },
  happiness: {
    key: "happiness",
    name: "World Happiness Report",
    year: 2026,
    publisher: "Wellbeing Research Centre",
    theme: "human-development",
  },
  gpi: {
    key: "gpi",
    name: "Peace Index",
    year: 2026,
    publisher: "Institute for Economics & Peace",
    theme: "peace-security",
  },
  gti: {
    key: "gti",
    name: "Terrorism Index",
    year: 2026,
    publisher: "Institute for Economics & Peace",
    theme: "peace-security",
  },
  etr: {
    key: "etr",
    name: "Ecological Threat Index",
    year: 2024,
    publisher: "Institute for Economics & Peace",
    theme: "peace-security",
  },
  "soft-power": {
    key: "soft-power",
    name: "Soft Power Index",
    year: 2026,
    publisher: "Brand Finance",
    theme: "soft-power-diplomacy",
  },
  gdi: {
    key: "gdi",
    name: "Diplomacy Index",
    year: 2024,
    publisher: "Lowy Institute",
    theme: "soft-power-diplomacy",
  },
};

/** Build the canonical label: `{name}, {year} ({publisher})`. */
export function formatDemocracyIndexLabel(meta: Pick<DemocracyIndexMeta, "name" | "year" | "publisher">): string {
  return `${meta.name}, ${meta.year} (${meta.publisher})`;
}

/**
 * Menu groups for the map control / chart / Group-by: themes in
 * `DEMOCRACY_INDEX_THEME_GROUPS` order, indexes A–Z by `name` within each.
 */
export type DemocracyIndexMenuGroup = {
  theme: DemocracyIndexThemeGroup;
  indexes: readonly DemocracyIndexMeta[];
};

export function getDemocracyIndexMenuGroups(): DemocracyIndexMenuGroup[] {
  return DEMOCRACY_INDEX_THEME_GROUPS.map((theme) => {
    const indexes = DEMOCRACY_INDEX_KEYS.map((k) => DEMOCRACY_INDEX_META[k])
      .filter((m) => m.theme === theme.id)
      .sort((a, b) => a.name.localeCompare(b.name, "en"));
    return { theme, indexes };
  }).filter((g) => g.indexes.length > 0);
}

export type DemocracyAxisBand = {
  /** Classification label shown on the axis (e.g. "Flawed democracy"). */
  label: string;
  /** Inclusive lower bound of the score band on the chart axis. */
  min: number;
  /** Inclusive upper bound of the score band on the chart axis. */
  max: number;
};

export type DemocracyLegendItem = {
  label: string;
  color: string;
};

/**
 * Canonical Learn-mode index map palette — best outcome → worst.
 * Every democracy / governance / ratings index map MUST colour its bands by
 * sampling this scale via `indexBandColors()`. Never invent a per-index
 * palette, and never paste hexes into a `*_MAP_COLORS` object by hand.
 */
export const INDEX_MAP_PALETTE = [
  "#004d1a",
  "#1b5e20",
  "#43a047",
  "#9ccc65",
  "#fdd835",
  "#fb8c00",
  "#f4511e",
  "#e53935",
  "#c62828",
  "#7f0000",
] as const;

/** Evenly sample `bandCount` colours from `INDEX_MAP_PALETTE` (best→worst). */
export function indexMapPaletteSample(bandCount: number): string[] {
  const n = INDEX_MAP_PALETTE.length;
  if (!Number.isInteger(bandCount) || bandCount < 1) {
    throw new Error(`indexMapPaletteSample: bandCount must be a positive integer (got ${bandCount})`);
  }
  if (bandCount > n) {
    throw new Error(
      `indexMapPaletteSample: at most ${n} bands (got ${bandCount}) — extend INDEX_MAP_PALETTE first`,
    );
  }
  if (bandCount === 1) return [INDEX_MAP_PALETTE[0]];
  if (bandCount === n) return [...INDEX_MAP_PALETTE];
  const out: string[] = [];
  for (let i = 0; i < bandCount; i++) {
    const idx = Math.round((i * (n - 1)) / (bandCount - 1));
    out.push(INDEX_MAP_PALETTE[idx]);
  }
  return out;
}

/**
 * Build a label→colour map for an index. `labelsBestFirst` MUST be ordered
 * best outcome → worst (green → red), regardless of how the legend is later
 * displayed. Inverted indexes (e.g. GTI, where "Very High" impact is worst)
 * still pass best-first labels here.
 */
export function indexBandColors(
  labelsBestFirst: readonly string[],
): Readonly<Record<string, string>> {
  if (labelsBestFirst.length === 0) {
    throw new Error("indexBandColors: labelsBestFirst must not be empty");
  }
  const seen = new Set<string>();
  for (const label of labelsBestFirst) {
    if (!label || seen.has(label)) {
      throw new Error(`indexBandColors: duplicate or empty label "${label}"`);
    }
    seen.add(label);
  }
  const colors = indexMapPaletteSample(labelsBestFirst.length);
  const out: Record<string, string> = {};
  labelsBestFirst.forEach((label, i) => {
    out[label] = colors[i]!;
  });
  return out;
}

/** Decade score bands shared by CPI / Soft Power / Gender Gap / IMD (best→worst). */
export const DECADE_SCORE_BAND_ORDER = [
  "90–100",
  "80–89",
  "70–79",
  "60–69",
  "50–59",
  "40–49",
  "30–39",
  "20–29",
  "10–19",
  "0–9",
] as const;

export const FREEDOM_HOUSE_MAP_COLORS = indexBandColors([
  "Free",
  "Partly Free",
  "Not Free",
]);

export const V_DEM_MAP_COLORS = indexBandColors([
  "Liberal Democracy",
  "Electoral Democracy",
  "Electoral Autocracy",
  "Closed Autocracy",
]);

export const ECONOMIST_MAP_COLORS = indexBandColors([
  "Full democracy",
  "Flawed democracy",
  "Hybrid regime",
  "Authoritarian",
]);

/** Transparency International CPI map score bands. Higher = less corruption. */
export const CPI_MAP_COLORS = indexBandColors(DECADE_SCORE_BAND_ORDER);

export const CPI_BAND_ORDER: readonly string[] = DECADE_SCORE_BAND_ORDER;

/** RSF World Press Freedom Index methodology bands (good → very serious). */
export const RSF_PRESS_MAP_COLORS = indexBandColors([
  "Good",
  "Satisfactory",
  "Problematic",
  "Difficult",
  "Very serious",
]);

/** WJP Rule of Law Index map score bands (0–1). Higher = stronger rule of law. */
export const WJP_BAND_ORDER = [
  "0.80–1.00",
  "0.70–0.79",
  "0.60–0.69",
  "0.50–0.59",
  "0.40–0.49",
  "0.30–0.39",
  "0.20–0.29",
  "0.00–0.19",
] as const;

export const WJP_MAP_COLORS = indexBandColors(WJP_BAND_ORDER);

/** UNDP HDI hdicode bands. Higher development → greener. */
export const HDI_BAND_ORDER = ["Very High", "High", "Medium", "Low"] as const;

export const HDI_MAP_COLORS = indexBandColors(HDI_BAND_ORDER);

/** Global Peace Index State of Peace bands. Lower score = more peaceful. */
export const GPI_BAND_ORDER = [
  "Very High",
  "High",
  "Medium",
  "Low",
  "Very Low",
] as const;

export const GPI_MAP_COLORS = indexBandColors(GPI_BAND_ORDER);

/** Reuters Institute Digital News Report trust-in-news % bands. */
export const DIGITAL_NEWS_BAND_ORDER = [
  "90–100%",
  "80–89%",
  "70–79%",
  "60–69%",
  "50–59%",
  "40–49%",
  "30–39%",
  "20–29%",
  "10–19%",
  "0–9%",
] as const;

export const DIGITAL_NEWS_MAP_COLORS = indexBandColors(DIGITAL_NEWS_BAND_ORDER);

/**
 * Global Terrorism Index impact bands. Higher score = greater impact.
 * Legend order is impact-high→none; colours are assigned best→worst
 * (No Impact = green, Very High = red).
 */
export const GTI_BAND_ORDER = [
  "Very High",
  "High",
  "Medium",
  "Low",
  "Very Low",
  "No Impact",
] as const;

export const GTI_MAP_COLORS = indexBandColors([
  "No Impact",
  "Very Low",
  "Low",
  "Medium",
  "High",
  "Very High",
]);

/**
 * IEP Ecological Threat Index bands. Higher threat → redder.
 * Note: ETR “Very High” means greatest threat (opposite of GPI “Very High”
 * peacefulness).
 */
export const ETR_BAND_ORDER = [
  "Very Low",
  "Low",
  "Medium",
  "High",
  "Very High",
] as const;

export const ETR_MAP_COLORS = indexBandColors(ETR_BAND_ORDER);

/** World Happiness Report Cantril-ladder score bands (happiest → least). */
export const HAPPINESS_BAND_ORDER = [
  "9.0–10",
  "8.0–8.9",
  "7.0–7.9",
  "6.0–6.9",
  "5.0–5.9",
  "4.0–4.9",
  "3.0–3.9",
  "2.0–2.9",
  "1.0–1.9",
  "0.0–0.9",
] as const;

export const HAPPINESS_MAP_COLORS = indexBandColors(HAPPINESS_BAND_ORDER);

/** Brand Finance Global Soft Power Index score bands (0–100). */
export const SOFT_POWER_BAND_ORDER: readonly string[] = DECADE_SCORE_BAND_ORDER;

export const SOFT_POWER_MAP_COLORS = indexBandColors(DECADE_SCORE_BAND_ORDER);

/** Lowy Institute Global Diplomacy Index — total diplomatic posts abroad. */
export const GDI_BAND_ORDER = [
  "250+",
  "200–249",
  "150–199",
  "100–149",
  "50–99",
  "Below 50",
] as const;

export const GDI_MAP_COLORS = indexBandColors(GDI_BAND_ORDER);

/** IMD World Competitiveness Ranking score bands (0–100). */
export const IMD_COMPETITIVENESS_BAND_ORDER: readonly string[] = DECADE_SCORE_BAND_ORDER;

export const IMD_COMPETITIVENESS_MAP_COLORS = indexBandColors(DECADE_SCORE_BAND_ORDER);

/** WEF Global Gender Gap Index — decade of percentage closed (score×100).
 *  Only bands that appear in the bundled extract (GGGR 2026: 50–59 … 90–100).
 *  Empty decades (0–9 … 40–49) are omitted so the shared palette stretches
 *  across the real range: best green → worst deep red on the lowest-ranked
 *  economies. Recompute from the extract when a future edition fills a new decade. */
export const GENDER_GAP_BAND_ORDER = [
  "90–100",
  "80–89",
  "70–79",
  "60–69",
  "50–59",
] as const;

export const GENDER_GAP_MAP_COLORS = indexBandColors(GENDER_GAP_BAND_ORDER);

/** Democracy Perception Index tiers (±5 / ±15 on Index Score). */
export const PERCEPTION_TIER_ORDER = [
  "Very Positive",
  "Positive",
  "Neutral",
  "Negative",
  "Very Negative",
] as const;

export const PERCEPTION_MAP_COLORS = indexBandColors(PERCEPTION_TIER_ORDER);

/**
 * Registry of every index colour map + the best→worst label order used to
 * build it. The colour-scheme check walks this list; adding an index means
 * adding a row here in the SAME change.
 */
export const INDEX_MAP_COLOR_REGISTRY: readonly {
  key: DemocracyIndexKey | "decade-shared";
  name: string;
  colors: Readonly<Record<string, string>>;
  labelsBestFirst: readonly string[];
}[] = [
  {
    key: "freedom-house",
    name: "FREEDOM_HOUSE_MAP_COLORS",
    colors: FREEDOM_HOUSE_MAP_COLORS,
    labelsBestFirst: ["Free", "Partly Free", "Not Free"],
  },
  {
    key: "v-dem",
    name: "V_DEM_MAP_COLORS",
    colors: V_DEM_MAP_COLORS,
    labelsBestFirst: [
      "Liberal Democracy",
      "Electoral Democracy",
      "Electoral Autocracy",
      "Closed Autocracy",
    ],
  },
  {
    key: "economist",
    name: "ECONOMIST_MAP_COLORS",
    colors: ECONOMIST_MAP_COLORS,
    labelsBestFirst: [
      "Full democracy",
      "Flawed democracy",
      "Hybrid regime",
      "Authoritarian",
    ],
  },
  {
    key: "cpi",
    name: "CPI_MAP_COLORS",
    colors: CPI_MAP_COLORS,
    labelsBestFirst: DECADE_SCORE_BAND_ORDER,
  },
  {
    key: "rsf-press",
    name: "RSF_PRESS_MAP_COLORS",
    colors: RSF_PRESS_MAP_COLORS,
    labelsBestFirst: [
      "Good",
      "Satisfactory",
      "Problematic",
      "Difficult",
      "Very serious",
    ],
  },
  {
    key: "wjp-rule-of-law",
    name: "WJP_MAP_COLORS",
    colors: WJP_MAP_COLORS,
    labelsBestFirst: WJP_BAND_ORDER,
  },
  {
    key: "hdi",
    name: "HDI_MAP_COLORS",
    colors: HDI_MAP_COLORS,
    labelsBestFirst: HDI_BAND_ORDER,
  },
  {
    key: "gpi",
    name: "GPI_MAP_COLORS",
    colors: GPI_MAP_COLORS,
    labelsBestFirst: GPI_BAND_ORDER,
  },
  {
    key: "digital-news",
    name: "DIGITAL_NEWS_MAP_COLORS",
    colors: DIGITAL_NEWS_MAP_COLORS,
    labelsBestFirst: DIGITAL_NEWS_BAND_ORDER,
  },
  {
    key: "gti",
    name: "GTI_MAP_COLORS",
    colors: GTI_MAP_COLORS,
    labelsBestFirst: [
      "No Impact",
      "Very Low",
      "Low",
      "Medium",
      "High",
      "Very High",
    ],
  },
  {
    key: "etr",
    name: "ETR_MAP_COLORS",
    colors: ETR_MAP_COLORS,
    labelsBestFirst: ETR_BAND_ORDER,
  },
  {
    key: "happiness",
    name: "HAPPINESS_MAP_COLORS",
    colors: HAPPINESS_MAP_COLORS,
    labelsBestFirst: HAPPINESS_BAND_ORDER,
  },
  {
    key: "soft-power",
    name: "SOFT_POWER_MAP_COLORS",
    colors: SOFT_POWER_MAP_COLORS,
    labelsBestFirst: DECADE_SCORE_BAND_ORDER,
  },
  {
    key: "gdi",
    name: "GDI_MAP_COLORS",
    colors: GDI_MAP_COLORS,
    labelsBestFirst: GDI_BAND_ORDER,
  },
  {
    key: "imd-competitiveness",
    name: "IMD_COMPETITIVENESS_MAP_COLORS",
    colors: IMD_COMPETITIVENESS_MAP_COLORS,
    labelsBestFirst: DECADE_SCORE_BAND_ORDER,
  },
  {
    key: "gender-gap",
    name: "GENDER_GAP_MAP_COLORS",
    colors: GENDER_GAP_MAP_COLORS,
    labelsBestFirst: GENDER_GAP_BAND_ORDER,
  },
  {
    key: "perception",
    name: "PERCEPTION_MAP_COLORS",
    colors: PERCEPTION_MAP_COLORS,
    labelsBestFirst: PERCEPTION_TIER_ORDER,
  },
];

export function getDemocracyLegendTitle(mode: DemocracyMapMode): string {
  if (!isDemocracyIndexMode(mode)) return "";
  return getDemocracyIndexLabel(mode);
}

export function getDemocracyLegendItems(mode: DemocracyMapMode): DemocracyLegendItem[] {
  if (!isDemocracyIndexMode(mode)) return [];
  if (mode === "freedom-house") {
    return [
      { label: "Free", color: FREEDOM_HOUSE_MAP_COLORS["Free"] },
      { label: "Partly Free", color: FREEDOM_HOUSE_MAP_COLORS["Partly Free"] },
      { label: "Not Free", color: FREEDOM_HOUSE_MAP_COLORS["Not Free"] },
    ];
  }
  if (mode === "v-dem") {
    return [
      { label: "Liberal Democracy", color: V_DEM_MAP_COLORS["Liberal Democracy"] },
      { label: "Electoral Democracy", color: V_DEM_MAP_COLORS["Electoral Democracy"] },
      { label: "Electoral Autocracy", color: V_DEM_MAP_COLORS["Electoral Autocracy"] },
      { label: "Closed Autocracy", color: V_DEM_MAP_COLORS["Closed Autocracy"] },
    ];
  }
  if (mode === "economist") {
    return [
      { label: "Full democracy", color: ECONOMIST_MAP_COLORS["Full democracy"] },
      { label: "Flawed democracy", color: ECONOMIST_MAP_COLORS["Flawed democracy"] },
      { label: "Hybrid regime", color: ECONOMIST_MAP_COLORS["Hybrid regime"] },
      { label: "Authoritarian", color: ECONOMIST_MAP_COLORS["Authoritarian"] },
    ];
  }
  if (mode === "cpi") {
    return CPI_BAND_ORDER.map((label) => ({
      label,
      color: CPI_MAP_COLORS[label],
    }));
  }
  if (mode === "perception") {
    return PERCEPTION_TIER_ORDER.map((label) => ({
      label,
      color: PERCEPTION_MAP_COLORS[label],
    }));
  }
  if (mode === "rsf-press") {
    return [
      { label: "Good", color: RSF_PRESS_MAP_COLORS.Good },
      { label: "Satisfactory", color: RSF_PRESS_MAP_COLORS.Satisfactory },
      { label: "Problematic", color: RSF_PRESS_MAP_COLORS.Problematic },
      { label: "Difficult", color: RSF_PRESS_MAP_COLORS.Difficult },
      { label: "Very serious", color: RSF_PRESS_MAP_COLORS["Very serious"] },
    ];
  }
  if (mode === "hdi") {
    return HDI_BAND_ORDER.map((label) => ({
      label,
      color: HDI_MAP_COLORS[label],
    }));
  }
  if (mode === "gender-gap") {
    return GENDER_GAP_BAND_ORDER.map((label) => ({
      label,
      color: GENDER_GAP_MAP_COLORS[label],
    }));
  }
  if (mode === "gpi") {
    return GPI_BAND_ORDER.map((label) => ({
      label,
      color: GPI_MAP_COLORS[label],
    }));
  }
  if (mode === "happiness") {
    return HAPPINESS_BAND_ORDER.map((label) => ({
      label,
      color: HAPPINESS_MAP_COLORS[label],
    }));
  }
  if (mode === "soft-power") {
    return SOFT_POWER_BAND_ORDER.map((label) => ({
      label,
      color: SOFT_POWER_MAP_COLORS[label],
    }));
  }
  if (mode === "gdi") {
    return GDI_BAND_ORDER.map((label) => ({
      label,
      color: GDI_MAP_COLORS[label],
    }));
  }
  if (mode === "wjp-rule-of-law") {
    return WJP_BAND_ORDER.map((label) => ({
      label,
      color: WJP_MAP_COLORS[label],
    }));
  }
  if (mode === "imd-competitiveness") {
    return IMD_COMPETITIVENESS_BAND_ORDER.map((label) => ({
      label,
      color: IMD_COMPETITIVENESS_MAP_COLORS[label],
    }));
  }
  if (mode === "etr") {
    return ETR_BAND_ORDER.map((label) => ({
      label,
      color: ETR_MAP_COLORS[label],
    }));
  }
  if (mode === "digital-news") {
    return DIGITAL_NEWS_BAND_ORDER.map((label) => ({
      label,
      color: DIGITAL_NEWS_MAP_COLORS[label],
    }));
  }
  if (mode === "gti") {
    return GTI_BAND_ORDER.map((label) => ({
      label,
      color: GTI_MAP_COLORS[label],
    }));
  }
  return [];
}

export function getDemocracyColorOverlay(mode: DemocracyMapMode): Map<string, string> | null {
  if (!isDemocracyIndexMode(mode)) return null;
  const overlay = new Map<string, string>();
  for (const [code, facts] of Object.entries(COUNTRY_FACTS)) {
    const demo = facts.democracy;
    if (!demo) continue;
    let rating: string | undefined;
    let colorMap: Record<string, string>;
    if (mode === "freedom-house") {
      rating = demo.freedomHouse?.rating;
      colorMap = FREEDOM_HOUSE_MAP_COLORS;
    } else if (mode === "v-dem") {
      rating = demo.vDem?.rating;
      colorMap = V_DEM_MAP_COLORS;
    } else if (mode === "economist") {
      rating = demo.economist?.rating;
      colorMap = ECONOMIST_MAP_COLORS;
    } else if (mode === "cpi") {
      rating = demo.cpi?.rating;
      colorMap = CPI_MAP_COLORS;
    } else if (mode === "perception") {
      rating = demo.perception?.rating;
      colorMap = PERCEPTION_MAP_COLORS;
    } else if (mode === "rsf-press") {
      rating = demo.rsfPress?.rating;
      colorMap = RSF_PRESS_MAP_COLORS;
    } else if (mode === "hdi") {
      rating = demo.hdi?.rating;
      colorMap = HDI_MAP_COLORS;
    } else if (mode === "gender-gap") {
      rating = demo.genderGap?.rating;
      colorMap = GENDER_GAP_MAP_COLORS;
    } else if (mode === "gpi") {
      rating = demo.gpi?.rating;
      colorMap = GPI_MAP_COLORS;
    } else if (mode === "happiness") {
      rating = demo.happiness?.rating;
      colorMap = HAPPINESS_MAP_COLORS;
    } else if (mode === "soft-power") {
      rating = demo.softPower?.rating;
      colorMap = SOFT_POWER_MAP_COLORS;
    } else if (mode === "gdi") {
      rating = demo.gdi?.rating;
      colorMap = GDI_MAP_COLORS;
    } else if (mode === "wjp-rule-of-law") {
      rating = demo.wjpRuleOfLaw?.rating;
      colorMap = WJP_MAP_COLORS;
    } else if (mode === "imd-competitiveness") {
      rating = demo.imdCompetitiveness?.rating;
      colorMap = IMD_COMPETITIVENESS_MAP_COLORS;
    } else if (mode === "etr") {
      rating = demo.etr?.rating;
      colorMap = ETR_MAP_COLORS;
    } else if (mode === "digital-news") {
      rating = demo.digitalNews?.rating;
      colorMap = DIGITAL_NEWS_MAP_COLORS;
    } else if (mode === "gti") {
      rating = demo.gti?.rating;
      colorMap = GTI_MAP_COLORS;
    } else {
      continue;
    }
    if (rating && colorMap[rating]) {
      overlay.set(code, colorMap[rating]);
    }
  }
  return overlay;
}

/**
 * Canonical Learn-mode index label — `{name}, {year} ({publisher})`.
 * Sole source for every user-facing index name (map dropdown, chart axes,
 * Group-by, country widget, legend). Never hand-write an index title.
 */
export function getDemocracyIndexLabel(key: DemocracyIndexKey): string {
  return formatDemocracyIndexLabel(DEMOCRACY_INDEX_META[key]);
}

/** Pull the index row for a country from bundled facts. */
export function getDemocracyIndexFor(
  democracy: DemocracyData | undefined,
  key: DemocracyIndexKey,
): DemocracyIndex | undefined {
  if (!democracy) return undefined;
  if (key === "freedom-house") return democracy.freedomHouse;
  if (key === "v-dem") return democracy.vDem;
  if (key === "economist") return democracy.economist;
  if (key === "cpi") return democracy.cpi;
  if (key === "perception") return democracy.perception;
  if (key === "rsf-press") return democracy.rsfPress;
  if (key === "hdi") return democracy.hdi;
  if (key === "gender-gap") return democracy.genderGap;
  if (key === "gpi") return democracy.gpi;
  if (key === "happiness") return democracy.happiness;
  if (key === "soft-power") return democracy.softPower;
  if (key === "gdi") return democracy.gdi;
  if (key === "wjp-rule-of-law") return democracy.wjpRuleOfLaw;
  if (key === "imd-competitiveness") return democracy.imdCompetitiveness;
  if (key === "etr") return democracy.etr;
  if (key === "digital-news") return democracy.digitalNews;
  return democracy.gti;
}

/**
 * Full published scale for an index — used as a fallback when no points are
 * plotted, and as a hint for tick rounding. Chart axes no longer always span
 * this full range; see `fitDemocracyAxisDomain`.
 */
export function getDemocracyAxisDomain(key: DemocracyIndexKey): { min: number; max: number } {
  if (key === "v-dem" || key === "hdi" || key === "gender-gap" || key === "wjp-rule-of-law") return { min: 0, max: 1 };
  if (key === "economist" || key === "happiness" || key === "gti") return { min: 0, max: 10 };
  if (key === "perception") return { min: -40, max: 40 };
  if (key === "gpi" || key === "etr") return { min: 1, max: 5 };
  if (key === "gdi") return { min: 0, max: 280 };
  // Freedom House, CPI, RSF, Soft Power — 0–100 scores.
  return { min: 0, max: 100 };
}

/** Nice step size near `rough` (1 / 2 / 5 × 10^n). */
function niceStep(rough: number): number {
  if (!Number.isFinite(rough) || rough <= 0) return 1;
  const exp = Math.floor(Math.log10(rough));
  const base = rough / 10 ** exp;
  // Wilkinson-style breakpoints (< 1.5 / 3 / 7) so a rough of 5.03 does not
  // jump to 10× and leave half the chart empty below the data.
  const nice =
    base < 1.5 ? 1 :
    base < 3 ? 2 :
    base < 7 ? 5 :
    10;
  return nice * 10 ** exp;
}

/**
 * Axis domain fitted to the values actually plotted — not the full published
 * scale. If every Gender Gap score sits above 0.5, the axis starts near 0.5
 * instead of zero. Snaps to nice tick boundaries, and refines the step when a
 * coarse snap would leave a large empty band below (or above) the data.
 */
export function fitDemocracyAxisDomain(
  values: readonly number[],
  key: DemocracyIndexKey,
  tickCount = 5,
): { min: number; max: number } {
  const full = getDemocracyAxisDomain(key);
  if (values.length === 0) return full;

  const dataMin = Math.min(...values);
  const dataMax = Math.max(...values);
  const span = dataMax - dataMin;
  const fullSpan = full.max - full.min || 1;

  if (span <= 0) {
    // Single value (or all identical) — open a small window around it.
    const pad = Math.max(fullSpan * 0.05, Math.abs(dataMin) * 0.05 || 0.05);
    let lo = dataMin - pad;
    let hi = dataMax + pad;
    const step = niceStep((hi - lo) / tickCount);
    let niceMin = Math.floor(lo / step) * step;
    let niceMax = Math.ceil(hi / step) * step;
    if (niceMax <= niceMin) niceMax = niceMin + step;
    niceMin = Math.max(niceMin, full.min);
    niceMax = Math.min(niceMax, full.max);
    return niceMax > niceMin ? { min: niceMin, max: niceMax } : full;
  }

  // Prefer a step that covers the DATA span in ~tickCount intervals. Floor /
  // ceil the data ends onto that step so we do not invent empty space below
  // the lowest score (the Gender Gap / Happiness bug with a coarse step of 2
  // snapping 1.4→0).
  let step = niceStep(span / tickCount);
  let niceMin = Math.floor(dataMin / step) * step;
  let niceMax = Math.ceil(dataMax / step) * step;

  // If flooring dropped more than ~20% of the data span below the lowest
  // point, the step is too coarse — try a finer one so the axis hugs the data.
  if ((dataMin - niceMin) / span > 0.2 || (niceMax - dataMax) / span > 0.2) {
    step = niceStep(span / (tickCount + 2));
    niceMin = Math.floor(dataMin / step) * step;
    niceMax = Math.ceil(dataMax / step) * step;
  }

  // Tiny headroom when a point sits exactly on a tick edge.
  if (dataMin - niceMin < step * 0.02) niceMin -= step;
  if (niceMax - dataMax < step * 0.02) niceMax += step;
  if (niceMax <= niceMin) niceMax = niceMin + step;

  // Floating-point tidy for 0–1 scales (HDI / Gender Gap / V-Dem).
  const decimals = step < 0.01 ? 4 : step < 0.1 ? 3 : step < 1 ? 2 : 1;
  const factor = 10 ** decimals;
  niceMin = Math.round(niceMin * factor) / factor;
  niceMax = Math.round(niceMax * factor) / factor;

  // Never invent scores outside the index's published scale (no negative
  // V-Dem / HDI / Gender Gap; no CPI above 100). The fitted window can still
  // start ABOVE the published floor when the data does — that is the point.
  niceMin = Math.max(niceMin, full.min);
  niceMax = Math.min(niceMax, full.max);
  if (niceMax <= niceMin) return full;

  return { min: niceMin, max: niceMax };
}

/** Keep only the part of each classification band that intersects the domain. */
export function clipDemocracyAxisBands(
  bands: readonly DemocracyAxisBand[],
  domain: { min: number; max: number },
): DemocracyAxisBand[] {
  const out: DemocracyAxisBand[] = [];
  for (const band of bands) {
    const min = Math.max(band.min, domain.min);
    const max = Math.min(band.max, domain.max);
    if (max > min) out.push({ label: band.label, min, max });
  }
  return out;
}

/**
 * Indexes whose published category is NOT a cut of the published score.
 * V-Dem's Regimes of the World type is assigned from separate indicators
 * (free multiparty elections, the liberal component), so Malaysia (0.35) is an
 * Electoral Democracy while Singapore (0.36) is an Electoral Autocracy.
 * Freedom House's status combines its Political Rights and Civil Liberties
 * ratings, so Bhutan is Free at 68 while Tanzania is Not Free at 35. No fixed
 * cut-offs can put every country inside its own category, so these axes draw
 * each category across the score range its countries actually span. Where two
 * categories' ranges overlap, the chart shows a shared zone.
 */
const OBSERVED_RANGE_BAND_ORDER: Partial<Record<DemocracyIndexKey, readonly string[]>> = {
  "freedom-house": ["Not Free", "Partly Free", "Free"],
  "v-dem": [
    "Closed Autocracy",
    "Electoral Autocracy",
    "Electoral Democracy",
    "Liberal Democracy",
  ],
};

/** Each category's band = the min…max score its countries carry in COUNTRY_FACTS. */
function observedRangeBands(
  key: DemocracyIndexKey,
  order: readonly string[],
): DemocracyAxisBand[] {
  const ranges = new Map<string, { min: number; max: number }>();
  for (const facts of Object.values(COUNTRY_FACTS)) {
    const idx = getDemocracyIndexFor(facts.democracy, key);
    if (!idx || typeof idx.score !== "number") continue;
    const r = ranges.get(idx.rating);
    if (r) {
      r.min = Math.min(r.min, idx.score);
      r.max = Math.max(r.max, idx.score);
    } else {
      ranges.set(idx.rating, { min: idx.score, max: idx.score });
    }
  }
  const out: DemocracyAxisBand[] = [];
  for (const label of order) {
    const r = ranges.get(label);
    if (r) out.push({ label, min: r.min, max: r.max });
  }
  return out;
}

/**
 * "a–b" step labels (best-first) → contiguous low→high bands [a, a+step].
 * A label names whole steps ("60–69"), but scores carry decimals (0.697,
 * 6.916), so each band must run up to the next band's floor — ending it at
 * "69" left a gap that 69.5 fell into.
 */
function steppedBands(
  labelsBestFirst: readonly string[],
  step: number,
  scale = 1,
): DemocracyAxisBand[] {
  return [...labelsBestFirst].reverse().map((label) => {
    const [lo, hi] = label.split("–").map((v) => Number(v.replace("%", "")));
    const top = Math.max(hi!, lo! + step);
    return { label, min: lo! / scale, max: Math.round((top / scale) * 1e6) / 1e6 };
  });
}

/**
 * Classification bands drawn as labelled regions on a chart axis, low→high.
 * Every country's score MUST lie inside the band named by its own rating, and
 * bands leave no gap a score can fall into (`scripts/check-index-chart-bands.mjs`
 * fails the build otherwise). Boundaries follow each index's published
 * methodology where its category IS a score cut (EIU, CPI, DPI ±5/±15, RSF,
 * WJP, UNDP HDI, IEP GPI/ETR/GTI); V-Dem and Freedom House use observed ranges
 * (see `OBSERVED_RANGE_BAND_ORDER`) that can overlap, so charts render
 * `democracyAxisBandSegments()`, never these bands directly.
 */
export function getDemocracyAxisBands(key: DemocracyIndexKey): DemocracyAxisBand[] {
  const observedOrder = OBSERVED_RANGE_BAND_ORDER[key];
  if (observedOrder) return observedRangeBands(key, observedOrder);
  if (key === "economist") {
    return [
      { label: "Authoritarian", min: 0, max: 4 },
      { label: "Hybrid regime", min: 4, max: 6 },
      { label: "Flawed democracy", min: 6, max: 8 },
      { label: "Full democracy", min: 8, max: 10 },
    ];
  }
  if (key === "cpi") return steppedBands(CPI_BAND_ORDER, 10);
  if (key === "soft-power") return steppedBands(DECADE_SCORE_BAND_ORDER, 10);
  if (key === "perception") {
    return [
      // Integer scores; the report groups −15 as Negative and +15 as Very Positive.
      { label: "Very Negative", min: -40, max: -15.5 },
      { label: "Negative", min: -15.5, max: -5.5 },
      { label: "Neutral", min: -5.5, max: 5.5 },
      { label: "Positive", min: 5.5, max: 14.5 },
      { label: "Very Positive", min: 14.5, max: 40 },
    ];
  }
  if (key === "rsf-press") {
    return [
      { label: "Very serious", min: 0, max: 40 },
      { label: "Difficult", min: 40, max: 55 },
      { label: "Problematic", min: 55, max: 70 },
      { label: "Satisfactory", min: 70, max: 85 },
      { label: "Good", min: 85, max: 100 },
    ];
  }
  // Decade bands on the 0–1 parity scale (score×100).
  if (key === "gender-gap") return steppedBands(GENDER_GAP_BAND_ORDER, 10, 100);
  if (key === "gpi") {
    // IEP 2026 State of Peace cutoffs (lower score = more peaceful).
    return [
      { label: "Very High", min: 1, max: 1.435 },
      { label: "High", min: 1.435, max: 1.903 },
      { label: "Medium", min: 1.903, max: 2.333 },
      { label: "Low", min: 2.333, max: 2.882 },
      { label: "Very Low", min: 2.882, max: 5 },
    ];
  }
  if (key === "etr") {
    // IEP Ecological Threat Report 2025 Appendix A bands (higher = greater threat).
    return [
      { label: "Very Low", min: 1, max: 1.6 },
      { label: "Low", min: 1.6, max: 2.2 },
      { label: "Medium", min: 2.2, max: 3 },
      { label: "High", min: 3, max: 3.8 },
      { label: "Very High", min: 3.8, max: 5 },
    ];
  }
  if (key === "gti") {
    // IEP: a score of exactly 0 is "No Impact"; any recorded impact is at
    // least "Very Low". The published scores have three decimals, so the
    // No Impact strip ends at the smallest non-zero value (0.001).
    return [
      { label: "No Impact", min: 0, max: 0.001 },
      { label: "Very Low", min: 0.001, max: 2 },
      { label: "Low", min: 2, max: 4 },
      { label: "Medium", min: 4, max: 6 },
      { label: "High", min: 6, max: 8 },
      { label: "Very High", min: 8, max: 10 },
    ];
  }
  if (key === "digital-news") return steppedBands(DIGITAL_NEWS_BAND_ORDER, 10);
  if (key === "happiness") return steppedBands(HAPPINESS_BAND_ORDER, 1);
  if (key === "gdi") {
    // Diplomatic posts are whole numbers, so "Below 50" ends where "50–99" begins.
    return [
      { label: "Below 50", min: 0, max: 50 },
      { label: "50–99", min: 50, max: 100 },
      { label: "100–149", min: 100, max: 150 },
      { label: "150–199", min: 150, max: 200 },
      { label: "200–249", min: 200, max: 250 },
      { label: "250+", min: 250, max: 280 },
    ];
  }
  if (key === "wjp-rule-of-law") return steppedBands(WJP_BAND_ORDER, 0.1);
  if (key === "imd-competitiveness") {
    return steppedBands(IMD_COMPETITIVENESS_BAND_ORDER, 10);
  }
  // hdi — UNDP cut-offs (Very High ≥0.800, High ≥0.700, Medium ≥0.550).
  return [
    { label: "Low", min: 0, max: 0.55 },
    { label: "Medium", min: 0.55, max: 0.7 },
    { label: "High", min: 0.7, max: 0.8 },
    { label: "Very High", min: 0.8, max: 1 },
  ];
}

/** A drawable, non-overlapping piece of an axis: one category, or a zone several share. */
export type DemocracyAxisBandSegment = DemocracyAxisBand & {
  /** Every category whose band covers this piece, low→high. */
  categories: string[];
};

/**
 * Turn possibly-overlapping category bands into contiguous segments to draw.
 * A range covered by one category is labelled with it; a range two categories
 * share is labelled "A / B" and flagged as shared; an empty stretch between
 * two categories is split at its midpoint between them, so the axis never has
 * an unlabelled hole between classifications.
 */
export function democracyAxisBandSegments(
  bands: readonly DemocracyAxisBand[],
): DemocracyAxisBandSegment[] {
  const cuts = [...new Set(bands.flatMap((b) => [b.min, b.max]))].sort((a, b) => a - b);
  const raw: DemocracyAxisBandSegment[] = [];
  for (let i = 0; i + 1 < cuts.length; i++) {
    const min = cuts[i]!;
    const max = cuts[i + 1]!;
    const categories = bands
      .filter((b) => b.min <= min && b.max >= max)
      .map((b) => b.label);
    raw.push({ label: categories.join(" / "), min, max, categories });
  }
  // Split empty stretches between their neighbours.
  for (let i = 0; i < raw.length; i++) {
    const seg = raw[i]!;
    if (seg.categories.length > 0) continue;
    const prev = raw[i - 1];
    const next = raw[i + 1];
    if (!prev || !next) continue;
    const mid = (seg.min + seg.max) / 2;
    prev.max = mid;
    next.min = mid;
  }
  const out: DemocracyAxisBandSegment[] = [];
  for (const seg of raw) {
    if (seg.categories.length === 0 || seg.max <= seg.min) continue;
    const last = out[out.length - 1];
    if (last && last.label === seg.label && last.max === seg.min) {
      last.max = seg.max;
    } else {
      out.push({ ...seg, categories: [...seg.categories] });
    }
  }
  return out;
}

/** Format a country's value on one axis for tooltips (classification + score). */
/**
 * The index's own score for one country, formatted the way its publisher
 * reports it (decimals, "score", "posts", "%", signed DPI net). Null when the
 * index carries no score for that country — callers then show the rating alone.
 */
export function formatDemocracyScoreValue(
  key: DemocracyIndexKey,
  idx: DemocracyIndex,
): string | null {
  const score = idx.score;
  if (typeof score !== "number") return null;
  if (key === "perception") return score > 0 ? `+${score}` : `${score}`;
  if (key === "cpi") return `score ${score}`;
  if (key === "v-dem") return score.toFixed(2);
  if (key === "economist") return score.toFixed(2);
  if (key === "rsf-press") return score.toFixed(1);
  if (key === "hdi") return score.toFixed(3);
  if (key === "gender-gap") return score.toFixed(3);
  if (key === "gpi") return score.toFixed(3);
  if (key === "happiness") return score.toFixed(3);
  if (key === "soft-power") return score.toFixed(1);
  if (key === "gdi") return `${score} posts`;
  if (key === "wjp-rule-of-law") return score.toFixed(2);
  if (key === "imd-competitiveness") return `score ${score.toFixed(2)}`;
  if (key === "etr") return score.toFixed(3);
  if (key === "digital-news") return `${score}%`;
  if (key === "gti") return score.toFixed(3);
  return `${score}`;
}

export function formatDemocracyAxisValue(
  key: DemocracyIndexKey,
  idx: DemocracyIndex,
): string {
  const value = formatDemocracyScoreValue(key, idx);
  return value == null ? idx.rating : `${idx.rating} · ${value}`;
}

/** Every country that has a scored value for both chart axes. */
export function democracyChartPoints(
  xKey: DemocracyIndexKey,
  yKey: DemocracyIndexKey,
): Array<{
  code: string;
  x: number;
  y: number;
  xIndex: DemocracyIndex;
  yIndex: DemocracyIndex;
}> {
  const out: Array<{
    code: string;
    x: number;
    y: number;
    xIndex: DemocracyIndex;
    yIndex: DemocracyIndex;
  }> = [];
  for (const [code, facts] of Object.entries(COUNTRY_FACTS)) {
    const xIndex = getDemocracyIndexFor(facts.democracy, xKey);
    const yIndex = getDemocracyIndexFor(facts.democracy, yKey);
    if (!xIndex || typeof xIndex.score !== "number") continue;
    if (!yIndex || typeof yIndex.score !== "number") continue;
    out.push({ code, x: xIndex.score, y: yIndex.score, xIndex, yIndex });
  }
  return out;
}

/** Stable id for an index·rating filter chip (`v-dem::Liberal Democracy`). */
export function democracyIndexRatingId(key: DemocracyIndexKey, rating: string): string {
  return `${key}::${rating}`;
}

export type DemocracyIndexRatingOption = {
  id: string;
  key: DemocracyIndexKey;
  rating: string;
  /** e.g. "V-Dem regime type · Liberal Democracy" */
  label: string;
};

/**
 * Every distinct (index, rating) pair present in bundled country facts, for the
 * chart's Indexes filter. Ordered by `DEMOCRACY_INDEX_KEYS`, then by each
 * index's axis-band order when known, then alphabetically.
 */
export function democracyIndexRatingOptions(): DemocracyIndexRatingOption[] {
  const byKey = new Map<DemocracyIndexKey, Set<string>>();
  for (const facts of Object.values(COUNTRY_FACTS)) {
    if (!facts.democracy) continue;
    for (const key of DEMOCRACY_INDEX_KEYS) {
      const idx = getDemocracyIndexFor(facts.democracy, key);
      if (!idx?.rating) continue;
      let set = byKey.get(key);
      if (!set) {
        set = new Set();
        byKey.set(key, set);
      }
      set.add(idx.rating);
    }
  }

  const out: DemocracyIndexRatingOption[] = [];
  for (const key of DEMOCRACY_INDEX_KEYS) {
    const ratings = byKey.get(key);
    if (!ratings || ratings.size === 0) continue;
    const bandOrder = getDemocracyAxisBands(key).map((b) => b.label);
    const ordered = [...ratings].sort((a, b) => {
      const ia = bandOrder.indexOf(a);
      const ib = bandOrder.indexOf(b);
      if (ia >= 0 && ib >= 0) return ia - ib;
      if (ia >= 0) return -1;
      if (ib >= 0) return 1;
      return a.localeCompare(b, "en");
    });
    const indexLabel = getDemocracyIndexLabel(key);
    for (const rating of ordered) {
      out.push({
        id: democracyIndexRatingId(key, rating),
        key,
        rating,
        label: `${indexLabel} · ${rating}`,
      });
    }
  }
  return out;
}

/** True when the country matches at least one selected index·rating definition. */
export function countryMatchesIndexRatings(
  code: string,
  selectedIds: ReadonlySet<string>,
): boolean {
  if (selectedIds.size === 0) return true;
  const facts = COUNTRY_FACTS[code];
  if (!facts?.democracy) return false;
  for (const id of selectedIds) {
    const sep = id.indexOf("::");
    if (sep < 0) continue;
    const key = id.slice(0, sep) as DemocracyIndexKey;
    const rating = id.slice(sep + 2);
    const idx = getDemocracyIndexFor(facts.democracy, key);
    if (idx?.rating === rating) return true;
  }
  return false;
}

export type DemocracyOlsTrend = {
  /** Predicted Y at X: intercept + slope * x */
  slope: number;
  intercept: number;
  /** Coefficient of determination in [0, 1]. */
  r2: number;
  n: number;
};

/**
 * Ordinary least squares (OLS) linear fit of Y on X for the democracy chart.
 *
 * Chosen over LOESS/LOWESS for this view: country-index scatters are
 * cross-sectional association plots, and a single global linear fit is the
 * standard, interpretable summary of direction and strength (same default as
 * Plotly `trendline="ols"`). LOESS can follow local wiggles but needs a
 * bandwidth parameter and does not answer "overall, do these indexes move
 * together?" as clearly. Requires at least two distinct X values.
 */
export function democracyOlsTrend(
  points: readonly { x: number; y: number }[],
): DemocracyOlsTrend | null {
  const n = points.length;
  if (n < 2) return null;

  let sumX = 0;
  let sumY = 0;
  let sumXX = 0;
  let sumYY = 0;
  let sumXY = 0;
  for (const p of points) {
    sumX += p.x;
    sumY += p.y;
    sumXX += p.x * p.x;
    sumYY += p.y * p.y;
    sumXY += p.x * p.y;
  }

  const denom = n * sumXX - sumX * sumX;
  if (!Number.isFinite(denom) || Math.abs(denom) < 1e-12) return null;

  const slope = (n * sumXY - sumX * sumY) / denom;
  const intercept = (sumY - slope * sumX) / n;

  const ssTot = sumYY - (sumY * sumY) / n;
  const ssRes = points.reduce((acc, p) => {
    const err = p.y - (intercept + slope * p.x);
    return acc + err * err;
  }, 0);
  const r2 = ssTot <= 1e-12 ? 1 : Math.max(0, Math.min(1, 1 - ssRes / ssTot));

  if (!Number.isFinite(slope) || !Number.isFinite(intercept) || !Number.isFinite(r2)) {
    return null;
  }
  return { slope, intercept, r2, n };
}

/**
 * Clip the OLS line y = intercept + slope·x to a rectangular data domain,
 * returning the two endpoints still inside the box (or null if none).
 */
export function clipTrendToDomain(
  trend: DemocracyOlsTrend,
  xDomain: { min: number; max: number },
  yDomain: { min: number; max: number },
): { x0: number; y0: number; x1: number; y1: number } | null {
  const yAt = (x: number) => trend.intercept + trend.slope * x;
  const xAt = (y: number) =>
    Math.abs(trend.slope) < 1e-12 ? NaN : (y - trend.intercept) / trend.slope;

  type Pt = { x: number; y: number };
  const candidates: Pt[] = [];
  const pushIfIn = (x: number, y: number) => {
    if (!Number.isFinite(x) || !Number.isFinite(y)) return;
    const eps = 1e-9;
    if (
      x >= xDomain.min - eps &&
      x <= xDomain.max + eps &&
      y >= yDomain.min - eps &&
      y <= yDomain.max + eps
    ) {
      candidates.push({
        x: Math.min(xDomain.max, Math.max(xDomain.min, x)),
        y: Math.min(yDomain.max, Math.max(yDomain.min, y)),
      });
    }
  };

  // Intersections with the four domain edges.
  pushIfIn(xDomain.min, yAt(xDomain.min));
  pushIfIn(xDomain.max, yAt(xDomain.max));
  pushIfIn(xAt(yDomain.min), yDomain.min);
  pushIfIn(xAt(yDomain.max), yDomain.max);

  // Deduplicate near-identical edge hits (corners).
  const uniq: Pt[] = [];
  for (const p of candidates) {
    if (uniq.some((q) => Math.hypot(q.x - p.x, q.y - p.y) < 1e-6)) continue;
    uniq.push(p);
  }
  if (uniq.length < 2) return null;
  // Furthest pair spans the visible segment.
  let best = { i: 0, j: 1, d: -1 };
  for (let i = 0; i < uniq.length; i++) {
    for (let j = i + 1; j < uniq.length; j++) {
      const d = Math.hypot(uniq[i].x - uniq[j].x, uniq[i].y - uniq[j].y);
      if (d > best.d) best = { i, j, d };
    }
  }
  const a = uniq[best.i];
  const b = uniq[best.j];
  return { x0: a.x, y0: a.y, x1: b.x, y1: b.y };
}
