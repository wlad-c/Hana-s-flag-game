import { UiIcon } from "./UiIcon";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { geoGraticule10, geoPath } from "d3-geo";
import { capMayBeVisible, sphericalCap, worldProjection } from "../lib/mapProjection";
import { useGlobeDrag } from "../hooks/useGlobeDrag";
import { merge as topoMerge } from "topojson-client";
import { useTheme } from "../context/ThemeContext";
import { useZoomPan, type ZoomPanState } from "../hooks/useZoomPan";
import { flagOverlayAspectRatio } from "../lib/flagOverlayAspectRatio";
import { polityDisplayName } from "../lib/historicalEras";

/**
 * Renders an era-specific historical world map.
 *
 * Unlike WorldProgressMap (which always uses the modern world-atlas
 * TopoJSON), this component loads a GeoJSON FeatureCollection from the
 * hand-curated aourednik/historical-basemaps dataset. Each feature is an
 * actual historical polity with its borders as they were at the chosen
 * date — Roman Empire including Roman Britain, Mongol Empire as one
 * contiguous shape, etc.
 *
 * Selection is keyed by the feature's `NAME` property (not ISO codes).
 * Hovering a polity reports its name; clicking it selects it. Multiple
 * polygons that share a NAME (e.g., an empire with detached territories)
 * all highlight together when any one is selected.
 *
 * Performance note: the historical GeoJSON files are large (1–14 MB).
 * Path computation is expensive, so this component is memoised and its
 * centerLongitude prop intentionally excludes the rotation animation
 * offset — only the user's chosen base meridian is used. That keeps path
 * recomputation to a minimum (only on data load or explicit preset change)
 * while the modern globe spins freely next to it.
 */

type HistoricalFeature = {
  type: "Feature";
  properties: {
    NAME?: string | null;
    ABBREVN?: string | null;
    SUBJECTO?: string | null;
    PARTOF?: string | null;
    BORDERPRECISION?: number | null;
    /** 1 when this feature's internal boundary was DERIVED by intersecting the
     *  upstream lumped polygon with modern admin-1 lines (see
     *  scripts/tag-derived-boundaries.mjs) rather than sourced for the period. */
    DERIVED?: number | null;
    /** 1 when this polygon was adopted VERBATIM from the authoritative upstream release
     *  to attribute land our import leaves unclaimed (see scripts/build-era-gap-fill.mjs
     *  and scripts/data/era-gap-fill.json). These paint UNDERNEATH the era's own
     *  polities, so a broad adoption can never cover a finer one we already name. */
    GAPFILL?: number | null;
  };
  geometry: unknown;
};

type FeatureCollection = {
  type: "FeatureCollection";
  features: HistoricalFeature[];
};

export type HistoricalMapProps = {
  /** URL of the era's GeoJSON file (relative to BASE_URL). */
  geoJsonUrl: string;
  /**
   * The polity the map highlights — and the ONLY highlight input this component
   * takes. The parent must pass exactly what its detail panel is showing, so the
   * map and the panel can never name two different polities (see the hard rule
   * "the map's highlight and the panel must always be the same entity").
   *
   * There is deliberately no `hoveredName` prop: it used to exist and took
   * PRECEDENCE over the selection (`hoveredName ?? selectedName`), while the
   * panel resolved the opposite way (`selected ?? hovered`). Hovering one polity
   * while another was selected therefore painted the map teal on the hovered one
   * while the panel and the flag grid described the selected one — and on touch,
   * where `mouseleave` never fires, that mismatch stuck on screen (reported
   * 2026-08 with the Philippines highlighted under an "Annam" panel). Hover
   * feedback is the CSS brightness on `.world-map__country--selectable:hover`,
   * exactly as on the modern WorldProgressMap.
   */
  selectedName: string | null;
  /** Click handler — fires with the polity's NAME (or null if unnamed). */
  onSelect?: (name: string | null) => void;
  /** Hover handler — fires with name on enter, null on leave. */
  onHover?: (name: string | null) => void;
  /** Optional externally-managed zoom state. When provided, lets the
   *  parent persist zoom across era switches (the parent owns the hook).
   *  When omitted, the component manages its own zoom state. */
  zoom?: ZoomPanState;
  /** Fires once after the era's GeoJSON has loaded, with the set of feature NAMEs
   *  the file contains and a NAME → SUBJECTO map of ruling powers (only where the
   *  two differ). The names let the parent decide whether a currently-selected
   *  entity still exists in this era; the rulers drive the panel's "Ruled by" row
   *  and let a colony inherit its ruler's period-correct flag. */
  onDataLoaded?: (
    names: ReadonlySet<string>,
    rulers: ReadonlyMap<string, string>,
    derived: ReadonlySet<string>,
  ) => void;
  /** User-chosen central meridian (longitude). 0 = Atlantic / Greenwich
   *  default; 180 = Pacific; -95 = Americas; etc.
   *  NOTE: this should be the BASE meridian only (not including any
   *  rotation animation offset) so that path recomputation stays cheap. */
  centerLongitude?: number;
  /** When true, the rendered map is flipped vertically — south at the top. */
  southUp?: boolean;
  /** When true, render an orthographic globe the user can drag to spin. */
  globe?: boolean;
  /** Optional extra controls to render below the +/-/⟲ zoom buttons,
   *  e.g. the MapViewControl picker. */
  extraControls?: React.ReactNode;
  /**
   * When provided, each polity whose name is a key in this map will have
   * its flag image (the map value — an absolute URL) rendered filling its
   * territory. Polities absent from the map are shown without a flag overlay.
   */
  flagOverlay?: ReadonlyMap<string, string> | null;
  /**
   * Maps a polity's raw dataset NAME to the key it should be GROUPED and highlighted by.
   * Two features that return the same key are one polity for selection purposes and
   * highlight together — which is how a personal union spanning several polygons (1600's
   * Iberian Union over Spain and Portugal) lights up its whole territory without any
   * change to the geometry. Defaults to identity.
   */
  groupKeyOf?: (name: string) => string;
};

