#!/usr/bin/env node
/**
 * Build gate for the Learn-mode "Political parties" grid view.
 *
 * Mirrors the sourcing/bundling discipline `check-national-flags.mjs` and
 * `check-flag-meanings.mjs` apply to every other symbol in this game — see
 * CLAUDE.md-style rules documented at the top of `src/data/politicalParties.ts`.
 *
 * Checks (each FAILS the build):
 *   A. Every party has a non-empty name, ideology data, a chamber name, and
 *      seats <= seatsTotal (both non-negative). `founded` and `logo` are
 *      SHOULDs, not MUSTs — see the notes on each below.
 *   B. At least one authoritative `sources` citation with a real http(s) URL.
 *   C. A bundled logo file exists on disk and its sha256 matches the recorded
 *      one; a logo not sourced from commons.wikimedia.org carries a
 *      `licenceNote` of at least 40 characters (same threshold as the
 *      football-crest / national-flag non-free-image rule). A party with no
 *      `logo` must carry a `noImageReason` instead — never both, never neither —
 *      and that reason must name at least two of the source families it swept.
 *   D. `id` is "{country}-{...}" matching the party's own `country` field, and
 *      no two parties share an id.
 *   E. `coalitionId`, when present, resolves to a real `POLITICAL_COALITIONS`
 *      entry; every coalition's `memberPartyIds` all resolve to real parties
 *      and its own `source` is well-formed.
 *   F. `logoMeaning`, when present, is structurally sound (non-empty
 *      description, ≥1 valid source, well-formed myths) — the same floor
 *      `check-flag-meanings.mjs` applies to every other symbol meaning.
 *
 * This is a SAFETY NET, not a substitute for verifying each claim against its
 * cited source by hand — it cannot tell a sourced fact from a fabrication.
 *
 * Run: node scripts/check-political-parties.mjs   (also part of `npm run flags:check`)
 */

import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { findUserFacingLeaks } from "./lib/userFacingCopy.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, "..", "src", "data", "politicalParties.ts");
const PUBLIC_DIR = resolve(__dirname, "..", "public");

// ── Load the two exported data objects without invoking tsc ────────────────
// Same brace-matching-then-eval technique as check-flag-meanings.mjs: the
// object literal after `= {` is pure data, no TS-specific syntax inside.
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

