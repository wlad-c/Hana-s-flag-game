import { UiIcon } from "./UiIcon";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { geoPath, geoCentroid, geoArea, geoGraticule10 } from "d3-geo";
import { capMayBeVisible, isPointVisible, sphericalCap, worldProjection, type SphericalCap } from "../lib/mapProjection";
import { useGlobeDrag } from "../hooks/useGlobeDrag";
import { feature } from "topojson-client";
import polygonClipping from "polygon-clipping";
import countries from "i18n-iso-countries";
import { useTheme } from "../context/ThemeContext";
import { ALL_COUNTRY_OPTIONS } from "../lib/countrySelection";
import { DISPUTED_TERRITORY_CODES } from "../lib/territoryParentMap";
import { flagOverlayAspectRatio } from "../lib/flagOverlayAspectRatio";
import { fetchWithRetry } from "../lib/fetchWithRetry";
import { useZoomPan, type ZoomPanState } from "../hooks/useZoomPan";
import { useUnitPx } from "../hooks/useUnitPx";
import { CityMarkers, type ScreenCity } from "./CityMarkers";
import type { PlacedCity } from "../lib/cityRoles";
import { loadWorldSubnationalBorders, prefetchWorldSubnationalBorders } from "../lib/worldSubnationalBorders";
import type { SubdivisionGeoFeature } from "../types/subdivision";
import { MapDataTooltipLayer, type MapDataTooltipHandle } from "./MapDataTooltipLayer";
import type { MapDataTooltip } from "../lib/mapDataTooltip";

// Countries whose land area is ≤ Denmark (~43,094 km²).  These get the
// pulsing indicator when selected so they're easy to locate on the map.
const SMALL_NATION_CODES = new Set([
  // Micro-states / city-states
  "VA", "MC", "NR", "TV", "SM", "LI", "MH", "KN", "MT", "MV",
  "GD", "VC", "BB", "AG", "SC", "PW", "AD",
  // Small island & coastal nations
  "LC", "DM", "FM", "SG", "TO", "KI", "BH", "ST", "KM", "MU",
  "WS", "CV", "TT", "BN", "CY", "LB", "JM", "GM", "QA", "VU",
  "BS", "ME", "TL", "SZ", "KW", "FJ",
  // Small mainland nations
  "SI", "IL", "SV", "BZ", "DJ", "MK", "RW", "HT", "BI", "GQ",
  "AL", "SB", "AM", "LS", "BE", "MD", "GW", "BT", "CH", "NL", "DK",
]);

// Geographic [longitude, latitude] for nations too small to appear in the
// 110m world-atlas dataset.  Injected into centroidByAlpha2 at render time
// so the pulse indicator still shows even with no rendered polygon.
const MICRO_STATE_COORDS: Record<string, [number, number]> = {
  VA: [ 12.45,  41.90], // Vatican City
  MC: [  7.40,  43.73], // Monaco
  SM: [ 12.45,  43.93], // San Marino
  LI: [  9.55,  47.17], // Liechtenstein
  AD: [  1.60,  42.55], // Andorra
  MT: [ 14.37,  35.94], // Malta
  NR: [166.93,  -0.52], // Nauru
  TV: [179.19,  -8.52], // Tuvalu (Funafuti)
  MH: [171.18,   7.13], // Marshall Islands
  KI: [172.98,   1.33], // Kiribati (Tarawa)
  FM: [158.19,   6.92], // Micronesia
  PW: [134.58,   7.52], // Palau
  TO: [-175.20, -21.18], // Tonga
  WS: [-172.10, -13.76], // Samoa
  KN: [-62.78,  17.35], // Saint Kitts and Nevis
  AG: [-61.80,  17.06], // Antigua and Barbuda
  DM: [-61.37,  15.41], // Dominica
  LC: [-60.98,  13.91], // Saint Lucia
  VC: [-61.29,  12.98], // Saint Vincent and the Grenadines
  BB: [-59.54,  13.19], // Barbados
  GD: [-61.68,  12.11], // Grenada
  MV: [ 73.22,   3.20], // Maldives
  SC: [ 55.49,  -4.68], // Seychelles
  KM: [ 43.87, -11.88], // Comoros
  MU: [ 57.55, -20.27], // Mauritius
  ST: [  6.73,   0.34], // São Tomé and Príncipe
  CV: [-23.61,  14.93], // Cape Verde
};

// Full UN-member name lookup, used so clicks on non-pool (out-of-this-game)
// countries can still display a friendly "Not in this game" popover with the
// real country name.
const ALL_UN_NAMES: ReadonlyMap<string, string> = new Map(
  ALL_COUNTRY_OPTIONS.map((c) => [c.code, c.name] as const),
);

type CountryResult = "correct" | "wrong";

type GeoFeature = {
  type: "Feature";
  id?: string | number;
  properties?: Record<string, unknown>;
  geometry: unknown;
};

type FeatureCollection = {
  type: "FeatureCollection";
  features: GeoFeature[];
};

type WorldTopo = {
  type: "Topology";
  objects: {
    countries: unknown;
  };
};

type Props = {
  countryResults: Record<string, CountryResult>;
  /** Currently selected (but not-yet-confirmed) country code. Drawn highlighted. */
  selectedCode?: string | null;
  /**
   * Optional set of codes to draw with the "selected" highlight regardless of
   * selectedCode. Used by Learn-mode spotlight grouping: clicking any one
   * Soviet republic highlights all 15 by passing the full member set here.
   */
  highlightCodes?: ReadonlySet<string> | null;
  /**
   * If provided, clicking a country in this set selects it and shows a confirm
   * popover next to the click. Pass a Map of code → display name so the popover
   * can show the country name. If omitted, the map is read-only (progress only).
   */
  selectable?: {
    codes: ReadonlySet<string>;
    names: ReadonlyMap<string, string>;
    onSelect: (code: string) => void;
    /**
     * When provided, clicks show a Confirm popover anchored at the click. When
     * omitted, clicks just call onSelect — used by the Learn-mode sandbox
     * where there's no "confirm a guess" action.
     */
    onConfirm?: () => void;
    /**
     * Optional hover callback for live preview (e.g. Learn mode highlighting
     * the country name without a click). Called with the country's alpha-2
     * code on enter and `null` on leave.
     */
    onHover?: (code: string | null) => void;
    /**
     * Maps territory alpha-2 codes → administering country alpha-2 codes.
     * Territories in this map become clickable on the world map; clicking one
     * resolves to the parent country code before calling onSelect/onHover.
     * Disputed territories must be excluded by the caller.
     */
    territoryParent?: Readonly<Record<string, string>>;
  };
  /** When true, click handlers are disabled even if `selectable` is provided. */
  disabled?: boolean;
  /** Optional externally-managed zoom state. When provided, lets the
   *  parent persist zoom across map swaps (e.g., Today ↔ historical map).
   *  When omitted, the component manages its own zoom state. */
  zoom?: ZoomPanState;
  /** User-chosen central meridian (longitude). 0 = Atlantic / Greenwich
   *  default; 180 = Pacific; -95 = Americas; etc. */
  centerLongitude?: number;
  /** Animation rotation offset added on top of centerLongitude. Kept
   *  separate so flag-polygon computation (expensive) can depend only on
   *  the stable centerLongitude, while path rendering uses the full
   *  centerLongitude + rotationOffset on every animation frame. */
  rotationOffset?: number;
  /** When true, the rendered map is flipped vertically — south at the top. */
  southUp?: boolean;
  /**
   * When true, render an orthographic globe instead of the Equal Earth map.
   * Dragging spins/tilts it; `rotationOffset` spins it about its axis.
   */
  globe?: boolean;
  /**
   * When true, draw every country's bundled sub-national borders as a lighter
   * dashed overlay on top of the country fills. Decorative only
   * (`pointer-events: none`) — hover/click still select the country. Used by
   * Learn-mode Today; ignored elsewhere.
   */
  showSubnationalBorders?: boolean;
  /** Optional extra controls to render below the +/-/⛶ zoom buttons. */
  extraControls?: React.ReactNode;
  /** When provided, each country whose alpha-2 code is a key in this map
   *  will have its flag image (the map value — an absolute URL) rendered
   *  filling its territory. Countries absent from the map show normally. */
  flagOverlay?: ReadonlyMap<string, string> | null;
  /** When provided, each country whose alpha-2 code is a key here is FILLED with
   *  the map value (a CSS colour) instead of its normal land colour — the
   *  "colour countries by passport" layer. Countries absent from the map keep
   *  their normal fill; a disputed territory always keeps its neutral
   *  `disputedLand` colour (the disputed-neutrality rule outranks this layer);
   *  and the selected country still shows its selection fill on top. */
  fillOverride?: ReadonlyMap<string, string> | null;
  /** When provided, these city markers (national capital(s) + largest city)
   *  are plotted at constant pixel size over the map. */
  cityOverlay?: PlacedCity[] | null;
  /** Optional content rendered directly below the map frame (e.g. Democracy Index legend). */
  belowMapNode?: React.ReactNode;
  /**
   * When provided (the map is coloured by an index or a WVS question), hovering
   * a country with a mouse — or tapping it on a touch screen, where there is no
   * hover — shows a tooltip with that country's value, rating category, colour
   * and data year. Must be a stable function (memoise it): it is only read when
   * the tooltip renders, never while the map paths render.
   */
  dataTooltip?: ((code: string) => MapDataTooltip | null) | null;
};

