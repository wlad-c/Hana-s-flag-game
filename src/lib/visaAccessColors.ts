/**
 * Learn-mode world-map colours for "visa access by passport" mode.
 *
 * Categories and fills are fixed by product request:
 *   visa-free        → green
 *   visa-on-arrival  → blue
 *   evisa (e-visa + eta) → yellow
 *   visa-required    → red
 *   home (selected passport) → purple
 *   no-admission     → dark grey (sourced Passport Index state; rare)
 *
 * Data: src/data/visaAccess.ts (generated from Passport Index — never fabricate).
 */
import {
  VISA_ACCESS,
  VISA_ACCESS_SOURCE,
  type VisaAccessCategory,
} from "../data/visaAccess";

export { VISA_ACCESS_SOURCE };
export type { VisaAccessCategory };

/** Passport map toolbar mode: off, cover-colour layer, or visa-access for a code. */
export type PassportMapMode =
  | null
  | "covers"
  | { kind: "visa"; code: string };

export function isVisaPassportMode(
  mode: PassportMapMode,
): mode is { kind: "visa"; code: string } {
  return typeof mode === "object" && mode !== null && mode.kind === "visa";
}

export function isPassportCoversMode(mode: PassportMapMode): mode is "covers" {
  return mode === "covers";
}

/** Hex fills for each visa-access category (and the selected home country). */
export const VISA_ACCESS_COLORS = {
  "visa-free": "#1b7a3d",
  "visa-on-arrival": "#2563eb",
  evisa: "#ca8a04",
  "visa-required": "#dc2626",
  "no-admission": "#4b5563",
  home: "#7c3aed",
} as const;

export type VisaAccessLegendKey = keyof typeof VISA_ACCESS_COLORS;

export const VISA_ACCESS_LEGEND: readonly {
  key: VisaAccessLegendKey;
  label: string;
}[] = [
  { key: "visa-free", label: "Visa free" },
  { key: "visa-on-arrival", label: "Visa on arrival" },
  { key: "evisa", label: "eVisa / ETA" },
  { key: "visa-required", label: "Visa required" },
  { key: "no-admission", label: "No admission" },
  { key: "home", label: "Selected passport" },
];

export function visaAccessCategoryLabel(cat: VisaAccessCategory | "home"): string {
  if (cat === "home") return "Selected passport";
  if (cat === "visa-free") return "Visa free";
  if (cat === "visa-on-arrival") return "Visa on arrival";
  if (cat === "evisa") return "eVisa / ETA";
  if (cat === "visa-required") return "Visa required";
  if (cat === "no-admission") return "No admission";
  return cat;
}

/** Category for holders of `passport` travelling to `destination`. */
export function visaAccessCategoryFor(
  passport: string,
  destination: string,
): VisaAccessCategory | "home" | null {
  if (passport === destination) return "home";
  const row = VISA_ACCESS[passport];
  if (!row) return null;
  return row[destination] ?? null;
}

/**
 * Build the fill override map for the world map when colouring by visa access
 * for holders of `passportCode`. Home is purple; every sourced destination
 * takes its category colour. Destinations with no row are omitted (neutral land).
 */
export function getVisaAccessColorOverlay(
  passportCode: string,
): Map<string, string> | null {
  const row = VISA_ACCESS[passportCode];
  if (!row) return null;
  const overlay = new Map<string, string>();
  overlay.set(passportCode, VISA_ACCESS_COLORS.home);
  for (const [dest, cat] of Object.entries(row)) {
    const hex = VISA_ACCESS_COLORS[cat];
    if (hex) overlay.set(dest, hex);
  }
  return overlay;
}
