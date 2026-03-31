"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  LayoutDashboard,
  HeartPulse,
  Flame,
  BarChart3,
  Calendar,
  ClipboardList,
  Target,
  Award,
  MessageSquare,
  Clock,
  Scale,
  FileText,
  ListChecks,
  Link2,
  Settings,
} from "lucide-react";
import { teamStats, topAttentionEmployees, employees } from "@/lib/data";

function AnimatedCounter({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, hasAnimated]);

  return (
    <div ref={ref} className="text-5xl lg:text-6xl font-display tracking-tight">
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
}

export function MetricsSection() {
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
    <section id="dashboard-preview" ref={sectionRef} className="relative py-24 lg:py-32 border-y border-border">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Live Dashboard Preview
            </span>
            <h2
              className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              See your team&apos;s
              <br />
              real story.
            </h2>
          </div>
          <div className="flex items-center gap-4 font-mono text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Demo Data
            </span>
          </div>
        </div>

        {/* Live Dashboard Preview */}
        <div 
          className={`overflow-hidden rounded-xl border border-border bg-background shadow-2xl transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Mini top bar */}
          <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2.5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <HeartPulse className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">HeartMetrics</span>
              </div>
              <Badge variant="outline" className="text-[10px]">Engineering Team (8)</Badge>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                Connected
              </div>
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-medium text-primary">AM</div>
            </div>
          </div>
          <div className="flex">
            {/* Mini sidebar */}
            <div className="hidden w-44 shrink-0 border-r border-border bg-card p-3 md:block">
              <nav className="flex flex-col gap-0.5">
                {[
                  { icon: LayoutDashboard, label: "Overview", active: true },
                  { icon: Brain, label: "AI Coach" },
                  { icon: HeartPulse, label: "Team Health" },
                  { icon: Flame, label: "Burnout Risk" },
                  { icon: BarChart3, label: "Work Distribution" },
                  { icon: Calendar, label: "1:1 Meetings" },
                  { icon: ClipboardList, label: "Pulse Surveys" },
                  { icon: Target, label: "Goals & OKRs" },
                  { icon: Award, label: "Recognition" },
                  { icon: MessageSquare, label: "Feedback Wall" },
                  { icon: Clock, label: "Timeline" },
                  { icon: Scale, label: "Benchmarking" },
                  { icon: FileText, label: "Reports" },
                  { icon: ListChecks, label: "Actions" },
                  { icon: Link2, label: "Integrations" },
                  { icon: Settings, label: "Settings" },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.label}
                      className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] font-medium ${
                        item.active
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {item.label}
                    </div>
                  )
                })}
              </nav>
            </div>
            {/* Main content preview */}
            <div className="flex-1 p-4">
              {/* AI Insight */}
              <div className="mb-4 rounded-lg border border-primary/20 bg-primary/5 p-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <Brain className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-semibold text-foreground">Weekly Team Insight</span>
                </div>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  {"Your team's overall wellbeing is trending upward this week. Riya and Sam need immediate attention due to workload imbalance. Consider redistributing 2-3 tasks from Riya to Olivia who has capacity."}
                </p>
              </div>
              {/* KPI Cards */}
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                <Card className="border-border">
                  <CardContent className="p-3">
                    <p className="text-[10px] font-medium text-muted-foreground">Team WHI Average</p>
                    <div className="mt-0.5 flex items-baseline gap-1.5">
                      <span className="text-2xl font-bold text-foreground">{teamStats.whiAverage}</span>
                      <span className="flex items-center gap-0.5 text-[10px] text-emerald-600">
                        <TrendingUp className="h-3 w-3" />+{teamStats.whiChange}
                      </span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardContent className="p-3">
                    <p className="text-[10px] font-medium text-muted-foreground">High Risk Employees</p>
                    <div className="mt-0.5 flex items-baseline gap-1.5">
                      <span className="text-2xl font-bold text-foreground">{teamStats.highRiskCount}</span>
                    </div>
                    <p className="text-[10px] text-amber-600 flex items-center gap-0.5">
                      Need attention <AlertTriangle className="h-2.5 w-2.5" />
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardContent className="p-3">
                    <p className="text-[10px] font-medium text-muted-foreground">Blocked Work Items</p>
                    <div className="mt-0.5">
                      <span className="text-2xl font-bold text-foreground">{teamStats.blockedWorkItems}</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardContent className="p-3">
                    <p className="text-[10px] font-medium text-muted-foreground">Manager Fairness</p>
                    <div className="mt-0.5 flex items-baseline gap-1.5">
                      <span className="text-2xl font-bold text-foreground">{teamStats.managerFairnessScore}</span>
                      <span className="flex items-center gap-0.5 text-[10px] text-red-500">
                        <TrendingDown className="h-3 w-3" />-{teamStats.mfsChange}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* Attention Table */}
              <Card className="mt-4 border-border">
                <CardHeader className="p-3 pb-2">
                  <CardTitle className="text-xs font-semibold text-foreground">Attention Needed - Top 5 Employees</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border text-left text-[10px] text-muted-foreground">
                        <th className="pb-2 pr-3 font-medium">Name</th>
                        <th className="pb-2 pr-3 font-medium">WHI</th>
                        <th className="pb-2 pr-3 font-medium">Issue</th>
                        <th className="pb-2 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topAttentionEmployees.slice(0, 5).map((emp) => (
                        <tr key={emp.id} className="border-b border-border last:border-0">
                          <td className="py-1.5 pr-3 text-[11px] font-medium text-foreground">{emp.name}</td>
                          <td className="py-1.5 pr-3 text-[11px] font-semibold text-foreground flex items-center gap-1">
                            {emp.whi}
                            {emp.whiTrend === "down" && <TrendingDown className="h-3 w-3 text-red-500" />}
                          </td>
                          <td className="py-1.5 pr-3">
                            <Badge className={`text-[9px] px-1.5 py-0 ${
                              emp.issue.includes("Blocked") ? "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300" :
                              emp.issue.includes("Medium") ? "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300" :
                              emp.issue.includes("firefighting") ? "bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-300" :
                              emp.issue.includes("Declining") ? "bg-muted text-muted-foreground" :
                              "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300"
                            }`}>{emp.issue}</Badge>
                          </td>
                          <td className="py-1.5">
                            <div className="rounded bg-primary px-2 py-0.5 text-center text-[9px] font-medium text-primary-foreground">View</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Metrics Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground/10 mt-16">
          {[
            { value: 40, suffix: "%", label: "Burnout risk reduction" },
            { value: 85, suffix: "%", label: "Manager satisfaction" },
            { value: 3, suffix: "x", label: "Faster issue detection" },
            { value: 2, suffix: " hrs", label: "Saved per manager/week" },
          ].map((metric, index) => (
            <div
              key={metric.label}
              className={`bg-background p-8 lg:p-10 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100 + 500}ms` }}
            >
              <AnimatedCounter 
                end={metric.value} 
                suffix={metric.suffix} 
                prefix=""
              />
              <div className="mt-3 text-sm text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
