# AGENTS.md for `lib/ai`

## Hierarchical Policy

- MUST inherit global rules from `.ruler/AGENTS.md`.
- OWNS AI model configuration, prompt engineering, and tool definitions.

## Domain Vocabulary

- **Provider**: The service backing the AI model (e.g., OpenAI, Anthropic, Custom).
- **Tool**: A function callable by the LLM (e.g., `getWeather`, `createDocument`).
- **Prompt**: String templates or system instructions for models.

## AI Configuration

- MUST define models in `models.ts` or `providers.ts`.
- Tools MUST be defined with Zod schemas for input validation.
- Prompts SHOULD be stored in `prompts.ts` to separate copy from logic.

## Boundaries

- MUST NOT perform database writes directly inside tool execution if avoidable; prefer returning data for the caller to persist.
- MUST NOT expose API keys in client-accessible code.
