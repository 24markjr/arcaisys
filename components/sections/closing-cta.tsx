import { homeCopy } from "@/content/company";
import { contactCta } from "@/content/navigation";
import { RibbonLine } from "@/components/brand/ribbon";
import { ButtonLink } from "@/components/ui/button";
import { Container, Grid } from "@/components/ui/container";
import { Copy } from "@/components/ui/copy";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";

type ClosingCtaProps = {
  title?: string;
  /** Pre-select an interest on the contact form, e.g. a product slug. */
  interest?: string;
};

/** Dark closing panel shared by every page — the single conversion point. */
export function ClosingCta({ title = "Start a conversation.", interest }: ClosingCtaProps) {
  const href = interest ? `${contactCta.href}?interest=${interest}` : contactCta.href;
  return (
    <section className="relative overflow-hidden bg-surface-ink text-ink-inverse">
      <RibbonLine className="absolute inset-x-0 top-0 opacity-90" />
      <Container className="relative pt-40 pb-24 md:pt-56 md:pb-32">
        <Grid className="gap-y-10">
          <div className="col-span-4 md:col-span-8">
            <Eyebrow tone="inverse">Contact</Eyebrow>
            <Heading size="display" className="mt-8">
              {title}
            </Heading>
          </div>
          <div className="col-span-4 flex flex-col justify-end gap-8 md:col-span-4">
            <p className="text-ink-inverse-soft">
              <Copy field={homeCopy.ctaLine} />
            </p>
            <ButtonLink href={href} variant="inverse" className="self-start">
              {contactCta.label}
            </ButtonLink>
          </div>
        </Grid>
      </Container>
    </section>
  );
}
