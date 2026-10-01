/**
 * Subdivision codes whose displayed flag is not the official flag of the
 * governing authority.  Used in two places:
 *   1. SubdivisionFlagGrid — appends "(unofficial flag)" to the name label.
 *   2. LearnPage — shows a contextual note in the subdivision detail panel.
 *
 * Values are the detail-panel note text (one sentence per note).
 */
export const UNOFFICIAL_SUBDIV_NOTES: Record<string, string> = {
  // ── POLICY: show most-used unofficial flag when official flag = national flag ──
  // (Do NOT remove these entries or the corresponding LOCAL_FLAG_OVERRIDES in
  // src/api/subdivisions.ts without explicit owner approval.)
  //
  // France grants no official regional flags; every French department's official
  // flag is the national Tricolour.  For overseas departments with a widely-used
  // local/unofficial regional flag we display that flag instead of the Tricolour
  // and label it "(unofficial flag)" here so users are clearly informed.
  "FR-GF": "This flag is used locally as a regional symbol but has no official legal status. France does not recognise regional flags; the only official national flag is the French Tricolour.",
  "FR-GP": "The flag shown is an unofficial local flag used in cultural and sporting contexts — a black field with a 30-rayed yellow sun, a green sugarcane stalk, and a blue stripe charged with three golden fleurs-de-lis. France does not recognise regional flags; the only official national flag is the French Tricolour.",
  "FR-MQ": "The blue-and-white flag with four gold serpents is a historical informal symbol. France does not recognise regional flags; the only official national flag is the French Tricolour.",
  "FR-RE": "The flag shown is the Lö Mahavéli, designed by Guy Pignolet (1974) and used by several municipal councils since 2003 — a blue field with golden rays radiating from a red depiction of the Piton de la Fournaise volcano. It is the most widely used unofficial symbol of Réunion. France does not recognise regional flags; the only official national flag is the French Tricolour.",
  "FR-YT": "The flag shown is an unofficial local flag bearing Mayotte's coat of arms (a shield with a crescent and ylang-ylang flowers, supported by seahorses) on a white field. France does not recognise regional flags; the only official national flag is the French Tricolour.",
  "FR-BL": "The flag shown is an unofficial local flag bearing Saint Barthélemy's coat of arms on a white field — a shield tierced with three fleurs-de-lis, a Maltese cross, and three golden crowns, with the motto 'Ouanalao'. It has been used informally since the territory separated from Guadeloupe in 2007. France does not recognise regional flags; the only official national flag is the French Tricolour.",
  "FR-MF": "The flag shown is the unofficial emblem flag of Saint Martin, adopted after a design competition won by local artist Claudio Arnell in 2010 — a white field bearing the collectivity's emblem (a pelican with a hibiscus flower, a border obelisk, and a stone slave wall). France does not recognise regional flags; the only official national flag is the French Tricolour.",
  "FR-PM": "The flag shown is a semi-official local flag: a blue field with a yellow depiction of the Grande Hermine (the ship that carried Jacques Cartier to Saint-Pierre in 1535) at the fly, and three vertical panels at the hoist showing the Basque, Breton, and Norman flags — representing the main ancestral origins of the islanders. France does not recognise regional flags; the only official national flag is the French Tricolour.",
  "FR-WF": "The flag shown is an unofficial local flag used at international events such as the Pacific Games — a red field with four white triangles and a French Tricolour canton, derived from a 19th-century cross pattée banner introduced by French missionaries. France does not recognise regional flags; the only official national flag is the French Tricolour.",

  // Northern Ireland — no official devolved flag has been designated. The Ulster Banner
  // (banner of the abolished Government of Northern Ireland, 1953–1973) is the most
  // widely used symbol representing Northern Ireland internationally, including at the
  // Commonwealth Games. The United Kingdom Government has not designated an official regional flag.
  "GB-NIR": "The Ulster Banner was the banner of the Government of Northern Ireland from 1953 until the government was abolished in 1973. Northern Ireland has no officially designated devolved flag; the United Kingdom Government has never designated one. The Ulster Banner remains the most widely used symbol representing Northern Ireland internationally, including at the Commonwealth Games.",

  // Akrotiri and Dhekelia — no College of Arms grant of arms exists to base a
  // Blue Ensign-type territory flag on (unlike most other British Overseas
  // Territories), so the plain Union Jack is flown by default.
  "GB-AKD": "The Dhekelia Garrison Flag — a green field with two gold lions passant guardant, derived from the unofficial flag of British colonial Cyprus and ultimately from King Richard I's arms — is the most widely used local symbol of the territory, also appearing on the King Richard School and Dhekelia Sailing Club emblems. Akrotiri and Dhekelia has no official flag of its own; no grant of arms from the College of Arms exists to base one on, so the plain Union Jack is flown by default.",

  // Tibet Autonomous Region — the Snow Lion Flag belongs to the government-in-exile,
  // not to the PRC-administered region.
  "CN-XZ": "The Snow Lion Flag (first adopted 1959) is the flag of the Central Tibetan Administration, the Tibetan government-in-exile based in Dharamsala, India. It is not recognised by the PRC, which administers the Tibet Autonomous Region and has designated no distinct official regional flag for it.",

  // Abkhazia — the CDN shows the Republic of Abkhazia flag, not a Georgia-recognised regional symbol.
  // (Abkhazia is also a disputed territory — see DISPUTED_SUBDIV_NOTES in disputedSubdivisions.ts.)
  "GE-AB": "The flag shown is that of the self-declared Republic of Abkhazia, not a flag recognised by Georgia (the ISO-administering state). Georgia has no separately designated flag for the region; it regards the Georgian national flag as the only official symbol.",

  // Transnistria under Moldova — the flag of the self-proclaimed Pridnestrovian Moldavian Republic.
  // (Also a disputed territory — see DISPUTED_SUBDIV_NOTES in disputedSubdivisions.ts.)
  "MD-SN": "The flag shown is that of the self-proclaimed Pridnestrovian Moldavian Republic (Transnistria), not a flag recognised by Moldova. Moldova has no separately designated flag for the left bank of the Dniester, which it regards as part of its territory.",

  // Northern Cyprus under Cyprus — the TRNC flag is shown but is not recognised by Cyprus or the UN.
  // (Also a disputed territory — see DISPUTED_SUBDIV_NOTES in disputedSubdivisions.ts.)
  "CY-NC~": "The flag shown is that of the self-declared Turkish Republic of Northern Cyprus (TRNC). Cyprus and virtually all countries other than Türkiye do not recognise the TRNC or its flag; Cyprus regards Northern Cyprus as part of its own sovereign territory.",

  // Free State (South Africa) — no province except Mpumalanga has adopted a flag
  // (FOTW za-.html). FOTW za-fs.html (Bruce Berry, 2 Jan 2022) records that a white
  // flag bearing the provincial arms is flown at the provincial legislature and at
  // public events, so it is shown — labelled — as the de facto flag. The other
  // provinces' arms-on-white images had no such record and are suppressed
  // (2026-09 subnational flag audit).
  "ZA-FS": "South Africa has not given its provinces official flags (only Mpumalanga adopted one). The flag shown — the Free State's coat of arms on a white field — is flown at the provincial legislature and at public events where the province is represented, but it has no official status.",

  // Western Sahara under Morocco — the Sahrawi flag is shown but Morocco does not recognise it.
  // (Also a disputed territory — see DISPUTED_SUBDIV_NOTES in disputedSubdivisions.ts.)
  "MA-EH~": "The flag shown is that of the Sahrawi Arab Democratic Republic (SADR), which claims sovereignty over Western Sahara. Morocco, which administers the territory as its 'Southern Provinces', does not recognise the SADR or its flag.",
};
