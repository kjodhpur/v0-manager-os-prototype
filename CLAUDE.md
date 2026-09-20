# HeartMetrics — working conventions

## Git & deploy

Work directly on `main`. Commit and push there — no feature branch, no PR,
no asking first.

**Pushing to `main` is not enough to update the live site.** This Vercel
project does not auto-alias its custom domain: a push builds a new
production deployment that sits at READY while `heartmetrics.dev` keeps
serving the previously promoted build. Every change therefore needs:

1. commit → `git push origin main`
2. wait for the Vercel deployment to reach `READY`
3. **promote it**, so `heartmetrics.dev` repoints to the new build
4. verify the live URL actually serves the change

Step 3 is the one that is easy to forget and silently leaves the site
stale — a March build stayed live for months this way. Do it every time
without being asked.

Vercel identifiers:
- team `team_YsWZMUXBCP6H2VPfuQVCw4OS` (`kjodhpurs-projects`)
- project `prj_fF3Twhz4lOgHQEKvjfxcXcOnAkih` (`heartmetrics`)
- domain `heartmetrics.dev`

Rolling releases are not configured, so `request_promote` remaps the
alias immediately. The previous deployment stays a rollback candidate.

## Verifying before shipping

`pnpm build` passing is necessary but not sufficient — several defects
here (invisible text, a dead mobile menu, clipped logo) built cleanly.
Check the real rendered page: link/anchor integrity, horizontal overflow
at 320px, contrast in **both** themes, and the interactions themselves.

## Things that have bitten before

- **Fonts.** The wordmark in `public/hm-logo-horizontal.svg` is live
  `<text>`, so its width is whatever serif the viewer has — measured
  spread is ~33% between Georgia and DejaVu Serif. Never size its
  `viewBox` from a measurement taken in a headless environment; there is
  no Georgia there and it silently falls back to a narrower face.
- **Two rosters.** `lib/team-data.ts` drives the demo, `lib/data.ts`
  drives the landing preview. They overlap on the same people, so a
  score changed in one must be changed in the other or the pages
  contradict each other.
- **Risk bands.** `RISK_BANDS` in `lib/team-data.ts` is the single source
  for score colours and labels. The published table on
  `/how-we-calculate` documents the same bands and must stay in step.

## Claims

The product is pre-launch with no customers. Do not add testimonials,
customer logos, named references or product-outcome statistics — earlier
versions of this site carried fabricated ones. Statistics need a real
published source shown next to them. Keep compliance language to what is
actually true (the infrastructure is SOC 2 compliant; the product is not
certified).
