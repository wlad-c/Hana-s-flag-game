/**
 * Learn-mode world-map colours for "migrant origins" mode.
 *
 * Select a destination country; every other country is shaded by how many
 * people born there live in the destination (UN DESA International Migrant
 * Stock 2024, absolute stock). Green heatmap matching diaspora benchmark:
 * darker green = more migrants. Destination itself is black (#000000).
 * Origins with no published country-level positive figure stay neutral land
 * (never fabricated; matching diaspora benchmark).
 *
 * Data: src/data/migrantOrigins.ts — never fabricate.
 */
import {
  MIGRANT_ORIGINS,
  MIGRANT_ORIGINS_SOURCE,
} from "../data/migrantOrigins";

export { MIGRANT_ORIGINS_SOURCE };

/** Passport-style toolbar mode: off, or colour by origins into `code`. */
export type MigrantOriginsMapMode =
  | null
  | { kind: "migrant-origins"; code: string };

export function isMigrantOriginsMode(
  mode: MigrantOriginsMapMode,
): mode is { kind: "migrant-origins"; code: string } {
  return typeof mode === "object" && mode !== null && mode.kind === "migrant-origins";
}

/** Green heatmap endpoints (light → dark), matching diaspora benchmark. */
export const MIGRANT_ORIGINS_HEATMAP = {
  light: "#d8f3e0",
  dark: "#004d1a",
  destination: "#000000",
} as const;

/** Discrete legend stops, lightest → darkest, matching diaspora benchmark. */
export const MIGRANT_ORIGINS_HEATMAP_STOPS: readonly string[] = [
  "#d8f3e0",
  "#a8e0b8",
  "#5cb87a",
  "#2d8a4e",
  "#1b7a3d",
  "#004d1a",
];

export const MIGRANT_ORIGINS_COLORS = {
  destination: "#000000",
} as const;

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((x) => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, "0"))
      .join("")
  );
}

/** Map t∈[0,1] onto the green heatmap (0 = lightest / fewest, 1 = darkest / most). */
export function migrantHeatColor(t: number): string {
  const clamped = Math.max(0, Math.min(1, t));
  const [r1, g1, b1] = hexToRgb(MIGRANT_ORIGINS_HEATMAP.light);
  const [r2, g2, b2] = hexToRgb(MIGRANT_ORIGINS_HEATMAP.dark);
  return rgbToHex(lerp(r1, r2, clamped), lerp(g1, g2, clamped), lerp(b1, b2, clamped));
}


/** Map value onto [0, 1] using a logarithmic scale matching diaspora benchmark. */
export function migrantHeatT(value: number, min: number, max: number): number {
  if (!(value > 0) || !(min > 0) || !(max > 0)) return 0;
  if (max === min) return 1;
  const logMin = Math.log(min);
  const logMax = Math.log(max);
  return (Math.log(value) - logMin) / (logMax - logMin);
}

/** Published stock for people born in `origin` living in `destination`, or null if absent/0. */
export function migrantStockFor(
  destination: string,
  origin: string,
): number | null {
  if (destination === origin) return null;
  const row = MIGRANT_ORIGINS[destination];
  if (!row) return null;
  const n = row[origin];
  return typeof n === "number" && n > 0 ? n : null;
}

/** Min / max published positive stocks among origins for `destination` (null if none). */
export function migrantOriginRange(
  destination: string,
): { min: number; max: number; count: number; total: number } | null {
  const row = MIGRANT_ORIGINS[destination];
  if (!row) return null;
  let min = Infinity;
  let max = -Infinity;
  let count = 0;
  let total = 0;
  for (const [origin, v] of Object.entries(row)) {
    if (origin !== destination && typeof v === "number" && v > 0) {
      if (v < min) min = v;
      if (v > max) max = v;
      count++;
      total += v;
    }
  }
  if (count === 0) return null;
  return { min, max, count, total };
}

export function formatMigrantStock(n: number): string {
  return n.toLocaleString("en-US");
}

/**
 * Build fill overrides for the world map when colouring by migrant origins into
 * `destinationCode`. Destination → black; published positive origins → green scale;
 * missing pairs stay uncoloured (neutral land), matching diaspora benchmark.
 */
export function getMigrantOriginsColorOverlay(
  destinationCode: string,
): Map<string, string> | null {
  const range = migrantOriginRange(destinationCode);
  if (!range) return null;
  const overlay = new Map<string, string>();
  overlay.set(destinationCode, MIGRANT_ORIGINS_COLORS.destination);
  const row = MIGRANT_ORIGINS[destinationCode] ?? {};

  for (const [origin, stock] of Object.entries(row)) {
    if (origin !== destinationCode && typeof stock === "number" && stock > 0) {
      overlay.set(
        origin,
        migrantHeatColor(migrantHeatT(stock, range.min, range.max)),
      );
    }
  }
  return overlay;
}
