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
  // 1. PLUNA (Uruguay)
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Pluna.svg',
    path.join(ROOT, 'public/airline-logos/uy/pluna.svg')
  );

  // 2. Scandinavian Airlines (SAS) (Denmark / Sweden)
  const sasDkPath = path.join(ROOT, 'public/airline-logos/dk/sas.svg');
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Scandinavian_Airlines_logo.svg',
    sasDkPath
  );
  // Copy to Sweden
  const sasSePath = path.join(ROOT, 'public/airline-logos/se/sas.svg');
  fs.mkdirSync(path.dirname(sasSePath), { recursive: true });
  fs.copyFileSync(sasDkPath, sasSePath);
  console.log(`Copied SAS logo to Sweden`);

  // 3. Sunclass Airlines (Denmark)
  await downloadFile(
    'https://en.wikipedia.org/w/index.php?title=Special:FilePath/Sunclass_Airlines_logo.svg',
    path.join(ROOT, 'public/airline-logos/dk/sunclass-airlines.svg')
  );

  // 4. Norwegian Air Shuttle (Norway)
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Norwegian_Logo_2024.svg',
    path.join(ROOT, 'public/airline-logos/no/norwegian-air-shuttle.svg')
  );

  // 5. Widerøe (Norway)
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Wideroe_logo_2002.svg',
    path.join(ROOT, 'public/airline-logos/no/wideroe.svg')
  );

  // 6. Braathens Regional Airlines (BRA) (Sweden)
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/BRA_Braathens_Regional_Airlines_logo.svg',
    path.join(ROOT, 'public/airline-logos/se/braathens-regional-airlines.svg')
  );

  // 7. Finnair (Finland)
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Finnair_logo.svg',
    path.join(ROOT, 'public/airline-logos/fi/finnair.svg')
  );

  // 8. Norra (Nordic Regional Airlines) (Finland)
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Nordic_Regional_Airlines_logo.svg',
    path.join(ROOT, 'public/airline-logos/fi/norra.svg')
  );

  console.log('All Batch 6 logos downloaded successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
