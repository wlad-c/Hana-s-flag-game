// Generates src/data/subdivisionEndonyms.ts and src/data/capitalEndonyms.ts —
// the native-language name (endonym) of each subdivision and of each capital
// city, where it differs from the English exonym the app uses. Shown in the
// Learn-mode flag widget above the population, for subdivisions and capitals.
//
// Source: Wikidata rdfs:label in the country's primary official language
// (resolved via mledoze language codes), keyed by ISO 3166-2 (P300) and, for
// capitals, the subdivision's P36. Authentic native form ("Bayern", "München",
// "Θεσσαλία", "大阪府"). Never invented — omitted where Wikidata has no native
// label or it equals the English name.
// Re-run: node scripts/build-subnational-endonyms.mjs  (needs wikidata + mledoze egress)

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const rd = (p) => readFileSync(join(root, p), "utf8");

// ISO 639-3 (mledoze) → Wikidata label language (639-1 where it exists).
const LANG = {
  deu:"de",fra:"fr",spa:"es",por:"pt",ita:"it",nld:"nl",jpn:"ja",zho:"zh",rus:"ru",ell:"el",
  ara:"ar",kor:"ko",tur:"tr",pol:"pl",ces:"cs",slk:"sk",slv:"sl",hrv:"hr",srp:"sr",bul:"bg",
  ron:"ro",hun:"hu",ukr:"uk",bel:"be",lit:"lt",lav:"lv",est:"et",fin:"fi",swe:"sv",nor:"no",
  nob:"nb",dan:"da",isl:"is",heb:"he",hin:"hi",tha:"th",vie:"vi",ind:"id",msa:"ms",fas:"fa",
  urd:"ur",ben:"bn",tam:"ta",kat:"ka",hye:"hy",aze:"az",kaz:"kk",uzb:"uz",mon:"mn",khm:"km",
  lao:"lo",mya:"my",sin:"si",nep:"ne",amh:"am",swa:"sw",som:"so",kin:"rw",mlg:"mg",cat:"ca",
  eus:"eu",glg:"gl",sqi:"sq",mkd:"mk",bos:"bs",hat:"ht",kir:"ky",tgk:"tg",tuk:"tk",prs:"fa",
  mri:"mi",sme:"se",cnr:"sr",fil:"fil",kan:"kn",mal:"ml",tel:"te",mar:"mr",guj:"gu",pan:"pa",
};

// mledoze → primary language codes per country
const countries = await (await fetch("https://raw.githubusercontent.com/mledoze/countries/master/dist/countries.json")).json();
const countryLangs = {}; // cca2 -> [wikidata lang codes]
for (const c of countries) {
  const langs = Object.keys(c.languages || {}).map((l) => LANG[l]).filter(Boolean);
  if (langs.length) countryLangs[c.cca2] = [...new Set(langs)];
}

// English names the app uses
const meta = rd("src/lib/subdivisionMeta.ts");
const metaName = {}; for (const m of meta.matchAll(/code:\s*"([A-Z0-9~-]+)",\s*name:\s*"([^"]+)"/g)) metaName[m[1]] = m[2];
const caps = rd("src/data/capitalDetails.ts");
const capName = {}; for (const m of caps.matchAll(/"([A-Z0-9~-]+)":\s*\{"name":"([^"]+)"/g)) capName[m[1]] = m[2];

const countriesInApp = [...new Set(Object.keys(metaName).map((c) => c.slice(0, 2)))].sort();
const norm = (s) => (s || "").normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().replace(/[^a-z0-9]/g, "");

// Administrative type-words to strip from a native label so the endonym is the
// place name, not "Province of X". Keeps non-Latin scripts (大阪府, Θεσσαλία)
// which are informative as-is; only removes an affix when it's a known type-word.
const PRE = ["Provincia del ","Provincia de ","Provincia di ","Província de ","Provincie ","Provinsi ","Región del ","Región de ","Regione ","Région de la ","Région de l'","Région de ","Région du ","Région des ","Région ","Canton de ","Canton du ","Canton d'","Cantone di ","Cantone ","Canton ","Kanton ","Občina ","Opština ","Opstina ","Comune di ","Departamento del ","Departamento de ","Département de la ","Département de l'","Département de ","Département du ","Département des ","Département d'","Estado de ","Estado do ","Governorate of ","Wilaya ya ","Wilayah ","Prowincja ","Województwo ","Kabupaten ","Kota ","Distrito de ","Distrito do ","محافظة ","ولاية ","منطقة ","إقليم ","Περιφέρεια ","Νομός ","Республика ","raionul ","Raionul ","județul ","Județul ","municipiul ","Municipiul ","جังหวัด","Mkoa wa ","Lalawigan ng ","Gobolka "];
const SUF = [" novads"," rajons"," rajonas"," apskritis"," maakond"," lääni"," län"," fylke"," megye"," županija"," voivodeship"," Voivodeship"," oblast"," oblasti"," kraj"," rayonu"," prefektura"," district"," District"," Region"," region"," province"," Province"," governorate"," область"," вобласць"," край"," район"," welaýaty"," muhofazasi"," viloyati"];
function stripType(name) {
  let s = (name || "").trim();
  for (const p of PRE) if (s.toLowerCase().startsWith(p.toLowerCase())) { s = s.slice(p.length).trim(); break; }
  for (const q of SUF) if (s.toLowerCase().endsWith(q.toLowerCase())) { s = s.slice(0, -q.length).trim(); break; }
  return s;
}

async function sparql(q) {
  const url = "https://query.wikidata.org/sparql?format=json&query=" + encodeURIComponent(q);
  for (let a = 0; a < 3; a++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": "HanaFlagGame/1.0 endonym", "Accept": "application/sparql-results+json" } });
      if (r.ok) return (await r.json()).results.bindings;
      if (r.status === 429) await new Promise((x) => setTimeout(x, 3000 * (a + 1)));
    } catch { await new Promise((x) => setTimeout(x, 2000)); }
  }
  return null;
}

