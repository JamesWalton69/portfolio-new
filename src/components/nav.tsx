"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#stack", label: "Stack" },
  { href: "/#experience", label: "Background" },
  { href: "/#writing", label: "Elsewhere" },
  { href: "/#faq", label: "FAQ" },
];

export function Nav({
  email,
  palette,
}: {
  email: string;
  palette: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view. Read positions on every scroll
  // rather than observing once: the page sections stream in after this layout
  // component mounts, so an observer created here would see an empty document.
  useEffect(() => {
    const ids = links.map((l) => l.href.split("#")[1]).filter(Boolean);
    let raf = 0;

    const update = () => {
      const line = window.innerHeight * 0.4;
      // Sort by actual position, not nav order: sections are not stacked in the
      // same sequence the links are listed in.
      const above = ids
        .map((id) => ({ id, top: document.getElementById(id)?.getBoundingClientRect().top ?? Infinity }))
        .filter((s) => s.top <= line)
        .sort((a, b) => a.top - b.top);
      setActive(above.at(-1)?.id ?? "");
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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
        <nav
          aria-label="Primary"
          className={`flex items-center gap-1 rounded-full border p-1 pl-4 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            scrolled
              ? "border-line bg-cream/80 backdrop-blur-md"
              : "border-transparent bg-transparent"
          }`}
        >
          <Link href="/#top" className="title-4 mr-2" aria-label="Back to top">
            RG
          </Link>

          <ul className="hidden items-center md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active === l.href.split("#")[1] ? "true" : undefined}
                  className={`title-4 block min-h-11 rounded-full px-3 py-2.5 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-ink/5 hover:text-ink ${
                    active === l.href.split("#")[1]
                      ? "bg-ink/5 text-ink"
                      : "text-ink-soft"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">{palette}</div>

          <a
            href={`mailto:${email}`}
            className="button-sm hidden rounded-full bg-ink px-4 py-2 text-cream transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-pink-deep hover:text-ink active:scale-[0.98] md:block"
          >
            Email
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative grid size-11 place-items-center rounded-full hover:bg-ink/5 md:hidden"
          >
            <span
              className="absolute h-[1.5px] w-4 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transform: open
                  ? "translateY(0) rotate(45deg)"
                  : "translateY(-3.5px)",
              }}
            />
            <span
              className="absolute h-[1.5px] w-4 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transform: open
                  ? "translateY(0) rotate(-45deg)"
                  : "translateY(3.5px)",
              }}
            />
          </button>
        </nav>
      </div>

      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-cream/95 backdrop-blur-xl transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ul className="flex h-full flex-col justify-center gap-2 px-6">
          {[...links, { href: "/#contact", label: "Contact" }].map((l, i) => (
            <li
              key={l.href}
              style={{ transitionDelay: `${Math.min(i * 60, 400)}ms` }}
              className={`transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="heading-3 block py-2"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
