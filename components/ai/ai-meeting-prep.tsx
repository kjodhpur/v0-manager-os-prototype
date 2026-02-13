"use client"

import { useCompletion } from "@ai-sdk/react"
import { Sparkles, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { buildEmployeeContext } from "@/lib/team-context"

interface AiMeetingPrepProps {
  employeeId: string
  previousNotes?: string
  actionItems?: { text: string; completed: boolean }[]
}

export function AiMeetingPrep({ employeeId, previousNotes, actionItems }: AiMeetingPrepProps) {
  const { completion, isLoading, complete, error } = useCompletion({
    api: "/api/ai/meeting-prep",
  })

  const handleGenerate = () => {
    const employeeContext = buildEmployeeContext(employeeId)
    complete("", {
      body: { employeeContext, previousNotes, actionItems },
    })
  }

  return (
    <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-semibold text-foreground">AI-Suggested Talking Points</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 gap-1 text-[10px]"
          onClick={handleGenerate}
          disabled={isLoading}
        >
          <RefreshCw className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`} />
          {completion ? "Regenerate" : "Generate"}
        </Button>
      </div>

      <div className="mt-2">
        {error ? (
          <p className="text-xs text-red-500">Failed to generate. Please try again.</p>
        ) : isLoading && !completion ? (
          <div className="flex flex-col gap-1.5">
            <div className="h-3 w-full animate-pulse rounded bg-muted" />
            <div className="h-3 w-[90%] animate-pulse rounded bg-muted" />
            <div className="h-3 w-[80%] animate-pulse rounded bg-muted" />
            <div className="h-3 w-[85%] animate-pulse rounded bg-muted" />
            <div className="h-3 w-[70%] animate-pulse rounded bg-muted" />
          </div>
        ) : completion ? (
          <div
            className="prose prose-sm max-w-none text-xs leading-relaxed text-foreground dark:prose-invert [&>p]:mb-1.5 [&>ul]:mb-1.5"
            dangerouslySetInnerHTML={{
              __html: completion
                .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                .replace(/\*(.+?)\*/g, "<em>$1</em>")
                .replace(/^- (.+)$/gm, "<li>$1</li>")
                .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul class="list-disc pl-4">${m}</ul>`)
                .replace(/\n\n/g, "</p><p>")
                .replace(/\n/g, "<br/>")
                .replace(/^(.+)$/, "<p>$1</p>"),
            }}
          />
        ) : (
          <p className="text-xs text-muted-foreground">
            Click &quot;Generate&quot; to get AI-powered talking points based on this person&apos;s recent signals.
          </p>
        )}
      </div>

      <p className="mt-2 text-[10px] text-muted-foreground">
        ✨ AI-generated · Based on work signals, not private communications
      </p>
    </div>
  )
}
