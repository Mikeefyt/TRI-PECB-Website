"use client";

import { useEffect, useRef } from "react";

/** Thin reading-progress bar along the top of the window (v23 app.js). */
export function ScrollProgress() {
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame: number | null = null;
    const update = () => {
      frame = null;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.max(0, Math.min(1, window.scrollY / max)) : 0;
      if (bar.current) bar.current.style.transform = "scaleX(" + progress + ")";
    };
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span id="scroll-progress" ref={bar}></span>
    </div>
  );
}
