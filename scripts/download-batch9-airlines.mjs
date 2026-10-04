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
  // 1. Luxembourg
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Luxair_Logo.svg',
    path.join(ROOT, 'public/airline-logos/lu/luxair.svg')
  );

  // 2. Spain
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Logotipo_de_Iberia.svg',
    path.join(ROOT, 'public/airline-logos/es/iberia.svg')
  );
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Logo_Vueling.svg',
    path.join(ROOT, 'public/airline-logos/es/vueling.svg')
  );
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Air_Europa_Logo.svg',
    path.join(ROOT, 'public/airline-logos/es/air-europa.svg')
  );

  // 3. Portugal
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/TAP_Air_Portugal_logo.svg',
    path.join(ROOT, 'public/airline-logos/pt/tap-air-portugal.svg')
  );
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Portugalia_Airlines_New_Logo.svg',
    path.join(ROOT, 'public/airline-logos/pt/portugalia-airlines.svg')
  );

  // 4. Italy
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/ITA_Airways_Logo.svg',
    path.join(ROOT, 'public/airline-logos/it/ita-airways.svg')
  );
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/NEOS_logo_2022.svg',
    path.join(ROOT, 'public/airline-logos/it/neos.svg')
  );

  // 5. Greece
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Aegean_Airlines_Logo_2020.svg',
    path.join(ROOT, 'public/airline-logos/gr/aegean-airlines.svg')
  );
  await downloadFile(
    'https://commons.wikimedia.org/w/index.php?title=Special:FilePath/Sky_Express_(Greece)_logo.svg',
    path.join(ROOT, 'public/airline-logos/gr/sky-express.svg')
  );

  console.log('All Batch 9 logos downloaded successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
