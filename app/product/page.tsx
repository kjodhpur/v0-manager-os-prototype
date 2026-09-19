import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Product",
  description:
    "See how HeartMetrics turns work-system signals into a Work Wellbeing Index, burnout risk detection and AI coaching for managers.",
}

import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  LayoutDashboard,
  HeartPulse,
  BarChart3,
  Award,
  ListChecks,
  Users,
  ShieldCheck,
  ArrowRight,
  Eye,
  HelpCircle,
} from "lucide-react"

const dashboards = [
  {
    icon: LayoutDashboard,
    title: "Overview Dashboard",
    description: "Team wellbeing index, high-risk employees, blocked work summary, and top recommended actions at a glance.",
    managerView: "Full team health and individual WWI scores with trend indicators.",
    employeeView: "Personal score with drivers, but not comparisons to other employees.",
  },
  {
    icon: HeartPulse,
    title: "Team Health",
    description: "Work Wellbeing Index distribution across your team. Filter by risk tier, sort by score or trend.",
    managerView: "Individual employee WWI scores, confidence levels, and top drivers for each team member.",
    employeeView: "Their own WWI score with driver breakdown and trend over time.",
  },
  {
    icon: BarChart3,
    title: "Work Distribution",
    description: "Workload balance showing WIP, meeting hours, blocked items, and work type breakdown (strategic vs operational vs firefighting).",
    managerView: "Complete work distribution table with fairness hints showing concentration of high-impact work.",
    employeeView: "Their own workload breakdown and comparison to team averages (anonymized).",
  },
  {
    icon: Award,
    title: "Recognition & Growth",
    description: "Recognition frequency per person, gap detection, and visibility/growth opportunity rotation hints.",
    managerView: "Recognition gaps, suggested prompts, and growth opportunity rotation recommendations.",
    employeeView: "Their own recognition history and growth trajectory.",
  },
  {
    icon: ListChecks,
    title: "Actions (Manager Playbook)",
    description: "AI-recommended actions grouped by category: reduce overload, unblock work, recognize, rotate opportunities, and support.",
    managerView: "Action cards with problem, impact, effort, and one-click execution.",
    employeeView: "Not visible to employees. Actions are manager-only.",
  },
]

const useCases = [
  {
    title: "Detecting burnout before it escalates",
    description: "A manager notices Riya's WWI dropped to 41 with 3 blocked items and overloaded status. HeartMetrics recommends reassigning 2 tasks and scheduling an unblock meeting.",
  },
  {
    title: "Ensuring fair opportunity distribution",
    description: "The fairness insights flag that top 2 employees get 65% of stretch projects. The manager rotates the next project to Olivia, who has only 20% stretch work.",
  },
  {
    title: "Recognizing invisible contributions",
    description: "Sam has been doing 45% firefighting work with zero public recognition. HeartMetrics prompts the manager to draft a team shoutout acknowledging Sam's operational support.",
  },
  {
    title: "Repairing 1:1 support gaps",
    description: "Support time varies 3x across the team. HeartMetrics suggests scheduling focused 1:1s with under-supported team members to repair trust.",
  },
]

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-16">
        {/* Hero */}
        <section className="bg-card py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-6">Product</Badge>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Everything a manager needs to lead with clarity
              </h1>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                HeartMetrics combines signals from your work tools into actionable dashboards that surface health, fairness, and growth opportunities across your team.
              </p>
            </div>
          </div>
        </section>

        {/* Dashboards */}
        <section className="bg-secondary/30 py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Dashboards & Views
            </h2>
            <div className="mt-12 flex flex-col gap-6">
              {dashboards.map((d) => {
                const Icon = d.icon
                return (
                  <Card key={d.title} className="border-border">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground">{d.title}</h3>
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d.description}</p>
                          <div className="mt-4 grid gap-4 md:grid-cols-2">
                            <div className="rounded-lg bg-secondary/50 p-3">
                              <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                                <Users className="h-3.5 w-3.5" />
                                What managers see
                              </div>
                              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{d.managerView}</p>
                            </div>
                            <div className="rounded-lg bg-secondary/50 p-3">
                              <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                                <Eye className="h-3.5 w-3.5" />
                                What employees see
                              </div>
                              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{d.employeeView}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Explainability */}
        <section className="bg-card py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <Badge variant="secondary" className="mb-4">
                  <HelpCircle className="mr-1.5 h-3.5 w-3.5" />
                  Explainability
                </Badge>
                <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground">
                  {"\"Why this score?\""}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  Every metric in HeartMetrics is explainable. Click on any score to see exactly which signals contributed, how they were weighted, and what you can do about it.
                </p>
                <ul className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    No black boxes. Every calculation is transparent.
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Score drivers are listed in plain language.
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Confidence levels indicate data quality.
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-secondary/30 p-8">
                <h3 className="text-lg font-semibold text-foreground">Example: Riya S. (WWI: 41)</h3>
                <div className="mt-4 flex flex-col gap-3">
                  {[
                    { label: "Workload", value: "9 WIP items (team avg: 6.8)", color: "text-destructive" },
                    { label: "Blocked Items", value: "3 items blocked for 4.2 days avg", color: "text-destructive" },
                    { label: "Meeting Load", value: "12.5 hours/week (team avg: 8.1)", color: "text-amber-600" },
                    { label: "Recognition", value: "0 public, 1 private", color: "text-amber-600" },
                    { label: "Growth", value: "10% strategic work (team needs 20%+)", color: "text-muted-foreground" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded bg-card p-3 border border-border">
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                      <span className={`text-sm ${item.color}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="bg-secondary/30 py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Real-world use cases
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {useCases.map((uc) => (
                <Card key={uc.title} className="border-border">
                  <CardContent className="p-6">
                    <h3 className="text-base font-semibold text-foreground">{uc.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{uc.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary py-20">
          <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground">See it in action</h2>
            <p className="mt-4 text-lg text-primary-foreground/80">
              Try the demo or request a personalized walkthrough.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">
                  Request Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent" asChild>
                <Link href="/demo">Try Live Demo</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
