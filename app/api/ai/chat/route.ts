import { NextRequest, NextResponse } from "next/server";
import { buildTeamContext } from "@/lib/team-data"; // adjust path if needed

const SYSTEM_PROMPT = `You are an AI coach embedded in HeartMetrics, a workplace wellbeing platform for managers. 
You help managers understand their team's Work Wellbeing Index (WWI), interpret signals, and take meaningful action.
You are empathetic, data-informed, and practical. You give specific, actionable advice.
Keep responses concise and focused. Use bullet points sparingly — prefer clear prose.
You have access to context about the team including WWI scores, blocked items, workload status, and recognition gaps.`;

const teamContext = buildTeamContext();

const contextBlock = `
TEAM CONTEXT:
${JSON.stringify(teamContext)}
`;

const fullPrompt = `
${SYSTEM_PROMPT}

Detailed context:
${JSON.stringify(contextBlock, null, 2)}

Conversation:
...
`;

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const teamContext = buildTeamContext();

    const fullPrompt = `
${SYSTEM_PROMPT}

TEAM CONTEXT:
${JSON.stringify(teamContext, null, 2)}

CONVERSATION:
${messages.map((m: any) => `${m.role}: ${m.content}`).join("\n")}
`;
    const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: fullPrompt,
              },
            ],
          },
        ],
      }),
    }
  );

    const data = await response.json();

    console.log("GEMINI RAW:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      return NextResponse.json(
        { error: data?.error?.message ?? "Gemini error" },
        { status: 500 }
      );
    }

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      console.log("NO REPLY - FULL DATA:", data);
      return NextResponse.json(
        { error: "Empty Gemini response" },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}

