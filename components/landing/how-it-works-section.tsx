"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "I",
    title: "Connect your tools",
    description: "Link Jira, Asana, or Salesforce. HeartMetrics reads work-system signals only, never private messages.",
  },
  {
    number: "II",
    title: "See wellbeing & fairness",
    description: "Get a clear dashboard showing team health, work distribution, and recognition patterns in real-time.",
  },
  {
    number: "III",
    title: "Take recommended actions",
    description: "Follow AI-powered suggestions to reduce overload, recognize invisible work, and rotate opportunities.",
  },
];

const whiCategories = [
  {
    name: "Work-Life Balance",
    color: "#00B8A0",
    bg: "rgba(0,184,160,0.08)",
    border: "rgba(0,184,160,0.25)",
    inputs: ["Workload", "Outside work %", "Meeting hrs", "Blocked tickets", "Time since last PTO"],
  },
  {
    name: "Recognition",
    color: "#FFB347",
    bg: "rgba(255,179,71,0.08)",
    border: "rgba(255,179,71,0.25)",
    inputs: ["No. of recognitions", "No. of shoutouts"],
  },
  {
    name: "Connection & Community",
    color: "#5DD67A",
    bg: "rgba(93,214,122,0.08)",
    border: "rgba(93,214,122,0.25)",
    inputs: ["Feedback", "Team building events", "1:1 cadence"],
  },
  {
    name: "Opportunity for Growth",
    color: "#8BA8F0",
    bg: "rgba(139,168,240,0.08)",
    border: "rgba(139,168,240,0.25)",
    inputs: ["Allocation of work", "Leadership opportunities", "Visibility opportunities"],
  },
  {
    name: "Safety",
    color: "#FF6B6B",
    bg: "rgba(255,107,107,0.08)",
    border: "rgba(255,107,107,0.25)",
    inputs: ["Physical safety incidents"],
  },
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-gradient-to-br from-primary/20 via-card to-accent/10 text-foreground overflow-hidden"
    >
      {/* Diagonal lines pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            currentColor 40px,
            currentColor 41px
          )`
        }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-border" />
            Process
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Three steps.
            <br />
            <span className="text-gradient">Healthier teams.</span>
          </h2>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Steps */}
          <div className="space-y-0">
            {steps.map((step, index) => (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStep(index)}
                className={`w-full text-left py-8 border-b border-border transition-all duration-500 group ${
                  activeStep === index ? "opacity-100" : "opacity-40 hover:opacity-70"
                }`}
              >
                <div className="flex items-start gap-6">
                  <span className="font-display text-3xl text-primary/60">{step.number}</span>
                  <div className="flex-1">
                    <h3 className="text-2xl lg:text-3xl font-display mb-3 group-hover:translate-x-2 transition-transform duration-300">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>

                    {/* Progress indicator */}
                    {activeStep === index && (
                      <div className="mt-4 h-px bg-border overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary via-ring to-accent w-0"
                          style={{ animation: "progress 5s linear forwards" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* WHI Categories panel */}
          <div className="lg:sticky lg:top-32 self-start">
            <div className="border border-border rounded-xl overflow-hidden bg-card/80 backdrop-blur-sm">
              {/* Panel header */}
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">Work Happiness Index</p>
                  <p className="text-xs text-muted-foreground mt-0.5">5 Surgeon General dimensions</p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full border border-border text-muted-foreground">
                  WHI Score
                </span>
              </div>

              {/* Categories */}
              <div className="p-5 space-y-3">
                {whiCategories.map((cat) => (
                  <div
                    key={cat.name}
                    className="rounded-[10px] p-4"
                    style={{ backgroundColor: cat.bg, border: `1px solid ${cat.border}` }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: cat.color }}
                      />
                      <p className="text-sm font-semibold" style={{ color: cat.color }}>
                        {cat.name}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.inputs.map((input) => (
                        <span
                          key={input}
                          className="text-xs px-2 py-0.5 rounded-full bg-background/60 text-muted-foreground border border-border"
                        >
                          {input}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-border flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-mono text-muted-foreground">
                  Quantitative + qualitative signals combined
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}
