// Course catalogue, ported unchanged from v23's dist/app.js.
// Edit fees, durations, descriptions and focus lists here.

export type Market = "AU" | "MY";

export type Standard = {
  id: "22301" | "42001" | "27001";
  code: string;
  title: string;
  icon: string;
  description: string;
  system: string;
  focus: string[];
};

export type LevelName = "Foundation" | "Lead Implementer" | "Lead Auditor";

export type Level = { name: LevelName; days: number; AU: string; MY: string };

export const STANDARDS: Standard[] = [
  {
    id: "22301",
    code: "ISO 22301",
    title: "Business Continuity",
    icon: "↗",
    description:
      "Explore business continuity management principles and ISO 22301 requirements. Build knowledge of business impact analysis, continuity strategies and planning for disruption, with a focus on review and continual improvement.",
    system: "business continuity management system",
    focus: [
      "Business continuity principles and ISO 22301 requirements",
      "Business impact analysis, continuity strategies and planning",
      "Monitoring, review and continual improvement",
    ],
  },
  {
    id: "42001",
    code: "ISO/IEC 42001",
    title: "AI Management Systems",
    icon: "✳",
    description:
      "Explore AI management concepts and ISO/IEC 42001 requirements. Develop your understanding of governance, accountability and AI risk, and the processes used to evaluate and improve an AI management system.",
    system: "AI management system",
    focus: [
      "AI management concepts and ISO/IEC 42001 requirements",
      "Governance, responsibility and AI risk management",
      "Management system evaluation and continual improvement",
    ],
  },
  {
    id: "27001",
    code: "ISO/IEC 27001",
    title: "Information Security",
    icon: "◇",
    description:
      "Explore information security management principles and ISO/IEC 27001 requirements. Build knowledge of information security risk, controls and management system evaluation to support a systematic approach to protecting information.",
    system: "information security management system",
    focus: [
      "Information security principles and ISO/IEC 27001 requirements",
      "Information security risk management and controls",
      "Management system evaluation and continual improvement",
    ],
  },
];

export const LEVELS: Level[] = [
  { name: "Foundation", days: 2, AU: "AUD $400", MY: "MYR 1,180" },
  { name: "Lead Implementer", days: 5, AU: "AUD $995", MY: "MYR 2,950" },
  { name: "Lead Auditor", days: 5, AU: "AUD $995", MY: "MYR 2,950" },
];

/** The "Looking for another PECB pathway?" additional-course fee. */
export const ADDITIONAL_PRICE: Record<Market, string> = { AU: "AUD $600", MY: "MYR 1,750" };

export const MARKET_CODE: Record<Market, string> = { AU: "AUD", MY: "MYR" };

export const ENQUIRY_EMAIL = "pecb@thinkrisk.com.au";

/** "an AI management system" / "a business continuity management system". */
export function systemPhrase(standard: Standard) {
  return (/^[aeiou]/i.test(standard.system) ? "an " : "a ") + standard.system;
}

export function levelObjective(standard: Standard, level: LevelName) {
  if (level === "Foundation") return `Understand the main concepts and requirements of ${systemPhrase(standard)}.`;
  if (level === "Lead Implementer") return `Develop your knowledge of planning, implementing and maintaining ${systemPhrase(standard)}.`;
  return `Develop your knowledge of planning and conducting audits of ${systemPhrase(standard)}.`;
}

export function levelAudience(level: LevelName) {
  if (level === "Foundation") return "Professionals who want an introduction to the standard and its main management system concepts.";
  if (level === "Lead Implementer") return "Professionals responsible for implementing or managing the system, and consultants supporting that work.";
  return "Professionals working in audit, assurance or management system conformity assessment.";
}

/** Contact-page link that pre-fills the enquiry form with a standard, level and currency. */
export function courseEnquiryHref(standard: Standard, level: LevelName, market: Market) {
  return "/contact/?" + new URLSearchParams({ interest: standard.code + " " + standard.title, level, market }).toString();
}

export const PATHWAY_INFORMATION: Record<LevelName, { title: string; text: string }> = {
  Foundation: {
    title: "Start with the fundamentals.",
    text: "Foundation introduces your chosen standard and its main concepts. A practical starting point when you are exploring a new discipline.",
  },
  "Lead Implementer": {
    title: "Build implementation knowledge.",
    text: "Explore planning, implementing and maintaining a management system. A pathway for professionals who manage a system or support that work.",
  },
  "Lead Auditor": {
    title: "Develop your audit perspective.",
    text: "Explore planning and conducting management system audits. A pathway for professionals working in audit, assurance or conformity assessment.",
  },
};
