"use client";

import { useCallback, useSyncExternalStore } from "react";

type Theme = "dark" | "light";

// Subscribe to <html data-theme> changes so the hook re-renders on toggle.
function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return (
    (document.documentElement.getAttribute("data-theme") as Theme) || "dark"
  );
}

// Server render assumes the dark default; the pre-paint script in layout.tsx
// sets the real value before hydration, and useSyncExternalStore reconciles it
// without a hydration-mismatch warning.
function getServerSnapshot(): Theme {
  return "dark";
}

/** Reads/writes the `data-theme` attribute set pre-paint in layout.tsx. */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore */
    }
  }, []);

  // `mounted` stays true on the client; consumers use it to guard icon swaps.
  return { theme, toggle, mounted: true as const };
}
