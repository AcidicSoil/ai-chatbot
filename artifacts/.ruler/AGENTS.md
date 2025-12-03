# Directory: artifacts

## Hierarchical Policy

- This directory inherits global rules from `.ruler/AGENTS.md` and specializes them for artifact-centric UX (text, code, sheet).
- Owns:
  - Client components for artifact editing and display (`artifacts/**/client.tsx`).
  - Server modules for generating and updating artifacts (`artifacts/**/server.ts`).
  - Integration with the document persistence layer via `lib/artifacts/server` and `lib/db/queries`.
- Coordinates:
  - Streaming generation and update flows powered by AI models configured under `lib/ai`.

## Domain Vocabulary

- `ArtifactKind`: `"text" | "code" | "sheet"`.
- `DocumentHandler<T>`: Interface describing how to create and update artifacts of a specific kind.
- `createDocumentHandler`: Factory in `lib/artifacts/server` to assemble typed handlers.
- `UIMessageStreamWriter<ChatMessage>`: Stream channel for sending incremental artifact updates to the client.
- `draftContent`: The generated or updated artifact body before persistence.

## Allowed Patterns

### Artifact server modules (`artifacts/**/server.ts`)

1. Handler structure:
   - Each artifact kind defines a server module that:
     - Calls `createDocumentHandler` with `{ kind, onCreateDocument, onUpdateDocument }`.
     - Uses AI streaming APIs (`streamObject` / `generateText`, etc.) to produce content.
     - Writes interim deltas to `dataStream` for immediate UI feedback.
   - `onCreateDocument` and `onUpdateDocument` must:
     - Accept typed arguments (ids, titles, descriptions, session).
     - Return the final artifact content (string) to be persisted by `lib/artifacts/server`.
2. Persistence:
   - Defer persistence to the `createDocumentHandler` wrapper in `lib/artifacts/server`, which calls `saveDocument` from `lib/db/queries`.
   - Do not call `saveDocument` directly from artifact-specific modules.

### Artifact client modules (`artifacts/**/client.tsx`)

1. Client-only:
   - Mark client components with `"use client"` where they use hooks.
   - Display streamed deltas and final content via props and context from the server side.
2. Behavior:
   - Keep client components focused on presentation, editing controls, and event wiring.
   - All heavy business logic and AI calls stay in server modules or `lib/**`.

### Integration with chat and documents

1. When invoked from chat flows:
   - Treat artifact generation as side-effect of chat interaction.
   - Provide chat context (messages, user/session) as inputs to handlers; avoid having handlers fetch chat data themselves.
2. Document identity:
   - Artifact handlers operate on `Document` entities defined in `lib/db/schema`.
   - Use document ids and metadata passed in from callers; no direct DB queries from this directory.

## Prohibited Patterns

1. No direct DB writes:
   - Do not import `drizzle-orm`, `postgres`, or `lib/db/queries` into top-level artifact modules (except `lib/artifacts/server`, which is already part of lib).
2. No auth or session configuration:
   - Do not import or call `NextAuth` configuration; rely on `Session` passed into server handlers.
3AI. No AI provider wiring:
   - Do not configure models or providers here; use `myProvider` and factory functions from `lib/ai`.

## Boundaries

- Allowed dependencies:
  - From `artifacts/**` into:
    - `@/lib/ai/prompts`, `@/lib/ai/providers`.
    - `@/lib/artifacts/server` for handler composition.
    - `@/lib/db/schema` and `@/lib/db/queries` only via `lib/artifacts/server`.
    - `@/components/**` for shared UI, `@/lib/types` for shared domain types.
- Forbidden dependencies:
  - Direct imports from `app/(chat)` or `app/(auth)`; communication must flow via function calls and props from callers.
  - Imports from `lib/db/migrations` or CLI helper scripts.
- Ownership:
  - Artifact UX and streaming behavior are owned here; chat pages must not reimplement artifact generation logic inline.
