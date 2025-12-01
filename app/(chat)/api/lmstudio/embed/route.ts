import { auth } from "@/app/(auth)/auth";
import { ChatSDKError } from "@/lib/errors";
import {
  embedTextWithLmStudio,
  embedManyWithLmStudio,
} from "@/lib/lmstudio/embedding";

type EmbedBody = {
  text?: string;
  texts?: string[];
  modelKey?: string;
};

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return new ChatSDKError("unauthorized:lmstudio").toResponse();
  }

  let body: EmbedBody;
  try {
    body = (await request.json()) as EmbedBody;
  } catch {
    return new ChatSDKError(
      "bad_request:api",
      "Invalid JSON body."
    ).toResponse();
  }

  const { text, texts, modelKey } = body;

  if (!text && (!texts || texts.length === 0)) {
    return new ChatSDKError(
      "bad_request:api",
      "Provide either `text` or a non-empty `texts` array."
    ).toResponse();
  }

  if (text && texts && texts.length > 0) {
    return new ChatSDKError(
      "bad_request:api",
      "Use either `text` or `texts`, not both."
    ).toResponse();
  }

  if (text) {
    const embedding = await embedTextWithLmStudio(text, modelKey);
    return Response.json(
      {
        type: "single",
        modelKey:
          modelKey ??
          process.env.LMSTUDIO_EMBED_MODEL ??
          "nomic-embed-text-v1.5",
        embedding,
        dims: embedding.length,
      },
      { status: 200 }
    );
  }

  // batch case
  const embeddings = await embedManyWithLmStudio(texts as string[], modelKey);
  const dims = embeddings[0]?.length ?? 0;

  return Response.json(
    {
      type: "batch",
      modelKey:
        modelKey ?? process.env.LMSTUDIO_EMBED_MODEL ?? "nomic-embed-text-v1.5",
      embeddings,
      dims,
      count: embeddings.length,
    },
    { status: 200 }
  );
}