const WIDTH = 960;
const HEIGHT = 500;

/**
 * The coastline, drawn UNDER every era's polities.
 *
 * Borders between polities change between eras; a landmass's outline does not. The
 * era files only carry POLITIES, and large regions were genuinely unclaimed at many
 * dates — so without a base layer, land no polity covers is painted with nothing and
 * reads as open ocean. That shipped and was reported (2026-08): in 500 BC the Balkans
 * north of the Greek city-states carried no polity, so GREECE APPEARED TO BE AN
 * ISLAND. The same hole put the Indus basin, interior India, Chukotka and Novaya
 * Zemlya out to sea in other eras.
 *
 * Drawing the land from ONE basemap for ALL eras makes the invariant structural
 * rather than merely checked: the coastline is the same object every era renders on
 * top of, so it cannot vary by period however the era files change. This is the same
 * Natural Earth 50m topology WorldProgressMap draws, so the two maps can never
 * disagree about where the coast is.
 *
 * It is decorative and non-interactive — it must never intercept a click meant for a
 * polity above it (the same rule the city-marker overlay follows).
 */
const LAND_URL = `${import.meta.env.BASE_URL}countries-50m.json`;

/** The merged coastline: one MultiPolygon covering every landmass. */
type LandGeometry = { type: "MultiPolygon"; coordinates: number[][][][] };

/**
 * How far the era polygons and the basemap coastline may disagree before the
 * uncovered strip counts as genuinely unmapped land — in projected map units
 * (the map is 960 units wide for 360°, so 1 unit ≈ 0.4° ≈ 40 km at the equator).
 *
 * The two datasets draw the same coast at different resolutions: the era files
 * carry a polity's outline in tens of points where Natural Earth 50m uses
 * hundreds (1945's Philippines: 279 points against 1,238). Wherever the era
 * polygon cuts a corner, the coastline layer underneath shows through as a
 * hatched sliver — and because that hatch is the "no polity here" fill, a
 * polity ends up wearing a ragged shadow of unclaimed land along its own coast.
 * That shipped and was reported (2026-08) as "wrong, unselectable territories
 * that look like a shadow" on the 1945 Philippines. Measured across every era at
 * this projection's own scale, the land no feature covers is ~1.7% of all land
 * pixels and about 75% of it sits within ONE unit of a polity, 84% within two —
 * mismatch, not missing data — while the genuinely unmapped land (islands the era
 * file simply does not carry) sits far outside this tolerance: in 1945, ~170
 * pixels lie more than 8 units from anything, and those keep their hatch.
 *
 * So land within this radius of a polity is painted in that polity's colour
 * instead of hatched. The value is in USER space, not screen pixels, so the
 * reconciliation holds at every zoom level — the mismatch it hides is a fixed
 * distance on the ground, and a screen-space fix would unravel the moment the
 * user zoomed in (which is exactly how the bug was reported).
 *
 * This is a RENDERING reconciliation and touches no data: the band is clipped to
 * the basemap's own land, so it can never paint sea, and no era coordinate moves.
 */
const COASTLINE_MATCH_TOLERANCE = 1.5;

/**
 * Grows an already-PROJECTED d3-geo path outwards by `r` map units, by pushing
 * every vertex along the outward normal of its two adjacent edges. Winding does
 * the right thing on its own: an exterior ring grows, and a hole — wound the
 * other way — shrinks, which is what dilating a shape means.
 *
 * This runs once per era, on the projected path string, purely to draw the
 * coastline-reconciliation band. It is NOT a geometry edit: nothing it produces
 * is ever stored, hit-tested, exported, or drawn as a border — the era's own
 * polygons are still rendered, selected and measured from their untouched
 * coordinates, and the result here is clipped to the basemap's land.
 *
 * The two obvious alternatives were measured on the heaviest era (500 BC) and
 * both rejected, so don't reach for them again:
 *   - a fat `stroke` on the coverage path: 1.88 s of main-thread time over five
 *     zoom steps against 0.37 s without the band (5×);
 *   - nine offset copies stamped with `<use>`: 4.9 s to drag-pan a route that
 *     costs 0.67 s without the band (7×), `shape-rendering` made no difference.
 * Pre-offsetting once leaves a SINGLE ordinary fill per frame, which measured
 * free — filling this path costs the same as not filling it.
 *
 * d3-geo emits polygons as `M x,y L x,y … Z` and nothing else; if any other
 * command shows up the input is returned unchanged, so a future d3 that emits
 * curves degrades to "no band" rather than to a mangled shape.
 */
