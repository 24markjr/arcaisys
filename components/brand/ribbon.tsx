import { useId } from "react";
import { cn } from "@/lib/cn";

/*
 * Signature graphics derived from the Arcaisys mark.
 *
 * The mark is an ascending "A" with an "S" ribbon sweeping up through it.
 * <AscentGraphic> abstracts that: the A becomes hairline construction lines
 * (an engineering drawing), the S becomes one solid tapered ribbon carrying
 * the logo's amber → red → ember gradient. <RibbonLine> is the ribbon alone,
 * for section transitions and calls to action.
 *
 * Motion hooks (read by components/motion/motion-root.tsx): `data-ascent` on the
 * graphic, `data-draw` lines draw in, `data-fade` marks fade, `data-ribbon` sweeps,
 * `data-chevron` settles; `data-sweep` on the ribbon line.
 */

/** Tapered ribbon: upper edge out, lower edge back, meeting in points at both ends. */
const RIBBON =
  "M40 772 C 250 700, 400 560, 520 440 S 790 175, 985 142 " +
  "C 800 205, 655 345, 560 470 S 330 720, 40 772 Z";

/** A thin companion stroke running alongside the ribbon — the "layered" echo. */
const ECHO = "M110 790 C 320 720, 450 590, 575 470 S 820 220, 990 196";

export function AscentGraphic({ className }: { className?: string }) {
  const id = useId();
  const grad = `${id}-grad`;
  const facet = `${id}-facet`;

  return (
    <svg
      data-ascent
      viewBox="0 0 1000 820"
      fill="none"
      aria-hidden
      focusable="false"
      className={cn("h-auto w-full overflow-visible", className)}
    >
      <defs>
        <linearGradient id={grad} x1="40" y1="772" x2="985" y2="142" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--brand-amber)" />
          <stop offset="0.32" stopColor="var(--brand-orange)" />
          <stop offset="0.7" stopColor="var(--brand-red)" />
          <stop offset="1" stopColor="var(--brand-ember)" />
        </linearGradient>
        <linearGradient id={facet} x1="610" y1="40" x2="300" y2="700" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--brand-amber)" stopOpacity="0.16" />
          <stop offset="1" stopColor="var(--brand-orange)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Faceted plane — the left leg of the A, as a faint warm wash */}
      <path data-fade d="M610 40 L 215 720 L 330 720 Z" fill={`url(#${facet})`} />

      {/* Construction lines: the A */}
      <g stroke="var(--line-strong)" strokeWidth="1" vectorEffect="non-scaling-stroke">
        <path data-draw d="M610 40 L 170 798" />
        <path data-draw d="M610 40 L 990 694" />
        <path data-fade d="M610 230 L 495 428" strokeDasharray="3 5" />
        <path data-draw d="M20 772 Q 500 700 1000 772" />
      </g>

      {/* Drafting marks at the apex */}
      <g data-fade stroke="var(--ink-muted)" strokeWidth="1" vectorEffect="non-scaling-stroke">
        <circle cx="610" cy="40" r="5" fill="var(--surface)" />
        <path d="M580 92 A 60 60 0 0 0 640 92" strokeDasharray="2 4" />
      </g>

      {/* Echo stroke + ribbon */}
      <path
        data-draw
        d={ECHO}
        stroke={`url(#${grad})`}
        strokeWidth="1.25"
        opacity="0.55"
        vectorEffect="non-scaling-stroke"
      />
      <path data-ribbon d={RIBBON} fill={`url(#${grad})`} />

      {/* The floating chevron from the mark */}
      <path data-chevron d="M842 420 L 878 393 L 912 452 Z" fill="var(--brand-deep)" />
    </svg>
  );
}

/** The ribbon on its own, stretched horizontally — for dividers and CTA panels. */
export function RibbonLine({ className }: { className?: string }) {
  const id = useId();
  const grad = `${id}-grad`;
  return (
    <svg
      data-sweep
      viewBox="0 0 1600 240"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
      focusable="false"
      className={cn("block h-auto w-full", className)}
    >
      <defs>
        <linearGradient id={grad} x1="0" y1="220" x2="1600" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--brand-amber)" />
          <stop offset="0.35" stopColor="var(--brand-orange)" />
          <stop offset="0.72" stopColor="var(--brand-red)" />
          <stop offset="1" stopColor="var(--brand-ember)" />
        </linearGradient>
      </defs>
      <path
        data-ribbon
        d="M0 228 C 420 220, 700 150, 900 110 S 1300 30, 1600 18 C 1310 42, 1110 92, 920 136 S 430 232, 0 228 Z"
        fill={`url(#${grad})`}
      />
    </svg>
  );
}
