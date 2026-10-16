import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { brand, homeCopy } from "@/content/company";
import { products } from "@/content/products";
import { AscentGraphic } from "@/components/brand/ribbon";
import { ProductTile } from "@/components/brand/product-tile";
import { ButtonLink, ArrowLink } from "@/components/ui/button";
import { Container, Grid } from "@/components/ui/container";
import { Copy } from "@/components/ui/copy";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";
import { intro } from "@/lib/motion";

export function HomeHero() {
  const live = products.find((product) => product.status === "live" && product.externalUrl);
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div aria-hidden className="blueprint pointer-events-none absolute inset-0" />
      <Container className="relative pt-14 md:pt-24">
        <Grid className="gap-y-14">
          <div className="relative z-10 col-span-4 md:col-span-7 md:pb-24">
            {live ? (
              <a
                {...intro(0)}
                href={live.externalUrl ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full border border-line-strong bg-surface py-1.5 pr-4 pl-1.5 text-small shadow-[0_10px_30px_-24px_rgb(15_22_34/0.6)] transition-colors duration-(--dur-base) hover:border-ink"
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-surface-ink px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.14em] text-ink-inverse uppercase">
                  <span aria-hidden className="live-dot size-1.5 rounded-full bg-[#22c55e]" />
                  Live
                </span>
                <span className="font-semibold">{live.name} is in production</span>
                <ArrowUpRight
                  aria-hidden
                  strokeWidth={1.75}
                  className="size-4 text-ink-muted transition-transform duration-(--dur-base) ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
                <span className="sr-only">(opens {live.name})</span>
              </a>
            ) : null}
            <Eyebrow index="00" intro={1} className="mt-10">
              {`AI-powered SaaS · ${brand.tagline}`}
            </Eyebrow>
            <h1 {...intro(2, "headline")} className="mt-8 text-display font-semibold">
              <Copy field={homeCopy.heroHeadline} />
            </h1>
            <p {...intro(3)} className="mt-8 max-w-[40ch] text-lead text-ink-soft">
              <Copy field={homeCopy.heroLead} />
            </p>
            <div {...intro(4)} className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
              <ButtonLink href="/products">Explore the products</ButtonLink>
              <ArrowLink href="/contact">Book a demo</ArrowLink>
            </div>
          </div>

          <div className="pointer-events-none relative col-span-4 -mx-(--gutter) md:col-span-5 md:mx-0">
            <AscentGraphic className="md:absolute md:top-[-4%] md:right-[-6%] md:w-[118%]" />
          </div>
        </Grid>
      </Container>

      {/* Portfolio strip: the first thing below the fold names every product. */}
      <div className="relative border-t border-line bg-surface">
        <Container>
          {/* Negative margin so the first column's text aligns with the page gutter. */}
          <ul data-reveal="stagger" className="-mx-5 grid grid-cols-2 md:grid-cols-4">
            {products.map((product, i) => (
              <li
                key={product.slug}
                className={cn(
                  "border-line",
                  i % 2 === 1 && "border-l",
                  i === 2 && "md:border-l",
                  i >= 2 && "border-t md:border-t-0",
                )}
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="group flex items-center gap-4 px-5 py-6 md:py-8"
                >
                  <ProductTile product={product} className="size-11" />
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="text-small font-semibold">
                      <span className="link-underline pb-0.5">{product.name}</span>
                    </span>
                    <span className="hidden truncate text-[0.8125rem] text-ink-muted sm:block">
                      {product.category}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
