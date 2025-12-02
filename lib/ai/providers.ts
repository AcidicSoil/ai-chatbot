import { gateway } from "@ai-sdk/gateway";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { isTestEnvironment } from "../constants";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { geminiCli } from "@ai-sdk/community-providers-gemini-cli";
import { huggingface } from "@ai-sdk/providers-huggingface";
import { LMStudioClient } from "@lmstudio/sdk";

const lmstudio = createOpenAICompatible({
  name: "lmstudio",
  baseURL: process.env.LMSTUDIO_BASE_URL ?? "http://localhost:1234/v1",
});

// Default to OAuth via local gemini CLI for dev, with optional API key mode
const gemini = createGeminiProvider({
  authType:
    process.env.GEMINI_AUTH_TYPE === "api-key" ||
    process.env.GEMINI_AUTH_TYPE === "gemini-api-key"
      ? (process.env.GEMINI_AUTH_TYPE as "api-key" | "gemini-api-key")
      : "oauth-personal",
  apiKey:
    process.env.GEMINI_AUTH_TYPE === "api-key" ||
    process.env.GEMINI_AUTH_TYPE === "gemini-api-key"
      ? process.env.GEMINI_API_KEY
      : undefined,
});


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
        "chat-model": gateway.languageModel("xai/grok-2-vision-1212"),
        "chat-model-reasoning": wrapLanguageModel({
          model: gateway.languageModel("xai/grok-3-mini"),
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),
        "title-model": gateway.languageModel("xai/grok-2-1212"),
        "artifact-model": gateway.languageModel("xai/grok-2-1212"),
        // LM Studio via OpenAI-compatible API
        "lmstudio-chat": lmstudio("llama-3.2-1b"),

        // Gemini via CLI provider
        "gemini-2.5-pro": gemini("gemini-2.5-pro"),
      },
    });
