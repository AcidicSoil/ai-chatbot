// lib/lmstudioClient.ts
import { LMStudioClient } from "@lmstudio/sdk";

let clientPromise: Promise<LMStudioClient> | null = null;

export function getLmStudioClient(): Promise<LMStudioClient> {
  if (!clientPromise) {
    clientPromise = (async () => {
      const client = new LMStudioClient();
      return client;
    })();
  }
  return clientPromise;
}
