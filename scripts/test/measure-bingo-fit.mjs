import { chromium } from "playwright";
const browser = await chromium.launch({ executablePath: "/usr/local/bin/google-chrome", args: ["--no-sandbox"] });
async function run(w, h, label) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
  await page.goto("http://127.0.0.1:5173/multiplayer/bingo", { waitUntil: "networkidle", timeout: 60000 });
  for (let i = 0; i < 50; i++) {
    const start = page.getByRole("button", { name: /Start game/i });
    if (await start.count() && await start.isEnabled()) { await start.click(); break; }
    if (await page.locator(".bingo__board .bingo__cell").count() >= 25) break;
    await page.waitForTimeout(300);
  }
  await page.waitForSelector(".bingo__board .bingo__cell", { timeout: 20000 });
  await page.waitForTimeout(500);
  const m = await page.evaluate(() => {
    const board = document.querySelector(".bingo__board");
    const cells = document.querySelectorAll(".bingo__board .bingo__cell");
    const br = board.getBoundingClientRect();
    const bottomNav = document.querySelector(".bottom-nav");
    const navTop = bottomNav?.getBoundingClientRect().top ?? window.innerHeight;
    const first = cells[0].getBoundingClientRect();
    const last = cells[24].getBoundingClientRect();
    return {
      cellCount: cells.length,
      boardTop: br.top,
      boardBottom: br.bottom,
      boardWidth: br.width,
      boardHeight: br.height,
      navTop,
      fitsAboveNav: br.bottom <= navTop + 1,
      allRowsVisible: first.top >= 0 && last.bottom <= navTop + 1,
      scrollY: window.scrollY,
      playing: document.querySelector(".bingo--playing") != null,
    };
  });
  console.log(label, JSON.stringify(m));
  await page.screenshot({ path: `/opt/cursor/artifacts/bingo-fit-${label}.png` });
  await page.close();
  return m;
}
const phone = await run(390, 844, "phone");
const short = await run(390, 700, "phone-short");
const ipad = await run(768, 1024, "ipad");
await browser.close();
const usable = (m) =>
  m.fitsAboveNav && m.allRowsVisible && m.scrollY === 0 && m.boardWidth >= 200;
const ok = usable(phone) && usable(short) && usable(ipad);
console.log(ok ? "PASS fit" : "FAIL fit");
process.exit(ok ? 0 : 1);
