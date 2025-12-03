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
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useChatModels } from "@/hooks/use-chat-models";
import { isLmStudioModelId } from "@/lib/ai/lmstudio-ids";
import { cn } from "@/lib/utils";
import { CheckCircleFillIcon, ChevronDownIcon } from "./icons";

export function ModelSelector({
  session,
  selectedModelId,
  className,
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
    if (!canUseLmStudio) {
      return;
    }

    if (snapshot?.isAvailable) {
      offlineToastShownRef.current = false;
      return;
    }

    if (isLoading || snapshot === undefined) {
      return;
    }

    if (!offlineToastShownRef.current) {
      toast.error("LM Studio is offline. Start the LM Studio app to use local models.");
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
    <DropdownMenu onOpenChange={setOpen} open={open}>
      <DropdownMenuTrigger
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
        >
          {selectedChatModel?.name}
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="min-w-[280px] max-w-[90vw] sm:min-w-[300px]"
      >
        {availableModels.map((chatModel) => {
          const { id } = chatModel;

          return (
            <DropdownMenuItem
              asChild
              data-active={id === optimisticModelId}
              data-testid={`model-selector-item-${id}`}
              key={id}
              onSelect={() => handleSelect(id)}
            >
              <button
                className="group/item flex w-full flex-row items-center justify-between gap-2 sm:gap-4"
                type="button"
              >
                <div className="flex flex-col items-start gap-1">
                  <div className="text-sm sm:text-base">{chatModel.name}</div>
                  <div className="line-clamp-2 text-muted-foreground text-xs">
                    {chatModel.description}
                  </div>
                </div>

                <div className="shrink-0 text-foreground opacity-0 group-data-[active=true]/item:opacity-100 dark:text-foreground">
                  <CheckCircleFillIcon />
                </div>
              </button>
            </DropdownMenuItem>
          );
        })}
        {canUseLmStudio && !snapshot?.loaded?.length && (
          <div className="px-2 pb-2 text-[11px] text-muted-foreground">
            {snapshot?.isAvailable === false
              ? "LM Studio is offline. Start the app to enable local models."
              : "Load a model in LM Studio to see it listed here."}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
