"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef, useState, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import { useSite } from "./SiteProvider";

type PanelLink = { href: string; label: string; detail: string };
type Dropdown = { id: string; menuId: string; label: string; href: string; panelLabel: string; links: PanelLink[] };

// Navigation copied from v23 (every page shares the same header).
const DROPDOWNS: Dropdown[] = [
  {
    id: "nav-courses",
    menuId: "menu-courses",
    label: "Courses",
    href: "/courses/",
    panelLabel: "EXPLORE YOUR COURSES",
    links: [
      { href: "/courses/#courses", label: "Course catalogue", detail: "Explore the existing courses" },
      { href: "/courses/#course-focus", label: "Our standards", detail: "Business continuity, AI and information security" },
      { href: "/courses/#course-enquiry", label: "Discuss your course", detail: "Ask about availability, fees and inclusions" },
    ],
  },
  {
    id: "nav-corporate",
    menuId: "menu-corporate",
    label: "Training",
    href: "/corporate-training/",
    panelLabel: "TRAIN YOUR TEAM",
    links: [
      { href: "/corporate-training/#corporate", label: "Team training", detail: "Build capability together" },
      { href: "/corporate-training/#team-plan", label: "Role-based pathways", detail: "Match learning to responsibilities" },
      { href: "/corporate-training/#training-brief", label: "Discuss your requirements", detail: "Start the conversation about your team" },
      { href: "/corporate-training/#apply-learning", label: "Apply your learning", detail: "Give the learning a place to work" },
    ],
  },
  {
    id: "nav-pathway",
    menuId: "menu-pathway",
    label: "Pathway",
    href: "/your-pathway/",
    panelLabel: "YOUR NEXT STEP",
    links: [
      { href: "/your-pathway/#pathway", label: "Your pathway", detail: "A clear path to your next step" },
      { href: "/your-pathway/#training-pathways", label: "Choose your level", detail: "Foundation, Implementer or Auditor" },
      { href: "/your-pathway/#course-finder", label: "Choose a standard", detail: "Find your area of focus" },
      { href: "/your-pathway/#compare-pathways", label: "Compare pathways", detail: "Match the learning to your role" },
      { href: "/your-pathway/#study-preparation", label: "Online learning", detail: "Make room for your learning" },
      { href: "/your-pathway/#credential-steps", label: "Examination & certification", detail: "Understand the credential process" },
      { href: "/your-pathway/#getting-started", label: "Getting started", detail: "A learning goal and a practical next step" },
    ],
  },
  {
    id: "nav-about",
    menuId: "menu-about",
    label: "About Us",
    href: "/about/",
    panelLabel: "THINK RISK INTERNATIONAL",
    links: [
      { href: "/about/#about", label: "About Think Risk", detail: "Knowledge with practical purpose" },
      { href: "/about/#our-focus", label: "Our training focus", detail: "Business continuity, AI and information security" },
      { href: "/about/#people-and-teams", label: "People and teams", detail: "Professional growth with a clear purpose" },
      { href: "/about/#training-and-certification", label: "Training & certification", detail: "Know what each step means" },
      { href: "/about/#learning-purpose", label: "Learning with purpose", detail: "Bring better questions to your work" },
      { href: "/faqs/#faq", label: "Frequently asked questions", detail: "Answers before you enrol" },
      { href: "/contact/#enquiry-form", label: "Contact us", detail: "Find the right course for you" },
    ],
  },
];

