import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { employeeContext, previousNotes, actionItems } = await req.json()

  try {
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
  } catch {
    const name = employeeContext?.employee?.name || "this team member"
    const fallback = `🔴 **Workload & Capacity Check**
${name}'s current workload signals suggest they may be juggling multiple priorities. This is a good time to review what's on their plate and see if anything can be deprioritized or delegated.
*"How are you feeling about your current workload? Is there anything that feels unsustainable right now?"*

🟡 **Project Progress & Blockers**
Review the status of their active projects and identify any obstacles that need your help to resolve.
*"What's the biggest blocker you're facing right now, and how can I help clear it?"*

🟡 **Growth & Development**
Check in on their career development goals and whether they feel they're getting enough opportunities to grow.
*"Is there a skill or area you'd like to develop that we haven't talked about recently?"*

🟢 **Recognition & Well-being**
Make sure they feel valued for their recent contributions and check in on their overall well-being.
*"What's been the most rewarding part of your work lately?"*

💡 **Icebreaker:** Start by asking about something non-work — a recent weekend activity, a book they're reading, or something they're looking forward to.`

    return new Response(fallback, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    })
  }
}
