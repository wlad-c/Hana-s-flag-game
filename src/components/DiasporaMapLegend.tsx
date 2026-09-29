import {
  DIASPORA_HEATMAP,
  DIASPORA_HEATMAP_STOPS,
  DIASPORA_STOCK_SOURCE,
  DIASPORA_FLOW_SOURCE,
  diasporaScale,
  diasporaValueNoun,
  formatDiasporaNumber,
  type DiasporaMeasure,
} from "../lib/diasporaColors";
import { ALL_COUNTRY_OPTIONS } from "../lib/countrySelection";

export type DiasporaMapLegendProps = {
  kind: DiasporaMeasure;
  originCode: string;
};

/** Legend under the world map while diaspora heatmap colouring is active. */
export function DiasporaMapLegend({ kind, originCode }: DiasporaMapLegendProps) {
  const name =
    ALL_COUNTRY_OPTIONS.find((c) => c.code === originCode)?.name ?? originCode;
  const scale = diasporaScale(kind, originCode);
  const noun = diasporaValueNoun(kind);
  const title =
    kind === "flow"
      ? `Moved from ${name}, 2015–2020`
      : `Born in ${name}, living abroad (2020)`;
  const source = kind === "flow" ? DIASPORA_FLOW_SOURCE : DIASPORA_STOCK_SOURCE;

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
              ? `Fewer (${formatDiasporaNumber(scale.min)}) → more (${formatDiasporaNumber(scale.max)}) ${noun}`
              : `Fewer → more ${noun}`}
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
          {kind === "flow" ? (
            <>
              {formatDiasporaNumber(scale.total)} estimated movers from {name} to{" "}
              {scale.destinations}{" "}
              {scale.destinations === 1 ? "country" : "countries"} in 2015–2020.
              Uncoloured countries have no positive estimated flow in the source.
            </>
          ) : (
            <>
              {formatDiasporaNumber(scale.total)} people born in {name} living in{" "}
              {scale.destinations}{" "}
              {scale.destinations === 1 ? "country" : "countries"} with a reported
              stock. Uncoloured countries have no positive stock in the source.
              Destination-born descendants are not counted.
            </>
          )}
        </p>
      )}
      <p className="democracy-map-legend__note">
        {kind === "flow"
          ? `Source: ${source.name} (${DIASPORA_FLOW_SOURCE.period}, method ${DIASPORA_FLOW_SOURCE.method}; ${source.license}).`
          : `Source: ${source.name} (year ${DIASPORA_STOCK_SOURCE.year}; ${source.license}).`}
      </p>
    </div>
  );
}
