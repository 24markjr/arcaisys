import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { breadcrumbJsonLd, pageMetadata, softwareJsonLd } from "@/lib/seo";
import { subscriptionIncludes, subscriptionModel } from "@/content/saas";
import { JsonLd } from "@/components/seo/json-ld";
import { intro } from "@/lib/motion";
import { getProduct, products } from "@/content/products";
import type { ProductStatus } from "@/content/types";
import { ProductLogo, productPlate } from "@/components/brand/product-logo";
import { cn } from "@/lib/cn";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { Container, Grid } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Pending } from "@/components/ui/pending";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";
import { ClosingCta } from "@/components/sections/closing-cta";
import { ProductLineup } from "@/components/sections/product-lineup";
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

  const status = statusLabel[product.status];

  return (
    <PageTransition>
      <JsonLd data={softwareJsonLd(product)} />
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
                  <dt className="font-mono text-label text-ink-muted uppercase">Model</dt>
                  <dd className="mt-2 font-semibold">SaaS · subscription</dd>
                </div>
                <div>
                  <dt className="font-mono text-label text-ink-muted uppercase">Status</dt>
                  <dd className="mt-2 font-semibold">
                    {status ?? <Pending need="Live / pilot / in development" />}
                  </dd>
                </div>
              </dl>
              <div {...intro(4)} className="mt-12 flex flex-wrap gap-4">
                <ButtonLink href={`/contact?interest=${product.slug}`}>
                  {product.status === "live" ? "Request pricing" : "Join early access"}
                </ButtonLink>
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
        <div className="relative overflow-hidden rounded-[4px] border border-line-strong bg-surface">
          <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-[image:var(--brand-gradient)]" />
          <Grid className="gap-y-10 p-6 sm:p-8 md:p-12">
            <div className="col-span-4 md:col-span-12 lg:col-span-6">
              <Eyebrow index="04">Subscription</Eyebrow>
              <Heading className="mt-8">
                {product.status === "live"
                  ? `${product.name} is available by subscription.`
                  : `${product.name} is coming soon. Get early access.`}
              </Heading>
              <p data-reveal className="mt-6 max-w-[48ch] text-ink-soft">
                {product.status === "live"
                  ? `${subscriptionModel.billing}, ${subscriptionModel.pricing.toLowerCase()}.`
                  : "Register now to be among the first organisations onboarded, with launch pricing for early subscribers."}
              </p>
              <div data-reveal className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <ButtonLink href={`/contact?interest=${product.slug}`}>
                  {product.status === "live" ? "Request pricing" : "Join early access"}
                </ButtonLink>
                <ArrowLink href="/pricing">How pricing works</ArrowLink>
              </div>
            </div>
            <ul
              data-reveal="stagger"
              className="col-span-4 flex flex-col md:col-span-12 lg:col-span-5 lg:col-start-8"
            >
              {subscriptionIncludes.map((item) => (
                <li
                  key={item.title}
                  className="flex gap-4 border-t border-line py-5 first:border-t-0 lg:first:pt-0"
                >
                  <Check aria-hidden className="mt-1 size-4 shrink-0" style={{ color: product.accent }} />
                  <span>
                    <span className="block font-semibold text-ink">{item.title}</span>
                    <span className="mt-1 block text-small text-ink-soft">{item.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Grid>
        </div>
      </Section>

      <ProductLineup current={product.slug} />

      <ClosingCta
        title={product.status === "live" ? `See ${product.name} in action.` : `Be first on ${product.name}.`}
        interest={product.slug}
      />
    </PageTransition>
  );
}
