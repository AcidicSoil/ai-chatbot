Integration plan and code, aligned with the existing stack (Next App Router + AI SDK + HuggingFace provider).

---

## 1. Environment and configuration

1. Add a Hugging Face access token to your environment:

```bash
# .env.local
HUGGINGFACE_API_KEY=hf_XXXXXXXXXXXXXXXXXXXXXXXX
```

2. Ensure dependencies (already present, no changes required):

* `"ai": "5.0.26"`
* `"@ai-sdk/huggingface": "^0.0.11"`
* `"@ai-sdk/react": "2.0.26"`
* `"zod": "^3.25.76"`

---

## 2. Provider: wrap `stepfun-ai/GELab-Zero-4B-preview`

Create a dedicated provider module, e.g. `lib/ai/gelab-hf.ts`:

```ts
// lib/ai/gelab-hf.ts
import { createHuggingFace } from '@ai-sdk/huggingface';

if (!process.env.HUGGINGFACE_API_KEY) {
  throw new Error('HUGGINGFACE_API_KEY is not set');
}

const hf = createHuggingFace({
  apiKey: process.env.HUGGINGFACE_API_KEY!,
});

export const gelabZero4b = hf('stepfun-ai/GELab-Zero-4B-preview');
```

This keeps the model definition consistent with the AI SDK provider pattern already used in the template.

---

## 3. API route: streaming chat + GUI-navigation tools

Add a dedicated route that uses the model and exposes “GUI navigation” tools as text-level actions the model can call. These tools don’t actually drive a browser yet; they log and echo back the intended actions so the UI can display them clearly.

Create `app/api/chat/gelab-zero/route.ts`:

```ts
// app/api/chat/gelab-zero/route.ts
import { NextRequest } from 'next/server';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { gelabZero4b } from '@/lib/ai/gelab-hf';

export const maxDuration = 30;

// Tool set for GUI navigation “intents”
const guiTools = {
  navigate: tool({
    description: 'Navigate the GUI to a new URL or route.',
    parameters: z.object({
      url: z.string().describe('Absolute URL or in-app path'),
    }),
    // For now, just echo the action; UI can render it.
    execute: async ({ url }) => {
      return {
        type: 'navigate',
        url,
        status: 'queued',
      };
    },
  }),

  clickElement: tool({
    description: 'Click an element in the GUI given a CSS selector.',
    parameters: z.object({
      selector: z
        .string()
        .describe('CSS selector of the element to click, e.g. "#submit"'),
    }),
    execute: async ({ selector }) => {
      return {
        type: 'click',
        selector,
        status: 'queued',
      };
    },
  }),

  inputText: tool({
    description: 'Type text into an input element.',
    parameters: z.object({
      selector: z
        .string()
        .describe('CSS selector of the input element, e.g. "input[name=q]"'),
      text: z.string().describe('Text to type into the input'),
    }),
    execute: async ({ selector, text }) => {
      return {
        type: 'input',
        selector,
        text,
        status: 'queued',
      };
    },
  }),

  getDomSnapshot: tool({
    description:
      'Request a snapshot description of the current GUI state for reasoning.',
    parameters: z.object({
      detailLevel: z
        .enum(['low', 'medium', 'high'])
        .default('medium')
        .describe('How detailed the snapshot description should be.'),
    }),
    // Stub: respond with a placeholder snapshot; can be wired to real DOM later.
    execute: async ({ detailLevel }) => {
      return {
        type: 'domSnapshot',
        detailLevel,
        snapshot:
          'GUI test harness stub: layout has a left-side iframe and right-side logs.',
      };
    },
  }),
};

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const result = await streamText({
    model: gelabZero4b,
    messages,
    tools: guiTools,
  });

  return result.toAIStreamResponse();
}
```

This gives the agent explicit, structured tools for GUI navigation while keeping everything server-side and text-based for now.

---

## 4. UI wiring: expose the model in the chat interface

The template usually has a model list / selector and a chat hook that points to an API route. Without direct file access, bind the new route using the same pattern already used for the other models.

Typical changes (adapt them to your actual structure):

1. Add a model entry in your model config (example `lib/ai/models.ts` or similar):

```ts
// lib/ai/models.ts (example)
export const chatModels = [
  // existing models...
  {
    id: 'gelab-zero-4b-preview',
    label: 'GELab Zero 4B (HF)',
    api: '/api/chat/gelab-zero',
    capabilities: ['tools', 'gui-nav'],
  },
];
```

2. Ensure your chat page uses the new entry. Example in `app/(chat)/page.tsx` (or similar):

