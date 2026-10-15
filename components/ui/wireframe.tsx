import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type WireframeProps = {
  /** What this block will become, e.g. "Contact form". */
  label: string;
  /** Which phase builds it, or what it depends on. */
  note?: string;
  children?: ReactNode;
  className?: string;
};

/**
 * Phase 3 placeholder for a component that is planned but not yet built.
 * Every instance must be replaced before launch (search for "<Wireframe").
 */
export function Wireframe({ label, note, children, className }: WireframeProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-[3px] border border-dashed border-line-strong p-6 font-mono text-[0.8125rem] text-ink-muted",
        className,
      )}
    >
      <p className="text-label text-ink uppercase">{label}</p>
      {note ? <p>{note}</p> : null}
      {children}
    </div>
  );
}
