import Image from "next/image";
import type { Product } from "@/content/types";
import { Wireframe } from "@/components/ui/wireframe";
import { cn } from "@/lib/cn";

/**
 * Product screenshots: the first image large, up to two more beside it.
 * Shows labelled slots until screenshots are added to content/products.ts.
 */
export function ProductGallery({ product }: { product: Product }) {
  const [primary, ...details] = product.screenshots;

  if (!primary) {
    return (
      <div className="grid gap-6 md:grid-cols-12">
        <Wireframe
          label="Primary screenshot"
          note={`Needs a ${product.name} screenshot (16:10, at least 2400px wide) in public/products/${product.slug}/.`}
          className="aspect-[16/10] md:col-span-8"
        />
        <div className="grid gap-6 md:col-span-4">
          <Wireframe label="Detail screenshot" note="Optional." className="aspect-[4/3]" />
          <Wireframe label="Detail screenshot" note="Optional." className="aspect-[4/3]" />
        </div>
      </div>
    );
  }

  const frame = "overflow-hidden rounded-[3px] border border-line bg-surface-alt";
  return (
    <div className="grid gap-6 md:grid-cols-12">
      <figure className={cn(frame, details.length ? "md:col-span-8" : "md:col-span-12")}>
        <Image
          src={primary.src}
          width={primary.width}
          height={primary.height}
          alt={primary.alt}
          sizes="(min-width: 768px) 66vw, 100vw"
          className="h-auto w-full"
        />
      </figure>
      {details.length ? (
        <div className="grid content-start gap-6 md:col-span-4">
          {details.slice(0, 2).map((shot) => (
            <figure key={shot.src} className={frame}>
              <Image
                src={shot.src}
                width={shot.width}
                height={shot.height}
                alt={shot.alt}
                sizes="(min-width: 768px) 33vw, 100vw"
                className="h-auto w-full"
              />
            </figure>
          ))}
        </div>
      ) : null}
    </div>
  );
}
