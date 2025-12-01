// app/api/lmstudio/unload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { unloadLlmByKey } from "@/lib/lmstudio/models";

export async function POST(req: NextRequest) {
  const { modelKey } = await req.json();

  await unloadLlmByKey(modelKey);

  return NextResponse.json({ ok: true, modelKey });
}
