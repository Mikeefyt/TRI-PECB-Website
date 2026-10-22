// Motion helpers ported from v23 app.js. Content stays fully visible and usable without them.

const POINTER_CARDS = ".programme-card,.course-card,.about-list article,.pathway-choice,.home-page-card";
const CARD_VARS = ["--move-x", "--move-y", "--tilt-x", "--tilt-y", "--pointer-x", "--pointer-y"];

const prefersReduced = () => typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Fine-pointer devices get a restrained colour spotlight and a small physical tilt on cards. */
export function initialisePointerCards() {
  if (typeof window.matchMedia !== "function" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches || prefersReduced()) return;
  document.querySelectorAll<HTMLElement>(POINTER_CARDS).forEach((card) => {
    if (card.dataset.pointerReady) return;
    card.dataset.pointerReady = "true";
    card.classList.add("pointer-card");
    let frame: number | null = null,
      lastEvent: PointerEvent | null = null;
    const reset = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      lastEvent = null;
      card.classList.remove("is-pointer-hovered");
      CARD_VARS.forEach((name) => card.style.removeProperty(name));
    };
    card.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "touch" || prefersReduced()) return;
      card.classList.add("is-pointer-hovered");
    });
    card.addEventListener("pointermove", (event) => {
      if (event.pointerType === "touch" || prefersReduced()) return;
      lastEvent = event;
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        if (!lastEvent) return;
        const rect = card.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const x = Math.max(0, Math.min(1, (lastEvent.clientX - rect.left) / rect.width)),
          y = Math.max(0, Math.min(1, (lastEvent.clientY - rect.top) / rect.height));
        card.style.setProperty("--pointer-x", (x * 100).toFixed(1) + "%");
        card.style.setProperty("--pointer-y", (y * 100).toFixed(1) + "%");
        card.style.setProperty("--move-x", ((x - 0.5) * 6).toFixed(2) + "px");
        card.style.setProperty("--move-y", (-5 + (y - 0.5) * 4).toFixed(2) + "px");
        card.style.setProperty("--tilt-x", ((0.5 - y) * 4).toFixed(2) + "deg");
        card.style.setProperty("--tilt-y", ((x - 0.5) * 4).toFixed(2) + "deg");
      });
    });
    card.addEventListener("pointerleave", reset);
    card.addEventListener("pointercancel", reset);
  });
}

/** Clears the card effect when the visitor switches reduced motion on. */
export function resetPointerCards() {
  document.querySelectorAll<HTMLElement>(".pointer-card").forEach((card) => {
    card.classList.remove("is-pointer-hovered");
    CARD_VARS.forEach((name) => card.style.removeProperty(name));
  });
}

const REVEAL =
  ".client-section-heading,.finder-intro,.client-team-layout,.editorial-heading,.section-heading,.journey-grid article,.process-grid article,.focus-rows article,.page-cta .container";

/** Animates visible sections once. Returns a cleanup function. */
export function initialiseScrollReveal(): () => void {
  const observers: IntersectionObserver[] = [];
  if (typeof window.matchMedia === "function" && !prefersReduced() && typeof IntersectionObserver === "function") {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("reveal-pending");
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.1, rootMargin: "0px 0px -24px 0px" },
    );
    document.querySelectorAll<HTMLElement>(REVEAL).forEach((element, index) => {
      element.classList.add("scroll-reveal", "reveal-pending");
      element.style.setProperty("--reveal-delay", (index % 3) * 65 + "ms");
      observer.observe(element);
    });
    observers.push(observer);
  }
  const pathwayTrack = document.querySelector(".pathway-track");
  if (pathwayTrack) {
    if (typeof IntersectionObserver === "function") {
      const pathObserver = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              pathObserver.unobserve(entry.target);
            }
          }),
        { threshold: 0.2 },
      );
      pathObserver.observe(pathwayTrack);
      observers.push(pathObserver);
    } else pathwayTrack.classList.add("is-visible");
  }
  return () => observers.forEach((o) => o.disconnect());
}
