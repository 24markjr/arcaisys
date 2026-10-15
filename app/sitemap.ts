import type { MetadataRoute } from "next";
import { products } from "@/content/products";
import { siteConfig } from "@/lib/site";

/** Public pages only — /styleguide is internal and excluded. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/products", priority: 0.9 },
    ...products.map((product) => ({ path: `/products/${product.slug}`, priority: 0.8 })),
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
    { path: "/privacy", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
  ];
  return pages.map(({ path, priority }) => ({
    url: `${siteConfig.url}${path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
