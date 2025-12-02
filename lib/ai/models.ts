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