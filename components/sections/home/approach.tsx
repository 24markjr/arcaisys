import { brand, homeCopy } from "@/content/company";
import { Grid } from "@/components/ui/container";
import { Copy } from "@/components/ui/copy";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

/** How Arcaisys builds. Sticky heading and principle on the left, numbered steps on the right. */
export function Approach({ index = "04", tone = "alt" }: { index?: string; tone?: "default" | "alt" }) {
  return (
    <Section tone={tone}>
      <Grid className="gap-y-14">
        <div className="col-span-4 md:col-span-12 lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
            <Eyebrow index={index}>Approach</Eyebrow>
            <Heading className="mt-8">{homeCopy.approachHeading}</Heading>
            <p data-reveal className="mt-6 max-w-[38ch] text-ink-soft">
              <Copy field={homeCopy.approachIntro} />
            </p>
            <figure data-reveal className="mt-10 border-l-2 border-accent pl-5">
              <blockquote className="text-h3 font-semibold">“{brand.principle}”</blockquote>
              <figcaption className="mt-3 text-small text-ink-muted">
                The principle behind everything we ship.
              </figcaption>
            </figure>
          </div>
        </div>
        <ol data-reveal="stagger" className="col-span-4 md:col-span-12 lg:col-span-6 lg:col-start-7">
          {homeCopy.principles.map((principle, i) => (
            <li
              key={principle.title.need}
              className="grid grid-cols-[3rem_1fr] border-t border-line py-10 first:border-t-0 first:pt-0"
            >
              <span aria-hidden className="font-mono text-label text-accent tabular-nums">
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
