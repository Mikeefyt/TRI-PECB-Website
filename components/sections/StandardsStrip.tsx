import { COURSES } from "@/data/courses";
import { Reveal } from "@/components/ui/Reveal";

const SUBTITLES: Record<string, string> = {
  "iso-22301": "Business continuity",
  "iso-iec-42001": "AI governance",
  "iso-iec-27001": "Information security",
};

export function StandardsStrip() {
  return (
    <section aria-label="Standards" className="border-y border-line bg-bg-alt">
      <div className="container-site grid grid-cols-1 gap-7 py-10 sm:grid-cols-2 md:py-[44px] lg:grid-cols-[1.09fr_1fr_1fr_1fr] lg:gap-6">
        <Reveal y={24} className="sm:col-span-2 lg:col-span-1">
          <p className="text-[15px] font-bold leading-[1.75] tracking-[0.01em] text-navy">
            One learning journey.
            <br />
            Three critical disciplines.
          </p>
        </Reveal>
        {COURSES.map((c, i) => (
          <Reveal key={c.id} y={24} delay={(i + 1) * 0.08}>
            <p className="text-[15px] font-bold tracking-[0.03em] text-navy">{c.code}</p>
            <p className="mt-1.5 text-[13.5px] text-muted">{SUBTITLES[c.id]}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
