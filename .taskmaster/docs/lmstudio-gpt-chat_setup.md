
`https://github.com/AcidicSoil/ai-chatbot` I want the lmstudio models downloaded on my machine to show up in the drop down, so how can we wrap the lmstudio sdk around the code for the lmstudio code in the lib/providers and models ? Use the gitmcp tool review the repos to add loading/unloading lm-studio models `https://lmstudio.ai/docs/typescript/manage-models/loading` `https://github.com/lmstudio-ai/docs/blob/main/2_typescript/6_manage-models/loading.md`

---

Implementation plan: wire LM Studio into your fork so that

*   downloaded LM Studio models appear in the model dropdown, and

*   the backend can load/unload models via the LM Studio SDK.


Assumptions: your fork keeps the basic `lib/providers` / `lib/models` pattern from `vercel/ai-chatbot` and uses a chat API route that receives `{ providerId, modelId, messages }`.

* * *

0\. Install LM Studio SDK and run LM Studio
-------------------------------------------

In your repo:

    pnpm add @lmstudio/sdk
    # or: npm install @lmstudio/sdk


LM Studio desktop app must be running on the same machine; `LMStudioClient` connects to it using its default configuration.

* * *

1\. Shared LM Studio client for the server
------------------------------------------

Create `lib/lmstudioClient.ts`:

    // lib/lmstudioClient.ts
    import { LMStudioClient } from "@lmstudio/sdk";

    let clientPromise: Promise<LMStudioClient> | null = null;

    export function getLmStudioClient(): Promise<LMStudioClient> {
      if (!clientPromise) {
        clientPromise = (async () => {
          const client = new LMStudioClient();
          return client;
        })();
      }
      return clientPromise;
    }


This file is server-only. Do not import it from client components.

* * *

2\. Add LM Studio provider to `lib/providers`
---------------------------------------------

In whatever file defines your list of providers (for example `lib/providers.ts`), add a provider entry for LM Studio.

Example:

    // lib/providers.ts
    export type ProviderId =
      | "gateway"
      | "openai"
      | "anthropic"
      | "lmstudio"; // add this

    export const LMSTUDIO_PROVIDER_ID: ProviderId = "lmstudio";

    export type Provider = {
      id: ProviderId;
      label: string;
      description?: string;
      isLocal?: boolean;
    };

    export const PROVIDERS: Provider[] = [
      // existing providers...
      {
        id: LMSTUDIO_PROVIDER_ID,
        label: "LM Studio (local)",
        description: "Local models managed by LM Studio",
        isLocal: true,
      },
    ];


If your provider type uses different fields, keep the ID string the same (`"lmstudio"`) and adapt the rest.

* * *

3\. Dynamically pull LM Studio models into your model list
----------------------------------------------------------

Use `client.system.listDownloadedModels()` to get all downloaded models and expose only `type === "llm"` entries in your model dropdown.

Create or extend a helper in `lib/models.ts` (or the equivalent file that feeds the dropdown).

    // lib/models.ts
    import type { ProviderId } from "./providers";
    import { LMSTUDIO_PROVIDER_ID } from "./providers";
    import { getLmStudioClient } from "./lmstudioClient";

    export type Model = {
      id: string;
      name: string;
      providerId: ProviderId;
      contextLength?: number;
      // add extra fields as your UI expects (e.g. tags, description, etc.)
    };

    // existing static models for gateway / other providers
    const STATIC_MODELS: Model[] = [
      // ...
    ];

    async function getLmStudioModels(): Promise<Model[]> {
      const client = await getLmStudioClient();
      const downloaded = await client.system.listDownloadedModels();

      // Filter to LLMs only
      const llmModels = downloaded.filter(
        (m: any) => m.type === "llm",
      );

      return llmModels.map((m: any) => ({
        id: m.modelKey,                        // e.g. "qwen2.5-7b-instruct"
        name: m.displayName ?? m.modelKey,     // human-friendly label
        providerId: LMSTUDIO_PROVIDER_ID,
        contextLength: m.maxContextLength,
      }));
    }

    export async function getAllModels(): Promise<Model[]> {
      return [
        ...STATIC_MODELS,
        ...(await getLmStudioModels()),
      ];
    }


Now the backend model list includes all downloaded LM Studio LLMs. Anywhere the frontend calls `getAllModels()` or equivalent will see them and can render them in the dropdown.

* * *

4\. LM Studio chat execution helper
-----------------------------------

Use `LMStudioClient` directly when the user selects `providerId === "lmstudio"`.

Create `lib/lmstudioChat.ts` to encapsulate the LM Studio call in your app’s message format:

    // lib/lmstudioChat.ts
    import { Chat } from "@lmstudio/sdk";
    import { getLmStudioClient } from "./lmstudioClient";

    export type ChatMessage = {
      role: "system" | "user" | "assistant";
      content: string;
    };

    export async function* streamLmStudioResponse(
      modelKey: string | undefined,
      messages: ChatMessage[],
    ) {
      const client = await getLmStudioClient();

      // Get currently loaded model if no key is provided,
      // otherwise load/use specific model.
      const model = modelKey
        ? await client.llm.model(modelKey)
        : await client.llm.model();

      const chat = Chat.from(
        messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      );

      const prediction = model.respond(chat);

      for await (const fragment of prediction) {
        // fragment has a `content` string according to LM Studio docs
        yield fragment.content as string;
      }
    }


This generator yields raw text chunks for streaming.

* * *

5\. Wire LM Studio into your chat API route
-------------------------------------------

