// lib/lmstudio/client.ts
import "server-only";
import { LMStudioClient } from "@lmstudio/sdk";

let client: LMStudioClient | undefined;

export function getLMStudioClient(): LMStudioClient {
  if (!client) {
    client = new LMStudioClient();
  }
  return client;
}
