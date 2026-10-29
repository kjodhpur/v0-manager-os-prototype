'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ROUTES } from '@/lib/site-config';

/**
 * Seven weeks of Riya's decline, driven by scroll.
 *
 * This is the page's one scroll-linked set piece. The section is four
 * viewports tall and pins its content; scroll position maps to a week, so the
 * reader advances the story with the same gesture they were already making.
 *
 * Everything that moves is transform or opacity. The score text is written
 * straight to the DOM from a motion value rather than through state, so
 * scrubbing doesn't re-render the subtree on every frame.
 */

const WEEKS = [
  { week: 1, status: 'Healthy',   score: 72, token: '--week-1', signal: 'Baseline. Workload even, recognition flowing.' },
  { week: 2, status: 'Watch',     score: 65, token: '--week-2', signal: 'Picks up a second project. WIP climbs to 7.' },
  { week: 3, status: 'Elevated',  score: 58, token: '--week-3', signal: 'Meeting load hits 12h/week. Deep work vanishes.' },
  { week: 4, status: 'At risk',   score: 51, token: '--week-4', signal: 'Three items blocked four days or more.' },
  { week: 5, status: 'High risk', score: 45, token: '--week-5', signal: 'No recognition, public or private, in 30 days.' },
  { week: 6, status: 'Critical',  score: 43, token: '--week-6', signal: 'Stretch work drops to 4%. Only maintenance left.' },
  { week: 7, status: 'Resigned',  score: 41, token: '--week-7', signal: 'Gives notice. Nobody saw it coming.' },
];

const W = 520;
const H = 190;
const PAD = 14;

const pointAt = (i: number, score: number) => ({
  x: PAD + (i / (WEEKS.length - 1)) * (W - PAD * 2),
  y: PAD + (1 - (score - 35) / (80 - 35)) * (H - PAD * 2),
});

const LINE = WEEKS.map((w, i) => pointAt(i, w.score));
const PATH = LINE.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');

