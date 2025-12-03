<!-- path: app/(auth)/.ruler/AGENTS.md -->
> Inherits global rules from `.ruler/AGENTS.md` and `app/.ruler/AGENTS.md` for authentication.

# Directory: app/(auth)

## Hierarchical Policy

- Own all authentication concerns: Auth.js configuration, session and JWT typing, login/register pages, and auth-specific API endpoints.
- Expose a small surface (`auth`, `signIn`, `signOut`, `handlers.GET`, `handlers.POST`) consumed by other segments; avoid leaking internal details.
- Treat login and register pages as client-only shells that call server actions or `signIn`; keep sensitive logic on the server.
- Avoid dependencies on chat, artifact, or other feature-specific code; this segment is shared infrastructure for the entire app.

## Domain Vocabulary

- `authConfig`: Shared NextAuth configuration object used to initialize Auth.js.
- `auth`: Server helper that resolves the current `Session` for the request.
- `signIn` / `signOut`: Auth.js helpers exported for use in routes, actions, and client flows.
- `UserType`: `"guest" | "regular"`; stored in the JWT and attached to `Session.user`.
- `DUMMY_PASSWORD`: Constant used to prevent user enumeration via timing attacks.
- `Auth pages`: The `login` and `register` pages orchestrating credential and guest flows.

## Boundaries

- `app/(auth)` is the only place where `NextAuth` is instantiated; no other file may call `NextAuth(...)` or configure providers.
- This segment may import `@/lib/db/queries` and `@/lib/db/utils` for user lookup and password hashing but must not import from `app/(chat)` or `artifacts/**`.
- Client auth pages must not import `lib/db/queries` directly; they call server actions or `signIn` and interpret result status for feedback.
- API routes under `app/(auth)/api/**` may re-export `{ GET, POST }` from `auth` or call `signIn` / `signOut`, but must not reimplement JWT/session parsing.
- Password hashing and comparison must go through `bcrypt-ts` and shared helpers (`generateHashedPassword`, `DUMMY_PASSWORD`); no raw crypto primitives or ad hoc hashing.
- Session and JWT typing changes belong only in `app/(auth)/auth.ts`; other modules treat `Session.user.id` and `Session.user.type` as canonical.
- `lib/db/**` and other `lib/**` modules must not import from `app/(auth)`; dependencies are strictly top-down: features → auth → DB.
- New authentication flows (OAuth providers, magic links, guest variants) must be added here, keeping the rest of the app dependent only on the exported `auth` API.