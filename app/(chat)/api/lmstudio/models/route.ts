// app/api/lmstudio/models/route.ts
import { NextResponse } from "next/server";
import { LMStudioClient } from "@lmstudio/sdk";

export async function GET() {
  const client = new LMStudioClient();

  const downloaded = await client.system.listDownloadedModels();

  const models = downloaded
    .filter((m) => m.type === "llm")
    .map((m) => ({
      // ChatModel-compatible shape
      id: `lmstudio:${m.modelKey}`,
      name: `LM Studio – ${m.displayName ?? m.modelKey}`,
      description: `Local LM Studio model (${m.modelKey})`,
    }));

  return NextResponse.json({ models });
}
