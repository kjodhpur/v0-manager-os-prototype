# Adapting the master prompt to HeartMetrics

The prompt is written for a consumer marketplace app (roommate matching, ASU
students). HeartMetrics is a different shape: a **pre-launch B2B marketing site
plus an interactive product demo**. There is no sign-up funnel, no user-generated
content, and no two-sided marketplace.

This file records how each clause was read, and what was skipped. It is the
answer to the prompt's own instruction: *"Skip any requirement that doesn't apply
to this product, and list which ones you skipped and why."*

## The mapping

Several clauses translate cleanly once you read "match" as "wellbeing signal":

| Prompt clause | HeartMetrics reading |
|---|---|
| Core engine: weighted score + reasons | **WWI** — weighted 0–100 score over five Surgeon-General dimensions, with a "why this score" breakdown |
| Main list page: ranked cards, filters, empty states | **Team page** — roster ranked by risk, with band colours and an at-risk rail |
| Detail view: breakdown, score | **Employee detail** — pentagon signal chart, component bars, recommended actions |
| Optional integration that the app works without | **Jira / Slack / HRIS** panels in demo settings |
| Real-time chat with typing indicator | **AI Coach** — streaming answers over the team context |
| Hero number counts up, draws a ring | **WWI score** on the overview and on each employee |
| Signature scroll-linked landing moment | **Riya's seven-week decline** — the timeline scrubber, driven by scroll |

## Applied in full

Landing page · visual style · motion · mobile details · navigation & state ·
content & copy · accessibility (WCAG AA) · states and edge cases for every demo
screen · typed data layer · Vercel deploy · README · launch checklist.

## Skipped, with reasons

**Onboarding (multi-step, autosave), profile photos, crop.**
There is no user profile. The demo opens straight into a populated dashboard,
which is the point — a prospect should see the product working in one click, not
fill in a form first.

**Groups; report / block / moderation; admin ban dashboard.**
These exist to police user-generated content between strangers. HeartMetrics has
no UGC and no stranger contact. Nothing to moderate.

**Supabase Postgres schema, RLS on every table, two-user security test.**
The product has no application tables in use. Supabase is wired for Google OAuth
only; the demo runs on typed fixtures in `lib/`. Writing a schema and RLS
policies for tables nothing reads would be theatre. **The two-user RLS test is
therefore not run — flagged, not quietly dropped.** When real tenant data lands,
that test becomes mandatory.

**Email provider (Resend/SES), SPF/DKIM/DMARC, OTP sign-in codes.**
No transactional email is sent. Sign-in is Google OAuth; the contact form hands
the message to the visitor's own mail client rather than claiming to deliver it.
There is no mail to authenticate, so domain auth records would protect nothing.

**Seed script of 50 fake records.**
Fabricated volume would work against this particular product. The site was
carrying invented customer testimonials until recently; the roster is kept small,
obviously illustrative, and labelled demo data.

**Rate limiting on messaging.**
The only write path is the AI Coach route. Noted in the launch checklist as a
pre-launch task rather than built now, since there is no auth to rate-limit
against yet.

**PWA install prompt.**
An install prompt on a B2B marketing site interrupts the exact moment a prospect
is evaluating you. An offline fallback and correct manifest are worth having;
prompting someone to install a brochure is not.

## One standing constraint the prompt does not mention

HeartMetrics is pre-launch and has no customers. Earlier versions of this site
carried four fabricated testimonials with invented people, companies and metrics,
plus internal ARR figures and a "SOC 2 Verified" badge. Those were removed.

So where the prompt asks for a "proof section", the proof here is **cited
research and a working demo**, never customer claims. Every statistic shows its
source next to it. This rule outranks any visual suggestion in the brief.
