import type { Transition, Variants } from 'framer-motion';

/**
 * One motion vocabulary for the whole site.
 *
 * The brief asks for spring physics at roughly stiffness 300 / damping 30 and
 * UI durations in the 150–300ms band. Importing these rather than hand-writing
 * transitions per component is what stops the page drifting into fifteen
 * slightly different easings.
 *
 * Everything here animates `transform` and `opacity` only. Those two are the
 * properties the compositor can handle without touching layout or paint, which
 * is the whole game for holding 60fps on a mid-range phone.
 */

/** Default for anything that moves between two resting states. */
export const spring: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

/** Snappier — for press feedback and small affordances. */
export const springSnappy: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 28,
  mass: 0.6,
};

/** Softer, for large surfaces where a tight spring reads as a jolt. */
export const springSoft: Transition = {
  type: 'spring',
  stiffness: 180,
  damping: 26,
};

export const easeOut: Transition = {
  duration: 0.22,
  ease: [0.22, 1, 0.36, 1],
};

/**
 * Staggered reveal: opacity plus an 8px lift, 30ms apart.
 * Deliberately small — the point is to show order, not to perform.
 */
export const listContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.03, delayChildren: 0.02 },
  },
};

export const listItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: spring },
};

/** Section-level entrance. One per section, never per element inside it. */
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { ...spring, damping: 34 } },
};

/** Shared viewport config so sections don't re-animate on every scroll pass. */
export const inView = { once: true, amount: 0.25 } as const;

/** Press feedback. Applied via whileTap so it never fires on hover. */
export const tactile = {
  whileTap: { scale: 0.97 },
  transition: springSnappy,
} as const;
