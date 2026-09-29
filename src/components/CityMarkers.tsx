import { memo } from "react";
import { type PlacedCity, isNational, isSubnational } from "../lib/cityRoles";

/**
 * City-overlay markers for the Learn-mode maps. The overlay shows CAPITALS ONLY:
 *
 *   ★ large salmon star → a national capital
 *   ★ small gold star   → a subdivision capital
 *   thin outer ring     → a city that is BOTH a national and a subdivision capital
 *                         (e.g. a state capital that is also the national capital)
 *
 * HARD RULE — the overlay is PURELY DECORATIVE and MUST NOT capture pointer
 * events (see CLAUDE.md "City overlay must never block selection"). Every element
 * here carries `pointer-events: none` so a marker can never sit above the
 * interactive subdivision/country layer and swallow a selection click — which
 * previously made small subdivisions fully covered by their capital marker (e.g.
 * Beijing, Shanghai) impossible to select. Names are therefore NOT revealed by
 * interacting with the marker; instead the parent map passes `activeCode` (the
 * hovered or selected territory) and the label for the matching marker is shown.
 * This keeps clicks flowing to the map while still revealing a capital's name.
 *
 * This component projects nothing itself: the parent map converts each city to
 * pixel coordinates (handling its own zoom / rotation / south-up transforms) and
 * passes finished screen positions here, so markers stay a constant pixel size
 * regardless of zoom — they are never enlarged or shrunk with the map.
 */

// National-capital stars use the game's coral/salmon accent (--coral, #ff6b6b —
// the same warm tone as the headings and mascot); subdivision-capital stars stay
// gold. The colour reinforces the size distinction (national = larger + salmon,
// subdivision = smaller + gold).
const NATIONAL_CAPITAL_FILL = "#ff6b6b"; // salmon / coral
const CAPITAL_FILL = "#f2b50a"; // gold (subdivision capitals)

export type ScreenCity = { city: PlacedCity; x: number; y: number };

