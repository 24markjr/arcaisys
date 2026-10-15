"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";
import { cn } from "@/lib/cn";

/** The theme lives on <html data-theme>; this store reads it and follows changes. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}
const getTheme = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");
const getServerTheme = (): Theme | null => null;

function applyTheme(next: Theme) {
  const set = () => {
    document.documentElement.dataset.theme = next;
  };
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Crossfade the switch where supported; instant otherwise.
  if (!reduce && "startViewTransition" in document) document.startViewTransition(set);
  else set();
}

/**
 * Light/dark switch. Both icons are rendered and CSS shows the right one, so the
 * server HTML always matches the client. Light is the default; the device's
 * dark-mode setting is not followed.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  function toggle() {
    const next: Theme = getTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      sessionStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage blocked (private mode): the switch still works for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={theme === null ? undefined : theme === "dark"}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-[3px] text-ink-soft transition-colors duration-(--dur-fast) hover:bg-surface-sunken hover:text-ink",
        className,
      )}
    >
      <Moon aria-hidden className="size-[18px] dark:hidden" strokeWidth={1.75} />
      <Sun aria-hidden className="hidden size-[18px] dark:block" strokeWidth={1.75} />
      <span className="sr-only">Dark theme</span>
    </button>
  );
}
