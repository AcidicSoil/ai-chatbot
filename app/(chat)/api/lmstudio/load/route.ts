import { auth } from "@/app/(auth)/auth";
import { ChatSDKError } from "@/lib/errors";
import { loadLlmWithTtl } from "@/lib/lmstudio/models";

type LoadBody = {
  modelKey?: string;
  ttlSeconds?: number;
};

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return new ChatSDKError("unauthorized:lmstudio").toResponse();
  }

  let body: LoadBody;
  try {
    body = (await request.json()) as LoadBody;
  } catch {
    return new ChatSDKError(
      "bad_request:api",
      "Invalid JSON body."
    ).toResponse();
  }

  const { modelKey, ttlSeconds } = body;

  if (!modelKey) {
    return new ChatSDKError(
      "bad_request:api",
      "Parameter modelKey is required."
    ).toResponse();
  }

  const ttl =
    typeof ttlSeconds === "number" && ttlSeconds > 0 ? ttlSeconds : 300;

  const model = await loadLlmWithTtl(modelKey, ttl);

  return Response.json(
    {
      modelKey,
      identifier: (model as any).identifier,
      ttlSeconds: ttl,
    },
    { status: 200 }
  );
}
