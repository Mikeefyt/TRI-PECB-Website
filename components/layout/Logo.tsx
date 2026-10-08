import Image from "next/image";
import Link from "next/link";

/** Circular ThinkRisk International logo. Size it with `imgClassName` (e.g. "size-16 md:size-20"). */
export function Logo({ imgClassName = "size-20", priority = false }: { imgClassName?: string; priority?: boolean }) {
  return (
    <Link href="/" aria-label="ThinkRisk International home" className="inline-flex shrink-0 rounded-full">
      <Image src="/brand/thinkrisk-logo-400.png" alt="" width={96} height={96} priority={priority} sizes="96px" className={imgClassName} />
    </Link>
  );
}
