/**
 * Central site configuration.
 *
 * The production domain is NOT yet confirmed (acracsys.com vs arcaisys.com —
 * see docs/content-inventory.md). Set NEXT_PUBLIC_SITE_URL once it is.
 */
export const siteConfig = {
  name: "Arcaisys",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // Placeholder description — replace with approved copy in Phase 5.
  description: "Arcaisys builds software products for healthcare, hospitality and beyond.",
  locale: "en",
} as const;
