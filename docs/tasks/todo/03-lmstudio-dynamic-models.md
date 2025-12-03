Context
- Model selection still relies on the static `chatModels` list; the UI never fetches `/api/lmstudio/models`, so locally loaded LM Studio models cannot be picked or managed from the dropdown.
- The chat API and provider wiring always call `myProvider.languageModel(id)` and cannot resolve dynamic LM Studio IDs, nor do we expose endpoints to load/unload models via the LM Studio SDK.
- Entitlements/docs/env files remain Grok-only, so even after wiring, users won’t see LM Studio options unless we add the IDs and instructions explicitly.

Success criteria
- Model selector (both dropdown and compact input control) merges the static list with LM Studio snapshot data, showing load/unload actions and clearly handling offline states.
- Chat API uses a `getLanguageModel` helper that routes any `lmstudio:*` ID to the OpenAI-compatible LM Studio client, enabling end-to-end streaming for locally loaded models.
- REST endpoints exist for LM Studio load/unload commands, and entitlements/env/docs describe how to enable LM Studio with the new IDs.

Deliverables
- New `hooks/use-chat-models.ts` (or equivalent) plus updated selector components, `lib/ai/providers.ts`, `app/(chat)/api/chat/route.ts`, and LM Studio API routes for load/unload.
- Documentation and `.env.example` updates covering LM Studio env vars and the new model ID prefix usage.
- Tests (unit + integration/e2e) validating the selector renders LM Studio entries and that dynamic IDs resolve through the chat API.

Approach
1) **Entitlements & metadata**: Update `lib/ai/entitlements.ts`, `lib/ai/models.ts`, and `.env.example` to include the LM Studio default ID and describe `LMSTUDIO_CHAT_MODEL_ID`; add docs noting the `lmstudio:` prefix convention.
2) **Provider resolver**: Refactor `lib/ai/providers.ts` to export `getLanguageModel(modelId)` that inspects prefixes and instantiates LM Studio models via `createOpenAICompatible`; update `app/(chat)/api/chat/route.ts` (and other callers) to use it.
3) **LM Studio SDK wrappers**: Extend `lib/ai/lmstudio-client.ts` with load/unload helpers and create `/api/lmstudio/models/load|unload` endpoints returning descriptive errors and updated snapshots.
4) **Client hook & selector UX**: Implement `useChatModels` hook (combining entitlements, static models, LM Studio snapshot) and update both `components/model-selector.tsx` and the compact selector in `components/multimodal-input.tsx` to consume it, surface availability states, and trigger load/unload actions via the new API routes.
5) **Testing & docs**: Add unit tests for `getLanguageModel`/hook logic and update Playwright tests to assert LM Studio entries appear when the API responds; document manual verification steps in README/GEMINI.md (or dedicated LM Studio section).

Risks / unknowns
- LM Studio daemon availability varies per environment; need a degraded UX when offline without breaking the selector.
- Load/unload latency could make dropdown actions feel sluggish; may require optimistic states or toasts.
- Existing Playwright tests expect only Grok models; need to coordinate updates so CI remains deterministic.

Testing & validation
- `pnpm lint`, `pnpm test`, and targeted Playwright suites (model selector flow) for regressions.
- Manual LM Studio smoke test: start LM Studio, verify load/unload endpoints, select a dynamically loaded model, send a chat.

Rollback / escape hatch
- Leave Grok gateway models as defaults and guard LM Studio features with env-based availability; removing the new env vars or reverting the hook restores the prior behavior.

Owner/Date
- Codex / 2025-12-02
