"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, RefreshCw, Link2Off, AlertCircle, ShieldCheck, Clock } from "lucide-react"

interface Integration {
  id: string
  name: string
  description: string
  dataScope: string[]
  connected: boolean
  lastSync?: string
}

const initialIntegrations: Integration[] = [
  {
    id: "jira",
    name: "Jira",
    description: "Project management with sprints, tasks, and blockers",
    dataScope: ["Task status and assignees", "Sprint data", "Blockers and dependencies", "Cycle time"],
    connected: true,
    lastSync: "2 minutes ago",
  },
  {
    id: "asana",
    name: "Asana",
    description: "Project and task management",
    dataScope: ["Project assignments", "Task status", "Due dates", "Workload data"],
    connected: false,
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "CRM with activities and pipeline data",
    dataScope: ["Activity logs", "Meeting metadata", "Pipeline assignments", "Recognition events"],
    connected: false,
  },
]

export function IntegrationsPage() {
  const [integrations, setIntegrations] = useState(initialIntegrations)
  const [syncing, setSyncing] = useState<string | null>(null)

  const handleConnect = (id: string) => {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, connected: true, lastSync: "Just now" } : i
      )
    )
  }

  const handleDisconnect = (id: string) => {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, connected: false, lastSync: undefined } : i
      )
    )
  }

  const handleSync = (id: string) => {
    setSyncing(id)
    setTimeout(() => {
      setIntegrations((prev) =>
        prev.map((i) =>
          i.id === id ? { ...i, lastSync: "Just now" } : i
        )
      )
      setSyncing(null)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Integrations</h1>
        <p className="text-sm text-muted-foreground">Connect your work tools to power HeartMetrics insights</p>
      </div>

      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-medium text-foreground">Data scope transparency</p>
            <p className="text-xs text-muted-foreground">
              Each integration clearly shows what data HeartMetrics accesses. We never read private messages, file contents, or personal communications.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {integrations.map((integration) => (
          <Card key={integration.id} className={`border ${integration.connected ? "border-primary/20" : "border-border"}`}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${integration.connected ? "bg-primary/10" : "bg-muted"}`}>
                    <span className="text-sm font-bold text-foreground">{integration.name[0]}</span>
                  </div>
                  <div>
                    <CardTitle className="text-base">{integration.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">{integration.description}</p>
                  </div>
                </div>
                <Badge variant={integration.connected ? "default" : "secondary"}>
                  {integration.connected ? (
                    <>
                      <Check className="mr-1 h-3 w-3" />
                      Connected
                    </>
                  ) : (
                    "Not connected"
                  )}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="mb-2 text-xs font-medium text-muted-foreground">Data scope:</p>
                <div className="flex flex-wrap gap-2">
                  {integration.dataScope.map((scope) => (
                    <Badge key={scope} variant="secondary" className="text-xs">
                      {scope}
                    </Badge>
                  ))}
                </div>
              </div>

              {integration.connected && (
                <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Last sync: {integration.lastSync}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
                {integration.connected ? (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSync(integration.id)}
                      disabled={syncing === integration.id}
                    >
                      <RefreshCw className={`mr-1 h-3 w-3 ${syncing === integration.id ? "animate-spin" : ""}`} />
                      {syncing === integration.id ? "Syncing..." : "Sync Now"}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDisconnect(integration.id)}
                    >
                      <Link2Off className="mr-1 h-3 w-3" />
                      Disconnect
                    </Button>
                  </>
                ) : (
                  <Button size="sm" onClick={() => handleConnect(integration.id)}>
                    Connect {integration.name}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State for Future Integrations */}
      <Card className="border-dashed border-border">
        <CardContent className="flex flex-col items-center p-8 text-center">
          <AlertCircle className="h-8 w-8 text-muted-foreground" />
          <p className="mt-3 text-sm font-medium text-foreground">More integrations coming soon</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Slack, Microsoft Teams, Google Workspace, and more are on our roadmap.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
