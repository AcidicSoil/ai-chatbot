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