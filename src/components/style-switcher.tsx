"use client";

import { useEffect, useSyncExternalStore } from "react";

const STYLES = ["default", "magazine", "terminal", "prism"] as const;
type SiteStyle = (typeof STYLES)[number];
const STORAGE_KEY = "site-style";

const LABELS: Record<SiteStyle, string> = {
  default: "Default",
  magazine: "Magazine",
  terminal: "Terminal",
  prism: "Prism",
};

const listeners = new Set<() => void>();
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
};

function readStyle(): SiteStyle {
  if (typeof window === "undefined") return "default";
  const saved = window.localStorage.getItem(STORAGE_KEY) as SiteStyle | null;
  return saved && STYLES.includes(saved) ? saved : "default";
}

const serverStyle = (): SiteStyle => "default";

export function StyleSwitcher() {
  const style = useSyncExternalStore(subscribe, readStyle, serverStyle);

  useEffect(() => {
    document.documentElement.dataset.siteStyle = style;
  }, [style]);

  const choose = (next: SiteStyle) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    listeners.forEach((listener) => listener());
  };

  return (
    <nav className="style-switcher" aria-label="Site style">
      {STYLES.map((option) => (
        <button
          key={option}
          type="button"
          data-active={style === option ? "" : undefined}
          aria-pressed={style === option}
          onClick={() => choose(option)}
        >
          {LABELS[option]}
        </button>
      ))}
    </nav>
  );
}
