import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { employeeContext, previousNotes, actionItems } = await req.json()

  const result = streamText({
    model: "anthropic/claude-sonnet-4-20250514",
    system: `You are HeartMetrics AI. Generate 1:1 meeting prep for a people manager. Be specific, actionable, and empathetic.`,
    prompt: `Generate meeting prep for a 1:1 with this team member:
${JSON.stringify(employeeContext, null, 2)}

Previous meeting notes: ${previousNotes || "None available"}
Open action items: ${JSON.stringify(actionItems || [])}

Format your response as:
1. 3-4 prioritized talking points, each with:
   - Priority emoji (🔴 High / 🟡 Medium / 🟢 Low)
   - **Topic title** in bold
   - 1-2 sentences of context referencing their actual data
   - A suggested question in *italics*
2. End with a 💡 Icebreaker suggestion

Be specific. Reference actual data points. Frame everything constructively.`,
  })

  return result.toDataStreamResponse()
}
