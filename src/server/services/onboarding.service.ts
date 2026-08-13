import prisma from "@/lib/prisma";
import { extractProfile } from "@/server/ai/pipelines/extraction.pipeline";
import { notFound, badRequest } from "@/server/http/errors";

export async function createSageProfile(userId: string, chat: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw notFound("User not found");

  const extracted = await extractProfile(chat);
  if (extracted.skills.length === 0) {
    throw badRequest("We couldn't detect any skills from your story — add a little more detail.");
  }

  return prisma.sageProfile.upsert({
    where: { userId },
    update: {
      summary: extracted.summary,
      skills: extracted.skills,
      interests: extracted.interests,
      keywords: extracted.keywords,
      experienceYears: extracted.experienceYears,
    },
    create: {
      userId,
      summary: extracted.summary,
      skills: extracted.skills,
      interests: extracted.interests,
      keywords: extracted.keywords,
      experienceYears: extracted.experienceYears,
    },
  });
}
