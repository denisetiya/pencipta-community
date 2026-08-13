export type PersonForIcebreaker = {
  name: string;
  summary: string;
  skills: string[];
  interests: string[];
};

const SYSTEM_PROMPT = `Write a short first message (max 50 words) from a mentee to a mentor. It must:
- Reference ONE specific thing from the mentor's profile (a real skill, interest, or detail).
- State what the mentee wants help with.
- Sound human and warm, not salesy.
- language: English.

Respond with plain text only (no JSON, no quotes).`;

export function buildIcebreakerPrompt(
  mentor: PersonForIcebreaker,
  mentee: PersonForIcebreaker,
  requestContext: string
): { system: string; user: string } {
  return {
    system: SYSTEM_PROMPT,
    user: `MENTEE CONTEXT:\n${JSON.stringify(mentee)}\n\nMENTOR PROFILE:\n${JSON.stringify(
      mentor
    )}\n\nMENTEE'S REQUEST:\n${requestContext}`,
  };
}
