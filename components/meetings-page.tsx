"use client"

import { useState } from "react"
import {
  Calendar, Clock, CheckCircle, AlertCircle, ChevronDown, ChevronUp, Plus, Save, MessageSquare,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { oneOnOnes, type OneOnOne } from "@/lib/data"

export function MeetingsPage() {
  const [selectedMeeting, setSelectedMeeting] = useState<OneOnOne | null>(null)
  const [view, setView] = useState<"upcoming" | "history">("upcoming")
  const [newAgendaItem, setNewAgendaItem] = useState("")
  const [agendaItems, setAgendaItems] = useState<string[]>([])
  const [meetingNotes, setMeetingNotes] = useState("")
  const [showNotes, setShowNotes] = useState(false)

  const overdue = oneOnOnes.filter((m) => m.status === "overdue")
  const avgCadence = 12

  const sorted = [...oneOnOnes].sort((a, b) => new Date(a.nextDate).getTime() - new Date(b.nextDate).getTime())

  const getStatusBadge = (status: OneOnOne["status"]) => {
    switch (status) {
      case "prepped": return <Badge className="bg-emerald-100 text-emerald-700">Prepped</Badge>
      case "needs-prep": return <Badge className="bg-amber-100 text-amber-700">Needs Prep</Badge>
      case "overdue": return <Badge className="bg-red-100 text-red-700">Overdue</Badge>
    }
  }

  const getInitials = (name: string) => {
    const parts = name.split(" ")
    return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase()
  }

  const addAgendaItem = () => {
    if (newAgendaItem.trim()) {
      setAgendaItems([...agendaItems, newAgendaItem.trim()])
      setNewAgendaItem("")
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Calendar className="h-6 w-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">1:1 Meetings</h1>
          <p className="text-sm text-muted-foreground">Prepare, track, and follow up on your 1:1s</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Average 1:1 Cadence</p>
            <p className="text-2xl font-bold text-foreground">{avgCadence} days</p>
          </CardContent>
        </Card>
        <Card className="border-red-200">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Overdue 1:1s</p>
            <p className="text-2xl font-bold text-red-600">{overdue.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2">
        <Button variant={view === "upcoming" ? "default" : "outline"} size="sm" onClick={() => setView("upcoming")} className={view !== "upcoming" ? "bg-transparent" : ""}>
          Upcoming
        </Button>
        <Button variant={view === "history" ? "default" : "outline"} size="sm" onClick={() => setView("history")} className={view !== "history" ? "bg-transparent" : ""}>
          History
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Meeting List */}
        <div className="flex flex-col gap-2 lg:col-span-2">
          {sorted.map((meeting) => (
            <button
              key={meeting.id}
              onClick={() => { setSelectedMeeting(meeting); setAgendaItems([]); setMeetingNotes(""); setShowNotes(false) }}
              className={`flex items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
                selectedMeeting?.id === meeting.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
              }`}
            >
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                  {getInitials(meeting.employeeName)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{meeting.employeeName}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(meeting.nextDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} at {meeting.nextTime}
                </p>
              </div>
              {getStatusBadge(meeting.status)}
            </button>
          ))}
        </div>

        {/* Meeting Detail / Prep */}
        <div className="lg:col-span-3">
          {selectedMeeting ? (
            <Card className="border-border">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-sm font-medium text-primary">
                        {getInitials(selectedMeeting.employeeName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg text-foreground">{selectedMeeting.employeeName}</CardTitle>
                      <p className="text-sm text-muted-foreground">{selectedMeeting.employeeRole}</p>
                    </div>
                  </div>
                  {getStatusBadge(selectedMeeting.status)}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {new Date(selectedMeeting.nextDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {selectedMeeting.nextTime}</span>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                {/* Auto-generated Talking Points */}
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-foreground">AI-Generated Talking Points</h4>
                  <div className="flex flex-col gap-1.5">
                    {selectedMeeting.talkingPoints.map((point, i) => (
                      <div key={`tp-${selectedMeeting.id}-${i}`} className="flex items-start gap-2 rounded bg-muted/50 px-3 py-2 text-sm text-foreground">
                        <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                        {point}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Editable Agenda */}
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-foreground">Agenda</h4>
                  {agendaItems.map((item, i) => (
                    <div key={`agenda-${i}`} className="mb-1.5 flex items-center gap-2 rounded bg-muted/50 px-3 py-2 text-sm text-foreground">
                      <CheckCircle className="h-3.5 w-3.5 text-muted-foreground" />
                      {item}
                      <button onClick={() => setAgendaItems(agendaItems.filter((_, idx) => idx !== i))} className="ml-auto text-xs text-muted-foreground hover:text-destructive">Remove</button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <input
                      value={newAgendaItem}
                      onChange={(e) => setNewAgendaItem(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addAgendaItem()}
                      placeholder="Add agenda item..."
                      className="flex-1 rounded-md border border-input bg-background px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground"
                    />
                    <Button size="sm" variant="outline" onClick={addAgendaItem}>
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Previous Meeting Notes */}
                {selectedMeeting.notes.length > 0 && (
                  <div>
                    <button
                      onClick={() => setShowNotes(!showNotes)}
                      className="flex items-center gap-2 text-sm font-semibold text-foreground"
                    >
                      Previous Meeting Notes
                      {showNotes ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                    {showNotes && selectedMeeting.notes.map((note) => (
                      <div key={note.id} className="mt-2 rounded-lg border border-border p-3">
                        <p className="text-xs text-muted-foreground">{new Date(note.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
                        <p className="mt-1 text-sm text-foreground">{note.summary}</p>
                        <div className="mt-2 flex flex-col gap-1">
                          {note.actionItems.map((ai, i) => (
                            <div key={`ai-${note.id}-${i}`} className="flex items-center gap-2 text-sm">
                              {ai.completed ? (
                                <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                              ) : (
                                <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
                              )}
                              <span className={ai.completed ? "text-muted-foreground line-through" : "text-foreground"}>{ai.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Log Notes */}
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-foreground">Log Notes</h4>
                  <Textarea
                    value={meetingNotes}
                    onChange={(e) => setMeetingNotes(e.target.value)}
                    placeholder="Write post-meeting notes here..."
                    rows={4}
                  />
                  <Button size="sm" className="mt-2">
                    <Save className="mr-1 h-3.5 w-3.5" />
                    Save Notes
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-dashed border-border">
              <CardContent className="flex flex-col items-center p-12 text-center">
                <Calendar className="mb-3 h-10 w-10 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">Select a meeting to prepare</p>
                <p className="mt-1 text-xs text-muted-foreground">Click on any 1:1 from the list to see talking points, agenda, and notes.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
