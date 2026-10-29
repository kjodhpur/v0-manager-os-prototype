'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { inView, listContainer, listItem, sectionReveal } from '@/lib/motion';

/**
 * Section-level entrance. One of these per section — not per element.
 *
 * The brief explicitly warns against "fade-up on every element", and it is
 * right: when everything animates, nothing is being pointed at. A section
 * settles once, and inside it only genuinely ordered content staggers.
 */
export function Reveal({
  children,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'header';
}) {
  const M = Tag === 'section' ? motion.section : Tag === 'header' ? motion.header : motion.div;
  return (
    <M
      className={className}
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
    >
      {children}
    </M>
  );
}

/** Wraps an ordered set — list items stagger 30ms apart with an 8px lift. */
export function RevealList({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={listContainer}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
    >
      {children}
    </motion.div>
  );
}

/** A single staggered child. Must sit inside RevealList. */
export function RevealItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={listItem}>
      {children}
    </motion.div>
  );
}
