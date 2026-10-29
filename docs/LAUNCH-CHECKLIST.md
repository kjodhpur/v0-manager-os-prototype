# Launch checklist

Dashboard steps that need a human. Grouped by whether they block launch.

## Blocking

### 1. Vercel: stop the manual promote
**Where:** Vercel → heartmetrics → Settings → Domains
**Problem:** `heartmetrics.dev` does not auto-assign to new production
deployments. A push builds, reaches READY, and the domain keeps serving whatever
was last promoted. A March build stayed live for months this way.
**Until it's fixed:** every deploy needs an explicit promote, which is why
`CLAUDE.md` makes that step mandatory.

### 2. `GEMINI_API_KEY`
**Where:** Vercel → heartmetrics → Settings → Environment Variables
**Value:** a Google AI Studio key, scoped to Production + Preview.
**Without it:** every AI Coach message returns the error bubble. The route reads
`process.env.GEMINI_API_KEY` with a non-null assertion, so a missing key fails at
request time, not at build.
**Not verified by me** — listing env vars returns 403 for this token, so I cannot
confirm whether it is already set.

### 3. Supabase OAuth redirect URLs
**Where:** Supabase → Authentication → URL Configuration
**Add:** `https://heartmetrics.dev/demo`, plus `http://localhost:3000/demo` for
local work. `login()` passes `redirectTo: ${window.location.origin}/demo`, so any
origin not on this list fails the callback.

## Non-blocking, worth doing

### 4. Founder LinkedIn URLs
`components/landing/team-section.tsx` — both `linkedin` fields are empty strings.
The link is deliberately not rendered while empty, so nothing is broken; fill
them in and the links appear.

### 5. Open Graph image
Metadata declares `openGraph` and `twitter: summary_large_image` but there is no
image file, so shared links show no preview card. Add `app/opengraph-image.png`
(1200×630) and Next will wire it automatically.

### 6. Rate limiting on `/api/ai/chat`
The only write path, currently unauthenticated and unthrottled. Not urgent while
the demo is the only caller, but it is a public endpoint that costs money per
request.

### 7. Error monitoring
Vercel Analytics is wired for traffic. There is no error tracker — a runtime
error in production is currently invisible unless someone reports it.

## Deliberately not done

See `docs/ADAPTATION.md`. The short version: no transactional email provider
(nothing sends mail), no Supabase schema or RLS policies (no application tables
in use), and therefore **no two-user data isolation test** — flagged rather than
quietly skipped. That test becomes mandatory the moment real tenant data lands.
