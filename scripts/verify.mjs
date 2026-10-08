// End-to-end checks against a running site:
//  1. every string transcribed from the reference screenshots appears verbatim on the page
//  2. the enquiry form validates and builds the correct mailto link
//  3. course rows pre-select the form; tabs filter rows; AU/MY toggle updates labels
// Usage: node scripts/verify.mjs [baseUrl]
import { chromium } from "playwright-core";

const base = process.argv[2] ?? "http://localhost:3000";
let failures = 0;
const ok = (cond, msg) => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${msg}`);
  if (!cond) failures++;
};

const REFERENCE = [
  "PECB certification training", "Self-paced. Online. Built around you.", "Discover your pathway",
  "Courses", "Your pathway", "Corporate training", "About us", "AU", "MY", "Let’s talk",
  "THINK FORWARD. MANAGE RISK.", "Turn standards", "into your next", "advantage.",
  "Build practical expertise in business continuity, AI governance and information security with PECB certification training.",
  "Explore courses", "Training for your team", "Self-paced online learning", "Australia & Malaysia",
  "ONLINE LEARNING", "PECB CERTIFICATION TRAINING", "Build your knowledge.", "Strengthen your capability.",
  "Foundation · Lead Implementer · Lead Auditor", "Your professional development", "YOUR NEXT STEP", "Learn", "Prepare", "Apply",
  "PRACTICAL KNOWLEDGE. PROFESSIONAL GROWTH.",
  "One learning journey.", "Three critical disciplines.", "ISO 22301", "Business continuity", "ISO/IEC 42001", "AI governance", "ISO/IEC 27001", "Information security",
  "01 / EXPLORE THE COURSES", "Choose your focus.", "Build your expertise.",
  "From understanding the fundamentals to implementing and auditing a management system, find a pathway that fits your next step.",
  "All pathways", "Foundation", "Lead Implementer", "Lead Auditor", "Pricing for Australia",
  "Business Continuity", "Keep critical operations moving. Build the knowledge to plan for disruption and strengthen organisational resilience.",
  "AI Management Systems", "Bring structure to responsible AI. Explore governance, accountability and risk within an AI management system.",
  "Information Security", "Protect information with confidence. Develop your understanding of information security management and assurance.",
  "2-day course · Self-paced online", "5-day course · Self-paced online", "AUD $400", "AUD $995", "SELF-PACED ONLINE", "PECB PATHWAY",
  "Looking for another PECB pathway?", "Ask about additional three-day online courses.", "AUD $600", "Enquire",
  "Listed prices follow the reference course catalogue. Confirm current fees, tax treatment, availability and inclusions when enquiring. Duration indicates the course’s learning structure; self-paced study time may vary.",
  "02 / YOUR CERTIFICATION JOURNEY", "A clear path.", "A purposeful next step.",
  "Choose what you want to learn, build your knowledge at your pace, then follow the PECB examination and certification process.",
  "01", "02", "03", "04",
  "Find your standard", "Focus on business continuity, AI management systems or information security.",
  "Choose your level", "Learn the foundations, build implementation skills or develop your auditing knowledge.",
  "Learn on your terms", "Access self-paced online training and work through the course around your commitments.",
  "Follow the certification path", "Prepare for the examination and apply for the credential appropriate to your experience.",
  "Course completion and certification are separate steps. PECB sets the examination, experience and application requirements for each credential.",
  "Explore PECB",
  "03 / CORPORATE TRAINING", "Stronger people.", "More resilient", "organisations.",
  "Give your team a shared language for risk, governance and assurance. Develop a training pathway around the capabilities your organisation needs.",
  "Discuss team training", "CAPABILITY ACROSS YOUR TEAM",
  "A common foundation", "Build a shared understanding of the standard and its application to your organisation.",
  "The right depth for each role", "Match Foundation, Lead Implementer and Lead Auditor pathways to your team’s responsibilities.",
  "Flexible online learning", "Support professional development across Australia and Malaysia with self-paced access.",
  "Let’s start with your team’s goals.",
  "04 / WHY THINK RISK INTERNATIONAL", "Knowledge with", "real-world purpose.",
  "Think Risk International brings a practical perspective to risk, governance and assurance. Our PECB training pathways help professionals connect management system standards with everyday business decisions.",
  "Find the right fit for you",
  "Practical perspective", "Learning grounded in operational risk, governance and assurance.",
  "Professional development", "Clear pathways from foundational knowledge to specialist capability.",
  "Regional access", "Online learning for individuals and teams in Australia and Malaysia.",
  "A FEW THINGS TO KNOW", "Your questions,", "answered.", "Need help choosing?", "Talk to Think Risk ↗",
  "Which course level should I choose?", "How are the courses delivered?", "Does completing a course make me certified?",
  "Can we arrange training for a team?", "What is included in the course price?",
  "05 / TAKE YOUR NEXT STEP", "Let’s find your", "way forward.",
  "Tell us what you want to achieve. We’ll help you explore the right course or team training pathway.",
  "pecb@thinkrisk.com.au", "Supporting professionals in Australia & Malaysia",
  "Full name", "Work email", "Organisation", "Training market", "What are you interested in?", "Your goals", "Submit Enquiry",
  "Your details will be placed into an email draft. Review and send it using your email app.",
  "Think forward.", "Build capability that matters.", "Contact",
  `© ${new Date().getFullYear()} Think Risk International`, "Australia", "Malaysia", "Website privacy", "Back to top ↑",
];
const PLACEHOLDERS = ["Your full name", "you@company.com", "Company name", "Your preferred level, team size or what you’d like to achieve…"];

let browser;
for (const channel of ["msedge", "chrome"]) {
  try {
    browser = await chromium.launch({ channel });
    break;
  } catch {
    /* try next */
  }
}
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto(base, { waitUntil: "networkidle" });
const form = page.getByRole("form", { name: "Enquiry form" });

// 1. Verbatim text
const text = (await page.evaluate(() => document.body.innerText)).replace(/\s+/g, " ");
const missing = REFERENCE.filter((s) => !text.includes(s.replace(/\s+/g, " ")));
ok(missing.length === 0, `all ${REFERENCE.length} reference strings present${missing.length ? " — missing: " + JSON.stringify(missing) : ""}`);
const placeholders = await page.$$eval("input, textarea", (els) => els.map((e) => e.getAttribute("placeholder")));
ok(PLACEHOLDERS.every((p) => placeholders.includes(p)), "form placeholders match");
ok((await page.locator("#contact select").first().locator("option").first().textContent()) === "Select a course or team training" ||
  (await page.locator("option", { hasText: "Select a course or team training" }).count()) === 1, "interest placeholder option present");
ok((await page.locator('img[alt="PECB Authorized Training Partner"]').count()) === 1, "PECB badge in footer");

// 2. Form validation
await page.locator("#contact button[type=submit]").click();
const alerts = await page.locator("#contact [role=alert]").allTextContents();
ok(alerts.length === 3, `3 inline errors on empty submit (${alerts.join(" | ")})`);
await form.getByLabel("Work email").fill("not-an-email");
await page.locator("#contact button[type=submit]").click();
ok((await page.locator("#contact [role=alert]").allTextContents()).some((t) => t.includes("valid email")), "invalid email error shown");

// 3. Row pre-select, tabs, region
await page.getByRole("button", { name: /^Lead Auditor\s*, ISO\/IEC 42001 AI Management Systems enquiry/ }).click();
await page.waitForTimeout(400);
ok((await form.getByLabel("What are you interested in?").inputValue()) === "ISO/IEC 42001 AI Management Systems — Lead Auditor", "course row pre-selects interest");
await page.getByRole("button", { name: "Discuss team training" }).click();
await page.waitForTimeout(300);
ok((await form.getByLabel("What are you interested in?").inputValue()) === "Team training", "Discuss team training pre-selects Team training");

await page.getByRole("tab", { name: "Lead Implementer" }).click();
const rows = await page.locator("#course-cards ul button").count();
ok(rows === 3, `Lead Implementer tab shows one row per card (${rows})`);
await page.getByRole("tab", { name: "All pathways" }).click();

await page.getByRole("button", { name: "Malaysia" }).first().click();
ok(text.includes("Pricing for Australia") && (await page.locator("#courses").innerText()).includes("Pricing for Malaysia"), "MY toggle switches pricing label");
ok((await form.getByLabel("Training market").inputValue()) === "Malaysia", "MY toggle sets training market");
ok((await page.locator("#courses").innerText()).includes("AUD $995"), "AUD shown for MY while MYR prices are null");

// 4. Mailto
await form.getByLabel("Full name").fill("Alex Tan");
await form.getByLabel("Work email").fill("alex@example.com");
await form.getByLabel("Organisation").fill("Example & Co");
await form.getByLabel("What are you interested in?").selectOption("ISO 22301 Business Continuity — Foundation");
await form.getByLabel("Your goals").fill("Team of 5?\nStart in March.");
await page.locator("#contact button[type=submit]").click();
await page.waitForTimeout(300);
ok(await page.getByText("Your email app should open with your enquiry ready to send.").isVisible(), "confirmation shown");
const href = await page.getByTestId("mailto-draft").getAttribute("href");
const url = new URL(href);
ok(url.protocol === "mailto:" && url.pathname === "pecb@thinkrisk.com.au", `recipient is pecb@thinkrisk.com.au (${url.pathname})`);
const subject = decodeURIComponent(href.match(/subject=([^&]*)/)[1]);
ok(subject === "PECB enquiry — ISO 22301 Business Continuity — Foundation — Alex Tan", `subject: ${subject}`);
const body = decodeURIComponent(href.match(/body=([^&]*)/)[1]);
for (const line of ["Full name: Alex Tan", "Work email: alex@example.com", "Organisation: Example & Co", "Training market: Malaysia", "Interested in: ISO 22301 Business Continuity — Foundation", "Team of 5?\r\nStart in March."]) {
  ok(body.includes(line), `body contains "${line.replace(/\r\n/g, "\\r\\n")}"`);
}
ok(!/[ &?#]/.test(href.split("?")[1].replace(/&body=/, "").replace(/^subject=/, "")), "subject and body are fully URL-encoded");
console.log("\n--- body ---\n" + body + "\n------------");

// 5. Accordion: one open at a time
await page.getByRole("button", { name: "How are the courses delivered?" }).click();
await page.getByRole("button", { name: "Can we arrange training for a team?" }).click();
await page.waitForTimeout(400);
ok((await page.locator("#faq button[aria-expanded=true]").count()) === 1, "accordion keeps one item open");

await browser.close();
console.log(failures ? `\n${failures} check(s) failed` : "\nAll checks passed");
process.exit(failures ? 1 : 0);
