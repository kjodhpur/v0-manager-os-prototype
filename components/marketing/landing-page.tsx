"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
} from "lucide-react"
import { useState } from "react"

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
      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card p-3 md:hidden">
        <Button size="lg" className="w-full" asChild>
          <Link href="/contact">
            Request Demo
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

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
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Request Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/demo">Try Demo Mode</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              At an event?{" "}
              <Link href="/qr" className="underline underline-offset-4 hover:text-foreground">
                Get the QR code
              </Link>{" "}
              to share with your audience.
            </p>
          </div>
        </div>
        {/* Product screenshot */}
        <div className="mx-auto max-w-5xl px-4 pb-16 lg:px-8">
          <div className="overflow-hidden rounded-xl border border-border shadow-2xl">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image0%20%281%29.png-Wr3I9jUdexwMtVKaZnkCitPntQL5kV.jpeg"
              alt="HeartMetrics Overview Dashboard showing team wellbeing index, employee health scores, recommended actions, and fairness insights"
              className="w-full"
            />
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
          {/* Second screenshot */}
          <div className="mt-16 overflow-hidden rounded-xl border border-border shadow-xl">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image2.png-qYSlBxbD5h8QwRDEJCgzypIiFJJbTK.jpeg"
              alt="HeartMetrics Work Distribution view showing workload balance, blocked items, and work type breakdown across team members"
              className="w-full"
            />
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
          <p className="mt-4 text-lg text-primary-foreground/80">
            Join the managers who are building fairer, healthier teams with HeartMetrics.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">
                Request Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent" asChild>
              <Link href="/demo">Try Demo Mode</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
