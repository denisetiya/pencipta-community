import { z } from "zod";
import { chatJSON } from "@/lib/llm";
import { buildAskPrompt } from "@/server/ai/prompts/ask";
import type { CorpusItem } from "@/server/ai/prompts/ask";

const askResultSchema = z.object({
  answer: z.string().min(1),
  citedProfiles: z
    .array(
      z.object({
        profile_id: z.string().min(1),
        name: z.string().min(1),
        why: z.string().min(1),
      })
    )
    .max(5),
});

export type AskResult = z.infer<typeof askResultSchema>;

export async function askCommunity(
  question: string,
  corpus: CorpusItem[]
): Promise<AskResult> {
  const { system, user } = buildAskPrompt(question, corpus);
  const raw = await chatJSON<unknown>([
    { role: "system", content: system },
    { role: "user", content: user },
  ]);
  return askResultSchema.parse(raw);
}
