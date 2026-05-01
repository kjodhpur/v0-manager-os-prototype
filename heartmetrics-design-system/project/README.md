# HeartMetrics Design System

A design system for **HeartMetrics** — an AI copilot for managers that makes work distribution, contribution, and growth visible without surveillance. This system covers their marketing site and the in-product "ManagerOS" dashboard.

> *"Make work more human with ethical AI."*

---

## Sources

- **Codebase (v0 prototype):** `kjodhpur/v0-manager-os-prototype` (GitHub, `main`)
  - Token file: [`app/globals.css`](https://github.com/kjodhpur/v0-manager-os-prototype/blob/main/app/globals.css)
  - Marketing: `components/marketing/landing-page.tsx`, `components/landing/*`
  - Product: `app/app/page.tsx`, `components/dashboard-layout.tsx`, `components/overview-page.tsx`, `components/ui/*`
  - Brand assets: `public/hm-logo-*.svg`
- **No Figma provided.** All visual facts in this system were lifted from code.

## Products represented

1. **Marketing site** — `heartmetrics.com`-style: hero with animated heart, navigation, pricing, FAQ, trust/security, ECG canvas, testimonials.
2. **ManagerOS dashboard** — authenticated product: Overview, AI Coach, Team Health, Burnout Risk, Work Distribution, Pulse Surveys, Goals & OKRs, Recognition, Timeline, Benchmarking, Reports, Actions, Integrations, Settings.

Both surfaces share one token palette and the same teal/amber accent system; product skews darker by default, marketing skews gradient-forward and editorial.

---

## Index — what's in this system

- [`colors_and_type.css`](./colors_and_type.css) — CSS custom properties for colors, type, radii, spacing, shadow/glow, motion. Import this in any preview.
- [`assets/`](./assets) — brand logos (horizontal wordmark, icon mark, dark wordmark, app favicon).
- [`preview/`](./preview) — design-system cards (colors, type, components, brand).
- [`ui_kits/product/`](./ui_kits/product) — high-fidelity recreation of the ManagerOS dashboard (Overview, sidebar, KPI cards, attention table).
- [`ui_kits/marketing/`](./ui_kits/marketing) — marketing site recreation (nav, hero, dashboard preview embed, CTA).
- [`SKILL.md`](./SKILL.md) — agent-skill entry point.

---

## Content fundamentals

**Voice.** Plainspoken and empathetic. Short declarative sentences. Occasional emotional appeals ("Make work more human," "before it's too late") without being maudlin. Technical claims stay concrete and are always paired with a privacy boundary.

**Pronouns.** "You" (the manager) is the primary addressee. "Your team," "your tools." "We" appears sparingly in trust/security copy only.

**Tone blend.** 60% analytical, 30% caring, 10% editorial. Example pattern from the landing page: a stat/claim → why it matters → the boundary.

**Casing.** Sentence case almost everywhere — headings, buttons, badges, nav items. Product name is always **HeartMetrics** (title-case concatenation). The wordmark itself is lowercase `heartmetrics` — that's a logo-only treatment, not body copy.

**Punctuation quirks.**
- Em-dashes used, with hair-thin spacing ("signals—workload spikes, recognition gaps").
- "1:1" (not "1-on-1") for one-on-one meetings.
- Numerals for metrics ("WHI 62," "8 team members"), not spelled out.
- Colons in product nouns: "Team Health," "Work Distribution," "Goals & OKRs."

**Vocabulary.** Signature nouns: *Work Happiness Index (WHI)*, *Manager Fairness Score (MFS)*, *burnout risk*, *invisible work*, *stretch opportunities*, *recognition gap*, *firefighting*, *nudge*, *pulse*. Signature verbs: *surface*, *rotate*, *unblock*, *recognize*, *intervene*, *distribute*.

**Emoji.** None. Not part of the brand voice.

**Sample lines (from product):**
- Hero: *"See your team's real story — before they leave."*
- Sub: *"By the time someone resigns, the signals were there for weeks."*
- Trust microcopy (literally pinned to every dashboard page): *"This product uses work-system signals (tasks, meetings, assignments). It does not read private messages by default."*
- Badge: *"Privacy-First Workplace Analytics"*
- CTA: *"Try Demo Mode"* / *"Try Live Demo"*
- Action title: *"Unblock Riya's blocked tasks"*
- Insight: *"Your team's overall wellbeing is trending upward this week. Riya and Sam need immediate attention due to workload imbalance."*

---

## Visual foundations

### Color
- **Dark-first.** Product default is pure-black (`#000000`) background with near-white foreground (`#F8FAFC`). Light mode is warm off-white (`#FAF8F5`) with parchment cards (`#F5EFE7`) — intentionally **not** pure white.
- **Brand palette is narrow and saturated.** Teal primary `#00B8A0`, amber accent `#FFB347`. Semantic greens/yellows/reds all pulled from the same warm family (no cold ultra-red).
- **Muted analytical palette** for work-distribution bars: navy `#0C2C55` → teal-gray `#296374` → sage `#629FAD` → cream `#EDEDCE`. This is the "serious charts" palette — never mix with the brand colors.
- **7-step WHI degradation ramp** (green → teal → yellow → amber → orange → red). Used in the timeline scrubber.

### Type
- **Sans-serif UI stack.** System-first: `-apple-system, BlinkMacSystemFont, 'Segoe UI'…`. Feels native, fast, neutral.
- **Source Serif 4** for brand/editorial display (the wordmark, hero headlines via `.font-display`). Weight 700, tight tracking (`-0.02em`).
- **Mono** for eyebrows and code-ish labels ("Privacy-First Analytics," "AI-Powered Insights" in the hero badges). SF Mono stack.
- **Scale.** Hero uses `clamp(3rem, 12vw, 6.5rem)`. Body is 14–16px. KPIs are `text-4xl` (36px), bold, tabular-nums.

### Spacing & layout
- 4px base grid (Tailwind-standard).
- Marketing sections: `py-20 lg:py-28` (80/112 px).
- Product density: tight — `p-3` to `p-4` on cards, `gap-1` inside sidebar nav.
- Max-widths: `max-w-6xl` for marketing content, `max-w-7xl` for nav, `max-w-3xl` for editorial lockups.

### Backgrounds & imagery
- **Full-bleed animated gradients** on marketing (teal → green → amber blurred orbs), almost always behind content.
- **Noise overlay** utility (SVG turbulence at 2% opacity) used sparingly for texture.
- **ECG canvas** animation — the heartbeat line is a signature visual motif.
- **Animated heart / tetrahedron / sphere / wave** SVG objects on landing.
- **No stock photography.** No human faces in hero. Abstract + data-driven.
- **No illustrations in the product.** The dashboard leans on real charts and tabular data.

### Animation
- **Easing:** spring `cubic-bezier(0.34, 1.56, 0.64, 1)` for hover-lift and stagger reveal; `cubic-bezier(0.77, 0, 0.175, 1)` for line-reveal clip-path intros; `cubic-bezier(0.4, 0, 0.2, 1)` for buttons.
- **Durations:** 150ms for micro-interactions, 300ms standard, 500–800ms for entrances, 6–15s for ambient orb/gradient loops.
- **Stagger** on hero copy (0.12s children, 0.2s delay). Blurred char-in animation with `filter: blur(40px)` → 0.
- **Pulse-glow** on primary CTAs (2s infinite ease-in-out).
- **Respects `prefers-reduced-motion`** — all animations collapse to 0.01ms.

### Hover & press
- **Hover:** `hover-lift` → `translateY(-4px)`. Buttons add box-shadow glow intensification. Links fade from `foreground/70` → `foreground`.
- **Press:** no explicit scale-down; buttons just drop the glow.
- **Focus:** 3px `ring-ring/50` outline — visible and branded (teal in dark, same teal in light).

### Borders, radii, shadow
- Base radius **12px** (`--radius`). Buttons 6–10px. Pills 9999px (Connected chip, hero CTAs).
- Borders are 1px `#1A1A1A` (dark) / `#E5DFD5` (light) — always token-driven, never arbitrary hex.
- **Shadows are colored, not neutral.** The shadow color is teal at 40% opacity — gives cards a subtle brand halo instead of generic drop-shadow.

### Glow vs capsule
- **Glow** is the signature primary-CTA treatment (teal halo, 15→25px on hover).
- **Capsules** appear as status chips (`Connected ✓`) and as radial badges (Privacy-First, AI-Powered) — always with an inline icon.
- **Protection gradients** are used on marketing hero (radial from primary/5 through transparent to accent/5) to keep text legible over the animated heart.

### Transparency & blur
- **Glassmorphism** (`rgba(12,12,12,0.8) + blur(12px)`) on the sticky nav after scroll.
- **10–30% brand-color washes** used for insight cards, hover backgrounds (`bg-primary/10`, `bg-amber/10`).
- **Backdrop blur** on the scrolled nav and mobile slide-out menu only — not overused.

### Card style
- Rounded 12px, 1px border in the border token, subtle teal-tinted shadow on marketing; flat borders on the dashboard.
- Cards contain their own padding (`p-4`–`p-6`), gap between elements `gap-2`–`gap-4`.

### Imagery color temperature
- **Warm.** Never pure-cool palettes. The light mode background is explicitly parchment, not white. The red is coral (`#FF6B6B`), not crimson. The amber is honey, not neon.

---

## Iconography

- **Library:** [Lucide](https://lucide.dev) (`lucide-react@^0.454.0`). Every in-product icon comes from here. We reference Lucide by CDN in previews.
- **Style:** 1.5-stroke outline, no fills, rounded line-caps. Size 4 (16px) in dense UI, 5 (20px) in nav, 6 (24px) in problem/benefit cards.
- **Color:** inherits `currentColor` — almost always `text-muted-foreground` or `text-primary` for emphasis.
- **Common glyphs:** `HeartPulse` (brand/product mark), `Brain` (AI), `ShieldCheck` (privacy), `Flame` (burnout), `BarChart3` (distribution), `Scale` (fairness), `Award` (recognition), `Target` (goals), `Calendar`, `Users`, `ArrowRight`, `ChevronDown/Up`, `TrendingUp/Down`, `AlertTriangle`, `Unlock`, `Sparkles`.
- **Brand mark:** `assets/hm-logo-icon.svg` — a gradient heart-mark (the same teal→green→amber logo gradient).
- **Wordmark:** `assets/hm-logo-horizontal.svg` — lowercase "heartmetrics" in Source-Serif-like serif, gradient-filled.
- **Dark wordmark:** `assets/hm-logo-dark.svg` — same silhouette for dark backgrounds (same gradient).
- **App favicon:** `assets/icon.svg`.
- **Emoji:** never used.
- **Unicode as icons:** only `•` (bullet dot), `—` (em-dash), and `✓` (check) in non-Lucide contexts.

---

## Quick-start for agents

```html
<link rel="stylesheet" href="../colors_and_type.css">
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<body class="p-body">
  <!-- dark by default; add .light on <html> for light mode -->
</body>
```

Every preview and UI-kit file in this project assumes `colors_and_type.css` and Lucide are loaded.
