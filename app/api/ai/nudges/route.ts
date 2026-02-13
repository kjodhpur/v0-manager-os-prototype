import { generateObject } from "ai"
import { z } from "zod"

export const maxDuration = 30

const FALLBACK_NUDGES = {
  nudges: [
    {
      id: "nudge-fallback-1",
      severity: "high" as const,
      category: "checkin" as const,
      emoji: "🔴",
      message: "Marcus Chen's workload signals are elevated — 7 active WIPs and 22 meeting hours this week. Consider a check-in to discuss priorities.",
      evidence: "- WIP count: 7 (team avg: 4.2)\n- Meeting hours: 22/week\n- WHI trending downward",
      actionLabel: "Schedule 1:1",
      actionTarget: "meetings",
      targetEmployee: "Marcus Chen",
    },
    {
      id: "nudge-fallback-2",
      severity: "medium" as const,
      category: "recognition" as const,
      emoji: "⭐",
      message: "Priya Sharma shipped 3 features this month but hasn't received any public recognition. A quick shout-out could go a long way.",
      evidence: "- 3 features shipped\n- 0 public recognitions in 30 days\n- High performer",
      actionLabel: "Send Kudos",
      actionTarget: "recognition-growth",
      targetEmployee: "Priya Sharma",
    },
    {
      id: "nudge-fallback-3",
      severity: "medium" as const,
      category: "survey" as const,
      emoji: "📋",
      message: "The latest pulse survey has a 65% response rate. A quick reminder could help capture the remaining voices.",
      evidence: "- Response rate: 65%\n- 3 team members haven't responded\n- Survey closes in 2 days",
      actionLabel: "Send Reminder",
      actionTarget: "surveys",
    },
  ],
}

export async function POST(req: Request) {
  const { teamContext } = await req.json()

  try {
    const result = await generateObject({
      model: "anthropic/claude-sonnet-4-20250514",
      schema: z.object({
        nudges: z.array(
          z.object({
            id: z.string(),
            severity: z.enum(["high", "medium", "low"]),
            category: z.enum(["checkin", "workload", "recognition", "survey", "goal"]),
            emoji: z.string(),
            message: z.string().describe("A concise, specific nudge message referencing actual team member names and data points. Max 2 sentences."),
            evidence: z.string().describe("2-3 bullet points of data backing this nudge"),
            actionLabel: z.string().describe("Short button label like 'Schedule 1:1' or 'Send Kudos'"),
            actionTarget: z.string().describe("Navigation target: meetings, recognition-growth, work-distribution, surveys, or goals"),
            targetEmployee: z.string().optional().describe("Name of the employee this nudge is about, if applicable"),
          })
        ).describe("3-5 actionable nudges ordered by urgency"),
      }),
      prompt: `Analyze this team data and generate 3-5 actionable nudges for the manager. Each nudge should be specific, reference real data, and have a clear action.

Team data:
${JSON.stringify(teamContext, null, 2)}`,
    })

    return Response.json(result.object)
  } catch {
    return Response.json(FALLBACK_NUDGES)
  }
}
