"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { initialisePointerCards, initialiseScrollReveal, resetPointerCards } from "@/lib/motion";

/** Runs v23's scroll reveals and pointer-card effects for each page as it is shown. */
export function PageEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const cleanup = initialiseScrollReveal();
    initialisePointerCards();
    return cleanup;
  }, [pathname]);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event: MediaQueryListEvent) => (event.matches ? resetPointerCards() : initialisePointerCards());
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return null;
}
