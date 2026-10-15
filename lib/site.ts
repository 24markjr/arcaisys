/**
 * Central technical site configuration. Company facts and copy live in content/.
 *
 * The production domain is NOT yet confirmed (acracsys.com vs arcaisys.com —
 * see docs/content-inventory.md). Set NEXT_PUBLIC_SITE_URL once it is.
 */
export const siteConfig = {
  name: "Arcaisys",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // Meta description fallback — replace with approved copy once supplied.
  description: "Arcaisys builds software products: Hospio, Meridian, PACS and RestoQR.",
  locale: "en",
  /** Static so pages stay fully prerendered; update yearly or at launch. */
  copyrightYear: 2026,
} as const;

/** Whether a pathname belongs to a nav item (exact for "/", prefix otherwise). */
export function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}
