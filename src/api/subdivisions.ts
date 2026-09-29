import { geoArea } from "d3-geo";
import polygonClipping from "polygon-clipping";
import type { SubdivisionFeatureCollection, SubdivisionGeoFeature } from "../types/subdivision";
import { subdivisionFlagCdnUrl, hasSubdivisionFlag as hasSubdivisionFlagCdn } from "../lib/subdivisionFlagIndex";
import { TERRITORY_GEO_FOR_PARENT } from "../lib/territoryParentMap";
import { fetchWithRetry } from "../lib/fetchWithRetry";

const BASE = import.meta.env.BASE_URL;

type Ring = [number, number][];
type Poly = Ring[];

/** polygon-clipping winds rings opposite to the GeoJSON/d3-geo convention; d3's
 *  spherical geoPath reads a backwards-wound polygon as "everything OUTSIDE it"
 *  (area > a hemisphere), filling the whole map minus a hole. Reverse such rings
 *  so the shape fills its own interior. Same fix as the Western Sahara union in
 *  WorldProgressMap. */
function fixWinding(poly: Poly): Poly {
  return geoArea({ type: "Polygon", coordinates: poly } as never) > 2 * Math.PI
    ? poly.map((ring) => ring.slice().reverse() as Ring)
    : poly;
}

/** Every polygon (ring-set) of a Polygon/MultiPolygon geometry. */
function polygonsOf(geometry: unknown): Poly[] {
  const g = geometry as { type?: string; coordinates?: unknown };
  if (g?.type === "Polygon") return [g.coordinates as Poly];
  if (g?.type === "MultiPolygon") return g.coordinates as Poly[];
  return [];
}

/**
 * Dissolve every feature of a merged territory into ONE feature, so a disputed or
 * dependent territory renders as a single unit WITHOUT its internal subdivision
 * borders — Taiwan is one shape under China (not its 21 counties), Kosovo one
 * shape under Serbia (not its 30 municipalities). All features of a territory geo
 * already share one subdivCode (they are one logical unit), so this only removes
 * the internal borders between them; polygon-clipping unions the polygons,
 * dissolving shared edges. Falls back to simple re-tagging if the territory is a
 * single polygon or the union fails.
 */
function dissolveTerritory(
  features: SubdivisionGeoFeature[],
  subdivCode: string,
): SubdivisionGeoFeature[] {
  const retag = (f: SubdivisionGeoFeature): SubdivisionGeoFeature => ({
    ...f,
    properties: { ...f.properties, iso_3166_2: subdivCode, _isTerritory: true },
  });
  const polys = features.flatMap((f) => polygonsOf(f.geometry));
  if (polys.length <= 1) return features.map(retag);
  try {
    const unioned = polygonClipping.union(
      polys[0] as never,
      ...(polys.slice(1) as never[]),
    ) as unknown as Poly[];
    if (!unioned.length) return features.map(retag);
    const name = features[0]?.properties?.name ?? subdivCode;
    return [
      {
        type: "Feature",
        properties: {
          ...features[0]!.properties,
          name,
          iso_3166_2: subdivCode,
          _isTerritory: true,
        },
        geometry: { type: "MultiPolygon", coordinates: unioned.map(fixWinding) },
      },
    ];
  } catch {
    return features.map(retag);
  }
}

