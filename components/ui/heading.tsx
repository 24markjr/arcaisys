import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { intro as introProps } from "@/lib/motion";

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
  /** Reveal line by line on scroll (see components/motion/motion-root.tsx). */
  reveal?: boolean;
  /** Part of the opening sequence (CSS mask rise at this step) instead of a scroll reveal. */
  intro?: number;
};

export function Heading({
  as: Tag = "h2",
  size = "h2",
  reveal = true,
  intro,
  className,
  ...props
}: HeadingProps) {
  const motion =
    intro !== undefined ? introProps(intro, "headline") : reveal ? { "data-reveal-lines": "" } : {};
  return <Tag {...motion} className={cn(sizes[size], className)} {...props} />;
}

export function Lead({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("max-w-[38ch] text-lead text-ink-soft", className)} {...props} />;
}
