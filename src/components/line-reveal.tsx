"use client";

import { useEffect, useRef } from "react";

// Reveals each line from behind a mask on mount. Pure transform, so it costs
// nothing and the text is selectable the whole time.
export function LineReveal({
  lines,
  className = "",
  lineClassName = "",
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.querySelectorAll(".line-mask").forEach((m) => m.classList.add("is-in"));
      return;
    }
    const masks = [...el.querySelectorAll<HTMLElement>(".line-mask")];
    masks.forEach((m, i) => {
      window.setTimeout(() => m.classList.add("is-in"), 120 + i * 110);
    });
  }, []);

  return (
    <span ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          {/* The gradient must sit on the element that owns the glyphs: an
              inline wrapper with block children clips to no text and paints
              nothing. */}
          <span className={lineClassName}>{line}</span>
        </span>
      ))}
    </span>
  );
}
