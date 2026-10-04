import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const headers = {
  'User-Agent': 'HanaFlagGameBot/1.0 (https://github.com/wlad-c/Hana-s-flag-game; educational-app)',
  'Accept': '*/*',
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function downloadFile(url, destPath) {
  if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
    console.log(`Already exists and valid: ${destPath} (${fs.statSync(destPath).size} bytes)`);
    return;
  }
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  console.log(`Fetching: ${url}`);
  await sleep(1500);
  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: HTTP ${res.status} ${res.statusText}`);
  }
  const arrayBuffer = await res.arrayBuffer();
  fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
  console.log(`Saved: ${destPath} (${fs.statSync(destPath).size} bytes)`);
}

async function main() {
  // 1. LATAM copies for Ecuador and Paraguay
  const latamSrc = path.join(ROOT, 'public/airline-logos/br/latam-brasil.svg');
  const latamEC = path.join(ROOT, 'public/airline-logos/ec/latam-ecuador.svg');
  const latamPY = path.join(ROOT, 'public/airline-logos/py/latam-paraguay.svg');
  fs.mkdirSync(path.dirname(latamEC), { recursive: true });
  fs.mkdirSync(path.dirname(latamPY), { recursive: true });
  fs.copyFileSync(latamSrc, latamEC);
  fs.copyFileSync(latamSrc, latamPY);
  console.log(`Copied LATAM logo to EC and PY`);

  // 2. Aeroregional (Ecuador)
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Logo_text_Aeroregional.png',
    path.join(ROOT, 'public/airline-logos/ec/aeroregional.png')
  );

  // 3. Paranair (Paraguay)
  await downloadFile(
    'https://www.logo.wine/a/logo/Paranair/Paranair-Logo.wine.svg',
    path.join(ROOT, 'public/airline-logos/py/paranair.svg')
  );

  // 4. Conviasa (Venezuela)
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Conviasa_Logo.svg',
    path.join(ROOT, 'public/airline-logos/ve/conviasa.svg')
  );

  // 5. Laser Airlines (Venezuela)
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Laser_(airline)_logo.svg',
    path.join(ROOT, 'public/airline-logos/ve/laser-airlines.svg')
  );

  // 6. Trans Guyana Airways (Guyana)
  await downloadFile(
    'https://storage.aerocrs.com/382/system/TGA%20Logo.png',
    path.join(ROOT, 'public/airline-logos/gy/trans-guyana-airways.png')
  );

  // 7. Surinam Airways (Suriname) - from Commons SUR-MEDIUM-LOGO.png
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/SUR-MEDIUM-LOGO.png',
    path.join(ROOT, 'public/airline-logos/sr/surinam-airways.png')
  );

  // 8. Gum Air (Suriname)
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Gum_air_logo.svg',
    path.join(ROOT, 'public/airline-logos/sr/gum-air.svg')
  );

  console.log('All Batch 5 logos downloaded successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
