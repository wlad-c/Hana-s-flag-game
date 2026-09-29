import {
  MIGRANT_ORIGINS_BLUE,
  MIGRANT_ORIGINS_COLORS,
  MIGRANT_ORIGINS_SOURCE,
  formatMigrantStock,
  migrantOriginRange,
} from "../lib/migrantOriginsColors";
import { ALL_COUNTRY_OPTIONS } from "../lib/countrySelection";

export type MigrantOriginsMapLegendProps = {
  destinationCode: string;
};

/** Legend under the world map while migrant-origins colouring is active. */
export function MigrantOriginsMapLegend({
  destinationCode,
}: MigrantOriginsMapLegendProps) {
  const name =
    ALL_COUNTRY_OPTIONS.find((c) => c.code === destinationCode)?.name ??
    destinationCode;
  const title = `Migrant origins into ${name}`;
  const range = migrantOriginRange(destinationCode);
  const light = MIGRANT_ORIGINS_BLUE[0];
  const dark = MIGRANT_ORIGINS_BLUE[MIGRANT_ORIGINS_BLUE.length - 1];

  return (
    <div className="democracy-map-legend" role="region" aria-label={`${title} map legend`}>
      <span className="democracy-map-legend__title">{title}:</span>
      <ul className="democracy-map-legend__list">
        <li className="democracy-map-legend__item">
          <span
            className="democracy-map-legend__swatch"
            style={{ backgroundColor: MIGRANT_ORIGINS_COLORS.destination }}
            aria-hidden="true"
          />
          <span className="democracy-map-legend__label">{name} (destination)</span>
        </li>
        {range ? (
          <li className="democracy-map-legend__item migrant-origins-legend__scale">
            <span
              className="migrant-origins-legend__bar"
              style={{
                background: `linear-gradient(90deg, ${light}, ${dark})`,
              }}
              aria-hidden="true"
            />
            <span className="democracy-map-legend__label">
              {formatMigrantStock(range.min)} → {formatMigrantStock(range.max)}{" "}
              people ({range.count} origins with a published figure)
            </span>
          </li>
        ) : (
          <li className="democracy-map-legend__item">
            <span className="democracy-map-legend__label">
              No country-level origin figures published for this destination
            </span>
          </li>
        )}
        <li className="democracy-map-legend__item">
          <span
            className="democracy-map-legend__swatch"
            style={{ backgroundColor: MIGRANT_ORIGINS_COLORS.noData }}
            aria-hidden="true"
          />
          <span className="democracy-map-legend__label">No country-level figure</span>
        </li>
      </ul>
      <p className="democracy-map-legend__note">
        Source: {MIGRANT_ORIGINS_SOURCE.name}, {MIGRANT_ORIGINS_SOURCE.edition}. Absolute
        stock (both sexes). Darker blue = more migrants. Missing ≠ zero — residual stock may
        sit in UN DESA&apos;s &quot;Others&quot; aggregate.
      </p>
    </div>
  );
}
