import type { Metadata } from "next";
import { companyFacts } from "@/content/company";
import { products } from "@/content/products";
import { siteConfig } from "./site";

/**
 * Per-page metadata with a canonical URL and matching Open Graph fields.
 * The OG image comes from the nearest opengraph-image file convention.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description: string;
  path: string;
}): Metadata {
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      ...(title ? { title: `${title} — ${siteConfig.name}` } : {}),
      description,
      url: path,
    },
  };
}

/**
 * Organization structured data — only facts Arcaisys has confirmed.
 * Fields still null in content/company.ts are omitted, never guessed.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: companyFacts.legalName ?? siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/arcaisys-lockup.png`,
    ...(companyFacts.contactEmail ? { email: companyFacts.contactEmail } : {}),
    ...(companyFacts.phone ? { telephone: companyFacts.phoneHref.replace("tel:", "") } : {}),
    ...(companyFacts.address ? { address: { "@type": "PostalAddress", ...companyFacts.postalAddress } } : {}),
    ...(companyFacts.linkedin ? { sameAs: [companyFacts.linkedin] } : {}),
    brand: products.map((product) => ({ "@type": "Brand", name: product.name })),
  };
}
