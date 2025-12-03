The error you are encountering is likely due to the strict access control in `lib/ai/entitlements.ts`, which prevents the new models (`lmstudio-chat`, `gemini-2.5-pro`) from appearing in the UI even if they are correctly configured in `providers.ts`. Additionally, the system lacks the logic to dynamically discover and route models from LM Studio, which was a key requirement in your TODO.

Here is the full working solution. This includes:

1. **`lib/ai/entitlements.ts`**: Updated to allow access to the new models.
2. **`lib/ai/providers.ts`**: Refactored to export a `getLanguageModel` helper that handles dynamic LM Studio model IDs (routing them to the `lmstudio` provider) while keeping the static registry for others.
3. **`app/(chat)/api/chat/route.ts`**: Updated to use `getLanguageModel` instead of the static `myProvider`.
4. **`components/model-selector.tsx`**: Updated to fetch available LM Studio models from your API and merge them into the dropdown list dynamically.
5. **`lib/ai/models.ts`**: Minor cleanup to ensure the static IDs match the logic.

### 1\. Update Entitlements to Allow New Models

This was blocking the models from appearing in the UI.

```typescript
// path: lib/ai/entitlements.ts
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
    availableChatModelIds: [
      "chat-model",
      "chat-model-reasoning",
      "lmstudio-chat",
      "gemini-2.5-pro",
    ],
  },

  /*
   * For users with an account
   */
  regular: {
    maxMessagesPerDay: 100,
    availableChatModelIds: [
      "chat-model",
      "chat-model-reasoning",
      "lmstudio-chat",
      "gemini-2.5-pro",
    ],
  },

  /*
   * TODO: For users with an account and a paid membership
   */
};
```

### 2\. Update Provider Logic for Dynamic Routing

This enables the backend to handle any model ID starting with `lmstudio-` by routing it to the LM Studio provider, satisfying the "dynamic model" requirement.

```typescript
// path: lib/ai/providers.ts
import { gateway } from "@ai-sdk/gateway";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { createGeminiProvider } from "ai-sdk-provider-gemini-cli";
import { isTestEnvironment } from "../constants";

// 1. Configure LM Studio Provider
const lmstudio = createOpenAICompatible({
  name: "lmstudio",
  baseURL: process.env.LMSTUDIO_BASE_URL ?? "http://localhost:1234/v1",
});

const LMSTUDIO_CHAT_MODEL_ID =
  process.env.LMSTUDIO_CHAT_MODEL_ID ??
  process.env.LMSTUDIO_MODEL_ID ??
  "llama-3.2-1b";

// 2. Configure Gemini Provider
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

// 3. Define the Static Registry (Gateway + Default Models)
const staticRegistry = isTestEnvironment
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
        // Default LM Studio model (from ENV)
        "lmstudio-chat": lmstudio(LMSTUDIO_CHAT_MODEL_ID),
        // Gemini CLI model
        "gemini-2.5-pro": gemini("gemini-2.5-pro"),
      },
    });

// 4. Export a Helper to Resolve Dynamic Models
export function getLanguageModel(modelId: string) {
  // If the model ID starts with "lmstudio-", but isn't the specific static default,
  // we treat it as a dynamic model request for LM Studio.
  if (modelId.startsWith("lmstudio-") && modelId !== "lmstudio-chat") {
    // Remove the prefix to get the actual model ID loaded in LM Studio
    const actualModelId = modelId.replace("lmstudio-", "");
    return lmstudio(actualModelId);
  }

  // Otherwise, use the static registry
  return staticRegistry.languageModel(modelId);
}

// Export the registry as 'myProvider' for backward compatibility where needed,
// but prefer getLanguageModel for chat routing.
export const myProvider = staticRegistry;
```

### 3\. Update Chat Route to Use Dynamic Resolver

This ensures that when a user selects a dynamic model, the backend resolves it correctly using the helper from Step 2.

```typescript
// path: app/(chat)/api/chat/route.ts
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
import { getLanguageModel, myProvider } from "@/lib/ai/providers";
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
        // Use getLanguageModel to resolve both static and dynamic models
        const model = getLanguageModel(selectedChatModel);

        const result = streamText({
          model,
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
              const modelId = model.modelId;

              if (!modelId || !providers) {
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

    return new Response(stream.pipeThrough(new JsonToSseTransformStream()));
  } catch (error) {
    const vercelId = request.headers.get("x-vercel-id");

    if (error instanceof ChatSDKError) {
      return error.toResponse();
    }

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
```

### 4\. Update Model Selector to Fetch Dynamic Models

