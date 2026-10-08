// Screenshots every section at 1920px and 375px (plus a full page at each width).
// Uses an installed Microsoft Edge or Chrome, so no Playwright browser download is needed.
// Usage: node scripts/screenshots.mjs [baseUrl] [widths...]
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const base = process.argv[2] ?? "http://localhost:3000";
const widths = process.argv.slice(3).map(Number);
const WIDTHS = widths.length ? widths : [1920, 375];
const SECTIONS = ["header", "section[aria-labelledby=hero-title]", "section[aria-label=Standards]", "#courses", "#journey", "#corporate-training", "#why-thinkrisk", "#faq", "#contact", "footer"];

mkdirSync("screenshots", { recursive: true });

let browser;
for (const channel of ["msedge", "chrome"]) {
  try {
    browser = await chromium.launch({ channel });
    break;
  } catch {
    /* try next */
  }
}
if (!browser) throw new Error("No Edge/Chrome found");

for (const width of WIDTHS) {
  const page = await browser.newPage({ viewport: { width, height: width < 768 ? 812 : 1080 }, reducedMotion: "reduce" });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  // Scroll through the page so every scroll-triggered reveal has run.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(900);
  const wide = await page.evaluate(() =>
    [...document.querySelectorAll("body *")]
      .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1)
      .slice(0, 5)
      .map((el) => el.tagName + "." + String(el.className).slice(0, 80)),
  );
  if (wide.length) console.log("  overflowing:", wide);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  console.log(`${width}px horizontal overflow: ${overflow}px`);
  await page.screenshot({ path: `screenshots/full-${width}.png`, fullPage: true });
  for (const [i, sel] of SECTIONS.entries()) {
    const el = page.locator(sel).first();
    await el.scrollIntoViewIfNeeded();
    await el.screenshot({ path: `screenshots/${width}-${String(i).padStart(2, "0")}-${sel.replace(/[^a-z0-9]+/gi, "_")}.png` });
  }
  await page.close();
}
await browser.close();
console.log("done");
