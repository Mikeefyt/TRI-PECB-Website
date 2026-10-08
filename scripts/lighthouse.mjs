// Runs Lighthouse (mobile + desktop) against a running site using the installed Edge/Chrome.
// Usage: node scripts/lighthouse.mjs [url]
import { chromium } from "playwright-core";
import lighthouse from "lighthouse";
import desktopConfig from "lighthouse/core/config/desktop-config.js";

const url = process.argv[2] ?? "http://localhost:3000";
const PORT = 9333;

let browser;
for (const channel of ["msedge", "chrome"]) {
  try {
    browser = await chromium.launch({ channel, args: [`--remote-debugging-port=${PORT}`] });
    break;
  } catch {
    /* try next */
  }
}

for (const [name, config] of [["mobile", undefined], ["desktop", desktopConfig]]) {
  const { lhr } = await lighthouse(url, { port: PORT, output: "json", logLevel: "error" }, config);
  console.log(`${name}: ` + Object.values(lhr.categories).map((c) => `${c.title} ${Math.round(c.score * 100)}`).join(" | "));
  const lcpEl = lhr.audits["largest-contentful-paint-element"]?.details?.items?.[0]?.items?.[0]?.node?.snippet;
  if (lcpEl) console.log(`   LCP element: ${lcpEl.slice(0, 160)}`);
  for (const a of Object.values(lhr.audits)) {
    if (a.score !== null && a.score < 0.9 && !["informative", "manual", "notApplicable"].includes(a.scoreDisplayMode)) {
      console.log(`   - ${a.id} (${a.score}) ${a.displayValue ?? ""}`);
    }
  }
}
await browser.close();
