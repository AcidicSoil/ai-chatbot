// app/(chat)/api/lmstudio/models/route.ts
import { NextResponse } from "next/server";
import { LMStudioClient } from "@lmstudio/sdk";
import type { ChatModel } from "@/lib/ai/models";

export const runtime = "nodejs"; // LMStudio SDK is Node-only

export async function GET() {
  try {
    const client = new LMStudioClient();
    const downloaded = await client.system.listDownloadedModels();

    const models: ChatModel[] = downloaded
      .filter((m: any) => m.type === "llm")
      .map(
        (m: any): ChatModel => ({
          // ID format: lmstudio:<modelKey>
          id: `lmstudio:${m.modelKey}`,
          name: `LM Studio – ${m.displayName ?? m.modelKey}`,
          description: `Local LM Studio model (${m.modelKey})`,
        })
      );

    return NextResponse.json(models, { status: 200 });
  } catch (error) {
    console.warn("LM Studio listDownloadedModels failed", error);
    // Fallback: no LM Studio models, UI will just show the static ones
    return NextResponse.json([], { status: 200 });
  }
}
