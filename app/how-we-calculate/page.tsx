"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Heart, 
  Users, 
  Star, 
  TrendingUp, 
  ChevronDown,
  ExternalLink,
  Check,
  X,
  Calendar,
  MessageSquare,
  BarChart3,
  Clock,
  Award,
  Briefcase,
  ArrowRight,
  Info
} from "lucide-react";
import Link from "next/link";

// ===== SECTION 1: HERO =====
function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              METHODOLOGY
              <span className="w-8 h-px bg-foreground/30" />
            </span>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-display tracking-tight mb-6 text-balance">
              Every Score Is Explainable
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
              HeartMetrics is grounded in the U.S. Surgeon General&apos;s Framework for Workplace Mental Health &amp; Well-Being — the most comprehensive, evidence-based standard for what workers actually need to thrive. We translate its five essentials into real-time, measurable signals from the tools your team already uses. No surveys required. No black boxes.
            </p>
            <a 
              href="https://www.hhs.gov/surgeongeneral/priorities/workplace-well-being/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              Read the Surgeon General&apos;s Framework
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Right: 5-Petal Framework Diagram */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <FivePetalDiagram />
            <p className="text-center text-xs text-muted-foreground mt-4">
              Based on the U.S. Surgeon General&apos;s Framework for Workplace Mental Health &amp; Well-Being (2022)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Five Petal Diagram Component
