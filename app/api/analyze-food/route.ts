import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";
import { zodResponseFormat } from "openai/helpers/zod";
import { FoodScanSchema } from "@/app/lib/schemas/foodScanSchema";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are a food analysis AI. Analyze food images and provide structured data about the food content. For each identified food item, provide:
- Whether it is food (\`isFood\`).
- The name of the food (\`foodName\`).
- A list of ingredients with their respective calorie counts (\`ingredients\`).
- The approximate total calorie count (\`totalCalories\`), which should be calculated as the sum of the calories of all ingredients. If the calorie information is not available, provide an estimated total based on the food name and type.
`;
export async function POST(req: NextRequest) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-2024-08-06",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",

          content: [
            {
              type: "image_url",
              image_url: { url: image },
            },
          ],
        },
      ],
      response_format: zodResponseFormat(FoodScanSchema, "foodScan"),
      max_tokens: 500,
    });

    const result = completion.choices[0].message.parsed;
    return NextResponse.json(result);
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Failed to analyze image" },
      { status: 500 }
    );
  }
}
