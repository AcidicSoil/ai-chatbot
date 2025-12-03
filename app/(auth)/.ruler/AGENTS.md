# AGENTS.md for `app/(auth)`

## Hierarchical Policy

- MUST inherit rules from `app/AGENTS.md`.
- OWNS authentication UI and API routes (`/login`, `/register`, `/api/auth`).

## Domain Vocabulary

- **Credentials**: Email/password authentication method.
- **Guest**: Ephemeral user type for trying the app without an account.
- **Session**: User state managed via NextAuth.js.

## Auth Flow Rules

- MUST use `useActionState` (or `useFormState`) for login/register form submissions.
- MUST NOT expose password hashing logic to the client.
- Login pages MUST redirect authenticated users if they visit while logged in.
- Guest authentication MUST allow immediate access without email verification.

## Boundaries

- MUST NOT import chat-specific components (e.g., `Artifact`, `Chat`).
- MUST interact with `lib/db` only via `lib/db/queries`.
