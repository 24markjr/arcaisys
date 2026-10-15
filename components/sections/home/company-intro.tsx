import { homeCopy } from "@/content/company";
import { ArrowLink } from "@/components/ui/button";
import { Grid } from "@/components/ui/container";
import { Copy } from "@/components/ui/copy";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";

/** Single editorial statement: what Arcaisys is. No cards, no icons. */
export function CompanyIntro() {
  return (
    <Section>
      <Grid className="gap-y-10">
        <div className="col-span-4 md:col-span-3">
          <Eyebrow index="01">Company</Eyebrow>
        </div>
        <div className="col-span-4 md:col-span-9">
          <p className="text-h2 font-medium text-ink">
            <Copy field={homeCopy.intro} />
          </p>
          <ArrowLink href="/about" className="mt-12">
            About Arcaisys
          </ArrowLink>
        </div>
      </Grid>
    </Section>
  );
}
