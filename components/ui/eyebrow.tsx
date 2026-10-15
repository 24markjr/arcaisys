import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { intro as introProps } from "@/lib/motion";

type EyebrowProps = {
  children: ReactNode;
  /** Section index, e.g. "01". Rendered in the brand red. */
  index?: string;
  tone?: "default" | "inverse";
  /** Part of the opening sequence (CSS entrance at this step) instead of a scroll reveal. */
  intro?: number;
  className?: string;
};

/**
 * Section label: index, hairline rule, uppercase label.
 * Echoes the rule-flanked taglines of the product logos.
 */
export function Eyebrow({ children, index, tone = "default", intro, className }: EyebrowProps) {
  return (
    <p
      {...(intro === undefined ? { "data-reveal": "" } : introProps(intro))}
      className={cn(
        "flex items-center gap-3 font-mono text-label uppercase",
        tone === "inverse" ? "text-ink-inverse-soft" : "text-ink-muted",
        className,
      )}
    >
      {index ? <span className="text-accent tabular-nums">{index}</span> : null}
      <span aria-hidden className="h-px w-8 bg-current opacity-50" />
      <span>{children}</span>
    </p>
  );
}
