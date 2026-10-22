# Think Risk International PECB website

Complete source snapshot of the published website, version 23, exported on 22 October 2026.

Temporary website: https://think-risk-training.workspace-567439.chatgpt.site/

Source commit: `b24ad01c24ca3d78207aac1887614f1bc1a90616`.

## What this project contains

This is a multi-page static website written in HTML, CSS and JavaScript. The editable website source is in `dist/`. It is not currently a Next.js application and has no runtime package dependencies.

|Page|Source|
|-|-|
|Home|`dist/index.html`|
|Courses|`dist/courses/index.html`|
|Training|`dist/corporate-training/index.html`|
|Pathway|`dist/your-pathway/index.html`|
|About Us|`dist/about/index.html`|
|FAQs|`dist/faqs/index.html`|
|Contact|`dist/contact/index.html`|

Shared behaviour is in `dist/app.js`. Course data, durations and AUD/MYR prices are defined near its beginning. Shared styles and motion scripts are in `dist/`; logos, the PECB badge and illustrations are in `dist/assets/`.

## Run locally

Install Node.js 20 or later, then open a terminal in this folder:

```sh
npm run dev
```

Open http://127.0.0.1:4173/. Stop with Ctrl+C. No `npm install` is required because the preview uses only Node's built-in modules. Serve the website from its root rather than opening HTML files directly; its links use root-relative paths.

Check the export:

```sh
npm run build
```

This command validates the existing static files; it does not compile a framework. The deployment directory remains `dist/`. The preview server serves static files only; it is not an enquiry backend.

## 

