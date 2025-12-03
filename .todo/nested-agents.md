AGENTS layout

```text
.ruler/
  AGENTS.md
app/
  .ruler/
    AGENTS.md
  (auth)/
    .ruler/
      AGENTS.md
  (chat)/
    .ruler/
      AGENTS.md
artifacts/
  .ruler/
    AGENTS.md
lib/
  ai/
    .ruler/
      AGENTS.md
  db/
    .ruler/
      AGENTS.md
```

---

```md
<!-- path: .ruler/AGENTS.md -->
# Repository: Next.js Chatbot Template

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
```

---

```md
<!-- path: app/.ruler/AGENTS.md -->
> Inherits global rules from `.ruler/AGENTS.md` for all App Router UI and routing.

# Directory: app

## Hierarchical Policy

- Own the Next.js App Router tree, including root layout, global styling, and segmented feature groups like `(auth)` and `(chat)`.
- Default to server components for `layout.tsx` and `page.tsx`; use `"use client"` only when hooks or browser APIs are required.
- Delegate business logic and persistence to `lib/**` and feature modules (`artifacts/**`); keep App Router files focused on data wiring, routing, and composition.
- Restrict HTTP entrypoints to route handlers (`app/**/route.ts`) and server actions; client code must not define ad hoc HTTP endpoints.

## Domain Vocabulary

- `layout.tsx`: Root or nested layout responsible for shells, providers, and shared chrome.
- `page.tsx`: Route entry component (server by default) for a concrete URL path.
- `route.ts`: HTTP route handler for an API endpoint or non-page route.
- `Segment`: A directory like `(auth)` or `(chat)` representing a vertical feature slice under `app/`.
- `globals.css`: Global design tokens, theme variables, and Tailwind configuration.
- `Client page`: A `page.tsx` marked with `"use client"` used for auth flows or UI-heavy experiences.
- `Server action`: A `"use server"` function imported into components or forms to perform mutations.

## Boundaries

- `app/**` may import from `components/**`, `hooks/**`, `artifacts/**`, and `lib/**` but must not be imported by `lib/**` or `artifacts/**`.
- `app/layout.tsx` is the primary place to configure global providers (theme, session, toasts); additional providers must be explicitly owned by feature segments.
- Non-segment directories under `app/` (e.g., `avatar/upload`) follow the same constraints as feature segments: server components handle data, route handlers handle HTTP, and client components only handle UX.
- Route handlers (`app/**/route.ts`) must not perform Drizzle queries or AI provider wiring directly; they call exported functions from `lib/db/**` and `lib/ai/**`.
- Client components inside `app/**` must not import `lib/db/queries`, `lib/db/schema`, or `lib/ai/providers`; they communicate with the server via server actions, route handlers, or structured streaming providers.
```

---

```md
<!-- path: app/(auth)/.ruler/AGENTS.md -->
> Inherits global rules from `.ruler/AGENTS.md` and `app/.ruler/AGENTS.md` for authentication.

# Directory: app/(auth)

## Hierarchical Policy

- Own all authentication concerns: Auth.js configuration, session and JWT typing, login/register pages, and auth-specific API endpoints.
- Expose a small surface (`auth`, `signIn`, `signOut`, `handlers.GET`, `handlers.POST`) consumed by other segments; avoid leaking internal details.
- Treat login and register pages as client-only shells that call server actions or `signIn`; keep sensitive logic on the server.
- Avoid dependencies on chat, artifact, or other feature-specific code; this segment is shared infrastructure for the entire app.

## Domain Vocabulary

- `authConfig`: Shared NextAuth configuration object used to initialize Auth.js.
- `auth`: Server helper that resolves the current `Session` for the request.
- `signIn` / `signOut`: Auth.js helpers exported for use in routes, actions, and client flows.
- `UserType`: `"guest" | "regular"`; stored in the JWT and attached to `Session.user`.
- `DUMMY_PASSWORD`: Constant used to prevent user enumeration via timing attacks.
- `Auth pages`: The `login` and `register` pages orchestrating credential and guest flows.

## Boundaries

- `app/(auth)` is the only place where `NextAuth` is instantiated; no other file may call `NextAuth(...)` or configure providers.
- This segment may import `@/lib/db/queries` and `@/lib/db/utils` for user lookup and password hashing but must not import from `app/(chat)` or `artifacts/**`.
- Client auth pages must not import `lib/db/queries` directly; they call server actions or `signIn` and interpret result status for feedback.
- API routes under `app/(auth)/api/**` may re-export `{ GET, POST }` from `auth` or call `signIn` / `signOut`, but must not reimplement JWT/session parsing.
- Password hashing and comparison must go through `bcrypt-ts` and shared helpers (`generateHashedPassword`, `DUMMY_PASSWORD`); no raw crypto primitives or ad hoc hashing.
- Session and JWT typing changes belong only in `app/(auth)/auth.ts`; other modules treat `Session.user.id` and `Session.user.type` as canonical.
- `lib/db/**` and other `lib/**` modules must not import from `app/(auth)`; dependencies are strictly top-down: features → auth → DB.
- New authentication flows (OAuth providers, magic links, guest variants) must be added here, keeping the rest of the app dependent only on the exported `auth` API.
```

---

```md
<!-- path: app/(chat)/.ruler/AGENTS.md -->
> Inherits global rules from `.ruler/AGENTS.md` and `app/.ruler/AGENTS.md` for chat and streaming.

# Directory: app/(chat)

## Hierarchical Policy

- Own the chat experience: chat pages and layouts, chat APIs, server actions, and streaming behavior.
- Treat `app/(chat)/api/**` route handlers as orchestrators that call into `lib/db/**`, `lib/ai/**`, and artifact handlers; they should not replicate low-level concerns.
- Ensure all chat persistence (chats, messages, streams, votes, suggestions) goes through `lib/db/queries`; no inline SQL or direct Postgres usage.
- Use `auth()` from `app/(auth)/auth` to enforce access control before reading or mutating user-owned chats.
- Keep React client components focused on rendering chat UI and wiring event handlers; heavy business logic stays in server actions and route handlers.

## Domain Vocabulary

- `Chat`: Long-lived conversation entity with `id`, `userId`, `title`, `visibility`, and `lastContext`.
- `Message`: Persisted chat message in the DB, projected into UI as `ChatMessage`.
- `VisibilityType`: Chat visibility enum (`"public" | "private"`) controlling who may read and mutate a chat.
- `Stream`: Resumable stream of chat model output associated with a chat and stored in the `Stream` table.
- `ChatModel`: Model id string such as `"chat-model"` or `"chat-model-reasoning"` selected via cookies or UI.
- `UIMessageStreamWriter<ChatMessage>`: Structured stream used to send incremental responses and artifact events to the client.
- `DataStreamProvider` / `DataStreamHandler`: Components that subscribe to server-side data streams and apply updates to the chat UI.
- `artifactKinds`: Allowed artifact types that can be created from chat (e.g., `"text" | "code" | "sheet"`).

## Boundaries

- `app/(chat)` may import from `app/(auth)/auth`, `@/lib/db/queries`, `@/lib/db/schema` (types only), `@/lib/ai/**`, `@/lib/artifacts/server`, `@/components/**`, `@/hooks/**`, and shared `lib/**` helpers.
- Route handlers under `app/(chat)/api/**` must:
  - Parse and validate input (often with Zod).
  - Call `lib/db/queries` and `lib/ai/tools` for all DB and AI work.
  - Map domain errors (`ChatSDKError`) to `Response` / `NextResponse` objects.
- Streaming chat endpoints use AI SDK primitives (e.g., `streamText`, `createUIMessageStream`, `JsonToSseTransformStream`) and must report usage via `lib/usage` / `lib/db/queries` where appropriate.
- Server actions in `app/(chat)/actions.ts` may update chat metadata (visibility, title, trailing message deletion) but must not duplicate logic already encapsulated in `lib/db/queries`.
- Client chat components must not import `lib/db/queries` or `lib/ai/providers`; they call server actions, consume streamed data, or call `/api` endpoints only when server actions are not viable.
- Cookie usage in this segment is limited to stable preferences such as chat model id and sidebar collapsed state; do not use cookies as arbitrary data stores.
- This segment must not import from `app/(auth)/api/**` or configure NextAuth; it only consumes the exported `auth`, `signIn`, and `signOut` helpers.
- Artifact operations triggered from chat must call into `artifacts/**` handlers or `lib/artifacts/server`; chat handlers must not manually implement artifact persistence.
- External integrations used here (e.g., blob uploads, geolocation, TokenLens) must be wrapped in clear functions with entitlement and error handling, not scattered across components.
```

---

```md
<!-- path: artifacts/.ruler/AGENTS.md -->
> Inherits global rules from `.ruler/AGENTS.md` for artifact-centric UX and document generation.

# Directory: artifacts

## Hierarchical Policy

- Specialize global rules for artifact (document) creation, updating, and display across chat and standalone flows.
- Own artifact UX via client modules and AI-powered document generation/updating via server modules.
- Delegate persistence to `lib/artifacts/server` and `lib/db/queries`; this directory coordinates but does not perform raw DB writes.
- Expose typed handlers and UI components that can be reused from chat flows or other callers without knowledge of DB details.

## Domain Vocabulary

- `ArtifactKind`: Union of artifact kinds (e.g., `"text" | "code" | "sheet" | "image"`).
- `Document`: Persisted artifact entity backed by the `Document` table in `lib/db/schema`.
- `DocumentHandler<T>`: Interface describing how to create and update artifacts of a specific kind.
- `createDocumentHandler`: Factory in `lib/artifacts/server` that wires AI generation and persistence into a `DocumentHandler`.
- `draftContent`: Intermediate content string built up from AI streaming before persistence.
- `UIMessageStreamWriter<ChatMessage>`: Stream used to push incremental artifact updates to the client.
- `Artifact client`: `"use client"` components under `artifacts/**/client.tsx` responsible for editing, preview, and interaction for a given artifact kind.

## Boundaries

- Artifact server modules (`artifacts/**/server.ts`) must:
  - Use `myProvider` and prompt helpers from `lib/ai/**` for AI calls.
  - Use `createDocumentHandler` so that persistence flows through `lib/artifacts/server` and `lib/db/queries` rather than direct SQL or Drizzle in this directory.
- Artifact client modules (`artifacts/**/client.tsx`) are client-only and must not import `lib/db/queries`, `lib/db/schema`, or AI providers; they consume data and streams passed from server code.
- `artifacts/actions.ts` is the only file here that may perform direct DB reads for artifact suggestions; other artifact modules use its helpers or `lib/artifacts/server`.
- This directory may import from `@/components/**`, `@/hooks/**`, `@/lib/ai/**`, `@/lib/artifacts/server`, and `@/lib/db/schema`; it should not depend on `app/(auth)` or `app/(chat)` internals.
- Artifact handlers must treat `Document` identity (id, title, kind, createdAt) as inputs; they should not query unrelated entities such as `Chat` or `Message`.
- Artifact operations invoked from chat must be modeled as explicit handler calls or AI tools; do not embed ad hoc AI calls or string manipulation directly inside chat route handlers.
- No NextAuth configuration or session shaping occurs here; any `Session` or user context required by handlers must be passed in from callers.
- New artifact kinds must be added by extending `ArtifactKind`, updating `documentHandlersByArtifactKind`, and providing both server and client modules that follow these rules.
```

---

```md
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
```

---

```md
<!-- path: lib/db/.ruler/AGENTS.md -->
> Inherits global rules from `.ruler/AGENTS.md` for data modeling, querying, and migrations.

# Directory: lib/db

## Hierarchical Policy

- Specialize global rules for the data/ORM layer: schema, queries, and migrations.
- Act as the single source of truth for database structure (`schema.ts`), query functions (`queries.ts`), and migration scripts (`migrations/**`).
- Own all DB connectivity and environment configuration (Drizzle/Postgres client initialization and `POSTGRES_URL` usage).
- Remain server-only; modules here must never be imported into client bundles.

## Domain Vocabulary

- Entities: `User`, `Chat`, `Message`, `Suggestion`, `Stream`, `Vote`, `Document`.
- Tables: Drizzle `pgTable` definitions plus associated indexes, primary keys, and foreign keys.
- Query helpers: Functions like `asc`, `desc`, `eq`, `gt`, `lt`, `and`, `or`, `inArray`, `count` used to express typed queries.
- Migration artifacts: SQL files and snapshot JSON under `lib/db/migrations/**` that encode schema evolution.
- `ChatSDKError`: Domain error type used to wrap DB failures with stable error codes for callers.
- `AppUsage`: JSON-serializable usage payload stored on chats (e.g., in `lastContext`).
- Helper scripts: CLI utilities like `migrate.ts` and one-off data helpers in `helpers/**`.

## Boundaries

- Only this directory may import `drizzle-orm`, `drizzle-orm/pg-core`, `drizzle-orm/postgres-js`, `postgres`, and `dotenv`.
- All database reads and writes must be expressed as exported functions in `queries.ts`; callers in `app/**` or `lib/**` must not construct raw SQL or Drizzle queries themselves.
- Query functions must be small and single-purpose (e.g., `getUser`, `createGuestUser`, `saveChat`, `getMessagesByChatId`); orchestration across multiple operations belongs in higher-level service code.
- Modules in this directory must not import from `app/**`, `artifacts/**`, `components/**`, `hooks/**`, or any UI-related code.
- Schema changes must be reflected both in `schema.ts` and in migrations under `migrations/**`; migration files are consumed only by the migration runner, never imported.
- Only `migrate.ts` and the DB client initialization path may read `process.env.POSTGRES_URL`; other modules must receive configuration via parameters or shared constants.
- DB modules must not call external HTTP APIs or AI providers; they are strictly responsible for local persistence.
- Any file that imports `lib/db/queries` must itself be treated as server-only code (route handler, server action, or `"server-only"` module).
```
