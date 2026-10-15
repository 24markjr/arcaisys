import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { termsOfUse } from "@/content/legal";
import { LegalPage } from "@/components/sections/legal-page";

export const metadata: Metadata = pageMetadata({
  title: "Terms",
  description: "Terms of use for the Arcaisys website.",
  path: "/terms",
});

export default function TermsPage() {
  return <LegalPage document={termsOfUse} />;
}
