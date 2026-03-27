"use client";

import { cn } from "@/lib/utils";
import { Search, Bell, Sparkles } from "lucide-react";
import { navTabs } from "@/app/demo/data";
import { HeartMetricsLogo } from "@/components/heart-metrics-logo";

interface DemoHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  notificationCount?: number;
}

export function DemoHeader({ activeTab, onTabChange, notificationCount = 2 }: DemoHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-gray-100 bg-white/80 px-6 py-3 backdrop-blur-sm">
      {/* Left: Logo */}
      <HeartMetricsLogo className="w-auto" showText={false} />

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
