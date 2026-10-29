import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";

import { HeroSection } from "@/components/landing/hero-section";
import { SocialProofBar } from "@/components/landing/social-proof-bar";
import { SevenWeeks } from "@/components/landing/seven-weeks";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { MetricsSection } from "@/components/landing/metrics-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { SecuritySection } from "@/components/landing/security-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { FAQSection } from "@/components/landing/faq-section";
import { TeamSection } from "@/components/landing/team-section";
import { CtaSection } from "@/components/landing/cta-section";

/**
 * The page is ordered as an argument, not a feature list:
 *   problem → the pattern → how we read it → what you get → can we be trusted
 *   → the evidence → what it costs → questions → who built it → act.
 *
 * It used to run to fifteen sections and ~20,000px on a phone. Sections that
 * were restating each other have been folded together; the ECG strip now lives
 * inside the security section where the "signals, not surveillance" point is
 * actually being made, rather than floating between two unrelated blocks.
 */
export default function Home() {
  return (
    <>
      <SiteHeader />
      {/*
        overflow-x-clip, not -hidden: `hidden` establishes a scroll container,
        which silently breaks `position: sticky` in any descendant — it pinned
        the Seven Weeks section to a scrollport nobody could see, and the
        section rendered blank. `clip` clips without that side effect.
      */}
      <main id="main" className="relative overflow-x-clip">
        <HeroSection />
        <SocialProofBar />
        <SevenWeeks />
        <HowItWorksSection />
        <MetricsSection />
        <FeaturesSection />
        <SecuritySection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <TeamSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
