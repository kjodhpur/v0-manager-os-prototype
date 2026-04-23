'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import {
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 p-3 bg-primary text-primary-foreground rounded-full shadow-lg"
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
