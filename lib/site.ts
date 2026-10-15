/**
 * Central site configuration.
 *
 * The production domain is NOT yet confirmed (acracsys.com vs arcaisys.com —
 * see docs/content-inventory.md). Set NEXT_PUBLIC_SITE_URL once it is.
 * Fields set to null are awaiting information from Arcaisys.
 */
export const siteConfig = {
  name: "Arcaisys",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // Placeholder description — replace with approved copy in Phase 5.
  description: "Arcaisys builds software products for healthcare, hospitality and beyond.",
  locale: "en",
  /** Static so pages stay fully prerendered; update yearly or at launch. */
  copyrightYear: 2026,
  legalName: null as string | null,
  contactEmail: null as string | null,
  location: null as string | null,
} as const;

/** Whether a pathname belongs to a nav item (exact for "/", prefix otherwise). */
export function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}
