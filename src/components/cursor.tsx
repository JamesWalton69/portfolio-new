"use client";

import { useEffect, useRef } from "react";

// A dot that tracks the pointer and a ring that lags behind it.
// pointer: fine only; touch and reduced motion keep the native cursor.
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || calm.matches) return;

    document.documentElement.classList.add("cursor-none-desktop");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let frame = 0;
    let visible = false;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = (e.target as HTMLElement | null)?.closest(
        "a,button,[data-cursor]",
      );
      if (ring.current) {
        ring.current.dataset.hot = target ? "true" : "false";
      }
      if (!visible) {
        visible = true;
        if (dot.current) dot.current.style.opacity = "1";
        if (ring.current) ring.current.style.opacity = "1";
      }
    };

    const leave = () => {
      visible = false;
      if (dot.current) dot.current.style.opacity = "0";
      if (ring.current) ring.current.style.opacity = "0";
    };

    const tick = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("cursor-none-desktop");
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <div
        ref={dot}
        className="absolute top-0 left-0 size-1.5 rounded-full bg-ink opacity-0 mix-blend-difference transition-opacity duration-300"
      />
      <div
        ref={ring}
        data-hot="false"
        className="absolute top-0 left-0 size-9 rounded-full border border-ink/40 opacity-0 transition-[opacity,width,height,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] data-[hot=true]:size-14 data-[hot=true]:border-pink-deep data-[hot=true]:bg-pink/30"
      />
    </div>
  );
}
