import type { Metadata } from "next";
import { products } from "@/content/products";
import { siteConfig } from "@/lib/site";
import { Grid } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Pending } from "@/components/ui/pending";
import { Section } from "@/components/ui/section";
import { Wireframe } from "@/components/ui/wireframe";
import { PageHeader } from "@/components/sections/page-header";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a conversation with Arcaisys about its products or a project.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Start a conversation."
        lead={<Pending need="Who should get in touch, and what happens after they do" />}
      />

      <Section>
        <Grid className="gap-y-16">
          <aside className="col-span-4 space-y-10 md:col-span-4">
            <div>
              <Eyebrow>Email</Eyebrow>
              <p className="mt-4 text-lead font-medium">
                {siteConfig.contactEmail ? (
                  <a href={`mailto:${siteConfig.contactEmail}`} className="link-underline">
                    {siteConfig.contactEmail}
                  </a>
                ) : (
                  <Pending need="Public enquiry email" />
                )}
              </p>
            </div>
            <div>
              <Eyebrow>Location</Eyebrow>
              <p className="mt-4 text-lead font-medium">
                {siteConfig.location ?? <Pending need="City, country" />}
              </p>
            </div>
          </aside>

          <div className="col-span-4 md:col-span-7 md:col-start-6">
            <Wireframe
              label="Enquiry form — built in Phase 4"
              note="Server-validated, spam-protected, and only reports success once the email is actually delivered. Needs email-service credentials (see .env.example)."
            >
              <ul className="mt-2 space-y-1">
                <li>Name — required</li>
                <li>Business email — required</li>
                <li>Company — optional</li>
                <li>Interest — {[...products.map((p) => p.name), "Something else"].join(" / ")}</li>
                <li>Message — required</li>
              </ul>
            </Wireframe>
          </div>
        </Grid>
      </Section>
    </>
  );
}
