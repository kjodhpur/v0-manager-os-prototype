import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { Badge } from "@/components/ui/badge"

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: "By accessing or using HeartMetrics, you agree to be bound by these Terms of Service. If you are using HeartMetrics on behalf of an organization, you represent that you have authority to bind that organization to these terms.",
  },
  {
    title: "2. Service Description",
    content: "HeartMetrics is a workplace wellbeing and fairness analytics platform that connects to your work tools (Jira, Asana, Salesforce) to provide team health dashboards, fairness metrics, and actionable recommendations for managers.",
  },
  {
    title: "3. Account Responsibilities",
    content: "You are responsible for maintaining the security of your account credentials. You must notify us immediately of any unauthorized access. Organization administrators are responsible for managing user permissions and roles within their account.",
  },
  {
    title: "4. Data Usage",
    content: "HeartMetrics accesses only work-system signals as described in our Privacy Policy. We do not read private messages or monitor personal activity. You retain ownership of all your data. We process it solely to provide the service as described.",
  },
  {
    title: "5. Acceptable Use",
    content: "HeartMetrics is designed to help managers support their teams. It must not be used for surveillance, punitive action based solely on metrics, discrimination, or any purpose that undermines employee trust and wellbeing.",
  },
  {
    title: "6. Intellectual Property",
    content: "HeartMetrics and its algorithms, interface, and documentation are the intellectual property of HeartMetrics, Inc. Your data remains your property. We claim no ownership over data you provide or generate through use of the service.",
  },
  {
    title: "7. Limitation of Liability",
    content: "HeartMetrics provides insights and recommendations based on available data. Scores and suggestions are advisory and should be used alongside human judgment. We are not liable for management decisions made based on HeartMetrics data.",
  },
  {
    title: "8. Termination",
    content: "Either party may terminate the agreement at any time. Upon termination, your data will be deleted within 30 days. You may export your data before termination through the Settings panel.",
  },
  {
    title: "9. Changes to Terms",
    content: "We may update these terms from time to time. We will notify you of material changes via email or in-app notification at least 30 days before they take effect.",
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-16">
        <section className="bg-card py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-4 lg:px-8">
            <div className="text-center">
              <Badge variant="secondary" className="mb-6">Legal</Badge>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Terms of Service
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Plain-English terms for using HeartMetrics.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">Last updated: February 2026</p>
            </div>

            <div className="mt-12 flex flex-col gap-8">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{section.content}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-lg border border-border bg-secondary/30 p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Questions about these terms? Contact us at{" "}
                <a href="mailto:legal@heartmetrics.io" className="font-medium text-primary hover:underline">
                  legal@heartmetrics.io
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
