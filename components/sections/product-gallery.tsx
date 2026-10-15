import Image from "next/image";
import type { Product } from "@/content/types";
import { FrameSkeleton, ProductFrame } from "@/components/brand/product-frame";
import { cn } from "@/lib/cn";

/**
 * Product screenshots in application frames: the first large, up to two more beside it.
 * Until screenshots are added to content/products.ts, the frames show a labelled outline.
 */
export function ProductGallery({ product }: { product: Product }) {
  const [primary, ...details] = product.screenshots;

  if (!primary) {
    return (
      <div className="grid gap-6 md:grid-cols-12">
        <ProductFrame label={product.name} className="md:col-span-8" bodyClassName="aspect-[16/10]">
          <FrameSkeleton />
        </ProductFrame>
        <div className="hidden gap-6 md:col-span-4 md:grid">
          <ProductFrame label="Detail" bodyClassName="aspect-[4/3]">
            <FrameSkeleton caption="" />
          </ProductFrame>
          <ProductFrame label="Detail" bodyClassName="aspect-[4/3]">
            <FrameSkeleton caption="" />
          </ProductFrame>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-12">
      <ProductFrame label={product.name} className={details.length ? "md:col-span-8" : "md:col-span-12"}>
        <Image
          src={primary.src}
          width={primary.width}
          height={primary.height}
          alt={primary.alt}
          sizes="(min-width: 768px) 66vw, 100vw"
          className="h-auto w-full"
        />
      </ProductFrame>
      {details.length ? (
        <div className={cn("grid content-start gap-6 md:col-span-4")}>
          {details.slice(0, 2).map((shot) => (
            <ProductFrame key={shot.src} label="Detail">
              <Image
                src={shot.src}
                width={shot.width}
                height={shot.height}
                alt={shot.alt}
                sizes="(min-width: 768px) 33vw, 100vw"
                className="h-auto w-full"
              />
            </ProductFrame>
          ))}
        </div>
      ) : null}
    </div>
  );
}
