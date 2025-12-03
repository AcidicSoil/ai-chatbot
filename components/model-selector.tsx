"use client";

import type { Session } from "next-auth";
import {
  startTransition,
  useEffect,
  useMemo,
  useOptimistic,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { saveChatModelAsCookie } from "@/app/(chat)/actions";
import {
  ModelSelectorContent,
  ModelSelector as ModelSelectorDialog,
  ModelSelectorEmpty,
  ModelSelectorGroup,
  ModelSelectorInput,
  ModelSelectorItem,
  ModelSelectorList,
  ModelSelectorName,
  ModelSelectorSeparator,
  ModelSelectorTrigger,
} from "@/components/ai-elements/model-selector"; // adjust path to where you put the ai-elements file
import { Button } from "@/components/ui/button";
import { useChatModels } from "@/hooks/use-chat-models";
import { isLmStudioModelId } from "@/lib/ai/lmstudio-ids";
import { cn } from "@/lib/utils";
import { CheckCircleFillIcon, ChevronDownIcon } from "./icons";

export function ModelSelector({
  session,
  selectedModelId,
  className,
  ...buttonProps
}: {
  session: Session;
  selectedModelId: string;
} & React.ComponentProps<typeof Button>) {
  const [open, setOpen] = useState(false);
  const [optimisticModelId, setOptimisticModelId] =
    useOptimistic(selectedModelId);

  const userType = session.user.type;
  const { availableModels, canUseLmStudio, lmStudio } = useChatModels({
    userType,
  });
  const { snapshot, isLoading } = lmStudio;
  const offlineToastShownRef = useRef(false);

  useEffect(() => {
    setOptimisticModelId(selectedModelId);
  }, [selectedModelId, setOptimisticModelId]);

  useEffect(() => {
    if (!canUseLmStudio) return;

    if (snapshot?.isAvailable) {
      offlineToastShownRef.current = false;
      return;
    }

    if (isLoading || snapshot === undefined) return;

    if (!offlineToastShownRef.current) {
      toast.error(
        "LM Studio is offline. Start the LM Studio app to use local models."
      );
      offlineToastShownRef.current = true;
    }
  }, [snapshot, isLoading, canUseLmStudio]);

  const selectedChatModel = useMemo(() => {
    return (
      availableModels.find((chatModel) => chatModel.id === optimisticModelId) ||
      (isLmStudioModelId(optimisticModelId)
        ? {
            id: optimisticModelId,
            name: "LM Studio (Local)",
            description: "Local model",
          }
        : undefined)
    );
  }, [availableModels, optimisticModelId]);

  const handleSelect = (id: string) => {
    setOpen(false);
    startTransition(() => {
      setOptimisticModelId(id);
      saveChatModelAsCookie(id);
    });
  };

  return (
    <ModelSelectorDialog onOpenChange={setOpen} open={open}>
      <ModelSelectorTrigger
        asChild
        className={cn(
          "w-fit data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
          className
        )}
      >
        <Button
          className="md:h-[34px] md:px-2"
          data-testid="model-selector"
          variant="outline"
          {...buttonProps}
        >
          {selectedChatModel?.name}
          <ChevronDownIcon />
        </Button>
      </ModelSelectorTrigger>

      <ModelSelectorContent
        className="min-w-[280px] max-w-[90vw] sm:min-w-[300px]"
        title="Model Selector"
      >
        <ModelSelectorInput placeholder="Search models…" />

        <ModelSelectorList>
          <ModelSelectorEmpty>No models found.</ModelSelectorEmpty>

          <ModelSelectorGroup heading="Models">
            {availableModels.map((chatModel) => {
              const { id, name, description } = chatModel;

              return (
                <ModelSelectorItem
                  asChild
                  data-active={id === optimisticModelId}
                  data-testid={`model-selector-item-${id}`}
                  key={id}
                  onSelect={() => handleSelect(id)}
                  value={id}
                >
                  <button
                    className="group/item flex w-full flex-row items-center justify-between gap-2 sm:gap-4"
                    type="button"
                  >
                    <div className="flex flex-col items-start gap-1">
                      <ModelSelectorName className="text-sm sm:text-base">
                        {name}
                      </ModelSelectorName>
                      {description && (
                        <div className="line-clamp-2 text-muted-foreground text-xs">
                          {description}
                        </div>
                      )}
                    </div>

                    <div className="shrink-0 text-foreground opacity-0 group-data-[active=true]/item:opacity-100 dark:text-foreground">
                      <CheckCircleFillIcon />
                    </div>
                  </button>
                </ModelSelectorItem>
              );
            })}
          </ModelSelectorGroup>

          {canUseLmStudio && !snapshot?.loaded?.length && (
            <>
              <ModelSelectorSeparator />
              <div className="px-3 pt-1 pb-3 text-[11px] text-muted-foreground">
                {snapshot?.isAvailable === false
                  ? "LM Studio is offline. Start the app to enable local models."
                  : "Load a model in LM Studio to see it listed here."}
              </div>
            </>
          )}
        </ModelSelectorList>
      </ModelSelectorContent>
    </ModelSelectorDialog>
  );
}
