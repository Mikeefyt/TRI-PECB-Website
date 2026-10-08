import type { CSSProperties, ReactNode } from "react";

/** Rounded-square light-blue tile that holds an icon. */
export function IconTile({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <span aria-hidden className={`inline-flex shrink-0 items-center justify-center rounded-lg bg-icon-bg text-blue ${className}`} style={style}>
      {children}
    </span>
  );
}
