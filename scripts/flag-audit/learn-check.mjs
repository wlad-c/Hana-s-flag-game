#!/usr/bin/env node
/**
 * The in-app half of the mandatory visual verification, for sub-national flags.
 *
 *   npm run build && npx vite preview --port 4173 &      # or: npm run dev
 *   node scripts/flag-audit/learn-check.mjs IT-TR IT-UD BY-MI
 *
 * For each code it opens Learn → country → sub-national view with that
 * division selected (/learn?country=CC&subdivisions=1&sub=CODE), expands both
 * "What this flag means" panels, and prints:
 *   - the division flag's src and whether it actually PAINTED
 *     (img.complete && naturalWidth > 0 — a reserved box is not a flag);
 *   - whether the division has an explainer, and its first words;
 *   - the capital card, if the panel opens one: flag src + painted, population
 *     row, explainer;
 *   - page errors and any flag fetched from a remote host (all must be bundled).
 * Screenshots go to $OUT (default ${TMPDIR:-/tmp}/flag-audit-shots). Look at
 * them: a printed src only proves which file loaded, not that it is right.
 * Env: BASE (default http://localhost:4173), CHROMIUM (default
 * /opt/pw-browsers/chromium, the path the cloud sessions provide).
 */
import { chromium } from "playwright";
import { mkdirSync, existsSync } from "node:fs";

const BASE = process.env.BASE ?? "http://localhost:4173";
const OUT = process.env.OUT ?? `${process.env.TMPDIR ?? "/tmp"}/flag-audit-shots`;
mkdirSync(OUT, { recursive: true });
const codes = process.argv.slice(2);
if (!codes.length) {
  console.error("usage: node scripts/flag-audit/learn-check.mjs CODE [CODE…]");
  process.exit(1);
}
const exe = process.env.CHROMIUM ?? "/opt/pw-browsers/chromium";
const browser = await chromium.launch(existsSync(exe) ? { executablePath: exe } : {});
const page = await (await browser.newContext({ viewport: { width: 1400, height: 1200 } })).newPage();
const remote = [];
const errors = [];
page.on("request", (r) => {
  if (/jsdelivr|wikimedia|githubusercontent|flagcdn/.test(r.url())) remote.push(r.url());
});
page.on("pageerror", (e) => errors.push(e.message));

for (const code of codes) {
  const cc = code.split("-")[0];
  await page.goto(`${BASE}/learn?country=${cc}&subdivisions=1&sub=${encodeURIComponent(code)}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  for (const b of await page.$$('button:has-text("What this flag means"), summary:has-text("What this flag means")')) {
    await b.click().catch(() => {});
    await page.waitForTimeout(250);
  }
  const report = await page.evaluate(() => {
    const clean = (t) => (t ?? "").replace(/\s+/g, " ").trim();
    const painted = (img) => (img ? `${img.getAttribute("src")} ${img.complete && img.naturalWidth > 0 ? "painted" : "NOT PAINTED"}` : "(no flag)");
    const explainer = (root) => {
      const m = clean(root?.innerText).match(/What this flag means(.{0,220})/);
      return m ? clean(m[1]) : "(no explainer)";
    };
    // Learn stacks one panel per level: "Choose a country", "Choose a division",
    // then "Capital of …" when the division's capital card is open.
    const panels = [...document.querySelectorAll("aside.learn-fs__panel")];
    const division = panels.find((a) => /^\s*choose a division/i.test(a.innerText));
    const capital = panels.find((a) => /^\s*capital of /i.test(a.innerText));
    return {
      division: division ? { flag: painted(division.querySelector(".learn-fs__flag-img")), explainer: explainer(division) } : "(no division panel)",
      capital: capital
        ? {
            heading: clean(capital.innerText.split("\n")[0]),
            flag: painted(capital.querySelector("img")),
            population: clean(capital.innerText).match(/Population [^)]*\)/)?.[0] ?? "(no population row)",
            explainer: explainer(capital),
          }
        : "(no capital card)",
    };
  });
  console.log(`\n## ${code}\n${JSON.stringify(report, null, 2)}`);
  await page.screenshot({ path: `${OUT}/${code}.png` });
}
console.log(`\nscreenshots: ${OUT}`);
console.log(`remote flag requests: ${remote.length}${remote.length ? ` ${remote.slice(0, 5).join(" ")}` : ""}`);
console.log(`page errors: ${errors.length}${errors.length ? ` ${errors.slice(0, 5).join(" | ")}` : ""}`);
await browser.close();
