"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  caseStudies,
  experience,
  experienceNow,
  faq,
  hero,
  person,
  principles,
  skills,
  statement,
  steps,
  ticker,
} from "@/lib/content";
import { PrismCards, WireSphere, type PrismItem } from "./three-d";

const works = caseStudies.slice(0, 6);
const pct = (level: number) => Math.min(100, Math.max(0, level));

function Empty({ children }: { children: ReactNode }) {
  return <p className="fs-empty">{children}</p>;
}

function Cover({ src, alt = "", className = "" }: { src: string; alt?: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className={`fs-cover ${className}`}>
      <Image
        src={failed ? "/images/hitodama.png" : src}
        alt={alt}
        fill
        sizes="(max-width: 64rem) 90vw, 30vw"
        onError={() => setFailed(true)}
      />
    </span>
  );
}

function Actions({ className = "" }: { className?: string }) {
  return (
    <div className={`fs-actions ${className}`}>
      <a href={hero.ctaHref} className="fs-btn fs-btn-solid">{hero.cta} <span aria-hidden>↗</span></a>
      <Link href="/#work" className="fs-btn fs-btn-ghost">{hero.secondary} <span aria-hidden>→</span></Link>
    </div>
  );
}

function ContactLinks() {
  return (
    <div className="fs-contact-links">
      <a href={`mailto:${person.email}`}>{person.email}</a>
      <a href={person.github}>GitHub ↗</a>
      <a href={person.resume}>Résumé ↗</a>
    </div>
  );
}

