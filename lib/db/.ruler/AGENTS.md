<!-- path: lib/db/.ruler/AGENTS.md -->
> Inherits global rules from `.ruler/AGENTS.md` for data modeling, querying, and migrations.

# Directory: lib/db

## Hierarchical Policy

- Specialize global rules for the data/ORM layer: schema, queries, and migrations.
- Act as the single source of truth for database structure (`schema.ts`), query functions (`queries.ts`), and migration scripts (`migrations/**`).
- Own all DB connectivity and environment configuration (Drizzle/Postgres client initialization and `POSTGRES_URL` usage).
- Remain server-only; modules here must never be imported into client bundles.

## Domain Vocabulary

- Entities: `User`, `Chat`, `Message`, `Suggestion`, `Stream`, `Vote`, `Document`.
- Tables: Drizzle `pgTable` definitions plus associated indexes, primary keys, and foreign keys.
- Query helpers: Functions like `asc`, `desc`, `eq`, `gt`, `lt`, `and`, `or`, `inArray`, `count` used to express typed queries.
- Migration artifacts: SQL files and snapshot JSON under `lib/db/migrations/**` that encode schema evolution.
- `ChatSDKError`: Domain error type used to wrap DB failures with stable error codes for callers.
- `AppUsage`: JSON-serializable usage payload stored on chats (e.g., in `lastContext`).
- Helper scripts: CLI utilities like `migrate.ts` and one-off data helpers in `helpers/**`.

## Boundaries

- Only this directory may import `drizzle-orm`, `drizzle-orm/pg-core`, `drizzle-orm/postgres-js`, `postgres`, and `dotenv`.
- All database reads and writes must be expressed as exported functions in `queries.ts`; callers in `app/**` or `lib/**` must not construct raw SQL or Drizzle queries themselves.
- Query functions must be small and single-purpose (e.g., `getUser`, `createGuestUser`, `saveChat`, `getMessagesByChatId`); orchestration across multiple operations belongs in higher-level service code.
- Modules in this directory must not import from `app/**`, `artifacts/**`, `components/**`, `hooks/**`, or any UI-related code.
- Schema changes must be reflected both in `schema.ts` and in migrations under `migrations/**`; migration files are consumed only by the migration runner, never imported.
- Only `migrate.ts` and the DB client initialization path may read `process.env.POSTGRES_URL`; other modules must receive configuration via parameters or shared constants.
- DB modules must not call external HTTP APIs or AI providers; they are strictly responsible for local persistence.
- Any file that imports `lib/db/queries` must itself be treated as server-only code (route handler, server action, or `"server-only"` module).