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
  // 1. Germany
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Lufthansa_Logo_2018.svg',
    path.join(ROOT, 'public/airline-logos/de/lufthansa.svg')
  );
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Condor_logo_2022.svg',
    path.join(ROOT, 'public/airline-logos/de/condor.svg')
  );
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Eurowings_Logo.svg',
    path.join(ROOT, 'public/airline-logos/de/eurowings.svg')
  );

  // 2. Netherlands
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/KLM_logo.svg',
    path.join(ROOT, 'public/airline-logos/nl/klm.svg')
  );
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Transavia_logo.svg',
    path.join(ROOT, 'public/airline-logos/nl/transavia.svg')
  );

  // 3. Belgium
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Brussels_airlines_logo_2021.svg',
    path.join(ROOT, 'public/airline-logos/be/brussels-airlines.svg')
  );
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/TUIfly_Logo_2016.svg',
    path.join(ROOT, 'public/airline-logos/be/tui-fly-belgium.svg')
  );

  // 4. Austria
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Austrian_Airlines_Logo_2018.svg',
    path.join(ROOT, 'public/airline-logos/at/austrian-airlines.svg')
  );

  // 5. Switzerland
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Swiss_new.svg',
    path.join(ROOT, 'public/airline-logos/ch/swiss.svg')
  );
  await downloadFile(
    'https://en.wikipedia.org/w/index.php?title=Special:FilePath/Edelweiss_Air_logo.svg',
    path.join(ROOT, 'public/airline-logos/ch/edelweiss-air.svg')
  );

  console.log('All Batch 8 logos downloaded successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
