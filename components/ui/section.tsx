import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./container";

const tones = {
  default: "bg-surface text-ink",
  alt: "bg-surface-alt text-ink",
  ink: "bg-surface-ink text-ink-inverse",
} as const;

const spacings = {
  default: "py-24 md:py-32 lg:py-40",
  compact: "py-16 md:py-24",
  none: "",
} as const;

type SectionProps = ComponentProps<"section"> & {
  tone?: keyof typeof tones;
  spacing?: keyof typeof spacings;
  /** Draw a hairline at the top edge, for consecutive sections of the same tone. */
  divided?: boolean;
  /** Skip the inner Container (for full-bleed layouts). */
  bleed?: boolean;
};

export function Section({
  tone = "default",
  spacing = "default",
  divided = false,
  bleed = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative",
        tones[tone],
        spacings[spacing],
        divided && (tone === "ink" ? "border-t border-line-ink" : "border-t border-line"),
        className,
      )}
      {...props}
    >
      <span aria-hidden className="section-ticks" />
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}
