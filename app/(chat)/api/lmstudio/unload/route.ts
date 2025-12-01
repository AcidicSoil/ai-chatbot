import { auth } from "@/app/(auth)/auth";
import { ChatSDKError } from "@/lib/errors";
import { unloadLlmByKey } from "@/lib/lmstudio/models";

type UnloadBody = {
  modelKey?: string;
};

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return new ChatSDKError("unauthorized:lmstudio").toResponse();
  }

  let body: UnloadBody;
  try {
    body = (await request.json()) as UnloadBody;
  } catch {
    return new ChatSDKError(
      "bad_request:api",
      "Invalid JSON body."
    ).toResponse();
  }

  const { modelKey } = body;

  if (!modelKey) {
    return new ChatSDKError(
      "bad_request:api",
      "Parameter modelKey is required."
    ).toResponse();
  }

  await unloadLlmByKey(modelKey);

  return Response.json({ ok: true, modelKey }, { status: 200 });
}
