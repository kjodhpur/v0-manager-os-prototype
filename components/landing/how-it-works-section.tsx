"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "I",
    title: "Connect your tools",
    description: "Link Jira, Asana, or Salesforce. HeartMetrics reads work-system signals only, never private messages.",
    code: `import { heartmetrics } from '@heartmetrics/sdk'

heartmetrics.connect({
  source: 'jira',
  workspace: 'your-team',
  privacy: 'work-signals-only'
})`,
  },
  {
    number: "II",
    title: "See wellbeing & fairness",
    description: "Get a clear dashboard showing team health, work distribution, and recognition patterns in real-time.",
    code: `heartmetrics.dashboard({
  metrics: [
    'work-happiness-index',
    'burnout-risk',
    'fairness-score'
  ],
  view: 'team-overview'
})`,
  },
  {
    number: "III",
    title: "Take recommended actions",
    description: "Follow AI-powered suggestions to reduce overload, recognize invisible work, and rotate opportunities.",
    code: `heartmetrics.actions({
  type: 'ai-recommendations',
  priority: 'high-risk-first'
})

// 3 team members need attention`,
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
      className="relative py-24 lg:py-32 bg-primary text-primary-foreground overflow-hidden"
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
          <span className="inline-flex items-center gap-3 text-sm font-mono text-primary-foreground/60 mb-6">
            <span className="w-8 h-px bg-primary-foreground/30" />
            Process
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Three steps.
            <br />
            <span className="text-primary-foreground/60">Healthier teams.</span>
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
                className={`w-full text-left py-8 border-b border-primary-foreground/10 transition-all duration-500 group ${
                  activeStep === index ? "opacity-100" : "opacity-40 hover:opacity-70"
                }`}
              >
                <div className="flex items-start gap-6">
                  <span className="font-display text-3xl text-primary-foreground/40">{step.number}</span>
                  <div className="flex-1">
                    <h3 className="text-2xl lg:text-3xl font-display mb-3 group-hover:translate-x-2 transition-transform duration-300">
                      {step.title}
                    </h3>
                    <p className="text-primary-foreground/70 leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Progress indicator */}
                    {activeStep === index && (
                      <div className="mt-4 h-px bg-primary-foreground/20 overflow-hidden">
                        <div 
                          className="h-full bg-primary-foreground w-0"
                          style={{
                            animation: 'progress 5s linear forwards'
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Code display */}
          <div className="lg:sticky lg:top-32 self-start">
            <div className="border border-primary-foreground/10 overflow-hidden bg-primary-foreground/5">
              {/* Window header */}
              <div className="px-6 py-4 border-b border-primary-foreground/10 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary-foreground/20" />
                  <div className="w-3 h-3 rounded-full bg-primary-foreground/20" />
                  <div className="w-3 h-3 rounded-full bg-primary-foreground/20" />
                </div>
                <span className="text-xs font-mono text-primary-foreground/40">setup.ts</span>
              </div>

              {/* Code content */}
              <div className="p-8 font-mono text-sm min-h-[280px]">
                <pre className="text-primary-foreground/80">
                  {steps[activeStep].code.split('\n').map((line, lineIndex) => (
                    <div 
                      key={`${activeStep}-${lineIndex}`} 
                      className="leading-loose code-line-reveal"
                      style={{ 
                        animationDelay: `${lineIndex * 80}ms`,
                      }}
                    >
                      <span className="text-primary-foreground/30 select-none w-8 inline-block">{lineIndex + 1}</span>
                      <span className="inline-flex">
                        {line.split('').map((char, charIndex) => (
                          <span
                            key={`${activeStep}-${lineIndex}-${charIndex}`}
                            className="code-char-reveal"
                            style={{
                              animationDelay: `${lineIndex * 80 + charIndex * 15}ms`,
                            }}
                          >
                            {char === ' ' ? '\u00A0' : char}
                          </span>
                        ))}
                      </span>
                    </div>
                  ))}
                </pre>
              </div>

              {/* Status */}
              <div className="px-6 py-4 border-t border-primary-foreground/10 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-mono text-primary-foreground/50">Connected</span>
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
        
        .code-line-reveal {
          opacity: 0;
          transform: translateX(-8px);
          animation: lineReveal 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        
        @keyframes lineReveal {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .code-char-reveal {
          opacity: 0;
          filter: blur(8px);
          animation: charReveal 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        
        @keyframes charReveal {
          to {
            opacity: 1;
            filter: blur(0);
          }
        }
      `}</style>
    </section>
  );
}
