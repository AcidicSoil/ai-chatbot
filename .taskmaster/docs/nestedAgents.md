```md
<!-- .ruler/AGENTS.md -->
# AGENTS.md for repo root

## Hierarchical Policy
- Serves as the system-wide source-of-truth for architectural and design rules.
- All `AGENTS.md` files in subdirectories inherit these rules and may only narrow or refine them.
- On conflict, the more restrictive rule (root vs child) applies.

## Domain Vocabulary
- App: Next.js App Router application with grouped routes under `app/`.
- User: Authenticated or guest account handled via NextAuth and database user records.
- Session: Authentication/session object from NextAuth, used to authorize requests.
- Chat: Conversation between a user and AI, persisted via `lib/db`.
- Message: Individual chat turn stored and streamed via `lib/db` and `lib/ai`.
- Artifact: AI-generated structured output (text, code, image, sheet) managed via `artifacts/` and `lib/artifacts`.
- Tool: AI tool call handler under `lib/ai/tools`.
- DB Layer: Drizzle-based schema and queries under `lib/db`.
- Provider: Model provider configuration under `lib/ai/providers`.

## Allowed Patterns
- Global layering:
  - UI and routing: `app/`, `artifacts/`, `hooks/`, `components/`.
  - Domain and infrastructure: `lib/ai`, `lib/artifacts`, `lib/db`, `lib/editor`, `lib/constants`, `lib/errors`, `lib/types`, `lib/usage`, `lib/utils`.
  - Persistence: `lib/db/schema`, `lib/db/queries`, `lib/db/migrations`.
- Data flow:
  - User input → React components / hooks → server actions or API routes in `app/` → domain services in `lib/` → database / AI providers → typed responses back to UI.
- Environment access:
  - `process.env` is read only in server-side modules, configuration, and `lib/constants` / `lib/ai/providers` / DB setup.
- Error handling:
  - Use `ChatSDKError` and error types from `lib/errors` for API and server errors.
- Types:
  - Share cross-cutting types via `lib/types`, `lib/usage`, and `lib/db/schema`.

## Prohibited Patterns
- No imports from `app/`, `artifacts/`, `hooks/`, or `components/` into any `lib/` subdirectory except explicitly UI-oriented libraries (e.g. `lib/editor`).
- No direct database client or raw SQL outside `lib/db` and its helpers/migrations.
- No direct AI provider calls outside `lib/ai`, `lib/artifacts/server`, and server-only handlers under `artifacts/*/server.ts`.
- No `process.env.*` access from client components or shared code that can run on the client.
- No circular dependencies between directories (e.g. `lib/db` ↔ `lib/ai`, `app` ↔ `lib`).

## Boundaries
- Import directions:
  - `app/*`, `artifacts/*`, and `hooks/*` may depend on `lib/*` but not the reverse (except for explicitly UI-only libraries like `lib/editor` depending on `components/*`).
  - `lib/db` is the exclusive entrypoint for persistence; consumers use exported queries and types, not drizzle primitives directly.
  - `lib/ai` is the exclusive entrypoint for AI models and tools; consumers use its exported providers, prompts, and tool definitions.
- Database boundaries:
  - Application code only calls DB through `lib/db/queries` or other public DB service functions.
  - `lib/db/migrations` and `lib/db/migrations/meta` are tooling-only and must not be imported by runtime application code.
- AI boundaries:
  - Applications trigger AI calls via `lib/ai` or through artifact handlers, never by constructing provider clients ad hoc.
- Static analysis:
  - Validate that each directory’s `AGENTS.md` refines these rules and that import graphs respect the global layering.
```

```md
<!-- app/AGENTS.md -->
# AGENTS.md for `app`

## Hierarchical Policy
- Inherits system-wide rules from `.ruler/AGENTS.md`.
- Owns Next.js App Router entrypoints, layouts, and route groups.
- Delegates business logic to `lib/*` and server actions / API routes, not to client components.

## Domain Vocabulary
- Route group: Directory under `app/` representing a logical area (e.g. `(auth)`, `(chat)`).
- Layout: `layout.tsx` defining UI shell, providers, and meta tags.
- Page: `page.tsx` implementing a concrete route.
- Server action: `actions.ts` functions marked `"use server"`, called from client components.
- API route: `api/**/route.ts` handlers for HTTP endpoints.

## Allowed Patterns
- Use server components by default; mark components with `"use client"` only when interactivity or browser APIs are required.
- Delegate mutations and sensitive logic to:
  - `app/**/actions.ts` server actions, or
  - `app/**/api/**/route.ts` API handlers, which then call `lib/*`.
- Read/write persistent data only via `lib/db/queries` or other public DB functions.
- Use types and utilities from `lib/*`, `hooks/*`, `artifacts/*`, and `components/*` as needed.

## Prohibited Patterns
- No direct imports from `lib/db/migrations`, `lib/db/migrations/meta`, or `lib/db/helpers` into `app/`.
- No direct AI provider calls from `app/` (use `lib/ai` or artifact handlers instead).
- No direct `process.env` access from client components under `app/`.
- No business logic embedded in Next.js layouts beyond bootstrapping providers and top-level configuration.

## Boundaries
- `app/` may import from:
  - `lib/*` (excluding migrations/meta/helpers).
  - `hooks/*` and `artifacts/*`.
  - `components/*` (if present).
- `app/` must not be imported from `lib/*`, `hooks/*`, or `artifacts/*`.
- Route groups `(auth)` and `(chat)` are separate bounded contexts that communicate through shared lib layers, not by cross-importing each other’s UI.
```

```md
<!-- app/(auth)/AGENTS.md -->
# AGENTS.md for `app/(auth)`

## Hierarchical Policy
- Inherits from `.ruler/AGENTS.md` and `app/AGENTS.md`.
- Specializes rules for authentication and session-handling flows.

## Domain Vocabulary
- Auth form: UI for login/registration using email/password or guest access.
- Credentials: User email/password stored in the DB.
- Session: NextAuth session object from `auth()` / `useSession()`.
- Auth server actions: Functions in `app/(auth)/actions.ts` handling validation and DB calls.

## Allowed Patterns
- UI pages (`login`, `register`) call server actions from `./actions` for all credential checks and DB operations.
- Server actions import `createUser`, `getUser`, and related helpers from `lib/db/queries`.
- Use `auth.ts` and `auth.config.ts` for NextAuth configuration and helpers.
- Authorize routes and actions by calling `auth()` or `useSession()` rather than re-implementing token parsing.

## Prohibited Patterns
- No direct DB schema imports (`lib/db/schema`) into client pages; use action-level queries instead.
- No custom password hashing or credential verification outside the centralized logic in `lib/db` and auth actions.
- No direct NextAuth low-level token manipulation in UI components (rely on `auth()` / `signIn()` / `signOut()` helpers).

## Boundaries
- May import:
  - `@/lib/db/queries`, `@/lib/errors`, `@/lib/constants`, and auth helpers.
  - Shared components (`@/components/*`) and hooks for UI composition.
- Must not import:
  - `app/(chat)` or other route groups directly.
  - `lib/ai`, `lib/artifacts`, or `lib/db/migrations*` from this subtree.
- All external authentication-related requests terminate in this bounded context and delegate to `lib/db` / NextAuth.
```

```md
<!-- app/(auth)/api/AGENTS.md -->
# AGENTS.md for `app/(auth)/api`

## Hierarchical Policy
- Inherits from `.ruler/AGENTS.md`, `app/AGENTS.md`, and `app/(auth)/AGENTS.md`.
- Defines server-only HTTP endpoints for authentication.

## Domain Vocabulary
- Auth route: `route.ts` files handling HTTP requests for auth operations.
- Guest sign-in: Flow that creates or reuses a guest user account and issues a session.

## Allowed Patterns
- Implement HTTP verbs (`GET`, `POST`) using Next.js `Request`/`NextRequest` and `NextResponse`.
- Use `auth.ts` and NextAuth helpers for session and token handling.
- Read/write user records via `lib/db/queries` only.
- Return errors via `ChatSDKError` or standard HTTP responses.

## Prohibited Patterns
- No `"use client"` in any file under `app/(auth)/api`.
- No React imports; this subtree is server-only.
- No direct cookie/header manipulation bypassing NextAuth helpers for authentication decisions.
- No calls to `lib/db/migrations`, `lib/db/helpers`, or `lib/ai`.

## Boundaries
- May import from:
  - `@/app/(auth)/auth`, `@/app/(auth)/auth.config`.
  - `@/lib/db/queries`, `@/lib/errors`, `@/lib/constants`.
- Must not be imported by any other code; Next.js router instantiates these modules based on file path.
```

```md
<!-- app/(auth)/api/auth/AGENTS.md -->
# AGENTS.md for `app/(auth)/api/auth`

## Hierarchical Policy
- Inherits from `.ruler/AGENTS.md`, `app/AGENTS.md`, and `app/(auth)/api/AGENTS.md`.
- Encapsulates NextAuth HTTP handlers and related auth routes.

## Domain Vocabulary
- NextAuth handler: Combined route handler that wires providers, callbacks, and session logic.
- Auth secret: `AUTH_SECRET` used to validate and sign tokens.

## Allowed Patterns
- Re-export or configure NextAuth handlers using `auth.ts` and `auth.config.ts`.
- Use `getToken`, `NextResponse`, and NextAuth APIs to manage auth flows.
- Delegate any DB read/write to `lib/db/queries` through `auth.ts` or other auth helpers.

## Prohibited Patterns
- No standalone credential validation logic that bypasses the central NextAuth configuration.
- No direct environment variable access other than secrets required by NextAuth (e.g., `AUTH_SECRET`).
- No importing UI components from `app/(auth)/login` or `register` into this server-only area.

## Boundaries
- May import:
  - `@/app/(auth)/auth`, `@/app/(auth)/auth.config`.
  - `next-auth/*`, `next/server`, `next-auth/jwt`.
  - `@/lib/constants` for environment flags.
- Not imported by other application code (entrypoints are file-path based).
```

```md
<!-- app/(auth)/api/auth/[...nextauth]/AGENTS.md -->
# AGENTS.md for `app/(auth)/api/auth/[...nextauth]`

## Hierarchical Policy
- Inherits from all ancestor auth directory policies.
- Specializes the dynamic auth route for standard NextAuth callbacks and endpoints.

## Domain Vocabulary
- Auth callback route: Dynamic segment handling sign-in, callback, and session endpoints.

## Allowed Patterns
- Export the NextAuth route handler configured in `app/(auth)/auth.ts`.
- Use only NextAuth and Next.js server primitives.

## Prohibited Patterns
- No custom logic outside wiring the handler; all behavior should be centralized in `auth.ts` and `auth.config.ts`.
- No direct DB or AI usage here; DB access happens inside the configured NextAuth adapter or callbacks.

## Boundaries
- May import from `@/app/(auth)/auth`.
- No other imports from UI, hooks, or unrelated libraries.
```

```md
<!-- app/(auth)/api/auth/guest/AGENTS.md -->
# AGENTS.md for `app/(auth)/api/auth/guest`

## Hierarchical Policy
- Inherits from `.ruler/AGENTS.md`, `app/(auth)/AGENTS.md`, and auth API policies.
- Scoped to guest sign-in behavior.

## Domain Vocabulary
- Guest token: Session created for a `guest-*` identity.
- Redirect URL: Target route after successful guest login.

## Allowed Patterns
- Use `getToken` with `AUTH_SECRET` to detect existing sessions.
- Call `signIn("guest", ...)` from `app/(auth)/auth` for guest login.
- Use `isDevelopmentEnvironment` from `lib/constants` to decide cookie security.

## Prohibited Patterns
- No DB access; user creation and lookup are handled via configured guest provider.
- No custom cookie or header manipulation outside NextAuth and `NextResponse`.

## Boundaries
- Imports limited to:
  - `next/server`, `next-auth/jwt`, `@/app/(auth)/auth`, `@/lib/constants`.
- Exposed only to Next.js routing; must not be used as a generic helper module.
```

```md
<!-- app/(auth)/login/AGENTS.md -->
# AGENTS.md for `app/(auth)/login`

## Hierarchical Policy
- Inherits from `.ruler/AGENTS.md`, `app/AGENTS.md`, and `app/(auth)/AGENTS.md`.
- Encodes client-side login page behavior.

## Domain Vocabulary
- Login page: Client route for existing users to authenticate.
- Login action: `login` server action defined in `../actions`.

## Allowed Patterns
- Mark `page.tsx` as `"use client"` for interactive login behavior.
- Use `useActionState` and `AuthForm` to submit login data to the `login` server action.
- Show feedback via `toast` and navigate via `useRouter`.
- Read session state via `useSession` to redirect already-authenticated users.

## Prohibited Patterns
- No direct calls to `lib/db/queries` or `auth()` from the client component; always go through server actions.
- No direct `process.env` access.
- No duplication of form validation logic already defined in `actions.ts` (keep client-side checks minimal).

## Boundaries
- May import:
  - `../actions`, `@/components/*`, `@/hooks/*`, `next/navigation`, `next-auth/react`.
- Must not import `lib/ai`, `lib/db/schema`, or server-only modules (e.g. `next/server`).
```

```md
<!-- app/(auth)/register/AGENTS.md -->
# AGENTS.md for `app/(auth)/register`

## Hierarchical Policy
- Inherits from `.ruler/AGENTS.md`, `app/AGENTS.md`, and `app/(auth)/AGENTS.md`.
- Encodes client-side registration page behavior.

## Domain Vocabulary
- Registration page: Client route for new users to create an account.
- Register action: `register` server action defined in `../actions`.

## Allowed Patterns
- Mark `page.tsx` as `"use client"` for form interactions.
- Use `AuthForm` and `SubmitButton` to send data to `register` server action.
- Handle success/failure via returned action state and `toast`.

## Prohibited Patterns
- No direct DB queries or `auth()` calls from `page.tsx`.
- No client-side password strength logic that conflicts with server validation; keep server as source-of-truth.
- No access to `lib/db/migrations`, `lib/db/helpers`, or `lib/ai`.

## Boundaries
- May import `../actions`, UI components, and hooks.
- Must not import server-only libraries or other route groups.
```

```md
<!-- app/(chat)/AGENTS.md -->
# AGENTS.md for `app/(chat)`

## Hierarchical Policy
- Inherits from `.ruler/AGENTS.md` and `app/AGENTS.md`.
- Represents the chat bounded context, owning chat UI, server actions, and chat-specific APIs.

## Domain Vocabulary
- Chat home: Landing view for starting a new chat.
- Chat detail: View for a specific chat thread.
- Chat model: Selected model configuration for a conversation.
- Visibility: Public/private flag controlling chat sharing.

## Allowed Patterns
- Use `actions.ts` as the single entrypoint for chat server actions (save chat model, update visibility, trim messages, etc.).
- Route components (`page.tsx`, nested routes) call server actions or `app/(chat)/api/*` endpoints, not `lib/db` directly.
- Use `lib/ai/prompts`, `lib/ai/providers`, and `lib/utils` only from server actions or API routes, not from client UI.

## Prohibited Patterns
- No direct DB queries or AI calls from client components under `app/(chat)`; these must go through actions or API routes.
- No cross-imports from `app/(auth)` UI into chat UI; auth helpers should be accessed via `auth()` or `lib`-level abstractions.
- No `process.env` access from client components.

## Boundaries
- May import:
  - `@/lib/db/queries`, `@/lib/ai/*`, `@/lib/utils`, `@/lib/types`, `@/lib/usage` from server modules (actions/API).
  - `hooks/*` and `artifacts/*` from UI modules.
- Must not be imported from other top-level directories (`lib`, `hooks`, `artifacts`).
```

```md
<!-- app/(chat)/api/AGENTS.md -->
# AGENTS.md for `app/(chat)/api`

## Hierarchical Policy
- Inherits from `.ruler/AGENTS.md`, `app/AGENTS.md`, and `app/(chat)/AGENTS.md`.
- Encapsulates server-only HTTP endpoints for chat operations.

## Domain Vocabulary
- Chat API: REST-like endpoints for chat creation, streaming, history, files, suggestions, avatar, and votes.
- Resumable stream: Streaming context for AI responses.

## Allowed Patterns
- Implement `GET`, `POST`, `DELETE`, etc. using `Request`/`NextRequest`, `Response`, `after`, and `NextResponse`.
- Use Zod schemas (e.g. `schema.ts`) at the edge to validate request bodies and search params.
- Use `auth()` to resolve the current user and enforce authorization.
- Call `lib/db/queries` for all chat and message persistence.
- Call `lib/ai` and `resumable-stream` utilities for streaming AI responses.

## Prohibited Patterns
- No `"use client"` directives; this subtree is entirely server-side.
- No React or DOM imports.
- No direct DB client, drizzle configuration, or raw SQL; use exported queries only.
- No ad-hoc AI provider instantiation; use `myProvider` and other abstractions from `lib/ai`.

## Boundaries
- May import from:
  - `@/app/(auth)/auth` for session resolution.
  - `@/lib/db/queries`, `@/lib/db/schema` (types only), `@/lib/errors`, `@/lib/types`, `@/lib/usage`, `@/lib/utils`.
  - `@/lib/ai/*`, `@/lib/artifacts/server`, and `@/lib/ai/tools/*`.
- Not imported from any other modules; access is via HTTP routing only.
```

```md
<!-- app/(chat)/api/avatar/AGENTS.md -->
# AGENTS.md for `app/(chat)/api/avatar`

## Hierarchical Policy
- Inherits from chat API policies.
- Specializes for avatar-related operations.

## Domain Vocabulary
- Avatar: User profile image stored via Vercel Blob or similar storage.
- Avatar upload: POST endpoint receiving file data and returning a blob reference.

## Allowed Patterns
- Perform authentication via `auth()` before processing user avatars.
- Delegate storage operations to appropriate SDKs (e.g. `@vercel/blob`).
- Return URLs or IDs for avatar resources via JSON responses.

## Prohibited Patterns
- No handling of arbitrary file types beyond allowed image formats.
- No DB operations here beyond linking avatar identifiers to existing user records if necessary (that logic should live in `lib/db`).

## Boundaries
- May import `@vercel/blob`, `@/app/(auth)/auth`, and DB queries/helpers as needed.
- Must conform to same server-only constraints as `app/(chat)/api`.
```

```md
<!-- app/(chat)/api/avatar/upload/AGENTS.md -->
# AGENTS.md for `app/(chat)/api/avatar/upload`

## Hierarchical Policy
- Inherits from avatar API and chat API policies.
- Represents the concrete upload endpoint.

## Domain Vocabulary
- Upload request: HTTP request containing multipart/form-data or binary upload for avatar.
- Blob result: Storage response (e.g. `PutBlobResult`).

## Allowed Patterns
- Validate file size and content type server-side.
- Use storage SDKs to persist files and return safe, opaque identifiers.
- Enforce authentication and ownership checks before changing avatars.

## Prohibited Patterns
- No client-side upload logic here; this is server-only.
- No inline HTML or React components.

## Boundaries
- Imports limited to Next.js server primitives, storage SDKs, auth helpers, and possibly DB queries to persist avatar references.
```

```md
<!-- app/(chat)/api/chat/AGENTS.md -->
# AGENTS.md for `app/(chat)/api/chat`

## Hierarchical Policy
- Inherits from chat API policies.
- Encapsulates the primary chat POST endpoint.

## Domain Vocabulary
- Chat request: Validated `PostRequestBody` with message parts and selected model.
- Message stream: SSE or streaming response using `createUIMessageStream` and `ResumableStreamContext`.
- Catalog: Model catalog derived from provider APIs.

## Allowed Patterns
- Validate request bodies via `postRequestBodySchema` from `./schema`.
- Use `unstable_cache` for expensive model catalog fetches.
- Use `streamText`, `smoothStream`, and related `ai` utilities to stream responses.
- Allocate and reuse `ResumableStreamContext` for resumable streams.
- Persist chat and message records via `lib/db/queries`.

## Prohibited Patterns
- No client-specific code; no `use client`, no React.
- No direct `fetch` calls to internal routes; internal operations are handled via DB and AI calls.
- No cross-talk with unrelated route groups; all chat-specific logic should remain in this bounded context or `lib/*`.

## Boundaries
- May import from:
  - `@/lib/ai/*`, `@/lib/db/*` (queries/schema/types), `@/lib/errors`, `@/lib/types`, `@/lib/usage`, `@/lib/utils`.
  - `../../actions` for title generation or other server actions.
- May be called only via HTTP routing; not imported directly by application code outside tests.
```

```md
<!-- app/(chat)/api/chat/[id]/AGENTS.md -->
# AGENTS.md for `app/(chat)/api/chat/[id]`

## Hierarchical Policy
- Inherits from chat API and chat directory policies.
- Scoped to operations on a single chat by ID (e.g. replay, inspection).

## Domain Vocabulary
- Chat ID: Stable UUID identifying a chat thread.
- Chat detail API: Endpoint returning chat messages and metadata.

## Allowed Patterns
- Authenticate user and ensure chat ownership before returning data.
- Read chat and message records via `getChatById`, `getMessagesByChatId`, etc.
- Serialize results as JSON using types from `lib/types`.

## Prohibited Patterns
- No write operations here beyond derived metadata; creation and updates belong to main chat POST/stream endpoints or DB services.
- No cross-chat querying unrelated to the route parameter.

## Boundaries
- May import `@/lib/db/queries`, `@/lib/db/schema` (types), `@/lib/errors`, `@/lib/utils`.
```

```md
<!-- app/(chat)/api/chat/[id]/stream/AGENTS.md -->
# AGENTS.md for `app/(chat)/api/chat/[id]/stream`

## Hierarchical Policy
- Inherits from chat API and `[id]` chat policies.
- Specializes for streaming an existing chat.

## Domain Vocabulary
- Stream handler: Server-side logic that resumes or continues a chat stream.
- Stream ID: Identifier for resumable stream segments.

## Allowed Patterns
- Use `ResumableStreamContext`, `createUIMessageStream`, and streaming helpers.
- Read chat, messages, and stream IDs via `lib/db/queries`.
- Enforce authorization using `auth()` and `ChatSDKError` for unauthorized access.

## Prohibited Patterns
- No non-streaming endpoints; this directory is dedicated to streaming.
- No client-specific logic or React code.

## Boundaries
- May import streaming utilities, DB queries, and error types as needed.
- Must conform to server-only constraints of `app/(chat)/api`.
```

```md
<!-- app/(chat)/api/document/AGENTS.md -->
# AGENTS.md for `app/(chat)/api/document`

## Hierarchical Policy
- Inherits from chat API policies.
- Encapsulates document-level operations tied to chat artifacts.

## Domain Vocabulary
- Document: Persisted artifact tied to a chat/message pair.
- Document metadata: Title, status, visibility, and other attributes.

## Allowed Patterns
- Authenticate user and enforce ownership for document operations.
- Use `lib/db/queries` and `lib/artifacts/server` to fetch or update document state.
- Return typed responses that align with `UIArtifact` / artifact types.

## Prohibited Patterns
- No AI calls here; generation and updates happen via artifact server handlers.
- No direct manipulation of artifact streaming; use the `lib/artifacts` abstractions.

## Boundaries
- May import `@/lib/db/queries`, `@/lib/artifacts/server`, `@/lib/errors`, `@/lib/types`.
```

```md
<!-- app/(chat)/api/files/AGENTS.md -->
# AGENTS.md for `app/(chat)/api/files`

## Hierarchical Policy
- Inherits from chat API policies.
- Handles file-related endpoints used in chats.

## Domain Vocabulary
- File attachment: File uploaded for use in a chat (e.g. an image).
- File metadata: MIME type, name, URL, and storage ID.

## Allowed Patterns
- Authenticate user before handling file operations.
- Validate MIME type and size for all incoming files.
- Delegate file storage and retrieval to dedicated storage SDKs or `lib/*` services.

## Prohibited Patterns
- No storing large binary blobs directly in the DB; only references/metadata.
- No serving arbitrary files without content-type and caching headers.

## Boundaries
- May import from storage SDKs, `@/lib/db/queries` (for metadata), and `@/lib/errors`.
```

```md
<!-- app/(chat)/api/files/upload/AGENTS.md -->
# AGENTS.md for `app/(chat)/api/files/upload`

## Hierarchical Policy
- Inherits from file API and chat API policies.
- Single-purpose upload endpoint for chat files.

## Domain Vocabulary
- Upload result: Response payload with file metadata and identifiers.

## Allowed Patterns
- Parse and validate upload payload; persist file to storage and reference to DB if needed.
- Return only safe, opaque URLs or IDs (no internal implementation details).

## Prohibited Patterns
- No mixing of chat message creation with upload; message creation should be a separate API or action using stored file references.

## Boundaries
- Applies same server-only import constraints as other `app/(chat)/api` routes.
```

```md
<!-- app/(chat)/api/history/AGENTS.md -->
# AGENTS.md for `app/(chat)/api/history`

## Hierarchical Policy
- Inherits from chat API policies.
- Provides listing and deletion of chat history.

## Domain Vocabulary
- Pagination: `limit`, `starting_after`, `ending_before` query params.
- History: Ordered list of chats for a given user.

## Allowed Patterns
- Validate pagination parameters and return `ChatSDKError` for invalid combinations.
- Use `getChatsByUserId` and `deleteAllChatsByUserId` from `lib/db/queries`.
- Enforce authorization via `auth()` before returning or deleting data.

## Prohibited Patterns
- No unbounded history endpoints; always enforce pagination defaults.
- No cross-user queries (must only operate on the authenticated user).

## Boundaries
- May import `@/app/(auth)/auth`, `@/lib/db/queries`, `@/lib/errors`.
```

```md
<!-- app/(chat)/api/suggestions/AGENTS.md -->
# AGENTS.md for `app/(chat)/api/suggestions`

## Hierarchical Policy
- Inherits from chat API policies.
- Serves suggestions related to chat content and artifacts.

## Domain Vocabulary
- Suggestion: AI or heuristic-based recommendation tied to a document or chat.
- Suggestion metadata: IDs, scores, and associated document IDs.

## Allowed Patterns
- Fetch suggestions via `lib/db/queries` and/or `artifacts/actions`.
- Return suggestion lists as JSON for consumption by the UI.

## Prohibited Patterns
- No AI generation inside this API; suggestion generation should be triggered via artifact tools or background processes.
- No mutation beyond marking suggestions as consumed or similar minor updates.

## Boundaries
- May import `@/lib/db/queries`, `@/lib/errors`, and artifact-related helpers as needed.
```

```md
<!-- app/(chat)/api/vote/AGENTS.md -->
# AGENTS.md for `app/(chat)/api/vote`

## Hierarchical Policy
- Inherits from chat API policies.
- Encapsulates feedback/vote endpoints for chat messages or artifacts.

## Domain Vocabulary
- Vote: Up/down or more detailed feedback on a message or artifact.
- Vote target: Entity (message, artifact, chat) being evaluated.

## Allowed Patterns
- Authenticate the requesting user.
- Use DB queries to persist votes and update any aggregated stats.
- Associate votes with specific message IDs or artifact IDs.

## Prohibited Patterns
- No anonymous voting; every vote must be tied to a user identity.
- No AI calls in this endpoint; votes are purely user-generated feedback.

## Boundaries
- May import `@/lib/db/queries`, `@/lib/db/schema` (types), and `@/lib/errors`.
```

```md
<!-- app/(chat)/chat/AGENTS.md -->
# AGENTS.md for `app/(chat)/chat`

## Hierarchical Policy
- Inherits from `.ruler/AGENTS.md`, `app/AGENTS.md`, and `app/(chat)/AGENTS.md`.
- Defines UI for viewing and interacting with chat lists/details.

## Domain Vocabulary
- Chat list: UI listing recent chats for the current user.
- Chat view: Page showing a single chat and live messages.

## Allowed Patterns
- Use hooks from `hooks/*` (e.g. `useMessages`, `useAutoResume`, `useChatVisibility`) to orchestrate state.
- Interact with `app/(chat)/api/*` endpoints via `fetch` or `ai` client hooks for streaming responses.
- Use artifacts UI (`artifacts/*/client`) to display and interact with artifacts linked to messages.

## Prohibited Patterns
- No direct imports from `lib/db/queries` or `lib/ai` in this directory; always go through APIs or server actions.
- No `process.env` usage or server-only imports (`next/server`, `fs`, etc.).

## Boundaries
- May import:
  - `@/hooks/*`, `@/artifacts/*`, `@/components/*`, `@/lib/types`, `@/lib/utils`.
- Must not import `app/(auth)` UI or other route groups directly.
```

```md
<!-- app/(chat)/chat/[id]/AGENTS.md -->
# AGENTS.md for `app/(chat)/chat/[id]`

## Hierarchical Policy
- Inherits chat UI policies.
- Scoped to a single chat detail route, keyed by `[id]`.

## Domain Vocabulary
- Route param `id`: UUID representing the chat to view.

## Allowed Patterns
- Use route parameters to select chat state and drive hooks and APIs.
- Subscribe to streaming responses and auto-scroll using `hooks/*`.

## Prohibited Patterns
- No loading of unrelated chats; only the chat identified by the route parameter should be displayed.
- No direct DB or AI imports; follow the same UI-only constraints as the parent directory.

## Boundaries
- Same allowed imports as `app/(chat)/chat`, constrained to single-chat usage.
```

```md
<!-- app/avatar/AGENTS.md -->
# AGENTS.md for `app/avatar`

## Hierarchical Policy
- Inherits from `.ruler/AGENTS.md` and `app/AGENTS.md`.
- Encapsulates avatar-related UI.

## Domain Vocabulary
- Avatar upload page: Client UI used to trigger avatar upload and preview.

## Allowed Patterns
- Use client components to select and preview avatar images.
- Call `app/avatar/upload` or `app/(chat)/api/avatar/upload` via `fetch` or form submission.

## Prohibited Patterns
- No direct storage or DB logic here; delegate to API routes.
- No `process.env` usage.

## Boundaries
- May import `@/components/*`, `@vercel/blob` client helpers (if available), and `hooks/*`.
- Must not import server-only modules.
```

```md
<!-- app/avatar/upload/AGENTS.md -->
# AGENTS.md for `app/avatar/upload`

## Hierarchical Policy
- Inherits avatar UI policies.
- Represents the concrete upload page route.

## Domain Vocabulary
- Upload result: Blob URL or ID shown to the user.

## Allowed Patterns
- Provide a `"use client"` upload UI that calls server-side upload APIs.
- Show upload progress and error feedback.

## Prohibited Patterns
- No direct `process.env` reads or DB access.
- No bypassing the server upload API.

## Boundaries
- Same UI-only boundaries as `app/avatar`, scoped to upload behavior.
```

```md
<!-- artifacts/AGENTS.md -->
# AGENTS.md for `artifacts`

## Hierarchical Policy
- Inherits from `.ruler/AGENTS.md`.
- Defines the artifact bounded context bridging chat and AI-generated structured outputs.

## Domain Vocabulary
- Artifact: Structured output attached to a chat (text, code, image, sheet).
- Artifact handler: Server logic for creating/updating artifacts.
- Artifact UI: Client components that display and manage artifacts.
- Suggestions: Per-artifact recommendations stored in the DB.

## Allowed Patterns
- Use `artifacts/actions.ts` as the server entrypoint to fetch suggestions and other artifact-related DB data.
- Delegate AI-based artifact creation/update to per-kind server handlers under `artifacts/*/server.ts`.
- Use `UIArtifact` and related shared types for communicating with UI and hooks.

## Prohibited Patterns
- No direct DB queries from artifact client components; use actions or APIs instead.
- No direct AI provider calls from client components; only server modules (`*server.ts`) may call `lib/ai`.
- No imports from `app/` to prevent cycles.

## Boundaries
- May import:
  - `@/lib/db/queries`, `@/lib/artifacts/server`, `@/lib/ai/*`, `@/lib/utils`, `@/lib/types` from server modules.
  - `@/components/*` and `@/hooks/*` from client modules.
- Must not be imported by `lib/db` or `lib/ai` (artifacts consume `lib/*`, not vice versa).
```

```md
<!-- artifacts/code/AGENTS.md -->
# AGENTS.md for `artifacts/code`

## Hierarchical Policy
- Inherits from `artifacts/AGENTS.md`.
- Specializes artifact behavior for code documents.

## Domain Vocabulary
- Code artifact: Code snippet or program generated or edited via AI.
- Code document handler: `codeDocumentHandler` in `server.ts`.
- Console output: Captured output displayed alongside code.

## Allowed Patterns
- In `server.ts`:
  - Use `streamObject` and `myProvider` to stream code and updates.
  - Use `createDocumentHandler` from `lib/artifacts/server` to register handlers.
- In `client.tsx`:
  - Use `CodeEditor`, `Console`, and artifact UI components to display and edit code.
  - Track metadata such as required handlers and console outputs.

## Prohibited Patterns
- No DB access directly from `client.tsx`; use artifact actions or chat APIs to persist changes.
- No non-code artifact types in this directory; keep concerns strictly code-related.

## Boundaries
- Server files may import `@/lib/ai/*`, `@/lib/artifacts/server`, and `zod`.
- Client files may import `@/components/*`, `@/hooks/*`, and artifact types.
```

```md
<!-- artifacts/image/AGENTS.md -->
# AGENTS.md for `artifacts/image`

## Hierarchical Policy
- Inherits from `artifacts/AGENTS.md`.
- Specializes artifact behavior for image documents.

## Domain Vocabulary
- Image artifact: Generated or referenced image associated with a chat.
- Image metadata: Size, format, and description of image outputs.

## Allowed Patterns
- In `server.ts`:
  - Use `streamObject` / `streamText` and `myProvider` as needed to orchestrate image creation prompts.
  - Use `createDocumentHandler` for `"image"` artifacts.
- In `client.tsx`:
  - Render images with safe URLs and proper accessibility attributes.
  - Allow limited metadata editing.

## Prohibited Patterns
- No binary image uploads handled here (use dedicated upload APIs).
- No DB access directly from client code.

## Boundaries
- Same server/client boundaries as `artifacts/code`, scoped to image semantics.
```

```md
<!-- artifacts/sheet/AGENTS.md -->
# AGENTS.md for `artifacts/sheet`

## Hierarchical Policy
- Inherits from `artifacts/AGENTS.md`.
- Specializes artifact behavior for spreadsheet-like documents.

## Domain Vocabulary
- Sheet artifact: Tabular data managed as an artifact.
- Sheet metadata: Columns, formulas, and summary information.

## Allowed Patterns
- In `server.ts`:
  - Use `streamObject` / `streamText` and `createDocumentHandler<"sheet">`.
- In `client.tsx`:
  - Render tables/grids and allow editing within client boundaries.

## Prohibited Patterns
- No arbitrary execution of formulas or code; treat sheet content as data, not executable logic.
- No DB operations in client code.

## Boundaries
- Same pattern as other artifact subdirectories; only server modules call `lib/ai`, clients bind UI.
```

```md
<!-- artifacts/text/AGENTS.md -->
# AGENTS.md for `artifacts/text`

## Hierarchical Policy
- Inherits from `artifacts/AGENTS.md`.
- Specializes artifact behavior for text documents.

## Domain Vocabulary
- Text artifact: Long-form text document generated or edited with AI.
- Text document handler: `textDocumentHandler` in `server.ts`.

## Allowed Patterns
- In `server.ts`:
  - Use `streamText`, `smoothStream`, and `myProvider.languageModel("artifact-model")`.
  - Use `updateDocumentPrompt` and `createDocumentHandler<"text">`.
- In `client.tsx`:
  - Display and edit text content, possibly with nav/controls for revisions.

## Prohibited Patterns
- No direct DB access from client.
- No AI calls from client; all updates should delegate to server handlers or actions.

## Boundaries
- Identical structural boundaries to other artifact type directories, with text-specific vocabulary.
```

```md
<!-- hooks/AGENTS.md -->
# AGENTS.md for `hooks`

## Hierarchical Policy
- Inherits from `.ruler/AGENTS.md`.
- Provides reusable React hooks for UI components under `app/` and `artifacts/`.

## Domain Vocabulary
- Hook: Composable React function encapsulating view logic (scrolling, visibility, chat state, artifacts).
- Chat hooks: `useMessages`, `useChatVisibility`, `useAutoResume`, etc.
- Artifact hook: `useArtifact` returning `UIArtifact` and metadata.

## Allowed Patterns
- Mark hooks as `"use client"` only when necessary (e.g. when they rely on browser APIs or `useEffect`).
- Import React primitives (`useState`, `useEffect`, `useRef`, etc.) and other hooks within this directory.
- Use types from `@/lib/types`, `@/components/*` (for types/interfaces), and `@/artifacts/*` as needed.
- Use client-side utilities such as `useSWR` for local client caching.

## Prohibited Patterns
- No direct DB or AI calls from hooks; fetch data via higher-level clients or APIs invoked by components.
- No `next/server` imports or server-only code.
- No manipulation of global browser state beyond DOM event listeners and scroll/visibility tracking.

## Boundaries
- May be imported by `app/`, `artifacts/`, and `components/`.
- Must not import from `app/` (avoid cyclic dependencies); only depend on `lib/*`, `components/*`, and other hooks.
- Must not be imported by `lib/db` or `lib/ai`.
```

```md
<!-- lib/AGENTS.md -->
# AGENTS.md for `lib`

## Hierarchical Policy
- Inherits from `.ruler/AGENTS.md`.
- Encapsulates domain logic, persistence, AI integration, and shared utilities.

## Domain Vocabulary
- Service: Any module under `lib/*` providing a typed interface to DB, AI, or shared cross-cutting concerns.
- Error type: Structured error (e.g. `ChatSDKError`) used across APIs.
- Usage tracking: App usage metrics defined in `lib/usage`.

## Allowed Patterns
- Implement pure or server-only modules that do not depend on UI/router code.
- Share types and constants across the repo via `lib/types`, `lib/constants`, `lib/errors`.
- Segment domain areas under subdirectories: `ai`, `artifacts`, `db`, `editor`, etc.

## Prohibited Patterns
- No imports from `app/`, `artifacts/`, or `hooks/` into `lib/*` except for explicitly UI-oriented modules (e.g. `lib/editor` referencing components).
- No React client hooks (`useState`, `useEffect`) in generic service modules; keep React usage isolated to clearly UI-only libraries (like `lib/editor/functions.tsx`).
- No server runtime access (e.g. filesystem) from modules that may be shared with the client.

## Boundaries
- `lib/*` is upstream of `app/`, `artifacts/`, and `hooks/*`.
- `lib/ai`, `lib/artifacts`, `lib/db`, and `lib/editor` define their own more specific boundaries in their respective `AGENTS.md` files.
```

```md
<!-- lib/ai/AGENTS.md -->
# AGENTS.md for `lib/ai`

## Hierarchical Policy
- Inherits from `.ruler/AGENTS.md` and `lib/AGENTS.md`.
- Owns AI provider configuration, model catalogs, prompts, and entitlements.

## Domain Vocabulary
- Provider: Logical wrapper around a model vendor (e.g. Gemini/OpenAI).
- Model catalog: List of supported models, capabilities, and metadata.
- Prompt: Reusable, parameterized instruction string or structure.
- Entitlement: Rules controlling which models or features are available.

## Allowed Patterns
- Configure model providers in `providers.ts` with `process.env` for secrets and auth mode.
- Define model metadata and selection logic in `models.ts`, `models.mock.ts`, and tests.
- Store prompts in `prompts.ts` and use them from server modules in `app/` and `artifacts/`.
- Expose helper functions that translate between internal and provider-specific message formats.

## Prohibited Patterns
- No imports from `app/`, `artifacts/`, or `hooks/`.
- No DB access (`lib/db/*`) directly from `lib/ai` (persisting AI usage should go through a higher-level service).
- No React or browser APIs.

## Boundaries
- May import:
  - Provider SDKs, `ai` library utilities, `@/lib/types`, `@/lib/constants`, `@/lib/usage`.
- May be imported by:
  - `app/(chat)/api/*`, server actions, and `artifacts/*/server.ts`.
```

