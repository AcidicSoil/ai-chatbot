# Directory: lib/ai

## Hierarchical Policy

- This directory inherits global rules from `.ruler/AGENTS.md` and specializes them for AI model orchestration and tools.
- Owns:
  - Model registry and provider wiring (`providers.ts`).
  - Prompt definitions (`prompts.ts`).
  - AI tools under `tools/**` (e.g., document operations, weather, suggestions).
  - Model metadata and tests (`models.ts`, `models.test.ts`, `models.mock.ts`).
- Provides:
  - A small, stable API (`myProvider`, model IDs, tools) consumed by `app/**` and `artifacts/**`.

## Domain Vocabulary

- `myProvider`: The primary AI provider instance connecting to:
  - X.ai models (e.g., `"xai/grok-2-vision-1212"`, `"xai/grok-3-mini"`).
  - LM Studio models (e.g., `"llama-3.2-1b"`) via local server.
  - Gemini via CLI provider.
- Model IDs:
  - `"chat-model"`, `"chat-model-reasoning"`, `"title-model"`, `"artifact-model"`, `"lmstudio-chat"`, `"gemini-2.5-pro"`.
- Prompts:
  - `codePrompt`, `updateDocumentPrompt`, `titlePrompt`, and any chat/artifact prompts.
- Tools:
  - `create-document`, `update-document`, `request-suggestions`, `get-weather`, etc. as AI “tools” invoked by the models.

## Allowed Patterns

### Provider setup (`providers.ts`)

1. Provider wiring:
   - Define all language models on `myProvider` with stable string IDs.
   - Use wrappers (e.g., `wrapLanguageModel` + `extractReasoningMiddleware`) for reasoning models.
   - Configure environment-sensitive behavior (e.g., `isTestEnvironment` → mock models) inside this file only.
2. Exposure:
   - Export `myProvider` and any structured `models` map.
   - Other modules must not import underlying gateway clients directly.

### Prompt and tool design

1. Prompts:
   - Keep prompts in `prompts.ts` as constants; do not embed long prompt strings in route handlers.
   - Version prompts via explicit constant names (e.g., `*_V2`) when making breaking changes.
2. Tools:
   - Implement tool functions as pure async functions with clearly typed parameters and return values.
   - Validate inputs with Zod where appropriate before calling external APIs.
   - Use these tools from route handlers, server actions, or artifact handlers — not from client components.

### AI usage patterns

1. Streaming:
   - For long-running generations (e.g., artifacts), use streaming APIs (`streamObject` / `streamText`) and forward partial results via data streams.
2. Separation of concerns:
   - Do not mix HTTP concerns (headers, cookies, NextResponse) into AI modules.
   - Do not perform DB writes here; accept already-fetched data or return data for callers to persist via `lib/db/queries`.

## Prohibited Patterns

1. No direct use of provider gateway outside `providers.ts`:
   - All model definitions and provider wiring must remain in `providers.ts`.
2. No UI:
   - Do not import `components`, `hooks`, or any React UI code.
3. No cross-layer coupling:
   - `lib/ai` must not import from `app/**` or `artifacts/**`.
   - Use domain-level data types from `lib/types` or `lib/db/schema` instead.

## Boundaries

- Incoming dependencies:
  - `app/(chat)/actions.ts`, route handlers, and `artifacts/**` are allowed to call into this directory.
- Outgoing dependencies:
  - Allowed: `ai` SDK, provider-specific clients, `zod`, `@/lib/types`, `@/lib/db/schema` (for type references only).
  - Forbidden: `@/lib/db/queries` for writes (keep AI layer free of persistence), `next/*`, `react`, `next-auth`.
- Extension:
  - New models or tools must be registered here and exposed through stable exports, rather than ad-hoc provider calls elsewhere.
