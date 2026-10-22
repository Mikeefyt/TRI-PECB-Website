# Deployment notes

## Static website

The website files to serve are the contents of `out/`, produced by `npm run build` (a Next.js static export). Preserve its subfolders so routes such as `/courses/` and `/about/` resolve to their own `index.html` files.

- Build command: `npm run build`. Validate the export with `npm run check`, and preview it with `npm run preview` (http://127.0.0.1:4173/).
- Deployment output directory: `dist`.
- No framework compilation or runtime dependencies are required for the current static version.
- If deploying through a hosting file manager, copy the contents of `out/` into the configured web root. The export also includes `404.html`, `sitemap.xml` and `robots.txt`. Do not expose the whole repository, documentation or future secret files as public website content.

The included Node preview server is for local checking. It does not send enquiry emails.

## Hostinger and future backend

Use the deployment method supported by the plan and website runtime actually selected. The site is now a Next.js static export, so it needs no Node.js runtime on the host. A direct enquiry backend would add a server-side component (for example a serverless function or a hosting plan with Node.js) with its own build, runtime and secret configuration. Establish that before deployment rather than assuming that uploading static files enables email sending.

The current temporary Sites website requires workspace access. That access rule does not transfer automatically to a separate Hostinger deployment.

Replace temporary canonical URLs with the chosen final website address before launch: set `NEXT_PUBLIC_SITE_URL` (e.g. `https://www.example.com`) when building, which updates every canonical link, the sitemap and robots.txt. Check all seven page routes, assets, dropdowns, course dialogs, currency switching and contact links on desktop and mobile. Verify delivery to the nominated mailbox once direct sending is implemented.

## Existing GoDaddy website

Mick is the identified Think Risk website manager, as advised by Ms. Colleen. The proposed link wording is PECB Training, below the PECB courses description. Supply the final destination address before that link is published. The existing GoDaddy product and publishing arrangements still need confirmation.

## Original Sites configuration

`.openai/hosting.json` is retained unchanged as part of the original source. It describes the existing Sites project and `dist` directory. It is not a Hostinger deployment configuration and contains no email-sending credentials.
