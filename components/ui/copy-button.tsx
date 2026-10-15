"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/cn";

type CopyButtonProps = {
  value: string;
  /** What is being copied, for the accessible name, e.g. "email address". */
  label: string;
  className?: string;
};

/** Copies a value to the clipboard and confirms it (visibly and to screen readers). */
export function CopyButton({ value, label, className }: CopyButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<number | undefined>(undefined);

  async function copy() {
    window.clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    timer.current = window.setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <button
        type="button"
        onClick={copy}
        className="inline-flex size-8 items-center justify-center rounded-[3px] text-ink-muted transition-colors duration-(--dur-fast) hover:bg-surface-sunken hover:text-ink"
      >
        {status === "copied" ? (
          <Check aria-hidden className="size-4 text-accent" strokeWidth={2} />
        ) : (
          <Copy aria-hidden className="size-4" strokeWidth={1.75} />
        )}
        <span className="sr-only">Copy {label}</span>
      </button>
      <span role="status" className="font-mono text-[0.6875rem] tracking-[0.1em] text-ink-muted uppercase">
        {status === "copied" ? "Copied" : status === "failed" ? "Copy failed — select the text instead" : ""}
      </span>
    </span>
  );
}
