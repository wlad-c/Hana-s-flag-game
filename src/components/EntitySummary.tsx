import { GOVERNMENT_TYPES } from "../lib/governmentTypes";
import { formatPopulation } from "../lib/formatPopulation";
import { NATIONAL_REFERENCE_POPULATION } from "../data/subdivisionPopulation";
import { COUNTRY_ENDONYMS } from "../data/countryEndonyms";
import { membershipsForCountry } from "../data/countryBlocks";
import type { Country } from "../api/countries";
import {
  getDemocracyIndexLabel,
  getDemocracyIndexMenuGroups,
  type DemocracyIndexKey,
} from "../lib/democracyColors";
import {
  WVS_PUBLISHER,
  WVS_WAVE_YEAR_LABEL,
  getWvsCountryBreakdown,
  getWvsQuestionsByTheme,
  getWvsSociety,
  getWvsThemes,
} from "../lib/wvsResults";
import { MembershipBadge } from "./MembershipBadge";
import { PersonaBadge } from "./PersonaBadge";
import { COUNTRY_PERSONAS } from "../data/countryPersonas";

/**
 * Structured "fact-sheet" view of an entity for the Learn-mode panel.
 *
 * For modern countries we pull the rich REST Countries fields (capital,
 * official name, currencies, languages, …) plus a curated government
 * type. For historical polities the fields are sparser — just region,
 * note, peak-population — but the same `<dl>` layout is reused for
 * visual consistency.
 *
 * Each row only renders when the underlying data is present, so a
 * partially-known entity still looks tidy. The rows are ALWAYS visible —
 * there is no collapse/disclosure (a hard rule: the fact-sheet is a
 * reference, not something the user should have to expand).
 */

/** Which rows a modern-country fact-sheet renders. "all" is the legacy
 *  single-list mode; the Learn panel tabs pass "facts" (Overview),
 *  "finance", "indices" (Rankings), or "politics". */
export type EntitySummarySection =
  | "all"
  | "facts"
  | "finance"
  | "indices"
  | "politics";

export type ModernSummaryProps = {
  kind: "modern";
  country: Country;
  /** Extra content rendered at the bottom of the fact list — e.g. the
   *  National Anthem row. Only used for "facts" / "all". */
  footer?: React.ReactNode;
  /** Defaults to "all" so existing callers keep the full fact-sheet. */
  section?: EntitySummarySection;
};

export type HistoricalSummaryProps = {
  kind: "historical";
  region?: string;
  note?: string;
  population?: number;
  /** Ruling power, from the era GeoJSON's own SUBJECTO field. */
  ruledBy?: string;
  /** True when the polity's borders are a modern administrative stand-in rather
   *  than a boundary sourced for the period. */
  approximateExtent?: boolean;
  /** Set when the upstream dataset draws this polity for the WRONG DATE — the borders
   *  or the very existence of the entity are anachronistic for this era. We do not
   *  redraw them (that would mean inventing a boundary), so the panel says so instead.
   *  Sourced in src/data/polityExistence.ts; enforced by check-era-anachronism.mjs. */
  datingCaveat?: { issue: string; actual: string };
};

export type EntitySummaryProps = ModernSummaryProps | HistoricalSummaryProps;

function formatHistoricalPop(n: number): string {
  return `${formatPopulation(n)} (peak)`;
}

function formatCurrency(c: { code: string; name: string; symbol?: string }) {
  return c.symbol ? `${c.name} (${c.symbol})` : c.name;
}

function formatGdpScale(num: number): string {
  if (num >= 1e12) {
    const val = num / 1e12;
    return `${val >= 10 ? val.toFixed(1) : val.toFixed(2)} trillion`;
  }
  if (num >= 1e9) {
    const val = num / 1e9;
    return `${val >= 10 ? val.toFixed(1) : val.toFixed(2)} billion`;
  }
  if (num >= 1e6) {
    const val = num / 1e6;
    return `${val >= 10 ? val.toFixed(1) : val.toFixed(2)} million`;
  }
  return num.toLocaleString("en-US");
}

