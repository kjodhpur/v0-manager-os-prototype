'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedHeart } from './animated-heart';
import { ScoreRing } from '@/components/motion/score-ring';
import { ROUTES, CTA } from '@/lib/site-config';
import { spring, springSnappy, listContainer, listItem } from '@/lib/motion';
import { EMPLOYEES } from '@/lib/team-data';

const PROOF = [
  'Signals from the work systems you already run',
  'A score you can take apart, line by line',
  'No message reading, no keystroke logging',
  'Fairness checks on who gets the good work',
];

/** Same number the demo shows, derived from the same roster. */
const TEAM_WWI = Math.round(
  EMPLOYEES.reduce((sum, e) => sum + e.wwiScore, 0) / EMPLOYEES.length,
);

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-16">
      {/* A single, very low-contrast wash. No floating blur orbs — they read as
          decoration for its own sake and the brief rules them out. */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_75%_30%,var(--glow-primary),transparent_70%)] opacity-40"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
          {/* ---- Copy ---------------------------------------------------- */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={spring}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              <span className="text-xs font-medium text-foreground/80">
                Work-system signals only. Never private messages.
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.04 }}
              className="mt-7 font-display text-[clamp(2.5rem,8.5vw,5.25rem)]"
            >
              See your team&apos;s{' '}
              <span className="text-gradient">real story</span>
              <span className="block text-muted-foreground">before they leave</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.08 }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground"
            >
              By the time someone resigns, the signal has been there for weeks — in
              workload, in recognition, in who gets the work that leads somewhere.
              HeartMetrics reads those patterns and tells you what to do about them.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.12 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Button size="lg" className="rounded-full px-7" asChild>
                <motion.a href={ROUTES.demo} whileTap={{ scale: 0.97 }} transition={springSnappy}>
                  {CTA.demo}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </motion.a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-7"
                asChild
              >
                <Link href={ROUTES.howWeCalculate}>See how the score works</Link>
              </Button>
            </motion.div>

            {/* The only staggered group in the hero: four ordered claims. */}
            <motion.ul
              variants={listContainer}
              initial="hidden"
              animate="visible"
              transition={{ delayChildren: 0.18 }}
              className="mt-10 grid gap-2.5 sm:grid-cols-2"
            >
              {PROOF.map((item) => (
                <motion.li
                  key={item}
                  variants={listItem}
                  className="flex items-start gap-2.5 text-sm text-foreground/75"
                >
                  <span
                    className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* ---- The number ---------------------------------------------- */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...spring, delay: 0.1 }}
              className="relative mx-auto w-full max-w-sm"
            >
              {/* The heart lives behind the card, clipped to it, so it reads as
                  texture rather than a loose graphic floating on the page. */}
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-elev-3">
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.22]"
                  aria-hidden="true"
                >
                  <AnimatedHeart />
                </div>

                <div className="relative flex flex-col items-center px-6 py-10">
                  <ScoreRing value={TEAM_WWI} size={196} sublabel="Engineering · 6 people" />

                  <dl className="mt-8 grid w-full grid-cols-3 gap-px overflow-hidden rounded-xl border border-border bg-border">
                    {[
                      { k: 'At risk', v: String(EMPLOYEES.filter((e) => e.wwiScore < 55).length) },
                      { k: 'Healthy', v: String(EMPLOYEES.filter((e) => e.wwiScore >= 70).length) },
                      { k: 'Signals', v: '5' },
                    ].map((s) => (
                      <div key={s.k} className="bg-card px-2 py-3 text-center">
                        <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          {s.k}
                        </dt>
                        <dd className="tabular mt-1 text-xl font-medium text-foreground">{s.v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <p className="mt-3 text-center text-xs text-muted-foreground">
                Live view from the demo · sample data
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