// Local corrected flag overrides (keyed by uppercase ISO 3166-2 code).
// Use these to replace flags from the CDN that contain errors, or to
// supply flags for territory subdivisions not in the subdivision CDN.
//
// DISPUTED-TERRITORY RULE (see CLAUDE.md):
//   When the parent nation has no official flag for a disputed/claimed territory,
//   show the territory's own flag as "(unofficial flag)" — same treatment as
//   France's overseas territories (Réunion, Mayotte, etc.) which lack a distinct
//   official flag and show their local/unofficial flags instead.
//   For standard ISO codes whose CDN flag must be actively suppressed, see
//   SUPPRESSED_SUBDIVISION_FLAGS below.
const LOCAL_FLAG_OVERRIDES: Record<string, string> = {
  // CDN source has a spurious red horizontal stripe; corrected locally.
  "BR-RR": `${BASE}flags/BR-RR.svg`,
  // PY-8 (Misiones Department, Paraguay): the bundled amckenna41/iso3166-flags
  // source was a generic red/navy/white placeholder unrelated to the real flag.
  // Replaced with the correct design (yellow/red/white/blue/green horizontal
  // bands, 2:1:4:1:2), provided directly by the owner as a 1280x860 PNG (~3:2),
  // matching the flag shown at https://www.crwflags.com/fotw/images/p/py-08.gif.
  "PY-8": `${BASE}flags/sub/PY/PY-8.png`,

  // French Southern and Antarctic Lands (TAAF) — official flag adopted 23 Feb
  // 2007 (blue field, French Tricolour canton, white "T.A.A.F" anchor monogram
  // and five stars). Public domain (Xrmap). Excludes Adélie Land (Antarctic
  // claim) — see CLAUDE.md's Antarctic-claim exclusion rule.
  "FR-TF": `${BASE}flags/tf.svg`,

  // ── Disputed / claimed territories — unofficial flags ───────────────────────
  // The claiming nation has no official flag for these territories; we show the
  // territory's own flag labelled "(unofficial flag)" — consistent with how
  // French overseas departments (Réunion, Mayotte, etc.) are handled.
  "CN-TW":  `${BASE}flags/tw.svg`,    // Taiwan ROC flag; PRC does not recognise it
  "MA-EH~": `${BASE}flags/eh.svg`,    // SADR flag; Morocco does not recognise it
  "RS-KM~": `${BASE}flags/xk.svg`,    // Kosovo flag; Serbia does not recognise it
  "SO-SL~": `${BASE}flags/so-sl.svg`,  // Somaliland flag; Somalia does not recognise it
  "CY-NC~": `${BASE}flags/trnc.svg`,  // TRNC flag; Republic of Cyprus does not recognise it
  // Northern Ireland — the Ulster Banner (1953–1973) is the most widely used
  // unofficial symbol internationally. Northern Ireland has no designated official
  // devolved flag; hampusborgos/country-flags serves the United Kingdom national flag
  // (Union Jack) for gb-nir, which violates the "never show parent nation's flag" rule.
  // Source: lipis/flag-icons (via our git history at 5a52412); viewBox="0 0 640 320"
  // (2:1 ratio — Crown heraldic banner proportions, corrected from the lipis 640×480
  // source by wrapping content in <g transform="scale(1,0.6667)">).
  "GB-NIR": `${BASE}flags/sub/GB/GB-NIR.svg`,
  // Akrotiri and Dhekelia (the Sovereign Base Areas) has no official flag of its
  // own — it flies the plain Union Jack by default (no College of Arms grant to
  // base a Blue Ensign-type territory flag on, per FOTW cy^sba.html and Wikipedia's
  // "Flag of Akrotiri and Dhekelia"). Showing the Union Jack would violate the
  // "never show parent nation's flag" rule, so — same treatment as Northern Ireland
  // above — we show the most widely-used local/unofficial flag: the Dhekelia
  // Garrison Flag (green field, two gold lions passant guardant, derived from
  // colonial Cyprus's flag / King Richard I's arms), also used on the King Richard
  // School and Dhekelia Sailing Club emblems. Source: Wikimedia Commons
  // "Flag_of_the_Dhekelia_Garrison.svg" (public domain, UK Government work),
  // 1050×700 (3:2, a real-world proportion).
  "GB-AKD": `${BASE}flags/sub/GB/GB-AKD.svg`,

  // ── ISO 3166-2 code-alias fixes (same territory, different code) ─────────────
  // Like Paris (FR-75 vs FR-75C): the game keys these subdivisions by the code in
  // the Natural Earth topology, but the flag source bundles the flag under the
  // territory's CURRENT ISO 3166-2 code. Without these aliases the lookup misses
  // and a well-known flag is shown as blank. The target files are already bundled
  // under public/flags/sub/<CC>/ (verified same territory by name); we point the
  // game's code at the existing file.
  "MX-DIF": `${BASE}flags/sub/MX/MX-CMX.png`, // Mexico City: Distrito Federal → Ciudad de México (2016)
  // ZA-GT (Gauteng) and ZA-NL (KwaZulu-Natal) used to alias to ZA-GP.png / ZA-KZN.png
  // here — both were the provincial COAT OF ARMS on white, not a flag. Neither
  // province has a flag (FOTW za-.html); both are now in SUPPRESSED_SUBDIVISION_FLAGS
  // (2026-09 subnational flag audit, docs/SUBNATIONAL_FLAG_AUDIT_2026-09.md).
  "TW-TPQ": `${BASE}flags/sub/TW/TW-NWT.svg`, // New Taipei: legacy TW-TPQ → ISO TW-NWT
  "HU-ED":  `${BASE}flags/sub/HU/HU-ER.svg`,  // Érd: legacy HU-ED → ISO HU-ER
  // TT-RCM (Mayaro–Rio Claro) used to alias to TT-MRC.png — the regional
  // corporation's badge, not a flag — now suppressed (see audit ledger).

  // GE-AB (Abkhazia under Georgia) — CDN serves the Abkhazia flag; un-suppressed
  // below so it renders as "(unofficial flag)" under Georgia.
  // ES-GIB~ and AR-ML~ — hidden from Spain's/Argentina's grid via hierarchy; no flag needed.
  // IN-AK~ and IN-GB~ — hidden from India's grid via hierarchy; no flag needed.

  // Territory flags — bundled locally in public/flags/; the subdivision index
  // doesn't cover these national-level dependency codes.
  "DK-GL":  `${BASE}flags/gl.svg`,
  "DK-FO":  `${BASE}flags/fo.svg`,
  "GB-FK":  `${BASE}flags/fk.svg`,
  "GB-JE":  `${BASE}flags/je.svg`,
  "GB-GG":  `${BASE}flags/gg.svg`,
  "GB-IM":  `${BASE}flags/im.svg`,
  "GB-GI":  `${BASE}flags/gi.svg`,
  "GB-IO":  `${BASE}flags/io.svg`,
  "GB-GS":  `${BASE}flags/gs.svg`,
  "NZ-CK":  `${BASE}flags/ck.svg`,
  "NZ-NU":  `${BASE}flags/nu.svg`,
  "FI-AX":  `${BASE}flags/ax.svg`,
  "AU-CC":  `${BASE}flags/cc.svg`,
  // ES-GIB~ (Gibraltar under Spain) — intentionally has NO override.
  // Spain does not recognise a distinct flag for the territory (it claims Gibraltar
  // as part of Cádiz). Also hidden from Spain's grid via DISPUTED_TERRITORY_HIERARCHY.
  "TR-NC~":  `${BASE}flags/trnc.svg`,  // Turkey recognises TRNC — not "unofficial" from Turkey's view

  // Newly added populated territories
  "AU-CX":  `${BASE}flags/cx.svg`,
  "AU-NF":  `${BASE}flags/nf.svg`,
  "US-VI":  `${BASE}flags/vi.svg`,
  "US-AS":  `${BASE}flags/as.svg`,
  "US-GU":  `${BASE}flags/gu.svg`,
  "FR-PF":  `${BASE}flags/pf.svg`,
  "NZ-TK":  `${BASE}flags/tk.svg`,
  "GB-AI":  `${BASE}flags/ai.svg`,
  "GB-BM":  `${BASE}flags/bm.svg`,
  "GB-VG":  `${BASE}flags/vg.svg`,
  "GB-KY":  `${BASE}flags/ky.svg`,
  "GB-MS":  `${BASE}flags/ms.svg`,
  // GB-SH (Saint Helena, Ascension and Tristan da Cunha): the blue ensign defaced
  // with the Saint Helena coat of arms (rocks, sea and a wirebird badge in the
  // fly). hampusborgos/lipis carry the bare Union Jack for `sh` (the parent UK
  // flag) — wrong. Bundled instead from Wikimedia Commons
  // (commons/0/00/Flag_of_Saint_Helena.svg, 1200×600, 2:1 ensign proportions).
  "GB-SH":  `${BASE}flags/sh.svg`,
  "GB-TC":  `${BASE}flags/tc.svg`,
  "GB-PN":  `${BASE}flags/pn.svg`,
  
  // Tibet Autonomous Region — Snow Lion Flag (historical Tibetan flag, unofficial)
  // Source: github.com/rahul2104/react-country-flag-currency-picker (512×336 SVG)
  "CN-XZ":  `${BASE}flags/cn-xz.svg`,

  // IN-AK~ and IN-GB~ — hidden from India's grid via hierarchy; no flag override needed.

  // ── POLICY: show most-used unofficial flag when official flag = national flag ──
  // (Do NOT revert any of these to the French Tricolour without explicit owner approval.)
  //
  // Rule: if a subdivision has no distinct official flag (its official flag is the
  // same as the parent nation's), show the most widely-used local/unofficial flag
  // and label it "Flag not officially recognised by [Country]".
  //
  // Sources: Wikimedia Commons for complex heraldic SVGs; lipis/flag-icons (GitHub)
  // for mq/nc/mf which have no defined real-world proportions (exempt from viewBox check).
  // NEVER generate or approximate flag SVG content — if no authoritative source is accessible,
  // leave the flag absent rather than inventing content. A missing flag is always better than a fake one.
  "FR-GF":  `${BASE}flags/FR-GF.svg`, // green/yellow diagonal with red star; local file
  "FR-MQ":  `${BASE}flags/mq.svg`,    // Martinique serpent flag (lipis/flag-icons); replaces French Tricolour
  "FR-NC":  `${BASE}flags/nc.svg`,    // New Caledonia FLNKS/Kanak flag (lipis/flag-icons); replaces French Tricolour
  // FR-75: Paris. The flag source (amckenna41/iso3166-flags) indexes Paris under the
  // current ISO 3166-2 code "FR-75C" (the Ville de Paris collectivity, 2019), but the
  // game keys Paris by the Natural Earth code "FR-75", so the CDN lookup missed and
  // Paris showed no flag. Bundle the Paris flag locally (armorial banner: blue/red
  // bicolour with the city arms, the ship, and the motto "Fluctuat nec mergitur"),
  // a 1280×854 PNG (3:2) provided directly by the owner. As a metropolitan department,
  // Paris carries NO "(unofficial flag)" label — same as every other French department.
  "FR-75":  `${BASE}flags/sub/FR/FR-75.png`,
  // FR-MF: Saint Martin's own flag — a white field bearing the collectivity's
  // emblem (a brown pelican in flight over a hibiscus, sunrise and a "Saint-Martin"
  // banner). This is the Saint Martin flag, NOT the French Tricolour. Bundled as a
  // 1280×854 PNG (3:2) provided directly by the owner. The lipis/flag-icons and
  // hampusborgos `mf` files are the French Tricolour and must NEVER be used here.
  // (Do NOT revert to the Tricolour, and do NOT re-suppress, without owner approval.)
  "FR-MF":  `${BASE}flags/mf.png`,
  // GP: fonttools/region-flags GP.svg — sourced from Wikimedia Commons
  // (File:Unofficial_flag_of_Guadeloupe_(local).svg, commons/e/e7/). Bundled locally;
  // viewBox "0 0 600 400" (3:2). Replaces the blank Wikimedia URL (wrong filename 0/04/).
  "FR-GP":  `${BASE}flags/gp.svg`,
  // RE: Lö Mahavéli flag (1280×854 PNG, 3:2 ratio). Wikimedia SVG URL was blank on all
  // tested devices (file may not exist or was renamed). PNG bundled directly from user.
  "FR-RE":  `${BASE}flags/re.png`,
  "FR-YT":  `${BASE}flags/yt-local.svg`,  // Mayotte local/unofficial flag
  "FR-BL":  `${BASE}flags/bl.svg`,        // Saint Barthélemy local/unofficial flag
  "FR-PM":  `${BASE}flags/pm.svg`,        // Saint Pierre and Miquelon semi-official flag
  "FR-WF":  `${BASE}flags/wf.svg`,        // Wallis and Futuna local/unofficial flag
};

