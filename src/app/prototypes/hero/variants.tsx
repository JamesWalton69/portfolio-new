"use client";

import Image from "next/image";
import Link from "next/link";
import type { PointerEvent as ReactPointerEvent } from "react";
import { hero, person } from "@/lib/content";
import { Sculpture } from "@/components/sculpture";

function Actions({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <div className={`pv-actions pv-actions-${tone}`}>
      <a href={hero.ctaHref} className="pv-btn pv-btn-solid">
        {hero.cta} <span aria-hidden>↗</span>
      </a>
      <Link href="/#work" className="pv-btn pv-btn-ghost">
        {hero.secondary} <span aria-hidden>→</span>
      </Link>
    </div>
  );
}

// Axis: layout. A modular editorial grid with a metadata rail and hairlines.
export function Grid() {
  return (
    <section className="pv pv-grid">
      <div className="pv-grid-inner">
        <aside className="pv-grid-rail">
          <span className="pv-rise" style={{ animationDelay: "0ms" }}>Portfolio / 2026</span>
          <span className="pv-rise" style={{ animationDelay: "60ms" }}>{person.location}</span>
          <span className="pv-rise" style={{ animationDelay: "120ms" }}>{hero.kit}</span>
        </aside>

        <div className="pv-grid-copy">
          <h1 className="pv-grid-title">
            {hero.headline.map((line, i) => (
              <span key={line} className="pv-line">
                <span className="pv-rise" style={{ animationDelay: `${i * 80}ms` }}>{line}</span>
              </span>
            ))}
          </h1>
        </div>

        <div className="pv-grid-side pv-rise" style={{ animationDelay: "220ms" }}>
          <p>{hero.sub}</p>
          <Actions />
        </div>
      </div>

      <Link href="/work/hitodama" className="pv-grid-art pv-rise" style={{ animationDelay: "280ms" }}>
        <Image
          src="/images/hitodama.png"
          alt="Hitodama, a desktop companion"
          fill
          sizes="(max-width: 64rem) 92vw, 76vw"
          className="pv-grid-art-img"
        />
        <span className="pv-grid-art-caption">Featured project — Hitodama, 2026 <span aria-hidden>↗</span></span>
      </Link>
    </section>
  );
}

