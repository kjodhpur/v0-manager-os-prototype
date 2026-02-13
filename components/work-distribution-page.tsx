"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { employees, teamStats, type Employee } from "@/lib/data"

interface WorkDistributionPageProps {
  onEmployeeClick: (employee: Employee) => void
}

export function WorkDistributionPage({ onEmployeeClick }: WorkDistributionPageProps) {
  const getWorkloadStatusColor = (status: string) => {
    switch (status) {
      case "Overloaded":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-900"
      case "High":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900"
      case "Balanced":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-900"
      case "Light":
        return "bg-accent text-accent-foreground border-border"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Work Distribution</h1>
        <p className="text-sm text-muted-foreground">Workload balance across team</p>
      </div>

      <Card className="border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50 text-left text-sm text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Employee</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 text-center font-medium">WIP</th>
                  <th className="px-4 py-3 text-center font-medium">Meeting Hours</th>
                  <th className="px-4 py-3 text-center font-medium">Blocked Items</th>
                  <th className="px-4 py-3 text-center font-medium">Workload Status</th>
                  <th className="px-4 py-3 font-medium">Work Type Breakdown</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="cursor-pointer border-b border-border transition-colors last:border-0 hover:bg-muted/30"
                    onClick={() => onEmployeeClick(employee)}
                    onKeyDown={(e) => e.key === "Enter" && onEmployeeClick(employee)}
                    tabIndex={0}
                    role="button"
                  >
                    <td className="px-4 py-3">
                      <span className="font-medium text-foreground">{employee.name}</span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{employee.role}</td>
                    <td className="px-4 py-3 text-center font-medium text-foreground">{employee.wip}</td>
                    <td className="px-4 py-3 text-center text-muted-foreground">{employee.meetingHours}h</td>
                    <td className="px-4 py-3 text-center">
                      {employee.blocked > 0 ? (
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-sm font-medium text-white">
                          {employee.blocked}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">0</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge className={`border ${getWorkloadStatusColor(employee.workloadStatus)}`}>
                        {employee.workloadStatus}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex h-5 w-full min-w-[200px] items-center overflow-hidden rounded">
                        <div
                          className="flex h-full items-center justify-center text-xs font-medium text-[#EDEDCE]"
                          style={{ width: `${employee.stretch}%`, minWidth: employee.stretch > 0 ? "28px" : "0", backgroundColor: "#0C2C55" }}
                        >
                          {employee.stretch >= 8 && `${employee.stretch}%`}
                        </div>
                        <div
                          className="flex h-full items-center justify-center text-xs font-medium text-white"
                          style={{ width: `${employee.operational}%`, minWidth: employee.operational > 0 ? "28px" : "0", backgroundColor: "#296374" }}
                        >
                          {employee.operational >= 20 && `${employee.operational}%`}
                        </div>
                        <div
                          className="flex h-full items-center justify-center text-xs font-medium text-white"
                          style={{ width: `${employee.firefighting}%`, minWidth: employee.firefighting > 0 ? "28px" : "0", backgroundColor: "#629FAD" }}
                        >
                          {employee.firefighting >= 10 && `${employee.firefighting}%`}
                        </div>
                        <div
                          className="flex h-full items-center justify-center text-xs font-medium text-[#296374]"
                          style={{ width: `${employee.admin}%`, minWidth: employee.admin > 0 ? "20px" : "0", backgroundColor: "#EDEDCE" }}
                        >
                          {employee.admin >= 5 && `${employee.admin}%`}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 border-t border-border px-4 py-3 lg:gap-6">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: "#0C2C55" }} />
              <span className="text-sm text-muted-foreground">Strategic/Visible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: "#296374" }} />
              <span className="text-sm text-muted-foreground">Operational/Routine</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: "#629FAD" }} />
              <span className="text-sm text-muted-foreground">Firefighting</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: "#EDEDCE" }} />
              <span className="text-sm text-muted-foreground">Admin</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Averages */}
      <div className="flex justify-end">
        <Card className="border-border">
          <CardContent className="p-4">
            <h3 className="mb-2 text-sm font-semibold text-foreground">Team Averages</h3>
            <div className="flex flex-wrap items-center gap-4 text-sm lg:gap-6">
              <div>
                <span className="text-muted-foreground">WIP: </span>
                <span className="font-medium text-foreground">{teamStats.wipAverage}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Meeting Hours: </span>
                <span className="font-medium text-foreground">{teamStats.meetingHoursAverage}h</span>
              </div>
              <div>
                <span className="text-muted-foreground">Blocked: </span>
                <span className="font-medium text-foreground">{teamStats.blockedAverage}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
