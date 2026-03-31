"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Check,
  Users,
  Link2,
  Play,
  User,
} from "lucide-react"

const steps = [
  { id: "welcome", label: "Welcome" },
  { id: "user", label: "Your Details" },
  { id: "org", label: "Organization" },
  { id: "connect", label: "Connect Tools" },
  { id: "team", label: "Map Team" },
  { id: "done", label: "Ready" },
]

interface OnboardingWizardProps {
  onComplete: () => void
}

export function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [orgName, setOrgName] = useState("")
  const [teamName, setTeamName] = useState("")
  const [connectedTools, setConnectedTools] = useState<string[]>([])
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  const handleConnectTool = (tool: string) => {
    setConnectedTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
    )
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1)
  }
  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="mb-8 flex items-center justify-center gap-2">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ${
                  i < currentStep
                    ? "bg-primary text-primary-foreground"
                    : i === currentStep
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {i < currentStep ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`h-0.5 w-8 ${i < currentStep ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>

        <Card className="border-border">
          <CardContent className="p-8">
            {/* Step 0: Welcome */}
            {currentStep === 0 && (
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <h2 className="mt-6 text-2xl font-bold text-foreground">Welcome to HeartMetrics</h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {"Let's get you set up. This will only take a few minutes."}
                </p>
                <div className="mt-6 rounded-lg bg-secondary/50 p-4 text-left">
                  <h3 className="text-sm font-semibold text-foreground">Our privacy promise</h3>
                  <ul className="mt-2 flex flex-col gap-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      We only read work-system signals (tasks, meetings, assignments)
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      We never read private messages or monitor personal activity
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      Every score is explainable and transparent
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      You control your data and can delete it anytime
                    </li>
                  </ul>
                </div>
                <Button className="mt-6 w-full" onClick={nextStep}>
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <button
                  className="mt-3 text-sm text-primary hover:underline"
                  onClick={onComplete}
                >
                  Skip to demo mode
                </button>
              </div>
            )}

            {/* Step 1: Your Details */}
            {currentStep === 1 && (
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Tell us about yourself</h2>
                    <p className="text-sm text-muted-foreground">We need your contact info</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input
                      id="full-name"
                      placeholder="e.g. John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="e.g. john@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="e.g. +1 (555) 123-4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-6 flex gap-3">
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button className="flex-1" onClick={nextStep}>
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Organization */}
            {currentStep === 2 && (
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Create your organization</h2>
                    <p className="text-sm text-muted-foreground">Set up your workspace</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="org-name">Organization name</Label>
                    <Input
                      id="org-name"
                      placeholder="e.g. Acme Inc."
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="team-name">Team name</Label>
                    <Input
                      id="team-name"
                      placeholder="e.g. AR Ops Team"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-6 flex gap-3">
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button className="flex-1" onClick={nextStep}>
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Connect Tools */}
            {currentStep === 3 && (
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Link2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Connect your tools</h2>
                    <p className="text-sm text-muted-foreground">Or skip to use demo data</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  {["Jira", "Asana", "Salesforce"].map((tool) => {
                    const isConnected = connectedTools.includes(tool)
                    return (
                      <div
                        key={tool}
                        className={`flex items-center justify-between rounded-lg border p-4 ${
                          isConnected ? "border-primary bg-primary/5" : "border-border"
                        }`}
                      >
                        <div>
                          <p className="font-medium text-foreground">{tool}</p>
                          <p className="text-xs text-muted-foreground">
                            {tool === "Jira" && "Tasks, sprints, blockers"}
                            {tool === "Asana" && "Projects, tasks, assignments"}
                            {tool === "Salesforce" && "Activities, pipeline, meetings"}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant={isConnected ? "default" : "outline"}
                          onClick={() => handleConnectTool(tool)}
                        >
                          {isConnected ? (
                            <>
                              <Check className="mr-1 h-4 w-4" />
                              Connected
                            </>
                          ) : (
                            "Connect"
                          )}
                        </Button>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-6 flex gap-3">
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button className="flex-1" onClick={nextStep}>
                    {connectedTools.length > 0 ? "Continue" : "Use Demo Data"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Map Team */}
            {currentStep === 4 && (
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Map your team</h2>
                    <p className="text-sm text-muted-foreground">
                      {connectedTools.length > 0 ? "Map users from connected tools" : "Demo team will be loaded"}
                    </p>
                  </div>
                </div>
                <div className="mt-6 rounded-lg bg-secondary/50 p-4">
                  {connectedTools.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      <p className="text-sm text-muted-foreground">
                        We found users from your connected tools. You can map them to team members after setup.
                      </p>
                      <Badge variant="secondary">{connectedTools.length} tool(s) connected</Badge>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <p className="text-sm text-muted-foreground">
                        Demo mode will load a sample team of 10 employees with realistic scores and metrics. You can explore all features with this data.
                      </p>
                      <Badge variant="secondary">Demo: AR Ops Team (10 members)</Badge>
                    </div>
                  )}
                </div>
                <div className="mt-6 flex gap-3">
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button className="flex-1" onClick={nextStep}>
                    Finish Setup
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 5: Done */}
            {currentStep === 5 && (
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Play className="h-8 w-8 text-primary" />
                </div>
                <h2 className="mt-6 text-2xl font-bold text-foreground">{"You're all set!"}</h2>
                <p className="mt-3 text-base text-muted-foreground">
                  Your HeartMetrics dashboard is ready. Here is what you can explore:
                </p>
                <div className="mt-6 flex w-full flex-col gap-2 text-left">
                  {[
                    "Overview: Team health at a glance",
                    "Team Health: Individual wellbeing scores",
                    "Work Distribution: Workload balance and fairness",
                    "Recognition & Growth: Gaps and opportunities",
                    "Actions: Recommended next steps",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 rounded bg-secondary/50 px-3 py-2 text-sm text-foreground">
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                      {item}
                    </div>
                  ))}
                </div>
                <Button className="mt-6 w-full" onClick={onComplete}>
                  Launch Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