// Axis: personality. A developer console: monospaced, dark, command-shaped.
export function Console() {
  return (
    <section className="pv pv-console">
      <div className="pv-window">
        <div className="pv-window-bar">
          <span className="pv-dots" aria-hidden><i /><i /><i /></span>
          <span>riddhiman@portfolio — ~/portfolio</span>
          <span className="pv-window-status">● live</span>
        </div>
        <div className="pv-window-body">
          <div className="pv-console-main">
            <p className="pv-console-meta pv-rise">$ whoami</p>
            <h1 className="pv-console-title">
              {hero.headline.map((line, i) => (
                <span key={line} className="pv-console-line pv-rise" style={{ animationDelay: `${i * 70}ms` }}>
                  <span aria-hidden>&gt;</span> {line}
                </span>
              ))}
            </h1>
            <p className="pv-console-comment pv-rise" style={{ animationDelay: "220ms" }}>{"// "}{hero.sub}</p>
            <div className="pv-rise" style={{ animationDelay: "280ms" }}><Actions tone="dark" /></div>
          </div>
          <Link href="/work/hitodama" className="pv-console-art pv-rise" style={{ animationDelay: "160ms" }}>
            <Image
              src="/images/hitodama.png"
              alt="Hitodama, a desktop companion"
              fill
              priority
              sizes="(max-width: 64rem) 80vw, 24vw"
            />
            <span className="pv-console-art-label">open ./work/hitodama ↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Axis: composition. One full-bleed image carries the whole first screen.
export function Canvas() {
  return (
    <section className="pv pv-canvas">
      <div className="pv-canvas-media">
        <Image
          src="/images/hitodama.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="pv-canvas-img"
        />
      </div>
      <div className="pv-canvas-scrim" aria-hidden />
      <div className="pv-canvas-content">
        <p className="pv-chip pv-rise">Featured project · Hitodama · 2026</p>
        <h1 className="pv-canvas-title">
          {hero.headline.map((line, i) => (
            <span key={line} className="pv-line">
              <span className="pv-rise" style={{ animationDelay: `${i * 70}ms` }}>{line}</span>
            </span>
          ))}
        </h1>
        <p className="pv-canvas-sub pv-rise" style={{ animationDelay: "210ms" }}>{hero.sub}</p>
        <div className="pv-rise" style={{ animationDelay: "270ms" }}><Actions /></div>
      </div>
      <Link href="/work/hitodama" className="pv-canvas-open" aria-label="View Hitodama, a desktop companion" />
    </section>
  );
}

// Axis: interaction. A CSS-3D card stack that tilts with the pointer; the top
// card is the real project link. No libraries, no 3D engine.
export function Orbit() {
  const tilt = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty("--ry", `${(x * 16).toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--rx", `${(-y * 12).toFixed(2)}deg`);
  };

  const reset = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--ry", "0deg");
    event.currentTarget.style.setProperty("--rx", "0deg");
  };

  return (
    <section className="pv pv-orbit">
      <div className="pv-orbit-inner">
        <div className="pv-orbit-copy">
          <p className="pv-orbit-kicker pv-rise">{hero.kit}</p>
          <h1 className="pv-orbit-title">
            {hero.headline.map((line, i) => (
              <span key={line} className="pv-line">
                <span className="pv-rise" style={{ animationDelay: `${i * 80}ms` }}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="pv-orbit-sub pv-rise" style={{ animationDelay: "230ms" }}>{hero.sub}</p>
          <div className="pv-rise" style={{ animationDelay: "290ms" }}><Actions /></div>
          <p className="pv-orbit-hint pv-rise" style={{ animationDelay: "340ms" }}>Move over the cards · click the front one ↗</p>
        </div>

        <div
          className="pv-orbit-scene pv-rise"
          style={{ animationDelay: "140ms" }}
          onPointerMove={tilt}
          onPointerLeave={reset}
        >
          <div className="pv-orbit-stack">
            <div className="pv-orbit-card pv-orbit-card-back" aria-hidden>
              <Image src="/images/glob-editor.jpg" alt="" fill priority sizes="30vw" />
            </div>
            <div className="pv-orbit-card pv-orbit-card-mid" aria-hidden>
              <Image src="/images/selflens.jpg" alt="" fill priority sizes="30vw" />
            </div>
            <Link href="/work/hitodama" className="pv-orbit-card pv-orbit-card-front">
              <Image src="/images/hitodama.png" alt="Hitodama, a desktop companion" fill priority sizes="30vw" />
              <span className="pv-orbit-card-label">Hitodama <span aria-hidden>↗</span></span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Axis: 3D object. Reuses the site's drag-able point-cloud globe, untouched.
export function Globe() {
  return (
    <section className="pv pv-globe">
      <div className="pv-globe-inner">
        <div className="pv-globe-copy">
          <p className="pv-globe-kicker pv-rise">Drag the globe · built from commits</p>
          <h1 className="pv-globe-title">
            {hero.headline.map((line, i) => (
              <span key={line} className="pv-line">
                <span className="pv-rise" style={{ animationDelay: `${i * 80}ms` }}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="pv-globe-sub pv-rise" style={{ animationDelay: "230ms" }}>{hero.sub}</p>
          <div className="pv-rise" style={{ animationDelay: "290ms" }}><Actions tone="dark" /></div>
          <Link href="/work/hitodama" className="pv-globe-featured pv-rise" style={{ animationDelay: "340ms" }}>
            Featured project: Hitodama <span aria-hidden>↗</span>
          </Link>
        </div>
        <div className="pv-globe-object pv-rise" style={{ animationDelay: "140ms" }}>
          <Sculpture />
        </div>
      </div>
    </section>
  );
}
