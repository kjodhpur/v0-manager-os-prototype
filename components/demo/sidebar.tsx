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

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/demo' },
  { icon: TrendingUp, label: 'Team', href: '/demo?page=timeline' },
  { icon: AlertCircle, label: 'Actions', href: '/demo?page=actions' },
  { icon: BarChart3, label: 'AI Coach', href: '/demo?page=ai-coach' },
  { icon: Settings, label: 'Settings', href: '/demo?page=settings' },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden max-lg:fixed bottom-8 right-8 z-40 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`w-64 border-r border-border bg-card/50 flex flex-col transition-all duration-300 max-lg:fixed max-lg:top-14 max-lg:left-0 max-lg:bottom-0 max-lg:z-30 ${
          isOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="h-14 border-b border-border flex items-center px-6">
          <span className="font-display text-lg font-bold text-gradient">HM</span>
        </div>

        {/* Menu items */}
        <nav className="flex-1 overflow-y-auto py-6 px-3">
          <div className="space-y-2">
            {menuItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = idx === 0;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/10 text-primary border border-primary/30'
                      : 'text-foreground/70 hover:text-foreground hover:bg-card'
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
        <div className="border-t border-border p-4">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-foreground/70 hover:text-foreground hover:bg-card transition-all duration-200">
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Sign out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
