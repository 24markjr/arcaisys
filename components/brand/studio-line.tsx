"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";

/** A minute-resolution clock store, so React only re-renders when the minute changes. */
function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(id);
}
const TIME_ZONE = "Asia/Kolkata";
let cached: Intl.DateTimeFormat | null = null;
const getTime = () =>
  (cached ??= new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: TIME_ZONE,
  })).format(new Date());
const getServerTime = () => null;

/**
 * "Mumbai · 19.14° N, 72.94° E · 14:32 IST" — the studio's place and local time.
 * The time renders only in the browser (it would be stale in static HTML).
 */
export function StudioLine({ coordinates, className }: { coordinates: string; className?: string }) {
  const time = useSyncExternalStore(subscribe, getTime, getServerTime);
  return (
    <p
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.75rem] tracking-[0.06em]",
        className,
      )}
    >
      <span>Mumbai</span>
      <span aria-hidden className="opacity-40">
        ·
      </span>
      <span>{coordinates}</span>
      <span aria-hidden className="opacity-40">
        ·
      </span>
      <span className="inline-flex items-center gap-2">
        <span aria-hidden className="size-1.5 rounded-full bg-brand-orange" />
        <time className="tabular-nums" suppressHydrationWarning>
          {time ?? "--:--"}
        </time>{" "}
        IST
      </span>
    </p>
  );
}
