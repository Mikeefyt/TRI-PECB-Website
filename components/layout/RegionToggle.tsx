"use client";

import { MARKET, useRegion, type Region } from "@/lib/region";

const REGIONS: Region[] = ["AU", "MY"];

/** AU / MY training-market switch. The active region is blue and bold. */
export function RegionToggle({ className = "" }: { className?: string }) {
  const { region, setRegion } = useRegion();
  return (
    <div role="group" aria-label="Training market" className={`flex items-center gap-2.5 text-[14px] ${className}`}>
      {REGIONS.map((r, i) => (
        <span key={r} className="flex items-center gap-2.5">
          {i > 0 && (
            <span aria-hidden className="text-[#b5c1d0]">
              /
            </span>
          )}
          <button
            type="button"
            aria-pressed={region === r}
            onClick={() => setRegion(r)}
            className={`cursor-pointer rounded px-0.5 font-bold transition-colors ${
              region === r ? "text-blue" : "text-muted hover:text-navy"
            }`}
          >
            {r}
            <span className="sr-only"> ({MARKET[r]})</span>
          </button>
        </span>
      ))}
    </div>
  );
}
