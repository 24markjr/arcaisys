import { homeCopy } from "@/content/company";
import { ArrowLink } from "@/components/ui/button";
import { Grid } from "@/components/ui/container";
import { Copy } from "@/components/ui/copy";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";

/** The company statement and why it exists. No cards, no icons. */
export function CompanyIntro() {
  return (
    <Section>
      <Grid className="gap-y-10">
        <div className="col-span-4 md:col-span-3">
          <Eyebrow index="01">Company</Eyebrow>
        </div>
        <div className="col-span-4 md:col-span-9">
          <h2 data-reveal-lines className="text-h2 font-medium text-ink">
            <Copy field={homeCopy.introHeading} />
          </h2>
          <p data-reveal className="mt-8 max-w-[62ch] text-lead text-ink-soft">
            <Copy field={homeCopy.intro} />
          </p>
          <ArrowLink href="/about" data-reveal className="mt-10">
            About Arcaisys
          </ArrowLink>
        </div>
      </Grid>
    </Section>
  );
}
