"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, Minus, ArrowUpDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { employees, type Employee } from "@/lib/data"

interface TeamHealthPageProps {
  onEmployeeClick: (employee: Employee) => void
}

type FilterType = "all" | "high-risk" | "watchlist" | "healthy"
type SortType = "score" | "trend" | "workload"

export function TeamHealthPage({ onEmployeeClick }: TeamHealthPageProps) {
  const [filter, setFilter] = useState<FilterType>("all")
  const [sortBy, setSortBy] = useState<SortType>("score")

  const highRisk = employees.filter((e) => e.whi < 50)
  const watchlist = employees.filter((e) => e.whi >= 50 && e.whi < 60)
  const healthy = employees.filter((e) => e.whi >= 60)

  const getFilteredEmployees = () => {
    let filtered: Employee[]
    switch (filter) {
      case "high-risk":
        filtered = highRisk
        break
      case "watchlist":
        filtered = watchlist
        break
      case "healthy":
        filtered = healthy
        break
      default:
        filtered = [...employees]
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "score":
          return a.whi - b.whi
        case "trend":
          const trendOrder = { down: 0, neutral: 1, up: 2 }
          return trendOrder[a.whiTrend] - trendOrder[b.whiTrend]
        case "workload":
          return b.wip - a.wip
        default:
          return a.whi - b.whi
      }
    })
  }

  const filteredEmployees = getFilteredEmployees()

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-emerald-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-amber-500" />
    }
  }

  const getWhiColor = (whi: number) => {
    if (whi < 50) return "text-red-600"
    if (whi < 60) return "text-amber-600"
    return "text-emerald-600"
  }

  const getRiskLabel = (whi: number) => {
    if (whi < 50) return { label: "High Risk", className: "bg-red-500/20 text-red-500" }
    if (whi < 60) return { label: "Watchlist", className: "bg-amber-500/20 text-amber-500" }
    return { label: "Healthy", className: "bg-green-500/20 text-green-500" }
  }

  const renderEmployeeCard = (employee: Employee) => {
    const risk = getRiskLabel(employee.whi)
    return (
      <div
        key={employee.id}
        className="flex cursor-pointer flex-col items-start justify-between gap-3 rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-md sm:flex-row sm:items-center"
        onClick={() => onEmployeeClick(employee)}
        onKeyDown={(e) => e.key === "Enter" && onEmployeeClick(employee)}
        tabIndex={0}
        role="button"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
            {employee.name.split(" ")[0][0]}
            {employee.name.split(" ")[1]?.[0] || ""}
          </div>
          <div>
            <p className="font-medium text-foreground">{employee.name}</p>
            <p className="text-sm text-muted-foreground">{employee.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={risk.className}>{risk.label}</Badge>
          <div className="flex items-center gap-2">
            <span className={`text-xl font-bold ${getWhiColor(employee.whi)}`}>{employee.whi}</span>
            {getTrendIcon(employee.whiTrend)}
          </div>
          <Badge variant="outline" className="text-xs">
            {employee.confidence}
          </Badge>
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation()
              onEmployeeClick(employee)
            }}
          >
            View
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Team Health</h1>
        <p className="text-sm text-muted-foreground">Work Happiness Index distribution across team</p>
      </div>

      {/* WHI Distribution */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">WHI Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-8 w-full overflow-hidden rounded-lg">
            <div
              className="flex items-center justify-center bg-red-400 text-sm font-medium text-white"
              style={{ width: `${(highRisk.length / employees.length) * 100}%` }}
            >
              {highRisk.length}
            </div>
            <div
              className="flex items-center justify-center bg-amber-400 text-sm font-medium text-white"
              style={{ width: `${(watchlist.length / employees.length) * 100}%` }}
            >
              {watchlist.length}
            </div>
            <div
              className="flex items-center justify-center bg-emerald-400 text-sm font-medium text-white"
              style={{ width: `${(healthy.length / employees.length) * 100}%` }}
            >
              {healthy.length}
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm lg:gap-6">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-red-400" />
              <span className="text-muted-foreground">{"High Risk (WHI < 50)"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-amber-400" />
              <span className="text-muted-foreground">Watchlist (50-59)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-emerald-400" />
              <span className="text-muted-foreground">{"Healthy (60+)"}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Sort Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Filter:</span>
          {([
            { value: "all", label: "All", count: employees.length },
            { value: "high-risk", label: "High Risk", count: highRisk.length },
            { value: "watchlist", label: "Watchlist", count: watchlist.length },
            { value: "healthy", label: "Healthy", count: healthy.length },
          ] as const).map((f) => (
            <Button
              key={f.value}
              size="sm"
              variant={filter === f.value ? "default" : "outline"}
              onClick={() => setFilter(f.value)}
              className={filter !== f.value ? "bg-transparent" : ""}
            >
              {f.label} ({f.count})
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Sort:</span>
          {([
            { value: "score", label: "Score" },
            { value: "trend", label: "Trend" },
            { value: "workload", label: "Workload" },
          ] as const).map((s) => (
            <Button
              key={s.value}
              size="sm"
              variant={sortBy === s.value ? "default" : "outline"}
              onClick={() => setSortBy(s.value)}
              className={sortBy !== s.value ? "bg-transparent" : ""}
            >
              {s.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Employee List */}
      <div className="flex flex-col gap-2">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map(renderEmployeeCard)
        ) : (
          <Card className="border-dashed border-border">
            <CardContent className="flex flex-col items-center p-8 text-center">
              <p className="text-sm font-medium text-foreground">No employees match this filter</p>
              <p className="mt-1 text-xs text-muted-foreground">Try selecting a different filter to see results.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
