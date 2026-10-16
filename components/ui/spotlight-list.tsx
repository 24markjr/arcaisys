"use client";

import type { ComponentProps, PointerEvent } from "react";
import { cn } from "@/lib/cn";

/**
 * A list whose items glow softly under the pointer (see `.spotlight` in globals.css).
 * Purely decorative: it only sets two CSS variables per item, and does nothing on touch.
 */
export function SpotlightList({ className, ...props }: ComponentProps<"ul">) {
  const onPointerMove = (event: PointerEvent<HTMLUListElement>) => {
    if (event.pointerType !== "mouse") return;
    for (const item of Array.from(event.currentTarget.children) as HTMLElement[]) {
      const rect = item.getBoundingClientRect();
      item.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      item.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    }
  };
  return <ul onPointerMove={onPointerMove} className={cn("spotlight", className)} {...props} />;
}
