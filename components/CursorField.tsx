"use client";

import { useEffect, useRef } from "react";

/**
 * Shared cursor field (v23 cursor-animation.js): a soft glow and a dot grid that bends around the
 * pointer. It never captures clicks, and is off on touch devices and with reduced motion.
 */
export function CursorField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || typeof canvas.getContext !== "function") return;
    const ctx = canvas.getContext("2d");
    if (!ctx || typeof window.matchMedia !== "function") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    let width = 1,
      height = 1,
      frame: number | null = null,
      previous = 0,
      settle = 0,
      active = false;
    const mouse = { x: 0, y: 0 },
      current = { x: 0, y: 0 };
    const allowed = () => fine.matches && !reduced.matches && !document.hidden;

    function clear() {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      active = false;
      settle = 0;
      canvas!.classList.remove("is-active");
      ctx!.clearRect(0, 0, width, height);
    }
    function size() {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (active) schedule();
    }
    function schedule() {
      if (frame === null && active && allowed()) frame = requestAnimationFrame(paint);
    }
    function paint(timestamp: number) {
      frame = null;
      if (!active || !allowed()) {
        clear();
        return;
      }
      if (timestamp - previous < 24) {
        schedule();
        return;
      }
      const delta = Math.min((timestamp - previous) / 1000 || 0.033, 0.1);
      previous = timestamp;
      const ease = 1 - Math.exp(-12 * delta);
      current.x += (mouse.x - current.x) * ease;
      current.y += (mouse.y - current.y) * ease;
      ctx!.clearRect(0, 0, width, height);
      const glow = ctx!.createRadialGradient(current.x, current.y, 0, current.x, current.y, 145);
      glow.addColorStop(0, "rgba(34,98,243,.055)");
      glow.addColorStop(1, "rgba(34,98,243,0)");
      ctx!.fillStyle = glow;
      ctx!.fillRect(current.x - 145, current.y - 145, 290, 290);
      // A stable grid makes the local colour and displacement visible as the cursor passes.
      const space = 30,
        startX = Math.floor((current.x - 150) / space) * space,
        startY = Math.floor((current.y - 150) / space) * space;
      for (let x = startX; x < current.x + 150; x += space)
        for (let y = startY; y < current.y + 150; y += space) {
          const dx = x - current.x,
            dy = y - current.y,
            distance = Math.hypot(dx, dy);
          if (distance >= 145) continue;
          const influence = Math.pow(1 - distance / 145, 2),
            shift = influence * 15,
            px = x + (distance ? (dx / distance) * shift : 0),
            py = y + (distance ? (dy / distance) * shift : 0);
          ctx!.beginPath();
          ctx!.arc(px, py, 0.8 + influence * 1.2, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(45,129,255,${influence * 0.6})`;
          ctx!.fill();
        }
      if (Math.hypot(mouse.x - current.x, mouse.y - current.y) > 0.1) {
        settle = 0;
        schedule();
      } else if (settle++ < 3) schedule();
    }

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch" || !allowed()) return;
      if (!active) {
        current.x = event.clientX;
        current.y = event.clientY;
      }
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      active = true;
      settle = 0;
      canvas.classList.add("is-active");
      schedule();
    };
    const onVisibility = () => {
      if (document.hidden) clear();
    };
    const onScroll = () => {
      if (active) {
        settle = 0;
        schedule();
      }
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", clear);
    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener?.("change", clear);
    fine.addEventListener?.("change", clear);
    window.addEventListener("resize", size, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    size();
    return () => {
      clear();
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", clear);
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener?.("change", clear);
      fine.removeEventListener?.("change", clear);
      window.removeEventListener("resize", size);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <canvas id="cursor-field" aria-hidden="true" ref={ref}></canvas>;
}
