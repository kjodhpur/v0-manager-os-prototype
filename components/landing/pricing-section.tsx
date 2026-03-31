"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const pricingTiers = [
  {
    name: "Starter",
    description: "Perfect for small teams exploring employee wellbeing",
    price: "$299",
    period: "/month",
    features: [
      "Up to 25 team members",
      "Core wellbeing metrics",
      "Basic dashboard",
      "Email support",
      "Weekly digest reports",
    ],
    highlighted: false,
    cta: "Start Free Trial",
  },
  {
    name: "Professional",
    description: "For growing teams needing advanced insights",
    price: "$799",
    period: "/month",
    features: [
      "Up to 250 team members",
      "Advanced AI insights & patterns",
      "Custom dashboards",
      "Priority email & chat support",
      "Real-time alerts for at-risk members",
      "Team segmentation & analytics",
      "Manager coaching recommendations",
      "SSO & SAML integration",
    ],
    highlighted: true,
    cta: "Get Started",
  },
  {
    name: "Enterprise",
    description: "For large organizations with custom needs",
    price: "Custom",
    period: "pricing",
    features: [
      "Unlimited team members",
      "White-label solutions",
      "Advanced compliance & audit logs",
      "Dedicated account manager",
      "Custom API integrations",
      "Advanced reporting & exports",
      "On-premises deployment option",
      "SLA guarantees",
    ],
    highlighted: false,
    cta: "Contact Sales",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 lg:py-32 px-6 lg:px-12 overflow-hidden bg-gradient-to-b from-transparent via-primary/5 to-transparent">
      {/* Background gradient accent */}
      <motion.div
        className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        animate={{
          y: [0, 30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-4">
            Simple, Transparent
            <br />
            <span className="text-gradient">Pricing Plans</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Start free, scale as you grow. All plans include core analytics and AI-powered insights.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {pricingTiers.map((tier, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group relative h-full"
            >
              {/* Highlight accent for Professional tier */}
              {tier.highlighted && (
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-br from-primary/40 to-accent/40 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              )}

              {/* Card */}
              <div
                className={`relative h-full rounded-2xl border backdrop-blur-sm p-8 flex flex-col transition-all duration-300 ${
                  tier.highlighted
                    ? "border-primary/50 bg-gradient-to-br from-card/80 to-card/40 shadow-lg hover:shadow-xl hover:shadow-primary/20"
                    : "border-border/50 bg-gradient-to-br from-card/40 to-card/20 hover:border-primary/30 hover:shadow-lg"
                }`}
                style={{
                  boxShadow: tier.highlighted
                    ? "0 0 40px rgba(139, 168, 240, 0.15)"
                    : "0 0 24px rgba(139, 168, 240, 0.05)",
                }}
              >
                {/* Top tier badge */}
                {tier.highlighted && (
                  <div className="flex justify-center mb-6">
                    <span className="px-4 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/40">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Tier name and description */}
                <h3 className="text-2xl font-display font-bold mb-2">
                  {tier.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {tier.description}
                </p>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-display font-bold">
                      {tier.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {tier.period}
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full mb-8 h-11 rounded-full transition-all ${
                    tier.highlighted
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "border border-primary/30 text-foreground hover:bg-primary/5 hover:border-primary/60"
                  }`}
                  variant={tier.highlighted ? "default" : "outline"}
                  asChild
                >
                  <button className="group inline-flex items-center justify-center gap-2">
                    {tier.cta}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </Button>

                {/* Features list */}
                <div className="space-y-4 flex-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Features Included
                  </p>
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIdx) => (
                      <li
                        key={featureIdx}
                        className="flex items-start gap-3 text-sm"
                      >
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section below pricing */}
        <motion.div
          className="mt-20 pt-20 border-t border-border/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-display font-bold text-center mb-12">
            Frequently Asked Questions
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                q: "Can I change plans anytime?",
                a: "Yes, upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle.",
              },
              {
                q: "Is there a free trial?",
                a: "All plans come with a 14-day free trial. No credit card required to get started.",
              },
              {
                q: "What happens if I exceed team size?",
                a: "Simply upgrade to the next tier. You'll only be charged for the new plan on your renewal date.",
              },
              {
                q: "Do you offer annual discounts?",
                a: "Yes! Annual plans include 20% savings. Contact our sales team for Enterprise discounts.",
              },
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                className="p-6 border border-border/30 rounded-lg bg-card/30 hover:border-primary/30 transition-colors"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.1 * idx }}
                viewport={{ once: true }}
              >
                <h4 className="font-semibold mb-2">{faq.q}</h4>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
