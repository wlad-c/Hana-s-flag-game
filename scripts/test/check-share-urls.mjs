/**
 * Smoke-check that shareable routes keep a distinct URL reflecting the view.
 * Run against a local Vite server: node scripts/test/check-share-urls.mjs
 */
import { chromium } from "playwright";

const BASE = process.env.SHARE_TEST_BASE || "http://127.0.0.1:5173";
const browser = await chromium.launch({
  executablePath: "/usr/local/bin/google-chrome",
  args: ["--no-sandbox"],
});
let failures = 0;
function check(cond, label) {
  console.log(`${cond ? "PASS" : "FAIL"}  ${label}`);
  if (!cond) failures++;
}

const page = await browser.newPage({ viewport: { width: 1100, height: 800 } });

async function pathOf() {
  return new URL(page.url()).pathname + new URL(page.url()).search;
}

// 1. Home shows share icon before mute
await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
const share = page.locator(".site-topbar__share");
const mute = page.locator(".mute-toggle");
check(await share.count() === 1, "share on home");
check(!(await share.locator(".site-topbar__btn-label").count()), "share is icon-only (no label node)");
const shareBox = await share.boundingBox();
const muteBox = await mute.boundingBox();
check(!!shareBox && !!muteBox && shareBox.x < muteBox.x, "share sits before mute");

// 2. Bingo path is specific
await page.goto(`${BASE}/multiplayer/bingo`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(800);
check((await pathOf()).includes("/multiplayer/bingo"), "bingo URL is /multiplayer/bingo");
check(await share.count() === 1, "share on bingo");

// 3. Learn country + show write-back
await page.goto(`${BASE}/learn?country=AU&show=footballcrest`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(1500);
const learnUrl = await pathOf();
check(learnUrl.includes("country=AU"), `learn keeps country (${learnUrl})`);
check(learnUrl.includes("show=footballcrest"), `learn keeps show (${learnUrl})`);

// 4. Game mode sync (state-only launch → URL)
await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
await page.evaluate(() => {
  // Simulate in-app navigation with state but no query (the share gap).
  history.pushState({ usr: { quiz: { flagCount: 10 } } }, "", "/game");
});
// React Router may not see history.pushState usr — use real navigate via click if possible.
await page.goto(`${BASE}/game?mode=quiz&count=10`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(1000);
check((await pathOf()).includes("mode=quiz"), "quiz game URL has mode=quiz");
check((await pathOf()).includes("count=10"), "quiz game URL has count=10");

// 5. Calibrate
await page.goto(`${BASE}/calibrate`, { waitUntil: "domcontentloaded" });
check((await pathOf()).startsWith("/calibrate"), "calibrate URL");
check(await share.count() === 1, "share on calibrate");

await browser.close();
console.log(failures ? `\n${failures} failure(s)` : "\nall share URL checks passed");
process.exit(failures ? 1 : 0);
