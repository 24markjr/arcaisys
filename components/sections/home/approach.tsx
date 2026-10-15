import { Grid } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Pending } from "@/components/ui/pending";
import { Section } from "@/components/ui/section";

const PRINCIPLE_SLOTS = 4;

/**
 * How Arcaisys builds. Sticky heading on the left, numbered principles on the right.
 * Principles must be concrete practices supplied by Arcaisys (questionnaire B6).
 */
export function Approach() {
  return (
    <Section>
      <Grid className="gap-y-14">
        <div className="col-span-4 md:col-span-5">
          <div className="md:sticky md:top-[calc(var(--header-h)+3rem)]">
            <Eyebrow index="03">Approach</Eyebrow>
            <Heading className="mt-8">How we build.</Heading>
            <p className="mt-6 max-w-[36ch] text-ink-soft">
              <Pending need="Short framing sentence for the approach" />
            </p>
          </div>
        </div>
        <ol className="col-span-4 md:col-span-6 md:col-start-7">
          {Array.from({ length: PRINCIPLE_SLOTS }, (_, i) => (
            <li
              key={i}
              className="grid grid-cols-[3rem_1fr] border-t border-line py-10 first:border-t-0 first:pt-0"
            >
              <span className="font-mono text-label text-brand-red tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-h3 font-semibold">
                  <Pending need={`Principle ${i + 1} — title`} />
                </h3>
                <p className="mt-4 text-ink-soft">
                  <Pending need="Two sentences describing the practice" />
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Grid>
    </Section>
  );
}
