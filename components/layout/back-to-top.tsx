"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Appears after roughly two screens of scrolling. Returns to the top and moves
 * keyboard focus to the main content, so the next Tab continues from the top.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toTop() {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.getElementById("main")?.focus({ preventScroll: true });
  }

  return (
    <button
      type="button"
      onClick={toTop}
      data-print-hide
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={cn(
        "fixed right-5 bottom-5 z-30 inline-flex size-11 items-center justify-center rounded-full border border-line bg-surface/90 text-ink shadow-[0_2px_12px_rgb(0_0_0/0.06)] backdrop-blur-md transition-[opacity,translate] duration-(--dur-base) ease-out-expo hover:border-ink-muted md:right-8 md:bottom-8",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUp aria-hidden className="size-4" strokeWidth={1.75} />
      <span className="sr-only">Back to top</span>
    </button>
  );
}
