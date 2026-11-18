"use client";

import { useEffect, useRef } from "react";

// The ticker moves on its own, then speeds up, slows down or reverses with the
// scroll. Negative modulo is normalised so direction changes never jump.
export function VelocityMarquee({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = ref.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let half = 0;
    const measure = () => {
      half = track.scrollWidth / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    let raf = 0;
    let last = performance.now();
    let y = window.scrollY;
    let velocity = 0;
    let offset = 0;

    const tick = (t: number) => {
      const dt = Math.min(50, t - last);
      last = t;
      const next = window.scrollY;
      velocity = velocity * 0.9 + (next - y) * 0.1;
      y = next;

      const speed = 70 + Math.min(700, Math.abs(velocity) * 14);
      const dir = velocity < -2 ? -1 : 1;
      offset += dir * speed * (dt / 1000);
      if (half > 0) offset = ((offset % half) + half) % half;

      const skew = Math.max(-12, Math.min(12, -velocity * 0.25));
      track.style.transform = `translate3d(${-offset}px,0,0) skewX(${skew.toFixed(2)}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="marquee-track" data-velocity>
      {children}
    </div>
  );
}
