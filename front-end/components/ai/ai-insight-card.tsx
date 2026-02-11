"use client"

import { useEffect, useState } from "react"
import { useCompletion } from "@ai-sdk/react"
import { Sparkles, RefreshCw, ThumbsUp, ThumbsDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { buildTeamContext } from "@/lib/team-context"

export function AiInsightCard() {
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string>("")

  const { completion, isLoading, complete, error } = useCompletion({
    api: "/api/ai/insights",
  })

  const handleRefresh = () => {
    setFeedback(null)
    const teamContext = buildTeamContext()
    complete("", { body: { teamContext } })
    setLastUpdated(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
  }

  // Auto-generate on mount
  useEffect(() => {
    handleRefresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card className="border-border relative overflow-hidden">
      {/* Gradient accent on left border */}
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-violet-500 to-blue-500" />

      <CardHeader className="flex flex-row items-center justify-between pb-2 pl-5">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-violet-500" />
          <CardTitle className="text-sm font-semibold text-foreground">
            Weekly Team Insight
          </CardTitle>
        </div>
        <div className="flex items-center gap-2">
          {lastUpdated && (
            <span className="text-[10px] text-muted-foreground">
              Updated {lastUpdated}
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1 text-xs"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`} />
            {isLoading ? "Analyzing..." : "Refresh"}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pl-5">
        {error ? (
          <div className="rounded-lg bg-red-50 p-3 dark:bg-red-950/20">
            <p className="text-sm text-red-600 dark:text-red-400">
              Failed to generate insight. Make sure your <code className="rounded bg-red-100 px-1 py-0.5 text-xs dark:bg-red-900/30">ANTHROPIC_API_KEY</code> is set in Vercel environment variables.
            </p>
            <Button variant="outline" size="sm" className="mt-2" onClick={handleRefresh}>
              Retry
            </Button>
          </div>
        ) : isLoading && !completion ? (
          // Skeleton loader
          <div className="flex flex-col gap-2">
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-[90%] animate-pulse rounded bg-muted" />
            <div className="h-4 w-[75%] animate-pulse rounded bg-muted" />
            <div className="h-4 w-[85%] animate-pulse rounded bg-muted" />
          </div>
        ) : (
          <div
            className="prose prose-sm max-w-none text-sm leading-relaxed text-foreground dark:prose-invert [&>p]:mb-2 [&>p:last-child]:mb-0"
            dangerouslySetInnerHTML={{
              __html: formatMarkdown(completion || "Click refresh to generate your weekly team insight."),
            }}
          />
        )}

        {/* Footer */}
        <div className="mt-3 flex items-center justify-between border-t border-border pt-2">
          <span className="text-[10px] text-muted-foreground">
            ✨ AI-generated · Based on team data from the last 7 days
          </span>
          {completion && !isLoading && (
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-muted-foreground mr-1">Helpful?</span>
              <button
                onClick={() => setFeedback("up")}
                className={`rounded p-1 transition-colors ${
                  feedback === "up"
                    ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <ThumbsUp className="h-3 w-3" />
              </button>
              <button
                onClick={() => setFeedback("down")}
                className={`rounded p-1 transition-colors ${
                  feedback === "down"
                    ? "bg-red-100 text-red-600 dark:bg-red-900/30"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <ThumbsDown className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function formatMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul class="list-disc pl-4">${match}</ul>`)
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br/>")
    .replace(/^(.+)$/, "<p>$1</p>")
}
