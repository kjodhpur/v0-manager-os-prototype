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
        return "bg-red-50 border-red-200"
      case "recognition":
        return "bg-amber-50 border-amber-200"
      case "growth":
        return "bg-blue-50 border-blue-200"
      case "blockers":
        return "bg-purple-50 border-purple-200"
      case "support":
        return "bg-emerald-50 border-emerald-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const handleDoIt = (actionId: string, action: { title: string; description: string }) => {
    setActionStatuses((prev) => ({ ...prev, [actionId]: "in-progress" }))
    onActionClick(action)
  }

  const handleSnooze = (actionId: string) => {
    // In a real app, this would reschedule the action
    console.log("Snoozed action:", actionId)
  }

  const handleDismiss = (actionId: string) => {
    setActionStatuses((prev) => ({ ...prev, [actionId]: "dismissed" }))
  }

  const getStatusBadge = (status: ActionStatus | undefined) => {
    switch (status) {
      case "in-progress":
        return (
          <Badge className="bg-blue-100 text-blue-700">
            <Clock className="mr-1 h-3 w-3" />
            In Progress
          </Badge>
        )
      case "done":
        return (
          <Badge className="bg-emerald-100 text-emerald-700">
            <Check className="mr-1 h-3 w-3" />
            Done
          </Badge>
        )
      case "dismissed":
        return (
          <Badge className="bg-gray-100 text-gray-500">
            <X className="mr-1 h-3 w-3" />
            Dismissed
          </Badge>
        )
      default:
        return null
    }
  }

  // Group actions by category
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Actions</h1>
        <p className="text-sm text-gray-500">Recommended manager actions to improve team health</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="border-gray-200 bg-white">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Total Actions</p>
            <p className="text-2xl font-bold text-gray-900">{actions.length}</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200 bg-white">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">High Impact</p>
            <p className="text-2xl font-bold text-red-600">
              {actions.filter((a) => a.impact === "High").length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-gray-200 bg-white">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Low Effort</p>
            <p className="text-2xl font-bold text-emerald-600">
              {actions.filter((a) => a.effort === "Low").length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-gray-200 bg-white">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">In Progress</p>
            <p className="text-2xl font-bold text-blue-600">
              {Object.values(actionStatuses).filter((s) => s === "in-progress").length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Grouped Actions */}
      <div className="space-y-4">
        {Object.entries(groupedActions).map(([category, categoryActions]) => (
          <Card key={category} className={`border ${getCategoryColor(category)}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{getCategoryLabel(category)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {categoryActions.map((action) => {
                const status = actionStatuses[action.id]
                const isDisabled = status === "dismissed"

                return (
                  <div
                    key={action.id}
                    className={`rounded-lg border border-gray-200 bg-white p-4 ${
                      isDisabled ? "opacity-50" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {getActionIcon(action.icon)}
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900">{action.title}</p>
                            {getStatusBadge(status)}
                          </div>
                          <p className="text-sm text-gray-500">{action.description}</p>
                          <div className="mt-2 flex items-center gap-4 text-xs">
                            <div className="flex items-center gap-1">
                              <span className="text-gray-500">Effort:</span>
                              <Badge className={getEffortColor(action.effort)}>{action.effort}</Badge>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-gray-500">Impact:</span>
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
                            className="bg-[#2563eb] text-white hover:bg-blue-700"
                            onClick={() => handleDoIt(action.id, { title: action.title, description: action.description })}
                          >
                            Do it
                          </Button>
                          <Button size="sm" variant="outline" className="bg-white" onClick={() => handleSnooze(action.id)}>
                            Snooze
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-gray-400 hover:text-gray-600"
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
