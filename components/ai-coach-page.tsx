"use client"

import { useState } from "react"
import {
  Brain, Zap, AlertTriangle, Star, TrendingUp, Shield, ChevronDown, ChevronUp, Clock, Check, X, BarChart3,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { insights as initialInsights, type Insight } from "@/lib/data"

interface AICoachPageProps {
  onActionClick: (action: { title: string; description: string }) => void
}

export function AICoachPage() {
  const [insightList, setInsightList] = useState(initialInsights)
  const [expanded, setExpanded] = useState<string | null>(null)

  const active = insightList.filter((i) => i.status === "active")
  const history = insightList.filter((i) => i.status !== "active")
  const highPriority = active.filter((i) => i.priority === "High")
  const medPriority = active.filter((i) => i.priority === "Medium")
  const lowPriority = active.filter((i) => i.priority === "Low")

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Workload": return <BarChart3 className="h-4 w-4 text-amber-500" />
      case "Recognition": return <Star className="h-4 w-4 text-amber-500" />
      case "Engagement": return <TrendingUp className="h-4 w-4 text-primary" />
      case "Retention Risk": return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "Growth": return <Zap className="h-4 w-4 text-emerald-500" />
      default: return <Brain className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-500/15 text-red-700"
      case "Medium": return "bg-amber-500/15 text-amber-700"
      case "Low": return "bg-green-500/15 text-emerald-700"
      default: return "bg-muted text-muted-foreground"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "acted": return "bg-green-500/15 text-emerald-700"
      case "dismissed": return "bg-muted text-muted-foreground"
      case "snoozed": return "bg-amber-500/15 text-amber-700"
      default: return "bg-primary/10 text-primary"
    }
  }

  const handleSnooze = (id: string) => {
    setInsightList(insightList.map((i) => (i.id === id ? { ...i, status: "snoozed" as const } : i)))
  }

  const handleDismiss = (id: string) => {
    setInsightList(insightList.map((i) => (i.id === id ? { ...i, status: "dismissed" as const } : i)))
  }

  const handleAct = (insight: Insight) => {
    setInsightList(insightList.map((i) => (i.id === insight.id ? { ...i, status: "acted" as const } : i)))
  }

  const renderInsightCard = (insight: Insight) => (
    <Card key={insight.id} className="border-border">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="mt-0.5">{getCategoryIcon(insight.category)}</div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className={getPriorityColor(insight.priority)}>{insight.priority}</Badge>
                <Badge variant="outline" className="text-xs">{insight.category}</Badge>
              </div>
              <p className="mt-1.5 text-sm font-medium text-foreground">{insight.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{insight.description}</p>
              {expanded === insight.id && (
                <div className="mt-3 rounded-lg bg-muted/50 p-3">
                  <p className="text-xs font-medium text-foreground">Why this matters</p>
                  <p className="mt-1 text-xs text-muted-foreground">{insight.whyItMatters}</p>
                </div>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Button size="sm" onClick={() => handleAct(insight)}>
                  {insight.suggestedActionLabel}
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleSnooze(insight.id)}>
                  <Clock className="mr-1 h-3 w-3" />
                  Snooze 1 week
                </Button>
                <Button size="sm" variant="ghost" className="text-muted-foreground" onClick={() => handleDismiss(insight.id)}>
                  <X className="mr-1 h-3 w-3" />
                  Dismiss
                </Button>
                <button
                  onClick={() => setExpanded(expanded === insight.id ? null : insight.id)}
                  className="ml-auto flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  {expanded === insight.id ? (
                    <>Less <ChevronUp className="h-3 w-3" /></>
                  ) : (
                    <>Why? <ChevronDown className="h-3 w-3" /></>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderSection = (title: string, items: Insight[]) => {
    if (items.length === 0) return null
    return (
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{title} ({items.length})</h3>
        {items.map(renderInsightCard)}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Brain className="h-6 w-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">AI Coach</h1>
          <p className="text-sm text-muted-foreground">AI-generated insights prioritized by impact on your team</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-red-200">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">{highPriority.length}</p>
            <p className="text-xs text-muted-foreground">High Priority</p>
          </CardContent>
        </Card>
        <Card className="border-amber-200">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-amber-600">{medPriority.length}</p>
            <p className="text-xs text-muted-foreground">Medium Priority</p>
          </CardContent>
        </Card>
        <Card className="border-emerald-200">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-emerald-600">{lowPriority.length}</p>
            <p className="text-xs text-muted-foreground">Low Priority</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Insights */}
      {renderSection("High Priority", highPriority)}
      {renderSection("Medium Priority", medPriority)}
      {renderSection("Low Priority", lowPriority)}

      {/* History */}
      {history.length > 0 && (
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-foreground">Insight History</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {history.map((insight) => (
              <div key={insight.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div className="flex items-center gap-3">
                  {getCategoryIcon(insight.category)}
                  <div>
                    <p className="text-sm font-medium text-foreground">{insight.title}</p>
                    <p className="text-xs text-muted-foreground">{insight.date}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(insight.status)}>
                  {insight.status === "acted" && <Check className="mr-1 h-3 w-3" />}
                  {insight.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
