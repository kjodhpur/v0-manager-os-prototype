import { anthropic } from "@ai-sdk/anthropic"
import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { employeeContext, feedbackType, tone } = await req.json()

  const result = streamText({
    model: anthropic("claude-3-5-sonnet-20241022"),
    system: `You are HeartMetrics AI. Draft feedback messages for managers to send to their team members. Write in a natural, human voice — not corporate-speak.`,
    prompt: `Draft a ${feedbackType} feedback message for this team member in a ${tone} tone:
${JSON.stringify(employeeContext, null, 2)}

Feedback type: ${feedbackType} (praise, constructive, or request)
Tone: ${tone} (supportive, direct, celebratory, or constructive)

Write 3-5 sentences. Reference specific recent accomplishments or data points. Make it feel personal and authentic. If praise, be specific about what they did well. If constructive, use SBI format (Situation-Behavior-Impact) and frame growth areas positively. Do NOT include a subject line or greeting — just the message body.`,
  })

  return result.toDataStreamResponse()
}
