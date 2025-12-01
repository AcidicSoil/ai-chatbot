// lib/lmstudio/models.ts
import type { LLMLoadModelConfig } from "@lmstudio/sdk";
import { getLMStudioClient } from "./client";

/**
 * Get whichever LLM model is already loaded in LM Studio.
 * Equivalent to: client.llm.model()
 */
export async function getCurrentLlm() {
  const client = getLMStudioClient();
  return client.llm.model();
}

/**
 * Get or load a specific model by key.
 * Equivalent to: client.llm.model("model-key", config?)
 */
export async function getOrLoadLlm(
  modelKey: string,
  config?: LLMLoadModelConfig
) {
  const client = getLMStudioClient();
  return client.llm.model(modelKey, config);
}

/**
 * Force-load a new instance of a model, even if another instance exists.
 * Equivalent to: client.llm.load("model-key", config?)
 */
export async function loadLlmInstance(
  modelKey: string,
  config?: LLMLoadModelConfig
) {
  const client = getLMStudioClient();
  return client.llm.load(modelKey, config);
}

/**
 * Load a model instance with a TTL (idle auto-unload).
 * Equivalent to: client.llm.load("model-key", { ttl })
 */
export async function loadLlmWithTtl(
  modelKey: string,
  ttlSeconds: number,
  extra?: Omit<LLMLoadModelConfig, "ttl">
) {
  const client = getLMStudioClient();
  return client.llm.load(modelKey, { ...extra, ttl: ttlSeconds });
}

/**
 * Unload a model from memory using its key.
 * Equivalent to:
 *   const model = await client.llm.model("model-key");
 *   await model.unload();
 */
export async function unloadLlmByKey(modelKey: string) {
  const client = getLMStudioClient();
  const model = await client.llm.model(modelKey);
  await model.unload();
}
