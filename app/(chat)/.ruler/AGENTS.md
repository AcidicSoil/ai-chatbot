# AGENTS.md for `app/(chat)`

## Hierarchical Policy

- MUST inherit rules from `app/AGENTS.md`.
- OWNS the chat interface, message streaming, and interaction with AI artifacts.

## Domain Vocabulary

- **Chat**: A conversation thread containing Messages.
- **Visibility**: Access control level (private vs. public).
- **DataStream**: The channel for streaming tokens and tool calls from Server to Client.

## AI & Streaming Rules

- MUST use `ai` SDK hooks (`useChat`, `useCompletion`, or custom streams) for message interaction.
- Route Handlers (e.g., `/api/chat`) MUST verify user session before processing requests.
- Chat pages MUST handle "404 Not Found" for private chats belonging to other users.

## Boundaries

- MUST NOT perform direct DB queries in Client Components; use Server Actions or pass data from Server Components.
- SHOULD delegate artifact rendering to `artifacts/` modules but manage the container in `app/(chat)`.
