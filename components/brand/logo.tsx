import Image from "next/image";
import { arcaisysBrand } from "@/content/brand";
import { cn } from "@/lib/cn";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  /** Preload in the header, where it is above the fold on every page. */
  preload?: boolean;
  className?: string;
};

const markHeights = { sm: "h-7", md: "h-9", lg: "h-14" } as const;
const wordHeights = { sm: "h-[11px]", md: "h-[14px]", lg: "h-[22px]" } as const;

/**
 * Horizontal Arcaisys lockup built from the supplied artwork: mark + wordmark.
 * Both images are the original logo, split — never redrawn or recoloured.
 * Works on light and dark surfaces.
 */
export function Logo({ size = "md", preload = false, className }: LogoProps) {
  const { mark, wordmark } = arcaisysBrand;
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Image
        src={mark.src}
        width={mark.width}
        height={mark.height}
        alt=""
        preload={preload}
        className={cn("w-auto", markHeights[size])}
      />
      <Image
        src={wordmark.src}
        width={wordmark.width}
        height={wordmark.height}
        alt={wordmark.alt}
        preload={preload}
        className={cn("w-auto", wordHeights[size])}
      />
    </span>
  );
}
