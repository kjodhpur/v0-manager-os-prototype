"use client"

import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { employees, type Employee } from "@/lib/data"

interface TeamHealthPageProps {
  onEmployeeClick: (employee: Employee) => void
}

export function TeamHealthPage({ onEmployeeClick }: TeamHealthPageProps) {
  const highRisk = employees.filter((e) => e.whi < 50)
  const watchlist = employees.filter((e) => e.whi >= 50 && e.whi < 60)
  const healthy = employees.filter((e) => e.whi >= 60)

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-emerald-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-amber-500" />
    }
  }

  const getWhiColor = (whi: number) => {
    if (whi < 50) return "text-red-600"
    if (whi < 60) return "text-amber-600"
    return "text-emerald-600"
  }

  const renderEmployeeCard = (employee: Employee) => (
    <div
      key={employee.id}
      className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
      onClick={() => onEmployeeClick(employee)}
      onKeyDown={(e) => e.key === "Enter" && onEmployeeClick(employee)}
      tabIndex={0}
      role="button"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-600">
          {employee.name.split(" ")[0][0]}
          {employee.name.split(" ")[1]?.[0] || ""}
        </div>
        <div>
          <p className="font-medium text-gray-900">{employee.name}</p>
          <p className="text-sm text-gray-500">{employee.role}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className={`text-xl font-bold ${getWhiColor(employee.whi)}`}>{employee.whi}</span>
          {getTrendIcon(employee.whiTrend)}
        </div>
        <Badge variant="outline" className="text-xs">
          {employee.confidence}
        </Badge>
        <Button
          size="sm"
          variant="outline"
          className="bg-white"
          onClick={(e) => {
            e.stopPropagation()
            onEmployeeClick(employee)
          }}
        >
          View
        </Button>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Team Health</h1>
        <p className="text-sm text-gray-500">Work Happiness Index distribution across team</p>
      </div>

      {/* WHI Distribution */}
      <Card className="border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="text-lg">WHI Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-8 w-full overflow-hidden rounded-lg">
            <div
              className="flex items-center justify-center bg-red-400 text-sm font-medium text-white"
              style={{ width: `${(highRisk.length / employees.length) * 100}%` }}
            >
              {highRisk.length}
            </div>
            <div
              className="flex items-center justify-center bg-amber-400 text-sm font-medium text-white"
              style={{ width: `${(watchlist.length / employees.length) * 100}%` }}
            >
              {watchlist.length}
            </div>
            <div
              className="flex items-center justify-center bg-emerald-400 text-sm font-medium text-white"
              style={{ width: `${(healthy.length / employees.length) * 100}%` }}
            >
              {healthy.length}
            </div>
          </div>
          <div className="mt-3 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-red-400" />
              <span className="text-gray-600">{"High Risk (WHI < 50)"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-amber-400" />
              <span className="text-gray-600">Watchlist (50-59)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-emerald-400" />
              <span className="text-gray-600">{"Healthy (60+)"}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Tiers */}
      <div className="space-y-4">
        {/* High Risk */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg text-red-800">{"High Risk (WHI < 50)"}</CardTitle>
              <Badge className="bg-red-600 text-white">{highRisk.length}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {highRisk.map(renderEmployeeCard)}
          </CardContent>
        </Card>

        {/* Watchlist */}
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg text-amber-800">Watchlist (50-59)</CardTitle>
              <Badge className="bg-amber-600 text-white">{watchlist.length}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {watchlist.map(renderEmployeeCard)}
          </CardContent>
        </Card>

        {/* Healthy */}
        <Card className="border-emerald-200 bg-emerald-50">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg text-emerald-800">{"Healthy (60+)"}</CardTitle>
              <Badge className="bg-emerald-600 text-white">{healthy.length}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {healthy.map(renderEmployeeCard)}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
