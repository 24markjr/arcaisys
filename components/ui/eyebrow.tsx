import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: ReactNode;
  /** Section index, e.g. "01". Rendered in the brand red. */
  index?: string;
  tone?: "default" | "inverse";
  className?: string;
};

/**
 * Section label: index, hairline rule, uppercase label.
 * Echoes the rule-flanked taglines of the product logos.
 */
export function Eyebrow({ children, index, tone = "default", className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-label uppercase",
        tone === "inverse" ? "text-ink-inverse-soft" : "text-ink-muted",
        className,
      )}
    >
      {index ? <span className="text-brand-red tabular-nums">{index}</span> : null}
      <span aria-hidden className="h-px w-8 bg-current opacity-50" />
      <span>{children}</span>
    </p>
  );
}
