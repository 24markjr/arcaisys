import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Suspense } from "react";
import { companyFacts, contactCopy } from "@/content/company";
import { ArrowUpRight } from "lucide-react";
import { Grid } from "@/components/ui/container";
import { CopyButton } from "@/components/ui/copy-button";
import { StudioLine } from "@/components/brand/studio-line";
import { Copy } from "@/components/ui/copy";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Pending } from "@/components/ui/pending";
import { Section } from "@/components/ui/section";
import { PageHeader } from "@/components/sections/page-header";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactFormWithParams } from "@/components/contact/contact-form-with-params";
import { PageTransition } from "@/components/motion/page-transition";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Start a conversation with Arcaisys about its products or a project.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <PageTransition>
      <PageHeader eyebrow="Contact" title="Start a conversation." lead={<Copy field={contactCopy.lead} />} />

      <Section>
        <Grid className="gap-y-16">
          <aside className="col-span-4 grid content-start gap-10 sm:grid-cols-2 md:col-span-12 lg:col-span-4 lg:grid-cols-1">
            <div>
              <Eyebrow>Email</Eyebrow>
              <p className="mt-4 flex flex-wrap items-center gap-x-2 text-lead font-medium">
                {companyFacts.contactEmail ? (
                  <>
                    <a href={`mailto:${companyFacts.contactEmail}`} className="link-underline">
                      {companyFacts.contactEmail}
                    </a>
                    <CopyButton value={companyFacts.contactEmail} label="email address" />
                  </>
                ) : (
                  <Pending need="Public enquiry email (G1)" />
                )}
              </p>
            </div>
            <div>
              <Eyebrow>Phone</Eyebrow>
              <p className="mt-4 flex flex-wrap items-center gap-x-2 text-lead font-medium">
                {companyFacts.phone ? (
                  <>
                    <a href={companyFacts.phoneHref} className="link-underline">
                      {companyFacts.phone}
                    </a>
                    <CopyButton value={companyFacts.phoneHref.replace("tel:", "")} label="phone number" />
                  </>
                ) : (
                  <Pending need="Phone number (G2)" />
                )}
              </p>
            </div>
            {companyFacts.whatsapp ? (
              <div>
                <Eyebrow>WhatsApp</Eyebrow>
                <p className="mt-4 text-lead font-medium">
                  <a
                    href={`https://wa.me/${companyFacts.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2"
                  >
                    <span className="link-underline pb-0.5">Message us on WhatsApp</span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 transition-transform duration-(--dur-base) ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.75}
                    />
                    <span className="sr-only">(opens WhatsApp)</span>
                  </a>
                </p>
              </div>
            ) : null}
            <div>
              <Eyebrow>Office</Eyebrow>
              {companyFacts.address ? (
                <>
                  <address className="mt-4 text-lead leading-relaxed font-medium not-italic">
                    {companyFacts.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  <StudioLine coordinates={companyFacts.coordinates} className="mt-5 text-ink-muted" />
                </>
              ) : (
                <p className="mt-4 text-lead font-medium">
                  <Pending need="Office address (G3)" />
                </p>
              )}
            </div>
          </aside>

          <div data-reveal className="col-span-4 md:col-span-12 lg:col-span-7 lg:col-start-6">
            {/* The fallback is the same form without ?interest= pre-selection. */}
            <Suspense fallback={<ContactForm />}>
              <ContactFormWithParams />
            </Suspense>
          </div>
        </Grid>
      </Section>
    </PageTransition>
  );
}
