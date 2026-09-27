/**
 * FIFA basis for the world-map grid's "Football associations" view.
 *
 * That view (and ONLY that view — flags / arms / passports stay on the 195 UN
 * members) is drawn from FIFA's ~211 member associations instead:
 *
 *   • Game members that are NOT FIFA members are hidden (NON_FIFA_GRID_CODES) —
 *     the Pacific micro-states with no FIFA/OFC full membership, Monaco and the
 *     Vatican. They have no FIFA crest, so they do not belong in a FIFA grid.
 *   • The UK is expanded into its four home nations (handled in FlagGrid via
 *     subnationalFootballCrests()).
 *   • Every non-UN FIFA member the game already models as a sub-national ENTITY
 *     (Hong Kong, Faroe Islands, Gibraltar, the Caribbean and Pacific
 *     associations, …) plus Kosovo is added as its own crest card (FIFA_EXTRA).
 *
 * Each added card carries its OWN continent (not the parent's — New Caledonia and
 * Tahiti are Oceania though France is Europe), and selecting it opens the parent
 * country, whose National symbols tab shows that entity's crest. Kosovo has no
 * parent entity, so its card is informational.
 */
import { NATIONAL_FLAGS } from "../data/nationalFlags";

/**
 * Game (UN-195) members that are NOT FIFA member associations, hidden from the
 * Football-crests grid only. Monaco and the Vatican, plus the Pacific
 * micro-states that hold no FIFA membership (Marshall Islands, the Federated
 * States of Micronesia, Palau, Nauru, Tuvalu, Kiribati). Their flags, arms and
 * passports still show in those views — this set is consulted for football only.
 */
export const NON_FIFA_GRID_CODES = new Set<string>([
  "MC", // Monaco — not a FIFA member
  "VA", // Vatican City — not a FIFA member (no national team)
  "MH", // Marshall Islands — no FIFA/OFC membership
  "FM", // Federated States of Micronesia — not a FIFA member
  "PW", // Palau — not a FIFA member
  "NR", // Nauru — not a FIFA member
  "TV", // Tuvalu — OFC associate only, not a FIFA member
  "KI", // Kiribati — OFC associate only, not a FIFA member
]);

type FifaExtra = {
  /** Manifest/entity code (ISO 3166-1 alpha-2 of the territory, or XK for Kosovo). */
  readonly code: string;
  /** Display name on the grid card. */
  readonly name: string;
  /** Parent UN member to select when the card is clicked ("" = none, e.g. Kosovo). */
  readonly parent: string;
  /** The association's OWN continent, for the grid's "By continent" grouping. */
  readonly continent: string;
  readonly subcontinent: string;
};

/**
 * The non-UN FIFA member associations added to the Football-crests grid, beyond
 * the UK home nations (which come from the UK's own sub-national crests). Every
 * one is a territory the game already carries as a special-status entity, so its
 * crest lives under that entity's manifest code and also shows in the parent
 * country's National symbols tab. Kosovo is the one non-entity case.
 */
export const FIFA_EXTRA: readonly FifaExtra[] = [
  { code: "HK", name: "Hong Kong", parent: "CN", continent: "Asia", subcontinent: "Eastern Asia" },
  { code: "MO", name: "Macau", parent: "CN", continent: "Asia", subcontinent: "Eastern Asia" },
  { code: "TW", name: "Chinese Taipei", parent: "CN", continent: "Asia", subcontinent: "Eastern Asia" },
  { code: "FO", name: "Faroe Islands", parent: "DK", continent: "Europe", subcontinent: "Northern Europe" },
  { code: "GI", name: "Gibraltar", parent: "GB", continent: "Europe", subcontinent: "Southern Europe" },
  { code: "XK", name: "Kosovo", parent: "", continent: "Europe", subcontinent: "Southern Europe" },
  { code: "AW", name: "Aruba", parent: "NL", continent: "North America", subcontinent: "Caribbean" },
  { code: "CW", name: "Curaçao", parent: "NL", continent: "North America", subcontinent: "Caribbean" },
  { code: "PR", name: "Puerto Rico", parent: "US", continent: "North America", subcontinent: "Caribbean" },
  { code: "VI", name: "U.S. Virgin Islands", parent: "US", continent: "North America", subcontinent: "Caribbean" },
  { code: "AI", name: "Anguilla", parent: "GB", continent: "North America", subcontinent: "Caribbean" },
  { code: "BM", name: "Bermuda", parent: "GB", continent: "North America", subcontinent: "North America" },
  { code: "VG", name: "British Virgin Islands", parent: "GB", continent: "North America", subcontinent: "Caribbean" },
  { code: "KY", name: "Cayman Islands", parent: "GB", continent: "North America", subcontinent: "Caribbean" },
  { code: "MS", name: "Montserrat", parent: "GB", continent: "North America", subcontinent: "Caribbean" },
  { code: "TC", name: "Turks and Caicos Islands", parent: "GB", continent: "North America", subcontinent: "Caribbean" },
  { code: "GU", name: "Guam", parent: "US", continent: "Oceania", subcontinent: "Micronesia" },
  { code: "AS", name: "American Samoa", parent: "US", continent: "Oceania", subcontinent: "Polynesia" },
  { code: "CK", name: "Cook Islands", parent: "NZ", continent: "Oceania", subcontinent: "Polynesia" },
  { code: "NC", name: "New Caledonia", parent: "FR", continent: "Oceania", subcontinent: "Melanesia" },
  { code: "PF", name: "Tahiti", parent: "FR", continent: "Oceania", subcontinent: "Polynesia" },
];

export type FifaExtraCrest = {
  readonly id: string;
  readonly name: string;
  readonly path: string;
  /** The entity's OWN ISO 3166-1 alpha-2 code (or "XK" for Kosovo) — its own
   *  polygon on the world map, distinct from its parent's. Used so selecting
   *  this card highlights the entity's own borders, never its parent
   *  country's (CLAUDE.md, "The map's highlight and the detail panel must
   *  always be the same entity" — the entity here is the crest's own owner,
   *  not the administering/recognising country). */
  readonly code: string;
  /** Parent country code to select on click, or "" for none. */
  readonly parent: string;
  readonly continent: string;
  readonly subcontinent: string;
};

/**
 * The FIFA_EXTRA associations that actually have a bundled crest, ready to append
 * as grid cards. An entry with no crest yet is simply absent (the same
 * missing-beats-wrong discipline as every other crest). The image path is the
 * entity's own `{code}-football-crest` entry in the national-symbols data.
 */
export function fifaExtraCrests(): FifaExtraCrest[] {
  const out: FifaExtraCrest[] = [];
  for (const e of FIFA_EXTRA) {
    const own = `${e.code.toLowerCase()}-football-crest`;
    const crest = (NATIONAL_FLAGS[e.code] ?? []).find(
      (f) => f.category === "footballcrest" && f.path && f.id === own,
    );
    if (!crest?.path) continue;
    out.push({
      id: crest.id,
      name: e.name,
      path: crest.path,
      code: e.code,
      parent: e.parent,
      continent: e.continent,
      subcontinent: e.subcontinent,
    });
  }
  return out;
}
