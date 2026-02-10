import { generateObject } from "ai"
import { z } from "zod"

export const maxDuration = 30

export async function POST(req: Request) {
  const { teamContext } = await req.json()

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
}
