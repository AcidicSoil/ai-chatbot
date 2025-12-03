import { useCallback, useMemo } from "react";
import useSWR from "swr";
import type { UserType } from "@/app/(auth)/auth";
import { entitlementsByUserType } from "@/lib/ai/entitlements";
import { chatModels } from "@/lib/ai/models";
import type {
  LmStudioDownloadedModel,
  LmStudioLoadResult,
  LmStudioSnapshot,
} from "@/lib/ai/lmstudio-client";
import { createLmStudioModelId } from "@/lib/ai/lmstudio-ids";
import { fetcher } from "@/lib/utils";

type UseChatModelsArgs = {
  userType?: UserType;
};

export type ChatModelOption = {
  id: string;
  name: string;
  description: string;
  source: "static" | "lmstudio";
  identifier?: string;
  modelKey?: string;
};

type UseChatModelsReturn = {
  availableModels: ChatModelOption[];
  canUseLmStudio: boolean;
  lmStudio: {
    snapshot?: LmStudioSnapshot;
    downloaded: LmStudioDownloadedModel[];
    isLoading: boolean;
    error?: unknown;
    loadModel: (modelKey: string) => Promise<LmStudioLoadResult | undefined>;
    unloadModel: (identifier: string) => Promise<void>;
    refresh: () => Promise<LmStudioSnapshot | undefined>;
  };
};

export function useChatModels({ userType }: UseChatModelsArgs): UseChatModelsReturn {
  const resolvedUserType = userType ?? "guest";
  const entitlements = entitlementsByUserType[resolvedUserType];
  const availableChatModelIds = entitlements?.availableChatModelIds ?? [];
  const canUseLmStudio = availableChatModelIds.includes("lmstudio-chat");

  const {
    data: snapshot,
    error,
    isLoading,
    mutate,
  } = useSWR<LmStudioSnapshot>(
    canUseLmStudio ? "/api/lmstudio/models" : null,
    fetcher,
    {
      refreshInterval: canUseLmStudio ? 15_000 : undefined,
    }
  );

  const staticModels = useMemo<ChatModelOption[]>(() => {
    return chatModels
      .filter((chatModel) => availableChatModelIds.includes(chatModel.id))
      .map((chatModel) => ({
        id: chatModel.id,
        name: chatModel.name,
        description: chatModel.description,
        source: "static" as const,
      }));
  }, [availableChatModelIds]);

  const lmStudioLoadedModels = useMemo<ChatModelOption[]>(() => {
    if (!snapshot?.loaded?.length) {
      return [];
    }

    return snapshot.loaded.map((model) => ({
      id: createLmStudioModelId(model.identifier),
      name: model.displayName ?? model.modelKey ?? model.path,
      description: `Local • ${model.modelKey}`,
      source: "lmstudio" as const,
      identifier: model.identifier,
      modelKey: model.modelKey,
    }));
  }, [snapshot?.loaded]);

  const availableModels = useMemo(() => {
    return [...staticModels, ...lmStudioLoadedModels];
  }, [staticModels, lmStudioLoadedModels]);

  const downloaded = useMemo<LmStudioDownloadedModel[]>(() => {
    if (!snapshot?.downloaded) {
      return [];
    }

    const loadedKeys = new Set(snapshot.loaded?.map((model) => model.modelKey));
    return snapshot.downloaded.filter((model) => {
      return Boolean(model.modelKey) && !loadedKeys.has(model.modelKey);
    });
  }, [snapshot]);

  const loadModel = useCallback(
    async (modelKey: string) => {
      if (!canUseLmStudio) {
        return undefined;
      }

      const response = await fetch("/api/lmstudio/models/load", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ modelKey }),
      });

      if (!response.ok) {
        const { error: errorMessage } = await response.json().catch(() => ({ error: "Unable to load LM Studio model" }));
        throw new Error(errorMessage ?? "Unable to load LM Studio model");
      }

      const payload = (await response.json()) as { model: LmStudioLoadResult };
      await mutate();
      return payload.model;
    },
    [canUseLmStudio, mutate]
  );

  const unloadModel = useCallback(
    async (identifier: string) => {
      if (!canUseLmStudio) {
        return;
      }

      const response = await fetch("/api/lmstudio/models/unload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier }),
      });

      if (!response.ok) {
        const { error: errorMessage } = await response.json().catch(() => ({ error: "Unable to unload LM Studio model" }));
        throw new Error(errorMessage ?? "Unable to unload LM Studio model");
      }

      await mutate();
    },
    [canUseLmStudio, mutate]
  );

  return {
    availableModels,
    canUseLmStudio,
    lmStudio: {
      snapshot,
      downloaded,
      isLoading,
      error,
      loadModel,
      unloadModel,
      refresh: () => mutate(),
    },
  };
}
