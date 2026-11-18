"use client";

import { useEffect } from "react";

// One document-level listener pulls any [data-magnetic] element toward the
// pointer. Avoids wrapping every button in its own component.
export function MagneticFields() {
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    let active: HTMLElement | null = null;
    const reset = () => {
      if (active) active.style.transform = "";
      active = null;
    };
    const move = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-magnetic]");
      if (el !== active) reset();
      if (!el) return;
      active = el;
      const b = el.getBoundingClientRect();
      const dx = (e.clientX - (b.left + b.width / 2)) * 0.22;
      const dy = (e.clientY - (b.top + b.height / 2)) * 0.3;
      el.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
    };
    const leave = () => reset();

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      reset();
    };
  }, []);

  return null;
}
