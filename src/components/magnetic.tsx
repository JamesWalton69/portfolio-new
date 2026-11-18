"use client";

import { useRef } from "react";

// Tilts its child toward the pointer. Small numbers on purpose: 6 degrees is
// enough to feel physical without turning into a gimmick.
export function Magnetic({
  children,
  strength = 6,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const b = el.getBoundingClientRect();
    const px = (e.clientX - b.left) / b.width - 0.5;
    const py = (e.clientY - b.top) / b.height - 0.5;
    // Custom properties inherit, so the project-art spotlight can read these.
    el.style.setProperty("--mx", `${((px + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${((py + 0.5) * 100).toFixed(1)}%`);
    el.style.transform = `perspective(900px) rotateX(${(-py * strength).toFixed(2)}deg) rotateY(${(px * strength).toFixed(2)}deg)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) {
      el.style.transform = "";
      el.style.removeProperty("--mx");
      el.style.removeProperty("--my");
    }
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
    >
      {children}
    </div>
  );
}
