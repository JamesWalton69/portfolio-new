export const GITHUB_USER = "JamesWalton69";

// One fetch cycle per deploy plus this window. Raise or lower it, not the code.
const REVALIDATE = 21600;

export type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  pushed_at: string;
  stargazers_count: number;
  fork: boolean;
  html_url: string;
};

export type Profile = {
  name: string;
  login: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  avatar_url: string;
  html_url: string;
};

async function gh<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`https://api.github.com${path}`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
      next: { revalidate: REVALIDATE, tags: ["github"] },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getGithubData() {
  const [prof, all] = await Promise.all([
    gh<Profile>(`/users/${GITHUB_USER}`),
    gh<Repo[]>(`/users/${GITHUB_USER}/repos?per_page=100&sort=pushed&direction=desc`),
  ]);

  const repos = (all ?? []).filter((r) => !r.fork);

  const counts = new Map<string, number>();
  for (const r of repos) {
    if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
  }

  return {
    repos,
    stats: {
      repoNames: repos.map((r) => r.name),
      repoCount: prof?.public_repos ?? repos.length,
      stars: repos.reduce((n, r) => n + r.stargazers_count, 0),
      languages: [...counts]
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
      latest: repos[0]?.pushed_at ?? null,
      syncedAt: new Date(),
    },
  };
}

export function repoByName(repos: Repo[], name: string) {
  return repos.find((r) => r.name.toLowerCase() === name.toLowerCase());
}

export type RepoDetail = {
  languages: { name: string; bytes: number }[];
  // Commits per week for the last 52 weeks, oldest first.
  weeks: number[];
  commits: number;
};

// Only called for the featured repos, so the request count stays small.
export async function getRepoDetail(name: string): Promise<RepoDetail | null> {
  // Proprietary projects have no public repository to read.
  if (!name) return null;

  const [langs, part] = await Promise.all([
    gh<Record<string, number>>(`/repos/${GITHUB_USER}/${name}/languages`),
    gh<{ all: number[] }>(
      `/repos/${GITHUB_USER}/${name}/stats/participation`,
    ),
  ]);

  if (!langs && !part) return null;

  // shortcut: GitHub answers 202 while it first computes stats/participation,
  // so the chart is empty for one cache cycle after a brand new repo.
  const bytes = Object.entries(langs ?? {})
    .map(([n, b]) => ({ name: n, bytes: b }))
    .sort((a, b) => b.bytes - a.bytes);

  const weeks = part?.all ?? [];

  return {
    languages: bytes,
    weeks,
    commits: weeks.reduce((n, w) => n + w, 0),
  };
}

export function formatDate(iso: string | null) {
  if (!iso) return null;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(date);
}
