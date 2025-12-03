import type { Meta, StoryObj } from "@storybook/react";
import { vi } from "vitest";
import { SidebarHistory } from "@/components/sidebar-history";
import { SidebarProvider } from "@/components/ui/sidebar";

const now = new Date();
const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
const lastWeek = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);
const older = new Date(Date.now() - 40 * 24 * 60 * 60 * 1000);

const sampleHistory = [
  {
    chats: [
      {
        id: "chat_today",
        title: "Prompt engineering strategies",
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        visibility: "private",
        userId: "user_demo",
        artifactVisibility: "private",
      },
      {
        id: "chat_yesterday",
        title: "Daily standup notes",
        createdAt: yesterday.toISOString(),
        updatedAt: yesterday.toISOString(),
        visibility: "public",
        userId: "user_demo",
        artifactVisibility: "public",
      },
      {
        id: "chat_week",
        title: "Incident response retro",
        createdAt: lastWeek.toISOString(),
        updatedAt: lastWeek.toISOString(),
        visibility: "private",
        userId: "user_demo",
        artifactVisibility: "private",
      },
      {
        id: "chat_old",
        title: "Research backlog",
        createdAt: older.toISOString(),
        updatedAt: older.toISOString(),
        visibility: "public",
        userId: "user_demo",
        artifactVisibility: "public",
      },
    ],
    hasMore: false,
  },
];

vi.mock("next/navigation", () => ({
  useParams: () => ({ id: "chat_today" }),
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
}));

vi.mock("@/hooks/use-chat-visibility", () => {
  const React = require("react");
  return {
    useChatVisibility: ({
      initialVisibilityType,
    }: {
      initialVisibilityType: "private" | "public";
    }) => {
      const [visibilityType, setVisibilityType] = React.useState(
        initialVisibilityType
      );
      return { visibilityType, setVisibilityType };
    },
  };
});

vi.mock("swr/infinite", () => ({
  __esModule: true,
  default: (...args: unknown[]) => ({
    data: sampleHistory,
    setSize: vi.fn(),
    isValidating: false,
    isLoading: false,
    mutate: vi.fn(),
  }),
  useSWRInfinite: (...args: unknown[]) => ({
    data: sampleHistory,
    setSize: vi.fn(),
    isValidating: false,
    isLoading: false,
    mutate: vi.fn(),
  }),
}));

const meta: Meta<typeof SidebarHistory> = {
  title: "Chat/Shell/SidebarHistory",
  component: SidebarHistory,
  args: {
    user: {
      id: "user_demo",
      email: "demo@acme.com",
      name: "Demo User",
    },
  },
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => (
    <SidebarProvider className="min-h-screen border">
      <SidebarHistory {...args} />
    </SidebarProvider>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const WithDates: Story = {};
