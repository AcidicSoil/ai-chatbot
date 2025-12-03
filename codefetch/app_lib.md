<source_code>
app/globals.css
```
@import "tailwindcss";
@import "katex/dist/katex.min.css";

/* include utility classes in streamdown */
@source '../node_modules/streamdown/dist/index.js';

/* custom variant for setting dark mode programmatically */
@custom-variant dark (&:is(.dark, .dark *));

/* include plugins */
@plugin "tailwindcss-animate";
@plugin "@tailwindcss/typography";

/* define design tokens (light mode) */
:root {
  --background: hsl(0 0% 100%);
  --foreground: hsl(240 10% 3.9%);
  --card: hsl(0 0% 100%);
  --card-foreground: hsl(240 10% 3.9%);
  --popover: hsl(0 0% 100%);
  --popover-foreground: hsl(240 10% 3.9%);
  --primary: hsl(240 5.9% 10%);
  --primary-foreground: hsl(0 0% 98%);
  --secondary: hsl(240 4.8% 95.9%);
  --secondary-foreground: hsl(240 5.9% 10%);
  --muted: hsl(240 4.8% 95.9%);
  --muted-foreground: hsl(240 3.8% 46.1%);
  --accent: hsl(240 4.8% 95.9%);
  --accent-foreground: hsl(240 5.9% 10%);
  --destructive: hsl(0 84.2% 60.2%);
  --destructive-foreground: hsl(0 0% 98%);
  --border: hsl(240 5.9% 90%);
  --input: hsl(240 5.9% 90%);
  --ring: hsl(240 10% 3.9%);
  --chart-1: hsl(12 76% 61%);
  --chart-2: hsl(173 58% 39%);
  --chart-3: hsl(197 37% 24%);
  --chart-4: hsl(43 74% 66%);
  --chart-5: hsl(27 87% 67%);
  --sidebar-background: hsl(0 0% 98%);
  --sidebar-foreground: hsl(240 5.3% 26.1%);
  --sidebar-primary: hsl(240 5.9% 10%);
  --sidebar-primary-foreground: hsl(0 0% 98%);
  --sidebar-accent: hsl(240 4.8% 95.9%);
  --sidebar-accent-foreground: hsl(240 5.9% 10%);
  --sidebar-border: hsl(220 13% 91%);
  --sidebar-ring: hsl(217.2 91.2% 59.8%);
  /* border radius unit */
  --radius: 0.5rem;
  --sidebar: hsl(0 0% 98%);
}

/* define design tokens (dark mode) */
.dark {
  --background: hsl(240 10% 3.9%);
  --foreground: hsl(0 0% 98%);
  --card: hsl(240 10% 3.9%);
  --card-foreground: hsl(0 0% 98%);
  --popover: hsl(240 10% 3.9%);
  --popover-foreground: hsl(0 0% 98%);
  --primary: hsl(0 0% 98%);
  --primary-foreground: hsl(240 5.9% 10%);
  --secondary: hsl(240 3.7% 15.9%);
  --secondary-foreground: hsl(0 0% 98%);
  --muted: hsl(240 3.7% 15.9%);
  --muted-foreground: hsl(240 5% 64.9%);
  --accent: hsl(240 3.7% 15.9%);
  --accent-foreground: hsl(0 0% 98%);
  --destructive: hsl(0 62.8% 30.6%);
  --destructive-foreground: hsl(0 0% 98%);
  --border: hsl(240 3.7% 15.9%);
  --input: hsl(240 3.7% 15.9%);
  --ring: hsl(240 4.9% 83.9%);
  --chart-1: hsl(220 70% 50%);
  --chart-2: hsl(160 60% 45%);
  --chart-3: hsl(30 80% 55%);
  --chart-4: hsl(280 65% 60%);
  --chart-5: hsl(340 75% 55%);
  --sidebar-background: hsl(240 5.9% 10%);
  --sidebar-foreground: hsl(240 4.8% 95.9%);
  --sidebar-primary: hsl(224.3 76.3% 48%);
  --sidebar-primary-foreground: hsl(0 0% 100%);
  --sidebar-accent: hsl(240 3.7% 15.9%);
  --sidebar-accent-foreground: hsl(240 4.8% 95.9%);
  --sidebar-border: hsl(240 3.7% 15.9%);
  --sidebar-ring: hsl(217.2 91.2% 59.8%);
  --sidebar: hsl(240 5.9% 10%);
}

/* define theme */
@theme {
  --font-sans: var(--font-geist);
  --font-mono: var(--font-geist-mono);

  --breakpoint-toast-mobile: 600px;

  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);

  --color-background: var(--background);
  --color-foreground: var(--foreground);

  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);

  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);

  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);

  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);

  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);

  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);

  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);

  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);

  --color-sidebar: var(--sidebar-background);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

/*
  The default border color has changed to `currentcolor` in Tailwind CSS v4,
  so we've added these compatibility styles to make sure everything still
  looks the same as it did with Tailwind CSS v3.

  If we ever want to remove these styles, we need to add an explicit border
  color utility to any element that depends on these defaults.
*/
@layer base {
  *,
  ::after,
  ::before,
  ::backdrop,
  ::file-selector-button {
    border-color: var(--color-gray-200, currentcolor);
  }
}

@utility text-balance {
  text-wrap: balance;
}

@utility -webkit-overflow-scrolling-touch {
  -webkit-overflow-scrolling: touch;
}

@utility touch-pan-y {
  touch-action: pan-y;
}

@utility overscroll-behavior-contain {
  overscroll-behavior: contain;
}

@layer utilities {
  :root {
    --foreground-rgb: 0, 0, 0;
    --background-start-rgb: 214, 219, 220;
    --background-end-rgb: 255, 255, 255;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --foreground-rgb: 255, 255, 255;
      --background-start-rgb: 0, 0, 0;
      --background-end-rgb: 0, 0, 0;
    }
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    overflow-x: hidden;
    position: relative;
  }

  html {
    overflow-x: hidden;
  }
}

.skeleton {
  * {
    pointer-events: none !important;
  }

  *[class^="text-"] {
    color: transparent;
    @apply rounded-md bg-foreground/20 select-none animate-pulse;
  }

  .skeleton-bg {
    @apply bg-foreground/10;
  }

  .skeleton-div {
    @apply bg-foreground/20 animate-pulse;
  }
}

.ProseMirror {
  outline: none;
}

.cm-editor,
.cm-gutters {
  @apply bg-background! dark:bg-zinc-800! outline-hidden! selection:bg-zinc-900!;
}

.ͼo.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground,
.ͼo.cm-selectionBackground,
.ͼo.cm-content::selection {
  @apply bg-zinc-200! dark:bg-zinc-900!;
}

.cm-activeLine,
.cm-activeLineGutter {
  @apply bg-transparent!;
}

.cm-activeLine {
  @apply rounded-r-sm!;
}

.cm-lineNumbers {
  @apply min-w-7;
}

.cm-foldGutter {
  @apply min-w-3;
}

.cm-lineNumbers .cm-activeLineGutter {
  @apply rounded-l-sm!;
}

.suggestion-highlight {
  @apply bg-blue-200 hover:bg-blue-300 dark:hover:bg-blue-400/50 dark:text-blue-50 dark:bg-blue-500/40;
}

/* minimal scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 3px;
  transition: background 0.2s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: --alpha(var(--muted-foreground) / 0.5);
}

::-webkit-scrollbar-corner {
  background: transparent;
}

/* firefox scrollbar styling */
* {
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
}

@theme inline {
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

app/layout.tsx
```
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";
import { SessionProvider } from "next-auth/react";

import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://chat.vercel.ai"),
  title: "Next.js Chatbot Template",
  description: "Next.js chatbot template using the AI SDK.",
};

export const viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
};

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

const LIGHT_THEME_COLOR = "hsl(0 0% 100%)";
const DARK_THEME_COLOR = "hsl(240deg 10% 3.92%)";
const THEME_COLOR_SCRIPT = `\
(function() {
  var html = document.documentElement;
  var meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    document.head.appendChild(meta);
  }
  function updateThemeColor() {
    var isDark = html.classList.contains('dark');
    meta.setAttribute('content', isDark ? '${DARK_THEME_COLOR}' : '${LIGHT_THEME_COLOR}');
  }
  var observer = new MutationObserver(updateThemeColor);
  observer.observe(html, { attributes: true, attributeFilter: ['class'] });
  updateThemeColor();
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${geist.variable} ${geistMono.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: "Required"
          dangerouslySetInnerHTML={{
            __html: THEME_COLOR_SCRIPT,
          }}
        />
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <Toaster position="top-center" />
          <SessionProvider>{children}</SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

app/(auth)/actions.ts
```
"use server";

import { z } from "zod";

import { createUser, getUser } from "@/lib/db/queries";

import { signIn } from "./auth";

const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginActionState = {
  status: "idle" | "in_progress" | "success" | "failed" | "invalid_data";
};

export const login = async (
  _: LoginActionState,
  formData: FormData
): Promise<LoginActionState> => {
  try {
    const validatedData = authFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    });

    return { status: "success" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data" };
    }

    return { status: "failed" };
  }
};

export type RegisterActionState = {
  status:
    | "idle"
    | "in_progress"
    | "success"
    | "failed"
    | "user_exists"
    | "invalid_data";
};

export const register = async (
  _: RegisterActionState,
  formData: FormData
): Promise<RegisterActionState> => {
  try {
    const validatedData = authFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    const [user] = await getUser(validatedData.email);

    if (user) {
      return { status: "user_exists" } as RegisterActionState;
    }
    await createUser(validatedData.email, validatedData.password);
    await signIn("credentials", {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    });

    return { status: "success" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data" };
    }

    return { status: "failed" };
  }
};
```

app/(auth)/auth.config.ts
```
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
    newUser: "/",
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {},
} satisfies NextAuthConfig;
```

app/(auth)/auth.ts
```
import { compare } from "bcrypt-ts";
import NextAuth, { type DefaultSession } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { DUMMY_PASSWORD } from "@/lib/constants";
import { createGuestUser, getUser } from "@/lib/db/queries";
import { authConfig } from "./auth.config";

export type UserType = "guest" | "regular";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      type: UserType;
    } & DefaultSession["user"];
  }

  // biome-ignore lint/nursery/useConsistentTypeDefinitions: "Required"
  interface User {
    id?: string;
    email?: string | null;
    type: UserType;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    type: UserType;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {},
      async authorize({ email, password }: any) {
        const users = await getUser(email);

        if (users.length === 0) {
          await compare(password, DUMMY_PASSWORD);
          return null;
        }

        const [user] = users;

        if (!user.password) {
          await compare(password, DUMMY_PASSWORD);
          return null;
        }

        const passwordsMatch = await compare(password, user.password);

        if (!passwordsMatch) {
          return null;
        }

        return { ...user, type: "regular" };
      },
    }),
    Credentials({
      id: "guest",
      credentials: {},
      async authorize() {
        const [guestUser] = await createGuestUser();
        return { ...guestUser, type: "guest" };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.type = user.type;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.type = token.type;
      }

      return session;
    },
  },
});
```

app/(chat)/actions.ts
```
"use server";

import { generateText, type UIMessage } from "ai";
import { cookies } from "next/headers";
import type { VisibilityType } from "@/components/visibility-selector";
import { titlePrompt } from "@/lib/ai/prompts";
import { myProvider } from "@/lib/ai/providers";
import {
  deleteMessagesByChatIdAfterTimestamp,
  getMessageById,
  updateChatVisibilityById,
} from "@/lib/db/queries";
import { getTextFromMessage } from "@/lib/utils";

export async function saveChatModelAsCookie(model: string) {
  const cookieStore = await cookies();
  cookieStore.set("chat-model", model);
}

export async function generateTitleFromUserMessage({
  message,
}: {
  message: UIMessage;
}) {
  const { text: title } = await generateText({
    model: myProvider.languageModel("title-model"),
    system: titlePrompt,
    prompt: getTextFromMessage(message),
  });

  return title;
}

export async function deleteTrailingMessages({ id }: { id: string }) {
  const [message] = await getMessageById({ id });

  await deleteMessagesByChatIdAfterTimestamp({
    chatId: message.chatId,
    timestamp: message.createdAt,
  });
}

export async function updateChatVisibility({
  chatId,
  visibility,
}: {
  chatId: string;
  visibility: VisibilityType;
}) {
  await updateChatVisibilityById({ chatId, visibility });
}
```

app/(chat)/layout.tsx
```
import { cookies } from "next/headers";
import Script from "next/script";
import { Suspense } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { DataStreamProvider } from "@/components/data-stream-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "../(auth)/auth";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"
        strategy="beforeInteractive"
      />
      <DataStreamProvider>
        <Suspense fallback={<div className="flex h-dvh" />}>
          <SidebarWrapper>{children}</SidebarWrapper>
        </Suspense>
      </DataStreamProvider>
    </>
  );
}

async function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const [session, cookieStore] = await Promise.all([auth(), cookies()]);
  const isCollapsed = cookieStore.get("sidebar_state")?.value !== "true";

  return (
    <SidebarProvider defaultOpen={!isCollapsed}>
      <AppSidebar user={session?.user} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
```

app/(chat)/page.tsx
```
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Chat } from "@/components/chat";
import { DataStreamHandler } from "@/components/data-stream-handler";
import { DEFAULT_CHAT_MODEL } from "@/lib/ai/models";
import { generateUUID } from "@/lib/utils";
import { auth } from "../(auth)/auth";

export default function Page() {
  return (
    <Suspense fallback={<div className="flex h-dvh" />}>
      <NewChatPage />
    </Suspense>
  );
}

async function NewChatPage() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/guest");
  }

  const id = generateUUID();

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get("chat-model");

  if (!modelIdFromCookie) {
    return (
      <>
        <Chat
          autoResume={false}
          id={id}
          initialChatModel={DEFAULT_CHAT_MODEL}
          initialMessages={[]}
          initialVisibilityType="private"
          isReadonly={false}
          key={id}
        />
        <DataStreamHandler />
      </>
    );
  }

  return (
    <>
      <Chat
        autoResume={false}
        id={id}
        initialChatModel={modelIdFromCookie.value}
        initialMessages={[]}
        initialVisibilityType="private"
        isReadonly={false}
        key={id}
      />
      <DataStreamHandler />
    </>
  );
}
```

app/(auth)/.ruler/AGENTS.md
```
<!-- Generated by Ruler -->

<!-- Inherits from: .ruler/AGENTS.md -->

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
```

app/(auth)/login/page.tsx
```
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useActionState, useEffect, useState } from "react";

import { AuthForm } from "@/components/auth-form";
import { SubmitButton } from "@/components/submit-button";
import { toast } from "@/components/toast";
import { type LoginActionState, login } from "../actions";

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);

  const [state, formAction] = useActionState<LoginActionState, FormData>(
    login,
    {
      status: "idle",
    }
  );

  const { update: updateSession } = useSession();

  // biome-ignore lint/correctness/useExhaustiveDependencies: router and updateSession are stable refs
  useEffect(() => {
    if (state.status === "failed") {
      toast({
        type: "error",
        description: "Invalid credentials!",
      });
    } else if (state.status === "invalid_data") {
      toast({
        type: "error",
        description: "Failed validating your submission!",
      });
    } else if (state.status === "success") {
      setIsSuccessful(true);
      updateSession();
      router.refresh();
    }
  }, [state.status]);

  const handleSubmit = (formData: FormData) => {
    setEmail(formData.get("email") as string);
    formAction(formData);
  };

  return (
    <div className="flex h-dvh w-screen items-start justify-center bg-background pt-12 md:items-center md:pt-0">
      <div className="flex w-full max-w-md flex-col gap-12 overflow-hidden rounded-2xl">
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
          <h3 className="font-semibold text-xl dark:text-zinc-50">Sign In</h3>
          <p className="text-gray-500 text-sm dark:text-zinc-400">
            Use your email and password to sign in
          </p>
        </div>
        <AuthForm action={handleSubmit} defaultEmail={email}>
          <SubmitButton isSuccessful={isSuccessful}>Sign in</SubmitButton>
          <p className="mt-4 text-center text-gray-600 text-sm dark:text-zinc-400">
            {"Don't have an account? "}
            <Link
              className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
              href="/register"
            >
              Sign up
            </Link>
            {" for free."}
          </p>
        </AuthForm>
      </div>
    </div>
  );
}
```

app/(auth)/register/page.tsx
```
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useActionState, useEffect, useState } from "react";
import { AuthForm } from "@/components/auth-form";
import { SubmitButton } from "@/components/submit-button";
import { toast } from "@/components/toast";
import { type RegisterActionState, register } from "../actions";

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);

  const [state, formAction] = useActionState<RegisterActionState, FormData>(
    register,
    {
      status: "idle",
    }
  );

  const { update: updateSession } = useSession();

  // biome-ignore lint/correctness/useExhaustiveDependencies: router and updateSession are stable refs
  useEffect(() => {
    if (state.status === "user_exists") {
      toast({ type: "error", description: "Account already exists!" });
    } else if (state.status === "failed") {
      toast({ type: "error", description: "Failed to create account!" });
    } else if (state.status === "invalid_data") {
      toast({
        type: "error",
        description: "Failed validating your submission!",
      });
    } else if (state.status === "success") {
      toast({ type: "success", description: "Account created successfully!" });

      setIsSuccessful(true);
      updateSession();
      router.refresh();
    }
  }, [state.status]);

  const handleSubmit = (formData: FormData) => {
    setEmail(formData.get("email") as string);
    formAction(formData);
  };

  return (
    <div className="flex h-dvh w-screen items-start justify-center bg-background pt-12 md:items-center md:pt-0">
      <div className="flex w-full max-w-md flex-col gap-12 overflow-hidden rounded-2xl">
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
          <h3 className="font-semibold text-xl dark:text-zinc-50">Sign Up</h3>
          <p className="text-gray-500 text-sm dark:text-zinc-400">
            Create an account with your email and password
          </p>
        </div>
        <AuthForm action={handleSubmit} defaultEmail={email}>
          <SubmitButton isSuccessful={isSuccessful}>Sign Up</SubmitButton>
          <p className="mt-4 text-center text-gray-600 text-sm dark:text-zinc-400">
            {"Already have an account? "}
            <Link
              className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
              href="/login"
            >
              Sign in
            </Link>
            {" instead."}
          </p>
        </AuthForm>
      </div>
    </div>
  );
}
```

app/avatar/upload/page.tsx
```
"use client";

import type { PutBlobResult } from "@vercel/blob";
import { useState, useRef } from "react";

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  return (
    <>
      <h1>Upload Your Avatar</h1>

      <form
        onSubmit={async (event) => {
          event.preventDefault();

          if (!inputFileRef.current?.files) {
            throw new Error("No file selected");
          }

          const file = inputFileRef.current.files[0];

          const response = await fetch(
            `/api/avatar/upload?filename=${file.name}`,
            {
              method: "POST",
              body: file,
            }
          );

          const newBlob = (await response.json()) as PutBlobResult;

          setBlob(newBlob);
        }}
      >
        <input
          name="file"
          ref={inputFileRef}
          type="file"
          accept="image/jpeg, image/png, image/webp"
          required
        />
        <button type="submit">Upload</button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </>
  );
}
```

app/(chat)/.ruler/AGENTS.md
```
<!-- Generated by Ruler -->

<!-- Inherits from: .ruler/AGENTS.md -->

# Directory: app/(chat)

## Hierarchical Policy

- This directory inherits all global rules from `.ruler/AGENTS.md` and specializes them for the chat surface and chat HTTP endpoints.
- Owns:
  - Chat pages, layouts, and streaming UI for chat sessions.
  - Chat-related server actions in `actions.ts`.
  - Chat-related App Router route handlers under `app/(chat)/api/**`.
- May depend on:
  - `@/app/(auth)/auth` for session access.
  - `@/lib/db/queries` for persistence.
  - `@/lib/ai/**` for model calls and prompts.
  - `@/artifacts/**`, `@/components/**`, `@/hooks/**` for UI/domain helpers.
- Must not depend on:
  - Drizzle directly (`drizzle-orm`, `postgres`) or DB migrations.
  - NextAuth configuration internals other than the exported `auth`, `signIn`, `signOut`.
  - Low-level AI provider wiring (only use `myProvider` and other exported facades from `lib/ai`).

## Domain Vocabulary

- `Chat`: A long-lived conversation record stored via `lib/db/queries` (id, title, visibility, user ownership).
- `Message`: A persisted chat message; UI uses “UIMessage” projections.
- `Stream`: A streaming session of model output associated with a chat.
- `VisibilityType`: Public/private visibility of a chat.
- `DataStreamProvider` / `DataStreamHandler`: Components wiring server-side data streams into the chat UI.
- `artifactKinds`: `"text" | "code" | "sheet"` artifact types associated with a chat.
- `chat-model` / `chat-model-reasoning`: Primary AI models for chat; configured in `lib/ai/providers`.

## Allowed Patterns

### Next.js App Router: pages and layouts

1. Pages and layouts in this segment:
   - Default export a React component; pages may be async server components.
   - For initial data, call `auth()` and `lib/db/queries` functions directly from server components.
   - Use Suspense boundaries for loading states; keep fallback UIs minimal and layout-safe.
2. URL and params:
   - Route params are accessed via typed `params` where possible; do not parse from `searchParams` if you have path params.
   - Use the `redirect` and `notFound` helpers from `next/navigation` for control-flow, not manual `NextResponse` in pages.

### Route handlers under `app/(chat)/api/**`

1. Shape:
   - Export `GET`, `POST`, `PATCH`, `DELETE`, etc. as `export async function` for each HTTP verb.
   - Accept `Request` or Next’s `NextRequest` as the first argument.
