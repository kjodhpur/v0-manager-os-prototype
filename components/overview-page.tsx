"use client"

import { TrendingUp, TrendingDown, AlertTriangle, Calendar, Star, RefreshCw, Unlock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { teamStats, topAttentionEmployees, actions, fairnessFlags, type Employee } from "@/lib/data"

interface OverviewPageProps {
  onEmployeeClick: (employee: Employee) => void
  onActionClick: (action: { title: string; description: string }) => void
}

export function OverviewPage({ onEmployeeClick, onActionClick }: OverviewPageProps) {
  const getIssueColor = (issue: string) => {
    switch (issue) {
      case "Blocked + Overloaded":
        return "bg-red-100 text-red-700"
      case "Medium risk":
        return "bg-amber-100 text-amber-700"
      case "High firefighting":
        return "bg-orange-100 text-orange-700"
      case "Declining":
        return "bg-gray-100 text-gray-700"
      case "Recognition gap":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getWhiTrendIcon = (trend: string, change?: number) => {
    if (trend === "up") {
      return (
        <span className="flex items-center gap-1 text-sm text-emerald-600">
          <TrendingUp className="h-4 w-4" />
          {change && `+${change}`}
        </span>
      )
    }
    if (trend === "down") {
      return (
        <span className="flex items-center gap-1 text-sm text-red-500">
          <TrendingDown className="h-4 w-4" />
          {change && `-${change}`}
        </span>
      )
    }
    return null
  }

  const getActionIcon = (icon: string) => {
    switch (icon) {
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "star":
        return <Star className="h-5 w-5 text-amber-500" />
      case "rotate":
        return <RefreshCw className="h-5 w-5 text-primary" />
      case "unblock":
        return <Unlock className="h-5 w-5 text-primary" />
      case "calendar":
        return <Calendar className="h-5 w-5 text-primary" />
      default:
        return <AlertTriangle className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case "Low":
        return "bg-green-100 text-green-700"
      case "Medium":
        return "bg-amber-100 text-amber-700"
      case "High":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Low":
        return "text-muted-foreground"
      case "Medium":
        return "text-amber-600"
      case "High":
        return "text-red-600"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="border-border">
          <CardContent className="p-4">
            <p className="text-sm font-medium text-muted-foreground">Team WHI Average</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground">{teamStats.whiAverage}</span>
              {getWhiTrendIcon(teamStats.whiTrend, teamStats.whiChange)}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Work Happiness Index</p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4">
            <p className="text-sm font-medium text-muted-foreground">High Risk Employees</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground">{teamStats.highRiskCount}</span>
            </div>
            <p className="mt-1 flex items-center gap-1 text-xs text-amber-600">
              Need immediate attention
              <AlertTriangle className="h-3 w-3" />
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4">
            <p className="text-sm font-medium text-muted-foreground">Blocked Work Items</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground">{teamStats.blockedWorkItems}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Active blockers</p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4">
            <p className="text-sm font-medium text-muted-foreground">Manager Fairness Score</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground">{teamStats.managerFairnessScore}</span>
              <span className="flex items-center gap-1 text-sm text-red-500">
                <TrendingDown className="h-4 w-4" />
                -{teamStats.mfsChange}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Confidence: {teamStats.mfsConfidence}</p>
          </CardContent>
        </Card>
      </div>

      {/* Attention Needed Table */}
      <Card className="border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-foreground">
            Attention Needed - Top 5 Employees
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left text-sm text-muted-foreground">
                  <th className="pb-3 pr-4 font-medium">Name</th>
                  <th className="pb-3 pr-4 font-medium">WHI</th>
                  <th className="pb-3 pr-4 font-medium">Issue</th>
                  <th className="pb-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {topAttentionEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b border-border last:border-0">
                    <td className="py-3 pr-4">
                      <span className="font-medium text-foreground">{employee.name}</span>
                      <span className="ml-1 text-sm text-muted-foreground">({employee.role})</span>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-foreground">{employee.whi}</span>
                        {employee.whiTrend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                        {employee.whiTrend === "neutral" && (
                          <span className="inline-block h-0.5 w-3 rounded bg-amber-500" />
                        )}
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <Badge className={getIssueColor(employee.issue)}>{employee.issue}</Badge>
                    </td>
                    <td className="py-3">
                      <Button
                        size="sm"
                        onClick={() => onEmployeeClick(employee)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Actions and Fairness Grid */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Recommended Actions */}
        <Card className="border-border lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg font-semibold text-foreground">
                {"This Week's Recommended Actions"}
              </CardTitle>
              <Badge>{actions.length} actions</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {actions.map((action) => (
                <div
                  key={action.id}
                  className="cursor-pointer rounded-lg border border-border p-3 transition-shadow hover:shadow-md"
                  onClick={() => onActionClick({ title: action.title, description: action.description })}
                  onKeyDown={(e) =>
                    e.key === "Enter" && onActionClick({ title: action.title, description: action.description })
                  }
                  tabIndex={0}
                  role="button"
                >
                  <div className="mb-2 flex items-start gap-2">
                    {getActionIcon(action.icon)}
                    <div>
                      <p className="text-sm font-medium text-foreground">{action.title}</p>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-muted-foreground">Effort:</span>
                    <Badge className={getEffortColor(action.effort)}>{action.effort}</Badge>
                    <span className="ml-1 text-muted-foreground">Impact:</span>
                    <span className={`font-medium ${getImpactColor(action.impact)}`}>{action.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fairness Insights */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-foreground">
              Fairness Insights - {fairnessFlags.length} Risk Flags
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {fairnessFlags.map((flag) => (
                <div key={flag.id} className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{flag.title}</p>
                    <p className="text-xs text-muted-foreground">{flag.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trust Microcopy */}
      <p className="text-center text-xs text-muted-foreground">
        This product uses work-system signals (tasks, meetings, assignments). It does not read private messages by
        default.
      </p>
    </div>
  )
}
