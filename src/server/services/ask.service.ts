import prisma from "@/lib/prisma";
import { askCommunity } from "@/server/ai/pipelines/ask.pipeline";
import type { CorpusItem } from "@/server/ai/prompts/ask";
import type { AskResult } from "@/server/ai/pipelines/ask.pipeline";

async function buildCorpus(): Promise<CorpusItem[]> {
  const [profiles, posts] = await Promise.all([
    prisma.sageProfile.findMany({
      where: { status: "ACTIVE" },
      include: { user: true },
    }),
    prisma.post.findMany({
      take: 50,
      orderBy: { createdAt: "desc" },
      include: { author: { include: { sageProfile: true } } },
    }),
  ]);

  const profileItems: CorpusItem[] = profiles.map((p) => ({
    type: "profile",
    profile_id: p.id,
    author: p.user.name,
    text: `Profile of ${p.user.name} (${p.user.headline ?? "member"}): ${p.summary} Skills: ${p.skills.join(", ")}`,
  }));

  const postItems: CorpusItem[] = posts.map((post) => ({
    type: "post",
    profile_id: post.author.sageProfile?.id ?? undefined,
    author: post.author.name,
    text: post.content,
  }));

  return [...profileItems, ...postItems];
}

export async function ask(question: string): Promise<AskResult> {
  const corpus = await buildCorpus();
  if (corpus.length === 0) {
    return { answer: "There's no community knowledge to draw from yet.", citedProfiles: [] };
  }

  return askCommunity(question, corpus);
}
