<!-- path: .ruler/AGENTS.md -->
# Repository: Next.js AI-Chatbot

### Codex skills usage

- Always treat the nearest `AGENTS.md` in this codebase as the primary source of rules. Its instructions govern all behavior and take precedence over any skill or prompt.
- Treat `~/.codex/prompts/codex-skills/` as a secondary skills library to support the rules in `AGENTS.md`, not to replace or override them.
- For every non-trivial task (refactors, features, tests, docs, workflows, integrations, etc.), first interpret the task under the applicable `AGENTS.md` rules, then scan `~/.codex/prompts/codex-skills/` and select the skill whose `SKILL.md` description and metadata most closely match the requested work.
- Once a relevant skill is identified, follow its `SKILL.md` procedure, structure, and output formats, but resolve any conflict in favor of the current directory’s `AGENTS.md`.
- If multiple skills apply, prioritize the most specific skill for the task and use others only as secondary references.
- If no suitable skill exists, use the prompts under `~/.codex/prompts/codex-skills/skill-creator/` to define a new skill for the task, save it into the appropriate subdirectory under `codex-skills`, then re-run the task using that newly created skill, still subject to the governing `AGENTS.md` rules.


## Hierarchical Policy

- Treat this file as the single global source of architectural rules; all other `AGENTS.md` files refine, never contradict, these rules.
- Organize the codebase into three layers:
  - UI and HTTP entrypoints: `app/**`, `artifacts/**`, `components/**`, `hooks/**`.
  - Application services and domain logic: `lib/**` (excluding `lib/db`).
  - Data and infrastructure: `lib/db/**`, DB migrations, and environment-aware scripts.
- Enforce one-way dependencies: UI/HTTP → `lib/**` → `lib/db/**`; `lib/**` must not import from `app/**`, `artifacts/**`, `components/**`, or `hooks/**`.
- Keep all database access in `lib/db/**` and all AI provider wiring in `lib/ai/**`; other layers call them only via exported functions and types.
- Reserve effects and side effects for explicit boundaries:
  - Client components handle DOM, browser-only APIs, and visual behavior.
  - Server actions and route handlers handle DB, AI, file storage, and other external systems.

## Domain Vocabulary

- `Feature segment`: A top-level App Router grouping (e.g., `app/(auth)`, `app/(chat)`) that owns a vertical slice of UI and routing.
- `Service module`: A non-React module in `lib/**` that implements domain or integration logic without HTTP or UI concerns.
- `Persistence layer`: Modules under `lib/db/**` that define schema, migrations, and query functions using Drizzle and Postgres.
- `AI layer`: Modules under `lib/ai/**` that define `myProvider`, model IDs, prompts, and AI tools used by chat and artifacts.
- `Artifact`: A persisted document (text, code, sheet, image) created or updated via artifact handlers and stored as a `Document` in the DB.
- `Session`: Authenticated user context resolved via Auth.js (`auth()`, `signIn`, `signOut`) in `app/(auth)`.
- `Stream`: A server-to-client event stream (for example, `UIMessageStreamWriter<ChatMessage>`) used for streaming model output and document updates.

## Boundaries

- `app/**` and `artifacts/**` may import from `lib/**` but must never be imported by `lib/**` or `lib/db/**`.
- `lib/db/**` is the only layer allowed to use `drizzle-orm`, `postgres`, run DB migrations, or read `POSTGRES_URL` directly.
- `lib/ai/**` is the only layer allowed to wire AI providers, define model IDs, and centralize prompts; all other code calls exported providers, prompts, and tools only.
- Client components (`"use client"`) must not import `lib/db/queries`, `lib/db/schema`, or `lib/ai/providers`; they communicate with the server via server actions, route handlers, or `/api` routes.
- NextAuth configuration (`NextAuth`, `authConfig`) must live only in `app/(auth)`; other segments use `auth`, `signIn`, and `signOut` as their entire auth surface.
- Domain-level error handling uses `ChatSDKError` (or equivalents) in `lib/**` and maps to HTTP responses only at route handlers and server actions.
- Cross-feature imports between `app/(auth)`, `app/(chat)`, and `artifacts/**` go through well-defined exports (e.g., `auth`, chat actions, artifact handlers), not through internal files.
- No module under `lib/**` may import from `app/**`, `components/**`, or `hooks/**`; these are strictly UI layers.

