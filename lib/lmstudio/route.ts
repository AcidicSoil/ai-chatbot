// app/api/lmstudio/load/route.ts
import { NextRequest, NextResponse } from "next/server";
import { loadLlmWithTtl } from "@/lib/lmstudio/models";

export async function POST(req: NextRequest) {
  const { modelKey, ttlSeconds } = await req.json();

  const model = await loadLlmWithTtl(
    modelKey ?? "qwen/qwen3-4b-2507",
    ttlSeconds ?? 300
  );

  return NextResponse.json({
    modelKey,
    identifier: model.identifier,
  });
}
