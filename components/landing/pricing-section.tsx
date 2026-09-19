'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/site-config';

const pricingTiers = [
  {
    name: 'Starter',
    description: 'Land with one team',
    price: '$299',
    period: '/manager/month',
    managers: 'Up to 15 managers',
    features: [
      'WWI dashboard',
      'Workload visibility',
      'Basic AI coaching nudges',
      'Up to 3 integrations',
    ],
    addon: 'One-time onboarding ($2,500–$5,000) · Premium integrations add-on ($499/mo)',
    highlighted: false,
    cta: 'Get Started',
  },
  {
    name: 'Scale',
    description: 'Expand company-wide',
    price: '$199',
    period: '/manager/month',
    managers: '15–50 managers',
    features: [
      'Everything in Starter',
      'Manager Fairness Score',
      'Recognition gap detection',
      'Unlimited integrations',
    ],
    highlighted: true,
    cta: 'Get Started',
  },
  {
    name: 'Enterprise',
    description: 'Retain through embedded work data',
    price: 'Custom',
    period: 'pricing',
    managers: '50+ managers',
    features: [
      'Everything in Scale',
      'Empathy & safety signals',
      'Executive dashboards',
      'Dedicated CSM + SLA',
    ],
    highlighted: false,
    cta: 'Contact Sales',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative scroll-mt-16 overflow-hidden bg-gradient-to-b from-transparent via-primary/5 to-transparent py-24 lg:py-32"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary/70">
            Pricing
          </p>
          <h2 className="mb-4 font-display text-4xl font-bold lg:text-5xl">
            Simple pricing,
            <br />
            <span className="text-gradient">per manager seat</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Start with one team, expand company-wide as the signal proves itself.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 lg:grid-cols-3 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {pricingTiers.map((tier) => (
            <motion.div key={tier.name} variants={itemVariants} className="group relative h-full">
              {tier.highlighted && (
                <div
                  className="pointer-events-none absolute -inset-0.5 rounded-xl bg-gradient-to-br from-primary/40 to-accent/40 opacity-60 blur transition-opacity group-hover:opacity-90"
                  aria-hidden="true"
                />
              )}

              <div
                className={`relative flex h-full flex-col rounded-xl border p-8 transition-colors ${
                  tier.highlighted
                    ? 'border-primary/50 bg-card'
                    : 'border-border bg-card hover:border-primary/30'
                }`}
              >
                {tier.highlighted && (
                  <div className="mb-6 flex justify-center">
                    <span className="rounded-full border border-primary/40 bg-primary/20 px-4 py-1 text-xs font-semibold text-primary">
                      Most Popular
                    </span>
                  </div>
                )}

                <h3 className="mb-2 font-display text-2xl font-bold">{tier.name}</h3>
                <p className="mb-6 text-sm text-muted-foreground">{tier.description}</p>

                <div className="mb-8">
                  <div className="mb-3 flex items-baseline gap-1">
                    <span className="font-display text-4xl font-bold">{tier.price}</span>
                    <span className="text-sm text-muted-foreground">{tier.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{tier.managers}</p>
                  {tier.addon && (
                    <p className="mt-4 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
                      {tier.addon}
                    </p>
                  )}
                </div>

                <Button
                  className="mb-8 h-12 w-full rounded-full"
                  variant={tier.highlighted ? 'default' : 'outline'}
                  asChild
                >
                  <Link href={ROUTES.contact} className="group/cta">
                    {tier.cta}
                    <ArrowRight
                      className="ml-1.5 h-4 w-4 transition-transform group-hover/cta:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>

                <div className="flex-1 space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Features included
                  </p>
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-12 text-center text-sm text-muted-foreground">
          Questions about plans?{' '}
          <Link href={ROUTES.faq} className="font-medium text-primary hover:underline">
            Read the FAQ
          </Link>{' '}
          or{' '}
          <Link href={ROUTES.contact} className="font-medium text-primary hover:underline">
            talk to us
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
