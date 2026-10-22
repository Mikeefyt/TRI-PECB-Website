"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ADDITIONAL_PRICE, LEVELS, MARKET_CODE, STANDARDS, type LevelName } from "@/lib/catalogue";
import { initialisePointerCards } from "@/lib/motion";
import { useSite } from "./SiteProvider";

const FILTERS: { value: "all" | LevelName; label: string }[] = [
  { value: "all", label: "All levels" },
  { value: "Foundation", label: "Foundation" },
  { value: "Lead Implementer", label: "Lead Implementer" },
  { value: "Lead Auditor", label: "Lead Auditor" },
];

/** Courses page catalogue: level filter, course cards and the additional-course fee (v23 renderCourses). */
export function CourseCatalogue() {
  const { market, activeLevel, setActiveLevel, openCourse } = useSite();

  // Cards gain the pointer effect once rendered, as in v23.
  useEffect(() => {
    initialisePointerCards();
  }, [activeLevel, market]);

  // Visiting /courses/#course-… scrolls to that card.
  useEffect(() => {
    if (!window.location.hash.startsWith("#course-")) return;
    const destination = document.getElementById(window.location.hash.slice(1));
    if (destination) requestAnimationFrame(() => destination.scrollIntoView());
  }, []);

  return (
    <>
      <div className="catalogue-controls">
        <div className="filter-tabs" aria-label="Filter by course level">
          {FILTERS.map((f) => (
            <button key={f.value} data-level={f.value} aria-pressed={activeLevel === f.value} onClick={() => setActiveLevel(f.value)}>
              {f.label}
            </button>
          ))}
        </div>
        <span className="market-label">
          Prices in <b data-market-name>{MARKET_CODE[market]}</b>
        </span>
      </div>
      <div id="course-grid" className="course-grid" aria-live="polite">
        {STANDARDS.map((s) => (
          <article className="course-card" id={`course-${s.id}`} key={s.id}>
            <div className="card-label">
              <span className="card-icon" aria-hidden="true">
                {s.icon}
              </span>
              <span>{s.code}</span>
            </div>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
            <div className="course-levels">
              {LEVELS.filter((l) => activeLevel === "all" || l.name === activeLevel).map((l) => (
                <button
                  key={l.name}
                  className="course-level"
                  data-course={s.id}
                  data-course-level={l.name}
                  aria-label={`View ${s.code} ${l.name} course details`}
                  onClick={() => openCourse(s.id, l.name)}
                >
                  <span>
                    <strong>{l.name}</strong>
                    <small>{l.days}-day course structure · Self-paced online</small>
                  </span>
                  <b className="price">{l[market]}</b>
                  <span className="level-arrow" aria-hidden="true">
                    ↗
                  </span>
                </button>
              ))}
            </div>
            <div className="card-footer">
              <span>SELF-PACED ONLINE</span>
              <span>PECB PATHWAY</span>
            </div>
          </article>
        ))}
      </div>
      <div className="additional-courses">
        <div>
          <span className="plus-icon" aria-hidden="true">
            +
          </span>
          <div>
            <strong>Looking for another PECB pathway?</strong>
            <p>Ask about additional three-day online courses.</p>
          </div>
        </div>
        <div>
          <strong id="additional-price">{ADDITIONAL_PRICE[market]}</strong>
          <Link className="text-link dark-link" href="/contact/?interest=Other%20PECB%20courses">
            Enquire <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </>
  );
}
