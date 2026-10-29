# Master prompt (verbatim)

> Saved per the prompt's own process step 1. This is the brief the HeartMetrics
> rebuild is working from. It is written as a generic template; `docs/ADAPTATION.md`
> records how each clause was read for this product and which clauses were skipped.

---

Build "[APP NAME]", a production-ready [WHAT IT IS, e.g. roommate-matching web app] for [WHO IT'S FOR, e.g. college students], starting with [LAUNCH MARKET, e.g. Arizona State University]. It must work flawlessly on desktop and mobile (responsive web + installable PWA). It should feel like a world-class product designer made it: calm, modern, fast, accessible, with motion as good as the best apps on Mobbin.

Skip any requirement that doesn't apply to this product, and list which ones you skipped and why.

REFERENCES (attach)

* [3–6 Mobbin screenshots of specific screens this should feel like, with one line each on what to take from it]
* [Logo reference screenshot]

TECH STACK

* Next.js (latest stable, App Router) + TypeScript + Tailwind CSS + shadcn/ui
* Framer Motion (motion/react) for all UI motion; Lenis for smooth scrolling on the landing page
* Supabase (Postgres, Auth, Storage, Realtime) with Row Level Security on every table
* Zod for validation; typed data layer
* Deploy-ready for Vercel; .env.example with every variable documented

CORE CONCEPT

* [THE ONE IDEA THAT MAKES THIS DIFFERENT, and what it deliberately does NOT do, e.g. "No swiping. Students set preferences and browse a ranked list of compatible matches, each with a clear compatibility score and a 'why you match' explanation."]
* [PRICING + ACCESS RULES, e.g. "Free for students. ASU only at launch: require a verified @asu.edu email, but make the school configurable for future campuses."]

FEATURES

1. Landing page: hero, how it works, [PROOF SECTION, e.g. trust and safety / pricing / testimonials], FAQ, sign-up CTA.
2. Auth: email OTP[ + VERIFICATION RULE, e.g. .edu verification], optional Google sign-in, session handling, logout, delete account.
3. Onboarding (multi-step, progress bar, autosave): [EVERY FIELD YOU NEED FROM A NEW USER, e.g. name, photos (upload + crop), budget range, preferences, and an importance weight for each].
4. [CORE ENGINE: the main logic, run server-side, e.g. "weighted scoring with hard dealbreaker filters, a 0–100 score, and a top-3 reasons breakdown. Recompute when preferences change."]
5. [MAIN LIST PAGE, e.g. "ranked cards, filters (budget, area, move-in, year), sort, search, skeleton loaders, empty states, infinite scroll"]
6. [DETAIL VIEW, e.g. "photo carousel, compatibility breakdown, save/favorite, 'send intro' button"]
7. [OPTIONAL INTEGRATION, e.g. "Spotify OAuth: pull top artists, show shared artists, factor them into the score"]. The app works fully without it.
8. [REAL-TIME / SOCIAL, e.g. "real-time 1:1 chat (Supabase Realtime) that unlocks after an intro is accepted, with a typing indicator, read receipts, and unread badges"]
9. [EXTRA FEATURE, e.g. "Groups: form a group of 2–4 and match as a group"]
10. Notifications: in-app and email for [EVENTS, e.g. new intros, messages, and strong new matches].
11. Safety: report/block, moderation hooks, privacy controls ([PRIVACY OPTIONS, e.g. hide profile, verified users only]), and an admin dashboard to review reports and ban users.
12. Settings: edit [PROFILE / PREFERENCES], notifications, connected accounts, dark mode, data export, delete account.

UX & LAYOUT

* Mobile-first, thumb-friendly bottom nav on mobile, sidebar on desktop
* Optimistic UI, skeletons, toasts, and helpful empty and error states
* Bottom sheets with drag-to-dismiss on mobile instead of modals
* WCAG AA accessibility: keyboard nav, focus states, aria labels, contrast
* Lighthouse 95+ on performance, accessibility, best practices, and SEO

CONTENT & COPY

* Real copy on every screen: no lorem ipsum, no "Feature 1". Voice: [e.g. warm, direct, never cutesy].
* Every error message says what happened and what to do next, in plain words.
* Every empty state explains why it's empty and offers one clear next action.
* Privacy policy, terms, and a support/contact page written for this product.

STATES & EDGE CASES

* For every screen, build: first-time empty, no results, loading, error, offline, and slow network.
* Handle real data: very long names and text, missing photos, 0 items and 1,000+ items, time zones on every date.
* PWA: an offline page, an install prompt shown at a sensible moment (not on first visit), and an "update available" notice.

MOBILE DETAILS

* Respect safe areas (notch, home indicator); use dvh, not vh.
* The on-screen keyboard never covers the field being typed in; sticky inputs stay above it.
* Correct input types, inputmode, and autocomplete on every field so phones show the right keyboard and autofill works.
* Touch targets at least 44×44px; nothing that only works on hover.

NAVIGATION & STATE

* Filters, search, tabs, and open sheets live in the URL so links are shareable and survive a refresh.
* Back (browser and Android) always does the expected thing: it closes a sheet before leaving the page, and scroll position is restored.
* Every page has a proper title, description, and share image (Open Graph) so links look good when shared.

VISUAL STYLE (no generic AI look)

* Logo: a text-only wordmark "[app name]" styled like [REFERENCE BRAND]'s wordmark ([reference-site.com]), matching its typeface feel, weight, letter-spacing, and casing (see attached screenshot). Use it in the nav, the favicon (first letter), and the splash/loading screen.
* The design should match the best apps on Mobbin (Linear, Arc, Airbnb, Revolut, Things), with component quality like 21st.dev
* Avoid: purple-blue gradients, glowing blobs, emoji icons, a centered hero over three feature cards, and fade-up on every element
* Restrained palette: [BASE COLORS, e.g. warm off-white and near-black] base, one distinctive accent color[, e.g. ACCENT], and a dark mode tuned by hand rather than inverted
* Strong typography: a characterful display font ([e.g. Instrument Serif or General Sans]) with Inter for the UI, tight letter-spacing on headings
* Real depth: subtle borders, layered soft shadows, glass blur only on nav bars
* Realistic product mockups on the landing page, not stock illustrations
* 8px grid with consistent radius, shadow, and color tokens
* Lucide or Phosphor icons with one consistent stroke weight
* Use 21st.dev, Aceternity, or Magic UI components only when they fit, and restyle them to the [app name] design system so nothing looks copy-pasted

MOTION (top priority)

* Every animation has a purpose: show where something came from, confirm an action, or guide attention
* Spring physics (stiffness ~300, damping ~30), with UI durations of 150–300ms; nothing feels slow
* Shared-layout transitions (layoutId): [a list card] morphs smoothly into [its full detail view]
* Subtle staggered list reveals (opacity + 8px translate, 30ms stagger)
* [HERO NUMBER, e.g. the compatibility score] counts up and draws a ring when [the detail view] opens
* Tactile buttons: slight scale on press, a checkmark morph on success
* Route transitions that feel native on mobile (slide + fade, swipe-back gesture)
* [If there's chat:] message bubbles spring in, with a smooth typing indicator
* Landing page: one signature scroll-linked moment: [DESCRIBE IT, e.g. profile cards assembling into a ranked list as you scroll]
* Respect prefers-reduced-motion everywhere
* Hold 60fps on mid-range phones by animating only transform and opacity

QUALITY

* Seed script with [N, e.g. 50] realistic fake [RECORDS, e.g. ASU student profiles] so the app looks alive. Seed data is clearly flagged and removable with one command before launch.
* Unit tests for [CORE LOGIC, e.g. the matching algorithm]; Playwright end-to-end tests for sign-up, onboarding, [CORE FLOWS, e.g. matching and chat]
* Error handling, loading states, rate limiting on auth and [USER ACTIONS, e.g. messaging], input sanitization
* Clean folder structure and reusable components, with no TODOs or placeholder features. Every button must work.
* README covering setup, env vars, running locally, seeding, testing, and deploying to Vercel

LAUNCH & OPERATIONS

* "Done" means live and verified in production, not just deploy-ready.
* Send all email, including sign-in codes, through a real provider ([e.g. Resend or Amazon SES]) with SPF/DKIM/DMARC set up. Supabase's built-in email is for testing only.
* Sign-in emails must survive school and corporate link scanners: use a code or a confirm button, never a one-click link.
* Error monitoring and privacy-friendly product analytics.
* A launch checklist of every dashboard step I must do myself, with exact values (redirect URLs, DNS records, env vars).

PROCESS

1. Save this prompt verbatim to docs/PROMPT.md, and update docs/PROGRESS.md after each feature so the work survives context resets.
2. Before writing code, list every account, API key, and approval you need from me, and flag third-party limits (app review, user caps, school or company admin approval) that could block launch.
3. Propose the database schema, page map, and design system tokens before writing code.
4. Build feature by feature, running and testing each one before moving on.
5. Test security rules with two users: prove user A can't read or change user B's private data.
6. At the end, test every flow at 375px mobile and 1440px desktop, in light and dark mode and with reduced motion on. Review screenshots of every screen and fix anything broken.
7. Review every screen and ask, "Would this be featured on Mobbin?" If not, redesign it.
8. Finish with the launch checklist, the requirements you skipped and why, and anything you couldn't verify yourself.