export function growProjectedPath(d: string, r: number): string {
  if (/[^MLZ\s\-.,0-9e]/i.test(d)) return d;
  // One feature's rings. The largest of them is its outline; whichever way that
  // one happens to be wound decides the sign for ALL of them, which is what makes
  // holes shrink while the outline grows — without assuming the source files
  // follow any particular winding convention.
  const rings: Array<Array<[number, number]>> = [];
  for (const sub of d.split("Z")) {
    if (!sub.trim()) continue;
    const pts: Array<[number, number]> = [];
    for (const m of sub.matchAll(/[ML]\s*(-?[\d.e+-]+),(-?[\d.e+-]+)/gi)) {
      pts.push([Number(m[1]), Number(m[2])]);
    }
    // d3 repeats the first point as the last one on a closed ring; drop it so the
    // wrap-around neighbour maths stays right.
    if (
      pts.length > 1 &&
      pts[0][0] === pts[pts.length - 1][0] &&
      pts[0][1] === pts[pts.length - 1][1]
    ) {
      pts.pop();
    }
    rings.push(pts);
  }
  const area = (pts: Array<[number, number]>) => {
    let a = 0;
    for (let i = 0, n = pts.length; i < n; i++) {
      const [x1, y1] = pts[i];
      const [x2, y2] = pts[(i + 1) % n];
      a += x1 * y2 - x2 * y1;
    }
    return a / 2;
  };
  let biggest = 0;
  for (const pts of rings) {
    if (pts.length >= 3) {
      const a = area(pts);
      if (Math.abs(a) > Math.abs(biggest)) biggest = a;
    }
  }
  if (biggest === 0) return d;
  // For a ring of positive signed area, (dy, -dx) points out of it; the sign here
  // carries that through to every ring of this feature.
  const sign = biggest > 0 ? r : -r;
  // Detail finer than half the tolerance cannot change what this band covers, so
  // it is dropped as the band is built — the band is a filler drawn UNDER the
  // polities and clipped to the coast, and on the densest era this keeps its path
  // (as complex as every polity combined) from doubling the cost of a pan. It
  // applies to this decorative layer alone: the polity paths that are drawn,
  // hit-tested and highlighted still come from the untouched projected geometry.
  const minStep = Math.abs(r) / 2;
  let out = "";
  for (const pts of rings) {
    const n = pts.length;
    if (n < 3) continue;
    let lastX = NaN;
    let lastY = NaN;
    let emitted = 0;
    for (let i = 0; i < n; i++) {
      const [px, py] = pts[(i - 1 + n) % n];
      const [x, y] = pts[i];
      const [nx, ny] = pts[(i + 1) % n];
      // Normals of the two adjacent edges, summed and normalised. Deliberately no
      // miter compensation: a sharp corner ends up a touch under-grown instead of
      // throwing out a long spike.
      let ax = y - py, ay = px - x;
      let bx = ny - y, by = x - nx;
      const al = Math.hypot(ax, ay) || 1;
      const bl = Math.hypot(bx, by) || 1;
      ax /= al; ay /= al; bx /= bl; by /= bl;
      let vx = ax + bx, vy = ay + by;
      const vl = Math.hypot(vx, vy);
      if (vl < 1e-9) { vx = ax; vy = ay; } else { vx /= vl; vy /= vl; }
      const gx = x + vx * sign;
      const gy = y + vy * sign;
      const isLast = i === n - 1;
      if (emitted > 0 && !isLast && Math.hypot(gx - lastX, gy - lastY) < minStep) continue;
      out += `${emitted === 0 ? "M" : "L"}${gx.toFixed(2)},${gy.toFixed(2)}`;
      lastX = gx;
      lastY = gy;
      emitted++;
    }
    out += "Z";
  }
  return out;
}

/**
 * Names that must never become a selectable polity even when a feature carries them.
 * "Antarctica" is excluded by the repo's Antarctic hard rule — the continent stays
 * visible as neutral unclaimed landmass and never becomes a territory in the data model.
 * "1" and "true" are upstream junk in the 100 AD file, which carries a feature with
 * `NAME: null, SUBJECTO: "1", PARTOF: "true"` — the PARTOF slipped past a guard that only
 * listed "1" and put a polity card literally named "true" in the flag grid.
 */
