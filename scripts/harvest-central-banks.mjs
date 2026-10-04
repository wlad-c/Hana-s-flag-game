#!/usr/bin/env node
/**
 * Harvest national central banks from Wikidata into scripts/data/central-banks-harvest.json.
 *
 * This is a WORKSHEET, not shippable Learn-mode data — same discipline as
 * harvest-national-symbols.mjs. A human (or a follow-up pass) still has to:
 *   - confirm the picked bank is the country's monetary authority (not a
 *     regional Fed bank, a historical predecessor, or a commercial bank);
 *   - download / visually verify the logo;
 *   - write logoExplainer after viewing the image (never from the filename).
 *
 * Run: node scripts/harvest-central-banks.mjs
 */
import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { isRejectedLogoFilename } from "./lib/centralBankLogoQuality.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT = resolve(__dirname, "data/central-banks-harvest.json");
const UA =
  "HanaFlagGame/1.0 (central-banks harvest; https://github.com/wlad-c/hana-s-flag-game)";

/** Curated Wikidata QIDs for countries where automatic ranking is unsafe. */
const QID_OVERRIDE = {
  US: "Q53536", // Federal Reserve System (not a regional Reserve Bank)
  DE: "Q162222", // Deutsche Bundesbank (not ECB)
  CA: "Q806703", // Bank of Canada (not Bank of Montreal)
  CN: "Q249203", // People's Bank of China (not HKMA / AMCM)
  MX: "Q806208", // Banco de México
  FR: "Q806950", // Banque de France
  BE: "Q685918", // National Bank of Belgium
  PT: "Q378372", // Banco de Portugal
  FI: "Q194060", // Bank of Finland
  NO: "Q970769", // Norges Bank
  DK: "Q683252", // Danmarks Nationalbank
  IN: "Q944085", // Reserve Bank of India
  TR: "Q580829", // Central Bank of the Republic of Türkiye
  CO: "Q686329", // Banco de la República
  HT: "Q2883379", // Bank of the Republic of Haiti
  SK: "Q1481791", // National Bank of Slovakia
  LV: "Q687709", // Bank of Latvia
  PL: "Q168844", // Narodowy Bank Polski
  BG: "Q74687", // Bulgarian National Bank
  EC: "Q1797646", // Central Bank of Ecuador
  GE: "Q2667495", // National Bank of Georgia (not Abkhazia's bank)
};

/** QIDs that must never be picked as a country's current central bank. */
const BLOCKED_QIDS = new Set([
  "Q8901", // European Central Bank — eurozone NCBs are the country entries
  "Q560183", // Reichsbank
  "Q2041453", // Ottoman Bank
  "Q806690", // Bank of North America (historical)
  "Q7719950", // Banque de l'Indochine
  "Q21426958", // Banque de l'Algérie (colonial)
  "Q107359743", // Banque du Congo Belge
  "Q2109176", // Preussische Bank
  "Q11963362", // Centralbanken for Norge (historical)
  "Q2018840", // Allahabad Bank (commercial)
  "Q806693", // Bank of Montreal (commercial)
  "Q2646652", // Banamex (commercial)
  "Q1595286", // HKMA — not mainland China's CB
  "Q986615", // AMCM — Macao
  "Q3374413", // Finnish savings-bank central
  "Q16496474", // Banco de Lisboa (historical)
  "Q105968386", // Emissiebank
  "Q3151944", // IEOM (French overseas note institute)
  "Q112252176", // National Bank of Haiti (historical predecessor)
  "Q104707199", // duplicate/legacy Colombia listing
  "Q7258814", // Puerto Rico fiscal agent
  "Q2001669", // National Bank of the Republic of Abkhazia — not Georgia
]);

const HISTORICAL_NAME =
  /\b(reichsbank|ottoman|indochine|colonial|darlehns|preussische|bank of north america)\b/i;
const REGIONAL_FED = /^Federal Reserve Bank of /i;
const COMMERCIAL =
  /\b(commercial|savings|investment|banamex|montreal|allahabad)\b/i;

function loadUnMembers() {
  const src = readFileSync(resolve(ROOT, "src/lib/unMemberStates.ts"), "utf8");
  return new Set([...src.matchAll(/"([A-Z]{2})"/g)].map((m) => m[1]));
}

