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
    console.log(`Already exists: ${destPath} (${fs.statSync(destPath).size} bytes)`);
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
  // 1. Poland
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Lot_logo.svg',
    path.join(ROOT, 'public/airline-logos/pl/lot-polish-airlines.svg')
  );
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Enter_Air_logo.svg',
    path.join(ROOT, 'public/airline-logos/pl/enter-air.svg')
  );

  // 2. Czech Republic
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Smartwings_logo.svg',
    path.join(ROOT, 'public/airline-logos/cz/smartwings.svg')
  );
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Czech_Airlines_Logo.svg',
    path.join(ROOT, 'public/airline-logos/cz/czech-airlines.svg')
  );

  // 3. Hungary
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Wizz_Air_logo_2015.svg',
    path.join(ROOT, 'public/airline-logos/hu/wizz-air.svg')
  );

  // 4. Romania
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/TAROM_Logo_tail.svg',
    path.join(ROOT, 'public/airline-logos/ro/tarom.svg')
  );
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Hi-sky-airlines-logo.svg',
    path.join(ROOT, 'public/airline-logos/ro/hisky.svg')
  );

  // 5. Bulgaria
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Bulgaria_air_bg.svg',
    path.join(ROOT, 'public/airline-logos/bg/bulgaria-air.svg')
  );
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Logo_of_European_Air_Charter.png',
    path.join(ROOT, 'public/airline-logos/bg/european-air-charter.png')
  );

  console.log('All Batch 10 logos downloaded successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
