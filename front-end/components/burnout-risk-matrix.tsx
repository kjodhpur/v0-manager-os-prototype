"use client"

import { Flame, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { employees, type Employee } from "@/lib/data"

interface BurnoutRiskMatrixProps {
  onEmployeeClick: (employee: Employee) => void
}

export function BurnoutRiskMatrix({ onEmployeeClick }: BurnoutRiskMatrixProps) {
  // Risk = (workload weight) + (blocker weight) + (meeting weight) + (recognition deficit) + (sentiment inverse)
  const calculateBurnoutRisk = (e: Employee) => {
    const workloadScore = e.wip >= 9 ? 3 : e.wip >= 7 ? 2 : 1
    const blockerScore = e.blocked >= 3 ? 3 : e.blocked >= 1 ? 2 : 1
    const meetingScore = e.meetingHours >= 10 ? 3 : e.meetingHours >= 8 ? 2 : 1
    const recogScore = (e.publicRecognition + e.privateRecognition) === 0 ? 3 : (e.publicRecognition + e.privateRecognition) < 2 ? 2 : 1
    const sentimentScore = (e.sentiment || 50) < 40 ? 3 : (e.sentiment || 50) < 55 ? 2 : 1
    const total = workloadScore + blockerScore + meetingScore + recogScore + sentimentScore
    const max = 15
    return Math.round((total / max) * 100)
  }

  const enriched = employees.map((e) => ({
    ...e,
    burnoutRisk: calculateBurnoutRisk(e),
  })).sort((a, b) => b.burnoutRisk - a.burnoutRisk)

  const getRiskColor = (risk: number) => {
    if (risk >= 70) return "bg-red-500"
    if (risk >= 50) return "bg-amber-500"
    return "bg-emerald-500"
  }

  const getRiskLabel = (risk: number) => {
    if (risk >= 70) return { label: "High", className: "bg-red-100 text-red-700" }
    if (risk >= 50) return { label: "Medium", className: "bg-amber-100 text-amber-700" }
    return { label: "Low", className: "bg-emerald-100 text-emerald-700" }
  }

  const high = enriched.filter((e) => e.burnoutRisk >= 70)
  const medium = enriched.filter((e) => e.burnoutRisk >= 50 && e.burnoutRisk < 70)
  const low = enriched.filter((e) => e.burnoutRisk < 50)

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Flame className="h-6 w-6 text-red-500" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Burnout Risk Matrix</h1>
            <p className="text-sm text-muted-foreground">Composite risk score based on workload, blockers, meetings, recognition, and sentiment</p>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="border-red-200">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-red-600">{high.length}</p>
              <p className="text-xs text-muted-foreground">High Risk</p>
            </CardContent>
          </Card>
          <Card className="border-amber-200">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-amber-600">{medium.length}</p>
              <p className="text-xs text-muted-foreground">Medium Risk</p>
            </CardContent>
          </Card>
          <Card className="border-emerald-200">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-emerald-600">{low.length}</p>
              <p className="text-xs text-muted-foreground">Low Risk</p>
            </CardContent>
          </Card>
        </div>

        {/* Matrix Heatmap */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-foreground">Risk Heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {enriched.map((employee) => {
                const risk = getRiskLabel(employee.burnoutRisk)
                return (
                  <Tooltip key={employee.id}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => onEmployeeClick(employee)}
                        className="flex flex-col items-center gap-2 rounded-lg border border-border p-3 transition-shadow hover:shadow-md"
                      >
                        <div className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white ${getRiskColor(employee.burnoutRisk)}`}>
                          {employee.burnoutRisk}
                        </div>
                        <p className="text-sm font-medium text-foreground">{employee.name}</p>
                        <Badge className={risk.className}>{risk.label}</Badge>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <div className="flex flex-col gap-1 text-xs">
                        <p className="font-medium">{employee.name} - Risk Score: {employee.burnoutRisk}/100</p>
                        <p>WIP: {employee.wip} | Blocked: {employee.blocked} | Meetings: {employee.meetingHours}h</p>
                        <p>Recognition: {employee.publicRecognition + employee.privateRecognition} | Sentiment: {employee.sentiment || "N/A"}</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Table */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-foreground">Detailed Risk Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left text-sm text-muted-foreground">
                    <th className="pb-3 pr-4 font-medium">Employee</th>
                    <th className="pb-3 pr-4 text-center font-medium">Risk</th>
                    <th className="pb-3 pr-4 text-center font-medium">WIP</th>
                    <th className="pb-3 pr-4 text-center font-medium">Blocked</th>
                    <th className="pb-3 pr-4 text-center font-medium">Meetings</th>
                    <th className="pb-3 pr-4 text-center font-medium">Recognition</th>
                    <th className="pb-3 text-center font-medium">Sentiment</th>
                  </tr>
                </thead>
                <tbody>
                  {enriched.map((employee) => {
                    const risk = getRiskLabel(employee.burnoutRisk)
                    return (
                      <tr key={employee.id} className="border-b border-border last:border-0 cursor-pointer hover:bg-muted/50" onClick={() => onEmployeeClick(employee)}>
                        <td className="py-3 pr-4">
                          <span className="font-medium text-foreground">{employee.name}</span>
                          <span className="ml-1 text-sm text-muted-foreground">({employee.role})</span>
                        </td>
                        <td className="py-3 pr-4 text-center">
                          <Badge className={risk.className}>{employee.burnoutRisk}</Badge>
                        </td>
                        <td className={`py-3 pr-4 text-center ${employee.wip >= 9 ? "font-medium text-red-600" : "text-foreground"}`}>{employee.wip}</td>
                        <td className={`py-3 pr-4 text-center ${employee.blocked >= 3 ? "font-medium text-red-600" : "text-foreground"}`}>{employee.blocked}</td>
                        <td className={`py-3 pr-4 text-center ${employee.meetingHours >= 10 ? "font-medium text-red-600" : "text-foreground"}`}>{employee.meetingHours}h</td>
                        <td className={`py-3 pr-4 text-center ${(employee.publicRecognition + employee.privateRecognition) === 0 ? "font-medium text-red-600" : "text-foreground"}`}>
                          {employee.publicRecognition + employee.privateRecognition}
                        </td>
                        <td className={`py-3 text-center ${(employee.sentiment || 50) < 45 ? "font-medium text-red-600" : "text-foreground"}`}>
                          {employee.sentiment || "N/A"}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}
