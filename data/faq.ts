export type FaqItem = { question: string; answer: string };

// TODO: client to confirm. The questions come from the reference design; the answers are
// drafts built only from facts already stated on the page.
export const FAQ: FaqItem[] = [
  {
    question: "Which course level should I choose?",
    answer:
      "Foundation covers the fundamentals of the standard. Lead Implementer builds the skills to implement a management system, and Lead Auditor develops your auditing knowledge. If you’re unsure, tell us about your goals and we’ll help you choose.",
  },
  {
    question: "How are the courses delivered?",
    answer:
      "All courses are self-paced and online, so you can work through the material around your commitments from Australia or Malaysia.",
  },
  {
    question: "Does completing a course make me certified?",
    answer:
      "No. Course completion and certification are separate steps. PECB sets the examination, experience and application requirements for each credential.",
  },
  {
    question: "Can we arrange training for a team?",
    answer:
      "Yes. We can help you build a training pathway for your team, matching Foundation, Lead Implementer and Lead Auditor courses to each role’s responsibilities.",
  },
  {
    question: "What is included in the course price?",
    answer:
      "Please confirm current fees, tax treatment, availability and inclusions when you enquire, and we’ll set out exactly what your course includes.",
  },
];