const NOT_A_POLITY = new Set(["Antarctica", "1", "true"]);

/**
 * The polity name for a feature.
 *
 * Some upstream features have a NAME of pure whitespace while carrying the real name in
 * their own ABBREVN / SUBJECTO / PARTOF — the 1815 Netherlands is `NAME: "       "` with
 * `ABBREVN: "Netherlands"` and `SUBJECTO: "United Kingdom of Netherlands"`. Read literally
 * that polity renders as anonymous "no data" hatch and cannot be selected, even though the
 * dataset knows perfectly well what it is. Falling back to the feature's OWN fields
 * recovers it without inventing anything.
 *
 * A feature with no name anywhere is the genuine unmapped-land blob and stays unnamed.
 */
function polityFeatureName(f: HistoricalFeature): string | null {
  const direct = (f.properties?.NAME ?? "").trim();
  // NOT_A_POLITY applies to the direct NAME too, not only to the fallback fields. The
  // 1945 and 1960 files carry a feature literally named "Antarctica", which sailed past a
  // fallback-only guard and put an "Antarctica" card in the flag grid — the continent
  // entering the territory data model, which the Antarctic hard rule forbids. Returning
  // null leaves it rendered as the unclaimed, neutral landmass it should be.
  if (direct) return NOT_A_POLITY.has(direct) ? null : direct;
  for (const alt of [f.properties?.SUBJECTO, f.properties?.PARTOF, f.properties?.ABBREVN]) {
    const v = (alt ?? "").trim();
    if (v && !NOT_A_POLITY.has(v)) return v;
  }
  return null;
}

type Palette = {
  ocean: string;
  land: string;
  selected: string;
  selectedStroke: string;
  stroke: string;
  unknown: string;
};

const LIGHT_PALETTE: Palette = {
  ocean: "#b8d4e4",
  land: "#ffd7a8",
  selected: "#4ecdc4",
  selectedStroke: "#1a2238",
  stroke: "#1a2238",
  unknown: "#e8ddc4",
};

const DARK_PALETTE: Palette = {
  ocean: "#1a2d4a",
  land: "#6b4f8c",
  selected: "#74e4dc",
  selectedStroke: "#f4ecd8",
  stroke: "#f4ecd8",
  unknown: "#3a4470",
};

