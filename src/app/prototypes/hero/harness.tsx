"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { Canvas, Console, Globe, Grid, Orbit } from "./variants";

const variants = [
  { name: "Grid", Component: Grid },
  { name: "Console", Component: Console },
  { name: "Canvas", Component: Canvas },
  { name: "Orbit", Component: Orbit },
  { name: "Globe", Component: Globe },
] as const;

// The URL is the single source of truth, so a reload restores the picked variant
// without an effect (and without needing requestAnimationFrame to run).
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

function readIndex() {
  if (typeof window === "undefined") return 0;
  const requested = Number.parseInt(
    new URLSearchParams(window.location.search).get("v") ?? "",
    10,
  );
  return requested >= 1 && requested <= variants.length ? requested - 1 : 0;
}

function serverIndex() {
  return 0;
}

export function Harness() {
  const current = useSyncExternalStore(subscribe, readIndex, serverIndex);
  const [nonce, setNonce] = useState(0);
  const pickerRef = useRef<HTMLElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);

  const moveHighlight = useCallback(() => {
    const highlight = highlightRef.current;
    const item = pickerRef.current?.querySelector<HTMLButtonElement>(
      ".proto-picker-item[data-active]",
    );
    if (!highlight || !item) return;
    highlight.style.width = `${item.offsetWidth}px`;
    highlight.style.transform = `translateX(${item.offsetLeft}px)`;
  }, []);

  useLayoutEffect(() => {
    moveHighlight();
  }, [current, moveHighlight]);

  useEffect(() => {
    const dark = current === 1 || current === 2 || current === 4;
    document.documentElement.dataset.protoTheme = dark ? "dark" : "light";
    return () => { delete document.documentElement.dataset.protoTheme; };
  }, [current]);

  const setActive = useCallback((i: number) => {
    if (i < 0 || i >= variants.length) return;
    const url = new URL(window.location.href);
    url.searchParams.set("v", String(i + 1));
    window.history.replaceState(null, "", url);
    listeners.forEach((listener) => listener());
  }, []);

  useEffect(() => {
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() =>
        pickerRef.current?.setAttribute("data-ready", ""),
      );
    });
    window.addEventListener("resize", moveHighlight);
    document.fonts?.ready.then(moveHighlight).catch(() => {});

    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
      window.removeEventListener("resize", moveHighlight);
    };
  }, [moveHighlight]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable)
      ) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const num = Number.parseInt(event.key, 10);
      if (num >= 1 && num <= variants.length) setActive(num - 1);
      else if (event.key === "ArrowRight") setActive((readIndex() + 1) % variants.length);
      else if (event.key === "ArrowLeft") setActive((readIndex() - 1 + variants.length) % variants.length);
      else if (event.key === "r" || event.key === "R") setNonce((n) => n + 1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [setActive]);

  const Active = variants[current].Component;

  return (
    <>
      <div key={`${current}-${nonce}`}>
        <Active />
      </div>
      <nav className="proto-picker" aria-label="Prototype variants" ref={pickerRef}>
        <span className="proto-picker-highlight" aria-hidden ref={highlightRef} />
        {variants.map((variant, i) => (
          <button
            key={variant.name}
            type="button"
            className="proto-picker-item"
            data-active={i === current ? "" : undefined}
            aria-current={i === current ? "true" : undefined}
            onClick={() => setActive(i)}
          >
            {variant.name}
          </button>
        ))}
        <span className="proto-picker-divider" aria-hidden />
        <button
          type="button"
          className="proto-picker-item proto-picker-replay"
          aria-label="Replay animation (R)"
          onClick={() => setNonce((n) => n + 1)}
        >
          ↻
        </button>
      </nav>
    </>
  );
}
