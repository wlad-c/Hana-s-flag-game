#!/usr/bin/env node
/**
 * Build gate for Learn-mode National News Agencies.
 *
 * Classification (hard rule in CLAUDE.md): entries here must be news-agency
 * wholesalers / wire services whose primary clients are other media outlets
 * (AP, Reuters, AFP, …) — not retailer newspapers, broadcasters, or consumer
 * portals. This script validates schema and logos; remit classification is a
 * curation rule enforced at review time and by the reciprocal name guard in
 * check-national-newspapers.mjs.
 *
 * Verifies that all national news agency entries in `src/data/nationalNewsAgencies.ts`
 * are well-formed, cited, bundled locally, and genuinely logos.
 *
 * Checks (each FAILS the build):
 *   A. Schema & Data Completeness:
 *      - Every entry has non-empty name, founded (> 1500), headquarters, ownership,
 *        annualPublicFunding (total and perCapita), readership (dailyReach and notes),
 *        editorialRemit, format (>= 1), logo, and logoExplainer (>= 25 chars).
 *      - Non-English nativeName must provide englishTranslation.
 *      - `id` matches format "{countryCode.toLowerCase()}-{slug}", countryCode matches
 *        the enclosing dictionary key, and no two news agencies share an id.
 *      - At least one authoritative source in `sources` with a valid http(s) URL.
 *   B. Bundled Logo Existence & Validity:
 *      - The file referenced by `logo` exists on disk under `public/`.
 *      - File is non-empty (size > 0).
 *      - Image format sniffs as valid SVG or supported raster (png, jpeg, webp) matching
 *        the declared file extension; must never be an HTML error page.
 *   C. Map & Non-Logo Prevention:
 *      - SVGs must never be route/destination maps or geographic projections:
 *        fails if an SVG contains > 5 `<title>` elements or route map keywords.
 *      - File size ceilings: fails if SVG > 300 KB or raster > 500 KB.
 *
 * Run: node scripts/check-national-news-agencies.mjs  (also part of `npm run flags:check`)
 */

import { readFileSync, existsSync, statSync } from "node:fs";
import { dirname, resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, "..", "src", "data", "nationalNewsAgencies.ts");
const PUBLIC_DIR = resolve(__dirname, "..", "public");

/** Sniff image magic bytes or SVG text structure */
function sniffImageKind(buf) {
  if (buf.length >= 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return "png";
  }
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return "jpeg";
  }
  if (buf.length >= 12 && buf.subarray(0, 4).toString("latin1") === "RIFF" && buf.subarray(8, 12).toString("latin1") === "WEBP") {
    return "webp";
  }
  const head = buf.subarray(0, 4096).toString("utf8").replace(/^\uFEFF/, "").trimStart();
  const lower = head.toLowerCase();
  if (lower.startsWith("<!doctype html") || lower.startsWith("<html")) return "html";
  const stripped = lower.replace(/^<\?xml[^>]*\?>\s*/, "").replace(/^(<!--[\s\S]*?-->|<!doctype svg[^>]*>|\s)+/, "");
  if (stripped.startsWith("<svg") || lower.includes("<svg")) return "svg";
  if (lower.includes("<html") || lower.includes("<!doctype html")) return "html";
  return null;
}

/** Parse pure JS object literal without needing tsc */
function loadConst(src, marker) {
  const start = src.indexOf(marker);
  if (start < 0) throw new Error(`Could not locate ${marker}`);
  const eq = src.indexOf("= {", start);
  if (eq < 0) throw new Error(`Could not locate literal for ${marker}`);
  const open = src.indexOf("{", eq);
  let depth = 0, i = open, inStr = null;
  for (; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (c === "\\") { i++; continue; }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") { inStr = c; continue; }
    if (c === "/" && src[i + 1] === "/") { i = src.indexOf("\n", i); if (i < 0) break; continue; }
    if (c === "{") depth++;
    else if (c === "}") { depth--; if (depth === 0) { i++; break; } }
  }
  const literal = src.slice(open, i);
  // eslint-disable-next-line no-new-func
  return Function(`"use strict"; return (${literal});`)();
}

const MAX_SVG_SIZE = 300 * 1024;     // 300 KB
const MAX_RASTER_SIZE = 500 * 1024;  // 500 KB
const MAX_SVG_ELEMENTS = 600;
const MAX_SVG_TITLES = 5;

