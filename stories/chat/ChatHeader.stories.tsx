import type { Meta, StoryObj } from "@storybook/react";
import { vi } from "vitest";
import { ChatHeader } from "@/components/chat-header";
import { SidebarProvider } from "@/components/ui/sidebar";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock("next-auth/react", () => ({
  useSession: () => ({
    data: { user: { email: "demo@acme.com", type: "pro" } },
    status: "authenticated",
  }),
  signOut: vi.fn(),
}));

vi.mock("@/hooks/use-chat-models", () => ({
  useChatModels: () => ({
    availableModels: [
      {
        id: "gpt-4.1",
        name: "GPT-4.1",
        description: "Hosted model",
        source: "static",
      },
    ],
    canUseLmStudio: true,
    lmStudio: {
      snapshot: {
        isAvailable: true,
        loaded: [
          {
            identifier: "233",
            modelKey: "phi-3",
            displayName: "Phi-3 Mini",
          },
        ],
        downloaded: [
          { modelKey: "phi-3", displayName: "Phi-3 Mini" },
          { modelKey: "mistral-7b", displayName: "Mistral 7B" },
        ],
      },
      downloaded: [
        { modelKey: "phi-3", displayName: "Phi-3 Mini" },
        { modelKey: "mistral-7b", displayName: "Mistral 7B" },
      ],
      isLoading: false,
      error: undefined,
      loadModel: vi.fn(async () => ({
        displayName: "Phi-3 Mini",
        modelKey: "phi-3",
      })),
      unloadModel: vi.fn(async () => {}),
      refresh: vi.fn(async () => {}),
    },
  }),
}));

vi.mock("@/hooks/use-preferred-lmstudio-models", () => ({
  usePreferredLmStudioModels: () => ({
    preferredModels: ["phi-3"],
    addPreferredModel: vi.fn(),
    removePreferredModel: vi.fn(),
    isPreferred: (modelKey: string) => modelKey === "phi-3",
  }),
}));

const meta: Meta<typeof ChatHeader> = {
  title: "Chat/Shell/ChatHeader",
  component: ChatHeader,
  args: {
    chatId: "chat_123",
    selectedVisibilityType: "private",
    isReadonly: false,
  },
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => (
    <SidebarProvider>
      <ChatHeader {...args} />
    </SidebarProvider>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Readonly: Story = {
  args: {
    isReadonly: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Hides the visibility controls and LM Studio settings for archived/readonly sessions.",
      },
    },
  },
};
