"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ENQUIRY_EMAIL, LEVELS, STANDARDS, type Market } from "@/lib/catalogue";
import { useSite } from "./SiteProvider";

const INTERESTS = [
  "ISO 22301 Business Continuity",
  "ISO/IEC 42001 AI Management Systems",
  "ISO/IEC 27001 Information Security",
  "Corporate / team training",
  "Other PECB courses",
];

/** Builds the enquiry email exactly as v23 app.js did. */
export function buildEnquiry(f: { name: string; email: string; organisation: string; market: Market; interest: string; message: string }) {
  const subject = `PECB training enquiry — ${f.interest}`;
  const body = `Name: ${f.name}\nEmail: ${f.email}\nOrganisation: ${f.organisation || "Not provided"}\nPreferred pricing currency: ${f.market === "MY" ? "MYR" : "AUD"}\nInterest: ${f.interest}\n\nGoals / questions:\n${f.message || "Please send me more information about this training pathway."}`;
  return {
    subject,
    body,
    mailto: `mailto:${ENQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    draft: `To: ${ENQUIRY_EMAIL}\nSubject: ${subject}\n\n${body}`,
  };
}

/** Contact page form card: prepares an email draft (no data is sent to a server). */
export function EnquiryForm() {
  const { market, setMarket } = useSite();
  const formRef = useRef<HTMLFormElement>(null);
  const draftRef = useRef<HTMLTextAreaElement>(null);
  const openRef = useRef<HTMLAnchorElement>(null);
  const [result, setResult] = useState<{ mailto: string; draft: string } | null>(null);
  const [copyStatus, setCopyStatus] = useState("");

  // Course links pre-fill the interest, a message for the chosen level and the pricing currency.
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const params = new URLSearchParams(window.location.search);
    const interest = params.get("interest");
    const interestSelect = form.elements.namedItem("interest") as HTMLSelectElement;
    if (interest && [...interestSelect.options].some((o) => o.value === interest)) interestSelect.value = interest;
    const level = params.get("level");
    if (interest && LEVELS.some((l) => l.name === level) && STANDARDS.some((s) => s.code + " " + s.title === interest)) {
      (form.elements.namedItem("message") as HTMLTextAreaElement).value = `I am interested in the ${interest} ${level} course. Please confirm availability, pricing and inclusions.`;
    }
    const requested = params.get("market");
    if (requested === "AU" || requested === "MY") setMarket(requested);
  }, [setMarket]);

  // Focus "Open email draft" once the result panel is shown.
  useEffect(() => {
    if (result) openRef.current?.focus();
  }, [result]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "");
    setResult(
      buildEnquiry({
        name: get("name"),
        email: get("email"),
        organisation: get("organisation"),
        market: get("market") === "MY" ? "MY" : "AU",
        interest: get("interest"),
        message: get("message"),
      }),
    );
    setCopyStatus("");
  }

  async function copy() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.draft);
      setCopyStatus("Copied.");
    } catch {
      draftRef.current?.focus();
      draftRef.current?.select();
      setCopyStatus("Select and copy the text above.");
    }
  }

  return (
    <div className="form-card">
      <form id="enquiry-form" ref={formRef} onSubmit={onSubmit} hidden={!!result}>
        <div className="form-row">
          <label>
            Full name <span>*</span>
            <input name="name" autoComplete="name" placeholder="Your full name" required maxLength={120} />
          </label>
          <label>
            Work email <span>*</span>
            <input name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={200} />
          </label>
        </div>
        <div className="form-row">
          <label>
            Organisation
            <input name="organisation" autoComplete="organization" placeholder="Company name" maxLength={160} />
          </label>
          <label>
            Preferred pricing currency
            <select name="market" id="form-market" value={market} onChange={(e) => setMarket(e.target.value as Market)}>
              <option value="AU">AUD — Australian dollars</option>
              <option value="MY">MYR — Malaysian ringgit</option>
            </select>
          </label>
        </div>
        <label>
          What are you interested in? <span>*</span>
          <select id="interest" name="interest" required defaultValue="">
            <option value="">Select a course or team training</option>
            {INTERESTS.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </label>
        <label>
          Your goals
          <textarea
            name="message"
            rows={4}
            placeholder="Your preferred level, goals, country and time zone. For teams, include participant numbers…"
            maxLength={4000}
          ></textarea>
        </label>
        <button className="button submit-button" type="submit">
          Submit Enquiry <span aria-hidden="true">↗</span>
        </button>
        <p className="form-note">Your details will be placed into an email draft. Review and send it using your email app.</p>
      </form>
      <div id="email-result" className="email-result" hidden={!result} aria-live="polite">
        <p className="eyebrow dark">YOUR NEXT STEP</p>
        <h3>Your enquiry is ready.</h3>
        <p>
          Open the draft in your email app, then review and send it to <strong>{ENQUIRY_EMAIL}</strong>.
        </p>
        <a id="open-email" className="button" href={result?.mailto ?? `mailto:${ENQUIRY_EMAIL}`} ref={openRef}>
          Open email draft ↗
        </a>
        <details>
          <summary>Prefer to copy your enquiry?</summary>
          <textarea id="email-draft" rows={9} readOnly aria-label="Enquiry email text" ref={draftRef} value={result?.draft ?? ""}></textarea>
          <button type="button" id="copy-enquiry" className="text-link dark-link" onClick={copy}>
            Copy enquiry
          </button>
          <span id="copy-status" role="status">
            {copyStatus}
          </span>
        </details>
        <button
          type="button"
          id="edit-enquiry"
          className="text-link dark-link"
          onClick={() => {
            setResult(null);
            requestAnimationFrame(() => (formRef.current?.elements.namedItem("name") as HTMLInputElement | null)?.focus());
          }}
        >
          ← Edit enquiry
        </button>
      </div>
    </div>
  );
}
