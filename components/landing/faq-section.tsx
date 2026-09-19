'use client';

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    q: "Is this surveillance?",
    a: "No. HeartMetrics reads work-system signals like tasks, meetings, and assignments. It does not read private messages, monitor keystrokes, or track screen time. It's designed to help managers, not monitor employees.",
  },
  {
    q: "What tools does it connect to?",
    a: "Currently, HeartMetrics integrates with Jira, Asana, and Salesforce. More integrations are planned. All data access is clearly scoped and disclosed.",
  },
  {
    q: "Who can see what?",
    a: "Managers see team-level and individual dashboards. Employees can see their own data. Aggregate-only mode is available if your organization prefers it. Admins control all visibility settings.",
  },
  {
    q: "How are scores calculated?",
    a: "Every score is explainable. The Work Wellbeing Index is built on the U.S. Surgeon General's five essentials for workplace well-being: Protection from Harm, Work-Life Harmony, Connection & Community, Mattering at Work, and Opportunity for Growth. Learn more on our methodology page.",
    link: "/how-we-calculate",
  },
  {
    q: "What about privacy?",
    a: "Privacy is our core principle. We use work-system signals only, implement encryption at rest and in transit, follow least-privilege access, and give users controls over their data visibility.",
  },
];

function FAQItem({ faq, index, isOpen, onToggle }: { 
  faq: typeof faqs[0]; 
  index: number; 
  isOpen: boolean; 
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-trigger-${index}`;

  // Re-measure on resize too: a height captured once goes stale and clips the
  // answer when the viewport or font size changes while the item is open.
  useEffect(() => {
    const measure = () => {
      if (contentRef.current) setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    };
    measure();
    if (!isOpen) return;
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [isOpen]);

  return (
    <div className="border-b border-border">
      <button
        id={buttonId}
        className="group flex w-full items-center justify-between gap-4 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-lg font-medium text-foreground group-hover:translate-x-1 transition-transform duration-300">
            {faq.q}
          </span>
        </div>
        <ChevronDown
          aria-hidden="true"
          className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="overflow-hidden transition-[height] duration-300"
        style={{ height }}
      >
        <div ref={contentRef} className="pb-6 pl-10">
          <p className="text-muted-foreground leading-relaxed max-w-3xl">{faq.a}</p>
          {faq.link && (
            <Link 
              href={faq.link} 
              className="inline-flex items-center gap-2 mt-3 text-sm text-primary hover:underline font-medium"
            >
              Learn more about our methodology
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
    <section 
      id="faq" 
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-border" />
            FAQ
            <span className="w-8 h-px bg-border" />
          </span>
          <h2
            className={`text-4xl lg:text-5xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Questions <span className="text-gradient">answered.</span>
          </h2>
        </div>

        {/* FAQ List */}
        <div 
          className={`transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.q}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