/** Magic-number sniff: what kind of image (if any) are these bytes? */
const SUFFIX_KIND = { ".svg": "svg", ".png": "png", ".jpg": "jpeg", ".jpeg": "jpeg", ".gif": "gif", ".webp": "webp" };
function imageKind(buf) {
  if (buf.length >= 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "png";
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpeg";
  if (buf.length >= 6 && buf.subarray(0, 6).toString("latin1").startsWith("GIF8")) return "gif";
  if (buf.length >= 12 && buf.subarray(0, 4).toString("latin1") === "RIFF" && buf.subarray(8, 12).toString("latin1") === "WEBP") return "webp";
  // Text formats: look past a BOM, whitespace, an XML declaration and any comments.
  const head = buf.subarray(0, 4096).toString("utf8").replace(/^\uFEFF/, "").trimStart();
  const lower = head.toLowerCase();
  if (lower.startsWith("<!doctype html") || lower.startsWith("<html")) return "html";
  const stripped = lower.replace(/^<\?xml[^>]*\?>\s*/, "").replace(/^(<!--[\s\S]*?-->|<!doctype svg[^>]*>|\s)+/, "");
  if (stripped.startsWith("<svg")) return "svg";
  if (lower.includes("<svg")) return "svg";
  if (lower.includes("<html") || lower.includes("<!doctype html")) return "html";
  return null;
}

const src = readFileSync(DATA_PATH, "utf8");
const coalitions = loadConst(src, "export const POLITICAL_COALITIONS");
const partiesByCountry = loadConst(src, "export const POLITICAL_PARTIES");
const LEG_PATH = resolve(__dirname, "..", "src", "data", "partyLegislatures.ts");
const legislatures = loadConst(readFileSync(LEG_PATH, "utf8"), "export const PARTY_LEGISLATURES");

// A party SHOULD have a bundled logo, but a logo is not a hard requirement for
// the entry to exist (owner direction, 2026-09-12). The rule that was here
// before — "any party added after 2026-09-08 must have a bundled logo" — was
// keeping REAL, SEATED parties out of the dataset entirely whenever no
// freely-licensable image could be found: Chile's FREVS, Venezuela's Vamos
// Vamos Cojedes, Guyana's Forward Guyana Movement and a dozen others. A party
// the reader cannot see at all is a worse outcome than a party shown without
// its emblem, so the requirement is now on the RESEARCH, not on the image.
//
// `noImageReason` is therefore allowed on any party — but it must record what
// was actually searched, so "not found" can be audited and re-tried later. The
// reason must be at least MIN_NO_IMAGE_REASON_CHARS long and must name at
// least MIN_NO_IMAGE_SOURCES of the source families below. That list is the
// search surface this repository expects to have been swept, and it is wider
// than Wikimedia: the regional *Elects* network (EuropeElects, AsiaElects,
// AfricaElects, OceaniaElects, LatamElects, …) and the parties' own websites
// carry emblems for small and new parties that Commons has never held.
const NO_IMAGE_SOURCE_FAMILIES = [
  { name: "Wikimedia Commons", re: /\bcommons\b/i },
  { name: "Wikipedia (any language)", re: /\bwikipedi|\bwikidata\b/i },
  { name: "the party's own website", re: /\bparty (?:web)?site|\bofficial (?:web)?site|\bparty['’]s own|\bparty sources?\b|\bwebsite\b/i },
  { name: "the Elects network (EuropeElects / AsiaElects / AfricaElects / OceaniaElects / LatamElects)", re: /\belects\b/i },
  { name: "an electoral commission or government register", re: /\belectoral\b|\bcommission\b|\bgovernment\b|\bregistr/i },
  { name: "Flags of the World / a vexillological or heraldic reference", re: /\bfotw\b|flags of the world|\bheraldic\b|\bvexill/i },
  { name: "news archives / the Wayback Machine", re: /\barchive|\bwayback\b|\bnews\b|\bpress\b/i },
  { name: "social media accounts the party itself runs", re: /\bsocial media\b|\bfacebook\b|\binstagram\b|\bx\.com\b|\btwitter\b/i },
];
const MIN_NO_IMAGE_REASON_CHARS = 60;
const MIN_NO_IMAGE_SOURCES = 2;

const isHttpUrl = (u) => {
  if (typeof u !== "string") return false;
  try {
    const p = new URL(u);
    return p.protocol === "http:" || p.protocol === "https:";
  } catch {
    return false;
  }
};
const nonEmpty = (s) => typeof s === "string" && s.trim().length > 0;
const VALID_POSITIONS = new Set([
  "far-left", "left", "centre-left", "centre", "centre-right", "right", "far-right", "other",
]);
const SINGLETON_POSITION_LABELS = {
  "far-left": "far-left", "left-wing": "left", "left": "left", "centre-left": "centre-left",
  "centre": "centre", "centrist": "centre", "centre-right": "centre-right",
  "right-wing": "right", "right": "right", "far-right": "far-right",
};

const problems = [];
const fail = (id, msg) => problems.push(`[${id}] ${msg}`);

function checkSources(id, sources, where) {
  if (!Array.isArray(sources) || sources.length === 0) {
    fail(id, `${where}: no sources — every fact here must cite ≥1 authoritative source`);
    return;
  }
  sources.forEach((s, i) => {
    if (!s || !nonEmpty(s.title)) fail(id, `${where}: source ${i} has an empty title`);
    if (!s || !isHttpUrl(s.url)) fail(id, `${where}: source ${i} has an invalid url ${JSON.stringify(s?.url)}`);
  });
}

function checkMeaning(id, m, where) {
  if (m === undefined) return;
  if (!nonEmpty(m.description)) fail(id, `${where}: logoMeaning has an empty description`);
  checkSources(id, m.sources, `${where}.logoMeaning`);
  if (m.myths !== undefined) {
    if (!Array.isArray(m.myths)) {
      fail(id, `${where}: logoMeaning.myths must be an array when present`);
    } else {
      m.myths.forEach((myth, i) => {
        if (!myth || !nonEmpty(myth.claim)) fail(id, `${where}: myth ${i} has an empty claim`);
        if (!myth || !nonEmpty(myth.reality)) fail(id, `${where}: myth ${i} has an empty reality`);
      });
    }
  }
}

const allPartyIds = new Set();
let partyCount = 0;

for (const [country, parties] of Object.entries(partiesByCountry)) {
  if (!Array.isArray(parties)) {
    fail(country, "POLITICAL_PARTIES entry is not an array");
    continue;
  }
  for (const p of parties) {
    partyCount++;
    const id = p?.id ?? `${country}:<unnamed>`;

    // D. id shape + uniqueness
    if (!nonEmpty(p.id) || !p.id.startsWith(`${country}-`)) {
      fail(id, `id must start with "${country}-" (its own country field)`);
    }
    if (allPartyIds.has(p.id)) fail(id, "duplicate party id");
    allPartyIds.add(p.id);
    if (p.country !== country) fail(id, `country field "${p.country}" does not match its POLITICAL_PARTIES key "${country}"`);

    // A. core facts
    if (!nonEmpty(p.name)) fail(id, "empty/missing name");
    if (!nonEmpty(p.shortName)) fail(id, "empty/missing shortName");
    if (!Array.isArray(p.ideology)) fail(id, "ideology must be an array (may be empty only if positionRaw/ideologyPosition still given)");
    if (!VALID_POSITIONS.has(p.ideologyPosition)) fail(id, `invalid ideologyPosition ${JSON.stringify(p.ideologyPosition)}`);
    // The grid groups on ideologyPosition while the panel shows positionRaw, so
    // a single-category label must group under that same category. Ranges
    // ("Centre to centre-right") are a judgement and are not checked.
    const singleton = SINGLETON_POSITION_LABELS[String(p.positionRaw ?? "").trim().toLowerCase()];
    if (singleton && singleton !== p.ideologyPosition) {
      fail(id, `positionRaw ${JSON.stringify(p.positionRaw)} groups as ${JSON.stringify(p.ideologyPosition)}, expected ${JSON.stringify(singleton)}`);
    }
    // `founded` is a SHOULD, not a MUST, for the same reason `logo` is: requiring
    // it kept real, seated parties out of the dataset entirely (Thailand's New
    // Dimension and Thai Sub Thawee, Colombia's Partido Demócrata, Bolivia's Bia
    // Yuqui) purely because no source dates them. A party with no sourceable
    // founding year is shown without one; a party shown not at all is a hole.
    // When it IS present it must still be plausible.
    if (p.founded !== undefined && (!Number.isInteger(p.founded) || p.founded < 1700 || p.founded > new Date().getFullYear())) {
      fail(id, `implausible founded year ${JSON.stringify(p.founded)}`);
    }
    if (!nonEmpty(p.chamberName)) fail(id, "empty/missing chamberName");
    if (!Number.isInteger(p.seats) || p.seats < 0) fail(id, `invalid seats ${JSON.stringify(p.seats)}`);
    if (!Number.isInteger(p.seatsTotal) || p.seatsTotal <= 0) fail(id, `invalid seatsTotal ${JSON.stringify(p.seatsTotal)}`);
    if (Number.isInteger(p.seats) && Number.isInteger(p.seatsTotal) && p.seats > p.seatsTotal) {
      fail(id, `seats (${p.seats}) exceeds seatsTotal (${p.seatsTotal})`);
    }
    if (typeof p.inPower !== "boolean") fail(id, "inPower must be a boolean");
    if (p.inExecutive !== undefined && typeof p.inExecutive !== "boolean") {
      fail(id, "inExecutive must be a boolean when present");
    }
    if (p.headOfGovernment !== undefined && typeof p.headOfGovernment !== "boolean") {
      fail(id, "headOfGovernment must be a boolean when present");
    }
    if (p.chambers !== undefined) {
      if (!Array.isArray(p.chambers) || p.chambers.length === 0) {
        fail(id, "chambers must be a non-empty array when present");
      } else {
        const names = new Set();
        for (const c of p.chambers) {
          if (!nonEmpty(c.name)) fail(id, "chambers entry missing name");
          if (names.has(c.name)) fail(id, `duplicate chambers name ${JSON.stringify(c.name)}`);
          names.add(c.name);
          if (!Number.isInteger(c.seats) || c.seats < 0) fail(id, `invalid chambers.seats for ${c.name}`);
          if (!Number.isInteger(c.seatsTotal) || c.seatsTotal <= 0) fail(id, `invalid chambers.seatsTotal for ${c.name}`);
          if (c.seats > c.seatsTotal) fail(id, `chambers ${c.name}: seats exceed seatsTotal`);
          if (c.majority !== undefined && typeof c.majority !== "boolean") {
            fail(id, `chambers ${c.name}: majority must be a boolean when present`);
          }
          if (c.majority === true && 2 * c.seats <= c.seatsTotal) {
            fail(id, `chambers ${c.name}: majority is true but ${c.seats}/${c.seatsTotal} is not more than half the seats`);
          }
          if (c.name === p.chamberName && (c.seats !== p.seats || c.seatsTotal !== p.seatsTotal)) {
            fail(id, `chambers entry for ${c.name} must repeat the party's seats/seatsTotal`);
          }
          const leg = legislatures[p.country];
          if (leg) {
            const body = (leg.bodies ?? []).find((b) => b.name === c.name);
            if (!body) fail(id, `chambers ${JSON.stringify(c.name)} is not a body in PARTY_LEGISLATURES.${p.country}`);
            else if (body.seatsTotal !== c.seatsTotal) {
              fail(id, `chambers ${c.name} seatsTotal ${c.seatsTotal} != catalog ${body.seatsTotal}`);
            }
          }
        }
        if (!names.has(p.chamberName)) {
          fail(id, `chambers must include the primary chamber ${JSON.stringify(p.chamberName)}`);
        }
      }
    }

    // B. sources
    checkSources(id, p.sources, "party");

    // C. logo bundling
    const hasLogo = p.logo !== undefined;
    const hasReason = nonEmpty(p.noImageReason);

    if (hasLogo && hasReason) fail(id, "has both a logo and a noImageReason — pick one");
    if (!hasLogo && !hasReason) fail(id, "has neither a logo nor a noImageReason");

    // A logo is a SHOULD, not a MUST. What is required instead is that the
    // omission record the search that failed, so it can be audited and re-tried.
    if (hasReason) {
      const reason = p.noImageReason.trim();
      if (reason.length < MIN_NO_IMAGE_REASON_CHARS) {
        fail(id, `noImageReason is only ${reason.length} characters — it must record what was searched (min ${MIN_NO_IMAGE_REASON_CHARS})`);
      }
      for (const leak of findUserFacingLeaks(reason)) {
        fail(
          id,
          `noImageReason leaks ${leak.label} (matched ${JSON.stringify(leak.match)}) — write plain-language gap copy; put Q/P codes and URLs in sources[]`,
        );
      }
      const matched = NO_IMAGE_SOURCE_FAMILIES.filter((f) => f.re.test(reason));
      if (matched.length < MIN_NO_IMAGE_SOURCES) {
        fail(
          id,
          `noImageReason names ${matched.length} searched source(s); at least ${MIN_NO_IMAGE_SOURCES} are required. ` +
            `Sweep and then name them in plain language (e.g. "Wikidata", not "P154"), e.g.: ${NO_IMAGE_SOURCE_FAMILIES.map((f) => f.name).join("; ")}`,
        );
      }
    }

    if (hasLogo) {
      const abs = resolve(PUBLIC_DIR, p.logo);
      if (!existsSync(abs)) {
        fail(id, `logo "${p.logo}" is not bundled under public/`);
      } else {
        const bytes = readFileSync(abs);
        if (!nonEmpty(p.sha256)) {
          fail(id, "logo is bundled but no sha256 was recorded");
        } else {
          const digest = createHash("sha256").update(bytes).digest("hex");
          if (digest !== p.sha256) fail(id, `logo "${p.logo}" does not match its recorded sha256 (file changed after fetch)`);
        }
        // A bundled logo must actually BE an image. Shipped 2026-09-12: 101
        // party logos across 33 countries were Wikimedia "page not found" HTML
        // saved under an .svg extension, because the recorded logoSourceUrl
        // named a Commons file that does not exist and the fetch wrote the 404
        // body to disk. Every one of those cards rendered as a broken image in
        // production, and nothing caught it: the bytes hashed fine, the path
        // existed, and the citation looked plausible. A sha256 proves a file
        // has not CHANGED; it cannot prove it was ever right.
        const kind = imageKind(bytes);
        if (kind === "html") {
          fail(id, `logo "${p.logo}" is an HTML page, not an image — almost certainly a saved Wikimedia error page. Re-source it from the party's own article and re-download, or drop the logo and write a noImageReason`);
        } else if (kind === null) {
          fail(id, `logo "${p.logo}" is not a recognisable image (expected SVG, PNG, JPEG, GIF or WebP bytes)`);
        } else if (SUFFIX_KIND[extname(p.logo).toLowerCase()] && SUFFIX_KIND[extname(p.logo).toLowerCase()] !== kind) {
          fail(id, `logo "${p.logo}" is ${kind} data under a ${extname(p.logo)} extension — the browser picks the decoder from the bytes, but a mismatch means the file is not what the entry claims`);
        }
      }
      // A Commons file is referenced either via its wiki page (commons.wikimedia.org)
      // or via the shared media CDN's /wikipedia/commons/ path; anything else —
      // notably /wikipedia/en/ (or any other single-project code) — is that
      // project's own LOCAL, non-free upload and needs a licenceNote.
      const fromCommons =
        typeof p.logoSourceUrl === "string" &&
        (p.logoSourceUrl.includes("commons.wikimedia.org") ||
          p.logoSourceUrl.includes("/wikipedia/commons/"));
      if (!fromCommons && (p.licenceNote ?? "").trim().length < 40) {
        fail(id, "logo is not from commons.wikimedia.org and has no (or too short a) licenceNote stating its copyright position");
      }
    }

    // E. coalition reference
    if (p.coalitionId !== undefined) {
      if (!coalitions[p.coalitionId]) fail(id, `coalitionId "${p.coalitionId}" has no matching POLITICAL_COALITIONS entry`);
    }

    // F. logo meaning
    checkMeaning(id, p.logoMeaning, "party");
  }
}

for (const [country, list] of Object.entries(partiesByCountry)) {
  const hogs = list.filter((p) => p.headOfGovernment === true).map((p) => p.id);
  if (hogs.length > 1) {
    fail(country, `headOfGovernment is true on ${hogs.length} parties (${hogs.join(", ")}); at most one party may supply the head of government`);
  }
  const majorityByChamber = new Map();
  for (const p of list) {
    for (const c of p.chambers ?? []) {
      if (c.majority !== true) continue;
      const key = c.name;
      const prev = majorityByChamber.get(key);
      if (prev) {
        fail(country, `majority in ${JSON.stringify(key)} is set on both ${prev} and ${p.id} — at most one party per chamber`);
      }
      majorityByChamber.set(key, p.id);
    }
  }
}

for (const [cc, leg] of Object.entries(legislatures)) {
  if (!nonEmpty(leg.confidenceHouse)) fail(cc, "PARTY_LEGISLATURES.confidenceHouse missing");
  if (!Array.isArray(leg.bodies) || leg.bodies.length < 2) {
    fail(cc, "PARTY_LEGISLATURES.bodies must list at least two chambers");
  }
  if (!nonEmpty(leg.note) || leg.note.length < 40) {
    fail(cc, "PARTY_LEGISLATURES.note must explain how the houses relate (min 40 chars)");
  }
  if (!nonEmpty(leg.source?.title) || !/^https?:\/\//.test(leg.source?.url ?? "")) {
    fail(cc, "PARTY_LEGISLATURES.source must have a title and http(s) url");
  }
  const shorts = new Set();
  for (const b of leg.bodies ?? []) {
    if (!nonEmpty(b.name) || !nonEmpty(b.shortName)) fail(cc, "legislature body missing name/shortName");
    if (!Number.isInteger(b.seatsTotal) || b.seatsTotal <= 0) fail(cc, `invalid seatsTotal on ${b.name}`);
    if (shorts.has(b.shortName)) fail(cc, `duplicate legislature shortName ${b.shortName}`);
    shorts.add(b.shortName);
  }
}

for (const [cid, c] of Object.entries(coalitions)) {
  if (!nonEmpty(c.name)) fail(cid, "coalition has an empty/missing name");
  if (!Array.isArray(c.memberPartyIds) || c.memberPartyIds.length === 0) {
    fail(cid, "coalition has no memberPartyIds");
  } else {
    for (const mid of c.memberPartyIds) {
      if (!allPartyIds.has(mid)) fail(cid, `memberPartyIds references unknown party id "${mid}"`);
    }
  }
  checkSources(cid, [c.source].filter(Boolean), "coalition");
}

// Grid cards must never use a chamber abbreviation as the main name (Canada's
// Liberals are "Liberal Party of Canada", not "LIB"). Mirrors partyCardName()
// in src/lib/politicalParties.ts — keep the two in lockstep.
function isPartyNameAbbreviation(label) {
  const trimmed = (label ?? "").trim();
  if (!trimmed) return true;
  if (/\s/u.test(trimmed) && /\p{Ll}/u.test(trimmed)) return false;
  const letters = [...trimmed].filter((ch) => /\p{L}/u.test(ch));
  if (letters.length === 0) return true;
  const lower = letters.filter((ch) => /\p{Ll}/u.test(ch)).length;
  const upper = letters.filter((ch) => /\p{Lu}/u.test(ch)).length;
  if (lower === 0) return true;
  if (letters.length <= 5 && upper >= lower) return true;
  return false;
}

function partyCardName(p) {
  const native = String(p.name ?? "").trim();
  const en = (p.nameEn && String(p.nameEn).trim()) || "";
  if (native && en && en !== native) return `${native} (${en})`;
  return native || en || String(p.shortName ?? "").trim();
}

for (const list of Object.values(partiesByCountry)) {
  for (const p of list) {
    const card = partyCardName(p);
    const official = String(p.name ?? "").trim();
    // Fail when a readable official name exists and the card still shows
    // an abbreviation (LIB instead of Liberal Party of Canada).
    if (isPartyNameAbbreviation(card) && !isPartyNameAbbreviation(official)) {
      fail(p.id, `grid card name ${JSON.stringify(card)} is still an abbreviation; shortName=${JSON.stringify(p.shortName)} name=${JSON.stringify(p.name)} nameEn=${JSON.stringify(p.nameEn)}`);
    }
  }
}

const liberal = (partiesByCountry.CA ?? []).find((p) => p.id === "CA-LIB");
if (!liberal) {
  fail("CA-LIB", "Canada's Liberal Party is missing from the dataset");
} else if (partyCardName(liberal) !== "Liberal Party of Canada") {
  fail("CA-LIB", `grid card name must be the official local name "Liberal Party of Canada", got ${JSON.stringify(partyCardName(liberal))}`);
}

if (problems.length > 0) {
  console.error(`\n❌ Political-parties check failed — ${problems.length} problem(s) across ${partyCount} part${partyCount === 1 ? "y" : "ies"}:\n`);
  for (const p of problems) console.error(`  ${p}`);
  console.error("\nSee src/data/politicalParties.ts and the sourcing discipline it documents.\n");
  process.exit(1);
}

console.log(
  `✓ Political-parties check passed — ${partyCount} part${partyCount === 1 ? "y" : "ies"} across ${Object.keys(partiesByCountry).length} countr${Object.keys(partiesByCountry).length === 1 ? "y" : "ies"}, ${Object.keys(coalitions).length} coalition(s), all sourced and well-formed.`,
);
