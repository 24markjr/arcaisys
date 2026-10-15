import type { Metadata } from "next";
import Image from "next/image";
import { arcaisysBrand } from "@/content/brand";
import { products } from "@/content/products";
import { AscentGraphic, RibbonLine } from "@/components/brand/ribbon";
import { Logo } from "@/components/brand/logo";
import { ProductTile } from "@/components/brand/product-tile";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { Container, Grid } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Pending } from "@/components/ui/pending";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

/* Kept in sync with app/globals.css — values shown for review only. */
const palette = [
  {
    group: "Surfaces",
    tokens: [
      ["surface", "#FFFFFF"],
      ["surface-alt", "#FAF9F7"],
      ["surface-sunken", "#F3F1EE"],
      ["surface-ink", "#0E1726"],
    ],
  },
  {
    group: "Ink",
    tokens: [
      ["ink", "#0F1622"],
      ["ink-navy", "#0E1B2E"],
      ["ink-soft", "#4A505C"],
      ["ink-muted", "#686D79"],
    ],
  },
  {
    group: "Brand — sampled from the logo",
    tokens: [
      ["brand-amber", "#F89818"],
      ["brand-orange", "#F86810"],
      ["brand-coral", "#FC5454"],
      ["brand-red", "#D81018"],
      ["brand-deep", "#A80818"],
      ["brand-ember", "#800010"],
    ],
  },
] as const;

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}

const typeScale = [
  ["display", "text-display", "Engineering, made visible."],
  ["h1", "text-h1", "Engineering, made visible."],
  ["h2", "text-h2", "Engineering, made visible."],
  ["h3", "text-h3", "Engineering, made visible."],
  ["lead", "text-lead", "Lead paragraphs introduce a section in one or two sentences."],
  [
    "body",
    "text-body",
    "Body copy is set at 17px with a 1.65 line height and a measure of roughly 65 characters for comfortable reading.",
  ],
  ["small", "text-small", "Small text for metadata, captions and footer links."],
] as const;

