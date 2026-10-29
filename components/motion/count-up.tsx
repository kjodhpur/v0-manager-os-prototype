'use client';

import { useEffect, useRef } from 'react';
import { useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Counts to `value` on mount and whenever it changes.
 *
 * The digits are written straight to the DOM from the spring rather than
 * through state, so a counting number doesn't re-render whatever it sits
 * inside sixty times a second. Screen readers get the final value only.
 */
export function CountUp({
  value,
  className = '',
  duration,
}: {
  value: number;
  className?: string;
  /** Unused when reduced motion is on, where the value appears immediately. */
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReduced = useReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, {
    stiffness: duration ? 1000 / duration : 140,
    damping: 26,
    mass: 0.8,
  });

  // Both sides must agree on first paint, so the span always starts at 0 and
  // the real value is written after hydration — never during render.
  useEffect(() => {
    if (prefersReduced) {
      if (ref.current) ref.current.textContent = String(Math.round(value));
      return;
    }
    mv.set(value);
  }, [value, mv, prefersReduced]);

  useEffect(() => {
    if (prefersReduced) return;
    const unsub = spring.on('change', (v) => {
      if (ref.current) ref.current.textContent = String(Math.round(v));
    });
    return unsub;
  }, [spring, prefersReduced]);

  return (
    <>
      <span ref={ref} aria-hidden="true" className={className}>
        0
      </span>
      <span className="sr-only">{Math.round(value)}</span>
    </>
  );
}
