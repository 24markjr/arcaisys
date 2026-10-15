import type { Metadata } from "next";
import { products } from "@/content/products";
import { siteConfig } from "@/lib/site";
import { Grid } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Pending } from "@/components/ui/pending";
import { Section } from "@/components/ui/section";
import { PageHeader } from "@/components/sections/page-header";
import { Approach } from "@/components/sections/home/approach";
import { ClosingCta } from "@/components/sections/closing-cta";

export const metadata: Metadata = {
  title: "About",
  description: "Who Arcaisys is, why the company exists and how it builds software.",
};

export default function AboutPage() {
  // Facts table: each value is either confirmed or explicitly pending.
  const facts: { label: string; value: React.ReactNode }[] = [
    { label: "Company", value: siteConfig.legalName ?? <Pending need="Registered legal name" /> },
    { label: "Founded", value: <Pending need="Year founded" /> },
    { label: "Headquarters", value: siteConfig.location ?? <Pending need="City, country" /> },
    { label: "Products", value: products.map((p) => p.name).join(", ") },
    { label: "Sectors", value: <Pending need="Confirmed sectors" /> },
  ];

  return (
    <>
      <PageHeader
        eyebrow="About"
        title={
          <Pending need="About page headline (draft shown)">
            A software company built around its products.
          </Pending>
        }
        lead={<Pending need="One-sentence company summary" />}
      />

      <Section>
        <Grid className="gap-y-10">
          <div className="col-span-4 md:col-span-3">
            <Eyebrow index="01">Origin</Eyebrow>
          </div>
          <div className="col-span-4 space-y-6 text-lead text-ink-soft md:col-span-7">
            <p className="text-h3 font-medium text-ink">
              <Pending need="Why Arcaisys exists — the problem the founders set out to solve (questionnaire B5)" />
            </p>
            <p>
              <Pending need="Two short paragraphs of company story" />
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
              <Pending need="Next 2–3 years, only what you are comfortable publishing (questionnaire B7)" />
            </p>
          </div>
        </Grid>
      </Section>

      <ClosingCta />
    </>
  );
}
