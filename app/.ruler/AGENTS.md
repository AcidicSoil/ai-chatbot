# AGENTS.md for `app`

## Hierarchical Policy

- MUST inherit global rules from `.ruler/AGENTS.md`.
- specialized rules for route organization and session management apply here.

## Domain Vocabulary

- **Route Group**: Folders in parentheses like `(auth)` or `(chat)` used to organize routes without affecting URL paths.
- **Layout**: `layout.tsx` file providing shared UI (sidebar, providers) for a subtree.

## Next.js App Router conventions

- MUST NOT use `pages/` directory conventions (e.g., `_app.tsx`, `getServerSideProps`).
- SHOULD use `Suspense` boundaries for async parts of the UI to enable streaming.
- Route params MUST be typed (e.g., `params: Promise<{ id: string }>`).

## Boundaries

- Pages MUST NOT directly access `process.env` for secrets; use accessor functions or server-only constants.
- Client-side navigation MUST use `next/link` or `useRouter`.
