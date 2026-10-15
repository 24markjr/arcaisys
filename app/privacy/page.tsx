import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { privacyPolicy } from "@/content/legal";
import { LegalPage } from "@/components/sections/legal-page";

export const metadata: Metadata = pageMetadata({
  title: "Privacy",
  description: "How Arcaisys handles personal data submitted through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return <LegalPage document={privacyPolicy} />;
}