function formatGdpRow(c: Country): string | null {
  if (!c.gdpUsd && !c.gdpLcu) return null;
  const curr = c.currencies?.[0];
  const symbol = curr?.symbol || "";
  const code = curr?.code || "";

  const formattedUsd = c.gdpUsd ? `$${formatGdpScale(c.gdpUsd)}` : null;
  const isUsdCurrency = code === "USD" || (symbol === "$" && (c.code === "US" || c.code === "EC" || c.code === "SV" || c.code === "PA" || c.code === "PW" || c.code === "FM" || c.code === "MH" || c.code === "TL"));

  if (!c.gdpLcu || isUsdCurrency || Math.abs(c.gdpLcu - (c.gdpUsd || 0)) / (c.gdpUsd || 1) < 0.001) {
    return formattedUsd ? `${formattedUsd} USD` : null;
  }

  const lcuScale = formatGdpScale(c.gdpLcu);
  const formattedLcu = symbol ? `${symbol}${lcuScale}` : `${lcuScale} ${code}`;

  if (formattedUsd) {
    return `${formattedLcu} (${formattedUsd} USD)`;
  }
  return formattedLcu;
}

function formatGdpPerCapitaRow(c: Country): string | null {
  if (!c.gdpPerCapitaUsd && !c.gdpPerCapitaLcu) return null;
  const curr = c.currencies?.[0];
  const symbol = curr?.symbol || "";
  const code = curr?.code || "";

  const usdNum = c.gdpPerCapitaUsd ? Math.round(c.gdpPerCapitaUsd).toLocaleString("en-US") : null;
  const formattedUsd = usdNum ? `$${usdNum}` : null;
  const isUsdCurrency = code === "USD" || (symbol === "$" && (c.code === "US" || c.code === "EC" || c.code === "SV" || c.code === "PA" || c.code === "PW" || c.code === "FM" || c.code === "MH" || c.code === "TL"));

  if (!c.gdpPerCapitaLcu || isUsdCurrency || Math.abs(c.gdpPerCapitaLcu - (c.gdpPerCapitaUsd || 0)) / (c.gdpPerCapitaUsd || 1) < 0.001) {
    return formattedUsd ? `${formattedUsd} USD` : null;
  }

  const lcuNum = Math.round(c.gdpPerCapitaLcu).toLocaleString("en-US");
  const formattedLcu = symbol ? `${symbol}${lcuNum}` : `${lcuNum} ${code}`;

  if (formattedUsd) {
    return `${formattedLcu} (${formattedUsd} USD)`;
  }
  return formattedLcu;
}

function formatRankChange(rc?: number): string {
  if (rc === undefined) return "";
  if (rc > 0) return ` (+${rc})`;
  if (rc < 0) return ` (${rc})`;
  return " (=)";
}

function formatDemocracyIndex(idx?: { year: number; rating: string; rank: number; rankChange?: number }): string | null {
  if (!idx) return null;
  const changeStr = formatRankChange(idx.rankChange);
  return `Rank ${idx.rank}${changeStr} · ${idx.rating}`;
}

/** CPI shows the 0–100 score (the index’s primary figure), not the map score-band. */
function formatCpiIndex(idx?: {
  year: number;
  rating: string;
  rank: number;
  rankChange?: number;
  score?: number;
}): string | null {
  if (!idx || typeof idx.score !== "number") return null;
  const changeStr = formatRankChange(idx.rankChange);
  return `Rank ${idx.rank}${changeStr} · Score ${idx.score}`;
}

/** DPI shows tier + Index Score (net % positive − % negative). */
function formatPerceptionIndex(idx?: {
  year: number;
  rating: string;
  rank: number;
  rankChange?: number;
  score?: number;
}): string | null {
  if (!idx || typeof idx.score !== "number") return null;
  const changeStr = formatRankChange(idx.rankChange);
  const scoreStr = idx.score > 0 ? `+${idx.score}` : `${idx.score}`;
  return `Rank ${idx.rank}${changeStr} · ${idx.rating} · ${scoreStr}`;
}

/** WJP shows the 0–1 overall score (the index’s primary figure), not the map band. */
function formatWjpIndex(idx?: {
  year: number;
  rating: string;
  rank: number;
  rankChange?: number;
  score?: number;
}): string | null {
  if (!idx || typeof idx.score !== "number") return null;
  const changeStr = formatRankChange(idx.rankChange);
  return `Rank ${idx.rank}${changeStr} · Score ${idx.score.toFixed(2)}`;
}