/** 5-point star path centred at the origin, outer radius R. */
function starPath(R: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? R : R * 0.42;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    pts.push(`${(Math.cos(a) * r).toFixed(2)},${(Math.sin(a) * r).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
}

// Colour of the "this is the specific capital you selected" ring — the same
// teal/"--sky" accent the app already uses everywhere else for a selected
// item (the selected subdivision's map fill, the active flag-grid card, …),
// so a selected capital reads as "selected" the same way a selected
// subdivision does. Deliberately distinct from the coral national-capital
// fill and the dark map stroke used by the dual-level ring, so it never
// blends into either.
const SELECTED_RING_STROKE = "#4ecdc4";

function Marker({
  city,
  stroke,
  showLabel,
  selected,
  labelHalo,
  labelFill,
  unitPx,
}: {
  city: PlacedCity;
  stroke: string;
  showLabel: boolean;
  /** True when this marker is the EXACT capital the user just selected (via
   *  the city-flags grid, the hierarchy chart, or picking a subdivision) —
   *  distinct from `showLabel`, which several markers can carry at once
   *  (e.g. every national capital on a subdivision map is always labelled).
   *  Draws a highlighted ring so the specific selected capital is visually
   *  identifiable among other already-labelled markers. */
  selected: boolean;
  labelHalo: string;
  labelFill: string;
  /** Screen pixels per SVG user unit (rendered map width / viewBox width). Used
   *  to counter-scale the label so it renders at a CONSTANT on-screen size
   *  regardless of how small the map is drawn (phone vs. desktop). */
  unitPx: number;
}) {
  const r = city.roles;
  const big = isNational(r);
  const R = big ? 12 : 8; // outer radius (constant px)
  const dualLevel = isNational(r) && isSubnational(r);
  const sw = big ? 1.4 : 1.1;
  const fill = big ? NATIONAL_CAPITAL_FILL : CAPITAL_FILL;

  // The label must NOT shrink with the map — size it in real screen pixels by
  // dividing the desired px by unitPx (SVG scales it back up by unitPx on render).
  const scale = unitPx > 0 ? unitPx : 1;
  const LABEL_PX = big ? 15 : 13; // constant on-screen font size
  const fontSize = LABEL_PX / scale;
  const haloPx = 3.2 / scale;
  // Selection ring sits OUTSIDE the dual-level ring (R*1.7) so both can be
  // told apart when a city is national+subnational AND the one selected.
  const selectedRingR = R * (dualLevel ? 2.2 : 1.9);
  // The label sits centred ABOVE the star (clear of the dual-level/selection
  // ring), not beside it, so it stays readable and never overlaps the glyph or
  // a neighbour's star (owner request 2026-07).
  const ringR = selected ? selectedRingR : dualLevel ? R * 1.7 : R;
  const labelY = -(ringR + 4 / scale);

  const label = city.note ? `${city.name} · ${city.note}` : city.name;

  return (
    // HARD RULE: the whole marker group is non-interactive so it can never block
    // a selection click on the map beneath it.
    <g style={{ pointerEvents: "none" }}>
      {/* Accessible name (no tooltip needed — the marker is non-interactive). */}
      <title>{label}</title>
      {/* Selected ring: the EXACT capital the user just picked — drawn first
          (outermost/behind) so the dual-level ring and star sit on top. */}
      {selected && (
        <circle
          r={selectedRingR}
          fill="none"
          stroke={SELECTED_RING_STROKE}
          strokeWidth={1.6}
          vectorEffect="non-scaling-stroke"
        />
      )}
      {/* Dual-level ring: the city is both a national and a subdivision capital. */}
      {dualLevel && (
        <circle
          r={R * 1.7}
          fill="none"
          stroke={stroke}
          strokeWidth={0.9}
          strokeOpacity={0.85}
          vectorEffect="non-scaling-stroke"
        />
      )}
      <path
        d={starPath(R)}
        fill={fill}
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      {showLabel && (
        <text
          x={0}
          y={labelY}
          textAnchor="middle"
          dominantBaseline="auto"
          fontSize={fontSize}
          fontWeight={big ? 700 : 600}
          fill={labelFill}
          stroke={labelHalo}
          strokeWidth={haloPx}
          paintOrder="stroke"
          strokeLinejoin="round"
        >
          {label}
        </text>
      )}
    </g>
  );
}

export const CityMarkers = memo(function CityMarkers({
  markers,
  activeCode,
  activeCityName,
  alwaysLabelNational = false,
  stroke,
  labelHalo,
  labelFill,
  unitPx = 1,
}: {
  markers: ScreenCity[];
  /** ISO code of the hovered/selected territory; that marker's name is revealed. */
  activeCode?: string | null;
  /** Name of the EXACT capital the user selected (via the city-flags grid, the
   *  hierarchy chart, or picking a subdivision) — distinct from `activeCode`,
   *  which can match several markers at once (e.g. a country with several
   *  national capitals). The one matching marker gets a highlighted ring so
   *  the SPECIFIC selected capital is identifiable, not just "a" capital. */
  activeCityName?: string | null;
  /** When true, every NATIONAL capital's name is labelled unconditionally (used on
   *  a country's own subdivision view so its capital is always named — its marker's
   *  ownerCode is often the subdivision code once it merges with a state capital, so
   *  matching the country code alone would miss it). */
  alwaysLabelNational?: boolean;
  stroke: string;
  labelHalo: string;
  labelFill: string;
  /** Screen px per SVG user unit — keeps the revealed label a constant on-screen
   *  size instead of shrinking with the map on small screens. */
  unitPx?: number;
}) {
  return (
    // Non-interactive container — the whole overlay is decorative (see HARD RULE).
    <g style={{ pointerEvents: "none" }} aria-hidden="true">
      {markers.map(({ city, x, y }) => {
        const selected = !!activeCityName && city.name === activeCityName;
        const show =
          selected ||
          (!!activeCode && (city.ownerCode === activeCode || !!city.ownerCodes?.includes(activeCode))) ||
          (alwaysLabelNational && isNational(city.roles));
        return (
          <g key={city.id} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
            <Marker
              city={city}
              stroke={stroke}
              showLabel={show}
              selected={selected}
              labelHalo={labelHalo}
              labelFill={labelFill}
              unitPx={unitPx}
            />
          </g>
        );
      })}
    </g>
  );
});

/** Compact legend explaining the capital marker glyphs. Rendered next to the map. */
export function CityLegend({ stroke }: { stroke: string }) {
  const Item = ({ children, label }: { children: React.ReactNode; label: string }) => (
    <span className="city-legend__item">
      <svg width={20} height={20} viewBox="-10 -10 20 20" className="city-legend__glyph" aria-hidden="true">
        {children}
      </svg>
      {label}
    </span>
  );
  return (
    <div className="city-legend" role="note" aria-label="City marker legend">
      <Item label="National capital">
        <path d={starPath(8)} fill={NATIONAL_CAPITAL_FILL} stroke={stroke} strokeWidth={1} strokeLinejoin="round" />
      </Item>
      <Item label="Subdivision capital">
        <path d={starPath(5.5)} fill={CAPITAL_FILL} stroke={stroke} strokeWidth={0.9} strokeLinejoin="round" />
      </Item>
      <Item label="Both (national & subdivision)">
        <circle r={9} fill="none" stroke={stroke} strokeWidth={0.9} strokeOpacity={0.85} />
        <path d={starPath(7)} fill={NATIONAL_CAPITAL_FILL} stroke={stroke} strokeWidth={1} strokeLinejoin="round" />
      </Item>
      <Item label="Hover or select a territory to see its capital">
        <path d={starPath(7)} fill={NATIONAL_CAPITAL_FILL} stroke={stroke} strokeWidth={1} strokeLinejoin="round" />
      </Item>
    </div>
  );
}
