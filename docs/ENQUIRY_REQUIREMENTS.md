# Direct enquiry submission requirements

## Current state

`components/EnquiryForm.tsx` handles `#enquiry-form` by constructing an email draft and showing `#email-result` (ported unchanged from v23 `dist/app.js`). The contact page, FAQ and shared Website privacy dialogs describe that behaviour accurately. There is no POST endpoint, email provider configuration, API key or SMTP connection in this export.

## Intended behaviour

Send directly to `pecb@thinkrisk.com.au` when the visitor clicks Submit Enquiry. The mailbox owner uses Outlook. Select and configure an authorised server-side sending service with the user or their email administrator. No additional fees is the user's stated requirement; do not assume any provider or hosting plan meets it without confirmation.

Use an authorised sender and set the validated visitor address as Reply-To. Keep credentials in the deployment platform's secret settings. Do not use the visitor's address as the sender or put credentials in client-side code (anything under `components/` or `lib/` is shipped to the browser).

## Fields and prefill

Retain name (required, 120 characters), email (required, 200), organisation (optional, 160), preferred pricing currency (AUD/MYR), interest (required, existing options) and goals (optional, 4,000). The specification proposes changing Work email to Email address. Preserve standard, level and currency from course links. The selected level currently appears in the goals message.

Validate on the server as well as in the browser. Keep successful prefill and manual entries intact after errors. Add spam protection and prevent repeated clicks during submission.

## Visitor feedback

- Sending: Sending enquiry…
- Success, only after the service accepts the request: Thank you. Your enquiry has been submitted. Think Risk International will contact you using the email address provided.
- Failure: We couldn’t submit your enquiry. Please try again or email pecb@thinkrisk.com.au.

An accepted request does not prove receipt in the Outlook inbox. Test actual receipt, spam handling and Reply-To routing before launch. No real personal details are needed for a test enquiry.

## Related content

Update the form note, result panel, contact sending instructions, FAQ and the shared Website privacy dialog (now a single component in `components/SiteProvider.tsx`) together when direct sending is implemented. Remove draft-only controls only when replacing that workflow with a working sending path.

Proposed privacy text, pending confirmation against the actual sending/data-handling setup:

> We use the details you provide to respond to your training enquiry and discuss suitable course or team training options. Your enquiry is sent to Think Risk International at pecb@thinkrisk.com.au. Please provide only information relevant to your enquiry. Contact us at this address if you have questions about how we handle your information.

The named response owner, backup cover, internal response target and privacy approval remain to be recorded. Do not publish a response-time promise until agreed.
