"use client"

import { useEffect } from "react"
import { useCompletion } from "@ai-sdk/react"
import { Sparkles, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { buildTeamContext } from "@/lib/team-context"

interface AiSurveySummaryProps {
  surveyData: Record<string, unknown>
}

export function AiSurveySummary({ surveyData }: AiSurveySummaryProps) {
  const { completion, isLoading, complete, error } = useCompletion({
    api: "/api/ai/survey-summary",
  })

  const handleGenerate = () => {
    const teamContext = buildTeamContext()
    complete("", { body: { surveyData, teamContext } })
  }

  useEffect(() => {
    handleGenerate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card className="border-border relative overflow-hidden">
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-violet-500 to-blue-500" />
      <CardHeader className="flex flex-row items-center justify-between pb-2 pl-5">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-violet-500" />
          <CardTitle className="text-sm font-semibold">AI Response Summary</CardTitle>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 gap-1 text-xs"
          onClick={handleGenerate}
          disabled={isLoading}
        >
          <RefreshCw className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </CardHeader>
      <CardContent className="pl-5">
        {error ? (
          <p className="text-sm text-red-500">Failed to generate summary. Please try again.</p>
        ) : isLoading && !completion ? (
          <div className="flex flex-col gap-2">
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-[85%] animate-pulse rounded bg-muted" />
            <div className="h-4 w-[70%] animate-pulse rounded bg-muted" />
          </div>
        ) : (
          <div
            className="prose prose-sm max-w-none text-sm leading-relaxed text-foreground dark:prose-invert"
            dangerouslySetInnerHTML={{
              __html: (completion || "")
                .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                .replace(/\*(.+?)\*/g, "<em>$1</em>")
                .replace(/\n\n/g, "</p><p>")
                .replace(/\n/g, "<br/>")
                .replace(/^(.+)$/, "<p>$1</p>"),
            }}
          />
        )}
        <p className="mt-2 text-[10px] text-muted-foreground">
          ✨ AI-generated · Individual responses are never revealed
        </p>
      </CardContent>
    </Card>
  )
}
