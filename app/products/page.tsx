import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Products",
  description: "Hospio, Meridian, PACS and RestoQR — the Arcaisys product portfolio.",
};

export default function ProductsPage() {
  return (
    <>
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
                <div
                  className={cn(
                    "col-span-4 flex aspect-[4/3] items-center justify-center rounded-[3px] border border-line bg-white p-10 md:col-span-6 md:p-16",
                    reversed && "md:order-last md:col-start-7",
                  )}
                >
                  <Image
                    src={product.logo.src}
                    width={product.logo.width}
                    height={product.logo.height}
                    alt={product.logo.alt}
                    sizes="(min-width: 768px) 40vw, 80vw"
                    className="h-auto max-h-full w-auto max-w-[70%] object-contain"
                  />
                </div>
                <div
                  className={cn("col-span-4 md:col-span-5", reversed ? "md:col-start-1" : "md:col-start-8")}
                >
                  <p className="font-mono text-label text-ink-muted tabular-nums">
                    {String(i + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
                  </p>
                  <h2 className="mt-6 text-h1 font-semibold">{product.name}</h2>
                  <Tagline text={product.tagline} accent={product.accent} className="mt-5 text-ink-soft" />
                  <p className="mt-8 text-lead text-ink-soft">
                    {product.summary ?? <Pending need={`${product.name} one-paragraph description`} />}
                  </p>
                  <ArrowLink href={`/products/${product.slug}`} className="mt-10">
                    {`Explore ${product.name}`}
                  </ArrowLink>
                </div>
              </Grid>
            </Container>
          </section>
        );
      })}

      <ClosingCta />
    </>
  );
}
