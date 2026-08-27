import prisma from "@/lib/prisma";
import { generateIcebreaker } from "@/server/ai/pipelines/icebreaker.pipeline";
import { notFound, badRequest } from "@/server/http/errors";
import { ConnectionStatus } from "@/generated/prisma/enums";

export async function requestConnection(
  mentorId: string,
  menteeId: string,
  requestContext: string
) {
  if (mentorId === menteeId) throw badRequest("You can't request mentorship from yourself");

  const mentor = await prisma.user.findUnique({
    where: { id: mentorId },
    include: { profile: true },
  });
  const mentee = await prisma.user.findUnique({
    where: { id: menteeId },
    include: { profile: true },
  });

  if (!mentor?.profile) throw notFound("This person has no active profile");
  if (!mentee) throw notFound("Requester not found");

  const existing = await prisma.connection.findFirst({
    where: { mentorId, menteeId, status: ConnectionStatus.PENDING },
  });
  if (existing) throw badRequest("You already have a pending request with this mentor");

  const icebreaker = await generateIcebreaker(
    {
      name: mentor.name,
      summary: mentor.profile.summary,
      skills: mentor.profile.skills,
      interests: mentor.profile.interests,
    },
    {
      name: mentee.name,
      summary: mentee.profile?.summary ?? "",
      skills: mentee.profile?.skills ?? [],
      interests: mentee.profile?.interests ?? [],
    },
    requestContext
  );

  return prisma.connection.create({
    data: {
      mentorId,
      menteeId,
      requestContext,
      icebreaker,
      status: ConnectionStatus.PENDING,
    },
  });
}

export async function updateConnectionStatus(
  connectionId: string,
  userId: string,
  status: "ACCEPTED" | "DECLINED"
) {
  const connection = await prisma.connection.findUnique({ where: { id: connectionId } });
  if (!connection) throw notFound("Connection request not found");
  if (connection.mentorId !== userId) {
    throw badRequest("Only the mentor can accept or decline this request");
  }

  return prisma.connection.update({
    where: { id: connectionId },
    data: { status: ConnectionStatus[status] },
  });
}
