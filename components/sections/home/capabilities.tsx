import { Cloud, LockKeyhole, MonitorSmartphone, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { capabilities, homeCopy } from "@/content/company";
import { Grid } from "@/components/ui/container";
import { Copy } from "@/components/ui/copy";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { SpotlightList } from "@/components/ui/spotlight-list";

/** One icon per platform capability, in the order of `capabilities`. */
const icons = [Sparkles, ShieldCheck, Zap, MonitorSmartphone, LockKeyhole, Cloud];

/** The shared platform beneath every product. Dark panel, six cells, pointer spotlight. */
export function Capabilities({ index = "03" }: { index?: string }) {
  return (
    <Section tone="ink">
      <Grid className="relative mb-16 gap-y-8 md:mb-20">
        <div className="col-span-4 md:col-span-12 lg:col-span-3">
          <Eyebrow index={index} tone="inverse">
            Platform
          </Eyebrow>
        </div>
        <div className="col-span-4 md:col-span-10 lg:col-span-8">
          <Heading>{homeCopy.capabilitiesHeading}</Heading>
          <p data-reveal className="mt-6 max-w-[52ch] text-lead text-ink-inverse-soft">
            <Copy field={homeCopy.capabilitiesIntro} />
          </p>
        </div>
      </Grid>
      <SpotlightList
        data-reveal="stagger"
        className="relative grid gap-px overflow-hidden rounded-[4px] border border-line-ink bg-line-ink sm:grid-cols-2 lg:grid-cols-3"
      >
        {capabilities.map((capability, i) => {
          const Icon = icons[i] ?? Sparkles;
          return (
            <li key={capability.title} className="relative flex flex-col gap-4 bg-surface-ink p-8 md:p-10">
              <span
                data-cap-line
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-[image:var(--brand-gradient)]"
              />
              <span className="flex items-center justify-between">
                <span
                  aria-hidden
                  className="flex size-11 items-center justify-center rounded-[4px] border border-line-ink bg-white/[0.03]"
                >
                  <Icon className="size-5 text-brand-orange" strokeWidth={1.5} />
                </span>
                <span aria-hidden className="font-mono text-label text-ink-inverse-soft tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>
              <h3 className="mt-2 text-h3 font-semibold text-ink-inverse">{capability.title}</h3>
              <p className="text-ink-inverse-soft">{capability.body}</p>
            </li>
          );
        })}
      </SpotlightList>
    </Section>
  );
}