function FaqList({ className = "" }: { className?: string }) {
  if (faq.length === 0) return <div className={className}><Empty>No questions yet.</Empty></div>;
  return (
    <div className={className}>
      {faq.map((item) => (
        <details key={item.q}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}

function Timeline({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="fs-timeline-row">
        <strong>{experienceNow.role}</strong>
        <span>{experienceNow.org}</span>
        <time>{experienceNow.dates}</time>
      </div>
      {experience.map((item) => (
        <div className="fs-timeline-row" key={item.role}>
          <strong>{item.role}</strong>
          <span>{item.org}</span>
          <time>{item.dates}</time>
          <p>{item.outcome}</p>
        </div>
      ))}
    </div>
  );
}

// ---- Style 1: editorial magazine. Layout axis: rules, columns, big type. ----
export function Magazine() {
  return (
    <article className="fs mag">
      <header className="mag-hero">
        <p className="mag-kicker">{hero.kit} <span>·</span> {person.location}</p>
        <h1>{hero.headline.map((line) => <span key={line}>{line}</span>)}</h1>
        <div className="mag-intro">
          <p>{hero.sub}</p>
          <Actions />
        </div>
        <Cover src="/images/hitodama.png" alt="Hitodama, a desktop companion" className="mag-hero-cover" />
        <p className="mag-hero-caption">Featured project · Hitodama · 2026</p>
      </header>

      <section id="work" className="mag-section">
        <div className="fs-heading"><span>01 / Work</span><h2>Selected work</h2></div>
        <div className="mag-work">
          {works.length === 0 ? <Empty>No projects to show.</Empty> : works.map((study, i) => (
            <Link href={`/work/${study.slug}`} className="mag-work-item" key={study.slug}>
              <Cover src={study.image ?? "/images/hitodama.png"} alt={study.title} />
              <span className="mag-work-meta">
                <small>{String(i + 1).padStart(2, "0")} · {study.year}</small>
                <strong>{study.title}</strong>
                <span>{study.kicker}</span>
                <span className="mag-tags">{study.tags.slice(0, 3).join(" / ")}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section id="about" className="mag-section mag-about">
        <div className="fs-heading"><span>02 / About</span><h2>{statement.label}</h2></div>
        <p className="mag-statement">{statement.text}</p>
        <div className="mag-principles">
          {principles.length === 0 ? <Empty>No principles listed.</Empty> : principles.map((p) => (
            <div key={p.n}><small>{p.n}</small><strong>{p.title}</strong><p>{p.body}</p></div>
          ))}
        </div>
        <div className="mag-steps">
          {steps.length === 0 ? <Empty>No process steps listed.</Empty> : steps.map((s, i) => <div key={s.title}><small>Step {i + 1}</small><strong>{s.title}</strong><p>{s.body}</p></div>)}
        </div>
      </section>

      <section id="stack" className="mag-section">
        <div className="fs-heading"><span>03 / Stack</span><h2>Tools I reach for</h2></div>
        <div className="mag-skills">
          {skills.length === 0 ? <Empty>No skills listed.</Empty> : skills.map((s) => (
            <div key={s.name}><span>{s.name}</span><span className="mag-skill-bar"><i style={{ width: `${pct(s.level)}%` }} /></span><small>{pct(s.level)}</small></div>
          ))}
        </div>
        {ticker.length > 0 && <p className="mag-ticker">{ticker.join(" · ")}</p>}
      </section>

      <section id="experience" className="mag-section">
        <div className="fs-heading"><span>04 / Background</span><h2>Where I am now</h2></div>
        <Timeline className="mag-timeline" />
      </section>

      <section id="faq" className="mag-section">
        <div className="fs-heading"><span>05 / FAQ</span><h2>Good questions</h2></div>
        <FaqList className="mag-faq" />
      </section>

      <section id="contact" className="mag-section mag-contact">
        <p className="mag-kicker">06 / Contact</p>
        <h2>Let’s make something useful.</h2>
        <ContactLinks />
      </section>
    </article>
  );
}

// ---- Style 2: developer terminal. Personality axis: commands and mono. ----
export function Terminal() {
  return (
    <article className="fs term">
      <header className="term-hero">
        <div className="term-bar"><span className="term-dots"><i /><i /><i /></span><span>riddhiman@portfolio — ~/portfolio</span><span>● live</span></div>
        <div className="term-body">
          <p className="term-cmd">$ whoami</p>
          <p className="term-out">{person.name} · {person.role} · {person.location}</p>
          <h1>{hero.headline.map((line) => <span key={line}><b>&gt;</b> {line}</span>)}</h1>
          <p className="term-comment">{"// "}{hero.sub}</p>
          <Actions className="term-actions" />
        </div>
      </header>

      <section id="work" className="term-section">
        <p className="term-cmd">$ ls -la ./work</p>
        <div className="term-table">
          {works.length === 0 ? <Empty>no projects found</Empty> : works.map((study) => (
            <Link href={`/work/${study.slug}`} className="term-row" key={study.slug}>
              <span className="term-row-idx">{study.year}</span>
              <strong>{study.title}</strong>
              <span>{study.kicker}</span>
              <span className="term-row-tags">{study.tags.join(", ")}</span>
              <span aria-hidden>↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section id="about" className="term-section">
        <p className="term-cmd">$ cat about.md</p>
        <p className="term-comment">{"// "}{statement.label}</p>
        <p className="term-statement">{statement.text}</p>
        <div className="term-principles">
          {principles.length === 0 ? <Empty>no principles found</Empty> : principles.map((p) => <p key={p.n}><span>[{p.n}]</span> <strong>{p.title}</strong> — {p.body}</p>)}
        </div>
      </section>

      <section id="stack" className="term-section">
        <p className="term-cmd">$ cat stack.json</p>
        <div className="term-skills">
          {skills.length === 0 ? <Empty>no skills found</Empty> : skills.map((s) => (
            <div key={s.name}>
              <span>{s.name}</span>
              <span className="term-track"><i style={{ width: `${pct(s.level)}%` }} /></span>
              <span>{pct(s.level)}%</span>
            </div>
          ))}
        </div>
        {ticker.length > 0 && <p className="term-comment">{ticker.join("  ")}</p>}
      </section>

      <section id="experience" className="term-section">
        <p className="term-cmd">$ cat timeline.log</p>
        <Timeline className="term-timeline" />
      </section>

      <section id="faq" className="term-section">
        <p className="term-cmd">$ man faq</p>
        <FaqList className="term-faq" />
      </section>

      <section id="contact" className="term-section term-contact">
        <p className="term-cmd">{"$ echo \"let's work together\" > hello"}</p>
        <ContactLinks />
      </section>
    </article>
  );
}

// ---- Style 3: 3D prism. Interaction axis: canvas globe + cylinder carousel. ----
export function Prism() {
  const prismItems: PrismItem[] = works.map((study) => ({
    href: `/work/${study.slug}`,
    title: study.title,
    kicker: study.kicker,
    image: study.image ?? "/images/hitodama.png",
  }));
  return (
    <article className="fs prism">
      <header className="prism-hero">
        <div className="prism-copy">
          <p className="prism-kicker">{hero.kit} · {person.location}</p>
          <h1>{hero.headline.map((line) => <span key={line}>{line}</span>)}</h1>
          <p className="prism-sub">{hero.sub}</p>
          <Actions className="prism-actions" />
          <p className="prism-hint">Drag the globe · use the arrows to spin the work</p>
        </div>
        <div className="prism-sphere">
          <WireSphere className="size-full touch-none select-none" />
        </div>
      </header>

      <section id="work" className="prism-section prism-work">
        <div className="fs-heading"><span>01 / Work</span><h2>Selected work</h2></div>
        <PrismCards items={prismItems} />
        <div className="prism-work-list">
          {works.length === 0 ? <Empty>No projects to show.</Empty> : works.map((study) => (
            <Link href={`/work/${study.slug}`} key={study.slug}>
              <span>{study.title}</span><span>{study.year}</span><span aria-hidden>↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section id="about" className="prism-section">
        <div className="fs-heading"><span>02 / About</span><h2>{statement.label}</h2></div>
        <div className="prism-panels">
          <div className="prism-panel prism-panel-lead"><p>{statement.text}</p></div>
          {principles.length === 0 ? <Empty>No principles listed.</Empty> : principles.map((p) => (
            <div className="prism-panel" key={p.n}><small>{p.n}</small><strong>{p.title}</strong><p>{p.body}</p></div>
          ))}
        </div>
        <div className="prism-steps">
          {steps.length === 0 ? <Empty>No process steps listed.</Empty> : steps.map((s, i) => <div key={s.title}><small>0{i + 1}</small><strong>{s.title}</strong><p>{s.body}</p></div>)}
        </div>
      </section>

      <section id="stack" className="prism-section">
        <div className="fs-heading"><span>03 / Stack</span><h2>Tools I reach for</h2></div>
        <div className="prism-chips">
          {skills.length === 0 ? <Empty>No skills listed.</Empty> : skills.map((s) => <span key={s.name}><i style={{ width: `${pct(s.level)}%` }} />{s.name}</span>)}
          {ticker.slice(0, 8).map((t) => <span key={t}>{t}</span>)}
        </div>
      </section>

      <section id="experience" className="prism-section">
        <div className="fs-heading"><span>04 / Background</span><h2>Where I am now</h2></div>
        <Timeline className="prism-timeline" />
      </section>

      <section id="faq" className="prism-section">
        <div className="fs-heading"><span>05 / FAQ</span><h2>Good questions</h2></div>
        <FaqList className="prism-faq" />
      </section>

      <section id="contact" className="prism-section prism-contact">
        <p className="prism-kicker">06 / Contact</p>
        <h2>Let’s make something useful.</h2>
        <ContactLinks />
      </section>
    </article>
  );
}
