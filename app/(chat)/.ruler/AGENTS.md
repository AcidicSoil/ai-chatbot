# Directory: app/(chat)

## Hierarchical Policy

- This directory inherits all global rules from `.ruler/AGENTS.md` and specializes them for the chat surface and chat HTTP endpoints.
- Owns:
  - Chat pages, layouts, and streaming UI for chat sessions.
  - Chat-related server actions in `actions.ts`.
  - Chat-related App Router route handlers under `app/(chat)/api/**`.
- May depend on:
  - `@/app/(auth)/auth` for session access.
  - `@/lib/db/queries` for persistence.
  - `@/lib/ai/**` for model calls and prompts.
  - `@/artifacts/**`, `@/components/**`, `@/hooks/**` for UI/domain helpers.
- Must not depend on:
  - Drizzle directly (`drizzle-orm`, `postgres`) or DB migrations.
  - NextAuth configuration internals other than the exported `auth`, `signIn`, `signOut`.
  - Low-level AI provider wiring (only use `myProvider` and other exported facades from `lib/ai`).

## Domain Vocabulary

- `Chat`: A long-lived conversation record stored via `lib/db/queries` (id, title, visibility, user ownership).
- `Message`: A persisted chat message; UI uses “UIMessage” projections.
- `Stream`: A streaming session of model output associated with a chat.
- `VisibilityType`: Public/private visibility of a chat.
- `DataStreamProvider` / `DataStreamHandler`: Components wiring server-side data streams into the chat UI.
- `artifactKinds`: `"text" | "code" | "sheet"` artifact types associated with a chat.
- `chat-model` / `chat-model-reasoning`: Primary AI models for chat; configured in `lib/ai/providers`.

## Allowed Patterns

### Next.js App Router: pages and layouts

1. Pages and layouts in this segment:
   - Default export a React component; pages may be async server components.
   - For initial data, call `auth()` and `lib/db/queries` functions directly from server components.
   - Use Suspense boundaries for loading states; keep fallback UIs minimal and layout-safe.
2. URL and params:
   - Route params are accessed via typed `params` where possible; do not parse from `searchParams` if you have path params.
   - Use the `redirect` and `notFound` helpers from `next/navigation` for control-flow, not manual `NextResponse` in pages.

### Route handlers under `app/(chat)/api/**`

1. Shape:
   - Export `GET`, `POST`, `PATCH`, `DELETE`, etc. as `export async function` for each HTTP verb.
   - Accept `Request` or Next’s `NextRequest` as the first argument.
2. Authentication:
   - Always call `auth()` for endpoints that operate on user-owned chats or messages.
   - Treat unauthenticated requests as errors using `ChatSDKError` where appropriate.
3. Validation:
   - Parse query params via `new URL(request.url).searchParams`.
   - For JSON bodies, use `await request.json()` and validate via Zod schemas when the data is non-trivial.
   - Return typed error responses via `ChatSDKError` for missing/invalid params.
4. Data access:
   - Only call persistence through `@/lib/db/queries` functions.
   - Obtain any DB types via `@/lib/db/schema` types, not direct `drizzle` queries.
5. Responses:
   - Use `Response.json(...)` or `NextResponse.json(...)` for successful responses.
   - For domain errors, return `.toResponse()` from `ChatSDKError` instead of throwing raw errors.

### Server actions in `app/(chat)/actions.ts`

1. Mark file-level `"use server"` and export server actions which:
   - Parse and validate input synchronously.
   - Call `generateText` / AI SDK functions through `myProvider` or higher-level wrappers in `lib/ai`.
   - Call `lib/db/queries` for any persistence updates.
2. Side effects:
   - Use `cookies()` for persisting lightweight per-user flags like preferred chat model.
   - Avoid performing multi-step, cross-entity business flows directly in actions; delegate to dedicated functions in `lib/**` when logic grows.

### Interaction with artifacts

1. For generating or updating artifacts as part of a chat:
   - Delegate to handlers in `artifacts/**` and `lib/artifacts/server`.
   - Treat artifact creation/update as separate domain operations, not inline string manipulations in route handlers.

## Prohibited Patterns

1. No direct DB access:
   - Forbidden to import `drizzle-orm`, `postgres`, or create DB clients in this directory.
   - Forbidden to run raw SQL or touch migrations.
2. No low-level auth configuration:
   - Do not instantiate `NextAuth` here.
   - Do not alter `authConfig`; only call exported `auth`, `signIn`, `signOut`.
3. No business logic in React client components:
   - Client components must not call fetch on internal `/api` routes for operations available as server actions or direct server calls.
   - Client components must not import `@/lib/db/queries` or `@/lib/ai/providers`; those belong in server-only files.
4. No arbitrary access to cookies:
   - Use cookies only for stable, simple preferences (e.g., chat model) and not as an ad-hoc data store.

## Boundaries

- Upstream callers:
  - Entry point for chat UX is via routes under `app/(chat)`; external code must not call lower-level `app/(chat)/api/**` endpoints directly from the server—prefer function calls in `lib/**`.
- Downstream dependencies:
  - Allowed: `@/app/(auth)/auth`, `@/lib/db/**`, `@/lib/ai/**`, `@/lib/artifacts/**`, `@/components/**`, `@/hooks/**`, `@/lib/constants`, `@/lib/errors`, `@/lib/utils`.
  - Forbidden: `lib/db/migrations`, low-level provider setup outside `lib/ai/providers`, any future `scripts/**` or CLI-only utilities.
- Cross-segment isolation:
  - This segment must not import from other app segments (e.g., `app/avatar/**`) except shared UI-only components; cross-feature server logic belongs in `lib/**`.
