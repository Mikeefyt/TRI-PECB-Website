import { ArrowRight, Asterisk, CircleCheck, Diamond, GraduationCap, Square, SquareCheck } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

/*
 * Laptop / online-learning illustration recreated from the reference in HTML + SVG.
 * Everything is laid out on a 700 × 670 design grid and scaled with container units,
 * so it keeps its proportions at every width.
 */
const W = 700;
const H = 670;

/** Absolute box on the design grid, expressed as percentages. */
function box(x: number, y: number, w: number, h: number): CSSProperties {
  return { position: "absolute", left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%`, width: `${(w / W) * 100}%`, height: `${(h / H) * 100}%` };
}

/** Font size in container-width units for a size in design pixels. */
const fs = (px: number) => `${((px / W) * 100).toFixed(3)}cqw`;

function Row({ y, icon, title, code, check }: { y: number; icon: ReactNode; title: string; code: string; check?: boolean }) {
  return (
    <div
      style={{ ...box(158, y, 411, 44), paddingInline: fs(14) }}
      className="flex items-center rounded-[0.5cqw] border border-[#cfdbea] bg-white"
    >
      <span className="flex w-[9%] shrink-0 items-center text-[#4b6f99]">{icon}</span>
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block text-navy" style={{ fontSize: fs(14) }}>
          {title}
        </span>
        <span className="block text-muted" style={{ fontSize: fs(9), marginTop: fs(2) }}>
          {code}
        </span>
      </span>
      {check && <CircleCheck aria-hidden strokeWidth={1.25} className="shrink-0 text-[#6d8db3]" style={{ width: fs(21), height: fs(21) }} />}
    </div>
  );
}

function Step({ done, label }: { done: boolean; label: string }) {
  const Icon = done ? SquareCheck : Square;
  return (
    <li className="flex items-center text-blue" style={{ gap: fs(11), fontSize: fs(11) }}>
      <Icon aria-hidden strokeWidth={1.75} className="shrink-0" style={{ width: fs(18), height: fs(18) }} />
      <span className={done ? "font-medium" : "font-medium text-[#3d5f88]"}>{label}</span>
      <span className="sr-only">{done ? " (done)" : " (to do)"}</span>
    </li>
  );
}

export function HeroIllustration() {
  const icon = { width: fs(20), height: fs(20) };
  return (
    <figure className="mx-auto w-full max-w-[700px]">
      <div className="relative w-full select-none [container-type:inline-size]" style={{ aspectRatio: `${W} / ${H}` }}>
        {/* Orbit, dots and ground lines */}
        <svg aria-hidden viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full overflow-visible">
          <circle cx="360" cy="300" r="272" fill="none" stroke="#bfcde0" strokeWidth="1.2" strokeDasharray="2 6" />
          <circle cx="50" cy="174" r="4" fill="#3a6fa8" />
          <circle cx="690" cy="141" r="2.6" fill="#3a6fa8" />
          <circle cx="663" cy="265" r="4" fill="#3a6fa8" />
          <circle cx="22" cy="317" r="2.6" fill="#3a6fa8" />
          <line x1="3" y1="575" x2="693" y2="575" stroke="#c8d4e3" strokeWidth="1.2" />
          <line x1="70" y1="597" x2="623" y2="597" stroke="#d3dce8" strokeWidth="1.2" />
          <line x1="13" y1="660" x2="686" y2="660" stroke="#dde5ef" strokeWidth="1.2" />
        </svg>

        {/* Laptop base */}
        <div aria-hidden style={box(100, 492, 530, 34)} className="rounded-b-[0.6cqw] border border-[#cfdbea] bg-[#e9eff7]" />
        <div aria-hidden style={box(60, 522, 615, 16)} className="rounded-b-[2cqw] rounded-t-[0.4cqw] border border-[#cfdbea] bg-[#dfe7f1]" />
        <svg aria-hidden viewBox="0 0 185 15" preserveAspectRatio="none" style={box(270, 493, 185, 15)}>
          <polygon points="0,0 185,0 172,15 13,15" fill="#b6c8de" />
        </svg>

        {/* Laptop screen */}
        <div style={box(115, 65, 497, 435)} className="rounded-[2.6cqw] border-2 border-[#c9d6e7] bg-[#eef3f9] shadow-[0_20px_50px_-30px_rgb(20_40_75/0.35)]" />
        <div style={box(133, 85, 462, 410)} className="rounded-[1.4cqw] bg-white" />
        <div aria-hidden style={box(150, 103, 40, 10)} className="flex items-center gap-[0.9cqw]">
          {[0, 1, 2].map((i) => (
            <span key={i} className="block aspect-square w-[1.15cqw] rounded-full bg-[#8fa6c4]" />
          ))}
        </div>
        <p style={{ ...box(380, 101, 190, 14), fontSize: fs(10.5) }} className="text-right font-medium tracking-[0.2em] text-muted">
          ONLINE LEARNING
        </p>
        <div aria-hidden style={box(133, 128, 462, 1)} className="bg-[#e3eaf3]" />

        {/* Blue panel */}
        <div
          style={{ ...box(158, 152, 411, 129), padding: `${fs(18)} ${fs(21)}` }}
          className="flex flex-col justify-center rounded-[0.8cqw] bg-[linear-gradient(135deg,#2766ad,#1f5fa6_60%,#215a9c)] text-white"
        >
          <p className="font-bold tracking-[0.18em] text-[#dce8f7]" style={{ fontSize: fs(10.5) }}>
            PECB CERTIFICATION TRAINING
          </p>
          <p className="leading-[1.25] tracking-[-0.01em]" style={{ fontSize: fs(23.5), marginTop: fs(6) }}>
            Build your knowledge.
            <br />
            Strengthen your capability.
          </p>
          <p className="font-bold text-[#e4edf8]" style={{ fontSize: fs(10), marginTop: fs(9) }}>
            Foundation · Lead Implementer · Lead Auditor
          </p>
        </div>

        <Row y={300} icon={<ArrowRight aria-hidden strokeWidth={1.5} style={icon} />} title="Business Continuity" code="ISO 22301" check />
        <Row y={355} icon={<Asterisk aria-hidden strokeWidth={1.5} style={icon} />} title="AI Management Systems" code="ISO/IEC 42001" />
        <Row y={410} icon={<Diamond aria-hidden strokeWidth={1.5} style={icon} />} title="Information Security" code="ISO/IEC 27001" />

        {/* Open book */}
        <svg aria-hidden viewBox="0 0 205 150" style={box(20, 417, 205, 150)} className="overflow-visible drop-shadow-[0_14px_18px_rgb(20_40_75/0.18)]">
          <g transform="rotate(-8 102 75)">
            <rect x="4" y="10" width="198" height="132" rx="7" fill="#5e86b8" />
            <path d="M18 28 Q60 16 100 30 L100 132 Q60 120 18 130 Z" fill="#fff" />
            <path d="M106 30 Q146 16 188 26 L188 128 Q146 118 106 132 Z" fill="#f4f7fb" />
            <line x1="103" y1="30" x2="103" y2="134" stroke="#4a73a6" strokeWidth="2" />
            {[50, 64, 78].map((y) => (
              <g key={y} stroke="#5e86b8" strokeWidth="3" strokeLinecap="round">
                <line x1="32" y1={y} x2="86" y2={y - 6} />
                <line x1="120" y1={y - 6} x2="174" y2={y - 10} />
              </g>
            ))}
          </g>
        </svg>

        {/* Floating: professional development */}
        <div
          style={{ ...box(393, 2, 267, 90), paddingInline: fs(18), gap: fs(16) }}
          className="animate-float flex items-center rounded-[1.4cqw] border border-[#d5dfeb] bg-white shadow-float"
        >
          <GraduationCap aria-hidden strokeWidth={1.25} className="shrink-0 text-[#3f6797]" style={{ width: fs(60), height: fs(60) }} />
          <p className="leading-[1.45] text-[#3c5675]" style={{ fontSize: fs(16) }}>
            Your professional development
          </p>
        </div>

        {/* Floating: clipboard */}
        <div className="animate-float-delayed" style={box(508, 355, 159, 182)}>
          <div
            style={{ position: "absolute", left: 0, right: 0, top: "4.4%", bottom: 0, padding: `${fs(28)} ${fs(20)} 0` }}
            className="rounded-[1.2cqw] border border-[#d5dfeb] bg-white shadow-float"
          >
            <p className="font-medium tracking-[0.2em] text-[#3d5f88]" style={{ fontSize: fs(10) }}>
              YOUR NEXT STEP
            </p>
            <ul className="flex flex-col" style={{ marginTop: fs(14), gap: fs(13) }}>
              <Step done label="Learn" />
              <Step done label="Prepare" />
              <Step done={false} label="Apply" />
            </ul>
          </div>
          <div aria-hidden style={{ position: "absolute", left: "27%", width: "45%", top: 0, height: "9.5%" }} className="rounded-[0.8cqw] bg-[#a9bedb]" />
        </div>
      </div>

      <figcaption className="mt-5 flex items-center justify-center gap-3 whitespace-nowrap text-[9.5px] font-medium tracking-[0.1em] text-[#3d5f88] sm:text-[11px] sm:tracking-[0.16em] md:text-[11.5px]">
        <span aria-hidden className="inline-flex size-[7px] shrink-0 rounded-full bg-blue ring-[3px] ring-icon-bg" />
        PRACTICAL KNOWLEDGE. PROFESSIONAL GROWTH.
      </figcaption>
    </figure>
  );
}
