import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, "..", "public", "airline-logos");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const AIRLINES = [
  // Australia (already downloaded, but keep for completeness)
  { cc: "au", id: "qantas", file: "Qantas_Airways_logo_2016.svg" },
  { cc: "au", id: "jetstar", file: "Jetstar_logo.svg" },
  { cc: "au", id: "virgin-australia", file: "Virgin_Australia_Logo_2022.svg" },
  { cc: "au", id: "rex", file: "Rex_Airlines_logo.svg" },

  // Malaysia
  { cc: "my", id: "malaysia-airlines", file: "Malaysia_Airlines_logo.svg", page: "Malaysia Airlines" },
  { cc: "my", id: "airasia", file: "AirAsia_New_Logo.svg", page: "AirAsia" },
  { cc: "my", id: "batik-air-malaysia", file: "Batik_Air_Malaysia_logo.svg", page: "Batik Air Malaysia" },
  { cc: "my", id: "firefly", file: "Firefly_logo.svg", page: "Firefly (airline)" },

  // Brazil
  { cc: "br", id: "latam-brasil", file: "LATAM_Airlines_logo.svg", page: "LATAM Brasil" },
  { cc: "br", id: "gol", file: "Gol_Transportes_Aéreos_logo.svg", page: "Gol Linhas Aéreas" },
  { cc: "br", id: "azul", file: "Azul_Linhas_Aereas_Brasileiras_logo.svg", page: "Azul Brazilian Airlines" },
  { cc: "br", id: "voepass", file: "Voepass_Linhas_Aéreas_logo.svg", page: "Voepass Linhas Aéreas" },

  // Indonesia
  { cc: "id", id: "garuda-indonesia", file: "Garuda_Indonesia_Logo.svg", page: "Garuda Indonesia" },
  { cc: "id", id: "lion-air", file: "Lion_Air_logo.svg", page: "Lion Air" },
  { cc: "id", id: "batik-air", file: "Batik_Air_logo.svg", page: "Batik Air" },
  { cc: "id", id: "citilink", file: "Citilink_logo.svg", page: "Citilink" },
  { cc: "id", id: "super-air-jet", file: "Super_Air_Jet_logo.svg", page: "Super Air Jet" },
  { cc: "id", id: "indonesia-airasia", file: "Indonesia_AirAsia_logo.svg", page: "Indonesia AirAsia" },

  // Japan
  { cc: "jp", id: "ana", file: "All_Nippon_Airways_Logo.svg", page: "All Nippon Airways" },
  { cc: "jp", id: "jal", file: "Japan_Airlines_logo_(2011).svg", page: "Japan Airlines" },
  { cc: "jp", id: "peach", file: "Peach_Aviation_logo.svg", page: "Peach Aviation" },
  { cc: "jp", id: "skymark", file: "Skymark_Airlines_logo.svg", page: "Skymark Airlines" },

  // United States
  { cc: "us", id: "delta", file: "Delta_Air_Lines_logo.svg", page: "Delta Air Lines" },
  { cc: "us", id: "american", file: "American_Airlines_logo_2013.svg", page: "American Airlines" },
  { cc: "us", id: "united", file: "United_Airlines_Logo.svg", page: "United Airlines" },
  { cc: "us", id: "southwest", file: "Southwest_Airlines_logo_2014.svg", page: "Southwest Airlines" },
  { cc: "us", id: "alaska", file: "Alaska_Airlines_logo_(2016).svg", page: "Alaska Airlines" },
  { cc: "us", id: "jetblue", file: "JetBlue_Airways_Logo.svg", page: "JetBlue" },

  // France
  { cc: "fr", id: "air-france", file: "Air_France_2009_logo.svg", page: "Air France" },
  { cc: "fr", id: "transavia-france", file: "Transavia_logo_2015.svg", page: "Transavia France" },
  { cc: "fr", id: "french-bee", file: "French_Bee_logo.svg", page: "French Bee" },
  { cc: "fr", id: "corsair", file: "Corsair_International_logo.svg", page: "Corsair International" },

  // United Kingdom
  { cc: "gb", id: "british-airways", file: "British_Airways_Logo.svg", page: "British Airways" },
  { cc: "gb", id: "easyjet", file: "EasyJet_logo.svg", page: "easyJet" },
  { cc: "gb", id: "virgin-atlantic", file: "Virgin_Atlantic_logo.svg", page: "Virgin Atlantic" },
  { cc: "gb", id: "jet2", file: "Jet2.com_Logo.svg", page: "Jet2.com" },

  // UAE
  { cc: "ae", id: "emirates", file: "Emirates_logo.svg", page: "Emirates (airline)" },
  { cc: "ae", id: "etihad", file: "Etihad_Airways_logo.svg", page: "Etihad Airways" },
  { cc: "ae", id: "flydubai", file: "Flydubai_logo.svg", page: "flydubai" },
  { cc: "ae", id: "air-arabia", file: "Air_Arabia_Logo.svg", page: "Air Arabia" },

  // Qatar
  { cc: "qa", id: "qatar-airways", file: "Qatar_Airways_Logo.svg", page: "Qatar Airways" },
];

