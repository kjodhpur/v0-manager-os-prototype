"use client"

import { BarChart3, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { teamStats, orgAverages, teams } from "@/lib/data"

export function BenchmarkingPage() {
  const metrics = [
    { label: "Team WHI", team: teamStats.whiAverage, org: orgAverages.whiAverage },
    { label: "High Risk Count", team: teamStats.highRiskCount, org: orgAverages.highRiskCount, lowerBetter: true },
    { label: "Blocked Work Items", team: teamStats.blockedWorkItems, org: orgAverages.blockedWorkItems, lowerBetter: true },
    { label: "Fairness Score", team: teamStats.managerFairnessScore, org: orgAverages.managerFairnessScore },
  ]

  const getDelta = (team: number, org: number, lowerBetter = false) => {
    const diff = team - org
    const better = lowerBetter ? diff < 0 : diff > 0
    const worse = lowerBetter ? diff > 0 : diff < 0
    return { diff, better, worse }
  }

  const dimensionMetrics = [
    { label: "Engagement Score", team: 72, org: orgAverages.engagement },
    { label: "Workload Balance", team: 65, org: orgAverages.workloadBalance },
    { label: "Recognition Frequency", team: 60, org: orgAverages.recognitionFreq },
    { label: "1:1 Cadence", team: 78, org: orgAverages.oneOnOneCadence },
    { label: "Goal Completion", team: 67, org: orgAverages.goalCompletion },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <BarChart3 className="h-6 w-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Benchmarking</h1>
          <p className="text-sm text-muted-foreground">Compare your team against org-wide averages and other teams</p>
        </div>
      </div>

      {/* Team vs Org KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {metrics.map((m) => {
          const delta = getDelta(m.team, m.org, m.lowerBetter)
          return (
            <Card key={m.label} className="border-border">
              <CardContent className="p-4">
                <p className="text-xs font-medium text-muted-foreground">{m.label}</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-foreground">{m.team}</span>
                  <span className={`flex items-center gap-0.5 text-sm ${delta.better ? "text-emerald-600" : delta.worse ? "text-red-500" : "text-muted-foreground"}`}>
                    {delta.better ? <TrendingUp className="h-3.5 w-3.5" /> : delta.worse ? <TrendingDown className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}
                    {delta.diff > 0 ? "+" : ""}{delta.diff}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Org avg: {m.org}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Dimension Comparison */}
      <Card className="border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-foreground">Team vs. Org Averages</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {dimensionMetrics.map((m) => {
            const delta = getDelta(m.team, m.org)
            return (
              <div key={m.label} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{m.label}</span>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-foreground font-medium">{m.team}</span>
                    <span className="text-xs text-muted-foreground">Org: {m.org}</span>
                    <Badge className={delta.better ? "bg-green-500/20 text-green-500" : delta.worse ? "bg-red-500/20 text-red-500" : "bg-muted text-muted-foreground"}>
                      {delta.diff > 0 ? "+" : ""}{delta.diff}
                    </Badge>
                  </div>
                </div>
                <div className="relative h-4 w-full rounded bg-muted">
                  <div className="absolute inset-y-0 left-0 rounded bg-primary/30" style={{ width: `${m.org}%` }} />
                  <div className="absolute inset-y-0 left-0 rounded bg-primary" style={{ width: `${m.team}%` }} />
                </div>
              </div>
            )
          })}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded bg-primary" />
              <span>Your Team</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded bg-primary/30" />
              <span>Org Average</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cross-Team Comparison */}
      <Card className="border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-foreground">Cross-Team Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left text-sm text-muted-foreground">
                  <th className="pb-3 pr-4 font-medium">Team</th>
                  <th className="pb-3 pr-4 text-center font-medium">Size</th>
                  <th className="pb-3 pr-4 text-center font-medium">WHI</th>
                  <th className="pb-3 pr-4 text-center font-medium">Engagement</th>
                  <th className="pb-3 pr-4 text-center font-medium">Workload Balance</th>
                  <th className="pb-3 text-center font-medium">Goal Completion</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team.id} className="border-b border-border last:border-0">
                    <td className="py-3 pr-4">
                      <span className={`font-medium ${team.id === "t1" ? "text-primary" : "text-foreground"}`}>{team.name}</span>
                      {team.id === "t1" && <Badge className="ml-2 bg-primary/10 text-primary text-xs">Current</Badge>}
                    </td>
                    <td className="py-3 pr-4 text-center text-muted-foreground">{team.size}</td>
                    <td className={`py-3 pr-4 text-center font-medium ${team.whi >= 70 ? "text-emerald-600" : team.whi < 60 ? "text-red-600" : "text-foreground"}`}>{team.whi}</td>
                    <td className="py-3 pr-4 text-center text-foreground">{team.engagement}</td>
                    <td className="py-3 pr-4 text-center text-foreground">{team.workloadBalance}</td>
                    <td className="py-3 text-center text-foreground">{team.goalCompletion}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
