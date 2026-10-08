"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { NAV } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { NavLink } from "./NavLink";
import { RegionToggle } from "./RegionToggle";

/** Slide-down panel for small screens with the same items as the desktop nav. */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const onResize = () => window.innerWidth >= 1024 && onClose();
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence initial={false}>
      {open && (
        <m.nav
          id="mobile-menu"
          aria-label="Mobile"
          initial={reduce ? false : { height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden lg:hidden"
        >
          <div className="max-h-[calc(100dvh-120px)] overflow-y-auto border-t border-line px-4 pb-5 pt-2 md:px-[30px]">
            {NAV.map((group) => (
              <div key={group.label} className="border-b border-line py-3 last:border-b-0">
                <p className="pb-1 text-[12px] font-bold uppercase tracking-[0.14em] text-blue">{group.label}</p>
                <ul>
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <NavLink item={item} onNavigate={onClose} className="block py-2 text-[15px] text-ink hover:text-blue" />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="flex items-center justify-between gap-4 pt-4">
              <RegionToggle />
              <ButtonLink href="#contact" size="md" className="w-[152px]" onClick={onClose}>
                Let’s talk
              </ButtonLink>
            </div>
          </div>
        </m.nav>
      )}
    </AnimatePresence>
  );
}
