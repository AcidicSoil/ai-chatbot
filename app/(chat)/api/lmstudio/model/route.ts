import { auth } from "@/app/(auth)/auth";
import { ChatSDKError } from "@/lib/errors";
import { getCurrentLlm, getOrLoadLlm } from "@/lib/lmstudio/models";

export async function GET(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return new ChatSDKError("unauthorized:lmstudio").toResponse();
  }

  const { searchParams } = new URL(request.url);
  const modelKey = searchParams.get("modelKey");

  try {
    const model = modelKey
      ? await getOrLoadLlm(modelKey)
      : await getCurrentLlm();

    return Response.json(
      {
        identifier: (model as any).identifier,
        modelKey: (model as any).modelKey,
      },
      { status: 200 }
    );
  } catch (_err) {
    return new ChatSDKError(
      "not_found:lmstudio",
      "No LM Studio model is currently loaded."
    ).toResponse();
  }
}
