import { ENQUIRY_EMAIL } from "@/data/site";
import type { EnquiryValues } from "./validation";

export function enquirySubject(v: EnquiryValues) {
  return `PECB enquiry — ${v.interest} — ${v.fullName}`;
}

/** Plain-text summary of every field, used as the email body and the copy fallback. */
export function enquiryBody(v: EnquiryValues) {
  const dash = (s: string) => (s.trim() ? s.trim() : "—");
  return [
    `Full name: ${v.fullName}`,
    `Work email: ${v.email}`,
    `Organisation: ${dash(v.organisation)}`,
    `Training market: ${v.market}`,
    `Interested in: ${v.interest}`,
    "",
    "Your goals:",
    dash(v.goals),
  ].join("\n");
}

export function buildMailto(v: EnquiryValues, to: string = ENQUIRY_EMAIL) {
  const subject = encodeURIComponent(enquirySubject(v));
  // RFC 6068: line breaks in the body are encoded as %0D%0A.
  const body = encodeURIComponent(enquiryBody(v).replace(/\n/g, "\r\n"));
  return `mailto:${to}?subject=${subject}&body=${body}`;
}
