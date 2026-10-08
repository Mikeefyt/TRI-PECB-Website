import { Info } from "lucide-react";
import { PECB_URL } from "@/data/site";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";

const STEPS = [
  { title: "Find your standard", text: "Focus on business continuity, AI management systems or information security." },
  { title: "Choose your level", text: "Learn the foundations, build implementation skills or develop your auditing knowledge." },
  { title: "Learn on your terms", text: "Access self-paced online training and work through the course around your commitments." },
  { title: "Follow the certification path", text: "Prepare for the examination and apply for the credential appropriate to your experience." },
];

export function Journey() {
  return (
    <section id="journey" aria-labelledby="journey-title" className="border-t border-line bg-bg-alt py-20 md:py-[126px]">
      <div className="container-site">
        <SectionIntro
          eyebrow="02 / YOUR CERTIFICATION JOURNEY"
          titleId="journey-title"
          title={
            <>
              A clear path.
              <br />
              A purposeful next step.
            </>
          }
        >
          Choose what you want to learn, build your knowledge at your pace, then follow the PECB examination and certification process.
        </SectionIntro>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 md:mt-[60px] lg:grid-cols-4 lg:gap-6">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 0.07} className="h-full">
                <div className="h-full rounded-2xl border border-line bg-white p-7 transition-shadow duration-300 hover:shadow-soft md:min-h-[271px] md:px-8 md:pt-8">
                  <span className="inline-flex size-11 items-center justify-center rounded-md border border-line bg-icon-bg text-[13px] text-blue">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-9 text-[20px] font-normal tracking-[-0.01em] text-navy md:mt-[44px]">{s.title}</h3>
                  <p className="mt-4 text-[14.5px] leading-[1.95] text-muted">{s.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal y={24} className="mt-10 flex flex-col gap-5 border-t border-line pt-8 md:mt-[41px] md:flex-row md:items-center md:justify-between md:pt-[32px]">
          <p className="flex items-start gap-4 text-[14px] leading-relaxed text-ink">
            <Info aria-hidden strokeWidth={1.5} className="mt-px size-[22px] shrink-0 text-ink" />
            Course completion and certification are separate steps. PECB sets the examination, experience and application requirements for each credential.
          </p>
          <ArrowLink href={PECB_URL} external className="shrink-0 text-[14px]" iconClassName="ml-1 size-3.5">
            Explore PECB
          </ArrowLink>
        </Reveal>
      </div>
    </section>
  );
}
