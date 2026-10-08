"use client";

import type { LevelId } from "@/data/courses";

export const ENQUIRY_EVENT = "thinkrisk:enquiry";
export const LEVEL_EVENT = "thinkrisk:level";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}

/** Scrolls to the enquiry form and pre-selects an interest. */
export function requestEnquiry(interest: string) {
  window.dispatchEvent(new CustomEvent(ENQUIRY_EVENT, { detail: interest }));
  scrollToId("contact");
}

/** Scrolls to the courses section and selects a level tab. */
export function requestLevel(level: LevelId) {
  window.dispatchEvent(new CustomEvent(LEVEL_EVENT, { detail: level }));
  scrollToId("courses");
}
