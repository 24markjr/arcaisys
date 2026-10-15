import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import type { ReactNode } from "react";
import { aboutCopy, companyFacts } from "@/content/company";
import { products } from "@/content/products";
import { Grid } from "@/components/ui/container";
import { Copy } from "@/components/ui/copy";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Pending } from "@/components/ui/pending";
import { Section } from "@/components/ui/section";
import { PageHeader } from "@/components/sections/page-header";
import { Approach } from "@/components/sections/home/approach";
import { ClosingCta } from "@/components/sections/closing-cta";
import { PageTransition } from "@/components/motion/page-transition";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: "Who Arcaisys is, why the company exists and how it builds software.",
  path: "/about",
});

export default function AboutPage() {
  // Facts table: each value is either supplied or explicitly pending.
  const facts: { label: string; value: ReactNode }[] = [
    { label: "Company", value: companyFacts.legalName ?? <Pending need="Registered legal name (B4)" /> },
    { label: "Founded", value: companyFacts.founded ?? <Pending need="Year founded (B2)" /> },
    { label: "Headquarters", value: companyFacts.location ?? <Pending need="City, country (B3)" /> },
    { label: "Products", value: products.map((p) => p.name).join(", ") },
    { label: "Sectors", value: <Copy field={aboutCopy.sectorsFact} /> },
  ];

  return (
    <PageTransition>
      <PageHeader
        eyebrow="About"
        title={<Copy field={aboutCopy.headline} />}
        lead={<Copy field={aboutCopy.lead} />}
      />

      <Section>
        <Grid className="gap-y-10">
          <div className="col-span-4 md:col-span-3">
            <Eyebrow index="01">Origin</Eyebrow>
          </div>
          <div className="col-span-4 space-y-6 text-lead text-ink-soft md:col-span-7">
            <p className="text-h3 font-medium text-ink">
              <Copy field={aboutCopy.origin} />
            </p>
            <p>
              <Copy field={aboutCopy.story} />
            </p>
          </div>
        </Grid>
      </Section>

      <Section tone="alt">
        <Grid className="gap-y-10">
          <div className="col-span-4 md:col-span-3">
            <Eyebrow index="02">At a glance</Eyebrow>
          </div>
          <dl className="col-span-4 md:col-span-9">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="grid grid-cols-1 gap-2 border-t border-line-strong py-6 sm:grid-cols-3 sm:gap-8"
              >
                <dt className="font-mono text-label text-ink-muted uppercase">{fact.label}</dt>
                <dd className="text-lead font-medium sm:col-span-2">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Grid>
      </Section>

      <Approach />

      <Section tone="alt">
        <Grid className="gap-y-10">
          <div className="col-span-4 md:col-span-3">
            <Eyebrow index="04">Direction</Eyebrow>
          </div>
          <div className="col-span-4 md:col-span-7">
            <Heading>Where we are going.</Heading>
            <p className="mt-8 text-lead text-ink-soft">
              <Copy field={aboutCopy.direction} />
            </p>
          </div>
        </Grid>
      </Section>

      <ClosingCta />
    </PageTransition>
  );
}
