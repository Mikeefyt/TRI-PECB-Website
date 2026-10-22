// Validates the static export in out/ (adapted from v23's scripts/validate.mjs).
// Run after `npm run build`.
import fs from "node:fs";
import path from "node:path";

const out = path.resolve("out");
const routes = ["", "courses", "corporate-training", "your-pathway", "about", "faqs", "contact"];
if (!fs.existsSync(out)) throw new Error("out/ not found. Run `npm run build` first.");
for (const route of routes) {
  const file = path.join(out, route, "index.html");
  if (!fs.existsSync(file)) throw new Error(`Missing page: /${route}`);
  const html = fs.readFileSync(file, "utf8");
  for (const marker of ['id="cursor-field"', 'id="scroll-progress"', 'class="site-header"', "pecb-authorized-partner.png", 'id="privacy-dialog"', 'id="course-dialog"']) {
    if (!html.includes(marker)) throw new Error(`Missing ${marker} on /${route}`);
  }
  for (const match of html.matchAll(/(?:src|href)="(\/(?!\/)[^"?#]*)(?:[?#][^"]*)?"/g)) {
    const relative = decodeURIComponent(match[1]);
    let target = path.join(out, relative);
    if (relative.endsWith("/")) target = path.join(target, "index.html");
    if (!fs.existsSync(target)) throw new Error(`Missing target in /${route}: ${relative}`);
  }
}
if (!fs.existsSync(path.join(out, "404.html"))) throw new Error("Missing 404.html");
console.log("Validated seven pages, the 404 page, local assets and internal links in out/.");
console.log("Upload the contents of out/ to the web root (see docs/DEPLOYMENT.md).");
