import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, Asterisk, Diamond } from "lucide-react";

export type LevelId = "foundation" | "lead-implementer" | "lead-auditor";

export type Level = {
  id: LevelId;
  name: string;
  duration: string;
  delivery: string;
  priceAUD: number;
  /** TODO: client to supply Malaysian pricing. While null, AUD is shown for MY. */
  priceMYR: number | null;
};

export type Course = {
  id: string;
  code: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** Card top-border and icon accent colour. */
  accent: string;
  accentTint: string;
};

export const LEVELS: Level[] = [
  { id: "foundation", name: "Foundation", duration: "2-day course", delivery: "Self-paced online", priceAUD: 400, priceMYR: null },
  { id: "lead-implementer", name: "Lead Implementer", duration: "5-day course", delivery: "Self-paced online", priceAUD: 995, priceMYR: null },
  { id: "lead-auditor", name: "Lead Auditor", duration: "5-day course", delivery: "Self-paced online", priceAUD: 995, priceMYR: null },
];

export const COURSES: Course[] = [
  {
    id: "iso-22301",
    code: "ISO 22301",
    title: "Business Continuity",
    description:
      "Keep critical operations moving. Build the knowledge to plan for disruption and strengthen organisational resilience.",
    icon: ArrowUpRight,
    accent: "#6B95C4",
    accentTint: "#EAF1FA",
  },
  {
    id: "iso-iec-42001",
    code: "ISO/IEC 42001",
    title: "AI Management Systems",
    description:
      "Bring structure to responsible AI. Explore governance, accountability and risk within an AI management system.",
    icon: Asterisk,
    accent: "#8E96BC",
    accentTint: "#EEEFF7",
  },
  {
    id: "iso-iec-27001",
    code: "ISO/IEC 27001",
    title: "Information Security",
    description:
      "Protect information with confidence. Develop your understanding of information security management and assurance.",
    icon: Diamond,
    accent: "#5F9898",
    accentTint: "#EAF3F3",
  },
];

export const ANOTHER_PATHWAY = {
  title: "Looking for another PECB pathway?",
  text: "Ask about additional three-day online courses.",
  priceAUD: 600,
  /** TODO: client to supply Malaysian pricing. */
  priceMYR: null as number | null,
};

export const PRICING_NOTE =
  "Listed prices follow the reference course catalogue. Confirm current fees, tax treatment, availability and inclusions when enquiring. Duration indicates the course’s learning structure; self-paced study time may vary.";

/* ---------- Enquiry form "What are you interested in?" options ---------- */

export const INTEREST_ANOTHER = "Another PECB pathway";
export const INTEREST_TEAM = "Team training";

export function interestLabel(course: Course, level: Level) {
  return `${course.code} ${course.title} — ${level.name}`;
}

export const INTEREST_OPTIONS: string[] = [
  ...COURSES.flatMap((c) => LEVELS.map((l) => interestLabel(c, l))),
  INTEREST_ANOTHER,
  INTEREST_TEAM,
];
