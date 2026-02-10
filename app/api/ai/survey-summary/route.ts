import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { surveyData, teamContext } = await req.json()

  const result = streamText({
    model: "anthropic/claude-sonnet-4-20250514",
    system: `You are HeartMetrics AI. Summarize pulse survey results for a manager. Never reveal individual responses — only aggregated themes. Be concise and actionable.`,
    prompt: `Summarize these pulse survey results in the context of the team's current health:

Survey data:
${JSON.stringify(surveyData, null, 2)}

Team context:
${JSON.stringify(teamContext, null, 2)}

Format:
1. One-line response rate summary
2. **Key themes** with approximate mention counts (bold the themes)
3. One **positive signal** worth celebrating
4. One specific **recommendation** for the manager

Keep it under 100 words. Use **bold** for key points.`,
  })

  return result.toDataStreamResponse()
}