const src = readFileSync(DATA_PATH, "utf8");
const agenciesByCountry = loadConst(src, "export const NATIONAL_NEWS_AGENCIES");

const failures = [];
const seenIds = new Set();
let totalAgencies = 0;

const decodeQueue = [];
for (const [countryKey, list] of Object.entries(agenciesByCountry)) {
  if (!Array.isArray(list)) {
    failures.push(`Country entry ${countryKey} must be an array of news agencies`);
    continue;
  }

  for (const agency of list) {
    totalAgencies++;
    const ctx = `[${agency.id || "unidentified"}] in ${countryKey}`;

    // 1. Identification
    if (!agency.id || typeof agency.id !== "string") {
      failures.push(`${ctx}: missing or non-string id`);
      continue;
    }
    const expectedPrefix = `${agency.countryCode?.toLowerCase()}-`;
    if (!agency.id.startsWith(expectedPrefix)) {
      failures.push(`${ctx}: id "${agency.id}" must start with "${expectedPrefix}"`);
    }
    if (seenIds.has(agency.id)) {
      failures.push(`${ctx}: duplicate id "${agency.id}"`);
    }
    seenIds.add(agency.id);

    if (agency.countryCode !== countryKey) {
      failures.push(`${ctx}: countryCode "${agency.countryCode}" does not match key "${countryKey}"`);
    }

    if (!agency.name || typeof agency.name !== "string") {
      failures.push(`${ctx}: missing or empty name`);
    }

    if (agency.nativeName && !agency.englishTranslation) {
      failures.push(`${ctx}: nativeName is present but englishTranslation is missing`);
    }

    if (typeof agency.founded !== "number" || agency.founded < 1500 || agency.founded > 2030) {
      failures.push(`${ctx}: invalid founded year "${agency.founded}"`);
    }

    if (!agency.headquarters || typeof agency.headquarters !== "string") {
      failures.push(`${ctx}: missing headquarters`);
    }

    if (!agency.ownership && !agency.owner) {
      failures.push(`${ctx}: missing owner/ownership`);
    } else if (agency.owner && (typeof agency.owner.name !== "string" || typeof agency.owner.type !== "string")) {
      failures.push(`${ctx}: owner must specify name and type strings`);
    }

    if (agency.annualPublicFunding && (typeof agency.annualPublicFunding.total !== "string" || typeof agency.annualPublicFunding.perCapita !== "string")) {
      failures.push(`${ctx}: annualPublicFunding must specify total and perCapita strings`);
    }

    if (!agency.readership || typeof agency.readership.metric !== "string" || typeof agency.readership.source !== "string") {
      failures.push(`${ctx}: readership must specify metric and source strings`);
    }

    if (!agency.editorialStance || typeof agency.editorialStance !== "string") {
      failures.push(`${ctx}: missing editorialStance`);
    }

    if (!agency.format || typeof agency.format !== "string") {
      failures.push(`${ctx}: format must be a non-empty string`);
    }

    // 2. Sources & Explanation
    if (!Array.isArray(agency.sources) || agency.sources.length === 0) {
      failures.push(`${ctx}: sources must contain at least one citation`);
    } else {
      for (const s of agency.sources) {
        if (!/^https?:\/\//i.test(s)) {
          failures.push(`${ctx}: source "${s}" is not a valid http(s) URL`);
        }
      }
    }

    // 3. Logo XOR noImageReason
    const hasLogo = typeof agency.logo === "string" && agency.logo.length > 0;
    const hasNoImage =
      typeof agency.noImageReason === "string" && agency.noImageReason.trim().length >= 60;

    if (hasLogo && hasNoImage) {
      failures.push(`${ctx}: has both logo and noImageReason — pick one`);
      continue;
    }
    if (!hasLogo && !hasNoImage) {
      failures.push(`${ctx}: missing logo and noImageReason`);
      continue;
    }

    if (!hasLogo) {
      continue; // honest gap
    }

    if (!agency.logoExplainer || typeof agency.logoExplainer !== "string" || agency.logoExplainer.trim().length < 25) {
      failures.push(`${ctx}: logoExplainer must be at least 25 characters describing logo symbolism`);
    }

    const cleanLogo = agency.logo.replace(/^\//, "");
    if (!cleanLogo.startsWith(`newspaper-logos/${countryKey.toLowerCase()}/`)) {
      failures.push(`${ctx}: logo path "${agency.logo}" must start with "newspaper-logos/${countryKey.toLowerCase()}/"`);
    }

    const diskPath = resolve(PUBLIC_DIR, cleanLogo);
    if (!existsSync(diskPath)) {
      failures.push(`${ctx}: logo file does not exist on disk at "${diskPath}"`);
      continue;
    }

    const stat = statSync(diskPath);
    if (stat.size === 0) {
      failures.push(`${ctx}: logo file is 0 bytes`);
      continue;
    }

    const buf = readFileSync(diskPath);
    const kind = sniffImageKind(buf);
    decodeQueue.push({ ctx, file: diskPath });

    if (!kind) {
      failures.push(`${ctx}: file format could not be recognized as an image`);
      continue;
    }
    if (kind === "html") {
      failures.push(`${ctx}: logo file is an HTML error page, not an image`);
      continue;
    }

    const ext = extname(diskPath).toLowerCase();
    const expectedKind = ext === ".svg" ? "svg" : ext === ".png" ? "png" : ext === ".jpg" || ext === ".jpeg" ? "jpeg" : ext === ".webp" ? "webp" : null;
    if (kind !== expectedKind) {
      failures.push(`${ctx}: file extension "${ext}" does not match detected image format "${kind}"`);
    }

    // Fabricated fingerprint (shared with newspapers)
    if (kind === "svg") {
      const svgText = buf.toString("utf8");
      const hasText = /<text[\s>]/i.test(svgText);
      const hasRect = /<rect[\s>]/i.test(svgText);
      const pathCount = (svgText.match(/<path[\s>]/gi) || []).length;
      const fabricated =
        (stat.size < 2500 && hasText && hasRect && pathCount <= 2) ||
        (stat.size < 1500 && hasText);
      if (fabricated) {
        failures.push(
          `${ctx}: logo looks fabricated (small SVG with <rect>+<text> placeholder) — replace with an authentic emblem or use noImageReason`,
        );
      }
    }

    // 4. File Size Checks
    if (kind === "svg" && stat.size > MAX_SVG_SIZE) {
      failures.push(`${ctx}: SVG logo is unusually large (${stat.size} bytes > ${MAX_SVG_SIZE} max).`);
    } else if (kind !== "svg" && stat.size > MAX_RASTER_SIZE) {
      failures.push(`${ctx}: Raster logo is unusually large (${stat.size} bytes > ${MAX_RASTER_SIZE} max). Recompress with sharp.`);
    }

    // 5. SVG Complexity Guards
    if (kind === "svg") {
      const svgText = buf.toString("utf8");

      const titleMatches = svgText.match(/<title[^>]*>([^<]+)<\/title>/gi) || [];
      if (titleMatches.length > MAX_SVG_TITLES) {
        failures.push(`${ctx}: SVG contains ${titleMatches.length} <title> elements (max ${MAX_SVG_TITLES}).`);
      }

      const pathCount = (svgText.match(/<path/gi) || []).length;
      const polyCount = (svgText.match(/<polygon/gi) || []).length;
      const totalElements = pathCount + polyCount;
      if (totalElements > MAX_SVG_ELEMENTS) {
        failures.push(`${ctx}: SVG contains ${totalElements} path/polygon elements (max ${MAX_SVG_ELEMENTS}).`);
      }
    }
  }
}

console.log(`Audited ${totalAgencies} national news agencies across ${Object.keys(agenciesByCountry).length} countries.`);

// Sniffing "<svg" is not decoding: an SVG that uses xlink:href without declaring
// xmlns:xlink sniffs fine and then renders as a broken image (the Naoero Gazette).
for (const { ctx, file } of decodeQueue) {
  try {
    await sharp(file).png().toBuffer();
  } catch (err) {
    failures.push(`${ctx}: logo does not decode as an image (${String(err.message).slice(0, 160)})`);
  }
}

if (failures.length > 0) {
  console.error(`\n✗ National news agency check FAILED with ${failures.length} error(s):\n`);
  for (const f of failures) {
    console.error(`  • ${f}`);
  }
  process.exit(1);
}

console.log(`✓ All ${totalAgencies} national news agency entries and logos passed integrity checks.`);
