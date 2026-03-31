import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { ECGCanvas } from "@/components/landing/ecg-canvas";
import { SocialProofBar } from "@/components/landing/social-proof-bar";
import { StorySection } from "@/components/landing/story-section";
import { TimelineScrubber } from "@/components/landing/timeline-scrubber";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { MetricsSection } from "@/components/landing/metrics-section";
import { SecuritySection } from "@/components/landing/security-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { FAQSection } from "@/components/landing/faq-section";
import { TeamSection } from "@/components/landing/team-section";
import { AccoladesSection } from "@/components/landing/accolades-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <div className="py-12 px-4">
        <ECGCanvas />
      </div>
      <SocialProofBar />
      <StorySection />
      <div className="py-20 px-4">
        <TimelineScrubber />
      </div>
      <FeaturesSection />
      <HowItWorksSection />
      <MetricsSection />
      <AccoladesSection />
      <TeamSection />
      <SecuritySection />
      <TestimonialsSection />
      <FAQSection />
      <PricingSection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
