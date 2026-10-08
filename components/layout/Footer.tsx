import Image from "next/image";
import Link from "next/link";
import { FOOTER_LINKS } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { BackToTop } from "./BackToTop";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-bg-alt">
      <div className="container-site">
        <Reveal y={32} className="flex flex-col items-center gap-8 py-12 text-center md:flex-row md:items-center md:gap-14 md:py-[52px] md:text-left">
          <Logo imgClassName="size-[88px] md:size-24" />
          <div>
            <p className="text-[16px] text-navy">Think forward.</p>
            <p className="mt-2 text-[14.5px] text-muted">Build capability that matters.</p>
          </div>
          <div className="flex flex-col items-center gap-8 md:ml-auto md:flex-row md:gap-10">
            <nav aria-label="Footer">
              <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[14.5px] text-muted">
                {FOOTER_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="transition-colors hover:text-blue">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Image
              src="/brand/pecb-authorized-partner-400.png"
              alt="PECB Authorized Training Partner"
              width={400}
              height={480}
              sizes="(min-width: 768px) 84px, 92px"
              className="h-auto w-[92px] md:w-[84px]"
            />
          </div>
        </Reveal>

        <div className="flex flex-col items-center gap-3 border-t border-line py-7 text-[13px] text-muted md:flex-row md:justify-between md:gap-6">
          <p>© {year} ThinkRisk International</p>
          <p className="flex items-center gap-4">
            <span>Australia</span>
            <span aria-hidden className="text-[#9aa7b8]">
              ·
            </span>
            <span>Malaysia</span>
          </p>
          <Link href="/privacy" className="text-[11.5px] transition-colors hover:text-blue">
            Website privacy
          </Link>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
