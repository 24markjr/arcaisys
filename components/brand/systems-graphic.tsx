import { useId } from "react";
import { cn } from "@/lib/cn";

/** The everyday tools a business juggles — across all three sectors. */
const TOOLS = ["Orders", "Kitchen", "Billing", "Records", "Imaging", "Code"];
const NODE_W = 92;
const NODE_H = 28;
const TOP = 22;
const GAP = 44;
const HUB = { x: 318, y: 141, r: 40 };

const linkPath = (i: number) => {
  const y = TOP + i * GAP + NODE_H / 2;
  const x1 = 16 + NODE_W;
  const x2 = HUB.x - HUB.r;
  return `M${x1} ${y} C ${x1 + 80} ${y}, ${x2 - 70} ${HUB.y}, ${x2} ${HUB.y}`;
};

/**
 * "Disconnected tools → one system": the company statement as a diagram.
 * Static markup shows the connected end state (no JavaScript, reduced motion);
 * components/motion/motion-root.tsx animates it in from scattered (data-converge).
 */
export function SystemsGraphic({ className }: { className?: string }) {
  const id = useId();
  const grad = `${id}-pulse`;
  return (
    <svg
      data-converge
      viewBox="0 0 400 290"
      fill="none"
      role="img"
      aria-label="Separate tools — orders, kitchen, billing, records, imaging, code — connected into one Arcaisys system"
      className={cn("h-auto w-full overflow-visible", className)}
    >
      <defs>
        <linearGradient id={grad} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--brand-amber)" />
          <stop offset="1" stopColor="var(--brand-red)" />
        </linearGradient>
      </defs>

      {/* Links (drawn in) and the signal that runs along them */}
      {TOOLS.map((tool, i) => (
        <g key={tool}>
          <path data-link d={linkPath(i)} stroke="var(--line-strong)" strokeWidth="1" />
          <path
            data-pulse
            d={linkPath(i)}
            stroke={`url(#${grad})`}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="20 220"
            opacity="0"
          />
        </g>
      ))}

      {/* Tool nodes */}
      {TOOLS.map((tool, i) => (
        <g key={tool} transform={`translate(16 ${TOP + i * GAP})`}>
          <g data-node>
            <rect width={NODE_W} height={NODE_H} rx="4" fill="var(--surface)" stroke="var(--line-strong)" />
            <circle cx="12" cy={NODE_H / 2} r="2.5" fill="var(--ink-muted)" />
            <text
              x="22"
              y={NODE_H / 2 + 3.5}
              fill="var(--ink-soft)"
              fontFamily="var(--font-geist-mono), monospace"
              fontSize="10"
              letterSpacing="1.2"
            >
              {tool.toUpperCase()}
            </text>
          </g>
        </g>
      ))}

      {/* The hub: one system */}
      <g data-hub>
        <circle cx={HUB.x} cy={HUB.y} r={HUB.r + 8} stroke={`url(#${grad})`} strokeWidth="1" opacity="0.6" />
        <circle cx={HUB.x} cy={HUB.y} r={HUB.r} fill="var(--surface)" stroke="var(--line-strong)" />
        <image
          href="/brand/arcaisys-mark.png"
          x={HUB.x - 22}
          y={HUB.y - 20}
          width="44"
          height="38"
          preserveAspectRatio="xMidYMid meet"
        />
        <text
          x={HUB.x}
          y={HUB.y + HUB.r + 30}
          textAnchor="middle"
          fill="var(--ink-muted)"
          fontFamily="var(--font-geist-mono), monospace"
          fontSize="10"
          letterSpacing="1.6"
        >
          ONE SYSTEM
        </text>
      </g>
    </svg>
  );
}
