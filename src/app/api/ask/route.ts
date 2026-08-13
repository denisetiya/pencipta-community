import { NextRequest } from "next/server";
import { askSchema } from "@/server/schemas/ask.schema";
import { ask } from "@/server/services/ask.service";
import { jsonOk, toHttpError } from "@/server/http/response";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const { question } = askSchema.parse(body ?? {});
    const result = await ask(question);
    return jsonOk(result);
  } catch (err) {
    return toHttpError(err);
  }
}
