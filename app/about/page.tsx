import { MarketingNav } from "@/components/marketing/nav"
import { MarketingFooter } from "@/components/marketing/footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ShieldCheck, Eye, Scale, Users } from "lucide-react"

const principles = [
  {
    icon: Heart,
    title: "Care",
    description: "We believe managers want to do right by their teams. We give them the visibility to act on that intention.",
  },
  {
    icon: Scale,
    title: "Fairness",
    description: "Every feature is designed to surface and reduce inequity in work distribution, recognition, and opportunity access.",
  },
  {
    icon: Eye,
    title: "Explainability",
    description: "No black boxes. Every score, recommendation, and flag is backed by transparent, plain-language reasoning.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy-First",
    description: "We use work-system signals only. No private message reading, no keystroke monitoring, no screen tracking.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main>
        {/* Hero */}
        <section className="bg-card py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
            <Badge variant="secondary" className="mb-6">About</Badge>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Work should make people better, not burn them out
            </h1>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
              HeartMetrics was born from a simple observation: the managers who care the most about their teams often have the least visibility into what's actually happening.
            </p>
          </div>
        </section>

        {/* Why Now */}
        <section className="bg-secondary/30 py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Why now?</h2>
                <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
                  <p>
                    Burnout costs the global economy an estimated $1 trillion per year. Invisible labor, particularly in operational and supporting roles, leads to attrition among the most dedicated team members.
                  </p>
                  <p>
                    Meanwhile, access to growth opportunities, stretch projects, and public recognition is unevenly distributed, often along lines that reinforce existing biases.
                  </p>
                  <p>
                    Modern work tools generate rich signals about how work is distributed, where it gets stuck, and who carries the load. But this data sits unused in Jira boards, meeting calendars, and project trackers.
                  </p>
                  <p>
                    HeartMetrics connects these signals to give managers a clear, ethical, and actionable view of team health and fairness.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { stat: "76%", label: "of employees have experienced burnout" },
                  { stat: "50%", label: "of attrition is attributed to managers" },
                  { stat: "3x", label: "variation in 1:1 support time within teams" },
                  { stat: "65%", label: "of stretch projects go to the same people" },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg border border-border bg-card p-5">
                    <p className="text-3xl font-bold text-primary">{item.stat}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="bg-card py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our principles
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {principles.map((p) => {
                const Icon = p.icon
                return (
                  <Card key={p.title} className="border-border">
                    <CardContent className="p-6 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="mt-4 text-base font-semibold text-foreground">{p.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Team Story */}
        <section className="bg-secondary/30 py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Users className="h-7 w-7 text-primary" />
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">Our team</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Built by people with experience at Google, Amazon, Deloitte, Nestle, ASU, PSU. We combine expertise in organizational psychology, product design, data ethics, and enterprise software to create tools that make work genuinely better.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {"We've seen firsthand how invisible labor, unfair systems, and blind spots in management lead to talented people leaving. HeartMetrics is our answer: give every manager the visibility to lead with care and fairness."}
            </p>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  )
}
