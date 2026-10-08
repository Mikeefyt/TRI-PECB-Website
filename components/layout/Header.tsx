"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NAV } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NavLink } from "./NavLink";
import { RegionToggle } from "./RegionToggle";

export function Header() {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdowns on outside click or Escape.
  useEffect(() => {
    if (openMenu === null) return;
    const onDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const btn = document.getElementById(`nav-btn-${openMenu}`);
        setOpenMenu(null);
        btn?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openMenu]);

  return (
    <header className="sticky top-3 z-50 mt-3 md:top-5 md:mt-5">
      <div className="container-site">
        <div
          className={`relative rounded-[18px] border border-line bg-white/95 backdrop-blur-md transition-shadow duration-300 ${
            scrolled ? "shadow-float" : "shadow-soft"
          }`}
        >
          <div className="flex h-[76px] items-center justify-between gap-4 px-4 md:h-[102px] md:px-[30px] lg:grid lg:grid-cols-[1fr_auto_1fr]">
            <Logo priority imgClassName="size-[60px] md:size-20" />

            <nav ref={navRef} aria-label="Main" className="hidden lg:block">
              <ul className="flex items-center gap-1 xl:gap-3">
                {NAV.map((group, i) => {
                  const open = openMenu === i;
                  return (
                    <li key={group.label} className="relative" onMouseLeave={() => open && setOpenMenu(null)}>
                      <button
                        id={`nav-btn-${i}`}
                        type="button"
                        aria-expanded={open}
                        aria-controls={`nav-menu-${i}`}
                        onClick={() => setOpenMenu(open ? null : i)}
                        onMouseEnter={() => setOpenMenu(i)}
                        className="flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-2 text-[15px] text-ink transition-colors hover:text-blue"
                      >
                        {group.label}
                        <ChevronDown
                          aria-hidden
                          strokeWidth={2}
                          className={`size-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                        />
                      </button>
                      <div
                        id={`nav-menu-${i}`}
                        hidden={!open}
                        className="absolute left-0 top-full pt-2"
                      >
                        <ul className="min-w-[230px] rounded-xl border border-line bg-white p-2 shadow-float">
                          {group.items.map((item) => (
                            <li key={item.label}>
                              <NavLink
                                item={item}
                                onNavigate={() => setOpenMenu(null)}
                                className="block rounded-lg px-3.5 py-2.5 text-[14.5px] text-ink transition-colors hover:bg-bg-alt hover:text-blue"
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center justify-end gap-4 md:gap-[30px]">
              <div className="hidden items-center gap-4 sm:flex md:gap-[30px]">
                <RegionToggle />
                <ButtonLink href="#contact" size="md" className="w-[152px]">
                  Let’s talk
                </ButtonLink>
              </div>
              <button
                type="button"
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileOpen((v) => !v)}
                className="inline-flex size-11 cursor-pointer items-center justify-center rounded-lg border border-line text-navy transition-colors hover:bg-bg-alt lg:hidden"
              >
                {mobileOpen ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
              </button>
            </div>
          </div>

          <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
        </div>
      </div>
    </header>
  );
}