2. Authentication:
   - Always call `auth()` for endpoints that operate on user-owned chats or messages.
   - Treat unauthenticated requests as errors using `ChatSDKError` where appropriate.
3. Validation:
   - Parse query params via `new URL(request.url).searchParams`.
   - For JSON bodies, use `await request.json()` and validate via Zod schemas when the data is non-trivial.
   - Return typed error responses via `ChatSDKError` for missing/invalid params.
4. Data access:
   - Only call persistence through `@/lib/db/queries` functions.
   - Obtain any DB types via `@/lib/db/schema` types, not direct `drizzle` queries.
5. Responses:
   - Use `Response.json(...)` or `NextResponse.json(...)` for successful responses.
   - For domain errors, return `.toResponse()` from `ChatSDKError` instead of throwing raw errors.

### Server actions in `app/(chat)/actions.ts`

1. Mark file-level `"use server"` and export server actions which:
   - Parse and validate input synchronously.
   - Call `generateText` / AI SDK functions through `myProvider` or higher-level wrappers in `lib/ai`.
   - Call `lib/db/queries` for any persistence updates.
2. Side effects:
   - Use `cookies()` for persisting lightweight per-user flags like preferred chat model.
   - Avoid performing multi-step, cross-entity business flows directly in actions; delegate to dedicated functions in `lib/**` when logic grows.

### Interaction with artifacts

1. For generating or updating artifacts as part of a chat:
   - Delegate to handlers in `artifacts/**` and `lib/artifacts/server`.
   - Treat artifact creation/update as separate domain operations, not inline string manipulations in route handlers.

## Prohibited Patterns

1. No direct DB access:
   - Forbidden to import `drizzle-orm`, `postgres`, or create DB clients in this directory.
   - Forbidden to run raw SQL or touch migrations.
2. No low-level auth configuration:
   - Do not instantiate `NextAuth` here.
   - Do not alter `authConfig`; only call exported `auth`, `signIn`, `signOut`.
3. No business logic in React client components:
   - Client components must not call fetch on internal `/api` routes for operations available as server actions or direct server calls.
   - Client components must not import `@/lib/db/queries` or `@/lib/ai/providers`; those belong in server-only files.
4. No arbitrary access to cookies:
   - Use cookies only for stable, simple preferences (e.g., chat model) and not as an ad-hoc data store.

## Boundaries

- Upstream callers:
  - Entry point for chat UX is via routes under `app/(chat)`; external code must not call lower-level `app/(chat)/api/**` endpoints directly from the server—prefer function calls in `lib/**`.
- Downstream dependencies:
  - Allowed: `@/app/(auth)/auth`, `@/lib/db/**`, `@/lib/ai/**`, `@/lib/artifacts/**`, `@/components/**`, `@/hooks/**`, `@/lib/constants`, `@/lib/errors`, `@/lib/utils`.
  - Forbidden: `lib/db/migrations`, low-level provider setup outside `lib/ai/providers`, any future `scripts/**` or CLI-only utilities.
- Cross-segment isolation:
  - This segment must not import from other app segments (e.g., `app/avatar/**`) except shared UI-only components; cross-feature server logic belongs in `lib/**`.
```

app/(chat)/api/chat/route.ts
```
import { geolocation } from "@vercel/functions";
import {
  convertToModelMessages,
  createUIMessageStream,
  JsonToSseTransformStream,
  smoothStream,
  stepCountIs,
  streamText,
} from "ai";
import { unstable_cache as cache } from "next/cache";
import { after } from "next/server";
import {
  createResumableStreamContext,
  type ResumableStreamContext,
} from "resumable-stream";
import type { ModelCatalog } from "tokenlens/core";
import { fetchModels } from "tokenlens/fetch";
import { getUsage } from "tokenlens/helpers";
import { auth, type UserType } from "@/app/(auth)/auth";
import type { VisibilityType } from "@/components/visibility-selector";
import { entitlementsByUserType } from "@/lib/ai/entitlements";
import type { ChatModel } from "@/lib/ai/models";
import { type RequestHints, systemPrompt } from "@/lib/ai/prompts";
import { myProvider } from "@/lib/ai/providers";
import { createDocument } from "@/lib/ai/tools/create-document";
import { getWeather } from "@/lib/ai/tools/get-weather";
import { requestSuggestions } from "@/lib/ai/tools/request-suggestions";
import { updateDocument } from "@/lib/ai/tools/update-document";
import { isProductionEnvironment } from "@/lib/constants";
import {
  createStreamId,
  deleteChatById,
  getChatById,
  getMessageCountByUserId,
  getMessagesByChatId,
  saveChat,
  saveMessages,
  updateChatLastContextById,
} from "@/lib/db/queries";
import type { DBMessage } from "@/lib/db/schema";
import { ChatSDKError } from "@/lib/errors";
import type { ChatMessage } from "@/lib/types";
import type { AppUsage } from "@/lib/usage";
import { convertToUIMessages, generateUUID } from "@/lib/utils";
import { generateTitleFromUserMessage } from "../../actions";
import { type PostRequestBody, postRequestBodySchema } from "./schema";

export const maxDuration = 60;

let globalStreamContext: ResumableStreamContext | null = null;

const getTokenlensCatalog = cache(
  async (): Promise<ModelCatalog | undefined> => {
    try {
      return await fetchModels();
    } catch (err) {
      console.warn(
        "TokenLens: catalog fetch failed, using default catalog",
        err
      );
      return; // tokenlens helpers will fall back to defaultCatalog
    }
  },
  ["tokenlens-catalog"],
  { revalidate: 24 * 60 * 60 } // 24 hours
);

export function getStreamContext() {
  if (!globalStreamContext) {
    try {
      globalStreamContext = createResumableStreamContext({
        waitUntil: after,
      });
    } catch (error: any) {
      if (error.message.includes("REDIS_URL")) {
        console.log(
          " > Resumable streams are disabled due to missing REDIS_URL"
        );
      } else {
        console.error(error);
      }
    }
  }

  return globalStreamContext;
}

export async function POST(request: Request) {
  let requestBody: PostRequestBody;

  try {
    const json = await request.json();
    requestBody = postRequestBodySchema.parse(json);
  } catch (_) {
    return new ChatSDKError("bad_request:api").toResponse();
  }

  try {
    const {
      id,
      message,
      selectedChatModel,
      selectedVisibilityType,
    }: {
      id: string;
      message: ChatMessage;
      selectedChatModel: ChatModel["id"];
      selectedVisibilityType: VisibilityType;
    } = requestBody;

    const session = await auth();

    if (!session?.user) {
      return new ChatSDKError("unauthorized:chat").toResponse();
    }

    const userType: UserType = session.user.type;

    const messageCount = await getMessageCountByUserId({
      id: session.user.id,
      differenceInHours: 24,
    });

    if (messageCount > entitlementsByUserType[userType].maxMessagesPerDay) {
      return new ChatSDKError("rate_limit:chat").toResponse();
    }

    const chat = await getChatById({ id });
    let messagesFromDb: DBMessage[] = [];

    if (chat) {
      if (chat.userId !== session.user.id) {
        return new ChatSDKError("forbidden:chat").toResponse();
      }
      // Only fetch messages if chat already exists
      messagesFromDb = await getMessagesByChatId({ id });
    } else {
      const title = await generateTitleFromUserMessage({
        message,
      });

      await saveChat({
        id,
        userId: session.user.id,
        title,
        visibility: selectedVisibilityType,
      });
      // New chat - no need to fetch messages, it's empty
    }

    const uiMessages = [...convertToUIMessages(messagesFromDb), message];

    const { longitude, latitude, city, country } = geolocation(request);

    const requestHints: RequestHints = {
      longitude,
      latitude,
      city,
      country,
    };

    await saveMessages({
      messages: [
        {
          chatId: id,
          id: message.id,
          role: "user",
          parts: message.parts,
          attachments: [],
          createdAt: new Date(),
        },
      ],
    });

    const streamId = generateUUID();
    await createStreamId({ streamId, chatId: id });

    let finalMergedUsage: AppUsage | undefined;

    const stream = createUIMessageStream({
      execute: ({ writer: dataStream }) => {
        const result = streamText({
          model: myProvider.languageModel(selectedChatModel),
          system: systemPrompt({ selectedChatModel, requestHints }),
          messages: convertToModelMessages(uiMessages),
          stopWhen: stepCountIs(5),
          experimental_activeTools:
            selectedChatModel === "chat-model-reasoning"
              ? []
              : [
                  "getWeather",
                  "createDocument",
                  "updateDocument",
                  "requestSuggestions",
                ],
          experimental_transform: smoothStream({ chunking: "word" }),
          tools: {
            getWeather,
            createDocument: createDocument({ session, dataStream }),
            updateDocument: updateDocument({ session, dataStream }),
            requestSuggestions: requestSuggestions({
              session,
              dataStream,
            }),
          },
          experimental_telemetry: {
            isEnabled: isProductionEnvironment,
            functionId: "stream-text",
          },
          onFinish: async ({ usage }) => {
            try {
              const providers = await getTokenlensCatalog();
              const modelId =
                myProvider.languageModel(selectedChatModel).modelId;
              if (!modelId) {
                finalMergedUsage = usage;
                dataStream.write({
                  type: "data-usage",
                  data: finalMergedUsage,
                });
                return;
              }

              if (!providers) {
                finalMergedUsage = usage;
                dataStream.write({
                  type: "data-usage",
                  data: finalMergedUsage,
                });
                return;
              }

              const summary = getUsage({ modelId, usage, providers });
              finalMergedUsage = { ...usage, ...summary, modelId } as AppUsage;
              dataStream.write({ type: "data-usage", data: finalMergedUsage });
            } catch (err) {
              console.warn("TokenLens enrichment failed", err);
              finalMergedUsage = usage;
              dataStream.write({ type: "data-usage", data: finalMergedUsage });
            }
          },
        });

        result.consumeStream();

        dataStream.merge(
          result.toUIMessageStream({
            sendReasoning: true,
          })
        );
      },
      generateId: generateUUID,
      onFinish: async ({ messages }) => {
        await saveMessages({
          messages: messages.map((currentMessage) => ({
            id: currentMessage.id,
            role: currentMessage.role,
            parts: currentMessage.parts,
            createdAt: new Date(),
            attachments: [],
            chatId: id,
          })),
        });

        if (finalMergedUsage) {
          try {
            await updateChatLastContextById({
              chatId: id,
              context: finalMergedUsage,
            });
          } catch (err) {
            console.warn("Unable to persist last usage for chat", id, err);
          }
        }
      },
      onError: () => {
        return "Oops, an error occurred!";
      },
    });

    // const streamContext = getStreamContext();

    // if (streamContext) {
    //   return new Response(
    //     await streamContext.resumableStream(streamId, () =>
    //       stream.pipeThrough(new JsonToSseTransformStream())
    //     )
    //   );
    // }

    return new Response(stream.pipeThrough(new JsonToSseTransformStream()));
  } catch (error) {
    const vercelId = request.headers.get("x-vercel-id");

    if (error instanceof ChatSDKError) {
      return error.toResponse();
    }

    // Check for Vercel AI Gateway credit card error
    if (
      error instanceof Error &&
      error.message?.includes(
        "AI Gateway requires a valid credit card on file to service requests"
      )
    ) {
      return new ChatSDKError("bad_request:activate_gateway").toResponse();
    }

    console.error("Unhandled error in chat API:", error, { vercelId });
    return new ChatSDKError("offline:chat").toResponse();
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new ChatSDKError("bad_request:api").toResponse();
  }

  const session = await auth();

  if (!session?.user) {
    return new ChatSDKError("unauthorized:chat").toResponse();
  }

  const chat = await getChatById({ id });

  if (chat?.userId !== session.user.id) {
    return new ChatSDKError("forbidden:chat").toResponse();
  }

  const deletedChat = await deleteChatById({ id });

  return Response.json(deletedChat, { status: 200 });
}
```

app/(chat)/api/chat/schema.ts
```
import { z } from "zod";

const textPartSchema = z.object({
  type: z.enum(["text"]),
  text: z.string().min(1).max(2000),
});

const filePartSchema = z.object({
  type: z.enum(["file"]),
  mediaType: z.enum(["image/jpeg", "image/png"]),
  name: z.string().min(1).max(100),
  url: z.string().url(),
});

const partSchema = z.union([textPartSchema, filePartSchema]);

export const postRequestBodySchema = z.object({
  id: z.string().uuid(),
  message: z.object({
    id: z.string().uuid(),
    role: z.enum(["user"]),
    parts: z.array(partSchema),
  }),
  selectedChatModel: z.enum(["chat-model", "chat-model-reasoning"]),
  selectedVisibilityType: z.enum(["public", "private"]),
});

export type PostRequestBody = z.infer<typeof postRequestBodySchema>;
```

app/(chat)/api/document/route.ts
```
import { auth } from "@/app/(auth)/auth";
import type { ArtifactKind } from "@/components/artifact";
import {
  deleteDocumentsByIdAfterTimestamp,
  getDocumentsById,
  saveDocument,
} from "@/lib/db/queries";
import { ChatSDKError } from "@/lib/errors";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new ChatSDKError(
      "bad_request:api",
      "Parameter id is missing"
    ).toResponse();
  }

  const session = await auth();

  if (!session?.user) {
    return new ChatSDKError("unauthorized:document").toResponse();
  }

  const documents = await getDocumentsById({ id });

  const [document] = documents;

  if (!document) {
    return new ChatSDKError("not_found:document").toResponse();
  }

  if (document.userId !== session.user.id) {
    return new ChatSDKError("forbidden:document").toResponse();
  }

  return Response.json(documents, { status: 200 });
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new ChatSDKError(
      "bad_request:api",
      "Parameter id is required."
    ).toResponse();
  }

  const session = await auth();

  if (!session?.user) {
    return new ChatSDKError("not_found:document").toResponse();
  }

  const {
    content,
    title,
    kind,
  }: { content: string; title: string; kind: ArtifactKind } =
    await request.json();

  const documents = await getDocumentsById({ id });

  if (documents.length > 0) {
    const [doc] = documents;

    if (doc.userId !== session.user.id) {
      return new ChatSDKError("forbidden:document").toResponse();
    }
  }

  const document = await saveDocument({
    id,
    content,
    title,
    kind,
    userId: session.user.id,
  });

  return Response.json(document, { status: 200 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const timestamp = searchParams.get("timestamp");

  if (!id) {
    return new ChatSDKError(
      "bad_request:api",
      "Parameter id is required."
    ).toResponse();
  }

  if (!timestamp) {
    return new ChatSDKError(
      "bad_request:api",
      "Parameter timestamp is required."
    ).toResponse();
  }

  const session = await auth();

  if (!session?.user) {
    return new ChatSDKError("unauthorized:document").toResponse();
  }

  const documents = await getDocumentsById({ id });

  const [document] = documents;

  if (document.userId !== session.user.id) {
    return new ChatSDKError("forbidden:document").toResponse();
  }

  const documentsDeleted = await deleteDocumentsByIdAfterTimestamp({
    id,
    timestamp: new Date(timestamp),
  });

  return Response.json(documentsDeleted, { status: 200 });
}
```

app/(chat)/api/history/route.ts
```
import type { NextRequest } from "next/server";
import { auth } from "@/app/(auth)/auth";
import { deleteAllChatsByUserId, getChatsByUserId } from "@/lib/db/queries";
import { ChatSDKError } from "@/lib/errors";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const limit = Number.parseInt(searchParams.get("limit") || "10", 10);
  const startingAfter = searchParams.get("starting_after");
  const endingBefore = searchParams.get("ending_before");

  if (startingAfter && endingBefore) {
    return new ChatSDKError(
      "bad_request:api",
      "Only one of starting_after or ending_before can be provided."
    ).toResponse();
  }

  const session = await auth();

  if (!session?.user) {
    return new ChatSDKError("unauthorized:chat").toResponse();
  }

  const chats = await getChatsByUserId({
    id: session.user.id,
    limit,
    startingAfter,
    endingBefore,
  });

  return Response.json(chats);
}

export async function DELETE() {
  const session = await auth();

  if (!session?.user) {
    return new ChatSDKError("unauthorized:chat").toResponse();
  }

  const result = await deleteAllChatsByUserId({ userId: session.user.id });

  return Response.json(result, { status: 200 });
}
```

app/(chat)/api/suggestions/route.ts
```
import { auth } from "@/app/(auth)/auth";
import { getSuggestionsByDocumentId } from "@/lib/db/queries";
import { ChatSDKError } from "@/lib/errors";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const documentId = searchParams.get("documentId");

  if (!documentId) {
    return new ChatSDKError(
      "bad_request:api",
      "Parameter documentId is required."
    ).toResponse();
  }

  const session = await auth();

  if (!session?.user) {
    return new ChatSDKError("unauthorized:suggestions").toResponse();
  }

  const suggestions = await getSuggestionsByDocumentId({
    documentId,
  });

  const [suggestion] = suggestions;

  if (!suggestion) {
    return Response.json([], { status: 200 });
  }

  if (suggestion.userId !== session.user.id) {
    return new ChatSDKError("forbidden:api").toResponse();
  }

  return Response.json(suggestions, { status: 200 });
}
```

app/(chat)/api/vote/route.ts
```
import { auth } from "@/app/(auth)/auth";
import { getChatById, getVotesByChatId, voteMessage } from "@/lib/db/queries";
import { ChatSDKError } from "@/lib/errors";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const chatId = searchParams.get("chatId");

  if (!chatId) {
    return new ChatSDKError(
      "bad_request:api",
      "Parameter chatId is required."
    ).toResponse();
  }

  const session = await auth();

  if (!session?.user) {
    return new ChatSDKError("unauthorized:vote").toResponse();
  }

  const chat = await getChatById({ id: chatId });

  if (!chat) {
    return new ChatSDKError("not_found:chat").toResponse();
  }

  if (chat.userId !== session.user.id) {
    return new ChatSDKError("forbidden:vote").toResponse();
  }

  const votes = await getVotesByChatId({ id: chatId });

  return Response.json(votes, { status: 200 });
}

export async function PATCH(request: Request) {
  const {
    chatId,
    messageId,
    type,
  }: { chatId: string; messageId: string; type: "up" | "down" } =
    await request.json();

  if (!chatId || !messageId || !type) {
    return new ChatSDKError(
      "bad_request:api",
      "Parameters chatId, messageId, and type are required."
    ).toResponse();
  }

  const session = await auth();

  if (!session?.user) {
    return new ChatSDKError("unauthorized:vote").toResponse();
  }

  const chat = await getChatById({ id: chatId });

  if (!chat) {
    return new ChatSDKError("not_found:vote").toResponse();
  }

  if (chat.userId !== session.user.id) {
    return new ChatSDKError("forbidden:vote").toResponse();
  }

  await voteMessage({
    chatId,
    messageId,
    type,
  });

  return new Response("Message voted", { status: 200 });
}
```

app/(chat)/chat/[id]/page.tsx
```
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

import { auth } from "@/app/(auth)/auth";
import { Chat } from "@/components/chat";
import { DataStreamHandler } from "@/components/data-stream-handler";
import { DEFAULT_CHAT_MODEL } from "@/lib/ai/models";
import { getChatById, getMessagesByChatId } from "@/lib/db/queries";
import { convertToUIMessages } from "@/lib/utils";

export default function Page(props: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="flex h-dvh" />}>
      <ChatPage params={props.params} />
    </Suspense>
  );
}

async function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const chat = await getChatById({ id });

  if (!chat) {
    notFound();
  }

  const session = await auth();

  if (!session) {
    redirect("/api/auth/guest");
  }

  if (chat.visibility === "private") {
    if (!session.user) {
      return notFound();
    }

    if (session.user.id !== chat.userId) {
      return notFound();
    }
  }

  const messagesFromDb = await getMessagesByChatId({
    id,
  });

  const uiMessages = convertToUIMessages(messagesFromDb);

  const cookieStore = await cookies();
  const chatModelFromCookie = cookieStore.get("chat-model");

  if (!chatModelFromCookie) {
    return (
      <>
        <Chat
          autoResume={true}
          id={chat.id}
          initialChatModel={DEFAULT_CHAT_MODEL}
          initialLastContext={chat.lastContext ?? undefined}
          initialMessages={uiMessages}
          initialVisibilityType={chat.visibility}
          isReadonly={session?.user?.id !== chat.userId}
        />
        <DataStreamHandler />
      </>
    );
  }

  return (
    <>
      <Chat
        autoResume={true}
        id={chat.id}
        initialChatModel={chatModelFromCookie.value}
        initialLastContext={chat.lastContext ?? undefined}
        initialMessages={uiMessages}
        initialVisibilityType={chat.visibility}
        isReadonly={session?.user?.id !== chat.userId}
      />
      <DataStreamHandler />
    </>
  );
}
```

app/(auth)/api/auth/[...nextauth]/route.ts
```
// biome-ignore lint/performance/noBarrelFile: "Required"
export { GET, POST } from "@/app/(auth)/auth";
```

app/(auth)/api/auth/guest/route.ts
```
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { signIn } from "@/app/(auth)/auth";
import { isDevelopmentEnvironment } from "@/lib/constants";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const redirectUrl = searchParams.get("redirectUrl") || "/";

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: !isDevelopmentEnvironment,
  });

  if (token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return signIn("guest", { redirect: true, redirectTo: redirectUrl });
}
```

app/(chat)/api/avatar/upload/route.ts
```
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  // ⚠️ The below code is for App Router Route Handlers only
  const blob = await put(filename, request.body, {
    access: "public",
  });

  // Here's the code for Pages API Routes:
  // const blob = await put(filename, request, {
  //   access: 'public',
  // });

  return NextResponse.json(blob);
}

