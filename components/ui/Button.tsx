import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

const base =
  "group inline-flex items-center justify-between gap-6 rounded-[7px] bg-blue font-bold text-white shadow-[0_6px_16px_-8px_rgb(31_95_166/0.6)] transition-[background-color,box-shadow,transform] duration-200 hover:bg-[#184f8c] hover:shadow-[0_10px_24px_-10px_rgb(31_95_166/0.7)] active:translate-y-px";

const sizes = {
  md: "h-[54px] px-5 text-[15px] tracking-[-0.01em]",
  lg: "h-14 px-6 text-[16px] tracking-[-0.01em] md:h-[63px] md:px-[26px] md:text-[17px]",
};

type Common = { children: ReactNode; icon?: LucideIcon; size?: keyof typeof sizes; className?: string };

function Inner({ children, icon: Icon = ArrowUpRight }: Pick<Common, "children" | "icon">) {
  return (
    <>
      <span>{children}</span>
      <Icon
        aria-hidden
        strokeWidth={2}
        className="size-5 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </>
  );
}

export function ButtonLink({
  href,
  children,
  icon,
  size = "lg",
  className = "",
  ...rest
}: Common & Omit<ComponentPropsWithoutRef<"a">, "href"> & { href: string }) {
  return (
    <Link href={href} className={`${base} ${sizes[size]} ${className}`} {...rest}>
      <Inner icon={icon}>{children}</Inner>
    </Link>
  );
}

export function Button({ children, icon, size = "lg", className = "", ...rest }: Common & ComponentPropsWithoutRef<"button">) {
  return (
    <button className={`${base} ${sizes[size]} cursor-pointer ${className}`} {...rest}>
      <Inner icon={icon}>{children}</Inner>
    </button>
  );
}
