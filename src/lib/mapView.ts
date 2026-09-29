/**
 * User-controlled "view centre" settings for the world map.
 *
 * Centre longitude is the meridian that ends up running through the middle
 * of the rendered map — passed to d3-geo as `.rotate([-centerLongitude, 0])`.
 * 0° is the Greenwich-standard "Atlantic" view; 180° is the "Pacific" view;
 * etc. Persisted to localStorage so the user's preferred orientation
 * survives reloads.
 *
 * `southUp` flips the map vertically (south on top, east still on right —
 * mirrored vertically, NOT rotated 180°). Applied as an SVG transform on
 * the outer <g> so the projection itself stays canonical.
 */

export type MapViewSettings = {
  /** Central meridian in degrees, -180..180. 0 = Greenwich (Atlantic view). */
  centerLongitude: number;
  /** When true, the map is mirrored vertically — south at the top. */
  southUp: boolean;
  /**
   * When true, the modern (Today) world map draws every country's bundled
   * sub-national borders as a lighter dashed overlay. Purely decorative —
   * clicks still select the country. Persisted with the other view settings.
   */
  showSubnationalBorders: boolean;
  /**
   * When true, the Learn map is drawn as a draggable orthographic globe
   * instead of the canonical Equal Earth map. Opt-in; defaults to false.
   */
  globe: boolean;
};

export type MapViewPreset = {
  /** Short display label for the popover. */
  label: string;
  /** Central meridian in degrees. */
  longitude: number;
  /** One-line description shown as the button title / tooltip. */
  description: string;
};

/** Built-in centring presets, ordered most-to-least familiar in Western atlases. */
export const MAP_VIEW_PRESETS: readonly MapViewPreset[] = [
  { label: "Atlantic",   longitude: 0,    description: "Europe + Africa centred (default; Greenwich meridian)" },
  { label: "Pacific",    longitude: 180,  description: "Asia + Pacific centred — common in Australia / NZ / E. Asia" },
  { label: "Americas",   longitude: -95,  description: "North + South America at the centre" },
  { label: "Africa",     longitude: 30,   description: "Africa squarely in the middle (Cairo meridian)" },
  { label: "East Asia",  longitude: 110,  description: "China + SE Asia centred" },
];

export const DEFAULT_MAP_VIEW: MapViewSettings = {
  centerLongitude: 0,
  southUp: false,
  showSubnationalBorders: false,
  globe: false,
};

const STORAGE_KEY = "hana-flag-game.map-view";

/** Load the user's saved view from localStorage, falling back to defaults. */
export function loadMapView(): MapViewSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_MAP_VIEW;
    const parsed = JSON.parse(raw) as Partial<MapViewSettings>;
    return {
      centerLongitude:
        typeof parsed.centerLongitude === "number"
          ? clampLongitude(parsed.centerLongitude)
          : DEFAULT_MAP_VIEW.centerLongitude,
      southUp: !!parsed.southUp,
      showSubnationalBorders: !!parsed.showSubnationalBorders,
      globe: !!parsed.globe,
    };
  } catch {
    return DEFAULT_MAP_VIEW;
  }
}

export function saveMapView(s: MapViewSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    // ignore — quota or no-storage browser
  }
}

/** Clamp to the canonical -180..180 range. Wraps a value like 270 → -90. */
export function clampLongitude(lon: number): number {
  // Normalise to (-180, 180]
  let v = ((lon + 180) % 360 + 360) % 360 - 180;
  if (v === -180) v = 180;
  return Math.round(v * 10) / 10; // tenth-of-a-degree precision is plenty
}

/**
 * Approximate equality used to highlight the active preset in the picker —
 * the slider can land near a preset value (within 0.5°) and we still want
 * the preset chip to look selected.
 */
export function isSamePreset(viewLon: number, presetLon: number): boolean {
  return Math.abs(clampLongitude(viewLon - presetLon)) < 0.5;
}
