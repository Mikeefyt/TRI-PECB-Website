# Deployment notes

## Static website

The website files to serve are the contents of `dist/`. Preserve its subfolders so routes such as `/courses/` and `/about/` resolve to their own `index.html` files.

- Local validation command: `npm run build`.
- Deployment output directory: `dist`.
- No framework compilation or runtime dependencies are required for the current static version.
- If deploying through a hosting file manager, copy the contents of `dist/` into the configured web root. Do not expose the whole repository, documentation or future secret files as public website content.

The included Node preview server is for local checking. It does not send enquiry emails.

## Hostinger and future backend

Use the deployment method supported by the plan and website runtime actually selected. A future Next.js conversion or direct enquiry backend may require a different build command, runtime and secret configuration. Establish that before deployment rather than assuming that uploading static files enables email sending.

The current temporary Sites website requires workspace access. That access rule does not transfer automatically to a separate Hostinger deployment.

Replace temporary canonical URLs with the chosen final website address before launch. Check all seven page routes, assets, dropdowns, course dialogs, currency switching and contact links on desktop and mobile. Verify delivery to the nominated mailbox once direct sending is implemented.

## Existing GoDaddy website

Mick is the identified Think Risk website manager, as advised by Ms. Colleen. The proposed link wording is PECB Training, below the PECB courses description. Supply the final destination address before that link is published. The existing GoDaddy product and publishing arrangements still need confirmation.

## Original Sites configuration

`.openai/hosting.json` is retained unchanged as part of the original source. It describes the existing Sites project and `dist` directory. It is not a Hostinger deployment configuration and contains no email-sending credentials.
