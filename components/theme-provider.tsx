'use client';

import { MotionConfig } from 'framer-motion';

/**
 * The theme class is applied by the inline script in app/layout.tsx before
 * first paint, so there is nothing to do here for colours.
 *
 * What this does own is motion: the reduced-motion media query in globals.css
 * only neutralises CSS animations, and Framer Motion drives inline styles that
 * the query never sees. `reducedMotion="user"` makes every motion component on
 * the site honour the OS setting.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
