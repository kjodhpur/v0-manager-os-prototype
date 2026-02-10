"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Users, Shield, Database, Bell, Send, MessageSquare } from "lucide-react"

export function SettingsPage() {
  const [aggregateOnly, setAggregateOnly] = useState(false)
  const [excludeAfterHours, setExcludeAfterHours] = useState(true)
  const [demoMode, setDemoMode] = useState(true)
  const [digestDay, setDigestDay] = useState("Monday")
  const [digestTime, setDigestTime] = useState("09:00")
  const [digestChannel, setDigestChannel] = useState("#team-managers")
  const [digestMetrics, setDigestMetrics] = useState({
    teamHealth: true,
    overdue1on1s: true,
    burnoutAlerts: true,
    recognitionStats: true,
    surveyResults: true,
    goalProgress: true,
  })
  const [showTestToast, setShowTestToast] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your organization, privacy, and preferences</p>
      </div>

      {/* Organization */}
      <Card className="border-border">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Organization</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="org-name">Organization name</Label>
              <Input id="org-name" defaultValue="Acme Inc." />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="team-name">Team name</Label>
              <Input id="team-name" defaultValue="AR Ops Team" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Team members</Label>
            <div className="rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">10 members</p>
                  <p className="text-xs text-muted-foreground">Managed by Alex M. (Manager)</p>
                </div>
                <Button size="sm" variant="outline">
                  Invite Members
                </Button>
              </div>
            </div>
          </div>
          <Button className="w-fit">Save Changes</Button>
        </CardContent>
      </Card>

      {/* Privacy */}
      <Card className="border-border">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Privacy Controls</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Aggregate-only mode</p>
              <p className="text-xs text-muted-foreground">
                Show only team-level patterns. Individual scores are hidden from managers.
              </p>
            </div>
            <Switch checked={aggregateOnly} onCheckedChange={setAggregateOnly} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Exclude after-hours signals</p>
              <p className="text-xs text-muted-foreground">
                Do not include work activity outside standard business hours in analysis.
              </p>
            </div>
            <Switch checked={excludeAfterHours} onCheckedChange={setExcludeAfterHours} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Demo mode</p>
              <p className="text-xs text-muted-foreground">
                Use sample data instead of real integrations. Useful for evaluation and demos.
              </p>
            </div>
            <div className="flex items-center gap-2">
              {demoMode && <Badge variant="secondary">Active</Badge>}
              <Switch checked={demoMode} onCheckedChange={setDemoMode} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Roles */}
      <Card className="border-border">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Role Management</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {[
              { role: "Admin", description: "Full access to all settings, integrations, and data", count: 1 },
              { role: "Manager", description: "View team dashboards, take actions, manage team", count: 1 },
              { role: "Viewer", description: "View-only access to team dashboards", count: 0 },
            ].map((r) => (
              <div key={r.role} className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{r.role}</p>
                    <Badge variant="secondary" className="text-xs">{r.count} user(s)</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{r.description}</p>
                </div>
                <Button size="sm" variant="outline">Manage</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Digest Settings */}
      <Card className="border-border">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Weekly Digest (Slack/Teams)</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          {/* Delivery Schedule */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="digest-day">Delivery Day</Label>
              <select
                id="digest-day"
                value={digestDay}
                onChange={(e) => setDigestDay(e.target.value)}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
              >
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="digest-time">Delivery Time</Label>
              <Input
                id="digest-time"
                type="time"
                value={digestTime}
                onChange={(e) => setDigestTime(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="digest-channel">Channel</Label>
              <select
                id="digest-channel"
                value={digestChannel}
                onChange={(e) => setDigestChannel(e.target.value)}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
              >
                <option value="#team-managers">#team-managers</option>
                <option value="#leadership">#leadership</option>
                <option value="#general">#general</option>
                <option value="DM (self)">DM (self)</option>
              </select>
            </div>
          </div>

          {/* Metric Toggles */}
          <div>
            <p className="mb-3 text-sm font-medium text-foreground">Include in digest</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {([
                { key: "teamHealth", label: "Team Health Score" },
                { key: "overdue1on1s", label: "Overdue 1:1s" },
                { key: "burnoutAlerts", label: "Burnout Risk Alerts" },
                { key: "recognitionStats", label: "Recognition Stats" },
                { key: "surveyResults", label: "Survey Results" },
                { key: "goalProgress", label: "Goal Progress" },
              ] as const).map((metric) => (
                <div key={metric.key} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                  <span className="text-sm text-foreground">{metric.label}</span>
                  <Switch
                    checked={digestMetrics[metric.key]}
                    onCheckedChange={(checked) => setDigestMetrics({ ...digestMetrics, [metric.key]: checked })}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Preview + Test */}
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="mb-2 text-sm font-semibold text-foreground">Digest Preview</p>
            <div className="rounded-lg border border-border bg-card p-3 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">HeartMetrics Weekly Digest</p>
              <p className="mt-1 text-xs">
                {digestDay}s at {digestTime} to {digestChannel}
              </p>
              <div className="mt-2 flex flex-col gap-1 text-xs">
                {digestMetrics.teamHealth && <p>- Team WHI: 67 (+4 from last week)</p>}
                {digestMetrics.overdue1on1s && <p>- 3 overdue 1:1 meetings</p>}
                {digestMetrics.burnoutAlerts && <p>- 2 high-risk employees (Riya S., Sam J.)</p>}
                {digestMetrics.recognitionStats && <p>- 3 public shoutouts sent</p>}
                {digestMetrics.surveyResults && <p>- 7/10 pulse survey responses received</p>}
                {digestMetrics.goalProgress && <p>- 5 actions recommended, 2 completed</p>}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button size="sm">Save Digest Settings</Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setShowTestToast(true)
                setTimeout(() => setShowTestToast(false), 3000)
              }}
            >
              <Send className="mr-1 h-3.5 w-3.5" />
              Send Test Message
            </Button>
          </div>

          {showTestToast && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400">
              Test digest sent to {digestChannel}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Retention */}
      <Card className="border-border">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Data Retention</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">
              Your data is retained while your subscription is active. You can request full deletion at any time.
            </p>
            <div className="flex gap-3">
              <Button size="sm" variant="outline">Export Data</Button>
              <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                Request Deletion
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
