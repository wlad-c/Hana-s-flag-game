#!/usr/bin/env node
/**
 * A Sub-national flags question must have exactly one correct answer. Where two
 * divisions of one country really do fly the same flag (Ajman and Dubai), the
 * game accepts both, and src/data/identicalSubdivisionFlags.ts is the list that
 * tells it so. This check keeps that list complete and honest.
 *
 * It rasterises every division flag the game can show, compares every pair in
 * each country, and fails when:
 *   - two flags are near-identical but are neither in one declared group nor in
 *     REVIEWED_DISTINCT below (a question the game would mark wrong for a right
 *     answer);
 *   - a declared group's flags no longer look identical (a replaced file would
 *     otherwise keep accepting a wrong answer);
 *   - a declared code has no flag, or a group spans two countries;
 *   - the game stops reading the list.
 *
 * Found 2026-09 while bundling Balzers and Gamprin, whose flags are identical
 * (FOTW li-ba.html). Four such pairs were already in the game and a player who
 * named the twin was marked wrong.
 *
 * Measured 2026-09 on a 48×32 raster, where a pixel counts as different when
 * any channel moves by more than 48:
 *   declared identical pairs ..... 0.0% of pixels differ (all five)
 *   closest distinct pair ........ 0.1% (EE-44/EE-59, only the roof colour differs)
 *   other reviewed pairs ......... 1.6% to 2.7%
 *   closest pair not reviewed .... 4.4%
 * NEAR (3%) sits in the gap above the reviewed pairs, so every pair under it
 * gets a human decision.
 *
 * Capital flags are compared too, against the divisions and the other capitals
 * of the same country (never against their own division, which
 * check-capital-subdivision-collision.mjs covers). One city can be a division
 * and another division's capital at once (Kyiv), and places that share a
 * design (Warsaw and Łódź) are drawn by different hands, so a DECLARED group's
 * files are often separate renderings of one design. Group consistency is
 * therefore measured with a looser channel step (GROUP_CHANNEL, 96), which
 * ignores a change of shade but not of colour or layout. Measured 2026-09:
 *   declared groups, worst pair ..... 5.5% (Genoa's cross against Padua's)
 *   same city, two renderings ....... 1.0% (Zagreb), 8.7% (Kecskemét, whose
 *                                      county-seat file has a black border)
 *   a member swapped for another design: Balzers against Eschen 42%, Mantua's
 *                                      Virgil against a plain red cross 1.9%
 *                                      at this step but 2.9% at the strict one
 * TWIN_MAX (10%) bounds a declared group. It cannot catch a small emblem added
 * to one member, which is why the strict scan still runs on every pair.
 *
 * Never raise NEAR or TWIN_MAX to make a pair pass, and never add a pair to
 * REVIEWED_DISTINCT without a side-by-side look at the two flags. If this fires,
 * either declare the twins (sourced) or record why the flags differ.
 *
 * Two report modes help an audit look wider than the gate. Both print and exit
 * 0; neither changes what the gate checks:
 *   --scan [--max=0.012] [--channel=96]  every same-country pair under --max at
 *        that channel step, marked [group], [reviewed] or [NEW]. Channel 96
 *        finds same-design flags drawn in different shades (Padua against
 *        Bologna), and also false friends (green against blue): look first.
 *   --same-city  a division named like another division's capital, and two
 *        capitals with the same name. One city in two roles must be grouped even
 *        when its two files are drawn differently (Kecskemét, 8.7%); a shared
 *        name can also be two different cities (San Fernando) or a data error
 *        (see docs/SUBNATIONAL_FLAG_AUDIT_HANDBOOK.md).
 */
import sharp from "sharp";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? Number(hit.split("=")[1]) : fallback;
};
const SCAN = args.includes("--scan");
const SAME_CITY = args.includes("--same-city");
const SCAN_MAX = opt("max", 0.012);
const SCAN_CHANNEL = opt("channel", 96);

const W = 48, H = 32, CHANNEL = 48;
const NEAR = 0.03;
const GROUP_CHANNEL = 96;
const TWIN_MAX = 0.10;

