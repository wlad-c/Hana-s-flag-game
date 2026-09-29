import { UiIcon } from "./UiIcon";
import { usePopoverBounds } from "../hooks/usePopoverBounds";
import { useEffect, useRef, useState } from "react";
import {
  MAP_VIEW_PRESETS,
  clampLongitude,
  isSamePreset,
  type MapViewSettings,
} from "../lib/mapView";

/**
 * Popover-button control that lets the user pick the map's view centre
 * (Atlantic / Pacific / Americas / Africa / East Asia, or a custom
 * longitude via a slider), switch between the flat map and a globe, and
 * toggle south-up.
 *
 * Designed to sit in the same column as the +/-/⟲ zoom buttons. Closed
 * state is a single globe-icon button; open state floats a popover with
 * the preset chips, the slider, the polarity toggle, and the sub-national
 * borders toggle (Today map only — HistoricalMap ignores the setting).
 */
export type MapViewControlProps = {
  view: MapViewSettings;
  onChange: (next: MapViewSettings) => void;
};

export function MapViewControl({ view, onChange }: MapViewControlProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const popoverStyle = usePopoverBounds(open, ref, 256);

  // Close the popover on outside-click + Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const setLongitude = (n: number) =>
    onChange({ ...view, centerLongitude: clampLongitude(n) });
  const toggleSouthUp = () => onChange({ ...view, southUp: !view.southUp });
  const toggleSubnationalBorders = () =>
    onChange({
      ...view,
      showSubnationalBorders: !view.showSubnationalBorders,
    });

  return (
    <div className="map-view-control" ref={ref}>
      <button
        type="button"
        className="world-map__zoom-btn map-view-control__trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Change map view centre"
        title="Change map view centre"
      >
        {/* Simple globe glyph — no external icon dependency. */}
        <UiIcon name="globe" />
      </button>

      {open && (
        <div className="map-view-control__popover" style={popoverStyle} role="dialog" aria-label="Map view">
          <p className="map-view-control__heading">View centre</p>
          <div className="map-view-control__presets">
            {MAP_VIEW_PRESETS.map((p) => {
              const active = isSamePreset(view.centerLongitude, p.longitude);
              return (
                <button
                  key={p.label}
                  type="button"
                  className={`map-view-control__preset${active ? " map-view-control__preset--active" : ""}`}
                  onClick={() => setLongitude(p.longitude)}
                  title={p.description}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          <label className="map-view-control__slider-label">
            Custom longitude
            <span className="map-view-control__slider-value">
              {formatLongitude(view.centerLongitude)}
            </span>
          </label>
          <input
            type="range"
            min={-180}
            max={180}
            step={1}
            value={view.centerLongitude}
            onChange={(e) => setLongitude(Number(e.target.value))}
            className="map-view-control__slider"
            aria-label="Map centre longitude"
          />

          <p className="map-view-control__heading map-view-control__heading--sub" id="map-view-projection">
            Projection
          </p>
          <div
            className="map-view-control__presets"
            role="radiogroup"
            aria-labelledby="map-view-projection"
          >
            {([
              { globe: false, label: "Map", title: "Flat Equal Earth map (default)" },
              { globe: true, label: "Globe", title: "3-D globe — drag to spin it" },
            ] as const).map((o) => {
              const active = view.globe === o.globe;
              return (
                <button
                  key={o.label}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  className={`map-view-control__preset${active ? " map-view-control__preset--active" : ""}`}
                  onClick={() => onChange({ ...view, globe: o.globe })}
                  title={o.title}
                >
                  {o.label}
                </button>
              );
            })}
          </div>

          <label className="map-view-control__check">
            <input
              type="checkbox"
              checked={view.southUp}
              onChange={toggleSouthUp}
            />
            <span>South-up</span>
          </label>

          <label className="map-view-control__check">
            <input
              type="checkbox"
              checked={view.showSubnationalBorders}
              onChange={toggleSubnationalBorders}
            />
            <span>Sub-national borders</span>
          </label>
        </div>
      )}
    </div>
  );
}

/** "30 °E", "95 °W", "0 °" — friendly compass-style longitude label. */
function formatLongitude(lon: number): string {
  const v = clampLongitude(lon);
  if (Math.abs(v) < 0.5) return "0°";
  const dir = v > 0 ? "E" : "W";
  return `${Math.round(Math.abs(v))}° ${dir}`;
}
