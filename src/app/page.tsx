import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Tagline } from "@/components/tagline";
import { LineReveal } from "@/components/line-reveal";
import { Rail } from "@/components/rail";
import { Poster } from "@/components/poster";
import { Magnetic } from "@/components/magnetic";
import { Sculpture } from "@/components/sculpture";
import { VelocityMarquee } from "@/components/velocity-marquee";
import { Scramble } from "@/components/scramble";
import { CountUp } from "@/components/count-up";
import { DotField } from "@/components/dotfield";
import { CopyEmail } from "@/components/copy-email";
import { Clock } from "@/components/clock";
import {
  caseStudies,
  elsewhere,
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
import { formatDate, formatTime, getGithubData } from "@/lib/github";

// GitHub is the source of truth. Raise this if you push less often.
export const revalidate = 21600;

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="caption-3 flex items-center gap-2 text-ink-soft">
      <span className="size-1.5 rounded-full bg-pink-deep" aria-hidden />
      {children}
    </p>
  );
}

export default async function Home() {
  const { repos, stats } = await getGithubData();
  const totalLangs = stats.languages.reduce((n, l) => n + l.count, 0);

  const projects = caseStudies.map((c) => ({
    ...c,
    live: repos.find((r) => r.name.toLowerCase() === c.repo.toLowerCase()),
  }));

  return (
    <main id="main" className="flex-1">
      {/* Hero */}
      <section
        id="top"
        className="grain relative overflow-hidden pt-28 pb-12 md:pt-36 md:pb-16"
      >
        <div className="shell">
          <div className="hero-composition">
            <div className="hero-copy">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Label>
                  <Scramble text={hero.kit} />
                </Label>
                <p className="caption-2 font-mono text-ink-soft md:hidden">
                  {person.location}
                </p>
              </div>
              <h1 className="hero-title mt-6" aria-label={hero.headline.join(" ")}>
                <LineReveal lines={hero.headline} lineClassName="ink-fade" />
              </h1>
            </div>

            <div className="hero-intro">
              <p className="body-3 max-w-[42ch] text-ink-soft">{hero.sub}</p>
              <div className="flex shrink-0 flex-wrap gap-2">
                <a
                  href={hero.ctaHref}
                  data-magnetic
                  className="button-md rounded-full bg-ink px-6 py-3 text-cream transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-pink-deep hover:text-ink active:scale-[0.98]"
                >
                  {hero.cta}
                </a>
                <a
                  href="#work"
                  data-magnetic
                  className="button-md rounded-full border border-ink px-6 py-3 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-ink hover:text-cream active:scale-[0.98]"
                >
                  {hero.secondary}
                </a>
              </div>
            </div>

            <Link
              href="/work/hitodama"
              aria-label="View Hitodama, a desktop companion"
              className="hero-art group bg-pink"
            >
              <Poster
                slug="hitodama"
                image="/images/hitodama.png"
                sizes="(max-width: 1023px) 82vw, 28vw"
                className="hero-art-canvas"
              />
              <span className="hero-art-top caption-3">Featured project · 2026</span>
              <span className="hero-art-title" aria-hidden>
                Hito<br />dama
              </span>
              <span className="hero-art-bottom caption-2">
                A desktop companion with a soul
              </span>
              <span className="hero-art-open" aria-hidden>
                ↗
              </span>
            </Link>
          </div>

          <p className="caption-2 mt-6 hidden font-mono text-ink-soft md:block">
            {person.location}
          </p>

          <dl className="hero-stats mt-8 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-line pt-5 sm:grid-cols-4">
            {[
              { k: "Public repos", v: stats.repoCount, count: true },
              { k: "Languages", v: stats.languages.length, count: true },
              { k: "Stars", v: stats.stars, count: true },
              {
                k: "Last push",
                v: formatDate(stats.latest) ?? "—",
                count: false,
              },
            ].map((s) => (
              <div key={s.k}>
                <dt className="caption-4 text-ink-soft">{s.k}</dt>
                <dd className="heading-4 mt-1 font-mono">
                  {s.count ? <CountUp to={s.v as number} /> : s.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Ticker */}
      <div className="marquee-pause overflow-hidden border-y border-line bg-ink py-3 text-cream">
        <VelocityMarquee>
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className="flex shrink-0 items-center"
              aria-hidden={copy === 1}
            >
              {ticker.map((t) => (
                <li
                  key={`${copy}-${t}`}
                  className="caption-3 flex items-center gap-6 px-6 font-mono"
                >
                  {t}
                  <span className="text-pink" aria-hidden>
                    ✳
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </VelocityMarquee>
      </div>

      {/* Interactive statement */}
      <section className="overflow-hidden border-y border-line bg-ink text-cream">
        <div className="shell grid items-center gap-8 py-14 md:grid-cols-[1.1fr_0.9fr] md:py-20">
          <div>
            <p className="caption-3 flex items-center gap-2 text-pink">
              <span className="size-1.5 rounded-full bg-pink" aria-hidden />
              {statement.label}
            </p>
            <div className="mt-6">
              <Tagline text={statement.text} />
            </div>
          </div>
          <div className="relative aspect-square w-full max-w-md justify-self-center">
            <Sculpture />
            <p className="caption-4 pointer-events-none absolute right-0 bottom-0 font-mono text-cream/40">
              drag to turn ↗
            </p>
          </div>
        </div>
      </section>

      {/* Work rail */}
      <section id="work" className="border-t border-line">
        <div className="shell pt-16 md:pt-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="heading-1">Selected work</h2>
            <a
              href={person.github}
              target="_blank"
              rel="noreferrer"
              className="arrow-link body-5"
            >
              All {stats.repoCount} repositories
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                <path
                  d="M2 7h10M8 3l4 4-4 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-10">
          <Rail>
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className="project-item group w-[82vw] shrink-0 snap-start sm:w-[58vw] lg:w-[42vw]"
              >
                <Magnetic>
                  <article>
                    <div className={`${p.colour} project-art relative`}>
                      <Poster slug={p.slug} image={p.image} />
                      <span className="project-year caption-3 font-mono">
                        {p.year}
                      </span>
                      <span className="project-art-title" aria-hidden>
                        {p.title}
                      </span>
                      <span className="project-art-open" aria-hidden>↗</span>
                    </div>
                    <div className="project-caption mt-4 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="heading-3">{p.title}</h3>
                        <p className="body-6 mt-1 text-ink-soft">{p.kicker}</p>
                      </div>
                      <span className="caption-4 shrink-0 pt-1 font-mono text-ink-soft">
                        {p.live
                          ? `${p.live.language ?? "—"} · ${formatDate(p.live.pushed_at)}`
                          : p.repo
                            ? "private or renamed"
                            : "closed source"}
                      </span>
                    </div>
                  </article>
                </Magnetic>
              </Link>
            ))}
          </Rail>
        </div>
      </section>

      {/* Live data */}
      <section className="border-y border-line bg-cream-dim">
        <div className="shell grid gap-10 py-16 md:grid-cols-[1fr_1.4fr] md:py-24">
          <Reveal>
            <div>
              <Label>Rebuilt from GitHub</Label>
              <h2 className="heading-3 mt-4">
                The numbers on this page come from the API, not from memory.
              </h2>
              <p className="body-6 mt-3 text-ink-soft">
                Counts, languages and push dates refresh every six hours. Last
                sync{" "}
                <span className="font-mono">{formatTime(stats.syncedAt)}</span>{" "}
                UTC.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <ul className="flex flex-col gap-3">
              {stats.languages.map((l) => (
                <li key={l.name} className="flex items-center gap-3">
                  <span className="body-5 w-24 shrink-0 font-mono">
                    {l.name}
                  </span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                    <span
                      className="bar-fill block h-full rounded-full bg-ink"
                      style={{ width: `${(l.count / totalLangs) * 100}%` }}
                    />
                  </span>
                  <span className="caption-4 w-6 text-right font-mono text-ink-soft">
                    {l.count}
                  </span>
                </li>
              ))}
            </ul>
            <p className="caption-4 mt-6 font-mono text-ink-soft">
              {stats.stars} stars across {stats.repoCount} public repositories
            </p>
          </Reveal>
        </div>
      </section>

      {/* About + principles */}
      <section id="about" className="shell py-16 md:py-28">
        <div className="grid gap-10 md:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <div>
              <Label>About</Label>
              <h2 className="heading-2 mt-4 max-w-[14ch]">
                I learn by shipping things.
              </h2>
            </div>
          </Reveal>

          <div>
            <Reveal delay={60}>
              <p className="body-2 max-w-[60ch]">
                I am {person.short}, a developer in Kolkata. Most of what I know
                I learned by building something that needed it, and publishing
                it so other people could use it or tell me it was wrong.
              </p>
              <p className="body-3 mt-4 max-w-[60ch] text-ink-soft">
                The work spans web apps in TypeScript and React, Python tools
                with Flask, and computer vision in the browser. Some of it runs
                on a server you control, some of it runs entirely on your own
                machine.
              </p>
            </Reveal>

            <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {principles.map((p, i) => (
                <Reveal key={p.n} delay={i * 60} as="li">
                  <div className="border-t border-line pt-4">
                    <span className="caption-3 font-mono text-ink-soft">
                      {p.n}
                    </span>
                    <h3 className="title-2 mt-2">{p.title}</h3>
                    <p className="body-6 mt-2 text-ink-soft">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Steps - pink block */}
      <section className="bg-pink">
        <div className="shell py-16 md:py-24">
          <Reveal>
            <Label>How I work</Label>
            <h2 className="heading-2 mt-4">Explore, build, share.</h2>
          </Reveal>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 80} as="li">
                <div className="flex h-full flex-col rounded-3xl border border-ink/15 bg-cream/70 p-6">
                  <span className="heading-2 font-mono text-ink/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="title-1 mt-4">{s.title}</h3>
                  <p className="body-6 mt-2 text-ink/70">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Background */}
      <section id="experience" className="shell py-16 md:py-28">
        <Reveal>
          <Label>Background</Label>
        </Reveal>
        <ol className="mt-8 border-t border-line">
          <Reveal as="li">
            <div className="grid gap-2 border-b border-line py-8 md:grid-cols-[1fr_1.6fr]">
              <div>
                <p className="title-1">{experienceNow.role}</p>
                <p className="caption-2 mt-1 font-mono text-ink-soft">
                  {experienceNow.org} · {experienceNow.dates}
                </p>
              </div>
              <div>
                <p className="body-6 text-ink-soft">
                  {stats.repoCount} public repositories across{" "}
                  {stats.languages.length} languages, all built and documented
                  without a team.
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {stats.languages.map((l) => (
                    <li
                      key={l.name}
                      className="caption-4 rounded-full bg-ink px-3 py-1 font-mono text-cream"
                    >
                      {l.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {experience.map((e, i) => (
            <Reveal key={i} delay={i * 60} as="li">
              <div className="grid gap-2 border-b border-line py-8 md:grid-cols-[1fr_1.6fr]">
                <div>
                  <p className="title-1">{e.role}</p>
                  <p className="caption-2 mt-1 font-mono text-ink-soft">
                    {e.dates}
                  </p>
                </div>
                <div>
                  <p className="title-3">{e.org}</p>
                  <p className="body-6 mt-2 text-ink-soft">{e.outcome}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Stack */}
      <section id="stack" className="shell pb-16 md:pb-28">
        <Reveal>
          <Label>Stack</Label>
          <h2 className="heading-2 mt-4 max-w-[18ch]">
            What I reach for, and how well.
          </h2>
        </Reveal>
        <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {skills.map((s, i) => (
            <Reveal key={s.name} delay={i * 60} as="li">
              <div className="border-t border-line pt-4">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="title-2">{s.name}</span>
                  <span className="caption-3 font-mono text-ink-soft">
                    {s.level}%
                  </span>
                </div>
                <span className="mt-3 block h-1.5 overflow-hidden rounded-full bg-line">
                  <span
                    className="block h-full rounded-full bg-ink"
                    style={{ width: `${s.level}%` }}
                  />
                </span>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Elsewhere */}
      <section id="writing" className="shell pb-16 md:pb-28">
        <Reveal>
          <Label>Elsewhere</Label>
          <h2 className="heading-2 mt-4 max-w-[20ch]">
            Things that are online right now.
          </h2>
        </Reveal>
        <ul className="mt-8 border-t border-line">
          {elsewhere.map((w, i) => (
            <Reveal key={w.href} delay={i * 60} as="li">
              <a
                href={w.href}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-wrap items-baseline justify-between gap-2 border-b border-line py-6 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-blue"
              >
                <span>
                  <span className="heading-3 block">{w.title}</span>
                  <span className="body-6 mt-1 block text-ink-soft">
                    {w.note}
                  </span>
                </span>
                <span className="caption-2 font-mono text-ink-soft">
                  {new URL(w.href).hostname.replace(/^www\./, "")} ↗
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section id="faq" className="shell pb-16 md:pb-28">
        <Reveal>
          <Label>Questions</Label>
        </Reveal>
        <div className="mt-6 border-t border-line">
          {faq.map((f) => (
            <details key={f.q} className="group border-b border-line py-5">
              <summary className="title-1 flex cursor-pointer list-none items-start justify-between gap-6">
                {f.q}
                <span
                  aria-hidden
                  className="mt-1 shrink-0 font-mono text-ink-soft transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="body-6 mt-3 max-w-[60ch] text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="shell pb-16 md:pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-14 text-cream md:px-14 md:py-20">
            <DotField />
            <div
              className="absolute top-8 right-8 hidden size-28 md:block"
              aria-hidden
            >
              <svg viewBox="0 0 100 100" className="spin-slow size-full">
                <defs>
                  <path
                    id="badge-circle"
                    d="M50 50 m -40 0 a 40 40 0 1 1 80 0 a 40 40 0 1 1 -80 0"
                    fill="none"
                  />
                </defs>
                <text
                  className="fill-cream/60"
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "8px",
                    letterSpacing: "2.8px",
                  }}
                >
                  <textPath href="#badge-circle">
                    OPEN TO WORK · KOLKATA · REMOTE ·
                  </textPath>
                </text>
              </svg>
              <span className="absolute inset-0 grid place-items-center text-2xl text-pink">
                ✳
              </span>
            </div>
            <div className="relative">
            <p className="caption-3 flex items-center gap-2 text-pink">
              <span className="relative flex size-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-pink" />
              </span>
              Open to work
            </p>
            <h2 className="display-1 mt-4 max-w-[16ch] text-cream">
              Send the role or the brief.
            </h2>
            <p className="body-3 mt-6 max-w-[50ch] text-cream/70">
              I am looking for junior web development roles, internships, or
              open-source collaboration, in Kolkata or remote. One paragraph is
              enough, and I reply within a day.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={`mailto:${person.email}`}
                className="button-md rounded-full bg-pink px-6 py-3 text-ink transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-pink-deep active:scale-[0.98]"
              >
                {person.email}
              </a>
              <CopyEmail email={person.email} />
              <a
                href={person.github}
                target="_blank"
                rel="noreferrer"
                className="button-md rounded-full border border-cream/30 px-6 py-3 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-cream hover:bg-cream/10"
              >
                GitHub
              </a>
              <a
                href={person.resume}
                target="_blank"
                rel="noreferrer"
                className="button-md rounded-full border border-cream/30 px-6 py-3 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-cream hover:bg-cream/10"
              >
                Interactive CV
              </a>
              {person.linkedin.startsWith("{{") ? null : (
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="button-md rounded-full border border-cream/30 px-6 py-3 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-cream hover:bg-cream/10"
                >
                  LinkedIn
                </a>
              )}
            </div>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-line">
        <div className="shell flex flex-wrap items-center justify-between gap-3 py-8">
          <p className="caption-2 flex items-center gap-2 text-ink-soft">
            {person.name} · {person.location} · <Clock /> IST
          </p>
          <a
            href="#top"
            className="caption-2 text-ink-soft transition-colors duration-300 hover:text-ink"
          >
            Back to top ↑
          </a>
          <p className="caption-2 font-mono text-ink-soft">
            synced {formatTime(stats.syncedAt)} UTC
          </p>
        </div>
      </footer>
    </main>
  );
}