// HARD RULE — disputed/claimed landmass colour.
// Any landmass that (a) is NOT one of the 195 UN states and (b) is claimed or
// disputed by one or more nations must render in palette.disputedLand, NOT the
// regular land/poolLand colour. This keeps the game neutral: a contested
// territory is never painted as if it were undisputed sovereign land.
//
// Territories disputed between two or more UN members (Falklands, Gibraltar, …)
// are already enumerated by DISPUTED_TERRITORY_CODES — the SAME source that makes
// them non-clickable on the world map — so the colour stays in lock-step with the
// click-neutrality rule. This set covers the remaining cases that DISPUTED_TERRITORY
// _CODES does NOT catch: non-UN entities claimed by a SINGLE UN member, which appear
// as their own ISO-coded polygon. Crimea is handled separately via id "DISPUTED_CRIMEA".
//   • EH — Western Sahara (claimed by Morocco; SADR/Polisario dispute it)
//   • TW — Taiwan (governed by the ROC; claimed by the PRC; not a UN member)
// Any future contested non-UN landmass that renders as its own polygon MUST be
// added here (and documented in CLAUDE.md) so it is coloured consistently.
const WORLD_MAP_DISPUTED_ALPHA2 = new Set(["EH", "TW"]);

// Same hard rule, for disputed/claimed non-UN landmasses that appear in the
// topology WITHOUT an ISO country code (so toIsoAlpha2 returns null and they
// would otherwise fall through to the neutral palette.unknown colour). Matched
// by Natural Earth feature name (geometry.properties.name), which is stable.
//   • Kosovo          — claimed by Serbia
//   • Somaliland      — claimed by Somalia
//   • N. Cyprus       — claimed by the Republic of Cyprus (TRNC)
//   • Siachen Glacier — disputed between India and Pakistan
// "Indian Ocean Ter." is deliberately NOT here: it is undisputed Australian
// territory, not claimed by another nation.
const WORLD_MAP_DISPUTED_NAMES = new Set([
  "Kosovo",
  "Somaliland",
  "N. Cyprus",
  "Siachen Glacier",
  "Gibraltar",
]);

const GEO_URL = `${import.meta.env.BASE_URL}countries-50m.json`;
const WIDTH = 960;
const HEIGHT = 500;

// `h` is the pattern tile height (the ring's bbox height, floored at 20px). The
// tile WIDTH is derived per-flag at render time from the flag's true aspect
// ratio (flagOverlayAspectRatio) — not stored here — so the tile matches the
// flag's proportions and `preserveAspectRatio="…meet"` fills it with no
// letterbox gap, letting the tiling cover the whole landmass.
type FlagPoly = { path: string; x: number; y: number; h: number };
const MIN_GLOBE_FLAG_RING_PX = 3;

function polygonsOf(geo: GeoFeature): unknown[] {
  const geom = geo.geometry as { type: string; coordinates: unknown } | null;
  if (!geom) return [];
  if (geom.type === "Polygon") return [geom.coordinates];
  if (geom.type === "MultiPolygon") return geom.coordinates as unknown[];
  return [];
}

/** [minX, minY, maxX, maxY] of a geoPath M/L/Z string, read without re-projecting. */
function pathStringBounds(d: string): [number, number, number, number] | null {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  let isY = false;
  const n = d.length;
  let i = 0;
  while (i < n) {
    let c = d.charCodeAt(i);
    // Start of a number: digit, '-' or '.'.
    if ((c < 48 || c > 57) && c !== 45 && c !== 46) {
      i++;
      continue;
    }
    let neg = false;
    if (c === 45) {
      neg = true;
      c = d.charCodeAt(++i);
    }
    let v = 0;
    while (c >= 48 && c <= 57) {
      v = v * 10 + (c - 48);
      c = d.charCodeAt(++i);
    }
    if (c === 46) {
      let scale = 0.1;
      c = d.charCodeAt(++i);
      while (c >= 48 && c <= 57) {
        v += (c - 48) * scale;
        scale *= 0.1;
        c = d.charCodeAt(++i);
      }
    }
    // Exponent notation never comes out of geoPath's fixed-precision writer;
    // bail out rather than misread one.
    if (c === 101 || c === 69) return null;
    if (neg) v = -v;
    if (isY) {
      if (v < y0) y0 = v;
      if (v > y1) y1 = v;
    } else {
      if (v < x0) x0 = v;
      if (v > x1) x1 = v;
    }
    isY = !isY;
  }
  return isFinite(x0) && isFinite(y0) ? [x0, y0, x1, y1] : null;
}

// Defined at module scope so React.memo() works — component type must be
// stable across renders. Both components depend only on overlay/polygon data
// and selection, not on rotationOffset, so they are skipped on every rotation
// frame and only re-render when the flag data or selection actually changes.

const FlagDefs = memo(function FlagDefs({
  flagOverlay,
  flagPolygonsById,
  geographies,
  territoryParent,
}: {
  flagOverlay: ReadonlyMap<string, string>;
  flagPolygonsById: Map<string, FlagPoly[]>;
  geographies: GeoFeature[];
  territoryParent?: Readonly<Record<string, string>>;
}) {
  return (
    <defs>
      {geographies.map((geo) => {
        const alpha2 = toIsoAlpha2(geo.id);
        if (!alpha2) return null;
        // Non-disputed territories (Greenland, Puerto Rico, …) have no flag
        // of their own in the overlay map — they show their administering
        // country's flag, the same resolution selectable.territoryParent
        // already applies to clicks/hover (see handlePathClick above).
        const flagCode = territoryParent?.[alpha2] ?? alpha2;
        if (!flagOverlay.has(flagCode)) return null;
        const polys = flagPolygonsById.get(alpha2);
        if (!polys) return null;
        const flagUrl = flagOverlay.get(flagCode)!;
        // Size the tile to the flag's TRUE aspect ratio so it fills exactly
        // (no letterbox) and the tiling covers the entire landmass.
        const ratio = flagOverlayAspectRatio(flagUrl);
        return polys.map((poly, i) => {
          const tileW = poly.h * ratio;
          return (
          // patternUnits="userSpaceOnUse" keeps x/y in the referencing
          // element's coordinate system — same reason clipPathUnits was set
          // above (Safari bug, rotation offsets, zoom/flip transforms).
          <pattern
            key={`fp-${alpha2}-${i}`}
            id={`wm-fp-${alpha2}-${i}`}
            x={poly.x}
            y={poly.y}
            width={tileW}
            height={poly.h}
            patternUnits="userSpaceOnUse"
          >
            <image
              href={flagUrl}
              x={0}
              y={0}
              width={tileW}
              height={poly.h}
              preserveAspectRatio="xMidYMid meet"
            />
          </pattern>
          );
        });
      })}
    </defs>
  );
});

