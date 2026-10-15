import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/sections/legal-page";

export const metadata: Metadata = pageMetadata({
  title: "Terms",
  description: "Terms of use for the Arcaisys website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      needs={[
        "Registered legal entity",
        "Governing law and jurisdiction",
        "Intellectual property notice for product names and logos",
      ]}
    />
  );
}
