# PECB Training | Think Risk International

Next.js port of the published Think Risk International PECB training website, **version 23** (source commit `b24ad01c24ca3d78207aac1887614f1bc1a90616`, exported 22 October 2026).

The site reproduces v23 exactly: same pages, copy, design, prices, dialogs, currency switching, pathway finder, enquiry form and motion effects. It is built as a **static export**, so `npm run build` produces plain HTML, CSS and JavaScript in `out/` that can be uploaded to any static host (including Hostinger) or deployed on Vercel.

| Page | URL | Source |
| --- | --- | --- |
| Home | `/` | `app/page.tsx` |
| Courses | `/courses/` | `app/courses/page.tsx` |
| Training | `/corporate-training/` | `app/corporate-training/page.tsx` |
| Pathway | `/your-pathway/` | `app/your-pathway/page.tsx` |
| About Us | `/about/` | `app/about/page.tsx` |
| FAQs | `/faqs/` | `app/faqs/page.tsx` |
| Contact | `/contact/` | `app/contact/page.tsx` |

## Run locally

Requires Node.js 20 or later.

```bash
npm install
npm run dev        # development server, http://localhost:3000
```

Build and preview the static export:

```bash
npm run build      # writes the static site to out/
npm run check      # validates pages, assets and internal links in out/
npm run preview    # serves out/ at http://127.0.0.1:4173/
```

## Where things live

| What | File (v23 equivalent) |
| --- | --- |
| Course fees (AUD and MYR), durations, descriptions, focus lists, course-detail and pathway wording | `lib/catalogue.ts` (`dist/app.js`, top) |
| Page content | `app/**/page.tsx` (`dist/**/index.html`) |
| Header and navigation dropdowns | `components/Header.tsx` |
| Footer | `components/Footer.tsx` |
| Course-detail and Website privacy dialogs, pricing currency | `components/SiteProvider.tsx` |
| Courses catalogue and level filter | `components/CourseCatalogue.tsx` |
| Home programme cards and particle animation | `components/ProgrammeStory.tsx` (`dist/particle-motion.js`) |
| Pathway level chooser and course finder | `components/PathwayExplorer.tsx` |
| Enquiry form (prepares an email draft) | `components/EnquiryForm.tsx` |
| Cursor field, scroll progress, reveals and card tilt | `components/CursorField.tsx`, `components/ScrollProgress.tsx`, `lib/motion.ts` (`dist/cursor-animation.js`, `dist/app.js`) |
| Styles | `app/styles/*.css`: the seven v23 stylesheets, unchanged, imported in v23's order in `app/layout.tsx` |
| Logos, PECB badge, illustrations, favicon | `public/assets/` (`dist/assets/`) |
| Canonical address | `NEXT_PUBLIC_SITE_URL` (see `lib/site.ts`) |

The enquiry address is `pecb@thinkrisk.com.au` (`ENQUIRY_EMAIL` in `lib/catalogue.ts`). The form does not send anything itself: it prepares an email draft that the visitor reviews and sends, as in v23. See `docs/ENQUIRY_REQUIREMENTS.md` for the planned direct-sending work.

## Checking against v23

The original v23 export is kept unchanged in `reference/v23/` (its `SOURCE-MANIFEST.json` hashes still verify). Two scripts compare the Next.js export with it in a browser (they use an installed Microsoft Edge or Chrome):

```bash
npm run build
node scripts/serve.mjs out 4174                 # Next.js export
node scripts/serve.mjs reference/v23/dist 4173  # original v23 (in a second terminal)
npm run compare:v23         # text, links, metadata, images and full-page pixel diff, desktop + mobile
npm run compare:behaviour   # filters, currency, 18 course enquiry links, form, finder, navigation, dialogs
```

`node scripts/lighthouse.mjs <url>` runs Lighthouse against any URL.

> **OneDrive note:** if a build fails with `EINVAL: invalid argument, readlink ... .next`, delete the `.next` folder and build again.

## Deployment

- **Hostinger or any static host:** run `npm run build`, then upload the contents of `out/` to the web root. Keep the folders so `/courses/` and the other routes resolve.
- **Vercel:** import the repository; Vercel detects Next.js and serves the static export.
- Set `NEXT_PUBLIC_SITE_URL` to the final address when building, so every canonical link, the sitemap and robots.txt use it. Until then they point to v23's temporary address.

More detail: `docs/DEPLOYMENT.md`, `docs/CLAUDE_HANDOVER.md`, `docs/ENQUIRY_REQUIREMENTS.md`.
