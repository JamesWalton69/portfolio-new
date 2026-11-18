# Portfolio

Personal site for Riddhiman Ghosh. Next.js 16, Tailwind 4, one page plus a case
study page per project.

The counts, language mix and push dates on the page come from the GitHub API for
`JamesWalton69`, cached with ISR and rebuilt every 6 hours. Each case study also
pulls its own language bytes and a 52 week commit series. Nothing is
hand-maintained, so new repos show up on their own.

The homepage also has a draggable 3D point-cloud globe drawn on canvas, a scroll
progress line and active-section highlighting. All three respect
`prefers-reduced-motion`, and the globe pauses when it scrolls off screen.

## Run

```bash
npm run dev
```

## The one file you edit

`src/lib/content.ts` holds every string on the page. Placeholders are written as
`{{likeThis}}`, so `grep '{{' src/lib/content.ts` lists all of them:

- `linkedinUrl`

Everything else now comes from the published portfolio or from GitHub itself:
the contact details, the timeline, the skill levels and the list of live
deployments.

`caseStudies` is the list of projects. Each `repo` must match a real GitHub
repository name: the case study page reads that repo's languages and commit
activity. `slug` becomes the URL, `colour` picks the poster block behind the
title. Leave `repo` empty for a proprietary project and add `demo` for the live
deployment.

## Deploy

Set `NEXT_PUBLIC_SITE_URL` to the real domain (used for canonical and Open Graph
tags). Optionally set `GITHUB_TOKEN` to lift the API rate limit from 60 to 5000
requests an hour. Then deploy anywhere that runs Next.js with ISR, such as
Vercel or a Node server. Static export will not work, because the page
revalidates.

To force a refresh before the 6 hour window ends, hit the deployment's
revalidation or redeploy. The window is `revalidate` in `src/app/page.tsx`.
