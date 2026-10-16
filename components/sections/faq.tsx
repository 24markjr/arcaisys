import { Plus } from "lucide-react";
import { faqs } from "@/content/saas";
import { JsonLd } from "@/components/seo/json-ld";
import { Grid } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

/** Frequently asked questions, as native disclosure widgets, plus FAQPage structured data. */
export function Faq({ index = "05", tone = "default" }: { index?: string; tone?: "default" | "alt" }) {
  return (
    <Section tone={tone}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }}
      />
      <Grid className="gap-y-12">
        <div className="col-span-4 md:col-span-12 lg:col-span-4">
          <Eyebrow index={index}>Questions</Eyebrow>
          <Heading className="mt-8">Straight answers.</Heading>
        </div>
        <div data-reveal="stagger" className="col-span-4 md:col-span-12 lg:col-span-7 lg:col-start-6">
          {faqs.map((faq) => (
            <details key={faq.question} className="faq group border-b border-line-strong first:border-t">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lead font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {faq.question}
                <Plus
                  aria-hidden
                  strokeWidth={1.75}
                  className="size-5 shrink-0 text-ink-muted transition-transform duration-(--dur-base) ease-out-expo group-open:rotate-45 group-open:text-accent"
                />
              </summary>
              <p className="max-w-[62ch] pb-7 text-ink-soft">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Grid>
    </Section>
  );
}
