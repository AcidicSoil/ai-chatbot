import type { Meta, StoryObj } from "@storybook/react";
import { ImageEditor } from "@/components/image-editor";

const placeholderImage =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/D/PwAIgwN/Gr2RFQAAAABJRU5ErkJggg==";

const meta: Meta<typeof ImageEditor> = {
  title: "Artifacts/ImageEditor",
  component: ImageEditor,
  args: {
    title: "Diffused concept",
    content: placeholderImage,
    status: "idle",
    isInline: false,
    isCurrentVersion: true,
    currentVersionIndex: 0,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const CanvasView: Story = {};

export const InlinePreview: Story = {
  args: {
    isInline: true,
    title: "Inline mock",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Inline mode keeps the editor compact for code artifacts with embedded screenshots.",
      },
    },
  },
};

export const Streaming: Story = {
  args: {
    status: "streaming",
    content: "",
  },
};
