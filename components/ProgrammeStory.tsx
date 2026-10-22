"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { LEVELS } from "@/lib/catalogue";
import { useSite } from "./SiteProvider";

type Programme = { id: string; code: string; title: string; tag: string; text: string; art: ReactNode };

// Home-page programme cards, copied from v23 index.html.
const PROGRAMMES: Programme[] = [
  {
    id: "22301",
    code: "ISO 22301",
    title: "Business Continuity",
    tag: "PLAN FOR DISRUPTION",
    text: "Keep critical operations moving. Build the knowledge to plan for disruption and strengthen organisational resilience.",
    art: (
      <svg viewBox="0 0 150 150" aria-hidden="true">
        <circle cx="75" cy="75" r="52" />
        <circle cx="75" cy="75" r="38" />
        <circle cx="75" cy="75" r="24" />
        <path d="M75 12v126M12 75h126m-63 0 41-41M75 75l-28 28" />
      </svg>
    ),
  },
  {
    id: "42001",
    code: "ISO/IEC 42001",
    title: "AI Management Systems",
    tag: "LEAD RESPONSIBLY",
    text: "Bring structure to responsible AI. Explore governance, accountability and risk within an AI management system.",
    art: (
      <svg viewBox="0 0 150 150" aria-hidden="true">
        <rect x="25" y="25" width="100" height="100" rx="8" />
        <rect x="44" y="44" width="62" height="62" rx="8" />
        <path d="M54 2v23m42-23v23M54 125v23m42-23v23M2 54h23M2 96h23m100-42h23m-23 42h23M55 94l20-38 20 38m-30-12h20" />
      </svg>
    ),
  },
  {
    id: "27001",
    code: "ISO/IEC 27001",
    title: "Information Security",
    tag: "PROTECT INFORMATION",
    text: "Protect information with confidence. Develop your understanding of information security management and assurance.",
    art: (
      <svg viewBox="0 0 150 150" aria-hidden="true">
        <path d="m75 8 49 18v39c0 35-49 72-49 72S26 100 26 65V26Z" />
        <path d="m75 26 33 12v27c0 25-33 50-33 50S42 90 42 65V38Z" />
        <path d="m57 66 14 14 25-30" />
      </svg>
    ),
  },
];

/** "From AUD $400" in the selected currency. */
export function FromPrice() {
  const { market } = useSite();
  return <strong data-from-price>From {LEVELS[0][market]}</strong>;
}

