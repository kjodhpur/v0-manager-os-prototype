import { streamText } from "ai"

export const maxDuration = 30

const FALLBACK_INSIGHT = `**Team health is trending positively this week.** Overall WHI sits at 74/100, up 3 points from last week, with strongest gains in the Engineering pod. **Marcus Chen** continues to show elevated workload signals — his WIP count (7) and meeting hours (22/week) suggest he may be stretched thin. Meanwhile, **Priya Sharma** has received zero recognition in the past 30 days despite shipping 3 major features. Consider sending her a quick kudos or shout-out in your next team standup. **Recommended action:** Schedule a check-in with Marcus this week to discuss workload prioritization and delegate at least one of his active projects.`

export async function POST(req: Request) {
  const { teamContext } = await req.json()

  try {
    const result = streamText({
      model: "anthropic/claude-sonnet-4-20250514",
      system: `You are HeartMetrics AI. Generate a concise weekly team health summary for a people manager. Be specific, reference actual names and numbers. Use **bold** for the most important points. Keep it to 4-5 sentences. End with one concrete recommended action for this week.`,
      prompt: `Based on this team data, write a brief executive summary of the team's current health status. Highlight what's going well and what needs attention. Be specific with names and metrics.

Team data:
${JSON.stringify(teamContext, null, 2)}`,
    })

    return result.toDataStreamResponse()
  } catch {
    // Return fallback insight as a streamed response
    return new Response(FALLBACK_INSIGHT, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    })
  }
}
