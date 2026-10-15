import { ArrowLink } from "@/components/ui/button";
import { Grid } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Pending } from "@/components/ui/pending";
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
            <Pending need="Two to three sentences: what Arcaisys does, for whom, and why — from the questionnaire, section B">
              Arcaisys designs and builds software products. Statement to be written from your company
              description.
            </Pending>
          </p>
          <ArrowLink href="/about" className="mt-12">
            About Arcaisys
          </ArrowLink>
        </div>
      </Grid>
    </Section>
  );
}
