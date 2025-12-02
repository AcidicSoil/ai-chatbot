Context
- Need to add first-class ai-sdk provider support for both LM Studio (local @lmstudio/sdk runtime) and the Gemini CLI bridge so users can run local or Gemini models without editing core chat logic.
- Current stack mixes Vercel AI Gateway defaults with partial LM Studio + Gemini references (e.g., placeholder `createGeminiProvider`, LM Studio docs stubs), so the integration contract, env vars, and UI controls remain incomplete.
- Requirements confirm all LM Studio models must be discoverable/usable in every environment, Gemini CLI should default to OAuth (with API key fallback), and UI must surface provider health/status in addition to toggles—all while keeping the Next.js App Router + AI SDK architecture maintainable.
- Latest direction: keep implementation focused on wiring the core LM Studio + Gemini functionality first; defer entitlement gating or other provider linkages until we explicitly confirm they should apply.

Success criteria
- `myProvider` exposes working language model IDs for LM Studio and Gemini CLI, selectable through existing chat model selector without code edits, and LM Studio dynamic model listing covers every available model ID.
- Environment + tooling docs (README, `.env.example`, GEMINI/LM Studio guides) explain how to enable LM Studio and Gemini CLI across dev/prod, with OAuth default and API key fallback explicitly shown.
- API routes + UI components can list LM Studio models and gracefully surface configuration errors (LM Studio offline, Gemini CLI missing) via visible health/status UI states without crashing chat flows.
- Automated checks (at least lint/tests) plus manual smoke steps cover LM Studio + Gemini chat flows across environments.

Deliverables
- Updated provider wiring (`lib/ai/providers.ts`, `lib/ai/models.ts`, potentially new helper in `lib/ai/providers/gemini.ts` and LM Studio client utilities) including env-driven configuration and environment guards for prod usage.
- REST endpoints / server actions for LM Studio model discovery plus Gemini-specific status checks, with associated hooks/UI updates (model selector, settings panels) and health indicators.
- Documentation + sample commands (`README.md`, `GEMINI.md`, new LM Studio doc if needed) and refreshed `.env.example` entries for LM Studio + Gemini secrets/ports covering OAuth + API key flows.
- Tests or fixtures validating provider selection (unit coverage for provider factory, integration/e2e updates if feasible) including status display logic.

Approach
1) **Audit existing provider + UI plumbing**: Review `lib/ai/providers.ts`, `lib/ai/models.ts`, `components/ai-elements/model-selector.tsx`, and APIs under `app/(chat)/api/*` to catalog current provider IDs, env vars, UI flows, and determine where health/status indicators must be injected.
2) **Design LM Studio provider layer**: Decide how to encapsulate `createOpenAICompatible` + `@lmstudio/sdk` (e.g., helper factory that reads `LMSTUDIO_BASE_URL`, handles timeouts, dynamic model metadata) and confirm strategy for production usage where LM Studio service must run alongside deployment.
3) **Expose LM Studio control endpoints**: Expand `app/(chat)/api/lmstudio` routes to list downloaded/loaded models via `lib/ai/lmstudio-client.ts`, add caching/validation, ensure responses include health info for frontend selectors, and guard routes behind auth as needed.
4) **Wire LM Studio into chat model selection**: Update `lib/ai/models.ts`, `components/ai-elements/*`, and persistent settings to include dynamic LM Studio IDs, default selection, validation (e.g., disable option if model not loaded) plus explicit status messaging when service unavailable across environments—initially without entitlements/other provider coupling until confirmed.
5) **Implement Gemini CLI provider factory**: Use `ai-sdk-provider-gemini-cli` (and optionally `@ai-sdk/community-providers-gemini-cli`) to build `createGeminiProvider`, defaulting to CLI OAuth and falling back to API key when configured, while detecting CLI availability and exposing status to UI + chat route error messaging.
6) **Surface Gemini config in docs + env**: Document CLI installation, OAuth-first flow, API key fallback, and health checks within README/GEMINI.md. Update `.env.example` with `GEMINI_AUTH_TYPE`, `GEMINI_API_KEY`, CLI binary hints, and guidance for prod usage.
7) **Validation + testing**: Add targeted unit/contract tests (mock LM Studio + Gemini provider) plus manual smoke instructions (`pnpm lint`, `pnpm test`, `pnpm dev` + send chats) covering health indicator behavior and troubleshooting for LM Studio or CLI errors.

Risks / unknowns
- LM Studio SDK availability on deployment hosts (needs local daemon + port exposure) may limit production viability; might need feature flags.
- Gemini CLI requires local OAuth session + binary, which may not exist in serverless production—must confirm how to gate per-environment.
- Streaming APIs for LM Studio or Gemini may differ from gateway defaults; need to confirm compatibility with `streamText` + resumable streams.
- Auth + rate limits for Gemini API key fallback need clarity (scopes, quotas) to avoid surprising 4xx errors.

Testing & validation
- `pnpm lint` and relevant unit tests (e.g., provider factories, API route tests) to ensure build stability.
- Manual LM Studio smoke test: start LM Studio server, verify `GET /api/lmstudio/models` returns loaded models, then run `pnpm dev` and send chat selecting `lmstudio-chat`.
- Manual Gemini CLI test: run `gemini --help` / `gemini chat` to ensure CLI works, kick off OAuth if needed, then run chat selecting `gemini-2.5-pro`; monitor server logs for provider usage.
- Optional integration/E2E updates under `tests/` to assert provider dropdown includes LM Studio + Gemini and handles selection persistence.

Rollback / escape hatch
- Keep default gateway provider untouched and guard LM Studio/Gemini additions with feature flags or env checks so they can be disabled by removing env vars.
- Document how to revert `.env` changes and remove provider IDs from user settings; git revert for code changes if needed.

Owner/Date
- Codex / 2025-12-02
