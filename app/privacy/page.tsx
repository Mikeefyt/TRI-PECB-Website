import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Website privacy",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="bg-white pb-24 pt-20 md:pb-[126px] md:pt-[110px]">
      <div className="container-site max-w-[900px]">
        <Eyebrow>Think Risk International</Eyebrow>
        <h1 className="heading-lg mt-6 md:mt-[34px]">Website privacy</h1>

        {/* TODO: client to supply the website privacy text. */}
        <div className="mt-10 rounded-2xl border-2 border-dashed border-[#b9c9dd] bg-bg-alt p-6 md:mt-12 md:p-9">
          <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-blue">Placeholder</p>
          <p className="mt-3 text-[16px] leading-[1.8] text-ink">
            [TODO: Client to supply the website privacy statement for this page.]
          </p>
        </div>

        <Link href="/" className="mt-12 inline-flex items-center gap-2 text-[15px] font-bold text-blue hover:text-[#184f8c]">
          <ArrowLeft aria-hidden className="size-4" />
          Think Risk International
        </Link>
      </div>
    </section>
  );
}
