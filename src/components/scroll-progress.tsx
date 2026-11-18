"use client";

import { useEffect, useRef } from "react";

// A thin pink line that fills as the page scrolls. One div, animated by scroll
// position rather than a timer, so it never drifts away from the real position.
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;
    let raf = 0;

    const update = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${height > 0 ? window.scrollY / height : 0})`;
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

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-0.5">
      <div
        ref={ref}
        className="h-full w-full origin-left scale-x-0 bg-pink-deep"
      />
    </div>
  );
}
