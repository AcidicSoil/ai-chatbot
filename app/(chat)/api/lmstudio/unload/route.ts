// app/api/lmstudio/unload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { LMStudioClient } from "@lmstudio/sdk";

export async function POST(req: NextRequest) {
  const { modelKey } = await req.json();
  const client = new LMStudioClient();

  // If a specific key is provided, get that model; otherwise unload the current one
  const model = modelKey
    ? await client.llm.model(modelKey)
    : await client.llm.model();

  await model.unload();

  return NextResponse.json({ ok: true, modelKey: modelKey ?? null });
}
