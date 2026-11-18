"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*@/<>[]{}+=";

// On hover, resolves random glyphs into the real label left to right. The
// accessible name stays the real text; only the visual layer scrambles. The
// animation writes to the DOM directly so it never fights React re-renders.
export function Scramble({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const run = () => {
      cancelAnimationFrame(raf);
      const start = performance.now();
      const duration = 520;
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        const settled = Math.floor(p * text.length);
        el.textContent = text
          .split("")
          .map((ch, i) =>
            i < settled || ch === " "
              ? ch
              : GLYPHS[(Math.random() * GLYPHS.length) | 0],
          )
          .join("");
        if (p < 1) raf = requestAnimationFrame(tick);
        else el.textContent = text;
      };
      raf = requestAnimationFrame(tick);
    };
    const enter = (e: PointerEvent) => {
      if (!e.relatedTarget || !el.contains(e.relatedTarget as Node)) run();
    };

    el.addEventListener("pointerover", enter);
    return () => {
      el.removeEventListener("pointerover", enter);
      cancelAnimationFrame(raf);
    };
  }, [text]);

  return (
    <span ref={ref} aria-label={text}>
      {text}
    </span>
  );
}