// The next lines are required for Pages API Routes only
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
```

app/(chat)/api/files/upload/route.ts
```
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/app/(auth)/auth";

// Use Blob instead of File since File is not available in Node.js environment
const FileSchema = z.object({
  file: z
    .instanceof(Blob)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size should be less than 5MB",
    })
    // Update the file type based on the kind of files you want to accept
    .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
      message: "File type should be JPEG or PNG",
    }),
});

export async function POST(request: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (request.body === null) {
    return new Response("Request body is empty", { status: 400 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as Blob;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const validatedFile = FileSchema.safeParse({ file });

    if (!validatedFile.success) {
      const errorMessage = validatedFile.error.errors
        .map((error) => error.message)
        .join(", ");

      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    // Get filename from formData since Blob doesn't have name property
    const filename = (formData.get("file") as File).name;
    const fileBuffer = await file.arrayBuffer();

    try {
      const data = await put(`${filename}`, fileBuffer, {
        access: "public",
      });

      return NextResponse.json(data);
    } catch (_error) {
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
```

app/(chat)/api/lmstudio/models/route.ts
```
// path: app/api/lmstudio/models/route.ts
import { NextResponse } from "next/server";
import { getLmStudioSnapshot } from "@/lib/ai/lmstudio-client";

export async function GET() {
  const snapshot = await getLmStudioSnapshot();

  return NextResponse.json(snapshot, {
    status: snapshot.isAvailable ? 200 : 503,
  });
}
```

app/(chat)/api/chat/[id]/stream/route.ts
```
import { createUIMessageStream, JsonToSseTransformStream } from "ai";
import { differenceInSeconds } from "date-fns";
import { auth } from "@/app/(auth)/auth";
import {
  getChatById,
  getMessagesByChatId,
  getStreamIdsByChatId,
} from "@/lib/db/queries";
import type { Chat } from "@/lib/db/schema";
import { ChatSDKError } from "@/lib/errors";
import type { ChatMessage } from "@/lib/types";
import { getStreamContext } from "../../route";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: chatId } = await params;

  const streamContext = getStreamContext();
  const resumeRequestedAt = new Date();

  if (!streamContext) {
    return new Response(null, { status: 204 });
  }

  if (!chatId) {
    return new ChatSDKError("bad_request:api").toResponse();
  }

  const session = await auth();

  if (!session?.user) {
    return new ChatSDKError("unauthorized:chat").toResponse();
  }

  let chat: Chat | null;

  try {
    chat = await getChatById({ id: chatId });
  } catch {
    return new ChatSDKError("not_found:chat").toResponse();
  }

  if (!chat) {
    return new ChatSDKError("not_found:chat").toResponse();
  }

  if (chat.visibility === "private" && chat.userId !== session.user.id) {
    return new ChatSDKError("forbidden:chat").toResponse();
  }

  const streamIds = await getStreamIdsByChatId({ chatId });

  if (!streamIds.length) {
    return new ChatSDKError("not_found:stream").toResponse();
  }

  const recentStreamId = streamIds.at(-1);

  if (!recentStreamId) {
    return new ChatSDKError("not_found:stream").toResponse();
  }

  const emptyDataStream = createUIMessageStream<ChatMessage>({
    // biome-ignore lint/suspicious/noEmptyBlockStatements: "Needs to exist"
    execute: () => {},
  });

  const stream = await streamContext.resumableStream(recentStreamId, () =>
    emptyDataStream.pipeThrough(new JsonToSseTransformStream())
  );

  /*
   * For when the generation is streaming during SSR
   * but the resumable stream has concluded at this point.
   */
  if (!stream) {
    const messages = await getMessagesByChatId({ id: chatId });
    const mostRecentMessage = messages.at(-1);

    if (!mostRecentMessage) {
      return new Response(emptyDataStream, { status: 200 });
    }

    if (mostRecentMessage.role !== "assistant") {
      return new Response(emptyDataStream, { status: 200 });
    }

    const messageCreatedAt = new Date(mostRecentMessage.createdAt);

    if (differenceInSeconds(resumeRequestedAt, messageCreatedAt) > 15) {
      return new Response(emptyDataStream, { status: 200 });
    }

    const restoredStream = createUIMessageStream<ChatMessage>({
      execute: ({ writer }) => {
        writer.write({
          type: "data-appendMessage",
          data: JSON.stringify(mostRecentMessage),
          transient: true,
        });
      },
    });

    return new Response(
      restoredStream.pipeThrough(new JsonToSseTransformStream()),
      { status: 200 }
    );
  }

  return new Response(stream, { status: 200 });
}
```

lib/constants.ts
```
import { generateDummyPassword } from "./db/utils";

export const isProductionEnvironment = process.env.NODE_ENV === "production";
export const isDevelopmentEnvironment = process.env.NODE_ENV === "development";
export const isTestEnvironment = Boolean(
  process.env.PLAYWRIGHT_TEST_BASE_URL ||
    process.env.PLAYWRIGHT ||
    process.env.CI_PLAYWRIGHT
);

export const guestRegex = /^guest-\d+$/;

export const DUMMY_PASSWORD = generateDummyPassword();
```

lib/errors.ts
```
export type ErrorType =
  | "bad_request"
  | "unauthorized"
  | "forbidden"
  | "not_found"
  | "rate_limit"
  | "offline";

export type Surface =
  | "chat"
  | "auth"
  | "api"
  | "stream"
  | "database"
  | "history"
  | "vote"
  | "document"
  | "suggestions"
  | "activate_gateway";

export type ErrorCode = `${ErrorType}:${Surface}`;

export type ErrorVisibility = "response" | "log" | "none";

export const visibilityBySurface: Record<Surface, ErrorVisibility> = {
  database: "log",
  chat: "response",
  auth: "response",
  stream: "response",
  api: "response",
  history: "response",
  vote: "response",
  document: "response",
  suggestions: "response",
  activate_gateway: "response",
};

export class ChatSDKError extends Error {
  type: ErrorType;
  surface: Surface;
  statusCode: number;

  constructor(errorCode: ErrorCode, cause?: string) {
    super();

    const [type, surface] = errorCode.split(":");

    this.type = type as ErrorType;
    this.cause = cause;
    this.surface = surface as Surface;
    this.message = getMessageByErrorCode(errorCode);
    this.statusCode = getStatusCodeByType(this.type);
  }

  toResponse() {
    const code: ErrorCode = `${this.type}:${this.surface}`;
    const visibility = visibilityBySurface[this.surface];

    const { message, cause, statusCode } = this;

    if (visibility === "log") {
      console.error({
        code,
        message,
        cause,
      });

      return Response.json(
        { code: "", message: "Something went wrong. Please try again later." },
        { status: statusCode }
      );
    }

    return Response.json({ code, message, cause }, { status: statusCode });
  }
}

export function getMessageByErrorCode(errorCode: ErrorCode): string {
  if (errorCode.includes("database")) {
    return "An error occurred while executing a database query.";
  }

  switch (errorCode) {
    case "bad_request:api":
      return "The request couldn't be processed. Please check your input and try again.";

    case "bad_request:activate_gateway":
      return "AI Gateway requires a valid credit card on file to service requests. Please visit https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai%3Fmodal%3Dadd-credit-card to add a card and unlock your free credits.";

    case "unauthorized:auth":
      return "You need to sign in before continuing.";
    case "forbidden:auth":
      return "Your account does not have access to this feature.";

    case "rate_limit:chat":
      return "You have exceeded your maximum number of messages for the day. Please try again later.";
    case "not_found:chat":
      return "The requested chat was not found. Please check the chat ID and try again.";
    case "forbidden:chat":
      return "This chat belongs to another user. Please check the chat ID and try again.";
    case "unauthorized:chat":
      return "You need to sign in to view this chat. Please sign in and try again.";
    case "offline:chat":
      return "We're having trouble sending your message. Please check your internet connection and try again.";

    case "not_found:document":
      return "The requested document was not found. Please check the document ID and try again.";
    case "forbidden:document":
      return "This document belongs to another user. Please check the document ID and try again.";
    case "unauthorized:document":
      return "You need to sign in to view this document. Please sign in and try again.";
    case "bad_request:document":
      return "The request to create or update the document was invalid. Please check your input and try again.";

    default:
      return "Something went wrong. Please try again later.";
  }
}

function getStatusCodeByType(type: ErrorType) {
  switch (type) {
    case "bad_request":
      return 400;
    case "unauthorized":
      return 401;
    case "forbidden":
      return 403;
    case "not_found":
      return 404;
    case "rate_limit":
      return 429;
    case "offline":
      return 503;
    default:
      return 500;
  }
}
```

lib/types.ts
```
import type { InferUITool, UIMessage } from "ai";
import { z } from "zod";
import type { ArtifactKind } from "@/components/artifact";
import type { createDocument } from "./ai/tools/create-document";
import type { getWeather } from "./ai/tools/get-weather";
import type { requestSuggestions } from "./ai/tools/request-suggestions";
import type { updateDocument } from "./ai/tools/update-document";
import type { Suggestion } from "./db/schema";
import type { AppUsage } from "./usage";

export type DataPart = { type: "append-message"; message: string };

export const messageMetadataSchema = z.object({
  createdAt: z.string(),
});

export type MessageMetadata = z.infer<typeof messageMetadataSchema>;

type weatherTool = InferUITool<typeof getWeather>;
type createDocumentTool = InferUITool<ReturnType<typeof createDocument>>;
type updateDocumentTool = InferUITool<ReturnType<typeof updateDocument>>;
type requestSuggestionsTool = InferUITool<
  ReturnType<typeof requestSuggestions>
>;

export type ChatTools = {
  getWeather: weatherTool;
  createDocument: createDocumentTool;
  updateDocument: updateDocumentTool;
  requestSuggestions: requestSuggestionsTool;
};

export type CustomUIDataTypes = {
  textDelta: string;
  imageDelta: string;
  sheetDelta: string;
  codeDelta: string;
  suggestion: Suggestion;
  appendMessage: string;
  id: string;
  title: string;
  kind: ArtifactKind;
  clear: null;
  finish: null;
  usage: AppUsage;
};

export type ChatMessage = UIMessage<
  MessageMetadata,
  CustomUIDataTypes,
  ChatTools
>;

export type Attachment = {
  name: string;
  url: string;
  contentType: string;
};
```

lib/usage.ts
```
import type { LanguageModelUsage } from "ai";
import type { UsageData } from "tokenlens/helpers";

// Server-merged usage: base usage + TokenLens summary + optional modelId
export type AppUsage = LanguageModelUsage & UsageData & { modelId?: string };
```

lib/utils.ts
```
import type {
  CoreAssistantMessage,
  CoreToolMessage,
  UIMessage,
  UIMessagePart,
} from 'ai';
import { type ClassValue, clsx } from 'clsx';
import { formatISO } from 'date-fns';
import { twMerge } from 'tailwind-merge';
import type { DBMessage, Document } from '@/lib/db/schema';
import { ChatSDKError, type ErrorCode } from './errors';
import type { ChatMessage, ChatTools, CustomUIDataTypes } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const { code, cause } = await response.json();
    throw new ChatSDKError(code as ErrorCode, cause);
  }

  return response.json();
};

export async function fetchWithErrorHandlers(
  input: RequestInfo | URL,
  init?: RequestInit,
) {
  try {
    const response = await fetch(input, init);

    if (!response.ok) {
      const { code, cause } = await response.json();
      throw new ChatSDKError(code as ErrorCode, cause);
    }

    return response;
  } catch (error: unknown) {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      throw new ChatSDKError('offline:chat');
    }

    throw error;
  }
}

export function getLocalStorage(key: string) {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }
  return [];
}

export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

type ResponseMessageWithoutId = CoreToolMessage | CoreAssistantMessage;
type ResponseMessage = ResponseMessageWithoutId & { id: string };

export function getMostRecentUserMessage(messages: UIMessage[]) {
  const userMessages = messages.filter((message) => message.role === 'user');
  return userMessages.at(-1);
}

export function getDocumentTimestampByIndex(
  documents: Document[],
  index: number,
) {
  if (!documents) { return new Date(); }
  if (index > documents.length) { return new Date(); }

  return documents[index].createdAt;
}

export function getTrailingMessageId({
  messages,
}: {
  messages: ResponseMessage[];
}): string | null {
  const trailingMessage = messages.at(-1);

  if (!trailingMessage) { return null; }

  return trailingMessage.id;
}

export function sanitizeText(text: string) {
  return text.replace('<has_function_call>', '');
}

export function convertToUIMessages(messages: DBMessage[]): ChatMessage[] {
  return messages.map((message) => ({
    id: message.id,
    role: message.role as 'user' | 'assistant' | 'system',
    parts: message.parts as UIMessagePart<CustomUIDataTypes, ChatTools>[],
    metadata: {
      createdAt: formatISO(message.createdAt),
    },
  }));
}

export function getTextFromMessage(message: ChatMessage | UIMessage): string {
  return message.parts
    .filter((part) => part.type === 'text')
    .map((part) => (part as { type: 'text'; text: string}).text)
    .join('');
}
```

lib/ai/entitlements.ts
```
import type { UserType } from "@/app/(auth)/auth";
import type { ChatModel } from "./models";

type Entitlements = {
  maxMessagesPerDay: number;
  availableChatModelIds: ChatModel["id"][];
};

export const entitlementsByUserType: Record<UserType, Entitlements> = {
  /*
   * For users without an account
   */
  guest: {
    maxMessagesPerDay: 20,
    availableChatModelIds: ["chat-model", "chat-model-reasoning"],
  },

  /*
   * For users with an account
   */
  regular: {
    maxMessagesPerDay: 100,
    availableChatModelIds: ["chat-model", "chat-model-reasoning"],
  },

  /*
   * TODO: For users with an account and a paid membership
   */
};
```

lib/ai/lmstudio-client.ts
```
// path: lib/ai/lmstudio-client.ts
import { LMStudioClient } from "@lmstudio/sdk";

const client = new LMStudioClient();

type DownloadedModels = Awaited<
  ReturnType<LMStudioClient["system"]["listDownloadedModels"]>
>;
type LoadedModels = Awaited<
  ReturnType<LMStudioClient["llm"]["listLoaded"]>
>;
type VersionInfo = Awaited<
  ReturnType<LMStudioClient["system"]["getLMStudioVersion"]>
>;

export type LmStudioSnapshot = {
  downloaded: DownloadedModels;
  loaded: LoadedModels;
  version?: VersionInfo;
  isAvailable: boolean;
  errors: string[];
};

async function attempt<T>(label: string, fn: () => Promise<T>) {
  try {
    const data = await fn();
    return { data } as const;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown LM Studio error";
    console.error(`[LM Studio] ${label} failed`, error);
    return { error: message } as const;
  }
}

export async function getLmStudioSnapshot(): Promise<LmStudioSnapshot> {
  const versionResult = await attempt("getLMStudioVersion", () =>
    client.system.getLMStudioVersion()
  );
  const downloadedResult = await attempt("listDownloadedModels", () =>
    client.system.listDownloadedModels()
  );
  const loadedResult = await attempt("listLoadedModels", () =>
    client.llm.listLoaded()
  );

  const errors = [
    versionResult.error,
    downloadedResult.error,
    loadedResult.error,
  ].filter(Boolean) as string[];

  return {
    downloaded: downloadedResult.data ?? [],
    loaded: loadedResult.data ?? [],
    version: versionResult.data,
    isAvailable: !versionResult.error,
    errors,
  };
}
```

lib/ai/models.mock.ts
```
import type { LanguageModel } from "ai";

const createMockModel = (): LanguageModel => {
  return {
    specificationVersion: "v2",
    provider: "mock",
    modelId: "mock-model",
    defaultObjectGenerationMode: "tool",
    supportedUrls: [],
    supportsImageUrls: false,
    supportsStructuredOutputs: false,
    doGenerate: async () => ({
      rawCall: { rawPrompt: null, rawSettings: {} },
      finishReason: "stop",
      usage: { inputTokens: 10, outputTokens: 20, totalTokens: 30 },
      content: [{ type: "text", text: "Hello, world!" }],
      warnings: [],
    }),
    doStream: async () => ({
      stream: new ReadableStream({
        start(controller) {
          controller.enqueue({
            type: "text-delta",
            id: "mock-id",
            delta: "Mock response",
          });
          controller.close();
        },
      }),
      rawCall: { rawPrompt: null, rawSettings: {} },
    }),
  } as unknown as LanguageModel;
};

export const chatModel = createMockModel();
export const reasoningModel = createMockModel();
export const titleModel = createMockModel();
export const artifactModel = createMockModel();
```

lib/ai/models.test.ts
```
import { simulateReadableStream } from "ai";
import { MockLanguageModelV2 } from "ai/test";
import { getResponseChunksByPrompt } from "@/tests/prompts/utils";

export const chatModel = new MockLanguageModelV2({
  doGenerate: async () => ({
    rawCall: { rawPrompt: null, rawSettings: {} },
    finishReason: "stop",
    usage: { inputTokens: 10, outputTokens: 20, totalTokens: 30 },
    content: [{ type: "text", text: "Hello, world!" }],
    warnings: [],
  }),
  doStream: async ({ prompt }) => ({
    stream: simulateReadableStream({
      chunkDelayInMs: 500,
      initialDelayInMs: 1000,
      chunks: getResponseChunksByPrompt(prompt),
    }),
    rawCall: { rawPrompt: null, rawSettings: {} },
  }),
});

export const reasoningModel = new MockLanguageModelV2({
  doGenerate: async () => ({
    rawCall: { rawPrompt: null, rawSettings: {} },
    finishReason: "stop",
    usage: { inputTokens: 10, outputTokens: 20, totalTokens: 30 },
    content: [{ type: "text", text: "Hello, world!" }],
    warnings: [],
  }),
  doStream: async ({ prompt }) => ({
    stream: simulateReadableStream({
      chunkDelayInMs: 500,
      initialDelayInMs: 1000,
      chunks: getResponseChunksByPrompt(prompt, true),
    }),
    rawCall: { rawPrompt: null, rawSettings: {} },
  }),
});

export const titleModel = new MockLanguageModelV2({
  doGenerate: async () => ({
    rawCall: { rawPrompt: null, rawSettings: {} },
    finishReason: "stop",
    usage: { inputTokens: 10, outputTokens: 20, totalTokens: 30 },
    content: [{ type: "text", text: "This is a test title" }],
    warnings: [],
  }),
  doStream: async () => ({
    stream: simulateReadableStream({
      chunkDelayInMs: 500,
      initialDelayInMs: 1000,
      chunks: [
        { id: "1", type: "text-start" },
        { id: "1", type: "text-delta", delta: "This is a test title" },
        { id: "1", type: "text-end" },
        {
          type: "finish",
          finishReason: "stop",
          usage: { inputTokens: 3, outputTokens: 10, totalTokens: 13 },
        },
      ],
    }),
    rawCall: { rawPrompt: null, rawSettings: {} },
  }),
});

export const artifactModel = new MockLanguageModelV2({
  doGenerate: async () => ({
    rawCall: { rawPrompt: null, rawSettings: {} },
    finishReason: "stop",
    usage: { inputTokens: 10, outputTokens: 20, totalTokens: 30 },
    content: [{ type: "text", text: "Hello, world!" }],
    warnings: [],
  }),
  doStream: async ({ prompt }) => ({
    stream: simulateReadableStream({
      chunkDelayInMs: 50,
      initialDelayInMs: 100,
      chunks: getResponseChunksByPrompt(prompt),
    }),
    rawCall: { rawPrompt: null, rawSettings: {} },
  }),
});
```

lib/ai/models.ts
```
// path: lib/ai/models.ts

// 1. Set LM Studio as the default for new chats
export const DEFAULT_CHAT_MODEL: string = "lmstudio-chat";

export type ChatModel = {
  id: string;
  name: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  {
    id: "lmstudio-chat",
    name: "LM Studio (Local)",
    description: "Local model running via LM Studio (localhost:1234)",
  },
  {
    id: "chat-model",
    name: "Grok Vision",
    description: "Advanced multimodal model with vision and text capabilities",
  },
  {
    id: "chat-model-reasoning",
    name: "Grok Reasoning",
    description:
      "Uses advanced chain-of-thought reasoning for complex problems",
  },
  {
    id: "gemini-2.5-pro",
    name: "Gemini 2.5 Pro (CLI)",
    description:
      "Google Gemini via ai-sdk-provider-gemini-cli and Gemini CLI / API key",
  },
];
```

lib/ai/prompts.ts
```
import type { Geo } from "@vercel/functions";
import type { ArtifactKind } from "@/components/artifact";

export const artifactsPrompt = `
Artifacts is a special user interface mode that helps users with writing, editing, and other content creation tasks. When artifact is open, it is on the right side of the screen, while the conversation is on the left side. When creating or updating documents, changes are reflected in real-time on the artifacts and visible to the user.

When asked to write code, always use artifacts. When writing code, specify the language in the backticks, e.g. \`\`\`python\`code here\`\`\`. The default language is Python. Other languages are not yet supported, so let the user know if they request a different language.

DO NOT UPDATE DOCUMENTS IMMEDIATELY AFTER CREATING THEM. WAIT FOR USER FEEDBACK OR REQUEST TO UPDATE IT.

This is a guide for using artifacts tools: \`createDocument\` and \`updateDocument\`, which render content on a artifacts beside the conversation.

**When to use \`createDocument\`:**
- For substantial content (>10 lines) or code
- For content users will likely save/reuse (emails, code, essays, etc.)
- When explicitly requested to create a document
- For when content contains a single code snippet

**When NOT to use \`createDocument\`:**
- For informational/explanatory content
- For conversational responses
- When asked to keep it in chat

**Using \`updateDocument\`:**
- Default to full document rewrites for major changes
- Use targeted updates only for specific, isolated changes
- Follow user instructions for which parts to modify

**When NOT to use \`updateDocument\`:**
- Immediately after creating a document

Do not update document right after creating it. Wait for user feedback or request to update it.
`;