// Subdivision codes whose CDN flag must be actively suppressed.
// Disputed territories now show their own flag as "(unofficial flag)" rather
// than hiding it entirely, so no codes are suppressed for that reason.
// Codes whose only sourced flag file has a forbidden standardised viewBox
// (640×480, 512×512) are suppressed here until a correctly proportioned
// source is found. The local bad files have been deleted; these entries
// prevent the CDN fallback from serving a wrongly-proportioned substitute.
const SUPPRESSED_SUBDIVISION_FLAGS: ReadonlySet<string> = new Set([
  // Bahrain governorates — no authoritative flag source with correct aspect
  // ratio found; amckenna41/iso3166-flags served 640×480 placeholders.
  "BH-13", "BH-14", "BH-15", "BH-17",
  // Uninhabited external territories with NO official flag and no genuine
  // widely-used local/unofficial one either (unlike GB-NIR's Ulster Banner or
  // GB-AKD's Dhekelia Garrison Flag, which are real, long-used local symbols).
  // The only "unofficial" HIMI design found is Wikimedia's own
  // "Unofficial or FICTITIOUS Flag of Heard Island and McDonald Islands.svg" — a
  // hobbyist vexillology proposal, not a flag any authority or institution
  // actually uses. Bundling it would violate the "never invent/approximate flag
  // content" rule, so no flag is shown rather than an invented one.
  "AU-HM",  // Heard Island and McDonald Islands
  // The nine islands/atolls grouped as "US Minor Outlying Islands" have no
  // collective flag; a couple of individual islands (Wake, Midway) have ad hoc
  // morale-patch-style designs made by rotating station personnel, but nothing
  // rises to a genuine widely-recognised local flag for the merged single entity
  // this app renders (public/subdivisions/UM.json's 8 features are dissolved to
  // one US-UM unit, matching French Polynesia's/Saint Helena's multi-island
  // handling). No flag is shown rather than an invented composite.
  "US-UM",
  // Bulk-downloaded sub/ files that were the parent nation's flag verbatim
  // (caught by check-parent-flag-collision.mjs; the duplicate files were deleted).
  "BA-BRC", // Brčko District — file was the Bosnia & Herzegovina national flag
  "NG-IM",  // Imo State — file was the Nigeria national flag
  "NG-TA",  // Taraba State — file was the Nigeria national flag
  // Bulk-downloaded sub/ files that were blank/degraded (caught by
  // scripts/check-flag-image-quality.mjs; the bad files were deleted). No
  // authoritative non-blank source is accessible, so no flag is shown.
  "NG-AD",  // Adamawa State — amckenna41 CDN file was a near-solid green field
            // with no emblem; the only Wikimedia files (SVG + JPG) are also
            // solid-green stubs. A blank flag is wrong — suppress until a real
            // Adamawa flag can be sourced.
  // Portugal's mainland DISTRICTS (PT-01..PT-18) have NO official flag of their
  // own. The bulk source (amckenna41/iso3166-flags) served — and this repo had
  // bundled for PT-01..07 — the district CAPITAL CITY'S municipal gonfalon (e.g.
  // the "CIDADE DE BEJA" city flag for the Beja district). Using a municipality's
  // flag to represent the district is misleading (owner ruling 2026-07: "do not
  // use municipal flags to represent the district"), so every mainland district is
  // suppressed — no flag and no "(unofficial flag)" label. The municipal PNGs that
  // were bundled (PT-01..05) have been deleted. Portugal's two AUTONOMOUS REGIONS,
  // the Azores (PT-20) and Madeira (PT-30), DO have their own official flags and
  // are intentionally NOT suppressed.
  "PT-01", "PT-02", "PT-03", "PT-04", "PT-05", "PT-06", "PT-07", "PT-08", "PT-09",
  "PT-10", "PT-11", "PT-12", "PT-13", "PT-14", "PT-15", "PT-16", "PT-17", "PT-18",

  // ── 2026-09 subnational flag audit (docs/SUBNATIONAL_FLAG_AUDIT_2026-09.md) ──
  // Every bulk-imported flag was compared with the subdivision's own Wikidata
  // flag (P41), its Wikipedia infobox in the local language, and Flags of the
  // World (FOTW). The codes below showed something that is NOT that
  // subdivision's flag, and no authoritative image of a real one exists, so no
  // flag is shown (a missing flag beats a wrong one). The bundled files were
  // deleted. Evidence for each is in the audit ledger.
  //
  // Parent (national) flag shown as the subdivision's own:
  "AE-FU", // Fujairah — file was the UAE flag; the emirate has flown it since 1975
  //
  // Invented / fictitious designs (no FOTW, Wikidata or Wikipedia record; some
  // tagged {{fictitious flag}} on Commons):
  "ZM-01", "ZM-02", "ZM-03", "ZM-04", "ZM-05", // Zambia — FOTW index (2025-09):
  "ZM-06", "ZM-07", "ZM-08", "ZM-09", "ZM-10", //   no provincial flags exist
  "SO-BK", "SO-GE", "SO-BR", "SO-SH", "SO-BY", // Somalia regions — FOTW records only
  //   Banaadir (kept) and member-state flags; FOTW's Bari/Gedo flags differ
  "GH-AA", "GH-TV", "GH-EP", // Ghana regions — no regional flags (FOTW gh.html);
  //   GH-EP's source file is tagged {{fictitious flag}}
  "GH-AH", // Ashanti — the image is the Asante people's traditional flag, not the region's
  "ZA-EC", "ZA-NC", "ZA-NW", "ZA-WC", // South Africa — only Mpumalanga has a provincial
  //   flag (FOTW za-.html); these Commons files are {{fictitious flag}} (2011)
  "CR-SJ", // San José (CR) — never adopted; the design was used only briefly (FOTW cr-sj)
  //
  // A coat of arms, seal, logo or text placeholder shown as if it were a flag:
  "ZA-LP", "ZA-NL", "ZA-GT", // Limpopo, KwaZulu-Natal, Gauteng — coats of arms
  "RO-MH", "RO-CT", "RO-OT", "RO-SV", "RO-IF", "RO-AG", // Romanian counties — coat of
  "RO-BZ", "RO-BV", "RO-SB", "RO-B", "RO-SM",          //   arms only; FOTW: no flag
  "RO-TM", "RO-HD", // Timiș / Hunedoara — arms-and-lettering logos, no documented flag
  "RO-CS", // Caraș-Severin — its flag is blue with the arms (FOTW); the file was arms only
  "NG-KT", // Katsina — the word "KATSINA" on white; Wikipedia: no sourced flag
  "NG-KE", "NG-FC", // Kebbi (map logo), Federal Capital Territory (Abuja brand logo)
  "NG-EB", // Ebonyi — the state seal, not a flag
  "NG-BA", "NG-KD", // Bauchi, Kaduna — no flag in FOTW, Wikipedia or Commons
  "CU-14", // Guantánamo — the image was the seal of the US NAVAL BASE Guantanamo Bay
  "CU-11", // Holguín — the city's "San Isidoro de Holguín" logo; provinces have no flags
  "DO-05", // Dajabón — "Ayuntamiento Municipal" logo of the town council
  "DO-02", "DO-31", // Azua (a shield), San José de Ocoa (an emblem)
  "TT-DMN", "TT-PRT", "TT-RCM", // Diego Martin, Princes Town, Mayaro–Rio Claro — badges/logos
  "UY-MO", "UY-TA", // Montevideo (black-and-white arms drawing), Tacuarembó (logo)
  "NI-SJ", // Río San Juan — a municipal "Alcaldía" logo
  //
  // A capital CITY's flag shown as the province's flag (the Portugal-district
  // rule: a municipality's flag must not represent the subdivision):
  "CU-06", // Cienfuegos — the city's swallowtail flag
  "NI-CA", "NI-CO", "NI-MD", // Carazo/Chontales/Madriz — flags of Jinotepe/Juigalpa/Somoto
  "NI-MN", // Managua department — the image reads "Ciudad de Managua": the city's flag
  "NI-BO", "NI-CI", "NI-ES", "NI-GR", "NI-LE", // Nicaragua's departments have no elected
  "NI-MS", "NI-MT", "NI-NS", "NI-RI",          //   government or flag of their own: every
  //   one of these images is its capital municipality's flag (Wikidata even files
  //   Carazo/Chontales under Jinotepe/Juigalpa). The capital flags still show in
  //   "View capital". The two autonomous regions (NI-AN, NI-AS) keep their flags.
  "ES-ZA", // Zamora — the city's "Seña Bermeja"; the province has no flag
  "ES-V",  // Valencia province — the Valencian/city senyera; the province has no flag
  "ES-TF", // Santa Cruz de Tenerife province — Tenerife ISLAND's flag
  "IT-CT", "IT-PT", "IT-FG", "IT-BG", "IT-ME", // city flags of Catania, Pistoia, Foggia,
  //   Bergamo, Messina; the provinces have only a gonfalone or no clean flag image
  "IT-AG", "IT-MC", "IT-AP", "IT-VI", // arms-on-white images; the provinces have only
  //   a gonfalone (it.wikipedia), not a flag
  "IT-TR", "IT-UD", // plain yellow/blue and blue/yellow fields: the documented flags carry the
  //   province arms at the centre (it.wikipedia Terni; FOTW/CISV Udine), and no free image of
  //   either exists. 2026-09 audit, batch 6b.
  "IT-TA", // a plain red/blue field in the city's colours; the province has arms and a
  //   gonfalone but no documented flag (FOTW it-ta, it.wikipedia). Batch 6b.
  //
  // No documented flag at all (FOTW: "There is no known flag for the province",
  // or no record anywhere):
  "DO-10", "DO-09", "DO-32", "DO-15", "DO-13", "DO-24",
]);

