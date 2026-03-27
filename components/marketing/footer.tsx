import Link from "next/link"
import { HeartMetricsLogo } from "@/components/heart-metrics-logo"
import { ShieldCheck } from "lucide-react"

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "/product" },
      { label: "How It Works", href: "/product#how-it-works" },
      { label: "Security", href: "/security" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Security & Trust", href: "/security" },
    ],
  },
]

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <HeartMetricsLogo size="lg" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Make work more human with ethical AI. Privacy-first workplace wellbeing analytics.
            </p>
            <div className="mt-4 flex items-center gap-2 rounded-md bg-secondary px-3 py-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-secondary-foreground">Privacy-First</span>
            </div>
          </div>
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-xs text-muted-foreground">
            {`© ${new Date().getFullYear()} HeartMetrics. All rights reserved. This product uses work-system signals (tasks, meetings, assignments). It does not read private messages by default.`}
          </p>
        </div>
      </div>
    </footer>
  )
}