/** HDI shows the 0–1 score (the index’s primary figure) plus the UNDP category. */
function formatHdiIndex(idx?: {
  year: number;
  rating: string;
  rank: number;
  rankChange?: number;
  score?: number;
}): string | null {
  if (!idx || typeof idx.score !== "number") return null;
  const changeStr = formatRankChange(idx.rankChange);
  return `Rank ${idx.rank}${changeStr} · ${idx.rating} · ${idx.score.toFixed(3)}`;
}

/** WEF Global Gender Gap Index — published 0–1 parity score. */
function formatGenderGapIndex(idx?: {
  year: number;
  rating: string;
  rank: number;
  rankChange?: number;
  score?: number;
}): string | null {
  if (!idx || typeof idx.score !== "number") return null;
  const changeStr = formatRankChange(idx.rankChange);
  return `Rank ${idx.rank}${changeStr} · Score ${idx.score.toFixed(3)}`;
}

/** GPI shows State of Peace band + overall score (lower = more peaceful). */
function formatGpiIndex(idx?: {
  year: number;
  rating: string;
  rank: number;
  rankChange?: number;
  score?: number;
}): string | null {
  if (!idx || typeof idx.score !== "number") return null;
  const changeStr = formatRankChange(idx.rankChange);
  return `Rank ${idx.rank}${changeStr} · ${idx.rating} · ${idx.score.toFixed(3)}`;
}


/** WHR shows the Cantril ladder score (0–10), the index’s primary figure. */
function formatHappinessIndex(idx?: {
  year: number;
  rating: string;
  rank: number;
  rankChange?: number;
  score?: number;
}): string | null {
  if (!idx || typeof idx.score !== "number") return null;
  const changeStr = formatRankChange(idx.rankChange);
  return `Rank ${idx.rank}${changeStr} · Score ${idx.score.toFixed(3)}`;
}

/** Brand Finance Global Soft Power Index — score out of 100. */
function formatSoftPowerIndex(idx?: {
  year: number;
  rating: string;
  rank: number;
  rankChange?: number;
  score?: number;
}): string | null {
  if (!idx || typeof idx.score !== "number") return null;
  const changeStr = formatRankChange(idx.rankChange);
  return `Rank ${idx.rank}${changeStr} · Score ${idx.score.toFixed(1)}`;
}

/** Lowy Global Diplomacy Index — total diplomatic posts abroad. */
function formatGdiIndex(idx?: {
  year: number;
  rating: string;
  rank: number;
  rankChange?: number;
  score?: number;
}): string | null {
  if (!idx || typeof idx.score !== "number") return null;
  const changeStr = formatRankChange(idx.rankChange);
  return `Rank ${idx.rank}${changeStr} · ${idx.score} posts`;
}

/** IMD World Competitiveness Ranking — 0–100 overall score. */
function formatImdCompetitivenessIndex(idx?: {
  year: number;
  rating: string;
  rank: number;
  rankChange?: number;
  score?: number;
}): string | null {
  if (!idx || typeof idx.score !== "number") return null;
  const changeStr = formatRankChange(idx.rankChange);
  return `Rank ${idx.rank}${changeStr} · Score ${idx.score.toFixed(2)}`;
}

/** ETR shows threat band + overall score (higher = greater ecological threat). */
/** Digital News Report — trust in news overall (% agreeing most news is trustworthy). */
function formatDigitalNewsIndex(idx?: {
  year: number;
  rating: string;
  rank: number;
  rankChange?: number;
  score?: number;
}): string | null {
  if (!idx || typeof idx.score !== "number") return null;
  const changeStr = formatRankChange(idx.rankChange);
  return `Rank ${idx.rank}${changeStr} · ${idx.score}% trust`;
}


/** GTI shows impact band + overall score (higher = greater terrorism impact). */
function formatGtiIndex(idx?: {
  year: number;
  rating: string;
  rank: number;
  rankChange?: number;
  score?: number;
}): string | null {
  if (!idx || typeof idx.score !== "number") return null;
  const changeStr = formatRankChange(idx.rankChange);
  return `Rank ${idx.rank}${changeStr} · ${idx.rating} · ${idx.score.toFixed(3)}`;
}

function formatEtrIndex(idx?: {
  year: number;
  rating: string;
  rank: number;
  rankChange?: number;
  score?: number;
}): string | null {
  if (!idx || typeof idx.score !== "number") return null;
  const changeStr = formatRankChange(idx.rankChange);
  return `Rank ${idx.rank}${changeStr} · ${idx.rating} · ${idx.score.toFixed(3)}`;
}

