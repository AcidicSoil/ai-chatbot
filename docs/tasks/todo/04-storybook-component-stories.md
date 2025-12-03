Context
- Need to expose all "indexed active components" (shared chat/artifact UI) via Storybook for isolation and regression coverage.
- Existing project only has placeholder Storybook examples (`stories/Button.tsx`, etc.) and lacks stories wired to real components listed in the component inventory.
- Must respect AGENT layering: components live in `components/**` and should remain client/server safe inside Storybook.

Success criteria
- Storybook includes stories for every active component referenced in the new inventory (at minimum: core chat shell, artifact viewers, editors, sidebar, UI primitives) with realistic props so they render.
- Stories build without errors via `pnpm storybook` and document server/client boundaries (mocking server hooks etc.).
- Each story demonstrates at least one meaningful state (default + variation) and documents requirements (providers, context wrappers).

Deliverables
- Story files under `stories/` (or feature-specific subdirectories) covering the indexed components.
- Supporting mocks/helpers (e.g., context providers, fixture data) if necessary for Storybook rendering.
- Updated docs if new usage instructions are needed for Storybook (e.g., README or STORYBOOK.md).

Approach
1) Finalize the component inventory (paths, client/server flags, dependencies) and decide which components require wrappers (artifact context, sidebar context, etc.).
2) Update Storybook config (preview decorators, mock providers) so contexts (e.g., `useChatVisibility`, `useArtifact`) work outside Next.js runtime.
3) Author grouped story files (e.g., `stories/chat/Chat.stories.tsx`, `stories/artifacts/Artifact.stories.tsx`, `stories/ui/Button.stories.tsx`) following the inventory order, ensuring each story passes appropriate props and mocks.
4) Add regression states (loading, error, empty) per component using knobs/controls; include documentation comments/args for clarity.
5) Run `pnpm storybook` (or `pnpm build-storybook`) locally to validate; fix issues and commit.

Risks / unknowns
- Hooks relying on Next.js router, SWR, or auth may fail in Storybook without stubs; need deterministic mocks.
- Components with server-only logic (`artifactDefinitions`, DB fetch) require fixture data; scope to UI-only interactions.
- Keeping stories updated as components evolve could add maintenance overhead; consider generating fixtures from shared utilities.

Testing & validation
- `pnpm storybook` for local dev server smoke test.
- `pnpm build-storybook` to ensure static export works in CI.
- (Optional) Visual regression via Chromatic once stories exist.

Rollback / escape hatch
- Revert new story files/config if they introduce regressions; components operate without Storybook at runtime.

Owner/Date
- Codex / 2025-02-14
