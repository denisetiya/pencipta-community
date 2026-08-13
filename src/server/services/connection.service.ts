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
    include: { sageProfile: true },
  });
  const mentee = await prisma.user.findUnique({
    where: { id: menteeId },
    include: { sageProfile: true },
  });

  if (!mentor?.sageProfile) throw notFound("This person has no active Sage profile");
  if (!mentee) throw notFound("Requester not found");

  const existing = await prisma.connection.findFirst({
    where: { mentorId, menteeId, status: ConnectionStatus.PENDING },
  });
  if (existing) throw badRequest("You already have a pending request with this sage");

  const icebreaker = await generateIcebreaker(
    {
      name: mentor.name,
      summary: mentor.sageProfile.summary,
      skills: mentor.sageProfile.skills,
      interests: mentor.sageProfile.interests,
    },
    {
      name: mentee.name,
      summary: mentee.sageProfile?.summary ?? "",
      skills: mentee.sageProfile?.skills ?? [],
      interests: mentee.sageProfile?.interests ?? [],
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
  sageUserId: string,
  status: "ACCEPTED" | "DECLINED"
) {
  const connection = await prisma.connection.findUnique({ where: { id: connectionId } });
  if (!connection) throw notFound("Connection request not found");
  if (connection.mentorId !== sageUserId) {
    throw badRequest("Only the mentor can accept or decline this request");
  }

  return prisma.connection.update({
    where: { id: connectionId },
    data: { status: ConnectionStatus[status] },
  });
}
