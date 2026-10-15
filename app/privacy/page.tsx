import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/sections/legal-page";

export const metadata: Metadata = pageMetadata({
  title: "Privacy",
  description: "How Arcaisys handles personal data submitted through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      needs={[
        "Registered legal entity and address",
        "Governing jurisdiction (e.g. India DPDP Act, GDPR)",
        "What the contact form collects and where it is stored",
        "Email provider and any analytics used",
        "Data retention period and contact for data requests",
      ]}
    />
  );
}
