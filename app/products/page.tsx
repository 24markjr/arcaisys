import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import { productsCopy } from "@/content/company";
import { products } from "@/content/products";
import { ArrowLink } from "@/components/ui/button";
import { Container, Grid } from "@/components/ui/container";
import { Copy } from "@/components/ui/copy";
import { Pending } from "@/components/ui/pending";
import { Tagline } from "@/components/ui/tagline";
import { PageHeader } from "@/components/sections/page-header";
import { ClosingCta } from "@/components/sections/closing-cta";
import { cn } from "@/lib/cn";
import { ArrowUpRight } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { ProductFrame, FrameSkeleton } from "@/components/brand/product-frame";
import { ProductLogo, productPlate } from "@/components/brand/product-logo";
import { PageTransition } from "@/components/motion/page-transition";

export const metadata: Metadata = pageMetadata({
  title: "Products",
  description: "Hospio, Meridian, PACS and RestoQR — the Arcaisys product portfolio.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <PageTransition>
      <PageHeader
        eyebrow="Products"
        title="Four products, one company."
        lead={<Copy field={productsCopy.lead} />}
      />

      {products.map((product, i) => {
        const reversed = i % 2 === 1;
        return (
          <section
            key={product.slug}
            className={cn("border-b border-line", reversed ? "bg-surface" : "bg-surface-alt")}
          >
            <Container className="py-20 md:py-28">
              <Grid className="items-center gap-y-12">
                <ProductFrame
                  label={product.name}
                  data-reveal=""
                  className={cn("col-span-4 md:col-span-6", reversed && "md:order-last md:col-start-7")}
                  bodyClassName="aspect-[16/10]"
                >
                  {product.screenshots[0] ? (
                    <Image
                      src={product.screenshots[0].src}
                      width={product.screenshots[0].width}
                      height={product.screenshots[0].height}
                      alt={product.screenshots[0].alt}
                      sizes="(min-width: 768px) 45vw, 90vw"
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <>
                      <FrameSkeleton />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          data-parallax="0.12"
                          className={cn(
                            "flex w-[46%] items-center justify-center rounded-[3px] border border-line p-[5%] shadow-[0_1px_0_var(--line)]",
                            productPlate(product),
                          )}
                        >
                          <ProductLogo
                            product={product}
                            sizes="(min-width: 768px) 20vw, 40vw"
                            className="h-auto w-full"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </ProductFrame>
                <div
                  data-reveal
                  className={cn("col-span-4 md:col-span-5", reversed ? "md:col-start-1" : "md:col-start-8")}
                >
                  <p className="font-mono text-label text-ink-muted tabular-nums">
                    {String(i + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
                  </p>
                  <h2 className="mt-6 text-h1 font-semibold">{product.name}</h2>
                  <p className="mt-4 text-h3 font-medium text-ink">{product.headline}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                    <StatusBadge status={product.status} />
                    <span className="font-mono text-label text-ink-muted uppercase">
                      {product.sector} · {product.category}
                    </span>
                  </div>
                  <p className="mt-8 text-ink-soft">
                    {product.summary ?? <Pending need={`${product.name} one-paragraph description`} />}
                  </p>
                  <Tagline text={product.tagline} accent={product.accent} className="mt-6 text-ink-muted" />
                  <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                    <ArrowLink href={`/products/${product.slug}`}>{`Explore ${product.name}`}</ArrowLink>
                    {product.externalUrl ? (
                      <a
                        href={product.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 text-small font-semibold text-ink"
                      >
                        <span className="link-underline pb-0.5">{`Open ${product.name}`}</span>
                        <ArrowUpRight
                          aria-hidden
                          strokeWidth={1.75}
                          className="size-4 transition-transform duration-(--dur-base) ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    ) : null}
                  </div>
                </div>
              </Grid>
            </Container>
          </section>
        );
      })}

      <ClosingCta />
    </PageTransition>
  );
}
