"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Users, Shield, Database, Bell } from "lucide-react"

export function SettingsPage() {
  const [aggregateOnly, setAggregateOnly] = useState(false)
  const [excludeAfterHours, setExcludeAfterHours] = useState(true)
  const [demoMode, setDemoMode] = useState(true)

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
