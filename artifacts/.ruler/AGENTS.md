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