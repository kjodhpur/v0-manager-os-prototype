"use client"

import { useState } from "react"
import { Target, ChevronDown, ChevronUp, Users, User, Plus, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { objectives, employees, type Objective, type KeyResult } from "@/lib/data"

export function GoalsPage() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [filter, setFilter] = useState<"all" | "team" | "individual">("all")
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [newGoalTitle, setNewGoalTitle] = useState("")
  const [newGoalDescription, setNewGoalDescription] = useState("")
  const [newGoalOwner, setNewGoalOwner] = useState("")
  const [newGoalLevel, setNewGoalLevel] = useState<"team" | "individual">("team")
  const [newKeyResults, setNewKeyResults] = useState<{ title: string; target: string }[]>([{ title: "", target: "" }])

  const filtered = filter === "all" ? objectives : objectives.filter((o) => o.level === filter)

  const teamGoals = objectives.filter((o) => o.level === "team")
  const individualGoals = objectives.filter((o) => o.level === "individual")

  const avgProgress = Math.round(
    objectives.flatMap((o) => o.keyResults).reduce((acc, kr) => acc + kr.progress, 0) /
    objectives.flatMap((o) => o.keyResults).length
  )

  const getStatusColor = (status: KeyResult["status"]) => {
    switch (status) {
      case "On Track": return "bg-emerald-100 text-emerald-700"
      case "At Risk": return "bg-amber-100 text-amber-700"
      case "Behind": return "bg-red-100 text-red-700"
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 70) return "bg-emerald-500"
    if (progress >= 40) return "bg-amber-500"
    return "bg-red-500"
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
        <Button size="sm" onClick={() => setShowAddGoal(true)}>
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

      {/* Add Goal Modal */}
      {showAddGoal && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => setShowAddGoal(false)}
            aria-hidden="true"
          />
          <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg border border-border bg-card p-6 shadow-xl" style={{ maxHeight: "90vh" }}>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">New Goal</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowAddGoal(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="goal-title">Goal Title</Label>
                <Input
                  id="goal-title"
                  placeholder="e.g., Improve team delivery velocity by 20%"
                  value={newGoalTitle}
                  onChange={(e) => setNewGoalTitle(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="goal-description">Description</Label>
                <Textarea
                  id="goal-description"
                  placeholder="Describe the objective..."
                  value={newGoalDescription}
                  onChange={(e) => setNewGoalDescription(e.target.value)}
                  rows={2}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label>Level</Label>
                  <div className="flex gap-2">
                    {(["team", "individual"] as const).map((l) => (
                      <Button
                        key={l}
                        size="sm"
                        variant={newGoalLevel === l ? "default" : "outline"}
                        onClick={() => setNewGoalLevel(l)}
                        className={newGoalLevel !== l ? "bg-transparent" : ""}
                      >
                        {l === "team" ? "Team" : "Individual"}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="goal-owner">Owner</Label>
                  <select
                    id="goal-owner"
                    value={newGoalOwner}
                    onChange={(e) => setNewGoalOwner(e.target.value)}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                  >
                    <option value="">Select owner...</option>
                    <option value="Alex M.">Alex M. (Manager)</option>
                    {employees.map((e) => (
                      <option key={e.id} value={e.name}>{e.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label>Key Results</Label>
                {newKeyResults.map((kr, i) => (
                  <div key={`new-kr-${i}`} className="flex gap-2">
                    <Input
                      placeholder="Key result description"
                      value={kr.title}
                      onChange={(e) => {
                        const updated = [...newKeyResults]
                        updated[i] = { ...updated[i], title: e.target.value }
                        setNewKeyResults(updated)
                      }}
                      className="flex-1"
                    />
                    <Input
                      placeholder="Target"
                      value={kr.target}
                      onChange={(e) => {
                        const updated = [...newKeyResults]
                        updated[i] = { ...updated[i], target: e.target.value }
                        setNewKeyResults(updated)
                      }}
                      className="w-32"
                    />
                    {newKeyResults.length > 1 && (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="shrink-0 text-muted-foreground hover:text-destructive"
                        onClick={() => setNewKeyResults(newKeyResults.filter((_, idx) => idx !== i))}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  size="sm"
                  variant="outline"
                  className="w-fit bg-transparent"
                  onClick={() => setNewKeyResults([...newKeyResults, { title: "", target: "" }])}
                >
                  <Plus className="mr-1 h-3.5 w-3.5" /> Add Key Result
                </Button>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="goal-due">Due Date</Label>
                <Input id="goal-due" type="date" defaultValue="2026-03-31" />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Align to Team OKR</Label>
                <select className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground">
                  <option value="">None (standalone goal)</option>
                  {objectives.filter((o) => o.level === "team").map((o) => (
                    <option key={o.id} value={o.id}>{o.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t border-border pt-4">
              <Button variant="outline" className="bg-transparent" onClick={() => setShowAddGoal(false)}>Cancel</Button>
              <Button
                disabled={!newGoalTitle.trim()}
                onClick={() => {
                  setShowAddGoal(false)
                  setNewGoalTitle("")
                  setNewGoalDescription("")
                  setNewGoalOwner("")
                  setNewKeyResults([{ title: "", target: "" }])
                }}
              >
                Create Goal
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
