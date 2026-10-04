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
import {
  diasporaMeasureLabel,
  type DiasporaMapMode,
  type DiasporaMeasure,
} from "../lib/diasporaColors";
import {
  isMigrantOriginsMode,
  type MigrantOriginsMapMode,
} from "../lib/migrantOriginsColors";

export type TravelMigrationLens = "visa" | "migrant-origins" | "diaspora";

export type TravelMigrationMapControlProps = {
  passportMode: PassportMapMode;
  onPassportChange: (next: PassportMapMode) => void;
  diasporaMode: DiasporaMapMode;
  onDiasporaChange: (next: DiasporaMapMode) => void;
  migrantOriginsMode: MigrantOriginsMapMode;
  onMigrantOriginsChange: (next: MigrantOriginsMapMode) => void;
  /** Country open in the Learn panel — preselects the country picker. */
  suggestedCode?: string | null;
};

const LENSES: { id: TravelMigrationLens; label: string }[] = [
  { id: "visa", label: "Visa access" },
  { id: "migrant-origins", label: "Migrant intake" },
  { id: "diaspora", label: "Diaspora" },
];

function countryName(code: string): string {
  return ALL_COUNTRY_OPTIONS.find((c) => c.code === code)?.name ?? code;
}

function lensDescription(lens: TravelMigrationLens, kind: DiasporaMeasure, name: string | null): string {
  const who = name ?? "the chosen country";
  if (lens === "visa") return `Where holders of ${who}'s passport can travel, by visa requirement.`;
  if (lens === "migrant-origins") return `Where the people living in ${who} were born.`;
  return kind === "flow"
    ? `Where people from ${who} moved in 2015–2020 — estimated movers (Abel & Cohen), not a lifetime stock.`
    : `Where people born in ${who} live today — foreign-born stock, not ethnic descendants.`;
}

/**
 * Learn world-map toolbar: one button for the country-centred people layers —
 * visa access, migrant intake and diaspora — plus passport cover colours.
 * One shared country picker; the lens chips switch what that country's
 * colouring shows, in place.
 */
