"use client";

import { useEffect, useState, useRef } from "react";
import { ShieldCheck, Eye, Zap, Lock, Users } from "lucide-react";

const securityFeatures = [
  {
    icon: ShieldCheck,
    title: "Work-system signals only",
    description: "Reads tasks, meetings, and assignments. Never monitors keystrokes or screen time.",
  },
  {
    icon: Eye,
    title: "No private message access",
    description: "HeartMetrics does not read Slack DMs, emails, or any private communications by default.",
  },
  {
    icon: Zap,
    title: "Explainable scores",
    description: "Every metric comes with clear reasoning. Click 'why this score' to see the breakdown.",
  },
  {
    icon: Lock,
    title: "Encryption everywhere",
    description: "AES-256 encryption at rest and TLS 1.3 in transit. Least-privilege access controls.",
  },
  {
    icon: Users,
    title: "User visibility controls",
    description: "Employees control their data visibility. Aggregate-only mode available for organizations.",
  },
];

const principles = ["Privacy-First", "Ethical AI", "Transparent", "No Surveillance", "User-Controlled"];

export function SecuritySection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section id="security" ref={sectionRef} className="relative py-24 lg:py-32 bg-secondary/30 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Privacy & Ethics
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              Built on trust,
              <br />
              not surveillance.
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              Every design decision prioritizes your team&apos;s privacy and psychological safety.
              HeartMetrics is designed to help managers, not monitor employees.
            </p>

            {/* Principles */}
            <div className="flex flex-wrap gap-3">
              {principles.map((principle, index) => (
                <span
                  key={principle}
                  className={`px-4 py-2 border border-foreground/10 bg-background text-sm font-mono transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 50 + 200}ms` }}
                >
                  {principle}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Features */}
          <div className="grid gap-4">
            {securityFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className={`p-6 border border-foreground/10 bg-background hover:border-primary/30 transition-all duration-500 group ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 flex items-center justify-center border border-foreground/10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1 group-hover:translate-x-1 transition-transform duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