export const HistoricalMap = memo(function HistoricalMap({
  geoJsonUrl,
  selectedName,
  onSelect,
  onHover,
  zoom: externalZoom,
  onDataLoaded,
  centerLongitude = 0,
  southUp = false,
  globe = false,
  extraControls,
  flagOverlay = null,
  groupKeyOf,
}: HistoricalMapProps) {
  const { theme } = useTheme();
  const palette = theme === "dark" ? DARK_PALETTE : LIGHT_PALETTE;
  const [data, setData] = useState<FeatureCollection | null>(null);
  // Every country merged into one land geometry — merging drops the modern internal
  // borders, which must never show through beneath a historical map.
  const [land, setLand] = useState<LandGeometry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  // Always run the local hook so we obey the rules-of-hooks. When the
  // parent provides a zoom state, that one wins and the local one is
  // unused — the parent typically does this so zoom can be shared with
  // a sibling map component and survive a swap between the two.
  const localZoom = useZoomPan(WIDTH, HEIGHT);
  const zoom = externalZoom ?? localZoom;
  const globeDrag = useGlobeDrag({
    width: WIDTH,
    height: HEIGHT,
    zoomK: zoom.view.k,
    southUp,
    resetKey: `${globe}|${centerLongitude}`,
  });
  const liveLon = globe ? centerLongitude + globeDrag.lon : centerLongitude;
  const liveLat = globe ? globeDrag.lat : 0;
  const globeMoving = globe && globeDrag.dragging;
  // The full per-era projection (flag tiles, coastline band, paint order) is
  // rebuilt only once the globe settles; while dragging, just the outlines move.
  const settledViewRef = useRef({ lon: liveLon, lat: liveLat });
  if (!globeMoving) settledViewRef.current = { lon: liveLon, lat: liveLat };
  const settledLon = settledViewRef.current.lon;
  const settledLat = settledViewRef.current.lat;

  // Load the coastline once. It is era-independent by definition, so it is fetched
  // outside the era effect and never refetched when the era changes. A failure here
  // is not fatal: the era's polities still render, exactly as before this layer.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(LAND_URL);
        if (!res.ok) throw new Error(`Failed to load ${LAND_URL}`);
        const topo = await res.json();
        const merged = topoMerge(topo, topo.objects.countries.geometries) as LandGeometry;
        if (!cancelled) setLand(merged);
      } catch {
        if (!cancelled) setLand(null);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Load the era's GeoJSON whenever the URL changes.
  useEffect(() => {
    let cancelled = false;
    setData(null);
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const res = await fetch(geoJsonUrl);
        if (!res.ok) throw new Error(`Failed to load ${geoJsonUrl}`);
        const json = (await res.json()) as FeatureCollection;
        if (!cancelled) {
          setData(json);
          setLoading(false);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Unknown error");
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [geoJsonUrl]);

  // The callback is held in a ref, NOT read from the notify effect's dependency
  // list. It hands the parent three FRESHLY BUILT collections, so the parent
  // necessarily stores new object identities — and if the effect also depended on
  // the callback's identity, a caller passing an inline arrow (a new function every
  // render, which is the natural way to write this prop) would close an endless
  // loop: notify → parent setState → parent re-render → new callback identity →
  // notify again. That shipped and pegged the main thread at 100% on EVERY
  // historical era (LearnPage passed an inline arrow), and React eventually threw
  // "Maximum update depth exceeded". Keeping the callback in a ref makes the
  // once-per-era guarantee structural, so no future caller can reopen the loop by
  // forgetting to memoise.
  const onDataLoadedRef = useRef(onDataLoaded);
  useEffect(() => {
    onDataLoadedRef.current = onDataLoaded;
  }, [onDataLoaded]);

  // Notify the parent whenever new data lands, with the set of feature
  // NAMEs in this era. Lets the parent decide if a currently-selected
  // entity still exists in the new era (used by LearnPage to keep the
  // selection alive across era switches).
  useEffect(() => {
    if (!data) return;
    const notify = onDataLoadedRef.current;
    if (!notify) return;
    const names = new Set<string>();
    const rulers = new Map<string, string>();
    const derived = new Set<string>();
    for (const ft of data.features) {
      const n = polityFeatureName(ft);
      if (!n) continue;
      names.add(n);
      const ruler = ft.properties?.SUBJECTO;
      if (ruler && ruler !== n) rulers.set(n, ruler);
      if (ft.properties?.DERIVED === 1) derived.add(n);
    }
    notify(names, rulers, derived);
  }, [data]);

  // Compute per-feature path strings via d3-geo's equal-earth projection
  // (same as WorldProgressMap so the two maps look like the same world).
  const { renderedFeatures, spherePath, settledLandPath, graticulePath } = useMemo(() => {
    if (!data || data.features.length === 0)
      return { renderedFeatures: [], spherePath: null, settledLandPath: null, graticulePath: null };
    // Centre the projection on the user-chosen meridian. d3-geo's rotate
    // is [lambda, phi, gamma]; we only touch lambda. South-up is handled
    // separately as an SVG transform so the projection's geometry stays
    // canonical (less risk of fitSize / antimeridian-splitting bugs).
    // Fit to the sphere so the sphere outline exactly fills the viewBox —
    // fitting to the data geometry leaves the sphere wider than the viewBox,
    // causing SVG clipping at the left/right edges.
    const projection = worldProjection(WIDTH, HEIGHT, {
      globe,
      longitude: settledLon,
      latitude: settledLat,
    });
    const pathFn = geoPath(projection);
    // `h` is the pattern tile height (the ring's bbox height). The tile WIDTH is
    // derived per-flag at render time from the flag's true aspect ratio
    // (flagOverlayAspectRatio) so the tile matches the flag's proportions and
    // `preserveAspectRatio="…meet"` fills it with no letterbox gap — letting the
    // tiling cover the whole landmass, exactly like WorldProgressMap.
    // `path` is grown by the coastline tolerance for the same reason the
    // reconciliation band is (see COASTLINE_MATCH_TOLERANCE): with flags on, the
    // flag has to reach the coast too, or every island wears a rim of bare land
    // colour where the era outline falls short. The pattern stays anchored to the
    // ring's own bbox and tiles, so the extra width is filled seamlessly, and the
    // flag layer is clipped to the basemap's land so it cannot spill into the sea.
    type FlagPoly = { path: string; x: number; y: number; h: number };
    const features = data.features.map((f, idx) => {
      const d = pathFn(f as never);
      const name = polityFeatureName(f);
      // Sourced gap-fill adopted verbatim from upstream (scripts/build-era-gap-fill.mjs).
      const gapFill = f.properties?.GAPFILL === 1;
      // Decompose geometry into individual polygons so each non-contiguous
      // piece gets a flag image sized to its own bounding box.
      const flagPolys: FlagPoly[] = [];
      const geom = f.geometry as { type: string; coordinates: unknown } | null;
      if (geom) {
        const rings: unknown[] =
          geom.type === "Polygon"
            ? [geom.coordinates]
            : geom.type === "MultiPolygon"
              ? (geom.coordinates as unknown[])
              : [];
        for (const coords of rings) {
          const pf = { type: "Feature", properties: {}, geometry: { type: "Polygon", coordinates: coords } };
          const pd = pathFn(pf as never);
          if (!pd) continue;
          const b = pathFn.bounds(pf as never);
          if (b && isFinite(b[0][0]) && isFinite(b[1][0]) && b[1][0] > b[0][0] && b[1][1] > b[0][1]) {
            flagPolys.push({
              path: growProjectedPath(pd, COASTLINE_MATCH_TOLERANCE),
              x: b[0][0],
              y: b[0][1],
              h: b[1][1] - b[0][1],
            });
          }
        }
      }
      return {
        idx,
        d,
        // The same outline grown by COASTLINE_MATCH_TOLERANCE, for the
        // coastline-reconciliation band — the per-polygon grown rings above,
        // reused. Growing each polygon separately matters: the direction to grow
        // in is read from the biggest ring, and these files do not guarantee that
        // every polygon of one feature is wound the same way, so growing a whole
        // MultiPolygon in one go would quietly SHRINK the odd island out of step
        // with the flag layer. Computed here with the rest of the per-era
        // projection work, so there is no per-frame cost.
        grown: flagPolys.map((p) => p.path).join("") || null,
        name,
        flagPolys,
        area: pathFn.area(f as never),
        derived: f.properties?.DERIVED === 1,
        gapFill,
      };
    });
    // Paint LARGEST FIRST so a small polity that sits inside a bigger one is
    // never buried underneath it. SVG has no z-index — later siblings paint on
    // top — so file order used to decide clickability, and a handful of
    // polities were unreachable: the Bahmani Kingdom sat under Golkonda (1500),
    // Hohenzollern under Württemberg and Brunswick under Hanover (1815).
    // Sorting by projected area makes containment order and paint order agree.
    // GAPFILL features always sink to the BOTTOM, whatever their area. They are broad
    // upstream polities adopted to attribute land our finer import leaves unclaimed
    // (upstream's one "Greek city-states" vs our Athens / Thebes / Sparta + Corinth), so
    // they must never paint over — or steal a click from — the specific polity we name.
    // Below them, the existing largest-first order still applies.
    features.sort((a, b) => (a.gapFill === b.gapFill ? b.area - a.area : a.gapFill ? -1 : 1));
    const spherePath = pathFn({ type: "Sphere" } as never) ?? null;
    const settledLandPath = land ? (pathFn(land as never) ?? null) : null;
    const graticulePath = globe ? pathFn(geoGraticule10()) ?? null : null;
    return { renderedFeatures: features, spherePath, settledLandPath, graticulePath };
  }, [data, globe, settledLon, settledLat, land]);

  const featureCaps = useMemo(
    () => (globe && data ? data.features.map((f) => sphericalCap(f)) : null),
    [globe, data],
  );

  // Outlines only, at the live drag position (globe only). Features wholly on
  // the far side are skipped rather than projected.
  const movingPaths = useMemo(() => {
    if (!globeMoving || !data) return null;
    const view = { globe: true, longitude: liveLon, latitude: liveLat };
    const pathFn = geoPath(worldProjection(WIDTH, HEIGHT, view));
    return {
      byIdx: data.features.map((f, i) =>
        capMayBeVisible(featureCaps?.[i] ?? null, view) ? pathFn(f as never) ?? null : null,
      ),
      landPath: land ? (pathFn(land as never) ?? null) : null,
      graticulePath: pathFn(geoGraticule10()) ?? null,
    };
  }, [globeMoving, data, land, liveLon, liveLat, featureCaps]);
  const landPath = movingPaths ? movingPaths.landPath : settledLandPath;
  const shownGraticulePath = movingPaths ? movingPaths.graticulePath : graticulePath;

  // Upstream rates every feature's border accuracy 1 (roughest) to 3. For the older
  // eras it is 1 across the board — the authors telling us these lines are schematic.
  // Rendering them as crisp borders at up to 24× zoom implies a precision the data does
  // not have, so the map says so out loud.
  const bordersApproximate = useMemo(() => {
    if (!data) return false;
    let low = 0;
    let known = 0;
    for (const f of data.features) {
      const p = f.properties?.BORDERPRECISION;
      if (typeof p !== "number") continue;
      known++;
      if (p <= 1) low++;
    }
    return known > 0 && low / known > 0.5;
  }, [data]);

  // Compute the "highlight" set: every feature whose NAME matches the selected
  // name gets the highlight colour. A single empire often spans many separate
  // polygons (overseas territories, archipelagos) and they all light up
  // together. This is the ONE highlight input (see the prop's doc comment) —
  // never re-introduce a hover name that can outrank it.
  const highlightName = selectedName;

  // Is this feature part of the highlighted polity? Grouped through `groupKeyOf`,
  // so a polity spread across several features (a personal union) lights up as
  // one — and so every layer that reacts to the selection (fill, reconciliation
  // band, flag opacity) agrees about what is selected.
  const isHighlighted = (name: string | null): boolean =>
    name != null &&
    highlightName != null &&
    (groupKeyOf ? groupKeyOf(name) === groupKeyOf(highlightName) : name === highlightName);

  // The band that reconciles the era's coastline with the basemap's (see
  // COASTLINE_MATCH_TOLERANCE). Kept separate for the highlighted polity so a
  // selected island is padded in its own colour rather than ringed in the
  // ordinary land colour.
  const { coveragePath, highlightCoveragePath } = useMemo(() => {
    let cover = "";
    let hi = "";
    for (const f of renderedFeatures) {
      if (!f.grown || !f.name) continue;
      if (isHighlighted(f.name)) hi += f.grown;
      else cover += f.grown;
    }
    return { coveragePath: cover || null, highlightCoveragePath: hi || null };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderedFeatures, highlightName, groupKeyOf]);

  return (
    <section className="map-section" aria-labelledby="map-heading">
      <h2 id="map-heading" className="map-heading">
        World map
        <span className="map-heading__hint">
          {" "}— hover or click a polity to see its name and flag
          {bordersApproximate && (
            <>
              {" · "}
              <span className="map-heading__caveat">
                borders are approximate for this date
              </span>
            </>
          )}
        </span>
      </h2>
      <div className="map-with-zoom">
      <div className="map-frame" ref={frameRef}>
        {loading && (
          <p className="hist-map__loading">Loading historical map…</p>
        )}
        {error && (
          <p className="hist-map__error">
            Couldn't load the map for this era ({error}).
          </p>
        )}
        {!loading && !error && (
          <svg
            className="world-map"
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            role="img"
            aria-label="Historical world map for the selected era"
            // Drag-to-pan is enabled (effective only once zoomed in).
            // Wheel-zoom and double-click-reset stay off so the user
            // can still page-scroll over the map.
            // On the globe a drag spins it instead of panning.
            onPointerDown={globe ? globeDrag.handlers.onPointerDown : zoom.svgHandlers.onPointerDown}
            onPointerMove={globe ? globeDrag.handlers.onPointerMove : zoom.svgHandlers.onPointerMove}
            onPointerUp={globe ? globeDrag.handlers.onPointerUp : zoom.svgHandlers.onPointerUp}
            onPointerCancel={globe ? globeDrag.handlers.onPointerCancel : zoom.svgHandlers.onPointerCancel}
            style={
              globe
                ? {
                    cursor: globeDrag.dragging ? "grabbing" : "grab",
                    touchAction: zoom.isZoomed ? "none" : "pan-y",
                  }
                : {
                    cursor: zoom.isZoomed ? "grab" : "default",
                    touchAction: zoom.isZoomed ? "none" : "auto",
                  }
            }
          >
            {/* Flag pattern tiles at SVG root — same approach as
                WorldProgressMap (see FlagDefs there). Each landmass ring is
                painted with a <pattern> whose tile is sized to the flag's TRUE
                aspect ratio, so `preserveAspectRatio="…meet"` fills the tile
                exactly and the seamless tiling covers the whole landmass with no
                letterbox gap, no distortion and no cropping. This replaces the
                old single <image preserveAspectRatio="…slice"> + clipPath, whose
                "slice" was silently ignored for bundled SVG flags that carry
                their own preserveAspectRatio — leaving country edges uncovered.
                patternUnits="userSpaceOnUse" keeps x/y in the referencing
                element's coordinate system (Safari transform/zoom/flip bug). */}
            <defs>
              {/* Land the dataset records no polity for. Hatching keeps it visibly
                  distinct from a real polity, which a flat fill did not — 17–34% of
                  the land in the older eras is unmapped, and painting it like a
                  country implied data we do not have. */}
              <pattern
                id="hm-nodata"
                width={6}
                height={6}
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <rect width={6} height={6} fill={palette.unknown} />
                <line x1={0} y1={0} x2={0} y2={6} stroke={palette.stroke} strokeWidth={0.6} strokeOpacity={0.25} />
              </pattern>
              {/* Confines the coastline-reconciliation band to real land, so
                  padding a polity out to the coast can never paint the sea. */}
              {landPath && (
                <clipPath id="hm-land-clip">
                  <path d={landPath} />
                </clipPath>
              )}
            </defs>
            {flagOverlay && !movingPaths && (
              <defs>
                {renderedFeatures.map((f) => {
                  if (!f.name) return null;
                  if (!flagOverlay.has(f.name)) return null;
                  const flagUrl = flagOverlay.get(f.name)!;
                  const ratio = flagOverlayAspectRatio(flagUrl);
                  return f.flagPolys.map((poly, i) => {
                    const tileW = poly.h * ratio;
                    return (
                      <pattern
                        key={`hm-fp-${f.idx}-${i}`}
                        id={`hm-fp-${f.idx}-${i}`}
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
            )}
            <g transform={zoom.transform}>
            {/* South-up wrapper: SVG transforms compose left-to-right, so
                `translate(0 H) scale(1 -1)` applied INSIDE zoom flips the
                geometry vertically (south at top) while keeping it
                inside the viewBox and preserving the zoom anchor. */}
            <g
              transform={southUp ? `translate(0 ${HEIGHT}) scale(1 -1)` : undefined}
            >
            {spherePath && (
              <path
                d={spherePath}
                fill={palette.ocean}
                stroke={palette.stroke}
                strokeWidth={0.4}
                strokeOpacity={0.5}
                vectorEffect="non-scaling-stroke"
              />
            )}
            {shownGraticulePath && (
              <path
                d={shownGraticulePath}
                fill="none"
                stroke={palette.stroke}
                strokeWidth={0.5}
                strokeOpacity={0.12}
                vectorEffect="non-scaling-stroke"
                pointerEvents="none"
                aria-hidden="true"
              />
            )}
            {/* The coastline, under every polity. Land no polity of this era covers
                stays visibly LAND (hatched "no data") instead of reading as ocean —
                without this, an unclaimed Balkans made Greece look like an island in
                500 BC. pointerEvents="none" so it can never swallow a click meant for
                a polity painted on top of it. */}
            {landPath && (
              <path
                d={landPath}
                fill="url(#hm-nodata)"
                stroke={palette.stroke}
                strokeWidth={0.4}
                strokeOpacity={0.35}
                vectorEffect="non-scaling-stroke"
                pointerEvents="none"
              />
            )}
            {/* Coastline reconciliation (see COASTLINE_MATCH_TOLERANCE): the era's
                own polygons, fattened by the tolerance and clipped to the basemap's
                land, painted in the polity fill UNDER the polities themselves. It
                shows only where nothing else covers it — i.e. exactly on the
                hatched slivers the two datasets' coastlines disagree about — so a
                polity no longer wears a shadow of "unmapped land" along its coast,
                while land that is genuinely unclaimed stays hatched. Decorative and
                non-interactive, like the coastline it sits on. */}
            {landPath && coveragePath && !movingPaths && (
              <path
                d={coveragePath}
                fill={palette.land}
                clipPath="url(#hm-land-clip)"
                pointerEvents="none"
              />
            )}
            {landPath && highlightCoveragePath && !movingPaths && (
              <path
                d={highlightCoveragePath}
                fill={palette.selected}
                clipPath="url(#hm-land-clip)"
                pointerEvents="none"
              />
            )}
            {renderedFeatures.map((f) => {
              const d = movingPaths ? movingPaths.byIdx[f.idx] : f.d;
              if (!d) return null;
              // Grouped, not a raw name match: a personal union spanning several
              // features (1600's Iberian Union) must highlight all of them at once.
              const highlighted = isHighlighted(f.name);
              const fill = highlighted
                ? palette.selected
                : f.name
                ? palette.land
                : "url(#hm-nodata)";
              const stroke = highlighted
                ? palette.selectedStroke
                : palette.stroke;
              return (
                <path
                  key={f.idx}
                  d={d}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={highlighted ? 1.4 : 0.4}
                  strokeOpacity={highlighted ? 1 : 0.5}
                  // A derived boundary is drawn dashed so the user can see which lines
                  // are sourced for the period and which are a modern administrative
                  // stand-in (see scripts/tag-derived-boundaries.mjs).
                  strokeDasharray={f.derived ? "3 2" : undefined}
                  // Keep borders the same visual width regardless of zoom —
                  // without this they thicken as the user zooms in.
                  vectorEffect="non-scaling-stroke"
                  className="world-map__country world-map__country--selectable"
                  onClick={() => onSelect?.(f.name)}
                  onPointerEnter={(e) => { if (e.pointerType === "mouse") onHover?.(f.name); }}
                  onPointerLeave={(e) => { if (e.pointerType === "mouse") onHover?.(null); }}
                >
                  {/* Tooltip shows the corrected spelling; f.name (the raw
                      dataset NAME) remains the selection key. Unnamed land says so
                      rather than looking like a polity that failed to load. */}
                  <title>
                    {f.name
                      ? polityDisplayName(f.name)
                      : "No polity recorded here for this date"}
                  </title>
                </path>
              );
            })}
            {flagOverlay && !movingPaths && (
              // Clipped to the basemap's land: each ring is grown by the coastline
              // tolerance so a flag reaches the real coast instead of stopping at
              // the era outline, and the clip is what keeps that growth off the sea.
              <g clipPath={landPath ? "url(#hm-land-clip)" : undefined}>
                {renderedFeatures.map((f) => {
                  if (!f.name || !flagOverlay.has(f.name)) return null;
                  const highlighted = isHighlighted(f.name);
                  // Paint each ring with its flag <pattern>; the ring path itself is
                  // the clip, so the tiled flag covers the landmass exactly. When the
                  // polity is highlighted we drop to 0.35 so the selection colour
                  // underneath shows through (same as WorldProgressMap).
                  return f.flagPolys.map((poly, i) => (
                    <path
                      key={`hm-fimg-${f.idx}-${i}`}
                      d={poly.path}
                      fill={`url(#hm-fp-${f.idx}-${i})`}
                      opacity={highlighted ? 0.35 : 1}
                      style={{ pointerEvents: "none" }}
                    />
                  ));
                })}
              </g>
            )}
            </g>
            </g>
          </svg>
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
});
