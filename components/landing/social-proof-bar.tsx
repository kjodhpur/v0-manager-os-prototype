'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Published research on the cost of turnover — not product outcomes.
 * HeartMetrics is pre-launch and has no customer results to report.
 */
const stats = [
  {
    value: 900,
    label: 'Annual U.S. cost of voluntary turnover',
    prefix: '$',
    suffix: 'B',
    source: 'Work Institute, 2024',
  },
  {
    value: 20,
    label: 'To replace a single tech employee',
    prefix: '$',
    suffix: 'K',
    source: 'SHRM, 2023',
  },
  {
    value: 33,
    label: 'Quit over a lack of constructive feedback',
    suffix: '%',
    source: 'BambooHR, 2025',
  },
];

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

export function SocialProofBar() {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const animationRef = useRef<number>();
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !hasAnimatedRef.current) {
        hasAnimatedRef.current = true;

        const durations = [1800, 1500, 1300];
        const delays = [0, 150, 300];
        const startTimes = delays.map((d, i) => Date.now() + d);

        const animate = () => {
          const now = Date.now();
          let allDone = true;

          const newCounts = stats.map((stat, idx) => {
            const elapsed = now - startTimes[idx];
            const duration = durations[idx];

            if (elapsed < 0) {
              allDone = false;
              return 0;
            }

            if (elapsed >= duration) {
              return stat.value;
            }

            allDone = false;
            const progress = easeOutQuart(elapsed / duration);
            return Math.floor(stat.value * progress);
          });

          setCounts(newCounts);

          if (!allDone) {
            animationRef.current = requestAnimationFrame(animate);
          }
        };

        animationRef.current = requestAnimationFrame(animate);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });
    const element = document.getElementById('social-proof-bar');
    if (element) {
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div id="social-proof-bar" className="py-12 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:gap-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-start">
              <div className="mb-2">
                <span className="text-3xl lg:text-4xl font-display font-bold text-gradient">
                  {stat.prefix}
                  {counts[idx]}
                  {stat.suffix}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground lg:text-sm">
                {stat.label}
              </p>
              <p className="mt-1.5 font-mono text-[11px] text-muted-foreground/70">{stat.source}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
