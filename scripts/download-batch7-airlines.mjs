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
  // 1. Iceland
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Icelandairlogo.svg',
    path.join(ROOT, 'public/airline-logos/is/icelandair.svg')
  );
  await downloadFile(
    'https://en.wikipedia.org/w/index.php?title=Special:FilePath/Fly_Play_logo.svg',
    path.join(ROOT, 'public/airline-logos/is/play.svg')
  );

  // 2. Ireland
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Aer_Lingus_logo.svg',
    path.join(ROOT, 'public/airline-logos/ie/aer-lingus.svg')
  );
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Ryanair_logo.svg',
    path.join(ROOT, 'public/airline-logos/ie/ryanair.svg')
  );

  // 3. Latvia
  const airbalticPath = path.join(ROOT, 'public/airline-logos/lv/airbaltic.svg');
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/AirBaltic_logo.svg',
    airbalticPath
  );

  // 4. Estonia
  const eeAirbalticPath = path.join(ROOT, 'public/airline-logos/ee/airbaltic.svg');
  fs.mkdirSync(path.dirname(eeAirbalticPath), { recursive: true });
  fs.copyFileSync(airbalticPath, eeAirbalticPath);
  console.log('Copied airBaltic to Estonia');

  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Nyxair-logo.png',
    path.join(ROOT, 'public/airline-logos/ee/nyxair.png')
  );

  // 5. Lithuania
  const ltAirbalticPath = path.join(ROOT, 'public/airline-logos/lt/airbaltic.svg');
  fs.mkdirSync(path.dirname(ltAirbalticPath), { recursive: true });
  fs.copyFileSync(airbalticPath, ltAirbalticPath);
  console.log('Copied airBaltic to Lithuania');

  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Getjet-logo.png',
    path.join(ROOT, 'public/airline-logos/lt/getjet-airlines.png')
  );

  console.log('All Batch 7 logos downloaded successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
