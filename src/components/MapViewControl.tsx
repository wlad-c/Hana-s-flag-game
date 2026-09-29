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
 * Popover-button "View" control for the map toolbars. Holds the map layers
 * (flag overlay, capital markers) and, when `view` is passed, the world map's
 * view settings: centre (presets or a custom longitude), flat map vs globe,
 * spin, south-up and sub-national borders.
 *
 * The sub-national map passes only the layer toggles — it has no centre,
 * projection or rotation to change.
 */
export type MapViewControlProps = {
  /** World-map view settings. Omit (with `onChange`) for a layers-only menu. */
  view?: MapViewSettings;
  onChange?: (next: MapViewSettings) => void;
  /** Whether the map is auto-spinning. Omit (with `onToggleSpin`) to hide the control. */
  spinning?: boolean;
  onToggleSpin?: () => void;
  /** Flag overlay. Omit (with `onToggleFlags`) to hide the control. */
  showFlags?: boolean;
  onToggleFlags?: () => void;
  /** Capital-city markers. Omit (with `onToggleCapitals`) to hide the control. */
  showCapitals?: boolean;
  onToggleCapitals?: () => void;
};

export function MapViewControl({
  view,
  onChange,
  spinning = false,
  onToggleSpin,
  showFlags = false,
  onToggleFlags,
  showCapitals = false,
  onToggleCapitals,
}: MapViewControlProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasView = view !== undefined && onChange !== undefined;
  const hasLayers = onToggleFlags !== undefined || onToggleCapitals !== undefined;
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

  const layersOn = (onToggleFlags && showFlags) || (onToggleCapitals && showCapitals);
  const title = [
    onToggleFlags && "flags",
    onToggleCapitals && "capitals",
    hasView && "globe, spin, south-up, centre",
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="map-view-control" ref={ref}>
      <button
        type="button"
        className={`world-map__zoom-btn map-view-control__trigger${layersOn ? " map-view-control__trigger--layers-on" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Map view options"
        title={`Map view — ${title}`}
      >
        <UiIcon name="settings" />
        <span className="map-view-control__trigger-label">View</span>
      </button>

      {open && (
        <div className="map-view-control__popover" style={popoverStyle} role="dialog" aria-label="Map view">
          {hasLayers && (
            <>
              <p className="map-view-control__heading">Show on map</p>
              {onToggleFlags && (
                <label className="map-view-control__check">
                  <input type="checkbox" checked={showFlags} onChange={onToggleFlags} />
                  <span>Flags</span>
                </label>
              )}
              {onToggleCapitals && (
                <label className="map-view-control__check">
                  <input type="checkbox" checked={showCapitals} onChange={onToggleCapitals} />
                  <span>Capitals</span>
                </label>
              )}
            </>
          )}
          {hasView && (
            <ViewSettings
              view={view}
              onChange={onChange}
              spinning={spinning}
              onToggleSpin={onToggleSpin}
              sub={hasLayers}
            />
          )}
        </div>
      )}
    </div>
  );
}

function ViewSettings({
  view,
  onChange,
  spinning,
  onToggleSpin,
  sub,
}: {
  view: MapViewSettings;
  onChange: (next: MapViewSettings) => void;
  spinning: boolean;
  onToggleSpin?: () => void;
  sub: boolean;
}) {
  const setLongitude = (n: number) =>
    onChange({ ...view, centerLongitude: clampLongitude(n) });
  const toggleSouthUp = () => onChange({ ...view, southUp: !view.southUp });
  const toggleSubnationalBorders = () =>
    onChange({
      ...view,
      showSubnationalBorders: !view.showSubnationalBorders,
    });

  return (
    <>
      <p className={`map-view-control__heading${sub ? " map-view-control__heading--sub" : ""}`}>
        View centre
      </p>
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

      {onToggleSpin && (
        <label className="map-view-control__check">
          <input type="checkbox" checked={spinning} onChange={onToggleSpin} />
          <span>Spin</span>
        </label>
      )}

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
    </>
  );
}

/** "30 °E", "95 °W", "0 °" — friendly compass-style longitude label. */
function formatLongitude(lon: number): string {
  const v = clampLongitude(lon);
  if (Math.abs(v) < 0.5) return "0°";
  const dir = v > 0 ? "E" : "W";
  return `${Math.round(Math.abs(v))}° ${dir}`;
}
