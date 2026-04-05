"use client"

import { Calendar as CalendarIcon, Clock, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { oneOnOnes, surveys } from "@/lib/data"

export function CalendarPage() {
  // Build a list of events from meetings + surveys for the next 2 weeks
  const events: { date: string; title: string; time?: string; type: "meeting" | "survey" | "deadline"; status?: string }[] = []

  oneOnOnes.forEach((m) => {
    events.push({
      date: m.nextDate,
      title: `1:1 with ${m.employeeName}`,
      time: m.nextTime,
      type: "meeting",
      status: m.status,
    })
  })

  surveys.filter((s) => s.status === "active").forEach((s) => {
    events.push({
      date: s.endDate,
      title: `${s.title} closes`,
      type: "survey",
    })
  })

  // Add a goal deadline
  events.push({ date: "2026-02-24", title: "Q1 Goal Check-in Due", type: "deadline" })
  events.push({ date: "2026-02-19", title: "Weekly digest sent", type: "deadline" })

  const sorted = events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  // Group by date
  const grouped: Record<string, typeof events> = {}
  for (const event of sorted) {
    if (!grouped[event.date]) grouped[event.date] = []
    grouped[event.date].push(event)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "meeting": return "bg-primary/10 text-primary"
      case "survey": return "bg-green-500/15 text-emerald-700"
      case "deadline": return "bg-amber-500/15 text-amber-700"
      default: return "bg-muted text-muted-foreground"
    }
  }

  const getStatusDot = (status?: string) => {
    if (!status) return null
    switch (status) {
      case "overdue": return <span className="h-2 w-2 rounded-full bg-red-500/100" />
      case "needs-prep": return <span className="h-2 w-2 rounded-full bg-amber-500/100" />
      case "prepped": return <span className="h-2 w-2 rounded-full bg-green-500/100" />
      default: return null
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <CalendarIcon className="h-6 w-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Calendar</h1>
          <p className="text-sm text-muted-foreground">Upcoming 1:1s, survey deadlines, and key dates</p>
        </div>
      </div>

      {/* Calendar List View */}
      <div className="flex flex-col gap-4">
        {Object.entries(grouped).map(([date, dayEvents]) => {
          const dateObj = new Date(date)
          const isToday = new Date().toDateString() === dateObj.toDateString()

          return (
            <div key={date} className="flex gap-4">
              <div className="flex w-16 shrink-0 flex-col items-center pt-1 text-center">
                <p className="text-xs font-medium uppercase text-muted-foreground">
                  {dateObj.toLocaleDateString("en-US", { weekday: "short" })}
                </p>
                <p className={`text-xl font-bold ${isToday ? "text-primary" : "text-foreground"}`}>
                  {dateObj.getDate()}
                </p>
                <p className="text-xs text-muted-foreground">
                  {dateObj.toLocaleDateString("en-US", { month: "short" })}
                </p>
                {isToday && <Badge className="mt-1 bg-primary/10 text-primary text-xs">Today</Badge>}
              </div>
              <div className="flex flex-1 flex-col gap-2">
                {dayEvents.map((event, i) => (
                  <Card key={`${date}-${i}`} className="border-border">
                    <CardContent className="flex items-center gap-3 p-3">
                      {getStatusDot(event.status)}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground">{event.title}</p>
                        {event.time && (
                          <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" /> {event.time}
                          </p>
                        )}
                      </div>
                      <Badge className={getTypeColor(event.type)}>
                        {event.type === "meeting" ? "1:1" : event.type === "survey" ? "Survey" : "Deadline"}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
