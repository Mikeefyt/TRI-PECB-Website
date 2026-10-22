// Runs identical interactions on the Next.js export and on v23, comparing the results step by step.
// Usage: node scripts/compare-behaviour.mjs [nextBase] [v23Base]
import { chromium } from "playwright-core";

const nextBase = process.argv[2] ?? "http://127.0.0.1:4174";
const v23Base = process.argv[3] ?? "http://127.0.0.1:4173";

let browser;
for (const channel of ["msedge", "chrome"]) {
  try {
    browser = await chromium.launch({ channel });
    break;
  } catch {
    /* try next */
  }
}

let problems = 0,
  checks = 0;
function same(label, a, b) {
  checks++;
  const ok = JSON.stringify(a) === JSON.stringify(b);
  if (!ok) {
    problems++;
    console.log(`  !!  ${label}\n      v23:  ${JSON.stringify(a).slice(0, 400)}\n      next: ${JSON.stringify(b).slice(0, 400)}`);
  } else console.log(`  ok  ${label}`);
}

/** Runs `steps(page)` on both sites in fresh contexts; each step returns an observation. */
async function scenario(name, path, steps, options = {}) {
  console.log(`\n${name}`);
  const results = [];
  for (const base of [v23Base, nextBase]) {
    const context = await browser.newContext({ viewport: options.viewport ?? { width: 1440, height: 900 }, ...(options.context ?? {}) });
    const page = await context.newPage();
    await page.goto(base + path, { waitUntil: "networkidle" });
    await page.waitForTimeout(300);
    const observations = [];
    await steps(page, (label, value) => observations.push([label, value]));
    results.push(observations);
    await context.close();
  }
  const [v, n] = results;
  for (let i = 0; i < Math.max(v.length, n.length); i++) same(v[i]?.[0] ?? n[i]?.[0], v[i]?.[1], n[i]?.[1]);
}

const text = (page, sel) => page.locator(sel).first().evaluate((el) => el.innerText.replace(/\s+/g, " ").trim());

// 1. Courses: level filters and currency
await scenario("Courses: level filters and currency switching", "/courses/", async (page, see) => {
  see("initial grid", await text(page, "#course-grid"));
  for (const level of ["Foundation", "Lead Implementer", "Lead Auditor", "all"]) {
    await page.click(`[data-level="${level}"]`);
    see(`filter ${level}: grid`, await text(page, "#course-grid"));
    see(`filter ${level}: pressed`, await page.$$eval("[data-level]", (bs) => bs.map((b) => b.getAttribute("aria-pressed"))));
  }
  await page.click('[data-market="MY"]');
  see("MYR grid", await text(page, "#course-grid"));
  see("MYR label + additional", [await text(page, ".market-label"), await text(page, "#additional-price")]);
  see("MYR stored", await page.evaluate(() => localStorage.getItem("thinkrisk-market")));
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  see("MYR remembered after reload", await text(page, ".market-label"));
});

// 2. Course detail dialogs: all 9 standard/level combinations in both currencies
await scenario("Courses: 9 course dialogs × 2 currencies (18 enquiry links)", "/courses/", async (page, see) => {
  for (const market of ["AU", "MY"]) {
    await page.click(`[data-market="${market}"]`);
    for (const id of ["22301", "42001", "27001"])
      for (const level of ["Foundation", "Lead Implementer", "Lead Auditor"]) {
        await page.click(`[data-course="${id}"][data-course-level="${level}"]`);
        await page.waitForSelector("#course-dialog[open]");
        see(`${market} ${id} ${level}: dialog`, await text(page, "#course-detail"));
        see(`${market} ${id} ${level}: enquiry link`, await page.getAttribute("#course-detail a.button", "href"));
        await page.click("#course-dialog .dialog-close");
        see(`${market} ${id} ${level}: closed`, await page.$eval("#course-dialog", (d) => d.open));
      }
  }
  await page.click('[data-course="22301"][data-course-level="Foundation"]');
  await page.mouse.click(5, 5);
  see("backdrop click closes dialog", await page.$eval("#course-dialog", (d) => d.open));
});

// 3. Enquiry prefill for every dialog link, then submit
const prefills = [];
for (const market of ["AU", "MY"])
  for (const interest of ["ISO 22301 Business Continuity", "ISO/IEC 42001 AI Management Systems", "ISO/IEC 27001 Information Security"])
    for (const level of ["Foundation", "Lead Implementer", "Lead Auditor"]) prefills.push(new URLSearchParams({ interest, level, market }).toString());
