<!-- path: lib/ai/.ruler/AGENTS.md -->
> Inherits global rules from `.ruler/AGENTS.md` for AI providers, models, prompts, and tools.

# Directory: lib/ai

## Hierarchical Policy

- Specialize global rules for AI provider configuration, model definitions, prompts, and AI tools.
- Own the configuration of `myProvider` and the full set of model IDs used across the application.
- Own the stable tool API used by chat flows and artifact handlers (e.g., `createDocument`, `updateDocument`, `requestSuggestions`, `getWeather`).
- Remain free of UI and HTTP concerns; this directory must not depend on `app/**`, `components/**`, `hooks/**`, or route-specific code.

## Domain Vocabulary

- `myProvider`: Configured AI provider instance that returns language models for chat, reasoning, titles, and artifacts.
- `Model IDs`: String identifiers such as `"chat-model"`, `"chat-model-reasoning"`, `"title-model"`, `"artifact-model"`, `"lmstudio-chat"`, `"gemini-2.5-pro"`.
- `Prompt`: String templates in `prompts.ts` such as `systemPrompt`, `titlePrompt`, `updateDocumentPrompt`, and `codePrompt`.
- `Tool`: AI SDK tool definitions in `lib/ai/tools/**` (`createDocument`, `updateDocument`, `requestSuggestions`, `getWeather`).
- `ChatTools`: Type-level map of tools allowed in the chat UI, defined in `lib/types`.
- `LmStudioSnapshot`: Structured status information about local LM Studio models (downloaded, loaded, version, availability).
- `AppUsage`: Combined usage information (model tokens plus TokenLens) attached to chats or streams.

## Boundaries

- This directory may depend on AI SDK packages (`ai`), TokenLens, LM Studio clients, Zod, and shared types from `@/lib/types` and `@/lib/db/schema` (types only).
- It must not perform direct DB reads or writes; persistence is handled by callers via `lib/db/queries` or `lib/artifacts/server`.
- It must not import from `app/**`, `artifacts/**`, `components/**`, or `hooks/**`; dependencies flow from features into this layer, not the reverse.
- Provider and model definitions in `providers.ts` are the only place that knows about external AI endpoints or API keys; other modules call models by string id.
- Tools in `lib/ai/tools/**` must be pure async functions that:
  - Validate inputs with Zod.
  - Call models via `myProvider` or other configured providers.
  - Return structured data or write to provided streams; they must not embed unrelated side effects such as logging or metrics.
- Streaming APIs (`streamText`, `streamObject`, `createUIMessageStream`) are used only from server-executed code and exported in ways that keep client bundles free of streaming logic.
- Reasoning models and TokenLens usage should be wrapped in helper utilities; callers must not implement bespoke token accounting or reasoning wrappers.