async function resolveLogoFile(page) {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(page)}&prop=images&format=json`;
    const res = await fetch(url, {
      headers: { "User-Agent": "HanaFlagGameBot/1.0 (https://github.com/wlad-c; contact@example.com)" },
    });
    const data = await res.json();
    const images = (data.parse?.images || []).filter(img => /logo/i.test(img) && (/\.svg$/i.test(img) || /\.png$/i.test(img)));
    return images[0] || null;
  } catch (err) {
    return null;
  }
}

async function getFileDownloadUrl(filename) {
  for (const domain of ["en.wikipedia.org", "commons.wikimedia.org"]) {
    try {
      const url = `https://${domain}/w/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json`;
      const res = await fetch(url, {
        headers: { "User-Agent": "HanaFlagGameBot/1.0 (https://github.com/wlad-c; contact@example.com)" },
      });
      const data = await res.json();
      const page = Object.values(data.query?.pages || {})[0];
      if (page?.imageinfo?.[0]?.url) {
        return page.imageinfo[0].url.replace(/\?.*$/, "");
      }
    } catch {}
  }
  return null;
}

async function main() {
  for (const a of AIRLINES) {
    const extTarget = path.extname(a.file || "") || ".svg";
    const outPath = path.join(PUBLIC_DIR, a.cc, `${a.id}${extTarget}`);
    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 500) {
      console.log(`[EXISTS] ${a.cc}/${a.id}`);
      continue;
    }

    let file = a.file;
    let dlUrl = file ? await getFileDownloadUrl(file) : null;

    if (!dlUrl && a.page) {
      await sleep(1000);
      file = await resolveLogoFile(a.page);
      if (file) {
        await sleep(1000);
        dlUrl = await getFileDownloadUrl(file);
      }
    }

    if (!dlUrl) {
      console.warn(`[MISSING] ${a.id} (${file || a.page})`);
      await sleep(800);
      continue;
    }

    const actualExt = path.extname(dlUrl) || ".svg";
    const finalPath = path.join(PUBLIC_DIR, a.cc, `${a.id}${actualExt}`);
    fs.mkdirSync(path.dirname(finalPath), { recursive: true });

    try {
      await sleep(800);
      const resp = await fetch(dlUrl, {
        headers: { "User-Agent": "HanaFlagGameBot/1.0 (https://github.com/wlad-c; contact@example.com)" },
      });
      const buf = Buffer.from(await resp.arrayBuffer());
      fs.writeFileSync(finalPath, buf);
      console.log(`[OK] ${a.cc}/${a.id}${actualExt} (${buf.length} bytes) from ${file}`);
    } catch (e) {
      console.error(`[ERROR] ${a.id}: ${e.message}`);
    }
  }
}

main();
