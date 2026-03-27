"use client";

import { useEffect, useRef, useState } from "react";
import { HeartPulse, Scale, Eye, Users } from "lucide-react";

const features = [
  {
    number: "01",
    icon: HeartPulse,
    title: "Burnout Detection",
    description: "Detect workload imbalances and overload before they become retention risks. AI-powered signals alert you to team members who need support.",
    visual: "burnout",
  },
  {
    number: "02",
    icon: Eye,
    title: "Invisible Work Recognition",
    description: "Surface contributions that often go unnoticed: firefighting, admin tasks, and operational support that keeps teams running.",
    visual: "invisible",
  },
  {
    number: "03",
    icon: Scale,
    title: "Fairness Analytics",
    description: "Ensure stretch assignments, recognition, and support are distributed equitably across your team without bias.",
    visual: "fairness",
  },
  {
    number: "04",
    icon: Users,
    title: "Trust & Transparency",
    description: "Every score is explainable with clear reasoning. Built on privacy-first principles with user controls for visibility.",
    visual: "trust",
  },
];

function BurnoutVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* Heart monitor line */}
      <path
        d="M 20 80 L 40 80 L 50 60 L 60 100 L 70 40 L 80 120 L 90 80 L 180 80"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <animate
          attributeName="stroke-dasharray"
          values="0 500;500 0"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>
      
      {/* Pulse point */}
      <circle cx="70" cy="40" r="4" fill="currentColor">
        <animate attributeName="r" values="4;8;4" dur="1s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite" />
      </circle>
      
      {/* Status indicator */}
      <circle cx="160" cy="80" r="8" fill="none" stroke="currentColor" strokeWidth="2">
        <animate attributeName="r" values="8;16;8" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function InvisibleVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* Hidden work layers */}
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={40 + i * 10}
          y={40 + i * 15}
          width="100"
          height="60"
          rx="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity={0.3 + i * 0.25}
        >
          <animate
            attributeName="opacity"
            values={`${0.3 + i * 0.25};${0.6 + i * 0.15};${0.3 + i * 0.25}`}
            dur={`${2 + i * 0.5}s`}
            repeatCount="indefinite"
          />
        </rect>
      ))}
      
      {/* Spotlight */}
      <circle cx="100" cy="80" r="30" fill="none" stroke="currentColor" strokeWidth="2">
        <animate attributeName="r" values="20;40;20" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0.2;0.8" dur="3s" repeatCount="indefinite" />
      </circle>
      
      {/* Eye icon */}
      <ellipse cx="100" cy="80" rx="20" ry="12" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="100" cy="80" r="6" fill="currentColor">
        <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function FairnessVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* Scale base */}
      <line x1="100" y1="130" x2="100" y2="50" stroke="currentColor" strokeWidth="2" />
      <rect x="80" y="130" width="40" height="8" rx="2" fill="currentColor" />
      
      {/* Scale beam */}
      <line x1="40" y1="50" x2="160" y2="50" stroke="currentColor" strokeWidth="2">
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 100 50;5 100 50;-5 100 50;0 100 50"
          dur="4s"
          repeatCount="indefinite"
        />
      </line>
      
      {/* Left pan */}
      <g>
        <line x1="40" y1="50" x2="40" y2="70" stroke="currentColor" strokeWidth="1.5" />
        <path d="M 25 70 Q 40 85 55 70" fill="none" stroke="currentColor" strokeWidth="2" />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0;0 5;0 -5;0 0"
          dur="4s"
          repeatCount="indefinite"
        />
      </g>
      
      {/* Right pan */}
      <g>
        <line x1="160" y1="50" x2="160" y2="70" stroke="currentColor" strokeWidth="1.5" />
        <path d="M 145 70 Q 160 85 175 70" fill="none" stroke="currentColor" strokeWidth="2" />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0;0 -5;0 5;0 0"
          dur="4s"
          repeatCount="indefinite"
        />
      </g>
      
      {/* Balance indicator */}
      <circle cx="100" cy="50" r="6" fill="currentColor">
        <animate attributeName="fill-opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function TrustVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* Shield */}
      <path
        d="M 100 20 L 150 40 L 150 90 Q 150 130 100 145 Q 50 130 50 90 L 50 40 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      
      {/* Inner shield glow */}
      <path
        d="M 100 35 L 135 50 L 135 85 Q 135 115 100 128 Q 65 115 65 85 L 65 50 Z"
        fill="currentColor"
        opacity="0.1"
      >
        <animate attributeName="opacity" values="0.1;0.25;0.1" dur="2s" repeatCount="indefinite" />
      </path>
      
      {/* Check mark */}
      <path
        d="M 75 80 L 95 100 L 130 60"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <animate
          attributeName="stroke-dasharray"
          values="0 100;100 0"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </path>
      
      {/* Trust rings */}
      <circle cx="100" cy="82" r="50" fill="none" stroke="currentColor" strokeWidth="1" opacity="0">
        <animate attributeName="r" values="40;70" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function AnimatedVisual({ type }: { type: string }) {
  switch (type) {
    case "burnout":
      return <BurnoutVisual />;
    case "invisible":
      return <InvisibleVisual />;
    case "fairness":
      return <FairnessVisual />;
    case "trust":
      return <TrustVisual />;
    default:
      return <BurnoutVisual />;
  }
}

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const Icon = feature.icon;

  return (
    <div
      ref={cardRef}
      className={`group relative transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 py-12 lg:py-20 border-b border-foreground/10">
        {/* Number & Icon */}
        <div className="shrink-0 flex items-center gap-4">
          <span className="font-mono text-sm text-muted-foreground">{feature.number}</span>
          <div className="w-10 h-10 flex items-center justify-center border border-foreground/10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
            <Icon className="w-5 h-5" />
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-3xl lg:text-4xl font-display mb-4 group-hover:translate-x-2 transition-transform duration-500">
              {feature.title}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
          
          {/* Visual */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-48 h-40 text-primary">
              <AnimatedVisual type={feature.visual} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturesSection() {
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

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Capabilities
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Great managers care.
            <br />
            <span className="text-muted-foreground">Now they can see.</span>
          </h2>
        </div>

        {/* Features List */}
        <div>
          {features.map((feature, index) => (
            <FeatureCard key={feature.number} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
