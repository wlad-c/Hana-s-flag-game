import { UiIcon } from "./UiIcon";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { geoEqualEarth, geoPath, geoCentroid } from "d3-geo";
import { useTheme } from "../context/ThemeContext";
import { useZoomPan } from "../hooks/useZoomPan";
import type {
  SubdivisionFeatureCollection,
  SubdivisionGeoFeature,
} from "../types/subdivision";
import { SUBDIVISION_META } from "../lib/subdivisionMeta";
import {
  DISPUTED_TERRITORY_HIERARCHY,
  DISPUTED_HIERARCHY_CHILDREN_OF,
} from "../lib/disputedSubdivisions";
import { flagOverlayAspectRatio } from "../lib/flagOverlayAspectRatio";
import { CityMarkers, type ScreenCity } from "./CityMarkers";
import type { PlacedCity } from "../lib/cityRoles";
import { useUnitPx } from "../hooks/useUnitPx";

const WIDTH = 960;
const HEIGHT = 500;
const PADDING = 40;

type MapPalette = {
  ocean: string;
  land: string;
  correct: string;
  wrong: string;
  stroke: string;
  selectedStroke: string;
  selectedFill: string;
};

const LIGHT_PALETTE: MapPalette = {
  ocean: "#b8d4e4",
  land: "#e8ddc4",
  correct: "#3fae5a",
  wrong: "#ff6b6b",
  stroke: "#1a2238",
  selectedStroke: "#1a2238",
  selectedFill: "#4ecdc4",
};

const DARK_PALETTE: MapPalette = {
  ocean: "#1a2d4a",
  land: "#3a4470",
  correct: "#5dd97a",
  wrong: "#ff8a8a",
  stroke: "#f4ecd8",
  selectedStroke: "#f4ecd8",
  selectedFill: "#74e4dc",
};



function getSubdivCode(feature: SubdivisionGeoFeature): string {
  return (
    feature.properties.iso_3166_2?.trim().toUpperCase() ||
    feature.properties.name ||
    ""
  );
}

// Hierarchy rule: a disputed-territory hierarchy child (e.g. AR-ML~) is
// administratively part of its parent subdivision (AR-V) — never its own
// standalone entity. The flag overlay must mirror this exactly like
// getFill()/handlePathClick() already do for selection highlighting and
// click redirection: the child's OWN landmass is tiled with its PARENT's
// flag, not left blank and not given a flag of its own. This is generic —
// it applies to every entry in DISPUTED_TERRITORY_HIERARCHY, not just
// Argentina/Malvinas.
function resolveFlagCode(code: string): string {
  return DISPUTED_TERRITORY_HIERARCHY[code] ?? code;
}

// `h` is the pattern tile height (the ring's bbox height, floored at 20px). The
// tile WIDTH is derived per-flag at render time from the flag's true aspect
// ratio (flagOverlayAspectRatio) so the tile matches the flag's proportions and
// `preserveAspectRatio="…meet"` fills it with no letterbox gap.
type FlagPoly = { path: string; x: number; y: number; h: number };

