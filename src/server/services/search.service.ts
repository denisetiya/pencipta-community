import prisma from "@/lib/prisma";
import { matchProfiles, verifyEvidence } from "@/server/ai/pipelines/matching.pipeline";
import type { ProfileForMatching } from "@/server/ai/prompts/matching";

export type SearchResult = {
  profileId: string;
  name: string;
  handle: string;
  headline: string | null;
  summary: string;
  skills: string[];
  score: number;
  reason: string;
  evidence: string;
};

function toProfileForMatching(profiles: Awaited<ReturnType<typeof loadProfiles>>): ProfileForMatching[] {
  return profiles.map((p) => ({
    id: p.id,
    name: p.user.name,
    headline: p.user.headline,
    summary: p.summary,
    skills: p.skills,
    interests: p.interests,
    experienceYears: p.experienceYears,
  }));
}

async function loadProfiles() {
  return prisma.profile.findMany({
    where: { status: "ACTIVE" },
    include: { user: true },
  });
}

export async function searchProfiles(query: string): Promise<SearchResult[]> {
  const profiles = await loadProfiles();
  if (profiles.length === 0) return [];

  const matches = await matchProfiles(query, toProfileForMatching(profiles));
  verifyEvidence(matches, toProfileForMatching(profiles));

  const byId = new Map(profiles.map((p) => [p.id, p]));

  return matches.map((m) => {
    const profile = byId.get(m.profile_id);
    if (!profile) {
      throw new Error(`Match referenced unknown profile: ${m.profile_id}`);
    }
    return {
      profileId: profile.id,
      name: profile.user.name,
      handle: profile.user.handle,
      headline: profile.user.headline,
      summary: profile.summary,
      skills: profile.skills,
      score: m.score,
      reason: m.reason,
      evidence: m.evidence,
    };
  });
}
