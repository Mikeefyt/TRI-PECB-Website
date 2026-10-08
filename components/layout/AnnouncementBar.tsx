import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="border-b border-line bg-bg-alt">
      <div className="container-site flex min-h-[46px] flex-wrap items-center justify-center gap-x-4 gap-y-1 py-2.5 text-center text-[13px] text-muted md:text-[14px]">
        <span>PECB certification training</span>
        <span aria-hidden className="hidden text-[#9aa7b8] sm:inline">
          ·
        </span>
        <span>Self-paced. Online. Built around you.</span>
        <span aria-hidden className="hidden text-[#9aa7b8] sm:inline">
          ·
        </span>
        <Link
          href="#journey"
          className="group inline-flex items-center gap-1 font-bold text-blue transition-colors hover:text-[#184f8c] md:ml-4"
        >
          Discover your pathway
          <ArrowUpRight aria-hidden strokeWidth={2.25} className="size-3.5 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
        </Link>
      </div>
    </div>
  );
}
