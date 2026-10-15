import Image from "next/image";
import type { Product } from "@/content/types";
import { cn } from "@/lib/cn";

type ProductLogoProps = {
  product: Product;
  sizes: string;
  preload?: boolean;
  className?: string;
};

/**
 * A product's full logo, theme-aware: the supplied artwork in the light theme and
 * the reversed (white wordmark) version in the dark theme. Products without a
 * reversed logo keep the original, so they must sit on a light plate — see
 * `productPlate`.
 */
export function ProductLogo({ product, sizes, preload, className }: ProductLogoProps) {
  const { logo, logoReversed } = product;
  return (
    <>
      <Image
        src={logo.src}
        width={logo.width}
        height={logo.height}
        alt={logo.alt}
        sizes={sizes}
        preload={preload}
        className={cn(className, logoReversed && "dark:hidden")}
      />
      {logoReversed ? (
        <Image
          src={logoReversed.src}
          width={logoReversed.width}
          height={logoReversed.height}
          alt={logoReversed.alt}
          sizes={sizes}
          className={cn(className, "hidden dark:block")}
        />
      ) : null}
    </>
  );
}

/** Background for a panel holding a product logo: theme surface, or white if no reversed logo. */
export function productPlate(product: Product) {
  return product.logoReversed ? "bg-panel-art" : "bg-white";
}
