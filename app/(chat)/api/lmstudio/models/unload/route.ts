import { NextResponse } from "next/server";
import { unloadLmStudioModel } from "@/lib/ai/lmstudio-client";

export async function POST(request: Request) {
  let identifier: string | undefined;

  try {
    const payload = await request.json();
    identifier = typeof payload?.identifier === "string" ? payload.identifier : undefined;
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  if (!identifier) {
    return NextResponse.json({ error: "identifier is required" }, { status: 400 });
  }

  try {
    await unloadLmStudioModel(identifier);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("LM Studio unload error", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to unload LM Studio model",
      },
      { status: 500 }
    );
  }
}
