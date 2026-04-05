"use client"

import { useState } from "react"
import { Target, ChevronDown, ChevronUp, Users, User, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { objectives, type Objective, type KeyResult } from "@/lib/data"

export function GoalsPage() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [filter, setFilter] = useState<"all" | "team" | "individual">("all")

  const filtered = filter === "all" ? objectives : objectives.filter((o) => o.level === filter)

  const teamGoals = objectives.filter((o) => o.level === "team")
  const individualGoals = objectives.filter((o) => o.level === "individual")

  const avgProgress = Math.round(
    objectives.flatMap((o) => o.keyResults).reduce((acc, kr) => acc + kr.progress, 0) /
    objectives.flatMap((o) => o.keyResults).length
  )

  const getStatusColor = (status: KeyResult["status"]) => {
    switch (status) {
      case "On Track": return "bg-green-500/15 text-emerald-700"
      case "At Risk": return "bg-amber-500/15 text-amber-700"
      case "Behind": return "bg-red-500/15 text-red-700"
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 70) return "bg-green-500/100"
    if (progress >= 40) return "bg-amber-500/100"
    return "bg-red-500/100"
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Target className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Goals & OKRs</h1>
            <p className="text-sm text-muted-foreground">Track team and individual objectives</p>
          </div>
        </div>
        <Button size="sm">
          <Plus className="mr-1 h-4 w-4" /> New Goal
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{objectives.length}</p>
            <p className="text-xs text-muted-foreground">Total Goals</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{avgProgress}%</p>
            <p className="text-xs text-muted-foreground">Avg Progress</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{teamGoals.length}</p>
            <p className="text-xs text-muted-foreground">Team Goals</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{individualGoals.length}</p>
            <p className="text-xs text-muted-foreground">Individual Goals</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {(["all", "team", "individual"] as const).map((f) => (
          <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)} className={filter !== f ? "bg-transparent" : ""}>
            {f === "all" ? "All" : f === "team" ? "Team" : "Individual"}
          </Button>
        ))}
      </div>

      {/* Objectives */}
      <div className="flex flex-col gap-4">
        {filtered.map((objective) => {
          const isExpanded = expanded === objective.id
          const objProgress = Math.round(objective.keyResults.reduce((acc, kr) => acc + kr.progress, 0) / objective.keyResults.length)

          return (
            <Card key={objective.id} className="border-border">
              <CardContent className="p-4">
                <button
                  onClick={() => setExpanded(isExpanded ? null : objective.id)}
                  className="flex w-full items-start justify-between text-left"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    {objective.level === "team" ? (
                      <Users className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    ) : (
                      <User className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">{objective.title}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span>Owner: {objective.owner}</span>
                        <span>Due: {new Date(objective.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                        <Badge variant="outline" className="text-xs">{objective.level}</Badge>
                      </div>
                      {/* Overall Progress */}
                      <div className="mt-2 flex items-center gap-2">
                        <div className="h-2 w-32 rounded-full bg-muted">
                          <div className={`h-2 rounded-full ${getProgressColor(objProgress)}`} style={{ width: `${objProgress}%` }} />
                        </div>
                        <span className="text-xs font-medium text-foreground">{objProgress}%</span>
                      </div>
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                </button>

                {isExpanded && (
                  <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Key Results</h4>
                    {objective.keyResults.map((kr) => (
                      <div key={kr.id} className="rounded-lg bg-muted/50 p-3">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm text-foreground">{kr.title}</p>
                          <Badge className={getStatusColor(kr.status)}>{kr.status}</Badge>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="h-1.5 flex-1 rounded-full bg-muted">
                            <div className={`h-1.5 rounded-full ${getProgressColor(kr.progress)}`} style={{ width: `${kr.progress}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground">{kr.progress}%</span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">Target: {kr.target}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
