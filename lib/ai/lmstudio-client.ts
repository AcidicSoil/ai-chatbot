// path: lib/ai/lmstudio-client.ts

import type { LLMInfo, LLMInstanceInfo } from "@lmstudio/sdk";
import { LMStudioClient } from "@lmstudio/sdk";

const client = new LMStudioClient();

type DownloadedModels = LLMInfo[];
type LoadedModels = LLMInstanceInfo[];
type VersionInfo = Awaited<
  ReturnType<LMStudioClient["system"]["getLMStudioVersion"]>
>;

export type LmStudioDownloadedModel = DownloadedModels[number];
export type LmStudioLoadedModel = LoadedModels[number];
export type LmStudioLoadResult = LmStudioLoadedModel;

export type LmStudioSnapshot = {
  downloaded: DownloadedModels;
  loaded: LoadedModels;
  version?: VersionInfo;
  isAvailable: boolean;
  errors: string[];
};

async function attempt<T>(label: string, fn: () => Promise<T>) {
  try {
    const data = await fn();
    return { data } as const;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown LM Studio error";
    console.error(`[LM Studio] ${label} failed`, error);
    return { error: message } as const;
  }
}

export async function getLmStudioSnapshot(): Promise<LmStudioSnapshot> {
  const versionResult = await attempt("getLMStudioVersion", () =>
    client.system.getLMStudioVersion()
  );
  const downloadedResult = await attempt("listDownloadedModels", () =>
    client.system.listDownloadedModels("llm")
  );
  const loadedResult = await attempt("listLoadedModels", () =>
    client.llm.listLoaded()
  );

  const errors = [
    versionResult.error,
    downloadedResult.error,
    loadedResult.error,
  ].filter(Boolean) as string[];

  return {
    downloaded: downloadedResult.data ?? [],
    loaded: loadedResult.data ?? [],
    version: versionResult.data,
    isAvailable: !versionResult.error,
    errors,
  };
}

export async function loadLmStudioModel({
  modelKey,
  identifier,
}: {
  modelKey: string;
  identifier?: string;
}): Promise<LmStudioLoadResult> {
  const handle = await client.llm.load(
    modelKey,
    identifier ? { identifier } : undefined
  );
  const info = await handle.getModelInfo();

  if (!info) {
    throw new Error("LM Studio returned no model info after loading");
  }

  return info;
}

export async function unloadLmStudioModel(identifier: string) {
  await client.llm.unload(identifier);
}