// Pattern-tile approach (matches WorldProgressMap's FlagDefs/FlagImages) —
// the flag image is tiled into a pattern sized to each polygon ring's own
// bbox and the ring's path is filled with that pattern. preserveAspectRatio
// "xMidYMid meet" means each tile shows the flag's full, undistorted
// proportions (never cropped) — important given how carefully this project
// sources/verifies real-world flag aspect ratios. A tall/irregular division
// shape just repeats the flag tile rather than stretching or cropping it.
const FlagDefsSubdiv = memo(function FlagDefsSubdiv({
  flagOverlay,
  flagPolygonsById,
  features,
}: {
  flagOverlay: ReadonlyMap<string, string>;
  flagPolygonsById: Map<string, FlagPoly[]>;
  features: SubdivisionGeoFeature[];
}) {
  return (
    <defs>
      {features.map((feat, idx) => {
        const code = getSubdivCode(feat);
        if (!code) return null;
        const flagCode = resolveFlagCode(code);
        if (!flagOverlay.has(flagCode)) return null;
        const polys = flagPolygonsById.get(code);
        if (!polys) return null;
        const flagUrl = flagOverlay.get(flagCode)!;
        const safeId = code.replace(/[^a-zA-Z0-9_-]/g, "_");
        // Size the tile to the flag's TRUE aspect ratio so it fills exactly
        // (no letterbox) and the tiling covers the entire division landmass.
        const tileW = (h: number) => h * flagOverlayAspectRatio(flagUrl);
        return polys.map((poly, i) => (
          <pattern
            key={`sdfp-${idx}-${i}`}
            id={`sdm-fp-${safeId}-${i}`}
            x={poly.x}
            y={poly.y}
            width={tileW(poly.h)}
            height={poly.h}
            patternUnits="userSpaceOnUse"
          >
            <image
              href={flagUrl}
              x={0}
              y={0}
              width={tileW(poly.h)}
              height={poly.h}
              preserveAspectRatio="xMidYMid meet"
            />
          </pattern>
        ));
      })}
    </defs>
  );
});

const FlagImagesSubdiv = memo(function FlagImagesSubdiv({
  flagOverlay,
  flagPolygonsById,
  features,
  selectedCode,
}: {
  flagOverlay: ReadonlyMap<string, string>;
  flagPolygonsById: Map<string, FlagPoly[]>;
  features: SubdivisionGeoFeature[];
  selectedCode: string | null;
}) {
  return (
    <>
      {features.map((feat, idx) => {
        const code = getSubdivCode(feat);
        if (!code) return null;
        const flagCode = resolveFlagCode(code);
        if (!flagOverlay.has(flagCode)) return null;
        const polys = flagPolygonsById.get(code);
        if (!polys) return null;
        const isSelected = code === selectedCode;
        const safeId = code.replace(/[^a-zA-Z0-9_-]/g, "_");
        return polys.map((poly, i) => (
          <path
            key={`sdimg-${idx}-${i}`}
            d={poly.path}
            fill={`url(#sdm-fp-${safeId}-${i})`}
            opacity={isSelected ? 0.35 : 1}
            style={{ pointerEvents: "none" }}
          />
        ));
      })}
    </>
  );
});

type Popover = {
  code: string;
  name: string;
  x: number;
  y: number;
  placement: "above" | "below";
};

type Props = {
  geoData: SubdivisionFeatureCollection | null;
  loading?: boolean;
  flagOverlay?: ReadonlyMap<string, string> | null;
  /** City markers: national capital(s)/largest + each subdivision's capital/largest. */
  cityOverlay?: PlacedCity[] | null;
  /** Name of the EXACT capital currently selected (via the city-flags grid, the
   *  hierarchy chart, or a subdivision pick) — highlights that one marker with a
   *  ring so it's identifiable among other already-labelled capitals (see
   *  CLAUDE.md "City overlay" rule: selecting a capital must show it on the map). */
  activeCityName?: string | null;
  selectedCode?: string | null;
  onSelect?: (code: string) => void;
  onConfirm?: () => void;
  onHover?: (code: string | null) => void;
  /** Optional override for the name shown in the tap-to-confirm popover —
   *  e.g. the game's capital-city questions show the division's CAPITAL name
   *  ("Johor Bahru") instead of the division's own name. Return null to keep
   *  the default name. */
  displayNameForCode?: (code: string) => string | null;
  disabled?: boolean;
  countryResults?: Record<string, "correct" | "wrong">;
  countryCode?: string;
  /** Optional extra controls rendered after the +/-/⟲ zoom buttons (e.g. the
   *  flag-overlay toggle in Learn mode). Matches WorldProgressMap's prop. */
  extraControls?: React.ReactNode;
};

