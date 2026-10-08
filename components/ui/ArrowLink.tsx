import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  icon?: LucideIcon;
  className?: string;
  iconClassName?: string;
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, "href">;

/** Blue text link with a trailing arrow, e.g. "Training for your team →". */
export function ArrowLink({
  href,
  children,
  icon: Icon = ArrowUpRight,
  className = "",
  iconClassName = "ml-6 size-4",
  external,
  ...rest
}: Props) {
  const cls = `group inline-flex items-center font-bold text-blue transition-colors hover:text-[#184f8c] ${className}`;
  const diagonal = Icon === ArrowUpRight ? "group-hover:-translate-y-0.5" : "";
  const inner = (
    <>
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
        {children}
      </span>
      <Icon
        aria-hidden
        strokeWidth={2}
        className={`shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 ${diagonal} ${iconClassName}`}
      />
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
        {inner}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {inner}
    </Link>
  );
}
