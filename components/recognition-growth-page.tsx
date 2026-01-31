"use client"

import { Star, Award, TrendingUp, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { employees, type Employee } from "@/lib/data"

interface RecognitionGrowthPageProps {
  onEmployeeClick: (employee: Employee) => void
  onActionClick: (action: { title: string; description: string }) => void
}

export function RecognitionGrowthPage({ onEmployeeClick, onActionClick }: RecognitionGrowthPageProps) {
  const recognitionGap = employees.filter((e) => e.publicRecognition === 0)
  const topRecognized = employees.filter((e) => e.publicRecognition > 0).sort((a, b) => b.publicRecognition - a.publicRecognition)
  const lowStretch = employees.filter((e) => e.stretch < 15).sort((a, b) => a.stretch - b.stretch)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Recognition & Growth</h1>
        <p className="text-sm text-gray-500">Track recognition and development opportunities across team</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Recognition Gap */}
        <Card className="border-amber-200 bg-white">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-500" />
              <CardTitle className="text-lg text-gray-900">Recognition Gap</CardTitle>
              <Badge className="bg-amber-100 text-amber-700">{recognitionGap.length} employees</Badge>
            </div>
            <p className="text-sm text-gray-500">Employees with zero public recognition</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {recognitionGap.map((employee) => (
              <div
                key={employee.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3"
              >
                <div
                  className="flex cursor-pointer items-center gap-3"
                  onClick={() => onEmployeeClick(employee)}
                  onKeyDown={(e) => e.key === "Enter" && onEmployeeClick(employee)}
                  tabIndex={0}
                  role="button"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-xs font-medium text-amber-700">
                    {employee.name.split(" ")[0][0]}
                    {employee.name.split(" ")[1]?.[0] || ""}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                    <p className="text-xs text-gray-500">{employee.role}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-[#2563eb] text-white hover:bg-blue-700"
                  onClick={() =>
                    onActionClick({
                      title: `Draft shoutout for ${employee.name}`,
                      description: "Create a public recognition message for this employee",
                    })
                  }
                >
                  <Sparkles className="mr-1 h-4 w-4" />
                  Recognize
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Recognized */}
        <Card className="border-emerald-200 bg-white">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-emerald-500" />
              <CardTitle className="text-lg text-gray-900">Top Recognized</CardTitle>
            </div>
            <p className="text-sm text-gray-500">Employees with most public recognition</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {topRecognized.slice(0, 5).map((employee, index) => (
              <div
                key={employee.id}
                className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3"
                onClick={() => onEmployeeClick(employee)}
                onKeyDown={(e) => e.key === "Enter" && onEmployeeClick(employee)}
                tabIndex={0}
                role="button"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${
                      index === 0 ? "bg-amber-400" : index === 1 ? "bg-gray-400" : index === 2 ? "bg-amber-600" : "bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                    <p className="text-xs text-gray-500">{employee.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: employee.publicRecognition }).map((_, i) => (
                    <Star key={`star-${employee.id}-${i}`} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Growth Opportunities */}
      <Card className="border-gray-200 bg-white">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            <CardTitle className="text-lg text-gray-900">Growth Opportunities</CardTitle>
          </div>
          <p className="text-sm text-gray-500">Employees with low stretch work - candidates for new challenges</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {lowStretch.slice(0, 6).map((employee) => (
              <div
                key={employee.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
              >
                <div
                  className="flex cursor-pointer items-center gap-3"
                  onClick={() => onEmployeeClick(employee)}
                  onKeyDown={(e) => e.key === "Enter" && onEmployeeClick(employee)}
                  tabIndex={0}
                  role="button"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-700">
                    {employee.name.split(" ")[0][0]}
                    {employee.name.split(" ")[1]?.[0] || ""}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{employee.name}</p>
                    <p className="text-sm text-gray-500">{employee.role}</p>
                    <p className="text-xs text-gray-400">Stretch work: {employee.stretch}%</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white"
                  onClick={() =>
                    onActionClick({
                      title: `Assign stretch project to ${employee.name}`,
                      description: "Rotate next stretch project to this employee for growth",
                    })
                  }
                >
                  Assign Project
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recognition Heatmap */}
      <Card className="border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="text-lg text-gray-900">Recognition Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 text-left text-sm text-gray-500">
                  <th className="pb-3 pr-4 font-medium">Employee</th>
                  <th className="pb-3 pr-4 text-center font-medium">Public</th>
                  <th className="pb-3 pr-4 text-center font-medium">Private</th>
                  <th className="pb-3 pr-4 text-center font-medium">Total</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => {
                  const total = employee.publicRecognition + employee.privateRecognition
                  return (
                    <tr key={employee.id} className="border-b border-gray-100 last:border-0">
                      <td className="py-3 pr-4">
                        <span className="font-medium text-gray-900">{employee.name}</span>
                      </td>
                      <td className="py-3 pr-4 text-center">
                        <span
                          className={
                            employee.publicRecognition === 0
                              ? "font-medium text-red-600"
                              : "text-gray-900"
                          }
                        >
                          {employee.publicRecognition}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-center text-gray-600">{employee.privateRecognition}</td>
                      <td className="py-3 pr-4 text-center font-medium text-gray-900">{total}</td>
                      <td className="py-3">
                        {total === 0 ? (
                          <Badge className="bg-red-100 text-red-700">No recognition</Badge>
                        ) : total < 2 ? (
                          <Badge className="bg-amber-100 text-amber-700">Low</Badge>
                        ) : (
                          <Badge className="bg-emerald-100 text-emerald-700">Good</Badge>
                        )}
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
  )
}
