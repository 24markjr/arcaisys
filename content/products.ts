import type { Product } from "./types";

/**
 * Product portfolio.
 *
 * Only the name, tagline and logo files are confirmed (taken directly from the
 * supplied logos). Everything else is null until Arcaisys supplies it — see
 * docs/content-questionnaire.md. Do not fill these fields with invented copy.
 */
export const products: Product[] = [
  {
    slug: "hospio",
    name: "Hospio",
    tagline: "Admit. Care. Heal.",
    category: null, // likely hospital management — awaiting confirmation
    summary: null,
    audience: null,
    problem: null,
    capabilities: [],
    status: "unknown",
    externalUrl: null,
    logo: { src: "/brand/hospio-logo.png", width: 1200, height: 1011, alt: "Hospio" },
    symbol: { src: "/brand/hospio-symbol.png", width: 640, height: 503, alt: "" },
    tile: { src: "/brand/hospio-tile.png", width: 512, height: 512, alt: "" },
    accent: "#CC1E30",
    confirmed: false,
  },
  {
    slug: "meridian",
    name: "Meridian",
    tagline: "Ask. Verify. Trust.",
    category: null, // not inferable from the logo — awaiting description
    summary: null,
    audience: null,
    problem: null,
    capabilities: [],
    status: "unknown",
    externalUrl: null,
    logo: { src: "/brand/meridian-logo.png", width: 1200, height: 949, alt: "Meridian" },
    symbol: { src: "/brand/meridian-symbol.png", width: 592, height: 592, alt: "" },
    tile: { src: "/brand/meridian-tile.png", width: 512, height: 512, alt: "" },
    accent: "#EA541E",
    confirmed: false,
  },
  {
    slug: "pacs",
    name: "PACS",
    tagline: "Capture. Store. View. Report.",
    category: null, // likely medical imaging (PACS) — awaiting confirmation
    summary: null,
    audience: null,
    problem: null,
    capabilities: [],
    status: "unknown",
    externalUrl: null,
    logo: { src: "/brand/pacs-logo.png", width: 1200, height: 878, alt: "PACS" },
    symbol: { src: "/brand/pacs-symbol.png", width: 594, height: 594, alt: "" },
    tile: { src: "/brand/pacs-tile.png", width: 512, height: 512, alt: "" },
    accent: "#F6721E",
    confirmed: false,
  },
  {
    slug: "restoqr",
    name: "RestoQR",
    tagline: "Scan. Order. Serve. Grow.",
    category: null, // likely restaurant QR ordering — awaiting confirmation
    summary: null,
    audience: null,
    problem: null,
    capabilities: [],
    status: "unknown",
    externalUrl: null,
    logo: { src: "/brand/restoqr-logo.png", width: 933, height: 724, alt: "RestoQR" },
    symbol: null, // no separate icon supplied
    tile: null,
    accent: "#FC6C00",
    confirmed: false,
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