```md
<!-- lib/ai/tools/AGENTS.md -->
# AGENTS.md for `lib/ai/tools`

## Hierarchical Policy
- Inherits from `lib/ai/AGENTS.md`.
- Encapsulates AI tool definitions used in chat and artifact flows.

## Domain Vocabulary
- AI tool: Function exposed to models via tool-calling (e.g. `create-document`, `update-document`, `request-suggestions`, `get-weather`).
- Tool schema: Zod-based input validation for tool parameters.

## Allowed Patterns
- Define tools via `tool()` helpers from the `ai` library.
- Use `zod` to validate tool inputs.
- Call domain services in `lib/artifacts/server` and `lib/db/queries` to implement tool behavior (e.g. create/update documents).
- Stream results back using `UIMessageStreamWriter` and domain types (`ChatMessage`).

## Prohibited Patterns
- No UI or React code.
- No direct access to `app/` modules.
- No environment variable access; rely on `lib/ai/providers` and `lib/constants`.

## Boundaries
- May import:
  - `@/lib/artifacts/server`, `@/lib/db/queries`, `@/lib/types`, `@/lib/utils`, `@/lib/usage`.
- May be imported only by AI orchestration code (e.g. chat API handlers, artifact server handlers), not by UI.
```

```md
<!-- lib/artifacts/AGENTS.md -->
# AGENTS.md for `lib/artifacts`

## Hierarchical Policy
- Inherits from `.ruler/AGENTS.md` and `lib/AGENTS.md`.
- Encapsulates server-side artifact orchestration.

## Domain Vocabulary
- Artifact kind: One of `"text" | "code" | "image" | "sheet"` or similar union.
- Document handler: Handler configured per artifact kind to manage creation/update.
- Artifact registry: Map of artifact kinds to handlers used by tools and APIs.

## Allowed Patterns
- Implement `createDocumentHandler` and related helpers for artifact lifecycles.
- Register handlers for each artifact type and expose them as `documentHandlersByArtifactKind`.
- Use AI providers from `lib/ai` and DB queries from `lib/db` as needed, but keep artifact-specific logic here.

## Prohibited Patterns
- No React or UI-level imports.
- No imports from `app/` or `artifacts/` UI; data flows the other direction.

## Boundaries
- May import:
  - `@/lib/ai/*`, `@/lib/db/queries`, `@/lib/db/schema`, `@/lib/types`, `@/lib/utils`.
- May be imported by:
  - `artifacts/*/server.ts`, `lib/ai/tools`, and server APIs needing artifact behavior.
```

