#!/usr/bin/env node
/**
 * Finds map polygons that carry ANOTHER subdivision's ISO code — the mis-coded
 * map class behind batches 7a (Iran) and 7b (Ecuador, Eritrea, Guyana,
 * Afghanistan, Latvia, Uganda). When a polygon holds the wrong code, every
 * dataset keyed by that code lands on it: flag, population, capital, native name.
 *
 *   node scripts/flag-audit/geo-code-scan.mjs            # every country
 *   node scripts/flag-audit/geo-code-scan.mjs EC GY UG   # just these
 *
 * Two independent tests, both from Wikidata (items carrying ISO 3166-2 code P300):
 *   1. CENTRE  — the subdivision item's own coordinates (P625);
 *   2. CAPITAL — its capital's coordinates (P36 → P625).
 * Each should fall inside the polygon with that code. A point that falls inside
 * ANOTHER polygon of the same country is reported, with the host's code.
 *
 * How to read the output. "BOTH" rows — centre and capital agree on the same
 * other polygon — are the strong signal; a SWAP or CYCLE of BOTH rows (A's
 * points in B, B's in A) is almost always a mis-coded map. One-way rows are
 * usually innocent: a city that is its own division inside its province (Pécs
 * in Baranya, Kyiv in Kyiv Oblast), a capital outside its region (Oslo for
 * Akershus), or a border town that a coarse outline puts on the wrong side.
 * Wikidata can be wrong too, and a region reorganised since the map was drawn
 * (Morocco 2015, Vietnam 2025) shows up here as well. Confirm every finding
 * against the ISO table (en.wikipedia "ISO 3166-2:XX") and the region's own
 * article before editing `public/subdivisions/XX.json` — see the handbook.
 *
 * Needs egress to query.wikidata.org. Codes go through the shared CODE_ALIASES.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const { CODE_ALIASES } = await import(join(root, "scripts", "data", "wikidata-subdivision-code-aliases.mjs"));
const only = new Set(process.argv.slice(2).map((s) => s.toUpperCase()));

function pointInRing(pt, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > pt[1] !== yj > pt[1] && pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
const inPolygon = (pt, rings) => pointInRing(pt, rings[0]) && !rings.slice(1).some((r) => pointInRing(pt, r));
const inGeometry = (pt, g) =>
  g?.type === "Polygon" ? inPolygon(pt, g.coordinates)
    : g?.type === "MultiPolygon" ? g.coordinates.some((p) => inPolygon(pt, p)) : false;

async function sparql(query) {
  const url = `https://query.wikidata.org/sparql?query=${encodeURIComponent(query)}`;
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(url, {
      headers: { Accept: "application/sparql-results+json", "User-Agent": "HanaFlagGame-geo-code-scan/1.0" },
    });
    if (res.ok) return (await res.json()).results.bindings;
    if (attempt >= 3) throw new Error(`Wikidata answered ${res.status}`);
    await new Promise((r) => setTimeout(r, 5000 * (attempt + 1)));
  }
}
const point = (wkt) => {
  const m = wkt?.match(/Point\(([-0-9.eE]+) ([-0-9.eE]+)\)/);
  return m ? [Number(m[1]), Number(m[2])] : null;
};

const geo = new Map();
for (const file of readdirSync(join(root, "public", "subdivisions")).filter((f) => /^[A-Z]{2}\.json$/.test(f))) {
  const cc = file.slice(0, 2);
  if (only.size && !only.has(cc)) continue;
  geo.set(cc, JSON.parse(readFileSync(join(root, "public", "subdivisions", file), "utf8")).features);
}
const codeOf = (f) => f.properties?.iso_3166_2?.trim().toUpperCase();

console.error("Querying Wikidata…");
const [centres, capitals] = await Promise.all([
  sparql(`SELECT ?code ?item ?coord WHERE { ?item wdt:P300 ?code; wdt:P625 ?coord. }`),
  sparql(`SELECT ?code ?cap ?capLabel ?coord WHERE { ?item wdt:P300 ?code; wdt:P36 ?cap. ?cap wdt:P625 ?coord.
          SERVICE wikibase:label { bd:serviceParam wikibase:language "en". } }`),
]);

/** app code → { centre?: host, capital?: host, capitalName } for points outside their own polygon. */
const found = new Map();
function test(rawCode, pt, kind, extra) {
  const code = (CODE_ALIASES[rawCode] ?? rawCode).toUpperCase();
  const feats = geo.get(code.slice(0, 2));
  if (!feats || !pt) return;
  const own = feats.filter((f) => codeOf(f) === code);
  if (!own.length || own.some((f) => inGeometry(pt, f.geometry))) return;
  const host = feats.find((f) => inGeometry(pt, f.geometry));
  const hostCode = host && codeOf(host);
  if (!hostCode || hostCode === code) return; // offshore, or a capital abroad
  const row = found.get(code) ?? {};
  row[kind] = hostCode;
  Object.assign(row, extra);
  found.set(code, row);
}
for (const b of centres) test(b.code.value, point(b.coord.value), "centre");
for (const b of capitals) test(b.code.value, point(b.coord.value), "capital", { capitalName: b.capLabel?.value });

const name = (code) => {
  for (const f of geo.get(code.slice(0, 2)) ?? []) if (codeOf(f) === code) return f.properties.name_en || f.properties.name;
  return "?";
};
const both = [...found].filter(([, r]) => r.centre && r.centre === r.capital);
const bothHost = new Map(both.map(([c, r]) => [c, r.centre]));
const lines = [];
for (const [code, r] of [...found].sort(([a], [b]) => a.localeCompare(b))) {
  const strong = r.centre && r.centre === r.capital;
  const partOfSwap = strong && bothHost.has(r.centre);
  const tag = partOfSwap ? "SWAP/CYCLE" : strong ? "BOTH" : "one-way";
  const where = [
    r.centre ? `centre in ${r.centre} ${name(r.centre)}` : "",
    r.capital ? `capital ${r.capitalName ?? "?"} in ${r.capital} ${name(r.capital)}` : "",
  ].filter(Boolean).join("; ");
  lines.push(`${tag.padEnd(10)} ${code} ${name(code)}: ${where}`);
}
const rank = { "SWAP/CYCLE": 0, BOTH: 1, "one-way": 2 };
lines.sort((a, b) => rank[a.split(" ")[0]] - rank[b.split(" ")[0]]);
console.log(lines.join("\n"));
console.error(
  `\n${found.size} codes with a point outside their own polygon; ` +
    `${both.length} where centre and capital agree; ${[...bothHost].filter(([, h]) => bothHost.has(h)).length} in swaps or cycles.`,
);
