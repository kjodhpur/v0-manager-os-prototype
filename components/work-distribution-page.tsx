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
        return "bg-red-100 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800"
      case "High":
        return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800"
      case "Balanced":
        return "bg-green-100 text-green-700 border-green-200 dark:bg-green-950/40 dark:text-green-400 dark:border-green-800"
      case "Light":
        return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800/40 dark:text-gray-400 dark:border-gray-700"
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
                          className="flex h-full items-center justify-center bg-blue-500 text-xs font-medium text-white"
                          style={{ width: `${employee.stretch}%`, minWidth: employee.stretch > 0 ? "28px" : "0" }}
                        >
                          {employee.stretch >= 8 && `${employee.stretch}%`}
                        </div>
                        <div
                          className="flex h-full items-center justify-center bg-gray-400 text-xs font-medium text-white"
                          style={{ width: `${employee.operational}%`, minWidth: employee.operational > 0 ? "28px" : "0" }}
                        >
                          {employee.operational >= 20 && `${employee.operational}%`}
                        </div>
                        <div
                          className="flex h-full items-center justify-center bg-red-400 text-xs font-medium text-white"
                          style={{ width: `${employee.firefighting}%`, minWidth: employee.firefighting > 0 ? "28px" : "0" }}
                        >
                          {employee.firefighting >= 10 && `${employee.firefighting}%`}
                        </div>
                        <div
                          className="flex h-full items-center justify-center bg-gray-300 text-xs font-medium text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                          style={{ width: `${employee.admin}%`, minWidth: employee.admin > 0 ? "20px" : "0" }}
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
              <div className="h-3 w-3 rounded-sm bg-blue-500" />
              <span className="text-sm text-muted-foreground">Strategic/Visible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-gray-400" />
              <span className="text-sm text-muted-foreground">Operational/Routine</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-red-400" />
              <span className="text-sm text-muted-foreground">Firefighting</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-gray-300 dark:bg-gray-600" />
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
