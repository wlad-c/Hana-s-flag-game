/**
 * IOC basis for the world-map grid's "Olympic committees" view.
 *
 * That view (and ONLY that view — flags / arms / passports / football crests
 * stay on the 195 UN members) is drawn from the IOC's 206 current National
 * Olympic Committees instead. Mirrors `fifaAssociations.ts` exactly:
 *
 *   • Game members that hold NO NOC are hidden (NON_IOC_GRID_CODES) — today
 *     that is Vatican City alone, which the National symbols tab already
 *     shows as an honest "no NOC" entry rather than a fabricated one.
 *   • Twelve non-UN territories the IOC recognises as their own NOC (Hong
 *     Kong, Chinese Taipei, Puerto Rico, Aruba, Bermuda, the Cayman Islands,
 *     the British and U.S. Virgin Islands, Guam, American Samoa, the Cook
 *     Islands, and Kosovo) are appended as their own logo card (IOC_EXTRA).
 *     Every one is a territory the game already carries as a special-status
 *     entity — the same set of codes FIFA_EXTRA uses for football, minus the
 *     entities that hold FIFA membership but no IOC one (Macau, the Faroe
 *     Islands, Gibraltar, Anguilla, Montserrat, Turks and Caicos, Curaçao,
 *     New Caledonia, Tahiti — none of which fields its own Olympic team).
 *
 * 194 UN-member NOCs (the 195 minus Vatican) + 12 IOC_EXTRA entities = the
 * IOC's own published count of 206 current NOCs (2026).
 *
 * Each added card carries its OWN continent (not the parent's), and selecting
 * it opens the parent country, whose National symbols tab shows that
 * entity's logo. Kosovo has no parent entity, so its card is informational.
 */
import { NATIONAL_FLAGS } from "../data/nationalFlags";

/**
 * Game (UN-195) members that hold NO IOC-recognised National Olympic
 * Committee, hidden from the Olympic-committees grid only. Vatican City has
 * never had its own NOC (Vatican athletes, on the rare occasion one has
 * competed, do so for another NOC) — its flags, arms and passport still show
 * in those views; this set is consulted for Olympic committees only.
 */
export const NON_IOC_GRID_CODES = new Set<string>([
  "VA", // Vatican City — no IOC-recognised National Olympic Committee
]);

type IocExtra = {
  /** Manifest/entity code (ISO 3166-1 alpha-2 of the territory, or XK for Kosovo). */
  readonly code: string;
  /** Display name on the grid card. */
  readonly name: string;
  /** Parent UN member to select when the card is clicked ("" = none, e.g. Kosovo). */
  readonly parent: string;
  /** The NOC's OWN continent, for the grid's "By continent" grouping. */
  readonly continent: string;
  readonly subcontinent: string;
};

/**
 * The non-UN IOC member National Olympic Committees added to the
 * Olympic-committees grid. Every one is a territory the game already carries
 * as a special-status entity, so its logo lives under that entity's manifest
 * code and also shows in the parent country's National symbols tab. Kosovo
 * is the one non-entity case.
 */
export const IOC_EXTRA: readonly IocExtra[] = [
  { code: "HK", name: "Hong Kong, China", parent: "CN", continent: "Asia", subcontinent: "Eastern Asia" },
  { code: "TW", name: "Chinese Taipei", parent: "CN", continent: "Asia", subcontinent: "Eastern Asia" },
  { code: "XK", name: "Kosovo", parent: "", continent: "Europe", subcontinent: "Southern Europe" },
  { code: "AW", name: "Aruba", parent: "NL", continent: "North America", subcontinent: "Caribbean" },
  { code: "PR", name: "Puerto Rico", parent: "US", continent: "North America", subcontinent: "Caribbean" },
  { code: "VI", name: "U.S. Virgin Islands", parent: "US", continent: "North America", subcontinent: "Caribbean" },
  { code: "BM", name: "Bermuda", parent: "GB", continent: "North America", subcontinent: "North America" },
  { code: "VG", name: "British Virgin Islands", parent: "GB", continent: "North America", subcontinent: "Caribbean" },
  { code: "KY", name: "Cayman Islands", parent: "GB", continent: "North America", subcontinent: "Caribbean" },
  { code: "GU", name: "Guam", parent: "US", continent: "Oceania", subcontinent: "Micronesia" },
  { code: "AS", name: "American Samoa", parent: "US", continent: "Oceania", subcontinent: "Polynesia" },
  { code: "CK", name: "Cook Islands", parent: "NZ", continent: "Oceania", subcontinent: "Polynesia" },
];

export type IocExtraLogo = {
  readonly id: string;
  readonly name: string;
  readonly path: string;
  /** The entity's OWN ISO 3166-1 alpha-2 code (or "XK" for Kosovo) — its own
   *  polygon on the world map, distinct from its parent's. Used so selecting
   *  this card highlights the entity's own borders, never its parent
   *  country's (CLAUDE.md, "The map's highlight and the detail panel must
   *  always be the same entity" — the entity here is the NOC's own owner,
   *  not the administering country). */
  readonly code: string;
  /** Parent country code to select on click, or "" for none. */
  readonly parent: string;
  readonly continent: string;
  readonly subcontinent: string;
};

/**
 * The IOC_EXTRA committees that actually have a bundled logo, ready to append
 * as grid cards. An entry with no logo yet is simply absent (the same
 * missing-beats-wrong discipline as every other symbol). The image path is
 * the entity's own `{code}-olympic-committee` entry in the national-symbols
 * data.
 */
export function iocExtraLogos(): IocExtraLogo[] {
  const out: IocExtraLogo[] = [];
  for (const e of IOC_EXTRA) {
    const own = `${e.code.toLowerCase()}-olympic-committee`;
    const logo = (NATIONAL_FLAGS[e.code] ?? []).find(
      (f) => f.category === "olympiccommittee" && f.path && f.id === own,
    );
    if (!logo?.path) continue;
    out.push({
      id: logo.id,
      name: e.name,
      path: logo.path,
      code: e.code,
      parent: e.parent,
      continent: e.continent,
      subcontinent: e.subcontinent,
    });
  }
  return out;
}
