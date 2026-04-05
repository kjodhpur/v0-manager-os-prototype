'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, ArrowRight } from 'lucide-react';
import { HeartMetricsLogo } from '@/components/heart-metrics-logo';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          <HeartMetricsLogo size="xl" className="translate-y-1" />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/product" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
            Product
          </Link>
          <Link href="/how-we-calculate" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
            How it Works
          </Link>
          <a href="#pricing" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
            Pricing
          </a>
          <Link href="/security" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
            Security
          </Link>
          <Link href="/about" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
            Contact
          </Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/signin"
            className="text-sm text-foreground/70 hover:text-primary transition-colors"
          >
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
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-14 left-0 right-0 bg-card/95 backdrop-blur-xl border-b border-border p-6 lg:hidden">
            <nav className="flex flex-col gap-6 mb-8">
              <Link
                href="/product"
                className="text-foreground/70 hover:text-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Product
              </Link>
              <Link
                href="/how-we-calculate"
                className="text-foreground/70 hover:text-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How it Works
              </Link>
              <a
                href="#pricing"
                className="text-foreground/70 hover:text-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <Link
                href="/security"
                className="text-foreground/70 hover:text-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Security
              </Link>
              <Link
                href="/about"
                className="text-foreground/70 hover:text-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-foreground/70 hover:text-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>

            {/* Bottom CTAs */}
            <div className="flex gap-4 pt-8 border-t border-border">
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
