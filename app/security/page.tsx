import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Security",
  description:
    "How HeartMetrics protects your data: work-system signals only, no private message access, and clear retention limits.",
}

import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ShieldCheck, Lock, Eye, Server, Users, FileKey, Trash2, Bell } from "lucide-react"

const practices = [
  {
    icon: Lock,
    title: "Encryption",
    description: "All data is encrypted at rest (AES-256) and in transit (TLS 1.3). Database connections use encrypted channels.",
  },
  {
    icon: FileKey,
    title: "Least Privilege Access",
    description: "Internal access follows the principle of least privilege. Team members only access what their role requires.",
  },
  {
    icon: Server,
    title: "Infrastructure Security",
    description: "Hosted on SOC 2 compliant infrastructure with automated security monitoring, intrusion detection, and regular vulnerability scanning.",
  },
  {
    icon: Users,
    title: "Access Control",
    description: "Role-based access control (RBAC) ensures managers see only their teams. Organization admins manage permissions centrally.",
  },
  {
    icon: Eye,
    title: "Audit Logging",
    description: "All access to employee data is logged. Organization admins can review audit trails showing who accessed what and when.",
  },
  {
    icon: Bell,
    title: "Incident Response",
    description: "We maintain an incident response plan with clear escalation procedures. We will notify affected users within 72 hours of any confirmed breach.",
  },
]

const boundaries = [
  { allowed: "Task metadata (status, assignees, blockers)", icon: ShieldCheck },
  { allowed: "Meeting duration and frequency", icon: ShieldCheck },
  { allowed: "Public recognition events", icon: ShieldCheck },
  { allowed: "Project assignment data", icon: ShieldCheck },
]

const neverAccess = [
  "Private messages or chat content",
  "Email body text",
  "File contents or documents",
  "Keystroke or mouse tracking",
  "Screen recordings or webcam",
  "Browsing history",
  "Personal social media",
]

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-16">
        <section className="bg-card py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-6">
                <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
                Security & Trust
              </Badge>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Built on trust, secured by design
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Security and privacy are not afterthoughts at HeartMetrics. They are foundational to every decision we make.
              </p>
            </div>
          </div>
        </section>

        {/* Security Practices */}
        <section className="bg-secondary/30 py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">Security practices</h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {practices.map((practice) => {
                const Icon = practice.icon
                return (
                  <Card key={practice.title} className="border-border">
                    <CardContent className="p-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="mt-4 text-base font-semibold text-foreground">{practice.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{practice.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Data Boundaries */}
        <section className="bg-card py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">Data boundaries</h2>
            <p className="mt-4 text-center text-lg text-muted-foreground">
              Clear, transparent boundaries on what HeartMetrics accesses.
            </p>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground">What we access</h3>
                  <div className="mt-4 flex flex-col gap-3">
                    {boundaries.map((item) => {
                      const Icon = item.icon
                      return (
                        <div key={item.allowed} className="flex items-center gap-3">
                          <Icon className="h-5 w-5 shrink-0 text-primary" />
                          <span className="text-sm text-foreground">{item.allowed}</span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
              <Card className="border-destructive/20 bg-destructive/5">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground">What we never access</h3>
                  <div className="mt-4 flex flex-col gap-3">
                    {neverAccess.map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <Trash2 className="h-5 w-5 shrink-0 text-destructive" />
                        <span className="text-sm text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Deletion */}
        <section className="bg-secondary/30 py-20">
          <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
            <h2 className="text-2xl font-bold text-foreground">Data deletion</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              You can request full data deletion at any time through your account Settings or by emailing{" "}
              <a href="mailto:privacy@heartmetrics.io" className="font-medium text-primary hover:underline">
                privacy@heartmetrics.io
              </a>. All data is permanently removed within 30 days of your request.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
