import { homeCopy } from "@/content/company";
import { SystemsGraphic } from "@/components/brand/systems-graphic";
import { ArrowLink } from "@/components/ui/button";
import { Grid } from "@/components/ui/container";
import { Copy } from "@/components/ui/copy";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";

/** The company statement, why it exists, and the idea as a diagram. */
export function CompanyIntro({ index = "02" }: { index?: string }) {
  return (
    <Section>
      <Grid className="items-center gap-y-12">
        <div className="col-span-4 md:col-span-12 lg:col-span-3 lg:self-start">
          <Eyebrow index={index}>Why Arcaisys</Eyebrow>
        </div>
        <div className="col-span-4 md:col-span-7 lg:col-span-5">
          <h2 data-reveal-lines className="text-h2 font-medium text-ink">
            <Copy field={homeCopy.introHeading} />
          </h2>
          <p data-reveal className="mt-8 max-w-[60ch] text-lead text-ink-soft">
            <Copy field={homeCopy.intro} />
          </p>
          <ArrowLink href="/about" data-reveal className="mt-10">
            About Arcaisys
          </ArrowLink>
        </div>
        <div className="col-span-4 mx-auto w-full max-w-[26rem] md:col-span-5 lg:col-span-4">
          <SystemsGraphic />
        </div>
      </Grid>
    </Section>
  );
}
