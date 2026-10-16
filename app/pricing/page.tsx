import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { products } from "@/content/products";
import { pricingCopy, subscriptionModel } from "@/content/saas";
import { ProductTile } from "@/components/brand/product-tile";
import { ButtonLink, ArrowLink } from "@/components/ui/button";
import { Grid } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { StatusBadge } from "@/components/ui/status-badge";
import { PageHeader } from "@/components/sections/page-header";
import { Subscription } from "@/components/sections/home/subscription";
import { Faq } from "@/components/sections/faq";
import { ClosingCta } from "@/components/sections/closing-cta";
import { PageTransition } from "@/components/motion/page-transition";
import { cn } from "@/lib/cn";

export const metadata: Metadata = pageMetadata({
  title: "Pricing",
  description:
    "Arcaisys products are offered by subscription, billed monthly or annually, with hosting, updates and support included. Request a quote or join early access.",
  path: "/pricing",
});

/**
 * Subscription plans, one per product. Prices are quoted per customer, so none are shown —
 * never publish a figure here that Arcaisys has not set.
 */
export default function PricingPage() {
  return (
    <PageTransition>
      <PageHeader eyebrow="Pricing" title={pricingCopy.headline} lead={pricingCopy.lead} />

      <Section tone="alt">
        <Grid className="mb-12 gap-y-8 md:mb-16">
          <div className="col-span-4 md:col-span-12 lg:col-span-3">
            <Eyebrow index="01">Plans</Eyebrow>
          </div>
          <div className="col-span-4 md:col-span-9 lg:col-span-7">
            <Heading>One subscription per product.</Heading>
            <p data-reveal className="mt-6 max-w-[52ch] text-ink-soft">
              {subscriptionModel.pricing}. {subscriptionModel.billing}.
            </p>
          </div>
        </Grid>

        <ul data-reveal="stagger" className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => {
            const live = product.status === "live";
            return (
              <li
                key={product.slug}
                className={cn(
                  "relative flex flex-col rounded-[4px] border bg-surface p-6 md:p-8",
                  live ? "border-ink shadow-[0_24px_60px_-40px_rgb(15_22_34/0.55)]" : "border-line-strong",
                )}
              >
                {live ? (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1 rounded-t-[4px] bg-[image:var(--brand-gradient)]"
                  />
                ) : null}
                <div className="flex items-center justify-between gap-4">
                  <ProductTile product={product} className="size-12" />
                  <StatusBadge status={product.status} />
                </div>
                <h3 className="mt-6 text-h3 font-semibold">
                  <Link href={`/products/${product.slug}`} className="link-underline">
                    {product.name}
                  </Link>
                </h3>
                <p className="mt-2 text-small text-ink-muted">{product.category}</p>

                <p className="mt-8 border-t border-line pt-6">
                  <span className="block text-h3 font-semibold">
                    {live ? "Subscription" : "Early access"}
                  </span>
                  <span className="mt-1 block text-small text-ink-muted">
                    {live ? "Monthly or annual · priced on request" : "Register now · pricing at launch"}
                  </span>
                </p>

                <ul className="mt-6 flex flex-col gap-3 text-small">
                  {product.capabilities.slice(0, 4).map((capability) => (
                    <li key={capability.title} className="flex gap-3">
                      <Check
                        aria-hidden
                        className="mt-0.5 size-4 shrink-0"
                        style={{ color: product.accent }}
                      />
                      <span className="text-ink-soft">{capability.title.split(" — ")[0]}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-col gap-4 pt-10">
                  {live ? (
                    <>
                      <ButtonLink href={`/contact?interest=${product.slug}`} className="justify-center">
                        Request pricing
                      </ButtonLink>
                      {product.externalUrl ? (
                        <ArrowLink href={product.externalUrl} target="_blank" rel="noopener noreferrer">
                          {`Open ${product.name}`}
                        </ArrowLink>
                      ) : null}
                    </>
                  ) : (
                    <ButtonLink
                      href={`/contact?interest=${product.slug}`}
                      variant="secondary"
                      className="justify-center"
                    >
                      Join early access
                    </ButtonLink>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      <Subscription index="02" tone="default" links={false} />
      <Faq index="03" tone="alt" />
      <ClosingCta title="Get a quote." interest="pricing" />
    </PageTransition>
  );
}
