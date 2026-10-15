import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { intro } from "@/lib/motion";
import { getProduct, products } from "@/content/products";
import type { ProductStatus } from "@/content/types";
import { ProductTile } from "@/components/brand/product-tile";
import { ProductLogo, productPlate } from "@/components/brand/product-logo";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/button";
import { Container, Grid } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Pending } from "@/components/ui/pending";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";
import { ClosingCta } from "@/components/sections/closing-cta";
import { ProductGallery } from "@/components/sections/product-gallery";
import { PageTransition } from "@/components/motion/page-transition";

/**
 * Every product page is prerendered (generateStaticParams), so a navigation fetches a
 * static payload. The page reads `params` outside <Suspense>, which the instant-navigation
 * check flags; blocking briefly on that static payload is the intended behaviour here.
 */
export const instant = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return pageMetadata({
    title: product.name,
    description: `${product.headline} ${product.summary?.split(". ")[0] ?? ""}.`.replace(/\.\.$/, "."),
    path: `/products/${product.slug}`,
  });
}

const statusLabel: Record<ProductStatus, string | null> = {
  live: "Live",
  pilot: "In pilot",
  "in-development": "In development",
  unknown: null,
};

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const index = products.indexOf(product);
  const next = products[(index + 1) % products.length]!;
  const status = statusLabel[product.status];

  return (
    <PageTransition>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: product.name, path: `/products/${product.slug}` },
        ])}
      />
      <header className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="blueprint pointer-events-none absolute inset-0" />
        <Container className="relative pt-10 pb-20 md:pt-14 md:pb-28">
          <nav aria-label="Breadcrumb" className="font-mono text-label text-ink-muted uppercase">
            <ol className="flex gap-3">
              <li>
                <Link href="/products" className="link-underline">
                  Products
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-ink">
                {product.name}
              </li>
            </ol>
          </nav>

          <Grid className="mt-14 items-center gap-y-12 md:mt-20">
            <div className="col-span-4 md:col-span-6">
              <h1 {...intro(0, "headline")} className="text-display font-semibold">
                {product.name}
              </h1>
              <p {...intro(1)} className="mt-6 text-h3 font-medium text-ink">
                {product.headline}
              </p>
              <Tagline text={product.tagline} accent={product.accent} className="mt-5 text-ink-muted" />
              <p {...intro(2)} className="mt-10 max-w-[40ch] text-lead text-ink-soft">
                {product.summary ?? <Pending need={`${product.name} one-sentence description`} />}
              </p>
              <dl {...intro(3)} className="mt-10 flex flex-wrap gap-x-10 gap-y-4 text-small">
                <div>
                  <dt className="font-mono text-label text-ink-muted uppercase">Sector</dt>
                  <dd className="mt-2 font-semibold">{product.sector}</dd>
                </div>
                <div>
                  <dt className="font-mono text-label text-ink-muted uppercase">Category</dt>
                  <dd className="mt-2 font-semibold">{product.category ?? <Pending need="Category" />}</dd>
                </div>
                <div>
                  <dt className="font-mono text-label text-ink-muted uppercase">Status</dt>
                  <dd className="mt-2 font-semibold">
                    {status ?? <Pending need="Live / pilot / in development" />}
                  </dd>
                </div>
              </dl>
              <div {...intro(4)} className="mt-12 flex flex-wrap gap-4">
                <ButtonLink
                  href={`/contact?interest=${product.slug}`}
                >{`Enquire about ${product.name}`}</ButtonLink>
                {product.externalUrl ? (
                  <ButtonLink href={product.externalUrl} variant="secondary" external>
                    {`Open ${product.name}`}
                  </ButtonLink>
                ) : null}
              </div>
            </div>
            <div
              {...intro(2)}
              className={cn(
                "col-span-4 flex aspect-square items-center justify-center rounded-[3px] border border-line p-12 md:col-span-5 md:col-start-8",
                productPlate(product),
              )}
            >
              <ProductLogo
                product={product}
                preload
                sizes="(min-width: 768px) 35vw, 80vw"
                className="h-auto w-auto max-w-[78%] object-contain"
              />
            </div>
          </Grid>
        </Container>
      </header>

      <Section>
        <Grid className="gap-y-14">
          <div className="col-span-4 md:col-span-5">
            <Eyebrow index="01">The problem</Eyebrow>
            <p className="mt-8 text-h3 font-medium">
              {product.problem ?? <Pending need={`The problem ${product.name} solves, and for whom`} />}
            </p>
          </div>
          <div className="col-span-4 md:col-span-6 md:col-start-7">
            <Eyebrow index="02">Who it is for</Eyebrow>
            <p className="mt-8 text-lead text-ink-soft">
              {product.audience ?? <Pending need="Users: role and type of organisation" />}
            </p>
          </div>
        </Grid>
      </Section>

      <Section tone="alt">
        <Grid className="gap-y-12">
          <div className="col-span-4 md:col-span-4">
            <Eyebrow index="03">Capabilities</Eyebrow>
            <Heading className="mt-8">{product.capabilitiesHeading}</Heading>
          </div>
          <ul data-reveal="stagger" className="col-span-4 md:col-span-7 md:col-start-6">
            {product.capabilities.map((capability) => (
              <li key={capability.title} className="border-t border-line-strong py-6">
                <h3 className="text-lead font-semibold text-ink">{capability.title}</h3>
                <p className="mt-2 text-ink-soft">{capability.body}</p>
              </li>
            ))}
          </ul>
        </Grid>
      </Section>

      <Section>
        <Eyebrow index="04">In use</Eyebrow>
        <div data-reveal className="mt-12">
          <ProductGallery product={product} />
        </div>
      </Section>

      <Section tone="alt" spacing="compact">
        <Link href={`/products/${next.slug}`} className="group flex items-center justify-between gap-6">
          <span>
            <span className="font-mono text-label text-ink-muted uppercase">Next product</span>
            <span className="mt-3 block text-h2 font-semibold">
              <span className="link-underline pb-1">{next.name}</span>
            </span>
          </span>
          <ProductTile
            product={next}
            className="size-16 transition-transform duration-(--dur-base) ease-out-expo group-hover:-rotate-3 md:size-20"
          />
        </Link>
      </Section>

      <ClosingCta title={`Talk to us about ${product.name}.`} interest={product.slug} />
    </PageTransition>
  );
}
