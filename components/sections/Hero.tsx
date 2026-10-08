import { ArrowRight, Check } from "lucide-react";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { HeroIllustration } from "./HeroIllustration";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative -mt-[92px] bg-[linear-gradient(90deg,#ffffff_35%,#f5f8fc_100%)] pb-16 pt-[140px] md:-mt-[123px] md:pb-[100px] md:pt-[240px] xl:pt-[295px]"
    >
      <div className="container-site grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,46%)] lg:gap-10">
        <div>
          <div>
            <Eyebrow dot>THINK FORWARD. MANAGE RISK.</Eyebrow>
            <h1 id="hero-title" className="heading-xl mt-7 md:mt-[34px]">
              <span className="block">Turn standards</span>
              <span className="block">
                into <span className="text-blue">your next</span>
              </span>
              <span className="block text-blue">advantage.</span>
            </h1>
          </div>
          <div>
            <p className="mt-8 max-w-[600px] text-[17px] leading-[1.8] text-muted md:mt-[42px] md:text-[20px]">
              Build practical expertise in business continuity, AI governance and information security with PECB certification training.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-9 gap-y-5 md:mt-[38px]">
              <ButtonLink href="#courses" className="w-[237px]">
                Explore courses
              </ButtonLink>
              <ArrowLink href="#corporate-training" icon={ArrowRight} className="text-[15px]" iconClassName="ml-6 size-[18px]">
                Training for your team
              </ArrowLink>
            </div>
            <p className="mt-10 flex flex-wrap items-center gap-x-3.5 gap-y-1 text-[13.5px] text-muted md:mt-[56px]">
              <span className="inline-flex items-center gap-2">
                <Check aria-hidden strokeWidth={2} className="size-3.5 text-blue" />
                Self-paced online learning
              </span>
              <span aria-hidden className="text-[#b5c1d0]">
                /
              </span>
              <span>Australia &amp; Malaysia</span>
            </p>
          </div>
        </div>

        <Reveal delay={0.15} y={24}>
          <HeroIllustration />
        </Reveal>
      </div>
    </section>
  );
}