function slugify(name, cc) {
  const n = name.toLowerCase();
  const known = [
    ["reserve bank of australia", "rba"],
    ["bank of england", "boe"],
    ["federal reserve", "fed"],
    ["bank of japan", "boj"],
    ["people's bank of china", "pboc"],
    ["reserve bank of india", "rbi"],
    ["bank of canada", "boc"],
    ["swiss national bank", "snb"],
    ["sveriges riksbank", "riksbank"],
    ["norges bank", "norges-bank"],
    ["deutsche bundesbank", "bundesbank"],
    ["german federal bank", "bundesbank"],
    ["banque de france", "banque-de-france"],
    ["bank of france", "banque-de-france"],
    ["banca d'italia", "banca-ditalia"],
    ["bank of italy", "banca-ditalia"],
    ["banco de españa", "bde"],
    ["bank of spain", "bde"],
    ["banco de portugal", "bdp"],
    ["de nederlandsche bank", "dnb"],
    ["national bank of belgium", "nbb"],
    ["central bank of ireland", "cbi"],
    ["bank of greece", "bog"],
    ["oesterreichische nationalbank", "oenb"],
    ["austrian national bank", "oenb"],
    ["bank of finland", "bof"],
    ["central bank of brazil", "bcb"],
    ["banco central do brasil", "bcb"],
    ["bank of mexico", "banxico"],
    ["banco de méxico", "banxico"],
    ["south african reserve bank", "sarb"],
    ["bank negara malaysia", "bnm"],
    ["monetary authority of singapore", "mas"],
    ["bank of korea", "bok"],
    ["bank indonesia", "bi"],
    ["bank of thailand", "bot"],
    ["bangko sentral", "bsp"],
    ["central bank of the philippines", "bsp"],
    ["reserve bank of new zealand", "rbnz"],
    ["danmarks nationalbank", "nationalbanken"],
    ["narodowy bank polski", "nbp"],
    ["czech national bank", "cnb"],
    ["hungarian national bank", "mnb"],
    ["croatian national bank", "hnb"],
    ["saudi central bank", "sama"],
    ["banco de la república", "banrep"],
    ["banco central do brasil", "bcb"],
  ];
  for (const [k, v] of known) {
    if (n.includes(k)) return v;
  }
  let s = n
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(
      /^(the-|central-bank-of-|bank-of-|national-bank-of-|reserve-bank-of-|banco-central-(de-|do-|da-)?|banque-(centrale-)?(de-|du-|des-)?)/,
      "",
    )
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  if (!s) s = "central-bank";
  // avoid colliding with country code alone
  if (s === cc.toLowerCase()) s = `${s}-cb`;
  return s;
}

function score(bank, cc) {
  if (BLOCKED_QIDS.has(bank.qid)) return -1000;
  if (HISTORICAL_NAME.test(bank.name)) return -1000;
  if (REGIONAL_FED.test(bank.name)) return -1000;
  if (COMMERCIAL.test(bank.name)) return -500;
  let s = 10; // any non-blocked candidate is acceptable by default
  if (bank.logo) s += 5; // logo helps but must NOT outrank the right institution
  if (
    /central bank|reserve bank|national bank|monetary authority|bundesbank|federal reserve system|banco central|banque centrale|banc[oa] (nacional|central)|people'?s bank|bank negara|bangko sentral|riksbank|norges bank|danmarks nationalbank|oesterreichische|de nederlandsche|rastra bank|state bank of|bank of the republic|bank of central african states|eastern caribbean central bank|central bank of west african|banque centrale des [eé]tats|administration of the patrimony/i.test(
      bank.name,
    )
  ) {
    s += 50;
  } else if (/^bank of |^banque (du |de |d')|^banco (de |do |da |nacional)/i.test(bank.name)) {
    // "Bank of England", "Bank of Italy", "Banque du Liban", …
    s += 40;
  }
  // Prefer shorter institutional names over long colonial / regional branches
  s -= Math.min(bank.name.length, 80) / 40;
  return s;
}

async function sparql(query) {
  const url = new URL("https://query.wikidata.org/sparql");
  url.searchParams.set("format", "json");
  url.searchParams.set("query", query);
  const res = await fetch(url, {
    headers: { "User-Agent": UA, Accept: "application/sparql-results+json" },
  });
  if (!res.ok) throw new Error(`SPARQL HTTP ${res.status}`);
  return res.json();
}

const QUERY = `
SELECT ?cc ?bank ?bankLabel ?logo ?website ?inception WHERE {
  ?bank wdt:P31/wdt:P279* wd:Q66344;
        wdt:P17 ?country.
  ?country wdt:P297 ?cc.
  OPTIONAL { ?bank wdt:P154 ?logo. }
  OPTIONAL { ?bank wdt:P856 ?website. }
  OPTIONAL { ?bank wdt:P571 ?inception. }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
ORDER BY ?cc
`;

function commonsFilename(logoUrl) {
  if (!logoUrl) return null;
  try {
    const raw = decodeURIComponent(logoUrl.split("/").pop());
    if (!raw) return null;
    // Wikidata P154 is often a HQ photo / banknote / meeting shot — never treat those as logos
    if (isRejectedLogoFilename(raw)) return null;
    return raw;
  } catch {
    return null;
  }
}

