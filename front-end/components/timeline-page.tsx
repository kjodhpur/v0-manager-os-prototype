"use client"

import { useState } from "react"
import { Clock, Award, Calendar, Zap, AlertCircle, ClipboardList, Filter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { timelineEvents, type TimelineEvent } from "@/lib/data"

type FilterType = "all" | "recognition" | "one-on-one" | "action" | "alert" | "survey"

export function TimelinePage() {
  const [filter, setFilter] = useState<FilterType>("all")

  const filtered = filter === "all" ? timelineEvents : timelineEvents.filter((e) => e.type === filter)

  const getTypeIcon = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "recognition": return <Award className="h-4 w-4 text-amber-500" />
      case "one-on-one": return <Calendar className="h-4 w-4 text-primary" />
      case "action": return <Zap className="h-4 w-4 text-emerald-500" />
      case "alert": return <AlertCircle className="h-4 w-4 text-red-500" />
      case "survey": return <ClipboardList className="h-4 w-4 text-primary" />
    }
  }

  const getTypeBadge = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "recognition": return <Badge className="bg-amber-100 text-amber-700">Recognition</Badge>
      case "one-on-one": return <Badge className="bg-primary/10 text-primary">1:1 Meeting</Badge>
      case "action": return <Badge className="bg-emerald-100 text-emerald-700">Action</Badge>
      case "alert": return <Badge className="bg-red-100 text-red-700">Alert</Badge>
      case "survey": return <Badge className="bg-primary/10 text-primary">Survey</Badge>
    }
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
  }

  const filterOptions: { value: FilterType; label: string }[] = [
    { value: "all", label: "All" },
    { value: "recognition", label: "Recognition" },
    { value: "one-on-one", label: "1:1s" },
    { value: "action", label: "Actions" },
    { value: "alert", label: "Alerts" },
    { value: "survey", label: "Surveys" },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Clock className="h-6 w-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Activity Timeline</h1>
          <p className="text-sm text-muted-foreground">Complete chronological audit log of your management actions</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        {filterOptions.map((f) => (
          <Button key={f.value} variant={filter === f.value ? "default" : "outline"} size="sm" onClick={() => setFilter(f.value)} className={filter !== f.value ? "bg-transparent" : ""}>
            {f.label}
          </Button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-5 top-0 h-full w-px bg-border md:left-6" />
        <div className="flex flex-col gap-0">
          {filtered.map((event, index) => (
            <div key={event.id} className="relative flex items-start gap-4 pb-6 pl-12 md:pl-14">
              {/* Dot */}
              <div className="absolute left-3.5 top-2 flex h-3 w-3 items-center justify-center rounded-full border-2 border-card bg-primary ring-4 ring-card md:left-4.5" />
              <Card className="w-full border-border">
                <CardContent className="p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">{getTypeIcon(event.type)}</div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{event.description}</p>
                        {event.details && <p className="mt-1 text-xs text-muted-foreground">{event.details}</p>}
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      {getTypeBadge(event.type)}
                      <span className="whitespace-nowrap text-xs text-muted-foreground">
                        {formatDate(event.timestamp)} {formatTime(event.timestamp)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
