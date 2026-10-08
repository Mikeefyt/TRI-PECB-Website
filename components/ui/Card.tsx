import type { HTMLAttributes, ReactNode } from "react";

/** White card: 1px light border, 16px radius, very soft shadow. */
export function Card({ children, className = "", ...rest }: { children: ReactNode; className?: string } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`rounded-2xl border border-line bg-white shadow-soft ${className}`} {...rest}>
      {children}
    </div>
  );
}
