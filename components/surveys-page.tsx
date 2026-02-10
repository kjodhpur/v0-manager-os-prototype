"use client"

import { useState } from "react"
import { ClipboardList, Users, BarChart3, Plus, Eye, Clock, CheckCircle, PenLine, X, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { surveys, type Survey } from "@/lib/data"

const questionTemplates = [
  { text: "How supported do you feel this week?", type: "scale" as const },
  { text: "Rate your workload 1-5", type: "scale" as const },
  { text: "Is anything blocking your progress?", type: "text" as const },
  { text: "How would you describe your energy level?", type: "emoji" as const },
  { text: "Do you feel recognized for your work?", type: "scale" as const },
  { text: "What could we improve as a team?", type: "text" as const },
]

interface DraftQuestion {
  text: string
  type: "scale" | "text" | "multiple-choice" | "emoji"
}

export function SurveysPage() {
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null)
  const [view, setView] = useState<"list" | "results">("list")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [draftTitle, setDraftTitle] = useState("")
  const [draftQuestions, setDraftQuestions] = useState<DraftQuestion[]>([])
  const [draftFrequency, setDraftFrequency] = useState<"one-time" | "weekly" | "bi-weekly">("weekly")
  const [draftAnonymous, setDraftAnonymous] = useState(true)
  const [customQuestionText, setCustomQuestionText] = useState("")
  const [customQuestionType, setCustomQuestionType] = useState<DraftQuestion["type"]>("scale")

  const activeSurveys = surveys.filter((s) => s.status === "active")
  const completedSurveys = surveys.filter((s) => s.status === "completed")

  const getStatusBadge = (status: Survey["status"]) => {
    switch (status) {
      case "active": return <Badge className="bg-emerald-100 text-emerald-700">Active</Badge>
      case "completed": return <Badge className="bg-muted text-muted-foreground">Completed</Badge>
      case "draft": return <Badge className="bg-amber-100 text-amber-700">Draft</Badge>
    }
  }

  const scaleLabels = ["1 (Low)", "2", "3", "4", "5 (High)"]

  const renderResultsBar = (distribution: number[]) => {
    const total = distribution.reduce((a, b) => a + b, 0)
    if (total === 0) return null
    return (
      <div className="flex flex-col gap-1">
        {distribution.map((count, i) => (
          <div key={`bar-${i}`} className="flex items-center gap-2">
            <span className="w-16 text-right text-xs text-muted-foreground">{scaleLabels[i]}</span>
            <div className="h-5 flex-1 rounded bg-muted overflow-hidden">
              <div
                className="h-full rounded bg-primary transition-all"
                style={{ width: `${(count / total) * 100}%` }}
              />
            </div>
            <span className="w-8 text-xs text-muted-foreground">{count}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ClipboardList className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Pulse Surveys</h1>
            <p className="text-sm text-muted-foreground">Lightweight recurring check-ins for your team</p>
          </div>
        </div>
        <Button size="sm" onClick={() => setShowCreateModal(true)}>
          <Plus className="mr-1 h-4 w-4" />
          Create Survey
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{activeSurveys.length}</p>
            <p className="text-xs text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{completedSurveys.length}</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">
              {activeSurveys.length > 0 ? Math.round((activeSurveys[0].responses / activeSurveys[0].total) * 100) : 0}%
            </p>
            <p className="text-xs text-muted-foreground">Response Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Survey List or Results */}
      {selectedSurvey && view === "results" ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">{selectedSurvey.title}</h2>
              <p className="text-sm text-muted-foreground">{selectedSurvey.responses}/{selectedSurvey.total} responses</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => { setView("list"); setSelectedSurvey(null) }}>
              Back to list
            </Button>
          </div>

          {/* Response Progress */}
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Response Rate</span>
                <span className="font-medium text-foreground">{Math.round((selectedSurvey.responses / selectedSurvey.total) * 100)}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 rounded-full bg-primary" style={{ width: `${(selectedSurvey.responses / selectedSurvey.total) * 100}%` }} />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{selectedSurvey.responses} of {selectedSurvey.total} team members responded</p>
            </CardContent>
          </Card>

          {/* Per-Question Results */}
          {selectedSurvey.questions.map((q) => {
            const result = selectedSurvey.results?.find((r) => r.questionId === q.id)
            return (
              <Card key={q.id} className="border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-foreground">{q.text}</CardTitle>
                  <Badge variant="outline" className="w-fit text-xs">{q.type}</Badge>
                </CardHeader>
                <CardContent>
                  {result ? (
                    renderResultsBar(result.distribution)
                  ) : (
                    <p className="text-sm text-muted-foreground italic">Text responses collected -- view individually</p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {/* Active Surveys */}
          {activeSurveys.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Active</h3>
              {activeSurveys.map((survey) => (
                <Card key={survey.id} className="border-emerald-200 mb-3">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-medium text-foreground">{survey.title}</p>
                          {getStatusBadge(survey.status)}
                          <Badge variant="outline" className="text-xs">{survey.frequency}</Badge>
                          {survey.anonymous && <Badge variant="outline" className="text-xs">Anonymous</Badge>}
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {survey.responses}/{survey.total} responses</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Ends {new Date(survey.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                          <span>{survey.questions.length} questions</span>
                        </div>
                        {/* Progress */}
                        <div className="mt-3 h-1.5 w-full rounded-full bg-muted">
                          <div className="h-1.5 rounded-full bg-emerald-500" style={{ width: `${(survey.responses / survey.total) * 100}%` }} />
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => { setSelectedSurvey(survey); setView("results") }}>
                        <Eye className="mr-1 h-3.5 w-3.5" /> Results
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Completed Surveys */}
          {completedSurveys.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Completed</h3>
              {completedSurveys.map((survey) => (
                <Card key={survey.id} className="border-border mb-3">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-medium text-foreground">{survey.title}</p>
                          {getStatusBadge(survey.status)}
                          <Badge variant="outline" className="text-xs">{survey.frequency}</Badge>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {survey.responses}/{survey.total} responses</span>
                          <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Completed {new Date(survey.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => { setSelectedSurvey(survey); setView("results") }}>
                        <BarChart3 className="mr-1 h-3.5 w-3.5" /> View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Create Survey Modal */}
      {showCreateModal && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => setShowCreateModal(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-y-4 right-4 z-50 w-full max-w-lg overflow-y-auto rounded-lg border border-border bg-card p-6 shadow-xl sm:inset-y-8 sm:right-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Create New Survey</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowCreateModal(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Title */}
            <div className="mb-4 flex flex-col gap-2">
              <Label htmlFor="survey-title">Survey Title</Label>
              <Input
                id="survey-title"
                placeholder="e.g., Weekly Team Check-in"
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
              />
            </div>

            {/* Frequency */}
            <div className="mb-4 flex flex-col gap-2">
              <Label>Frequency</Label>
              <div className="flex gap-2">
                {(["one-time", "weekly", "bi-weekly"] as const).map((f) => (
                  <Button
                    key={f}
                    size="sm"
                    variant={draftFrequency === f ? "default" : "outline"}
                    onClick={() => setDraftFrequency(f)}
                    className={draftFrequency !== f ? "bg-transparent" : ""}
                  >
                    {f === "one-time" ? "One-time" : f === "weekly" ? "Weekly" : "Bi-weekly"}
                  </Button>
                ))}
              </div>
            </div>

            {/* Anonymous Toggle */}
            <div className="mb-6 flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium text-foreground">Anonymous responses</p>
                <p className="text-xs text-muted-foreground">Responses are aggregated. Individual answers are never shown.</p>
              </div>
              <Switch checked={draftAnonymous} onCheckedChange={setDraftAnonymous} />
            </div>

            {/* Question Templates */}
            <div className="mb-4">
              <Label className="mb-2 block">Add from templates</Label>
              <div className="flex flex-col gap-2">
                {questionTemplates
                  .filter((t) => !draftQuestions.some((q) => q.text === t.text))
                  .map((template) => (
                    <button
                      key={template.text}
                      onClick={() => setDraftQuestions([...draftQuestions, { text: template.text, type: template.type }])}
                      className="flex items-center justify-between rounded-lg border border-border p-3 text-left transition-colors hover:bg-muted/50"
                    >
                      <div>
                        <p className="text-sm text-foreground">{template.text}</p>
                        <Badge variant="outline" className="mt-1 text-xs">{template.type}</Badge>
                      </div>
                      <Plus className="h-4 w-4 shrink-0 text-muted-foreground" />
                    </button>
                  ))}
              </div>
            </div>

            {/* Custom Question */}
            <div className="mb-4 rounded-lg border border-dashed border-border p-3">
              <Label className="mb-2 block text-sm font-medium">Add custom question</Label>
              <div className="flex flex-col gap-2">
                <Input
                  placeholder="Enter your question..."
                  value={customQuestionText}
                  onChange={(e) => setCustomQuestionText(e.target.value)}
                />
                <div className="flex gap-2">
                  <select
                    value={customQuestionType}
                    onChange={(e) => setCustomQuestionType(e.target.value as DraftQuestion["type"])}
                    className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                  >
                    <option value="scale">Scale (1-5)</option>
                    <option value="text">Open Text</option>
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="emoji">Emoji Reaction</option>
                  </select>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={!customQuestionText.trim()}
                    onClick={() => {
                      if (customQuestionText.trim()) {
                        setDraftQuestions([...draftQuestions, { text: customQuestionText.trim(), type: customQuestionType }])
                        setCustomQuestionText("")
                      }
                    }}
                  >
                    <Plus className="mr-1 h-3.5 w-3.5" /> Add
                  </Button>
                </div>
              </div>
            </div>

            {/* Selected Questions */}
            {draftQuestions.length > 0 && (
              <div className="mb-6">
                <Label className="mb-2 block">Selected Questions ({draftQuestions.length})</Label>
                <div className="flex flex-col gap-2">
                  {draftQuestions.map((q, i) => (
                    <div key={`draft-${q.text}-${i}`} className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
                      <div>
                        <p className="text-sm text-foreground">{q.text}</p>
                        <Badge variant="outline" className="mt-1 text-xs">{q.type}</Badge>
                      </div>
                      <button
                        onClick={() => setDraftQuestions(draftQuestions.filter((_, idx) => idx !== i))}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 border-t border-border pt-4">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowCreateModal(false)}>
                Cancel
              </Button>
              <Button
                className="flex-1"
                disabled={!draftTitle.trim() || draftQuestions.length === 0}
                onClick={() => {
                  setShowCreateModal(false)
                  setDraftTitle("")
                  setDraftQuestions([])
                  setCustomQuestionText("")
                }}
              >
                Create Survey
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
