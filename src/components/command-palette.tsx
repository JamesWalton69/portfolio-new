"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

type Item = { label: string; sub: string; href: string; group: string };

export function CommandPalette({
  sections,
  projects,
}: {
  sections: { label: string; href: string }[];
  projects: { title: string; href: string; sub: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const items = useMemo<Item[]>(
    () => [
      ...sections.map((s) => ({
        label: s.label,
        sub: "Section",
        href: s.href,
        group: "Go to",
      })),
      ...projects.map((p) => ({
        label: p.title,
        sub: p.sub,
        href: p.href,
        group: "Projects",
      })),
    ],
    [sections, projects],
  );

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return items;
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(needle) ||
        i.sub.toLowerCase().includes(needle),
    );
  }, [items, q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        setQ("");
        setActive(0);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      input.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    const hashAt = href.indexOf("#");
    const path = hashAt === -1 ? href : href.slice(0, hashAt);
    const hash = hashAt === -1 ? "" : href.slice(hashAt);
    // Same-page sections scroll; everything else is a real navigation.
    if (path === "" || path === window.location.pathname) {
      if (hash) document.querySelector(hash)?.scrollIntoView();
      return;
    }
    router.push(href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % Math.max(filtered.length, 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + filtered.length) % Math.max(filtered.length, 1));
    }
    if (e.key === "Enter" && filtered[active]) {
      e.preventDefault();
      go(filtered[active].href);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="button-sm pill flex items-center gap-2 border border-line px-3 py-2 text-ink-soft transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-ink hover:text-ink md:hidden lg:flex"
        aria-label="Open command palette"
      >
        Search
        <kbd className="caption-4 rounded border border-line px-1.5 py-0.5 font-mono">
          ⌘K
        </kbd>
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[90] flex items-start justify-center bg-ink/25 px-4 pt-[12vh] backdrop-blur-sm"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setOpen(false);
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-cream shadow-2xl"
            >
              <div className="flex items-center gap-3 border-b border-line px-4 py-3">
                <span className="caption-3 shrink-0 text-ink-soft">Jump</span>
                <input
                  ref={input}
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    setActive(0);
                  }}
                  onKeyDown={onKeyDown}
                  placeholder="Sections and projects"
                  aria-label="Search sections and projects"
                  className="body-3 w-full bg-transparent outline-none placeholder:text-ink-soft/70"
                />
              </div>

              <ul className="max-h-[46vh] overflow-y-auto p-2">
                {filtered.length === 0 && (
                  <li className="body-6 px-3 py-6 text-center text-ink-soft">
                    Nothing matches that. Try a section or a project name.
                  </li>
                )}
                {filtered.map((item, i) => (
                  <li key={`${item.group}-${item.label}`}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onClick={() => go(item.href)}
                      className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left transition-colors duration-200 ${
                        i === active ? "bg-pink" : "hover:bg-pink/50"
                      }`}
                    >
                      <span className="title-3">{item.label}</span>
                      <span className="caption-2 shrink-0 text-ink-soft">
                        {item.sub}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="caption-4 flex gap-4 border-t border-line px-4 py-2 text-ink-soft">
                <span>↑↓ move</span>
                <span>↵ open</span>
                <span>esc close</span>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
