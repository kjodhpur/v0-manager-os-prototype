"use client";

import { cn } from "@/lib/utils";
import { Search, Bell, Sparkles } from "lucide-react";
import { navTabs } from "@/app/demo/data";

interface DemoHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  notificationCount?: number;
}

export function DemoHeader({ activeTab, onTabChange, notificationCount = 2 }: DemoHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-gray-100 bg-white/80 px-6 py-3 backdrop-blur-sm">
      {/* Left: Logo placeholder */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-900">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
            </svg>
          </div>
          <span className="text-lg font-semibold">
            <span className="text-gray-400">heart</span>
            <span className="text-gray-900">metrics</span>
          </span>
        </div>
      </div>

      {/* Center: Navigation tabs */}
      <nav className="flex items-center gap-1">
        {navTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all",
              activeTab === tab.id
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50">
          <Search className="h-5 w-5" />
        </button>

        {/* Notifications */}
        <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-medium text-white">
              {notificationCount}
            </span>
          )}
        </button>

        {/* AI Toggle */}
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white transition-colors hover:bg-gray-800">
          <Sparkles className="h-5 w-5" />
        </button>

        {/* Avatar */}
        <button className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-amber-400 to-orange-500">
          <span className="text-sm font-medium text-white">PM</span>
        </button>
      </div>
    </header>
  );
}