```md
<!-- lib/db/AGENTS.md -->
# AGENTS.md for `lib/db`

## Hierarchical Policy
- Inherits from `.ruler/AGENTS.md` and `lib/AGENTS.md`.
- Owns all persistence-related schemas, queries, and helpers.

## Domain Vocabulary
- Schema: Drizzle table definitions (`chat`, `message`, `user`, `vote`, etc.).
- Query: High-level function that encapsulates one DB operation (e.g. `createUser`, `saveChat`, `getChatsByUserId`).
- Migration: Schema evolution artifact under `lib/db/migrations`.
- DBMessage/DBChat: Typed records derived from schema.

## Allowed Patterns
- Define tables and types in `schema.ts` using drizzle-orm.
- Implement queries in `queries.ts` that map business operations to schema operations.
- Use `drizzle` client configuration in a small number of server-only modules.
- Provide utilities like `generateDummyPassword` in `utils.ts` for controlled reuse.

## Prohibited Patterns
- No imports from `app/`, `artifacts/`, or `hooks/`.
- No React or browser APIs.
- No ad-hoc SQL outside the query layer; keep all DB interactions in `queries.ts` or clearly-marked helpers.
- No environment variable access outside explicit connection configuration helpers.

## Boundaries
- May import:
  - `drizzle-orm`, `postgres` clients, `@/lib/usage`, `@/lib/errors`, `@/lib/constants`.
- May be imported by:
  - `app/(auth)`, `app/(chat)/api`, `artifacts/actions`, `lib/ai/tools`, `lib/artifacts`.
- `lib/db/migrations` and `lib/db/helpers` define stricter constraints in their own `AGENTS.md`.
```

