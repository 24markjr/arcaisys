/**
 * Typed content models. Pages render from these; copy is edited in content/*.ts.
 *
 * `confirmed: false` marks anything not yet verified by Arcaisys. Unconfirmed
 * content must never be presented on the live site as established fact.
 */

export type BrandImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type ProductStatus = "live" | "pilot" | "in-development" | "unknown";

export type Product = {
  slug: string;
  name: string;
  /** Tagline exactly as it appears in the product logo. */
  tagline: string;
  /** Short category label, e.g. "Hospital management". */
  category: string | null;
  /** One-paragraph description supplied by Arcaisys. */
  summary: string | null;
  audience: string | null;
  problem: string | null;
  capabilities: string[];
  status: ProductStatus;
  externalUrl: string | null;
  logo: BrandImage;
  /** Symbol-only mark (transparent). Null when no separate icon was supplied. */
  symbol: BrandImage | null;
  /** White rounded app-icon tile, as supplied. */
  tile: BrandImage | null;
  /** Accent colour sampled from the product's own logo. */
  accent: string;
  confirmed: boolean;
};

export type NavItem = {
  label: string;
  href: string;
};
