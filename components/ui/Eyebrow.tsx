import type { ReactNode } from "react";

export function Eyebrow({ children, dot = false, className = "" }: { children: ReactNode; dot?: boolean; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${className}`}>
      {dot && <Dot />}
      {children}
    </p>
  );
}

/** Small blue dot with a soft halo, used beside eyebrows and footnotes. */
export function Dot({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`inline-flex size-[7px] shrink-0 rounded-full bg-blue ring-[3px] ring-icon-bg ${className}`} />;
}