export const regularPrompt =
  "You are a friendly assistant! Keep your responses concise and helpful.";

export type RequestHints = {
  latitude: Geo["latitude"];
  longitude: Geo["longitude"];
  city: Geo["city"];
  country: Geo["country"];
};

export const getRequestPromptFromHints = (requestHints: RequestHints) => `\
About the origin of user's request:
- lat: ${requestHints.latitude}
- lon: ${requestHints.longitude}
- city: ${requestHints.city}
- country: ${requestHints.country}
`;

export const systemPrompt = ({
  selectedChatModel,
  requestHints,
}: {
  selectedChatModel: string;
  requestHints: RequestHints;
}) => {
  const requestPrompt = getRequestPromptFromHints(requestHints);

  if (selectedChatModel === "chat-model-reasoning") {
    return `${regularPrompt}\n\n${requestPrompt}`;
  }

  return `${regularPrompt}\n\n${requestPrompt}\n\n${artifactsPrompt}`;
};

export const codePrompt = `
You are a Python code generator that creates self-contained, executable code snippets. When writing code:

1. Each snippet should be complete and runnable on its own
2. Prefer using print() statements to display outputs
3. Include helpful comments explaining the code
4. Keep snippets concise (generally under 15 lines)
5. Avoid external dependencies - use Python standard library
6. Handle potential errors gracefully
7. Return meaningful output that demonstrates the code's functionality
8. Don't use input() or other interactive functions
9. Don't access files or network resources
10. Don't use infinite loops

Examples of good snippets:

# Calculate factorial iteratively
def factorial(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result

print(f"Factorial of 5 is: {factorial(5)}")
`;

export const sheetPrompt = `
You are a spreadsheet creation assistant. Create a spreadsheet in csv format based on the given prompt. The spreadsheet should contain meaningful column headers and data.
`;

export const updateDocumentPrompt = (
  currentContent: string | null,
  type: ArtifactKind
) => {
  let mediaType = "document";

  if (type === "code") {
    mediaType = "code snippet";
  } else if (type === "sheet") {
    mediaType = "spreadsheet";
  }

  return `Improve the following contents of the ${mediaType} based on the given prompt.

${currentContent}`;
};

export const titlePrompt = `\n
    - you will generate a short title based on the first message a user begins a conversation with
    - ensure it is not more than 80 characters long
    - the title should be a summary of the user's message
    - do not use quotes or colons`;
```

lib/ai/providers.ts
```
import { gateway } from "@ai-sdk/gateway";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { createGeminiProvider } from "ai-sdk-provider-gemini-cli";
import { isTestEnvironment } from "../constants";

const lmstudio = createOpenAICompatible({
  name: "lmstudio",
  baseURL: process.env.LMSTUDIO_BASE_URL ?? "http://localhost:1234/v1",
});

const LMSTUDIO_CHAT_MODEL_ID =
  process.env.LMSTUDIO_CHAT_MODEL_ID ??
  process.env.LMSTUDIO_MODEL_ID ??
  "llama-3.2-1b";

function resolveGeminiProvider() {
  const authType = process.env.GEMINI_AUTH_TYPE?.toLowerCase();

  if (authType === "api-key" || authType === "gemini-api-key") {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error(
        "GEMINI_AUTH_TYPE is set to an API key mode but GEMINI_API_KEY is missing."
      );
    }

    return createGeminiProvider({
      authType: authType === "api-key" ? "api-key" : "gemini-api-key",
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  if (authType === "oauth" || authType === "oauth-personal" || !authType) {
    return createGeminiProvider({ authType: "oauth-personal" });
  }

  console.warn(
    `[Gemini] Unsupported GEMINI_AUTH_TYPE "${authType}". Falling back to oauth-personal.`
  );
  return createGeminiProvider({ authType: "oauth-personal" });
}

const gemini = resolveGeminiProvider();

export const myProvider = isTestEnvironment
  ? (() => {
      const {
        artifactModel,
        chatModel,
        reasoningModel,
        titleModel,
      } = require("./models.mock");
      return customProvider({
        languageModels: {
          "chat-model": chatModel,
          "chat-model-reasoning": reasoningModel,
          "title-model": titleModel,
          "artifact-model": artifactModel,
        },
      });
    })()
  : customProvider({
      languageModels: {
        "chat-model": gateway.languageModel("xai/grok-2-vision-1212"),
        "chat-model-reasoning": wrapLanguageModel({
          model: gateway.languageModel("xai/grok-3-mini"),
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),
        "title-model": gateway.languageModel("xai/grok-2-1212"),
        "artifact-model": gateway.languageModel("xai/grok-2-1212"),
        // NEW: LM Studio chat model
        //
        // Make sure you have this model downloaded in LM Studio and that
        // the ID matches what LM Studio exposes (e.g. "llama-3.2-1b").
        "lmstudio-chat": lmstudio(LMSTUDIO_CHAT_MODEL_ID),

        // NEW: Gemini chat model via ai-sdk-provider-gemini-cli
        //
        // This ID must match what you configure in the UI (see models.ts).
        "gemini-2.5-pro": gemini("gemini-2.5-pro"),
      },
    });
```

lib/artifacts/server.ts
```
import type { UIMessageStreamWriter } from "ai";
import type { Session } from "next-auth";
import { codeDocumentHandler } from "@/artifacts/code/server";
import { sheetDocumentHandler } from "@/artifacts/sheet/server";
import { textDocumentHandler } from "@/artifacts/text/server";
import type { ArtifactKind } from "@/components/artifact";
import { saveDocument } from "../db/queries";
import type { Document } from "../db/schema";
import type { ChatMessage } from "../types";

export type SaveDocumentProps = {
  id: string;
  title: string;
  kind: ArtifactKind;
  content: string;
  userId: string;
};

export type CreateDocumentCallbackProps = {
  id: string;
  title: string;
  dataStream: UIMessageStreamWriter<ChatMessage>;
  session: Session;
};

export type UpdateDocumentCallbackProps = {
  document: Document;
  description: string;
  dataStream: UIMessageStreamWriter<ChatMessage>;
  session: Session;
};

export type DocumentHandler<T = ArtifactKind> = {
  kind: T;
  onCreateDocument: (args: CreateDocumentCallbackProps) => Promise<void>;
  onUpdateDocument: (args: UpdateDocumentCallbackProps) => Promise<void>;
};

export function createDocumentHandler<T extends ArtifactKind>(config: {
  kind: T;
  onCreateDocument: (params: CreateDocumentCallbackProps) => Promise<string>;
  onUpdateDocument: (params: UpdateDocumentCallbackProps) => Promise<string>;
}): DocumentHandler<T> {
  return {
    kind: config.kind,
    onCreateDocument: async (args: CreateDocumentCallbackProps) => {
      const draftContent = await config.onCreateDocument({
        id: args.id,
        title: args.title,
        dataStream: args.dataStream,
        session: args.session,
      });

      if (args.session?.user?.id) {
        await saveDocument({
          id: args.id,
          title: args.title,
          content: draftContent,
          kind: config.kind,
          userId: args.session.user.id,
        });
      }

      return;
    },
    onUpdateDocument: async (args: UpdateDocumentCallbackProps) => {
      const draftContent = await config.onUpdateDocument({
        document: args.document,
        description: args.description,
        dataStream: args.dataStream,
        session: args.session,
      });

      if (args.session?.user?.id) {
        await saveDocument({
          id: args.document.id,
          title: args.document.title,
          content: draftContent,
          kind: config.kind,
          userId: args.session.user.id,
        });
      }

      return;
    },
  };
}

/*
 * Use this array to define the document handlers for each artifact kind.
 */
export const documentHandlersByArtifactKind: DocumentHandler[] = [
  textDocumentHandler,
  codeDocumentHandler,
  sheetDocumentHandler,
];

export const artifactKinds = ["text", "code", "sheet"] as const;
```

lib/db/migrate.ts
```
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

config({
  path: ".env.local",
});

const runMigrate = async () => {
  if (!process.env.POSTGRES_URL) {
    throw new Error("POSTGRES_URL is not defined");
  }

  const connection = postgres(process.env.POSTGRES_URL, { max: 1 });
  const db = drizzle(connection);

  console.log("⏳ Running migrations...");

  const start = Date.now();
  await migrate(db, { migrationsFolder: "./lib/db/migrations" });
  const end = Date.now();

  console.log("✅ Migrations completed in", end - start, "ms");
  process.exit(0);
};

runMigrate().catch((err) => {
  console.error("❌ Migration failed");
  console.error(err);
  process.exit(1);
});
```

lib/db/queries.ts
```
import "server-only";

import {
  and,
  asc,
  count,
  desc,
  eq,
  gt,
  gte,
  inArray,
  lt,
  type SQL,
} from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import type { ArtifactKind } from "@/components/artifact";
import type { VisibilityType } from "@/components/visibility-selector";
import { ChatSDKError } from "../errors";
import type { AppUsage } from "../usage";
import { generateUUID } from "../utils";
import {
  type Chat,
  chat,
  type DBMessage,
  document,
  message,
  type Suggestion,
  stream,
  suggestion,
  type User,
  user,
  vote,
} from "./schema";
import { generateHashedPassword } from "./utils";

// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle

// biome-ignore lint: Forbidden non-null assertion.
const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

export async function getUser(email: string): Promise<User[]> {
  try {
    return await db.select().from(user).where(eq(user.email, email));
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to get user by email"
    );
  }
}

export async function createUser(email: string, password: string) {
  const hashedPassword = generateHashedPassword(password);

  try {
    return await db.insert(user).values({ email, password: hashedPassword });
  } catch (_error) {
    throw new ChatSDKError("bad_request:database", "Failed to create user");
  }
}

export async function createGuestUser() {
  const email = `guest-${Date.now()}`;
  const password = generateHashedPassword(generateUUID());

  try {
    return await db.insert(user).values({ email, password }).returning({
      id: user.id,
      email: user.email,
    });
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to create guest user"
    );
  }
}

export async function saveChat({
  id,
  userId,
  title,
  visibility,
}: {
  id: string;
  userId: string;
  title: string;
  visibility: VisibilityType;
}) {
  try {
    return await db.insert(chat).values({
      id,
      createdAt: new Date(),
      userId,
      title,
      visibility,
    });
  } catch (_error) {
    throw new ChatSDKError("bad_request:database", "Failed to save chat");
  }
}

export async function deleteChatById({ id }: { id: string }) {
  try {
    await db.delete(vote).where(eq(vote.chatId, id));
    await db.delete(message).where(eq(message.chatId, id));
    await db.delete(stream).where(eq(stream.chatId, id));

    const [chatsDeleted] = await db
      .delete(chat)
      .where(eq(chat.id, id))
      .returning();
    return chatsDeleted;
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to delete chat by id"
    );
  }
}

export async function deleteAllChatsByUserId({ userId }: { userId: string }) {
  try {
    const userChats = await db
      .select({ id: chat.id })
      .from(chat)
      .where(eq(chat.userId, userId));

    if (userChats.length === 0) {
      return { deletedCount: 0 };
    }

    const chatIds = userChats.map((c) => c.id);

    await db.delete(vote).where(inArray(vote.chatId, chatIds));
    await db.delete(message).where(inArray(message.chatId, chatIds));
    await db.delete(stream).where(inArray(stream.chatId, chatIds));

    const deletedChats = await db
      .delete(chat)
      .where(eq(chat.userId, userId))
      .returning();

    return { deletedCount: deletedChats.length };
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to delete all chats by user id"
    );
  }
}

export async function getChatsByUserId({
  id,
  limit,
  startingAfter,
  endingBefore,
}: {
  id: string;
  limit: number;
  startingAfter: string | null;
  endingBefore: string | null;
}) {
  try {
    const extendedLimit = limit + 1;

    const query = (whereCondition?: SQL<any>) =>
      db
        .select()
        .from(chat)
        .where(
          whereCondition
            ? and(whereCondition, eq(chat.userId, id))
            : eq(chat.userId, id)
        )
        .orderBy(desc(chat.createdAt))
        .limit(extendedLimit);

    let filteredChats: Chat[] = [];

    if (startingAfter) {
      const [selectedChat] = await db
        .select()
        .from(chat)
        .where(eq(chat.id, startingAfter))
        .limit(1);

      if (!selectedChat) {
        throw new ChatSDKError(
          "not_found:database",
          `Chat with id ${startingAfter} not found`
        );
      }

      filteredChats = await query(gt(chat.createdAt, selectedChat.createdAt));
    } else if (endingBefore) {
      const [selectedChat] = await db
        .select()
        .from(chat)
        .where(eq(chat.id, endingBefore))
        .limit(1);

      if (!selectedChat) {
        throw new ChatSDKError(
          "not_found:database",
          `Chat with id ${endingBefore} not found`
        );
      }

      filteredChats = await query(lt(chat.createdAt, selectedChat.createdAt));
    } else {
      filteredChats = await query();
    }

    const hasMore = filteredChats.length > limit;

    return {
      chats: hasMore ? filteredChats.slice(0, limit) : filteredChats,
      hasMore,
    };
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to get chats by user id"
    );
  }
}

export async function getChatById({ id }: { id: string }) {
  try {
    const [selectedChat] = await db.select().from(chat).where(eq(chat.id, id));
    if (!selectedChat) {
      return null;
    }

    return selectedChat;
  } catch (_error) {
    throw new ChatSDKError("bad_request:database", "Failed to get chat by id");
  }
}

export async function saveMessages({ messages }: { messages: DBMessage[] }) {
  try {
    return await db.insert(message).values(messages);
  } catch (_error) {
    throw new ChatSDKError("bad_request:database", "Failed to save messages");
  }
}

export async function getMessagesByChatId({ id }: { id: string }) {
  try {
    return await db
      .select()
      .from(message)
      .where(eq(message.chatId, id))
      .orderBy(asc(message.createdAt));
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to get messages by chat id"
    );
  }
}

export async function voteMessage({
  chatId,
  messageId,
  type,
}: {
  chatId: string;
  messageId: string;
  type: "up" | "down";
}) {
  try {
    const [existingVote] = await db
      .select()
      .from(vote)
      .where(and(eq(vote.messageId, messageId)));

    if (existingVote) {
      return await db
        .update(vote)
        .set({ isUpvoted: type === "up" })
        .where(and(eq(vote.messageId, messageId), eq(vote.chatId, chatId)));
    }
    return await db.insert(vote).values({
      chatId,
      messageId,
      isUpvoted: type === "up",
    });
  } catch (_error) {
    throw new ChatSDKError("bad_request:database", "Failed to vote message");
  }
}

export async function getVotesByChatId({ id }: { id: string }) {
  try {
    return await db.select().from(vote).where(eq(vote.chatId, id));
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to get votes by chat id"
    );
  }
}

export async function saveDocument({
  id,
  title,
  kind,
  content,
  userId,
}: {
  id: string;
  title: string;
  kind: ArtifactKind;
  content: string;
  userId: string;
}) {
  try {
    return await db
      .insert(document)
      .values({
        id,
        title,
        kind,
        content,
        userId,
        createdAt: new Date(),
      })
      .returning();
  } catch (_error) {
    throw new ChatSDKError("bad_request:database", "Failed to save document");
  }
}

export async function getDocumentsById({ id }: { id: string }) {
  try {
    const documents = await db
      .select()
      .from(document)
      .where(eq(document.id, id))
      .orderBy(asc(document.createdAt));

    return documents;
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to get documents by id"
    );
  }
}

export async function getDocumentById({ id }: { id: string }) {
  try {
    const [selectedDocument] = await db
      .select()
      .from(document)
      .where(eq(document.id, id))
      .orderBy(desc(document.createdAt));

    return selectedDocument;
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to get document by id"
    );
  }
}

export async function deleteDocumentsByIdAfterTimestamp({
  id,
  timestamp,
}: {
  id: string;
  timestamp: Date;
}) {
  try {
    await db
      .delete(suggestion)
      .where(
        and(
          eq(suggestion.documentId, id),
          gt(suggestion.documentCreatedAt, timestamp)
        )
      );

    return await db
      .delete(document)
      .where(and(eq(document.id, id), gt(document.createdAt, timestamp)))
      .returning();
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to delete documents by id after timestamp"
    );
  }
}

export async function saveSuggestions({
  suggestions,
}: {
  suggestions: Suggestion[];
}) {
  try {
    return await db.insert(suggestion).values(suggestions);
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to save suggestions"
    );
  }
}

export async function getSuggestionsByDocumentId({
  documentId,
}: {
  documentId: string;
}) {
  try {
    return await db
      .select()
      .from(suggestion)
      .where(eq(suggestion.documentId, documentId));
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to get suggestions by document id"
    );
  }
}

export async function getMessageById({ id }: { id: string }) {
  try {
    return await db.select().from(message).where(eq(message.id, id));
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to get message by id"
    );
  }
}

export async function deleteMessagesByChatIdAfterTimestamp({
  chatId,
  timestamp,
}: {
  chatId: string;
  timestamp: Date;
}) {
  try {
    const messagesToDelete = await db
      .select({ id: message.id })
      .from(message)
      .where(
        and(eq(message.chatId, chatId), gte(message.createdAt, timestamp))
      );

    const messageIds = messagesToDelete.map(
      (currentMessage) => currentMessage.id
    );

    if (messageIds.length > 0) {
      await db
        .delete(vote)
        .where(
          and(eq(vote.chatId, chatId), inArray(vote.messageId, messageIds))
        );

      return await db
        .delete(message)
        .where(
          and(eq(message.chatId, chatId), inArray(message.id, messageIds))
        );
    }
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to delete messages by chat id after timestamp"
    );
  }
}

export async function updateChatVisibilityById({
  chatId,
  visibility,
}: {
  chatId: string;
  visibility: "private" | "public";
}) {
  try {
    return await db.update(chat).set({ visibility }).where(eq(chat.id, chatId));
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to update chat visibility by id"
    );
  }
}

export async function updateChatLastContextById({
  chatId,
  context,
}: {
  chatId: string;
  // Store merged server-enriched usage object
  context: AppUsage;
}) {
  try {
    return await db
      .update(chat)
      .set({ lastContext: context })
      .where(eq(chat.id, chatId));
  } catch (error) {
    console.warn("Failed to update lastContext for chat", chatId, error);
    return;
  }
}

export async function getMessageCountByUserId({
  id,
  differenceInHours,
}: {
  id: string;
  differenceInHours: number;
}) {
  try {
    const twentyFourHoursAgo = new Date(
      Date.now() - differenceInHours * 60 * 60 * 1000
    );

    const [stats] = await db
      .select({ count: count(message.id) })
      .from(message)
      .innerJoin(chat, eq(message.chatId, chat.id))
      .where(
        and(
          eq(chat.userId, id),
          gte(message.createdAt, twentyFourHoursAgo),
          eq(message.role, "user")
        )
      )
      .execute();

    return stats?.count ?? 0;
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to get message count by user id"
    );
  }
}

export async function createStreamId({
  streamId,
  chatId,
}: {
  streamId: string;
  chatId: string;
}) {
  try {
    await db
      .insert(stream)
      .values({ id: streamId, chatId, createdAt: new Date() });
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to create stream id"
    );
  }
}

export async function getStreamIdsByChatId({ chatId }: { chatId: string }) {
  try {
    const streamIds = await db
      .select({ id: stream.id })
      .from(stream)
      .where(eq(stream.chatId, chatId))
      .orderBy(asc(stream.createdAt))
      .execute();

    return streamIds.map(({ id }) => id);
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to get stream ids by chat id"
    );
  }
}
```

lib/db/schema.ts
```
import type { InferSelectModel } from "drizzle-orm";
import {
  boolean,
  foreignKey,
  json,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import type { AppUsage } from "../usage";

export const user = pgTable("User", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  email: varchar("email", { length: 64 }).notNull(),
  password: varchar("password", { length: 64 }),
});

export type User = InferSelectModel<typeof user>;

export const chat = pgTable("Chat", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  createdAt: timestamp("createdAt").notNull(),
  title: text("title").notNull(),
  userId: uuid("userId")
    .notNull()
    .references(() => user.id),
  visibility: varchar("visibility", { enum: ["public", "private"] })
    .notNull()
    .default("private"),
  lastContext: jsonb("lastContext").$type<AppUsage | null>(),
});

export type Chat = InferSelectModel<typeof chat>;

// DEPRECATED: The following schema is deprecated and will be removed in the future.
// Read the migration guide at https://chat-sdk.dev/docs/migration-guides/message-parts
export const messageDeprecated = pgTable("Message", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  chatId: uuid("chatId")
    .notNull()
    .references(() => chat.id),
  role: varchar("role").notNull(),
  content: json("content").notNull(),
  createdAt: timestamp("createdAt").notNull(),
});

export type MessageDeprecated = InferSelectModel<typeof messageDeprecated>;

export const message = pgTable("Message_v2", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  chatId: uuid("chatId")
    .notNull()
    .references(() => chat.id),
  role: varchar("role").notNull(),
  parts: json("parts").notNull(),
  attachments: json("attachments").notNull(),
  createdAt: timestamp("createdAt").notNull(),
});

export type DBMessage = InferSelectModel<typeof message>;

// DEPRECATED: The following schema is deprecated and will be removed in the future.
// Read the migration guide at https://chat-sdk.dev/docs/migration-guides/message-parts
export const voteDeprecated = pgTable(
  "Vote",
  {
    chatId: uuid("chatId")
      .notNull()
      .references(() => chat.id),
    messageId: uuid("messageId")
      .notNull()
      .references(() => messageDeprecated.id),
    isUpvoted: boolean("isUpvoted").notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.chatId, table.messageId] }),
    };
  }
);

