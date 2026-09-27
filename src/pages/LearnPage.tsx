import { UiIcon } from "../components/UiIcon";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { bundledCountries, fetchCountries, type Country } from "../api/countries";
import { FLAG_ADOPTION_YEAR } from "../data/flagAdoptionYears";
import { ERA_EXTENT_CAVEATS } from "../data/polityExistence";
import { WorldProgressMap } from "../components/WorldProgressMap";
import { HistoricalMap } from "../components/HistoricalMap";
import { EraPicker } from "../components/EraPicker";
import { ToolbarOverflow } from "../components/ToolbarOverflow";
import { SubdivisionDropdown } from "../components/SubdivisionDropdown";
import { CountryDropdown } from "../components/CountryDropdown";
import { SITE_TOPBAR_LEFT_SLOT_ID } from "../components/Topbar";
import { SubdivisionMap } from "../components/SubdivisionMap";
import { useZoomPan } from "../hooks/useZoomPan";
import { MapViewControl } from "../components/MapViewControl";
import { DemocracyMapControl } from "../components/DemocracyMapControl";
import { DemocracyMapLegend } from "../components/DemocracyMapLegend";
import { PassportMapControl } from "../components/PassportMapControl";
import { VisaAccessMapLegend } from "../components/VisaAccessMapLegend";
import { DiasporaMapControl } from "../components/DiasporaMapControl";
import { DiasporaMapLegend } from "../components/DiasporaMapLegend";
import { DemocracyIndexChart } from "../components/DemocracyIndexChart";
import type { ChartAxisSelection } from "../lib/chartAxes";
import {
  type DemocracyMapMode,
  getDemocracyColorOverlay,
  isPersonaMapMode,
  isWvsMapMode,
} from "../lib/democracyColors";
import { getPersonaColorOverlay } from "../lib/countryPersonas";
import { PersonaMapChart } from "../components/PersonaMapChart";
import { getWvsColorOverlay } from "../lib/wvsResults";
import { getMapDataTooltip } from "../lib/mapDataTooltip";
import {
  loadMapView,
  saveMapView,
  type MapViewSettings,
} from "../lib/mapView";
import { FlagGrid } from "../components/FlagGrid";
import { SubdivisionFlagTabs } from "../components/SubdivisionFlagTabs";
import { topLevelContinent, type FlagListEntry } from "../lib/flagList";
import {
  coatOfArmsPath,
  passportPath,
  footballCrestPath,
  olympicCommitteePath,
  footballCrestById,
  olympicCommitteeById,
  nationalSymbolEntry,
} from "../lib/nationalSymbolImages";
import { NATIONAL_FLAG_MEANINGS } from "../data/nationalFlags";
import { PASSPORT_COLORS } from "../data/passportColors";
import {
  getVisaAccessColorOverlay,
  isPassportCoversMode,
  isVisaPassportMode,
  visaAccessCategoryFor,
  visaAccessCategoryLabel,
  VISA_ACCESS_COLORS,
  type PassportMapMode,
} from "../lib/visaAccessColors";
import {
  diasporaScale,
  diasporaValueFor,
  formatDiasporaNumber,
  getDiasporaColorOverlay,
  type DiasporaMapMode,
} from "../lib/diasporaColors";
import { meaningLabel, symbolNoun } from "../lib/nationalFlags";
import { withFootballCrestStats } from "../lib/footballCrestStats";
import {
  loadGridContentType,
  saveGridContentType,
  type GridContentType,
} from "../lib/gridContentType";
import {
  applyLogoBackdropTone,
  sizeFullscreenLogo,
} from "../lib/logoBackdrop";
import { FLAG_SHAPES } from "../lib/flagShapes";
import { FLAG_FAMILIES } from "../lib/flagFamilies";
import { FLAG_COLORS } from "../lib/flagColors";
import { FLAG_SIMILARITIES } from "../lib/flagSimilarity";
import { getDriveSide } from "../lib/flagDriveSide";
import { FLAG_ASPECT_RATIOS } from "../lib/flagAspectRatio";
import { EntitySummary } from "../components/EntitySummary";
import { FlagMeaning } from "../components/FlagMeaning";
import { LearnInfoTabs } from "../components/LearnInfoTabs";
import { LearnPanelCategoryBody } from "../components/LearnPanelCategoryBody";
import { LearnPanelSymbolBody } from "../components/LearnPanelSymbolBody";
import { OverviewIdentity, type OverviewIdentityKind } from "../components/OverviewIdentity";
import { TravelVisitorStats } from "../components/TravelVisitorStats";
import {
  LEARN_PANEL_FINANCE_SECTIONS,
  LEARN_PANEL_MEDIA_SECTIONS,
  LEARN_PANEL_SPORTS_SECTIONS,
  LEARN_PANEL_SUBDIVISION_TABS,
  LEARN_PANEL_TRAVEL_SECTIONS,
  financeSectionForGridContent,
  mediaSectionForGridContent,
  panelTabForGridContent,
  sportsSectionForGridContent,
  travelSectionForGridContent,
  type LearnPanelFinanceSection,
  type LearnPanelMediaSection,
  type LearnPanelSportsSection,
  type LearnPanelTabId,
  type LearnPanelTravelSection,
} from "../lib/learnPanelTabs";
import {
  selectionKeyForPanel,
} from "../lib/learnPanelDrawer";
import { worldCityMarkers, subdivisionCityMarkers, subdivisionCapital } from "../lib/cityRoles";
import { SubdivisionPopulation } from "../components/SubdivisionPopulation";
import { NATIONAL_CAPITAL_DETAILS } from "../data/nationalCapitalDetails";
import { NATIONAL_CAPITAL_FLAG_MEANINGS } from "../data/nationalCapitalFlagMeanings";
import { NATIONAL_REFERENCE_POPULATION } from "../data/subdivisionPopulation";
import { formatPopulation } from "../lib/formatPopulation";
import { normalizeForSearch } from "../lib/searchNormalize";
import { CapitalDetails } from "../components/CapitalDetails";
import { NationalFlagDetails } from "../components/NationalFlagDetails";
import { PoliticalPartyDetails } from "../components/PoliticalPartyDetails";
import { AirlineDetails } from "../components/AirlineDetails";
import { BroadcasterDetails } from "../components/BroadcasterDetails";
import { TourismLogoDetails } from "../components/TourismLogoDetails";
import { NewsAgencyDetails } from "../components/NewsAgencyDetails";
import { NewspaperDetails } from "../components/NewspaperDetails";
import type { CommercialAirline } from "../types/airline";
import type { PublicBroadcaster } from "../types/broadcaster";
import type { TourismLogo } from "../types/tourismLogo";
import type { NewsAgency } from "../types/newsAgency";
import type { Newspaper } from "../types/newspaper";
import type { PoliticalParty } from "../data/politicalParties";
import type { NationalFlag } from "../data/nationalFlags";
import type { FlagMeaning as FlagMeaningData } from "../data/flagMeanings";
import { NationalAnthemPlayer } from "../components/NationalAnthemPlayer";
import {
  loadStoredSelection,
  saveStoredSelection,
} from "../lib/countrySelection";
import { FLAG_DATA_EVENT } from "../lib/profileSync";
import {
  DEFAULT_ERA_ID,
  ERAS,
  eraAllowsModernFlagFallback,
  getEra,
  curatedFlagValidInEra,
  curatedRulerFor,
  flagExistedInEra,
  eraRuler,
  noFlagIsEraSpecific,
  polityDisplayName,
  polityContinent,
  polityInfo,
  polityModernName,
  rulerDisplayName,
  type Era,
} from "../lib/historicalEras";
import { subdivisionFlagUrl, fetchMergedSubdivisionGeo } from "../api/subdivisions";
import { getPlayableSubdivisions } from "../lib/playableSubdivisions";
import { SUBDIVISION_META } from "../lib/subdivisionMeta";
import { SUBDIVISION_ENDONYMS } from "../data/subdivisionEndonyms";
import { UNOFFICIAL_SUBDIV_NOTES } from "../lib/unofficialSubdivFlags";
import { DISPUTED_SUBDIV_NOTES } from "../lib/disputedSubdivisions";
import { NSGT_CODES } from "../lib/nsgtTerritories";
import {
  TERRITORY_NAME,
  PARENT_TERRITORIES,
  DISPUTED_TERRITORY_CODES,
  UNDISPUTED_TERRITORY_PARENT,
} from "../lib/territoryParentMap";
import type { SubdivisionFeatureCollection, SubdivisionMeta } from "../types/subdivision";
import "../App.css";
import "./LearnPage.css";
import "./LearnAtlas.css";

// Codes where flagcdn.com serves a politically incorrect flag.
// These must never fall back to flagcdn — show broken image instead.
const FLAGCDN_FALLBACK_EXCLUDED = new Set(["AF"]);

// Feature flag for the city overlay (⭐ capitals toggle). Kept as a single
// switch so the whole feature can be pulled from the UI again without ripping
// out the data/markers/wiring — flipping it to `false` gates the two toggle
// buttons, and since `showCities` can only flip via those buttons, the overlay
// and legend (both downstream of `showCities`) then never render.
const CITIES_FEATURE_ENABLED = true;

/**
 * Learn-mode sandbox with a historical era slider.
 *
 * Two map back-ends:
 *  - WorldProgressMap (modern world-atlas) is rendered when era === "today".
 *  - HistoricalMap (hand-curated GeoJSON per era from
 *    aourednik/historical-basemaps) is rendered for every other era.
 *
 * Selection model differs slightly:
 *  - Modern: a Country object (ISO alpha-2 code, modern flag URL).
 *  - Historical: a polity name string plus lookup in POLITY_REGISTRY for
 *    flag / continent / note.
 *
 * Default era is always "today" so first-time visitors see the current
 * world. Switching eras resets the current selection.
 */

type ModernSelection = { kind: "modern"; country: Country };
type HistoricalSelection = {
  kind: "historical";
  name: string;
  flag?: string;
  continent?: string;
  note?: string;
  /** Scholarly population estimate at the polity's peak. Optional. */
  population?: number;
  /** Ruling power from the dataset's own SUBJECTO field, when it differs from
   *  the polity itself (Belgian Congo → Belgium). Shown as a "Ruled by" row. */
  ruledBy?: string;
  /** True when the flag shown is the RULER's, not the polity's own — the panel
   *  says so, so a colony's card never implies it had its own national flag. */
  flagIsRulers?: true;
  /** True when this polity's extent came from modern administrative boundaries
   *  rather than a sourced period border. */
  approximateExtent?: true;
  /** Set when no flag is shown BECAUSE the modern one postdates the era. Lets the
   *  panel explain precisely instead of claiming the polity predates flags. */
  flagTooNew?: { name: string; year: number };
  /** Set when the polity's CURATED flag image was refused because that design was not
   *  flown at this era's date — see HISTORICAL_FLAG_VALIDITY. The panel names the design
   *  and its years, which is a real explanation, not the causeless fallback line. */
  flagOutOfPeriod?: { design: string; from: number; to: number };
  /** Curated, sourced explanation of WHY this polity shows no flag at this date —
   *  from `PolityInfo.noFlagReason`. Rendered verbatim in place of the neutral
   *  fallback line, which never asserts a reason we do not actually know. */
  noFlagReason?: string;
  /** Set when the upstream dataset draws this polity for the WRONG DATE and the error
   *  cannot be fixed by relabelling — the borders themselves are anachronistic. Sourced
   *  in src/data/polityExistence.ts; the panel discloses it rather than us inventing the
   *  period-correct boundary. */
  datingCaveat?: { issue: string; actual: string };
};
type Selection = ModernSelection | HistoricalSelection;

/** Ruling-power names that read wrong without a definite article in prose. The panel
 *  says "Flew the flag of the United Kingdom", never "of United Kingdom". */
const NEEDS_THE = /^(United Kingdom|United States|Netherlands|Philippines|Gambia|USSR|Soviet Union|Ottoman Empire|German Empire|Russian Empire|Austrian Empire|Holy Roman Empire|Habsburg Monarchy|Republic of China|Iberian Union|Trucial States)\b/;
function withArticle(name: string): string {
  return NEEDS_THE.test(name) ? `the ${name}` : name;
}

/** Year label for a flag-validity window: negative years are BC, not "-509". */
function formatFlagYear(year: number): string {
  return year < 0 ? `${-year} BC` : String(year);
}

