// import "server-only";

import { gateway } from "@ai-sdk/gateway";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
//import { createGeminiProvider } from "ai-sdk-provider-gemini-cli";
import { isTestEnvironment } from "../constants";
import { extractLmStudioIdentifier, isLmStudioModelId } from "./lmstudio-ids";

const lmstudio = createOpenAICompatible({
  name: "lmstudio",
  baseURL: process.env.LMSTUDIO_BASE_URL ?? "http://localhost:1234/v1",
});

const LMSTUDIO_CHAT_MODEL_ID =
  process.env.LMSTUDIO_CHAT_MODEL_ID ??
  process.env.LMSTUDIO_MODEL_ID ??
  "qwen_qwen3-vl-4b-instruct";
/*
function resolveGeminiProvider() {
  const authType = process.env.GEMINI_AUTH_TYPE?.toLowerCase();

  if (authType === "api-key" || authType === "gemini-api-key") {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error(
        "GEMINI_AUTH_TYPE is set to an API key mode but GEMINI_API_KEY is missing."
      );
    }

    return createGeminiProvider({
      authType: authType === "api-key" ? "api-key" : "gemini-api-key",
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  if (authType === "oauth" || authType === "oauth-personal" || !authType) {
    return createGeminiProvider({ authType: "oauth-personal" });
  }

  console.warn(
    `[Gemini] Unsupported GEMINI_AUTH_TYPE "${authType}". Falling back to oauth-personal.`
  );
  return createGeminiProvider({ authType: "oauth-personal" });
}

const gemini = resolveGeminiProvider();
*/
export const myProvider = isTestEnvironment
  ? (() => {
      const {
        artifactModel,
        chatModel,
        reasoningModel,
        titleModel,
      } = require("./models.mock");
      return customProvider({
        languageModels: {
          "chat-model": chatModel,
          "chat-model-reasoning": reasoningModel,
          "title-model": titleModel,
          "artifact-model": artifactModel,
        },
      });
    })()
  : customProvider({
      languageModels: {
        "chat-model": lmstudio(LMSTUDIO_CHAT_MODEL_ID),
        "chat-model-reasoning": wrapLanguageModel({
          model: lmstudio(LMSTUDIO_CHAT_MODEL_ID),
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),
        "title-model": lmstudio(LMSTUDIO_CHAT_MODEL_ID),
        "artifact-model": lmstudio(LMSTUDIO_CHAT_MODEL_ID),
        // NEW: LM Studio chat model
        //
        // Make sure you have this model downloaded in LM Studio and that
        // the ID matches what LM Studio exposes (e.g. "llama-3.2-1b").
        "lmstudio-chat": lmstudio(LMSTUDIO_CHAT_MODEL_ID),

        // NEW: Gemini chat model via ai-sdk-provider-gemini-cli
        //
        // This ID must match what you configure in the UI (see models.ts).
        //  "gemini-2.5-pro": gemini("gemini-2.5-pro"),
      },
    });

export function getLanguageModel(modelId: string) {
  if (isLmStudioModelId(modelId)) {
    const identifier = extractLmStudioIdentifier(modelId);
    return lmstudio(identifier);
  }

  return myProvider.languageModel(modelId);
}
