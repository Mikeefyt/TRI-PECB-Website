import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { IconTile } from "@/components/ui/IconTile";
import { Reveal } from "@/components/ui/Reveal";

/** Concentric rings (◎). */
function RingsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-[22px]">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
    </svg>
  );
}

/** Small electric squiggle (⌁). */
function SquiggleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-[18px]">
      <path d="M6 9.5 10.5 12 13.5 9.5 18 14.5" />
    </svg>
  );
}

const POINTS: { icon: ReactNode; title: string; text: string }[] = [
  { icon: <ArrowUpRight strokeWidth={1.75} className="size-5" />, title: "Practical perspective", text: "Learning grounded in operational risk, governance and assurance." },
  { icon: <RingsIcon />, title: "Professional development", text: "Clear pathways from foundational knowledge to specialist capability." },
  { icon: <SquiggleIcon />, title: "Regional access", text: "Online learning for individuals and teams in Australia and Malaysia." },
];

export function WhyUs() {
  return (
    <section id="why-thinkrisk" aria-labelledby="why-title" className="border-t border-line bg-white py-20 md:py-[118px]">
      <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,670px)] lg:gap-16">
        <Reveal>
          <Eyebrow>04 / WHY THINKRISK INTERNATIONAL</Eyebrow>
          <h2 id="why-title" className="heading-lg mt-6 md:mt-[38px]">
            Knowledge with
            <br />
            real-world purpose.
          </h2>
          <p className="lead mt-8 max-w-[600px] md:mt-[40px]">
            ThinkRisk International brings a practical perspective to risk, governance and assurance. Our PECB training pathways help professionals connect management system standards with everyday business decisions.
          </p>
          <ArrowLink href="#courses" className="mt-9 text-[15px] md:mt-[44px]" iconClassName="ml-6 size-3.5">
            Find the right fit for you
          </ArrowLink>
        </Reveal>

        <ul className="flex flex-col gap-[22px]">
          {POINTS.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={i * 0.08}>
                <div className="flex gap-6 rounded-2xl border border-line bg-white px-6 py-8 shadow-soft transition-shadow duration-300 hover:shadow-float md:min-h-[154px] md:px-[30px] md:pt-[32px]">
                  <IconTile className="size-[47px]">{p.icon}</IconTile>
                  <div>
                    <h3 className="text-[20px] tracking-[-0.01em] text-navy">{p.title}</h3>
                    <p className="mt-3 max-w-[390px] text-[14.5px] leading-[1.7] text-muted">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
