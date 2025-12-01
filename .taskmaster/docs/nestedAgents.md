Architecture derived from the current `lib`/DB implementation and existing Ruler policies under `.ruler` and `src`.

---

```md
# AGENTS.md for `/`

## Hierarchical Policy
- Inherits system-wide architectural rules from `.ruler/AGENTS.md` (fetch via loaders, server work in server functions, URL as state, effects only for true side effects).
- Defines the global layering model: UI (`src/**`, `app/**`), application services (`src/server/**`, `lib/ai/**`, `lib/artifacts/**`), and infrastructure (`lib/db/**`, `lib/**`).
- Child directories may narrow allowed imports and patterns but may not relax global rules on data fetching, server-only work, or side-effect usage.

## Domain Vocabulary
- UI surface: React components, routes, and layouts under `src/**` and `app/**`.
- Server function: HTTP-agnostic server entrypoints invoked from routes or client via RPC.
- Domain model: `User`, `Chat`, `Message`, `Document`, `Suggestion`, `Stream`, `Vote`.
- Artifact: Long-lived content entity in “text”, “code”, or “sheet” form, editable via artifacts UI.
- AI orchestration: Model selection, prompts, tools, and usage tracking for chat and artifacts.
- Persistence layer: Drizzle + Postgres schema, queries, and migrations.

## Allowed Patterns
- UI layers depend on application services (`src/server/**`, `lib/ai/**`, `lib/artifacts/**`) and read/write state only through those surfaces or `lib/db/queries`.
- Application services depend on infrastructure (`lib/db/**`, `lib/constants`, `lib/errors`, `lib/types`, `lib/utils`, `lib/usage`) and external SDKs.
- Infrastructure never depends on UI modules or React; only on environment, DB, crypto, and pure utilities.
- Path aliases are used for cross-tree imports (e.g., `@/lib/...`, `@/components/...`) instead of deep relative paths.
- Errors propagate as structured `ChatSDKError` instances and are converted to HTTP responses at boundaries, not inside core business logic.

## Prohibited Patterns
- Data fetching, auth, or business logic in `useEffect` or other client-side lifecycle hooks that should be handled by loaders/server functions.
- Direct database access (`postgres`, `drizzle-orm`) outside `lib/db/**`.
- UI modules importing from `lib/db/migrations` or `lib/db/helpers`.
- Circular dependencies between layers (UI ↔ services, services ↔ DB).
- Cross-cutting singletons created in UI modules (e.g., global DB clients, providers).

## Boundaries
- `src/**` may import from `lib/**` and `src/server/**` but not vice versa.
- `lib/db/**` is the only layer allowed to construct DB clients and run SQL; all other code must call exported query functions.
- `lib/**` may only use type-only imports (`import type`) from `@/components/**` or `@/app/**`; runtime imports are prohibited except where explicitly allowed by a child directory.
- Environment variables are read only in infrastructure and server-entry code, not in generic UI components.
```

---

```md
# AGENTS.md for `src`

## Hierarchical Policy
- Inherits global rules from `.ruler/AGENTS.md` and repository root.
- Specializes the UI layer: React components, routes, and client/server boundaries.
- Child directories (`src/routes`, `src/server`, `src/db`, `src/components`, `app/**`) define more specific conventions.

## Domain Vocabulary
- Route component: File-based route or page that defines navigation, loaders, and UI.
- Client-only shell: UI tree that must only render on the client to avoid hydration mismatch.
- Query: TanStack Query-style server state binding into UI.
- Mutation: State-changing operation that writes through a server function or DB-backed API.
- Typed link: Router-aware navigation with strongly typed params and search.

## Allowed Patterns
- Use environment helpers (`ClientOnly`, `createIsomorphicFn`, `createServerOnlyFn`, `createClientOnlyFn`) to separate server/client code paths and avoid hydration issues.
- Data fetching in UI is driven via:
  - Route loaders and server functions.
  - Query hooks configured in `lib/**` (for reusable resource queries).
- Mutations call a server function or route handler, then invalidate queries or router state.
- All navigation goes through typed router APIs (e.g., `Link`, `useNavigate`, typed paths), not arbitrary string routes.
- UI state that is part of navigation is stored in the URL (search params, params, hash).

## Prohibited Patterns
- Fetching domain data in `useEffect` when it should be handled in loaders or server functions.
- Direct imports of `drizzle-orm` or `postgres` in `src/**`.
- Reading environment variables directly from UI components.
- Using ad-hoc `fetch` calls to hit the DB or internal services instead of server functions or `lib/ai`/`lib/artifacts` interfaces.

## Boundaries
- `src` may depend on `lib/**` but `lib/**` must not import runtime code from `src/**`.
- Server-only utilities in `src` (e.g., under `src/server/**`) must never be imported from client-only components.
- Query/mutation hooks live in `src` or reusable `lib` modules but always encapsulate network/DB details behind server functions or `lib/db/queries`.
```

---

```md
# AGENTS.md for `src/routes`

## Hierarchical Policy
- Inherits UI rules from `src/AGENTS.md` and global `.ruler/AGENTS.md`.
- Specializes file-based routing and HTTP handler behavior for server routes.

## Domain Vocabulary
- Server route: File in `src/routes` that defines HTTP handlers (GET/POST/PUT/DELETE) for a path.
- Layout route: Pathless or grouped route that provides middleware and shared behavior for children.
- Params: Typed route parameters (`$id`, `$postId`, `_splat`) mapped from URL segments.
- Route handler: Function receiving `{ request, params, context }` and returning a `Response`.

## Allowed Patterns
- Define routes using the router’s file-based API with one handler set per resolved path.
- Use HTTP verb-specific handlers (GET, POST, PUT, DELETE, PATCH) with explicit handling of body and headers.
- Parse bodies using `request.json()`, `request.text()`, or `request.formData()`; validate input with zod or equivalent.
- Delegate business logic to server functions (`src/server/function/**`) or service modules in `lib/**`.
- Return `Response` objects or use helper utilities to set status codes and headers.

## Prohibited Patterns
- Multiple handlers for the same resolved path (e.g., conflicting `users.ts` vs `users/index.ts`).
- Direct DB access from routes; routes must go through server functions or `lib/db/queries`.
- Embedding complex business rules directly inside route handlers instead of delegating to services.
- Using `any` for route params or request bodies.

## Boundaries
- `src/routes/**` may import:
  - Server functions from `src/server/function/**`.
  - Service modules from `lib/**`.
- `src/routes/**` must not import:
  - `lib/db/migrations/**` or `lib/db/helpers/**`.
  - UI-only components that require client-only rendering without wrapping them in a client-only boundary.
```

---

```md
# AGENTS.md for `src/db/schema`

## Hierarchical Policy
- Inherits infrastructure rules from root and `src/AGENTS.md`.
- Narrows to schema description for any `src/db`-scoped models that mirror or wrap `lib/db` schema.

## Domain Vocabulary
- Schema module: File with naming pattern `<name>.schema.ts`, exporting typed descriptions of domain entities.
- Projection: Subset or view of base entities (`User`, `Chat`, `Document`, etc.) tailored for specific features.

## Allowed Patterns
- Define schemas in files matching `<name>.schema.ts`.
- Export only types, interfaces, and stateless helpers for mapping between DB models and UI models.
- Keep modules side-effect-free and environment-agnostic (no reads of `process.env`, no global I/O).

## Prohibited Patterns
- Direct DB access in schema files.
- React components or hooks in any `*.schema.ts` file.
- Importing UI components or browser-only APIs into schema modules.

## Boundaries
- Schema modules may import:
  - Types from `lib/db/schema` or other pure type modules.
  - Zod or validation libraries.
- Schema modules must not import:
  - `drizzle-orm/postgres-js` or `postgres`.
  - Any `src/routes/**` or `src/server/function/**` modules.
```

---

```md
# AGENTS.md for `src/server/function`

## Hierarchical Policy
- Inherits server rules from `src/AGENTS.md` and global `.ruler/AGENTS.md`.
- Specializes server-only functions used as RPC-style entrypoints from UI and routes.

## Domain Vocabulary
- Server function: `createServerFn`-style definition that runs only on the server, callable from client or other server code.
- Input validator: Zod or equivalent schema enforcing runtime input shape.
- Context: Request-scoped environment (headers, cookies, sessions, custom context).

## Allowed Patterns
- Define server functions using the framework’s server-function API with explicit `{ method }` and `.inputValidator`.
- Encapsulate business logic (validation, auth checks, coordination of DB calls) in server functions, leaving routes thin.
- Use context utilities for headers, cookies, sessions, and response status/headers.
- Return primitives, JSON, or `Response` objects; use redirects and not-found helpers to signal control flow to the router.
- Support no-JS forms by wiring `<form action={serverFn.url}>` and encoding arguments appropriately.

## Prohibited Patterns
- Calling server functions from within `useEffect` purely to fetch initial data that belongs in loaders.
- Bypassing validators or using deprecated `.validator()` APIs.
- Performing DB migrations, schema changes, or long-running background jobs directly in server functions.
- Reading arbitrary global state outside the request context.

## Boundaries
- Server functions may depend on:
  - `lib/db/queries` and `lib/db/schema` for persistence.
  - `lib/ai/**` for model calls and tools.
  - `lib/errors` for consistent error types.
- Server functions must not:
  - Import client-only components or hooks.
  - Depend on `lib/editor/**` (editor integration belongs in UI or artifacts layer).
```

---

```md
# AGENTS.md for `lib`

## Hierarchical Policy
- Inherits infrastructure and domain rules from root and `.ruler/AGENTS.md`.
- Defines shared library layer: cross-cutting types, errors, AI orchestration, DB, artifacts, and editor support.:contentReference[oaicite:2]{index=2}
- Child directories (`lib/ai`, `lib/artifacts`, `lib/db`, `lib/editor`, etc.) further narrow patterns.

## Domain Vocabulary
- Core types: `ChatMessage`, `ChatTools`, `CustomUIDataTypes`, `AppUsage`.
- Error model: `ChatSDKError` with `ErrorType`, `Surface`, `ErrorCode`, and response visibility.
- Environment flags: `isProductionEnvironment`, `isDevelopmentEnvironment`, `isTestEnvironment`, `guestRegex`, `DUMMY_PASSWORD`.
- Utilities: `cn`, `fetcher`, `fetchWithErrorHandlers`, `generateUUID`, message/document helpers.

## Allowed Patterns
- Keep modules side-effect-light and reusable across server and client where appropriate.
- Route error handling through `ChatSDKError` and central mapping functions (`getMessageByErrorCode`, `getStatusCodeByType`).
- Use `fetcher`/`fetchWithErrorHandlers` as the standard HTTP wrapper to convert error responses into typed errors.
- Prefer `import type` for cross-layer type dependencies (e.g., pulling types from components or `app/**`).
- Utilities like `cn`, `generateUUID`, and message conversion functions (`convertToUIMessages`, `getTextFromMessage`) remain pure and deterministic.

## Prohibited Patterns
- React components, hooks, or JSX in generic `lib` modules (except where a child directory explicitly allows it, e.g., `lib/editor`).
- Direct `process.env` access outside configuration-focused modules (e.g., `constants.ts`).
- Persistent side effects (DB writes, filesystem I/O) in generic helpers; those belong in DB or server-function layers.
- Importing from `src/routes/**` or other UI paths.

## Boundaries
- `lib/**` may import:
  - External libraries (`ai`, `zod`, `date-fns`, `clsx`, `tailwind-merge`, etc.).
  - Other submodules within `lib/**`.
- `lib/**` may only import types (using `import type`) from:
  - `@/components/**`
  - `@/app/**`
- Runtime imports from UI (`@/components/**`, `@/app/**`) are forbidden except inside `lib/editor/**`, which declares its own override.
- `lib/**` must not import from `src/routes/**` or `src/server/function/**`.
```

---

```md
# AGENTS.md for `lib/ai`

## Hierarchical Policy
- Inherits shared-library rules from `lib/AGENTS.md`.
- Specializes AI model orchestration, prompts, and entitlement logic.:contentReference[oaicite:3]{index=3}

## Domain Vocabulary
- Chat model: `{ id, name, description }` entries in `chatModels` and `DEFAULT_CHAT_MODEL`.
- Provider: `myProvider` constructed from real gateway models or mock models in tests.
- Entitlement: Per-`UserType` limits (`maxMessagesPerDay`, `availableChatModelIds`).
- System prompt: Model-specific prompt assembly (`systemPrompt`, `codePrompt`, `sheetPrompt`, `artifactsPrompt`).
- Request hints: Location metadata (`latitude`, `longitude`, `city`, `country`) used to enrich prompts.

## Allowed Patterns
- Define all supported models and IDs centrally in `chatModels` and providers; reuse IDs across UI and services.
- Encapsulate provider wiring (`gateway.languageModel`, `wrapLanguageModel`, middleware) in this layer, not in UI or routes.
- Keep entitlement decisions (`entitlementsByUserType`) deterministic and stateless given `UserType`.
- Build prompts via pure string composition functions using strongly-typed inputs (`RequestHints`, `ArtifactKind`).
- Tests (`models.test.ts`) may use mock `LanguageModel` implementations and explicit `simulateReadableStream` helpers.

## Prohibited Patterns
- Direct DB access inside `lib/ai` (suggestions and documents must go through tools that call `lib/db/queries`).
- Reading HTTP request/response context directly here; this layer is transport-agnostic.
- Model IDs hardcoded in UI or routes; they should reference definitions exported from this directory.

## Boundaries
- `lib/ai/**` may depend on:
  - `lib/constants`, `lib/types`, `lib/usage`.
  - `lib/ai/models.mock` in tests only.
  - Gateway SDKs (`@ai-sdk/gateway`) and `ai` library helpers.
- `lib/ai/**` must not:
  - Import React or UI components.
  - Import from `src/routes/**` or `src/server/function/**`.
- Type-only imports from `@/app/**` (e.g., `UserType`) are allowed; runtime imports are not.
```

---

```md
# AGENTS.md for `lib/ai/tools`

## Hierarchical Policy
- Inherits AI orchestration rules from `lib/ai/AGENTS.md` and shared-library rules from `lib/AGENTS.md`.
- Specializes individual AI “tools” exposed to the chat runtime (`tool(...)` definitions).:contentReference[oaicite:4]{index=4}

## Domain Vocabulary
- AI tool: `tool({ description, inputSchema, execute })` object used via `InferUITool` in chat.
- Data stream: `UIMessageStreamWriter<ChatMessage>` used for incremental UI updates (`data-kind`, `data-id`, `data-title`, `data-suggestion`, `data-finish`).
- Artifact handler: Document handler for `text`, `code`, or `sheet` artifact kinds.
- Suggestion: Text-level editing hint stored as `Suggestion` in DB and projected into UI.

## Allowed Patterns
- Each file defines a single conceptual tool (e.g., `create-document`, `update-document`, `get-weather`, `request-suggestions`).
- Use `z.object` / `zod` schemas to validate tool input and drive strong typing.
- Persist documents and suggestions through `lib/db/queries` (e.g., `saveDocument`, `getDocumentById`, `saveSuggestions`).
- Use `dataStream.write` to send transient UI messages while work is in progress; finalize with `data-finish`.
- For external APIs (e.g., weather, geocoding), use `fetch` with clear error handling and user-safe error messages.

## Prohibited Patterns
- Tools performing UI rendering or importing React components.
- Tools directly manipulating router or navigation state; they only compute and persist data.
- Inline SQL or direct `postgres` usage.
- Swallowing errors silently; errors should return structured error payloads or throw `ChatSDKError` from lower layers.

## Boundaries
- `lib/ai/tools/**` may import:
  - `tool`, `streamObject`, and streaming primitives from `ai`.
  - `Session` from `next-auth` (types only).
  - `lib/artifacts/server` for artifact handlers.
  - `lib/db/queries`, `lib/db/schema`, `lib/utils`, `lib/types`, `lib/ai/providers`.
- `lib/ai/tools/**` must not:
  - Import from `src/routes/**`, `src/components/**`, or `app/**`.
  - Depend on `lib/editor/**`.
```

---

```md
# AGENTS.md for `lib/artifacts`

## Hierarchical Policy
- Inherits shared-library rules from `lib/AGENTS.md`.
- Specializes artifact persistence and server-side document handling.:contentReference[oaicite:5]{index=5}

## Domain Vocabulary
- Artifact kind: `"text" | "code" | "sheet"` (`artifactKinds`).
- Document handler: `{ kind, onCreateDocument, onUpdateDocument }` contract per artifact type.
- Draft content: Artifact content generated or updated before being persisted.
- Save operation: `saveDocument({ id, title, kind, content, userId })` call into DB.

## Allowed Patterns
- Create handlers via `createDocumentHandler({ kind, onCreateDocument, onUpdateDocument })` to ensure consistent persistence behavior.
- Always persist artifacts when `session.user.id` is available; skip persistence when unauthenticated.
- Treat `UIMessageStreamWriter` as the only channel for streaming UI updates during create/update flows.
- Keep this layer server-only (may rely on `Session`, DB queries, and file I/O if needed).

## Prohibited Patterns
- React components, hooks, or client-only logic in artifact handlers.
- Direct route or router-level concerns (navigation, redirects); these belong to routes or server functions.
- Writing to the database outside the standardized `saveDocument` path.

## Boundaries
- `lib/artifacts/**` may import:
  - `saveDocument` and `Document` from `lib/db`.
  - `ArtifactKind` from shared types.
  - `Session` from `next-auth` (types).
  - `ChatMessage` and `UIMessageStreamWriter` from `lib/types`.
- `lib/artifacts/**` must not:
  - Import UI components or `src/routes/**`.
  - Depend on `lib/editor/**` directly; editor-specific logic belongs in UI.
```

---

```md
# AGENTS.md for `lib/db`

## Hierarchical Policy
- Inherits infrastructure rules from root and `lib/AGENTS.md`.
- Defines the sole persistence layer using Drizzle and Postgres.:contentReference[oaicite:6]{index=6}

## Domain Vocabulary
- Entities: `User`, `Chat`, `Message`, `Message_v2`, `Vote`, `Vote_v2`, `Document`, `Suggestion`, `Stream`.
- Schema: Drizzle `pgTable` definitions in `schema.ts`.
- Query: Exported async function encapsulating a DB operation (`getUser`, `createUser`, `getChatsByUserId`, `saveDocument`, etc.).
- Migration: SQL files under `migrations/**` and metadata under `migrations/meta/**`.
- Stream ID: Logical association between streaming responses and chats.

## Allowed Patterns
- Declare all DB tables in `schema.ts` using Drizzle’s `pgTable`, `uuid`, `text`, `timestamp`, `json/jsonb`, `boolean`, and foreign keys.
- Use a single `postgres` client and `drizzle` instance per module (`queries.ts`), not scattered clients.
- Prefix DB entrypoints with clear verbs: `get*`, `save*`, `create*`, `delete*`, `update*`, `vote*`.
- Catch DB errors and rethrow as `ChatSDKError` with surface `database` and specific messages.
- Mark server-only modules with `"server-only"` to prevent accidental client bundling where appropriate (e.g., `queries.ts`).

## Prohibited Patterns
- React usage, UI imports, or client-only APIs (`window`, `navigator`) in this directory.
- Direct usage of DB functions from client components; calls must go through server functions or tools.
- Hidden side effects like logging sensitive data; logs must never include credentials or raw secrets.
- Inlining SQL directly in non-migration code when Drizzle API would suffice.

## Boundaries
- `lib/db/schema.ts`:
  - May only export table definitions and types; no queries.
- `lib/db/queries.ts`:
  - May import from `schema`, `utils` (UUID/password helpers), `errors`, and `usage`.
  - Must not import from UI modules or `lib/editor/**`.
  - Type-only imports from `@/components/**` (e.g., `ArtifactKind`, `VisibilityType`) are allowed.
- `lib/db/utils.ts`:
  - Responsible for password hashing and dummy password generation; must never log raw passwords.
- `lib/db/migrate.ts`:
  - Node-only script that reads `POSTGRES_URL`, sets up `drizzle`, and runs migrations; not imported from runtime code.
```

---

```md
# AGENTS.md for `lib/db/helpers`

## Hierarchical Policy
- Inherits DB-layer rules from `lib/db/AGENTS.md`.
- Specializes ad-hoc migration and transformation scripts that operate on existing data.:contentReference[oaicite:7]{index=7}

## Domain Vocabulary
- Migration helper: Script that reads legacy schemas and writes into new schemas.
- Message migration: Converting legacy `Message` content into `Message_v2` parts and votes.

## Allowed Patterns
- Scripts here may connect to the DB, read/write batches of rows, and be executed manually as one-off tools.
- Use Drizzle clients and `postgres` connections scoped to the script.
- Encapsulate migration logic in functions; keep top-level executable wrapper minimal and clearly marked.

## Prohibited Patterns
- Importing helpers here from application runtime paths; helpers should not be used as part of normal request handling.
- Including UI or React-related code.
- Introducing new domain entities; these scripts work only with existing schemas.

## Boundaries
- `lib/db/helpers/**` may import from `lib/db/schema`, `lib/db/queries`, and external libraries (`ai`, Drizzle).
- No module under `src/**` or `lib/ai/**` may import from `lib/db/helpers/**`.
```

---

```md
# AGENTS.md for `lib/db/migrations`

## Hierarchical Policy
- Inherits DB-layer rules from `lib/db/AGENTS.md`.
- Specializes versioned DDL and schema evolution.:contentReference[oaicite:8]{index=8}

## Domain Vocabulary
- Migration file: `NNNN_name.sql` file applied in order to evolve the DB schema.
- Journal: `_journal.json` tracks applied migrations and timestamps.
- Snapshot: `meta/NNNN_snapshot.json` stores Drizzle’s view of the schema at a point in time.

## Allowed Patterns
- Use SQL migrations to create/alter/drop tables and constraints in a forward-only fashion.
- Keep migrations idempotent and safe to run multiple times where possible.
- Add foreign keys, indexes, and constraints through migrations, not ad-hoc in code.

## Prohibited Patterns
- Importing or referencing application code in SQL; migration files must remain DB-only.
- Editing historical migrations that have already shipped; instead, create new ones.
- Embedding business logic or seed data that should live at the application level.

## Boundaries
- `lib/db/migrations/**` is consumed only by migration tooling (`lib/db/migrate.ts` and Drizzle CLI).
- No runtime module (`src/**`, `lib/ai/**`, `lib/artifacts/**`) may import these files.
```

---

```md
# AGENTS.md for `lib/db/migrations/meta`

## Hierarchical Policy
- Inherits migration rules from `lib/db/migrations/AGENTS.md`.
- Specializes Drizzle’s schema metadata snapshots.:contentReference[oaicite:9]{index=9}

## Domain Vocabulary
- Snapshot: JSON representation of tables, enums, and relationships at a migration step.
- Meta journal: `_journal.json` listing migration tags and timestamps.

## Allowed Patterns
- Store only data generated by migration tools; treat files as read-only artifacts.
- Keep snapshots consistent with actual migrations; updates occur via tooling, not manual editing.

## Prohibited Patterns
- Manual editing of snapshot JSON outside the migration toolchain.
- Application code reading or relying on these JSON files at runtime.

## Boundaries
- Only migration tooling and DB maintenance scripts may read or write `meta/**`.
- No `src/**` or `lib/**` runtime module may depend on these files.
```

---

```md
# AGENTS.md for `lib/editor`

## Hierarchical Policy
- Inherits shared-library rules from `lib/AGENTS.md` but explicitly allows controlled UI integration.
- Specializes rich-text editor configuration, diffing, and suggestion visualization.:contentReference[oaicite:10]{index=10}

## Domain Vocabulary
- Document schema: ProseMirror `Schema` (`documentSchema`) for paragraphs, lists, headings, and marks.
- Transaction handler: `handleTransaction` that applies ProseMirror transactions and triggers persistence.
- Diff type: `DiffType.Unchanged | DiffType.Deleted | DiffType.Inserted` used for visual diffs.
- Suggestion: `UISuggestion` with selection range, highlight decoration, and inline widget.
- React renderer: `ReactRenderer` wrapper around `createRoot` for rendering React content into ProseMirror decorations.

## Allowed Patterns
- Keep editor state management and ProseMirror logic inside this directory.
- Use decorations (`Decoration`, `DecorationSet`) and plugins (`Plugin`, `PluginKey`) to render suggestions and highlights.
- Render suggestion widgets and response markup via React components from `@/components/**`, but only as DOM widgets inside the editor.
- Treat `handleTransaction` as the canonical place to convert editor changes into markdown/plaintext for persistence.
- Ensure editor modules are client-only where necessary (e.g., `functions.tsx` marked `"use client"`).

## Prohibited Patterns
- Direct DB access or network calls from editor code.
- Business logic about documents (permissions, ownership, visibility) in this layer; only visual and interaction logic is allowed.
- Reading environment variables or using server-only APIs.

## Boundaries
- `lib/editor/**` may import:
  - ProseMirror core packages (`prosemirror-model`, `prosemirror-state`, `prosemirror-view`, `prosemirror-inputrules`, `prosemirror-markdown`, `prosemirror-schema-basic`, `prosemirror-schema-list`).
  - React, `react-dom/client`, and typed models from `@/lib/db/schema`.
  - UI components used as inline widgets (`@/components/elements/response`, `@/components/suggestion`).
- `lib/editor/**` must not:
  - Import from `lib/db/queries` or perform persistence directly.
  - Import from `src/routes/**` or server functions.
  - Be imported into server-only modules; usage should be limited to client-capable components.
```