export function SevenWeeks() {
  const trackRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLSpanElement>(null);
  const prefersReduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  // useReducedMotion() is null on the server, so branching on it during render
  // makes the server and the client emit different trees and React bails out
  // of hydration. Decide only after mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  // Hold the first and last beats a moment longer than the middle ones.
  const eased = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.6 });
  const weekFloat = useTransform(eased, [0.06, 0.94], [0, WEEKS.length - 1], { clamp: true });
  const score = useTransform(weekFloat, (v) => {
    const i = Math.max(0, Math.min(WEEKS.length - 1, v));
    const lo = Math.floor(i);
    const hi = Math.min(WEEKS.length - 1, lo + 1);
    return WEEKS[lo].score + (WEEKS[hi].score - WEEKS[lo].score) * (i - lo);
  });

  // Draw the trace in step with the scrub.
  const dash = useTransform(weekFloat, [0, WEEKS.length - 1], [0, 1]);

  useMotionValueEvent(weekFloat, 'change', (v) => {
    const next = Math.round(Math.max(0, Math.min(WEEKS.length - 1, v)));
    setIndex((prev) => (prev === next ? prev : next));
  });

  useEffect(() => {
    const unsub = score.on('change', (v) => {
      if (scoreRef.current) scoreRef.current.textContent = String(Math.round(v));
    });
    return unsub;
  }, [score]);

  const active = WEEKS[index];
  const color = `var(${active.token})`;

  // Reduced motion: no pinning, no scrubbing — the whole arc at once.
  if (mounted && prefersReduced) {
    return (
      <section className="border-t border-border py-24" aria-labelledby="seven-weeks-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Header />
          <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {WEEKS.map((w) => (
              <li key={w.week} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">
                    Week {w.week}
                  </span>
                  <span className="tabular text-2xl" style={{ color: `var(${w.token})` }}>
                    {w.score}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium" style={{ color: `var(${w.token})` }}>
                  {w.status}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.signal}</p>
              </li>
            ))}
          </ol>
          <Footer />
        </div>
      </section>
    );
  }

  return (
    <section className="border-t border-border" aria-labelledby="seven-weeks-heading">
      {/* The heading is read once and scrolls away. Only the chart and the
          score pin — keeping the prose inside the pinned panel pushed the
          chart off the bottom of a 740px phone. */}
      <div className="mx-auto w-full max-w-7xl px-4 pb-2 pt-20 sm:px-6 lg:px-8 lg:pt-28">
        <Header />
      </div>

      <div ref={trackRef} className="relative" style={{ height: '420vh' }}>
        <div className="sticky top-16 flex min-h-[calc(100dvh-4rem)] items-center">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
          <div className="grid items-center gap-6 sm:gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Score + status */}
            <div className="lg:col-span-4">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Work Wellbeing Index
              </p>
              <div className="mt-3 flex items-end gap-4">
                <span
                  ref={scoreRef}
                  className="tabular font-display text-[clamp(3.25rem,13vw,5.5rem)] leading-[0.85] transition-colors duration-500"
                  style={{ color }}
                >
                  72
                </span>
                <motion.span
                  key={active.status}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mb-3 text-lg font-medium"
                  style={{ color }}
                >
                  {active.status}
                </motion.span>
              </div>

              <div className="mt-4 flex items-center gap-2 sm:mt-6">
                <span className="text-sm text-muted-foreground">Week</span>
                <span className="tabular text-sm font-medium text-foreground">{active.week}</span>
                <span className="text-sm text-muted-foreground">of 7</span>
              </div>

              <motion.p
                key={active.week}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
                className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground sm:mt-5 sm:min-h-[3.5rem]"
              >
                {active.signal}
              </motion.p>
            </div>

            {/* The trace */}
            <div className="lg:col-span-8">
              <div className="rounded-2xl border border-border bg-card p-4 shadow-elev-2 sm:p-7">
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className="w-full"
                  role="img"
                  aria-label={`Riya's Work Wellbeing Index falling from 72 in week 1 to 41 in week 7`}
                >
                  {[0, 1, 2, 3].map((g) => (
                    <line
                      key={g}
                      x1={PAD}
                      x2={W - PAD}
                      y1={PAD + (g / 3) * (H - PAD * 2)}
                      y2={PAD + (g / 3) * (H - PAD * 2)}
                      stroke="var(--border)"
                      strokeWidth={1}
                    />
                  ))}

                  <motion.path
                    d={PATH}
                    fill="none"
                    stroke={color}
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ pathLength: dash }}
                    className="transition-[stroke] duration-500"
                  />

                  {LINE.map((p, i) => (
                    <motion.circle
                      key={i}
                      cx={p.x}
                      cy={p.y}
                      r={i === index ? 6 : 3.5}
                      fill={i <= index ? `var(${WEEKS[i].token})` : 'var(--border)'}
                      stroke="var(--card)"
                      strokeWidth={2}
                      animate={{ scale: i === index ? 1 : 0.9 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    />
                  ))}
                </svg>

                <div className="mt-4 flex justify-between px-1">
                  {WEEKS.map((w, i) => (
                    <span
                      key={w.week}
                      className={`tabular text-[11px] transition-colors duration-300 ${
                        i === index ? 'font-semibold text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      W{w.week}
                    </span>
                  ))}
                </div>
              </div>

              <motion.div
                animate={{ opacity: index >= WEEKS.length - 1 ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="mt-3 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm sm:mt-4 sm:px-5 sm:py-4"
              >
                <p className="text-sm leading-relaxed text-foreground">
                  <span className="font-medium">HeartMetrics flags this in week 2</span> — the week
                  the workload climbs, five weeks before the resignation.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

function Header() {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        The pattern
      </p>
      <h2
        id="seven-weeks-heading"
        className="mt-3 font-display text-[clamp(1.875rem,5vw,3.25rem)] sm:mt-4"
      >
        Seven weeks of signal. One resignation.
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base">
        Riya is a composite drawn from the patterns in our research. Nothing here needed a
        survey — every one of these signals already existed in the tools her team ran.
      </p>
    </div>
  );
}

function Footer() {
  return (
    <div className="mt-10">
      <Link
        href={ROUTES.howWeCalculate}
        className="group inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        See exactly how the score is built
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </Link>
    </div>
  );
}
