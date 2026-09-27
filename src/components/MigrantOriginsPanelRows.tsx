import {
  MIGRANT_ORIGINS_SOURCE,
  formatMigrantStock,
  migrantStockFor,
} from "../lib/migrantOriginsColors";
import { ALL_COUNTRY_OPTIONS } from "../lib/countrySelection";

export type MigrantOriginsPanelRowsProps = {
  /** Destination the map is colouring for. */
  destinationCode: string;
  /** Origin country currently shown in the panel (selected / hovered). */
  originCode: string;
};

/**
 * Fact-sheet rows for the active migrant-origins map mode: absolute stock of
 * people born in the panel country who live in the chosen destination, plus
 * year and UN DESA citation. Never invents a figure — absent pairs say so.
 */
export function MigrantOriginsPanelRows({
  destinationCode,
  originCode,
}: MigrantOriginsPanelRowsProps) {
  const destName =
    ALL_COUNTRY_OPTIONS.find((c) => c.code === destinationCode)?.name ??
    destinationCode;
  const originName =
    ALL_COUNTRY_OPTIONS.find((c) => c.code === originCode)?.name ?? originCode;

  if (destinationCode === originCode) {
    return (
      <div className="entity-summary migrant-origins-panel" role="region" aria-label="Migrant origins">
        <dl className="entity-summary__list">
          <div className="entity-summary__row">
            <dt className="entity-summary__label">Migrant origins map</dt>
            <dd className="entity-summary__value">
              Selected destination ({destName}) — shown in black; not an origin on this scale.
            </dd>
          </div>
          <div className="entity-summary__row">
            <dt className="entity-summary__label">Source</dt>
            <dd className="entity-summary__value">
              {MIGRANT_ORIGINS_SOURCE.citation} ({MIGRANT_ORIGINS_SOURCE.licence}).
            </dd>
          </div>
        </dl>
      </div>
    );
  }

  const stock = migrantStockFor(destinationCode, originCode);

  return (
    <div className="entity-summary migrant-origins-panel" role="region" aria-label="Migrant origins">
      <dl className="entity-summary__list">
        <div className="entity-summary__row">
          <dt className="entity-summary__label">
            Born in {originName}, living in {destName}
          </dt>
          <dd className="entity-summary__value">
            {stock == null
              ? "No country-level figure published in UN DESA International Migrant Stock 2024 for this pair (missing ≠ zero)."
              : `${formatMigrantStock(stock)} people`}
          </dd>
        </div>
        <div className="entity-summary__row">
          <dt className="entity-summary__label">Year</dt>
          <dd className="entity-summary__value">{MIGRANT_ORIGINS_SOURCE.year} (mid-year)</dd>
        </div>
        <div className="entity-summary__row">
          <dt className="entity-summary__label">Source</dt>
          <dd className="entity-summary__value">
            {MIGRANT_ORIGINS_SOURCE.citation}{" "}
            <a
              href={MIGRANT_ORIGINS_SOURCE.page}
              target="_blank"
              rel="noopener noreferrer"
            >
              UN DESA International Migrant Stock
            </a>
            . {MIGRANT_ORIGINS_SOURCE.licence}.
          </dd>
        </div>
      </dl>
    </div>
  );
}