const FlagImages = memo(function FlagImages({
  flagOverlay,
  flagPolygonsById,
  geographies,
  selectedCode,
  highlightCodes,
  territoryParent,
}: {
  flagOverlay: ReadonlyMap<string, string>;
  flagPolygonsById: Map<string, FlagPoly[]>;
  geographies: GeoFeature[];
  selectedCode: string | null;
  highlightCodes: ReadonlySet<string> | null;
  territoryParent?: Readonly<Record<string, string>>;
}) {
  return (
    <>
      {geographies.map((geo) => {
        const alpha2 = toIsoAlpha2(geo.id);
        if (!alpha2) return null;
        const flagCode = territoryParent?.[alpha2] ?? alpha2;
        if (!flagOverlay.has(flagCode)) return null;
        const polys = flagPolygonsById.get(alpha2);
        if (!polys) return null;
        const isSelected =
          alpha2 === selectedCode || !!highlightCodes?.has(alpha2);
        return polys.map((poly, i) => (
          <path
            key={`fp-${alpha2}-${i}`}
            d={poly.path}
            fill={`url(#wm-fp-${alpha2}-${i})`}
            opacity={isSelected ? 0.35 : 1}
            style={{ pointerEvents: "none" }}
          />
        ));
      })}
    </>
  );
});

function toIsoAlpha2(id: string | number | undefined): string | null {
  if (id === undefined || id === null) return null;
  const numeric = String(id).replace(/\D/g, "");
  if (!numeric) return null;
  const padded = numeric.padStart(3, "0");
  const alpha2 =
    countries.numericToAlpha2(padded) ?? countries.numericToAlpha2(numeric);
  return alpha2 ? alpha2.toUpperCase() : null;
}

type MapPalette = {
  ocean: string;
  unknown: string;
  land: string;
  poolLand: string;
  correct: string;
  wrong: string;
  stroke: string;
  selectedStroke: string;
  selectedFill: string;
  /** Non-UN / disputed territories (e.g. Western Sahara, Crimea). Rendered
   *  distinct from both ocean and regular land to avoid visual ambiguity. */
  disputedLand: string;
};

const LIGHT_PALETTE: MapPalette = {
  ocean: "#b8d4e4",
  unknown: "#dbe7d6",
  land: "#e8ddc4",
  // Distinctive tint for countries that are part of the game pool but haven't
  // been guessed yet — so users in Custom Game can see at a glance which
  // countries are clickable for the current flag.
  poolLand: "#ffd7a8",
  correct: "#3fae5a",
  wrong: "#ff6b6b",
  stroke: "#1a2238",
  selectedStroke: "#1a2238",
  selectedFill: "#4ecdc4",
  disputedLand: "#ccc8be",
};

const DARK_PALETTE: MapPalette = {
  ocean: "#1a2d4a",
  unknown: "#2a3358",
  land: "#3a4470",
  poolLand: "#6b4f8c",
  correct: "#5dd97a",
  wrong: "#ff8a8a",
  stroke: "#f4ecd8",
  selectedStroke: "#f4ecd8",
  selectedFill: "#74e4dc",
  disputedLand: "#606a82",
};

function getFill(
  alpha2: string | null,
  results: Record<string, CountryResult>,
  palette: MapPalette,
  isInPool: boolean,
): string {
  if (!alpha2) return palette.unknown;
  const result = results[alpha2];
  if (result === "correct") return palette.correct;
  if (result === "wrong") return palette.wrong;
  return isInPool ? palette.poolLand : palette.land;
}

type Popover = {
  code: string;
  name: string;
  /** Pixel coordinates relative to the map-frame container. */
  x: number;
  y: number;
  /** "confirm" shows the Confirm button (country is in the active pool).
   *  "info" shows just a "Not in this game" message (country is a UN member
   *  but isn't part of the current game's pool). */
  kind: "confirm" | "info";
  /** Whether the popover renders above or below the anchor point. We flip
   *  to "below" when there isn't room above so the popover never gets
   *  clipped at the top of the frame. */
  placement: "above" | "below";
};

