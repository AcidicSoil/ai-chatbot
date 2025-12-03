# Directory: app/(auth)

## Hierarchical Policy

- This directory inherits global rules from `.ruler/AGENTS.md` and specializes them for authentication and session management.
- Owns:
  - NextAuth configuration and handler exports (`auth.config.ts`, `auth.ts`).
  - Auth-related pages (`login`, `register`).
  - Auth-related API endpoints under `app/(auth)/api/**`.
- Exposes:
  - `auth`, `signIn`, `signOut`, `handlers.GET`, `handlers.POST` as the only entry-points other segments may use.

## Domain Vocabulary

- `UserType`: `"guest" | "regular"`; persisted via NextAuth JWT and added to `Session`.
- `authConfig`: Shared NextAuth configuration object used by `NextAuth`.
- Credentials provider: Email/password sign-in backed by `lib/db/queries`.
- Guest provider: Ephemeral guest account creation backed by `lib/db/queries`.
- `DUMMY_PASSWORD`: Dummy password used to prevent user enumeration side channels.

## Allowed Patterns

### NextAuth configuration and handlers

1. Configure NextAuth once in `auth.ts`:
   - Spread `authConfig` and extend with providers and callbacks.
   - Use `Credentials` providers for both regular and guest user flows.
2. User resolution:
   - Fetch user(s) via `getUser` from `@/lib/db/queries`.
   - Use `compare` from `bcrypt-ts` to verify passwords when the user exists.
   - For non-existent or invalid users, always perform a dummy `compare` to avoid timing leaks.
3. Session and JWT:
   - Extend `Session` and `JWT` types in-module; ensure `id` and `type` are set consistently.
   - All other code uses `auth()` instead of decoding tokens manually.

### Auth pages (`login`, `register`)

1. Client pages:
   - Use `useSession` only for client-only status checks; do not perform redirects using window APIs.
   - Use `useActionState` or server actions for form submission.
   - Display user feedback via toasts or inline messages; never expose raw error messages from DB or Auth.js.
2. Routing:
   - Redirect authenticated users away from login/register pages using router navigation (e.g., `router.replace("/")`), not manual location changes.
   - Use `authConfig.pages` to drive default sign-in and new-user routes.

### Auth APIs (`app/(auth)/api/**`)

1. Guest auth:
   - For `/api/auth/guest`, use `getToken` from `next-auth/jwt` to detect signed-in users and redirect them away.
   - Otherwise, call `signIn("guest", ...)` with redirect semantics only—no manual cookie writes.
2. NextAuth handler re-export:
   - Re-export `{ GET, POST }` for `[...nextauth]/route.ts` from `auth.ts` without wrapping.

## Prohibited Patterns

1. No duplicate NextAuth instances:
   - `NextAuth` must only be called once in this directory.
   - Other files must not call `NextAuth` directly.
2. No direct password hashing outside `lib/db/utils`:
   - Hashing and salting logic must live under `lib/db/utils`; this directory may only compare passwords.
3. No DB queries in client components:
   - Client auth pages must not import `@/lib/db/queries`.
   - All persistence goes via server functions (server actions) or NextAuth flows.
4. No cross-feature coupling:
   - This directory must not import chat-specific code (`@/app/(chat)/**`) or artifact-specific logic.

## Boundaries

- Allowed dependencies:
  - `@/lib/db/queries`, `@/lib/db/utils` (for password ops), `@/lib/constants`.
  - `next-auth`, `next-auth/jwt`, `bcrypt-ts`, Zod for form validation.
- Outgoing dependencies:
  - Other segments (e.g., `app/(chat)`) may import `auth`, `signIn`, `signOut` from this directory.
  - No other exports from this segment should be used as a general-purpose utility layer.
- Layering:
  - `lib/db` must not import from `app/(auth)`; all dependencies are top-down: `app/(auth)` → `lib/db`.
