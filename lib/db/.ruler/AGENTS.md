# AGENTS.md for `lib/db`

## Hierarchical Policy

- MUST inherit global rules from `.ruler/AGENTS.md`.
- ACTS AS the single source of truth for data persistence and schema definitions.

## Domain Vocabulary

- **Schema**: Drizzle table definitions (`schema.ts`).
- **Query**: Typed function exporting database operations (`queries.ts`).
- **Migration**: SQL file managing schema changes.

## ORM modeling & access

- Files in this directory MUST contain `import "server-only"` to prevent client bundle leakage.
- MUST define all tables in `schema.ts`.
- MUST use Drizzle's `eq`, `and`, `or` helpers for type-safe queries.
- `queries.ts` MUST export async functions for all DB operations; do not export the raw `db` instance to the app.

## Boundaries

- MUST NOT import React components or hooks.
- MUST NOT import from `app/`.
- MAY import `lib/utils` or `lib/types`.
