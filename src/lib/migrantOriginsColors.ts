/**
 * Learn-mode world-map colours for "migrant origins" mode.
 *
 * Select a destination country; every other country is shaded by how many
 * people born there live in the destination (UN DESA International Migrant
 * Stock 2024, absolute stock). Bluescale heatmap: darker = more migrants.
 * Destination itself is black. Origins with no published country-level figure
 * are grey (missing ≠ zero).
 *
 * Data: src/data/migrantOrigins.ts — never fabricate.
 */
import {
  MIGRANT_ORIGINS,
  MIGRANT_ORIGINS_SOURCE,
} from "../data/migrantOrigins";
import { UN_MEMBER_CODES } from "./unMemberStates";

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

/**
 * Blue stops for the continuous heatmap (light → dark). Sampled per destination
 * between that destination's min and max published origin stocks.
 * Deliberately NOT the green→red index palette — product request.
 */
export const MIGRANT_ORIGINS_BLUE = [
  "#dbeafe", // lightest (fewest / zero)
  "#93c5fd",
  "#3b82f6",
  "#1d4ed8",
  "#1e3a8a", // darkest (most)
] as const;

export const MIGRANT_ORIGINS_COLORS = {
  destination: "#000000",
  /** No country-level figure published for this origin→destination pair. */
  noData: "#c5cbd3",
} as const;

/** Interpolate `t` ∈ [0,1] across MIGRANT_ORIGINS_BLUE. */
export function migrantBlueAt(t: number): string {
  const palette: readonly string[] = MIGRANT_ORIGINS_BLUE;
  const x = Math.min(1, Math.max(0, t));
  if (palette.length <= 1) return palette[0] ?? "#dbeafe";
  const scaled = x * (palette.length - 1);
  const i = Math.floor(scaled);
  const f = scaled - i;
  if (i >= palette.length - 1) return palette[palette.length - 1];
  return mixHex(palette[i], palette[i + 1], f);
}

function mixHex(a: string, b: string, t: number): string {
  const ar = parseInt(a.slice(1, 3), 16);
  const ag = parseInt(a.slice(3, 5), 16);
  const ab = parseInt(a.slice(5, 7), 16);
  const br = parseInt(b.slice(1, 3), 16);
  const bg = parseInt(b.slice(3, 5), 16);
  const bb = parseInt(b.slice(5, 7), 16);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${bl.toString(16).padStart(2, "0")}`;
}

/** Published stock for people born in `origin` living in `destination`, or null if absent. */
export function migrantStockFor(
  destination: string,
  origin: string,
): number | null {
  if (destination === origin) return null;
  const row = MIGRANT_ORIGINS[destination];
  if (!row) return null;
  const n = row[origin];
  return typeof n === "number" ? n : null;
}

/** Min / max published stocks among origins for `destination` (null if none). */
export function migrantOriginRange(
  destination: string,
): { min: number; max: number; count: number } | null {
  const row = MIGRANT_ORIGINS[destination];
  if (!row) return null;
  const values = Object.values(row);
  if (values.length === 0) return null;
  let min = values[0];
  let max = values[0];
  for (const v of values) {
    if (v < min) min = v;
    if (v > max) max = v;
  }
  return { min, max, count: values.length };
}

export function formatMigrantStock(n: number): string {
  return n.toLocaleString("en-US");
}

/**
 * Build fill overrides for the world map when colouring by migrant origins into
 * `destinationCode`. Destination → black; published origins → blue scale;
 * other UN members → no-data grey. Never invents a stock.
 */
export function getMigrantOriginsColorOverlay(
  destinationCode: string,
): Map<string, string> {
  const overlay = new Map<string, string>();
  const row = MIGRANT_ORIGINS[destinationCode] ?? {};
  const range = migrantOriginRange(destinationCode);
  const span = range && range.max > range.min ? range.max - range.min : 0;

  for (const code of UN_MEMBER_CODES) {
    if (code === destinationCode) {
      overlay.set(code, MIGRANT_ORIGINS_COLORS.destination);
      continue;
    }
    const stock = row[code];
    if (typeof stock !== "number") {
      overlay.set(code, MIGRANT_ORIGINS_COLORS.noData);
      continue;
    }
    const t = span === 0 ? 1 : (stock - range!.min) / span;
    overlay.set(code, migrantBlueAt(t));
  }
  return overlay;
}
