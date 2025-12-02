// path: lib/ai/lmstudio-client.ts
import { LMStudioClient } from "@lmstudio/sdk";

const client = new LMStudioClient();

type DownloadedModels = Awaited<
  ReturnType<LMStudioClient["system"]["listDownloadedModels"]>
>;
type LoadedModels = Awaited<
  ReturnType<LMStudioClient["llm"]["listLoaded"]>
>;
type VersionInfo = Awaited<
  ReturnType<LMStudioClient["system"]["getLMStudioVersion"]>
>;

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
    client.system.listDownloadedModels()
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