This component now fetches the actual running models from LM Studio and allows the user to select them.

```tsx
// path: components/model-selector.tsx
"use client";

import type { Session } from "next-auth";
import {
  startTransition,
  useEffect,
  useMemo,
  useOptimistic,
  useState,
} from "react";
import { saveChatModelAsCookie } from "@/app/(chat)/actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { entitlementsByUserType } from "@/lib/ai/entitlements";
import type { LmStudioSnapshot } from "@/lib/ai/lmstudio-client";
import { chatModels } from "@/lib/ai/models";
import { cn } from "@/lib/utils";
import { CheckCircleFillIcon, ChevronDownIcon } from "./icons";

export function ModelSelector({
  session,
  selectedModelId,
  className,
}: {
  session: Session;
  selectedModelId: string;
} & React.ComponentProps<typeof Button>) {
  const [open, setOpen] = useState(false);
  const [optimisticModelId, setOptimisticModelId] =
    useOptimistic(selectedModelId);
  const [lmStudioModels, setLmStudioModels] = useState<
    Array<{ id: string; name: string; description: string }>
  >([]);

  const userType = session.user.type;
  const { availableChatModelIds } = entitlementsByUserType[userType];

  // Fetch LM Studio models on mount
  useEffect(() => {
    // Only fetch if the user is allowed to use the generic LM Studio provider
    if (availableChatModelIds.includes("lmstudio-chat")) {
      fetch("/api/lmstudio/models")
        .then((res) => {
          if (res.ok) return res.json();
          return null;
        })
        .then((data: LmStudioSnapshot | null) => {
          if (data?.isAvailable && data.loaded.length > 0) {
            const dynamicModels = data.loaded.map((m) => ({
              id: `lmstudio-${m.identifier}`, // Prefix to route dynamically
              name: `Local: ${m.identifier}`,
              description: `Loaded in LM Studio (${
                Math.round(m.params / 1e9) || "?"
              }B params)`,
            }));
            setLmStudioModels(dynamicModels);
          }
        })
        .catch((err) =>
          console.warn("Failed to fetch LM Studio models", err)
        );
    }
  }, [availableChatModelIds]);

  const availableChatModels = useMemo(() => {
    const staticModels = chatModels.filter((chatModel) =>
      availableChatModelIds.includes(chatModel.id)
    );
    // Combine static models with dynamically fetched LM Studio models
    return [...staticModels, ...lmStudioModels];
  }, [availableChatModelIds, lmStudioModels]);

  const selectedChatModel = useMemo(
    () =>
      availableChatModels.find(
        (chatModel) => chatModel.id === optimisticModelId
      ) ||
      // Fallback if the selected model is dynamic but not yet in the list (e.g. before fetch completes)
      (optimisticModelId.startsWith("lmstudio-")
        ? { name: optimisticModelId, description: "Local Model" }
        : undefined),
    [optimisticModelId, availableChatModels]
  );

  return (
    <DropdownMenu onOpenChange={setOpen} open={open}>
      <DropdownMenuTrigger
        asChild
        className={cn(
          "w-fit data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
          className
        )}
      >
        <Button
          className="md:h-[34px] md:px-2"
          data-testid="model-selector"
          variant="outline"
        >
          {selectedChatModel?.name || "Select Model"}
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="min-w-[280px] max-w-[90vw] sm:min-w-[300px]"
      >
        {availableChatModels.map((chatModel) => {
          const { id } = chatModel;

          return (
            <DropdownMenuItem
              asChild
              data-active={id === optimisticModelId}
              data-testid={`model-selector-item-${id}`}
              key={id}
              onSelect={() => {
                setOpen(false);

                startTransition(() => {
                  setOptimisticModelId(id);
                  saveChatModelAsCookie(id);
                });
              }}
            >
              <button
                className="group/item flex w-full flex-row items-center justify-between gap-2 sm:gap-4"
                type="button"
              >
                <div className="flex flex-col items-start gap-1">
                  <div className="text-sm sm:text-base">{chatModel.name}</div>
                  <div className="line-clamp-2 text-muted-foreground text-xs">
                    {chatModel.description}
                  </div>
                </div>

                <div className="shrink-0 text-foreground opacity-0 group-data-[active=true]/item:opacity-100 dark:text-foreground">
                  <CheckCircleFillIcon />
                </div>
              </button>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### 5\. Verify Models List

Ensure the static list is clean and ready.

```typescript
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
    name: "LM Studio (Default)",
    description: "Default local model (configured in .env)",
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