## Data Fetching and Server Work

- Perform DB-backed data fetching only from server components, route handlers (`app/**/route.ts`), and server actions (`"use server"` modules); never in client `useEffect`.
- Prefer calling `lib/**` functions (e.g., `lib/db/queries`, `lib/ai/tools`) directly from server code instead of `fetch`ing your own HTTP endpoints, unless HTTP streaming is strictly required.
- Treat route handlers as thin HTTP adapters: parse and validate input, call `lib/**` functions, and translate domain errors into HTTP responses.
- Keep multi-step workflows (creating chats, saving messages, updating artifacts) inside service functions in `lib/**` or server actions; client code should trigger a single call per workflow.
- Mark server-only modules with `"server-only"` or equivalent guards when they must never be imported into client bundles.

## State and Effects

- Persist long-lived domain state (chats, messages, documents, suggestions, usage) exclusively via `lib/db/**`.
- Store durable user preferences (e.g., selected chat model, sidebar state) in cookies read and written from the server.
- Use the URL (path segments and `searchParams`) as the source of truth for shareable view state; derive UI from the URL instead of mirroring it into local state via `useEffect`.
- Restrict React state (`useState`, context) to short-lived UX concerns (input values, open/closed toggles, ephemeral filters) that do not need persistence or deep linking.
- Use `useEffect` only for genuine side effects (DOM measurement, subscriptions, analytics, external-store sync); not for initial data loading, data derivation, or simple prop-to-state mapping.

## Effect Substitution Guide

- If an effect performs an initial fetch based on props, URL, or cookies → move the fetch into a server component, server action, or route handler and pass results as props.
- If an effect writes to the DB or external APIs → move that work into a server action or route handler and invoke it from event handlers instead of `useEffect`.
- If an effect sets state from props or other state (`setState(props.x)`) → compute the derived value during render or with `useMemo` if it is expensive.
- If an effect mirrors component state into the URL → treat the URL as source of truth and update it via Next.js navigation (`router.push` / `router.replace`) plus `searchParams`.
- If an effect polls or listens for server updates → prefer streaming primitives (`UIMessageStreamWriter`, SSE, AI SDK streams) or explicit external-store subscriptions.

## Library-Specific Rules: Next.js App Router

- Use server components by default in `app/**`; add `"use client"` only where hooks or browser APIs are required.
- Use `redirect`, `notFound`, and `cookies`/`headers` utilities from `next/navigation` and `next/headers` only in server components, route handlers, or server actions.
- Keep root-level providers (theme, auth session, toasts, layout shell) in `app/layout.tsx` and its direct children; additional providers must be clearly owned by a feature segment.
- Route handlers under `app/**/api/**` must remain thin: parse/validate, call `lib/**`, and map domain results to HTTP; no direct Drizzle or provider wiring.
- Only route handlers and server actions may access `Request` / `NextRequest` / `NextResponse`; `lib/**` modules must not depend on HTTP primitives.

## Library-Specific Rules: ORM / DB

- Restrict Drizzle and Postgres usage to `lib/db/**`; these packages must not appear in `app/**`, `artifacts/**`, or other `lib/**` directories.
- Model all tables and relations in `lib/db/schema.ts`; DB migrations under `lib/db/migrations/**` must reflect that schema and are consumed only by migration runners.
- Implement focused query functions in `lib/db/queries.ts`; callers must not assemble raw SQL or Drizzle query fragments directly.
- Wrap DB failures in `ChatSDKError` (or equivalent) with stable error codes; leave HTTP concerns to callers.

## Library-Specific Rules: AI SDK

- Define providers, model IDs, and prompt constants only in `lib/ai/**`; other code references these through exported identifiers such as `myProvider.languageModel("chat-model")`.
- Implement AI tools as functions in `lib/ai/tools/**` that validate inputs, call models, and return structured data or write to provided streams; they should not hide arbitrary side effects.
- Use streaming APIs (`streamText`, `streamObject`, `createUIMessageStream`) only from server-executed code; no client component may invoke them directly.