export function Header() {
  const pathname = usePathname();
  const { market, setMarket, setActiveLevel } = useSite();
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const focusAfterOpen = useRef<{ menuId: string; which: "first" | "last" } | null>(null);

  const current = (href: string) => (href === "/" ? pathname === "/" : pathname === href) || undefined;

  // Focus the first/last panel link after an arrow key opens a dropdown.
  useEffect(() => {
    const target = focusAfterOpen.current;
    if (!target || open === null) return;
    focusAfterOpen.current = null;
    const links = [...(document.getElementById(target.menuId)?.querySelectorAll("a") ?? [])];
    links[target.which === "first" ? 0 : links.length - 1]?.focus();
  }, [open]);

  // Click outside the navigation closes dropdowns; Escape closes the mobile menu.
  useEffect(() => {
    const onClick = (e: globalThis.MouseEvent) => {
      if (!(e.target as Element).closest?.("#primary-nav")) setOpen(null);
    };
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(null);
      setMobileOpen((wasOpen) => {
        if (wasOpen) toggleRef.current?.focus();
        return false;
      });
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  function onTriggerKey(e: KeyboardEvent<HTMLButtonElement>, d: Dropdown) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      focusAfterOpen.current = { menuId: d.menuId, which: e.key === "ArrowDown" ? "first" : "last" };
      setOpen(d.id);
    }
  }

  function onNavKey(e: KeyboardEvent<HTMLElement>) {
    const group = (e.target as Element).closest(".nav-dropdown");
    if (!group) return;
    const trigger = group.querySelector<HTMLButtonElement>(".nav-trigger")!;
    if (e.key === "Escape" && trigger.getAttribute("aria-expanded") === "true") {
      e.preventDefault();
      e.stopPropagation();
      setOpen(null);
      trigger.focus();
      return;
    }
    if (!(e.target as Element).closest(".nav-panel") || !["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const links = [...group.querySelectorAll<HTMLAnchorElement>(".nav-panel a")];
    const index = links.indexOf((e.target as Element).closest("a") as HTMLAnchorElement);
    const next = e.key === "Home" ? 0 : e.key === "End" ? links.length - 1 : (index + (e.key === "ArrowDown" ? 1 : -1) + links.length) % links.length;
    links[next].focus();
  }

  function onNavBlur(e: FocusEvent<HTMLElement>) {
    if (!navRef.current?.contains(e.relatedTarget as Node)) setOpen(null);
  }

  function onNavClick(e: MouseEvent<HTMLElement>) {
    const link = (e.target as Element).closest("a");
    if (!link) return;
    if (link.hash.startsWith("#course-")) setActiveLevel("all");
    setOpen(null);
    setMobileOpen(false);
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="Think Risk International home">
          <img src="/assets/think-risk-logo-white.png" alt="Think Risk International" width="2048" height="2048" />
        </Link>
        <nav id="primary-nav" aria-label="Main navigation" ref={navRef} className={mobileOpen ? "open" : undefined} onKeyDown={onNavKey} onBlur={onNavBlur} onClick={onNavClick}>
          {"\n"}
          <Link className="nav-main nav-home" href="/" aria-current={current("/") && "page"}>
            Home
          </Link>
          {"\n"}
          {DROPDOWNS.map((d) => {
            const expanded = open === d.id;
            return (
              <Fragment key={d.id}>
                <div className="nav-dropdown">
                  <Link className="nav-main" href={d.href} aria-current={current(d.href) && "page"}>
                    {d.label}
                  </Link>
                  <button
                    className="nav-trigger"
                    id={d.id}
                    aria-label={`Show ${d.label} links`}
                    aria-expanded={expanded}
                    aria-controls={d.menuId}
                    onClick={() => setOpen(expanded ? null : d.id)}
                    onKeyDown={(e) => onTriggerKey(e, d)}
                  >
                    <svg viewBox="0 0 12 12" aria-hidden="true">
                      <path d="m3 4.5 3 3 3-3" />
                    </svg>
                  </button>
                  <div className="nav-panel" id={d.menuId} aria-labelledby={d.id} hidden={!expanded}>
                    <p className="nav-panel-label">{d.panelLabel}</p>
                    {d.links.map((l) => (
                      <Link key={l.href} href={l.href}>
                        {l.label} <span>{l.detail}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                {"\n"}
              </Fragment>
            );
          })}
        </nav>
        <div className="header-actions">
          <div className="market-switch" aria-label="Pricing currency">
            <button data-market="AU" aria-pressed={market === "AU"} title="Australian dollars" onClick={() => setMarket("AU")}>
              AUD
            </button>
            <span>/</span>
            <button data-market="MY" aria-pressed={market === "MY"} title="Malaysian ringgit" onClick={() => setMarket("MY")}>
              MYR
            </button>
          </div>
          <Link className="button button-small" href="/contact/">
            Enquire now <span aria-hidden="true">↗</span>
          </Link>
          <button
            id="menu-toggle"
            ref={toggleRef}
            className="menu-toggle"
            aria-expanded={mobileOpen}
            aria-controls="primary-nav"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            onClick={() => {
              setOpen(null);
              setMobileOpen((v) => !v);
            }}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
