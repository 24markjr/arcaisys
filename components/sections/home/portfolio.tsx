import { homeCopy } from "@/content/company";
import { ArrowLink } from "@/components/ui/button";
import { Grid } from "@/components/ui/container";
import { Copy } from "@/components/ui/copy";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { ProductShowcase } from "@/components/sections/home/product-showcase";

/** The product suite, front and centre: an interactive showcase of all four products. */
export function Portfolio({ index = "01" }: { index?: string }) {
  return (
    <Section tone="alt">
      <Grid className="mb-12 gap-y-8 md:mb-16">
        <div className="col-span-4 md:col-span-12 lg:col-span-3">
          <Eyebrow index={index}>Products</Eyebrow>
        </div>
        <div className="col-span-4 md:col-span-9 lg:col-span-6">
          <Heading>Four platforms. One standard.</Heading>
          <p data-reveal className="mt-6 max-w-[46ch] text-ink-soft">
            <Copy field={homeCopy.portfolioIntro} />
          </p>
        </div>
        <div className="col-span-4 flex items-end md:col-span-3 md:justify-end">
          <ArrowLink href="/products">All products</ArrowLink>
        </div>
      </Grid>
      <div data-reveal>
        <ProductShowcase />
      </div>
    </Section>
  );
}
