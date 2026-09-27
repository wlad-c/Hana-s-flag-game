/**
 * Learn-mode world-map colours for diaspora STOCK and FLOW modes.
 *
 * STOCK — foreign-born living in each destination (World Bank 2020).
 * FLOW  — estimated movers during 2015–2020 (Abel & Cohen da_pb_closed).
 *
 * Neither is ethnic/ancestry diaspora. Missing pairs stay neutral land —
 * never fabricated.
 */
import {
  DIASPORA_STOCK,
  DIASPORA_FLOW,
  DIASPORA_STOCK_SOURCE,
  DIASPORA_FLOW_SOURCE,
} from "../data/diaspora";

export {
  DIASPORA_STOCK_SOURCE,
  DIASPORA_FLOW_SOURCE,
  /** @deprecated alias of DIASPORA_STOCK_SOURCE */
  DIASPORA_STOCK_SOURCE as DIASPORA_SOURCE,
};

export type DiasporaMeasure = "stock" | "flow";

/** Selected origin + measure, or null when the layer is off. */
export type DiasporaMapMode =
  | null
  | { kind: DiasporaMeasure; code: string };

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

function matrixFor(kind: DiasporaMeasure): Readonly<Record<string, Readonly<Record<string, number>>>> {
  return kind === "flow" ? DIASPORA_FLOW : DIASPORA_STOCK;
}

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

export function diasporaValueFor(
  kind: DiasporaMeasure,
  origin: string,
  destination: string,
): number | null {
  if (origin === destination) return null;
  const row = matrixFor(kind)[origin];
  if (!row) return null;
  const n = row[destination];
  return typeof n === "number" && n > 0 ? n : null;
}

/** @deprecated Prefer diasporaValueFor("stock", …) */
export function diasporaStockFor(origin: string, destination: string): number | null {
  return diasporaValueFor("stock", origin, destination);
}

export function formatDiasporaNumber(n: number): string {
  return n.toLocaleString("en-US");
}

/** @deprecated Prefer formatDiasporaNumber */
export const formatDiasporaStock = formatDiasporaNumber;

export function diasporaScale(
  kind: DiasporaMeasure,
  origin: string,
): {
  values: ReadonlyMap<string, number>;
  min: number;
  max: number;
  destinations: number;
  total: number;
} | null {
  const row = matrixFor(kind)[origin];
  if (!row) return null;
  const values = new Map<string, number>();
  let min = Infinity;
  let max = -Infinity;
  let total = 0;
  for (const [dest, n] of Object.entries(row)) {
    if (n > 0) {
      values.set(dest, n);
      if (n < min) min = n;
      if (n > max) max = n;
      total += n;
    }
  }
  if (values.size === 0) return null;
  return { values, min, max, destinations: values.size, total };
}

export function diasporaHeatT(value: number, min: number, max: number): number {
  if (!(value > 0) || !(min > 0) || !(max > 0)) return 0;
  if (max === min) return 1;
  const logMin = Math.log(min);
  const logMax = Math.log(max);
  return (Math.log(value) - logMin) / (logMax - logMin);
}

export function getDiasporaColorOverlay(
  kind: DiasporaMeasure,
  originCode: string,
): Map<string, string> | null {
  const scale = diasporaScale(kind, originCode);
  if (!scale) return null;
  const overlay = new Map<string, string>();
  overlay.set(originCode, DIASPORA_HEATMAP.home);
  for (const [dest, value] of scale.values) {
    overlay.set(dest, diasporaHeatColor(diasporaHeatT(value, scale.min, scale.max)));
  }
  return overlay;
}

export function diasporaMeasureLabel(kind: DiasporaMeasure): string {
  return kind === "flow" ? "Moved 2015–2020 (estimated)" : "Living abroad now (foreign-born)";
}

export function diasporaValueNoun(kind: DiasporaMeasure): string {
  return kind === "flow" ? "movers" : "people";
}
