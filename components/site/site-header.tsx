'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeartMetricsLogo } from '@/components/heart-metrics-logo';
import { PRIMARY_NAV, ROUTES, CTA } from '@/lib/site-config';

const HEADER_OFFSET = 64; // h-16

export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(!document.documentElement.classList.contains('light'));

    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Lock background scroll and wire Escape while the mobile menu is open.
  useEffect(() => {
    if (!isMobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isMobileOpen]);

  const toggleTheme = useCallback(() => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);
    document.documentElement.classList.toggle('dark', nextIsDark);
    document.documentElement.classList.toggle('light', !nextIsDark);
    try {
      localStorage.setItem('theme', nextIsDark ? 'dark' : 'light');
    } catch {
      // Storage can be unavailable in private browsing; theme still applies for the session.
    }
  }, [isDark]);

  const isActive = (href: string) => {
    if (href.includes('#')) return false;
    if (href === ROUTES.home) return pathname === ROUTES.home;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // On the homepage, hash links scroll smoothly instead of jumping under the header.
  const handleHashLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const [path, hash] = href.split('#');
    if (!hash) return;
    const targetPath = path || ROUTES.home;
    if (pathname !== targetPath) return;

    const el = document.getElementById(hash);
    if (!el) return;

    e.preventDefault();
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
      behavior: 'matchMedia' in window && window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    });
    setIsMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-colors duration-300 ${
        isScrolled || isMobileOpen
          ? 'bg-background/85 backdrop-blur-xl border-b border-border'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <Link
          href={ROUTES.home}
          className="flex shrink-0 items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label="HeartMetrics home"
        >
          <HeartMetricsLogo variant="horizontal" size="default" />
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {PRIMARY_NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleHashLink(e, link.href)}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={`rounded-lg px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isActive(link.href)
                  ? 'text-primary font-medium'
                  : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle mounted={mounted} isDark={isDark} onToggle={toggleTheme} />
          <Link
            href={ROUTES.signin}
            className="rounded-lg px-3 py-2 text-sm text-foreground/70 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {CTA.signin}
          </Link>
          <Button size="sm" className="h-10 rounded-full px-5" asChild>
            <Link href={ROUTES.demo}>
              {CTA.demoShort}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle mounted={mounted} isDark={isDark} onToggle={toggleTheme} />
          <button
            type="button"
            onClick={() => setIsMobileOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!isMobileOpen}
        className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto overscroll-contain border-t border-border bg-background px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2 lg:hidden"
      >
        <nav className="flex flex-col py-2" aria-label="Mobile">
          {PRIMARY_NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleHashLink(e, link.href)}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={`flex min-h-[48px] items-center rounded-lg px-3 text-base transition-colors ${
                isActive(link.href)
                  ? 'text-primary font-medium'
                  : 'text-foreground/80 hover:bg-muted hover:text-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-4 flex flex-col gap-3 border-t border-border pt-6">
          <Button variant="outline" className="h-12 w-full rounded-full text-base" asChild>
            <Link href={ROUTES.signin}>{CTA.signin}</Link>
          </Button>
          <Button className="h-12 w-full rounded-full text-base" asChild>
            <Link href={ROUTES.demo}>
              {CTA.demo}
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function ThemeToggle({
  mounted,
  isDark,
  onToggle,
}: {
  mounted: boolean;
  isDark: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex h-11 w-11 items-center justify-center rounded-lg transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      aria-label={mounted ? (isDark ? 'Switch to light theme' : 'Switch to dark theme') : 'Toggle theme'}
    >
      {/* Both icons render until mounted so server and client markup match. */}
      {mounted ? (
        isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5 opacity-0" />
      )}
    </button>
  );
}
