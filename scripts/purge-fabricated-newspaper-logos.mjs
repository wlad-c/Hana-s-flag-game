#!/usr/bin/env node
/**
 * One-shot: strip fabricated rect+text newspaper mastheads from
 * `src/data/nationalNewspapers.ts` and delete the placeholder files.
 *
 * Keeps logos that fail the fabricated fingerprint (path-drawn / raster /
 * previously curated authentic mastheads). Updates US/GB/CA/DE/FR explainers
 * for newly installed authentic assets. Rewrites die-welt.svg → die-welt.png.
 *
 * Re-run is safe: entries that already have noImageReason / authentic logos
 * are left alone.
 */
import { readFileSync, writeFileSync, unlinkSync, existsSync, readdirSync, statSync } from "node:fs";
import { dirname, resolve, join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DATA = resolve(ROOT, "src/data/nationalNewspapers.ts");
const LOGO_ROOT = resolve(ROOT, "public/newspaper-logos");

/** Same fingerprint the check gate will enforce. */
function isFabricatedSvg(absPath) {
  if (!existsSync(absPath)) return true;
  if (extname(absPath).toLowerCase() !== ".svg") return false;
  const size = statSync(absPath).size;
  const text = readFileSync(absPath, "utf8");
  const hasText = /<text[\s>]/i.test(text);
  const hasRect = /<rect[\s>]/i.test(text);
  const pathCount = (text.match(/<path[\s>]/gi) || []).length;
  // Classic generator fingerprint: tiny SVG with a coloured rect + system <text>.
  if (size < 2500 && hasText && hasRect && pathCount <= 2) return true;
  if (size < 1500 && hasText) return true;
  return false;
}

const EXPLAINER_OVERRIDES = {
  "us-nyt": {
    logoExplainer:
      "Historic blackletter (Old English) masthead spelling 'The New York Times' — the nameplate used on the print front page and digital masthead.",
    licenceNote:
      "The New York Times masthead is a trademark of The New York Times Company, bundled from the publisher's public brand artwork for educational reference in Learn mode.",
  },
  "us-washington-post": {
    logoExplainer:
      "Blackletter gothic masthead spelling 'The Washington Post' — the nameplate used across print and digital editions.",
    licenceNote:
      "The Washington Post masthead is a trademark of Nash Holdings / The Washington Post, bundled from Wikimedia Commons (File:The Logo of The Washington Post Newspaper.svg) for educational reference in Learn mode.",
  },
  "us-wsj": {
    logoExplainer:
      "Classic serif capitals spelling 'THE WALL STREET JOURNAL.' (with the trailing period) — the nameplate used on the print front page.",
    licenceNote:
      "The Wall Street Journal masthead is a trademark of Dow Jones & Company, bundled from Wikimedia Commons (File:The Wall Street Journal Logo.svg) for educational reference in Learn mode.",
  },
  "us-usa-today": {
    logoExplainer:
      "A cyan-blue disc beside the bold black sans-serif capitals 'USA TODAY'.",
    licenceNote:
      "USA Today masthead is a trademark of Gannett Co., Inc., bundled from Wikimedia Commons (File:USA Today (2020-01-29).svg; PD-textlogo) for educational reference in Learn mode.",
  },
  "gb-the-guardian": {
    logoExplainer:
      "Black high-contrast serif wordmark 'The Guardian', stacked on two lines.",
    licenceNote:
      "The Guardian masthead trademark bundled from Wikimedia Commons (File:The Guardian 2018.svg) for educational reference in Learn mode.",
  },
  "gb-the-telegraph": {
    logoExplainer:
      "Blackletter gothic masthead spelling 'The Telegraph' — the nameplate used by The Daily Telegraph.",
    licenceNote:
      "The Telegraph masthead trademark bundled from Wikimedia Commons (File:The Telegraph logo.svg) for educational reference in Learn mode.",
  },
  "gb-the-times": {
    logoExplainer:
      "Serif capitals 'THE' and 'TIMES' flanking the Royal Coat of Arms of the United Kingdom — the traditional Times of London nameplate.",
    licenceNote:
      "The Times masthead trademark bundled from Wikimedia Commons (File:The Times masthead.svg) for educational reference in Learn mode.",
  },
  "gb-financial-times": {
    logoExplainer:
      "Serif capitals spelling 'FINANCIAL TIMES' — the FT wordmark used on the salmon-pink print masthead and digital header.",
    licenceNote:
      "Financial Times masthead trademark bundled from Wikimedia Commons (File:Financial Times masthead.svg) for educational reference in Learn mode.",
  },
  "ca-the-globe-and-mail": {
    logoExplainer:
      "White serif capitals 'THE GLOBE AND MAIL' on a red field, with a small white maple leaf after MAIL — the paper's Canadian nameplate.",
    licenceNote:
      "The Globe and Mail masthead trademark bundled from Wikimedia Commons (File:The Globe and Mail (2019-10-31).svg) for educational reference in Learn mode.",
  },
  "ca-le-devoir": {
    logoExplainer:
      "High-contrast black serif capitals spelling 'LE DEVOIR' — the Montreal French-language daily's classic nameplate.",
    licenceNote:
      "Le Devoir masthead trademark bundled from Wikimedia Commons (File:Logo Le Devoir.svg) for educational reference in Learn mode.",
  },
  "ca-la-presse": {
    logoExplainer:
      "White bold sans-serif capitals 'LA PRESSE', stacked on two lines on a red square.",
    licenceNote:
      "La Presse masthead trademark bundled from Wikimedia Commons (File:2012 logo for La Presse newspaper.svg) for educational reference in Learn mode.",
  },
  "de-frankfurter-allgemeine-zeitung": {
    logoExplainer:
      "Blackletter gothic masthead spelling 'Frankfurter Allgemeine' — the FAZ nameplate used across print and digital.",
    licenceNote:
      "Frankfurter Allgemeine Zeitung masthead trademark bundled from Wikimedia Commons (File:Frankfurter Allgemeine Logo 2019.svg) for educational reference in Learn mode.",
  },
  "de-sueddeutsche-zeitung": {
    logoExplainer:
      "Wordmark for Süddeutsche Zeitung — the Munich broadsheet's title treatment.",
    licenceNote:
      "Süddeutsche Zeitung masthead trademark bundled from Wikimedia Commons (File:Süddeutsche Zeitung Logo.svg) for educational reference in Learn mode.",
  },
  "de-handelsblatt": {
    logoExplainer:
      "Wordmark for Handelsblatt — Germany's leading business daily title treatment.",
    licenceNote:
      "Handelsblatt masthead trademark bundled from Wikimedia Commons (File:Handelsblatt logo.svg) for educational reference in Learn mode.",
  },
  "de-die-welt": {
    logo: "newspaper-logos/de/die-welt.png",
    logoExplainer:
      "Dark-grey sans-serif capitals 'DIE WELT' with a blue-and-white globe between the two words.",
    licenceNote:
      "Die Welt masthead trademark bundled from Wikimedia Commons (File:Die Welt Logo 2015.png) for educational reference in Learn mode.",
  },
  "de-bild": {
    logoExplainer:
      "White condensed sans-serif 'BILD' on a red field — the tabloid's signature cover title.",
    licenceNote:
      "Bild masthead trademark bundled from Wikimedia Commons (File:Bild logo.svg) for educational reference in Learn mode.",
  },
  "fr-le-monde": {
    logoExplainer:
      "Blackletter gothic masthead spelling 'Le Monde' with a light engraved edge — the Paris daily's classic nameplate.",
    licenceNote:
      "Le Monde masthead trademark bundled from Wikimedia Commons (File:Le Monde logo.svg) for educational reference in Learn mode.",
  },
  "fr-le-figaro": {
    logoExplainer:
      "White serif capitals spelling 'LE FIGARO' on a blue rectangle, with a white quill feather set against the F.",
    licenceNote:
      "Le Figaro masthead trademark bundled from Wikimedia Commons (File:Le Figaro logo.svg) for educational reference in Learn mode.",
  },
  "fr-ouest-france": {
    logoExplainer:
      "Red lower-case 'ouest france' stacked on two lines beside a red disc divided by white lines.",
    licenceNote:
      "Ouest-France masthead trademark bundled from Wikimedia Commons (File:Ouest-France logo.svg) for educational reference in Learn mode.",
  },
  "fr-liberation": {
    logoExplainer:
      "Condensed white capitals spelling 'Libération', outlined in black with a heavy black offset shadow, laid across a red lozenge.",
    licenceNote:
      "Libération masthead trademark bundled from Wikimedia Commons (File:Logo liberation.svg) for educational reference in Learn mode.",
  },
};

const NO_IMAGE_REASON =
  "No verified masthead image is available in the app for this newspaper yet, so it is listed without one rather than with an invented logo.";

let src = readFileSync(DATA, "utf8");

// Rewrite die-welt path if still pointing at .svg
src = src.replace(
  /"logo": "newspaper-logos\/de\/die-welt\.svg"/g,
  '"logo": "newspaper-logos/de/die-welt.png"',
);

// Walk every newspaper object block roughly by "id" … next "id" / country close
const idRe = /"id":\s*"([^"]+)"/g;
const ids = [];
let m;
while ((m = idRe.exec(src))) ids.push({ id: m[1], index: m.index });

