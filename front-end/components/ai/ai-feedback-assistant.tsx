"use client"

import { useState } from "react"
import { useCompletion } from "@ai-sdk/react"
import { Sparkles, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { buildEmployeeContext } from "@/lib/team-context"

interface AiFeedbackAssistantProps {
  employeeId: string
  employeeName: string
  onDraftGenerated: (draft: string) => void
}

const TONES = ["Supportive", "Direct", "Celebratory", "Constructive"] as const
const TYPES = ["Praise", "Constructive", "Request"] as const

export function AiFeedbackAssistant({ employeeId, employeeName, onDraftGenerated }: AiFeedbackAssistantProps) {
  const [enabled, setEnabled] = useState(true)
  const [tone, setTone] = useState<typeof TONES[number]>("Supportive")
  const [feedbackType, setFeedbackType] = useState<typeof TYPES[number]>("Praise")

  const { completion, isLoading, complete } = useCompletion({
    api: "/api/ai/feedback",
    onFinish: (prompt, completion) => {
      onDraftGenerated(completion)
    },
  })

  const handleDraft = () => {
    const employeeContext = buildEmployeeContext(employeeId)
    complete("", {
      body: {
        employeeContext,
        feedbackType: feedbackType.toLowerCase(),
        tone: tone.toLowerCase(),
      },
    })
  }

  if (!enabled) return null

  return (
    <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-medium text-foreground">AI Assist</span>
        </div>
        <button
          onClick={() => setEnabled(false)}
          className="text-[10px] text-muted-foreground hover:text-foreground"
        >
          Hide
        </button>
      </div>

      {/* Feedback Type */}
      <div className="mt-2">
        <span className="text-[10px] text-muted-foreground">Type</span>
        <div className="mt-1 flex flex-wrap gap-1">
          {TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setFeedbackType(t)}
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors ${
                feedbackType === t
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Tone */}
      <div className="mt-2">
        <span className="text-[10px] text-muted-foreground">Tone</span>
        <div className="mt-1 flex flex-wrap gap-1">
          {TONES.map((t) => (
            <button
              key={t}
              onClick={() => setTone(t)}
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors ${
                tone === t
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Draft Button */}
      <Button
        size="sm"
        className="mt-2.5 h-7 w-full gap-1.5 text-xs"
        onClick={handleDraft}
        disabled={isLoading || !employeeId}
      >
        <Wand2 className="h-3 w-3" />
        {isLoading ? "Drafting..." : `Draft ${feedbackType} for ${employeeName || "..."}`}
      </Button>

      {completion && (
        <p className="mt-2 text-[10px] text-muted-foreground">
          ✨ AI-drafted · Review and personalize before sending
        </p>
      )}
    </div>
  )
}
