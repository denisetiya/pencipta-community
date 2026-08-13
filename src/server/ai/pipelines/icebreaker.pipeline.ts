import { chatText } from "@/lib/llm";
import { buildIcebreakerPrompt } from "@/server/ai/prompts/icebreaker";
import type { PersonForIcebreaker } from "@/server/ai/prompts/icebreaker";

export async function generateIcebreaker(
  mentor: PersonForIcebreaker,
  mentee: PersonForIcebreaker,
  requestContext: string
): Promise<string> {
  const { system, user } = buildIcebreakerPrompt(mentor, mentee, requestContext);
  const text = await chatText([
    { role: "system", content: system },
    { role: "user", content: user },
  ]);
  return text.trim().replace(/^["']|["']$/g, "");
}
