# Claude Code handover

> **Update (22 October 2026):** v23 has been ported to Next.js in this repository. The original export is kept unchanged in `reference/v23/` (its SHA-256 manifest still verifies). The Next.js site reproduces v23 exactly: identical visible text, links, titles, descriptions, canonical URLs and images on all seven pages, matching full-page renders at desktop and mobile widths, and 183 matching interaction checks (`npm run compare:v23`, `npm run compare:behaviour`). Where this document refers to `dist/` files, see the file map in `README.md`.

## Starting point

Use this folder as the complete baseline for Think Risk International's PECB training website. It matches published version 23, source commit `b24ad01c24ca3d78207aac1887614f1bc1a90616`. All 24 public website files and the original hosting configuration are included unchanged. Repository convenience files were added for this export.

The website's purpose is to attract individual learners and corporate training enquiries. It uses seven separate pages, an existing PECB catalogue, course detail dialogs, AUD/MYR switching, pathway selection and a contact form. It has no database or enquiry-sending backend.

## Latest completed changes

- Shared pathway banner points to Pathway, and certification/comparison links reach the relevant Pathway sections.
- The animated course arrow has a descriptive accessible name which follows the displayed standard.
- About Us states the confirmed PECB partnership, uses Worldwide access and contains the revised People and teams paragraph.
- Course descriptions, catalogue introduction, audience heading, course-structure wording, All levels filter label and course-enquiry copy were updated.
- Existing course fees, levels, durations, audiences and focus lists were retained. The additional-course offer was retained at the user's instruction.
- Office-location wording was removed from the Home and Courses metadata descriptions. The footer still says Australia · Malaysia; the FAQ still asks about enquiries from outside Australia or Malaysia. These were not part of that removal request.

## Existing checks and limits

Source and syntax checks passed before publication. All nine standard/level detail combinations in both currencies generated the expected 18 course enquiry URLs. Desktop preview checks covered level filters, currency switching, a course detail and a course enquiry prefill. About Us copy and its People and teams dropdown destination were checked on desktop.

Mobile and broader keyboard testing remain outstanding. Direct email delivery has not been configured or tested. The live form still prepares a draft and requires the visitor to send that email themselves.

## Work to complete

1. Refine only the changes the user requests while preserving the current content and design (no `CLAUDE.md` was included in the v23 export; treat v23 itself, in `reference/v23/`, as the content and design baseline).
2. Implement direct enquiry submission once an authorised sending service is available; use `ENQUIRY_REQUIREMENTS.md`.
3. Test desktop, mobile, keyboard navigation, dialogs, filters, currency, prefill, success/failure states and email receipt.
4. Update canonical URLs when the final website address is chosen. Seven pages currently contain the temporary Sites address.
5. Prepare deployment for the selected Hostinger plan and runtime. Keep the output directory explicit. The current static files require no framework build.
6. Coordinate the GoDaddy link with Mick: label PECB Training, placed below the existing PECB course description, pointing to the final address when ready.

## Suggested first instruction

> Review this repository and the handover documents. Preserve the existing multi-page Think Risk website, course catalogue, branding and motion effects. Confirm the current project structure and explain any changes needed for my chosen Hostinger setup. Implement the changes I request, validate them, and prepare a GitHub commit. Do not claim direct enquiry delivery works until an authorised sending service is configured and receipt at pecb@thinkrisk.com.au has been tested.
