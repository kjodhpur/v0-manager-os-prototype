"use client"

import { useState } from "react"
import { X, Calendar, BarChart3, Star, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { nudges } from "@/lib/data"

interface NudgeBarProps {
  onNavigate: (target: string) => void
}

export function NudgeBar({ onNavigate }: NudgeBarProps) {
  const [dismissed, setDismissed] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const activeNudges = nudges.filter((n) => !dismissed.includes(n.id))
  if (activeNudges.length === 0) return null

  const current = activeNudges[currentIndex % activeNudges.length]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "checkin": return <Calendar className="h-4 w-4 shrink-0 text-primary" />
      case "workload": return <BarChart3 className="h-4 w-4 shrink-0 text-amber-500" />
      case "recognition": return <Star className="h-4 w-4 shrink-0 text-amber-500" />
      default: return <ChevronRight className="h-4 w-4 shrink-0 text-primary" />
    }
  }

  return (
    <div className="border-b border-primary/20 bg-primary/5 px-4 py-2">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          {getCategoryIcon(current.category)}
          <p className="truncate text-sm text-foreground">{current.message}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button
            size="sm"
            variant="default"
            className="h-7 text-xs"
            onClick={() => onNavigate(current.actionTarget)}
          >
            {current.actionLabel}
          </Button>
          <button
            onClick={() => {
              setDismissed([...dismissed, current.id])
              setCurrentIndex(0)
            }}
            className="rounded p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Dismiss nudge"
          >
            <X className="h-4 w-4" />
          </button>
          {activeNudges.length > 1 && (
            <button
              onClick={() => setCurrentIndex((currentIndex + 1) % activeNudges.length)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              {currentIndex % activeNudges.length + 1}/{activeNudges.length}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
