export const DEFAULT_CHAT_MODEL: string = "chat-model";

export type ChatModel = {
  id: string;
  name: string;
  description: string;
};

export const chatModels: ChatModel[] = [
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
    id: "lmstudio-chat",
    name: "LM Studio – Local",
    description:
      "Local model served via LM Studio OpenAI-compatible API (http://localhost:1234/v1 by default)",
  },
  {
    id: "gemini-2.5-pro",
    name: "Gemini 2.5 Pro (CLI)",
    description:
      "Google Gemini via ai-sdk-provider-gemini-cli and Gemini CLI / API key",
  },
];