function buildFactsRows(c: Country): { label: string; value: React.ReactNode }[] {
  const rows: { label: string; value: React.ReactNode }[] = [];
  if (c.nameOfficial && c.nameOfficial !== c.name)
    rows.push({ label: "Name", value: c.nameOfficial });
  // Local (native-language) name, shown above the population where it differs
  // from the English exonym the app uses (e.g. Germany → Deutschland).
  const endonym = COUNTRY_ENDONYMS[c.code];
  if (endonym) rows.push({ label: "Local name", value: endonym });
  // Population sits ABOVE Capital and is ALWAYS shown: the live World Bank /
  // REST figure wins, but a bundled reference (NATIONAL_REFERENCE_POPULATION,
  // latest dated country-level P1082) fills in when the live source is blocked
  // or slow, so the row never disappears.
  const pop =
    typeof c.population === "number"
      ? c.population
      : NATIONAL_REFERENCE_POPULATION[c.code];
  if (typeof pop === "number")
    rows.push({ label: "Population", value: formatPopulation(pop) });
  if (c.capital) rows.push({ label: "Capital", value: c.capital });
  if (c.languages && c.languages.length > 0)
    rows.push({
      label: c.languages.length === 1 ? "Language" : "Languages",
      value: c.languages.join(", "),
    });
  if (c.callingCode) rows.push({ label: "Calling code", value: c.callingCode });
  if (c.tld && c.tld.length > 0)
    rows.push({
      label: c.tld.length === 1 ? "Internet domain" : "Internet domains",
      value: c.tld.join(", "),
    });

  return rows;
}

/** Currency + GDP — Finance tab. */
function buildFinanceRows(c: Country): { label: string; value: React.ReactNode }[] {
  const rows: { label: string; value: React.ReactNode }[] = [];
  if (c.currencies && c.currencies.length > 0)
    rows.push({
      label: c.currencies.length === 1 ? "Currency" : "Currencies",
      value: c.currencies.map(formatCurrency).join(", "),
    });
  const gdpVal = formatGdpRow(c);
  if (gdpVal) rows.push({ label: "GDP", value: gdpVal });
  const gdpCapVal = formatGdpPerCapitaRow(c);
  if (gdpCapVal) rows.push({ label: "GDP per capita", value: gdpCapVal });
  return rows;
}

/** Continent / region — geographic context for Overview. */
function buildGeoRows(c: Country): { label: string; value: React.ReactNode }[] {
  const rows: { label: string; value: React.ReactNode }[] = [];
  if (c.continent) rows.push({ label: "Continent", value: c.continent });
  if (c.subregion) rows.push({ label: "Region", value: c.subregion });
  // Country Personas (edition 2026): the country's persona, explained on
  // hover or tap. Added row — the fact sheet's rows are never reduced (CLAUDE.md).
  if (COUNTRY_PERSONAS[c.code])
    rows.push({ label: "Country persona", value: <PersonaBadge code={c.code} countryName={c.name} /> });
  return rows;
}

/** Government type + organisation membership — Politics tab. */
function buildPoliticsRows(c: Country): { label: string; value: React.ReactNode }[] {
  const rows: { label: string; value: React.ReactNode }[] = [];
  const government = GOVERNMENT_TYPES[c.code];
  if (government) rows.push({ label: "Government", value: government });

  // Each badge reveals full name (abbr) + sourced explainer on hover/tap.
  const memberships = membershipsForCountry(c.code);
  if (memberships.length > 0) {
    rows.push({
      label: "Membership",
      value: (
        <ul className="entity-summary__membership">
          {memberships.map((m) => (
            <MembershipBadge
              key={m.id}
              block={m}
              countryCode={c.code}
              countryName={c.name}
            />
          ))}
        </ul>
      ),
    });
  }
  return rows;
}

/** Legacy single-list order: identity → finance → indices → politics → geo. */
function interleaveFactsAndIndices(
  c: Country,
): { label: string; value: React.ReactNode }[] {
  return [
    ...buildFactsRows(c),
    ...buildFinanceRows(c),
    ...buildIndicesRows(c),
    ...buildPoliticsRows(c),
    ...buildGeoRows(c),
  ];
}

