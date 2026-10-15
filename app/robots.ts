import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/**
 * Until launch (SITE_INDEXABLE=true), all crawlers are asked to stay out —
 * matching the noindex meta tag in app/layout.tsx.
 */
export default function robots(): MetadataRoute.Robots {
  if (!siteConfig.indexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/styleguide"] },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
