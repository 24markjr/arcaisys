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

/** A piece of site copy and its approval state. See content/company.ts. */
export type CopyField = {
  /** What Arcaisys needs to supply (shown on the Pending marker). */
  need: string;
  /** Supplied or draft text; null when nothing has been supplied. */
  text: string | null;
  /** Only approved text renders as normal copy. */
  approved: boolean;
};

export type ProductStatus = "live" | "pilot" | "in-development" | "unknown";

export type Product = {
  slug: string;
  name: string;
  /** Tagline exactly as it appears in the product logo (brand action marks). */
  tagline: string;
  /** One-line positioning statement, e.g. "The operating system for the modern hospital." */
  headline: string;
  /** Industry the product serves (matches a sector in content/company.ts). */
  sector: string;
  /** Short category label, e.g. "Hospital management". */
  category: string | null;
  /** One-paragraph description. */
  summary: string | null;
  audience: string | null;
  problem: string | null;
  /** Heading for the capabilities section on the product page. */
  capabilitiesHeading: string;
  capabilities: { title: string; body: string }[];
  status: ProductStatus;
  externalUrl: string | null;
  logo: BrandImage;
  /** Logo with a white wordmark for the dark theme. Null when none exists (RestoQR). */
  logoReversed: BrandImage | null;
  /** Symbol-only mark (transparent). Null when no separate icon was supplied. */
  symbol: BrandImage | null;
  /** White rounded app-icon tile, as supplied. */
  tile: BrandImage | null;
  /**
   * Product screenshots, first one shown largest. Put files in
   * public/products/<slug>/ (PNG or JPG, at least 2400px wide for the primary).
   */
  screenshots: BrandImage[];
  /** Accent colour sampled from the product's own logo. */
  accent: string;
  confirmed: boolean;
};

export type NavItem = {
  label: string;
  href: string;
};