In the `vercel/ai-chatbot` template, the backend chat route is typically under `app/api/chat/route.ts` or similar. You need to branch on `providerId`.

Example for an App Router route:

    // app/api/chat/route.ts
    import { NextRequest } from "next/server";
    import { streamLmStudioResponse } from "@/lib/lmstudioChat";
    import { LMSTUDIO_PROVIDER_ID } from "@/lib/providers";

    const encoder = new TextEncoder();

    export async function POST(req: NextRequest) {
      const body = await req.json();

      const providerId: string = body.providerId;
      const modelId: string | undefined = body.modelId;
      const messages = body.messages as {
        role: "system" | "user" | "assistant";
        content: string;
      }[];

      if (providerId === LMSTUDIO_PROVIDER_ID) {
        const stream = new ReadableStream({
          async start(controller) {
            try {
              for await (const chunk of streamLmStudioResponse(modelId, messages)) {
                controller.enqueue(encoder.encode(chunk));
              }
              controller.close();
            } catch (err) {
              controller.error(err);
            }
          },
        });

        return new Response(stream, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Transfer-Encoding": "chunked",
          },
        });
      }

      // existing provider handling (gateway / xAI / etc.)
      // e.g. return handleGatewayChat(body);
    }


Your existing frontend already knows how to consume streaming text from this route; LM Studio now plugs into that pathway when its provider is selected.

Adjust the request/response shape if your actual route uses a different JSON schema, but keep the same branching logic.

* * *

6\. Expose LM Studio models in the dropdown
-------------------------------------------

Your UI already consumes the provider+model metadata from `lib/providers` / `lib/models`. With the code above:

*   `PROVIDERS` contains `LMSTUDIO_PROVIDER_ID`.

*   `getAllModels()` merges static remote models with `getLmStudioModels()`.


If your dropdown currently filters models by `providerId`, LM Studio will automatically appear as a new provider with its downloaded models.

If you are hard-coding models on the client, replace that with a server call that returns `getAllModels()` so the dynamic LM Studio list is visible.

* * *

7\. Load and unload LM Studio models from your app
--------------------------------------------------

LM Studio handles auto-load on demand via `.model("model-key")`. For more explicit control, you can add small API routes that use `.load`, `.listLoaded`, and `.unload`.

### 7.1 Load a model with TTL

`app/api/lmstudio/load/route.ts`:

    // app/api/lmstudio/load/route.ts
    import { NextRequest, NextResponse } from "next/server";
    import { getLmStudioClient } from "@/lib/lmstudioClient";

    export async function POST(req: NextRequest) {
      const { modelKey, ttl } = await req.json();

      const client = await getLmStudioClient();

      // Explicitly load with a TTL (seconds) so models auto-unload when idle.
      await client.llm.load(modelKey, ttl ? { ttl } : undefined);

      return NextResponse.json({ ok: true, modelKey, ttl: ttl ?? null });
    }


Call this when the user chooses a model or from an admin screen to pre-load models.

### 7.2 List downloaded vs loaded models

`app/api/lmstudio/status/route.ts`:

    // app/api/lmstudio/status/route.ts
    import { NextResponse } from "next/server";
    import { getLmStudioClient } from "@/lib/lmstudioClient";

    export async function GET() {
      const client = await getLmStudioClient();

      const downloaded = await client.system.listDownloadedModels();
      const loadedLlms = await client.llm.listLoaded();
      const loadedEmbeddings = await client.embedding.listLoaded();

      return NextResponse.json({
        downloaded,
        loadedLlms,
        loadedEmbeddings,
      });
    }


Use this endpoint for a simple “LM Studio status” view in the UI.

### 7.3 Unload the currently-used model

Unloading requires a model handle; docs show `model.unload()`.

`app/api/lmstudio/unload/route.ts`:

    // app/api/lmstudio/unload/route.ts
    import { NextRequest, NextResponse } from "next/server";
    import { getLmStudioClient } from "@/lib/lmstudioClient";

    export async function POST(req: NextRequest) {
      const { modelKey } = await req.json();
      const client = await getLmStudioClient();

      // If modelKey provided, get that model; otherwise unload current one.
      const model = modelKey
        ? await client.llm.model(modelKey)
        : await client.llm.model();

      await model.unload();

      return NextResponse.json({ ok: true, modelKey: modelKey ?? null });
    }


You can call this endpoint from your UI to free memory when you are done with a model, or rely purely on TTL in `.load()`.

* * *

8\. Summary of concrete changes in your repo
--------------------------------------------

*   Add dependency: `@lmstudio/sdk`.

*   Add `lib/lmstudioClient.ts` for a singleton LM Studio client.

*   Extend `lib/providers.ts` with `LMSTUDIO_PROVIDER_ID = "lmstudio"`.

*   Extend `lib/models.ts` to:

    *   define `getLmStudioModels()` using `client.system.listDownloadedModels()`.

    *   merge LM Studio models into `getAllModels()` so they appear in the dropdown.

*   Add `lib/lmstudioChat.ts` to bridge your chat message format to LM Studio `Chat` + `.respond`.

*   Update your chat API route to branch on `providerId === "lmstudio"` and stream from `streamLmStudioResponse`.

*   Optionally add:

    *   `/api/lmstudio/load` (explicit load with TTL),

    *   `/api/lmstudio/status` (downloaded vs loaded),

    *   `/api/lmstudio/unload` (manual unload).


With those pieces in place, any LLM you download in LM Studio appears in the model dropdown under the “LM Studio (local)” provider, and the backend uses LM Studio’s SDK to load, stream, and unload the models.