let stripped = 0;
let kept = 0;
let overridden = 0;
const deletedFiles = new Set();

// Process from end so indices stay valid
for (let i = ids.length - 1; i >= 0; i--) {
  const { id, index } = ids[i];
  const end = i + 1 < ids.length ? ids[i + 1].index : src.length;
  const block = src.slice(index, end);

  const logoMatch = block.match(/"logo":\s*"([^"]+)"/);
  const logoRel = logoMatch ? logoMatch[1] : null;
  const logoAbs = logoRel ? resolve(ROOT, "public", logoRel) : null;

  const override = EXPLAINER_OVERRIDES[id];
  let newBlock = block;

  if (override) {
    // Ensure authentic logo stays / path updated
    if (override.logo) {
      if (logoMatch) {
        newBlock = newBlock.replace(/"logo":\s*"[^"]+"/, `"logo": "${override.logo}"`);
      } else {
        // insert logo after id line
        newBlock = newBlock.replace(
          /("id":\s*"[^"]+",)/,
          `$1\n      "logo": "${override.logo}",`,
        );
      }
    }
    if (/"logoExplainer":\s*"[^"]*"/.test(newBlock)) {
      newBlock = newBlock.replace(
        /"logoExplainer":\s*"[^"]*"/,
        `"logoExplainer": ${JSON.stringify(override.logoExplainer)}`,
      );
    } else {
      newBlock = newBlock.replace(
        /("logo":\s*"[^"]+",)/,
        `$1\n      "logoExplainer": ${JSON.stringify(override.logoExplainer)},`,
      );
    }
    if (/"licenceNote":\s*"[^"]*"/.test(newBlock)) {
      newBlock = newBlock.replace(
        /"licenceNote":\s*"[^"]*"/,
        `"licenceNote": ${JSON.stringify(override.licenceNote)}`,
      );
    } else {
      // insert before sources
      newBlock = newBlock.replace(
        /("sources":)/,
        `"licenceNote": ${JSON.stringify(override.licenceNote)},\n      $1`,
      );
    }
    // Remove any noImageReason if present
    newBlock = newBlock.replace(/\s*"noImageReason":\s*"[^"]*",?/g, "");
    overridden++;
    kept++;
  } else if (logoAbs && isFabricatedSvg(logoAbs)) {
    // Strip logo + logoExplainer; add noImageReason
    newBlock = newBlock.replace(/\s*"logo":\s*"[^"]*",?/g, "");
    newBlock = newBlock.replace(/\s*"logoExplainer":\s*"[^"]*",?/g, "");
    newBlock = newBlock.replace(/\s*"licenceNote":\s*"[^"]*",?/g, "");
    if (!/"noImageReason":/.test(newBlock)) {
      newBlock = newBlock.replace(
        /("sources":)/,
        `"noImageReason": ${JSON.stringify(NO_IMAGE_REASON)},\n      $1`,
      );
    }
    deletedFiles.add(logoAbs);
    stripped++;
  } else if (logoAbs && existsSync(logoAbs)) {
    kept++;
  } else if (!logoMatch && /"noImageReason":/.test(block)) {
    kept++;
  } else if (!logoMatch) {
    // Missing both — add noImageReason
    newBlock = newBlock.replace(
      /("sources":)/,
      `"noImageReason": ${JSON.stringify(NO_IMAGE_REASON)},\n      $1`,
    );
    stripped++;
  }

  if (newBlock !== block) {
    src = src.slice(0, index) + newBlock + src.slice(end);
  }
}

writeFileSync(DATA, src);

// Delete fabricated files that are no longer referenced
let deleted = 0;
for (const abs of deletedFiles) {
  if (existsSync(abs)) {
    unlinkSync(abs);
    deleted++;
  }
}

// Also walk the logo tree and delete any remaining fabricated SVGs not referenced
function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}
const stillReferenced = new Set(
  [...src.matchAll(/"logo":\s*"([^"]+)"/g)].map((x) => resolve(ROOT, "public", x[1])),
);
let orphanFab = 0;
for (const p of walk(LOGO_ROOT)) {
  if (stillReferenced.has(p)) continue;
  if (isFabricatedSvg(p)) {
    unlinkSync(p);
    orphanFab++;
  }
}

console.log(
  JSON.stringify(
    { kept, stripped, overridden, deletedFiles: deleted, orphanFabDeleted: orphanFab },
    null,
    2,
  ),
);
