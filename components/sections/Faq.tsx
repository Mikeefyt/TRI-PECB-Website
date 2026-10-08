import Link from "next/link";
import { FAQ } from "@/data/faq";
import { Accordion } from "@/components/ui/Accordion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-line bg-bg-alt py-20 md:py-[118px]">
      <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,845px)] lg:gap-16">
        <Reveal>
          <Eyebrow>A FEW THINGS TO KNOW</Eyebrow>
          <h2 id="faq-title" className="heading-md mt-6 md:mt-[36px]">
            Your questions,
            <br />
            answered.
          </h2>
          <p className="mt-9 text-[15px] text-muted md:mt-[44px]">Need help choosing?</p>
          <Link href="#contact" className="mt-3 inline-block text-[15px] text-blue underline-offset-4 transition-colors hover:text-[#184f8c] hover:underline">
            Talk to ThinkRisk ↗
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-line bg-white px-6 py-1.5 md:px-[35px] md:py-2">
            <Accordion items={FAQ} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
