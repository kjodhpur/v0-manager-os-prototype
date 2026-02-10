"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Sparkles, X, Send, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { buildTeamContext } from "@/lib/team-context"
import { cn } from "@/lib/utils"

const SUGGESTIONS = [
  "Who needs my attention this week?",
  "Prep my 1:1 with the most at-risk person",
  "How is team workload distributed?",
  "Draft kudos for someone who deserves recognition",
  "What should I bring up in our team meeting?",
  "Compare sentiment trends this month",
]

function getMessageText(message: { parts?: Array<{ type: string; text?: string }> }): string {
  if (!message.parts || !Array.isArray(message.parts)) return ""
  return message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("")
}

export function AiChatPanel() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const teamContext = buildTeamContext()

  const { messages, sendMessage, setMessages, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/ai/chat",
      body: { teamContext },
    }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage({ text: suggestion })
  }

  const handleClear = () => {
    setMessages([])
  }

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center",
          "rounded-full bg-primary text-primary-foreground shadow-lg",
          "transition-all hover:scale-105 hover:shadow-xl",
          "md:bottom-8 md:right-8",
          open && "hidden"
        )}
        aria-label="Open AI Chat"
      >
        <Sparkles className="h-6 w-6" />
      </button>

      {/* Chat Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="flex w-full flex-col p-0 sm:w-[440px] sm:max-w-[440px]">
          {/* Header */}
          <SheetHeader className="flex flex-row items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div>
                <SheetTitle className="text-base">Ask HeartMetrics</SheetTitle>
                <p className="text-xs text-muted-foreground">Your AI management assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleClear} title="Clear chat">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              )}
            </div>
          </SheetHeader>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
            {messages.length === 0 ? (
              <div className="flex flex-col gap-4">
                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-sm text-foreground">
                    Hi! I can help you understand your team&apos;s health, prep for 1:1s,
                    draft messages, and spot risks. Try asking:
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSuggestionClick(s)}
                      className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-muted"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {messages.map((m) => {
                  const text = getMessageText(m)
                  return (
                    <div
                      key={m.id}
                      className={cn(
                        "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm",
                        m.role === "user"
                          ? "ml-auto bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      )}
                    >
                      {m.role === "assistant" && (
                        <div className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                          <Sparkles className="h-3 w-3" /> HeartMetrics AI
                        </div>
                      )}
                      <div
                        className="prose prose-sm max-w-none dark:prose-invert [&>p]:mb-2 [&>p:last-child]:mb-0 [&>ul]:mb-2 [&>ol]:mb-2"
                        dangerouslySetInnerHTML={{
                          __html: formatMarkdown(text),
                        }}
                      />
                    </div>
                  )
                })}
                {isLoading && messages[messages.length - 1]?.role === "user" && (
                  <div className="max-w-[85%] rounded-2xl bg-muted px-3.5 py-2.5">
                    <div className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <Sparkles className="h-3 w-3" /> HeartMetrics AI
                    </div>
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:0ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:150ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:300ms]" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-border px-4 py-3">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your team..."
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="h-9 w-9 shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="mt-1.5 text-center text-[10px] text-muted-foreground">
              AI insights are based on aggregated team data · Individual responses are never shared
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

/** Simple markdown -> HTML (bold, italic, bullet points, line breaks) */
function formatMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul class="list-disc pl-4">${match}</ul>`)
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br/>")
    .replace(/^(.+)$/, "<p>$1</p>")
}
