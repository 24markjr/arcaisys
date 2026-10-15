import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/** Horizontal page frame: max content width plus fluid side gutters. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-(--content-max) px-(--gutter)", className)} {...props} />;
}

/** The 12-column editorial grid used by every section. Collapses to one column on small screens. */
export function Grid({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("grid grid-cols-4 gap-x-5 md:grid-cols-12 md:gap-x-6 lg:gap-x-8", className)}
      {...props}
    />
  );
}
