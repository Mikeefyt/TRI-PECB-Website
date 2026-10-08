# ThinkRisk International — PECB Certification Training

Marketing site for ThinkRisk International (PECB Authorized Training Partner, Australia & Malaysia).
Built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, framer-motion, react-hook-form + zod and lucide-react.

## Setup

Requires Node.js 20 or later.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (type-checks and lints)
npm start          # serve the production build
```

Other scripts (they need a running site on http://localhost:3000; `npm start` works):

| Script | What it does |
| --- | --- |
| `npm run lint` / `npm run typecheck` | ESLint / TypeScript checks |
| `npm run verify` | Browser checks: every reference string appears verbatim, plus form validation, mailto recipient/subject/body, tabs, AU/MY toggle and the accordion |
| `npm run screenshots` | Screenshots of every section at 1920px and 375px into `screenshots/` |
| `node scripts/lighthouse.mjs http://localhost:3000` | Lighthouse (mobile and desktop) |
| `npm run icons` | Regenerates the favicon, Apple icon, Open Graph image and web-sized logo/badge from `public/brand/` |

The screenshot, verify and Lighthouse scripts use an installed Microsoft Edge or Google Chrome, so no Playwright browser download is needed.

> **OneDrive note:** if `next build` fails with `EINVAL: invalid argument, readlink ... .next`, delete the `.next` folder and build again. OneDrive sometimes turns build files into cloud placeholders.

## Where to edit content

| What | File |
| --- | --- |
| **Course prices (AUD and MYR)**, levels, durations, course descriptions, the "another PECB pathway" card and the pricing fine print | `data/courses.ts` |
| **FAQ** questions and answers | `data/faq.ts` |
| **Enquiry email address** (`ENQUIRY_EMAIL`), site URL, page title/description and nav dropdown items | `data/site.ts` |
| Privacy page text | `app/privacy/page.tsx` |
| Colours and type scale (design tokens) | `app/globals.css` (`:root` variables) |
| Logo and PECB badge | `public/brand/` (then run `npm run icons`) |

### Malaysian pricing

Each level in `data/courses.ts` has `priceAUD` and `priceMYR`. While `priceMYR` is `null`, the site shows the AUD price even when **MY** is selected. Enter a number (e.g. `priceMYR: 1450`) and MY visitors will see `MYR 1,450`. The same applies to `ANOTHER_PATHWAY.priceMYR`.

### Enquiry form

The form doesn't send anything to a server. On submit it validates the fields (full name, valid work email and interest are required), then opens the visitor's email app with a draft addressed to `ENQUIRY_EMAIL`:

- **Subject:** `PECB enquiry — {interest} — {full name}`
- **Body:** a plain-text summary of every field

A copy-to-clipboard button and a link to the draft are shown as a fallback. To change the recipient, edit `ENQUIRY_EMAIL` in `data/site.ts`.

## Deploying to Vercel

1. Push this folder to a Git repository (GitHub, GitLab or Bitbucket).
2. In Vercel, choose **Add New → Project**, import the repository and keep the detected **Next.js** defaults (build command `next build`, output `.next`).
3. Under **Settings → Environment Variables**, set `NEXT_PUBLIC_SITE_URL` to the production URL (e.g. `https://www.thinkrisk.com.au`). It's used for canonical URLs, the sitemap, robots.txt, Open Graph tags and JSON-LD.
4. Deploy, then add the custom domain under **Settings → Domains**.

Or deploy from the command line: `npx vercel` (preview) and `npx vercel --prod`.

## Project structure

```
app/                 layout, home page, /privacy, 404, sitemap, robots, icons
components/layout/   AnnouncementBar, Header, MobileMenu, RegionToggle, Footer (+ Logo, NavLink, BackToTop, Providers)
components/sections/ Hero, HeroIllustration, StandardsStrip, Courses, Journey, Corporate, WhyUs, Faq, Contact
components/ui/       Button, Card, Eyebrow, ArrowLink, Tabs, Accordion, IconTile (+ Reveal, SectionIntro)
data/                courses.ts, faq.ts, site.ts
lib/                 region.ts, mailto.ts, validation.ts, events.ts
public/brand/        thinkrisk-logo.png, pecb-authorized-partner.png (+ generated web sizes)
scripts/             screenshots, verify, lighthouse, icon generation
```
