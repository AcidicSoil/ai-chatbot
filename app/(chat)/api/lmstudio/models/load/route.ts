import { NextResponse } from "next/server";
import { loadLmStudioModel } from "@/lib/ai/lmstudio-client";

export async function POST(request: Request) {
  let modelKey: string | undefined;

  try {
    const payload = await request.json();
    modelKey =
      typeof payload?.modelKey === "string" ? payload.modelKey : undefined;
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 }
    );
  }

  if (!modelKey) {
    return NextResponse.json(
      { error: "modelKey is required" },
      { status: 400 }
    );
  }

  try {
    const model = await loadLmStudioModel({ modelKey });
    return NextResponse.json({ model });
  } catch (error) {
    console.error("LM Studio load error", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load LM Studio model",
      },
      { status: 500 }
    );
  }
}
