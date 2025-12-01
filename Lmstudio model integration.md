## You asked:

`https://github.com/AcidicSoil/ai-chatbot` I want the lmstudio models downloaded on my machine to show up in the drop down, so how can we wrap the lmstudio sdk around the code for the lmstudio code in the lib/providers and models ? Use the gitmcp tool review the repos to add loading/unloading lm-studio models `https://lmstudio.ai/docs/typescript/manage-models/loading` `https://github.com/lmstudio-ai/docs/blob/main/2_typescript/6_manage-models/loading.md`

---

## You asked:

\## Error Type Runtime ReferenceError ## Error Message createGeminiProvider is not defined at module evaluation (lib/ai/providers.ts:22:16) at module evaluation (app/(chat)/actions.ts:7:1) at module evaluation (about://React/Server/file:///home/user/projects/temp/next-js\_examples/ai-chatbot/.next/dev/server/chunks/ssr/%5Broot-of-the-server%5D\_\_ebf1b094.\_.js?33:335:152) at module evaluation (about://React/Server/file:///home/user/projects/temp/next-js\_examples/ai-chatbot/.next/dev/server/chunks/ssr/%5Broot-of-the-server%5D\_\_ebf1b094.\_.js?34:355:485) ## Code Frame 20 | 21 | // Default to OAuth via local gemini CLI for dev, with optional API key mode > 22 | const gemini = createGeminiProvider({ | ^ 23 | authType: 24 | process.env.GEMINI\_AUTH\_TYPE === "api-key" || 25 | process.env.GEMINI\_AUTH\_TYPE === "gemini-api-key" Next.js version: 16.0.5 (Turbopack)

---

## ChatGPT Replied:

Thought for 14s

Called tool

Thought for 5s

Called tool

Called tool

Called tool

Called tool

Called tool

Called tool

Thought for 47s

Called tool

Thought for 4 seconds

Called tool

Thought for 21s

Called tool

Thought for 12s

Called tool

Thought for a few seconds

Called tool

Thought for 22s

Called tool

Called tool

Thought for 11s

The runtime error is because `createGeminiProvider` is referenced in `lib/ai/providers.ts` but never imported.

Your current `providers.ts` (from GitHub) starts like this:

    import { gateway } from "@ai-sdk/gateway";
    import {
      customProvider,
      extractReasoningMiddleware,
      wrapLanguageModel,
    } from "ai";
    import { isTestEnvironment } from "../constants";
    
    import { geminiCli } from "@ai-sdk/community-providers-gemini-cli";
    import { huggingface } from "@ai-sdk/providers-huggingface";
    import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
    import { LMStudioClient } from "@lmstudio/sdk";
    
    const lmstudio = createOpenAICompatible({
      name: "lmstudio",
      baseURL: process.env.LMSTUDIO_BASE_URL ?? "http://localhost:1234/v1",
    });
    
    // Default to OAuth via local gemini CLI for dev, with optional API key mode
    const gemini = createGeminiProvider({
      ...
    });
    

`createGeminiProvider` is never imported, so at module evaluation time it is `undefined`, giving your `ReferenceError`.

Fix it by:

1.  Removing the unused and wrong imports:
    
    *   `geminiCli` from `@ai-sdk/community-providers-gemini-cli`
        
    *   `huggingface` from `@ai-sdk/providers-huggingface` (you are not using it here)
        
2.  Importing `createGeminiProvider` from the actual package you have installed: `"ai-sdk-provider-gemini-cli"` (matching your `package.json`).
    

Updated `lib/ai/providers.ts` header:

    import { gateway } from "@ai-sdk/gateway";
    import {
      customProvider,
      extractReasoningMiddleware,
      wrapLanguageModel,
    } from "ai";
    import { isTestEnvironment } from "../constants";
    
    import { createGeminiProvider } from "ai-sdk-provider-gemini-cli";
    import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
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
    

The rest of your file can stay as you have it now:

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
    

That removes the `ReferenceError` by ensuring `createGeminiProvider` is defined and bound before being used.

---

