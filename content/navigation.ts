import type { NavItem } from "./types";
import { products } from "./products";

/**
 * Site navigation. Only routes that exist are listed — no dead links.
 * Services and Work are intentionally absent until content confirms they are
 * needed (see docs/sitemap.md).
 */
export const primaryNav: NavItem[] = [
  { label: "Products", href: "/products" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export const contactCta: NavItem = { label: "Book a demo", href: "/contact" };

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Products",
    items: products.map((product) => ({ label: product.name, href: `/products/${product.slug}` })),
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];