for (const query of prefills.slice(0, 18)) {
  await scenario(`Contact prefill: ${decodeURIComponent(query).replace(/\+/g, " ")}`, `/contact/?${query}`, async (page, see) => {
    see("interest", await page.inputValue("#interest"));
    see("message", await page.inputValue("textarea[name=message]"));
    see("currency", await page.inputValue("#form-market"));
    see("header currency", await page.$$eval("[data-market]", (bs) => bs.map((b) => b.getAttribute("aria-pressed"))));
  });
}
await scenario("Contact: other prefill links", "/contact/?interest=Corporate%20%2F%20team%20training", async (page, see) => {
  see("team interest", await page.inputValue("#interest"));
  await page.goto(page.url().replace(/\/contact\/.*/, "/contact/?interest=Other%20PECB%20courses"), { waitUntil: "networkidle" });
  see("other interest", await page.inputValue("#interest"));
});

// 4. Enquiry form: validation, draft, copy and edit
await scenario("Contact: submit, draft, copy and edit", "/contact/", async (page, see) => {
  await page.click(".submit-button");
  see("invalid fields block submit", [await page.isVisible("#enquiry-form"), await page.isHidden("#email-result")]);
  await page.fill("input[name=name]", "Alex Tan");
  await page.fill("input[name=email]", "alex@example.com");
  await page.fill("input[name=organisation]", "Example & Co");
  await page.selectOption("#form-market", "MY");
  await page.selectOption("#interest", "Corporate / team training");
  await page.fill("textarea[name=message]", "Team of 5 in Kuala Lumpur.\nStart in March?");
  await page.click(".submit-button");
  await page.waitForTimeout(200);
  see("result shown, form hidden", [await page.isHidden("#enquiry-form"), await page.isVisible("#email-result")]);
  see("mailto", await page.getAttribute("#open-email", "href"));
  see("draft text", await page.inputValue("#email-draft"));
  see("focus on Open email draft", await page.evaluate(() => document.activeElement?.id));
  see("header switched to MYR", await page.$$eval("[data-market]", (bs) => bs.map((b) => b.getAttribute("aria-pressed"))));
  await page.click("#edit-enquiry");
  await page.waitForTimeout(100);
  see("edit restores form with values", [await page.isVisible("#enquiry-form"), await page.inputValue("input[name=name]"), await page.inputValue("textarea[name=message]")]);
  see("focus on name", await page.evaluate(() => document.activeElement?.getAttribute("name")));
  await page.fill("textarea[name=message]", "");
  await page.click(".submit-button");
  await page.waitForTimeout(200);
  see("empty goals uses default text", await page.inputValue("#email-draft"));
});

// 5. Pathway: level chooser and course finder
await scenario("Pathway: level chooser and course finder", "/your-pathway/", async (page, see) => {
  see("initial summary", [await text(page, ".pathway-summary"), await text(page, ".finder-result")]);
  for (const level of ["Lead Implementer", "Lead Auditor", "Foundation"]) {
    await page.click(`[data-training-pathway="${level}"]`);
    see(`choose ${level}`, [await text(page, ".pathway-summary"), await page.inputValue("#finder-level"), await text(page, ".finder-result"), await page.getAttribute("#finder-enquire", "href")]);
  }
  for (const std of ["42001", "27001"])
    for (const lvl of ["Foundation", "Lead Auditor"]) {
      await page.selectOption("#finder-standard", std);
      await page.selectOption("#finder-level", lvl);
      see(`finder ${std} ${lvl}`, [await text(page, ".finder-result"), await page.getAttribute("#finder-enquire", "href")]);
    }
  await page.click('[data-market="MY"]');
  see("finder in MYR", [await text(page, "#finder-price"), await page.getAttribute("#finder-enquire", "href")]);
});

