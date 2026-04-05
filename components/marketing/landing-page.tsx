"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ShieldCheck,
  HeartPulse,
  BarChart3,
  Award,
  ArrowRight,
  Users,
  Eye,
  Scale,
  Zap,
  Lock,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  LayoutDashboard,
  Brain,
  Flame,
  Calendar,
  ListChecks,
  Settings,
  ClipboardList,
  Target,
  Clock,
  FileText,
  MessageSquare,
  Link2,
} from "lucide-react"
import { useState } from "react"
import { teamStats, topAttentionEmployees, employees } from "@/lib/data"

const problems = [
  {
    icon: HeartPulse,
    title: "Burnout is invisible until it's too late",
    description: "Managers only see problems when employees quit or disengage. By then, the damage is done.",
  },
  {
    icon: Eye,
    title: "Invisible work goes unrecognized",
    description: "Some team members carry the team behind the scenes while others get all the visibility.",
  },
  {
    icon: Scale,
    title: "Unfair access to opportunities",
    description: "Stretch projects and growth opportunities often go to the same people, creating inequality.",
  },
]

const howItWorks = [
  {
    step: "01",
    title: "Connect your tools",
    description: "Link Jira, Asana, or Salesforce. HeartMetrics reads work-system signals only, never private messages.",
  },
  {
    step: "02",
    title: "See wellbeing and fairness",
    description: "Get a clear dashboard showing team health, work distribution, and recognition patterns.",
  },
  {
    step: "03",
    title: "Take recommended actions",
    description: "Follow AI-powered suggestions to reduce overload, recognize invisible work, and rotate opportunities.",
  },
]

const benefits = [
  {
    icon: HeartPulse,
    title: "Reduce burnout",
    description: "Detect workload imbalances and overload before they become retention risks.",
  },
  {
    icon: Scale,
    title: "Improve fairness",
    description: "Ensure stretch assignments, recognition, and support are distributed equitably.",
  },
  {
    icon: Award,
    title: "Recognize invisible work",
    description: "Surface contributions that often go unnoticed: firefighting, admin, operational support.",
  },
  {
    icon: Users,
    title: "Build trust",
    description: "Transparent, explainable scores with clear privacy boundaries build confidence with your team.",
  },
]

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
    a: "Every score is explainable. The Work Happiness Index combines signals like workload, blocked items, meeting load, recognition frequency, and growth opportunities. You can always click 'why this score' to see the breakdown.",
  },
  {
    q: "What about privacy?",
    a: "Privacy is our core principle. We use work-system signals only, implement encryption at rest and in transit, follow least-privilege access, and give users controls over their data visibility.",
  },
]

