// Compares the Next.js export against the original v23 site, page by page.
// Checks visible text, link destinations, head metadata and a full-page pixel diff.
// Usage: node scripts/compare-v23.mjs [nextBase] [v23Base]
//   e.g. node scripts/serve.mjs out 4174 & node scripts/serve.mjs reference/v23/dist 4173
import { chromium } from "playwright-core";
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const nextBase = process.argv[2] ?? "http://127.0.0.1:4174";
const v23Base = process.argv[3] ?? "http://127.0.0.1:4173";
const ROUTES = ["/", "/courses/", "/corporate-training/", "/your-pathway/", "/about/", "/faqs/", "/contact/"];
const WIDTHS = [1440, 390];
mkdirSync("screenshots/compare", { recursive: true });

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

let problems = 0;
const report = (ok, msg) => {
  console.log(`${ok ? "  ok " : "  !! "} ${msg}`);
  if (!ok) problems++;
};

async function capture(page, url) {
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  return page.evaluate(() => ({
    text: document.body.innerText.replace(/[ \t]+/g, " ").replace(/\n\s*\n+/g, "\n").trim(),
    links: [...document.querySelectorAll("a[href]")].map((a) => `${a.textContent.replace(/\s+/g, " ").trim()} -> ${a.getAttribute("href")}`),
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content ?? "",
    canonical: document.querySelector('link[rel="canonical"]')?.href ?? "",
    images: [...document.images].map((i) => i.getAttribute("src") + "|" + i.alt),
  }));
}

function diffLines(a, b) {
  const A = a.split("\n"),
    B = b.split("\n");
  const out = [];
  const max = Math.max(A.length, B.length);
  for (let i = 0; i < max && out.length < 8; i++) if (A[i] !== B[i]) out.push(`      v23: ${JSON.stringify(A[i])}\n      next: ${JSON.stringify(B[i])}`);
  return out.join("\n");
}

async function pixelDiff(fileA, fileB, out) {
  const a = sharp(fileA),
    b = sharp(fileB);
  const [ma, mb] = await Promise.all([a.metadata(), b.metadata()]);
  const width = Math.min(ma.width, mb.width),
    height = Math.min(ma.height, mb.height);
  const [ra, rb] = await Promise.all([
    sharp(fileA).extract({ left: 0, top: 0, width, height }).removeAlpha().raw().toBuffer(),
    sharp(fileB).extract({ left: 0, top: 0, width, height }).removeAlpha().raw().toBuffer(),
  ]);
  const diff = Buffer.alloc(ra.length);
  let changed = 0;
  for (let i = 0; i < ra.length; i += 3) {
    const d = Math.abs(ra[i] - rb[i]) + Math.abs(ra[i + 1] - rb[i + 1]) + Math.abs(ra[i + 2] - rb[i + 2]);
    if (d > 30) {
      changed++;
      diff[i] = 255;
    } else diff[i] = diff[i + 1] = diff[i + 2] = Math.round(ra[i] * 0.25);
  }
  await sharp(diff, { raw: { width, height, channels: 3 } }).png().toFile(out);
  return { pct: (changed / (width * height)) * 100, heights: [ma.height, mb.height] };
}

for (const width of WIDTHS) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  for (const route of ROUTES) {
    console.log(`\n${route} @ ${width}px`);
    const v = await capture(page, v23Base + route);
    const n = await capture(page, nextBase + route);
    if (width === WIDTHS[0]) {
      report(v.text === n.text, "visible text identical" + (v.text === n.text ? "" : "\n" + diffLines(v.text, n.text)));
      const missing = v.links.filter((l) => !n.links.includes(l)),
        extra = n.links.filter((l) => !v.links.includes(l));
      report(!missing.length && !extra.length, `links identical (${v.links.length})` + (missing.length || extra.length ? `\n      missing: ${JSON.stringify(missing)}\n      extra: ${JSON.stringify(extra)}` : ""));
      report(v.title === n.title, `title: ${n.title}`);
      report(v.description === n.description, "meta description identical");
      report(v.canonical === n.canonical, `canonical: ${n.canonical}`);
      report(JSON.stringify(v.images) === JSON.stringify(n.images), `images identical (${v.images.length})`);
    }
    const name = (route === "/" ? "home" : route.replaceAll("/", "")) + "-" + width;
    await page.goto(v23Base + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    await page.screenshot({ path: `screenshots/compare/${name}-v23.png`, fullPage: true });
    await page.goto(nextBase + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    await page.screenshot({ path: `screenshots/compare/${name}-next.png`, fullPage: true });
    const { pct, heights } = await pixelDiff(`screenshots/compare/${name}-v23.png`, `screenshots/compare/${name}-next.png`, `screenshots/compare/${name}-diff.png`);
    report(pct < 0.5 && heights[0] === heights[1], `pixels: ${pct.toFixed(3)}% differ, page height v23 ${heights[0]}px / next ${heights[1]}px`);
  }
  await context.close();
}
await browser.close();
console.log(problems ? `\n${problems} difference(s) found` : "\nNo differences found");
process.exit(problems ? 1 : 0);