/** Scroll-led programme cards beside an interactive particle canvas (v23 particle-motion.js). */
export function ProgrammeStory() {
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef = useRef(0);

  useEffect(() => {
    const stage = stageRef.current,
      canvas = canvasRef.current;
    if (!stage || !canvas || typeof canvas.getContext !== "function") return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const slots = slotRefs.current.filter((s): s is HTMLDivElement => !!s);
    if (!slots.length) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const count = 660,
      mouse = { x: -9999, y: -9999 },
      cursor = { x: -9999, y: -9999 };
    type Pt = { x: number; y: number; z: number; seed: number; size: number };
    const points: Pt[] = [];
    let width = 1,
      height = 1,
      frame: number | null = null,
      scrollFrame: number | null = null,
      visible = true,
      lastPaint = 0,
      time = 0;
    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

    function line(pointsIn: number[][], n: number, closed = false) {
      const vertices = closed ? [...pointsIn, pointsIn[0]] : pointsIn,
        lengths: number[] = [];
      let total = 0;
      for (let i = 0; i < vertices.length - 1; i++) {
        const a = vertices[i],
          b = vertices[i + 1];
        const length = Math.hypot(b[0] - a[0], b[1] - a[1]);
        lengths.push(length);
        total += length;
      }
      return Array.from({ length: n }, (_, index) => {
        let distance = (total * index) / Math.max(1, n - 1),
          segment = 0;
        while (segment < lengths.length - 1 && distance > lengths[segment]) {
          distance -= lengths[segment];
          segment++;
        }
        const a = vertices[segment],
          b = vertices[segment + 1],
          t = lengths[segment] ? distance / lengths[segment] : 0;
        return { x: a[0] + (b[0] - a[0]) * t, y: a[1] + (b[1] - a[1]) * t };
      });
    }
    function ring(n: number, r: number, start = 0, end = Math.PI * 2) {
      return Array.from({ length: n }, (_, i) => {
        const angle = start + ((end - start) * i) / Math.max(1, n - 1);
        return { x: Math.cos(angle) * r, y: Math.sin(angle) * r };
      });
    }
    const shapes: { x: number; y: number }[][] = [[], [], []];
    // Continuity: concentric cycles and a forward arrow.
    for (let layer = 0; layer < 4; layer++) shapes[0].push(...ring(130, 0.82 - layer * 0.14, -Math.PI * 0.92, Math.PI * 0.83));
    shapes[0].push(
      ...line(
        [
          [-0.45, 0.06],
          [0.1, -0.48],
          [0.55, -0.05],
        ],
        80,
      ),
      ...line(
        [
          [0.22, -0.06],
          [0.55, -0.05],
          [0.56, -0.38],
        ],
        60,
      ),
    );
    // AI management: a processor outline, connections and the letters AI.
    for (let layer = 0; layer < 3; layer++) {
      const r = 0.74 - layer * 0.12;
      shapes[1].push(
        ...line(
          [
            [-r, -r],
            [r, -r],
            [r, r],
            [-r, r],
          ],
          100,
          true,
        ),
      );
    }
    for (const x of [-0.48, -0.16, 0.16, 0.48])
      for (const side of [-1, 1]) {
        shapes[1].push(
          ...line(
            [
              [x, side * 0.75],
              [x, side * 0.98],
            ],
            16,
          ),
        );
        shapes[1].push(
          ...line(
            [
              [side * 0.75, x],
              [side * 0.98, x],
            ],
            16,
          ),
        );
      }
    shapes[1].push(
      ...line(
        [
          [-0.35, 0.3],
          [-0.09, -0.32],
          [0.17, 0.3],
        ],
        50,
      ),
      ...line(
        [
          [-0.25, 0.1],
          [0.07, 0.1],
        ],
        20,
      ),
      ...line(
        [
          [0.37, -0.32],
          [0.37, 0.3],
        ],
        34,
      ),
    );
    // Information security: a layered shield and verification check.
    for (let layer = 0; layer < 4; layer++) {
      const scale = 1 - layer * 0.11;
      shapes[2].push(
        ...line(
          [
            [0, -0.9],
            [0.75, -0.59],
            [0.67, 0.16],
            [0.4, 0.55],
            [0, 0.91],
            [-0.4, 0.55],
            [-0.67, 0.16],
            [-0.75, -0.59],
          ].map(([x, y]) => [x * scale, y * scale]),
          130,
          true,
        ),
      );
    }
    shapes[2].push(
      ...line(
        [
          [-0.36, -0.02],
          [-0.08, 0.26],
          [0.38, -0.29],
        ],
        140,
      ),
    );
    function target(index: number, shape: number) {
      const path = shapes[shape],
        point = path[Math.floor((index / count) * path.length)];
      const depth = Math.sin(index * 2.399963) * 0.11;
      return { x: point.x, y: point.y, z: depth };
    }
    for (let index = 0; index < count; index++) {
      const position = target(index, 0);
      points.push({ ...position, seed: index * 2.399963, size: 1.05 + (index % 5) * 0.18 });
    }
    function size() {
      const rect = canvas!.getBoundingClientRect(),
        dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width || 1;
      height = rect.height || 1;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      schedule();
    }
    function schedule() {
      if (frame === null && visible && !document.hidden) frame = requestAnimationFrame(paint);
    }
    function paint(timestamp: number) {
      frame = null;
      if (!visible || document.hidden) return;
      const reduced = preference.matches || !finePointer.matches;
      if (!reduced && timestamp - lastPaint < 32) {
        schedule();
        return;
      }
      const delta = Math.min((timestamp - lastPaint) / 1000 || 0.033, 0.1);
      lastPaint = timestamp;
      time += delta;
      const easing = reduced ? 1 : 1 - Math.exp(-6 * delta),
        cursorEase = reduced ? 1 : 1 - Math.exp(-9 * delta);
      cursor.x += (mouse.x - cursor.x) * cursorEase;
      cursor.y += (mouse.y - cursor.y) * cursorEase;
      ctx!.clearRect(0, 0, width, height);
      const radius = Math.min(width * 0.36, height * 0.4),
        parallax = !reduced && finePointer.matches && mouse.x > -1000;
      const shiftX = parallax ? (cursor.x - width / 2) * 0.026 : 0,
        shiftY = parallax ? (cursor.y - height / 2) * 0.026 : 0;
      const shape = activeRef.current;
      for (let index = 0; index < points.length; index++) {
        const point = points[index],
          destination = target(index, shape);
        point.x += (destination.x - point.x) * easing;
        point.y += (destination.y - point.y) * easing;
        point.z += (destination.z - point.z) * easing;
        const pulse = reduced ? 0 : Math.sin(time * 0.8 + point.seed) * 1.4,
          depthScale = 1 + point.z;
        let x = width / 2 + point.x * radius * depthScale + shiftX + Math.cos(point.seed) * pulse,
          y = height / 2 + point.y * radius * depthScale + shiftY + Math.sin(point.seed) * pulse;
        const dx = x - cursor.x,
          dy = y - cursor.y,
          distance = Math.hypot(dx, dy),
          influence = parallax ? Math.pow(clamp(1 - distance / 150, 0, 1), 2) : 0;
        if (distance > 0 && influence > 0) {
          x += (dx / distance) * influence * 16;
          y += (dy / distance) * influence * 16;
        }
        const red = Math.round(93 + (54 - 93) * influence),
          green = Math.round(138 + (151 - 138) * influence),
          blue = Math.round(191 + (255 - 191) * influence),
          alpha = 0.38 + (index % 7) * 0.055 + influence * 0.23;
        ctx!.beginPath();
        ctx!.arc(x, y, point.size * (1 + influence * 0.85), 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${red},${green},${blue},${alpha})`;
        ctx!.fill();
      }
      stage!.classList.add("has-particles");
      if (!reduced && finePointer.matches) schedule();
    }
    function scroll() {
      scrollFrame = null;
      const middle = window.innerHeight * 0.52;
      let nearest = 0,
        best = Infinity;
      slots.forEach((slot, index) => {
        const rect = slot.getBoundingClientRect(),
          distance = Math.abs(rect.top + rect.height * 0.5 - middle);
        if (distance < best) {
          best = distance;
          nearest = index;
        }
        const progress = preference.matches ? 1 : clamp((window.innerHeight * 0.92 - rect.top) / (window.innerHeight * 0.6), 0, 1),
          card = slot.querySelector<HTMLElement>(".programme-card");
        if (card) {
          card.classList.add("scroll-driven-card");
          card.style.setProperty("--scroll-opacity", String(0.25 + 0.75 * progress));
          card.style.setProperty("--scroll-rise", (65 * (1 - progress)).toFixed(1) + "px");
        }
      });
      activeRef.current = nearest;
      setActive(nearest);
      schedule();
    }
    const queueScroll = () => {
      if (scrollFrame === null) scrollFrame = requestAnimationFrame(scroll);
    };
    const onResize = () => {
      size();
      queueScroll();
    };
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch" || preference.matches || !finePointer.matches) return;
      const rect = canvas.getBoundingClientRect();
      const firstMove = mouse.x < -1000;
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      if (firstMove) {
        cursor.x = mouse.x;
        cursor.y = mouse.y;
      }
      schedule();
    };
    const onPointerLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onPreference = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      queueScroll();
      schedule();
    };
    const onVisibility = () => {
      if (document.hidden) {
        if (frame !== null) cancelAnimationFrame(frame);
        frame = null;
      } else schedule();
    };
    window.addEventListener("scroll", queueScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerleave", onPointerLeave);
    preference.addEventListener?.("change", onPreference);
    document.addEventListener("visibilitychange", onVisibility);
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver === "function") {
      observer = new IntersectionObserver(
        (entries) => {
          visible = entries[0].isIntersecting;
          if (visible) {
            lastPaint = 0;
            schedule();
          } else if (frame !== null) {
            cancelAnimationFrame(frame);
            frame = null;
          }
        },
        { rootMargin: "80px" },
      );
      observer.observe(stage);
    }
    size();
    scroll();
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      if (scrollFrame !== null) cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", queueScroll);
      window.removeEventListener("resize", onResize);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerleave", onPointerLeave);
      preference.removeEventListener?.("change", onPreference);
      document.removeEventListener("visibilitychange", onVisibility);
      observer?.disconnect();
    };
  }, []);

  const current = PROGRAMMES[active];

  return (
    <div className="programme-story">
      <div className="programme-grid">
        {PROGRAMMES.map((p, i) => (
            <div
              key={p.id}
              ref={(el) => {
                slotRefs.current[i] = el;
              }}
              className={`programme-scroll-slot${i === active ? " is-scroll-active" : ""}`}
              data-standard-id={p.id}
              data-standard-code={p.code}
              data-standard-title={p.title}
            >
              <article className="programme-card">
                <div className="programme-cover">
                  <small>{p.code}</small>
                  <span className="programme-art">{p.art}</span>
                  <span className="programme-tag">{p.tag}</span>
                </div>
                <div className="programme-body">
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  <div className="programme-meta">
                    <span>Foundation · Lead pathways</span>
                    <FromPrice />
                  </div>
                  <Link className="text-link" href={`/courses/#course-${p.id}`}>
                    Explore this course <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            </div>
        ))}
      </div>
      <figure className="particle-stage" ref={stageRef}>
        <div className="particle-stage-header">
          <span>KNOWLEDGE IN MOTION</span>
          <span className="status-dot" aria-hidden="true"></span>
        </div>
        <div className="particle-viewport">
          <canvas id="risk-particles" role="img" aria-label={`Interactive particle illustration representing ${current.title}.`} ref={canvasRef}></canvas>
          <svg className="particle-fallback" viewBox="0 0 150 150" aria-hidden="true">
            <circle cx="75" cy="75" r="52" />
            <circle cx="75" cy="75" r="38" />
            <path d="m48 83 28-32 28 27m-18 0h18V60" />
          </svg>
        </div>
        <figcaption>
          <div>
            <small id="particle-code">{current.code}</small>
            <strong id="particle-title">{current.title}</strong>
          </div>
          <Link id="particle-course-link" href={`/courses/#course-${current.id}`} aria-label={`Explore ${current.code} ${current.title} courses`}>
            ↗
          </Link>
        </figcaption>
      </figure>
    </div>
  );
}
