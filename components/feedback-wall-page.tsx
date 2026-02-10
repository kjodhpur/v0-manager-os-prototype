"use client"

import { useState } from "react"
import { MessageSquare, Heart, Star, ArrowRight, Plus, Filter, Send } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { feedbackEntries, employees, type FeedbackEntry } from "@/lib/data"

export function FeedbackWallPage() {
  const [filter, setFilter] = useState<"all" | "Public" | "Private">("all")
  const [showCompose, setShowCompose] = useState(false)
  const [newMessage, setNewMessage] = useState("")
  const [selectedRecipient, setSelectedRecipient] = useState("")

  const filtered = filter === "all" ? feedbackEntries : feedbackEntries.filter((f) => f.visibility === filter)

  const getInitials = (name: string) => {
    const parts = name.split(" ")
    return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase()
  }

  const getTypeBadge = (type: FeedbackEntry["type"]) => {
    switch (type) {
      case "Praise": return <Badge className="bg-emerald-100 text-emerald-700">Praise</Badge>
      case "Constructive": return <Badge className="bg-amber-100 text-amber-700">Constructive</Badge>
      case "Request": return <Badge className="bg-primary/10 text-primary">Request</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Recognition & Feedback Wall</h1>
            <p className="text-sm text-muted-foreground">Public kudos, private feedback, and structured recognition</p>
          </div>
        </div>
        <Button size="sm" onClick={() => setShowCompose(!showCompose)}>
          <Plus className="mr-1 h-4 w-4" /> New Feedback
        </Button>
      </div>

      {/* Compose */}
      {showCompose && (
        <Card className="border-primary/20">
          <CardContent className="flex flex-col gap-3 p-4">
            <p className="text-sm font-semibold text-foreground">Send Recognition</p>
            <select
              value={selectedRecipient}
              onChange={(e) => setSelectedRecipient(e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
            >
              <option value="">Select recipient...</option>
              {employees.map((e) => (
                <option key={e.id} value={e.id}>{e.name}</option>
              ))}
            </select>
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Write your recognition or feedback..."
              rows={3}
            />
            <div className="flex items-center gap-2">
              <Button size="sm">
                <Send className="mr-1 h-3.5 w-3.5" /> Send Public
              </Button>
              <Button size="sm" variant="outline">Send Private</Button>
              <Button size="sm" variant="ghost" onClick={() => setShowCompose(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        {(["all", "Public", "Private"] as const).map((f) => (
          <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)} className={filter !== f ? "bg-transparent" : ""}>
            {f === "all" ? "All" : f}
          </Button>
        ))}
      </div>

      {/* Feed */}
      <div className="flex flex-col gap-4">
        {filtered.map((entry) => (
          <Card key={entry.id} className={`border-border ${entry.visibility === "Private" ? "border-dashed" : ""}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                    {getInitials(entry.senderName)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{entry.senderName}</span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{entry.recipientName}</span>
                    {getTypeBadge(entry.type)}
                    <Badge variant="outline" className="text-xs">{entry.visibility}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-foreground">{entry.content}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {entry.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                  <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                    {entry.likes > 0 && (
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3 text-red-400" /> {entry.likes}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