function Block({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return (
    <Section divided spacing="compact">
      <Grid className="gap-y-10">
        <div className="col-span-4 md:col-span-3">
          <Eyebrow index={index}>{title}</Eyebrow>
        </div>
        <div className="col-span-4 md:col-span-9">{children}</div>
      </Grid>
    </Section>
  );
}

export default function StyleguidePage() {
  return (
    <>
      <header className="border-b border-line">
        <Container className="py-16 md:py-24">
          <Eyebrow>Internal — not linked from the site</Eyebrow>
          <Heading as="h1" size="h1" className="mt-8">
            Arcaisys design system
          </Heading>
          <p className="mt-6 max-w-[52ch] text-lead text-ink-soft">
            Every colour, type style, component and graphic used on the site. Review and approve here before
            pages are filled with content.
          </p>
        </Container>
      </header>

      <Block index="01" title="Colour">
        <div className="space-y-12">
          {palette.map((group) => (
            <div key={group.group}>
              <h2 className="mb-5 text-small font-semibold">{group.group}</h2>
              <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {group.tokens.map(([name, hex]) => {
                  const onWhite = contrast(hex, "#FFFFFF");
                  return (
                    <li key={name}>
                      <div
                        className="aspect-[4/3] rounded-[3px] border border-line"
                        style={{ background: hex }}
                      />
                      <p className="mt-3 text-small font-semibold">{name}</p>
                      <p className="font-mono text-[0.75rem] text-ink-muted">
                        {hex} · {onWhite.toFixed(1)}:1{" "}
                        {onWhite >= 4.5 ? "AA text" : onWhite >= 3 ? "AA large" : "decor"}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          <div>
            <h2 className="mb-5 text-small font-semibold">Brand gradient — graphics only</h2>
            <div className="h-16 rounded-[3px]" style={{ background: "var(--brand-gradient)" }} />
            <p className="mt-3 max-w-[60ch] text-small text-ink-soft">
              Never on body text, buttons or every section. It appears in the ribbon graphic, and nowhere
              else.
            </p>
          </div>
        </div>
      </Block>

      <Block index="02" title="Typography">
        <p className="mb-10 max-w-[60ch] text-ink-soft">
          Manrope for everything readable — geometric like the wordmark, comfortable at body sizes. Geist Mono
          for indices and labels only. All sizes are fluid between 360px and 1440px viewports.
        </p>
        <ul className="space-y-10">
          {typeScale.map(([name, cls, sample]) => (
            <li key={name} className="grid gap-3 border-t border-line pt-6 md:grid-cols-[8rem_1fr]">
              <span className="font-mono text-label text-ink-muted uppercase">{name}</span>
              <span className={`${cls} ${name.startsWith("h") || name === "display" ? "font-semibold" : ""}`}>
                {sample}
              </span>
            </li>
          ))}
          <li className="grid gap-3 border-t border-line pt-6 md:grid-cols-[8rem_1fr]">
            <span className="font-mono text-label text-ink-muted uppercase">label</span>
            <span className="font-mono text-label uppercase">Section label · 01 / 04</span>
          </li>
        </ul>
      </Block>

      <Block index="03" title="Labels and taglines">
        <div className="space-y-8">
          <Eyebrow index="01">Section eyebrow with index</Eyebrow>
          <Eyebrow>Eyebrow without index</Eyebrow>
          <div className="space-y-3">
            {products.map((p) => (
              <Tagline key={p.slug} text={p.tagline} accent={p.accent} />
            ))}
          </div>
          <p className="max-w-[60ch] text-small text-ink-soft">
            The eyebrow echoes the rule-flanked taglines of the product logos; taglines are set exactly as in
            each logo, with full stops in that product&apos;s sampled accent.
          </p>
        </div>
      </Block>

      <Block index="04" title="Actions">
        <div className="flex flex-wrap items-center gap-6">
          <ButtonLink href="/styleguide">Primary</ButtonLink>
          <ButtonLink href="/styleguide" variant="secondary">
            Secondary
          </ButtonLink>
          <ButtonLink href="/styleguide" variant="secondary" external>
            External
          </ButtonLink>
          <ArrowLink href="/styleguide">Arrow link</ArrowLink>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-6 rounded-[3px] bg-surface-ink p-8">
          <ButtonLink href="/styleguide" variant="inverse">
            Inverse
          </ButtonLink>
          <ButtonLink href="/styleguide" variant="inverse-outline">
            Inverse outline
          </ButtonLink>
          <ArrowLink href="/styleguide" tone="inverse">
            Arrow link
          </ArrowLink>
        </div>
        <p className="mt-6 max-w-[60ch] text-small text-ink-soft">
          Squared 3px corners — restrained, architectural. Hover moves the arrow; nothing bounces. Focus shows
          a 2px brand-red ring on every interactive element (try Tab).
        </p>
      </Block>

      <Block index="05" title="Arcaisys logo">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex h-56 items-center justify-center rounded-[3px] border border-line bg-surface">
            <Logo size="lg" />
          </div>
          <div className="flex h-56 items-center justify-center rounded-[3px] bg-surface-ink">
            <Logo size="lg" />
          </div>
          <div className="flex h-72 items-center justify-center rounded-[3px] border border-line bg-surface-alt">
            <Image
              src={arcaisysBrand.lockup.src}
              width={arcaisysBrand.lockup.width}
              height={arcaisysBrand.lockup.height}
              alt="Arcaisys stacked logo"
              className="h-52 w-auto"
            />
          </div>
          <div className="flex flex-col justify-center gap-3 p-2 text-small text-ink-soft">
            <p>Horizontal lockup for the header and footer; stacked original for large, centred use.</p>
            <p>
              Built from the supplied PNG, split into mark and wordmark. Never redrawn, recoloured or
              stretched.
            </p>
          </div>
        </div>
      </Block>

      <Block index="06" title="Product logos">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <div
              key={p.slug}
              className="flex aspect-square items-center justify-center rounded-[3px] border border-line bg-white p-8"
            >
              <Image
                src={p.logo.src}
                width={p.logo.width}
                height={p.logo.height}
                alt={p.logo.alt}
                className="h-auto w-full"
              />
            </div>
          ))}
          {products
            .filter((p) => p.slug !== "restoqr")
            .map((p) => (
              <div
                key={p.slug}
                className="flex aspect-square items-center justify-center rounded-[3px] bg-surface-ink p-8"
              >
                <Image
                  src={`/brand/${p.slug}-logo-reversed.png`}
                  width={p.logo.width}
                  height={p.logo.height}
                  alt={`${p.name}, reversed`}
                  className="h-auto w-full"
                />
              </div>
            ))}
          <div className="flex aspect-square items-center justify-center rounded-[3px] border border-dashed border-line-strong p-8 text-center text-small text-ink-muted">
            RestoQR has no reversed version — its artwork needs redrawing first.
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          {products.map((p) => (
            <ProductTile key={p.slug} product={p} className="size-16" />
          ))}
        </div>
      </Block>

      <Block index="07" title="Signature graphic">
        <div className="overflow-hidden rounded-[3px] border border-line bg-surface p-6 md:p-12">
          <AscentGraphic className="mx-auto max-w-2xl" />
        </div>
        <p className="mt-6 max-w-[62ch] text-small text-ink-soft">
          The Arcaisys mark, abstracted. The ascending A becomes hairline construction lines — an engineering
          drawing — and the S becomes a single solid ribbon carrying the logo&apos;s amber-to-ember gradient.
          The floating chevron is kept. In Phase 6 the lines draw in and the ribbon sweeps through once.
        </p>
        <div className="mt-10 overflow-hidden rounded-[3px] bg-surface-ink">
          <RibbonLine />
          <p className="p-6 text-small text-ink-inverse-soft">
            Ribbon line — section transitions and the closing call to action.
          </p>
        </div>
      </Block>

      <Block index="08" title="Grid and spacing">
        <div className="relative h-40 overflow-hidden rounded-[3px] border border-line">
          <Grid className="absolute inset-0 px-4">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className={`bg-brand-orange/10 ${i >= 4 ? "hidden md:block" : ""}`} />
            ))}
          </Grid>
        </div>
        <ul className="mt-6 space-y-1 text-small text-ink-soft">
          <li>12 columns from 768px, 4 below. Gutter: clamp(20px, 4vw, 48px). Max content width 1408px.</li>
          <li>Section rhythm: 96 / 128 / 160px vertical padding (mobile / tablet / desktop).</li>
          <li>Layouts are asymmetric by default: labels in columns 1–3, content in 4–12.</li>
        </ul>
      </Block>

      <Block index="09" title="Motion">
        <ul className="space-y-4 text-small">
          {[
            ["Easing — out", "cubic-bezier(0.22, 1, 0.36, 1)", "Entrances, hovers. Fast start, long settle."],
            ["Easing — in-out", "cubic-bezier(0.65, 0, 0.35, 1)", "Page transitions, ribbon sweep."],
            ["Fast", "180ms", "Colour changes."],
            ["Base", "420ms", "Arrows, underlines, small movements."],
            ["Slow", "900ms", "Headline reveals, graphic drawing."],
          ].map(([name, value, use]) => (
            <li key={name} className="grid gap-1 border-t border-line pt-4 md:grid-cols-[10rem_16rem_1fr]">
              <span className="font-semibold">{name}</span>
              <span className="font-mono text-ink-muted">{value}</span>
              <span className="text-ink-soft">{use}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-[60ch] text-small text-ink-soft">
          Only transform and opacity animate. With reduced motion enabled, everything appears in place.
        </p>
      </Block>

      <Block index="10" title="Pending content">
        <p className="text-lead">
          Confirmed text sits beside <Pending need="Example of missing content" /> and{" "}
          <Pending need="Example">draft copy awaiting approval</Pending>.
        </p>
        <p className="mt-6 max-w-[60ch] text-small text-ink-soft">
          Striped markers flag everything not yet supplied or approved. None may remain at launch.
        </p>
      </Block>
    </>
  );
}
