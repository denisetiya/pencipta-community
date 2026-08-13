import { NextRequest } from "next/server";
import { searchSchema } from "@/server/schemas/search.schema";
import { searchProfiles } from "@/server/services/search.service";
import { jsonOk, toHttpError } from "@/server/http/response";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const { query } = searchSchema.parse(body ?? {});
    const matches = await searchProfiles(query);
    return jsonOk({ query, matches });
  } catch (err) {
    return toHttpError(err);
  }
}