// 6. Header navigation: dropdowns, keyboard and mobile menu
await scenario("Header: dropdowns and keyboard", "/", async (page, see) => {
  await page.click("#nav-pathway");
  see("click opens Pathway panel", [await page.getAttribute("#nav-pathway", "aria-expanded"), await page.isVisible("#menu-pathway")]);
  await page.click("#nav-about");
  see("opening About closes Pathway", [await page.isHidden("#menu-pathway"), await page.isVisible("#menu-about")]);
  await page.click("h1");
  see("outside click closes", await page.isHidden("#menu-about"));
  await page.focus("#nav-courses");
  await page.keyboard.press("ArrowDown");
  see("ArrowDown opens and focuses first link", await page.evaluate(() => document.activeElement?.textContent));
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("End");
  see("End focuses last link", await page.evaluate(() => document.activeElement?.textContent));
  await page.keyboard.press("Home");
  see("Home focuses first link", await page.evaluate(() => document.activeElement?.textContent));
  await page.keyboard.press("ArrowUp");
  see("ArrowUp wraps to last", await page.evaluate(() => document.activeElement?.textContent));
  await page.keyboard.press("Escape");
  see("Escape closes and returns focus", [await page.isHidden("#menu-courses"), await page.evaluate(() => document.activeElement?.id)]);
  await page.focus("#nav-about");
  await page.keyboard.press("ArrowUp");
  see("ArrowUp on trigger focuses last link", await page.evaluate(() => document.activeElement?.textContent));
});
await scenario("Header: mobile menu", "/", async (page, see) => {
  await page.click("#menu-toggle");
  see("toggle opens", [await page.getAttribute("#menu-toggle", "aria-expanded"), await page.getAttribute("#menu-toggle", "aria-label"), await page.$eval("#primary-nav", (n) => n.classList.contains("open"))]);
  await page.keyboard.press("Escape");
  see("Escape closes and focuses toggle", [await page.getAttribute("#menu-toggle", "aria-expanded"), await page.evaluate(() => document.activeElement?.id)]);
  await page.click("#menu-toggle");
  await page.click("#nav-courses");
  see("dropdown inside mobile menu", await page.isVisible("#menu-courses"));
  await page.click('#menu-courses a[href="/courses/#course-focus"]');
  await page.waitForURL("**/courses/#course-focus");
  await page.waitForTimeout(500);
  see("link navigates and closes menu", [new URL(page.url()).pathname + new URL(page.url()).hash, await page.$eval("#primary-nav", (n) => n.classList.contains("open"))]);
}, { viewport: { width: 390, height: 844 } });

// 7. Privacy dialog and footer
await scenario("Footer: privacy dialog and year", "/faqs/", async (page, see) => {
  see("year", await text(page, "#year"));
  await page.click("#privacy-open");
  see("privacy opens", [await page.$eval("#privacy-dialog", (d) => d.open), await text(page, "#privacy-dialog")]);
  await page.keyboard.press("Escape");
  see("Escape closes privacy", await page.$eval("#privacy-dialog", (d) => d.open));
});

// 8. Home: particle story follows scrolling, and the current-page marker
await scenario("Home: particle story and course links", "/", async (page, see) => {
  see("nav current page", await page.$$eval("[aria-current=page]", (els) => els.map((e) => e.textContent)));
  for (const i of [0, 1, 2]) {
    await page.locator(".programme-scroll-slot").nth(i).evaluate((el) => window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.52 + el.offsetHeight / 2));
    await page.waitForTimeout(400);
    see(`slot ${i} active`, [await page.$$eval(".programme-scroll-slot", (s) => s.map((x) => x.classList.contains("is-scroll-active"))), await text(page, ".particle-stage figcaption"), await page.getAttribute("#particle-course-link", "href"), await page.getAttribute("#particle-course-link", "aria-label"), await page.getAttribute("#risk-particles", "aria-label")]);
  }
  await page.click('[data-market="MY"]');
  see("from prices in MYR", await page.$$eval("[data-from-price]", (els) => els.map((e) => e.textContent)));
  see("particles drawn", await page.$eval(".particle-stage", (s) => s.classList.contains("has-particles")));
});

// 9. Reduced motion keeps everything visible
await scenario("Reduced motion: no hidden content", "/your-pathway/", async (page, see) => {
  see("no reveal-pending elements", await page.$$eval(".reveal-pending", (els) => els.length));
}, { context: { reducedMotion: "reduce" } });

await browser.close();
console.log(problems ? `\n${problems} of ${checks} comparisons differ` : `\nAll ${checks} comparisons match v23`);
process.exit(problems ? 1 : 0);
