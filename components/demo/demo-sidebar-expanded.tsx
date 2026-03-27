"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, Share2, Upload, Star, Plus, FileText, Send, Settings, AlertTriangle, LayoutDashboard, Zap, Activity, TrendingDown, Grid, Clock, MessageSquare, Target, Hand, MessageCircle, BarChart3, Calendar, Zap as ZapIcon, Cog } from "lucide-react";

interface DemoSidebarExpandedProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
}

const sidebarItems = [
  { id: "overview", icon: LayoutDashboard, label: "Overview" },
  { id: "ai-coach", icon: Zap, label: "AI Coach" },
  { id: "team-health", icon: Activity, label: "Team Health" },
  { id: "burnout-risk", icon: TrendingDown, label: "Burnout Risk" },
  { id: "work-dist", icon: Grid, label: "Work Distribution" },
  { id: "1-1-meetings", icon: Clock, label: "1:1 Meetings" },
  { id: "pulse", icon: MessageSquare, label: "Pulse Surveys" },
  { id: "goals", icon: Target, label: "Goals & OKRs" },
  { id: "recognition", icon: Hand, label: "Recognition" },
  { id: "feedback", icon: MessageCircle, label: "Feedback Wall" },
  { id: "timeline", icon: BarChart3, label: "Timeline" },
  { id: "benchmarking", icon: BarChart3, label: "Benchmarking" },
  { id: "reports", icon: BarChart3, label: "Reports" },
  { id: "calendar", icon: Calendar, label: "Calendar" },
  { id: "actions", icon: ZapIcon, label: "Actions" },
  { id: "integrations", icon: Share2, label: "Integrations" },
  { id: "settings", icon: Cog, label: "Settings" },
];

export function DemoSidebarExpanded({ activeItem = "overview", onItemClick }: DemoSidebarExpandedProps) {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-48 flex-col bg-white border-r border-gray-100 shadow-sm">
      {/* Header with back button */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
        <button
          onClick={() => onItemClick?.("back")}
          className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 transition-colors flex-shrink-0"
          aria-label="Go back"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-sm font-semibold text-gray-600 truncate">HeartMetrics</span>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onItemClick?.(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-1",
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom settings */}
      <div className="border-t border-gray-100 px-2 py-4">
        <button
          onClick={() => onItemClick?.("settings")}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
            activeItem === "settings"
              ? "bg-gray-900 text-white"
              : "text-gray-600 hover:bg-gray-50"
          )}
        >
          <Settings className="h-5 w-5 flex-shrink-0" />
          <span className="truncate">Settings</span>
        </button>
      </div>
    </aside>
  );
}
