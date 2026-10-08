"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Slide-up-and-fade as content scrolls into view. The root MotionConfig uses reducedMotion="user",
 * so visitors who prefer reduced motion get the fade without any movement.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  y = 48,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  as?: "div" | "li" | "p";
}) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
