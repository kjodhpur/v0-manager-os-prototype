import Link from 'next/link';
import { ArrowRight, Home } from 'lucide-react';
import { SiteHeader } from '@/components/site/site-header';
import { SiteFooter } from '@/components/site/site-footer';
import { Button } from '@/components/ui/button';
import { PRIMARY_NAV, ROUTES, CTA } from '@/lib/site-config';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex flex-1 items-center justify-center px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl text-center">
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-primary">Error 404</p>

          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            This page doesn&apos;t exist
          </h1>

          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            The link may be outdated or mistyped. Here&apos;s the way back.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" className="h-12 rounded-full px-7" asChild>
              <Link href={ROUTES.home}>
                <Home className="mr-2 h-4 w-4" />
                Back to home
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 rounded-full px-7" asChild>
              <Link href={ROUTES.demo}>
                {CTA.demo}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-14 border-t border-border pt-8">
            <h2 className="text-sm font-medium text-muted-foreground">Or jump to a section</h2>
            <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-3">
              {PRIMARY_NAV.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/70 underline-offset-4 transition-colors hover:text-primary hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
