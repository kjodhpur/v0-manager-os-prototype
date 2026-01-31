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
        return "bg-red-100 text-red-700 border-red-200"
      case "High":
        return "bg-amber-100 text-amber-700 border-amber-200"
      case "Balanced":
        return "bg-green-100 text-green-700 border-green-200"
      case "Light":
        return "bg-blue-100 text-blue-700 border-blue-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Work Distribution</h1>
        <p className="text-sm text-gray-500">Workload balance across team</p>
      </div>

      <Card className="border-gray-200 bg-white">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left text-sm text-gray-500">
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
                    className="cursor-pointer border-b border-gray-100 transition-colors last:border-0 hover:bg-gray-50"
                    onClick={() => onEmployeeClick(employee)}
                    onKeyDown={(e) => e.key === "Enter" && onEmployeeClick(employee)}
                    tabIndex={0}
                    role="button"
                  >
                    <td className="px-4 py-3">
                      <span className="font-medium text-gray-900">{employee.name}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{employee.role}</td>
                    <td className="px-4 py-3 text-center font-medium text-gray-900">{employee.wip}</td>
                    <td className="px-4 py-3 text-center text-gray-600">{employee.meetingHours}h</td>
                    <td className="px-4 py-3 text-center">
                      {employee.blocked > 0 ? (
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-sm font-medium text-white">
                          {employee.blocked}
                        </span>
                      ) : (
                        <span className="text-gray-400">0</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge className={`border ${getWorkloadStatusColor(employee.workloadStatus)}`}>
                        {employee.workloadStatus}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex h-5 w-full min-w-[200px] items-center overflow-hidden rounded">
                        {/* Strategic/Visible - Blue */}
                        <div
                          className="flex h-full items-center justify-center bg-blue-500 text-xs font-medium text-white"
                          style={{ width: `${employee.stretch}%`, minWidth: employee.stretch > 0 ? "28px" : "0" }}
                        >
                          {employee.stretch >= 8 && `${employee.stretch}%`}
                        </div>
                        {/* Operational/Routine - Gray */}
                        <div
                          className="flex h-full items-center justify-center bg-gray-400 text-xs font-medium text-white"
                          style={{ width: `${employee.operational}%`, minWidth: employee.operational > 0 ? "28px" : "0" }}
                        >
                          {employee.operational >= 20 && `${employee.operational}%`}
                        </div>
                        {/* Firefighting - Red/Salmon */}
                        <div
                          className="flex h-full items-center justify-center bg-red-400 text-xs font-medium text-white"
                          style={{ width: `${employee.firefighting}%`, minWidth: employee.firefighting > 0 ? "28px" : "0" }}
                        >
                          {employee.firefighting >= 10 && `${employee.firefighting}%`}
                        </div>
                        {/* Admin - Light Gray */}
                        <div
                          className="flex h-full items-center justify-center bg-gray-300 text-xs font-medium text-gray-700"
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
          <div className="flex items-center gap-6 border-t border-gray-200 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-blue-500" />
              <span className="text-sm text-gray-600">Strategic/Visible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-gray-400" />
              <span className="text-sm text-gray-600">Operational/Routine</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-red-400" />
              <span className="text-sm text-gray-600">Firefighting</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-gray-300" />
              <span className="text-sm text-gray-600">Admin</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Averages */}
      <div className="flex justify-end">
        <Card className="border-gray-200 bg-white">
          <CardContent className="p-4">
            <h3 className="mb-2 text-sm font-semibold text-gray-900">Team Averages</h3>
            <div className="flex items-center gap-6 text-sm">
              <div>
                <span className="text-gray-500">WIP: </span>
                <span className="font-medium text-gray-900">{teamStats.wipAverage}</span>
              </div>
              <div>
                <span className="text-gray-500">Meeting Hours: </span>
                <span className="font-medium text-gray-900">{teamStats.meetingHoursAverage}h</span>
              </div>
              <div>
                <span className="text-gray-500">Blocked: </span>
                <span className="font-medium text-gray-900">{teamStats.blockedAverage}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
