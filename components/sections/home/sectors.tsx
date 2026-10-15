import Link from "next/link";
import { getProduct } from "@/content/products";
import type { Product } from "@/content/types";
import { ProductTile } from "@/components/brand/product-tile";
import { Grid } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Pending } from "@/components/ui/pending";
import { Section } from "@/components/ui/section";

/*
 * Sector grouping is INFERRED from product names and taglines and is not yet
 * confirmed (docs/content-inventory.md §3). Meridian is not assigned.
 */
const sectors = [
  { name: "Healthcare", products: ["hospio", "pacs"] },
  { name: "Hospitality", products: ["restoqr"] },
];

export function Sectors() {
  return (
    <Section tone="alt">
      <Grid className="mb-16 gap-y-8 md:mb-20">
        <div className="col-span-4 md:col-span-3">
          <Eyebrow index="04">Sectors</Eyebrow>
        </div>
        <div className="col-span-4 md:col-span-7">
          <Heading>Where the products work.</Heading>
        </div>
      </Grid>

      <div className="grid gap-px overflow-hidden rounded-[3px] border border-line bg-line md:grid-cols-2">
        {sectors.map((sector) => {
          const items = sector.products
            .map((slug) => getProduct(slug))
            .filter((p): p is Product => Boolean(p));
          return (
            <article
              key={sector.name}
              className="flex flex-col justify-between gap-12 bg-surface p-8 md:min-h-[22rem] md:p-12"
            >
              <div>
                <h3 className="text-h2 font-semibold">
                  <Pending need={`Confirm sector: ${sector.name}`}>{sector.name}</Pending>
                </h3>
                <p className="mt-6 max-w-[40ch] text-ink-soft">
                  <Pending need={`What Arcaisys offers the ${sector.name.toLowerCase()} sector`} />
                </p>
              </div>
              <ul className="flex flex-wrap gap-x-8 gap-y-4">
                {items.map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={`/products/${product.slug}`}
                      className="group flex items-center gap-3 text-small font-semibold"
                    >
                      <ProductTile product={product} className="size-10" />
                      <span className="link-underline pb-0.5">{product.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
