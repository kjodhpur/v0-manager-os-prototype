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
        return <RefreshCw className="h-5 w-5 text-blue-500" />
      case "unblock":
        return <Unlock className="h-5 w-5 text-blue-500" />
      case "calendar":
        return <Calendar className="h-5 w-5 text-blue-500" />
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />
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
        return "text-gray-600"
      case "Medium":
        return "text-amber-600"
      case "High":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="border-gray-200 bg-white">
          <CardContent className="p-4">
            <p className="text-sm font-medium text-gray-600">Team WHI Average</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900">{teamStats.whiAverage}</span>
              {getWhiTrendIcon(teamStats.whiTrend, teamStats.whiChange)}
            </div>
            <p className="mt-1 text-xs text-gray-500">Work Happiness Index</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white">
          <CardContent className="p-4">
            <p className="text-sm font-medium text-gray-600">High Risk Employees</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900">{teamStats.highRiskCount}</span>
            </div>
            <p className="mt-1 flex items-center gap-1 text-xs text-amber-600">
              Need immediate attention
              <AlertTriangle className="h-3 w-3" />
            </p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white">
          <CardContent className="p-4">
            <p className="text-sm font-medium text-gray-600">Blocked Work Items</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900">{teamStats.blockedWorkItems}</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">Active blockers</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white">
          <CardContent className="p-4">
            <p className="text-sm font-medium text-gray-600">Manager Fairness Score</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900">{teamStats.managerFairnessScore}</span>
              <span className="flex items-center gap-1 text-sm text-red-500">
                <TrendingDown className="h-4 w-4" />
                -{teamStats.mfsChange}
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-500">Confidence: {teamStats.mfsConfidence}</p>
          </CardContent>
        </Card>
      </div>

      {/* Attention Needed Table */}
      <Card className="border-gray-200 bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Attention Needed - Top 5 Employees
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 text-left text-sm text-gray-500">
                  <th className="pb-3 pr-4 font-medium">Name</th>
                  <th className="pb-3 pr-4 font-medium">WHI</th>
                  <th className="pb-3 pr-4 font-medium">Issue</th>
                  <th className="pb-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {topAttentionEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b border-gray-100 last:border-0">
                    <td className="py-3 pr-4">
                      <span className="font-medium text-gray-900">{employee.name}</span>
                      <span className="ml-1 text-sm text-gray-500">({employee.role})</span>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-gray-900">{employee.whi}</span>
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
                        className="bg-[#2563eb] text-white hover:bg-blue-700"
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
      <div className="grid grid-cols-3 gap-4">
        {/* Recommended Actions */}
        <Card className="col-span-2 border-gray-200 bg-white">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg font-semibold text-gray-900">
                {"This Week's Recommended Actions"}
              </CardTitle>
              <Badge className="bg-[#2563eb] text-white">{actions.length} actions</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {actions.map((action) => (
                <div
                  key={action.id}
                  className="cursor-pointer rounded-lg border border-gray-200 p-3 transition-shadow hover:shadow-md"
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
                      <p className="text-sm font-medium text-gray-900">{action.title}</p>
                      <p className="text-xs text-gray-500">{action.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-gray-500">Effort:</span>
                    <Badge className={getEffortColor(action.effort)}>{action.effort}</Badge>
                    <span className="ml-2 text-gray-500">Impact:</span>
                    <span className={`font-medium ${getImpactColor(action.impact)}`}>{action.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fairness Insights */}
        <Card className="border-gray-200 bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-gray-900">
              Fairness Insights - {fairnessFlags.length} Risk Flags
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {fairnessFlags.map((flag) => (
                <div key={flag.id} className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{flag.title}</p>
                    <p className="text-xs text-gray-500">{flag.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trust Microcopy */}
      <p className="text-center text-xs text-gray-400">
        This product uses work-system signals (tasks, meetings, assignments). It does not read private messages by
        default.
      </p>
    </div>
  )
}