function FivePetalDiagram() {
  const [hoveredPetal, setHoveredPetal] = useState<string | null>(null);
  
  const petals = [
    { id: "protection", label: "Protection from Harm", angle: -90, color: "#c0392b" },
    { id: "harmony", label: "Work-Life Harmony", angle: -18, color: "#e67e22" },
    { id: "connection", label: "Connection & Community", angle: 54, color: "#27ae60" },
    { id: "mattering", label: "Mattering at Work", angle: 126, color: "#2980b9" },
    { id: "growth", label: "Opportunity for Growth", angle: 198, color: "#8e44ad" },
  ];

  return (
    <div className="relative w-full max-w-md mx-auto aspect-square">
      <svg viewBox="0 0 400 400" className="w-full h-full">
        {/* Center circle */}
        <circle cx="200" cy="200" r="50" fill="var(--background)" stroke="var(--foreground)" strokeWidth="2" />
        <text x="200" y="195" textAnchor="middle" className="text-xs fill-foreground font-medium">Worker Voice</text>
        <text x="200" y="210" textAnchor="middle" className="text-xs fill-foreground font-medium">&amp; Equity</text>

        {/* Petals */}
        {petals.map((petal) => {
          const radians = (petal.angle * Math.PI) / 180;
          const petalCenterX = 200 + Math.cos(radians) * 120;
          const petalCenterY = 200 + Math.sin(radians) * 120;
          const isHovered = hoveredPetal === petal.id;
          
          return (
            <g 
              key={petal.id}
              onMouseEnter={() => setHoveredPetal(petal.id)}
              onMouseLeave={() => setHoveredPetal(null)}
              className="cursor-pointer transition-all duration-300"
              style={{ transform: isHovered ? `scale(1.05)` : "scale(1)", transformOrigin: `${petalCenterX}px ${petalCenterY}px` }}
            >
              <ellipse
                cx={petalCenterX}
                cy={petalCenterY}
                rx="70"
                ry="45"
                transform={`rotate(${petal.angle + 90}, ${petalCenterX}, ${petalCenterY})`}
                fill={petal.color}
                opacity={isHovered ? 1 : 0.8}
                className="transition-opacity duration-300"
              />
              <text
                x={petalCenterX}
                y={petalCenterY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-[10px] fill-white font-medium pointer-events-none"
                style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
              >
                {petal.label.split(" ").map((word, i, arr) => (
                  <tspan key={i} x={petalCenterX} dy={i === 0 ? -arr.length * 5 + 5 : 12}>
                    {word}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ===== SECTION 2: FIVE ESSENTIALS =====
const essentials = [
  {
    id: "protection",
    icon: Shield,
    title: "Protection from Harm",
    color: "#c0392b",
    surgeonGeneral: "Workers need physical and psychological safety, with normalized mental health support and adequate rest.",
    metrics: [
      { name: "Workload manageability", description: "Is the employee's task volume sustainable within standard hours?", mapping: "Enable Adequate Rest", signal: "My work is manageable" },
      { name: "After-hours work signals", description: "Are they being expected to work beyond normal hours?", mapping: "Enable Adequate Rest", signal: "I am often expected to work beyond my normal hours" },
      { name: "Mental health support accessibility", description: "Does the organization communicate available resources?", mapping: "Normalize & Support Mental Health", signal: null },
      { name: "Burnout comfort signals", description: "Would the employee feel comfortable seeking support if struggling?", mapping: "Psychological safety around stress/burnout", signal: null },
      { name: "DEIA signals", description: "Does the employee feel respected and valued regardless of background?", mapping: "Operationalize DEIA", signal: null },
    ],
    dataSources: "Task volume vs. capacity from Jira/Asana, after-hours commit/message timestamps, calendar events outside business hours, pulse survey responses on workload manageability."
  },
  {
    id: "harmony",
    icon: Heart,
    title: "Work-Life Harmony",
    color: "#e67e22",
    surgeonGeneral: "Workers need autonomy, schedule predictability, and respected boundaries between work and personal time.",
    metrics: [
      { name: "Boundary respect", description: "Can the employee disconnect from work during non-work hours without negative consequences?", mapping: null, signal: "I am able to disconnect from work during non-work hours without negative consequences" },
      { name: "Workload within standard hours", description: "Is the workload manageable within normal working hours?", mapping: null, signal: "My workload is manageable within my standard working hours" },
      { name: "Schedule predictability", description: "Is the schedule predictable enough to plan personal life?", mapping: null, signal: "My schedule is predictable enough for me to plan my personal life" },
      { name: "Autonomy", description: "Does the employee have control over how and when they complete work?", mapping: null, signal: "I feel I have adequate control over how and when I complete my work" },
    ],
    dataSources: "Calendar density and after-hours meeting patterns, time-in-status for tasks, meeting hours/day vs. team average, pulse survey responses on autonomy and boundaries."
  },
  {
    id: "connection",
    icon: Users,
    title: "Connection & Community",
    color: "#27ae60",
    surgeonGeneral: "Workers need cultures of inclusion, trusted relationships, and collaboration and teamwork.",
    metrics: [
      { name: "Inclusion & belonging", description: "Does the manager cultivate environments where culture and connection are encouraged?", mapping: "Cultures of inclusion", signal: null },
      { name: "Trusted relationships", description: "Does the employee have someone comfortable to reach out to about professional or personal issues?", mapping: "Trusted relationships", signal: null },
      { name: "Collaboration frequency", description: "How often does the employee communicate with their manager and team?", mapping: "Collaboration and teamwork", signal: null },
      { name: "Prosocial behaviors", description: "Do positive social relationships exist — welcoming, helping, reassuring others?", mapping: null, signal: null },
      { name: "Bias & discrimination response", description: "Would the manager react appropriately to bias, discrimination, or exclusion?", mapping: null, signal: null },
    ],
    dataSources: "Communication frequency signals from Slack/Teams (metadata only — never message content), meeting patterns, collaboration tool activity, pulse survey responses on trust and inclusion."
  },
  {
    id: "mattering",
    icon: Star,
    title: "Mattering at Work",
    color: "#2980b9",
    surgeonGeneral: "Workers need dignity, recognition, voice in decisions, and a sense of purpose. This is the core of recognition gap signals.",
    metrics: [
      { name: "Recognition frequency", description: "Has the employee received meaningful recognition for contributions in the past month?", mapping: null, signal: "In the past month, I received meaningful recognition for my contributions" },
      { name: "Valued as a person", description: "Does the employee feel valued as a team member, not just for what they produce?", mapping: null, signal: "I feel valued as a member of my team, not just for what I produce, but as a person" },
      { name: "Voice in decisions", description: "Is the employee's input considered when decisions affect their work?", mapping: null, signal: "My input is considered when decisions are made that affect my work" },
      { name: "Purpose & mission connection", description: "Does the employee feel their work connects to a larger organizational mission?", mapping: null, signal: "I feel that my work connects to a larger organizational mission or goal" },
      { name: "Types of recognized work", description: "Are all types of contributions valued — high-impact projects, maintenance, firefighting, and mentoring?", mapping: null, signal: null },
    ],
    dataSources: "Recognition events from Slack kudos channels, peer feedback tools, time-since-last-recognition tracker (flags 30+ day gaps), pulse survey responses."
  },
  {
    id: "growth",
    icon: TrendingUp,
    title: "Opportunity for Growth",
    color: "#8e44ad",
    surgeonGeneral: "Workers need quality training, education, mentoring, and clear, equitable pathways for career advancement.",
    metrics: [
      { name: "Learning opportunities", description: "Does the company provide opportunities to learn outside of work (higher education, certifications)?", mapping: null, signal: null },
      { name: "Resource access", description: "Does the organization provide resources and tools to support daily work?", mapping: null, signal: null },
      { name: "Career pathway transparency", description: "Are career advancement pathways and promotion opportunities clearly communicated?", mapping: null, signal: null },
      { name: "Feedback quality", description: "Is feedback a balanced mix of positive and constructive, with specific actionable next steps?", mapping: null, signal: null },
      { name: "Stretch assignment distribution", description: "What percentage of the employee's work is stretch/growth work vs. routine?", mapping: null, signal: null },
      { name: "Retention intent", description: "Would the employee stay at the company for the next 1-3 years?", mapping: null, signal: null },
    ],
    dataSources: "Task variety analysis from project tools (% stretch vs. routine assignments), career-advancing assignment tracking, pulse survey responses on growth and development."
  },
];

function FiveEssentialsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeEssential, setActiveEssential] = useState<string>("protection");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const activeData = essentials.find(e => e.id === activeEssential)!;
  const IconComponent = activeData.icon;

  return (
    <section id="five-essentials" ref={sectionRef} className="relative py-24 lg:py-32 bg-muted/30">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            WORK WELLBEING INDEX
            <span className="w-8 h-px bg-foreground/30" />
          </span>
          <h2 className="text-3xl lg:text-4xl font-display tracking-tight mb-4">
            Five Research-Backed Dimensions. One Score.
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            The Work Wellbeing Index (WWI) is a composite 0–100 score built from five dimensions, each mapped directly to one of the Surgeon General&apos;s five essentials for workplace well-being. Higher = healthier.
          </p>
        </div>

        {/* Essential Tabs */}
        <div className={`mb-8 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex flex-wrap justify-center gap-2">
            {essentials.map((essential) => {
              const Icon = essential.icon;
              return (
                <button
                  key={essential.id}
                  onClick={() => setActiveEssential(essential.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeEssential === essential.id
                      ? "text-white shadow-lg"
                      : "bg-background text-foreground hover:bg-accent"
                  }`}
                  style={{ backgroundColor: activeEssential === essential.id ? essential.color : undefined }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{essential.title}</span>
                  <span className="sm:hidden">{essential.title.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Essential Content */}
        <div className={`bg-card rounded-2xl border border-border p-6 lg:p-8 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-start gap-4 mb-6">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0"
              style={{ backgroundColor: activeData.color }}
            >
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{activeData.title}</h3>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">What the Surgeon General says:</span> {activeData.surgeonGeneral}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
              What HeartMetrics Measures
            </h4>
            <div className="space-y-4">
              {activeData.metrics.map((metric, i) => (
                <div key={i} className="bg-muted/50 rounded-lg p-4">
                  <div className="font-medium mb-1">{metric.name}</div>
                  <div className="text-sm text-muted-foreground mb-2">{metric.description}</div>
                  {(metric.mapping || metric.signal) && (
                    <div className="text-xs space-y-1">
                      {metric.mapping && (
                        <div className="text-primary">Maps to: &quot;{metric.mapping}&quot;</div>
                      )}
                      {metric.signal && (
                        <div className="text-chart-2 italic">Survey signal: &quot;{metric.signal}&quot;</div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="font-medium mb-2 text-sm">Data Sources</h4>
            <p className="text-sm text-muted-foreground">{activeData.dataSources}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== WWI FORMULA & THRESHOLDS =====
function WWIFormulaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="py-16 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Formula */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h3 className="text-xl lg:text-2xl font-display mb-6">How the Dimensions Combine into the WWI</h3>
          <div className="bg-card border border-border rounded-xl p-6 lg:p-8 inline-block font-mono text-sm lg:text-base overflow-x-auto max-w-full">
            <code className="text-foreground whitespace-nowrap">
              WWI = w<sub>1</sub>(Protection) + w<sub>2</sub>(Harmony) + w<sub>3</sub>(Connection) + w<sub>4</sub>(Mattering) + w<sub>5</sub>(Growth)
            </code>
          </div>
          <p className="text-sm text-muted-foreground mt-4 max-w-2xl mx-auto">
            Each essential produces a sub-score of 0–100. These are combined via weighted aggregation into the final WWI (0–100).
          </p>
        </div>

        {/* Note */}
        <div className={`bg-accent/50 border border-border rounded-xl p-6 mb-12 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-foreground">
              <span className="font-semibold">Important:</span> Weights are calibrated based on our primary research with tech workers at companies of 50–500 employees, validated against retention outcomes. We continuously refine weights as we collect more data.
            </p>
          </div>
        </div>

        {/* Thresholds Table */}
        <div className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h3 className="text-xl font-display mb-6 text-center">WWI Thresholds</h3>
          <div className="overflow-x-auto">
            <table className="w-full max-w-2xl mx-auto bg-card border border-border rounded-xl overflow-hidden">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">WWI Range</th>
                  <th className="px-6 py-4 text-left font-semibold">Status</th>
                  <th className="px-6 py-4 text-left font-semibold">What It Means</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="px-6 py-4 font-mono">70–100</td>
                  <td className="px-6 py-4"><span className="inline-flex items-center gap-2 text-green-600 font-medium"><span className="w-2 h-2 rounded-full bg-green-500" /> Healthy</span></td>
                  <td className="px-6 py-4 text-muted-foreground">Employee is balanced and thriving</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-6 py-4 font-mono">50–69</td>
                  <td className="px-6 py-4"><span className="inline-flex items-center gap-2 text-yellow-600 font-medium"><span className="w-2 h-2 rounded-full bg-yellow-500" /> Monitor</span></td>
                  <td className="px-6 py-4 text-muted-foreground">Some signals need attention</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-6 py-4 font-mono">0–49</td>
                  <td className="px-6 py-4"><span className="inline-flex items-center gap-2 text-red-600 font-medium"><span className="w-2 h-2 rounded-full bg-red-500" /> At Risk</span></td>
                  <td className="px-6 py-4 text-muted-foreground">Immediate manager action recommended</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== INTERACTIVE EXAMPLE: RIYA =====
function RiyaExampleSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedScores, setAnimatedScores] = useState<number[]>([0, 0, 0, 0, 0]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const riyaData = {
    name: "Riya S.",
    role: "Analyst",
    wwi: 41,
    essentials: [
      { name: "Protection from Harm", score: 22, signals: ["Workload 9.2/10 (avg 5.0)", "3 items blocked 4+ days"] },
      { name: "Work-Life Harmony", score: 28, signals: ["Meeting load 5.5h/day (avg 2.5h)", "After-hours signals detected"] },
      { name: "Connection & Community", score: 65, signals: ["Team collaboration normal", "Manager 1:1s consistent"] },
      { name: "Mattering at Work", score: 48, signals: ["2 recognition events last month", "Below team avg for voice signals"] },
      { name: "Opportunity for Growth", score: 18, signals: ["4% stretch work (team avg 24%)", "No new-skill assignments in 60 days"] },
    ],
    recommendation: "Redistribute 2 blocked items to Diego & Mason who have capacity."
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { 
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate scores
          const targetScores = riyaData.essentials.map(e => e.score);
          let frame = 0;
          const totalFrames = 60;
          const interval = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const eased = 1 - Math.pow(1 - progress, 3);
            setAnimatedScores(targetScores.map(s => Math.round(s * eased)));
            if (frame >= totalFrames) clearInterval(interval);
          }, 16);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const colors = ["#c0392b", "#e67e22", "#27ae60", "#2980b9", "#8e44ad"];

  return (
    <div id="riya-example" ref={sectionRef} className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h3 className="text-2xl lg:text-3xl font-display mb-4">Interactive Example: {riyaData.name}</h3>
          <p className="text-muted-foreground">See how each essential&apos;s sub-score feeds into her overall WWI</p>
        </div>

        <div className={`grid lg:grid-cols-2 gap-8 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Radar Chart */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="relative aspect-square max-w-sm mx-auto">
              <svg viewBox="0 0 300 300" className="w-full h-full">
                {/* Background pentagon levels */}
                {[20, 40, 60, 80, 100].map((level) => (
                  <polygon
                    key={level}
                    points={[0, 1, 2, 3, 4].map((i) => {
                      const angle = (i * 72 - 90) * (Math.PI / 180);
                      const r = (level / 100) * 100;
                      return `${150 + r * Math.cos(angle)},${150 + r * Math.sin(angle)}`;
                    }).join(" ")}
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth="1"
                    opacity={0.5}
                  />
                ))}
                
                {/* Axis lines */}
                {[0, 1, 2, 3, 4].map((i) => {
                  const angle = (i * 72 - 90) * (Math.PI / 180);
                  return (
                    <line
                      key={i}
                      x1="150"
                      y1="150"
                      x2={150 + 100 * Math.cos(angle)}
                      y2={150 + 100 * Math.sin(angle)}
                      stroke="var(--border)"
                      strokeWidth="1"
                      opacity={0.5}
                    />
                  );
                })}

                {/* Data polygon */}
                <polygon
                  points={animatedScores.map((score, i) => {
                    const angle = (i * 72 - 90) * (Math.PI / 180);
                    const r = (score / 100) * 100;
                    return `${150 + r * Math.cos(angle)},${150 + r * Math.sin(angle)}`;
                  }).join(" ")}
                  fill="var(--primary)"
                  fillOpacity="0.2"
                  stroke="var(--primary)"
                  strokeWidth="2"
                />

                {/* Data points */}
                {animatedScores.map((score, i) => {
                  const angle = (i * 72 - 90) * (Math.PI / 180);
                  const r = (score / 100) * 100;
                  return (
                    <circle
                      key={i}
                      cx={150 + r * Math.cos(angle)}
                      cy={150 + r * Math.sin(angle)}
                      r="6"
                      fill={colors[i]}
                      stroke="white"
                      strokeWidth="2"
                    />
                  );
                })}

                {/* Labels */}
                {riyaData.essentials.map((e, i) => {
                  const angle = (i * 72 - 90) * (Math.PI / 180);
                  const labelR = 120;
                  return (
                    <text
                      key={i}
                      x={150 + labelR * Math.cos(angle)}
                      y={150 + labelR * Math.sin(angle)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-[10px] fill-muted-foreground font-medium"
                    >
                      {e.name.split(" ")[0]}
                    </text>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <div>
                <div className="text-lg font-semibold">{riyaData.name}</div>
                <div className="text-sm text-muted-foreground">{riyaData.role}</div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-red-600">{riyaData.wwi}</div>
                <div className="text-xs text-red-600 flex items-center gap-1 justify-end">
                  <span className="w-2 h-2 rounded-full bg-red-500" /> At Risk
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {riyaData.essentials.map((essential, i) => (
                <div key={i} className="group">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors[i] }} />
                      {essential.name}
                    </span>
                    <span className="text-sm font-mono">{animatedScores[i]}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
                    <div 
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${animatedScores[i]}%`, backgroundColor: colors[i] }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground space-y-0.5 pl-4">
                    {essential.signals.map((signal, j) => (
                      <div key={j}>{signal}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex items-start gap-2 bg-primary/10 rounded-lg p-4">
                <Briefcase className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-primary mb-1">AI Recommendation</div>
                  <div className="text-sm">&quot;{riyaData.recommendation}&quot;</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== SECTION 3: MANAGER FAIRNESS SCORE =====
function ManagerFairnessSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const dimensions = [
    { name: "Workload Equity", description: "Is work distributed fairly across team members?", measurement: "Standard deviation of workload scores across the team; flags if any individual is >1.5σ above average", score: 68, detail: "Riya carrying 1.8x team average" },
    { name: "Recognition Equity", description: "Does the manager recognize all team members, not just favorites?", measurement: "Gini coefficient of recognition events per person; flags if any individual has a 30+ day recognition gap", score: 82, detail: "Two employees flagged (30+ day gap)" },
    { name: "Opportunity Equity", description: "Are stretch assignments and growth opportunities shared?", measurement: "Distribution of high-visibility tasks, new-skill assignments, and career-advancing work across all team members", score: 72, detail: "Stretch work concentrated on 2 of 8 members" },
  ];

  return (
    <section id="fairness-score" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            EQUITY METRICS
            <span className="w-8 h-px bg-foreground/30" />
          </span>
          <h2 className="text-3xl lg:text-4xl font-display tracking-tight mb-4">Manager Fairness Score</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A 0–100 score measuring how equitably a manager distributes workload, recognition, and growth opportunities. Addresses the insight that 50% of employees leave their manager, not the company (Gallup, 2015).
          </p>
        </div>

        {/* Three Dimensions */}
        <div className={`grid md:grid-cols-3 gap-6 mb-12 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {dimensions.map((dim, i) => (
            <div key={i} className="bg-card rounded-xl border border-border p-6">
              <h4 className="font-semibold mb-2">{dim.name}</h4>
              <p className="text-sm text-muted-foreground mb-4">{dim.description}</p>
              <div className="text-xs text-primary bg-primary/10 rounded-lg p-3">
                <span className="font-medium">How it&apos;s measured:</span> {dim.measurement}
              </div>
            </div>
          ))}
        </div>

        {/* Example */}
        <div className={`bg-card rounded-2xl border border-border p-6 lg:p-8 max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
            <div>
              <div className="text-lg font-semibold">Engineering Team</div>
              <div className="text-sm text-muted-foreground">Manager Fairness Score</div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">74</span>
                <span className="text-sm text-red-500">↓ -3</span>
              </div>
              <div className="text-xs text-muted-foreground">Confidence: Medium</div>
            </div>
          </div>

          <div className="space-y-4">
            {dimensions.map((dim, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{dim.name}</span>
                  <span className="text-sm font-mono">{dim.score}</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden mb-1">
                  <div 
                    className="h-full rounded-full bg-primary transition-all duration-1000"
                    style={{ width: `${dim.score}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground">{dim.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== SECTION 4: DUAL-SIGNAL ARCHITECTURE =====
function DualSignalSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const passiveSignals = [
    { type: "Task load & velocity", source: "Jira, Asana, Linear", reads: "Active tickets, story points, WIP count, time-in-status" },
    { type: "Meeting burden", source: "Google Calendar, Outlook", reads: "Meeting count/day, duration, after-hours meetings" },
    { type: "Blocked work", source: "Jira, Asana", reads: 'Items in "blocked" status, blocker duration, dependency chains' },
    { type: "Recognition events", source: "Slack, Teams", reads: "Public kudos/shoutouts in designated channels (metadata only)" },
    { type: "Collaboration patterns", source: "Slack, Teams, Calendar", reads: "Communication frequency, cross-team interaction (metadata only)" },
    { type: "Assignment types", source: "Jira, Asana", reads: "Stretch vs. routine work classification, task variety score" },
  ];

  const pulseQuestions = [
    { essential: "Protection from Harm", question: "My work is manageable." },
    { essential: "Work-Life Harmony", question: "I am able to disconnect from work during non-work hours without negative consequences." },
    { essential: "Connection & Community", question: "At your company, is there someone you are comfortable reaching out to about professional issues?" },
    { essential: "Mattering at Work", question: "I feel meaningfully recognized for the work I contribute." },
    { essential: "Opportunity for Growth", question: "Does your organization provide transparent career pathways and advancement opportunities?" },
  ];

  return (
    <section id="dual-signal" ref={sectionRef} className="relative py-24 lg:py-32 bg-muted/30">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            DATA ARCHITECTURE
            <span className="w-8 h-px bg-foreground/30" />
          </span>
          <h2 className="text-3xl lg:text-4xl font-display tracking-tight mb-4">Two Signal Layers. One Complete Picture.</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            HeartMetrics combines passive work-system signals with lightweight pulse surveys — so managers get both objective data and the employee&apos;s own voice.
          </p>
        </div>

        <div className={`grid lg:grid-cols-2 gap-8 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Layer 1: Passive Signals */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Layer 1: Passive Work-System Signals</h3>
                <p className="text-xs text-muted-foreground">Always On — No employee action required</p>
              </div>
            </div>
            <div className="space-y-3">
              {passiveSignals.map((signal, i) => (
                <div key={i} className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{signal.type}</span>
                    <span className="text-xs text-muted-foreground">{signal.source}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{signal.reads}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Layer 2: Pulse Surveys */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-chart-2/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-chart-2" />
              </div>
              <div>
                <h3 className="font-semibold">Layer 2: Pulse Surveys</h3>
                <p className="text-xs text-muted-foreground">Periodic, Lightweight — 1-5 Likert Scale</p>
              </div>
            </div>
            <div className="space-y-3">
              {pulseQuestions.map((q, i) => (
                <div key={i} className="bg-muted/50 rounded-lg p-3">
                  <div className="text-xs text-primary font-medium mb-1">{q.essential}</div>
                  <div className="text-sm italic">&quot;{q.question}&quot;</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Convergence visual */}
        <div className={`mt-12 text-center transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-4 bg-card border border-border rounded-full px-6 py-3">
            <BarChart3 className="w-5 h-5 text-primary" />
            <span className="text-muted-foreground">+</span>
            <MessageSquare className="w-5 h-5 text-chart-2" />
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
            <span className="font-semibold">Work Wellbeing Index</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== SECTION 5: PRIVACY =====
function PrivacySection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const weRead = [
    "Task/ticket status, assignments, story points (Jira, Asana)",
    "Calendar event metadata: duration, count, time-of-day (Google Calendar, Outlook)",
    "Public recognition events in designated channels (Slack, Teams)",
    "Role and assignment metadata from HRIS (BambooHR, Workday)",
    "Aggregated pulse survey responses",
  ];

  const weNeverRead = [
    "Private messages, Slack DMs, or email content",
    "Keystrokes, mouse movement, or screen activity",
    "Browsing history or app usage",
    "Camera, microphone, or location data",
    "Performance review text or 1:1 notes (unless explicitly opted in)",
    "Individual survey responses are never shown to managers — only aggregated scores",
  ];

  return (
    <section id="privacy" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            PRIVACY BY DESIGN
            <span className="w-8 h-px bg-foreground/30" />
          </span>
          <h2 className="text-3xl lg:text-4xl font-display tracking-tight mb-4">What We Read vs. What We Never Read</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            HeartMetrics reads work-system signals. Never surveillance data.
          </p>
        </div>

        <div className={`grid md:grid-cols-2 gap-8 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* What We Read */}
          <div className="bg-green-50 dark:bg-green-950/20 rounded-2xl border border-green-200 dark:border-green-900 p-6">
            <h3 className="text-lg font-semibold text-green-700 dark:text-green-400 mb-4 flex items-center gap-2">
              <Check className="w-5 h-5" />
              What We Read
            </h3>
            <ul className="space-y-3">
              {weRead.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What We Never Read */}
          <div className="bg-red-50 dark:bg-red-950/20 rounded-2xl border border-red-200 dark:border-red-900 p-6">
            <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-4 flex items-center gap-2">
              <X className="w-5 h-5" />
              What We Never Read
            </h3>
            <ul className="space-y-3">
              {weNeverRead.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <X className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== SECTION 6: RESEARCH FOUNDATION =====
function ResearchSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const researchData = [
    { signal: "Workload → Burnout", basis: "34% of employees considered quitting due to burnout (NAMI, 2024)" },
    { signal: "Recognition → Retention", basis: "79% cite lack of recognition as reason for quitting (O.C. Tanner, 2026)" },
    { signal: "Feedback → Turnover", basis: "33% quit due to lack of constructive feedback (BambooHR, 2025)" },
    { signal: "Manager quality → Attrition", basis: "71% of tech employee turnover linked to poor management (Gallup, 2023)" },
    { signal: "Cost impact", basis: "$900B annual U.S. turnover cost (Work Institute, 2024); $15–20K to replace one tech employee (SHRM, 2023)" },
  ];

  return (
    <section id="research" ref={sectionRef} className="relative py-24 lg:py-32 bg-muted/30">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            EVIDENCE BASE
            <span className="w-8 h-px bg-foreground/30" />
          </span>
          <h2 className="text-3xl lg:text-4xl font-display tracking-tight mb-4">Grounded in the Surgeon General&apos;s Framework</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Every dimension we measure maps to a specific essential from the U.S. Surgeon General&apos;s Framework for Workplace Mental Health &amp; Well-Being, validated by our primary research with tech workers.
          </p>
        </div>

        {/* Our Validation */}
        <div className={`grid md:grid-cols-2 gap-8 mb-12 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="font-semibold mb-4">Our Validation Research</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Users className="w-3 h-3 text-primary" />
                </div>
                <div><span className="font-medium">Primary research:</span> Empathy mapping and discovery interviews with employees at tech companies (ICs, middle managers, and senior leadership)</div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MessageSquare className="w-3 h-3 text-primary" />
                </div>
                <div><span className="font-medium">Survey validation:</span> Likert-scale questions mapped to each essential, tested with tech workers across micro, small, medium, and large enterprises</div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Heart className="w-3 h-3 text-primary" />
                </div>
                <div><span className="font-medium">Persona research:</span> Think/Say/Do/Feel empathy maps for individual contributors, middle managers, and senior leadership</div>
              </li>
            </ul>
          </div>

          {/* Industry Data */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="font-semibold mb-4">Supporting Industry Data</h3>
            <div className="space-y-3">
              {researchData.map((item, i) => (
                <div key={i} className="bg-muted/50 rounded-lg p-3">
                  <div className="font-medium text-sm mb-1">{item.signal}</div>
                  <div className="text-xs text-muted-foreground">{item.basis}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== SECTION 7: AI COACHING =====
function AICoachingSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const nudges = [
    { category: "Protection from Harm", icon: Shield, color: "#c0392b", message: "Riya's workload is 1.8x the team average and she has 3 items blocked for 4+ days. Redistribute 2 blocked items to Diego & Mason who have capacity." },
    { category: "Mattering at Work", icon: Star, color: "#2980b9", message: "Priya hasn't received recognition in 34 days. Consider acknowledging her Q1 client migration work in your next standup." },
    { category: "Work-Life Harmony", icon: Heart, color: "#e67e22", message: "Sam is averaging 5.5 hours of meetings per day — more than double the team average. Consider protecting 2 hours of deep work time on his calendar this week." },
    { category: "Manager Fairness", icon: Award, color: "#8e44ad", message: "Your fairness score dropped 3 points this week. Stretch assignments are concentrated on 2 of 8 team members. Consider rotating the next high-visibility task to Priya or Mason." },
    { category: "Opportunity for Growth", icon: TrendingUp, color: "#27ae60", message: "Mason's stretch work percentage is 4% vs. team average of 24%. He hasn't had a new-skill assignment in 60 days. Consider assigning him to the API redesign project." },
  ];

  return (
    <section id="ai-coaching" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            ACTIONABLE INSIGHTS
            <span className="w-8 h-px bg-foreground/30" />
          </span>
          <h2 className="text-3xl lg:text-4xl font-display tracking-tight mb-4">AI Coaching That Tells Managers What to Do Next</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            HeartMetrics doesn&apos;t just show numbers — it generates specific, actionable nudges grounded in each employee&apos;s real signals across all five essentials.
          </p>
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {nudges.map((nudge, i) => {
            const Icon = nudge.icon;
            return (
              <div 
                key={i} 
                className="bg-card rounded-xl border border-border p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: nudge.color }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">{nudge.category}</span>
                </div>
                <p className="text-sm leading-relaxed">&quot;{nudge.message}&quot;</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ===== SECTION 8: CTA =====
function CTASection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="max-w-[800px] mx-auto px-6 lg:px-12 text-center">
        <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl lg:text-4xl font-display tracking-tight mb-4">See It In Action</h2>
          <p className="text-lg opacity-90 mb-8">
            Try the demo dashboard and click &quot;why this score?&quot; on any metric to see the five essentials in action.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="rounded-full px-8" asChild>
              <Link href="/demo">Try Demo Mode</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== MAIN PAGE =====
export default function HowWeCalculatePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <FiveEssentialsSection />
      <WWIFormulaSection />
      <RiyaExampleSection />
      <ManagerFairnessSection />
      <DualSignalSection />
      <PrivacySection />
      <ResearchSection />
      <AICoachingSection />
      <CTASection />
      <FooterSection />
    </main>
  );
}
