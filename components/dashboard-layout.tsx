"use client"

import { useState, useEffect, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  HeartPulse,
  BarChart3,
  Award,
  ListChecks,
  Link2,
  Settings,
  ChevronDown,
  Calendar,
  CheckCircle,
  Menu,
  X,
  LogOut,
  Brain,
  Users,
  ClipboardList,
  Target,
  Clock,
  Flame,
  FileText,
  MessageSquare,
  Sun,
  Moon,
  Scale,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { HeartMetricsLogo } from "@/components/heart-metrics-logo"
import { NotificationsPanel } from "@/components/notifications-panel"
import { NudgeBar } from "@/components/nudge-bar"
import { teams } from "@/lib/data"
import Link from "next/link"

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "ai-coach", label: "AI Coach", icon: Brain },
  { id: "team-health", label: "Team Health", icon: HeartPulse },
  { id: "burnout-risk", label: "Burnout Risk", icon: Flame },
  { id: "work-distribution", label: "Work Distribution", icon: BarChart3 },
  { id: "meetings", label: "1:1 Meetings", icon: Calendar },
  { id: "surveys", label: "Pulse Surveys", icon: ClipboardList },
  { id: "goals", label: "Goals & OKRs", icon: Target },
  { id: "recognition-growth", label: "Recognition", icon: Award },
  { id: "feedback", label: "Feedback Wall", icon: MessageSquare },
  { id: "timeline", label: "Timeline", icon: Clock },
  { id: "benchmarking", label: "Benchmarking", icon: Scale },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "actions", label: "Actions", icon: ListChecks },
  { id: "integrations", label: "Integrations", icon: Link2 },
  { id: "settings", label: "Settings", icon: Settings },
]

const mobileNavItems = navItems.slice(0, 5)

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
  const [selectedTeam, setSelectedTeam] = useState(teams[0])
  const [timeRange, setTimeRange] = useState("Last 4 weeks")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
  }, [darkMode])

  return (
    <div className="min-h-screen bg-background">
      {/* Nudge Bar */}
      <NudgeBar onNavigate={onTabChange} />

      {/* Top Bar */}
      <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-card px-3 md:h-16 md:px-6">
        <div className="flex items-center gap-3 md:gap-6">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Logo */}
          <Link href="/" className="hidden md:block">
            <HeartMetricsLogo />
          </Link>
          <Link href="/" className="md:hidden">
            <img
              src="/heartmetrics-logo.jpg"
              alt="HeartMetrics"
              className="h-7 w-7 rounded object-contain"
            />
          </Link>

          {/* Multi-Team Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="hidden gap-2 md:flex bg-transparent">
                <Users className="h-3.5 w-3.5 text-muted-foreground" />
                {selectedTeam.name} ({selectedTeam.size})
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {teams.map((team) => (
                <DropdownMenuItem key={team.id} onClick={() => setSelectedTeam(team)}>
                  <div className="flex items-center gap-2">
                    <span>{team.name} ({team.size})</span>
                    {team.id === selectedTeam.id && <CheckCircle className="h-3.5 w-3.5 text-primary" />}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Time Range */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="hidden gap-2 lg:flex bg-transparent">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                {timeRange}
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setTimeRange("Last 7 days")}>Last 7 days</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange("Last 4 weeks")}>Last 4 weeks</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange("Last quarter")}>Last quarter</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Connected Status */}
          <div className="hidden items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground md:flex">
            Connected
            <CheckCircle className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* Right side: dark mode, notifications, user */}
        <div className="flex items-center gap-2">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Notifications */}
          <NotificationsPanel onNavigate={onTabChange} />

          <div className="hidden text-right md:block">
            <p className="text-sm font-medium text-foreground">Alex M.</p>
            <p className="text-xs text-muted-foreground">(Manager)</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="focus:outline-none">
                <Avatar className="h-8 w-8 md:h-9 md:w-9">
                  <AvatarFallback className="bg-primary/10 text-sm font-medium text-primary">AM</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="md:hidden">
                <span className="font-medium">Alex M.</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onTabChange("settings")}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Mobile slide-out menu */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-30 bg-black/20 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 z-40 w-64 overflow-y-auto bg-card shadow-xl md:hidden" style={{ top: "3.5rem" }}>
            <nav className="flex flex-col gap-1 p-4">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onTabChange(item.id)
                      setMobileMenuOpen(false)
                    }}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")} />
                    {item.label}
                  </button>
                )
              })}
            </nav>
          </div>
        </>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto border-r border-border bg-card p-4 md:top-16 md:block md:h-[calc(100vh-4rem)]">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 pb-20 md:p-6 md:pb-6">{children}</main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-border bg-card py-2 md:hidden">
        {mobileNavItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex flex-col items-center gap-1 px-2 py-1 text-xs",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="truncate text-[10px]">{item.label.split(" ")[0]}</span>
            </button>
          )
        })}
      </nav>

      {/* Demo mode banner */}
      <div className="border-t border-border bg-accent px-4 py-2">
        <p className="text-center text-xs font-medium text-accent-foreground">
          Demo Mode - You are viewing simulated sample data. Connect real tools in Integrations to see your team.
        </p>
      </div>

      {/* Trust microcopy */}
      <div className="hidden border-t border-border bg-card p-3 md:block">
        <p className="text-center text-xs text-muted-foreground">
          This product uses work-system signals (tasks, meetings, assignments). It does not read private messages by default.
        </p>
      </div>
    </div>
  )
}
