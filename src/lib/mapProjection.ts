/**
 * World-map projection factory shared by the Today map (WorldProgressMap) and
 * the historical era maps (HistoricalMap).
 *
 * Equal Earth is the canonical projection and the default. The globe
 * (orthographic) is an opt-in Learn-mode view the user switches on from the
 * View-centre popover — the same topology, the same untouched coordinates,
 * only drawn as the visible hemisphere of a sphere. Both are fitted to the
 * sphere so the outline fills the same 960×500 viewBox.
 */
import { geoCentroid, geoDistance, geoEqualEarth, geoOrthographic } from "d3-geo";

type Projection = ReturnType<typeof geoEqualEarth>;

export type WorldProjectionOptions = {
  globe: boolean;
  /** Central meridian, degrees. */
  longitude: number;
  /** Globe tilt — the latitude at the centre of the disc. Ignored on the flat map. */
  latitude?: number;
};

export function worldProjection(
  width: number,
  height: number,
  { globe, longitude, latitude = 0 }: WorldProjectionOptions,
): Projection {
  const projection: Projection = globe
    ? geoOrthographic().clipAngle(90).rotate([-longitude, -offPole(latitude)])
    : geoEqualEarth().rotate([-longitude, 0]);
  return projection.fitSize([width, height], { type: "Sphere" } as never);
}

/**
 * At a tilt of exactly 0° the globe's edge runs through both poles, and d3's
 * clipping cannot tell which side a ring touching a pole (Antarctica) lies
 * on — it fills the whole disc instead. Keep the tilt a hair off zero.
 */
function offPole(latitude: number): number {
  const MIN = 0.01;
  return Math.abs(latitude) < MIN ? (latitude < 0 ? -MIN : MIN) : latitude;
}

/** True when a point faces the viewer on the globe (always true on the flat map). */
export function isPointVisible(
  lonLat: [number, number],
  { globe, longitude, latitude = 0 }: WorldProjectionOptions,
): boolean {
  if (!globe) return true;
  return geoDistance(lonLat, [longitude, latitude]) < Math.PI / 2;
}

/** A feature's bounding spherical cap: centre and angular radius (radians). */
export type SphericalCap = { center: [number, number]; radius: number };

/**
 * Bounding cap of a GeoJSON feature, computed once so a globe frame can skip
 * features lying wholly on the far hemisphere without projecting them. Only
 * used for culling — the geometry itself is never touched.
 */
export function sphericalCap(f: { geometry?: unknown } | null | undefined): SphericalCap | null {
  const geom = f?.geometry as { type: string; coordinates: unknown } | null | undefined;
  if (!geom) return null;
  const center = geoCentroid(f as never) as [number, number];
  if (!isFinite(center[0]) || !isFinite(center[1])) return null;
  let radius = 0;
  const walk = (c: unknown): void => {
    if (!Array.isArray(c)) return;
    if (typeof c[0] === "number") {
      const d = geoDistance(center, c as [number, number]);
      if (d > radius) radius = d;
      return;
    }
    for (const x of c) walk(x);
  };
  walk(geom.coordinates);
  return { center, radius };
}

/** False only when the cap lies entirely on the globe's hidden hemisphere. */
export function capMayBeVisible(
  cap: SphericalCap | null,
  { globe, longitude, latitude = 0 }: WorldProjectionOptions,
): boolean {
  if (!globe || !cap) return true;
  return geoDistance(cap.center, [longitude, latitude]) - cap.radius < Math.PI / 2;
}
