// lib/lmstudio/embedding.ts
import { getLMStudioClient } from "./client";

const DEFAULT_EMBED_MODEL =
  process.env.LMSTUDIO_EMBED_MODEL ?? "nomic-embed-text-v1.5";

/**
 * Single text → one embedding vector.
 */
export async function embedTextWithLmStudio(
  text: string,
  modelKey = DEFAULT_EMBED_MODEL
): Promise<number[]> {
  const client = getLMStudioClient();

  const model = await client.embedding.model(modelKey);
  const { embedding } = await model.embed(text);

  return embedding;
}

/**
 * Multiple texts → multiple vectors.
 */
export async function embedManyWithLmStudio(
  texts: string[],
  modelKey = DEFAULT_EMBED_MODEL
): Promise<number[][]> {
  const client = getLMStudioClient();

  const model = await client.embedding.model(modelKey);
  const embeddings: number[][] = [];

  for (const text of texts) {
    const { embedding } = await model.embed(text);
    embeddings.push(embedding);
  }

  return embeddings;
}
