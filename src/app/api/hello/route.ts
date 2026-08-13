import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Hello from pencipta community API",
    service: "community-assistant",
  });
}
