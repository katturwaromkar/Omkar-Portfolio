"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

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
  if (typeof document === "undefined") return "dark";
  return (
    (document.documentElement.getAttribute("data-theme") as Theme) || "dark"
  );
}

function getServerSnapshot(): Theme {
  return "dark";
}

/** Reads/writes the `data-theme` attribute set pre-paint in layout.tsx. */
export function useTheme() {
  const [mounted, setMounted] = useState(false);
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggle = useCallback(() => {
    const current = getSnapshot();
    const next: Theme = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore */
    }
  }, []);

  return { theme, toggle, mounted };
}

