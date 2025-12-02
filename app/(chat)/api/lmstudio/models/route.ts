// path: app/api/lmstudio/models/route.ts
import { NextResponse } from "next/server";
import { getLmStudioSnapshot } from "@/lib/ai/lmstudio-client";

export async function GET() {
  const snapshot = await getLmStudioSnapshot();

  return NextResponse.json(snapshot, {
    status: snapshot.isAvailable ? 200 : 503,
  });
}
