'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
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
} from 'lucide-react';
import { HeartMetricsLogo } from '../heart-metrics-logo';

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/demo', pageKey: 'overview' },
  { icon: Users, label: 'Team', href: '/demo?page=team-health', pageKey: 'team-health' },
  //{ icon: AlertCircle, label: 'Actions', href: '/demo?page=actions', pageKey: 'actions' },
  { icon: BarChart3, label: 'AI Coach', href: '/demo?page=ai-coach', pageKey: 'ai-coach' },
  { icon: Settings, label: 'Settings', href: '/demo?page=settings', pageKey: 'settings' },
];

export function Sidebar({ page }: { page: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden max-lg:fixed bottom-8 right-8 z-40 p-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full shadow-lg hover:bg-[var(--primary)]/90 transition-all"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`w-64 border-r border-[var(--border)] bg-[var(--neutral)]/50 flex flex-col transition-all duration-300 max-lg:fixed max-lg:top-14 max-lg:left-0 max-lg:bottom-0 max-lg:z-30 max-h-[100vh] ${
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
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Sign out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