/** Near-identical pairs checked by eye and found to be different flags. */
const REVIEWED_DISTINCT = new Map([
  ["EE-44|EE-59", "Ida-Viru's tower roof is red, Lääne-Viru's gold; the arms are otherwise alike."],
  ["EE-49|EE-78", "Jõgeva's arms carry a clover leaf and ears of grain, Tartu's a star and an oak branch."],
  ["EE-65|EE-67", "Põlva's arms show three beavers, Pärnu's a bear."],
  ["FR-73|FR-74", "Haute-Savoie's version writes the department's name on the cross; Savoie's is plain."],
  ["CO-ANT|CO-VAU", "Vaupés adds a rubber-tree leaf to the white-over-green; Antioquia's is plain."],
  ["capital:IT-AL|capital:IT-MN", "Mantua's red cross carries Virgil's bust in the upper hoist quarter; Alessandria's is plain (FOTW it-mantu)."],
  // Found by --scan at channel step 96, which cannot tell some colours apart:
  ["CO-COR|capital:CO-BOY", "Córdoba's top stripe is blue, Tunja's green (both green-white below)."],
  ["ES-NA|capital:ES-CU", "Navarre's red flag carries the chains of Navarre; Cuenca's crimson one the chalice and star of its arms."],
  ["ES-NA|ES-T", "Tarragona's red flag carries the provincial arms and the Diputación's name; Navarre's the chains of Navarre."],
]);

const read = (rel) => readFileSync(join(root, rel), "utf8");
const pairKey = (a, b) => [a, b].sort().join("|");

/** Every division of every country deck, from the generated meta. */
function metaDecks() {
  const src = read("src/lib/subdivisionMeta.ts");
  const decks = new Map();
  const blockRe = /^ {2}"([A-Z]{2})": \{\n {4}countryCode: "[A-Z]{2}",[\s\S]*?\n {4}\],\n {2}\},/gm;
  let m;
  while ((m = blockRe.exec(src))) {
    decks.set(m[1], [...m[0].matchAll(/\{ code: "([^"]+)", name: "([^"]+)"/g)].map((x) => ({ code: x[1], name: x[2] })));
  }
  return decks;
}

function codeSet(rel, exportName) {
  const src = read(rel);
  const start = src.indexOf(exportName);
  const end = src.indexOf("]);", start);
  return new Set([...src.slice(start, end).matchAll(/"([A-Z0-9~_-]+)"/g)].map((x) => x[1]));
}

function hierarchyChildren() {
  const src = read("src/lib/disputedSubdivisions.ts");
  const start = src.indexOf("export const DISPUTED_TERRITORY_HIERARCHY");
  const body = src.slice(start, src.indexOf("};", start));
  return new Set([...body.matchAll(/^\s*"([^"]+)":\s*"[^"]+",/gm)].map((x) => x[1]));
}

/**
 * key -> absolute path of the flag the game shows for that answer, or null. A
 * division resolves as subdivisionFlagUrl does; "capital:CODE" resolves to the
 * capital-city flag, when the capital quiz can ask it (getPlayableCapitalSubdivisions).
 */
