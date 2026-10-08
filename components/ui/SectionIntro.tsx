import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

/** Two-column intro: eyebrow + big heading on the left, short paragraph in the right column. */
export function SectionIntro({ eyebrow, title, titleId, children }: { eyebrow: string; title: ReactNode; titleId: string; children: ReactNode }) {
  return (
    <div className="grid gap-6 md:gap-8 lg:grid-cols-[minmax(0,58%)_minmax(0,1fr)] lg:items-end">
      <div>
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 id={titleId} className="heading-lg mt-6 md:mt-[38px]">
            {title}
          </h2>
        </Reveal>
      </div>
      <Reveal delay={0.18}>
        <p className="lead max-w-[520px] lg:pb-2.5">{children}</p>
      </Reveal>
    </div>
  );
}