export function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-card">
        <div className="mx-auto max-w-6xl px-4 py-20 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-6">
              <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
              Privacy-First Workplace Analytics
            </Badge>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Make work more human with ethical AI
            </h1>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
              HeartMetrics is an AI copilot that helps managers run fairer, healthier teams by making
              work distribution, contribution, and growth visible — without surveillance.
            </p>
            <div className="mt-8 flex justify-center">
              <Button size="lg" asChild>
                <Link href="/demo">Try Demo Mode</Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Live Dashboard Preview */}
        <div className="mx-auto max-w-5xl px-4 pb-16 lg:px-8">
          <div className="overflow-hidden rounded-xl border border-border bg-background shadow-2xl">
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
              <div className="hidden w-40 shrink-0 border-r border-border bg-card p-3 md:block">
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
                                emp.issue.includes("Blocked") ? "bg-red-500/10 text-red-700 dark:bg-red-950/30 dark:text-red-300" :
                                emp.issue.includes("Medium") ? "bg-amber-500/10 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300" :
                                emp.issue.includes("firefighting") ? "bg-amber-500/10 text-orange-700 dark:bg-orange-950/30 dark:text-orange-300" :
                                emp.issue.includes("Declining") ? "bg-muted text-muted-foreground" :
                                "bg-amber-500/10 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300"
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
        </div>
      </section>

      {/* Social Proof */}
      <section className="border-y border-border bg-secondary/50 py-10">
        <div className="mx-auto max-w-6xl px-4 text-center lg:px-8">
          <p className="text-sm font-medium text-muted-foreground">
            Built by people with experience at Google, Amazon, Deloitte, Nestle, ASU, PSU
          </p>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-card py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Great managers care. But caring alone isn't enough.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Without visibility, even the best managers miss the signs.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {problems.map((problem) => {
              const Icon = problem.icon
              return (
                <Card key={problem.title} className="border-border">
                  <CardContent className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-foreground">{problem.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{problem.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-secondary/30 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How HeartMetrics works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Three steps to healthier, fairer teams.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {howItWorks.map((step) => (
              <div key={step.step} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  {step.step}
                </div>
                <h3 className="mt-6 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
          {/* Live Work Distribution Preview */}
          <div className="mt-16 overflow-hidden rounded-xl border border-border bg-background shadow-xl">
            <div className="border-b border-border bg-card px-4 py-2.5">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">Work Distribution</span>
                <span className="text-xs text-muted-foreground">Workload balance across team</span>
              </div>
            </div>
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border text-left text-[10px] text-muted-foreground">
                      <th className="pb-2 pr-3 font-medium">Employee</th>
                      <th className="pb-2 pr-3 font-medium">Role</th>
                      <th className="pb-2 pr-3 text-center font-medium">WIP</th>
                      <th className="pb-2 pr-3 text-center font-medium">Meeting Hrs</th>
                      <th className="pb-2 pr-3 text-center font-medium">Blocked</th>
                      <th className="pb-2 pr-3 text-center font-medium">Status</th>
                      <th className="pb-2 font-medium">Work Type Breakdown</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.slice(0, 6).map((emp) => (
                      <tr key={emp.id} className="border-b border-border last:border-0">
                        <td className="py-2 pr-3 text-[11px] font-medium text-foreground">{emp.name}</td>
                        <td className="py-2 pr-3 text-[11px] text-muted-foreground">{emp.role}</td>
                        <td className="py-2 pr-3 text-center text-[11px] font-medium text-foreground">{emp.wip}</td>
                        <td className="py-2 pr-3 text-center text-[11px] text-muted-foreground">{emp.meetingHours}h</td>
                        <td className="py-2 pr-3 text-center">
                          {emp.blocked > 0 ? (
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500/100 text-[9px] font-medium text-white">
                              {emp.blocked}
                            </span>
                          ) : (
                            <span className="text-[11px] text-muted-foreground">0</span>
                          )}
                        </td>
                        <td className="py-2 pr-3 text-center">
                          <Badge className={`text-[9px] px-1.5 py-0 border ${
                            emp.workloadStatus === "Overloaded" ? "bg-red-500/10 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-900" :
                            emp.workloadStatus === "High" ? "bg-amber-500/10 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900" :
                            emp.workloadStatus === "Balanced" ? "bg-green-500/10 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-900" :
                            "bg-accent text-accent-foreground border-border"
                          }`}>{emp.workloadStatus}</Badge>
                        </td>
                        <td className="py-2">
                          <div className="flex h-4 w-full min-w-[140px] items-center overflow-hidden rounded">
                            <div className="h-full" style={{ width: `${emp.stretch}%`, backgroundColor: "#0C2C55" }} />
                            <div className="h-full" style={{ width: `${emp.operational}%`, backgroundColor: "#296374" }} />
                            <div className="h-full" style={{ width: `${emp.firefighting}%`, backgroundColor: "#629FAD" }} />
                            <div className="h-full" style={{ width: `${emp.admin}%`, backgroundColor: "#EDEDCE" }} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Legend */}
              <div className="flex flex-wrap items-center gap-4 border-t border-border pt-3 mt-3">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: "#0C2C55" }} />
                  <span className="text-[10px] text-muted-foreground">Strategic/Visible</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: "#296374" }} />
                  <span className="text-[10px] text-muted-foreground">Operational</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: "#629FAD" }} />
                  <span className="text-[10px] text-muted-foreground">Firefighting</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: "#EDEDCE" }} />
                  <span className="text-[10px] text-muted-foreground">Admin</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-card py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why managers trust HeartMetrics
            </h2>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div key={benefit.title} className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Privacy & Ethics */}
      <section className="border-y border-border bg-secondary/30 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <Badge variant="secondary" className="mb-4">
                <Lock className="mr-1.5 h-3.5 w-3.5" />
                Privacy & Ethics
              </Badge>
              <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Built on trust, not surveillance
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Every design decision prioritizes your team's privacy and psychological safety.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { icon: ShieldCheck, text: "Uses work-system signals only (tasks, meetings, assignments)" },
                { icon: Eye, text: "Does not read private messages by default" },
                { icon: Zap, text: "Every score is explainable with clear reasoning" },
                { icon: Lock, text: "Encryption at rest and in transit, least-privilege access" },
                { icon: Users, text: "User controls for visibility and data aggregation" },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.text} className="flex items-start gap-3 rounded-lg bg-card p-4 border border-border">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <p className="text-sm leading-relaxed text-foreground">{item.text}</p>
                  </div>
                )
              })}
              <Button variant="outline" asChild className="mt-2 w-fit bg-transparent">
                <Link href="/security">
                  Read our Security & Trust page
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-card py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Frequently asked questions
          </h2>
          <div className="mt-12 flex flex-col gap-3">
            {faqs.map((faq, index) => (
              <div key={faq.q} className="rounded-lg border border-border bg-card">
                <button
                  className="flex w-full items-center justify-between p-5 text-left"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  aria-expanded={openFaq === index}
                >
                  <span className="text-base font-medium text-foreground">{faq.q}</span>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 shrink-0 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="border-t border-border px-5 pb-5 pt-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Ready to make work more human?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/70">
            Join the managers who are building fairer, healthier teams with HeartMetrics.
          </p>
          <div className="mt-8 flex justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/demo">Try Demo Mode</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
