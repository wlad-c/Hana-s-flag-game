import { UiIcon } from "./UiIcon";
import { usePopoverBounds } from "../hooks/usePopoverBounds";
import { useEffect, useMemo, useRef, useState } from "react";
import { ALL_COUNTRY_OPTIONS, countrySearchNames } from "../lib/countrySelection";
import { normalizeForSearch } from "../lib/searchNormalize";
import { blurActiveElementThenRun } from "../lib/dismissKeyboard";
import type { DiasporaMapMode } from "../lib/diasporaColors";

export type DiasporaMapControlProps = {
  mode: DiasporaMapMode;
  onChange: (next: DiasporaMapMode) => void;
};

/**
 * Learn world-map toolbar control: colour destinations by how many people
 * born in a chosen country live there (diaspora heatmap).
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
    ? ALL_COUNTRY_OPTIONS.find((c) => c.code === mode)?.name ?? mode
    : null;

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

  return (
    <div className="democracy-map-control diaspora-map-control" ref={ref}>
      <button
        type="button"
        className={`world-map__zoom-btn world-map__zoom-btn--layer${isActive ? " world-map__zoom-btn--active" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={
          activeName
            ? `Colour countries by diaspora from ${activeName}`
            : "Colour countries by diaspora from a selected country"
        }
        title={activeName ? `Diaspora from ${activeName}` : "Diaspora heatmap"}
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

            <div className="democracy-map-control__group">
              <hr className="democracy-map-control__divider" aria-hidden="true" />
              <p className="democracy-map-control__group-label">
                People born in… living abroad
              </p>
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
              <ul
                className="passport-map-control__list"
                role="listbox"
                aria-label="Countries of origin"
              >
                {filteredCountries.length === 0 ? (
                  <li className="passport-map-control__empty">No matching countries</li>
                ) : (
                  filteredCountries.map((c) => {
                    const active = mode === c.code;
                    return (
                      <li key={c.code}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={active}
                          className={`map-view-control__preset${active ? " map-view-control__preset--active" : ""}`}
                          onClick={() => select(c.code)}
                        >
                          {c.name}
                        </button>
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
