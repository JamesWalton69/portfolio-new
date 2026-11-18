"use client";

import { useEffect, useRef } from "react";

// A point-cloud globe with latitude and longitude lines. Points are rotated in
// 3D and projected by hand, so there is no Three.js dependency to ship. Drag
// turns it; it keeps spinning after release and drifts slowly when left alone.
type Point = { x: number; y: number; z: number };

function project(p: Point, rx: number, ry: number, scale: number, w: number, h: number) {
  const cy = Math.cos(ry);
  const sy = Math.sin(ry);
  const cx = Math.cos(rx);
  const sx = Math.sin(rx);
  const x1 = p.x * cy + p.z * sy;
  const z1 = -p.x * sy + p.z * cy;
  const y2 = p.y * cx - z1 * sx;
  const z2 = p.y * sx + z1 * cx;
  const depth = 3.4 - z2;
  const f = 2.8 / depth;
  return { x: w / 2 + x1 * scale * f, y: h / 2 + y2 * scale * f, z: z2, f };
}

export function Sculpture() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Fibonacci sphere: points spread evenly over the surface.
    const points: Point[] = [];
    const n = 380;
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      points.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
    }

    // Lines: a handful of latitudes and longitudes give the cloud a readable
    // surface without turning it into a wireframe ball.
    const lines: Point[][] = [];
    for (const lat of [-0.66, -0.33, 0, 0.33, 0.66]) {
      const r = Math.sqrt(1 - lat * lat);
      const ring: Point[] = [];
      for (let i = 0; i <= 80; i++) {
        const a = (i / 80) * Math.PI * 2;
        ring.push({ x: Math.cos(a) * r, y: lat, z: Math.sin(a) * r });
      }
      lines.push(ring);
    }
    for (let k = 0; k < 8; k++) {
      const a = (k / 8) * Math.PI;
      const arc: Point[] = [];
      for (let i = 0; i <= 80; i++) {
        const t = (i / 80) * Math.PI * 2;
        arc.push({
          x: Math.cos(t) * Math.cos(a),
          y: Math.sin(t),
          z: Math.cos(t) * Math.sin(a),
        });
      }
      lines.push(arc);
    }

    let rx = -0.18;
    let ry = 0.4;
    let vx = 0;
    let vy = 0.0016;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let visible = true;
    let raf = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      const box = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = box.width;
      h = box.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      vy += (e.clientX - lastX) * 0.0006;
      vx += (e.clientY - lastY) * 0.0006;
      ry += (e.clientX - lastX) * 0.006;
      rx += (e.clientY - lastY) * 0.006;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onUp = () => {
      dragging = false;
      canvas.style.cursor = "grab";
    };

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;

      if (!calm) {
        vx *= 0.94;
        vy += (0.0016 - vy) * 0.02;
        rx += vx;
        ry += vy;
      }

      ctx.clearRect(0, 0, w, h);
      const scale = Math.min(w, h) * 0.36;

      ctx.lineWidth = 1;
      for (const line of lines) {
        ctx.beginPath();
        line.forEach((p, i) => {
          const q = project(p, rx, ry, scale, w, h);
          if (i === 0) ctx.moveTo(q.x, q.y);
          else ctx.lineTo(q.x, q.y);
        });
        ctx.strokeStyle = "rgba(247,242,233,0.10)";
        ctx.stroke();
      }

      for (const p of points) {
        const q = project(p, rx, ry, scale, w, h);
        const front = (q.z + 1) / 2;
        const r = 0.6 + front * 1.5;
        ctx.beginPath();
        ctx.arc(q.x, q.y, r, 0, Math.PI * 2);
        ctx.fillStyle =
          front > 0.72
            ? `rgba(255,156,194,${0.45 + front * 0.55})`
            : `rgba(247,242,233,${0.16 + front * 0.5})`;
        ctx.fill();
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.style.cursor = "grab";
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label="An interactive three dimensional globe of points. Drag to rotate it."
      className="size-full touch-none select-none"
    />
  );
}
