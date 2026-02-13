import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { employeeContext, feedbackType, tone } = await req.json()

  try {
    const result = streamText({
      model: "anthropic/claude-sonnet-4-20250514",
      system: `You are HeartMetrics AI. Draft feedback messages for managers to send to their team members. Write in a natural, human voice — not corporate-speak.`,
      prompt: `Draft a ${feedbackType} feedback message for this team member in a ${tone} tone:
${JSON.stringify(employeeContext, null, 2)}

Feedback type: ${feedbackType} (praise, constructive, or request)
Tone: ${tone} (supportive, direct, celebratory, or constructive)

Write 3-5 sentences. Reference specific recent accomplishments or data points. Make it feel personal and authentic. If praise, be specific about what they did well. If constructive, use SBI format (Situation-Behavior-Impact) and frame growth areas positively. Do NOT include a subject line or greeting — just the message body.`,
    })

    return result.toDataStreamResponse()
  } catch {
    const name = employeeContext?.employee?.name || "your team member"
    const fallback = generateFeedbackFallback(name, feedbackType, tone)
    return new Response(fallback, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    })
  }
}

function generateFeedbackFallback(name: string, type: string, tone: string): string {
  if (type === "praise") {
    if (tone === "celebratory") {
      return `${name}, what a fantastic stretch of work! Your recent contributions have been nothing short of exceptional. The quality and consistency you've brought to the team is exactly the kind of impact that makes a real difference. I'm genuinely excited about where things are heading with you on the team — keep up the amazing work!`
    }
    return `${name}, I wanted to take a moment to recognize your outstanding contributions recently. Your work has been consistently high-quality, and the team benefits greatly from your dedication and expertise. The way you approach challenges with both thoroughness and creativity sets a strong example for everyone. Thank you for going above and beyond — it doesn't go unnoticed.`
  }

  if (type === "constructive") {
    if (tone === "direct") {
      return `${name}, I want to share some direct feedback on something I've observed. There have been a few instances where task prioritization could have been handled more effectively, which created some downstream delays for the team. I'd like us to work together on a prioritization framework that helps you focus on the highest-impact items first. Let's schedule time this week to discuss a plan.`
    }
    return `${name}, I appreciate your hard work and wanted to share some thoughts on how we can continue growing together. I've noticed some opportunities where we could improve our workflow efficiency, particularly around task prioritization. I'd love to set up some time to discuss strategies that might help you manage competing priorities more effectively. I'm here to support you — let's work on this together.`
  }

  return `${name}, I wanted to follow up on our recent discussions and share a request. As we move into the next sprint cycle, it would be great to see more proactive communication around project timelines and potential blockers. This will help the whole team plan better and ensure we can support each other effectively. Let me know if there's anything you need from me to make this easier.`
}
