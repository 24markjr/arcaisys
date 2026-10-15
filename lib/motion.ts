import type { CSSProperties } from "react";

/**
 * Motion tokens — mirror the CSS custom properties in app/globals.css.
 * GSAP uses these so script-driven and CSS-driven motion share one rhythm.
 */
export const ease = {
  /** cubic-bezier(0.22, 1, 0.36, 1) — entrances: fast start, long settle. */
  out: "expo.out",
  /** cubic-bezier(0.65, 0, 0.35, 1) — sweeps and transitions. */
  inOut: "power3.inOut",
} as const;

export const duration = {
  fast: 0.18,
  base: 0.42,
  slow: 0.9,
} as const;

/** Attribute vocabulary read by <MotionRoot>. Components opt in by setting these. */
export const motionAttr = {
  /** Fade + rise when scrolled into view. Value "stagger" animates the element's children instead. */
  reveal: "data-reveal",
  /** Headline revealed line by line through masks. */
  lines: "data-reveal-lines",
  /** Vertical parallax on wide screens; value is the speed, e.g. "0.12". */
  parallax: "data-parallax",
  /** The hero signature graphic: lines draw, ribbon sweeps, chevron settles. */
  ascent: "data-ascent",
  /** A ribbon that sweeps in when scrolled into view (closing CTA). */
  sweep: "data-sweep",
} as const;

/**
 * Opening content (hero and page headers) animates with pure CSS so it starts on the
 * first frame — it never waits for JavaScript, which keeps Largest Contentful Paint
 * fast. `step` orders the sequence (90ms apart). Headlines use the "headline" variant:
 * they rise through a mask. See `[data-intro]` in app/globals.css.
 */
export function intro(step: number, variant: "block" | "headline" = "block") {
  return {
    "data-intro": variant,
    style: { "--intro-i": step } as CSSProperties,
  };
}
