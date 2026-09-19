"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react"

const faqCategories = [
  {
    title: "Privacy & Trust",
    faqs: [
      {
        q: "Is HeartMetrics a surveillance tool?",
        a: "Absolutely not. HeartMetrics reads work-system signals only: tasks, meetings, project assignments, and recognition events. It does not read private messages, monitor keystrokes, track screen time, or access webcam/microphone. Our design principle is to help managers, not monitor employees.",
      },
      {
        q: "What data does HeartMetrics access?",
        a: "We access task metadata (status, assignees, blockers), meeting calendar events (duration, frequency), project assignments, and public recognition events. We never access message content, file contents, browsing history, or any personal communication.",
      },
      {
        q: "Can employees see their own data?",
        a: "Yes. Employees can view their own Work Wellbeing Index, drivers, and trends. They cannot see other employees' individual scores. Organizations can also enable aggregate-only mode where even managers see only team-level patterns.",
      },
      {
        q: "How do I request data deletion?",
        a: "You can request full data deletion through Settings or by contacting us at privacy@heartmetrics.io. We process deletion requests within 30 days and confirm completion.",
      },
    ],
  },
  {
    title: "Product & Features",
    faqs: [
      {
        q: "What tools does HeartMetrics integrate with?",
        a: "Currently: Jira, Asana, and Salesforce. We use OAuth for secure connections and clearly disclose what data is accessed. More integrations are on our roadmap.",
      },
      {
        q: "How is the Work Wellbeing Index (WWI) calculated?",
        a: "The WWI combines weighted signals: workload (WIP count, meeting hours), blockers (count and duration), recognition (public and private), and growth opportunities (stretch vs. operational work ratio). Every score shows a 'why this score' breakdown with the specific signals that contributed.",
      },
      {
        q: "What is the Manager Fairness Score?",
        a: "The MFS measures how equitably a manager distributes workload, recognition, stretch opportunities, and 1:1 support across their team. It flags concentration patterns and suggests corrective actions.",
      },
      {
        q: "Can I try HeartMetrics before committing?",
        a: "Yes! Our demo mode includes pre-seeded sample data so you can explore all features without connecting any tools. You can access it directly from our app.",
      },
    ],
  },
  {
    title: "Getting Started",
    faqs: [
      {
        q: "How long does setup take?",
        a: "Most teams are up and running in under 15 minutes. Connect your work tools via OAuth, map your team members, and you will start seeing insights immediately.",
      },
      {
        q: "Do employees need to install anything?",
        a: "No. HeartMetrics works by connecting to your existing tools (Jira, Asana, Salesforce). Employees do not need to install any software or change their workflow.",
      },
      {
        q: "What if I only have one tool connected?",
        a: "HeartMetrics works with partial data. Connecting more tools increases confidence in scores, but you will get valuable insights even from a single integration.",
      },
    ],
  },
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-16">
        <section className="bg-card py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-4 lg:px-8">
            <div className="text-center">
              <Badge variant="secondary" className="mb-6">FAQ</Badge>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Frequently asked questions
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Everything you need to know about HeartMetrics.
              </p>
            </div>

            <div className="mt-12 flex flex-col gap-10">
              {faqCategories.map((category) => (
                <div key={category.title}>
                  <h2 className="mb-4 text-xl font-semibold text-foreground">{category.title}</h2>
                  <div className="flex flex-col gap-3">
                    {category.faqs.map((faq) => {
                      const key = `${category.title}-${faq.q}`
                      const isOpen = openItems[key]
                      return (
                        <div key={faq.q} className="rounded-lg border border-border bg-card">
                          <button
                            className="flex w-full items-center justify-between p-5 text-left"
                            onClick={() => toggleItem(key)}
                            aria-expanded={isOpen}
                          >
                            <span className="text-sm font-medium text-foreground">{faq.q}</span>
                            {isOpen ? (
                              <ChevronUp className="h-5 w-5 shrink-0 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
                            )}
                          </button>
                          {isOpen && (
                            <div className="border-t border-border px-5 pb-5 pt-4">
                              <p className="text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-lg border border-border bg-secondary/30 p-8 text-center">
              <h3 className="text-lg font-semibold text-foreground">Still have questions?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {"We're happy to help. Reach out and we'll get back to you within 1 business day."}
              </p>
              <Button asChild className="mt-4">
                <Link href="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
