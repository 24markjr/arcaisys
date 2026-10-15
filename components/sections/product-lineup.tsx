import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/content/products";
import { ProductTile } from "@/components/brand/product-tile";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/cn";

/** The whole portfolio, side by side, with the current product marked. */
export function ProductLineup({ current }: { current?: string }) {
  return (
    <Section tone="alt" spacing="compact">
      <Eyebrow>The portfolio</Eyebrow>
      <ul
        data-reveal="stagger"
        className="mt-10 grid gap-px overflow-hidden rounded-[3px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
      >
        {products.map((product) => {
          const isCurrent = product.slug === current;
          return (
            <li key={product.slug} className="flex">
              <Link
                href={`/products/${product.slug}`}
                aria-current={isCurrent ? "page" : undefined}
                className={cn(
                  "group relative flex w-full flex-col gap-5 p-6 transition-colors duration-(--dur-base) md:p-8",
                  isCurrent ? "bg-surface" : "bg-surface-alt hover:bg-surface",
                )}
              >
                {isCurrent ? (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-0.5 bg-[image:var(--brand-gradient)]"
                  />
                ) : null}
                <span className="flex items-center justify-between gap-4">
                  <ProductTile
                    product={product}
                    className="size-12 transition-transform duration-(--dur-base) ease-out-expo group-hover:-rotate-3"
                  />
                  {isCurrent ? (
                    <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-accent uppercase">
                      Viewing
                    </span>
                  ) : (
                    <ArrowRight
                      aria-hidden
                      strokeWidth={1.5}
                      className="size-5 text-ink-muted transition-[transform,color] duration-(--dur-base) ease-out-expo group-hover:translate-x-1 group-hover:text-accent"
                    />
                  )}
                </span>
                <span>
                  <span className="block text-h3 font-semibold">{product.name}</span>
                  <span className="mt-2 block text-small text-ink-soft">{product.headline}</span>
                </span>
                <span className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2">
                  <StatusBadge status={product.status} />
                  <span className="font-mono text-label text-ink-muted uppercase">{product.sector}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
