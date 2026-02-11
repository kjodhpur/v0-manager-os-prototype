import { anthropic } from "@ai-sdk/anthropic"
import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { teamContext } = await req.json()

  const result = streamText({
    model: anthropic("claude-3-5-sonnet-20241022"),
    system: `You are HeartMetrics AI. Generate a concise weekly team health summary for a people manager. Be specific, reference actual names and numbers. Use **bold** for the most important points. Keep it to 4-5 sentences. End with one concrete recommended action for this week.`,
    prompt: `Based on this team data, write a brief executive summary of the team's current health status. Highlight what's going well and what needs attention. Be specific with names and metrics.

Team data:
${JSON.stringify(teamContext, null, 2)}`,
  })

  return result.toDataStreamResponse()
}
