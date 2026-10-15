import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/content/types";
import { ProductTile } from "@/components/brand/product-tile";
import { Pending } from "@/components/ui/pending";
import { Tagline } from "@/components/ui/tagline";

/**
 * Editorial index of products: one full-width row per product.
 * Chosen over a card grid so the list scales and each name reads at headline size.
 */
export function ProductIndex({ products }: { products: Product[] }) {
  return (
    <ol data-reveal="stagger" className="border-t border-line-strong">
      {products.map((product, i) => (
        <li key={product.slug} className="border-b border-line-strong">
          <Link
            href={`/products/${product.slug}`}
            className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-3 py-8 md:grid-cols-12 md:gap-x-8 md:py-10"
          >
            <span
              aria-hidden
              className="hidden font-mono text-label text-ink-muted tabular-nums md:col-span-1 md:block"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <ProductTile
              product={product}
              className="size-14 transition-transform duration-(--dur-base) ease-out-expo group-hover:-rotate-3 md:col-span-1 md:size-16"
            />
            <span className="md:col-span-4">
              <span className="block text-h2 font-semibold">{product.name}</span>
            </span>
            <ArrowRight
              aria-hidden
              strokeWidth={1.5}
              className="size-6 text-ink-muted transition-[transform,color] duration-(--dur-base) ease-out-expo group-hover:translate-x-1.5 group-hover:text-accent md:order-last md:col-span-1 md:justify-self-end"
            />
            <span className="col-span-3 flex flex-col gap-2 md:col-span-5">
              <Tagline text={product.tagline} accent={product.accent} className="text-ink-soft" />
              <span className="text-small text-ink-muted">
                {product.category ?? <Pending need={`${product.name} category`} />}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
