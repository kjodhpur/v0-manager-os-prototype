# HeartMetrics

Workplace wellbeing analytics for managers. It reads signals the team's existing
tools already produce — task load, meeting density, recognition, who gets the
stretch work — and turns them into a 0–100 **Work Wellbeing Index** you can take
apart line by line.

It does not read private messages, and it does not log keystrokes.

**Live** · [heartmetrics.dev](https://heartmetrics.dev)
**Status** · Pre-launch prototype. No customers, no production tenant data.
**Repo name** · Still `v0-manager-os-prototype` from its v0 origin; the product is HeartMetrics.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4, shadcn/ui, CSS custom properties for theming |
| Type | Instrument Serif (display) + Inter (UI), self-hosted via `next/font` |
| Motion | Framer Motion, with one shared vocabulary in `lib/motion.ts` |
| Charts | Recharts, plus hand-built SVG for the pentagon and the scroll trace |
| Auth | Supabase (Google OAuth only) |
| AI Coach | Google Gemini via `app/api/ai/chat` |
| Hosting | Vercel |

Note: `@ai-sdk/anthropic` is still in `package.json` and `components/ai/*` is
written against it, but nothing in the shipping app imports those — the live
coach route calls Gemini directly.

## Running it

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # production build
pnpm start        # serve the production build
```

Needs Node 20+ (CI and Vercel are on 24).

### Environment

| Variable | Needed for | Notes |
|---|---|---|
| `GEMINI_API_KEY` | AI Coach | Server-side. Without it every message returns the error state. |
| `NEXT_PUBLIC_SUPABASE_URL` | Sign-in | Falls back to a hardcoded project URL. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Sign-in | Publishable key; safe client-side. |

## Layout

```
app/                 routes; marketing pages + /demo
components/
  landing/           homepage sections
  site/              SiteHeader / SiteFooter (one pair, used everywhere)
  demo/              the dashboard
  motion/            ScoreRing, CountUp, Reveal primitives
  ui/                shadcn primitives
lib/
  site-config.ts     routes, nav, CTA copy — single source for links
  team-data.ts       demo roster + RISK_BANDS (drives every score colour)
  motion.ts          springs, stagger, viewport config
docs/                the brief, the adaptation, progress, launch checklist
```

## Before you change anything

`CLAUDE.md` is short and worth reading. The parts that bite:

- **Pushing to `main` does not update the live site.** The custom domain needs an
  explicit promote after each build. A stale build once stayed live for months.
- `lib/team-data.ts` and `lib/data.ts` describe overlapping people. Change a
  score in one and you have to change it in the other.
- `RISK_BANDS` drives score colours *and* the published threshold table on
  `/how-we-calculate`. They must stay in step.
- The logo wordmark is live SVG `<text>`, so its width is whatever serif the
  viewer has. Never size its `viewBox` from a headless measurement.

## Verifying

A passing `pnpm build` is necessary but not sufficient — a dead mobile menu,
invisible text, a clipped logo and a blank scroll section all built cleanly here.
Check the rendered page: link integrity, horizontal overflow at 320px, contrast
in both themes, and the interactions themselves.

## Claims

The product is pre-launch. No testimonials, customer logos or product-outcome
statistics — earlier versions of this site carried fabricated ones. Statistics
need a real published source shown next to them.