function selectionName(s: Selection, eraId?: Era["id"]): string {
  // Historical polities render through polityDisplayName so upstream's typos
  // ("Kingfom of Italy", "Scottland") don't reach the user, and era-specific
  // statehood corrections (Namibia → South West Africa) are applied. `s.name`
  // stays the verbatim dataset NAME — it is the key every lookup and match still uses.
  return s.kind === "modern" ? s.country.name : polityDisplayName(s.name, eraId);
}
function selectionContinent(s: Selection): string {
  return s.kind === "modern" ? s.country.continent : s.continent ?? "Historical";
}
function selectionFlag(s: Selection, baseUrl: string): string | null {
  if (s.kind === "modern") return s.country.flagSvg;
  if (!s.flag) return null;
  // Historical selections may carry a relative asset path (curated historical
  // flag PNG in /public), an absolute URL, or a bundled modern-flag path that
  // already includes the base (when we fall back to a modern country's flag).
  // The last must not be base-prefixed twice.
  if (/^https?:\/\//.test(s.flag) || s.flag.startsWith("data:")) return s.flag;
  if (s.flag.startsWith(baseUrl)) return s.flag;
  return `${baseUrl}${s.flag}`;
}
// (The pre-EntitySummary single-line `selectionSummary` helper used to live
// here; the panel now renders a structured <EntitySummary /> component
// for both modern + historical entities.)

export default function LearnPage({ variant = "atlas" }: { variant?: "atlas" | "default" } = {}) {
  const location = useLocation();
  const isAtlas = variant === "atlas" || location.pathname.includes("visual-redesign");

  // --- Shareable-link URL state ---
  // The page reflects its view (era, selected country/polity, subdivision
  // drill-down) in the query string so a copied URL reproduces the view.
  const [searchParams, setSearchParams] = useSearchParams();
  // Captured exactly once so async hydration (countries / map data arrive
  // later) reads the link's intent, not the live URL we then write back to.
  const initialParamsRef = useRef<{
    era: string | null;
    country: string | null;
    subdivisions: boolean;
    sub: string | null;
    polity: string | null;
  } | null>(null);
  if (initialParamsRef.current === null) {
    initialParamsRef.current = {
      era: searchParams.get("era"),
      country: searchParams.get("country")?.toUpperCase() ?? null,
      subdivisions: searchParams.get("subdivisions") === "1",
      sub: searchParams.get("sub")?.toUpperCase() ?? null,
      polity: searchParams.get("polity"),
    };
  }
  // Tracks whether the one-time hydration from the URL has completed; the
  // write-back effect stays silent until it has, so it can't clobber the link.
  const hydratedRef = useRef(false);
  const subHydratedRef = useRef(false);
  const polityHydratedRef = useRef(false);

  const [eraId, setEraId] = useState<Era["id"]>(() => {
    const e = initialParamsRef.current!.era;
    return e && ERAS.some((x) => x.id === e) ? e : DEFAULT_ERA_ID;
  });
  // Seeded from the bundle so flags render on the first paint; the network
  // fetch below upgrades this in place (adding live populations) when it lands.
  // Never initialise this to [] — that is what left the historical eras flagless
  // for ~27 s whenever restcountries.com hangs. See bundledCountries().
  const [countries, setCountries] = useState<Country[]>(() => bundledCountries());
  const [loadError, setLoadError] = useState<string | null>(null);
  // NAME → SUBJECTO for the current era's GeoJSON (only where they differ). Supplies
  // the "Ruled by" row and lets a colony inherit its ruler's period-correct flag.
  const [polityRulers, setPolityRulers] = useState<ReadonlyMap<string, string>>(new Map());
  // Polities whose extent was derived by intersecting an upstream lumped polygon with
  // MODERN admin-1 boundaries (scripts/tag-derived-boundaries.mjs). Their borders are a
  // schematic stand-in, and the panel says so rather than presenting them as sourced.
  const [derivedBoundaryNames, setDerivedBoundaryNames] = useState<ReadonlySet<string>>(new Set());
  const [hovered, setHovered] = useState<Selection | null>(null);
  const [selected, setSelected] = useState<Selection | null>(null);
  const [showFlagMap, setShowFlagMap] = useState(false);
  // Passport map layer (🛂 control): either passport-cover colours, or visa
  // access for holders of a chosen country's passport. Mutually exclusive with
  // the flag overlay and the democracy/index layer (owner request).
  const [passportMapMode, setPassportMapMode] = useState<PassportMapMode>(null);
  // Diaspora heatmap (🌐 control): colour destinations by how many people born
  // in a chosen country live there. Mutually exclusive with flag / passport /
  // democracy layers.
  const [diasporaMapMode, setDiasporaMapMode] = useState<DiasporaMapMode>(null);
  // City overlay (capitals only: national on the world map, national +
  // subdivision on the subdivision map). Like the flag overlay, it is OFF by
  // default and shared across the world + subdivision maps, so toggling it on
  // one keeps it on after drilling into a country.
  const [showCities, setShowCities] = useState(false);
  // "Colour countries by Democracy Index" layer for the world map.
  const [democracyMapMode, setDemocracyMapMode] = useState<DemocracyMapMode>(null);
  // Scatter chart of two democracy indexes, shown below the world map behind
  // a "See chart" accordion (collapsed by default). Axis keys are independent
  // of the map colour mode so users can compare any pair of indexes.
  const [democracyChartEnabled, setDemocracyChartEnabled] = useState(false);
  const democracyChartPanelId = useId();
  const [personaMapEnabled, setPersonaMapEnabled] = useState(false);
  const personaMapPanelId = useId();
  const [democracyChartXKey, setDemocracyChartXKey] =
    useState<ChartAxisSelection>("cpi");
  const [democracyChartYKey, setDemocracyChartYKey] =
    useState<ChartAxisSelection>("v-dem");

  // First-run tips card shown in the empty state. Dismissal is remembered so
  // it's a one-time nudge, re-openable from a "Show tips" affordance.
  const [tourDismissed, setTourDismissed] = useState(() => {
    try {
      return localStorage.getItem("flagGame.learn.tourDismissed") === "1";
    } catch {
      return false;
    }
  });
  const dismissTour = useCallback(() => {
    setTourDismissed(true);
    try {
      localStorage.setItem("flagGame.learn.tourDismissed", "1");
    } catch {
      /* ignore — persistence is best-effort */
    }
  }, []);
  const reopenTour = useCallback(() => setTourDismissed(false), []);

  // Suppresses the exit-subdivision effect for one cycle when navigating
  // between subdivision countries via the dropdown.
  const suppressSubdivisionExitRef = useRef(false);

  // Sub-national divisions mode
  const [subdivisionMode, setSubdivisionMode] = useState(false);
  const [subdivisionGeo, setSubdivisionGeo] = useState<SubdivisionFeatureCollection | null>(null);
  const [subdivisionLoading, setSubdivisionLoading] = useState(false);
  const [selectedSubdivision, setSelectedSubdivision] = useState<SubdivisionMeta | null>(null);
  // A NATIONAL capital that heads no subdivision (Ottawa, Pretoria, Amsterdam …),
  // selected from the hierarchy chart's "National capital" node. It has no
  // subdivision entity to select, so it drives its own small panel below. Mutually
  // exclusive with a subdivision selection (see the effects after subdivisionCountry).
  const [selectedCapital, setSelectedCapital] = useState<
    { name: string; note: string | null; flagPath: string | null } | null
  >(null);
  // The capital-city widget now opens AUTOMATICALLY whenever a subdivision with a
  // known capital is selected (owner request 2026-07) — there is no manual "View
  // capital" toggle. Derived, not stored: it is simply "a subdivision with a
  // sourced capital is selected", so it can never fall out of sync with the
  // selection or need a reset effect.
  const showCapital =
    selectedSubdivision != null &&
    subdivisionCapital(selectedSubdivision.code) != null;
  // The EXACT capital city currently on display — a selected subdivision's own
  // capital, or a standalone national capital (Ottawa, Pretoria, Amsterdam …) —
  // passed to the map so it can ring/highlight that ONE marker. Distinct from
  // just "a capital is shown": several capitals can already be labelled at once
  // (every national capital is always named on a country's subdivision map), so
  // without this the map gives no visual feedback for WHICH one was selected.
  const activeCapitalCityName = showCapital && selectedSubdivision
    ? (subdivisionCapital(selectedSubdivision.code)?.name ?? null)
    : (selectedCapital?.name ?? null);
  // A symbol picked in the "National symbols" tab — a historical national flag, an
  // additional official flag, a service flag, an ensign or a standard. It belongs
  // to the WHOLE country, so unlike every other selection here it deliberately
  // drives NOTHING on the map (owner request); it only opens its own widget below
  // the country fact-sheet, alongside whatever else is selected.
  const [selectedNationalFlag, setSelectedNationalFlag] = useState<NationalFlag | null>(null);
  // A collective subdivision-group flag (Malaysia's Flag of the Federal
  // Territories) picked in the hierarchy opens in the SAME widget as a national
  // symbol, but its sourced meaning lives outside NATIONAL_FLAG_MEANINGS, so it
  // is carried here and passed to the widget as a one-entry override.
  const [selectedGroupMeaning, setSelectedGroupMeaning] = useState<FlagMeaningData | null>(null);
  // A party picked in the "Political parties" tab. Same reasoning as
  // selectedNationalFlag above: it belongs to the whole country, so it drives
  // nothing on the map and only opens its own widget below the fact-sheet.
  const [selectedParty, setSelectedParty] = useState<PoliticalParty | null>(null);
  // Country whose subdivisions are currently shown — stored separately so the
  // panel doesn't depend on `display` remaining set after entering subdivision mode.
  const [subdivisionCountry, setSubdivisionCountry] = useState<{ code: string; name: string; flagSvg: string } | null>(null);
  // Keep the national-capital selection mutually exclusive with a subdivision
  // selection, and clear it whenever the drilled-into country or the mode changes.
  useEffect(() => {
    if (selectedSubdivision != null) setSelectedCapital(null);
  }, [selectedSubdivision]);
  useEffect(() => {
    setSelectedCapital(null);
    // The picked flag belongs to the country being drilled into, so it cannot
    // survive a change of country or a return to the world map.
    setSelectedNationalFlag(null);
    setSelectedGroupMeaning(null);
    setSelectedParty(null);
    setSelectedSubdivisionAirline(null);
    setSelectedSubdivisionBroadcaster(null);
    setSelectedSubdivisionTourismLogo(null);
    setSelectedSubdivisionNewsAgency(null);
    setSelectedSubdivisionNewspaper(null);
  }, [subdivisionCountry, subdivisionMode]);
  // Set of NAME values present in the current era's historical GeoJSON.
  // Populated by HistoricalMap's onDataLoaded callback. Used by the
  // cross-era selection-validation effect below to keep a selection alive
  // when the same entity also appears in the new era (and to clear it
  // when it doesn't).
  const [availableHistoricalNames, setAvailableHistoricalNames] = useState<ReadonlySet<string>>(new Set());
  const [zoomedMedia, setZoomedMedia] = useState<{
    url: string;
    /** Brand logos get an adaptive neutral plate in the fullscreen viewer. */
    logoSurface?: boolean;
  } | null>(null);
  const enlargeFlag = useCallback((url: string) => {
    setZoomedMedia({ url });
  }, []);
  const enlargeLogo = useCallback((url: string) => {
    setZoomedMedia({ url, logoSurface: true });
  }, []);
  const [flagLoadFailed, setFlagLoadFailed] = useState(false);
  // What the flag grid — and, in step with it, the detail panel's image +
  // explainer — shows: the national flag (default), the coat of arms, or the
  // passport. Owned here (not in FlagGrid) so clicking a coat-of-arms/passport
  // tile swaps the panel above to that symbol too. See lib/gridContentType.ts.
  const [gridContentType, setGridContentType] = useState<GridContentType>(
    loadGridContentType,
  );
  // Information-panel tabs organise the country fact-sheet (Overview / Indices) and
  // the Media / Travel / Politics browsers. Synced from the world-map Show
  // dropdown so picking "Top newspapers" lands on Media, etc.
  const [panelTab, setPanelTab] = useState<LearnPanelTabId>(() =>
    panelTabForGridContent(loadGridContentType()),
  );
  const [mediaSection, setMediaSection] = useState<LearnPanelMediaSection>(
    () => mediaSectionForGridContent(loadGridContentType()) ?? "newspaper",
  );
  const [travelSection, setTravelSection] = useState<LearnPanelTravelSection>(
    () => travelSectionForGridContent(loadGridContentType()) ?? "airline",
  );
  const [sportsSection, setSportsSection] = useState<LearnPanelSportsSection>(
    () => sportsSectionForGridContent(loadGridContentType()) ?? "footballcrest",
  );
  const [financeSection, setFinanceSection] = useState<LearnPanelFinanceSection>(
    () => financeSectionForGridContent(loadGridContentType()) ?? "centralbank",
  );
  // Overview leading image: Flag vs Coat of arms pills.
  const [overviewIdentity, setOverviewIdentity] =
    useState<OverviewIdentityKind>("flag");
  // Large-screen information panel drawer. Collapsed until a firm selection
  // exists; Hide dismisses it while keeping the selection; picking another
  // (or the same again after clear) opens it. Ignored on ≤900px.
  const [panelDismissed, setPanelDismissed] = useState(false);
  const [isWideLayout, setIsWideLayout] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return true;
    return window.matchMedia("(min-width: 901px)").matches;
  });
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(min-width: 901px)");
    const onChange = () => setIsWideLayout(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  const panelSelectionKey = selectionKeyForPanel(
    selected,
    subdivisionMode && subdivisionCountry ? subdivisionCountry.code : null,
  );
  const prevPanelSelectionKey = useRef(panelSelectionKey);
  useEffect(() => {
    if (panelSelectionKey === prevPanelSelectionKey.current) return;
    prevPanelSelectionKey.current = panelSelectionKey;
    // A new firm selection (or a clear) resets the Hide dismissal so the next
    // pick opens the drawer again. Clearing leaves the panel collapsed because
    // there is nothing to show.
    setPanelDismissed(false);
    setOverviewIdentity("flag");
  }, [panelSelectionKey]);
  const panelCollapsed =
    isWideLayout && (panelSelectionKey == null || panelDismissed);
  // The specific football crest clicked in the grid, when it is a card that is
  // NOT a plain country — a UK home nation, or a FIFA-member entity. Keyed with
  // its parent country so the panel shows that crest only while the parent stays
  // selected, then self-clears when the user navigates to another country.
  const [gridCrest, setGridCrest] = useState<{ id: string; parent: string; worldCode?: string } | null>(null);
  // The specific National Olympic Committee clicked in the grid — a non-UN IOC
  // member entity (Chinese Taipei, Hong Kong, …), not a plain country. Keyed
  // with its parent country exactly like gridCrest, so the panel shows that
  // entity's own NOC only while the parent stays selected.
  const [gridOlympicCommittee, setGridOlympicCommittee] = useState<{ id: string; parent: string; worldCode?: string } | null>(null);
  // The specific commercial airline clicked in the grid.
  const [gridAirlineId, setGridAirlineId] = useState<string | null>(null);
  // An airline picked in the "National symbols" tab of subdivision view.
  const [selectedSubdivisionAirline, setSelectedSubdivisionAirline] = useState<CommercialAirline | null>(null);
  // The specific public broadcaster clicked in the grid.
  const [gridBroadcasterId, setGridBroadcasterId] = useState<string | null>(null);
  // A public broadcaster picked in the "National symbols" tab of subdivision view.
  const [selectedSubdivisionBroadcaster, setSelectedSubdivisionBroadcaster] = useState<PublicBroadcaster | null>(null);
  // The specific tourism logo clicked in the grid.
  const [gridTourismLogoId, setGridTourismLogoId] = useState<string | null>(null);
  // A tourism logo picked in the "National symbols" tab of subdivision view.
  const [selectedSubdivisionTourismLogo, setSelectedSubdivisionTourismLogo] = useState<TourismLogo | null>(null);
  // Passport cover picked in the Travel tab (or Show → Passports).
  const [gridPassportId, setGridPassportId] = useState<string | null>(null);
  // The specific national news agency clicked in the grid.
  const [gridNewsAgencyId, setGridNewsAgencyId] = useState<string | null>(null);
  // The specific top national newspaper clicked in the grid.
  const [gridNewspaperId, setGridNewspaperId] = useState<string | null>(null);
  const [gridPartyId, setGridPartyId] = useState<string | null>(null);
  const [gridCentralBankId, setGridCentralBankId] = useState<string | null>(null);
  // A national news agency picked in the "National symbols" tab of subdivision view.
  const [selectedSubdivisionNewsAgency, setSelectedSubdivisionNewsAgency] = useState<NewsAgency | null>(null);
  // A top national newspaper picked in the "National symbols" tab of subdivision view.
  const [selectedSubdivisionNewspaper, setSelectedSubdivisionNewspaper] = useState<Newspaper | null>(null);

  /** Clear every Show-grid item pick so map/dropdown country selection (or a
   *  Show-type change) cannot leave a stale airline/party/etc. behind. */
  const clearGridItemSelection = useCallback(() => {
    setGridCrest(null);
    setGridOlympicCommittee(null);
    setGridAirlineId(null);
    setGridBroadcasterId(null);
    setGridTourismLogoId(null);
    setGridPassportId(null);
    setGridNewsAgencyId(null);
    setGridNewspaperId(null);
    setGridPartyId(null);
    setGridCentralBankId(null);
  }, []);

  const syncPanelTabsFromShow = useCallback((type: GridContentType) => {
    setPanelTab(panelTabForGridContent(type));
    const media = mediaSectionForGridContent(type);
    if (media) setMediaSection(media);
    const travel = travelSectionForGridContent(type);
    if (travel) setTravelSection(travel);
    const sports = sportsSectionForGridContent(type);
    if (sports) setSportsSection(sports);
    const finance = financeSectionForGridContent(type);
    if (finance) setFinanceSection(finance);
    if (type === "coatofarms") setOverviewIdentity("coatofarms");
    if (type === "flag") setOverviewIdentity("flag");
  }, []);

  const chooseGridContentType = (type: GridContentType) => {
    setGridContentType(type);
    saveGridContentType(type);
    clearGridItemSelection();
    syncPanelTabsFromShow(type);
  };
  // Captured at "Play" click time so the modal stays open even if the
  // hovered-country display clears while the user moves the mouse.
  const [anthemTarget, setAnthemTarget] = useState<{
    code: string;
    name: string;
    flagUrl: string | null;
  } | null>(null);

  const anthemPlayerRef = useRef<{ play: () => void } | null>(null);

  // Codes currently in the user's Hana's Game list (persisted to
  // localStorage). Initialised from storage so the in-panel toggle below
  // the highlighted flag reflects whatever the picker modal would show.
  const [hanaCodes, setHanaCodes] = useState<string[]>(
    () => loadStoredSelection().codes,
  );

  // Re-read the selection whenever flag data changes — including when it syncs
  // down from the active profile on another device — so "In my list" stays in
  // step across devices, not just on first load.
  useEffect(() => {
    const reread = () => setHanaCodes(loadStoredSelection().codes);
    window.addEventListener(FLAG_DATA_EVENT, reread);
    return () => window.removeEventListener(FLAG_DATA_EVENT, reread);
  }, []);

  const toggleHanaForCode = useCallback((code: string) => {
    setHanaCodes((prev) => {
      const next = prev.includes(code)
        ? prev.filter((c) => c !== code)
        : [code, ...prev];
      saveStoredSelection({ codes: next });
      return next;
    });
  }, []);

  // Debounce hover-clearing so the panel doesn't vanish when the user
  // moves the mouse from a map country toward the side panel.
  const hoverClearTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const baseUrl = import.meta.env.BASE_URL;
  const era = useMemo(() => getEra(eraId), [eraId]);
  const isModernEra = !era.dataUrl;

  // Shared zoom state for both map back-ends — keeps the user's zoom
  // intact when they switch eras (including Today ↔ historical, which
  // swaps the underlying component). Reset only happens when the user
  // clicks the ⟲ button.
  const sharedZoom = useZoomPan(960, 500);

  // Map view settings (centre longitude + south-up). Persisted to
  // localStorage so the user's preferred orientation survives reloads.
  const [mapView, setMapView] = useState<MapViewSettings>(() => loadMapView());

  // Globe rotation — shared across both map back-ends so switching eras
  // doesn't stop the spin or lose the pause state.
  const [rotationOffset, setRotationOffset] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const isRotatingRef = useRef(false);
  isRotatingRef.current = isRotating;
  const southUpForRotRef = useRef(mapView.southUp);
  southUpForRotRef.current = mapView.southUp;
  const rotationAccumRef = useRef(0);
  // Track whether we're in the modern era inside the rAF loop. Historical
  // maps don't use the rotation offset at all, so we must not call
  // setRotationOffset during historical eras — it would force LearnPage to
  // re-render at 15fps and bypass HistoricalMap's memo, re-rendering
  // hundreds of SVG paths on every frame and blocking all user interaction.
  const isModernEraRef = useRef(isModernEra);
  isModernEraRef.current = isModernEra;

  // Honour the OS "reduce motion" setting: even if rotation is toggled on, a
  // user who has asked for less motion never gets an auto-spinning globe.
  const reduceMotionRef = useRef(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotionRef.current = mq.matches;
    const onChange = () => {
      reduceMotionRef.current = mq.matches;
    };
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const toggleRotation = useCallback(() => {
    setIsRotating((prev) => !prev);
  }, []);
  const toggleFlagMap = useCallback(() => {
    setShowFlagMap((prev) => {
      const next = !prev;
      // Flag overlay, passport, diaspora, and democracy layers are mutually exclusive.
      if (next) {
        setPassportMapMode(null);
        setDiasporaMapMode(null);
        setDemocracyMapMode(null);
      }
      return next;
    });
  }, []);
  const handlePassportMapModeChange = useCallback((next: PassportMapMode) => {
    setPassportMapMode(next);
    if (next !== null) {
      setShowFlagMap(false);
      setDiasporaMapMode(null);
      setDemocracyMapMode(null);
    }
  }, []);
  const handleDiasporaMapModeChange = useCallback((next: DiasporaMapMode) => {
    setDiasporaMapMode(next);
    if (next !== null) {
      setShowFlagMap(false);
      setPassportMapMode(null);
      setDemocracyMapMode(null);
    }
  }, []);
  const handleDemocracyMapModeChange = useCallback((next: DemocracyMapMode) => {
    setDemocracyMapMode(next);
    if (next !== null) {
      setShowFlagMap(false);
      setPassportMapMode(null);
      setDiasporaMapMode(null);
    }
  }, []);
  const toggleCities = useCallback(() => {
    setShowCities((prev) => !prev);
  }, []);

  // Exit subdivision mode when a different country is selected — unless the
  // dropdown is navigating between subdivision countries (suppress ref set).
  useEffect(() => {
    if (suppressSubdivisionExitRef.current) {
      suppressSubdivisionExitRef.current = false;
      return;
    }
    setSubdivisionMode(false);
    setSubdivisionGeo(null);
    setSelectedSubdivision(null);
    setSubdivisionCountry(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected?.kind === "modern" ? selected.country.code : null]);
  useEffect(() => {
    saveMapView(mapView);
  }, [mapView]);

  // Scroll to the very top of the page when the user first lands here.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Reset accumulated rotation when the user picks a new view-centre preset
  // so the map snaps immediately to the chosen meridian.
  useEffect(() => {
    rotationAccumRef.current = 0;
    setRotationOffset(0);
  }, [mapView.centerLongitude]);

  // rAF rotation loop — runs for the lifetime of the page so the globe
  // keeps spinning across era switches (both map back-ends receive the
  // computed effectiveLongitude as their centerLongitude prop).
  useEffect(() => {
    const DEGREES_PER_SEC = 6;
    const MIN_MS_BETWEEN_RENDERS = 67; // ~15 fps cap
    let lastTime = performance.now();
    let lastRenderTime = performance.now();
    let rafId: number;
    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      if (isRotatingRef.current && !reduceMotionRef.current) {
        const dir = southUpForRotRef.current ? -1 : 1;
        rotationAccumRef.current =
          (rotationAccumRef.current + dir * DEGREES_PER_SEC * dt) % 360;
        // Only push state (and thus trigger a re-render) for the modern era.
        // Historical maps ignore the rotation offset entirely, so updating
        // state for them would cause 15fps re-renders of HistoricalMap with
        // no visual benefit — and those re-renders block click events.
        if (isModernEraRef.current && now - lastRenderTime >= MIN_MS_BETWEEN_RENDERS) {
          lastRenderTime = now;
          setRotationOffset(rotationAccumRef.current);
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Modern countries are loaded once on mount (used for the "Today" era).
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await fetchCountries();
        if (cancelled) return;
        setCountries(list);
      } catch (e) {
        if (!cancelled) {
          setLoadError(e instanceof Error ? e.message : "Unknown error");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // On era change: reset hover (always stale) and the per-era available-name
  // set (so the validation effect below waits until the new era's data has
  // actually loaded before deciding whether to keep or drop the selection).
  // We DO NOT clear the selection here — that's done conditionally further
  // down once we know whether the same entity exists in the new era.
  useEffect(() => {
    setHovered(null);
    setAvailableHistoricalNames(new Set());
    setAnthemTarget(null);
  }, [eraId]);

  // Lock body scroll while the fullscreen flag viewer is open + close on Esc.
  useEffect(() => {
    if (!zoomedMedia) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomedMedia(null);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [zoomedMedia]);

  const codeToCountry = useMemo(
    () => new Map(countries.map((c) => [c.code, c])),
    [countries],
  );
  const codes = useMemo(
    () => new Set([
      ...countries.map((c) => c.code),
      // Include only undisputed territories so disputed ones (e.g. Falkland
      // Islands, Gibraltar) are not highlighted or clickable on the world map.
      ...Object.keys(UNDISPUTED_TERRITORY_PARENT),
    ]),
    [countries],
  );
  const names = useMemo(
    () => new Map([
      ...countries.map((c) => [c.code, c.name] as [string, string]),
      ...Object.entries(TERRITORY_NAME).filter(
        ([code]) => !DISPUTED_TERRITORY_CODES.has(code),
      ),
    ]),
    [countries],
  );

  // Case-insensitive name→Country lookup, used to resolve historical polity
  // NAMEs to a modern flag (via `modernName` in the registry or the
  // MODERN_NAME_ALIASES table). Lets us cover hundreds of post-1815
  // polities — colonies, German principalities, modern country names —
  // without hand-curating a flag image for each one.
  const countryByName = useMemo(() => {
    const m = new Map<string, Country>();
    for (const c of countries) m.set(c.name.toLowerCase(), c);
    return m;
  }, [countries]);

  // Selection takes priority over hover. Once the user has clicked a
  // country / polity, the panel sticks to it — hovering other entities
  // doesn't override the panel content. Hover still shows a preview when
  // *nothing* is selected (initial state). The map's selected highlight
  // also follows this (drawn from `display`), giving the user a clear
  // "this is my selection" signal.
  const display = selected ?? hovered;

  // Territories of the currently-displayed country — used to co-highlight
  // their geometries on the world map alongside the parent country. Suppressed
  // while a FIFA_EXTRA / IOC_EXTRA entity's own crest/NOC with its own distinct
  // world-map polygon is active (see mapHighlightCode below): the map is then
  // highlighting that ONE entity specifically, and also lighting up its
  // siblings (e.g. Macau alongside a selected Hong Kong) would misleadingly
  // suggest they're part of the same selection too.
  const territoryHighlightCodes = useMemo(() => {
    if (!display || display.kind !== "modern") return null;
    const activeEntityWorldCode =
      (gridCrest &&
        gridContentType === "footballcrest" &&
        display.country.code === gridCrest.parent &&
        gridCrest.worldCode) ||
      (gridOlympicCommittee &&
        gridContentType === "olympiccommittee" &&
        display.country.code === gridOlympicCommittee.parent &&
        gridOlympicCommittee.worldCode) ||
      null;
    if (activeEntityWorldCode) return null;
    const territories = PARENT_TERRITORIES[display.country.code];
    return territories?.length ? new Set(territories) : null;
  }, [display, gridCrest, gridOlympicCommittee, gridContentType]);

  function exitSubdivisionMode() {
    setSubdivisionMode(false);
    setSubdivisionGeo(null);
    setSelectedSubdivision(null);
    setSubdivisionCountry(null);
  }

  /** Clear whatever the information panel is showing — country/polity selection,
   *  hover preview, subdivision drill-in, and any Show-grid item pick — so the
   *  panel returns to the empty "Learn your flags" prompt. */
  const clearPanelSelection = useCallback(() => {
    setSelected(null);
    setHovered(null);
    clearGridItemSelection();
    setSelectedNationalFlag(null);
    setSelectedGroupMeaning(null);
    setSelectedParty(null);
    setSelectedCapital(null);
    setSelectedSubdivisionAirline(null);
    setSelectedSubdivisionBroadcaster(null);
    setSelectedSubdivisionTourismLogo(null);
    setSelectedSubdivisionNewsAgency(null);
    setSelectedSubdivisionNewspaper(null);
    exitSubdivisionMode();
  }, [clearGridItemSelection]);



  const handleEnterSubdivisionMode = useCallback(async () => {
    if (!display || display.kind !== "modern") return;
    const { code, name, flagSvg } = display.country;
    setSubdivisionMode(true);
    setSubdivisionLoading(true);
    setSelectedSubdivision(null);
    setSubdivisionCountry({ code, name, flagSvg });
    const geo = await fetchMergedSubdivisionGeo(code);
    setSubdivisionGeo(geo);
    setSubdivisionLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [display]);

  // Navigate to the subdivision view for a specific country. Suppresses the
  // exit-subdivision effect so the panel updates to the new country while
  // staying in subdivision mode.
  const enterSubdivisionModeForCountry = useCallback(async (country: Country) => {
    const { code, name, flagSvg } = country;
    suppressSubdivisionExitRef.current = true;
    setSelected({ kind: "modern", country });
    setHovered(null);
    setSubdivisionLoading(true);
    setSelectedSubdivision(null);
    setSubdivisionCountry({ code, name, flagSvg });
    const geo = await fetchMergedSubdivisionGeo(code);
    setSubdivisionGeo(geo);
    setSubdivisionLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Build a polity → Selection helper for historical eras. The HistoricalMap
  // emits a NAME string when the user clicks/hovers a polity; we wrap that
  // into a HistoricalSelection enriched with registry info — and, where
  // historically defensible, fall back to a modern country flag.
  function selectionFromPolityName(name: string | null): Selection | null {
    if (!name) return null;
    const info = polityInfo(name, eraId);
    const allowFallback = eraAllowsModernFlagFallback(eraId);

    // Resolve a flag URL with these layers, in order:
    //   1. Curated historical-flag image from the registry              (always)
    //   2. Registry-declared `modernName` → the modern country's flag   (era-gated)
    //   3. Alias table (MODERN_NAME_ALIASES) → modern flag              (era-gated)
    //   4. Direct case-insensitive match of NAME against a modern
    //      country — only for 1914+ eras                               (era-gated)
    //   5. The dataset's own SUBJECTO ruler, resolved the same way      (era-gated)
    //
    // Layers 2-5 all pass through flagExistedInEra(): a modern flag may only stand in
    // for a historical one if it already existed at the era's date. Without that gate
    // the map showed South Africa's 1994 flag in 1914 and Uganda's 1962 flag in 1960.
    // Where this polity's LAND is — a fact about the polity, never about the country it
    // borrows a flag from. Resolved once, up front, and deliberately never touched by the
    // flag layers below: letting the alias/ruler layers supply it filed Togoland, Kamerun
    // and every other 1914 colony that flew its ruler's flag under EUROPE. See
    // polityContinent() and CLAUDE.md, "A polity's continent is where its land is".
    const continent = polityContinent(name, eraId);
    let flagIsRulers = false;
    // Set when a modern flag was REFUSED because it postdates the era, so the panel
    // can say which flag and which year instead of the generic "predates modern flag
    // design" line — that line is plainly wrong for, say, Uganda in 1960.
    let flagTooNew: { name: string; year: number } | undefined;
    // Set when a CURATED historical flag was refused because the design was not flown at
    // this date, so the panel can say which design and which years. Layer 1 used to be
    // ungated, which is how the 1889 dragon banner reached the 1700 map.
    let flagOutOfPeriod: { design: string; from: number; to: number } | undefined;

    /** A curated flag image, but only if its design was flown at the era's date. */
    const eraLegalCuratedFlag = (path: string | undefined): string | undefined => {
      if (!path) return undefined;
      const verdict = curatedFlagValidInEra(path, eraId);
      if (verdict.ok) return path;
      if (verdict.reason === "out-of-period") {
        flagOutOfPeriod = {
          design: verdict.window.design,
          from: verdict.window.from,
          to: verdict.window.to,
        };
      }
      return undefined;
    };

    let flag: string | undefined = eraLegalCuratedFlag(info.flag);

    /** Modern country flag for `modernName`, but only if period-legal. */
    const eraLegalModernFlag = (modernName: string): Country | null => {
      const country = countryByName.get(modernName.toLowerCase());
      if (!country) return null;
      if (flagExistedInEra(country.code, eraId)) return country;
      const year = FLAG_ADOPTION_YEAR[country.code];
      if (year != null) flagTooNew = { name: country.name, year };
      return null;
    };

    // Explicit "show no flag" — used for ancient entities whose NAME happens to match
    // a modern country (Egypt 2000 BC, Armenia 100 AD) and for occupied /
    // between-states polities where no national flag applies.
    //
    // It only blocks the fallback when it is a claim about THIS era, though. The
    // registry is era-agnostic, so a `noFlag` written for medieval France or Viking
    // Norway was silently suppressing the tricolour in 1900 and the Norwegian cross in
    // 1914 — flags that unquestionably flew. In an era that allows the name-match
    // fallback, only an ERA_OVERRIDES entry counts; the adoption-year gate below is
    // what keeps the result period-correct.
    const suppressed =
      info.noFlag === true &&
      (!allowFallback || noFlagIsEraSpecific(name, eraId));
    if (!flag && !suppressed) {
      // A curated `ruler` is a statement that this polity had NO flag of its own at this
      // date, so the modern-name layer below must not run for it: that layer would hand a
      // colony its post-independence successor's flag (or its ruler's, uncaptioned).
      // Skip straight to the ruler layer, which captions what it shows.
      // A curated ruler — from the entry or from ERA_RULER — is a statement that this polity
      // had NO flag of its own at this date, so the modern-name layer must not run for it:
      // that layer would hand a colony its successor's flag, or an occupation zone the flag
      // its country readopted years later, and in both cases with no caption.
      const modernName = curatedRulerFor(name, eraId)
        ? null
        : polityModernName(name, eraId) ?? // era-overrides + registry.modernName + aliases
          (allowFallback && countryByName.has(name.toLowerCase()) ? name : null);
      if (modernName) {
        // If the resolved modernName ALSO has a registry entry with a
        // curated flag, prefer that — this is how the Spanish viceroyalties
        // pick up the 1785 Spanish flag instead of the modern flagcdn one.
        const aliasInfo = polityInfo(modernName, eraId);
        const aliasFlag = eraLegalCuratedFlag(aliasInfo.flag);
        if (aliasFlag) {
          flag = aliasFlag;
        } else {
          const country = eraLegalModernFlag(modernName);
          if (country) flag = country.flagSvg;
        }
      }

      // Layer 5 — the ruling power. Every feature in the historical-basemaps files
      // carries SUBJECTO; where it differs from NAME it names the state that actually
      // governed the territory (Belgian Congo → Belgium, Gold Coast → United
      // Kingdom…). A colony flew its ruler's flag, so when the polity's own flag is
      // unavailable or not yet period-legal, inherit the ruler's — resolved through
      // the SAME gate, so it can never be more anachronistic than the ruler.
      if (!flag) {
        // eraRuler() drops a SUBJECTO the dataset gets wrong for this date (Brazil
        // recorded as Portuguese in 1900, Cambodia as Japanese in 1938) — a wrong
        // ruler would put a foreign flag on an independent country's card.
        const ruler = eraRuler(name, eraId, polityRulers.get(name));
        if (ruler) {
          const rulerInfo = polityInfo(ruler, eraId);
          const rulerFlag = eraLegalCuratedFlag(rulerInfo.flag);
          if (rulerFlag) {
            flag = rulerFlag;
            flagIsRulers = true;
          } else {
            const rulerModern = polityModernName(ruler, eraId) ?? ruler;
            const country = eraLegalModernFlag(rulerModern);
            if (country) {
              flag = country.flagSvg;
              flagIsRulers = true;
            }
          }
        }
      }
    }

    // The dataset's SUBJECTO names the sovereign, which for a polity recorded under a
    // longer title IS itself — "Kingfom of Italy" is subject to "Italy". Showing
    // "Ruled by: Italy" there is noise, so strip the title and compare. A ruler merely
    // mentioned in the name ("Zaire (Belgium)", "Libya (IT)") is a real dependency and
    // still shows the row.
    const rawRuler = eraRuler(name, eraId, polityRulers.get(name)) ?? undefined;
    const bareName = polityDisplayName(name, eraId)
      .replace(/^(kingdom|kingfom|empire|republic|state|union|dominion|sultanate|emirate|principality|grand duchy)\s+of\s+/i, "")
      .trim()
      .toLowerCase();
    // Compare against the name the user SEES, never the raw dataset NAME. The two diverge
    // wherever POLITY_NAME_FOR_ERA remaps a polity, and a raw NAME can legitimately equal
    // its ruler's: 1815's "United Kingdom" feature is Britain's CARIBBEAN colonies, shown
    // as the British West Indies and ruled by the United Kingdom. Dropping the ruler there
    // rendered the caption as "Flew the flag of — it had no national flag of its own".
    const ruledBy = rawRuler && rawRuler.trim().toLowerCase() === bareName ? undefined : rawRuler;
    return {
      kind: "historical",
      name,
      flag,
      continent,
      note: info.note,
      population: info.population,
      ruledBy,
      flagIsRulers: flagIsRulers || undefined,
      flagTooNew: flag ? undefined : flagTooNew,
      flagOutOfPeriod: flag ? undefined : flagOutOfPeriod,
      // Why this polity shows no flag, when we know. Curated per era in
      // historicalEras.ts; without it the panel falls back to a line that states
      // only what is certainly true (no period flag is bundled).
      noFlagReason: flag ? undefined : info.noFlagReason,
      approximateExtent: derivedBoundaryNames.has(name) || undefined,
      // A sourced, known anachronism in the upstream data — the polity is drawn for the
      // wrong date. We disclose rather than redraw (see src/data/polityExistence.ts).
      datingCaveat: ERA_EXTENT_CAVEATS.get(`${eraId}|${name}`),
    };
  }

  // Cross-era selection persistence. Runs after the new era's data
  // arrives. The selection survives an era switch when the same entity
  // (by name) still exists in the new era; otherwise it clears.
  //
  // Modern ↔ historical conversions are also handled: switching from
  // Today to 1914 with "Brazil" selected converts the modern Country
  // into a historical Selection; switching back converts it back to
  // the modern Country if there's a name match.
  useEffect(() => {
    if (isModernEra) {
      // Today era: any historical-form selection should resolve to a
      // modern country if the name matches one of the 195 UN members.
      setSelected((curr) => {
        if (!curr || curr.kind === "modern") return curr ?? null;
        const match = countries.find(
          (c) => c.name.toLowerCase() === curr.name.toLowerCase(),
        );
        return match ? { kind: "modern", country: match } : null;
      });
      return;
    }
    // Historical era — wait until the new GeoJSON has actually loaded
    // (availableHistoricalNames repopulates) before we decide.
    if (availableHistoricalNames.size === 0) return;
    setSelected((curr) => {
      if (!curr) return null;
      const targetName =
        curr.kind === "modern" ? curr.country.name : curr.name;
      if (availableHistoricalNames.has(targetName)) {
        // Re-derive — era overrides (flag / note / population) may differ
        // between eras, so we always rebuild from the current era's view.
        return selectionFromPolityName(targetName);
      }
      return null;
    });
    // selectionFromPolityName is recreated each render and reads era-aware
    // state from closure; intentional that we don't add it to deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eraId, isModernEra, availableHistoricalNames, countries]);

  // --- URL hydration (shared/bookmarked link → state) ---
  // Country & subdivision drill-down need the country list loaded first, so
  // this retries until `countries` arrives, then applies the link once.
  useEffect(() => {
    if (hydratedRef.current) return;
    const init = initialParamsRef.current!;
    if (init.country && isModernEra) {
      if (countries.length === 0) return; // wait for the country list
      const c = codeToCountry.get(init.country);
      if (c) {
        if (init.subdivisions) {
          // enterSubdivisionModeForCountry handles the selection + geo fetch
          // but assumes the view is already in subdivision mode (it's used to
          // hop between countries), so turn the mode on first for a cold link.
          setSubdivisionMode(true);
          void enterSubdivisionModeForCountry(c);
        } else {
          setSelected({ kind: "modern", country: c });
        }
      }
    }
    hydratedRef.current = true;
  }, [countries, codeToCountry, enterSubdivisionModeForCountry, isModernEra]);

  // Select the deep-linked subdivision once its country's geometry has loaded.
  useEffect(() => {
    if (subHydratedRef.current) return;
    const init = initialParamsRef.current!;
    if (!init.sub || !init.subdivisions) {
      subHydratedRef.current = true;
      return;
    }
    if (!subdivisionCountry || subdivisionGeo == null) return; // wait for geo
    const meta = SUBDIVISION_META[subdivisionCountry.code];
    const div = meta?.divisions.find((d) => d.code === init.sub);
    if (div) setSelectedSubdivision(div);
    subHydratedRef.current = true;
  }, [subdivisionCountry, subdivisionGeo]);

  // Select the deep-linked historical polity once the era's map data loads.
  useEffect(() => {
    if (polityHydratedRef.current) return;
    const init = initialParamsRef.current!;
    if (!init.polity || isModernEra) {
      polityHydratedRef.current = true;
      return;
    }
    if (availableHistoricalNames.size === 0) return; // wait for map data
    if (availableHistoricalNames.has(init.polity)) {
      const sel = selectionFromPolityName(init.polity);
      if (sel) setSelected(sel);
    }
    polityHydratedRef.current = true;
    // selectionFromPolityName is recreated each render and read from closure.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableHistoricalNames, isModernEra]);

  // --- URL write-back (state → URL) ---
  // Stays silent until the initial hydration completes so the link's intent
  // is consumed first. Only navigational state is serialised — transient UI
  // (hover, rotation, zoom, map orientation) is deliberately left out so the
  // links stay clean and reproducible.
  useEffect(() => {
    if (!hydratedRef.current) return;
    const next = new URLSearchParams();
    if (eraId !== DEFAULT_ERA_ID) next.set("era", eraId);
    if (isModernEra) {
      if (subdivisionMode && subdivisionCountry) {
        next.set("country", subdivisionCountry.code);
        next.set("subdivisions", "1");
        if (selectedSubdivision) next.set("sub", selectedSubdivision.code);
      } else if (selected?.kind === "modern") {
        next.set("country", selected.country.code);
      }
    } else if (selected?.kind === "historical") {
      next.set("polity", selected.name);
    }
    if (next.toString() !== searchParams.toString()) {
      setSearchParams(next, { replace: true });
    }
  }, [
    eraId,
    isModernEra,
    selected,
    subdivisionMode,
    subdivisionCountry,
    selectedSubdivision,
    searchParams,
    setSearchParams,
  ]);

  // Compute the flag list for the current era. For Today this is just
  // the modern country list with REST Countries’ subregion. For
  // historical eras we walk each feature NAME loaded by HistoricalMap
  // and run it through selectionFromPolityName so the entry reflects
  // any era-specific overrides (Brazil 1815 → UKPBA flag, etc.).
  const flagEntries: FlagListEntry[] = useMemo(() => {
    if (isModernEra) {
      return countries.map((c) => ({
        id: c.code,
        name: c.name,
        flag: c.flagSvg,
        continent: c.continent,
        subcontinent: c.subregion ?? c.continent,
        shapes: FLAG_SHAPES[c.code],
        families: FLAG_FAMILIES[c.code],
        colors: FLAG_COLORS[c.code],
        similarities: FLAG_SIMILARITIES[c.code],
        driveSide: getDriveSide(c.code),
        aspectRatio: FLAG_ASPECT_RATIOS[c.code],
        capital: c.capital,
        coatOfArms: coatOfArmsPath(c.code),
        passport: passportPath(c.code),
        footballCrest: footballCrestPath(c.code),
        olympicCommittee: olympicCommitteePath(c.code),
      }));
    }
    const out: FlagListEntry[] = [];
    // Several dataset NAMEs can be ONE polity for a given era — 1600's Spain and Portugal
    // are both the Iberian Union — so the grid is keyed by the name actually SHOWN. Without
    // this the union would occupy two identical cards.
    const shownAlready = new Set<string>();
    for (const name of availableHistoricalNames) {
      const sel = selectionFromPolityName(name);
      if (!sel || sel.kind !== "historical") continue;
      const shown = polityDisplayName(name, eraId);
      if (shownAlready.has(shown)) continue;
      shownAlready.add(shown);
      out.push({
        id: name,
        // Grid label uses the corrected spelling; `id` stays the dataset NAME so
        // selection round-trips through the map unchanged.
        name: shown,
        flag: sel.flag ?? null,
        continent: topLevelContinent(sel.continent),
        subcontinent: sel.continent ?? "Other",
      });
    }
    return out;
    // selectionFromPolityName closes over countryByName + eraId, both of
    // which we track explicitly. Disable lint exhaustive-deps just for
    // the helper itself — it’s intentionally re-created each render.
    // polityRulers/derivedBoundaryNames are read by the helper too — listed so a
    // grid entry can never be built from the previous era's ruler data.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModernEra, countries, availableHistoricalNames, eraId, countryByName, polityRulers, derivedBoundaryNames]);

  // Convert a flag URL to a form suitable for SVG <image> map overlay.
  // flagcdn.com serves /{code}.svg files whose embedded preserveAspectRatio
  // can prevent "slice" scaling in some browsers. Switching those to the w1280
  // PNG variant guarantees reliable full-territory coverage.  Non-flagcdn URLs
  // (Wikimedia SVGs, local PNGs) are returned unchanged.
  const toMapFlagUrl = (url: string): string => {
    const m = url.match(/^https?:\/\/flagcdn\.com\/([a-z]{2})\.svg$/);
    // w320 is plenty for a ~960px-wide map; w1280 was ~16× heavier with no
    // visible benefit and significantly increased per-frame paint cost.
    return m ? `https://flagcdn.com/w320/${m[1]}.png` : url;
  };

  // Flag overlay for the modern era: maps alpha-2 code → flag PNG URL.
  // Uses the same country.flagSvg source as the detail panel so flag
  // versions are always in sync (e.g. the current Afghan flag shows on
  // both the map and the widget).
  const modernFlagOverlay = useMemo(() => {
    if (!isModernEra || !showFlagMap) return null;
    const m = new Map<string, string>();
    for (const c of countries) {
      m.set(c.code, toMapFlagUrl(c.flagSvg));
    }
    return m;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModernEra, showFlagMap, countries]);

  // Passport map fill for the modern world map: either each country's
  // predominant passport-cover colour, or visa-access colours for holders of
  // a selected passport (src/data/visaAccess.ts — Passport Index).
  const passportColorOverlay = useMemo(() => {
    if (!isModernEra || !passportMapMode) return null;
    if (isPassportCoversMode(passportMapMode)) {
      const m = new Map<string, string>();
      for (const c of countries) {
        const hex = PASSPORT_COLORS[c.code];
        if (hex) m.set(c.code, hex);
      }
      return m;
    }
    if (isVisaPassportMode(passportMapMode)) {
      return getVisaAccessColorOverlay(passportMapMode.code);
    }
    return null;
  }, [isModernEra, passportMapMode, countries]);

  // Diaspora heatmap fill: destinations coloured by how many people born in
  // the selected origin live there (src/data/diaspora.ts — World Bank stock /
  // Abel & Cohen flows).
  const diasporaColorOverlay = useMemo(() => {
    if (!isModernEra || !diasporaMapMode) return null;
    return getDiasporaColorOverlay(diasporaMapMode.kind, diasporaMapMode.code);
  }, [isModernEra, diasporaMapMode]);

  // Flag overlay for historical eras: maps polity NAME → absolute flag URL.
  // Built from the same flagEntries used by FlagGrid so the URL resolution
  // (relative /historical-flags/ paths vs absolute flagcdn URLs) is consistent.
  const historicalFlagOverlay = useMemo(() => {
    if (isModernEra || !showFlagMap) return null;
    const m = new Map<string, string>();
    for (const entry of flagEntries) {
      if (!entry.flag) continue;
      const raw =
        /^https?:\/\//.test(entry.flag) ||
        entry.flag.startsWith("data:") ||
        entry.flag.startsWith(baseUrl)
          ? entry.flag
          : `${baseUrl}${entry.flag}`;
      m.set(entry.id, toMapFlagUrl(raw));
    }
    return m;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModernEra, showFlagMap, flagEntries, baseUrl]);

  // Flag overlay for the sub-national division map: maps subdivision ISO
  // code → flag URL. Built from getPlayableSubdivisions so the overlay is
  // exactly the set the Sub-national flags game/grid would quiz on — this
  // already excludes disputed-hierarchy children (e.g. AR-ML~) and any code
  // with a suppressed/missing flag (which must render with no flag at all,
  // never the parent country's flag). A hierarchy child's own landmass still
  // gets a flag tile on the map: SubdivisionMap resolves it to its hierarchy
  // PARENT's entry in this map (same redirect DISPUTED_TERRITORY_HIERARCHY
  // already does for clicks and selection highlighting), so it is shown as
  // part of that subdivision rather than as a flagless gap.
  const subdivisionFlagOverlay = useMemo(() => {
    if (!showFlagMap || !subdivisionCountry) return null;
    const m = new Map<string, string>();
    for (const d of getPlayableSubdivisions(subdivisionCountry.code)) {
      const url = subdivisionFlagUrl(d.code);
      if (url) m.set(d.code, url);
    }
    return m;
  }, [showFlagMap, subdivisionCountry]);

  // City overlay for the world map: every covered country's national capital(s).
  // Modern era only (no city data for historical polities).
  const worldCityOverlay = useMemo(
    () => (isModernEra && showCities ? worldCityMarkers() : null),
    [isModernEra, showCities],
  );

  // City overlay for the subdivision map: the country's national capital(s)
  // plus each subdivision's capital — shown when the ★ toggle is on. With the
  // toggle OFF (the default), selecting a capital via the flag grid/hierarchy
  // chart/a subdivision pick must still show THAT ONE capital — but only that
  // one, never the full always-on overlay the toggle would reveal (owner
  // request 2026-07: "show only the selected capital in this case, not all
  // capitals").
  const subdivisionCityOverlay = useMemo(() => {
    if (!subdivisionCountry) return null;
    const meta = SUBDIVISION_META[subdivisionCountry.code];
    const codes = meta?.divisions.map((d) => d.code) ?? [];
    const all = subdivisionCityMarkers(subdivisionCountry.code, codes);
    if (showCities) return all;
    if (!activeCapitalCityName) return null;
    const selected = all.filter((c) => c.name === activeCapitalCityName);
    return selected.length > 0 ? selected : null;
  }, [showCities, subdivisionCountry, activeCapitalCityName]);

  // Stable callbacks for HistoricalMap — memoised so React.memo() on that
  // component is not bypassed when unrelated state (selected, hovered, …)
  // changes. The deps match what selectionFromPolityName reads from closure.
  //
  // `polityRulers` and `derivedBoundaryNames` MUST stay in these dep lists.
  // selectionFromPolityName reads both, and they are filled in only once the new
  // era's GeoJSON has loaded — after the render in which `eraId` changed. With
  // deps of `[eraId, countryByName]` alone the callback kept the closure built
  // during that earlier render, so every click after an era switch resolved the
  // ruler against the PREVIOUS era's map: the panel lost its "Ruled by" row (1945
  // Annam showed no ruler at all) and a colony could inherit the flag of whoever
  // ruled it in the era before — an anachronistic flag, which the era rules forbid.
  const handleHistoricalSelect = useCallback(
    (name: string | null) => {
      if (!name) {
        setSelected(null);
        setHovered(null);
        return;
      }
      // Clicking the already-selected polity (or another polygon grouped with
      // it, e.g. Iberian Union Spain/Portugal) clears the selection — same
      // toggle as the Unselect button / modern map / flag grid.
      if (selected?.kind === "historical") {
        const already =
          selected.name === name ||
          polityDisplayName(selected.name, eraId) === polityDisplayName(name, eraId);
        if (already) {
          setSelected(null);
          setHovered(null);
          return;
        }
      }
      setSelected(selectionFromPolityName(name));
      setHovered(null);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [eraId, countryByName, polityRulers, derivedBoundaryNames, selected],
  );
  const handleHistoricalHover = useCallback(
    (name: string | null) => {
      setHovered(selectionFromPolityName(name));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [eraId, countryByName, polityRulers, derivedBoundaryNames],
  );
  // Memoised for the same reason — and here it also matters for CORRECTNESS, not
  // just for memo(): this callback stores three freshly-built collections in state,
  // so an inline arrow (a new identity every render) fed HistoricalMap's notify
  // effect its own output and looped forever. HistoricalMap now holds the callback
  // in a ref so it can't happen again from either side; keep this memoised anyway
  // so the map isn't re-rendered on every unrelated LearnPage state change.
  // Groups the era's features into one polity where several NAMEs are the same entity at
  // this date (1600's Spain + Portugal = the Iberian Union), so selecting it highlights the
  // whole territory. MUST stay memoised: HistoricalMap is memo()'d, and an inline arrow here
  // re-renders ~200 polity paths on every LearnPage state change (see the render-loop rule).
  const historicalGroupKeyOf = useCallback(
    (n: string) => polityDisplayName(n, eraId),
    [eraId],
  );

  const handleHistoricalDataLoaded = useCallback(
    (
      names: ReadonlySet<string>,
      rulers: ReadonlyMap<string, string>,
      derived: ReadonlySet<string>,
    ) => {
      setAvailableHistoricalNames(names);
      setPolityRulers(rulers);
      setDerivedBoundaryNames(derived);
    },
    [],
  );

  const democracyColorOverlay = useMemo(() => {
    if (isPersonaMapMode(democracyMapMode)) {
      return getPersonaColorOverlay();
    }
    if (isWvsMapMode(democracyMapMode)) {
      return getWvsColorOverlay(democracyMapMode);
    }
    return getDemocracyColorOverlay(democracyMapMode);
  }, [democracyMapMode]);

  // Hover / tap tooltip for the data-coloured map: the country's value, rating
  // category, fill colour and data year. Built from the SAME overlay the map
  // paints with, so the swatch always matches the country's fill. Memoised so
  // WorldProgressMap only sees a new function when the colour mode changes.
  const mapDataTooltip = useMemo(() => {
    if (democracyMapMode) {
      return (code: string) =>
        getMapDataTooltip(democracyMapMode, code, democracyColorOverlay);
    }
    if (isVisaPassportMode(passportMapMode)) {
      const passportCode = passportMapMode.code;
      const passportName =
        countries.find((c) => c.code === passportCode)?.name ?? passportCode;
      return (code: string) => {
        const cat = visaAccessCategoryFor(passportCode, code);
        const color = passportColorOverlay?.get(code) ?? (cat ? VISA_ACCESS_COLORS[cat] : null);
        return {
          measure: `Visa access (${passportName} passport)`,
          value: cat ? visaAccessCategoryLabel(cat) : null,
          category: null,
          color,
          year: null,
        };
      };
    }
    if (diasporaMapMode) {
      const { kind, code: originCode } = diasporaMapMode;
      const originName =
        countries.find((c) => c.code === originCode)?.name ?? originCode;
      const scale = diasporaScale(kind, originCode);
      const measure =
        kind === "flow"
          ? `Moved from ${originName}, 2015–2020`
          : `Born in ${originName}, living abroad`;
      const year = kind === "flow" ? 2020 : 2020;
      return (code: string) => {
        const color = diasporaColorOverlay?.get(code) ?? null;
        if (code === originCode) {
          return {
            measure,
            value: "Origin country",
            category: null,
            color,
            year,
          };
        }
        const value = diasporaValueFor(kind, originCode, code);
        return {
          measure,
          value:
            value != null
              ? kind === "flow"
                ? `${formatDiasporaNumber(value)} movers`
                : `${formatDiasporaNumber(value)} people`
              : scale
                ? kind === "flow"
                  ? "No flow estimated"
                  : "No stock reported"
                : null,
          category: null,
          color,
          year,
        };
      };
    }
    return null;
  }, [
    democracyMapMode,
    democracyColorOverlay,
    passportMapMode,
    passportColorOverlay,
    diasporaMapMode,
    diasporaColorOverlay,
    countries,
  ]);

  // Rotation + view-centre controls shared by both WorldProgressMap and
  // HistoricalMap so the buttons are always present regardless of era.
  // Memoised so that HistoricalMap’s React.memo() wrapper is not bypassed
  // by a new JSX reference on every rotation-driven render.
  const mapExtraControls = useMemo(
    () => (
      <>
        <hr className="world-map__zoom-divider" />
        {/* Flag + capital layer toggles live in the main toolbar row (after the
            zoom buttons, ahead of rotation/globe) — the most-used controls stay
            one tap away instead of hiding in the kebab overflow. */}
        <button
          type="button"
          className={`world-map__zoom-btn world-map__zoom-btn--layer${showFlagMap ? " world-map__zoom-btn--active" : ""}`}
          onClick={toggleFlagMap}
          aria-pressed={showFlagMap}
          aria-label={showFlagMap ? "Hide flags on map" : "Show flags on map"}
          title={showFlagMap ? "Hide flags on map" : "Show flags on map"}
        >
          <span className="world-map__zoom-icon" aria-hidden="true"><UiIcon name="flag" /></span>
        </button>
        {/* Passport map: cover colours OR visa access for a chosen passport.
            Modern world map only; mutually exclusive with the flag overlay. */}
        {isModernEra && (
          <PassportMapControl
            mode={passportMapMode}
            onChange={handlePassportMapModeChange}
          />
        )}
        {isModernEra && (
          <DiasporaMapControl
            mode={diasporaMapMode}
            onChange={handleDiasporaMapModeChange}
          />
        )}
        {CITIES_FEATURE_ENABLED && (
          <button
            type="button"
            className={`world-map__zoom-btn world-map__zoom-btn--layer${showCities ? " world-map__zoom-btn--active" : ""}`}
            onClick={toggleCities}
            aria-pressed={showCities}
            aria-label={showCities ? "Hide capitals on map" : "Show capitals on map"}
            title={showCities ? "Hide capitals" : "Show capitals"}
          >
            <span className="world-map__zoom-icon" aria-hidden="true"><UiIcon name="pin" /></span>
          </button>
        )}
        {isModernEra && (
          <DemocracyMapControl
            mode={democracyMapMode}
            onChange={handleDemocracyMapModeChange}
          />
        )}
        {/* Rotation + globe (view-centre) are secondary — they collapse into the
            kebab on narrow screens. */}
        <ToolbarOverflow>
          <button
            type="button"
            className="world-map__zoom-btn"
            onClick={toggleRotation}
            aria-label={isRotating ? "Pause rotation" : "Resume rotation"}
            title={isRotating ? "Pause rotation" : "Resume rotation"}
          >
            <UiIcon name={isRotating ? "pause" : "play"} />
          </button>
          <MapViewControl view={mapView} onChange={setMapView} />
        </ToolbarOverflow>
        <hr className="world-map__zoom-divider world-map__zoom-divider--era" />
        <EraPicker currentEraId={eraId} onEraChange={setEraId} />
      </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isRotating, mapView, toggleRotation, showFlagMap, toggleFlagMap, isModernEra, passportMapMode, handlePassportMapModeChange, diasporaMapMode, handleDiasporaMapModeChange, showCities, toggleCities, democracyMapMode, handleDemocracyMapModeChange, eraId, setEraId],
  );

  // Leaner control set for the subdivision map: just the flag-overlay
  // toggle, reusing the same showFlagMap state as the world map (so toggling
  // it on the world map and then drilling into a country keeps it on, and
  // vice versa). SubdivisionMap has no rotation/view-centre controls.
  const subdivisionMapExtraControls = useMemo(
    () => (
      <>
        <hr className="world-map__zoom-divider" />
        {/* Flag + capital toggles inline (after the zoom buttons) — the
            subdivision map has no rotation/globe, so nothing needs a kebab. */}
        <button
          type="button"
          className={`world-map__zoom-btn world-map__zoom-btn--layer${showFlagMap ? " world-map__zoom-btn--active" : ""}`}
          onClick={toggleFlagMap}
          aria-pressed={showFlagMap}
          aria-label={showFlagMap ? "Hide flags on map" : "Show flags on map"}
          title={showFlagMap ? "Hide flags on map" : "Show flags on map"}
        >
          <span className="world-map__zoom-icon" aria-hidden="true"><UiIcon name="flag" /></span>
        </button>
        {CITIES_FEATURE_ENABLED && (
          <button
            type="button"
            className={`world-map__zoom-btn world-map__zoom-btn--layer${showCities ? " world-map__zoom-btn--active" : ""}`}
            onClick={toggleCities}
            aria-pressed={showCities}
            aria-label={showCities ? "Hide capitals on map" : "Show capitals on map"}
            title={showCities ? "Hide capitals" : "Show capitals"}
          >
            <span className="world-map__zoom-icon" aria-hidden="true"><UiIcon name="pin" /></span>
          </button>
        )}
      </>
    ),
    [showFlagMap, toggleFlagMap, showCities, toggleCities],
  );

  const flagUrl = display ? selectionFlag(display, baseUrl) : null;
  // When the grid is showing coats of arms / passports, the map-selection panel
  // shows the SAME symbol for the selected modern country instead of its flag —
  // its image, and its own explainer — while every other row stays put.
  // Historical polities have no symbols, so the panel only ever swaps in the
  // modern era. Crucially this applies ONLY to the map-selection panel, NEVER
  // once the user has drilled into a country ("Explore more flags"): that screen
  // must always lead with the national flag at the top, with coats of arms,
  // passports and every other symbol available BELOW in the National symbols
  // tab — so the swap is suppressed in subdivision mode.
  const effectiveGridContentType: GridContentType = isModernEra
    ? gridContentType
    : "flag";
  // A specific crest clicked in the grid (a UK home nation, or a FIFA entity)
  // wins over the country-resolved symbol — but only while its parent country is
  // the one shown, so it disappears the moment the user selects another country.
  const activeGridCrest =
    !subdivisionMode &&
    gridCrest != null &&
    effectiveGridContentType === "footballcrest" &&
    display?.kind === "modern" &&
    display.country.code === gridCrest.parent
      ? footballCrestById(gridCrest.id)
      : null;
  // Same mechanism as activeGridCrest, for a non-UN IOC-member entity's own
  // National Olympic Committee (Chinese Taipei, Hong Kong, …) — without this,
  // the panel silently fell back to resolving the symbol by the PARENT
  // country's own code, showing e.g. China's NOC when Chinese Taipei's card
  // was clicked (reported by the owner).
  const activeGridOlympicCommittee =
    !subdivisionMode &&
    gridOlympicCommittee != null &&
    effectiveGridContentType === "olympiccommittee" &&
    display?.kind === "modern" &&
    display.country.code === gridOlympicCommittee.parent
      ? olympicCommitteeById(gridOlympicCommittee.id)
      : null;
  const panelSymbolRaw =
    activeGridCrest ??
    activeGridOlympicCommittee ??
    (!subdivisionMode &&
    display?.kind === "modern" &&
    (effectiveGridContentType === "coatofarms" ||
      effectiveGridContentType === "passport" ||
      effectiveGridContentType === "footballcrest" ||
      effectiveGridContentType === "olympiccommittee")
      ? nationalSymbolEntry(display.country.code, effectiveGridContentType)
      : null);
  // Football-association crests always show sourced World Cup rows in the
  // panel — attach them here so the world-map Show path cannot drop them.
  const panelSymbol = panelSymbolRaw
    ? withFootballCrestStats(panelSymbolRaw)
    : null;
  // The ISO alpha-2 (or "XK") code whose OWN borders the world map must
  // highlight. Normally that's just the selected country — but while a
  // FIFA_EXTRA / IOC_EXTRA card's own crest/NOC is active (activeGridCrest /
  // activeGridOlympicCommittee), the panel is describing THAT entity, not its
  // parent, so the map must follow it there too (CLAUDE.md, "The map's
  // highlight and the detail panel must always be the same entity" — the
  // entity is whichever one panelSymbol actually describes). Falls back to
  // the parent's own code when the entity has no distinct world-map polygon
  // of its own (a UK home-nation crest, which shares GB's single polygon).
  const mapHighlightCode =
    (activeGridCrest && gridCrest?.worldCode) ||
    (activeGridOlympicCommittee && gridOlympicCommittee?.worldCode) ||
    (display?.kind === "modern" ? display.country.code : null);
  // A selected symbol that genuinely has NO entity to picture (Vatican City has
  // no National Olympic Committee at all) must show its sourced explanation, not
  // silently fall back to the country's flag — that would misreport a country
  // with no NOC as if its flag WERE its Olympic Committee logo.
  const panelSymbolNoImage = panelSymbol && !panelSymbol.path ? panelSymbol.noImageReason : null;
  // The image the panel actually shows: the symbol when one is selected and
  // bundled, otherwise the national flag (a country with no coat of arms /
  // passport falls back to its flag rather than a blank panel) — UNLESS the
  // symbol itself has no image and says why, which wins over both.
  const displayFlagUrl = panelSymbolNoImage
    ? null
    : panelSymbol?.path
      ? resolveFlag(panelSymbol.path)
      : flagUrl;
  // Reset load-failed state whenever the displayed image changes.
  // NOTE: this ref MUST be declared before the loadError early-return below —
  // hooks after a conditional return violate the Rules of Hooks, and when
  // loadError flipped on, React threw "Rendered fewer hooks than expected"
  // and unmounted the entire app (blank page) instead of showing the error card.
  const prevFlagUrlRef = useRef<string | null>(null);
  if (prevFlagUrlRef.current !== displayFlagUrl) {
    prevFlagUrlRef.current = displayFlagUrl;
    // Sync reset without triggering an extra render cycle
    if (flagLoadFailed) setFlagLoadFailed(false);
  }

  if (loadError && isModernEra) {
    return (
      <div className="app app--center">
        <main className="card card--error">
          <h1>Couldn’t load countries</h1>
          <p className="error-message">{loadError}</p>
          <p className="hint">Check your connection and refresh the page.</p>
          <p className="game-home-link">
            <Link to="/"><UiIcon name="back" /> Back to home</Link>
          </p>
        </main>
      </div>
    );
  }
  const flagPngFallback =
    !panelSymbol &&
    display?.kind === "modern" &&
    !FLAGCDN_FALLBACK_EXCLUDED.has(display.country.code)
      ? `https://flagcdn.com/${display.country.code.toLowerCase()}.png`
      : null

  // Compact "Add to my list" +/✓ button, rendered inside the country-search row
  // so it sits centred against the dropdown. Modern-era only.
  const renderHanaCorner = (code: string, name: string) => {
    if (!isModernEra) return null;
    const inList = hanaCodes.includes(code);
    return (
      <button
        type="button"
        className={`learn-fs__hana-corner${inList ? " learn-fs__hana-corner--added" : ""}`}
        onClick={() => toggleHanaForCode(code)}
        aria-pressed={inList}
        aria-label={inList ? `Remove ${name} from your list` : `Add ${name} to your list`}
        title={inList ? `Remove ${name} from your list` : `Add ${name} to your list`}
      >
        <UiIcon name={inList ? "check" : "plus"} />
      </button>
    );
  };

  // A labelled "Flag" block: the "FLAG" label sits at the top-left (left-aligned
  // with the other detail labels), and the flag spans the full widget width
  // below it (never wider than the widget), with its "click to enlarge" caption
  // left-aligned. Same for national + subnational.
  const flagRow = (flagButton: React.ReactNode, label = "Flag") => (
    <div className="learn-fs__flag-head">
      <span className="entity-summary__label learn-fs__flag-label">{label}</span>
      {flagButton}
    </div>
  );

  // The panel's flag block — the image plus, for a modern country, its sourced
  // explainer. Held in a variable because the two eras place it differently: a
  // modern country's flag LEADS the widget (immediately under the country
  // dropdown, explainer right below it), while a historical polity's stays below
  // its fact-sheet, with the ruler caption and dated no-flag lines that belong
  // with it. Same element either way — only the slot differs.
  const panelFlagBox =
    display && (displayFlagUrl || panelSymbolNoImage) && !flagLoadFailed ? (
      <div className="learn-fs__flag-box">
        {panelSymbolNoImage
          ? flagRow(
              // No entity to picture at all (Vatican City has no National
              // Olympic Committee) — the reason IS the content here, exactly
              // like NationalFlagDetails' own noImageReason branch.
              <p className="learn-fs__no-image">
                <strong>No image shown.</strong> {panelSymbolNoImage}
              </p>,
              panelSymbol ? symbolNoun(panelSymbol.category) : "Flag",
            )
          : flagRow(
              <button
                type="button"
                className="learn-fs__flag"
                onClick={() => displayFlagUrl && enlargeFlag(displayFlagUrl)}
                aria-label={
                  panelSymbol
                    ? `Enlarge ${panelSymbol.name}`
                    : `Enlarge ${selectionName(display, eraId)} flag`
                }
              >
                <img
                  key={displayFlagUrl}
                  src={displayFlagUrl ?? undefined}
                  alt=""
                  className="learn-fs__flag-img"
                  draggable={false}
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (flagPngFallback && img.src !== flagPngFallback) {
                      img.src = flagPngFallback;
                    } else {
                      setFlagLoadFailed(true);
                    }
                  }}
                />
                <span className="learn-fs__flag-hint" aria-hidden="true">
                  <UiIcon name="expand" /> Click to enlarge
                </span>
              </button>,
              // A symbol carries its own noun so the block never labels a
              // coat of arms or a passport "Flag".
              panelSymbol ? symbolNoun(panelSymbol.category) : "Flag",
            )}
        {display.kind === "modern" &&
          (panelSymbol ? (
            // The explainer follows what's displayed: the symbol's own
            // sourced description + meaning (same wording as the National
            // symbols tab), not the national flag's.
            <>
              <p className="learn-fs__flag-design">{panelSymbol.design}</p>
              <FlagMeaning
                code={panelSymbol.id}
                meanings={NATIONAL_FLAG_MEANINGS}
                label={meaningLabel(panelSymbol.category)}
              />
              {panelSymbol.stats && panelSymbol.stats.length > 0 && (
                // Same generic stats list NationalFlagDetails renders in the
                // "National symbols" tab — kept identical here so a symbol's
                // comparable facts (an Olympic Committee's Games/medal rows, a
                // football association's World Cup participations/titles) read
                // the same whether reached from the world map or from drilling
                // into the country's own tab.
                <dl className="entity-summary">
                  {panelSymbol.stats.map((stat) => (
                    <div className="entity-summary__row" key={stat.label}>
                      <dt className="entity-summary__label">{stat.label}</dt>
                      <dd className="entity-summary__value">{stat.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </>
          ) : (
            <FlagMeaning code={display.country.code} />
          ))}
      </div>
    ) : null;

  // Divisions of the country currently drilled into — powers the sub-national
  // dropdown in the second widget box (subdivision mode only).
  const subdivisionDivisions: SubdivisionMeta[] =
    subdivisionMode && subdivisionCountry
      ? SUBDIVISION_META[subdivisionCountry.code]?.divisions ?? []
      : [];

  // Stable id for the currently-displayed entity — used by FlagGrid to
  // highlight the matching tile.
  const selectedId =
    display?.kind === "modern"
      ? display.country.code
      : display?.kind === "historical"
        ? display.name
        : null;

  /** Select a modern country from the map or democracy chart — or clear the
   *  panel when the click is on the country that is already selected. */
  /** Hover from the index chart or the personas map previews that country in the panel. */
  const handleChartHover = useCallback(
    (code: string | null) => {
      if (!code) {
        hoverClearTimer.current = setTimeout(() => {
          setHovered(null);
          hoverClearTimer.current = null;
        }, 200);
        return;
      }
      if (hoverClearTimer.current) {
        clearTimeout(hoverClearTimer.current);
        hoverClearTimer.current = null;
      }
      const c = codeToCountry.get(code);
      if (c) setHovered({ kind: "modern", country: c });
    },
    [codeToCountry],
  );
  const handleModernMapOrChartSelect = useCallback(
    (code: string) => {
      const c = codeToCountry.get(code);
      if (!c) return;
      if (hoverClearTimer.current) {
        clearTimeout(hoverClearTimer.current);
        hoverClearTimer.current = null;
      }
      if (selected?.kind === "modern" && selected.country.code === c.code) {
        clearPanelSelection();
        return;
      }
      setSelected({ kind: "modern", country: c });
      setHovered(null);
      // Selecting a different country directly on the map/chart must not leave a
      // previous country's airline/broadcaster/crest/olympic-committee grid pick
      // behind — the map and the grid always describe the same entity (see
      // handleGridSelect). Multi-item Show categories open the country chooser
      // until the user picks a specific item.
      clearGridItemSelection();
    },
    [codeToCountry, selected, clearPanelSelection, clearGridItemSelection],
  );

  function handleGridSelect(
    id: string,
    crestId?: string,
    airlineId?: string,
    broadcasterId?: string,
    tourismLogoId?: string,
    newsAgencyId?: string,
    olympicCommitteeId?: string,
    worldMapCode?: string,
    newspaperId?: string,
    partyId?: string,
    centralBankId?: string,
  ) {
    if (isModernEra) {
      // `id` is always the entity's own country code (an airline/broadcaster tile's
      // `selectId` is set to its parent country — see FlagGrid). Select that country
      // on every grid click, airline/broadcaster tiles included: the map's highlight
      // and the detail panel must always describe the same entity (CLAUDE.md, "The
      // map's highlight and the detail panel must always be the same entity"). An
      // earlier version left the map/panel untouched for airline/broadcaster clicks
      // so browsing one country's airline wouldn't disturb a different country
      // already shown — but with nothing selected yet that left the panel on its
      // empty welcome state and the map blank no matter how many times the card was
      // clicked, and it let a stale airline/broadcaster survive a later country
      // change on the map. Always keeping map = panel = grid in sync fixes both.
      const c = codeToCountry.get(id);
      if (!c) return;

      // Re-clicking the already-active grid card clears the selection — same
      // toggle as the Unselect button and clicking the selected country on the
      // map/chart. Match on the specific Show-item id when the tile carries one
      // (airline, party, home-nation crest, …); otherwise on the country itself.
      const countryAlreadySelected =
        selected?.kind === "modern" && selected.country.code === c.code;
      if (countryAlreadySelected) {
        const reclickSameItem =
          crestId != null
            ? gridCrest?.id === crestId
            : olympicCommitteeId != null
              ? gridOlympicCommittee?.id === olympicCommitteeId
              : airlineId != null
                ? gridAirlineId === airlineId
                : broadcasterId != null
                  ? gridBroadcasterId === broadcasterId
                  : tourismLogoId != null
                    ? gridTourismLogoId === tourismLogoId
                    : newsAgencyId != null
                      ? gridNewsAgencyId === newsAgencyId
                      : newspaperId != null
                        ? gridNewspaperId === newspaperId
                        : partyId != null
                          ? gridPartyId === partyId
                          : centralBankId != null
                            ? gridCentralBankId === centralBankId
                          : true;
        if (reclickSameItem) {
          clearPanelSelection();
          return;
        }
      }

      setSelected({ kind: "modern", country: c });
      setHovered(null);
      // Exactly one of crestId/airlineId/broadcasterId is ever passed for a given
      // tile, so setting all three grid-specific picks here (nulling the ones that
      // don't apply) always leaves just the clicked one active — a football-crest
      // click no longer gets its own gridCrest wiped out by this same call, which
      // is why a home-nation crest never stuck before this fix.
      setGridCrest(
        crestId && gridContentType === "footballcrest"
          ? { id: crestId, parent: c.code, worldCode: worldMapCode }
          : null,
      );
      setGridOlympicCommittee(
        olympicCommitteeId && gridContentType === "olympiccommittee"
          ? { id: olympicCommitteeId, parent: c.code, worldCode: worldMapCode }
          : null,
      );
      setGridAirlineId(airlineId ?? null);
      setGridBroadcasterId(broadcasterId ?? null);
      setGridTourismLogoId(tourismLogoId ?? null);
      setGridNewsAgencyId(newsAgencyId ?? null);
      setGridNewspaperId(newspaperId ?? null);
      setGridPartyId(partyId ?? null);
      setGridCentralBankId(centralBankId ?? null);
      if (airlineId) {
        setGridContentType("airline");
        syncPanelTabsFromShow("airline");
      } else if (broadcasterId) {
        setGridContentType("broadcaster");
        syncPanelTabsFromShow("broadcaster");
      } else if (tourismLogoId) {
        setGridContentType("tourismlogo");
        syncPanelTabsFromShow("tourismlogo");
      } else if (newsAgencyId) {
        setGridContentType("newsagency");
        syncPanelTabsFromShow("newsagency");
      } else if (newspaperId) {
        setGridContentType("newspaper");
        syncPanelTabsFromShow("newspaper");
      } else if (partyId) {
        setGridContentType("party");
        syncPanelTabsFromShow("party");
      } else if (centralBankId) {
        setGridContentType("centralbank");
        syncPanelTabsFromShow("centralbank");
      } else {
        syncPanelTabsFromShow(gridContentType);
      }
    } else {
      // Historical flag-grid tile: same toggle — re-clicking the open polity clears it.
      if (selected?.kind === "historical") {
        const already =
          selected.name === id ||
          polityDisplayName(selected.name, eraId) === polityDisplayName(id, eraId);
        if (already) {
          clearPanelSelection();
          return;
        }
      }
      const sel = selectionFromPolityName(id);
      if (!sel) return;
      setSelected(sel);
      setHovered(null);
    }
    // Scroll to the absolute top so the user sees the map and the panel from
    // the very start (see the global `overflow-anchor: none` in index.css —
    // without it, the info panel growing from the "Learn your flags"
    // placeholder to the full fact-sheet made the browser's scroll anchoring
    // shove scrollY back UP right as this animation started).
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Pick / clear helpers for the Media · Travel · Sports · Politics panel tabs.
  const pickPanelCategoryItem = useCallback(
    (
      type:
        | LearnPanelMediaSection
        | LearnPanelTravelSection
        | LearnPanelSportsSection
        | LearnPanelFinanceSection
        | "party",
      id: string,
      countryCode?: string,
    ) => {
      if (type === "airline") setGridAirlineId(id);
      else if (type === "broadcaster") setGridBroadcasterId(id);
      else if (type === "tourismlogo") setGridTourismLogoId(id);
      else if (type === "passport") setGridPassportId(id);
      else if (type === "newsagency") setGridNewsAgencyId(id);
      else if (type === "newspaper") setGridNewspaperId(id);
      else if (type === "centralbank") setGridCentralBankId(id);
      else if (type === "footballcrest") {
        setGridCrest({ id, parent: countryCode ?? "" });
      } else if (type === "olympiccommittee") {
        setGridOlympicCommittee({ id, parent: countryCode ?? "" });
      } else setGridPartyId(id);
    },
    [],
  );

  const clearPanelCategoryPick = useCallback(
    (
      type:
        | LearnPanelMediaSection
        | LearnPanelTravelSection
        | LearnPanelSportsSection
        | LearnPanelFinanceSection
        | "party",
    ) => {
      if (type === "airline") setGridAirlineId(null);
      else if (type === "broadcaster") setGridBroadcasterId(null);
      else if (type === "tourismlogo") setGridTourismLogoId(null);
      else if (type === "passport") setGridPassportId(null);
      else if (type === "newsagency") setGridNewsAgencyId(null);
      else if (type === "newspaper") setGridNewspaperId(null);
      else if (type === "centralbank") setGridCentralBankId(null);
      else if (type === "footballcrest") setGridCrest(null);
      else if (type === "olympiccommittee") setGridOlympicCommittee(null);
      else setGridPartyId(null);
    },
    [],
  );

  // True when the panel is showing a firm country selection (not hover-preview).
  // Media / Travel / Politics choosers only open on a real select — hovering
  // must not force an arbitrary first airline/party into the widget.
  const modernCountrySelected =
    !subdivisionMode &&
    selected?.kind === "modern" &&
    display?.kind === "modern" &&
    selected.country.code === display.country.code;

  // Keep the panel tab inside the subdivision-only set when drilling in.
  useEffect(() => {
    if (!subdivisionMode) return;
    if (
      panelTab !== "facts" &&
      panelTab !== "finance" &&
      panelTab !== "indices"
    ) {
      setPanelTab("facts");
    }
  }, [subdivisionMode, panelTab]);

  // Resolver passed to FlagGrid so it can render absolute http(s) URLs,
  // relative historical-flags/*.png paths, AND bundled flag paths that
  // already include the base URL (country.flagSvg = `${BASE}flags/xx.svg`).
  // The last case must NOT be prefixed again or it becomes `/base/base/...`.
  function resolveFlag(raw: string): string {
    if (/^https?:\/\//.test(raw) || raw.startsWith("data:")) return raw;
    if (raw.startsWith(baseUrl)) return raw;
    return `${baseUrl}${raw.replace(/^\//, "")}`;
  }

  const currentCountry =
    anthemTarget
      ? { code: anthemTarget.code, name: anthemTarget.name, flagSvg: anthemTarget.flagUrl }
      : display?.kind === "modern"
        ? display.country
        : (subdivisionMode && subdivisionCountry)
          ? { code: subdivisionCountry.code, name: subdivisionCountry.name, flagSvg: subdivisionCountry.flagSvg }
          : null;

  return (
    <div className={`learn-page${isAtlas ? " learn-page--atlas" : ""}`}>
      {subdivisionMode && (() => {
        const slot = document.getElementById(SITE_TOPBAR_LEFT_SLOT_ID);
        if (!slot) return null;
        return createPortal(
          <button
            type="button"
            className="site-topbar__back"
            onClick={exitSubdivisionMode}
            aria-label="World map"
            title="World map"
          >
            <span className="site-topbar__btn-icon" aria-hidden="true"><UiIcon name="back" /></span>
            <span className="site-topbar__btn-label">World map</span>
          </button>,
          slot,
        );
      })()}
    {subdivisionMode && subdivisionCountry && (
      <nav className="learn-breadcrumb" aria-label="Location">
        <button
          type="button"
          className="learn-breadcrumb__crumb"
          onClick={exitSubdivisionMode}
        >
          <UiIcon name="globe" /> World
        </button>
        <span className="learn-breadcrumb__sep" aria-hidden="true">›</span>
        {selectedSubdivision ? (
          <>
            <button
              type="button"
              className="learn-breadcrumb__crumb"
              onClick={() => setSelectedSubdivision(null)}
            >
              {subdivisionCountry.name}
            </button>
            <span className="learn-breadcrumb__sep" aria-hidden="true">›</span>
            <span className="learn-breadcrumb__here" aria-current="page">
              {selectedSubdivision.name}
            </span>
          </>
        ) : (
          <span className="learn-breadcrumb__here" aria-current="page">
            {subdivisionCountry.name}
          </span>
        )}
      </nav>
    )}
    <div
      className={`learn-fs${subdivisionMode ? " learn-fs--drilldown" : ""}${
        panelCollapsed ? " learn-fs--panel-collapsed" : ""
      }`}
    >
      <div className="learn-fs__map-col">
      <div className="learn-fs__map-stick">
      <div className="learn-fs__map" aria-label="World map">
        {isModernEra && subdivisionMode ? (
          <SubdivisionMap
            geoData={subdivisionGeo}
            loading={subdivisionLoading}
            selectedCode={selectedSubdivision?.code ?? null}
            countryCode={subdivisionCountry?.code}
            onSelect={(code) => {
              // Re-clicking the open division clears it.
              if (selectedSubdivision?.code === code) {
                setSelectedSubdivision(null);
                setSelectedCapital(null);
                return;
              }
              const countryMeta = subdivisionCountry ? SUBDIVISION_META[subdivisionCountry.code] : null;
              let meta = countryMeta?.divisions.find((d) => d.code === code);
              if (!meta && subdivisionGeo) {
                // HARD RULE (CLAUDE.md "Every rendered subdivision must be
                // selectable"): the map rendered this subdivision, so a click MUST
                // select it — never silently no-op because SUBDIVISION_META lacks
                // the code (geo/meta drift). `check-subdivision-meta-coverage`
                // prevents that drift in the build; this synthesizes a minimal
                // entry from the GeoJSON as a runtime safety net.
                const feat = subdivisionGeo.features.find((f) => {
                  const c = (f.properties.iso_3166_2 || f.properties.name || "").trim().toUpperCase();
                  return c === code;
                });
                if (feat)
                  meta = { code, name: feat.properties.name_en || feat.properties.name || code, typeLabel: "" };
              }
              if (meta) setSelectedSubdivision(meta);
            }}
            onHover={undefined}
            disabled={false}
            countryResults={{}}
            flagOverlay={subdivisionFlagOverlay}
            cityOverlay={subdivisionCityOverlay}
            activeCityName={activeCapitalCityName}
            extraControls={subdivisionMapExtraControls}
          />
        ) : isModernEra ? (
          <WorldProgressMap
            countryResults={{}}
            selectedCode={mapHighlightCode}
            disabled={countries.length === 0}
            selectable={{
              codes,
              names,
              // WorldProgressMap resolves territory codes to parent country
              // codes before calling onSelect/onHover, so these handlers
              // always receive a sovereign-country code.
              onSelect: handleModernMapOrChartSelect,
              onHover: (code) => {
                if (!code) {
                  // Debounce: give the mouse 200ms to reach the side panel
                  // before clearing the hover display.
                  hoverClearTimer.current = setTimeout(() => {
                    setHovered(null);
                    hoverClearTimer.current = null;
                  }, 200);
                  return;
                }
                if (hoverClearTimer.current) {
                  clearTimeout(hoverClearTimer.current);
                  hoverClearTimer.current = null;
                }
                const c = codeToCountry.get(code);
                if (c) setHovered({ kind: "modern", country: c });
              },
              // Rule #2: UNDISPUTED only — disputed territories must not be
              // clickable on the map (see territoryParentMap.ts Rule #2 comment).
              territoryParent: UNDISPUTED_TERRITORY_PARENT,
            }}
            highlightCodes={territoryHighlightCodes}
            zoom={sharedZoom}
            centerLongitude={mapView.centerLongitude}
            rotationOffset={rotationOffset}
            southUp={mapView.southUp}
            showSubnationalBorders={mapView.showSubnationalBorders}
            extraControls={mapExtraControls}
            flagOverlay={modernFlagOverlay}
            fillOverride={democracyColorOverlay ?? passportColorOverlay ?? diasporaColorOverlay}
            cityOverlay={worldCityOverlay}
            dataTooltip={isModernEra ? mapDataTooltip : null}
            belowMapNode={
              isModernEra && democracyMapMode ? (
                <DemocracyMapLegend mode={democracyMapMode} />
              ) : isModernEra && isVisaPassportMode(passportMapMode) ? (
                <VisaAccessMapLegend passportCode={passportMapMode.code} />
              ) : isModernEra && diasporaMapMode ? (
                <DiasporaMapLegend
                  kind={diasporaMapMode.kind}
                  originCode={diasporaMapMode.code}
                />
              ) : null
            }
          />
        ) : (
          <HistoricalMap
            geoJsonUrl={`${baseUrl}${era.dataUrl}`}
            // `display` (selected ?? hovered) is what the panel and the flag grid
            // describe, so it is also what the map highlights — one source of
            // truth. The map takes no separate hovered name: when it did, hover
            // outranked the selection there while the panel resolved the other
            // way, so the two named different polities at once.
            selectedName={
              display?.kind === "historical" ? display.name : null
            }
            onSelect={handleHistoricalSelect}
            onHover={handleHistoricalHover}
            zoom={sharedZoom}
            centerLongitude={mapView.centerLongitude}
            southUp={mapView.southUp}
            extraControls={mapExtraControls}
            onDataLoaded={handleHistoricalDataLoaded}
            flagOverlay={historicalFlagOverlay}
            // Group by the name actually SHOWN for this era, so a personal union spanning
            // several features (1600's Iberian Union over Spain and Portugal) highlights
            // its whole territory as one polity. No geometry is involved.
            groupKeyOf={historicalGroupKeyOf}
          />
        )}
      </div>
      </div>
      {isModernEra && !subdivisionMode && (
        <div className="learn-fs__chart-accordion">
          <button
            type="button"
            className="learn-fs__chart-accordion-toggle"
            aria-expanded={democracyChartEnabled}
            aria-controls={democracyChartPanelId}
            onClick={() => setDemocracyChartEnabled((v) => !v)}
          >
            <span className="learn-fs__chart-accordion-label">See chart</span>
            <span className="learn-fs__chart-accordion-chev" aria-hidden="true">
              {democracyChartEnabled ? "▾" : "▸"}
            </span>
          </button>
          {democracyChartEnabled && (
            <div
              className="learn-fs__chart-accordion-panel"
              id={democracyChartPanelId}
            >
              <DemocracyIndexChart
                countries={countries as Country[]}
                xKey={democracyChartXKey}
                yKey={democracyChartYKey}
                onXKeyChange={setDemocracyChartXKey}
                onYKeyChange={setDemocracyChartYKey}
                selectedCode={
                  selected?.kind === "modern" ? selected.country.code : null
                }
                hoveredCode={
                  hovered?.kind === "modern" ? hovered.country.code : null
                }
                onSelect={handleModernMapOrChartSelect}
                onHover={handleChartHover}
              />
            </div>
          )}
        </div>
      )}
      {isModernEra && !subdivisionMode && (
        <div className="learn-fs__chart-accordion">
          <button
            type="button"
            className="learn-fs__chart-accordion-toggle"
            aria-expanded={personaMapEnabled}
            aria-controls={personaMapPanelId}
            onClick={() => setPersonaMapEnabled((v) => !v)}
          >
            <span className="learn-fs__chart-accordion-label">See country personas map</span>
            <span className="learn-fs__chart-accordion-chev" aria-hidden="true">
              {personaMapEnabled ? "▾" : "▸"}
            </span>
          </button>
          {personaMapEnabled && (
            <div
              className="learn-fs__chart-accordion-panel"
              id={personaMapPanelId}
            >
              <PersonaMapChart
                nameOf={(code) => codeToCountry.get(code)?.name ?? ""}
                selectedCode={
                  selected?.kind === "modern" ? selected.country.code : null
                }
                onSelect={handleModernMapOrChartSelect}
                onHover={handleChartHover}
              />
            </div>
          )}
        </div>
      )}
      </div>

      <div
        className="learn-fs__panel-wrap"
        aria-hidden={panelCollapsed ? true : undefined}
      >
        <button
          type="button"
          className="learn-fs__panel-drawer-btn learn-fs__panel-drawer-btn--hide"
          onClick={() => setPanelDismissed(true)}
          aria-label="Hide information panel"
          title="Hide information panel"
        >
          <UiIcon name="next" />
          <span className="learn-fs__panel-drawer-label">Hide</span>
        </button>
        <aside className="learn-fs__panel" aria-live="polite">
          <div className="learn-fs__detail">
            {isModernEra && (
              <div className="learn-fs__widget-search">
                <span className="learn-fs__search-label" aria-hidden="true">
                  Choose a country
                </span>
                <div className="learn-fs__search-row">
                  <CountryDropdown
                    countries={countries as Country[]}
                    value={
                      // While drilled in, the dropdown must always show the
                      // country we're inside (subdivisionCountry) — never go
                      // empty if `display` momentarily clears (e.g. drilled in
                      // from a hovered, not selected, country).
                      subdivisionMode && subdivisionCountry
                        ? codeToCountry.get(subdivisionCountry.code) ?? null
                        : display?.kind === "modern"
                          ? display.country
                          : null
                    }
                    onChange={(c) => {
                      if (!c) return;
                      // In the drill-in view, picking a country re-enters that
                      // country's subdivisions; otherwise it just selects it.
                      if (subdivisionMode) {
                        enterSubdivisionModeForCountry(c);
                      } else {
                        setSelected({ kind: "modern", country: c });
                        setHovered(null);
                        // Same reasoning as the map's onSelect: don't leave a previous
                        // country's airline/broadcaster/crest/party grid pick behind.
                        clearGridItemSelection();
                      }
                    }}
                    disabled={countries.length === 0}
                    label="Choose a country"
                    listPlacement="down"
                  />
                  {subdivisionMode && subdivisionCountry
                    ? renderHanaCorner(subdivisionCountry.code, subdivisionCountry.name)
                    : display?.kind === "modern" &&
                      renderHanaCorner(display.country.code, display.country.name)}
                  {(selected != null || (subdivisionMode && subdivisionCountry != null)) && (
                    <button
                      type="button"
                      className="learn-fs__unselect"
                      onClick={clearPanelSelection}
                      aria-label="Unselect"
                      title="Unselect"
                    >
                      <UiIcon name="close" />
                    </button>
                  )}
                </div>
              </div>
            )}
            {/* Historical eras have no country search row — put Unselect on the
                polity title instead. */}
            {!isModernEra && selected != null && (
              <button
                type="button"
                className="learn-fs__unselect learn-fs__unselect--corner"
                onClick={clearPanelSelection}
                aria-label="Unselect"
                title="Unselect"
              >
                <UiIcon name="close" />
              </button>
            )}
            {display ? (
              <>
                {/* Show the continent+name title ONLY for historical polities.
                    In the modern era the country's name is already shown in the
                    search bar at the top of the widget (both normal and
                    subdivision mode), so a title here would duplicate it; its
                    continent lives in the Details section instead. */}
                {display.kind === "historical" && (
                  <>
                    <p className="learn-fs__continent">
                      {selectionContinent(display)}
                    </p>
                    <h2 className="learn-fs__name">{selectionName(display, eraId)}</h2>
                  </>
                )}
                {display.kind === "modern" ? (
                  <>
                    <LearnInfoTabs
                      active={
                        subdivisionMode &&
                        panelTab !== "facts" &&
                        panelTab !== "finance" &&
                        panelTab !== "indices"
                          ? "facts"
                          : panelTab
                      }
                      onChange={setPanelTab}
                      tabs={subdivisionMode ? LEARN_PANEL_SUBDIVISION_TABS : undefined}
                    />
                    <div className="flag-tabs__panel learn-panel-tabs__panel" role="tabpanel">
                      {(subdivisionMode
                        ? panelTab === "indices"
                          ? "indices"
                          : panelTab === "finance"
                            ? "finance"
                            : "facts"
                        : panelTab) === "facts" && (
                        <>
                          {/* Flag / coat of arms lead Overview via pills.
                              Passports, crests and Olympic logos live on
                              Travel / Sports instead. */}
                          {!flagLoadFailed && (
                            <OverviewIdentity
                              country={display.country}
                              active={overviewIdentity}
                              onChange={setOverviewIdentity}
                              flagUrl={flagUrl}
                              flagPngFallback={
                                !FLAGCDN_FALLBACK_EXCLUDED.has(display.country.code)
                                  ? `https://flagcdn.com/${display.country.code.toLowerCase()}.png`
                                  : null
                              }
                              baseUrl={baseUrl}
                              onEnlarge={enlargeFlag}
                              onFlagError={() => setFlagLoadFailed(true)}
                            />
                          )}
                          <EntitySummary
                            kind="modern"
                            country={display.country}
                            section="facts"
                            footer={
                              <div className="entity-summary__row">
                                <dt className="entity-summary__label">Anthem</dt>
                                <dd className="entity-summary__value">
                                  <button
                                    type="button"
                                    className="learn-fs__anthem-btn"
                                    onClick={() => {
                                      setAnthemTarget({
                                        code: display.country.code,
                                        name: display.country.name,
                                        flagUrl: selectionFlag(display, baseUrl),
                                      });
                                      anthemPlayerRef.current?.play();
                                    }}
                                    aria-label={`Play national anthem of ${display.country.name}`}
                                  >
                                    <UiIcon name="play" /> Play
                                  </button>
                                </dd>
                              </div>
                            }
                          />
                        </>
                      )}
                      {(subdivisionMode
                        ? panelTab === "finance"
                        : panelTab === "finance") && (
                        <>
                          <EntitySummary
                            kind="modern"
                            country={display.country}
                            section="finance"
                          />
                          {!subdivisionMode && modernCountrySelected && (
                            <LearnPanelCategoryBody
                              sections={LEARN_PANEL_FINANCE_SECTIONS}
                              activeSection={financeSection}
                              onSectionChange={(id) =>
                                setFinanceSection(id as LearnPanelFinanceSection)
                              }
                              countryCode={display.country.code}
                              countryName={display.country.name}
                              pickedId={gridCentralBankId}
                              onPick={(id) =>
                                pickPanelCategoryItem("centralbank", id)
                              }
                              onClearPick={() =>
                                clearPanelCategoryPick("centralbank")
                              }
                              resolveImage={resolveFlag}
                              baseUrl={baseUrl}
                              onEnlarge={enlargeLogo}
                            />
                          )}
                        </>
                      )}
                      {(subdivisionMode
                        ? panelTab === "indices"
                        : panelTab === "indices") && (
                        <EntitySummary
                          kind="modern"
                          country={display.country}
                          section="indices"
                        />
                      )}
                      {!subdivisionMode && panelTab === "media" && (
                        modernCountrySelected ? (
                          <LearnPanelCategoryBody
                            sections={LEARN_PANEL_MEDIA_SECTIONS}
                            activeSection={mediaSection}
                            onSectionChange={(id) =>
                              setMediaSection(id as LearnPanelMediaSection)
                            }
                            countryCode={display.country.code}
                            countryName={display.country.name}
                            pickedId={
                              mediaSection === "newspaper"
                                ? gridNewspaperId
                                : mediaSection === "newsagency"
                                  ? gridNewsAgencyId
                                  : gridBroadcasterId
                            }
                            onPick={(id) => pickPanelCategoryItem(mediaSection, id)}
                            onClearPick={() => clearPanelCategoryPick(mediaSection)}
                            resolveImage={resolveFlag}
                            baseUrl={baseUrl}
                            onEnlarge={enlargeLogo}
                          />
                        ) : (
                          <p className="learn-panel-tabs__empty">
                            Select {display.country.name} to browse its newspapers,
                            news agencies and broadcasters.
                          </p>
                        )
                      )}
                      {!subdivisionMode && panelTab === "travel" && (
                        modernCountrySelected ? (
                          <div className="learn-panel-category">
                            <TravelVisitorStats
                              countryCode={display.country.code}
                            />
                            <div
                              className="learn-panel-category__sections"
                              role="tablist"
                              aria-label="Travel"
                            >
                              {LEARN_PANEL_TRAVEL_SECTIONS.map((s) => {
                                const selected = s.id === travelSection;
                                return (
                                  <button
                                    key={s.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={selected}
                                    className={`learn-panel-category__section${
                                      selected
                                        ? " learn-panel-category__section--active"
                                        : ""
                                    }`}
                                    onClick={() => setTravelSection(s.id)}
                                  >
                                    {s.label}
                                  </button>
                                );
                              })}
                            </div>
                            {travelSection === "passport" ? (
                              <LearnPanelSymbolBody
                                sections={[
                                  { id: "passport", label: "Passports" },
                                ]}
                                activeSection="passport"
                                onSectionChange={() => {}}
                                countryCode={display.country.code}
                                countryName={display.country.name}
                                pickedId={gridPassportId}
                                onPick={(id) =>
                                  pickPanelCategoryItem("passport", id)
                                }
                                onClearPick={() =>
                                  clearPanelCategoryPick("passport")
                                }
                                baseUrl={baseUrl}
                                onEnlarge={enlargeFlag}
                              />
                            ) : (
                              <LearnPanelCategoryBody
                                sections={[
                                  {
                                    id: travelSection,
                                    label:
                                      travelSection === "airline"
                                        ? "Airlines"
                                        : "Tourism",
                                  },
                                ]}
                                activeSection={travelSection}
                                onSectionChange={() => {}}
                                countryCode={display.country.code}
                                countryName={display.country.name}
                                pickedId={
                                  travelSection === "airline"
                                    ? gridAirlineId
                                    : gridTourismLogoId
                                }
                                onPick={(id) =>
                                  pickPanelCategoryItem(travelSection, id)
                                }
                                onClearPick={() =>
                                  clearPanelCategoryPick(travelSection)
                                }
                                resolveImage={resolveFlag}
                                baseUrl={baseUrl}
                                onEnlarge={enlargeLogo}
                              />
                            )}
                          </div>
                        ) : (
                          <p className="learn-panel-tabs__empty">
                            Select {display.country.name} to browse its airlines,
                            tourism logos and passports.
                          </p>
                        )
                      )}
                      {!subdivisionMode && panelTab === "sports" && (
                        modernCountrySelected ? (
                          <LearnPanelSymbolBody
                            sections={LEARN_PANEL_SPORTS_SECTIONS}
                            activeSection={sportsSection}
                            onSectionChange={(id) =>
                              setSportsSection(id as LearnPanelSportsSection)
                            }
                            countryCode={display.country.code}
                            countryName={display.country.name}
                            pickedId={
                              sportsSection === "footballcrest"
                                ? gridCrest?.id ?? null
                                : gridOlympicCommittee?.id ?? null
                            }
                            onPick={(id) =>
                              pickPanelCategoryItem(
                                sportsSection,
                                id,
                                display.country.code,
                              )
                            }
                            onClearPick={() =>
                              clearPanelCategoryPick(sportsSection)
                            }
                            baseUrl={baseUrl}
                            onEnlarge={enlargeFlag}
                          />
                        ) : (
                          <p className="learn-panel-tabs__empty">
                            Select {display.country.name} to browse its football
                            associations and Olympic committees.
                          </p>
                        )
                      )}
                      {!subdivisionMode && panelTab === "politics" && (
                        modernCountrySelected ? (
                          <>
                            <EntitySummary
                              kind="modern"
                              country={display.country}
                              section="politics"
                            />
                            <LearnPanelCategoryBody
                              sections={[{ id: "party", label: "Political parties" }]}
                              activeSection="party"
                              onSectionChange={() => {}}
                              countryCode={display.country.code}
                              countryName={display.country.name}
                              pickedId={gridPartyId}
                              onPick={(id) => pickPanelCategoryItem("party", id)}
                              onClearPick={() => clearPanelCategoryPick("party")}
                              resolveImage={resolveFlag}
                              baseUrl={baseUrl}
                              onEnlarge={enlargeLogo}
                            />
                          </>
                        ) : (
                          <p className="learn-panel-tabs__empty">
                            Select {display.country.name} to browse its political
                            parties.
                          </p>
                        )
                      )}
                    </div>
                    {isModernEra && !subdivisionMode && (
                      <button
                        type="button"
                        className="learn-fs__subdiv-btn"
                        onClick={handleEnterSubdivisionMode}
                      >
                        {/* It opens far more than the sub-national grid now — national,
                            historical, military, maritime, arms and passports too — so the
                            label says what the user gets rather than naming one tab. */}
                        Learn more
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <EntitySummary
                      kind="historical"
                      region={display.continent}
                      note={display.note}
                      population={display.population}
                      ruledBy={
                        display.ruledBy && rulerDisplayName(display.ruledBy, eraId)
                      }
                      approximateExtent={display.approximateExtent}
                      datingCaveat={display.datingCaveat}
                    />
                    {flagUrl && !flagLoadFailed && display.flagIsRulers && display.ruledBy && (
                      // A colony flew its ruler's flag. Say so, so the card never implies
                      // the territory had a national flag of its own. The caption NAMES the
                      // ruler, so it must not render without one — an empty `ruledBy` used to
                      // print "Flew the flag of — it had no national flag of its own".
                      <p className="entity-summary__note">
                        Flew the flag of {withArticle(rulerDisplayName(display.ruledBy, eraId))} —
                        it had no national flag of its own at this date.
                      </p>
                    )}
                    {/* A historical polity keeps its flag BELOW the fact-sheet, where the
                        ruler caption above and the dated no-flag explanations below belong
                        with it. A modern country leads with its flag instead — rendered
                        on the Overview tab. */}
                    {panelFlagBox}
                    {!panelFlagBox ? (
                      display.noFlagReason ? (
                        // Curated, sourced explanation for THIS polity at THIS date — always
                        // preferred over the two generic lines below. See PolityInfo.noFlagReason.
                        <p className="learn-fs__no-flag">{display.noFlagReason}</p>
                      ) : display.flagOutOfPeriod ? (
                        // A curated image exists but its design was not flown at this date.
                        // Naming the design and its years is a real explanation — never let
                        // this fall through to the causeless line below.
                        <p className="learn-fs__no-flag">
                          No flag for {era.label} — {display.flagOutOfPeriod.design} That design
                          was flown from {formatFlagYear(display.flagOutOfPeriod.from)}
                          {display.flagOutOfPeriod.to >= 9999
                            ? " onwards"
                            : ` to ${formatFlagYear(display.flagOutOfPeriod.to)}`}
                          , and no flag of this polity's own date is bundled.
                        </p>
                      ) : display.flagTooNew ? (
                        <p className="learn-fs__no-flag">
                          No flag for {era.label} — {display.flagTooNew.name}'s modern flag
                          was only adopted in {display.flagTooNew.year}, and no earlier flag
                          for this territory is bundled.
                        </p>
                      ) : (
                        // Last resort. It must state ONLY what is certainly true — that no
                        // period flag is bundled — and never assert a historical reason we do
                        // not actually know. The old line ("this polity predates modern flag
                        // design or none survives") asserted one for every flagless polity and
                        // was plainly false for the 20th-century ones: Nazi Germany, the 1938
                        // Netherlands, the Kingdom of Hawaii. Add a noFlagReason instead.
                        <p className="learn-fs__no-flag">
                          No flag shown — no period-accurate flag for{" "}
                          {selectionName(display, eraId)} in {era.label} is bundled.
                        </p>
                      )
                    ) : null}
                  </>
                )}
              </>
            ) : subdivisionMode && subdivisionCountry ? (() => {
              const countryObj = countries.find(c => c.code === subdivisionCountry.code);
              return (
                <>
                  {/* No country title here — the subdivision search above already
                      shows the country name (and its continent is in Details). */}
                  {/* The flag leads this widget too, directly under the country
                      dropdown above, with its explainer immediately below — same
                      order as the map-selection panel. The fact-sheet follows. */}
                  {subdivisionCountry.flagSvg && (
                    /* Same structure as the map-selection panel's flag block
                       (and the subnational/city flag boxes): wrapped in
                       learn-fs__flag-box so the national flag here is identical
                       in size, alignment, label and font, and carries the same
                       "What this flag means" explainer. */
                    <div className="learn-fs__flag-box">
                      {flagRow(
                        <button
                          type="button"
                          className="learn-fs__flag"
                          onClick={() => enlargeFlag(subdivisionCountry.flagSvg)}
                          aria-label={`Enlarge ${subdivisionCountry.name} flag`}
                        >
                          <img
                            key={subdivisionCountry.flagSvg}
                            src={subdivisionCountry.flagSvg}
                            alt=""
                            className="learn-fs__flag-img"
                            draggable={false}
                            onError={(e) => {
                              const img = e.currentTarget;
                              const png = `https://flagcdn.com/${subdivisionCountry.code.toLowerCase()}.png`;
                              if (img.src !== png) img.src = png;
                              else img.closest("button")?.remove();
                            }}
                          />
                          <span className="learn-fs__flag-hint" aria-hidden="true"><UiIcon name="expand" /> Click to enlarge</span>
                        </button>,
                      )}
                      <FlagMeaning code={subdivisionCountry.code} />
                    </div>
                  )}
                  {countryObj && (
                    <>
                      <LearnInfoTabs
                        active={
                          panelTab === "indices"
                            ? "indices"
                            : panelTab === "finance"
                              ? "finance"
                              : "facts"
                        }
                        onChange={setPanelTab}
                        tabs={LEARN_PANEL_SUBDIVISION_TABS}
                      />
                      <div className="flag-tabs__panel learn-panel-tabs__panel" role="tabpanel">
                        {panelTab !== "indices" && panelTab !== "finance" && (
                          <EntitySummary
                            kind="modern"
                            country={countryObj}
                            section="facts"
                            footer={
                              <div className="entity-summary__row">
                                <dt className="entity-summary__label">Anthem</dt>
                                <dd className="entity-summary__value">
                                  <button
                                    type="button"
                                    className="learn-fs__anthem-btn"
                                    onClick={() => {
                                      setAnthemTarget({
                                        code: subdivisionCountry.code,
                                        name: subdivisionCountry.name,
                                        flagUrl: subdivisionCountry.flagSvg || null,
                                      });
                                      anthemPlayerRef.current?.play();
                                    }}
                                    aria-label={`Play national anthem of ${subdivisionCountry.name}`}
                                  >
                                    <UiIcon name="play" /> Play
                                  </button>
                                </dd>
                              </div>
                            }
                          />
                        )}
                        {panelTab === "finance" && (
                          <EntitySummary
                            kind="modern"
                            country={countryObj}
                            section="finance"
                          />
                        )}
                        {panelTab === "indices" && (
                          <EntitySummary
                            kind="modern"
                            country={countryObj}
                            section="indices"
                          />
                        )}
                      </div>
                    </>
                  )}
                  {/* Subdivision info is rendered in the dedicated sub-national
                      box below — not here — so it is never shown twice. */}
                </>
              );
            })() : (
              <div className="learn-fs__empty">
                <p className="learn-fs__empty-title">Learn your flags</p>
                <p className="learn-fs__empty-sub">
                  {isModernEra
                    ? "Tap or click any country on the map — or use the search."
                    : "Tap or click any polity on the map to see its name and flag."}
                </p>
                {isModernEra && !tourDismissed && (
                  <div className="learn-tour" role="note">
                    <button
                      type="button"
                      className="learn-tour__dismiss"
                      onClick={dismissTour}
                      aria-label="Dismiss tips"
                    >
                      <UiIcon name="close" />
                    </button>
                    <p className="learn-tour__title">Three things to try</p>
                    <ol className="learn-tour__list">
                      <li>
                        <span className="learn-tour__num">1</span>
                        <span>
                          Tap a country, then <strong>View sub-national
                          divisions</strong> to drill into its states.
                        </span>
                      </li>
                      <li>
                        <span className="learn-tour__num">2</span>
                        <span>
                          Toggle <strong><UiIcon name="flag" /> Flags</strong> &amp;{" "}
                          <strong><UiIcon name="pin" /> Capitals</strong> onto the map.
                        </span>
                      </li>
                      <li>
                        <span className="learn-tour__num">3</span>
                        <span>
                          Use the <strong>Period</strong> picker to travel
                          back in time.
                        </span>
                      </li>
                    </ol>
                  </div>
                )}
                {isModernEra && tourDismissed && (
                  <button
                    type="button"
                    className="learn-tour__reopen"
                    onClick={reopenTour}
                  >
                    Show tips
                  </button>
                )}
              </div>
            )}
          </div>

        </aside>

        {/* ===== SUB-NATIONAL box — a second card, only in the drill-in view.
            Its own dropdown picks the division; its flag + explainer sit in the
            same box, mirroring the national box above. ===== */}
        {subdivisionMode && subdivisionCountry && (
          <>
          <aside className="learn-fs__panel" aria-live="polite">
            <div className="learn-fs__detail">
              <div className="learn-fs__widget-search">
                <span className="learn-fs__search-label" aria-hidden="true">
                  Choose a division
                </span>
                <div className="learn-fs__search-row">
                  <SubdivisionDropdown
                    divisions={subdivisionDivisions}
                    value={selectedSubdivision}
                    onChange={setSelectedSubdivision}
                    disabled={subdivisionDivisions.length === 0}
                    label="Choose a division"
                    countryCode={subdivisionCountry.code}
                  />
                  {(selectedSubdivision != null || selectedCapital != null) && (
                    <button
                      type="button"
                      className="learn-fs__unselect"
                      onClick={() => {
                        setSelectedSubdivision(null);
                        setSelectedCapital(null);
                      }}
                      aria-label="Unselect division"
                      title="Unselect"
                    >
                      <UiIcon name="close" />
                    </button>
                  )}
                </div>
              </div>
              {selectedSubdivision ? (() => {
                const sdUrl = subdivisionFlagUrl(selectedSubdivision.code);
                const isNsgt = NSGT_CODES.has(selectedSubdivision.code);
                const countryObj = codeToCountry.get(subdivisionCountry.code);
                const capital = subdivisionCapital(selectedSubdivision.code);
                return (
                  <>
                    {/* Same ordering as the country widget: the flag (+ its
                        "What this flag means" explainer) leads, directly under
                        the "Choose a division" dropdown above; the fact-sheet
                        rows follow. */}
                    {sdUrl ? (
                      <div className="learn-fs__flag-box">
                        {flagRow(
                          <button
                            type="button"
                            className="learn-fs__flag"
                            onClick={() => enlargeFlag(sdUrl)}
                            aria-label={`Enlarge ${selectedSubdivision.name} flag`}
                          >
                            <img
                              key={sdUrl}
                              src={sdUrl}
                              alt=""
                              className="learn-fs__flag-img"
                              draggable={false}
                              onError={(e) => { e.currentTarget.closest("button")?.remove(); }}
                            />
                            <span className="learn-fs__flag-hint" aria-hidden="true"><UiIcon name="expand" /> Click to enlarge</span>
                          </button>,
                        )}
                        <FlagMeaning code={selectedSubdivision.code} />
                      </div>
                    ) : (
                      <FlagMeaning code={selectedSubdivision.code} />
                    )}
                    {/* Fact-sheet mirrors the national country widget: same
                        entity-summary font + label-column alignment. */}
                    <dl className="entity-summary">
                      {selectedSubdivision.typeLabel && (
                        <div className="entity-summary__row">
                          <dt className="entity-summary__label">Type</dt>
                          <dd className="entity-summary__value">
                            {selectedSubdivision.typeLabel}
                          </dd>
                        </div>
                      )}
                      {/* Local (native-language) name above the population,
                          where it differs from the English exonym. */}
                      {SUBDIVISION_ENDONYMS[selectedSubdivision.code] && (
                        <div className="entity-summary__row">
                          <dt className="entity-summary__label">Local name</dt>
                          <dd className="entity-summary__value">
                            {SUBDIVISION_ENDONYMS[selectedSubdivision.code]}
                          </dd>
                        </div>
                      )}
                      {/* Population above Capital, mirroring the national fact-sheet. */}
                      <SubdivisionPopulation
                        code={selectedSubdivision.code}
                        countryCode={subdivisionCountry.code}
                        countryName={subdivisionCountry.name}
                        nationalPopulation={countryObj?.population}
                      />
                      {capital && (
                        <div className="entity-summary__row">
                          <dt className="entity-summary__label">Capital</dt>
                          <dd className="entity-summary__value">{capital.name}</dd>
                        </div>
                      )}
                    </dl>
                    {isNsgt && (
                      <p className="learn-fs__nsgt-note" title="Listed on the UN Non-Self-Governing Territories agenda (C-24)">
                        🌐 UN Non-Self-Governing Territory
                      </p>
                    )}
                    {UNOFFICIAL_SUBDIV_NOTES[selectedSubdivision.code] && (
                      <p className="learn-fs__unofficial-note">
                        {selectedSubdivision.name}. {UNOFFICIAL_SUBDIV_NOTES[selectedSubdivision.code]}
                      </p>
                    )}
                    {DISPUTED_SUBDIV_NOTES[selectedSubdivision.code] && (
                      <p className="learn-fs__disputed-note">
                        {DISPUTED_SUBDIV_NOTES[selectedSubdivision.code]}
                      </p>
                    )}
                  </>
                );
              })() : (
                <p className="learn-fs__subdiv-prompt">
                  Pick a division on the map, or from the list above.
                </p>
              )}
            </div>
          </aside>

          {/* ===== CAPITAL box — a third card, shown when the user taps
              "View capital". Its capital name comes from the same source as the
              sub-national panel's Capital row (cityRoles.subdivisionCapital); its
              population + flag are authoritative Wikidata/Commons data shown only
              when confirmed to belong to that capital. ===== */}
          {showCapital && selectedSubdivision && (() => {
            const capital = subdivisionCapital(selectedSubdivision.code);
            if (!capital) return null;
            const countryObj = codeToCountry.get(subdivisionCountry.code);
            return (
              <aside className="learn-fs__panel" aria-live="polite">
                <div className="learn-fs__detail">
                  <span className="learn-fs__search-label" aria-hidden="true">
                    Capital of {selectedSubdivision.name}
                  </span>
                  <CapitalDetails
                    code={selectedSubdivision.code}
                    capitalName={capital.name}
                    countryCode={subdivisionCountry.code}
                    countryName={subdivisionCountry.name}
                    nationalPopulation={countryObj?.population}
                    baseUrl={baseUrl}
                    onEnlarge={enlargeFlag}
                  />
                </div>
              </aside>
            );
          })()}

          {/* ===== NATIONAL-SYMBOL box — an item picked in the "National symbols" tab.
              The country's CURRENT flag stays in the fact-sheet at the top and the
              picked flag is shown here in its own widget below, with its name, the
              years it flew and its sourced explainer. It highlights nothing on the
              map: the flag belongs to the whole country. ===== */}
          {selectedNationalFlag && (
            <aside className="learn-fs__panel" aria-live="polite">
              <div className="learn-fs__detail">
                <NationalFlagDetails
                  flag={selectedNationalFlag}
                  countryCode={subdivisionCountry.code}
                  countryName={subdivisionCountry.name}
                  baseUrl={baseUrl}
                  onEnlarge={enlargeFlag}
                  meanings={
                    selectedGroupMeaning
                      ? { [selectedNationalFlag.id]: selectedGroupMeaning }
                      : undefined
                  }
                />
              </div>
            </aside>
          )}

          {/* ===== POLITICAL-PARTY box — a party picked in the "Political parties"
              tab. Same treatment as the National-symbol box: its own widget below
              the fact-sheet, highlighting nothing on the map (a party belongs to
              the whole country). ===== */}
          {selectedParty && (
            <aside className="learn-fs__panel" aria-live="polite">
              <div className="learn-fs__detail">
                <PoliticalPartyDetails
                  party={selectedParty}
                  baseUrl={baseUrl}
                  onEnlarge={enlargeLogo}
                />
              </div>
            </aside>
          )}

          {/* ===== COMMERCIAL-AIRLINE box — an airline picked in the "National symbols"
              tab. Same treatment as National symbols and Political parties: its own
              widget below the fact-sheet, highlighting nothing on the map. ===== */}
          {selectedSubdivisionAirline && (
            <aside className="learn-fs__panel" aria-live="polite">
              <div className="learn-fs__detail">
                <AirlineDetails
                  airline={selectedSubdivisionAirline}
                  baseUrl={baseUrl}
                  onEnlarge={enlargeLogo}
                />
              </div>
            </aside>
          )}

          {/* ===== PUBLIC-BROADCASTER box — a broadcaster picked in the "National symbols"
              tab. Same treatment as National symbols, Political parties and airlines: its own
              widget below the fact-sheet, highlighting nothing on the map. ===== */}
          {selectedSubdivisionBroadcaster && (
            <aside className="learn-fs__panel" aria-live="polite">
              <div className="learn-fs__detail">
                <BroadcasterDetails
                  broadcaster={selectedSubdivisionBroadcaster}
                  baseUrl={baseUrl}
                  onEnlarge={enlargeLogo}
                />
              </div>
            </aside>
          )}

          {/* ===== TOURISM-LOGO box — a tourism logo picked in the "National symbols"
              tab. Same treatment as National symbols, Political parties, airlines and
              broadcasters: its own widget below the fact-sheet, highlighting nothing
              on the map. ===== */}
          {selectedSubdivisionTourismLogo && (
            <aside className="learn-fs__panel" aria-live="polite">
              <div className="learn-fs__detail">
                <TourismLogoDetails
                  logo={selectedSubdivisionTourismLogo}
                  baseUrl={baseUrl}
                  onEnlarge={enlargeLogo}
                />
              </div>
            </aside>
          )}

          {/* ===== NEWS-AGENCY box — a national news agency picked in the "National symbols"
              tab. Same treatment as National symbols, Political parties, airlines,
              broadcasters and tourism logos: its own widget below the fact-sheet, highlighting nothing
              on the map. ===== */}
          {selectedSubdivisionNewsAgency && (
            <aside className="learn-fs__panel" aria-live="polite">
              <div className="learn-fs__detail">
                <NewsAgencyDetails
                  agency={selectedSubdivisionNewsAgency}
                  baseUrl={baseUrl}
                  onEnlarge={enlargeLogo}
                />
              </div>
            </aside>
          )}

          {/* ===== NEWSPAPER box — a top national newspaper picked in the "National symbols"
              tab. Same treatment as National symbols, Political parties, airlines,
              broadcasters, tourism logos, and news agencies: its own widget below the fact-sheet, highlighting nothing
              on the map. ===== */}
          {selectedSubdivisionNewspaper && (
            <aside className="learn-fs__panel" aria-live="polite">
              <div className="learn-fs__detail">
                <NewspaperDetails
                  newspaper={selectedSubdivisionNewspaper}
                  baseUrl={baseUrl}
                  onEnlarge={enlargeLogo}
                />
              </div>
            </aside>
          )}

          {/* ===== NATIONAL-CAPITAL box — for a national capital that heads no
              subdivision (Ottawa, Pretoria, Amsterdam …), selected from the
              hierarchy chart. It has no subdivision fact-sheet, so this small card
              shows its name, sourced role and own municipal flag. ===== */}
          {selectedCapital && (() => {
            const cap = selectedCapital;
            const flagUrl = cap.flagPath ? `${baseUrl}${cap.flagPath}` : null;
            // Sourced, dated city-proper population (same discipline as the
            // subdivision "View capital" panel), where one is bundled.
            const detail = NATIONAL_CAPITAL_DETAILS[`${subdivisionCountry.code}|${normalizeForSearch(cap.name)}`];
            const countryObj = codeToCountry.get(subdivisionCountry.code);
            const denominator =
              countryObj?.population && countryObj.population > 0
                ? countryObj.population
                : NATIONAL_REFERENCE_POPULATION[subdivisionCountry.code];
            const share =
              detail && denominator && denominator > 0
                ? (() => {
                    const pct = (detail.population / denominator) * 100;
                    const r = pct >= 10 ? Math.round(pct) : Math.round(pct * 10) / 10;
                    const name = subdivisionCountry.name;
                    return `~${r}% of ${/s$/i.test(name) ? `${name}'` : `${name}'s`} population`;
                  })()
                : null;
            const popDetail = detail
              ? [share, `${detail.year} ${detail.basis}`].filter(Boolean).join(", ")
              : null;
            return (
              <aside className="learn-fs__panel" aria-live="polite">
                <div className="learn-fs__detail">
                  <span className="learn-fs__search-label" aria-hidden="true">
                    National capital of {subdivisionCountry.name}
                  </span>
                  {/* Same ordering as every other info widget: the flag (+ its
                      explainer) leads, directly under the heading above; the
                      fact-sheet rows follow. */}
                  {flagUrl ? (
                    <div className="learn-fs__flag-box">
                      {flagRow(
                        <button
                          type="button"
                          className="learn-fs__flag"
                          onClick={() => enlargeFlag(flagUrl)}
                          aria-label={`Enlarge ${cap.name} flag`}
                        >
                          <img
                            key={flagUrl}
                            src={flagUrl}
                            alt=""
                            className="learn-fs__flag-img"
                            draggable={false}
                            onError={(e) => { e.currentTarget.closest("button")?.remove(); }}
                          />
                          <span className="learn-fs__flag-hint" aria-hidden="true"><UiIcon name="expand" /> Click to enlarge</span>
                        </button>,
                      )}
                      {/* "What this flag means" explainer — same component/look as
                          the national/subnational and subdivision-capital flags. */}
                      <FlagMeaning
                        code={`${subdivisionCountry.code}|${normalizeForSearch(cap.name)}`}
                        meanings={NATIONAL_CAPITAL_FLAG_MEANINGS}
                      />
                    </div>
                  ) : (
                    <p className="learn-fs__subdiv-prompt">
                      No municipal flag is bundled for this capital yet.
                    </p>
                  )}
                  <dl className="entity-summary">
                    <div className="entity-summary__row">
                      <dt className="entity-summary__label">Capital</dt>
                      <dd className="entity-summary__value">{cap.name}</dd>
                    </div>
                    {detail?.endonym && (
                      <div className="entity-summary__row">
                        <dt className="entity-summary__label">Local name</dt>
                        <dd className="entity-summary__value">{detail.endonym}</dd>
                      </div>
                    )}
                    {cap.note && (
                      <div className="entity-summary__row">
                        <dt className="entity-summary__label">Role</dt>
                        <dd className="entity-summary__value">{cap.note}</dd>
                      </div>
                    )}
                    {detail && (
                      <div className="entity-summary__row">
                        <dt className="entity-summary__label">Population</dt>
                        <dd className="entity-summary__value">
                          {formatPopulation(detail.population)}
                          {popDetail ? ` (${popDetail})` : ""}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </aside>
            );
          })()}
          </>
        )}
      </div>

      <button
        type="button"
        className="learn-fs__panel-drawer-btn learn-fs__panel-drawer-btn--show"
        onClick={() => setPanelDismissed(false)}
        aria-label="Show information panel"
        title="Show information panel"
        aria-hidden={!panelCollapsed ? true : undefined}
        tabIndex={!panelCollapsed ? -1 : undefined}
        disabled={panelSelectionKey == null}
      >
        <UiIcon name="previous" />
        <span className="learn-fs__panel-drawer-label">Info</span>
      </button>

      {currentCountry && (
        <NationalAnthemPlayer
          ref={anthemPlayerRef}
          countryCode={currentCountry.code}
          countryName={currentCountry.name}
          flagUrl={currentCountry.flagSvg || (display ? selectionFlag(display, baseUrl) : null)}
          onClose={() => setAnthemTarget(null)}
          visible={anthemTarget !== null}
          // Preload the player once a country is actually SELECTED (not merely
          // hovered), so tapping Play can start it synchronously in-gesture —
          // the fix for iOS autoplay. Hover-only previews don't preload.
          preload={selected?.kind === "modern" || (subdivisionMode && !!subdivisionCountry)}
        />
      )}

      {zoomedMedia && (
        <div
          className="flag-zoom"
          role="dialog"
          aria-modal="true"
          aria-label={zoomedMedia.logoSurface ? "Enlarged logo" : "Enlarged flag"}
          onClick={() => setZoomedMedia(null)}
        >
          {zoomedMedia.logoSurface ? (
            <div
              className="flag-zoom__plate"
              data-logo-surface=""
              onClick={(e) => e.stopPropagation()}
            >
              <img
                key={zoomedMedia.url}
                src={zoomedMedia.url}
                alt=""
                className="flag-zoom__img flag-zoom__img--logo"
                draggable={false}
                onLoad={(e) => {
                  const img = e.currentTarget;
                  sizeFullscreenLogo(img);
                  applyLogoBackdropTone(img);
                }}
              />
            </div>
          ) : (
            <img
              key={zoomedMedia.url}
              src={zoomedMedia.url}
              alt=""
              className="flag-zoom__img"
              draggable={false}
            />
          )}
          <button
            type="button"
            className="flag-zoom__close"
            onClick={(e) => {
              e.stopPropagation();
              setZoomedMedia(null);
            }}
            aria-label={zoomedMedia.logoSurface ? "Close enlarged logo" : "Close enlarged flag"}
          >
            <UiIcon name="close" />
          </button>
        </div>
      )}
    </div>
      {subdivisionMode && subdivisionCountry ? (() => {
        const meta = SUBDIVISION_META[subdivisionCountry.code];
        const divisions = meta?.divisions ?? [];
        const selectSubdivision = (code: string) => {
          // Re-clicking the open division card clears it — same toggle as the
          // subdivision map and the national flag grid.
          if (selectedSubdivision?.code === code) {
            setSelectedSubdivision(null);
            setSelectedCapital(null);
            return;
          }
          const div = divisions.find((d) => d.code === code);
          if (div) {
            setSelectedSubdivision(div);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        };
        return (
          <SubdivisionFlagTabs
            key={subdivisionCountry.code}
            divisions={divisions}
            pluralLabel={meta?.pluralLabel ?? "Divisions"}
            countryName={subdivisionCountry.name}
            countryCode={subdivisionCountry.code}
            countryFlagUrl={subdivisionCountry.flagSvg || null}
            selectedCode={selectedSubdivision?.code ?? null}
            capitalActive={showCapital}
            activeNationalCapital={selectedCapital?.name ?? null}
            baseUrl={baseUrl}
            onSelectSubdivision={selectSubdivision}
            onSelectCapital={(code: string) => {
              const div = divisions.find((d) => d.code === code);
              if (!div) return;
              // Selecting the division auto-opens its capital widget (showCapital
              // is derived from the selection), so no explicit open is needed.
              setSelectedSubdivision(div);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onSelectNationalCapital={(cap) => {
              // A national capital that heads no subdivision — populate its own
              // panel; clearing the subdivision selection is handled by the effect.
              setSelectedCapital(cap);
              setSelectedSubdivision(null);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onSelectCountry={() => {
              setSelectedSubdivision(null);
              setSelectedCapital(null);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            selectedNationalFlagId={selectedNationalFlag?.id ?? null}
            onSelectNationalFlag={(flag) => {
              // The CURRENT national flag opens no widget: the fact-sheet at the top
              // is already showing that same image and its explainer, so a second
              // copy below would be a duplicate of what the user is scrolling to.
              // Clearing the selection also closes whatever else was open.
              setSelectedGroupMeaning(null);
              setSelectedNationalFlag((cur) =>
                flag.primary ? null : cur?.id === flag.id ? null : flag,
              );
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onSelectGroupFlag={(flag, meaning) => {
              // A collective subdivision-group flag (Federal Territories) — opens
              // in the same widget as a national symbol, carrying its own sourced
              // meaning (which lives outside NATIONAL_FLAG_MEANINGS).
              setSelectedNationalFlag((cur) => {
                const close = cur?.id === flag.id;
                setSelectedGroupMeaning(close ? null : meaning);
                return close ? null : flag;
              });
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            selectedPartyId={selectedParty?.id ?? null}
            onSelectParty={(party) => {
              // Same toggle behaviour as a national symbol: clicking the open
              // party's own card again closes its widget.
              setSelectedParty((cur) => (cur?.id === party.id ? null : party));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            selectedAirlineId={selectedSubdivisionAirline?.id ?? null}
            onSelectAirline={(airline) => {
              // Same toggle behaviour as national symbol / party: clicking the
              // open airline's card again closes its widget.
              setSelectedSubdivisionAirline((cur) => (cur?.id === airline.id ? null : airline));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            selectedBroadcasterId={selectedSubdivisionBroadcaster?.id ?? null}
            onSelectBroadcaster={(broadcaster) => {
              // Same toggle behaviour as national symbol / party / airline: clicking the
              // open broadcaster's card again closes its widget.
              setSelectedSubdivisionBroadcaster((cur) => (cur?.id === broadcaster.id ? null : broadcaster));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            selectedTourismLogoId={selectedSubdivisionTourismLogo?.id ?? null}
            onSelectTourismLogo={(logo) => {
              // Same toggle behaviour as national symbol / party / airline / broadcaster:
              // clicking the open logo's card again closes its widget.
              setSelectedSubdivisionTourismLogo((cur) => (cur?.id === logo.id ? null : logo));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            selectedNewsAgencyId={selectedSubdivisionNewsAgency?.id ?? null}
            onSelectNewsAgency={(agency) => {
              // Same toggle behaviour as national symbol / party / airline / broadcaster / tourism logo:
              // clicking the open agency's card again closes its widget.
              setSelectedSubdivisionNewsAgency((cur) => (cur?.id === agency.id ? null : agency));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            selectedNewspaperId={selectedSubdivisionNewspaper?.id ?? null}
            onSelectNewspaper={(paper) => {
              // Same toggle behaviour as national symbol / party / airline / broadcaster / tourism logo / news agency:
              // clicking the open newspaper's card again closes its widget.
              setSelectedSubdivisionNewspaper((cur) => (cur?.id === paper.id ? null : paper));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        );
      })() : (
        <FlagGrid
          entries={flagEntries}
          selectedId={
            activeGridCrest
              ? gridCrest!.id
              : activeGridOlympicCommittee
                ? gridOlympicCommittee!.id
                : selectedId
          }
          selectedAirlineId={gridAirlineId}
          selectedBroadcasterId={gridBroadcasterId}
          selectedTourismLogoId={gridTourismLogoId}
          selectedNewsAgencyId={gridNewsAgencyId}
          selectedNewspaperId={gridNewspaperId}
          selectedPartyId={gridPartyId}
          selectedCentralBankId={gridCentralBankId}
          onSelect={handleGridSelect}
          resolveFlag={resolveFlag}
          isModernEra={isModernEra}
          contentType={gridContentType}
          onContentTypeChange={chooseGridContentType}
        />
      )}
    </div>
  );
}
