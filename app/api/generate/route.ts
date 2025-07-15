import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

function extractJsonFromString(text: string): string {
  const match = text.match(/\{[\s\S]*\}/);
  return match ? match[0] : "{}";
}

export async function POST(req: NextRequest) {
  const { name, price } = await req.json();

  const prompt = `
You are an expert ecommerce copywriter. Write content for:

Product Name: ${name}
Price: $${price}

Return result as JSON with this format:
{
  "title": "...",
  "description": "...",
  "tags": ["...", "..."]
}
`;

  try {
    const res = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const raw = res.choices[0].message.content!;
    const jsonText = extractJsonFromString(raw); // ✨ safely extract only the JSON part
    const parsed = JSON.parse(jsonText);
    return NextResponse.json(parsed);
  } catch (err: any) {
    console.error("GPT Error:", err);
    return NextResponse.json({ error: "Failed to generate product content." }, { status: 500 });
  }
}
