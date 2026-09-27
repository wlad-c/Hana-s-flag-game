import { UiIcon } from "./UiIcon";
import { usePopoverBounds } from "../hooks/usePopoverBounds";
import { useEffect, useMemo, useRef, useState } from "react";
import { ALL_COUNTRY_OPTIONS, countrySearchNames } from "../lib/countrySelection";
import { normalizeForSearch } from "../lib/searchNormalize";
import { blurActiveElementThenRun } from "../lib/dismissKeyboard";
import {
  diasporaMeasureLabel,
  type DiasporaMapMode,
  type DiasporaMeasure,
} from "../lib/diasporaColors";

export type DiasporaMapControlProps = {
  mode: DiasporaMapMode;
  onChange: (next: DiasporaMapMode) => void;
};

/**
 * Learn world-map toolbar: diaspora STOCK (foreign-born living abroad) or
 * FLOW (estimated movers in 2015–2020). Not ethnic ancestry.
 */
export function DiasporaMapControl({ mode, onChange }: DiasporaMapControlProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const popoverStyle = usePopoverBounds(open, ref, 420);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        blurActiveElementThenRun(() => setOpen(false));
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") blurActiveElementThenRun(() => setOpen(false));
    };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      queueMicrotask(() => inputRef.current?.focus());
    } else {
      setQuery("");
    }
  }, [open]);

  const select = (next: DiasporaMapMode) => {
    blurActiveElementThenRun(() => {
      onChange(next);
      setOpen(false);
    });
  };

  const isActive = mode !== null;
  const activeName = mode
    ? ALL_COUNTRY_OPTIONS.find((c) => c.code === mode.code)?.name ?? mode.code
    : null;
  const activeKind = mode?.kind ?? null;

  const normalizedQuery = normalizeForSearch(query.trim());
  const filteredCountries = useMemo(() => {
    const list = [...ALL_COUNTRY_OPTIONS].sort((a, b) =>
      a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
    );
    if (!normalizedQuery) return list;
    return list.filter((c) => {
      if (normalizeForSearch(c.name).includes(normalizedQuery)) return true;
      if (normalizeForSearch(c.code).includes(normalizedQuery)) return true;
      return countrySearchNames(c.code, c.name).some((alias) =>
        normalizeForSearch(alias).includes(normalizedQuery),
      );
    });
  }, [normalizedQuery]);

  const countryList = (kind: DiasporaMeasure) => (
    <ul
      className="passport-map-control__list"
      role="listbox"
      aria-label={
        kind === "stock"
          ? "Origin countries — foreign-born stock"
          : "Origin countries — 2015–2020 flows"
      }
    >
      {filteredCountries.length === 0 ? (
        <li className="passport-map-control__empty">No matching countries</li>
      ) : (
        filteredCountries.map((c) => {
          const active = mode?.kind === kind && mode.code === c.code;
          return (
            <li key={`${kind}-${c.code}`}>
              <button
                type="button"
                role="option"
                aria-selected={active}
                className={`map-view-control__preset${active ? " map-view-control__preset--active" : ""}`}
                onClick={() => select({ kind, code: c.code })}
              >
                {c.name}
              </button>
            </li>
          );
        })
      )}
    </ul>
  );

  return (
    <div className="democracy-map-control diaspora-map-control" ref={ref}>
      <button
        type="button"
        className={`world-map__zoom-btn world-map__zoom-btn--layer${isActive ? " world-map__zoom-btn--active" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={
          activeName && activeKind
            ? `Colour countries by ${diasporaMeasureLabel(activeKind).toLowerCase()} from ${activeName}`
            : "Colour countries by diaspora stock or recent migration flows"
        }
        title={
          activeName && activeKind
            ? `${activeName} — ${diasporaMeasureLabel(activeKind)}`
            : "Diaspora map"
        }
      >
        <span className="world-map__zoom-icon" aria-hidden="true">
          <UiIcon name="globe" />
        </span>
      </button>

      {open && (
        <div
          className="map-view-control__popover democracy-map-control__popover passport-map-control__popover"
          style={popoverStyle}
          role="dialog"
          aria-label="Diaspora map colouring"
        >
          <p className="map-view-control__heading">Diaspora map</p>
          <div className="democracy-map-control__options">
            <button
              type="button"
              className={`map-view-control__preset${mode === null ? " map-view-control__preset--active" : ""}`}
              onClick={() => select(null)}
            >
              Off (Default map)
            </button>

            <label className="passport-map-control__filter-label" htmlFor="diaspora-map-filter">
              Filter countries
            </label>
            <input
              id="diaspora-map-filter"
              ref={inputRef}
              type="search"
              className="passport-map-control__filter"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type to filter…"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />

            <div className="democracy-map-control__group">
              <hr className="democracy-map-control__divider" aria-hidden="true" />
              <p className="democracy-map-control__group-label">
                Living abroad now (foreign-born stock, 2020)
              </p>
              <p className="passport-map-control__empty" style={{ margin: "0 0 0.4rem", fontSize: "0.75rem" }}>
                People born in the origin who live in each destination today — not
                ethnic descendants.
              </p>
              {countryList("stock")}
            </div>

            <div className="democracy-map-control__group">
              <hr className="democracy-map-control__divider" aria-hidden="true" />
              <p className="democracy-map-control__group-label">
                Moved 2015–2020 (estimated flows)
              </p>
              <p className="passport-map-control__empty" style={{ margin: "0 0 0.4rem", fontSize: "0.75rem" }}>
                Estimated movers during that five-year window (Abel &amp; Cohen), not
                a lifetime stock.
              </p>
              {countryList("flow")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
