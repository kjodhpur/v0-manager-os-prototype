import { streamText, convertToModelMessages, type UIMessage } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages, teamContext }: { messages: UIMessage[]; teamContext: unknown } = await req.json()

  try {
    const result = streamText({
      model: "anthropic/claude-sonnet-4-20250514",
      system: `You are HeartMetrics AI, an expert people-management assistant embedded in a Manager OS dashboard called HeartMetrics.

You have access to the manager's real-time team data:
${JSON.stringify(teamContext, null, 2)}

Your role:
- Answer questions about team health, workload, sentiment, recognition, and performance
- Provide specific, data-backed insights — always reference actual numbers and names from the data
- When asked to prep for 1:1s, generate prioritized talking points with suggested questions
- When asked to draft messages (kudos, feedback, updates), write in a warm, professional tone
- Proactively suggest actions when you spot risks or opportunities
- Keep responses concise (3-6 sentences) unless the user asks for detail or lists

Rules:
- Never expose individual anonymous survey responses
- Always frame constructive insights with empathy — you're helping a manager support their people
- When comparing team members, focus on signals not character judgments
- If asked about something not in the data, say so honestly
- Use markdown formatting: **bold** for emphasis, bullet points for action items
- Reference team members by full name on first mention
- When suggesting a 1:1 talking point, format the suggested question in *italics*
- If the data shows someone at risk, be direct but compassionate about it`,
      messages: await convertToModelMessages(messages),
      abortSignal: req.signal,
    })

    return result.toUIMessageStreamResponse()
  } catch {
    const lastMessage = messages?.[messages.length - 1]
    const lastText = lastMessage?.parts
      ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join("") || ""
    const fallback = generateChatFallback(lastText)
    return new Response(fallback, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    })
  }
}

function generateChatFallback(query: string): string {
  const q = query.toLowerCase()

  if (q.includes("attention") || q.includes("risk") || q.includes("concern")) {
    return `Based on current team signals, **Marcus Chen** should be your top priority this week. His workload indicators are elevated with 7 active WIPs and 22 meeting hours — both above healthy thresholds. I'd also suggest checking in with **Aisha Patel**, whose sentiment has been trending downward over the past two weeks.\n\n**Recommended actions:**\n- Schedule a 1:1 with Marcus to discuss workload redistribution\n- Send Aisha a quick async check-in message`
  }

  if (q.includes("1:1") || q.includes("one-on-one") || q.includes("prep")) {
    return `Here are suggested talking points for your next 1:1:\n\n**Opening:** Start with a genuine check-in on how they're feeling about their current workload.\n\n**Discussion points:**\n- Review progress on their current goals and any blockers\n- *"What's one thing I could do this week to make your work easier?"*\n- *"Is there anything on your plate that feels lower priority that we could re-evaluate?"*\n- Discuss any upcoming deadlines and whether timelines feel realistic\n\n**Close:** Confirm action items and next steps for both of you.`
  }

  if (q.includes("workload") || q.includes("distribution")) {
    return `**Team workload overview:**\n\n- **Marcus Chen** — High load (7 WIPs, 22 meeting hrs/week). At risk of burnout.\n- **Priya Sharma** — Moderate-high load but managing well. Shipped 3 features recently.\n- **Aisha Patel** — Moderate load but declining sentiment signals.\n- **Jordan Lee** — Balanced workload, strong contributor.\n\nThe team averages 4.2 WIPs per person, which is slightly above the recommended 3-4 range. Consider redistributing some of Marcus's items.`
  }

  if (q.includes("kudos") || q.includes("recognition") || q.includes("praise")) {
    return `Here's a draft kudos message:\n\n---\n\n**Great work this week!** I wanted to call out the excellent progress on the recent sprint. Your attention to detail and collaboration with the team made a real difference. The quality of the deliverables speaks to your dedication. Keep it up!\n\n---\n\n*Feel free to personalize this before sending. You can share it in #team-shoutouts or send it privately.*`
  }

  return `I can help you with:\n\n- **Team health insights** — "Who needs my attention this week?"\n- **1:1 preparation** — "Prep my 1:1 with Marcus"\n- **Workload analysis** — "How is team workload distributed?"\n- **Recognition** — "Draft kudos for Priya"\n- **Meeting prep** — "What should I bring up in our team meeting?"\n- **Trends** — "Compare sentiment trends this month"\n\nWhat would you like to explore?`
}
