"use client"

import { useState } from "react"
import {
  AlertTriangle,
  Calendar,
  Star,
  RefreshCw,
  Unlock,
  Check,
  Clock,
  X,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { actions } from "@/lib/data"

interface ActionsPageProps {
  onActionClick: (action: { title: string; description: string }) => void
}

type ActionStatus = "pending" | "in-progress" | "done" | "dismissed"

export function ActionsPage({ onActionClick }: ActionsPageProps) {
  const [actionStatuses, setActionStatuses] = useState<Record<string, ActionStatus>>({})

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
        return "bg-green-500/20 text-green-500"
      case "Medium":
        return "bg-amber-500/20 text-amber-500"
      case "High":
        return "bg-red-500/20 text-red-500"
      default:
        return "bg-muted/30 text-muted-foreground"
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

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "workload":
        return "Reduce Overload"
      case "recognition":
        return "Recognize & Motivate"
      case "growth":
        return "Rotate Stretch Work"
      case "blockers":
        return "Unblock Work"
      case "support":
        return "Repair Trust"
      default:
        return category
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "workload":
        return "border-red-500/30"
      case "recognition":
        return "border-amber-500/30"
      case "growth":
        return "border-primary/30"
      case "blockers":
        return "border-border"
      case "support":
        return "border-green-500/30"
      default:
        return "border-border"
    }
  }

  const handleDoIt = (actionId: string, action: { title: string; description: string }) => {
    setActionStatuses((prev) => ({ ...prev, [actionId]: "in-progress" }))
    onActionClick(action)
  }

  const handleDismiss = (actionId: string) => {
    setActionStatuses((prev) => ({ ...prev, [actionId]: "dismissed" }))
  }

  const getStatusBadge = (status: ActionStatus | undefined) => {
    switch (status) {
      case "in-progress":
        return (
          <Badge className="bg-primary/20 text-primary">
            <Clock className="mr-1 h-3 w-3" />
            In Progress
          </Badge>
        )
      case "done":
        return (
          <Badge className="bg-green-500/20 text-green-500">
            <Check className="mr-1 h-3 w-3" />
            Done
          </Badge>
        )
      case "dismissed":
        return (
          <Badge className="bg-muted/30 text-muted-foreground">
            <X className="mr-1 h-3 w-3" />
            Dismissed
          </Badge>
        )
      default:
        return null
    }
  }

  const groupedActions = actions.reduce(
    (acc, action) => {
      const category = action.category
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(action)
      return acc
    },
    {} as Record<string, typeof actions>
  )

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Actions</h1>
        <p className="text-sm text-muted-foreground">Recommended manager actions to improve team health</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Actions</p>
            <p className="text-2xl font-bold text-foreground">{actions.length}</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">High Impact</p>
            <p className="text-2xl font-bold text-red-600">
              {actions.filter((a) => a.impact === "High").length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Low Effort</p>
            <p className="text-2xl font-bold text-emerald-600">
              {actions.filter((a) => a.effort === "Low").length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">In Progress</p>
            <p className="text-2xl font-bold text-primary">
              {Object.values(actionStatuses).filter((s) => s === "in-progress").length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Grouped Actions */}
      <div className="flex flex-col gap-4">
        {Object.entries(groupedActions).map(([category, categoryActions]) => (
          <Card key={category} className={`border ${getCategoryColor(category)}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{getCategoryLabel(category)}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {categoryActions.map((action) => {
                const status = actionStatuses[action.id]
                const isDisabled = status === "dismissed"

                return (
                  <div
                    key={action.id}
                    className={`rounded-lg border border-border bg-card p-4 ${
                      isDisabled ? "opacity-50" : ""
                    }`}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-start gap-3">
                        {getActionIcon(action.icon)}
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-medium text-foreground">{action.title}</p>
                            {getStatusBadge(status)}
                          </div>
                          <p className="text-sm text-muted-foreground">{action.description}</p>
                          <div className="mt-2 flex flex-wrap items-center gap-4 text-xs">
                            <div className="flex items-center gap-1">
                              <span className="text-muted-foreground">Effort:</span>
                              <Badge className={getEffortColor(action.effort)}>{action.effort}</Badge>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-muted-foreground">Impact:</span>
                              <span className={`font-medium ${getImpactColor(action.impact)}`}>
                                {action.impact}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {!isDisabled && status !== "in-progress" && (
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleDoIt(action.id, { title: action.title, description: action.description })}
                          >
                            Do it
                          </Button>
                          <Button size="sm" variant="outline">
                            Snooze
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-muted-foreground hover:text-foreground"
                            onClick={() => handleDismiss(action.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