export type VoteDeprecated = InferSelectModel<typeof voteDeprecated>;

export const vote = pgTable(
  "Vote_v2",
  {
    chatId: uuid("chatId")
      .notNull()
      .references(() => chat.id),
    messageId: uuid("messageId")
      .notNull()
      .references(() => message.id),
    isUpvoted: boolean("isUpvoted").notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.chatId, table.messageId] }),
    };
  }
);

export type Vote = InferSelectModel<typeof vote>;

export const document = pgTable(
  "Document",
  {
    id: uuid("id").notNull().defaultRandom(),
    createdAt: timestamp("createdAt").notNull(),
    title: text("title").notNull(),
    content: text("content"),
    kind: varchar("text", { enum: ["text", "code", "image", "sheet"] })
      .notNull()
      .default("text"),
    userId: uuid("userId")
      .notNull()
      .references(() => user.id),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.id, table.createdAt] }),
    };
  }
);

export type Document = InferSelectModel<typeof document>;

export const suggestion = pgTable(
  "Suggestion",
  {
    id: uuid("id").notNull().defaultRandom(),
    documentId: uuid("documentId").notNull(),
    documentCreatedAt: timestamp("documentCreatedAt").notNull(),
    originalText: text("originalText").notNull(),
    suggestedText: text("suggestedText").notNull(),
    description: text("description"),
    isResolved: boolean("isResolved").notNull().default(false),
    userId: uuid("userId")
      .notNull()
      .references(() => user.id),
    createdAt: timestamp("createdAt").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.id] }),
    documentRef: foreignKey({
      columns: [table.documentId, table.documentCreatedAt],
      foreignColumns: [document.id, document.createdAt],
    }),
  })
);

export type Suggestion = InferSelectModel<typeof suggestion>;

export const stream = pgTable(
  "Stream",
  {
    id: uuid("id").notNull().defaultRandom(),
    chatId: uuid("chatId").notNull(),
    createdAt: timestamp("createdAt").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.id] }),
    chatRef: foreignKey({
      columns: [table.chatId],
      foreignColumns: [chat.id],
    }),
  })
);

export type Stream = InferSelectModel<typeof stream>;
```

lib/db/utils.ts
```
import { generateId } from "ai";
import { genSaltSync, hashSync } from "bcrypt-ts";

export function generateHashedPassword(password: string) {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);

  return hash;
}

export function generateDummyPassword() {
  const password = generateId();
  const hashedPassword = generateHashedPassword(password);

  return hashedPassword;
}
```

lib/editor/config.ts
```
import { textblockTypeInputRule } from "prosemirror-inputrules";
import { Schema } from "prosemirror-model";
import { schema } from "prosemirror-schema-basic";
import { addListNodes } from "prosemirror-schema-list";
import type { Transaction } from "prosemirror-state";
import type { EditorView } from "prosemirror-view";
import type { MutableRefObject } from "react";

import { buildContentFromDocument } from "./functions";

export const documentSchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
  marks: schema.spec.marks,
});

export function headingRule(level: number) {
  return textblockTypeInputRule(
    new RegExp(`^(#{1,${level}})\\s$`),
    documentSchema.nodes.heading,
    () => ({ level })
  );
}

export const handleTransaction = ({
  transaction,
  editorRef,
  onSaveContent,
}: {
  transaction: Transaction;
  editorRef: MutableRefObject<EditorView | null>;
  onSaveContent: (updatedContent: string, debounce: boolean) => void;
}) => {
  if (!editorRef || !editorRef.current) {
    return;
  }

  const newState = editorRef.current.state.apply(transaction);
  editorRef.current.updateState(newState);

  if (transaction.docChanged && !transaction.getMeta("no-save")) {
    const updatedContent = buildContentFromDocument(newState.doc);

    if (transaction.getMeta("no-debounce")) {
      onSaveContent(updatedContent, false);
    } else {
      onSaveContent(updatedContent, true);
    }
  }
};
```

lib/editor/diff.js
```
// Modified from https://github.com/hamflx/prosemirror-diff/blob/master/src/diff.js

import { diff_match_patch } from "diff-match-patch";
import { Fragment, Node } from "prosemirror-model";

export const DiffType = {
  Unchanged: 0,
  Deleted: -1,
  Inserted: 1,
};

export const patchDocumentNode = (schema, oldNode, newNode) => {
  assertNodeTypeEqual(oldNode, newNode);

  const finalLeftChildren = [];
  const finalRightChildren = [];

  const oldChildren = normalizeNodeContent(oldNode);
  const newChildren = normalizeNodeContent(newNode);
  const oldChildLen = oldChildren.length;
  const newChildLen = newChildren.length;
  const minChildLen = Math.min(oldChildLen, newChildLen);

  let left = 0;
  let right = 0;

  for (; left < minChildLen; left++) {
    const oldChild = oldChildren[left];
    const newChild = newChildren[left];
    if (!isNodeEqual(oldChild, newChild)) {
      break;
    }
    finalLeftChildren.push(...ensureArray(oldChild));
  }

  for (; right + left + 1 < minChildLen; right++) {
    const oldChild = oldChildren[oldChildLen - right - 1];
    const newChild = newChildren[newChildLen - right - 1];
    if (!isNodeEqual(oldChild, newChild)) {
      break;
    }
    finalRightChildren.unshift(...ensureArray(oldChild));
  }

  const diffOldChildren = oldChildren.slice(left, oldChildLen - right);
  const diffNewChildren = newChildren.slice(left, newChildLen - right);

  if (diffOldChildren.length && diffNewChildren.length) {
    const matchedNodes = matchNodes(
      schema,
      diffOldChildren,
      diffNewChildren
    ).sort((a, b) => b.count - a.count);
    const bestMatch = matchedNodes[0];
    if (bestMatch) {
      const { oldStartIndex, newStartIndex, oldEndIndex, newEndIndex } =
        bestMatch;
      const oldBeforeMatchChildren = diffOldChildren.slice(0, oldStartIndex);
      const newBeforeMatchChildren = diffNewChildren.slice(0, newStartIndex);

      finalLeftChildren.push(
        ...patchRemainNodes(
          schema,
          oldBeforeMatchChildren,
          newBeforeMatchChildren
        )
      );
      finalLeftChildren.push(
        ...diffOldChildren.slice(oldStartIndex, oldEndIndex)
      );

      const oldAfterMatchChildren = diffOldChildren.slice(oldEndIndex);
      const newAfterMatchChildren = diffNewChildren.slice(newEndIndex);

      finalRightChildren.unshift(
        ...patchRemainNodes(
          schema,
          oldAfterMatchChildren,
          newAfterMatchChildren
        )
      );
    } else {
      finalLeftChildren.push(
        ...patchRemainNodes(schema, diffOldChildren, diffNewChildren)
      );
    }
  } else {
    finalLeftChildren.push(
      ...patchRemainNodes(schema, diffOldChildren, diffNewChildren)
    );
  }

  return createNewNode(oldNode, [...finalLeftChildren, ...finalRightChildren]);
};

const matchNodes = (_schema, oldChildren, newChildren) => {
  const matches = [];
  for (
    let oldStartIndex = 0;
    oldStartIndex < oldChildren.length;
    oldStartIndex++
  ) {
    const oldStartNode = oldChildren[oldStartIndex];
    const newStartIndex = findMatchNode(newChildren, oldStartNode);

    if (newStartIndex !== -1) {
      let oldEndIndex = oldStartIndex + 1;
      let newEndIndex = newStartIndex + 1;
      for (
        ;
        oldEndIndex < oldChildren.length && newEndIndex < newChildren.length;
        oldEndIndex++, newEndIndex++
      ) {
        const oldEndNode = oldChildren[oldEndIndex];
        if (!isNodeEqual(newChildren[newEndIndex], oldEndNode)) {
          break;
        }
      }
      matches.push({
        oldStartIndex,
        newStartIndex,
        oldEndIndex,
        newEndIndex,
        count: newEndIndex - newStartIndex,
      });
    }
  }
  return matches;
};

const findMatchNode = (children, node, startIndex = 0) => {
  for (let i = startIndex; i < children.length; i++) {
    if (isNodeEqual(children[i], node)) {
      return i;
    }
  }
  return -1;
};

const patchRemainNodes = (schema, oldChildren, newChildren) => {
  const finalLeftChildren = [];
  const finalRightChildren = [];
  const oldChildLen = oldChildren.length;
  const newChildLen = newChildren.length;
  let left = 0;
  let right = 0;
  while (oldChildLen - left - right > 0 && newChildLen - left - right > 0) {
    const leftOldNode = oldChildren[left];
    const leftNewNode = newChildren[left];
    const rightOldNode = oldChildren[oldChildLen - right - 1];
    const rightNewNode = newChildren[newChildLen - right - 1];
    let updateLeft =
      !isTextNode(leftOldNode) && matchNodeType(leftOldNode, leftNewNode);
    let updateRight =
      !isTextNode(rightOldNode) && matchNodeType(rightOldNode, rightNewNode);
    if (Array.isArray(leftOldNode) && Array.isArray(leftNewNode)) {
      finalLeftChildren.push(
        ...patchTextNodes(schema, leftOldNode, leftNewNode)
      );
      left += 1;
      continue;
    }

    if (updateLeft && updateRight) {
      const equalityLeft = computeChildEqualityFactor(leftOldNode, leftNewNode);
      const equalityRight = computeChildEqualityFactor(
        rightOldNode,
        rightNewNode
      );
      if (equalityLeft < equalityRight) {
        updateLeft = false;
      } else {
        updateRight = false;
      }
    }
    if (updateLeft) {
      finalLeftChildren.push(
        patchDocumentNode(schema, leftOldNode, leftNewNode)
      );
      left += 1;
    } else if (updateRight) {
      finalRightChildren.unshift(
        patchDocumentNode(schema, rightOldNode, rightNewNode)
      );
      right += 1;
    } else {
      // Delete and insert
      finalLeftChildren.push(
        createDiffNode(schema, leftOldNode, DiffType.Deleted)
      );
      finalLeftChildren.push(
        createDiffNode(schema, leftNewNode, DiffType.Inserted)
      );
      left += 1;
    }
  }

  const deleteNodeLen = oldChildLen - left - right;
  const insertNodeLen = newChildLen - left - right;
  if (deleteNodeLen) {
    finalLeftChildren.push(
      ...oldChildren
        .slice(left, left + deleteNodeLen)
        .flat()
        .map((node) => createDiffNode(schema, node, DiffType.Deleted))
    );
  }

  if (insertNodeLen) {
    finalRightChildren.unshift(
      ...newChildren
        .slice(left, left + insertNodeLen)
        .flat()
        .map((node) => createDiffNode(schema, node, DiffType.Inserted))
    );
  }

  return [...finalLeftChildren, ...finalRightChildren];
};

// Updated function to perform sentence-level diffs
export const patchTextNodes = (schema, oldNode, newNode) => {
  const dmp = new diff_match_patch();

  // Concatenate the text from the text nodes
  const oldText = oldNode.map((n) => getNodeText(n)).join("");
  const newText = newNode.map((n) => getNodeText(n)).join("");

  // Tokenize the text into sentences
  const oldSentences = tokenizeSentences(oldText);
  const newSentences = tokenizeSentences(newText);

  // Map sentences to unique characters
  const { chars1, chars2, lineArray } = sentencesToChars(
    oldSentences,
    newSentences
  );

  // Perform the diff
  let diffs = dmp.diff_main(chars1, chars2, false);

  // Convert back to sentences
  diffs = diffs.map(([type, text]) => {
    const sentences = text
      .split("")
      .map((char) => lineArray[char.charCodeAt(0)]);
    return [type, sentences];
  });

  // Map diffs to nodes
  const res = diffs.flatMap(([type, sentences]) => {
    return sentences.map((sentence) => {
      const node = createTextNode(
        schema,
        sentence,
        type !== DiffType.Unchanged ? [createDiffMark(schema, type)] : []
      );
      return node;
    });
  });

  return res;
};

// Function to tokenize text into sentences
const tokenizeSentences = (text) => {
  return text.match(/[^.!?]+[.!?]*\s*/g) || [];
};

// Function to map sentences to unique characters
const sentencesToChars = (oldSentences, newSentences) => {
  const lineArray = [];
  const lineHash = {};
  let lineStart = 0;

  const chars1 = oldSentences
    .map((sentence) => {
      const line = sentence;
      if (line in lineHash) {
        return String.fromCharCode(lineHash[line]);
      }
      lineHash[line] = lineStart;
      lineArray[lineStart] = line;
      lineStart++;
      return String.fromCharCode(lineHash[line]);
    })
    .join("");

  const chars2 = newSentences
    .map((sentence) => {
      const line = sentence;
      if (line in lineHash) {
        return String.fromCharCode(lineHash[line]);
      }
      lineHash[line] = lineStart;
      lineArray[lineStart] = line;
      lineStart++;
      return String.fromCharCode(lineHash[line]);
    })
    .join("");

  return { chars1, chars2, lineArray };
};

export const computeChildEqualityFactor = (_node1, _node2) => {
  return 0;
};

export const assertNodeTypeEqual = (node1, node2) => {
  if (getNodeProperty(node1, "type") !== getNodeProperty(node2, "type")) {
    throw new Error(`node type not equal: ${node1.type} !== ${node2.type}`);
  }
};

export const ensureArray = (value) => {
  return Array.isArray(value) ? value : [value];
};

export const isNodeEqual = (node1, node2) => {
  const isNode1Array = Array.isArray(node1);
  const isNode2Array = Array.isArray(node2);
  if (isNode1Array !== isNode2Array) {
    return false;
  }
  if (isNode1Array) {
    return (
      node1.length === node2.length &&
      node1.every((node, index) => isNodeEqual(node, node2[index]))
    );
  }

  const type1 = getNodeProperty(node1, "type");
  const type2 = getNodeProperty(node2, "type");
  if (type1 !== type2) {
    return false;
  }
  if (isTextNode(node1)) {
    const text1 = getNodeProperty(node1, "text");
    const text2 = getNodeProperty(node2, "text");
    if (text1 !== text2) {
      return false;
    }
  }
  const attrs1 = getNodeAttributes(node1);
  const attrs2 = getNodeAttributes(node2);
  const attrs = [...new Set([...Object.keys(attrs1), ...Object.keys(attrs2)])];
  for (const attr of attrs) {
    if (attrs1[attr] !== attrs2[attr]) {
      return false;
    }
  }
  const marks1 = getNodeMarks(node1);
  const marks2 = getNodeMarks(node2);
  if (marks1.length !== marks2.length) {
    return false;
  }
  for (let i = 0; i < marks1.length; i++) {
    if (!isNodeEqual(marks1[i], marks2[i])) {
      return false;
    }
  }
  const children1 = getNodeChildren(node1);
  const children2 = getNodeChildren(node2);
  if (children1.length !== children2.length) {
    return false;
  }
  for (let i = 0; i < children1.length; i++) {
    if (!isNodeEqual(children1[i], children2[i])) {
      return false;
    }
  }
  return true;
};

export const normalizeNodeContent = (node) => {
  const content = getNodeChildren(node) ?? [];
  const res = [];
  for (let i = 0; i < content.length; i++) {
    const child = content[i];
    if (isTextNode(child)) {
      const textNodes = [];
      for (
        let textNode = content[i];
        i < content.length && isTextNode(textNode);
        textNode = content[++i]
      ) {
        textNodes.push(textNode);
      }
      i--;
      res.push(textNodes);
    } else {
      res.push(child);
    }
  }
  return res;
};

export const getNodeProperty = (node, property) => {
  if (property === "type") {
    return node.type?.name;
  }
  return node[property];
};

export const getNodeAttribute = (node, attribute) =>
  node.attrs ? node.attrs[attribute] : undefined;

export const getNodeAttributes = (node) => (node.attrs ? node.attrs : {});

export const getNodeMarks = (node) => node.marks ?? [];

export const getNodeChildren = (node) => node.content?.content ?? [];

export const getNodeText = (node) => node.text;

export const isTextNode = (node) => node.type?.name === "text";

export const matchNodeType = (node1, node2) =>
  node1.type?.name === node2.type?.name ||
  (Array.isArray(node1) && Array.isArray(node2));

export const createNewNode = (oldNode, children) => {
  if (!oldNode.type) {
    throw new Error("oldNode.type is undefined");
  }
  return new Node(
    oldNode.type,
    oldNode.attrs,
    Fragment.fromArray(children),
    oldNode.marks
  );
};

export const createDiffNode = (schema, node, type) => {
  return mapDocumentNode(node, (currentNode) => {
    if (isTextNode(currentNode)) {
      return createTextNode(schema, getNodeText(currentNode), [
        ...(currentNode.marks || []),
        createDiffMark(schema, type),
      ]);
    }
    return currentNode;
  });
};

function mapDocumentNode(node, mapper) {
  const copy = node.copy(
    Fragment.from(
      node.content.content
        .map((currentNode) => mapDocumentNode(currentNode, mapper))
        .filter((n) => n)
    )
  );
  return mapper(copy) || copy;
}

export const createDiffMark = (schema, type) => {
  if (type === DiffType.Inserted) {
    return schema.mark("diffMark", { type });
  }
  if (type === DiffType.Deleted) {
    return schema.mark("diffMark", { type });
  }
  throw new Error("type is not valid");
};

export const createTextNode = (schema, content, marks = []) => {
  return schema.text(content, marks);
};

export const diffEditor = (schema, oldDoc, newDoc) => {
  const oldNode = Node.fromJSON(schema, oldDoc);
  const newNode = Node.fromJSON(schema, newDoc);
  return patchDocumentNode(schema, oldNode, newNode);
};
```

lib/editor/functions.tsx
```
"use client";

import { defaultMarkdownSerializer } from "prosemirror-markdown";
import { DOMParser, type Node } from "prosemirror-model";
import { Decoration, DecorationSet, type EditorView } from "prosemirror-view";
import { renderToString } from "react-dom/server";

import { Response } from "@/components/elements/response";

import { documentSchema } from "./config";
import { createSuggestionWidget, type UISuggestion } from "./suggestions";

export const buildDocumentFromContent = (content: string) => {
  const parser = DOMParser.fromSchema(documentSchema);
  const stringFromMarkdown = renderToString(<Response>{content}</Response>);
  const tempContainer = document.createElement("div");
  tempContainer.innerHTML = stringFromMarkdown;
  return parser.parse(tempContainer);
};

export const buildContentFromDocument = (document: Node) => {
  return defaultMarkdownSerializer.serialize(document);
};

export const createDecorations = (
  suggestions: UISuggestion[],
  view: EditorView
) => {
  const decorations: Decoration[] = [];

  for (const suggestion of suggestions) {
    decorations.push(
      Decoration.inline(
        suggestion.selectionStart,
        suggestion.selectionEnd,
        {
          class: "suggestion-highlight",
        },
        {
          suggestionId: suggestion.id,
          type: "highlight",
        }
      )
    );

    decorations.push(
      Decoration.widget(
        suggestion.selectionStart,
        (currentView) => {
          const { dom } = createSuggestionWidget(suggestion, currentView);
          return dom;
        },
        {
          suggestionId: suggestion.id,
          type: "widget",
        }
      )
    );
  }

  return DecorationSet.create(view.state.doc, decorations);
};
```

lib/editor/react-renderer.tsx
```
import { createRoot } from "react-dom/client";

// biome-ignore lint/complexity/noStaticOnlyClass: "Needs to be static"
export class ReactRenderer {
  static render(component: React.ReactElement, dom: HTMLElement) {
    const root = createRoot(dom);
    root.render(component);

    return {
      destroy: () => root.unmount(),
    };
  }
}
```

lib/editor/suggestions.tsx
```
import type { Node } from "prosemirror-model";
import { Plugin, PluginKey } from "prosemirror-state";
import {
  type Decoration,
  DecorationSet,
  type EditorView,
} from "prosemirror-view";
import { createRoot } from "react-dom/client";
import type { ArtifactKind } from "@/components/artifact";
import { Suggestion as PreviewSuggestion } from "@/components/suggestion";
import type { Suggestion } from "@/lib/db/schema";

export interface UISuggestion extends Suggestion {
  selectionStart: number;
  selectionEnd: number;
}

type Position = {
  start: number;
  end: number;
};

function findPositionsInDoc(doc: Node, searchText: string): Position | null {
  let positions: { start: number; end: number } | null = null;

  doc.nodesBetween(0, doc.content.size, (node, pos) => {
    if (node.isText && node.text) {
      const index = node.text.indexOf(searchText);

      if (index !== -1) {
        positions = {
          start: pos + index,
          end: pos + index + searchText.length,
        };

        return false;
      }
    }

    return true;
  });

  return positions;
}

export function projectWithPositions(
  doc: Node,
  suggestions: Suggestion[]
): UISuggestion[] {
  return suggestions.map((suggestion) => {
    const positions = findPositionsInDoc(doc, suggestion.originalText);

    if (!positions) {
      return {
        ...suggestion,
        selectionStart: 0,
        selectionEnd: 0,
      };
    }

    return {
      ...suggestion,
      selectionStart: positions.start,
      selectionEnd: positions.end,
    };
  });
}

