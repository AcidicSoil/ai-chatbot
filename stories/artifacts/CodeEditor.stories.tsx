import type { Meta, StoryObj } from "@storybook/react";
import { CodeEditor } from "@/components/code-editor";

const sampleCode = `def handler(event, context):
    message = event.get("message", "Hello from Storybook!")
    return {
        "statusCode": 200,
        "body": f"Processed: {message}"
    }`;

const meta: Meta<typeof CodeEditor> = {
  title: "Artifacts/CodeEditor",
  component: CodeEditor,
  args: {
    content: sampleCode,
    currentVersionIndex: 0,
    suggestions: [],
    isCurrentVersion: true,
    status: "idle",
    onSaveContent: (updated: string) => console.log("save", updated),
  },
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Idle: Story = {};

export const StreamingUpdate: Story = {
  args: {
    status: "streaming",
  },
  parameters: {
    docs: {
      description: {
        story: "Streaming state overlays remote updates while code is regenerating.",
      },
    },
  },
};
