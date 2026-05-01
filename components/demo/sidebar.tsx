'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import {
<<<<<<< HEAD
  LayoutDashboard,
  Users,
  TrendingUp,
  BarChart3,
  AlertCircle,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Sparkle
} from 'lucide-react';
import { HeartMetricsLogo } from '../heart-metrics-logo';

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/demo', pageKey: 'overview' },
  { icon: Users, label: 'Team', href: '/demo?page=team-health', pageKey: 'team-health' },
  //{ icon: AlertCircle, label: 'Actions', href: '/demo?page=actions', pageKey: 'actions' },
  { icon: Sparkle, label: 'AI Coach', href: '/demo?page=ai-chat-page', pageKey: 'ai-chat-page' },
  { icon: Settings, label: 'Settings', href: '/demo?page=settings-page', pageKey: 'settings-page' },
];

export function Sidebar({ page }: { page: string }) {
=======
  LayoutDashboard, Sparkles, Users, ListChecks, Settings, LogOut, Menu, X,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { id: 'overview',  label: 'Dashboard', icon: LayoutDashboard, href: '/demo' },
  { id: 'team',      label: 'Team',      icon: Users,           href: '/demo?page=team' },
  { id: 'actions',   label: 'Actions',   icon: ListChecks,      href: '/demo?page=actions' },
  { id: 'ai-coach',  label: 'AI Coach',  icon: Sparkles,        href: '/demo?page=ai-coach' },
  { id: 'settings',  label: 'Integrations', icon: Settings,     href: '/demo?page=settings' },
];

function SidebarInner() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || 'overview';
>>>>>>> refs/remotes/origin/main
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
<<<<<<< HEAD
        className="hidden max-lg:fixed bottom-8 right-8 z-40 p-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full shadow-lg hover:bg-[var(--primary)]/90 transition-all"
=======
        className="lg:hidden fixed bottom-6 right-6 z-50 p-3 bg-primary text-primary-foreground rounded-full shadow-lg"
>>>>>>> refs/remotes/origin/main
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/60"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
<<<<<<< HEAD
        className={`w-64 border-r border-[var(--border)] bg-[var(--neutral)]/50 flex flex-col transition-all duration-300 max-lg:fixed max-lg:top-14 max-lg:left-0 max-lg:bottom-0 max-lg:z-30 min-h-[100vh] max-h-[100vh] ${
          isOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center px-4 gap-2 shrink-0">
          <div className="scale-200 origin-left">
            <HeartMetricsLogo variant="horizontal" className="translate-y-1.5" />
          </div>
        </Link>

        {/* Menu items */}
        <nav className="flex-1 overflow-y-auto py-6 px-3">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = page === item.pageKey;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/30'
                      : 'text-[var(--fg)]/70 hover:text-[var(--fg)] hover:bg-[var(--neutral)]'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="border-t border-[var(--border)] p-4">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--fg)]/70 hover:text-foreground hover:bg-[var(--neutral)] transition-all duration-200">
=======
        className={`w-72 flex-shrink-0 border-r border-border bg-sidebar flex flex-col
          max-lg:fixed max-lg:top-14 max-lg:left-0 max-lg:bottom-0 max-lg:z-40 max-lg:transition-transform
          ${isOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full'}`}
        style={{ height: 'calc(100vh - 56px)' }}
      >
        <nav className="py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === page;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-sidebar-foreground/60 hover:bg-muted hover:text-sidebar-foreground'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-2">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-muted transition-colors">
>>>>>>> refs/remotes/origin/main
            <LogOut className="w-5 h-5" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}

export function Sidebar() {
  return (
    <Suspense fallback={null}>
      <SidebarInner />
    </Suspense>
  );
}