export function WorldProgressMap({
  countryResults,
  selectedCode = null,
  highlightCodes = null,
  selectable,
  disabled = false,
  zoom: externalZoom,
  centerLongitude = 0,
  rotationOffset = 0,
  southUp = false,
  globe = false,
  showSubnationalBorders = false,
  extraControls,
  flagOverlay = null,
  fillOverride = null,
  cityOverlay = null,
  belowMapNode = null,
  dataTooltip = null,
}: Props) {
  const { theme } = useTheme();
  const palette = theme === "dark" ? DARK_PALETTE : LIGHT_PALETTE;
  const [geographies, setGeographies] = useState<GeoFeature[]>([]);
  const [popover, setPopover] = useState<Popover | null>(null);
  const dataTipRef = useRef<MapDataTooltipHandle>(null);
  // Pointer type of the latest press on a country, so a click can tell a tap
  // (show the data tooltip, since touch has no hover) from a mouse click.
  const lastPointerTypeRef = useRef<string>("mouse");
  // Locally-tracked hovered country, used to reveal that country's capital
  // label in the (non-interactive) city overlay.
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);
  // Sub-national border overlay features — loaded lazily the first time the
  // checkbox is turned on, then kept for the life of the component so a
  // toggle-off / toggle-on does not refetch.
  const [subnationalFeatures, setSubnationalFeatures] = useState<
    SubdivisionGeoFeature[] | null
  >(null);
  const frameRef = useRef<HTMLDivElement>(null);
  // Screen px per user unit — keeps the revealed capital label a constant size.
  const [unitPx, measureFrame] = useUnitPx(WIDTH);
  const setFrame = useCallback(
    (el: HTMLDivElement | null) => {
      frameRef.current = el;
      measureFrame(el);
    },
    [measureFrame],
  );
  // See HistoricalMap for the same pattern — local hook always runs, but
  // the caller can pass a `zoom` to share state with a sibling map.
  const localZoom = useZoomPan(WIDTH, HEIGHT);
  const zoom = externalZoom ?? localZoom;
  const globeDrag = useGlobeDrag({
    width: WIDTH,
    height: HEIGHT,
    zoomK: zoom.view.k,
    southUp,
    resetKey: `${globe}|${centerLongitude}`,
  });
  // Flat map: projection depends only on the stable centre (rotation is an
  // O(1) translate). Globe: rotation and drag re-project, so they feed in.
  const projLon = globe ? centerLongitude + rotationOffset + globeDrag.lon : centerLongitude;
  const projLat = globe ? globeDrag.lat : 0;
  // Overlays (flags, sub-national borders, cities) track the live globe view,
  // so they stay on screen while it is dragged or spinning.
  const overlayLon = projLon;
  const overlayLat = projLat;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // Retry transient network failures: a single dropped request (common on
        // flaky mobile / VPN connections) must not leave the world map blank.
        const res = await fetchWithRetry(GEO_URL);
        if (!res.ok) throw new Error("Failed to load world map");
        const topo = (await res.json()) as WorldTopo;
        const fc = feature(topo, topo.objects.countries) as FeatureCollection;

        // Extract Crimea from Russia (id=643 / "RU")
        const russiaFeature = fc.features.find((f) => {
          const alpha2 = toIsoAlpha2(f.id);
          return alpha2 === "RU";
        });

        if (russiaFeature && russiaFeature.geometry && (russiaFeature.geometry as any).type === "MultiPolygon") {
          const coords = (russiaFeature.geometry as any).coordinates as number[][][][];
          const filteredCoords: number[][][][] = [];
          let crimeaCoords: number[][][] | null = null;
          
          for (const poly of coords) {
            let sumLon = 0;
            let sumLat = 0;
            const pts = poly[0];
            if (pts && pts.length > 0) {
              for (let i = 0; i < pts.length; i++) {
                sumLon += pts[i][0];
                sumLat += pts[i][1];
              }
              const cLon = sumLon / pts.length;
              const cLat = sumLat / pts.length;
              
              if (cLon >= 32.0 && cLon <= 37.0 && cLat >= 44.0 && cLat <= 46.5) {
                crimeaCoords = poly;
                continue;
              }
            }
            filteredCoords.push(poly);
          }
          
          if (crimeaCoords) {
            (russiaFeature.geometry as any).coordinates = filteredCoords;

            // Create a new separate feature for Crimea
            const crimeaFeature: GeoFeature = {
              type: "Feature",
              id: "DISPUTED_CRIMEA",
              properties: { name: "Crimea (Disputed/Claimed)" },
              geometry: {
                type: "Polygon",
                coordinates: crimeaCoords
              }
            };
            fc.features.push(crimeaFeature);
          }
        }

        // Fix Western Sahara / Morocco border in the Natural Earth 50m topology.
        //
        // Natural Earth assigns the Moroccan-controlled Southern Provinces to
        // Morocco's polygon (MA, id=504). EH (id=732) only covers the Polisario
        // Free Zone east of the Berm, so cities like Laayoune and Dakhla would
        // appear as Morocco rather than as Western Sahara.
        //
        // Remedy: clip MA at the internationally recognised Morocco-WS border
        // (~27.657°N, the northernmost extent of EH's polygon in the topology)
        // and union the removed Southern Provinces area with EH. The result:
        //   • Morocco = pre-1975 territory, ending cleanly at ~27.657°N
        //   • Western Sahara = full non-self-governing territory (coast to Berm)
        {
          const maFeat = fc.features.find(f => toIsoAlpha2(f.id) === "MA");
          const ehFeat = fc.features.find(f => toIsoAlpha2(f.id) === "EH");
          if (
            maFeat?.geometry && ehFeat?.geometry &&
            (maFeat.geometry as {type:string}).type === "Polygon" &&
            (ehFeat.geometry as {type:string}).type === "Polygon"
          ) {
            const maRings = (maFeat.geometry as {coordinates:[number,number][][]}).coordinates;
            const ehRings = (ehFeat.geometry as {coordinates:[number,number][][]}).coordinates;
            // Clip latitude: EH's exact northernmost extent in the topology
            const CLIP_LAT = 27.657;
            const northBox: [number,number][] = [[-20, CLIP_LAT],[0, CLIP_LAT],[0, 90],[-20, 90],[-20, CLIP_LAT]];
            const southBox: [number,number][] = [[-20, -90],[0, -90],[0, CLIP_LAT],[-20, CLIP_LAT],[-20, -90]];
            // polygon-clipping winds rings opposite to the GeoJSON/d3-geo
            // convention. d3's spherical geoPath treats a backwards-wound ring
            // as "everything OUTSIDE this ring", filling the whole globe minus
            // a tiny hole. Detect that (area > a hemisphere) and reverse every
            // ring so the polygon fills its small interior, not the planet.
            const fixWinding = (poly: [number,number][][]): [number,number][][] =>
              geoArea({ type: "Polygon", coordinates: poly } as never) > 2 * Math.PI
                ? poly.map((ring) => ring.slice().reverse())
                : poly;
            try {
              const maProper   = polygonClipping.intersection([maRings], [[northBox]]);
              const maSouthern = polygonClipping.intersection([maRings], [[southBox]]);
              const fullWS     = polygonClipping.union([ehRings], maSouthern);
              if (maProper.length > 0 && fullWS.length > 0) {
                (maFeat.geometry as {coordinates:unknown}).coordinates = fixWinding(maProper[0] as [number,number][][]);
                (ehFeat.geometry as {coordinates:unknown}).coordinates = fixWinding(fullWS[0] as [number,number][][]);
              }
            } catch {
              // Leave original geometries intact if surgery fails
            }
          }
        }

        // Gibraltar is absent from the 50m topology (~6.7 km² — sub-pixel at
        // world scale). Inject it at TRUE scale as a small polygon so it is
        // represented WITHOUT misrepresenting its size: it is a tiny speck at
        // world zoom and becomes legible only when the user zooms in. Coloured
        // grey via the name matcher (a disputed UK territory claimed by Spain).
        // Never enlarge it — a fixed-size marker would misrepresent the territory.
        {
          const gibraltarRing: [number, number][] = [
            [-5.3389, 36.1083], // Europa Point (south tip)
            [-5.3470, 36.1180],
            [-5.3540, 36.1350],
            [-5.3565, 36.1500],
            [-5.3560, 36.1551], // north-west frontier with Spain
            [-5.3400, 36.1545], // north-east frontier
            [-5.3360, 36.1430],
            [-5.3370, 36.1300],
            [-5.3389, 36.1083], // close
          ];
          // Guard the spherical winding (a backwards ring makes d3 fill the
          // whole globe minus this speck — see the WS surgery note above).
          const ar = geoArea({ type: "Polygon", coordinates: [gibraltarRing] } as never);
          const ring = ar > 2 * Math.PI ? gibraltarRing.slice().reverse() : gibraltarRing;
          fc.features.push({
            type: "Feature",
            id: "GIBRALTAR",
            properties: { name: "Gibraltar" },
            geometry: { type: "Polygon", coordinates: [ring] },
          });
        }

        if (!cancelled) setGeographies(fc.features);
      } catch {
        if (!cancelled) setGeographies([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Prefetch the precomputed sub-national border mesh as soon as the Today
  // map mounts, so toggling the checkbox is usually instant (cache hit).
  useEffect(() => {
    prefetchWorldSubnationalBorders();
  }, []);

  // Load the overlay the first time the checkbox is turned on. The module
  // cache (and the prefetch above) means this is typically already resolved.
  useEffect(() => {
    if (!showSubnationalBorders) return;
    if (subnationalFeatures) return;
    let cancelled = false;
    (async () => {
      try {
        const features = await loadWorldSubnationalBorders();
        if (!cancelled) setSubnationalFeatures(features);
      } catch {
        // Leave null — a later toggle / remount can retry.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [showSubnationalBorders, subnationalFeatures]);

  // Cold path — only reruns when geography data or center meridian changes.
  // rotationOffset is intentionally excluded: the three-copy translate approach
  // handles globe rotation in O(1) without reprojecting paths on every frame.
  const projection = useMemo(
    () => worldProjection(WIDTH, HEIGHT, { globe, longitude: projLon, latitude: projLat }),
    [globe, projLon, projLat],
  );
  const geoCaps = useMemo(
    () => (globe ? geographies.map((g) => sphericalCap(g)) : null),
    [globe, geographies],
  );
  const hasFlagOverlay = !!flagOverlay;
  // Per-polygon caps (globe only): an island on the far side is skipped even
  // when its country's mainland faces the viewer.
  const ringCaps = useMemo(() => {
    if (!globe) return null;
    return geographies.map((geo) => polygonsOf(geo).map((coords) =>
      sphericalCap({ geometry: { type: "Polygon", coordinates: coords } }),
    ));
  }, [globe, geographies]);
  const { pathByIdx, ringPathsByIdx, spherePath, graticulePath, pxPerDegree } = useMemo(() => {
    const mapPath = geoPath(projection);
    const spherePath = mapPath({ type: "Sphere" } as never) ?? null;
    const graticulePath = globe ? mapPath(geoGraticule10()) ?? null : null;
    // Equal Earth is exactly linear in longitude at the equator; project two
    // equatorial points 1° apart to get the exact pixel/degree scale factor.
    const p0 = projection([projLon, 0]);
    const p1 = projection([projLon + 1, 0]);
    const pxPerDegree = !globe && p0 && p1 ? p1[0] - p0[0] : WIDTH / 360;

    const view = { globe, longitude: projLon, latitude: projLat };
    const pathByIdx = new Map<number, string>();
    // Per-polygon paths, kept for the flag overlay so it never re-projects. A
    // country's path is the concatenation of its polygons' paths — the same
    // string geoPath emits for the whole MultiPolygon.
    const ringPathsByIdx = hasFlagOverlay ? new Map<number, (string | null)[]>() : null;
    for (let i = 0; i < geographies.length; i++) {
      if (!capMayBeVisible(geoCaps?.[i] ?? null, view)) continue;
      const geo = geographies[i];
      const polygons = polygonsOf(geo);
      if (polygons.length === 0 || (!ringPathsByIdx && !ringCaps && polygons.length === 1)) {
        const path = mapPath(geo as never);
        if (path) pathByIdx.set(i, path);
        continue;
      }
      const ringPaths: (string | null)[] = [];
      for (let ri = 0; ri < polygons.length; ri++) {
        if (ringCaps && !capMayBeVisible(ringCaps[i]?.[ri] ?? null, view)) {
          ringPaths.push(null);
          continue;
        }
        ringPaths.push(
          mapPath({ type: "Feature", properties: {}, geometry: { type: "Polygon", coordinates: polygons[ri] } } as never) || null,
        );
      }
      const path = ringPaths.join("");
      if (path) pathByIdx.set(i, path);
      ringPathsByIdx?.set(i, ringPaths);
    }
    return { pathByIdx, ringPathsByIdx, spherePath, graticulePath, pxPerDegree };
  }, [geographies, geoCaps, ringCaps, hasFlagOverlay, projection, globe, projLon, projLat]);

  // Only the selected country's centroid is ever needed (the pulse ring).
  const selCentroid = useMemo((): [number, number] | null => {
    if (!selectedCode) return null;
    const mapPath = geoPath(projection);
    for (const geo of geographies) {
      if (toIsoAlpha2(geo.id) !== selectedCode) continue;
      const c = mapPath.centroid(geo as never);
      if (c && isFinite(c[0]) && isFinite(c[1])) return [c[0], c[1]];
    }
    const lonLat = MICRO_STATE_COORDS[selectedCode] as [number, number] | undefined;
    if (!lonLat || !isPointVisible(lonLat, { globe, longitude: projLon, latitude: projLat })) {
      return null;
    }
    const pt = projection(lonLat);
    return pt && isFinite(pt[0]) && isFinite(pt[1]) ? [pt[0], pt[1]] : null;
  }, [selectedCode, geographies, projection, globe, projLon, projLat]);

  // Projected sub-national border paths — same Equal Earth / centre-longitude
  // projection as the country layer. digits(1) keeps the SVG `d` under a
  // pixel at map scale while cutting path-string size ~25%. One path string
  // is reused by the centre rotation copy only (see render below).
  // On the globe the mesh is split into its individual border lines, each with
  // a bounding cap, so a moving frame projects only the lines facing the viewer.
  const subnationalGlobeLines = useMemo(() => {
    if (!globe || !subnationalFeatures) return null;
    const lines: { coords: [number, number][]; cap: SphericalCap | null }[] = [];
    for (const f of subnationalFeatures) {
      const geom = f.geometry as { type: string; coordinates: unknown } | null;
      if (!geom) continue;
      const parts =
        geom.type === "MultiLineString"
          ? (geom.coordinates as [number, number][][])
          : geom.type === "LineString"
            ? [geom.coordinates as [number, number][]]
            : [];
      for (const coords of parts) {
        lines.push({
          coords,
          cap: sphericalCap({ geometry: { type: "LineString", coordinates: coords } }),
        });
      }
    }
    return lines;
  }, [globe, subnationalFeatures]);
  const subnationalPaths = useMemo(() => {
    if (!showSubnationalBorders || !subnationalFeatures || subnationalFeatures.length === 0) {
      return [] as string[];
    }
    const view = { globe, longitude: overlayLon, latitude: overlayLat };
    const mapPath = geoPath(worldProjection(WIDTH, HEIGHT, view)).digits(1);
    if (subnationalGlobeLines) {
      const visible: [number, number][][] = [];
      for (const line of subnationalGlobeLines) {
        if (capMayBeVisible(line.cap, view)) visible.push(line.coords);
      }
      const d = mapPath({ type: "MultiLineString", coordinates: visible } as never);
      return d ? [d] : [];
    }
    const paths: string[] = [];
    for (const f of subnationalFeatures) {
      const d = mapPath(f as never);
      if (d) paths.push(d);
    }
    return paths;
  }, [showSubnationalBorders, subnationalFeatures, subnationalGlobeLines, globe, overlayLon, overlayLat]);

  // O(1) hot path — no memo, no reprojection. Three copies of the country
  // paths (at -WIDTH, 0, +WIDTH) are all translated together by this amount,
  // creating seamless globe rotation without any per-frame geoPath calls.
  const flagTranslateX = !globe && rotationOffset !== 0 ? -(rotationOffset * pxPerDegree) : 0;

  const flagZoomK = globe ? zoom.view.k : 1;
  // Reuses the country layer's per-polygon paths, so moving the globe costs no
  // extra projection for the flags.
  const flagPolygonsById = useMemo(() => {
    const result = new Map<string, FlagPoly[]>();
    if (!ringPathsByIdx) return result;
    for (const [gi, ringPaths] of ringPathsByIdx) {
      const geo = geographies[gi];
      const alpha2 = toIsoAlpha2(geo.id);
      if (!alpha2) continue;
      const polygons = polygonsOf(geo);
      const polys: FlagPoly[] = [];
      for (let ri = 0; ri < ringPaths.length; ri++) {
        const pd = ringPaths[ri];
        if (!pd) continue;
        const b = pathStringBounds(pd);
        if (!b) continue;
        const bw = b[2] - b[0];
        const bh = b[3] - b[1];
        if (bw <= 0 || bh <= 0) continue;
        // On the globe every frame re-renders each tile, so rings too small to
        // show a flag (a few screen pixels) keep just the country fill.
        if (globe && bw * flagZoomK < MIN_GLOBE_FLAG_RING_PX && bh * flagZoomK < MIN_GLOBE_FLAG_RING_PX) continue;
        // Antimeridian-crossing tiny rings get a D3 sphere-cap closure
        // segment that is very wide but very short (bh < 2px in practice).
        // Russia's mainland has bw/bh ≈ 8.19, so guard on bh < 20 to avoid
        // falsely filtering large countries that are just wide and flat.
        if (bw / bh > 8 && bh < 20) continue;
        if (!globe) {
          const pf = { type: "Feature", properties: {}, geometry: { type: "Polygon", coordinates: polygons[ri] } };
          const svgC = projection(geoCentroid(pf as never));
          if (!svgC || !isFinite(svgC[0]) || !isFinite(svgC[1])) continue;
        }
        const imgH = Math.max(bh, 20);
        // Anchor at bbox top-left so the pattern tile aligns with the country's
        // top/bottom edges — all flag stripes are visible via tiling. The tile
        // width is derived from the flag's true ratio in FlagDefs (see above).
        polys.push({ path: pd, x: b[0], y: b[1], h: imgH });
      }
      if (polys.length > 0) {
        const existing = result.get(alpha2);
        result.set(alpha2, existing ? [...existing, ...polys] : polys);
      }
    }
    return result;
  }, [ringPathsByIdx, geographies, projection, globe, flagZoomK]);

  // Cold path — project each city's lon/lat to the base (non-rotated) SVG
  // coordinates once. Rotation/zoom/south-up are applied per-frame in the
  // constant-size marker render below (same approach as the pulse indicator).
  const cityBase = useMemo(() => {
    if (!cityOverlay || cityOverlay.length === 0)
      return [] as { city: PlacedCity; bx: number; by: number }[];
    const view = { globe, longitude: overlayLon, latitude: overlayLat };
    const projection = worldProjection(WIDTH, HEIGHT, view);
    const out: { city: PlacedCity; bx: number; by: number }[] = [];
    for (const city of cityOverlay) {
      if (!isPointVisible([city.lon, city.lat], view)) continue;
      const p = projection([city.lon, city.lat]);
      if (p && isFinite(p[0]) && isFinite(p[1])) out.push({ city, bx: p[0], by: p[1] });
    }
    return out;
  }, [cityOverlay, globe, overlayLon, overlayLat]);

  // Hide the popover when the parent clears the selection (e.g., new round
  // starts after a correct answer, or wrong-in-Custom clears the dropdown).
  useEffect(() => {
    if (!selectedCode) setPopover(null);
  }, [selectedCode]);

  // Also hide while the map is disabled (e.g. during the "revealed" phase).
  useEffect(() => {
    if (disabled) setPopover(null);
  }, [disabled]);

  const isInteractive = !!selectable && !disabled;

  // Frame-relative position of a pointer event, for the data tooltip.
  function framePoint(e: React.MouseEvent): { x: number; y: number } | null {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return null;
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function countryName(code: string): string {
    return selectable?.names.get(code) ?? ALL_UN_NAMES.get(code) ?? code;
  }

  // A tapped tooltip is pinned to where the finger was, so once the map moves
  // under it (zoom, pan, rotation) it would point at the wrong country — close
  // it. A mouse tooltip follows the cursor and is left alone.
  const { k: viewK, tx: viewTx, ty: viewTy } = zoom.view;
  useEffect(() => {
    if (lastPointerTypeRef.current !== "mouse") dataTipRef.current?.hide();
  }, [viewK, viewTx, viewTy, centerLongitude, rotationOffset, southUp, globeDrag.lon, globeDrag.lat]);

  function handlePathClick(e: React.MouseEvent<SVGPathElement>, alpha2: string) {
    if (!isInteractive || !selectable) return;
    const frameRect = frameRef.current?.getBoundingClientRect();
    if (!frameRect) return;

    // Anchor on the CLICK POINT instead of the path's bbox centre. The bbox
    // approach breaks for antimeridian-spanning countries (Russia, Fiji, US)
    // whose bbox spans nearly the entire map width with the geometric centre
    // landing in the middle of an ocean. The click point is always inside
    // the country the user actually pointed at.
    const clickX = e.clientX - frameRect.left;
    const clickY = e.clientY - frameRect.top;

    // Reserve enough room for the popover so it never clips off the frame
    // (these are upper-bound estimates of the rendered size).
    const HALF_W = 130;
    const HEIGHT = 64;
    const MARGIN = 8;

    // Clamp the horizontal anchor so the popover stays inside the frame.
    const x = Math.max(
      HALF_W + MARGIN,
      Math.min(frameRect.width - HALF_W - MARGIN, clickX),
    );

    // Prefer placing the popover above the click; flip to below when the
    // click is too close to the top edge of the frame.
    const placeAbove = clickY >= HEIGHT + MARGIN * 2;
    const y = placeAbove ? clickY - MARGIN : clickY + MARGIN;
    const placement: "above" | "below" = placeAbove ? "above" : "below";

    // Territories resolve to their administering parent country before any
    // pool check, name lookup, or onSelect call.
    const resolvedCode = selectable.territoryParent?.[alpha2] ?? alpha2;
    const isInPool = selectable.codes.has(resolvedCode);
    const name =
      selectable.names.get(resolvedCode) ??
      ALL_UN_NAMES.get(resolvedCode) ??
      resolvedCode;

    // Touch has no hover, so a tap is what reveals the data tooltip.
    if (dataTooltip && lastPointerTypeRef.current !== "mouse") {
      dataTipRef.current?.show(resolvedCode, name, clickX, clickY);
    }

    if (isInPool) {
      selectable.onSelect(resolvedCode);
      // Skip the popover entirely when no onConfirm is supplied — used by
      // the Learn-mode sandbox where clicks just select, no confirm.
      if (selectable.onConfirm) {
        setPopover({ code: resolvedCode, name, x, y, kind: "confirm", placement });
      }
    } else {
      // Country is rendered on the map but isn't part of this game's pool
      // (typical in Custom Game). Tell the user instead of silently failing.
      setPopover({ code: resolvedCode, name, x, y, kind: "info", placement });
    }
  }

  function handleConfirm() {
    if (!selectable?.onConfirm) return;
    selectable.onConfirm();
    setPopover(null);
  }

  // "Guess" wording only fits modes that expect a confirm; Learn mode passes
  // no onConfirm so we adjust the hint to talk about exploration instead.
  const interactiveHint = selectable?.onConfirm
    ? "— click a highlighted country to guess"
    : "— hover or click a country to see its flag";

  // Pulsing ring indicator — shown for micro-nations that are hard to
  // spot at the default zoom level.  Rendered OUTSIDE the zoom <g> so
  // the ring's visual size is constant regardless of zoom, but positioned
  // using the live zoom transform so it tracks the country on screen.
  // Show pulse for all countries with area ≤ Denmark (~43,094 km²).
  const showPulse = !!(selCentroid && selectedCode && SMALL_NATION_CODES.has(selectedCode));
  const { k: zk, tx: ztx, ty: zty } = zoom.view;
  // Centroids are from the base (non-rotated) projection. Add flagTranslateX
  // then wrap to [0, WIDTH] to pick the copy currently in the visible sphere.
  const basePulseX = selCentroid ? selCentroid[0] + flagTranslateX : 0;
  const wrappedPulseX =
    basePulseX < 0 ? basePulseX + WIDTH : basePulseX >= WIDTH ? basePulseX - WIDTH : basePulseX;
  const pulseX = wrappedPulseX * zk + ztx;
  const pulseY = selCentroid
    ? (southUp ? HEIGHT - selCentroid[1] : selCentroid[1]) * zk + zty
    : 0;
  // Clip to a generous margin around the viewBox so the ring never
  // renders in dead space when the user has panned the country off-screen.
  const PULSE_MARGIN = 30;
  const pulseVisible =
    showPulse &&
    pulseX > -PULSE_MARGIN && pulseX < WIDTH  + PULSE_MARGIN &&
    pulseY > -PULSE_MARGIN && pulseY < HEIGHT + PULSE_MARGIN;

  // Project city markers to screen space — apply the same rotation-wrap + zoom
  // + south-up transform the pulse indicator uses, so markers track the map but
  // stay a constant pixel size (never enlarged with zoom).
  const CITY_MARGIN = 40;
  const cityScreen: ScreenCity[] = cityBase
    .map(({ city, bx, by }) => {
      const baseX = bx + flagTranslateX;
      const wrappedX = baseX < 0 ? baseX + WIDTH : baseX >= WIDTH ? baseX - WIDTH : baseX;
      const x = wrappedX * zk + ztx;
      const y = (southUp ? HEIGHT - by : by) * zk + zty;
      return { city, x, y };
    })
    .filter(
      (m) =>
        m.x > -CITY_MARGIN && m.x < WIDTH + CITY_MARGIN &&
        m.y > -CITY_MARGIN && m.y < HEIGHT + CITY_MARGIN,
    );
  const labelHalo = theme === "dark" ? palette.ocean : "#ffffff";
  // Names stay hidden by default so the world view shows clean glyphs; a capital's
  // name is revealed when the user hovers or taps its marker (handled inside
  // CityMarkers). The legend explains the glyphs.

  return (
    <section className="map-section" aria-labelledby="map-heading">
      <h2 id="map-heading" className="map-heading">
        World map
        {isInteractive && (
          <span className="map-heading__hint"> {interactiveHint}</span>
        )}
      </h2>
      <div className="map-with-zoom">
      <div className="map-frame" ref={setFrame}>
        <svg
          className="world-map"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          role="img"
          aria-label="World map showing correctly and incorrectly guessed countries"
          // Drag-to-pan is enabled (only effective when zoomed in — at
          // k=1 the pan clamp collapses to zero). Wheel-zoom and
          // double-click-reset stay off so the user can still
          // page-scroll over the map.
          // On the globe a drag spins it instead of panning.
          onPointerDown={globe ? globeDrag.handlers.onPointerDown : zoom.svgHandlers.onPointerDown}
          onPointerMove={globe ? globeDrag.handlers.onPointerMove : zoom.svgHandlers.onPointerMove}
          onPointerUp={globe ? globeDrag.handlers.onPointerUp : zoom.svgHandlers.onPointerUp}
          onPointerCancel={globe ? globeDrag.handlers.onPointerCancel : zoom.svgHandlers.onPointerCancel}
          // Tapping anywhere that is not a country (the sea, a disputed
          // territory) closes a tapped data tooltip.
          onClick={
            dataTooltip
              ? (e) => {
                  const t = e.target as Element;
                  if (!t.classList?.contains("world-map__country--selectable")) {
                    dataTipRef.current?.hide();
                  }
                }
              : undefined
          }
          style={
            globe
              ? {
                  cursor: globeDrag.dragging ? "grabbing" : "grab",
                  // Keep vertical page scrolling on touch unless zoomed in.
                  touchAction: zoom.isZoomed ? "none" : "pan-y",
                }
              : {
                  cursor: zoom.isZoomed ? "grab" : "default",
                  touchAction: zoom.isZoomed ? "none" : "auto",
                }
          }
        >
          {/* Flag clip paths + sphere clip live at SVG root — outside all
              transforms. Safari has a bug where it applies parent group
              transforms to <defs> content (clipPath / pattern) when <defs>
              is nested inside a transformed <g>. Placing <defs> here avoids
              that. clipPathUnits="userSpaceOnUse" means the clip coordinates
              are interpreted in the referencing element's coordinate system,
              so the paths align correctly even when the map is zoomed or
              flipped south-up. */}
          {spherePath && (
            <defs>
              {/* Sphere outline clip — applied to the three-copy rotation
                  group (inside zoom + south-up transforms) so country
                  landmasses that reach the globe edge are clipped elegantly
                  instead of floating outside the outline. The clip path uses
                  the sphere outline from the same Equal Earth projection as
                  the country paths, so it matches exactly. */}
              <clipPath id="wm-sphere-clip" clipPathUnits="userSpaceOnUse">
                <path d={spherePath} />
              </clipPath>
            </defs>
          )}
          {flagOverlay && (
            <FlagDefs
              flagOverlay={flagOverlay}
              flagPolygonsById={flagPolygonsById}
              geographies={geographies}
              territoryParent={selectable?.territoryParent}
            />
          )}
          <g transform={zoom.transform}>
          {/* South-up flip happens inside the zoom group so flipping +
              zooming compose correctly. See HistoricalMap for details. */}
          <g
            transform={southUp ? `translate(0 ${HEIGHT}) scale(1 -1)` : undefined}
          >
          {spherePath && (
            <path
              d={spherePath}
              fill={palette.ocean}
              stroke={palette.stroke}
              strokeWidth={0.45}
              strokeOpacity={0.55}
              vectorEffect="non-scaling-stroke"
            />
          )}
          {graticulePath && (
            <path
              d={graticulePath}
              fill="none"
              stroke={palette.stroke}
              strokeWidth={0.5}
              strokeOpacity={0.12}
              vectorEffect="non-scaling-stroke"
              pointerEvents="none"
              aria-hidden="true"
            />
          )}
          {/* Three-copy rotation group — translates all country paths and
              flag images together by flagTranslateX (O(1) per frame).
              Three copies at -WIDTH, 0, +WIDTH ensure the sphere is always
              fully covered regardless of rotation offset.
              will-change promotes this group to a GPU compositing layer so
              only the transform changes, not the painted content.
              clipPath="url(#wm-sphere-clip)" clips all landmasses to the
              globe outline so countries elegantly disappear at the edges
              instead of floating outside the globe boundary. The clip is
              applied here (inside zoom + south-up transforms) so coordinates
              match the sphere path's coordinate system. */}
          <g
            transform={
              flagTranslateX !== 0
                ? `translate(${flagTranslateX.toFixed(2)} 0)`
                : undefined
            }
            style={{ willChange: "transform" }}
            clipPath={spherePath ? "url(#wm-sphere-clip)" : undefined}
          >
            {(globe ? ([0] as const) : ([-WIDTH, 0, WIDTH] as const)).map((offset) => (
              <g
                key={offset}
                transform={offset !== 0 ? `translate(${offset} 0)` : undefined}
              >
                {geographies.map((geo, idx) => {
                  const key = String(geo.id ?? idx) + "-" + idx;
                  const path = pathByIdx.get(idx);
                  if (!path) return null;
                  const alpha2 = toIsoAlpha2(geo.id);
                  const isInPool =
                    !!alpha2 && !!selectable && selectable.codes.has(alpha2);
                  const isUnMember = !!alpha2 && ALL_UN_NAMES.has(alpha2);
                  // A territory with an entry in selectable.territoryParent is
                  // also clickable — it resolves to the parent country on click.
                  const isClickableTerritory =
                    !!alpha2 && !!selectable?.territoryParent?.[alpha2];
                  const clickable =
                    isInteractive && (isUnMember || isClickableTerritory);
                  const isSelected =
                    !!alpha2 &&
                    (alpha2 === selectedCode || !!highlightCodes?.has(alpha2));
                  const featureName =
                    typeof geo.properties?.name === "string" ? geo.properties.name : null;
                  const isDisputedTerritory =
                    geo.id === "DISPUTED_CRIMEA" ||
                    (alpha2 !== null &&
                      (DISPUTED_TERRITORY_CODES.has(alpha2) ||
                        WORLD_MAP_DISPUTED_ALPHA2.has(alpha2))) ||
                    (featureName !== null && WORLD_MAP_DISPUTED_NAMES.has(featureName));
                  // A disputed territory ALWAYS keeps its neutral colour — the
                  // disputed-neutrality hard rule outranks the passport layer, so
                  // the override is only consulted for non-disputed countries.
                  // A non-disputed territory (Greenland, Puerto Rico, …) has no
                  // fill of its own — it takes its administering country's colour,
                  // the SAME territory→parent resolution the flag overlay applies
                  // (see FlagDefs above), so Greenland matches Denmark.
                  const fillCode =
                    alpha2 && !isDisputedTerritory
                      ? selectable?.territoryParent?.[alpha2] ?? alpha2
                      : null;
                  const overrideFill = fillCode
                    ? fillOverride?.get(fillCode) ?? null
                    : null;
                  const baseFill = isDisputedTerritory
                    ? palette.disputedLand
                    : overrideFill ?? getFill(alpha2, countryResults, palette, isInPool);
                  const tooltip =
                    alpha2
                      ? selectable?.names.get(alpha2) ??
                        ALL_UN_NAMES.get(alpha2) ??
                        null
                      : (geo.properties?.name as string || null);
                  return (
                    <path
                      key={key}
                      d={path}
                      fill={isSelected ? palette.selectedFill : baseFill}
                      stroke={isSelected ? palette.selectedStroke : palette.stroke}
                      strokeWidth={isSelected ? 1.4 : isDisputedTerritory ? 0.75 : 0.45}
                      strokeOpacity={isSelected ? 1 : isDisputedTerritory ? 0.8 : 0.55}
                      vectorEffect="non-scaling-stroke"
                      className={
                        clickable
                          ? "world-map__country world-map__country--selectable"
                          : "world-map__country"
                      }
                      onClick={
                        clickable && alpha2
                          ? (e) => handlePathClick(e, alpha2)
                          : undefined
                      }
                      // Touch-generated mouse hover can open the detail panel
                      // before click, moving the map under the user's finger.
                      // Keep previews mouse-only; touch commits through onClick.
                      onPointerDown={
                        clickable
                          ? (e) => {
                              lastPointerTypeRef.current = e.pointerType;
                            }
                          : undefined
                      }
                      onPointerEnter={
                        clickable && alpha2
                          ? (e) => {
                              if (e.pointerType !== "mouse") return;
                              lastPointerTypeRef.current = "mouse";
                              const resolved =
                                selectable!.territoryParent?.[alpha2!] ?? alpha2!;
                              setHoveredCode(resolved);
                              selectable?.onHover?.(resolved);
                              const pt = dataTooltip ? framePoint(e) : null;
                              if (pt) {
                                dataTipRef.current?.show(
                                  resolved,
                                  countryName(resolved),
                                  pt.x,
                                  pt.y,
                                );
                              }
                            }
                          : undefined
                      }
                      onPointerMove={
                        clickable && dataTooltip
                          ? (e) => {
                              if (e.pointerType !== "mouse") return;
                              const pt = framePoint(e);
                              if (pt) dataTipRef.current?.move(pt.x, pt.y);
                            }
                          : undefined
                      }
                      onPointerLeave={
                        clickable
                          ? (e) => {
                              if (e.pointerType !== "mouse") return;
                              setHoveredCode(null);
                              selectable?.onHover?.(null);
                              dataTipRef.current?.hide();
                            }
                          : undefined
                      }
                    >
                      {/* The data tooltip replaces the browser's own title
                          tooltip, which would otherwise pop up on top of it. */}
                      {tooltip && !dataTooltip ? <title>{tooltip}</title> : null}
                    </path>
                  );
                })}
                {flagOverlay && (
                  <FlagImages
                    flagOverlay={flagOverlay}
                    flagPolygonsById={flagPolygonsById}
                    geographies={geographies}
                    selectedCode={selectedCode}
                    highlightCodes={highlightCodes}
                    territoryParent={selectable?.territoryParent}
                  />
                )}
                {/* Sub-national borders — decorative only. Drawn ABOVE country
                    fills (and any flag overlay) so internal state/province
                    lines are visible; pointer-events:none so hover/click still
                    hit the country underneath. A stroke-only national-border
                    pass follows so coastlines stay solid, not dashed.
                    Only the centre rotation-copy renders the overlay: the
                    ±WIDTH copies would triple a multi-MB path string in the
                    DOM for a seam that only matters while the globe is
                    free-spinning. */}
                {offset === 0 &&
                  showSubnationalBorders &&
                  subnationalPaths.length > 0 && (
                  <g
                    className="world-map__subnational-borders"
                    pointerEvents="none"
                    aria-hidden="true"
                  >
                    {subnationalPaths.map((d, i) => (
                      <path
                        key={i}
                        d={d}
                        fill="none"
                        stroke={palette.stroke}
                        strokeWidth={0.75}
                        strokeOpacity={0.55}
                        strokeDasharray="4 3"
                        strokeLinecap="butt"
                        vectorEffect="non-scaling-stroke"
                      />
                    ))}
                  </g>
                )}
                {/* Re-stroke national outlines on top of the dashed overlay so
                    country borders stay visually distinct (solid, darker). */}
                {offset === 0 &&
                  showSubnationalBorders &&
                  subnationalPaths.length > 0 && (
                  <g
                    className="world-map__national-border-restore"
                    pointerEvents="none"
                    aria-hidden="true"
                  >
                    {geographies.map((geo, idx) => {
                      const path = pathByIdx.get(idx);
                      if (!path) return null;
                      const alpha2 = toIsoAlpha2(geo.id);
                      const isSelected =
                        !!alpha2 &&
                        (alpha2 === selectedCode || !!highlightCodes?.has(alpha2));
                      const featureName =
                        typeof geo.properties?.name === "string"
                          ? geo.properties.name
                          : null;
                      const isDisputedTerritory =
                        geo.id === "DISPUTED_CRIMEA" ||
                        (alpha2 !== null &&
                          (DISPUTED_TERRITORY_CODES.has(alpha2) ||
                            WORLD_MAP_DISPUTED_ALPHA2.has(alpha2))) ||
                        (featureName !== null &&
                          WORLD_MAP_DISPUTED_NAMES.has(featureName));
                      return (
                        <path
                          key={`nb-${String(geo.id ?? idx)}-${idx}`}
                          d={path}
                          fill="none"
                          stroke={
                            isSelected ? palette.selectedStroke : palette.stroke
                          }
                          strokeWidth={
                            isSelected ? 1.4 : isDisputedTerritory ? 0.75 : 0.45
                          }
                          strokeOpacity={
                            isSelected ? 1 : isDisputedTerritory ? 0.8 : 0.55
                          }
                          vectorEffect="non-scaling-stroke"
                        />
                      );
                    })}
                  </g>
                )}
              </g>
            ))}
          </g>
          </g>
          </g>
          {/* Pulse indicator — outside the zoom group so its pixel size
              stays constant, but positioned using the zoom transform. */}
          {pulseVisible && (
            <g
              transform={`translate(${pulseX.toFixed(1)} ${pulseY.toFixed(1)})`}
              aria-hidden="true"
            >
              <circle r={7} className="map-country-pulse__ring" />
              <circle r={7} className="map-country-pulse__ring map-country-pulse__ring--2" />
              <circle r={3.5} className="map-country-pulse__dot" />
            </g>
          )}
          {/* City markers — outside the zoom group so they keep a constant
              pixel size; positioned via the zoom/rotation transform above. */}
          {cityScreen.length > 0 && (
            <CityMarkers
              markers={cityScreen}
              activeCode={hoveredCode ?? selectedCode}
              unitPx={unitPx}
              stroke={palette.stroke}
              labelHalo={labelHalo}
              labelFill={palette.stroke}
            />
          )}
        </svg>
        {dataTooltip && isInteractive && (
          <MapDataTooltipLayer ref={dataTipRef} getData={dataTooltip} />
        )}
        {popover && isInteractive && (
          <div
            className={`map-popover map-popover--${popover.kind} map-popover--${popover.placement}`}
            style={{ left: `${popover.x}px`, top: `${popover.y}px` }}
            role="dialog"
            aria-label={
              popover.kind === "confirm"
                ? `Confirm guess: ${popover.name}`
                : `${popover.name}: not part of this game`
            }
          >
            <span className="map-popover__name">{popover.name}</span>
            {popover.kind === "confirm" ? (
              <button
                type="button"
                className="map-popover__confirm"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            ) : (
              <span className="map-popover__hint">Not in this game</span>
            )}
            <button
              type="button"
              className="map-popover__close"
              onClick={() => setPopover(null)}
              aria-label="Dismiss"
            >
              <UiIcon name="close" />
            </button>
          </div>
        )}
      </div>
        <div className="world-map__zoom-controls">
          <button
            type="button"
            className="world-map__zoom-btn"
            onClick={zoom.zoomOut}
            disabled={!zoom.canZoomOut}
            aria-label="Zoom out"
            title="Zoom out"
          >
            <UiIcon name="minus" />
          </button>
          <button
            type="button"
            className="world-map__zoom-btn"
            onClick={zoom.zoomIn}
            disabled={!zoom.canZoomIn}
            aria-label="Zoom in"
            title="Zoom in"
          >
            <UiIcon name="plus" />
          </button>
          <button
            type="button"
            className="world-map__zoom-btn"
            onClick={zoom.reset}
            disabled={!zoom.isZoomed}
            aria-label="Reset zoom"
            title="Reset zoom"
          >
            <UiIcon name="expand" />
          </button>
          {extraControls}
        </div>
      </div>
      {belowMapNode && (
        <div className="world-map__below-node">{belowMapNode}</div>
      )}
    </section>
  );
}
