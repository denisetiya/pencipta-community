import { NextRequest } from "next/server";
import { onboardingSchema } from "@/server/schemas/onboarding.schema";
import { createProfile } from "@/server/services/onboarding.service";
import { jsonOk, toHttpError } from "@/server/http/response";
import { badRequest } from "@/server/http/errors";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const input = onboardingSchema.parse(body ?? {});

    if (!body.userId) throw badRequest("Missing userId");

    const profile = await createProfile(body.userId as string, input.chat);
    return jsonOk(profile, 201);
  } catch (err) {
    return toHttpError(err);
  }
}
