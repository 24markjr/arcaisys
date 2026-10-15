import { ViewTransition, type ReactNode } from "react";
import { MotionRoot } from "./motion-root";

/**
 * Wraps a page's content so route changes crossfade (old page out, new page in).
 * The header has its own view-transition name and stays still. Styles live in
 * app/globals.css; with reduced motion the swap is instant. Browsers without the
 * View Transitions API simply navigate without the effect.
 *
 * Also mounts the page's <MotionRoot>, so every page using this wrapper gets
 * scroll and entrance motion.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      {children}
      <MotionRoot />
    </ViewTransition>
  );
}
