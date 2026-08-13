import { z } from "zod";
import { chatJSON } from "@/lib/llm";
import { buildExtractionPrompt } from "@/server/ai/prompts/extraction";
import type { ExtractedProfile } from "@/server/ai/prompts/extraction";

const extractedProfileSchema = z.object({
  summary: z.string().min(1),
  skills: z.array(z.string()).max(12),
  interests: z.array(z.string()).max(8),
  experienceYears: z.number().int().min(0).max(70),
  keywords: z.array(z.string()).max(15),
});

export type { ExtractedProfile };

export async function extractProfile(chat: string): Promise<ExtractedProfile> {
  const { system, user } = buildExtractionPrompt(chat);
  const raw = await chatJSON<unknown>([
    { role: "system", content: system },
    { role: "user", content: user },
  ]);
  return extractedProfileSchema.parse(raw);
}
