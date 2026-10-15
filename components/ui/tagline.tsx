import { cn } from "@/lib/cn";

type TaglineProps = {
  /** e.g. "Admit. Care. Heal." */
  text: string;
  /** Colour of the full stops — the product's accent. */
  accent?: string;
  className?: string;
};

/**
 * Renders a product tagline the way the product logos set it:
 * tracked uppercase words, each followed by a full stop in the accent colour.
 */
export function Tagline({ text, accent = "var(--brand-red)", className }: TaglineProps) {
  const words = text
    .split(".")
    .map((word) => word.trim())
    .filter(Boolean);

  return (
    <p className={cn("text-label font-semibold tracking-[0.22em] uppercase", className)} aria-label={text}>
      {words.map((word, i) => (
        <span key={word} aria-hidden>
          {word}
          <span style={{ color: accent }}>.</span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </p>
  );
}
