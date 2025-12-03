"use client"

import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useChatModels } from "@/hooks/use-chat-models";
import { usePreferredLmStudioModels } from "@/hooks/use-preferred-lmstudio-models";

export function LmStudioModelSettingsButton() {
  const { data: session } = useSession();
  const userType = session?.user?.type ?? "guest";
  const { preferredModels, addPreferredModel, removePreferredModel } =
    usePreferredLmStudioModels();
  const { canUseLmStudio, lmStudio } = useChatModels({ userType });
  const { snapshot, downloaded, loadModel, unloadModel, isLoading } = lmStudio;
  const [isOpen, setIsOpen] = useState(false);
  const [manualModelKey, setManualModelKey] = useState("");

  if (!canUseLmStudio) {
    return null;
  }

  const preferredEntries = useMemo(() => {
    return preferredModels.map((modelKey) => {
      const loaded = snapshot?.loaded?.find(
        (model) => model.modelKey === modelKey
      );
      const downloadedModel = snapshot?.downloaded?.find(
        (model) => model.modelKey === modelKey
      );
      return {
        modelKey,
        isLoaded: Boolean(loaded),
        identifier: loaded?.identifier,
        displayName: downloadedModel?.displayName ?? modelKey,
        isDownloaded: Boolean(downloadedModel),
      };
    });
  }, [preferredModels, snapshot]);

  const handleAddManualModel = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = manualModelKey.trim();
    if (!trimmed) {
      return;
    }
    addPreferredModel(trimmed);
    toast.success(`Added ${trimmed} to preferred models`);
    setManualModelKey("");
  };

  const handleLoadModel = async (modelKey: string) => {
    try {
      const loadedModel = await loadModel(modelKey);
      if (loadedModel) {
        toast.success(
          `Loaded ${loadedModel.displayName ?? loadedModel.modelKey}`
        );
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to load LM Studio model"
      );
    }
  };

  const handleUnloadModel = async (identifier?: string) => {
    if (!identifier) {
      return;
    }
    try {
      await unloadModel(identifier);
      toast.success("Unloaded local model");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to unload LM Studio model"
      );
    }
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button className="order-3" size="sm" variant="outline">
          Local models
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Local LM Studio Models</DialogTitle>
          <DialogDescription>
            Manage the models you load through LM Studio and keep a preferred
            list for quick access.
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable Container for Lists */}
        <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4">
          {!snapshot?.isAvailable && !isLoading && (
            <p className="rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground">
              LM Studio appears to be offline. Start the LM Studio desktop app
              to load local models.
            </p>
          )}

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">Preferred models</h3>
              <span className="text-muted-foreground text-xs">
                Stored in your browser
              </span>
            </div>
            {preferredEntries.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                You haven’t added any preferred models yet.
              </p>
            ) : (
              <ul className="space-y-2">
                {preferredEntries.map((entry) => (
                  <li
                    className="rounded-md border px-3 py-2 text-sm"
                    key={entry.modelKey}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex flex-col">
                        <span className="font-medium">{entry.displayName}</span>
                        <span className="text-muted-foreground text-xs">
                          {entry.modelKey}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {entry.isLoaded ? (
                          <Button
                            onClick={() => handleUnloadModel(entry.identifier)}
                            size="sm"
                            variant="outline"
                          >
                            Unload
                          </Button>
                        ) : (
                          <Button
                            disabled={!entry.isDownloaded}
                            onClick={() => handleLoadModel(entry.modelKey)}
                            size="sm"
                          >
                            Load
                          </Button>
                        )}
                        <Button
                          onClick={() => removePreferredModel(entry.modelKey)}
                          size="sm"
                          variant="ghost"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">Downloaded models</h3>
              <Button
                onClick={() => lmStudio.refresh()}
                size="sm"
                variant="outline"
              >
                Refresh
              </Button>
            </div>
            {downloaded.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No downloaded models detected. Download a model via the LM
                Studio app.
              </p>
            ) : (
              <ul className="space-y-2">
                {downloaded.map((model) => (
                  <li
                    className="rounded-md border px-3 py-2 text-sm"
                    key={model.modelKey}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {model.displayName ?? model.modelKey}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {model.modelKey}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => handleLoadModel(model.modelKey)}
                          size="sm"
                        >
                          Load now
                        </Button>
                        <Button
                          onClick={() => {
                            addPreferredModel(model.modelKey);
                            toast.success(
                              `${model.displayName ?? model.modelKey} added to preferred`
                            );
                          }}
                          size="sm"
                          variant="outline"
                        >
                          Add to preferred
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <form className="space-y-3" onSubmit={handleAddManualModel}>
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">Add model manually</h3>
          </div>
          <div className="flex gap-2">
            <Input
              onChange={(event) => setManualModelKey(event.target.value)}
              placeholder="lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF"
              value={manualModelKey}
            />
            <Button type="submit" variant="secondary">
              Add
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}