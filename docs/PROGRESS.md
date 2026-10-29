# Rebuild progress

Updated as work lands, per the prompt's process step 1, so the thread survives a
context reset. Newest first.

## Done

### Foundation
- **Toolchain.** The machine had no Node at all. Installed Node 24.22.2
  (checksum-verified against `SHASUMS256.txt`) and pnpm via corepack, plus
  Playwright + axe-core for verification. Nothing below was written blind.
- **Typography.** Replaced Georgia/system-sans with two self-hosted families via
  `next/font`: **Instrument Serif** for display, **Inter** for UI and body.
  Self-hosted means no render-blocking Google request and no layout shift.
- **Tokens.** Added a three-step elevation scale (layered contact + ambient
  shadow, tuned separately for each theme), motion tokens (one spring, three
  durations in the 150–300ms band), and a `.tabular` numeral utility. Exposed to
  Tailwind via `@theme inline`.
- **Motion vocabulary** (`lib/motion.ts`). One spring (stiffness 300 / damping
  30), one snappy variant for press feedback, 30ms list stagger with an 8px
  lift. Everything animates transform and opacity only.
- **Buttons.** `outline` was filled with `dark:bg-input/30` plus a shadow, which
  read as a smudge on near-black. Now transparent with the border doing the
  work. Heights moved onto the 8px grid; `lg` clears the 44px touch minimum.
  `transition-all` → `transition-colors`.

### Landing page
- **Hero rebuilt.** Dropped the two `blur-3xl` floating orbs (explicitly on the
  brief's avoid list). The animated heart canvas is kept but clipped inside the
  score card so it reads as texture rather than a loose graphic. Added the
  brief's hero-number moment: the team WWI **counts up while its ring draws**,
  both driven off one spring so the digits can't finish before the arc.
- **Seven Weeks** — the signature scroll-linked set piece. A 420vh track pins
  its panel; scroll position maps to one of seven weeks, scrubbing the score,
  the status, the accumulating signal and a progressively drawn trace. Falls
  back to a static seven-card grid under `prefers-reduced-motion`.
- **Page restructured** from 15 sections to 12, ordered as an argument rather
  than a feature list. `story-section` and `timeline-scrubber` were superseded
  by Seven Weeks and removed; the ECG canvas moved into the security section
  where its "signals, not surveillance" point is actually being made; the
  accolades folded into the team section.

### Bugs found by rendering, not by building
- **`overflow-x-hidden` on `<main>` silently broke `position: sticky`.** It
  establishes a scroll container, so the pinned panel anchored to a scrollport
  nobody could see and Seven Weeks rendered **completely blank**. The build
  passed. Fixed with `overflow-x-clip`, which clips without that side effect.
- The pinned panel overflowed a 360×740 phone, cutting off the chart. The
  heading moved out of the pinned area; it only needs reading once.

## Next
- Demo: shared-layout morph from at-risk card to employee detail; ScoreRing on
  the overview and employee pages.
- Remaining landing sections to the same bar.
- Full verification sweep: 320/375/768/1440/1920, light + dark, reduced motion,
  axe, link integrity, Lighthouse.
- Ship: push `main`, promote the Vercel deployment, verify live.

## Not doing
See `docs/ADAPTATION.md` for the skipped requirements and the reasoning.
