import {
  DIASPORA_HEATMAP,
  DIASPORA_HEATMAP_STOPS,
  DIASPORA_SOURCE,
  diasporaScale,
  formatDiasporaStock,
} from "../lib/diasporaColors";
import { ALL_COUNTRY_OPTIONS } from "../lib/countrySelection";

export type DiasporaMapLegendProps = {
  originCode: string;
};

/** Legend under the world map while diaspora heatmap colouring is active. */
export function DiasporaMapLegend({ originCode }: DiasporaMapLegendProps) {
  const name =
    ALL_COUNTRY_OPTIONS.find((c) => c.code === originCode)?.name ?? originCode;
  const scale = diasporaScale(originCode);
  const title = `Diaspora from ${name}`;

  return (
    <div className="democracy-map-legend" role="region" aria-label={`${title} map legend`}>
      <span className="democracy-map-legend__title">{title}:</span>
      <ul className="democracy-map-legend__list">
        <li className="democracy-map-legend__item democracy-map-legend__item--gradient">
          <span
            className="democracy-map-legend__gradient"
            style={{
              background: `linear-gradient(90deg, ${DIASPORA_HEATMAP_STOPS.join(", ")})`,
            }}
            aria-hidden="true"
          />
          <span className="democracy-map-legend__label">
            {scale
              ? `Fewer (${formatDiasporaStock(scale.min)}) → more (${formatDiasporaStock(scale.max)}) people`
              : "Fewer → more people abroad"}
          </span>
        </li>
        <li className="democracy-map-legend__item">
          <span
            className="democracy-map-legend__swatch"
            style={{ backgroundColor: DIASPORA_HEATMAP.home }}
            aria-hidden="true"
          />
          <span className="democracy-map-legend__label">{name} (origin)</span>
        </li>
      </ul>
      {scale && (
        <p className="democracy-map-legend__note">
          {formatDiasporaStock(scale.totalAbroad)} people from {name} living in{" "}
          {scale.destinations} {scale.destinations === 1 ? "country" : "countries"} with a
          reported stock. Uncoloured countries have no positive stock in the source for this
          origin.
        </p>
      )}
      <p className="democracy-map-legend__note">
        Source: {DIASPORA_SOURCE.name}, mid-{DIASPORA_SOURCE.year} ({DIASPORA_SOURCE.license}).
      </p>
    </div>
  );
}
