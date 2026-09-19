'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

/**
 * Evidence, not endorsements. HeartMetrics is pre-launch, so this section cites
 * published research rather than presenting customer quotes we don't have.
 */
const EVIDENCE = [
  {
    stat: '71%',
    claim: 'of tech employee turnover is linked to poor management',
    source: 'Gallup, 2023',
  },
  {
    stat: '79%',
    claim: 'cite lack of recognition as a reason for quitting',
    source: 'O.C. Tanner',
  },
  {
    stat: '34%',
    claim: 'of employees considered quitting because of burnout',
    source: 'NAMI, 2024',
  },
  {
    stat: '$900B',
    claim: 'annual cost of voluntary turnover in the U.S.',
    source: 'Work Institute, 2024',
  },
];

const TEAM_BACKGROUNDS = [
  'Google',
  'Amazon',
  'Deloitte',
  'Nestlé',
  'ASU',
  'PSU',
  'Meta',
  'Microsoft',
];

export function TestimonialsSection() {
  return (
    <section className="border-t border-border py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Why this matters
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="font-display text-3xl tracking-tight md:text-4xl lg:text-5xl">
              The signals are <span className="text-gradient">already there</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground lg:text-lg">
              People rarely leave without warning. The patterns show up in workload, recognition
              and growth long before a resignation — they&apos;re just spread across systems no one
              reads together.
            </p>
            <Link
              href="/how-we-calculate"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              See the full methodology
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {EVIDENCE.map((item) => (
              <div
                key={item.stat}
                className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
              >
                <p className="font-display text-3xl text-gradient lg:text-4xl">{item.stat}</p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">{item.claim}</p>
                <p className="mt-3 font-mono text-xs text-muted-foreground">{item.source}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 border-t border-border pt-12">
          <p className="text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Built by people with experience at
          </p>
        </div>
      </div>

      {/* Full-bleed marquee. Each set carries its own trailing gap so the -50%
          translate lands exactly one set over and the loop has no seam. */}
      <div className="mt-8 w-full overflow-hidden">
        <div className="marquee flex w-max items-center">
          {[0, 1].map((setIdx) => (
            <div key={setIdx} className="flex shrink-0 items-center gap-16 pr-16">
              {TEAM_BACKGROUNDS.map((company) => (
                <span
                  key={`${setIdx}-${company}`}
                  className="whitespace-nowrap font-display text-xl text-muted-foreground md:text-2xl"
                  aria-hidden={setIdx === 1 ? 'true' : undefined}
                >
                  {company}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
