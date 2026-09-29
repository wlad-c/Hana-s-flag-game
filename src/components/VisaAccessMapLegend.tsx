import {
  VISA_ACCESS_LEGEND,
  VISA_ACCESS_COLORS,
  VISA_ACCESS_SOURCE,
  formatVisaAccessCountLabel,
  visaAccessCategoryCounts,
} from "../lib/visaAccessColors";
import { ALL_COUNTRY_OPTIONS } from "../lib/countrySelection";

export type VisaAccessMapLegendProps = {
  passportCode: string;
};

/** Legend under the world map while visa-access colouring is active. */
export function VisaAccessMapLegend({ passportCode }: VisaAccessMapLegendProps) {
  const name =
    ALL_COUNTRY_OPTIONS.find((c) => c.code === passportCode)?.name ?? passportCode;
  const title = `Visa access for ${name} passport holders`;
  const counts = visaAccessCategoryCounts(passportCode);

  return (
    <div className="democracy-map-legend" role="region" aria-label={`${title} map legend`}>
      <span className="democracy-map-legend__title">{title}:</span>
      <ul className="democracy-map-legend__list">
        {VISA_ACCESS_LEGEND.map((item) => {
          const count = counts?.[item.key] ?? 0;
          const base = item.key === "home" ? name : item.label;
          return (
            <li key={item.key} className="democracy-map-legend__item">
              <span
                className="democracy-map-legend__swatch"
                style={{ backgroundColor: VISA_ACCESS_COLORS[item.key] }}
                aria-hidden="true"
              />
              <span className="democracy-map-legend__label">
                {formatVisaAccessCountLabel(base, count)}
              </span>
            </li>
          );
        })}
      </ul>
      <p className="democracy-map-legend__note">
        Source: {VISA_ACCESS_SOURCE.name}, {VISA_ACCESS_SOURCE.edition}.
      </p>
    </div>
  );
}
