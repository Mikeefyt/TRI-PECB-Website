"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { NavItem } from "@/data/site";
import { requestLevel } from "@/lib/events";

/** On-page nav link. Pathway items also select their level tab in the courses section. */
export function NavLink({ item, className, onNavigate, children }: { item: NavItem; className?: string; onNavigate?: () => void; children?: ReactNode }) {
  return (
    <Link
      href={item.href}
      className={className}
      onClick={(e) => {
        if (item.level) {
          e.preventDefault();
          requestLevel(item.level);
        }
        onNavigate?.();
      }}
    >
      {children ?? item.label}
    </Link>
  );
}