/** Format one index value for the Rankings / legacy fact-sheet rows. */
function formatIndexValue(c: Country, key: DemocracyIndexKey): string | null {
  const d = c.democracy;
  if (!d) return null;
  switch (key) {
    case "freedom-house":
      return formatDemocracyIndex(d.freedomHouse);
    case "v-dem":
      return formatDemocracyIndex(d.vDem);
    case "economist":
      return formatDemocracyIndex(d.economist);
    case "cpi":
      return formatCpiIndex(d.cpi);
    case "perception":
      return formatPerceptionIndex(d.perception);
    case "rsf-press":
      return formatDemocracyIndex(d.rsfPress);
    case "wjp-rule-of-law":
      return formatWjpIndex(d.wjpRuleOfLaw);
    case "hdi":
      return formatHdiIndex(d.hdi);
    case "gender-gap":
      return formatGenderGapIndex(d.genderGap);
    case "gpi":
      return formatGpiIndex(d.gpi);
    case "happiness":
      return formatHappinessIndex(d.happiness);
    case "soft-power":
      return formatSoftPowerIndex(d.softPower);
    case "gdi":
      return formatGdiIndex(d.gdi);
    case "imd-competitiveness":
      return formatImdCompetitivenessIndex(d.imdCompetitiveness);
    case "etr":
      return formatEtrIndex(d.etr);
    case "digital-news":
      return formatDigitalNewsIndex(d.digitalNews);
    case "gti":
      return formatGtiIndex(d.gti);
    default: {
      const _exhaustive: never = key;
      return _exhaustive;
    }
  }
}

type IndicesGroup = {
  id: string;
  label: string;
  rows: { label: string; value: React.ReactNode }[];
};

/**
 * Rankings rows grouped by the same theme order as the map control / Group-by
 * menus (`getDemocracyIndexMenuGroups`). Empty groups are dropped so a country
 * with sparse coverage still shows only the themes it has data for.
 */
function buildIndicesGroups(c: Country): IndicesGroup[] {
  if (!c.democracy) return [];
  return getDemocracyIndexMenuGroups()
    .map((group) => ({
      id: group.theme.id,
      label: group.theme.label,
      rows: group.indexes
        .map((meta) => {
          const value = formatIndexValue(c, meta.key);
          return value
            ? { label: getDemocracyIndexLabel(meta.key), value }
            : null;
        })
        .filter((r): r is { label: string; value: string } => r != null),
    }))
    .filter((g) => g.rows.length > 0);
}

/** Flat list for the legacy "all" fact-sheet — same theme order as Rankings. */
function buildIndicesRows(c: Country): { label: string; value: React.ReactNode }[] {
  return buildIndicesGroups(c).flatMap((g) => g.rows);
}

function formatWvsPct(pct: number | null): string {
  if (pct == null || !Number.isFinite(pct)) return "—";
  return Number.isInteger(pct) ? `${pct}%` : `${pct.toFixed(1)}%`;
}

/**
 * Expandable World Values Survey breakdown for one country. Themes and
 * questions with no row for this society are omitted (honest gaps).
 */
