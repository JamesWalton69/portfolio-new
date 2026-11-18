"use client";

import { useEffect, useRef } from "react";

// Pointer-reactive dot grid inside the ink contact card. Dots swell and slide
// away from the cursor and shimmer on idle; the loop stops when off-screen.
export function DotField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const card = canvas?.parentElement;
    if (!canvas || !card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Read the palette token through the body so the dots stay on brand.
    const cream = getComputedStyle(document.body).backgroundColor;
    const GAP = 26;
    const R = 150; // pointer influence radius
    let w = 0;
    let h = 0;
    let raf = 0;
    let px = -1e4;
    let py = -1e4;

    const resize = () => {
      const box = card.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = box.width;
      h = box.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(card);

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = cream;
      for (let x = GAP / 2; x < w; x += GAP) {
        for (let y = GAP / 2; y < h; y += GAP) {
          const dx = x - px;
          const dy = y - py;
          const d = Math.hypot(dx, dy);
          const f = Math.max(0, 1 - d / R);
          const push = f * f * 14;
          const nx = d > 0.001 ? dx / d : 0;
          const ny = d > 0.001 ? dy / d : 0;
          // Gentle idle shimmer so the field is alive before any hover.
          const sway = Math.sin(t / 900 + (x + y) / 70) * 1.2;
          const r = 1.1 + f * 1.6;
          ctx.beginPath();
          ctx.arc(
            x + nx * push,
            y + ny * push + sway,
            Math.max(0.4, r + sway * 0.15),
            0,
            Math.PI * 2,
          );
          ctx.globalAlpha = 0.14 + f * 0.5;
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !raf) raf = requestAnimationFrame(loop);
      else if (!entry.isIntersecting && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(card);

    const move = (e: PointerEvent) => {
      const box = card.getBoundingClientRect();
      px = e.clientX - box.left;
      py = e.clientY - box.top;
    };
    const leave = () => {
      px = -1e4;
      py = -1e4;
    };

    card.addEventListener("pointermove", move, { passive: true });
    card.addEventListener("pointerleave", leave);
    return () => {
      io.disconnect();
      ro.disconnect();
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerleave", leave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