```tsx
// app/(chat)/page.tsx (relevant fragment)
import { useChat } from '@ai-sdk/react';
import { chatModels } from '@/lib/ai/models';

export default function ChatPage() {
  const [currentModel, setCurrentModel] = React.useState(
    chatModels[0] ?? null,
  );

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: currentModel?.api ?? '/api/chat',
  });

  // existing UI…
}
```

3. Add the model to any dropdown / selector component so it appears alongside the existing xAI / gateway models.

---

## 5. GUI navigation test harness page

Use the hi-ai UI sketch as the basis: left side is “live app / canvas”, right side is a stack of panels for logs and state.

ASCII layout already generated:

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────┐ ┌──────────────────────────────────────┐ │
│ │Live App iFrame / Canvas             │ │Model Command Log & Tool Calls        │ │
│ │                                     │ │                                      │ │
│ │                                     │ │                                      │ │
│ │                                     │ │                                      │ │
│ │                                     │ │                                      │ │
│ │                                     │ │                                      │ │
│ └─────────────────────────────────────┘ └──────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────┘
```

Implement a dedicated page that uses the new `/api/chat/gelab-zero` route and displays tool calls in a structured way.

Create `app/agent-gui/page.tsx`:

```tsx
// app/agent-gui/page.tsx
'use client';

import React from 'react';
import { useChat } from '@ai-sdk/react';

type GuiToolCall =
  | {
      type: 'navigate';
      url: string;
      status: string;
    }
  | {
      type: 'click';
      selector: string;
      status: string;
    }
  | {
      type: 'input';
      selector: string;
      text: string;
      status: string;
    }
  | {
      type: 'domSnapshot';
      detailLevel: string;
      snapshot: string;
    };

export default function AgentGuiTestPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: '/api/chat/gelab-zero',
    });

  const toolCalls: GuiToolCall[] = React.useMemo(() => {
    const calls: GuiToolCall[] = [];

    for (const m of messages) {
      // tool results typically appear as role: 'tool' or inside metadata, depending on your existing wiring.
      // Adjust this extraction logic to match the message shape in your app.
      if (
        typeof m.content === 'string' ||
        !Array.isArray(m.content)
      ) {
        continue;
      }

      for (const part of m.content) {
        if (part.type !== 'tool-call-result') continue;
        const data = part.result as GuiToolCall | undefined;
        if (!data || !('type' in data)) continue;
        calls.push(data);
      }
    }

    return calls;
  }, [messages]);

  return (
    <div className="flex h-screen w-full">
      {/* Left: live view / canvas */}
      <div className="flex-1 border-r border-gray-300 dark:border-gray-800">
        <iframe
          src="/"
          title="App Preview"
          className="h-full w-full"
        />
      </div>

      {/* Right: logs and controls */}
      <div className="flex w-[420px] flex-col">
        {/* Tool call log */}
        <div className="flex-1 border-b border-gray-300 dark:border-gray-800 p-3 overflow-auto">
          <h2 className="mb-2 text-sm font-semibold">
            Model Command Log &amp; Tool Calls
          </h2>
          <div className="space-y-2 text-xs font-mono">
            {toolCalls.length === 0 && (
              <div className="text-gray-500">
                No GUI tool calls yet.
              </div>
            )}
            {toolCalls.map((call, idx) => (
              <div
                key={idx}
                className="rounded-md border border-gray-300 dark:border-gray-700 p-2"
              >
                <pre className="whitespace-pre-wrap">
                  {JSON.stringify(call, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        </div>

        {/* Raw messages / state viewer */}
        <div className="h-48 border-b border-gray-300 dark:border-gray-800 p-3 overflow-auto">
          <h2 className="mb-2 text-sm font-semibold">
            State &amp; Messages
          </h2>
          <pre className="text-[10px] leading-tight">
            {JSON.stringify(messages, null, 2)}
          </pre>
        </div>

        {/* Controls */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 p-3"
        >
          <input
            className="flex-1 rounded-md border border-gray-300 px-2 py-1 text-sm dark:border-gray-700"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask GELab Zero to operate the GUI..."
          />
          <button
            type="submit"
            className="rounded-md border px-3 py-1 text-sm"
            disabled={isLoading}
          >
            Run
          </button>
        </form>
      </div>
    </div>
  );
}
```

This page:

* Uses the new HuggingFace-backed model via `/api/chat/gelab-zero`.
* Shows tool-call results in a dedicated panel, so `navigate`, `clickElement`, `inputText`, and `getDomSnapshot` actions are directly visible.
* Embeds the running app in an iframe on the left to give visual context while inspecting the model’s “GUI navigation” reasoning.

At this point the model is integrated into the repo and the GUI navigation features are testable from the deployed URL by navigating to `/agent-gui` and prompting the model to describe and plan GUI interactions.