const subEndo = {}, capEndo = {};
for (const cc of countriesInApp) {
  const langs = countryLangs[cc];
  if (!langs || (langs.length === 1 && langs[0] === "en")) continue; // English-speaking → no endonym
  const langFilter = langs.map((l) => `"${l}"`).join(",");
  const q = `SELECT ?code ?subLbl ?capLbl ?capEn WHERE {
    ?sub wdt:P300 ?code . FILTER(STRSTARTS(?code, "${cc}-"))
    OPTIONAL { ?sub rdfs:label ?subLbl . FILTER(LANG(?subLbl) IN (${langFilter})) }
    OPTIONAL { ?sub wdt:P36 ?cap . ?cap rdfs:label ?capLbl . FILTER(LANG(?capLbl) IN (${langFilter}))
               OPTIONAL { ?cap rdfs:label ?capEn . FILTER(LANG(?capEn) = "en") } }
  }`;
  const rows = await sparql(q);
  if (!rows) { console.log(`  ${cc}: query failed`); continue; }
  for (const b of rows) {
    const code = b.code?.value; if (!code) continue;
    const sub = stripType(b.subLbl?.value?.trim());
    const cap = stripType(b.capLbl?.value?.trim());
    // Only the capital the app names (capitalDetails.ts, which honours the pins in
    // build-capital-details.mjs). An item that lists several capitals — former
    // seats, co-capitals — must not lend the shown capital another city's native
    // name: Kramatorsk's under Donetsk, Shinjuku's under Tokyo. (2026-09 audit.)
    const capEn = b.capEn?.value?.trim();
    const shown = capName[code];
    const sameCapital = !!capEn && !!shown &&
      (norm(capEn) === norm(shown) || norm(capEn).startsWith(norm(shown)) || norm(shown).startsWith(norm(capEn)));
    // Emit only where the cleaned native name genuinely differs from the English
    // exonym (not just a stripped type-word), and never overwrite.
    if (sub && metaName[code] && norm(sub) !== norm(metaName[code]) && !subEndo[code]) subEndo[code] = sub;
    if (cap && sameCapital && norm(cap) !== norm(shown) && !capEndo[code]) capEndo[code] = cap;
  }
  await new Promise((x) => setTimeout(x, 250));
}

function emit(map, file, exportName, what) {
  const lines = Object.keys(map).sort().map((k) => `  ${JSON.stringify(k)}: ${JSON.stringify(map[k])},`).join("\n");
  const ts = `// Auto-generated by scripts/build-subnational-endonyms.mjs — DO NOT EDIT MANUALLY
// Native-language name (endonym) of each ${what}, where it differs from the
// English exonym the app uses. Shown in the Learn-mode flag widget above the
// population. Source: Wikidata rdfs:label in the country's primary language.
// Re-run: node scripts/build-subnational-endonyms.mjs

/** ISO 3166-2 subdivision code → native ${what} name (only where it differs from English). */
export const ${exportName}: Readonly<Record<string, string>> = {
${lines}
};
`;
  writeFileSync(join(root, "src", "data", file), ts);
}
emit(subEndo, "subdivisionEndonyms.ts", "SUBDIVISION_ENDONYMS", "subdivision");
emit(capEndo, "capitalEndonyms.ts", "CAPITAL_ENDONYMS", "capital city");
console.log(`✓ subdivision endonyms: ${Object.keys(subEndo).length}; capital endonyms: ${Object.keys(capEndo).length}`);
for (const [c,l] of [["DE-BY","Bavaria/Munich"],["JP-27","Osaka"],["GR-E","Thessaly"],["IT-25","Lombardy/Milan"],["RU-MOW","Moscow"]])
  console.log(`  ${c}: sub=${subEndo[c]||"—"}  cap=${capEndo[c]||"—"}`);
