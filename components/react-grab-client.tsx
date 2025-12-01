"use client";

import { useEffect } from "react";

export function ReactGrabClient() {
  useEffect(() => {
    // Safety: only run in browser + development
    if (typeof window === "undefined") return;
    if (process.env.NODE_ENV !== "development") return;

    let api: {
      activate: () => void;
      deactivate: () => void;
      dispose: () => void;
    } | null = null;

    (async () => {
      try {
        const { init } = await import("react-grab/core");

        api = init({
          theme: {
            enabled: true,
            hue: 180,
            crosshair: {
              enabled: false,
            },
            elementLabel: {
              backgroundColor: "#000000",
              textColor: "#ffffff",
            },
          },
          onElementSelect: (element) => {
            console.log("[react-grab] Selected element:", element);
          },
          onCopySuccess: (elements, content) => {
            console.log("[react-grab] Copied to clipboard:", content);
          },
          onStateChange: (state) => {
            console.log("[react-grab] State:", state);
          },
        });

        api.activate();
      } catch (error) {
        console.error("[react-grab] Failed to initialize", error);
      }
    })();

    return () => {
      if (!api) return;
      try {
        api.deactivate();
        api.dispose();
      } catch (error) {
        console.error("[react-grab] Cleanup error", error);
      }
    };
  }, []);

  return null;
}