export function SubdivisionMap({
  geoData,
  loading = false,
  flagOverlay = null,
  cityOverlay = null,
  activeCityName = null,
  selectedCode = null,
  onSelect,
  onConfirm,
  onHover,
  displayNameForCode,
  disabled = false,
  extraControls,
  countryResults = {},
  countryCode,
}: Props) {
  const { theme } = useTheme();
  const palette = theme === "dark" ? DARK_PALETTE : LIGHT_PALETTE;
  const [popover, setPopover] = useState<Popover | null>(null);
  // Locally-tracked hovered subdivision, used to reveal that subdivision's
  // capital label in the (non-interactive) city overlay.
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const zoom = useZoomPan(WIDTH, HEIGHT);
  // Screen px per user unit — keeps the revealed capital label a constant size.
  const [unitPx, measureFrame] = useUnitPx(WIDTH);
  const setFrame = useCallback(
    (el: HTMLDivElement | null) => {
      frameRef.current = el;
      measureFrame(el);
    },
    [measureFrame],
  );

  const isInteractive = !!onSelect && !disabled;

  // Hide popover when disabled
  useEffect(() => {
    if (disabled) setPopover(null);
  }, [disabled]);

  // Hide popover when selectedCode changes to a different location or is cleared
  useEffect(() => {
    setPopover(prev => (prev && prev.code !== selectedCode) ? null : prev);
  }, [selectedCode]);

  // Reset zoom whenever the country dataset changes.
  useEffect(() => {
    zoom.reset();
  // zoom.reset is stable; geoData changes only on country switch
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geoData]);

  // Compute projection + paths fitted to the feature collection.
  //
  // HARD RULE — fit the projection to ALL features (see CLAUDE.md
  // "Subdivision map default view"). Every subdivision a country has — including
  // its distant overseas departments and territories — MUST be inside the viewport
  // when the user first lands on the page. The user only sees specific parts by
  // choosing to zoom/pan. This is why we fit to `geoData.features` (every feature),
  // NOT to a "main-country-only" subset.
  //
  // This rule has been reverted before (commit 65337d9 excluded `_isTerritory`
  // features from fitExtent, which made France's overseas departments — French
  // Guiana, Guadeloupe, Martinique, Réunion, Mayotte — invisible on landing,
  // showing only metropolitan France). DO NOT re-introduce a `_isTerritory`
  // filter here. Features too small to see at the fitted scale are still made
  // discoverable via the constant-size dot indicators (smallSubdivCodes) below.
  const { pathByIdx, flagPolygonsById, centroidByCode, smallSubdivCodes, tinySubdivCodes, cityBase } = useMemo(() => {
    const empty = {
      pathByIdx: new Map<number, string>(),
      flagPolygonsById: new Map<string, FlagPoly[]>(),
      centroidByCode: new Map<string, [number, number]>(),
      smallSubdivCodes: new Set<string>(),
      tinySubdivCodes: new Set<string>(),
      cityBase: [] as { city: PlacedCity; bx: number; by: number }[],
    };
    if (!geoData || geoData.features.length === 0) return empty;

    // Fit to EVERY feature so all subdivisions (including distant overseas
    // departments/territories) are visible on landing. See the HARD RULE comment
    // above and CLAUDE.md "Subdivision map default view". Do NOT filter out
    // `_isTerritory` features here — that hides France's overseas departments.
    const fitFeatures = geoData.features;

    const projection = geoEqualEarth().fitExtent(
      [
        [PADDING, PADDING],
        [WIDTH - PADDING, HEIGHT - PADDING],
      ],
      { type: "FeatureCollection", features: fitFeatures } as never,
    );
    const mapPath = geoPath(projection);

    // Paths for each feature
    const pathByIdx = new Map<number, string>();
    for (let i = 0; i < geoData.features.length; i++) {
      const p = mapPath(geoData.features[i] as never);
      if (p) pathByIdx.set(i, p);
    }

    // Centroids and small-feature detection
    // A feature gets a location dot only when d3 produced NO renderable path
    // (i.e. the polygon is genuinely invisible at any scale). Features that DO
    // have a renderable path — even a tiny one — are represented by that path;
    // overlaying a dot on top deforms the territory outline and causes the
    // stippling effect seen on mainland France when the projection is fitted to
    // all of France's worldwide territories at once.
    const centroidByCode = new Map<string, [number, number]>();
    const smallSubdivCodes = new Set<string>();
    // Subdivisions that DO produce a renderable path, but are a distant
    // appended territory that's still hard to spot at the default
    // fit-all-features zoom (French Polynesia, New Caledonia, Saint Helena,
    // South Georgia, France's five overseas departments, Hong Kong, Macau, …).
    // `_isTerritory` is set by fetchMergedSubdivisionGeo (src/api/subdivisions.ts)
    // on exactly these features — every one merged in from
    // TERRITORY_GEO_FOR_PARENT, plus France's hardcoded overseas five — so
    // it's a direct, reliable signal with no threshold to tune.
    //
    // A per-feature pixel-area/bbox threshold was tried and rejected: fitting
    // a country's far-flung territories into one viewBox compresses the WHOLE
    // projection, so ordinary same-country subdivisions (e.g. France's other
    // 95 departments) end up just as small in absolute or bbox terms as the
    // actual outlier — French Polynesia's islands (~2.9px²) measured SMALLER
    // than the median French department (~5.1px²) despite comparable real
    // land area, and a small-bbox check flagged ordinary departments (Ain)
    // exactly as it flagged the territories. `_isTerritory` sidesteps that
    // entirely: it's set at merge time from a country-relative judgement
    // (this feature came from a DIFFERENT territory's geo file), not from
    // any on-screen measurement.
    //
    // This gets the pulsing ring on selection (parity with the world map's
    // small-nation pulse) but never a permanent dot — a dot on top of an
    // already-rendered shape is what causes the stippling effect documented
    // above for smallSubdivCodes.
    const tinySubdivCodes = new Set<string>();
    for (let i = 0; i < geoData.features.length; i++) {
      const feat = geoData.features[i];
      const code = getSubdivCode(feat);
      if (!code) continue;
      const geoC = geoCentroid(feat as never);
      const svgC = projection(geoC);
      if (svgC && isFinite(svgC[0]) && isFinite(svgC[1])) {
        centroidByCode.set(code, [svgC[0], svgC[1]]);
      }
      if (!pathByIdx.has(i)) {
        // Feature produced no renderable path — show a dot so it is locatable.
        smallSubdivCodes.add(code);
      } else if (feat.properties._isTerritory) {
        tinySubdivCodes.add(code);
      }
    }

    // Flag polygon data for clip-path overlay
    const flagPolygonsById = new Map<string, FlagPoly[]>();
    if (flagOverlay) {
      for (const feat of geoData.features) {
        const code = getSubdivCode(feat);
        if (!code || !flagOverlay.has(resolveFlagCode(code))) continue;
        const geom = feat.geometry as {
          type: string;
          coordinates: unknown;
        } | null;
        if (!geom) continue;
        const rings: unknown[] =
          geom.type === "Polygon"
            ? [geom.coordinates]
            : geom.type === "MultiPolygon"
              ? (geom.coordinates as unknown[])
              : [];
        const polys: FlagPoly[] = [];
        for (const coords of rings) {
          const pf = {
            type: "Feature",
            properties: {},
            geometry: { type: "Polygon", coordinates: coords },
          };
          const pd = mapPath(pf as never);
          if (!pd) continue;
          const b = mapPath.bounds(pf as never);
          if (!b || !isFinite(b[0][0]) || !isFinite(b[1][0])) continue;
          const bw = b[1][0] - b[0][0];
          const bh = b[1][1] - b[0][1];
          if (bw <= 0 || bh <= 0) continue;
          if (bw / bh > 8 && bh < 20) continue;
          const imgH = Math.max(bh, 20);
          // Anchor at bbox top-left, like WorldProgressMap, so the pattern
          // tile aligns with the division's top/bottom edges — tall/odd
          // shapes tile the flag rather than stretching or cropping it. The
          // tile width is derived from the flag's true ratio in FlagDefsSubdiv.
          polys.push({
            path: pd,
            x: b[0][0],
            y: b[0][1],
            h: imgH,
          });
        }
        if (polys.length > 0) {
          const existing = flagPolygonsById.get(code);
          flagPolygonsById.set(code, existing ? [...existing, ...polys] : polys);
        }
      }
    }

    // Project city markers with the SAME fitted projection so they land on the
    // correct subdivisions. Rotation isn't used here; zoom is applied per-frame
    // in the render so markers stay a constant pixel size.
    const cityBase: { city: PlacedCity; bx: number; by: number }[] = [];
    if (cityOverlay) {
      for (const city of cityOverlay) {
        const p = projection([city.lon, city.lat]);
        if (p && isFinite(p[0]) && isFinite(p[1])) cityBase.push({ city, bx: p[0], by: p[1] });
      }
    }

    return { pathByIdx, flagPolygonsById, centroidByCode, smallSubdivCodes, tinySubdivCodes, cityBase };
  // paths and projection bounds only change if the country dataset, flag list, or cities change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geoData, flagOverlay, cityOverlay]);



  function getFill(code: string): string {
    if (code === selectedCode) return palette.selectedFill;
    // Hierarchy children (e.g. AR-ML~ when AR-V is selected) are shown highlighted
    // together with their parent — they are administratively part of the same division.
    if (selectedCode && DISPUTED_HIERARCHY_CHILDREN_OF[selectedCode]?.has(code)) {
      return palette.selectedFill;
    }
    const result = countryResults[code];
    if (result === "correct") return palette.correct;
    if (result === "wrong") return palette.wrong;
    return palette.land;
  }

  function handlePathClick(
    e: React.MouseEvent,
    code: string,
    name: string,
  ) {
    if (!isInteractive) return;
    const frameRect = frameRef.current?.getBoundingClientRect();
    if (!frameRect) return;

    // Hierarchy rule: disputed territories that belong inside a parent subdivision
    // must redirect to that parent — clicking Malvinas selects Tierra del Fuego, etc.
    const resolvedCode = DISPUTED_TERRITORY_HIERARCHY[code] ?? code;
    let resolvedName = name;
    if (resolvedCode !== code && countryCode) {
      const parentDiv = SUBDIVISION_META[countryCode.toUpperCase()]?.divisions.find(
        (d) => d.code === resolvedCode,
      );
      if (parentDiv) resolvedName = parentDiv.name;
    }
    // Caller-supplied display name (e.g. the capital's name during a
    // capital-flag question) wins over the division's own name.
    const mappedName = displayNameForCode?.(resolvedCode);
    if (mappedName) resolvedName = mappedName;

    const clickX = e.clientX - frameRect.left;
    const clickY = e.clientY - frameRect.top;

    const HALF_W = 130;
    const POP_H = 64;
    const MARGIN = 8;

    // The subdivision-name confirm popover must never render on top of this
    // subdivision's own capital-city name (CLAUDE.md: a subnational name must
    // never sit on top of the capital city name). Selecting a subdivision
    // reveals its capital marker's label ABOVE the marker (see CityMarkers'
    // `activeCode` matching), and the popover previously anchored to the raw
    // click point — which usually sits right where the marker (and therefore
    // its label) is, since users tap near a subdivision's visual center. Find
    // that marker's on-screen position and anchor the popover clear of both
    // the marker glyph and the space its label occupies above it.
    let markerScreenX: number | null = null;
    let markerScreenY: number | null = null;
    if (unitPx > 0) {
      const { k: zk, tx: ztx, ty: zty } = zoom.view;
      for (const { city, bx, by } of cityBase) {
        if (city.ownerCode !== resolvedCode && !city.ownerCodes?.includes(resolvedCode)) continue;
        const sy = (by * zk + zty) * unitPx;
        if (markerScreenY === null || sy < markerScreenY) {
          markerScreenY = sy;
          markerScreenX = (bx * zk + ztx) * unitPx;
        }
      }
    }

    let x: number;
    let y: number;
    let placement: "above" | "below";

    if (markerScreenX !== null && markerScreenY !== null) {
      const MARKER_LABEL_CLEARANCE = 50; // space reserved above the marker for its revealed name
      const MARKER_GLYPH_CLEARANCE = 24; // space reserved below the marker for its glyph/ring
      x = Math.max(
        HALF_W + MARGIN,
        Math.min(frameRect.width - HALF_W - MARGIN, markerScreenX),
      );
      const markerBottom = markerScreenY + MARKER_GLYPH_CLEARANCE;
      if (frameRect.height - markerBottom >= POP_H + MARGIN) {
        // Room below the marker+ring — place the popover there, well clear
        // of the label that renders above the marker.
        y = markerBottom;
        placement = "below";
      } else {
        // Not enough room below (marker near the bottom of the frame) —
        // place above, but clear of the label zone, not just the marker.
        y = markerScreenY - MARKER_LABEL_CLEARANCE - MARGIN;
        placement = "above";
      }
    } else {
      // No capital marker for this subdivision — nothing to avoid overlapping,
      // fall back to the original click-anchored placement.
      x = Math.max(
        HALF_W + MARGIN,
        Math.min(frameRect.width - HALF_W - MARGIN, clickX),
      );
      const placeAbove = clickY >= POP_H + MARGIN * 2;
      y = placeAbove ? clickY - MARGIN : clickY + MARGIN;
      placement = placeAbove ? "above" : "below";
    }

    onSelect?.(resolvedCode);
    setPopover({ code: resolvedCode, name: resolvedName, x, y, placement });
  }

  function handleConfirm() {
    if (!onConfirm) return;
    onConfirm();
    setPopover(null);
  }

  // Pulsing ring indicator — shown for subdivisions that are too small to
  // spot at the default zoom level (parity with the world map's small-nation
  // pulse). Covers both features with NO renderable path at all
  // (smallSubdivCodes) and features that DO render but whose on-screen
  // footprint is tiny (tinySubdivCodes, e.g. a city-province dwarfed by its
  // own country's mainland). Rendered outside the zoom <g> so the ring's
  // visual size stays constant regardless of zoom level, but positioned via
  // the live zoom transform so it tracks the territory.
  const selCentroid = selectedCode ? centroidByCode.get(selectedCode) : null;
  const showPulse = !!(
    selCentroid &&
    selectedCode &&
    (smallSubdivCodes.has(selectedCode) || tinySubdivCodes.has(selectedCode))
  );
  const { k: zk, tx: ztx, ty: zty } = zoom.view;
  const pulseX = selCentroid ? selCentroid[0] * zk + ztx : 0;
  const pulseY = selCentroid ? selCentroid[1] * zk + zty : 0;
  const PULSE_MARGIN = 30;
  const pulseVisible =
    showPulse &&
    pulseX > -PULSE_MARGIN && pulseX < WIDTH  + PULSE_MARGIN &&
    pulseY > -PULSE_MARGIN && pulseY < HEIGHT + PULSE_MARGIN;

  // City markers: apply zoom (constant pixel size). Names stay hidden by default
  // so a dense country (many subdivision capitals) isn't a wall of text; a
  // capital's name is revealed when the user hovers or taps its marker (handled
  // inside CityMarkers).
  const CITY_MARGIN = 40;
  const cityScreen: ScreenCity[] = cityBase
    .map(({ city, bx, by }) => ({ city, x: bx * zk + ztx, y: by * zk + zty }))
    .filter(
      (m) =>
        m.x > -CITY_MARGIN && m.x < WIDTH + CITY_MARGIN &&
        m.y > -CITY_MARGIN && m.y < HEIGHT + CITY_MARGIN,
    );
  const cityLabelHalo = theme === "dark" ? palette.ocean : "#ffffff";

  if (loading) {
    return (
      <section className="map-section subdiv-map-section" aria-label="Subdivision map">
        <div className="map-frame" style={{ minHeight: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ color: "var(--ink-soft)", fontStyle: "italic" }}>Loading subdivisions…</p>
        </div>
      </section>
    );
  }

  if (!geoData || geoData.features.length === 0) {
    return (
      <section className="map-section subdiv-map-section" aria-label="Subdivision map">
        <div className="map-frame" style={{ minHeight: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ color: "var(--ink-soft)", fontStyle: "italic" }}>No sub-national data available for this country.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="map-section subdiv-map-section" aria-label="Subdivision map">
      <div className="map-with-zoom">
        <div className="map-frame" ref={setFrame}>
          <svg
            className="world-map"
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            role="img"
            aria-label="Subdivision map"
            onPointerDown={zoom.svgHandlers.onPointerDown}
            onPointerMove={zoom.svgHandlers.onPointerMove}
            onPointerUp={zoom.svgHandlers.onPointerUp}
            onPointerCancel={zoom.svgHandlers.onPointerCancel}
            style={{
              cursor: zoom.isZoomed ? "grab" : "default",
              touchAction: zoom.isZoomed ? "none" : "auto",
            }}
          >
            {/* Flag clip paths must be at SVG root — outside transforms */}
            {flagOverlay && geoData && (
              <FlagDefsSubdiv
                flagOverlay={flagOverlay}
                flagPolygonsById={flagPolygonsById}
                features={geoData.features}
              />
            )}

            {/* Static ocean background — using a rect instead of the projected
                sphere path avoids the "globe arc cut off" artifact that appears
                when the projection is scaled to fit a single country. */}
            <rect x={0} y={0} width={WIDTH} height={HEIGHT} fill={palette.ocean} />

            <g transform={zoom.transform}>

              {/* Subdivision feature paths */}
              {geoData.features.map((feat, idx) => {
                const path = pathByIdx.get(idx);
                if (!path) return null;
                const code = getSubdivCode(feat);
                let name =
                  feat.properties.name_en || feat.properties.name || code;
                if (countryCode) {
                  const countryMeta = SUBDIVISION_META[countryCode.toUpperCase()];
                  const meta = countryMeta?.divisions.find((d) => d.code === code);
                  if (meta) {
                    name = meta.name;
                  }
                }
                const isSelected = code === selectedCode;
                const fill = getFill(code);
                return (
                  <path
                    key={`sd-${idx}`}
                    d={path}
                    fill={fill}
                    stroke={isSelected ? palette.selectedStroke : palette.stroke}
                    strokeWidth={isSelected ? 1.4 : 0.6}
                    strokeOpacity={isSelected ? 1 : 0.7}
                    strokeDasharray={isSelected ? undefined : "4 3"}
                    vectorEffect="non-scaling-stroke"
                    className={
                      isInteractive && code
                        ? "world-map__country world-map__country--selectable"
                        : "world-map__country"
                    }
                    onClick={
                      isInteractive && code
                        ? (e) => handlePathClick(e, code, name)
                        : undefined
                    }
                    onPointerEnter={
                      isInteractive && code
                        ? (e) => { if (e.pointerType !== "mouse") return; setHoveredCode(code); onHover?.(code); }
                        : undefined
                    }
                    onPointerLeave={
                      isInteractive
                        ? (e) => { if (e.pointerType !== "mouse") return; setHoveredCode(null); onHover?.(null); }
                        : undefined
                    }
                  >
                    {name ? (
                      <title>{name}</title>
                    ) : null}
                  </path>
                );
              })}

              {/* Flag overlay images */}
              {flagOverlay && geoData && (
                <FlagImagesSubdiv
                  flagOverlay={flagOverlay}
                  flagPolygonsById={flagPolygonsById}
                  features={geoData.features}
                  selectedCode={selectedCode}
                />
              )}
            </g>

            {/* Static location dots for features too small to render a visible
                path (e.g. tiny island territories when the projection is fitted
                to a country whose subdivisions span multiple continents).
                Rendered outside the zoom group so the dot size stays constant;
                positioned via zoom-transformed centroid so they pan/zoom
                correctly. The selected small feature uses the pulsing ring
                below instead. */}
            {geoData && [...smallSubdivCodes].map((code) => {
              if (code === selectedCode) return null;
              const centroid = centroidByCode.get(code);
              if (!centroid) return null;
              const cx = centroid[0] * zk + ztx;
              const cy = centroid[1] * zk + zty;
              if (cx < -PULSE_MARGIN || cx > WIDTH + PULSE_MARGIN ||
                  cy < -PULSE_MARGIN || cy > HEIGHT + PULSE_MARGIN) return null;
              const feat = geoData.features.find((f) => getSubdivCode(f) === code);
              const name = feat
                ? feat.properties.name_en || feat.properties.name || code
                : code;
              const fill = getFill(code);
              return (
                <g
                  key={`dot-${code}`}
                  transform={`translate(${cx.toFixed(1)} ${cy.toFixed(1)})`}
                  onClick={isInteractive ? (e) => handlePathClick(e, code, name) : undefined}
                  onPointerEnter={isInteractive ? (e) => { if (e.pointerType !== "mouse") return; setHoveredCode(code); onHover?.(code); } : undefined}
                  onPointerLeave={isInteractive ? (e) => { if (e.pointerType !== "mouse") return; setHoveredCode(null); onHover?.(null); } : undefined}
                  style={{ cursor: isInteractive ? "pointer" : "default" }}
                  aria-hidden="true"
                >
                  <circle r={6} fill="transparent" />
                  <circle r={3} fill={fill} stroke={palette.stroke} strokeWidth={0.5} vectorEffect="non-scaling-stroke" />
                </g>
              );
            })}

            {/* Pulsing ring — outside the zoom group so its pixel size is
                constant; positioned via zoom-transformed centroid coords. */}
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
            {/* City markers — constant pixel size, outside the zoom group. */}
            {cityScreen.length > 0 && (
              <CityMarkers
                markers={cityScreen}
                activeCode={hoveredCode ?? selectedCode}
                activeCityName={activeCityName}
                // Always label the national capital on a country's own subdivision
                // view (subdivision capitals still reveal only on hover/select) so a
                // city-state with nothing to hover (Monaco, Vatican City) still shows
                // its capital's name, and larger countries always name their capital.
                alwaysLabelNational
                unitPx={unitPx}
                stroke={palette.stroke}
                labelHalo={cityLabelHalo}
                labelFill={palette.stroke}
              />
            )}
          </svg>

          {popover && isInteractive && (
            <div
              className={`map-popover map-popover--confirm map-popover--${popover.placement}`}
              style={{ left: `${popover.x}px`, top: `${popover.y}px` }}
              role="dialog"
              aria-label={`Confirm: ${popover.name}`}
            >
              <span className="map-popover__name">
                {popover.name}
              </span>
              {onConfirm ? (
                <button
                  type="button"
                  className="map-popover__confirm"
                  onClick={handleConfirm}
                >
                  Confirm
                </button>
              ) : null}
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
    </section>
  );
}
