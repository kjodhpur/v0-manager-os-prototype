'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { getColor, getRiskLabel } from '@/lib/team-data';

interface ScoreRingProps {
  /** 0-100 */
  value: number;
  /** Rendered pixel size of the ring. */
  size?: number;
  /** Stroke thickness. */
  thickness?: number;
  label?: string;
  sublabel?: string;
  className?: string;
}

/**
 * The hero number: the ring draws itself while the score counts up to meet it.
 *
 * Both halves are driven by one spring so the number can never finish before
 * the arc does. The ring is a stroke-dashoffset animation on a circle, which
 * stays on the compositor; the digits come off the same spring via a
 * subscription rather than React state, so counting doesn't re-render the tree
 * sixty times a second.
 */
export function ScoreRing({
  value,
  size = 180,
  thickness = 10,
  label = 'Work Wellbeing Index',
  sublabel,
  className = '',
}: ScoreRingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReduced = useReducedMotion();
  const [announced, setAnnounced] = useState(false);

  const progress = useMotionValue(0);
  const smooth = useSpring(progress, { stiffness: 120, damping: 24, mass: 0.9 });

  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const color = getColor(value);

  useEffect(() => {
    if (!isInView) return;
    if (prefersReduced) {
      progress.set(value);
      if (numberRef.current) numberRef.current.textContent = String(Math.round(value));
      setAnnounced(true);
      return;
    }
    progress.set(value);
    setAnnounced(true);
  }, [isInView, prefersReduced, progress, value]);

  // Drive the digits straight off the spring, outside React's render cycle.
  useEffect(() => {
    const unsubscribe = smooth.on('change', (v) => {
      if (numberRef.current) numberRef.current.textContent = String(Math.round(v));
    });
    return unsubscribe;
  }, [smooth]);

  const dashoffset = useSpring(circumference, { stiffness: 120, damping: 24, mass: 0.9 });
  useEffect(() => {
    if (!isInView) return;
    dashoffset.set(circumference - (value / 100) * circumference);
  }, [isInView, circumference, value, dashoffset]);

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center ${className}`}
      role="img"
      aria-label={`${label}: ${value} out of 100, ${getRiskLabel(value)}`}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--border)"
            strokeWidth={thickness}
          />
          {/* Value arc */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{ strokeDashoffset: prefersReduced ? circumference - (value / 100) * circumference : dashoffset }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            ref={numberRef}
            className="tabular font-display leading-none"
            style={{ fontSize: size * 0.34, color }}
          >
            0
          </span>
          <span className="mt-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {getRiskLabel(value)}
          </span>
        </div>
      </div>

      <p className="mt-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      {sublabel && <p className="mt-1.5 text-sm text-muted-foreground">{sublabel}</p>}

      {/* Screen readers get the final value once, not every tick. */}
      <span className="sr-only" aria-live="polite">
        {announced ? `${value} out of 100` : ''}
      </span>
    </div>
  );
}
