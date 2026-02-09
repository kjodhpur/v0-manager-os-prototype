import { MarketingNav } from "@/components/marketing/nav"
import { MarketingFooter } from "@/components/marketing/footer"
import { Badge } from "@/components/ui/badge"

const sections = [
  {
    title: "What Data We Collect",
    content: [
      "Task metadata: status, assignees, due dates, blockers, and cycle time from connected project management tools (Jira, Asana).",
      "Meeting signals: calendar event duration and frequency (not content or recordings).",
      "Recognition events: public shoutouts and kudos from connected platforms.",
      "Account data: name, email, role, and organization for authenticated users.",
    ],
  },
  {
    title: "What We Do Not Collect",
    content: [
      "Private messages, chat content, or email body text.",
      "Keystrokes, mouse movements, or screen activity.",
      "Webcam or microphone data.",
      "Browsing history or application usage outside connected work tools.",
      "Personal social media or non-work data.",
    ],
  },
  {
    title: "How We Use Your Data",
    content: [
      "To compute team health and fairness scores (Work Happiness Index, Manager Fairness Score).",
      "To generate personalized recommendations for managers.",
      "To detect workload imbalances, recognition gaps, and blocked work.",
      "To display trends over time for individuals and teams.",
      "We never sell data to third parties or use it for advertising.",
    ],
  },
  {
    title: "Data Retention",
    content: [
      "Active account data is retained while your subscription is active.",
      "You may request deletion at any time through Settings or by emailing privacy@heartmetrics.io.",
      "Upon account deletion, all data is permanently removed within 30 days.",
      "Aggregated, anonymized data may be retained for product improvement.",
    ],
  },
  {
    title: "Your Controls",
    content: [
      "Enable aggregate-only mode to prevent individual score visibility.",
      "Exclude after-hours signals from analysis.",
      "Control which integrations are connected and what data scope is included.",
      "Request a full data export at any time.",
      "Revoke access and disconnect tools instantly.",
    ],
  },
  {
    title: "Data Sharing",
    content: [
      "We do not share individual data with anyone outside your organization.",
      "Managers within your organization see team and individual dashboards based on their permissions.",
      "We use industry-standard subprocessors for infrastructure (hosting, database) under strict data processing agreements.",
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main>
        <section className="bg-card py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-4 lg:px-8">
            <div className="text-center">
              <Badge variant="secondary" className="mb-6">Legal</Badge>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Privacy Policy
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Plain-English summary of how HeartMetrics handles your data.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">Last updated: February 2026</p>
            </div>

            <div className="mt-12 flex flex-col gap-10">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                  <ul className="mt-4 flex flex-col gap-3">
                    {section.content.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-lg border border-border bg-secondary/30 p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Questions about our privacy practices? Contact us at{" "}
                <a href="mailto:privacy@heartmetrics.io" className="font-medium text-primary hover:underline">
                  privacy@heartmetrics.io
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  )
}
