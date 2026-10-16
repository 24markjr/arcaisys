import { subscriptionIncludes, subscriptionModel, subscriptionSteps } from "@/content/saas";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { Grid } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

/** How the subscription model works, and what every subscription includes. */
export function Subscription({
  index = "04",
  tone = "alt",
  links = true,
}: {
  index?: string;
  tone?: "default" | "alt";
  /** Show the pricing links (off on the pricing page itself). */
  links?: boolean;
}) {
  return (
    <Section tone={tone}>
      <Grid className="mb-14 gap-y-8 md:mb-20">
        <div className="col-span-4 md:col-span-12 lg:col-span-3">
          <Eyebrow index={index}>How it works</Eyebrow>
        </div>
        <div className="col-span-4 md:col-span-9 lg:col-span-6">
          <Heading>Subscribe once. Improve continuously.</Heading>
          <p data-reveal className="mt-6 max-w-[48ch] text-ink-soft">
            Every Arcaisys product is {subscriptionModel.summary.toLowerCase()}:{" "}
            {subscriptionModel.billing.toLowerCase()}, with hosting, updates and support included.
          </p>
        </div>
      </Grid>

      {/* Four steps along a drawn line */}
      <ol data-reveal="stagger" className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <span
          aria-hidden
          data-cap-line
          className="absolute top-[1.375rem] right-0 left-0 hidden h-px bg-[image:var(--brand-gradient)] lg:block"
        />
        {subscriptionSteps.map((step, i) => (
          <li key={step.title} className="relative">
            <span
              aria-hidden
              className="relative flex size-11 items-center justify-center rounded-full border border-line-strong bg-surface font-mono text-label text-accent tabular-nums"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-6 text-h3 font-semibold">{step.title}</h3>
            <p className="mt-3 max-w-[32ch] text-ink-soft">{step.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-20 rounded-[4px] border border-line-strong bg-surface md:mt-24">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-6 py-5 md:px-10">
          <p className="font-mono text-label text-ink-muted uppercase">Every subscription includes</p>
          <p className="font-mono text-label text-ink uppercase">{subscriptionModel.billing}</p>
        </div>
        <ul data-reveal="stagger" className="grid sm:grid-cols-2 lg:grid-cols-4">
          {subscriptionIncludes.map((item, i) => (
            <li
              key={item.title}
              className={
                "flex flex-col gap-3 border-line p-6 md:p-10" +
                (i > 0 ? " border-t sm:border-t-0" : "") +
                (i % 2 === 1 ? " sm:border-l" : "") +
                (i >= 2 ? " sm:border-t lg:border-t-0" : "") +
                (i === 2 ? " lg:border-l" : "")
              }
            >
              <h3 className="text-lead font-semibold">{item.title}</h3>
              <p className="text-small text-ink-soft">{item.body}</p>
            </li>
          ))}
        </ul>
        {links ? (
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line px-6 py-6 md:px-10">
            <ButtonLink href="/pricing">See pricing</ButtonLink>
            <ArrowLink href="/contact?interest=pricing">Request a quote</ArrowLink>
          </div>
        ) : null}
      </div>
    </Section>
  );
}
