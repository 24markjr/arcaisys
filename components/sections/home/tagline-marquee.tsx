import { products } from "@/content/products";
import { ProductTile } from "@/components/brand/product-tile";
import { Tagline } from "@/components/ui/tagline";

/**
 * The four product taglines on a slow, endless loop. The list is rendered twice so the
 * loop is seamless; the copy is hidden from assistive tech. Static under reduced motion.
 */
export function TaglineMarquee() {
  const row = (copy: boolean) => (
    <ul aria-hidden={copy || undefined} className="flex shrink-0 items-center gap-14 pr-14">
      {products.map((product) => (
        <li key={product.slug} className="flex items-center gap-4">
          <ProductTile product={product} className="size-8" />
          <span className="text-small font-semibold text-ink">{product.name}</span>
          <Tagline text={product.tagline} accent={product.accent} className="text-ink-muted" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee relative overflow-hidden border-b border-line bg-surface-alt py-6">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
