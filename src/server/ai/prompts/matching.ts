export type MatchCandidate = {
  profile_id: string;
  score: number;
  reason: string;
  evidence: string;
};

export type MatchResult = {
  matches: MatchCandidate[];
};

export type ProfileForMatching = {
  id: string;
  name: string;
  headline: string | null;
  summary: string;
  skills: string[];
  interests: string[];
  experienceYears: number | null;
};

const SYSTEM_PROMPT = `You are a mentorship matchmaker. Given a seeker's request and a list of community member profiles, rank the best 3 matches.

Response schema (JSON only):
{
  "matches": [
    {
      "profile_id": string,
      "score": number,            // 0-100
      "reason": string,           // 1 sentence: what they know + why they fit
      "evidence": string          // specific line from their profile (verbatim)
    }
  ]
}

Rules:
- Rank by relevance to the REQUEST, not profile completeness.
- reason must be concrete and specific to the seeker's ask.
- evidence must be a real quote from the profile, never fabricated.
- If no profile fits, return "matches": [].`;

export function buildMatchingPrompt(
  query: string,
  profiles: ProfileForMatching[]
): { system: string; user: string } {
  return {
    system: SYSTEM_PROMPT,
    user: `SEEKER REQUEST:\n${query}\n\nAVAILABLE PROFILES (JSON):\n${JSON.stringify(profiles)}`,
  };
}
