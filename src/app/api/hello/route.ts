import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Hello from Sage Community API",
    service: "community-assistant",
  });
}
