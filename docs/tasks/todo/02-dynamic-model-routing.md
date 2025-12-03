Context
- New LM Studio and Gemini providers exist in `lib/ai/providers.ts`, but entitlements, model selection UI, and chat routing still assume the old static Grok-only list, so the new models never surface.
- LM Studio must expose dynamic model IDs sourced from the running LM Studio daemon, yet the current selector & chat API never fetch `/api/lmstudio/models` or route prefixed IDs.
- Gemini CLI auth defaults and documentation are outdated, lacking explicit OAuth/API-key guidance and user-facing health/error handling.

Success criteria
- Entitlements allow selecting the new LM Studio + Gemini IDs, and the model selector merges the static list with fetched LM Studio models, showing clear health copy when LM Studio is offline.
- Chat API resolves both static IDs and dynamic `lmstudio-*` IDs via a unified helper, ensuring LM Studio models stream end-to-end.
- Docs/.env example describe LM Studio model prefixes, Gemini auth types, and manual verification steps; linters/tests pass.

Deliverables
- Code updates in `lib/ai/entitlements.ts`, `lib/ai/providers.ts`, `app/(chat)/api/chat/route.ts`, `components/model-selector.tsx`, `lib/ai/models.ts`, plus any new hooks/client helpers needed for LM Studio fetch.
- Documentation updates (`README.md`, `.env.example`, `GEMINI.md`, LM Studio doc block) covering dynamic selection and Gemini auth.
- Tests (unit + e2e/Playwright or React component test) validating the selector renders LM Studio entries and that `getLanguageModel` routes prefixes correctly.

Approach
1) **Align entitlements & static model list**: Update `entitlementsByUserType` and `lib/ai/models.ts` so LM Studio and Gemini IDs are officially supported defaults; add guardrails for future roles.
2) **Centralize provider resolution**: Refactor `lib/ai/providers.ts` to expose `getLanguageModel(modelId)` that understands `lmstudio-*` prefixes, enforces Gemini auth options, and keeps `myProvider` for legacy callers.
3) **Update chat route**: Switch `app/(chat)/api/chat/route.ts` to call `getLanguageModel`, ensuring telemetry/usage summaries still work with dynamic IDs; add targeted tests.
4) **Enhance LM Studio API & selector**: Expand `/api/lmstudio/models` to return availability/errors (already scaffolded), then build a client fetch layer inside `components/model-selector.tsx` (or new hook) that merges fetched models, adds status messaging, and gracefully disables options when offline.
5) **Docs & env**: Describe LM Studio prefixes, required env vars (`LMSTUDIO_BASE_URL`, `LMSTUDIO_CHAT_MODEL_ID`), Gemini OAuth/API-key instructions, and manual verification steps; update `.env.example` and GEMINI guide accordingly.
6) **Testing & lint**: Add unit tests for provider resolution and React/unit/e2e coverage for the selector; run `pnpm lint`, `pnpm test`, and relevant Playwright suites.

Risks / unknowns
- LM Studio service availability in hosted environments may require feature flags; need clarity on deployment targets.
- Fetching LM Studio models client-side could expose identifiers unexpectedly; confirm no privacy concerns.
- Playwright tests currently expect error states for LM Studio/Gemini; need to coordinate with existing expectations.

Testing & validation
- `pnpm lint`, `pnpm test`, and targeted Playwright tests for model selector.
- Manual LM Studio check: start LM Studio, ensure `/api/lmstudio/models` returns loaded models, select them in UI, send a chat.
- Manual Gemini CLI run-through: verify OAuth login or API-key fallback, send chat via selector.

Rollback / escape hatch
- Keep Grok gateway models as defaults; a quick revert of entitlements/provider resolver returns system to previous behavior; disabling env vars removes new options.

Owner/Date
- Codex / 2025-12-02
