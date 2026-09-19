'use client';

import Link from 'next/link';
import { Mail, ShieldCheck } from 'lucide-react';
import { HeartMetricsLogo } from '@/components/heart-metrics-logo';
import { FOOTER_NAV, ROUTES, SITE } from '@/lib/site-config';

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 lg:gap-x-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href={ROUTES.home}
              className="inline-flex rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={`${SITE.name} home`}
            >
              <HeartMetricsLogo variant="horizontal" size="default" />
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {SITE.tagline} Privacy-first workplace wellbeing analytics for managers who care.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 py-2">
              <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
              <span className="text-xs font-medium text-foreground">Privacy-First</span>
            </div>

            <a
              href={`mailto:${SITE.contactEmail}`}
              className="mt-5 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Mail className="h-4 w-4 shrink-0" />
              <span className="break-all">{SITE.contactEmail}</span>
            </a>
          </div>

          {/* Link columns */}
          {FOOTER_NAV.map((section) => (
            <nav key={section.title} aria-labelledby={`footer-${section.title.toLowerCase()}`}>
              <h2
                id={`footer-${section.title.toLowerCase()}`}
                className="text-sm font-semibold text-foreground"
              >
                {section.title}
              </h2>
              <ul className="mt-5 space-y-3.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="max-w-lg text-xs leading-relaxed text-muted-foreground md:text-right">
            Uses work-system signals only (tasks, meetings, assignments). Does not read private
            messages.
          </p>
        </div>
      </div>
    </footer>
  );
}
