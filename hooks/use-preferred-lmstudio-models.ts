import { useCallback } from "react";
import { useLocalStorage } from "usehooks-ts";

const STORAGE_KEY = "lmstudio-preferred-models";

export function usePreferredLmStudioModels() {
  const [preferredModels, setPreferredModels] = useLocalStorage<string[]>(
    STORAGE_KEY,
    []
  );

  const addPreferredModel = useCallback(
    (modelKey: string) => {
      setPreferredModels((prev) => {
        if (prev.includes(modelKey)) {
          return prev;
        }
        return [...prev, modelKey];
      });
    },
    [setPreferredModels]
  );

  const removePreferredModel = useCallback(
    (modelKey: string) => {
      setPreferredModels((prev) => prev.filter((key) => key !== modelKey));
    },
    [setPreferredModels]
  );

  return {
    preferredModels,
    addPreferredModel,
    removePreferredModel,
    isPreferred: (modelKey: string) => preferredModels.includes(modelKey),
  };
}
