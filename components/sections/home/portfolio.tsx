import { homeCopy } from "@/content/company";
import { products } from "@/content/products";
import { ArrowLink } from "@/components/ui/button";
import { Grid } from "@/components/ui/container";
import { Copy } from "@/components/ui/copy";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { ProductIndex } from "@/components/sections/product-index";

export function Portfolio() {
  return (
    <Section tone="alt">
      <Grid className="mb-16 gap-y-8 md:mb-24">
        <div className="col-span-4 md:col-span-3">
          <Eyebrow index="02">Portfolio</Eyebrow>
        </div>
        <div className="col-span-4 md:col-span-6">
          <Heading>Four products, one company.</Heading>
          <p data-reveal className="mt-6 max-w-[46ch] text-ink-soft">
            <Copy field={homeCopy.portfolioIntro} />
          </p>
        </div>
        <div className="col-span-4 flex items-end md:col-span-3 md:justify-end">
          <ArrowLink href="/products">All products</ArrowLink>
        </div>
      </Grid>
      <ProductIndex products={products} />
    </Section>
  );
}
