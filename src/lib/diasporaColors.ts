/**
 * Learn-mode world-map colours for "diaspora from country X" mode.
 *
 * Destination countries are painted as a green heatmap of how many people
 * born in the selected origin live there (UN DESA International Migrant
 * Stock). Darker green = larger stock; lighter green = smaller stock.
 * The selected origin itself is black. Destinations with no sourced positive
 * stock stay the neutral land colour — never fabricated.
 *
 * Data: src/data/diaspora.ts (generated from UN DESA 2024 — never invent).
 */
import { DIASPORA, DIASPORA_SOURCE } from "../data/diaspora";

export { DIASPORA_SOURCE };

/** Selected origin ISO code, or null when the layer is off. */
export type DiasporaMapMode = string | null;

/** Green heatmap endpoints (light → dark). */
export const DIASPORA_HEATMAP = {
  light: "#d8f3e0",
  dark: "#004d1a",
  home: "#000000",
} as const;

/** Discrete legend stops, lightest → darkest. */
export const DIASPORA_HEATMAP_STOPS: readonly string[] = [
  "#d8f3e0",
  "#a8e0b8",
  "#5cb87a",
  "#2d8a4e",
  "#1b7a3d",
  "#004d1a",
];

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
export function diasporaHeatColor(t: number): string {
  const clamped = Math.max(0, Math.min(1, t));
  const [r1, g1, b1] = hexToRgb(DIASPORA_HEATMAP.light);
  const [r2, g2, b2] = hexToRgb(DIASPORA_HEATMAP.dark);
  return rgbToHex(lerp(r1, r2, clamped), lerp(g1, g2, clamped), lerp(b1, b2, clamped));
}

export function diasporaStockFor(origin: string, destination: string): number | null {
  if (origin === destination) return null;
  const row = DIASPORA[origin];
  if (!row) return null;
  const n = row[destination];
  return typeof n === "number" && n > 0 ? n : null;
}

export function formatDiasporaStock(n: number): string {
  return n.toLocaleString("en-US");
}

/**
 * Destinations with a positive stock for `origin`, plus min/max used to scale
 * the heatmap. Returns null when the origin has no sourced diaspora rows.
 */
export function diasporaScale(origin: string): {
  stocks: ReadonlyMap<string, number>;
  min: number;
  max: number;
  destinations: number;
  totalAbroad: number;
} | null {
  const row = DIASPORA[origin];
  if (!row) return null;
  const stocks = new Map<string, number>();
  let min = Infinity;
  let max = -Infinity;
  let totalAbroad = 0;
  for (const [dest, n] of Object.entries(row)) {
    if (n > 0) {
      stocks.set(dest, n);
      if (n < min) min = n;
      if (n > max) max = n;
      totalAbroad += n;
    }
  }
  if (stocks.size === 0) return null;
  return { stocks, min, max, destinations: stocks.size, totalAbroad };
}

/**
 * Log-scaled t∈[0,1] for a stock relative to an origin's min/max.
 * Equal min/max (single destination) → full dark green.
 */
export function diasporaHeatT(stock: number, min: number, max: number): number {
  if (!(stock > 0) || !(min > 0) || !(max > 0)) return 0;
  if (max === min) return 1;
  const logMin = Math.log(min);
  const logMax = Math.log(max);
  return (Math.log(stock) - logMin) / (logMax - logMin);
}

/**
 * Build the fill override map for holders-of-origin living abroad.
 * Origin country → black; destinations with stock → green heatmap.
 */
export function getDiasporaColorOverlay(originCode: string): Map<string, string> | null {
  const scale = diasporaScale(originCode);
  if (!scale) return null;
  const overlay = new Map<string, string>();
  overlay.set(originCode, DIASPORA_HEATMAP.home);
  for (const [dest, stock] of scale.stocks) {
    overlay.set(dest, diasporaHeatColor(diasporaHeatT(stock, scale.min, scale.max)));
  }
  return overlay;
}
