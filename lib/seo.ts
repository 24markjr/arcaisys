import type { Metadata } from "next";
import { brand, companyFacts } from "@/content/company";
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
    name: siteConfig.name,
    slogan: brand.motto,
    description: siteConfig.description,
    foundingDate: companyFacts.foundedIso,
    ...(companyFacts.legalName ? { legalName: companyFacts.legalName } : {}),
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/arcaisys-lockup.png`,
    ...(companyFacts.contactEmail ? { email: companyFacts.contactEmail } : {}),
    ...(companyFacts.phone ? { telephone: companyFacts.phoneHref.replace("tel:", "") } : {}),
    ...(companyFacts.address ? { address: { "@type": "PostalAddress", ...companyFacts.postalAddress } } : {}),
    ...(companyFacts.linkedin ? { sameAs: [companyFacts.linkedin] } : {}),
    brand: products.map((product) => ({ "@type": "Brand", name: product.name })),
  };
}

/** BreadcrumbList structured data, matching the visible breadcrumb on the page. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
