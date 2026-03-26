"use client"

import { TrendingUp, TrendingDown, AlertTriangle, Calendar, Star, RefreshCw, Unlock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { teamStats, topAttentionEmployees, actions, fairnessFlags, type Employee } from "@/lib/data"
import { AiInsightCard } from "@/components/ai/ai-insight-card"
import { useEffect, useState } from "react"

interface OverviewPageProps {
  onEmployeeClick: (employee: Employee) => void
  onActionClick: (action: { title: string; description: string }) => void
}

export function OverviewPage({ onEmployeeClick, onActionClick }: OverviewPageProps) {
  const getIssueColor = (issue: string) => {
    switch (issue) {
      case "Blocked + Overloaded":
        return "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300"
      case "Medium risk":
        return "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300"
      case "High firefighting":
        return "bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-300"
      case "Declining":
        return "bg-muted text-muted-foreground"
      case "Recognition gap":
        return "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getWhiTrendIcon = (trend: string, change?: number) => {
    if (trend === "up") {
      return (
        <span className="flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400">
          <TrendingUp className="h-4 w-4" />
          {change && `+${change}`}
        </span>
      )
    }
    if (trend === "down") {
      return (
        <span className="flex items-center gap-1 text-sm text-red-500 dark:text-red-400">
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
        return <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400" />
      case "star":
        return <Star className="h-5 w-5 text-amber-500 dark:text-amber-400" />
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
        return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300"
      case "Medium":
        return "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300"
      case "High":
        return "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Low":
        return "text-muted-foreground"
      case "Medium":
        return "text-amber-600 dark:text-amber-400"
      case "High":
        return "text-red-600 dark:text-red-400"
      default:
        return "text-muted-foreground"
    }
  }

  // TODO: This is temporary loading state logic to simulate API calls. It can be replaced with real API integration in the future.
  interface User {
    id: string;
    name: string;
    email: string;
    mbti?: string | null;
  }

  const [items, setItems] = useState<User[]|null>(null);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
  fetch('http://localhost:5001/api/index')
    .then(res => res.json())
    .then(data => {
      // Ensure data is an array
      setItems(Array.isArray(data) ? data : []);
    })
    .catch(err => setItems([]));
}, []);

  var myData = {
    "name": "John Doe",
    "email": "mathpun2768@gmail.com",
    "password": "Password123*"
  }

  return (
    // TODO: This is just temporary UI for testing the API route. It can be removed once the API integration is complete.
    <TooltipProvider>
      <button onClick={() => {
        setItems(null);
        setError(null);
        fetch('http://localhost:5001/api/signup', {
          method: "POST", // Specify the method
          headers: {
              "Content-Type": "application/json" // Inform the server of the data format
          },
          body: JSON.stringify(myData) // Convert the JS object to a JSON string
        })
          .then(r => {
            console.log('Response status:', r.status);
            return r.json();
          })
          .then(data => {
            console.log('Parsed data:', data);
            // If data is an object with a users array, extract it. Otherwise use data as-is.
            setItems(Array.isArray(data) ? data : data.users || []);
          })
          .catch(err => {
            console.error('Fetch error:', err);
            setError(err.message);
          });
      }}>
        add account

      </button>
      <div className="flex flex-col gap-6">
        {!items && !error && (
          <p>Loading…</p>
        )}
        {error && (
          <p className="text-red-600">Error: {error}</p>
        )}
        {
          items && (
            <ul>
              {items.map(i => (
                <li key={i.id}>{i.name} ({i.email})</li>
              ))}
            </ul>
          )
        }


        {/* AI Insight Summary */}
        <AiInsightCard />

        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Card className="border-border cursor-help">
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-muted-foreground">Team WHI Average</p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-foreground">{teamStats.whiAverage}</span>
                    {getWhiTrendIcon(teamStats.whiTrend, teamStats.whiChange)}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Work Happiness Index</p>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-xs">
              <p>WHI combines workload, blockers, recognition, and growth signals into a 0-100 score. Higher is better.</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Card className="border-border cursor-help">
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-muted-foreground">High Risk Employees</p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-foreground">{teamStats.highRiskCount}</span>
                  </div>
                  <p className="mt-1 flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                    Need immediate attention
                    <AlertTriangle className="h-3 w-3" />
                  </p>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-xs">
              <p>{"Employees with WHI below 50 are flagged as high risk. They may be overloaded, blocked, or under-recognized."}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Card className="border-border cursor-help">
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-muted-foreground">Blocked Work Items</p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-foreground">{teamStats.blockedWorkItems}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Active blockers</p>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-xs">
              <p>Total tasks currently blocked across the team. Resolving blockers quickly improves team health.</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Card className="border-border cursor-help">
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-muted-foreground">Manager Fairness Score</p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-foreground">{teamStats.managerFairnessScore}</span>
                    <span className="flex items-center gap-1 text-sm text-red-500 dark:text-red-400">
                      <TrendingDown className="h-4 w-4" />
                      -{teamStats.mfsChange}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Confidence: {teamStats.mfsConfidence}</p>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-xs">
              <p>Measures equity in workload, recognition, stretch opportunities, and 1:1 support distribution across your team.</p>
            </TooltipContent>
          </Tooltip>
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
                          {employee.whiTrend === "down" && <TrendingDown className="h-4 w-4 text-red-500 dark:text-red-400" />}
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
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500 dark:text-amber-400" />
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
          This product uses work-system signals (tasks, meetings, assignments). It does not read private messages by default.
        </p>
      </div>
    </TooltipProvider>
  )
}
