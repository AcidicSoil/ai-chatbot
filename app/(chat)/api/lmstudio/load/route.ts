// app/api/lmstudio/load/route.ts
import { NextRequest, NextResponse } from "next/server";
import { LMStudioClient } from "@lmstudio/sdk";

export async function POST(req: NextRequest) {
  const { modelKey, ttl } = await req.json();

  if (!modelKey) {
    return new NextResponse("modelKey required", { status: 400 });
  }

  const client = new LMStudioClient();

  // Load and keep it warm; ttl is idle time in seconds before auto-unload
  await client.llm.load(modelKey, ttl ? { ttl } : undefined);

  return NextResponse.json({ ok: true, modelKey, ttl: ttl ?? null });
}
