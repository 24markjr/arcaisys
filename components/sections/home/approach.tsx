import { homeCopy } from "@/content/company";
import { Grid } from "@/components/ui/container";
import { Copy } from "@/components/ui/copy";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

/**
 * How Arcaisys builds. Sticky heading on the left, numbered principles on the right.
 * Principles must be concrete practices supplied by Arcaisys (questionnaire B6).
 */
export function Approach({ index = "03" }: { index?: string }) {
  return (
    <Section>
      <Grid className="gap-y-14">
        <div className="col-span-4 md:col-span-5">
          <div className="md:sticky md:top-[calc(var(--header-h)+3rem)]">
            <Eyebrow index={index}>Approach</Eyebrow>
            <Heading className="mt-8">How we build.</Heading>
            <p className="mt-6 max-w-[36ch] text-ink-soft">
              <Copy field={homeCopy.approachIntro} />
            </p>
          </div>
        </div>
        <ol data-reveal="stagger" className="col-span-4 md:col-span-6 md:col-start-7">
          {homeCopy.principles.map((principle, i) => (
            <li
              key={principle.title.need}
              className="grid grid-cols-[3rem_1fr] border-t border-line py-10 first:border-t-0 first:pt-0"
            >
              <span className="font-mono text-label text-accent tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-h3 font-semibold">
                  <Copy field={principle.title} />
                </h3>
                <p className="mt-4 text-ink-soft">
                  <Copy field={principle.body} />
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Grid>
    </Section>
  );
}
