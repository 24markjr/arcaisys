import Link from "next/link";
import type { ComponentProps } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-action text-on-action hover:bg-action-hover",
  secondary: "border border-line-strong text-ink hover:border-ink",
  inverse: "bg-ink-inverse text-on-inverse hover:bg-white",
  "inverse-outline": "border border-line-ink text-ink-inverse hover:border-ink-inverse",
} as const;

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: keyof typeof variants;
  /** Use the diagonal arrow for links that leave the site. */
  external?: boolean;
};

/**
 * Link styled as a button. Every call-to-action on the site navigates somewhere,
 * so there is deliberately no generic <button> variant here — form submit
 * buttons are styled locally.
 */
export function ButtonLink({
  variant = "primary",
  external = false,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  return (
    <Link
      className={cn(
        "group inline-flex h-12 items-center gap-3 rounded-[3px] px-6 text-small font-semibold tracking-[-0.005em]",
        "transition-[background-color,border-color,color] duration-(--dur-fast) ease-out-expo",
        variants[variant],
        className,
      )}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      <span>{children}</span>
      <Icon
        aria-hidden
        className="size-4 transition-transform duration-(--dur-base) ease-out-expo group-hover:translate-x-1"
        strokeWidth={1.75}
      />
    </Link>
  );
}

type ArrowLinkProps = ComponentProps<typeof Link> & { tone?: "default" | "inverse" };

/** Inline text link with an arrow — for secondary actions and "read more" links. */
export function ArrowLink({ tone = "default", className, children, ...props }: ArrowLinkProps) {
  return (
    <Link
      className={cn(
        "group inline-flex items-center gap-2 text-small font-semibold",
        tone === "inverse" ? "text-ink-inverse" : "text-ink",
        className,
      )}
      {...props}
    >
      <span className="link-underline pb-0.5">{children}</span>
      <ArrowRight
        aria-hidden
        className="size-4 transition-transform duration-(--dur-base) ease-out-expo group-hover:translate-x-1"
        strokeWidth={1.75}
      />
    </Link>
  );
}
