import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ProductFrameProps = Omit<ComponentProps<"figure">, "children"> & {
  /** Shown in the frame's top bar, e.g. "Hospio". */
  label: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
};

/**
 * A thin, neutral application frame for product imagery: three hollow window marks
 * and the product name. No fake URLs or browser chrome, so it reads as a frame, not a mock-up.
 */
export function ProductFrame({ label, children, className, bodyClassName, ...props }: ProductFrameProps) {
  return (
    <figure
      className={cn("overflow-hidden rounded-[4px] border border-line bg-surface", className)}
      {...props}
    >
      <div className="flex h-9 items-center justify-between border-b border-line px-4">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-[7px] rounded-full border border-line-strong" />
          <span className="size-[7px] rounded-full border border-line-strong" />
          <span className="size-[7px] rounded-full border border-line-strong" />
        </span>
        <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-ink-muted uppercase">{label}</span>
        <span aria-hidden className="w-[33px]" />
      </div>
      <div className={cn("relative", bodyClassName)}>{children}</div>
    </figure>
  );
}

/**
 * Placeholder interface outline shown until real screenshots exist. Labelled so
 * it can't be mistaken for the product itself.
 */
export function FrameSkeleton({ caption = "Screenshots to come" }: { caption?: string }) {
  const block = "rounded-[2px] bg-surface-sunken";
  return (
    <div className="absolute inset-0 grid grid-cols-[22%_1fr] gap-4 p-5 opacity-80">
      <div aria-hidden className="flex flex-col gap-3 border-r border-line pr-4">
        <span className={cn(block, "h-3 w-3/4")} />
        <span className={cn(block, "h-2 w-full")} />
        <span className={cn(block, "h-2 w-5/6")} />
        <span className={cn(block, "h-2 w-2/3")} />
        <span className={cn(block, "h-2 w-4/5")} />
      </div>
      <div aria-hidden className="flex flex-col gap-4">
        <span className={cn(block, "h-4 w-1/3")} />
        <div className="grid grid-cols-3 gap-3">
          <span className={cn(block, "h-14")} />
          <span className={cn(block, "h-14")} />
          <span className={cn(block, "h-14")} />
        </div>
        <span className={cn(block, "flex-1")} />
      </div>
      <figcaption className="absolute right-4 bottom-3 font-mono text-[0.6875rem] tracking-[0.12em] text-ink-muted uppercase">
        {caption}
      </figcaption>
    </div>
  );
}
