<!-- path: app/.ruler/AGENTS.md -->
> Inherits global rules from `.ruler/AGENTS.md` for all App Router UI and routing.

# Directory: app

## Hierarchical Policy

- Own the Next.js App Router tree, including root layout, global styling, and segmented feature groups like `(auth)` and `(chat)`.
- Default to server components for `layout.tsx` and `page.tsx`; use `"use client"` only when hooks or browser APIs are required.
- Delegate business logic and persistence to `lib/**` and feature modules (`artifacts/**`); keep App Router files focused on data wiring, routing, and composition.
- Restrict HTTP entrypoints to route handlers (`app/**/route.ts`) and server actions; client code must not define ad hoc HTTP endpoints.

## Domain Vocabulary

- `layout.tsx`: Root or nested layout responsible for shells, providers, and shared chrome.
- `page.tsx`: Route entry component (server by default) for a concrete URL path.
- `route.ts`: HTTP route handler for an API endpoint or non-page route.
- `Segment`: A directory like `(auth)` or `(chat)` representing a vertical feature slice under `app/`.
- `globals.css`: Global design tokens, theme variables, and Tailwind configuration.
- `Client page`: A `page.tsx` marked with `"use client"` used for auth flows or UI-heavy experiences.
- `Server action`: A `"use server"` function imported into components or forms to perform mutations.

## Boundaries

- `app/**` may import from `components/**`, `hooks/**`, `artifacts/**`, and `lib/**` but must not be imported by `lib/**` or `artifacts/**`.
- `app/layout.tsx` is the primary place to configure global providers (theme, session, toasts); additional providers must be explicitly owned by feature segments.
- Non-segment directories under `app/` (e.g., `avatar/upload`) follow the same constraints as feature segments: server components handle data, route handlers handle HTTP, and client components only handle UX.
- Route handlers (`app/**/route.ts`) must not perform Drizzle queries or AI provider wiring directly; they call exported functions from `lib/db/**` and `lib/ai/**`.
- Client components inside `app/**` must not import `lib/db/queries`, `lib/db/schema`, or `lib/ai/providers`; they communicate with the server via server actions, route handlers, or structured streaming providers.