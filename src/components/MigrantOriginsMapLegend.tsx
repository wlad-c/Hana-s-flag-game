import {
  MIGRANT_ORIGINS_HEATMAP_STOPS,
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
  const title = `Migrant origins into ${name} (${MIGRANT_ORIGINS_SOURCE.year})`;
  const range = migrantOriginRange(destinationCode);

  return (
    <div className="democracy-map-legend" role="region" aria-label={`${title} map legend`}>
      <span className="democracy-map-legend__title">{title}:</span>
      <ul className="democracy-map-legend__list">
        <li className="democracy-map-legend__item democracy-map-legend__item--gradient">
          <span
            className="democracy-map-legend__gradient"
            style={{
              background: `linear-gradient(90deg, ${MIGRANT_ORIGINS_HEATMAP_STOPS.join(", ")})`,
            }}
            aria-hidden="true"
          />
          <span className="democracy-map-legend__label">
            {range
              ? `Fewer (${formatMigrantStock(range.min)}) → more (${formatMigrantStock(range.max)}) people`
              : "Fewer → more people"}
          </span>
        </li>
        <li className="democracy-map-legend__item">
          <span
            className="democracy-map-legend__swatch"
            style={{ backgroundColor: MIGRANT_ORIGINS_COLORS.destination }}
            aria-hidden="true"
          />
          <span className="democracy-map-legend__label">{name} (destination)</span>
        </li>
      </ul>
      {range ? (
        <p className="democracy-map-legend__note">
          {formatMigrantStock(range.total)} people living in {name} from{" "}
          {range.count} {range.count === 1 ? "country" : "countries"} with a reported
          stock. Uncoloured countries have no positive stock in the source.
          Destination-born descendants are not counted.
        </p>
      ) : (
        <p className="democracy-map-legend__note">
          No country-level origin figures published for this destination.
          Uncoloured countries have no positive stock in the source.
        </p>
      )}
      <p className="democracy-map-legend__note">
        Source: {MIGRANT_ORIGINS_SOURCE.name} (year {MIGRANT_ORIGINS_SOURCE.year}; {MIGRANT_ORIGINS_SOURCE.licence}).
      </p>
    </div>
  );
}
