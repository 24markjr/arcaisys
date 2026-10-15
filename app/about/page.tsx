import type { Metadata } from "next";
import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";
import { aboutCopy, brand, companyFacts, pillars } from "@/content/company";
import { Grid } from "@/components/ui/container";
import { Copy } from "@/components/ui/copy";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Pending } from "@/components/ui/pending";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";
import { PageHeader } from "@/components/sections/page-header";
import { Sectors } from "@/components/sections/home/sectors";
import { ClosingCta } from "@/components/sections/closing-cta";
import { PageTransition } from "@/components/motion/page-transition";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Arcaisys Private Limited is an AI-powered software company in Mumbai, founded in 2026, building operating systems for hospitality, healthcare and software engineering.",
  path: "/about",
});

export default function AboutPage() {
  const facts: { label: string; value: ReactNode }[] = [
    { label: "Company", value: companyFacts.legalName ?? <Pending need="Registered legal name" /> },
    { label: "Founded", value: companyFacts.founded ?? <Pending need="Founding date" /> },
    { label: "Headquarters", value: companyFacts.location ?? <Pending need="City, country" /> },
    { label: "Markets", value: companyFacts.markets },
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
            <h2 data-reveal-lines className="text-h2 font-medium text-ink">
              <Copy field={aboutCopy.origin} />
            </h2>
            <p data-reveal>
              <Copy field={aboutCopy.story} />
            </p>
            <p data-reveal>
              <Copy field={aboutCopy.story2} />
            </p>
          </div>
        </Grid>
      </Section>

      <Section tone="alt">
        <Grid className="mb-14 gap-y-8">
          <div className="col-span-4 md:col-span-3">
            <Eyebrow index="02">What we stand for</Eyebrow>
          </div>
          <div className="col-span-4 md:col-span-8">
            <Heading>Three commitments behind every product.</Heading>
            <Tagline text={brand.tagline} className="mt-6 text-ink-soft" />
          </div>
        </Grid>
        <ol
          data-reveal="stagger"
          className="grid gap-px overflow-hidden rounded-[3px] border border-line bg-line lg:grid-cols-3"
        >
          {pillars.map((pillar, i) => (
            <li key={pillar.title} className="flex flex-col gap-4 bg-surface-alt p-8 md:p-10">
              <span aria-hidden className="font-mono text-label text-accent tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-h3 font-semibold">{pillar.title}</h3>
              <p className="text-ink-soft">{pillar.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <Grid className="gap-y-10">
          <div className="col-span-4 md:col-span-3">
            <Eyebrow index="03">At a glance</Eyebrow>
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

      <Sectors index="04" />

      <Section tone="alt">
        <Grid className="gap-y-10">
          <div className="col-span-4 md:col-span-3">
            <Eyebrow index="05">Direction</Eyebrow>
          </div>
          <div className="col-span-4 md:col-span-7">
            <Heading>Where we are going.</Heading>
            <p data-reveal className="mt-8 text-lead text-ink-soft">
              <Copy field={aboutCopy.direction} />
            </p>
          </div>
        </Grid>
      </Section>

      <ClosingCta />
    </PageTransition>
  );
}
