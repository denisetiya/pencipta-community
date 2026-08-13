export type ExtractedProfile = {
  summary: string;
  skills: string[];
  interests: string[];
  experienceYears: number;
  keywords: string[];
};

const SYSTEM_PROMPT = `You are a profile curator. Extract a knowledge-sharing profile from the user's conversation. Respond ONLY with valid JSON, no markdown, no commentary.

Return this exact schema:
{
  "summary": string,              // 1-2 sentences: who they are, what they offer
  "skills": string[],             // 3-6 things they can teach/help with
  "interests": string[],          // 2-4 things they want to learn
  "experienceYears": number,      // 0 if unknown
  "keywords": string[]            // 5-10 tags for search matching
}

Rules:
- Derive from what they SAID, never invent credentials.
- If the user mentions teaching OR helping others, prefer that for skills.
- If the user mentions wanting to learn, that goes to interests.
- language: English.`;

export function buildExtractionPrompt(chat: string): { system: string; user: string } {
  return {
    system: SYSTEM_PROMPT,
    user: `USER CONVERSATION:\n${chat}`,
  };
}