function WvsCountrySection({ code }: { code: string }) {
  const society = getWvsSociety(code);
  if (!society) return null;

  const themes = [];
  for (const theme of getWvsThemes()) {
    const questions = [];
    for (const q of getWvsQuestionsByTheme(theme.id)) {
      const breakdown = getWvsCountryBreakdown(code, q.id);
      if (!breakdown) continue;
      questions.push({ q, breakdown });
    }
    if (questions.length === 0) continue;
    themes.push({ theme, questions });
  }

  if (themes.length === 0) return null;

  return (
    <details className="entity-summary__wvs">
      <summary className="entity-summary__wvs-summary">
        {society.wave < 7 ? (
          <>
            World Values Survey, {society.year ?? `Wave ${society.wave}`} ({WVS_PUBLISHER})
            {` · Wave ${society.wave}, older than most countries' ${WVS_WAVE_YEAR_LABEL} figures`}
          </>
        ) : (
          <>
            World Values Survey, {WVS_WAVE_YEAR_LABEL} ({WVS_PUBLISHER})
            {society.year != null ? ` · fieldwork ${society.year}` : ""}
          </>
        )}
      </summary>
      {society.note && (
        <p className="entity-summary__wvs-note">{society.note}</p>
      )}
      <div className="entity-summary__wvs-themes">
        {themes.map(({ theme, questions }) => (
          <details key={theme.id} className="entity-summary__wvs-theme">
            <summary>
              {theme.label}
              <span className="entity-summary__wvs-count">{questions.length}</span>
            </summary>
            <ul className="entity-summary__wvs-questions">
              {questions.map(({ q, breakdown }) => (
                <li key={q.id} className="entity-summary__wvs-question">
                  <details>
                    <summary>
                      <span className="entity-summary__wvs-qid">{q.id}</span>
                      {q.title}
                    </summary>
                    <dl className="entity-summary__wvs-answers">
                      {breakdown.map(({ answer, pct }) => (
                        <div key={answer} className="entity-summary__wvs-answer">
                          <dt>{answer}</dt>
                          <dd>{formatWvsPct(pct)}</dd>
                        </div>
                      ))}
                    </dl>
                  </details>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </details>
  );
}

export function EntitySummary(props: EntitySummaryProps) {
  if (props.kind === "modern") {
    const c = props.country;
    const section = props.section ?? "all";
    const footer =
      section === "indices" ||
      section === "politics" ||
      section === "finance"
        ? undefined
        : props.footer;

    if (section === "indices") {
      const groups = buildIndicesGroups(c);
      const hasWvs = !!getWvsSociety(c.code);
      if (groups.length === 0 && !hasWvs) {
        return (
          <p className="learn-panel-tabs__empty">
            No governance or ratings indices sourced for this country yet.
          </p>
        );
      }
      return (
        <div className="entity-summary__groups">
          {groups.map((group) => (
            <section key={group.id} className="entity-summary__group">
              <h3 className="entity-summary__group-label">{group.label}</h3>
              <SummaryList rows={group.rows} />
            </section>
          ))}
          <WvsCountrySection code={c.code} />
        </div>
      );
    }

    const rows =
      section === "all"
        ? interleaveFactsAndIndices(c)
        : section === "facts"
          ? [...buildFactsRows(c), ...buildGeoRows(c)]
          : section === "finance"
            ? buildFinanceRows(c)
            : section === "politics"
              ? buildPoliticsRows(c)
              : buildIndicesRows(c);
    if (section === "finance" && rows.length === 0) {
      return (
        <p className="learn-panel-tabs__empty">
          No currency or GDP figures sourced for this country yet.
        </p>
      );
    }
    if (section === "politics" && rows.length === 0) {
      return null;
    }
    return <SummaryList rows={rows} footer={footer} />;
  }

  // Historical — sparser, with the curated note shown above the fact list.
  const h = props;
  const rows: { label: string; value: React.ReactNode }[] = [];
  if (h.region) rows.push({ label: "Region", value: h.region });
  // Who governed this territory at the era's date — real information the dataset
  // carries on every feature and the app used to discard.
  if (h.ruledBy) rows.push({ label: "Ruled by", value: h.ruledBy });
  // Never present a schematic boundary as if it were sourced — the map draws these
  // dashed, and the fact sheet says why.
  if (h.approximateExtent)
    rows.push({
      label: "Borders",
      value: "Approximate — drawn along modern administrative boundaries",
    });
  // A known anachronism in the source data. Disclosing it is the honest alternative to
  // inventing the correct borders — the same discipline as "a missing flag beats a wrong one".
  if (h.datingCaveat)
    rows.push({
      label: "Dating",
      value: `${h.datingCaveat.issue} ${h.datingCaveat.actual}`,
    });
  if (typeof h.population === "number")
    rows.push({ label: "Population", value: formatHistoricalPop(h.population) });

  return (
    <>
      {h.note && <p className="entity-summary__note">{h.note}</p>}
      <SummaryList rows={rows} />
    </>
  );
}

function SummaryList({
  rows,
  footer,
}: {
  rows: { label: string; value: React.ReactNode }[];
  footer?: React.ReactNode;
}) {
  if (rows.length === 0 && !footer) return null;

  // The footer (e.g. the Anthem row) renders INSIDE the same <dl> so it aligns
  // with the fact rows — same label column + value column, no separate box.
  return (
    <dl className="entity-summary">
      {rows.map((r) => (
        <div className="entity-summary__row" key={r.label}>
          <dt className="entity-summary__label">{r.label}</dt>
          <dd className="entity-summary__value">{r.value}</dd>
        </div>
      ))}
      {footer}
    </dl>
  );
}
