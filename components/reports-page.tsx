"use client"

import { FileText, Download, Calendar, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { reportTemplates } from "@/lib/data"

export function ReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <FileText className="h-6 w-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
          <p className="text-sm text-muted-foreground">Generate and export formatted manager reports</p>
        </div>
      </div>

      {/* Report Templates */}
      <div className="flex flex-col gap-4">
        {reportTemplates.map((report) => (
          <Card key={report.id} className="border-border">
            <CardContent className="p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                  <FileText className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-base font-semibold text-foreground">{report.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{report.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {report.sections.map((section) => (
                        <Badge key={section} variant="outline" className="text-xs">{section}</Badge>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      Last generated: {new Date(report.lastGenerated).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button size="sm" variant="outline">
                    <RefreshCw className="mr-1 h-3.5 w-3.5" /> Regenerate
                  </Button>
                  <Button size="sm">
                    <Download className="mr-1 h-3.5 w-3.5" /> Export PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Digest Preview */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-foreground">Weekly Digest Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-card p-4">
            <p className="text-sm font-semibold text-foreground">Week of Feb 3 - Feb 9, 2026</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
              <p>- Team WHI: 67 (+4 from last week)</p>
              <p>- 2 high-risk employees (Riya S., Sam J.)</p>
              <p>- 7/10 pulse survey responses received</p>
              <p>- 3 overdue 1:1 meetings</p>
              <p>- 5 actions recommended, 2 completed</p>
              <p>- Recognition: 3 public shoutouts sent</p>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline">
                <Download className="mr-1 h-3.5 w-3.5" /> Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
