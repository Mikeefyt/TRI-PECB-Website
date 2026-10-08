"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import type { ReactNode } from "react";
import { RegionProvider } from "@/lib/region";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <RegionProvider>{children}</RegionProvider>
      </MotionConfig>
    </LazyMotion>
  );
}
