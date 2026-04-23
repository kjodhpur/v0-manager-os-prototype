'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';
import { HeartMetricsLogo } from '@/components/heart-metrics-logo';

const NAV_ITEMS = [
  { label: 'Product',      id: 'product' },
  { label: 'How it Works', id: 'how-we-calculate' },
  { label: 'Pricing',      id: 'pricing' },
  { label: 'Security',     id: 'security' },
  { label: 'About',        id: 'about' },
  { label: 'Contact',      id: 'contact' },
];

const HEADER_HEIGHT = 56; // matches h-14

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
  window.scrollTo({ top, behavior: 'smooth' });
}

export function Navigation() {
  const [isScrolled, setIsScrolled]         = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark]                 = useState(true);
  const [mounted, setMounted]               = useState(false);
  const [activeSection, setActiveSection]   = useState('');

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(savedTheme === 'dark' || (savedTheme === null && prefersDark));

    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });

    // Intersection Observer for active link
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    // Observe all anchor sections
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    if (href?.startsWith('#')) {
      e.preventDefault();
      smoothScrollTo(href.substring(1));
      setIsMobileMenuOpen(false);
    }
  };

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle('dark', newIsDark);
    document.documentElement.classList.toggle('light', !newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-14 transition-all duration-500 ${
        isScrolled
          ? 'bg-card/80 backdrop-blur-xl border-b border-border shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="scale-[2.5] origin-left">
            <HeartMetricsLogo variant="horizontal" className="translate-y-1" />
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={handleSmoothScroll}
              className={`text-sm transition-colors ${
                activeSection === id
                  ? 'text-primary font-medium'
                  : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-card rounded-lg transition-colors"
            aria-label="Toggle theme"
          >
            {mounted && isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <Link href="/signin" className="text-sm text-foreground/70 hover:text-primary transition-colors">
            Sign in
          </Link>
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full btn-glow px-6 h-10"
            asChild
          >
            <Link href="/demo">
              Try Demo
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 hover:bg-card rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-14 left-0 right-0 bg-card/95 backdrop-blur-xl border-b border-border p-6 lg:hidden">
            <nav className="flex flex-col gap-6 mb-8">
              {NAV_ITEMS.map(({ label, id }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={handleSmoothScroll}
                  className={`transition-colors ${
                    activeSection === id
                      ? 'text-primary font-medium'
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  {label}
                </a>
              ))}
            </nav>

            <div className="flex gap-4 pt-8 border-t border-border">
              <button
                onClick={toggleTheme}
                className="p-3 hover:bg-card rounded-lg transition-colors border border-border"
                aria-label="Toggle theme"
              >
                {mounted && isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <Button
                variant="outline"
                className="flex-1 rounded-full h-12 text-base border-primary/30 hover:border-primary/60"
                onClick={() => setIsMobileMenuOpen(false)}
                asChild
              >
                <Link href="/signin">Sign in</Link>
              </Button>
              <Button
                className="flex-1 bg-primary text-primary-foreground rounded-full h-12 text-base btn-glow"
                onClick={() => setIsMobileMenuOpen(false)}
                asChild
              >
                <Link href="/demo">Try Demo</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
