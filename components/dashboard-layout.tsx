"use client"

import { useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  HeartPulse,
  BarChart3,
  Award,
  ListChecks,
  ChevronDown,
  Calendar,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "team-health", label: "Team Health", icon: HeartPulse },
  { id: "work-distribution", label: "Work Distribution", icon: BarChart3 },
  { id: "recognition-growth", label: "Recognition & Growth", icon: Award },
  { id: "actions", label: "Actions", icon: ListChecks },
]

interface DashboardLayoutProps {
  children: ReactNode
  activeTab: string
  onTabChange: (tab: string) => void
}

export function DashboardLayout({
  children,
  activeTab,
  onTabChange,
}: DashboardLayoutProps) {
  const [team] = useState("AR Ops Team (10)")
  const [timeRange] = useState("Last 4 weeks")

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center">
              <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none">
                <path
                  d="M4 16L12 8L20 16L28 8"
                  stroke="#2563eb"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 24L12 16L20 24L28 16"
                  stroke="#2563eb"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-xl font-semibold text-[#2563eb]">ManagerOS</span>
          </div>

          {/* Team Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 bg-white">
                {team}
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>AR Ops Team (10)</DropdownMenuItem>
              <DropdownMenuItem>Marketing Team (8)</DropdownMenuItem>
              <DropdownMenuItem>Engineering Team (12)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Time Range */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 bg-white">
                <Calendar className="h-4 w-4 text-gray-500" />
                {timeRange}
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Last 7 days</DropdownMenuItem>
              <DropdownMenuItem>Last 4 weeks</DropdownMenuItem>
              <DropdownMenuItem>Last quarter</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Connected Status */}
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1.5 text-sm font-medium text-white">
            Connected
            <CheckCircle className="h-4 w-4" />
          </div>
        </div>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">Alex M.</p>
            <p className="text-xs text-gray-500">(Manager)</p>
          </div>
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Alex M." />
            <AvatarFallback className="bg-amber-100 text-amber-700">AM</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="sticky top-16 h-[calc(100vh-4rem)] w-56 border-r border-gray-200 bg-white p-4">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-[#2563eb]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <Icon className={cn("h-5 w-5", isActive ? "text-[#2563eb]" : "text-gray-400")} />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
