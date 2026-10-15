import type { Metadata } from "next";
import { Suspense } from "react";
import { companyFacts, contactCopy } from "@/content/company";
import { Grid } from "@/components/ui/container";
import { Copy } from "@/components/ui/copy";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Pending } from "@/components/ui/pending";
import { Section } from "@/components/ui/section";
import { PageHeader } from "@/components/sections/page-header";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactFormWithParams } from "@/components/contact/contact-form-with-params";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a conversation with Arcaisys about its products or a project.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Start a conversation." lead={<Copy field={contactCopy.lead} />} />

      <Section>
        <Grid className="gap-y-16">
          <aside className="col-span-4 space-y-10 md:col-span-4">
            <div>
              <Eyebrow>Email</Eyebrow>
              <p className="mt-4 text-lead font-medium">
                {companyFacts.contactEmail ? (
                  <a href={`mailto:${companyFacts.contactEmail}`} className="link-underline">
                    {companyFacts.contactEmail}
                  </a>
                ) : (
                  <Pending need="Public enquiry email (G1)" />
                )}
              </p>
            </div>
            <div>
              <Eyebrow>Location</Eyebrow>
              <p className="mt-4 text-lead font-medium">
                {companyFacts.location ?? <Pending need="City, country (B3)" />}
              </p>
            </div>
          </aside>

          <div className="col-span-4 md:col-span-7 md:col-start-6">
            {/* The fallback is the same form without ?interest= pre-selection. */}
            <Suspense fallback={<ContactForm />}>
              <ContactFormWithParams />
            </Suspense>
          </div>
        </Grid>
      </Section>
    </>
  );
}
