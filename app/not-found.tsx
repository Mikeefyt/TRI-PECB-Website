import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="bg-[linear-gradient(90deg,#ffffff_35%,#f5f8fc_100%)] pb-24 pt-20 md:pb-[140px] md:pt-[120px]">
      <div className="container-site">
        <Eyebrow dot>404</Eyebrow>
        <h1 className="heading-lg mt-6 md:mt-[34px]">
          Page not found.
        </h1>
        <ButtonLink href="/" className="mt-10 w-[237px] md:mt-12">
          ThinkRisk International
        </ButtonLink>
      </div>
    </section>
  );
}
