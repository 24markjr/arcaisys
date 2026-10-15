import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

const sizes = {
  display: "text-display font-semibold",
  h1: "text-h1 font-semibold",
  h2: "text-h2 font-semibold",
  h3: "text-h3 font-semibold",
} as const;

type HeadingProps = ComponentProps<"h2"> & {
  /** Semantic level — chosen for document outline, independent of visual size. */
  as?: "h1" | "h2" | "h3" | "h4";
  size?: keyof typeof sizes;
};

export function Heading({ as: Tag = "h2", size = "h2", className, ...props }: HeadingProps) {
  return <Tag className={cn(sizes[size], className)} {...props} />;
}

export function Lead({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("max-w-[38ch] text-lead text-ink-soft", className)} {...props} />;
}
