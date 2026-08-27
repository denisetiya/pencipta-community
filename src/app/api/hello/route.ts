import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Hello from pencipta-comunity API",
    service: "pencipta-comunity",
  });
}
