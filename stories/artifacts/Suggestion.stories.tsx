import type { Meta, StoryObj } from "@storybook/react";
import { Suggestion } from "@/components/suggestion";
import type { UISuggestion } from "@/lib/editor/suggestions";

const baseSuggestion: UISuggestion = {
  id: "suggestion-1",
  suggestion: "Refactor the helper into a hook",
  description:
    "Use a dedicated hook to synchronize the streaming artifact with sidebar state.",
  originalText: "const [isOpen, setIsOpen] = useState(false);",
  updatedText: "const [isOpen, setIsOpen] = useSidebarState(chatId);",
  selectionStart: 0,
  selectionEnd: 10,
  chatId: "chat_123",
  createdAt: new Date().toISOString(),
  artifactId: "artifact_abc",
};

const meta: Meta<typeof Suggestion> = {
  title: "Artifacts/Suggestion",
  component: Suggestion,
  args: {
    suggestion: baseSuggestion,
    artifactKind: "text",
    onApply: () => console.log("apply suggestion"),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const InlineText: Story = {};

export const InlineCode: Story = {
  args: {
    artifactKind: "code",
    suggestion: {
      ...baseSuggestion,
      id: "suggestion-2",
      description: "Use console outputs to trace LLM invocations.",
    },
  },
};
