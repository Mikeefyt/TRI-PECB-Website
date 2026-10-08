import type { LevelId } from "./courses";

/** Every enquiry is sent to this address. Change it here only. */
export const ENQUIRY_EMAIL = "pecb@thinkrisk.com.au";

// TODO: client to confirm the production domain (used for metadata, sitemap and JSON-LD).
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thinkrisk.com.au";

export const SITE_NAME = "Think Risk International";
export const SITE_TITLE = "Think Risk International | PECB Certification Training";
export const SITE_DESCRIPTION =
  "Build practical expertise in business continuity, AI governance and information security with PECB certification training.";

export const PECB_URL = "https://pecb.com";

export type NavItem = { label: string; href: string; /** Selects this level tab in the courses section. */ level?: LevelId };
export type NavGroup = { label: string; items: NavItem[] };

/** Header dropdowns: each item links to an existing on-page section or card. */
export const NAV: NavGroup[] = [
  {
    label: "Courses",
    items: [
      { label: "Business Continuity", href: "#course-iso-22301" },
      { label: "AI Management Systems", href: "#course-iso-iec-42001" },
      { label: "Information Security", href: "#course-iso-iec-27001" },
    ],
  },
  {
    label: "Your pathway",
    items: [
      { label: "Foundation", href: "#courses", level: "foundation" },
      { label: "Lead Implementer", href: "#courses", level: "lead-implementer" },
      { label: "Lead Auditor", href: "#courses", level: "lead-auditor" },
    ],
  },
  {
    label: "Corporate training",
    items: [{ label: "Corporate training", href: "#corporate-training" }],
  },
  {
    label: "About us",
    items: [
      { label: "Why Think Risk International", href: "#why-thinkrisk" },
      { label: "FAQ", href: "#faq" },
    ],
  },
];

export const FOOTER_LINKS: NavItem[] = [
  { label: "Courses", href: "/#courses" },
  { label: "Corporate training", href: "/#corporate-training" },
  { label: "Contact", href: "/#contact" },
];
