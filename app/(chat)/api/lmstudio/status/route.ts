// app/api/lmstudio/status/route.ts
import { NextResponse } from "next/server";
import { LMStudioClient } from "@lmstudio/sdk";

export async function GET() {
  const client = new LMStudioClient();

  const downloaded = await client.system.listDownloadedModels();
  const loadedLlms = await client.llm.listLoaded();
  const loadedEmbeddings = await client.embedding.listLoaded();

  return NextResponse.json({
    downloaded,
    loadedLlms,
    loadedEmbeddings,
  });
}
