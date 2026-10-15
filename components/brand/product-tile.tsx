import Image from "next/image";
import type { Product } from "@/content/types";
import { cn } from "@/lib/cn";

type ProductTileProps = {
  product: Product;
  className?: string;
};

/**
 * Square product symbol on a white tile, using the supplied app-icon artwork.
 * RestoQR has no separate icon, so its full logo is fitted instead.
 */
export function ProductTile({ product, className }: ProductTileProps) {
  const art = product.tile ?? product.logo;
  return (
    <span
      className={cn(
        "relative inline-flex aspect-square shrink-0 items-center justify-center overflow-hidden rounded-[22%] border border-line bg-white",
        className,
      )}
    >
      <Image
        src={art.src}
        width={art.width}
        height={art.height}
        alt=""
        sizes="96px"
        className={cn("h-full w-full object-contain", !product.tile && "p-[14%]")}
      />
    </span>
  );
}
