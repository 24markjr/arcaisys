import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type PendingProps = {
  /** What Arcaisys needs to supply, e.g. "One-paragraph company description". */
  need: string;
  /** Optional draft or placeholder text shown in place of the real content. */
  children?: ReactNode;
  as?: "span" | "div" | "p";
  className?: string;
};

/**
 * Marks content that has not yet been supplied or approved.
 * Visibly striped so it can never be mistaken for verified copy.
 * Every instance must be gone before launch (search the codebase for "<Pending").
 */
export function Pending({ need, children, as: Tag = "span", className }: PendingProps) {
  return (
    <Tag
      className={cn("pending", Tag === "span" && "box-decoration-clone", className)}
      title={`Pending: ${need}`}
    >
      {children ?? (
        <span className="font-mono text-[0.8em] tracking-normal normal-case opacity-80">
          [Pending — {need}]
        </span>
      )}
    </Tag>
  );
}
