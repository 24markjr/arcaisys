import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for the Arcaisys website.",
};

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
