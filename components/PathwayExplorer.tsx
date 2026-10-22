"use client";

import Link from "next/link";
import { useState } from "react";
import { LEVELS, PATHWAY_INFORMATION, STANDARDS, courseEnquiryHref, levelObjective, type LevelName } from "@/lib/catalogue";
import { useSite } from "./SiteProvider";

const CHOICES: { level: LevelName; number: string; verb: string; text: string }[] = [
  { level: "Foundation", number: "01", verb: "UNDERSTAND", text: "Explore the standard’s requirements and key management system concepts." },
  { level: "Lead Implementer", number: "02", verb: "IMPLEMENT", text: "Develop knowledge for establishing, managing and maintaining a management system." },
  { level: "Lead Auditor", number: "03", verb: "ASSESS", text: "Develop knowledge for assessing conformity and conducting management system audits." },
];

/** Pathway page: "Choose your pathway" level selector and the course finder (v23 app.js). */
export function PathwayExplorer() {
  const { market } = useSite();
  const [pathway, setPathway] = useState<LevelName>("Foundation");
  const [standardId, setStandardId] = useState<string>("22301");
  const [finderLevel, setFinderLevel] = useState<LevelName>("Foundation");

  const standard = STANDARDS.find((s) => s.id === standardId)!;
  const level = LEVELS.find((l) => l.name === finderLevel)!;
  const info = PATHWAY_INFORMATION[pathway];

  return (
    <>
      <section className="client-section pathway-showcase" id="training-pathways">
        <div className="container">
          <div className="client-section-heading">
            <div>
              <p className="eyebrow">PROFESSIONAL DEVELOPMENT</p>
              <h2>
                Choose your pathway.
                <br />
                Build your expertise.
              </h2>
            </div>
            <p>Learn the fundamentals, develop implementation knowledge or strengthen your audit skills. Choose the pathway that fits the work you want to do.</p>
          </div>
          <div className="pathway-track" aria-label="Explore course levels">
            {CHOICES.map((c) => (
              <button
                key={c.level}
                type="button"
                className="pathway-choice"
                data-training-pathway={c.level}
                aria-pressed={pathway === c.level}
                onClick={() => {
                  setPathway(c.level);
                  setFinderLevel(c.level);
                }}
              >
                <span className="pathway-number" aria-hidden="true">
                  {c.number}
                </span>
                <small>{c.verb}</small>
                <strong>{c.level}</strong>
                <span>{c.text}</span>
              </button>
            ))}
          </div>
          <div className="pathway-summary" aria-live="polite" aria-atomic="true">
            <div>
              <h3 id="pathway-summary-title">{info.title}</h3>
              <p id="pathway-summary-text">{info.text}</p>
            </div>
            <a className="text-link" id="pathway-find-course" href="#course-finder">
              Find a {pathway} course <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="pathway-note">
            These are learning options, not a mandatory sequence. Confirm prerequisites for your selected course. Certification follows PECB’s examination and application
            process; completing training alone does not guarantee certification. <Link href="/your-pathway/#credential-steps">Explore the full certification pathway →</Link>
          </p>
        </div>
      </section>
      {"\n"}
      <section className="client-section finder-section" id="course-finder">
        <div className="container finder-layout">
          <div className="finder-intro">
            <p className="eyebrow">A PRACTICAL PLACE TO START</p>
            <h2>
              Your goal.
              <br />
              Your next step.
            </h2>
            <p>
              You may be exploring a standard for the first time, taking responsibility for a management system or developing your audit skills. Start with the work you want
              to do.
            </p>
            <Link className="text-link" href="/your-pathway/#credential-steps">
              Understand the certification pathway <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="course-finder">
            <div className="finder-fields">
              <label htmlFor="finder-standard">
                01 — Your area of focus
                <select id="finder-standard" value={standardId} onChange={(e) => setStandardId(e.target.value)}>
                  <option value="22301">Business Continuity</option>
                  <option value="42001">AI Management Systems</option>
                  <option value="27001">Information Security</option>
                </select>
              </label>
              <label htmlFor="finder-level">
                02 — What would you like to do?
                <select id="finder-level" value={finderLevel} onChange={(e) => setFinderLevel(e.target.value as LevelName)}>
                  <option value="Foundation">Understand the fundamentals</option>
                  <option value="Lead Implementer">Implement and manage a system</option>
                  <option value="Lead Auditor">Assess and audit a system</option>
                </select>
              </label>
            </div>
            <div className="finder-result" aria-live="polite" aria-atomic="true">
              <p className="eyebrow">A PATHWAY TO EXPLORE</p>
              <h3 id="finder-title">
                {standard.code} {level.name}
              </h3>
              <p id="finder-description">{levelObjective(standard, level.name)}</p>
              <div className="finder-fee">
                <span id="finder-duration">{level.days}-day course structure · Self-paced online</span>
                <strong id="finder-price">{level[market]}</strong>
              </div>
              <Link id="finder-enquire" className="button" href={courseEnquiryHref(standard, level.name, market)}>
                Enquire about this pathway <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <p className="finder-footnote">
              Confirm prerequisites, current fees and inclusions before enrolling. Certification is subject to PECB’s examination and credential requirements.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
