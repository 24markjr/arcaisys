import { capabilities, homeCopy } from "@/content/company";
import { Grid } from "@/components/ui/container";
import { Copy } from "@/components/ui/copy";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

/** What Arcaisys can build. A hairline grid of six capabilities — text only, no icons. */
export function Capabilities() {
  return (
    <Section>
      <Grid className="mb-16 gap-y-8 md:mb-20">
        <div className="col-span-4 md:col-span-3">
          <Eyebrow index="03">Capabilities</Eyebrow>
        </div>
        <div className="col-span-4 md:col-span-8">
          <Heading>{homeCopy.capabilitiesHeading}</Heading>
          <p data-reveal className="mt-6 max-w-[52ch] text-lead text-ink-soft">
            <Copy field={homeCopy.capabilitiesIntro} />
          </p>
        </div>
      </Grid>
      <ul
        data-reveal="stagger"
        className="grid gap-px overflow-hidden rounded-[3px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
      >
        {capabilities.map((capability, i) => (
          <li
            key={capability.title}
            className="relative flex flex-col gap-4 bg-surface p-8 transition-colors duration-(--dur-base) hover:bg-surface-alt md:p-10"
          >
            <span
              data-cap-line
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-[image:var(--brand-gradient)]"
            />
            <span aria-hidden className="font-mono text-label text-accent tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-h3 font-semibold">{capability.title}</h3>
            <p className="text-ink-soft">{capability.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
