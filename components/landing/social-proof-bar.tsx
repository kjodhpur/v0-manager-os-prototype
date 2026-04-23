'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 900, label: 'Annual U.S. turnover cost', prefix: '$', suffix: 'B' },
  { value: 79, label: 'Cite lack of recognition as reason for quitting', prefix: '', suffix: '%' },
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

        const durations = [1800, 1400];
        const delays = [0, 0];
        const startTimes = delays.map((d) => Date.now() + d);

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
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-16 max-w-3xl mx-auto">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-start">
              <div className="mb-2">
                <span className="text-3xl lg:text-4xl font-display font-bold text-gradient">
                  {stat.prefix}
                  {counts[idx]}
                  {stat.suffix}
                </span>
              </div>
              <p className="text-xs lg:text-sm text-muted-foreground">
                {stat.label}
              </p>
              {idx < 3 && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 w-px h-8 bg-border hidden lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
