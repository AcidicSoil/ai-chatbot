import type { Meta, StoryObj } from "@storybook/react";
import { VisibilitySelector } from "@/components/visibility-selector";
import { vi } from "vitest";

vi.mock("@/hooks/use-chat-visibility", () => {
  const React = require("react");
  return {
    useChatVisibility: ({ initialVisibilityType }: { initialVisibilityType: "private" | "public" }) => {
      const [visibilityType, setVisibilityType] = React.useState(initialVisibilityType);
      return {
        visibilityType,
        setVisibilityType,
      };
    },
  };
});

vi.mock("@/app/(chat)/actions", () => ({
  updateChatVisibility: vi.fn(async () => undefined),
}));

const meta: Meta<typeof VisibilitySelector> = {
  title: "Chat/Shell/VisibilitySelector",
  component: VisibilitySelector,
  args: {
    chatId: "chat_123",
    selectedVisibilityType: "private",
  },
  render: (args) => (
    <div className="p-6">
      <VisibilitySelector {...args} />
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Private: Story = {};

export const Public: Story = {
  args: {
    selectedVisibilityType: "public",
  },
};