export function createSuggestionWidget(
  suggestion: UISuggestion,
  view: EditorView,
  artifactKind: ArtifactKind = "text"
): { dom: HTMLElement; destroy: () => void } {
  const dom = document.createElement("span");
  const root = createRoot(dom);

  dom.addEventListener("mousedown", (event) => {
    event.preventDefault();
    view.dom.blur();
  });

  const onApply = () => {
    const { state, dispatch } = view;

    const decorationTransaction = state.tr;
    const currentState = suggestionsPluginKey.getState(state);
    const currentDecorations = currentState?.decorations;

    if (currentDecorations) {
      const newDecorations = DecorationSet.create(
        state.doc,
        currentDecorations.find().filter((decoration: Decoration) => {
          return decoration.spec.suggestionId !== suggestion.id;
        })
      );

      decorationTransaction.setMeta(suggestionsPluginKey, {
        decorations: newDecorations,
        selected: null,
      });
      dispatch(decorationTransaction);
    }

    const textTransaction = view.state.tr.replaceWith(
      suggestion.selectionStart,
      suggestion.selectionEnd,
      state.schema.text(suggestion.suggestedText)
    );

    textTransaction.setMeta("no-debounce", true);

    dispatch(textTransaction);
  };

  root.render(
    <PreviewSuggestion
      artifactKind={artifactKind}
      onApply={onApply}
      suggestion={suggestion}
    />
  );

  return {
    dom,
    destroy: () => {
      // Wrapping unmount in setTimeout to avoid synchronous unmounting during render
      setTimeout(() => {
        root.unmount();
      }, 0);
    },
  };
}

export const suggestionsPluginKey = new PluginKey("suggestions");
export const suggestionsPlugin = new Plugin({
  key: suggestionsPluginKey,
  state: {
    init() {
      return { decorations: DecorationSet.empty, selected: null };
    },
    apply(tr, state) {
      const newDecorations = tr.getMeta(suggestionsPluginKey);
      if (newDecorations) {
        return newDecorations;
      }

      return {
        decorations: state.decorations.map(tr.mapping, tr.doc),
        selected: state.selected,
      };
    },
  },
  props: {
    decorations(state) {
      return this.getState(state)?.decorations ?? DecorationSet.empty;
    },
  },
});
```

lib/ai/.ruler/AGENTS.md
```
<!-- Generated by Ruler -->

<!-- Inherits from: .ruler/AGENTS.md -->

# Directory: lib/ai

## Hierarchical Policy

- This directory inherits global rules from `.ruler/AGENTS.md` and specializes them for AI model orchestration and tools.
- Owns:
  - Model registry and provider wiring (`providers.ts`).
  - Prompt definitions (`prompts.ts`).
  - AI tools under `tools/**` (e.g., document operations, weather, suggestions).
  - Model metadata and tests (`models.ts`, `models.test.ts`, `models.mock.ts`).
- Provides:
  - A small, stable API (`myProvider`, model IDs, tools) consumed by `app/**` and `artifacts/**`.

## Domain Vocabulary

- `myProvider`: The primary AI provider instance connecting to:
  - X.ai models (e.g., `"xai/grok-2-vision-1212"`, `"xai/grok-3-mini"`).
  - LM Studio models (e.g., `"llama-3.2-1b"`) via local server.
  - Gemini via CLI provider.
- Model IDs:
  - `"chat-model"`, `"chat-model-reasoning"`, `"title-model"`, `"artifact-model"`, `"lmstudio-chat"`, `"gemini-2.5-pro"`.
- Prompts:
  - `codePrompt`, `updateDocumentPrompt`, `titlePrompt`, and any chat/artifact prompts.
- Tools:
  - `create-document`, `update-document`, `request-suggestions`, `get-weather`, etc. as AI “tools” invoked by the models.

## Allowed Patterns

### Provider setup (`providers.ts`)

1. Provider wiring:
   - Define all language models on `myProvider` with stable string IDs.
   - Use wrappers (e.g., `wrapLanguageModel` + `extractReasoningMiddleware`) for reasoning models.
   - Configure environment-sensitive behavior (e.g., `isTestEnvironment` → mock models) inside this file only.
2. Exposure:
   - Export `myProvider` and any structured `models` map.
   - Other modules must not import underlying gateway clients directly.

### Prompt and tool design

1. Prompts:
   - Keep prompts in `prompts.ts` as constants; do not embed long prompt strings in route handlers.
   - Version prompts via explicit constant names (e.g., `*_V2`) when making breaking changes.
2. Tools:
   - Implement tool functions as pure async functions with clearly typed parameters and return values.
   - Validate inputs with Zod where appropriate before calling external APIs.
   - Use these tools from route handlers, server actions, or artifact handlers — not from client components.

### AI usage patterns

1. Streaming:
   - For long-running generations (e.g., artifacts), use streaming APIs (`streamObject` / `streamText`) and forward partial results via data streams.
2. Separation of concerns:
   - Do not mix HTTP concerns (headers, cookies, NextResponse) into AI modules.
   - Do not perform DB writes here; accept already-fetched data or return data for callers to persist via `lib/db/queries`.

## Prohibited Patterns

1. No direct use of provider gateway outside `providers.ts`:
   - All model definitions and provider wiring must remain in `providers.ts`.
2. No UI:
   - Do not import `components`, `hooks`, or any React UI code.
3. No cross-layer coupling:
   - `lib/ai` must not import from `app/**` or `artifacts/**`.
   - Use domain-level data types from `lib/types` or `lib/db/schema` instead.

## Boundaries

- Incoming dependencies:
  - `app/(chat)/actions.ts`, route handlers, and `artifacts/**` are allowed to call into this directory.
- Outgoing dependencies:
  - Allowed: `ai` SDK, provider-specific clients, `zod`, `@/lib/types`, `@/lib/db/schema` (for type references only).
  - Forbidden: `@/lib/db/queries` for writes (keep AI layer free of persistence), `next/*`, `react`, `next-auth`.
- Extension:
  - New models or tools must be registered here and exposed through stable exports, rather than ad-hoc provider calls elsewhere.
```

lib/ai/tools/create-document.ts
```
import { tool, type UIMessageStreamWriter } from "ai";
import type { Session } from "next-auth";
import { z } from "zod";
import {
  artifactKinds,
  documentHandlersByArtifactKind,
} from "@/lib/artifacts/server";
import type { ChatMessage } from "@/lib/types";
import { generateUUID } from "@/lib/utils";

type CreateDocumentProps = {
  session: Session;
  dataStream: UIMessageStreamWriter<ChatMessage>;
};

export const createDocument = ({ session, dataStream }: CreateDocumentProps) =>
  tool({
    description:
      "Create a document for a writing or content creation activities. This tool will call other functions that will generate the contents of the document based on the title and kind.",
    inputSchema: z.object({
      title: z.string(),
      kind: z.enum(artifactKinds),
    }),
    execute: async ({ title, kind }) => {
      const id = generateUUID();

      dataStream.write({
        type: "data-kind",
        data: kind,
        transient: true,
      });

      dataStream.write({
        type: "data-id",
        data: id,
        transient: true,
      });

      dataStream.write({
        type: "data-title",
        data: title,
        transient: true,
      });

      dataStream.write({
        type: "data-clear",
        data: null,
        transient: true,
      });

      const documentHandler = documentHandlersByArtifactKind.find(
        (documentHandlerByArtifactKind) =>
          documentHandlerByArtifactKind.kind === kind
      );

      if (!documentHandler) {
        throw new Error(`No document handler found for kind: ${kind}`);
      }

      await documentHandler.onCreateDocument({
        id,
        title,
        dataStream,
        session,
      });

      dataStream.write({ type: "data-finish", data: null, transient: true });

      return {
        id,
        title,
        kind,
        content: "A document was created and is now visible to the user.",
      };
    },
  });
```

lib/ai/tools/get-weather.ts
```
import { tool } from "ai";
import { z } from "zod";

async function geocodeCity(
  city: string
): Promise<{ latitude: number; longitude: number } | null> {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      return null;
    }

    const result = data.results[0];
    return {
      latitude: result.latitude,
      longitude: result.longitude,
    };
  } catch {
    return null;
  }
}

