import { NextRequest } from "next/server";
import { connectSchema } from "@/server/schemas/connect.schema";
import { requestConnection, updateConnectionStatus } from "@/server/services/connection.service";
import { jsonOk, toHttpError } from "@/server/http/response";
import { badRequest } from "@/server/http/errors";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const input = connectSchema.parse(body ?? {});

    if (!body.userId) throw badRequest("Missing userId");

    const connection = await requestConnection(input.mentorId, body.userId as string, input.requestContext);
    return jsonOk(connection, 201);
  } catch (err) {
    return toHttpError(err);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const connectionId = body?.connectionId as string | undefined;
    const userId = body?.userId as string | undefined;
    const status = body?.status as "ACCEPTED" | "DECLINED" | undefined;

    if (!connectionId || !userId) throw badRequest("Missing connectionId / userId");
    if (status !== "ACCEPTED" && status !== "DECLINED") {
      throw badRequest("status must be ACCEPTED or DECLINED");
    }

    const connection = await updateConnectionStatus(connectionId, userId, status);
    return jsonOk(connection);
  } catch (err) {
    return toHttpError(err);
  }
}