```md
<!-- lib/db/helpers/AGENTS.md -->
# AGENTS.md for `lib/db/helpers`

## Hierarchical Policy
- Inherits from `lib/db/AGENTS.md`.
- Contains legacy or migration helper scripts not intended for regular runtime usage.

## Domain Vocabulary
- Core-to-parts helper: Script used to migrate or transform older message formats.

## Allowed Patterns
- Reference schema and queries to perform one-off conversions or maintenance tasks.
- Use `dotenv` or environment variables to connect to DB in scripts (commented or tooling-only).

## Prohibited Patterns
- Must not be imported by runtime application code (only used by dev tooling or migrations).
- No UI or React code.
- No new production features implemented here.

## Boundaries
- Imports limited to `lib/db/schema`, `lib/db/queries`, and external tooling libraries.
- Enforced by static analysis: disallow `import "@/lib/db/helpers/*"` from any module outside scripts/migrations.
```

```md
<!-- lib/db/migrations/AGENTS.md -->
# AGENTS.md for `lib/db/migrations`

## Hierarchical Policy
- Inherits from `lib/db/AGENTS.md`.
- Contains migration definitions generated/used by Drizzle or migration tooling.

## Domain Vocabulary
- Migration file: Immutable description of schema change.
- Snapshot: Point-in-time representation of DB schema.

## Allowed Patterns
- Store generated migration definitions (`0001_*.json`, etc.).
- Use only by CLI tools or migration runners.

## Prohibited Patterns
- No imports from these files into runtime application code.
- No manual edits that diverge from the actual DB schema without corresponding schema updates.

## Boundaries
- Static analysis must enforce:
  - No `import "@/lib/db/migrations/*"` in any code outside migration tooling.
- May reference `schema` and DB constructs only in a tooling context.
```

