export type CitedProfile = {
  profile_id: string;
  name: string;
  why: string;
};

export type AskResult = {
  answer: string;
  citedProfiles: CitedProfile[];
};

export type CorpusItem = {
  type: "profile" | "post";
  profile_id?: string;
  author?: string;
  text: string;
};

const SYSTEM_PROMPT = `You are a community knowledge assistant. Answer the user's question using ONLY the community corpus provided (profiles and posts). Then cite the specific community members most relevant to the question.

Response schema (JSON only):
{
  "answer": string,          // helpful, grounded in the corpus, 3-6 sentences
  "citedProfiles": [
    {
      "profile_id": string,
      "name": string,
      "why": string           // 1 sentence: why this person can help
    }
  ]
}

Rules:
- Never invent facts not present in the corpus.
- Only cite profiles that actually appear in the corpus.
- If the corpus does not contain relevant info, say so in the answer and return "citedProfiles": [].`;

export function buildAskPrompt(question: string, corpus: CorpusItem[]): { system: string; user: string } {
  return {
    system: SYSTEM_PROMPT,
    user: `QUESTION:\n${question}\n\nCOMMUNITY CORPUS (JSON):\n${JSON.stringify(corpus)}`,
  };
}