// Cache so we only fetch each country once per session.
const cache = new Map<string, SubdivisionFeatureCollection | null>();

export async function fetchSubdivisionGeo(
  countryCode: string,
): Promise<SubdivisionFeatureCollection | null> {
  const key = countryCode.toUpperCase();
  if (cache.has(key)) return cache.get(key)!;
  try {
    // Retry transient network failures so a single dropped request doesn't blank
    // the subdivision map (same fragility the world map had).
    const res = await fetchWithRetry(`${BASE}subdivisions/${key}.json`);
    if (!res.ok) {
      // A 4xx is a genuine "no subdivision file for this country" — cache the
      // negative result so we don't re-request it every selection.
      cache.set(key, null);
      return null;
    }
    const data = (await res.json()) as SubdivisionFeatureCollection;
    cache.set(key, data);
    return data;
  } catch {
    // Network error after retries: do NOT cache null — leaving it uncached lets
    // a later selection of the same country try again (a poisoned session cache
    // otherwise keeps the map blank for the rest of the session).
    return null;
  }
}

export async function fetchMergedSubdivisionGeo(
  code: string,
): Promise<SubdivisionFeatureCollection | null> {
  const territoryMappings = TERRITORY_GEO_FOR_PARENT[code] ?? [];
  const [mainGeo, ...territoryGeos] = await Promise.all([
    fetchSubdivisionGeo(code),
    ...territoryMappings.map((t) => fetchSubdivisionGeo(t.geoCode)),
  ]);
  let extraFeatures: SubdivisionGeoFeature[] = territoryGeos.flatMap((geo, i) => {
    const subdivCode = territoryMappings[i]!.subdivCode;
    // Dissolve each territory to a single feature so a disputed/dependent
    // territory shows as one unit, never subdivided (Taiwan, Kosovo, …).
    return dissolveTerritory(geo?.features ?? [], subdivCode);
  });

  // If the parent country is Ukraine (UA), dynamically load Russia (RU) to copy Crimea/Sevastopol features
  if (code.toUpperCase() === "UA") {
    const ruGeo = await fetchSubdivisionGeo("RU");
    if (ruGeo) {
      const crimeaFeatures = ruGeo.features.filter(
        (feat) =>
          feat.properties.iso_3166_2 === "UA-43" ||
          feat.properties.iso_3166_2 === "UA-40",
      );
      extraFeatures = [...extraFeatures, ...crimeaFeatures];
    }
  }

  if (!mainGeo && extraFeatures.length === 0) return null;
  const updatedMainFeatures = (mainGeo?.features ?? []).map((feat) => {
    const subdivCode = feat.properties?.iso_3166_2 || "";
    if (["FR-GF", "FR-GP", "FR-MQ", "FR-RE", "FR-YT"].includes(subdivCode)) {
      return {
        ...feat,
        properties: { ...feat.properties, _isTerritory: true },
      };
    }
    return feat;
  });
  return {
    type: "FeatureCollection",
    features: [...updatedMainFeatures, ...extraFeatures],
  };
}

/**
 * Returns the CDN URL for a subdivision flag, or null if none is indexed.
 * Source: amckenna41/iso3166-flags via jsDelivr.
 */
export function subdivisionFlagUrl(isoCode: string): string | null {
  const key = isoCode.toUpperCase().replace(/_/g, "-");
  if (SUPPRESSED_SUBDIVISION_FLAGS.has(key)) return null;
  return LOCAL_FLAG_OVERRIDES[key] ?? subdivisionFlagCdnUrl(isoCode);
}

export function hasSubdivisionFlag(isoCode: string): boolean {
  const key = isoCode.toUpperCase().replace(/_/g, "-");
  if (SUPPRESSED_SUBDIVISION_FLAGS.has(key)) return false;
  return (key in LOCAL_FLAG_OVERRIDES) || hasSubdivisionFlagCdn(isoCode);
}

