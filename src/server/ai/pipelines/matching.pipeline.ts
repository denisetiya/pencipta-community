import { z } from "zod";
import { chatJSON } from "@/lib/llm";
import { buildMatchingPrompt } from "@/server/ai/prompts/matching";
import type { ProfileForMatching } from "@/server/ai/prompts/matching";
import { ApiError } from "@/server/http/errors";

const matchSchema = z.object({
  profile_id: z.string().min(1),
  score: z.number().int().min(0).max(100),
  reason: z.string().min(1),
  evidence: z.string().min(1),
});

const matchResultSchema = z.object({
  matches: z.array(matchSchema).max(5),
});

export type Match = z.infer<typeof matchSchema>;

export async function matchProfiles(
  query: string,
  profiles: ProfileForMatching[]
): Promise<Match[]> {
  const { system, user } = buildMatchingPrompt(query, profiles);
  const raw = await chatJSON<unknown>([
    { role: "system", content: system },
    { role: "user", content: user },
  ]);
  const result = matchResultSchema.parse(raw);
  return result.matches;
}

export function verifyEvidence(matches: Match[], profiles: ProfileForMatching[]) {
  const corpus = profiles.map((p) => JSON.stringify(p).toLowerCase());
  for (const m of matches) {
    const evidenceLower = m.evidence.toLowerCase();
    if (!corpus.some((text) => text.includes(evidenceLower))) {
      throw new ApiError(
        422,
        "EVIDENCE_NOT_GROUNDED",
        `Evidence for ${m.profile_id} is not found in the profile corpus`
      );
    }
  }
  return matches;
}
