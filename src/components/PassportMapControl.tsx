import { UiIcon } from "./UiIcon";
import { usePopoverBounds } from "../hooks/usePopoverBounds";
import { useEffect, useMemo, useRef, useState } from "react";
import { ALL_COUNTRY_OPTIONS, countrySearchNames } from "../lib/countrySelection";
import { normalizeForSearch } from "../lib/searchNormalize";
import { blurActiveElementThenRun } from "../lib/dismissKeyboard";
import {
  isPassportCoversMode,
  isVisaPassportMode,
  type PassportMapMode,
} from "../lib/visaAccessColors";

export type PassportMapControlProps = {
  mode: PassportMapMode;
  onChange: (next: PassportMapMode) => void;
};

/**
 * Learn world-map toolbar control: colour by passport cover, or by visa access
 * for holders of a chosen country's passport. Type-to-filter country list.
 */
export function PassportMapControl({ mode, onChange }: PassportMapControlProps) {
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
      // Focus the filter so keyboard users can type immediately.
      queueMicrotask(() => inputRef.current?.focus());
    } else {
      setQuery("");
    }
  }, [open]);

  const select = (next: PassportMapMode) => {
    blurActiveElementThenRun(() => {
      onChange(next);
      setOpen(false);
    });
  };

  const isActive = mode !== null;
  const activeVisaCode = isVisaPassportMode(mode) ? mode.code : null;
  const activeVisaName = activeVisaCode
    ? ALL_COUNTRY_OPTIONS.find((c) => c.code === activeVisaCode)?.name ?? activeVisaCode
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

  const ariaLabel = isPassportCoversMode(mode)
    ? "Colour countries by passport — cover colours"
    : activeVisaName
      ? `Colour countries by visa access for ${activeVisaName} passport holders`
      : "Colour countries by passport cover or visa access";

  const title = isPassportCoversMode(mode)
    ? "Passport cover colours"
    : activeVisaName
      ? `Visa access: ${activeVisaName}`
      : "Passport colours / visa access";

  return (
    <div className="democracy-map-control passport-map-control" ref={ref}>
      <button
        type="button"
        className={`world-map__zoom-btn world-map__zoom-btn--layer${isActive ? " world-map__zoom-btn--active" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={ariaLabel}
        title={title}
      >
        <span className="world-map__zoom-icon" aria-hidden="true">
          <UiIcon name="passport" />
        </span>
      </button>

      {open && (
        <div
          className="map-view-control__popover democracy-map-control__popover passport-map-control__popover"
          style={popoverStyle}
          role="dialog"
          aria-label="Passport map colouring"
        >
          <p className="map-view-control__heading">Passport map</p>
          <div className="democracy-map-control__options">
            <button
              type="button"
              className={`map-view-control__preset${mode === null ? " map-view-control__preset--active" : ""}`}
              onClick={() => select(null)}
            >
              Off (Default map)
            </button>
            <button
              type="button"
              className={`map-view-control__preset${isPassportCoversMode(mode) ? " map-view-control__preset--active" : ""}`}
              onClick={() => select("covers")}
            >
              Passport cover colours
            </button>

            <div className="democracy-map-control__group">
              <hr className="democracy-map-control__divider" aria-hidden="true" />
              <p className="democracy-map-control__group-label">
                Visa access for holders of…
              </p>
              <label className="passport-map-control__filter-label" htmlFor="passport-map-filter">
                Filter countries
              </label>
              <input
                id="passport-map-filter"
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
                aria-label="Countries"
              >
                {filteredCountries.length === 0 ? (
                  <li className="passport-map-control__empty">No matching countries</li>
                ) : (
                  filteredCountries.map((c) => {
                    const active = activeVisaCode === c.code;
                    return (
                      <li key={c.code}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={active}
                          className={`map-view-control__preset${active ? " map-view-control__preset--active" : ""}`}
                          onClick={() => select({ kind: "visa", code: c.code })}
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
