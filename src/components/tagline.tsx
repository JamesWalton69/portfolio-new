"use client";

import { useEffect, useRef } from "react";

// Scroll-linked word illumination. Words light in order as the block crosses
// the viewport, so the sentence is read at the speed the reader scrolls.
export function Tagline({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const words = [...root.querySelectorAll<HTMLElement>(".word")];

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      words.forEach((w) => w.classList.add("is-lit"));
      return;
    }

    let raf = 0;
    const update = () => {
      const box = root.getBoundingClientRect();
      const start = window.innerHeight * 0.9;
      const span = window.innerHeight * 0.65 + box.height * 0.35;
      const p = Math.min(1, Math.max(0, (start - box.top) / span));
      const lit = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle("is-lit", i < lit));
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const words = text.split(" ");

  return (
    <p
      ref={ref}
      className="heading-2 max-w-[22ch] md:max-w-[26ch]"
      aria-label={text}
    >
      <span aria-hidden>
        {words.map((w, i) => (
          <span key={i} className="word">
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        ))}
      </span>
    </p>
  );
}