const NO_OWN_CB = {
  LI: {
    name: "No national central bank — Swiss franc via monetary union with Switzerland",
    note: "Liechtenstein has no central bank of its own; it uses the Swiss franc under its customs and monetary union with Switzerland (Swiss National Bank sets policy).",
  },
  MC: {
    name: "No national central bank — euro via France / Eurosystem arrangements",
    note: "Monaco has no central bank of its own; it uses the euro under its monetary agreement with France / the EU.",
  },
  SM: {
    name: "No national central bank — euro via Italy / Eurosystem arrangements",
    note: "San Marino has no central bank of its own; it uses the euro under its monetary agreement with Italy / the EU.",
  },
  FM: {
    name: "No national central bank — United States dollar",
    note: "The Federated States of Micronesia has no central bank; the US dollar is legal tender under Compact of Free Association arrangements.",
  },
  MH: {
    name: "No national central bank — United States dollar",
    note: "The Marshall Islands has no central bank; the US dollar is legal tender under Compact of Free Association arrangements.",
  },
  PW: {
    name: "No national central bank — United States dollar",
    note: "Palau has no central bank; the US dollar is legal tender under Compact of Free Association arrangements.",
  },
};

const un = loadUnMembers();
console.log(`UN members: ${un.size}`);
console.log("Querying Wikidata…");
const data = await sparql(QUERY);
const by = new Map();
for (const r of data.results.bindings) {
  const cc = r.cc.value;
  if (!un.has(cc)) continue;
  const qid = r.bank.value.split("/").pop();
  const list = by.get(cc) ?? [];
  list.push({
    qid,
    name: r.bankLabel.value,
    logo: r.logo?.value ?? null,
    website: r.website?.value ?? null,
    inception: r.inception?.value ?? null,
  });
  by.set(cc, list);
}

const harvest = {
  fetchedAt: new Date().toISOString().slice(0, 10),
  source:
    "Wikidata SPARQL: instance of (or subclass of) central bank (Q66344), country (P17), ISO 3166-1 alpha-2 (P297); optional logo (P154), website (P856), inception (P571).",
  countries: {},
};

for (const cc of [...un].sort()) {
  if (NO_OWN_CB[cc]) {
    harvest.countries[cc] = {
      id: `${cc.toLowerCase()}-none`,
      countryCode: cc,
      name: NO_OWN_CB[cc].name,
      noOwnCentralBank: true,
      noImageReason: NO_OWN_CB[cc].note,
      sources: [
        "https://www.wikidata.org/wiki/Q66344",
        `https://en.wikipedia.org/wiki/${encodeURIComponent(cc === "FM" ? "Federated_States_of_Micronesia" : cc === "MH" ? "Marshall_Islands" : cc === "PW" ? "Palau" : cc === "LI" ? "Liechtenstein" : cc === "MC" ? "Monaco" : "San_Marino")}`,
      ],
      candidates: [],
    };
    continue;
  }

  const candidates = by.get(cc) ?? [];
  let picked = null;
  if (QID_OVERRIDE[cc]) {
    picked = candidates.find((c) => c.qid === QID_OVERRIDE[cc]) ?? null;
    if (!picked) {
      // Override QID not in candidate list (e.g. Fed System has no P31 path match edge case)
      picked = {
        qid: QID_OVERRIDE[cc],
        name:
          cc === "US"
            ? "Federal Reserve System"
            : `Wikidata ${QID_OVERRIDE[cc]}`,
        logo: null,
        website: null,
        inception: null,
        fromOverride: true,
      };
    }
  } else if (candidates.length) {
    picked = [...candidates].sort((a, b) => score(b, cc) - score(a, cc))[0];
    if (score(picked, cc) < 0) picked = null;
  }

  if (!picked) {
    harvest.countries[cc] = {
      id: `${cc.toLowerCase()}-missing`,
      countryCode: cc,
      name: `Central bank of ${cc} (unresolved)`,
      unresolved: true,
      candidates: candidates.map((c) => ({
        qid: c.qid,
        name: c.name,
        hasLogo: Boolean(c.logo),
      })),
      sources: [],
    };
    continue;
  }

  const founded = picked.inception
    ? Number(String(picked.inception).slice(1, 5))
    : undefined;
  const commonsLogo = commonsFilename(picked.logo);
  harvest.countries[cc] = {
    id: `${cc.toLowerCase()}-${slugify(picked.name, cc)}`,
    countryCode: cc,
    name: picked.name,
    qid: picked.qid,
    website: picked.website || undefined,
    founded: Number.isFinite(founded) ? founded : undefined,
    commonsLogo: commonsLogo || undefined,
    sources: [
      `https://www.wikidata.org/wiki/${picked.qid}`,
      picked.website,
      commonsLogo
        ? `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(commonsLogo.replace(/ /g, "_"))}`
        : null,
    ].filter(Boolean),
    candidates: candidates.map((c) => ({
      qid: c.qid,
      name: c.name,
      hasLogo: Boolean(c.logo),
    })),
  };
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(harvest, null, 2) + "\n");

const countries = Object.values(harvest.countries);
const withLogo = countries.filter((c) => c.commonsLogo).length;
const noOwn = countries.filter((c) => c.noOwnCentralBank).length;
const unresolved = countries.filter((c) => c.unresolved).length;
console.log(
  `Wrote ${OUT}\n  ${countries.length} countries — ${withLogo} Commons logos, ${noOwn} no-own-CB, ${unresolved} unresolved`,
);