export const getWeather = tool({
  description:
    "Get the current weather at a location. You can provide either coordinates or a city name.",
  inputSchema: z.object({
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    city: z
      .string()
      .describe("City name (e.g., 'San Francisco', 'New York', 'London')")
      .optional(),
  }),
  execute: async (input) => {
    let latitude: number;
    let longitude: number;

    if (input.city) {
      const coords = await geocodeCity(input.city);
      if (!coords) {
        return {
          error: `Could not find coordinates for "${input.city}". Please check the city name.`,
        };
      }
      latitude = coords.latitude;
      longitude = coords.longitude;
    } else if (input.latitude !== undefined && input.longitude !== undefined) {
      latitude = input.latitude;
      longitude = input.longitude;
    } else {
      return {
        error:
          "Please provide either a city name or both latitude and longitude coordinates.",
      };
    }

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&daily=sunrise,sunset&timezone=auto`
    );

    const weatherData = await response.json();

    if ("city" in input) {
      weatherData.cityName = input.city;
    }

    return weatherData;
  },
});
```

lib/ai/tools/request-suggestions.ts
```
import { streamObject, tool, type UIMessageStreamWriter } from "ai";
import type { Session } from "next-auth";
import { z } from "zod";
import { getDocumentById, saveSuggestions } from "@/lib/db/queries";
import type { Suggestion } from "@/lib/db/schema";
import type { ChatMessage } from "@/lib/types";
import { generateUUID } from "@/lib/utils";
import { myProvider } from "../providers";

type RequestSuggestionsProps = {
  session: Session;
  dataStream: UIMessageStreamWriter<ChatMessage>;
};

export const requestSuggestions = ({
  session,
  dataStream,
}: RequestSuggestionsProps) =>
  tool({
    description: "Request suggestions for a document",
    inputSchema: z.object({
      documentId: z
        .string()
        .describe("The ID of the document to request edits"),
    }),
    execute: async ({ documentId }) => {
      const document = await getDocumentById({ id: documentId });

      if (!document || !document.content) {
        return {
          error: "Document not found",
        };
      }

      const suggestions: Omit<
        Suggestion,
        "userId" | "createdAt" | "documentCreatedAt"
      >[] = [];

      const { elementStream } = streamObject({
        model: myProvider.languageModel("artifact-model"),
        system:
          "You are a help writing assistant. Given a piece of writing, please offer suggestions to improve the piece of writing and describe the change. It is very important for the edits to contain full sentences instead of just words. Max 5 suggestions.",
        prompt: document.content,
        output: "array",
        schema: z.object({
          originalSentence: z.string().describe("The original sentence"),
          suggestedSentence: z.string().describe("The suggested sentence"),
          description: z.string().describe("The description of the suggestion"),
        }),
      });

      for await (const element of elementStream) {
        // @ts-expect-error todo: fix type
        const suggestion: Suggestion = {
          originalText: element.originalSentence,
          suggestedText: element.suggestedSentence,
          description: element.description,
          id: generateUUID(),
          documentId,
          isResolved: false,
        };

        dataStream.write({
          type: "data-suggestion",
          data: suggestion,
          transient: true,
        });

        suggestions.push(suggestion);
      }

      if (session.user?.id) {
        const userId = session.user.id;

        await saveSuggestions({
          suggestions: suggestions.map((suggestion) => ({
            ...suggestion,
            userId,
            createdAt: new Date(),
            documentCreatedAt: document.createdAt,
          })),
        });
      }

      return {
        id: documentId,
        title: document.title,
        kind: document.kind,
        message: "Suggestions have been added to the document",
      };
    },
  });
```

lib/ai/tools/update-document.ts
```
import { tool, type UIMessageStreamWriter } from "ai";
import type { Session } from "next-auth";
import { z } from "zod";
import { documentHandlersByArtifactKind } from "@/lib/artifacts/server";
import { getDocumentById } from "@/lib/db/queries";
import type { ChatMessage } from "@/lib/types";

type UpdateDocumentProps = {
  session: Session;
  dataStream: UIMessageStreamWriter<ChatMessage>;
};

export const updateDocument = ({ session, dataStream }: UpdateDocumentProps) =>
  tool({
    description: "Update a document with the given description.",
    inputSchema: z.object({
      id: z.string().describe("The ID of the document to update"),
      description: z
        .string()
        .describe("The description of changes that need to be made"),
    }),
    execute: async ({ id, description }) => {
      const document = await getDocumentById({ id });

      if (!document) {
        return {
          error: "Document not found",
        };
      }

      dataStream.write({
        type: "data-clear",
        data: null,
        transient: true,
      });

      const documentHandler = documentHandlersByArtifactKind.find(
        (documentHandlerByArtifactKind) =>
          documentHandlerByArtifactKind.kind === document.kind
      );

      if (!documentHandler) {
        throw new Error(`No document handler found for kind: ${document.kind}`);
      }

      await documentHandler.onUpdateDocument({
        document,
        description,
        dataStream,
        session,
      });

      dataStream.write({ type: "data-finish", data: null, transient: true });

      return {
        id,
        title: document.title,
        kind: document.kind,
        content: "The document has been updated successfully.",
      };
    },
  });
```

lib/db/.ruler/AGENTS.md
```
<!-- Generated by Ruler -->

<!-- Inherits from: .ruler/AGENTS.md -->

# Directory: lib/db

## Hierarchical Policy

- This directory inherits global rules from `.ruler/AGENTS.md` and specializes them for the data/ORM layer.
- Owns:
  - Drizzle schema definition (`schema.ts`).
  - Database access functions (`queries.ts`).
  - Migrations (`migrations/**`) and migration runner (`migrate.ts`).
  - DB helpers under `helpers/**`.
- Acts as the single source of truth for database structure and access; all app segments must use functions/types from here rather than talking to the DB directly.

## Domain Vocabulary

- Entities:
  - `User`, `Chat`, `Message`, `Suggestion`, `Stream`, `Vote`, `Document`.
- Types:
  - Drizzle table helpers (`pgTable`, `uuid`, `timestamp`, `text`, `boolean`, etc.).
  - `InferSelectModel<typeof table>` for row types.
- Operations:
  - Query helpers: `asc`, `desc`, `eq`, `gt`, `lt`, `and`, `or`, `inArray`, `count`.
  - Error wrapper: `ChatSDKError` for DB-related failures.
- Infrastructure:
  - `migrate.ts`: CLI entry to run Drizzle migrations against `POSTGRES_URL`.

## Allowed Patterns

### Schema and migrations

1. Schema:
   - All tables are defined in `schema.ts` using Drizzle’s `pgTable` APIs.
   - Composite primary keys are expressed via `primaryKey({ columns: [...] })`.
   - Foreign keys are consistently declared using `foreignKey` helpers where needed.
2. Migrations:
   - SQL migrations live under `migrations/**` and must reflect the schema in `schema.ts`.
   - The `migrate.ts` runner:
     - Loads `.env.local` for `POSTGRES_URL`.
     - Creates a single-connection client for running migrations.
     - Exits with non-zero status on error.

### Query functions (`queries.ts`)

1. DB client:
   - Instantiate `postgres` and `drizzle` once at module top-level.
   - Use a single client per process; do not re-create per function call.
2. Query design:
   - Each exported function should perform a single logical DB operation:
     - `getUser`, `createUser`, `createGuestUser`.
     - Chat CRUD and history functions.
     - Message and stream queries.
   - On failure, throw a `ChatSDKError` with a stable error code string (`"bad_request:database"`, `"not_found:chat"`, etc.).
3. Composition:
   - Multi-step operations (e.g., delete a chat + related messages and votes) are implemented as a single function within this layer.
   - Callers in `app/**` or `lib/**` must not orchestrate multiple low-level DB calls themselves.

### Server-only enforcement

1. Use `"server-only"` import guard at the top of DB modules that must not run on the client.
2. Any consumer that imports from `lib/db/queries` must be a server-only file (route handler, server component, server action, or lib server module).

## Prohibited Patterns

1. No React or Next-specific imports:
   - Do not import `NextResponse`, `Request`, `cookies`, or any React/Next modules into `lib/db`.
2. No client-side usage:
   - Never import `lib/db/queries` into `"use client"` components or browser-only code.
3. No environment access outside configuration:
   - Only `migrate.ts` and the DB client initialization may read `process.env.POSTGRES_URL`.
   - Other modules must not read arbitrary env variables.
4. No side effects beyond DB:
   - Do not send emails, call external HTTP APIs, or log analytics from this layer; those belong in higher-level services.

## Boundaries

- Incoming dependencies:
  - `app/**` and `lib/**` may import from `lib/db/schema` for types and constants.
  - All database reads/writes from outside must go through `lib/db/queries` or dedicated helper functions here.
- Outgoing dependencies:
  - Allowed: `drizzle-orm`, `postgres`, `dotenv` (for `migrate.ts`), `@/lib/errors`, `@/lib/utils`, `@/lib/usage`.
  - Forbidden: imports from `app/**`, `components/**`, `artifacts/**`, `hooks/**`, or any UI modules.
- Migration boundary:
  - `migrations/**` files are not imported anywhere; they are read by the Drizzle migrator only.
```

lib/db/helpers/01-core-to-parts.ts
```
// This is a helper for an older version of ai, v4.3.13

// import { config } from 'dotenv';
// import postgres from 'postgres';
// import {
//   chat,
//   message,
//   type MessageDeprecated,
//   messageDeprecated,
//   vote,
//   voteDeprecated,
// } from '../schema';
// import { drizzle } from 'drizzle-orm/postgres-js';
// import { inArray } from 'drizzle-orm';
// import { appendResponseMessages, type UIMessage } from 'ai';

// config({
//   path: '.env.local',
// });

// if (!process.env.POSTGRES_URL) {
//   throw new Error('POSTGRES_URL environment variable is not set');
// }

// const client = postgres(process.env.POSTGRES_URL);
// const db = drizzle(client);

// const BATCH_SIZE = 100; // Process 100 chats at a time
// const INSERT_BATCH_SIZE = 1000; // Insert 1000 messages at a time

// type NewMessageInsert = {
//   id: string;
//   chatId: string;
//   parts: any[];
//   role: string;
//   attachments: any[];
//   createdAt: Date;
// };

// type NewVoteInsert = {
//   messageId: string;
//   chatId: string;
//   isUpvoted: boolean;
// };

// interface MessageDeprecatedContentPart {
//   type: string;
//   content: unknown;
// }

// function getMessageRank(message: MessageDeprecated): number {
//   if (
//     message.role === 'assistant' &&
//     (message.content as MessageDeprecatedContentPart[]).some(
//       (contentPart) => contentPart.type === 'tool-call',
//     )
//   ) {
//     return 0;
//   }

//   if (
//     message.role === 'tool' &&
//     (message.content as MessageDeprecatedContentPart[]).some(
//       (contentPart) => contentPart.type === 'tool-result',
//     )
//   ) {
//     return 1;
//   }

//   if (message.role === 'assistant') {
//     return 2;
//   }

//   return 3;
// }

// function dedupeParts<T extends { type: string; [k: string]: any }>(
//   parts: T[],
// ): T[] {
//   const seen = new Set<string>();
//   return parts.filter((p) => {
//     const key = `${p.type}|${JSON.stringify(p.content ?? p)}`;
//     if (seen.has(key)) return false;
//     seen.add(key);
//     return true;
//   });
// }

// function sanitizeParts<T extends { type: string; [k: string]: any }>(
//   parts: T[],
// ): T[] {
//   return parts.filter(
//     (part) => !(part.type === 'reasoning' && part.reasoning === 'undefined'),
//   );
// }

// async function migrateMessages() {
//   const chats = await db.select().from(chat);

//   let processedCount = 0;

//   for (let i = 0; i < chats.length; i += BATCH_SIZE) {
//     const chatBatch = chats.slice(i, i + BATCH_SIZE);
//     const chatIds = chatBatch.map((chat) => chat.id);

//     const allMessages = await db
//       .select()
//       .from(messageDeprecated)
//       .where(inArray(messageDeprecated.chatId, chatIds));

//     const allVotes = await db
//       .select()
//       .from(voteDeprecated)
//       .where(inArray(voteDeprecated.chatId, chatIds));

//     const newMessagesToInsert: NewMessageInsert[] = [];
//     const newVotesToInsert: NewVoteInsert[] = [];

//     for (const chat of chatBatch) {
//       processedCount++;
//       console.info(`Processed ${processedCount}/${chats.length} chats`);

//       const messages = allMessages
//         .filter((message) => message.chatId === chat.id)
//         .sort((a, b) => {
//           const differenceInTime =
//             new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
//           if (differenceInTime !== 0) return differenceInTime;

//           return getMessageRank(a) - getMessageRank(b);
//         });

//       const votes = allVotes.filter((v) => v.chatId === chat.id);

//       const messageSection: Array<UIMessage> = [];
//       const messageSections: Array<Array<UIMessage>> = [];

//       for (const message of messages) {
//         const { role } = message;

//         if (role === 'user' && messageSection.length > 0) {
//           messageSections.push([...messageSection]);
//           messageSection.length = 0;
//         }

//         // @ts-expect-error message.content has different type
//         messageSection.push(message);
//       }

//       if (messageSection.length > 0) {
//         messageSections.push([...messageSection]);
//       }

//       for (const section of messageSections) {
//         const [userMessage, ...assistantMessages] = section;

//         const [firstAssistantMessage] = assistantMessages;

//         try {
//           const uiSection = appendResponseMessages({
//             messages: [userMessage],
//             // @ts-expect-error: message.content has different type
//             responseMessages: assistantMessages,
//             _internal: {
//               currentDate: () => firstAssistantMessage.createdAt ?? new Date(),
//             },
//           });

//           const projectedUISection = uiSection
//             .map((message) => {
//               if (message.role === 'user') {
//                 return {
//                   id: message.id,
//                   chatId: chat.id,
//                   parts: [{ type: 'text', text: message.content }],
//                   role: message.role,
//                   createdAt: message.createdAt,
//                   attachments: [],
//                 } as NewMessageInsert;
//               } else if (message.role === 'assistant') {
//                 const cleanParts = sanitizeParts(
//                   dedupeParts(message.parts || []),
//                 );

//                 return {
//                   id: message.id,
//                   chatId: chat.id,
//                   parts: cleanParts,
//                   role: message.role,
//                   createdAt: message.createdAt,
//                   attachments: [],
//                 } as NewMessageInsert;
//               }
//               return null;
//             })
//             .filter((msg): msg is NewMessageInsert => msg !== null);

//           for (const msg of projectedUISection) {
//             newMessagesToInsert.push(msg);

//             if (msg.role === 'assistant') {
//               const voteByMessage = votes.find((v) => v.messageId === msg.id);
//               if (voteByMessage) {
//                 newVotesToInsert.push({
//                   messageId: msg.id,
//                   chatId: msg.chatId,
//                   isUpvoted: voteByMessage.isUpvoted,
//                 });
//               }
//             }
//           }
//         } catch (error) {
//           console.error(`Error processing chat ${chat.id}: ${error}`);
//         }
//       }
//     }

//     for (let j = 0; j < newMessagesToInsert.length; j += INSERT_BATCH_SIZE) {
//       const messageBatch = newMessagesToInsert.slice(j, j + INSERT_BATCH_SIZE);
//       if (messageBatch.length > 0) {
//         const validMessageBatch = messageBatch.map((msg) => ({
//           id: msg.id,
//           chatId: msg.chatId,
//           parts: msg.parts,
//           role: msg.role,
//           attachments: msg.attachments,
//           createdAt: msg.createdAt,
//         }));

//         await db.insert(message).values(validMessageBatch);
//       }
//     }

//     for (let j = 0; j < newVotesToInsert.length; j += INSERT_BATCH_SIZE) {
//       const voteBatch = newVotesToInsert.slice(j, j + INSERT_BATCH_SIZE);
//       if (voteBatch.length > 0) {
//         await db.insert(vote).values(voteBatch);
//       }
//     }
//   }

//   console.info(`Migration completed: ${processedCount} chats processed`);
// }

// migrateMessages()
//   .then(() => {
//     console.info('Script completed successfully');
//     process.exit(0);
//   })
//   .catch((error) => {
//     console.error('Script failed:', error);
//     process.exit(1);
//   });
```

lib/db/migrations/0000_keen_devos.sql
```
CREATE TABLE IF NOT EXISTS "Chat" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp NOT NULL,
	"messages" json NOT NULL,
	"userId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(64) NOT NULL,
	"password" varchar(64)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Chat" ADD CONSTRAINT "Chat_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
```

lib/db/migrations/0001_sparkling_blue_marvel.sql
```
CREATE TABLE IF NOT EXISTS "Suggestion" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"documentId" uuid NOT NULL,
	"documentCreatedAt" timestamp NOT NULL,
	"originalText" text NOT NULL,
	"suggestedText" text NOT NULL,
	"description" text,
	"isResolved" boolean DEFAULT false NOT NULL,
	"userId" uuid NOT NULL,
	"createdAt" timestamp NOT NULL,
	CONSTRAINT "Suggestion_id_pk" PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Document" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp NOT NULL,
	"title" text NOT NULL,
	"content" text,
	"userId" uuid NOT NULL,
	CONSTRAINT "Document_id_createdAt_pk" PRIMARY KEY("id","createdAt")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Suggestion" ADD CONSTRAINT "Suggestion_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Suggestion" ADD CONSTRAINT "Suggestion_documentId_documentCreatedAt_Document_id_createdAt_fk" FOREIGN KEY ("documentId","documentCreatedAt") REFERENCES "public"."Document"("id","createdAt") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
```

lib/db/migrations/0002_wandering_riptide.sql
```
CREATE TABLE IF NOT EXISTS "Message" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"chatId" uuid NOT NULL,
	"role" varchar NOT NULL,
	"content" json NOT NULL,
	"createdAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Vote" (
	"chatId" uuid NOT NULL,
	"messageId" uuid NOT NULL,
	"isUpvoted" boolean NOT NULL,
	CONSTRAINT "Vote_chatId_messageId_pk" PRIMARY KEY("chatId","messageId")
);
--> statement-breakpoint
ALTER TABLE "Chat" ADD COLUMN "title" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_Chat_id_fk" FOREIGN KEY ("chatId") REFERENCES "public"."Chat"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Vote" ADD CONSTRAINT "Vote_chatId_Chat_id_fk" FOREIGN KEY ("chatId") REFERENCES "public"."Chat"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Vote" ADD CONSTRAINT "Vote_messageId_Message_id_fk" FOREIGN KEY ("messageId") REFERENCES "public"."Message"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "Chat" DROP COLUMN IF EXISTS "messages";
```

lib/db/migrations/0003_cloudy_glorian.sql
```
ALTER TABLE "Chat" ADD COLUMN "visibility" varchar DEFAULT 'private' NOT NULL;
```

lib/db/migrations/0004_odd_slayback.sql
```
ALTER TABLE "Document" ADD COLUMN "text" varchar DEFAULT 'text' NOT NULL;
```

lib/db/migrations/0005_wooden_whistler.sql
```
CREATE TABLE IF NOT EXISTS "Message_v2" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"chatId" uuid NOT NULL,
	"role" varchar NOT NULL,
	"parts" json NOT NULL,
	"attachments" json NOT NULL,
	"createdAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Vote_v2" (
	"chatId" uuid NOT NULL,
	"messageId" uuid NOT NULL,
	"isUpvoted" boolean NOT NULL,
	CONSTRAINT "Vote_v2_chatId_messageId_pk" PRIMARY KEY("chatId","messageId")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Message_v2" ADD CONSTRAINT "Message_v2_chatId_Chat_id_fk" FOREIGN KEY ("chatId") REFERENCES "public"."Chat"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Vote_v2" ADD CONSTRAINT "Vote_v2_chatId_Chat_id_fk" FOREIGN KEY ("chatId") REFERENCES "public"."Chat"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Vote_v2" ADD CONSTRAINT "Vote_v2_messageId_Message_v2_id_fk" FOREIGN KEY ("messageId") REFERENCES "public"."Message_v2"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
```

lib/db/migrations/0006_marvelous_frog_thor.sql
```
CREATE TABLE IF NOT EXISTS "Stream" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"chatId" uuid NOT NULL,
	"createdAt" timestamp NOT NULL,
	CONSTRAINT "Stream_id_pk" PRIMARY KEY("id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Stream" ADD CONSTRAINT "Stream_chatId_Chat_id_fk" FOREIGN KEY ("chatId") REFERENCES "public"."Chat"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
```

lib/db/migrations/0007_flowery_ben_parker.sql
```
ALTER TABLE "Chat" ADD COLUMN "lastContext" jsonb;
```

lib/db/migrations/meta/0000_snapshot.json
```
{
  "id": "715ec9ec-6715-4d0f-9f6c-9b5c7f09827c",
  "prevId": "00000000-0000-0000-0000-000000000000",
  "version": "7",
  "dialect": "postgresql",
  "tables": {
    "public.Chat": {
      "name": "Chat",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": true,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        },
        "messages": {
          "name": "messages",
          "type": "json",
          "primaryKey": false,
          "notNull": true
        },
        "userId": {
          "name": "userId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Chat_userId_User_id_fk": {
          "name": "Chat_userId_User_id_fk",
          "tableFrom": "Chat",
          "tableTo": "User",
          "columnsFrom": ["userId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {}
    },
    "public.User": {
      "name": "User",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": true,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "email": {
          "name": "email",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": true
        },
        "password": {
          "name": "password",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": false
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {}
    }
  },
  "enums": {},
  "schemas": {},
  "sequences": {},
  "_meta": {
    "columns": {},
    "schemas": {},
    "tables": {}
  }
}
```

lib/db/migrations/meta/0001_snapshot.json
```
{
  "id": "f3d3437c-4735-4c91-80af-1014048a904e",
  "prevId": "715ec9ec-6715-4d0f-9f6c-9b5c7f09827c",
  "version": "7",
  "dialect": "postgresql",
  "tables": {
    "public.Suggestion": {
      "name": "Suggestion",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "documentId": {
          "name": "documentId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "documentCreatedAt": {
          "name": "documentCreatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        },
        "originalText": {
          "name": "originalText",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "suggestedText": {
          "name": "suggestedText",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "description": {
          "name": "description",
          "type": "text",
          "primaryKey": false,
          "notNull": false
        },
        "isResolved": {
          "name": "isResolved",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "default": false
        },
        "userId": {
          "name": "userId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Suggestion_userId_User_id_fk": {
          "name": "Suggestion_userId_User_id_fk",
          "tableFrom": "Suggestion",
          "tableTo": "User",
          "columnsFrom": ["userId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        },
        "Suggestion_documentId_documentCreatedAt_Document_id_createdAt_fk": {
          "name": "Suggestion_documentId_documentCreatedAt_Document_id_createdAt_fk",
          "tableFrom": "Suggestion",
          "tableTo": "Document",
          "columnsFrom": ["documentId", "documentCreatedAt"],
          "columnsTo": ["id", "createdAt"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "Suggestion_id_pk": {
          "name": "Suggestion_id_pk",
          "columns": ["id"]
        }
      },
      "uniqueConstraints": {}
    },
    "public.Chat": {
      "name": "Chat",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": true,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        },
        "messages": {
          "name": "messages",
          "type": "json",
          "primaryKey": false,
          "notNull": true
        },
        "userId": {
          "name": "userId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Chat_userId_User_id_fk": {
          "name": "Chat_userId_User_id_fk",
          "tableFrom": "Chat",
          "tableTo": "User",
          "columnsFrom": ["userId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {}
    },
    "public.Document": {
      "name": "Document",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        },
        "title": {
          "name": "title",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "content": {
          "name": "content",
          "type": "text",
          "primaryKey": false,
          "notNull": false
        },
        "userId": {
          "name": "userId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Document_userId_User_id_fk": {
          "name": "Document_userId_User_id_fk",
          "tableFrom": "Document",
          "tableTo": "User",
          "columnsFrom": ["userId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "Document_id_createdAt_pk": {
          "name": "Document_id_createdAt_pk",
          "columns": ["id", "createdAt"]
        }
      },
      "uniqueConstraints": {}
    },
    "public.User": {
      "name": "User",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": true,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "email": {
          "name": "email",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": true
        },
        "password": {
          "name": "password",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": false
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {}
    }
  },
  "enums": {},
  "schemas": {},
  "sequences": {},
  "_meta": {
    "columns": {},
    "schemas": {},
    "tables": {}
  }
}
```

lib/db/migrations/meta/0002_snapshot.json
```
{
  "id": "b5d8e862-936f-4419-a50f-97be3e7fe665",
  "prevId": "f3d3437c-4735-4c91-80af-1014048a904e",
  "version": "7",
  "dialect": "postgresql",
  "tables": {
    "public.Suggestion": {
      "name": "Suggestion",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "documentId": {
          "name": "documentId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "documentCreatedAt": {
          "name": "documentCreatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        },
        "originalText": {
          "name": "originalText",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "suggestedText": {
          "name": "suggestedText",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "description": {
          "name": "description",
          "type": "text",
          "primaryKey": false,
          "notNull": false
        },
        "isResolved": {
          "name": "isResolved",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "default": false
        },
        "userId": {
          "name": "userId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Suggestion_userId_User_id_fk": {
          "name": "Suggestion_userId_User_id_fk",
          "tableFrom": "Suggestion",
          "tableTo": "User",
          "columnsFrom": ["userId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        },
        "Suggestion_documentId_documentCreatedAt_Document_id_createdAt_fk": {
          "name": "Suggestion_documentId_documentCreatedAt_Document_id_createdAt_fk",
          "tableFrom": "Suggestion",
          "tableTo": "Document",
          "columnsFrom": ["documentId", "documentCreatedAt"],
          "columnsTo": ["id", "createdAt"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "Suggestion_id_pk": {
          "name": "Suggestion_id_pk",
          "columns": ["id"]
        }
      },
      "uniqueConstraints": {}
    },
    "public.Chat": {
      "name": "Chat",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": true,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        },
        "title": {
          "name": "title",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "userId": {
          "name": "userId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Chat_userId_User_id_fk": {
          "name": "Chat_userId_User_id_fk",
          "tableFrom": "Chat",
          "tableTo": "User",
          "columnsFrom": ["userId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {}
    },
    "public.Document": {
      "name": "Document",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        },
        "title": {
          "name": "title",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "content": {
          "name": "content",
          "type": "text",
          "primaryKey": false,
          "notNull": false
        },
        "userId": {
          "name": "userId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Document_userId_User_id_fk": {
          "name": "Document_userId_User_id_fk",
          "tableFrom": "Document",
          "tableTo": "User",
          "columnsFrom": ["userId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "Document_id_createdAt_pk": {
          "name": "Document_id_createdAt_pk",
          "columns": ["id", "createdAt"]
        }
      },
      "uniqueConstraints": {}
    },
    "public.Message": {
      "name": "Message",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": true,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "chatId": {
          "name": "chatId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "role": {
          "name": "role",
          "type": "varchar",
          "primaryKey": false,
          "notNull": true
        },
        "content": {
          "name": "content",
          "type": "json",
          "primaryKey": false,
          "notNull": true
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Message_chatId_Chat_id_fk": {
          "name": "Message_chatId_Chat_id_fk",
          "tableFrom": "Message",
          "tableTo": "Chat",
          "columnsFrom": ["chatId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {}
    },
    "public.User": {
      "name": "User",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": true,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "email": {
          "name": "email",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": true
        },
        "password": {
          "name": "password",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": false
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {}
    },
    "public.Vote": {
      "name": "Vote",
      "schema": "",
      "columns": {
        "chatId": {
          "name": "chatId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "messageId": {
          "name": "messageId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "isUpvoted": {
          "name": "isUpvoted",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Vote_chatId_Chat_id_fk": {
          "name": "Vote_chatId_Chat_id_fk",
          "tableFrom": "Vote",
          "tableTo": "Chat",
          "columnsFrom": ["chatId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        },
        "Vote_messageId_Message_id_fk": {
          "name": "Vote_messageId_Message_id_fk",
          "tableFrom": "Vote",
          "tableTo": "Message",
          "columnsFrom": ["messageId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "Vote_chatId_messageId_pk": {
          "name": "Vote_chatId_messageId_pk",
          "columns": ["chatId", "messageId"]
        }
      },
      "uniqueConstraints": {}
    }
  },
  "enums": {},
  "schemas": {},
  "sequences": {},
  "_meta": {
    "columns": {},
    "schemas": {},
    "tables": {}
  }
}
```

lib/db/migrations/meta/0003_snapshot.json
```
{
  "id": "011efa9e-42c7-4ff6-830a-02106f6638c9",
  "prevId": "b5d8e862-936f-4419-a50f-97be3e7fe665",
  "version": "7",
  "dialect": "postgresql",
  "tables": {
    "public.Chat": {
      "name": "Chat",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": true,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        },
        "title": {
          "name": "title",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "userId": {
          "name": "userId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "visibility": {
          "name": "visibility",
          "type": "varchar",
          "primaryKey": false,
          "notNull": true,
          "default": "'private'"
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Chat_userId_User_id_fk": {
          "name": "Chat_userId_User_id_fk",
          "tableFrom": "Chat",
          "tableTo": "User",
          "columnsFrom": ["userId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {}
    },
    "public.Document": {
      "name": "Document",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        },
        "title": {
          "name": "title",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "content": {
          "name": "content",
          "type": "text",
          "primaryKey": false,
          "notNull": false
        },
        "userId": {
          "name": "userId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Document_userId_User_id_fk": {
          "name": "Document_userId_User_id_fk",
          "tableFrom": "Document",
          "tableTo": "User",
          "columnsFrom": ["userId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "Document_id_createdAt_pk": {
          "name": "Document_id_createdAt_pk",
          "columns": ["id", "createdAt"]
        }
      },
      "uniqueConstraints": {}
    },
    "public.Message": {
      "name": "Message",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": true,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "chatId": {
          "name": "chatId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "role": {
          "name": "role",
          "type": "varchar",
          "primaryKey": false,
          "notNull": true
        },
        "content": {
          "name": "content",
          "type": "json",
          "primaryKey": false,
          "notNull": true
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Message_chatId_Chat_id_fk": {
          "name": "Message_chatId_Chat_id_fk",
          "tableFrom": "Message",
          "tableTo": "Chat",
          "columnsFrom": ["chatId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {}
    },
    "public.Suggestion": {
      "name": "Suggestion",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "documentId": {
          "name": "documentId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "documentCreatedAt": {
          "name": "documentCreatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        },
        "originalText": {
          "name": "originalText",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "suggestedText": {
          "name": "suggestedText",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "description": {
          "name": "description",
          "type": "text",
          "primaryKey": false,
          "notNull": false
        },
        "isResolved": {
          "name": "isResolved",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "default": false
        },
        "userId": {
          "name": "userId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Suggestion_userId_User_id_fk": {
          "name": "Suggestion_userId_User_id_fk",
          "tableFrom": "Suggestion",
          "tableTo": "User",
          "columnsFrom": ["userId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        },
        "Suggestion_documentId_documentCreatedAt_Document_id_createdAt_fk": {
          "name": "Suggestion_documentId_documentCreatedAt_Document_id_createdAt_fk",
          "tableFrom": "Suggestion",
          "tableTo": "Document",
          "columnsFrom": ["documentId", "documentCreatedAt"],
          "columnsTo": ["id", "createdAt"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "Suggestion_id_pk": {
          "name": "Suggestion_id_pk",
          "columns": ["id"]
        }
      },
      "uniqueConstraints": {}
    },
    "public.User": {
      "name": "User",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": true,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "email": {
          "name": "email",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": true
        },
        "password": {
          "name": "password",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": false
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {}
    },
    "public.Vote": {
      "name": "Vote",
      "schema": "",
      "columns": {
        "chatId": {
          "name": "chatId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "messageId": {
          "name": "messageId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "isUpvoted": {
          "name": "isUpvoted",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Vote_chatId_Chat_id_fk": {
          "name": "Vote_chatId_Chat_id_fk",
          "tableFrom": "Vote",
          "tableTo": "Chat",
          "columnsFrom": ["chatId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        },
        "Vote_messageId_Message_id_fk": {
          "name": "Vote_messageId_Message_id_fk",
          "tableFrom": "Vote",
          "tableTo": "Message",
          "columnsFrom": ["messageId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "Vote_chatId_messageId_pk": {
          "name": "Vote_chatId_messageId_pk",
          "columns": ["chatId", "messageId"]
        }
      },
      "uniqueConstraints": {}
    }
  },
  "enums": {},
  "schemas": {},
  "sequences": {},
  "_meta": {
    "columns": {},
    "schemas": {},
    "tables": {}
  }
}
```

lib/db/migrations/meta/0004_snapshot.json
```
{
  "id": "30ad8233-1432-428b-93fc-2bb1ba867ff1",
  "prevId": "011efa9e-42c7-4ff6-830a-02106f6638c9",
  "version": "7",
  "dialect": "postgresql",
  "tables": {
    "public.Chat": {
      "name": "Chat",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": true,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        },
        "title": {
          "name": "title",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "userId": {
          "name": "userId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "visibility": {
          "name": "visibility",
          "type": "varchar",
          "primaryKey": false,
          "notNull": true,
          "default": "'private'"
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Chat_userId_User_id_fk": {
          "name": "Chat_userId_User_id_fk",
          "tableFrom": "Chat",
          "tableTo": "User",
          "columnsFrom": ["userId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {}
    },
    "public.Document": {
      "name": "Document",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        },
        "title": {
          "name": "title",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "content": {
          "name": "content",
          "type": "text",
          "primaryKey": false,
          "notNull": false
        },
        "text": {
          "name": "text",
          "type": "varchar",
          "primaryKey": false,
          "notNull": true,
          "default": "'text'"
        },
        "userId": {
          "name": "userId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Document_userId_User_id_fk": {
          "name": "Document_userId_User_id_fk",
          "tableFrom": "Document",
          "tableTo": "User",
          "columnsFrom": ["userId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "Document_id_createdAt_pk": {
          "name": "Document_id_createdAt_pk",
          "columns": ["id", "createdAt"]
        }
      },
      "uniqueConstraints": {}
    },
    "public.Message": {
      "name": "Message",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": true,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "chatId": {
          "name": "chatId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "role": {
          "name": "role",
          "type": "varchar",
          "primaryKey": false,
          "notNull": true
        },
        "content": {
          "name": "content",
          "type": "json",
          "primaryKey": false,
          "notNull": true
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Message_chatId_Chat_id_fk": {
          "name": "Message_chatId_Chat_id_fk",
          "tableFrom": "Message",
          "tableTo": "Chat",
          "columnsFrom": ["chatId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {}
    },
    "public.Suggestion": {
      "name": "Suggestion",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "documentId": {
          "name": "documentId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "documentCreatedAt": {
          "name": "documentCreatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        },
        "originalText": {
          "name": "originalText",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "suggestedText": {
          "name": "suggestedText",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "description": {
          "name": "description",
          "type": "text",
          "primaryKey": false,
          "notNull": false
        },
        "isResolved": {
          "name": "isResolved",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "default": false
        },
        "userId": {
          "name": "userId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Suggestion_userId_User_id_fk": {
          "name": "Suggestion_userId_User_id_fk",
          "tableFrom": "Suggestion",
          "tableTo": "User",
          "columnsFrom": ["userId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        },
        "Suggestion_documentId_documentCreatedAt_Document_id_createdAt_fk": {
          "name": "Suggestion_documentId_documentCreatedAt_Document_id_createdAt_fk",
          "tableFrom": "Suggestion",
          "tableTo": "Document",
          "columnsFrom": ["documentId", "documentCreatedAt"],
          "columnsTo": ["id", "createdAt"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "Suggestion_id_pk": {
          "name": "Suggestion_id_pk",
          "columns": ["id"]
        }
      },
      "uniqueConstraints": {}
    },
    "public.User": {
      "name": "User",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": true,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "email": {
          "name": "email",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": true
        },
        "password": {
          "name": "password",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": false
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {}
    },
    "public.Vote": {
      "name": "Vote",
      "schema": "",
      "columns": {
        "chatId": {
          "name": "chatId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "messageId": {
          "name": "messageId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "isUpvoted": {
          "name": "isUpvoted",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Vote_chatId_Chat_id_fk": {
          "name": "Vote_chatId_Chat_id_fk",
          "tableFrom": "Vote",
          "tableTo": "Chat",
          "columnsFrom": ["chatId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        },
        "Vote_messageId_Message_id_fk": {
          "name": "Vote_messageId_Message_id_fk",
          "tableFrom": "Vote",
          "tableTo": "Message",
          "columnsFrom": ["messageId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "Vote_chatId_messageId_pk": {
          "name": "Vote_chatId_messageId_pk",
          "columns": ["chatId", "messageId"]
        }
      },
      "uniqueConstraints": {}
    }
  },
  "enums": {},
  "schemas": {},
  "sequences": {},
  "_meta": {
    "columns": {},
    "schemas": {},
    "tables": {}
  }
}
```

lib/db/migrations/meta/0005_snapshot.json
```
{
  "id": "c6c102e6-b64e-4f0c-a7a6-32df758de437",
  "prevId": "30ad8233-1432-428b-93fc-2bb1ba867ff1",
  "version": "7",
  "dialect": "postgresql",
  "tables": {
    "public.Chat": {
      "name": "Chat",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": true,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        },
        "title": {
          "name": "title",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "userId": {
          "name": "userId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "visibility": {
          "name": "visibility",
          "type": "varchar",
          "primaryKey": false,
          "notNull": true,
          "default": "'private'"
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Chat_userId_User_id_fk": {
          "name": "Chat_userId_User_id_fk",
          "tableFrom": "Chat",
          "tableTo": "User",
          "columnsFrom": ["userId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {}
    },
    "public.Document": {
      "name": "Document",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        },
        "title": {
          "name": "title",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "content": {
          "name": "content",
          "type": "text",
          "primaryKey": false,
          "notNull": false
        },
        "text": {
          "name": "text",
          "type": "varchar",
          "primaryKey": false,
          "notNull": true,
          "default": "'text'"
        },
        "userId": {
          "name": "userId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Document_userId_User_id_fk": {
          "name": "Document_userId_User_id_fk",
          "tableFrom": "Document",
          "tableTo": "User",
          "columnsFrom": ["userId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "Document_id_createdAt_pk": {
          "name": "Document_id_createdAt_pk",
          "columns": ["id", "createdAt"]
        }
      },
      "uniqueConstraints": {}
    },
    "public.Message_v2": {
      "name": "Message_v2",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": true,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "chatId": {
          "name": "chatId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "role": {
          "name": "role",
          "type": "varchar",
          "primaryKey": false,
          "notNull": true
        },
        "parts": {
          "name": "parts",
          "type": "json",
          "primaryKey": false,
          "notNull": true
        },
        "attachments": {
          "name": "attachments",
          "type": "json",
          "primaryKey": false,
          "notNull": true
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Message_v2_chatId_Chat_id_fk": {
          "name": "Message_v2_chatId_Chat_id_fk",
          "tableFrom": "Message_v2",
          "tableTo": "Chat",
          "columnsFrom": ["chatId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {}
    },
    "public.Message": {
      "name": "Message",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": true,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "chatId": {
          "name": "chatId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "role": {
          "name": "role",
          "type": "varchar",
          "primaryKey": false,
          "notNull": true
        },
        "content": {
          "name": "content",
          "type": "json",
          "primaryKey": false,
          "notNull": true
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Message_chatId_Chat_id_fk": {
          "name": "Message_chatId_Chat_id_fk",
          "tableFrom": "Message",
          "tableTo": "Chat",
          "columnsFrom": ["chatId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {}
    },
    "public.Suggestion": {
      "name": "Suggestion",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "documentId": {
          "name": "documentId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "documentCreatedAt": {
          "name": "documentCreatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        },
        "originalText": {
          "name": "originalText",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "suggestedText": {
          "name": "suggestedText",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "description": {
          "name": "description",
          "type": "text",
          "primaryKey": false,
          "notNull": false
        },
        "isResolved": {
          "name": "isResolved",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "default": false
        },
        "userId": {
          "name": "userId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Suggestion_userId_User_id_fk": {
          "name": "Suggestion_userId_User_id_fk",
          "tableFrom": "Suggestion",
          "tableTo": "User",
          "columnsFrom": ["userId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        },
        "Suggestion_documentId_documentCreatedAt_Document_id_createdAt_fk": {
          "name": "Suggestion_documentId_documentCreatedAt_Document_id_createdAt_fk",
          "tableFrom": "Suggestion",
          "tableTo": "Document",
          "columnsFrom": ["documentId", "documentCreatedAt"],
          "columnsTo": ["id", "createdAt"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "Suggestion_id_pk": {
          "name": "Suggestion_id_pk",
          "columns": ["id"]
        }
      },
      "uniqueConstraints": {}
    },
    "public.User": {
      "name": "User",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": true,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "email": {
          "name": "email",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": true
        },
        "password": {
          "name": "password",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": false
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {}
    },
    "public.Vote_v2": {
      "name": "Vote_v2",
      "schema": "",
      "columns": {
        "chatId": {
          "name": "chatId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "messageId": {
          "name": "messageId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "isUpvoted": {
          "name": "isUpvoted",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Vote_v2_chatId_Chat_id_fk": {
          "name": "Vote_v2_chatId_Chat_id_fk",
          "tableFrom": "Vote_v2",
          "tableTo": "Chat",
          "columnsFrom": ["chatId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        },
        "Vote_v2_messageId_Message_v2_id_fk": {
          "name": "Vote_v2_messageId_Message_v2_id_fk",
          "tableFrom": "Vote_v2",
          "tableTo": "Message_v2",
          "columnsFrom": ["messageId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "Vote_v2_chatId_messageId_pk": {
          "name": "Vote_v2_chatId_messageId_pk",
          "columns": ["chatId", "messageId"]
        }
      },
      "uniqueConstraints": {}
    },
    "public.Vote": {
      "name": "Vote",
      "schema": "",
      "columns": {
        "chatId": {
          "name": "chatId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "messageId": {
          "name": "messageId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "isUpvoted": {
          "name": "isUpvoted",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Vote_chatId_Chat_id_fk": {
          "name": "Vote_chatId_Chat_id_fk",
          "tableFrom": "Vote",
          "tableTo": "Chat",
          "columnsFrom": ["chatId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        },
        "Vote_messageId_Message_id_fk": {
          "name": "Vote_messageId_Message_id_fk",
          "tableFrom": "Vote",
          "tableTo": "Message",
          "columnsFrom": ["messageId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "Vote_chatId_messageId_pk": {
          "name": "Vote_chatId_messageId_pk",
          "columns": ["chatId", "messageId"]
        }
      },
      "uniqueConstraints": {}
    }
  },
  "enums": {},
  "schemas": {},
  "sequences": {},
  "_meta": {
    "columns": {},
    "schemas": {},
    "tables": {}
  }
}
```

lib/db/migrations/meta/0006_snapshot.json
```
{
  "id": "443de550-b7e8-4bfb-b229-c12dc6c132f0",
  "prevId": "c6c102e6-b64e-4f0c-a7a6-32df758de437",
  "version": "7",
  "dialect": "postgresql",
  "tables": {
    "public.Chat": {
      "name": "Chat",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": true,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        },
        "title": {
          "name": "title",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "userId": {
          "name": "userId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "visibility": {
          "name": "visibility",
          "type": "varchar",
          "primaryKey": false,
          "notNull": true,
          "default": "'private'"
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Chat_userId_User_id_fk": {
          "name": "Chat_userId_User_id_fk",
          "tableFrom": "Chat",
          "tableTo": "User",
          "columnsFrom": ["userId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {}
    },
    "public.Document": {
      "name": "Document",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        },
        "title": {
          "name": "title",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "content": {
          "name": "content",
          "type": "text",
          "primaryKey": false,
          "notNull": false
        },
        "text": {
          "name": "text",
          "type": "varchar",
          "primaryKey": false,
          "notNull": true,
          "default": "'text'"
        },
        "userId": {
          "name": "userId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Document_userId_User_id_fk": {
          "name": "Document_userId_User_id_fk",
          "tableFrom": "Document",
          "tableTo": "User",
          "columnsFrom": ["userId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "Document_id_createdAt_pk": {
          "name": "Document_id_createdAt_pk",
          "columns": ["id", "createdAt"]
        }
      },
      "uniqueConstraints": {}
    },
    "public.Message_v2": {
      "name": "Message_v2",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": true,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "chatId": {
          "name": "chatId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "role": {
          "name": "role",
          "type": "varchar",
          "primaryKey": false,
          "notNull": true
        },
        "parts": {
          "name": "parts",
          "type": "json",
          "primaryKey": false,
          "notNull": true
        },
        "attachments": {
          "name": "attachments",
          "type": "json",
          "primaryKey": false,
          "notNull": true
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Message_v2_chatId_Chat_id_fk": {
          "name": "Message_v2_chatId_Chat_id_fk",
          "tableFrom": "Message_v2",
          "tableTo": "Chat",
          "columnsFrom": ["chatId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {}
    },
    "public.Message": {
      "name": "Message",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": true,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "chatId": {
          "name": "chatId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "role": {
          "name": "role",
          "type": "varchar",
          "primaryKey": false,
          "notNull": true
        },
        "content": {
          "name": "content",
          "type": "json",
          "primaryKey": false,
          "notNull": true
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Message_chatId_Chat_id_fk": {
          "name": "Message_chatId_Chat_id_fk",
          "tableFrom": "Message",
          "tableTo": "Chat",
          "columnsFrom": ["chatId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {}
    },
    "public.Stream": {
      "name": "Stream",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "chatId": {
          "name": "chatId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Stream_chatId_Chat_id_fk": {
          "name": "Stream_chatId_Chat_id_fk",
          "tableFrom": "Stream",
          "tableTo": "Chat",
          "columnsFrom": ["chatId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "Stream_id_pk": {
          "name": "Stream_id_pk",
          "columns": ["id"]
        }
      },
      "uniqueConstraints": {}
    },
    "public.Suggestion": {
      "name": "Suggestion",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "documentId": {
          "name": "documentId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "documentCreatedAt": {
          "name": "documentCreatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        },
        "originalText": {
          "name": "originalText",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "suggestedText": {
          "name": "suggestedText",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "description": {
          "name": "description",
          "type": "text",
          "primaryKey": false,
          "notNull": false
        },
        "isResolved": {
          "name": "isResolved",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "default": false
        },
        "userId": {
          "name": "userId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Suggestion_userId_User_id_fk": {
          "name": "Suggestion_userId_User_id_fk",
          "tableFrom": "Suggestion",
          "tableTo": "User",
          "columnsFrom": ["userId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        },
        "Suggestion_documentId_documentCreatedAt_Document_id_createdAt_fk": {
          "name": "Suggestion_documentId_documentCreatedAt_Document_id_createdAt_fk",
          "tableFrom": "Suggestion",
          "tableTo": "Document",
          "columnsFrom": ["documentId", "documentCreatedAt"],
          "columnsTo": ["id", "createdAt"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "Suggestion_id_pk": {
          "name": "Suggestion_id_pk",
          "columns": ["id"]
        }
      },
      "uniqueConstraints": {}
    },
    "public.User": {
      "name": "User",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": true,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "email": {
          "name": "email",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": true
        },
        "password": {
          "name": "password",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": false
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {}
    },
    "public.Vote_v2": {
      "name": "Vote_v2",
      "schema": "",
      "columns": {
        "chatId": {
          "name": "chatId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "messageId": {
          "name": "messageId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "isUpvoted": {
          "name": "isUpvoted",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Vote_v2_chatId_Chat_id_fk": {
          "name": "Vote_v2_chatId_Chat_id_fk",
          "tableFrom": "Vote_v2",
          "tableTo": "Chat",
          "columnsFrom": ["chatId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        },
        "Vote_v2_messageId_Message_v2_id_fk": {
          "name": "Vote_v2_messageId_Message_v2_id_fk",
          "tableFrom": "Vote_v2",
          "tableTo": "Message_v2",
          "columnsFrom": ["messageId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "Vote_v2_chatId_messageId_pk": {
          "name": "Vote_v2_chatId_messageId_pk",
          "columns": ["chatId", "messageId"]
        }
      },
      "uniqueConstraints": {}
    },
    "public.Vote": {
      "name": "Vote",
      "schema": "",
      "columns": {
        "chatId": {
          "name": "chatId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "messageId": {
          "name": "messageId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "isUpvoted": {
          "name": "isUpvoted",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Vote_chatId_Chat_id_fk": {
          "name": "Vote_chatId_Chat_id_fk",
          "tableFrom": "Vote",
          "tableTo": "Chat",
          "columnsFrom": ["chatId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        },
        "Vote_messageId_Message_id_fk": {
          "name": "Vote_messageId_Message_id_fk",
          "tableFrom": "Vote",
          "tableTo": "Message",
          "columnsFrom": ["messageId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "Vote_chatId_messageId_pk": {
          "name": "Vote_chatId_messageId_pk",
          "columns": ["chatId", "messageId"]
        }
      },
      "uniqueConstraints": {}
    }
  },
  "enums": {},
  "schemas": {},
  "sequences": {},
  "_meta": {
    "columns": {},
    "schemas": {},
    "tables": {}
  }
}
```

lib/db/migrations/meta/0007_snapshot.json
```
{
  "id": "097660a7-976a-4b3e-8ebb-79312e3ece6f",
  "prevId": "443de550-b7e8-4bfb-b229-c12dc6c132f0",
  "version": "7",
  "dialect": "postgresql",
  "tables": {
    "public.Chat": {
      "name": "Chat",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": true,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        },
        "title": {
          "name": "title",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "userId": {
          "name": "userId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "visibility": {
          "name": "visibility",
          "type": "varchar",
          "primaryKey": false,
          "notNull": true,
          "default": "'private'"
        },
        "lastContext": {
          "name": "lastContext",
          "type": "jsonb",
          "primaryKey": false,
          "notNull": false
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Chat_userId_User_id_fk": {
          "name": "Chat_userId_User_id_fk",
          "tableFrom": "Chat",
          "tableTo": "User",
          "columnsFrom": ["userId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {}
    },
    "public.Document": {
      "name": "Document",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        },
        "title": {
          "name": "title",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "content": {
          "name": "content",
          "type": "text",
          "primaryKey": false,
          "notNull": false
        },
        "text": {
          "name": "text",
          "type": "varchar",
          "primaryKey": false,
          "notNull": true,
          "default": "'text'"
        },
        "userId": {
          "name": "userId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Document_userId_User_id_fk": {
          "name": "Document_userId_User_id_fk",
          "tableFrom": "Document",
          "tableTo": "User",
          "columnsFrom": ["userId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "Document_id_createdAt_pk": {
          "name": "Document_id_createdAt_pk",
          "columns": ["id", "createdAt"]
        }
      },
      "uniqueConstraints": {}
    },
    "public.Message_v2": {
      "name": "Message_v2",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": true,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "chatId": {
          "name": "chatId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "role": {
          "name": "role",
          "type": "varchar",
          "primaryKey": false,
          "notNull": true
        },
        "parts": {
          "name": "parts",
          "type": "json",
          "primaryKey": false,
          "notNull": true
        },
        "attachments": {
          "name": "attachments",
          "type": "json",
          "primaryKey": false,
          "notNull": true
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Message_v2_chatId_Chat_id_fk": {
          "name": "Message_v2_chatId_Chat_id_fk",
          "tableFrom": "Message_v2",
          "tableTo": "Chat",
          "columnsFrom": ["chatId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {}
    },
    "public.Message": {
      "name": "Message",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": true,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "chatId": {
          "name": "chatId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "role": {
          "name": "role",
          "type": "varchar",
          "primaryKey": false,
          "notNull": true
        },
        "content": {
          "name": "content",
          "type": "json",
          "primaryKey": false,
          "notNull": true
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Message_chatId_Chat_id_fk": {
          "name": "Message_chatId_Chat_id_fk",
          "tableFrom": "Message",
          "tableTo": "Chat",
          "columnsFrom": ["chatId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {}
    },
    "public.Stream": {
      "name": "Stream",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "chatId": {
          "name": "chatId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Stream_chatId_Chat_id_fk": {
          "name": "Stream_chatId_Chat_id_fk",
          "tableFrom": "Stream",
          "tableTo": "Chat",
          "columnsFrom": ["chatId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "Stream_id_pk": {
          "name": "Stream_id_pk",
          "columns": ["id"]
        }
      },
      "uniqueConstraints": {}
    },
    "public.Suggestion": {
      "name": "Suggestion",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "documentId": {
          "name": "documentId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "documentCreatedAt": {
          "name": "documentCreatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        },
        "originalText": {
          "name": "originalText",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "suggestedText": {
          "name": "suggestedText",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "description": {
          "name": "description",
          "type": "text",
          "primaryKey": false,
          "notNull": false
        },
        "isResolved": {
          "name": "isResolved",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "default": false
        },
        "userId": {
          "name": "userId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Suggestion_userId_User_id_fk": {
          "name": "Suggestion_userId_User_id_fk",
          "tableFrom": "Suggestion",
          "tableTo": "User",
          "columnsFrom": ["userId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        },
        "Suggestion_documentId_documentCreatedAt_Document_id_createdAt_fk": {
          "name": "Suggestion_documentId_documentCreatedAt_Document_id_createdAt_fk",
          "tableFrom": "Suggestion",
          "tableTo": "Document",
          "columnsFrom": ["documentId", "documentCreatedAt"],
          "columnsTo": ["id", "createdAt"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "Suggestion_id_pk": {
          "name": "Suggestion_id_pk",
          "columns": ["id"]
        }
      },
      "uniqueConstraints": {}
    },
    "public.User": {
      "name": "User",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": true,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "email": {
          "name": "email",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": true
        },
        "password": {
          "name": "password",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": false
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {}
    },
    "public.Vote_v2": {
      "name": "Vote_v2",
      "schema": "",
      "columns": {
        "chatId": {
          "name": "chatId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "messageId": {
          "name": "messageId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "isUpvoted": {
          "name": "isUpvoted",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Vote_v2_chatId_Chat_id_fk": {
          "name": "Vote_v2_chatId_Chat_id_fk",
          "tableFrom": "Vote_v2",
          "tableTo": "Chat",
          "columnsFrom": ["chatId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        },
        "Vote_v2_messageId_Message_v2_id_fk": {
          "name": "Vote_v2_messageId_Message_v2_id_fk",
          "tableFrom": "Vote_v2",
          "tableTo": "Message_v2",
          "columnsFrom": ["messageId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "Vote_v2_chatId_messageId_pk": {
          "name": "Vote_v2_chatId_messageId_pk",
          "columns": ["chatId", "messageId"]
        }
      },
      "uniqueConstraints": {}
    },
    "public.Vote": {
      "name": "Vote",
      "schema": "",
      "columns": {
        "chatId": {
          "name": "chatId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "messageId": {
          "name": "messageId",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "isUpvoted": {
          "name": "isUpvoted",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "Vote_chatId_Chat_id_fk": {
          "name": "Vote_chatId_Chat_id_fk",
          "tableFrom": "Vote",
          "tableTo": "Chat",
          "columnsFrom": ["chatId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        },
        "Vote_messageId_Message_id_fk": {
          "name": "Vote_messageId_Message_id_fk",
          "tableFrom": "Vote",
          "tableTo": "Message",
          "columnsFrom": ["messageId"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "Vote_chatId_messageId_pk": {
          "name": "Vote_chatId_messageId_pk",
          "columns": ["chatId", "messageId"]
        }
      },
      "uniqueConstraints": {}
    }
  },
  "enums": {},
  "schemas": {},
  "sequences": {},
  "_meta": {
    "columns": {},
    "schemas": {},
    "tables": {}
  }
}
```

lib/db/migrations/meta/_journal.json
```
{
  "version": "7",
  "dialect": "postgresql",
  "entries": [
    {
      "idx": 0,
      "version": "7",
      "when": 1728598022383,
      "tag": "0000_keen_devos",
      "breakpoints": true
    },
    {
      "idx": 1,
      "version": "7",
      "when": 1730207363999,
      "tag": "0001_sparkling_blue_marvel",
      "breakpoints": true
    },
    {
      "idx": 2,
      "version": "7",
      "when": 1730725226313,
      "tag": "0002_wandering_riptide",
      "breakpoints": true
    },
    {
      "idx": 3,
      "version": "7",
      "when": 1733403031014,
      "tag": "0003_cloudy_glorian",
      "breakpoints": true
    },
    {
      "idx": 4,
      "version": "7",
      "when": 1733945232355,
      "tag": "0004_odd_slayback",
      "breakpoints": true
    },
    {
      "idx": 5,
      "version": "7",
      "when": 1741934630596,
      "tag": "0005_wooden_whistler",
      "breakpoints": true
    },
    {
      "idx": 6,
      "version": "7",
      "when": 1746118166211,
      "tag": "0006_marvelous_frog_thor",
      "breakpoints": true
    },
    {
      "idx": 7,
      "version": "7",
      "when": 1757362773211,
      "tag": "0007_flowery_ben_parker",
      "breakpoints": true
    }
  ]
}
```

</source_code>