function answerFlags() {
  const overrides = new Map();
  for (const m of read("src/api/subdivisions.ts").matchAll(/"([A-Z0-9~_-]+)":\s*`\$\{BASE\}flags\/([^`]+)`/g)) {
    overrides.set(m[1], join(root, "public", "flags", m[2]));
  }
  const bundled = new Map();
  const subDir = join(root, "public", "flags", "sub");
  for (const cc of readdirSync(subDir)) {
    for (const f of readdirSync(join(subDir, cc))) {
      const code = f.replace(/\.(svg|png|jpe?g|webp)$/i, "");
      if (code !== f) bundled.set(code, join(subDir, cc, f));
    }
  }
  const capitals = new Map();
  for (const m of read("src/data/capitalFlags.ts").matchAll(/"([A-Z0-9~_-]+)":\s*"(capital-flags\/[^"]+)"/g)) {
    capitals.set(m[1], join(root, "public", m[2]));
  }
  const cityTerritories = codeSet("src/data/cityTerritories.ts", "CITY_TERRITORY_CODES");
  const suppressed = codeSet("src/api/subdivisions.ts", "SUPPRESSED_SUBDIVISION_FLAGS: ReadonlySet");
  const shared = codeSet("src/data/sharedCapitalFlags.ts", "SHARED_CAPITAL_FLAGS");
  const capitalNamed = new Set([...read("src/data/capitalDetails.ts").matchAll(/"([A-Z0-9~_-]+)": \{"name":"/g)].map((m) => m[1]));
  return (key) => {
    if (key.startsWith("capital:")) {
      const code = key.slice("capital:".length);
      const playable = capitals.has(code) && capitalNamed.has(code) && !cityTerritories.has(code) && !shared.has(code);
      return playable ? capitals.get(code) : null;
    }
    const code = key;
    if (suppressed.has(code)) return null;
    const own = overrides.get(code) ?? bundled.get(code) ?? null;
    if (own) return own;
    return cityTerritories.has(code) ? capitals.get(code) ?? null : null;
  };
}

function declaredGroups() {
  const src = read("src/data/identicalSubdivisionFlags.ts");
  return [...src.matchAll(/codes:\s*\[([^\]]*)\]/g)].map((m) => [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]));
}

/** Each group's text from its `codes:` to the next one, to check its note and sources. */
function declaredGroupBodies() {
  const src = read("src/data/identicalSubdivisionFlags.ts");
  const start = src.indexOf("export const IDENTICAL_SUBDIVISION_FLAG_GROUPS");
  return src.slice(start).split(/(?=codes:\s*\[)/).slice(1);
}

async function raster(path) {
  return sharp(path, { density: 72, limitInputPixels: false })
    .flatten({ background: "#808080" })
    .resize(W, H, { fit: "fill" })
    .removeAlpha()
    .raw()
    .toBuffer();
}

function differingFraction(a, b, channel = CHANNEL) {
  let diff = 0;
  for (let k = 0; k < W * H; k++) {
    const d = Math.max(Math.abs(a[3 * k] - b[3 * k]), Math.abs(a[3 * k + 1] - b[3 * k + 1]), Math.abs(a[3 * k + 2] - b[3 * k + 2]));
    if (d > channel) diff++;
  }
  return diff / (W * H);
}

const errors = [];

// The game must read the list, or the list protects nothing.
const hook = read("src/hooks/useSubdivisionGame.ts");
if (!/identicalFlagTwins\(questionKey\)\.includes\(selectedKey\)/.test(hook)) {
  errors.push("useSubdivisionGame.ts no longer checks identicalFlagTwins() when marking an answer.");
}

const decks = metaDecks();
const flagOf = answerFlags();
const skip = hierarchyChildren();
const groups = declaredGroups();
const groupOf = new Map();
groups.forEach((g, i) => g.forEach((c) => groupOf.set(c, i)));

const deckOf = new Map();
for (const [cc, divs] of decks) for (const d of divs) deckOf.set(d.code, cc);
const codeOfKey = (key) => key.replace(/^capital:/, "");
for (const body of declaredGroupBodies()) {
  const codes = body.match(/codes:\s*\[([^\]]*)\]/)?.[1] ?? "";
  if (!/note:\s*"[^"]{20,}"/.test(body)) errors.push(`Declared group [${codes}] has no note saying why its flags match.`);
  if (!/sources:\s*\[[^\]]*"https?:\/\/[^"]+"/.test(body)) errors.push(`Declared group [${codes}] cites no http(s) source.`);
}
for (const g of groups) {
  if (g.length < 2) errors.push(`A declared group has fewer than two codes: ${g.join(", ")}`);
  const ccs = new Set(g.map((c) => deckOf.get(codeOfKey(c))));
  if (ccs.size !== 1 || ccs.has(undefined)) errors.push(`Declared group ${g.join(", ")} is not one country's divisions.`);
  for (const c of g) if (!flagOf(c)) errors.push(`Declared group member ${c} has no flag in the game.`);
}