export function TravelMigrationMapControl({
  passportMode,
  onPassportChange,
  diasporaMode,
  onDiasporaChange,
  migrantOriginsMode,
  onMigrantOriginsChange,
  suggestedCode,
}: TravelMigrationMapControlProps) {
  const activeLens: TravelMigrationLens | null = isVisaPassportMode(passportMode)
    ? "visa"
    : isMigrantOriginsMode(migrantOriginsMode)
      ? "migrant-origins"
      : diasporaMode
        ? "diaspora"
        : null;
  const activeCode: string | null = isVisaPassportMode(passportMode)
    ? passportMode.code
    : isMigrantOriginsMode(migrantOriginsMode)
      ? migrantOriginsMode.code
      : diasporaMode?.code ?? null;
  const coversOn = isPassportCoversMode(passportMode);
  const isActive = activeLens !== null || coversOn;

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [draftLens, setDraftLens] = useState<TravelMigrationLens>("visa");
  const [draftKind, setDraftKind] = useState<DiasporaMeasure>("stock");
  const [draftCode, setDraftCode] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const popoverStyle = usePopoverBounds(open, ref, 460);

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

  // Seed the drafts from what the map shows each time the popover opens.
  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    setDraftLens(activeLens ?? "visa");
    setDraftKind(diasporaMode?.kind ?? "stock");
    setDraftCode(activeCode ?? suggestedCode ?? null);
    // Scroll only the list — scrollIntoView would also scroll the popover
    // and hide its heading.
    requestAnimationFrame(() => {
      const list = listRef.current;
      const item = list?.querySelector<HTMLElement>('[aria-selected="true"]');
      if (list && item) list.scrollTop = item.offsetTop - list.offsetTop - list.clientHeight / 2;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const apply = (lens: TravelMigrationLens, code: string, kind: DiasporaMeasure) => {
    if (lens === "visa") onPassportChange({ kind: "visa", code });
    else if (lens === "migrant-origins") onMigrantOriginsChange({ kind: "migrant-origins", code });
    else onDiasporaChange({ kind, code });
  };

  const close = (fn?: () => void) =>
    blurActiveElementThenRun(() => {
      fn?.();
      setOpen(false);
    });

  const turnOff = () =>
    close(() => {
      onPassportChange(null);
      onDiasporaChange(null);
      onMigrantOriginsChange(null);
    });

  const showCovers = () => close(() => onPassportChange("covers"));

  const pickLens = (lens: TravelMigrationLens) => {
    setDraftLens(lens);
    if (draftCode) apply(lens, draftCode, draftKind);
  };

  const pickMeasure = (kind: DiasporaMeasure) => {
    setDraftKind(kind);
    if (draftCode) apply("diaspora", draftCode, kind);
  };

  const pickCountry = (code: string) =>
    close(() => {
      setDraftCode(code);
      apply(draftLens, code, draftKind);
    });

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

  const activeName = activeCode ? countryName(activeCode) : null;
  const activeSummary = coversOn
    ? "Passport cover colours"
    : activeLens === "visa"
      ? `Visa access: ${activeName}`
      : activeLens === "migrant-origins"
        ? `Migrant intake: ${activeName}`
        : activeLens === "diaspora" && diasporaMode
          ? `Diaspora: ${activeName} — ${diasporaMeasureLabel(diasporaMode.kind)}`
          : null;

  const draftName = draftCode ? countryName(draftCode) : null;
  const draftIsShowing =
    draftCode !== null &&
    activeCode === draftCode &&
    activeLens === draftLens &&
    (draftLens !== "diaspora" || diasporaMode?.kind === draftKind);

  return (
    <div className="democracy-map-control travel-map-control" ref={ref}>
      <button
        type="button"
        className={`world-map__zoom-btn world-map__zoom-btn--layer${isActive ? " world-map__zoom-btn--active" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={
          activeSummary
            ? `Travel & migration map — ${activeSummary}`
            : "Travel & migration map — visa access, migrant intake, diaspora"
        }
        title={activeSummary ?? "Travel & migration — visas, migrant intake, diaspora"}
      >
        <span className="world-map__zoom-icon" aria-hidden="true">
          <UiIcon name="plane" />
        </span>
      </button>

      {open && (
        <div
          className="map-view-control__popover democracy-map-control__popover passport-map-control__popover"
          style={popoverStyle}
          role="dialog"
          aria-label="Travel and migration map colouring"
        >
          <p className="map-view-control__heading">Travel &amp; migration</p>
          <div className="democracy-map-control__options">
            <div className="travel-map-control__row">
              <button
                type="button"
                className={`map-view-control__preset${!isActive ? " map-view-control__preset--active" : ""}`}
                onClick={turnOff}
              >
                Off
              </button>
              <button
                type="button"
                className={`map-view-control__preset${coversOn ? " map-view-control__preset--active" : ""}`}
                onClick={showCovers}
              >
                Passport cover colours
              </button>
            </div>

            <div className="democracy-map-control__group">
              <hr className="democracy-map-control__divider" aria-hidden="true" />
              <p className="democracy-map-control__group-label" id="travel-map-lens">
                Show for a country
              </p>
              <div
                className="travel-map-control__lenses"
                role="radiogroup"
                aria-labelledby="travel-map-lens"
              >
                {LENSES.map((l) => {
                  const on = draftLens === l.id;
                  return (
                    <button
                      key={l.id}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      className={`map-view-control__preset${on ? " map-view-control__preset--active" : ""}`}
                      onClick={() => pickLens(l.id)}
                    >
                      {l.label}
                    </button>
                  );
                })}
              </div>
              {draftLens === "diaspora" && (
                <div className="travel-map-control__row" role="group" aria-label="Diaspora measure">
                  <button
                    type="button"
                    className={`map-view-control__preset${draftKind === "stock" ? " map-view-control__preset--active" : ""}`}
                    onClick={() => pickMeasure("stock")}
                    aria-pressed={draftKind === "stock"}
                    title="Living abroad now (foreign-born stock, 2024)"
                  >
                    Living abroad now
                  </button>
                  <button
                    type="button"
                    className={`map-view-control__preset${draftKind === "flow" ? " map-view-control__preset--active" : ""}`}
                    onClick={() => pickMeasure("flow")}
                    aria-pressed={draftKind === "flow"}
                    title="Moved 2015–2020 (estimated flows)"
                  >
                    Moved 2015–2020
                  </button>
                </div>
              )}
              <p className="passport-map-control__empty travel-map-control__note">
                {lensDescription(draftLens, draftKind, draftName)}
              </p>
            </div>

            <div className="democracy-map-control__group">
              <hr className="democracy-map-control__divider" aria-hidden="true" />
              <p className="democracy-map-control__group-label">
                {draftName ? (
                  <>
                    Country: <span className="travel-map-control__current">{draftName}</span>
                    {!draftIsShowing && " — tap it to show"}
                  </>
                ) : (
                  "Choose a country"
                )}
              </p>
              <label className="passport-map-control__filter-label" htmlFor="travel-map-filter">
                Filter countries
              </label>
              <input
                id="travel-map-filter"
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
              <ul ref={listRef} className="passport-map-control__list" role="listbox" aria-label="Countries">
                {filteredCountries.length === 0 ? (
                  <li className="passport-map-control__empty">No matching countries</li>
                ) : (
                  filteredCountries.map((c) => {
                    const active = draftCode === c.code;
                    return (
                      <li key={c.code}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={active}
                          className={`map-view-control__preset${active ? " map-view-control__preset--active" : ""}`}
                          onClick={() => pickCountry(c.code)}
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
