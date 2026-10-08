"use client";

import { ArrowUpRight, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { ANOTHER_PATHWAY, COURSES, INTEREST_ANOTHER, LEVELS, PRICING_NOTE, interestLabel, type Course, type LevelId } from "@/data/courses";
import { LEVEL_EVENT, requestEnquiry } from "@/lib/events";
import { MARKET, formatPrice, useRegion } from "@/lib/region";
import { IconTile } from "@/components/ui/IconTile";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Tabs, type TabItem } from "@/components/ui/Tabs";

type Filter = "all" | LevelId;

const TABS: TabItem<Filter>[] = [{ id: "all", label: "All pathways" }, ...LEVELS.map((l) => ({ id: l.id, label: l.name }))];

function CourseCard({ course, filter }: { course: Course; filter: Filter }) {
  const { region } = useRegion();
  const Icon = course.icon;
  const levels = filter === "all" ? LEVELS : LEVELS.filter((l) => l.id === filter);

  return (
    <article
      id={`course-${course.id}`}
      aria-labelledby={`course-${course.id}-title`}
      className="flex h-full scroll-mt-[var(--header-offset)] flex-col rounded-2xl border border-line border-t-[4px] bg-white px-6 pt-8 shadow-soft transition-shadow duration-300 hover:shadow-float md:px-[30px] md:pt-[34px]"
      style={{ borderTopColor: course.accent }}
    >
      <div className="flex items-start justify-between gap-4">
        <IconTile className="size-[60px] border border-line" style={{ backgroundColor: course.accentTint, color: course.accent }}>
          <Icon strokeWidth={1.75} className="size-7" />
        </IconTile>
        <p className="pt-6 text-[11px] font-bold tracking-[0.16em] text-[#3d5f88]">{course.code}</p>
      </div>
      <h3 id={`course-${course.id}-title`} className="mt-8 text-[27px] font-normal leading-tight tracking-[-0.035em] text-navy md:mt-[34px] md:text-[31px]">
        {course.title}
      </h3>
      <p className="mt-5 flex-1 pb-12 text-[15.5px] leading-[1.85] text-muted md:mt-6 md:text-[16px]">{course.description}</p>

      <ul className="border-t border-line">
        {levels.map((l) => (
          <li key={l.id} className="border-b border-line">
            <button
              type="button"
              onClick={() => requestEnquiry(interestLabel(course, l))}
              className="group flex w-full cursor-pointer items-center justify-between gap-4 py-6 text-left md:py-[27px]"
            >
              <span>
                <span className="block text-[15px] font-bold text-navy transition-colors group-hover:text-blue">
                  {l.name}<span className="sr-only">{`, ${course.code} ${course.title} enquiry`}</span>
                </span>
                <span className="mt-1.5 block text-[13px] text-muted">
                  {l.duration} · {l.delivery}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-4 text-[14px] font-bold text-navy">
                {formatPrice(region, l.priceAUD, l.priceMYR)}
                <ArrowUpRight aria-hidden strokeWidth={1.75} className="size-4 text-blue transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between py-[26px] text-[10.5px] font-medium tracking-[0.1em] text-muted">
        <span>SELF-PACED ONLINE</span>
        <span>PECB PATHWAY</span>
      </div>
    </article>
  );
}

export function Courses() {
  const [filter, setFilter] = useState<Filter>("all");
  const { region } = useRegion();

  useEffect(() => {
    const onLevel = (e: Event) => setFilter((e as CustomEvent<LevelId>).detail);
    window.addEventListener(LEVEL_EVENT, onLevel);
    return () => window.removeEventListener(LEVEL_EVENT, onLevel);
  }, []);

  return (
    <section id="courses" aria-labelledby="courses-title" className="bg-white py-20 md:py-[126px]">
      <div className="container-site">
        <SectionIntro
          eyebrow="01 / EXPLORE THE COURSES"
          titleId="courses-title"
          title={
            <>
              Choose your focus.
              <br />
              Build your expertise.
            </>
          }
        >
          From understanding the fundamentals to implementing and auditing a management system, find a pathway that fits your next step.
        </SectionIntro>

        <Reveal className="mt-12 flex flex-col gap-5 md:mt-[62px] md:flex-row md:items-center md:justify-between">
          <Tabs items={TABS} value={filter} onChange={setFilter} label="Filter by course level" controls="course-cards" idPrefix="level-tab" />
          <p className="text-[13px] text-ink" aria-live="polite">
            Pricing for <strong className="font-bold text-navy">{MARKET[region]}</strong>
          </p>
        </Reveal>

        <div
          id="course-cards"
          role="tabpanel"
          aria-labelledby={`level-tab-${filter}`}
          className="mt-8 grid gap-6 md:mt-[32px] lg:grid-cols-3 lg:gap-[25px]"
        >
          {COURSES.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.08} className="h-full">
              <CourseCard course={c} filter={filter} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-7 md:mt-[29px]">
          <div className="flex flex-col gap-5 rounded-xl border border-line bg-bg-alt px-6 py-6 sm:flex-row sm:items-center sm:justify-between md:px-[30px] md:py-[33px]">
            <div className="flex items-start gap-6 md:gap-[30px]">
              <Plus aria-hidden strokeWidth={2} className="mt-1.5 size-[22px] shrink-0 text-blue" />
              <div>
                <h3 className="text-[15.5px] font-bold text-navy">{ANOTHER_PATHWAY.title}</h3>
                <p className="mt-2 text-[13px] text-muted">{ANOTHER_PATHWAY.text}</p>
              </div>
            </div>
            <div className="flex items-center gap-7 pl-12 sm:pl-0">
              <span className="text-[16px] font-bold text-navy">{formatPrice(region, ANOTHER_PATHWAY.priceAUD, ANOTHER_PATHWAY.priceMYR)}</span>
              <button
                type="button"
                onClick={() => requestEnquiry(INTEREST_ANOTHER)}
                className="group inline-flex cursor-pointer items-center gap-6 text-[16px] font-bold text-blue transition-colors hover:text-[#184f8c]"
              >
                Enquire
                <ArrowUpRight aria-hidden strokeWidth={2} className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal y={24}>
          <p className="mt-8 max-w-[1130px] text-[13px] leading-[1.7] text-muted md:mt-[33px]">{PRICING_NOTE}</p>
        </Reveal>
      </div>
    </section>
  );
}
