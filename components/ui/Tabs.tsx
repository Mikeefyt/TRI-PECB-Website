"use client";

import { useRef, type KeyboardEvent } from "react";

export type TabItem<T extends string> = { id: T; label: string };

type Props<T extends string> = {
  items: TabItem<T>[];
  value: T;
  onChange: (id: T) => void;
  label: string;
  controls: string;
  idPrefix: string;
};

/** Pill tab group following the WAI-ARIA tabs pattern (arrow keys, Home/End). */
export function Tabs<T extends string>({ items, value, onChange, label, controls, idPrefix }: Props<T>) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % items.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + items.length) % items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    if (next < 0) return;
    e.preventDefault();
    onChange(items[next].id);
    refs.current[next]?.focus();
  }

  return (
    <div
      role="tablist"
      aria-label={label}
      className="grid grid-cols-2 gap-1 rounded-[9px] border border-line bg-[#eef3f9] p-[5px] sm:inline-flex sm:max-w-full"
    >
      {items.map((t, i) => {
        const active = t.id === value;
        return (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            id={`${idPrefix}-${t.id}`}
            role="tab"
            type="button"
            aria-selected={active}
            aria-controls={controls}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(t.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`h-11 shrink-0 cursor-pointer whitespace-nowrap rounded-[7px] px-3.5 text-[14px] transition-all duration-200 sm:px-[18px] ${
              active ? "bg-white font-bold text-blue shadow-[0_1px_3px_rgb(20_40_75/0.08)]" : "text-ink hover:bg-white/50 hover:text-navy"
            }`}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
