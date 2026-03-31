'use client';

import { useRef } from 'react';
import { Zap, Star, Grid2X2 } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const features = [
  { icon: Zap, label: 'Workload signals' },
  { icon: Star, label: 'Recognition gaps' },
  { icon: Grid2X2, label: 'Fairness scoring' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
};

const chipVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (idx: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: idx * 0.1,
      ease: [0.34, 1.56, 0.64, 1],
    },
  }),
};

export function StorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Eyebrow */}
          <motion.span variants={itemVariants} className="inline-block text-gradient text-sm font-mono uppercase tracking-widest mb-4">
            THE PROBLEM
          </motion.span>

          {/* Headline */}
          <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-display tracking-tight mb-8 max-w-2xl">
            By the time someone resigns, the signals were there for weeks.
          </motion.h2>

          {/* Description */}
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mb-12 leading-relaxed">
            Managers are drowning in data but starving for insight. Traditional analytics show you the "what," but not the "why." By then, it&apos;s already too late.
          </motion.p>

          {/* Feature Chips */}
          <motion.div className="flex flex-col sm:flex-row gap-4">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  custom={idx}
                  variants={chipVariants}
                  className="flex items-center gap-3 px-6 py-4 rounded-lg border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors"
                >
                  <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium">{feature.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
