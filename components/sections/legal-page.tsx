import type { ReactNode } from "react";
import { companyFacts } from "@/content/company";
import { legalTerms, type LegalDocument } from "@/content/legal";
import { Container, Grid } from "@/components/ui/container";
import { Copy } from "@/components/ui/copy";
import { Pending } from "@/components/ui/pending";
import { PageTransition } from "@/components/motion/page-transition";
import { PageHeader } from "./page-header";

const dateFormat = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" });
const formatDate = (iso: string) => dateFormat.format(new Date(`${iso}T00:00:00Z`));

/** Values for {tokens} in legal text: confirmed facts, or a visible Pending marker. */
function token(name: string): ReactNode {
  switch (name) {
    case "legalName":
      return companyFacts.legalName ?? <Pending need="Registered legal name (B4)">Arcaisys</Pending>;
    case "contactEmail":
      return companyFacts.contactEmail ? (
        <a href={`mailto:${companyFacts.contactEmail}`} className="link-underline text-ink">
          {companyFacts.contactEmail}
        </a>
      ) : (
        <Pending need="Contact email (G1)" />
      );
    case "address":
      return companyFacts.address ? (
        companyFacts.address.join(", ")
      ) : (
        <Pending need="Registered address (G3)" />
      );
    default: {
      const field = legalTerms[name as keyof typeof legalTerms];
      if (!field) throw new Error(`Unknown legal token {${name}}`);
      return <Copy field={field} />;
    }
  }
}

/** Renders a string with {tokens} replaced. */
function Text({ value }: { value: string }) {
  const parts = value.split(/\{(\w+)\}/g);
  return <>{parts.map((part, i) => (i % 2 === 1 ? <span key={i}>{token(part)}</span> : part))}</>;
}

/** Shared layout for the privacy policy and terms of use. Prints as a plain document. */
export function LegalPage({ document }: { document: LegalDocument }) {
  return (
    <PageTransition>
      <PageHeader eyebrow="Legal" title={document.title} />
      <Container className="py-16 md:py-24">
        <Grid className="gap-y-10">
          <aside className="col-span-4 md:col-span-3">
            <dl className="space-y-5 font-mono text-label text-ink-muted uppercase md:sticky md:top-[calc(var(--header-h)+2rem)]">
              <div>
                <dt>Last updated</dt>
                <dd className="mt-1 text-ink normal-case">{formatDate(document.lastUpdated)}</dd>
              </div>
              <div>
                <dt>Effective</dt>
                <dd className="mt-1 text-ink normal-case">
                  {document.effectiveDate ? (
                    formatDate(document.effectiveDate)
                  ) : (
                    <Pending need="Effective date — set at launch" />
                  )}
                </dd>
              </div>
            </dl>
          </aside>

          <article className="col-span-4 max-w-[68ch] md:col-span-8 md:col-start-5">
            {!document.reviewed ? (
              <p className="pending mb-12 px-4 py-3 text-small text-ink-soft">
                <strong className="text-ink">Draft.</strong> Prepared from how this website actually works. It
                must be reviewed by a qualified lawyer, and the marked details confirmed, before launch.
              </p>
            ) : null}

            <div className="space-y-5 text-lead text-ink-soft">
              {document.intro.map((paragraph) => (
                <p key={paragraph}>
                  <Text value={paragraph} />
                </p>
              ))}
            </div>

            <ol className="mt-14 space-y-12">
              {document.sections.map((section, i) => (
                <li key={section.heading} className="border-t border-line pt-8">
                  <h2 className="flex gap-4 text-h3 font-semibold">
                    <span className="mt-1.5 font-mono text-label text-accent tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {section.heading}
                  </h2>
                  <div className="mt-5 space-y-4 text-ink-soft">
                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph}>
                        <Text value={paragraph} />
                      </p>
                    ))}
                    {section.items ? (
                      <ul className="list-disc space-y-2 pl-5 marker:text-ink-muted">
                        {section.items.map((item) => (
                          <li key={item}>
                            <Text value={item} />
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {section.after?.map((paragraph) => (
                      <p key={paragraph}>
                        <Text value={paragraph} />
                      </p>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </article>
        </Grid>
      </Container>
    </PageTransition>
  );
}
