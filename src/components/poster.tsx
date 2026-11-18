"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

// Deterministic poster art per project. Hash of the slug picks the seed, so a
// project always draws the same thing on server and client.
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function Poster({
  slug,
  className = "",
  image,
  sizes = "(max-width: 768px) 82vw, 42vw",
}: {
  slug: string;
  className?: string;
  image?: string;
  sizes?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const seed = hash(slug);
    const cols = 34;
    const rows = 18;

    let raf = 0;
    let t = 0;

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const gx = w / cols;
      const gy = h / rows;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const n =
            Math.sin(c * 0.4 + t + (seed % 17)) *
            Math.cos(r * 0.5 - t * 0.7 + (seed % 11));
          const radius = Math.max(0.4, (n * 0.5 + 0.5) * gx * 0.34);
          ctx.beginPath();
          ctx.arc(gx * c + gx / 2, gy * r + gy / 2, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.fillStyle = "rgba(20,19,15,0.55)";

      // A dark bar sweeping across, so the field reads as moving light.
      const barY = ((Math.sin(t * 0.6) * 0.5 + 0.5) * h) | 0;
      ctx.fillStyle = "rgba(20,19,15,0.10)";
      ctx.fillRect(0, barY, w, Math.max(2, gy * 0.5));
    };

    const loop = () => {
      t += 0.006;
      draw();
      raf = requestAnimationFrame(loop);
    };

    draw();
    if (!calm.matches) raf = requestAnimationFrame(loop);

    const onResize = () => draw();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [slug]);

  if (image) {
    return (
      <Image
        src={image}
        alt=""
        fill
        sizes={sizes}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`size-full ${className}`}
      style={{ display: "block" }}
    />
  );
}
