"use client"

import { X, TrendingUp, TrendingDown, Minus, Clock, AlertTriangle, Award, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Employee } from "@/lib/data"

interface EmployeeDrawerProps {
  employee: Employee | null
  isOpen: boolean
  onClose: () => void
  onAction: (actionType: string, employee: Employee) => void
}

export function EmployeeDrawer({ employee, isOpen, onClose, onAction }: EmployeeDrawerProps) {
  if (!employee || !isOpen) return null

  const getTrendIcon = () => {
    switch (employee.whiTrend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-emerald-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-amber-500" />
    }
  }

  const getWhiColor = (whi: number) => {
    if (whi < 40) return "text-red-600"
    if (whi < 60) return "text-amber-600"
    return "text-emerald-600"
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/20"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-card shadow-xl sm:w-96">
        <div className="sticky top-0 flex items-center justify-between border-b border-border bg-card p-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">{employee.name}</h2>
            <p className="text-sm text-muted-foreground">{employee.role}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4">
          {/* WHI Score */}
          <div className="mb-6 rounded-lg bg-muted/50 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Work Happiness Index</span>
              <Badge variant="outline" className="text-xs">
                Confidence: {employee.confidence}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-4xl font-bold ${getWhiColor(employee.whi)}`}>{employee.whi}</span>
              {getTrendIcon()}
            </div>
          </div>

          {/* Top Drivers */}
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">Top Drivers</h3>
            <div className="flex flex-wrap gap-2">
              {employee.drivers.map((driver) => (
                <Badge key={driver} variant="secondary" className="bg-primary/10 text-primary">
                  {driver}
                </Badge>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mb-6 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-border p-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                <span className="text-xs">WIP</span>
              </div>
              <p className="mt-1 text-xl font-semibold text-foreground">{employee.wip}</p>
            </div>
            <div className="rounded-lg border border-border p-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-xs">Meetings</span>
              </div>
              <p className="mt-1 text-xl font-semibold text-foreground">{employee.meetingHours}h</p>
            </div>
            <div className="rounded-lg border border-border p-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-xs">Blocked</span>
              </div>
              <p className="mt-1 text-xl font-semibold text-foreground">{employee.blocked}</p>
            </div>
            <div className="rounded-lg border border-border p-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Award className="h-4 w-4" />
                <span className="text-xs">Recognition</span>
              </div>
              <p className="mt-1 text-xl font-semibold text-foreground">
                {employee.publicRecognition + employee.privateRecognition}
              </p>
            </div>
          </div>

          {/* Work Type Breakdown */}
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">Work Type Breakdown</h3>
            <div className="mb-2 h-4 w-full overflow-hidden rounded-full">
              <div className="flex h-full">
                <div
                  className="bg-blue-500"
                  style={{ width: `${employee.stretch}%` }}
                  title={`Strategic/Visible: ${employee.stretch}%`}
                />
                <div
                  className="bg-gray-400"
                  style={{ width: `${employee.operational}%` }}
                  title={`Operational: ${employee.operational}%`}
                />
                <div
                  className="bg-red-400"
                  style={{ width: `${employee.firefighting}%` }}
                  title={`Firefighting: ${employee.firefighting}%`}
                />
                <div
                  className="bg-gray-300"
                  style={{ width: `${employee.admin}%` }}
                  title={`Admin: ${employee.admin}%`}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="h-2.5 w-2.5 rounded-sm bg-blue-500" />
                Strategic: {employee.stretch}%
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2.5 w-2.5 rounded-sm bg-gray-400" />
                Operational: {employee.operational}%
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2.5 w-2.5 rounded-sm bg-red-400" />
                Firefighting: {employee.firefighting}%
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2.5 w-2.5 rounded-sm bg-gray-300" />
                Admin: {employee.admin}%
              </div>
            </div>
          </div>

          {/* Issue */}
          {employee.issue !== "None" && (
            <div className="mb-6">
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">Current Issue</h3>
              <Badge className="bg-red-100 text-red-700">
                {employee.issue}
              </Badge>
            </div>
          )}

          {/* Recommended Actions */}
          <div className="border-t border-border pt-4">
            <h3 className="mb-3 text-sm font-medium text-muted-foreground">Recommended Actions</h3>
            <div className="flex flex-col gap-2">
              {employee.blocked > 0 && (
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => onAction("unblock", employee)}
                >
                  Schedule unblock meeting
                </Button>
              )}
              {employee.publicRecognition === 0 && (
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => onAction("recognize", employee)}
                >
                  Draft recognition shoutout
                </Button>
              )}
              {employee.workloadStatus === "Overloaded" && (
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => onAction("reassign", employee)}
                >
                  Reassign tasks
                </Button>
              )}
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() => onAction("1on1", employee)}
              >
                Schedule 1:1
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
