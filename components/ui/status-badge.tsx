import type { ProductStatus } from "@/content/types";
import { cn } from "@/lib/cn";

const labels: Record<ProductStatus, string | null> = {
  live: "Live",
  pilot: "In pilot",
  "in-development": "In development",
  unknown: null,
};

/** Product availability, as a small mono label with a status dot. */
export function StatusBadge({ status, className }: { status: ProductStatus; className?: string }) {
  const label = labels[status];
  if (!label) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.14em] text-ink-soft uppercase",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          status === "live"
            ? "bg-[#16a34a] shadow-[0_0_0_3px_rgb(22_163_74/0.15)]"
            : "border border-ink-muted",
        )}
      />
      {label}
    </span>
  );
}
