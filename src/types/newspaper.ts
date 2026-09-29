/**
 * Schema for national newspapers in Learn mode.
 * Sourced definitions live in `src/data/nationalNewspapers.ts`.
 */

export type Newspaper = {
  /** Stable unique identifier (e.g. "ar-clarin", "au-smh") */
  readonly id: string;
  /** ISO 3166-1 alpha-2 country code (e.g. "AR", "AU") */
  readonly countryCode: string;
  /** Common name of the newspaper shown as the title */
  readonly name: string;
  /** Full formal or corporate legal name */
  readonly officialName?: string;
  /** Native-language name when different from English or common name */
  readonly nativeName?: string;
  /** English translation of the native or official name */
  readonly englishTranslation?: string;
  /** Institutional motto or editorial slogan */
  readonly motto?: {
    readonly original: string;
    readonly translation?: string;
  };
  /** Year the newspaper was founded — omitted when no source dates it */
  readonly founded?: number;
  /** Frequency / distribution cycle (e.g. "Daily broadsheet newspaper") */
  readonly frequency: string;
  /** Output formats and print editions (e.g. Broadsheet, Tabloid, Berliner, Digital) */
  readonly format: string;
  /** Primary reporting and publication languages */
  readonly language: string;
  /** City and state/province/territory of main headquarters */
  readonly headquarters: string;
  /** Ownership entity and organizational governance type */
  readonly owner: {
    readonly name: string;
    readonly type: string;
  };
  /** Editorial stance and remit */
  readonly editorialStance: string;
  /** Comparable circulation and digital reach metrics — omitted when unsourced */
  readonly readership?: {
    readonly metric: string;
    readonly source: string;
  };
  /** Comparable public funding figures (if any) */
  readonly annualPublicFunding?: {
    readonly total: string;
    readonly perCapita: string;
  };
  /** Revenue model and funding streams */
  readonly revenueModel: string;
  /** Bundled logo path relative to public root (e.g. "newspaper-logos/ar/clarin.svg").
   *  Absent only when paired with `noImageReason`. */
  readonly logo?: string;
  /** Sourced explanation of the logo design, typography, and heritage.
   *  Required when `logo` is set. */
  readonly logoExplainer?: string;
  /** Documented reason no freely-citable authentic masthead could be sourced —
   *  used instead of `logo`/`logoExplainer`. A fabricated placeholder is never
   *  an acceptable substitute; missing is honest. */
  readonly noImageReason?: string;
  /** Authoritative institutional sources and citations */
  readonly sources: readonly string[];
  /** Educational reference / trademark licence note */
  readonly licenceNote?: string;
};
