# AGENTS.md for `artifacts`

## Hierarchical Policy

- MUST inherit global rules from `.ruler/AGENTS.md`.
- OWNS the logic for specific artifact types (Code, Sheet, Text).

## Domain Vocabulary

- **Artifact Kind**: The type of content (`code`, `sheet`, `text`).
- **Handler**: Server-side logic to generate/update an artifact (`server.ts`).
- **Editor**: Client-side component to display/edit the artifact (`client.tsx`).

## Server vs Client Separation

- MUST strictly separate server generation logic (`server.ts`) from client rendering logic (`client.tsx`).
- `client.tsx` files MUST start with `"use client"`.
- `server.ts` handlers MUST use `streamObject` or similar AI SDK functions to generate content.

## State Management

- Client components MUST accept initial state and subscribe to stream updates.
- SHOULD use `useSWR` or similar for client-side artifact state synchronization.

## Boundaries

- Artifact handlers MUST NOT import `app/` code.
- MUST use `lib/artifacts/server` for shared persistence logic.
