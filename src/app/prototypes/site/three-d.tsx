"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// New 3D component 1: a drag-able canvas wireframe sphere. Own projection,
// own loop, paused off screen, static under reduced motion. No dependencies.
export function WireSphere({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rx = -0.35;
    let ry = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let raf = 0;

    // Fibonacci sphere keeps the points evenly spread without randomness, so
    // the first frame is identical on server and client.
    const count = 260;
    const points = Array.from({ length: count }, (_, i) => {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = i * 2.399963229728653;
      return [Math.cos(theta) * r, y, Math.sin(theta) * r] as const;
    });
    const rings = Array.from({ length: 7 }, (_, ring) => {
      const lat = -Math.PI / 2 + ((ring + 1) / 8) * Math.PI;
      const y = Math.sin(lat);
      const r = Math.cos(lat);
      return Array.from({ length: 49 }, (_, k) => {
        const a = (k / 48) * Math.PI * 2;
        return [Math.cos(a) * r, y, Math.sin(a) * r] as const;
      });
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const project = (x: number, y: number, z: number) => {
      const cy = Math.cos(ry);
      const sy = Math.sin(ry);
      const cx = Math.cos(rx);
      const sx = Math.sin(rx);
      const x1 = x * cy + z * sy;
      const z1 = -x * sy + z * cy;
      const y1 = y * cx - z1 * sx;
      const z2 = y * sx + z1 * cx;
      const scale = 2.6 / (2.6 + z2);
      return [
        canvas.clientWidth / 2 + x1 * scale * canvas.clientWidth * 0.42,
        canvas.clientHeight / 2 + y1 * scale * canvas.clientHeight * 0.42,
        z2,
      ] as const;
    };

    const draw = () => {
      resize();
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(214, 247, 94, 0.28)";
      for (const ring of rings) {
        ctx.beginPath();
        ring.forEach(([x, y, z], i) => {
          const [px, py] = project(x, y, z);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.stroke();
      }
      for (const [x, y, z] of points) {
        const [px, py, depth] = project(x, y, z);
        const radius = Math.max(0.6, (1.4 - depth) * 0.9);
        ctx.fillStyle = depth > 0.4 ? "rgba(255, 156, 194, 0.55)" : "rgba(247, 242, 233, 0.75)";
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      if (!calm) ry += 0.0035;
      draw();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (raf || calm) return;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const onDown = (event: PointerEvent) => {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = "grabbing";
    };
    const onMove = (event: PointerEvent) => {
      if (!dragging) return;
      ry += (event.clientX - lastX) * 0.006;
      rx = Math.max(-1.2, Math.min(1.2, rx + (event.clientY - lastY) * 0.006));
      lastX = event.clientX;
      lastY = event.clientY;
      if (calm) draw();
    };
    const onUp = () => {
      dragging = false;
      canvas.style.cursor = "grab";
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.style.cursor = "grab";

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
    observer.observe(canvas);
    const resizer = new ResizeObserver(() => {
      draw();
    });
    resizer.observe(canvas);

    draw();
    if (!calm) start();

    return () => {
      stop();
      observer.disconnect();
      resizer.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      role="img"
      aria-label="Rotating wireframe globe made of project points; drag to rotate"
    />
  );
}

// New 3D component 2: a CSS-3D project carousel. Cards sit on a cylinder and
// rotate to the front with buttons; no continuous animation and no libraries.
export type PrismItem = { href: string; title: string; kicker: string; image: string };

export function PrismCards({ items }: { items: PrismItem[] }) {
  const [active, setActive] = useState(0);
  const n = items.length;
  if (n === 0) return <p className="fs-empty">No projects to show.</p>;
  const step = 360 / n;

  return (
    <div className="ps-prism">
      <div className="ps-prism-ring" style={{ transform: `translateZ(-19rem) rotateY(${-active * step}deg)` }}>
        {items.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            className="ps-prism-card"
            aria-hidden={i === active ? undefined : true}
            tabIndex={i === active ? 0 : -1}
            style={{
              transform: `rotateY(${i * step}deg) translateZ(19rem)`,
              opacity: i === active ? 1 : 0.42,
            }}
            onClick={() => setActive(i)}
          >
            <Image src={item.image} alt={i === active ? item.title : ""} fill sizes="22rem" />
            <span className="ps-prism-card-label">
              <strong>{item.title}</strong>
              <small>{item.kicker}</small>
            </span>
          </a>
        ))}
      </div>
      <div className="ps-prism-controls">
        <button type="button" aria-label="Previous project" onClick={() => setActive((active - 1 + n) % n)}>←</button>
        <span>{String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
        <button type="button" aria-label="Next project" onClick={() => setActive((active + 1) % n)}>→</button>
      </div>
    </div>
  );
}
