"use client";

import { ArrowUpRight } from "lucide-react";
import { INTEREST_TEAM } from "@/data/courses";
import { requestEnquiry } from "@/lib/events";
import { Button } from "@/components/ui/Button";
import { Dot, Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const ROWS = [
  { title: "A common foundation", text: "Build a shared understanding of the standard and its application to your organisation." },
  { title: "The right depth for each role", text: "Match Foundation, Lead Implementer and Lead Auditor pathways to your team’s responsibilities." },
  { title: "Flexible online learning", text: "Support professional development across Australia and Malaysia with self-paced access." },
];

export function Corporate() {
  return (
    <section id="corporate-training" aria-labelledby="corporate-title" className="border-t border-line bg-bg-tint py-20 md:py-[120px]">
      <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,665px)] lg:gap-16">
        <Reveal>
          <Eyebrow>03 / CORPORATE TRAINING</Eyebrow>
          <h2 id="corporate-title" className="heading-lg mt-6 md:mt-[38px]">
            Stronger people.
            <br />
            <span className="text-blue-soft">
              More resilient
              <br className="hidden lg:block" /> organisations.
            </span>
          </h2>
          <p className="lead mt-8 max-w-[530px] md:mt-[42px]">
            Give your team a shared language for risk, governance and assurance. Develop a training pathway around the capabilities your organisation needs.
          </p>
          <Button type="button" onClick={() => requestEnquiry(INTEREST_TEAM)} className="mt-10 w-[280px] md:mt-[46px]">
            Discuss team training
          </Button>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-line bg-white px-6 pb-9 pt-9 shadow-soft md:px-9 md:pb-[42px] md:pt-[40px]">
            <p className="border-b border-line pb-6 text-[11px] font-medium tracking-[0.2em] text-[#3d5f88]">CAPABILITY ACROSS YOUR TEAM</p>
            <ul>
              {ROWS.map((r, i) => (
                <li key={r.title} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => requestEnquiry(INTEREST_TEAM)}
                    className="group grid w-full cursor-pointer grid-cols-[28px_1fr_auto] gap-x-3 py-8 text-left md:grid-cols-[39px_1fr_auto] md:py-[36px]"
                  >
                    <span className="pt-1.5 text-[12px] text-blue">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="block text-[19px] tracking-[-0.01em] text-navy transition-colors group-hover:text-blue md:text-[20px]">{r.title}</span>
                      <span className="mt-4 block max-w-[380px] text-[14.5px] leading-[1.85] text-muted">{r.text}</span>
                    </span>
                    <ArrowUpRight aria-hidden strokeWidth={1.5} className="mt-1.5 size-[18px] text-blue transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-9 flex items-center gap-4 text-[13px] text-ink">
              <Dot />
              Let’s start with your team’s goals.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
