"use client";

import { useEffect, useRef, useState } from "react";

// Pinned horizontal rail for pointer devices. On touch and narrow screens it
// falls back to a native swipe rail, because scroll-jacking a phone is worse
// than a rail that simply moves sideways under the thumb.
const PIN = "(min-width: 48rem)";

export function Rail({ children }: { children: React.ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    const el = outer.current;
    const inner = track.current;
    if (!el || !inner) return;
    const pin = window.matchMedia(PIN);
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");

    const measure = () => {
      setTravel(
        pin.matches && !calm.matches
          ? Math.max(0, inner.scrollWidth - window.innerWidth + 80)
          : 0,
      );
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(inner);
    window.addEventListener("resize", measure);
    pin.addEventListener("change", measure);
    calm.addEventListener("change", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      pin.removeEventListener("change", measure);
      calm.removeEventListener("change", measure);
    };
  }, []);

  useEffect(() => {
    const el = outer.current;
    const inner = track.current;
    if (!el || !inner || travel === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      const box = el.getBoundingClientRect();
      const span = el.offsetHeight - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -box.top / span)) : 0;
      inner.style.transform = `translate3d(${-p * travel}px, 0, 0)`;
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
  }, [travel]);

  return (
    <div
      ref={outer}
      className="relative"
      style={travel ? { height: `calc(100dvh + ${travel}px)` } : undefined}
    >
      <div
        className={
          travel
            ? "sticky top-0 flex h-[100dvh] items-center overflow-hidden"
            : ""
        }
      >
        <div
          ref={track}
          className="flex gap-6 px-6 will-change-transform md:px-10"
          style={
            travel
              ? undefined
              : {
                  overflowX: "auto",
                  scrollSnapType: "x mandatory",
                  scrollbarWidth: "none",
                }
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
}
