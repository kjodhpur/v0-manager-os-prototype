"use client";

import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Share2,
  Upload,
  Star,
  Plus,
  FileText,
  Send,
  Settings,
  AlertTriangle,
} from "lucide-react";

interface DemoSidebarProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
}

const sidebarItems = [
  { id: "back", icon: "chevron", label: "Back" },
  { id: "share", icon: Share2, label: "Share" },
  { id: "upload", icon: Upload, label: "Upload" },
  { id: "star", icon: Star, label: "Star" },
  { id: "add", icon: Plus, label: "Add" },
  { id: "files", icon: FileText, label: "Files" },
  { id: "send", icon: Send, label: "Send" },
  { id: "alert", icon: AlertTriangle, label: "Alert" },
];

export function DemoSidebar({ activeItem, onItemClick }: DemoSidebarProps) {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-16 flex-col items-center bg-white py-4 shadow-sm">
      {/* Back chevron */}
      <button
        onClick={() => onItemClick?.("back")}
        className="mb-4 flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-gray-100"
        aria-label="Go back"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Icon buttons */}
      <nav className="flex flex-1 flex-col items-center gap-2">
        {sidebarItems.slice(1).map((item) => {
          const Icon = item.icon as React.ComponentType<{ className?: string }>;
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onItemClick?.(item.id)}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition-all",
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-muted-foreground hover:bg-gray-100"
              )}
              aria-label={item.label}
            >
              <Icon className="h-5 w-5" />
            </button>
          );
        })}
      </nav>

      {/* Settings at bottom */}
      <button
        onClick={() => onItemClick?.("settings")}
        className="mt-auto flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-gray-100"
        aria-label="Settings"
      >
        <Settings className="h-5 w-5" />
      </button>
    </aside>
  );
}
