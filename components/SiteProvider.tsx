"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import {
  ENQUIRY_EMAIL,
  LEVELS,
  MARKET_CODE,
  STANDARDS,
  courseEnquiryHref,
  levelAudience,
  levelObjective,
  type LevelName,
  type Market,
} from "@/lib/catalogue";

type LevelFilter = "all" | LevelName;

type SiteContextValue = {
  market: Market;
  setMarket: (m: Market) => void;
  activeLevel: LevelFilter;
  setActiveLevel: (l: LevelFilter) => void;
  openCourse: (standardId: string, level: LevelName) => void;
  openPrivacy: () => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside SiteProvider");
  return ctx;
}

const STORAGE_KEY = "thinkrisk-market"; // same key as v23, so a visitor's saved currency carries over

/** Closes a <dialog> when its backdrop (outside the dialog box) is clicked, as in v23. */
function closeOnBackdrop(event: MouseEvent<HTMLDialogElement>) {
  const dialog = event.currentTarget;
  if (event.target !== dialog) return;
  const r = dialog.getBoundingClientRect();
  if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [market, setMarketState] = useState<Market>("AU");
  const [activeLevel, setActiveLevel] = useState<LevelFilter>("all");
  const [selected, setSelected] = useState<{ standardId: string; level: LevelName } | null>(null);
  const courseDialog = useRef<HTMLDialogElement>(null);
  const privacyDialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "AU" || saved === "MY") setMarketState(saved);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const setMarket = useCallback((next: Market) => {
    if (next !== "AU" && next !== "MY") return;
    setMarketState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const openCourse = useCallback((standardId: string, level: LevelName) => {
    setSelected({ standardId, level });
    // Open after React has rendered the new details.
    requestAnimationFrame(() => courseDialog.current?.showModal());
  }, []);

  const openPrivacy = useCallback(() => privacyDialog.current?.showModal(), []);

  // Each new page starts with all levels shown and no dialog open (v23 reloaded on every page).
  useEffect(() => {
    setActiveLevel("all");
    courseDialog.current?.close();
    privacyDialog.current?.close();
  }, [pathname]);

  const standard = selected && STANDARDS.find((s) => s.id === selected.standardId);
  const level = selected && LEVELS.find((l) => l.name === selected.level);

  return (
    <SiteContext.Provider value={{ market, setMarket, activeLevel, setActiveLevel, openCourse, openPrivacy }}>
      {children}
      <dialog id="course-dialog" aria-labelledby="detail-title" ref={courseDialog} onClick={closeOnBackdrop}>
        <button className="dialog-close" data-close aria-label="Close course details" onClick={() => courseDialog.current?.close()}>
          ×
        </button>
        <div id="course-detail">
          {standard && level && (
            <>
              <p className="eyebrow dark">{standard.code} / PECB TRAINING</p>
              <h2 id="detail-title">
                {level.name}
                <br />
                {standard.title}
              </h2>
              <p className="detail-subtitle">
                {level.days}-day course structure · Self-paced online · Prices in {MARKET_CODE[market]}
              </p>
              <div className="detail-price">
                <span>Listed course fee</span>
                <strong>{level[market]}</strong>
              </div>
              <p>{levelObjective(standard, level.name)}</p>
              <h3>Areas of focus</h3>
              <ul>
                {standard.focus.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <h3>Who this course is for</h3>
              <p>{levelAudience(level.name)}</p>
              <p className="detail-disclaimer">
                Enquire about course entry requirements and package details. Certification is subject to PECB’s examination and credential requirements.
              </p>
              <Link className="button" href={courseEnquiryHref(standard, level.name, market)} onClick={() => courseDialog.current?.close()}>
                Enquire about this course ↗
              </Link>
            </>
          )}
        </div>
      </dialog>
      <dialog id="privacy-dialog" aria-labelledby="privacy-title" ref={privacyDialog} onClick={closeOnBackdrop}>
        <button className="dialog-close" data-close aria-label="Close privacy information" onClick={() => privacyDialog.current?.close()}>
          ×
        </button>
        <p className="eyebrow dark">WEBSITE PRIVACY</p>
        <h2 id="privacy-title">Your enquiry details</h2>
        <p>The enquiry form prepares an email draft in your browser. This website does not submit or store the information you enter on a server.</p>
        <p>
          When you send the draft, the details go to Think Risk International at {ENQUIRY_EMAIL} through your email provider. Include only information needed for your
          training enquiry.
        </p>
        <p>
          Your selected pricing currency may be remembered in this browser. Contact <a href={`mailto:${ENQUIRY_EMAIL}`}>{ENQUIRY_EMAIL}</a> for questions about how Think Risk
          handles information received by email.
        </p>
      </dialog>
    </SiteContext.Provider>
  );
}