let compared = 0;
const scanLines = [];
const unreadable = [];
const cache = new Map();
const rasterOf = async (path) => {
  if (!cache.has(path)) cache.set(path, await raster(path));
  return cache.get(path);
};
for (const [cc, divs] of decks) {
  const items = [];
  const seen = new Set();
  for (const d of divs) {
    if (skip.has(d.code) || seen.has(d.code)) continue;
    seen.add(d.code);
    for (const key of [d.code, `capital:${d.code}`]) {
      const path = flagOf(key);
      if (!path || !existsSync(path)) continue;
      try {
        items.push({ code: key, img: await rasterOf(path) });
      } catch (e) {
        // A few bundled files are formats sharp cannot read (a UTF-16 SVG);
        // check-capital-flags.mjs skips the same ones. Named, not silent.
        unreadable.push(`${key} (${e.message})`);
      }
    }
  }
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const a = items[i], b = items[j];
      // A division against its own capital is check-capital-subdivision-collision.mjs's job.
      if (codeOfKey(a.code) === codeOfKey(b.code)) continue;
      compared++;
      const sameGroup = groupOf.has(a.code) && groupOf.get(a.code) === groupOf.get(b.code);
      if (SCAN) {
        const f = differingFraction(a.img, b.img, SCAN_CHANNEL);
        if (f < SCAN_MAX) {
          const tag = sameGroup ? "group" : REVIEWED_DISTINCT.has(pairKey(a.code, b.code)) ? "reviewed" : "NEW";
          scanLines.push(`${cc}  ${(f * 100).toFixed(1).padStart(5)}%  ${a.code} ~ ${b.code}  [${tag}]`);
        }
      }
      if (sameGroup) {
        const loose = differingFraction(a.img, b.img, GROUP_CHANNEL);
        if (loose >= TWIN_MAX) {
          errors.push(`${a.code} and ${b.code} are declared identical but ${(loose * 100).toFixed(1)}% of their pixels differ in colour or layout.`);
        }
        continue;
      }
      const frac = differingFraction(a.img, b.img);
      const pct = `${(frac * 100).toFixed(1)}%`;
      if (frac < NEAR && !REVIEWED_DISTINCT.has(pairKey(a.code, b.code))) {
        errors.push(
          `${cc}: ${a.code} and ${b.code} are near-identical (${pct} of pixels differ) but are neither ` +
            `declared identical nor reviewed as distinct.`,
        );
      }
    }
  }
}

if (unreadable.length) console.log(`  (skipped, could not rasterise: ${unreadable.join("; ")})`);
if (SCAN) {
  console.log(`Pairs under ${(SCAN_MAX * 100).toFixed(1)}% at channel step ${SCAN_CHANNEL}:`);
  for (const line of scanLines.sort()) console.log(`  ${line}`);
}
if (SAME_CITY) {
  const capitalName = new Map(
    [...read("src/data/capitalDetails.ts").matchAll(/"([A-Z0-9~_-]+)": \{"name":"([^"]+)"/g)].map((m) => [m[1], m[2]]),
  );
  const norm = (n) => n.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().replace(/\b(city|capital|municipality)\b/g, "").replace(/[^a-z]/g, "");
  const tag = (a, b) => (groupOf.has(a) && groupOf.get(a) === groupOf.get(b) ? "group" : "NEW");
  console.log("Same-name answers (one city in two roles, or two places that share a name):");
  for (const [cc, divs] of decks) {
    const caps = divs.filter((d) => capitalName.has(d.code) && flagOf(`capital:${d.code}`));
    for (const y of caps) {
      for (const x of divs) {
        if (x.code === y.code || !flagOf(x.code) || norm(x.name) !== norm(capitalName.get(y.code))) continue;
        console.log(`  ${cc}  ${x.code} (${x.name}) ~ capital:${y.code} (${capitalName.get(y.code)})  [${tag(x.code, `capital:${y.code}`)}]`);
      }
    }
    for (let i = 0; i < caps.length; i++) {
      for (let j = i + 1; j < caps.length; j++) {
        const a = caps[i].code, b = caps[j].code;
        if (norm(capitalName.get(a)) !== norm(capitalName.get(b))) continue;
        console.log(`  ${cc}  capital:${a} ~ capital:${b} (${capitalName.get(a)})  [${tag(`capital:${a}`, `capital:${b}`)}]`);
      }
    }
  }
}
if (SCAN || SAME_CITY) process.exit(0);
if (errors.length) {
  console.error(`✗ Identical sub-national flags check failed:\n  ${errors.join("\n  ")}\n`);
  console.error(
    "If the two flags are the same design, add them as a sourced group to\n" +
      "src/data/identicalSubdivisionFlags.ts so the game accepts either answer. If they\n" +
      "differ, add the pair to REVIEWED_DISTINCT with a reason, after comparing them by eye.",
  );
  process.exit(1);
}
console.log(
  `✓ Identical sub-national flags check passed: ${compared} same-country pairs compared, ` +
    `${groups.length} declared identical groups, ${REVIEWED_DISTINCT.size} reviewed near-identical pairs.`,
);
