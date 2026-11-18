import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { Poster } from "@/components/poster";
import { caseStudies, person, SITE_URL } from "@/lib/content";
import { formatDate, getGithubData, getRepoDetail } from "@/lib/github";

export const revalidate = 21600;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

function find(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = find(slug);
  if (!study) return {};
  return {
    title: `${study.title} · ${person.name}`,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      title: `${study.title} · ${person.name}`,
      description: study.summary,
      url: `${SITE_URL}/work/${study.slug}`,
      type: "article",
    },
  };
}

// Commit bars for the last 52 weeks. Nothing but divs, so no chart library.
function CommitChart({ weeks }: { weeks: number[] }) {
  const max = Math.max(...weeks, 1);
  return (
    <div className="flex h-24 items-end gap-[2px]" aria-hidden>
      {weeks.map((w, i) => (
        <span
          key={i}
          className="flex-1 rounded-t-sm bg-ink/80"
          style={{ height: `${Math.max(2, (w / max) * 100)}%` }}
        />
      ))}
    </div>
  );
}

export default async function CaseStudy({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = find(slug);
  if (!study) notFound();

  const [{ repos }, detail] = await Promise.all([
    getGithubData(),
    getRepoDetail(study.repo),
  ]);
  const repo = study.repo
    ? repos.find((r) => r.name.toLowerCase() === study.repo.toLowerCase())
    : undefined;

  const index = caseStudies.findIndex((c) => c.slug === study.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  const totalBytes = detail?.languages.reduce((n, l) => n + l.bytes, 0) ?? 0;

  return (
    <main id="main" className="flex-1">
      {/* Title */}
      <section className="shell pt-32 pb-10 md:pt-40 md:pb-14">
        <Link
          href="/#work"
          className="caption-3 inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-ink"
        >
          <span aria-hidden>←</span> All work
        </Link>

        <p className="caption-3 mt-8 font-mono text-ink-soft">
          {study.year} · {study.role}
        </p>
        <h1 className="display-1 mt-3 max-w-[18ch]">{study.title}</h1>
        <p className="body-2 mt-6 max-w-[52ch] text-ink-soft">{study.summary}</p>

        <ul className="mt-8 flex flex-wrap gap-2">
          {study.tags.map((t) => (
            <li
              key={t}
              className="caption-4 rounded-full border border-line px-3 py-1 font-mono text-ink-soft"
            >
              {t}
            </li>
          ))}
        </ul>

        {study.demo ? (
          <a
            href={study.demo}
            target="_blank"
            rel="noreferrer"
            className="button-md mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-cream transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-pink-deep hover:text-ink active:scale-[0.98]"
          >
            Open the live site
            <span aria-hidden>↗</span>
          </a>
        ) : null}
      </section>

      {/* Project artwork */}
      <div className={`${study.colour} project-cover relative`}>
        <Poster
          slug={study.slug}
          image={study.coverImage ?? study.image}
          sizes="100vw"
        />
        <div className="project-cover-copy">
          <p className="caption-3">A closer look</p>
          <p className="project-cover-title">{study.title}</p>
        </div>
        <span className="project-cover-tag caption-2">{study.kicker}</span>
      </div>

      {/* Live repo data */}
      <section className="border-b border-line bg-cream-dim">
        <div
          className={`shell grid gap-8 py-12 md:py-16 ${study.repo ? "md:grid-cols-3" : "md:grid-cols-2"}`}
        >
          <div>
            <p className="caption-3 text-ink-soft">Repository</p>
            {study.repo ? (
              <a
                href={repo?.html_url ?? `${person.github}/${study.repo}`}
                target="_blank"
                rel="noreferrer"
                className="title-2 mt-2 block break-all hover:text-blue"
              >
                {study.repo}
              </a>
            ) : (
              <p className="title-2 mt-2">Proprietary</p>
            )}
            <p className="caption-2 mt-2 font-mono text-ink-soft">
              {repo
                ? `pushed ${formatDate(repo.pushed_at)}`
                : study.repo
                  ? "not public yet"
                  : "closed source"}
            </p>
          </div>

          {study.repo ? (
            <>
              <div>
                <p className="caption-3 text-ink-soft">Commits in the last year</p>
                <p className="heading-2 mt-2 font-mono">{detail?.commits ?? 0}</p>
                {detail?.weeks.length ? (
                  <div className="mt-4">
                    <CommitChart weeks={detail.weeks} />
                  </div>
                ) : null}
              </div>

              <div>
                <p className="caption-3 text-ink-soft">Language bytes</p>
                {detail?.languages.length ? (
                  <ul className="mt-3 flex flex-col gap-2">
                    {detail.languages.map((l) => (
                      <li key={l.name} className="flex items-center gap-3">
                        <span className="body-6 w-24 shrink-0 font-mono">
                          {l.name}
                        </span>
                        <span className="h-1 flex-1 overflow-hidden rounded-full bg-line">
                          <span
                            className="block h-full rounded-full bg-ink"
                            style={{ width: `${(l.bytes / totalBytes) * 100}%` }}
                          />
                        </span>
                        <span className="caption-4 font-mono text-ink-soft">
                          {(l.bytes / 1000).toFixed(0)}k
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="body-6 mt-2 text-ink-soft">
                    Language breakdown is not available for this repository.
                  </p>
                )}
              </div>
            </>
          ) : (
            <div>
              <p className="caption-3 text-ink-soft">Try it</p>
              {study.demo ? (
                <a
                  href={study.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="title-2 mt-2 block break-all hover:text-blue"
                >
                  {new URL(study.demo).hostname}
                </a>
              ) : (
                <p className="title-2 mt-2">On request</p>
              )}
              <p className="caption-2 mt-2 font-mono text-ink-soft">
                no public repository to read
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Problem */}
      <section className="shell py-16 md:py-24">
        <div className="grid gap-6 md:grid-cols-[1fr_1.6fr] md:gap-12">
          <Reveal>
            <h2 className="caption-3 text-ink-soft">The problem</h2>
          </Reveal>
          <Reveal delay={60}>
            <p className="heading-3 max-w-[46ch]">{study.problem}</p>
          </Reveal>
        </div>
      </section>

      {/* Build */}
      <section className="border-t border-line">
        <div className="shell py-16 md:py-24">
          <div className="grid gap-6 md:grid-cols-[1fr_1.6fr] md:gap-12">
            <Reveal>
              <h2 className="caption-3 text-ink-soft">What I built</h2>
            </Reveal>
            <ol className="flex flex-col gap-6">
              {study.build.map((b, i) => (
                <Reveal key={i} delay={Math.min(i * 60, 240)} as="li">
                  <div className="flex gap-5 border-t border-line pt-5">
                    <span className="caption-3 shrink-0 font-mono text-ink-soft">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="body-3 max-w-[58ch]">{b}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Outcome */}
      <section className="bg-pink">
        <div className="shell py-16 md:py-24">
          <Reveal>
            <h2 className="caption-3 text-ink/60">What it changed</h2>
          </Reveal>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {study.outcome.map((o, i) => (
              <Reveal key={i} delay={i * 80} as="li">
                <p className="heading-3 border-t border-ink/20 pt-5">{o}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Next */}
      <section className="shell py-16 md:py-24">
        <Reveal>
          <Link
            href={`/work/${next.slug}`}
            className="group flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8"
          >
            <div>
              <p className="caption-3 text-ink-soft">Next project</p>
              <p className="heading-2 mt-2 transition-colors group-hover:text-blue">
                {next.title}
              </p>
            </div>
            <span
              aria-hidden
              className="heading-2 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2"
            >
              →
            </span>
          </Link>
        </Reveal>
      </section>

      <footer className="border-t border-line">
        <div className="shell flex flex-wrap items-center justify-between gap-3 py-8">
          <Link href="/" className="caption-2 text-ink-soft hover:text-ink">
            {person.name}
          </Link>
          <a
            href={`mailto:${person.email}`}
            className="caption-2 font-mono text-ink-soft hover:text-ink"
          >
            {person.email}
          </a>
        </div>
      </footer>
    </main>
  );
}