```md
<!-- lib/db/migrations/meta/AGENTS.md -->
# AGENTS.md for `lib/db/migrations/meta`

## Hierarchical Policy
- Inherits from `lib/db/migrations/AGENTS.md`.
- Holds metadata generated by migration tooling (journal, snapshots).

## Domain Vocabulary
- Journal: Ordered sequence of applied migrations.
- Snapshot: Stored schema representation per migration.

## Allowed Patterns
- Generated JSON metadata only.
- Used exclusively by migration tooling.

## Prohibited Patterns
- No runtime imports or logic.
- No manual edits except via migration tools.

## Boundaries
- Same as `lib/db/migrations`: disallow imports from this directory in application/runtime code.
```

```md
<!-- lib/editor/AGENTS.md -->
# AGENTS.md for `lib/editor`

## Hierarchical Policy
- Inherits from `.ruler/AGENTS.md` and `lib/AGENTS.md`.
- Provides editor configuration and helpers for rich-text rendering, suggestions, and ProseMirror-based documents.

## Domain Vocabulary
- Document schema: ProseMirror schema used for editor content.
- Suggestion: Editor-level suggestion with associated ranges and widgets.
- Decoration: Visual marker applied to editor content.

## Allowed Patterns
- Use React and ProseMirror to render editor content and suggestion widgets.
- Import UI components like `Response` from `@/components/*` for server-side rendering to strings.
- Implement client-only utilities in `"use client"` modules when necessary (e.g. `functions.tsx`).
- Keep all editor-specific state and behavior localized to this directory.

## Prohibited Patterns
- No direct DB or AI interactions; editor should operate on already-fetched content and suggestions.
- No imports from `app/` routes; editor remains a reusable UI library.
- No `process.env` access.

## Boundaries
- May import:
  - `prosemirror-*` packages, `react`, `react-dom/server`, `@/components/*`, and local editor modules.
- May be imported by:
  - UI components under `app/` and `components/*` needing rich-text editor behavior.
- Must not be imported by `lib/db` or `lib/ai`.
```
