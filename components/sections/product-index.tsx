import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/content/types";
import { ProductTile } from "@/components/brand/product-tile";
import { StatusBadge } from "@/components/ui/status-badge";
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
            className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-3 py-8 md:py-10 lg:grid-cols-12 lg:gap-x-8"
          >
            {/* Hover: a ribbon-coloured hairline sweeps along the row. */}
            <span
              aria-hidden
              className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-[image:var(--brand-gradient)] transition-transform duration-700 ease-out-expo group-hover:scale-x-100 group-focus-visible:scale-x-100"
            />
            <span
              aria-hidden
              className="hidden font-mono text-label text-ink-muted tabular-nums lg:col-span-1 lg:block"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <ProductTile
              product={product}
              className="size-14 transition-transform duration-(--dur-base) ease-out-expo group-hover:-rotate-3 md:size-16 lg:col-span-1"
            />
            <span className="flex flex-col gap-2 lg:col-span-4">
              <span className="text-h2 font-semibold">{product.name}</span>
              <span className="font-mono text-label text-ink-muted uppercase">
                {product.sector} · {product.category}
              </span>
            </span>
            <ArrowRight
              aria-hidden
              strokeWidth={1.5}
              className="size-6 text-ink-muted transition-[transform,color] duration-(--dur-base) ease-out-expo group-hover:translate-x-1.5 group-hover:text-accent lg:order-last lg:col-span-1 lg:justify-self-end"
            />
            <span className="col-span-3 flex flex-col gap-3 lg:col-span-5">
              <span className="text-lead text-ink">{product.headline}</span>
              <span className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <StatusBadge status={product.status} />
                <Tagline text={product.tagline} accent={product.accent} className="text-ink-muted" />
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
