'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  AlertCircle,
  Settings,
  LogOut,
  Menu,
  X,
  Sparkle,
} from 'lucide-react';
import { HeartMetricsLogo } from '../heart-metrics-logo';

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/demo', pageKey: 'overview' },
  { icon: Users, label: 'Team', href: '/demo?page=team-health', pageKey: 'team-health' },
  { icon: AlertCircle, label: 'Actions', href: '/demo?page=actions', pageKey: 'actions' },
  { icon: Sparkle, label: 'AI Coach', href: '/demo?page=ai-chat-page', pageKey: 'ai-chat-page' },
  { icon: Settings, label: 'Settings', href: '/demo?page=settings-page', pageKey: 'settings-page' },
];

export function Sidebar({ page }: { page: string }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Close the drawer on Escape and lock background scroll while it's open.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile top bar — the drawer is off-canvas below lg, so this is the only way in. */}
      <div className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background px-3 lg:hidden">
        <Link
          href="/"
          className="flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="HeartMetrics home"
        >
          <HeartMetricsLogo variant="horizontal" size="sm" />
        </Link>
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={isOpen}
          aria-controls="demo-sidebar"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Scrim */}
      {isOpen && (
        <div
          className="fixed inset-0 top-14 z-30 bg-black/60 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        id="demo-sidebar"
        className={`z-40 flex w-64 shrink-0 flex-col border-r border-border bg-card transition-transform duration-300 max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:top-14 lg:h-screen lg:sticky lg:top-0 ${
          isOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full'
        }`}
      >
        {/* Logo — hidden on mobile because the top bar already shows it. */}
        <Link
          href="/"
          className="hidden shrink-0 items-center px-5 py-5 lg:flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="HeartMetrics home"
        >
          <HeartMetricsLogo variant="horizontal" size="default" />
        </Link>

        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Demo sections">
          <div className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = page === item.pageKey;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex min-h-[48px] w-full items-center gap-3 rounded-xl px-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isActive
                      ? 'border border-primary/30 bg-primary/10 text-primary'
                      : 'border border-transparent text-foreground/70 hover:bg-muted hover:text-foreground'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-border p-3">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="flex min-h-[48px] w-full items-center gap-3 rounded-xl px-4 text-foreground/70 transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <LogOut className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span className="text-sm font-medium">Exit demo</span>
          </button>
        </div>
      </aside>
    </>
  );
}
