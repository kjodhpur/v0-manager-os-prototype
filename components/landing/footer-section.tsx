"use client";

import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { AnimatedWave } from "./animated-wave";
import { HeartMetricsLogo } from "@/components/heart-metrics-logo";

// Anchor links scroll on the landing page; Legal links navigate to separate pages
const footerLinks = {
  Product: [
    { name: "Features", href: "#product", anchor: true },
    { name: "How it works", href: "#how-we-calculate", anchor: true },
    { name: "Security", href: "#security", anchor: true },
    { name: "Pricing", href: "#pricing", anchor: true },
  ],
  Company: [
    { name: "About", href: "#about", anchor: true },
    { name: "Contact", href: "#contact", anchor: true },
    { name: "Blog", href: "https://heartmetrics.io/blog", anchor: false },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy", anchor: false },
    { name: "Terms of Service", href: "/terms", anchor: false },
    { name: "Security & Trust", href: "#security", anchor: true },
  ],
} as const;

const socialLinks = [
  { name: "Twitter", href: "https://twitter.com/heartmetrics" },
  { name: "LinkedIn", href: "https://linkedin.com/company/heartmetrics" },
];

const HEADER_HEIGHT = 56;

function handleFooterScroll(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault();
  const id = href.substring(1);
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

export function FooterSection() {
  return (
    <footer id="contact" className="relative border-t border-border">
      {/* Animated wave background */}
      <div className="absolute inset-0 h-64 opacity-15 pointer-events-none overflow-hidden">
        <AnimatedWave />
      </div>
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <HeartMetricsLogo />

              <p className="text-muted-foreground leading-relaxed mb-6 mt-6 max-w-xs">
                Make work more human with ethical AI. Privacy-first workplace wellbeing analytics for managers who care.
              </p>

              {/* Privacy Badge */}
              <div className="flex items-center gap-2 rounded-lg bg-primary/10 border border-primary/30 px-4 py-2 w-fit mb-8">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium text-foreground">Privacy-First</span>
              </div>

              {/* Social Links */}
              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      {link.anchor ? (
                        <a
                          href={link.href}
                          onClick={(e) => handleFooterScroll(e, link.href)}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                        >
                          {link.name}
                          {link.href.startsWith('http') && <ArrowUpRight className="w-3 h-3" />}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} HeartMetrics. All rights reserved.
          </p>

          <p className="text-xs text-muted-foreground text-center md:text-right max-w-md">
            Uses work-system signals only (tasks, meetings, assignments). Does not read private messages by default.
          </p>
        </div>
      </div>
    </footer>
  );
}
