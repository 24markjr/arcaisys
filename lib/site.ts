/**
 * Central technical site configuration. Company facts and copy live in content/.
 */
export const siteConfig = {
  name: "Arcaisys",
  /** Production domain confirmed by Arcaisys on 2026-10-15. Override per environment. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://arcaisys.com").replace(/\/$/, ""),
  tagline: "Software products",
  // Meta description fallback — replace with approved copy once supplied.
  description: "Arcaisys is a software company based in Mumbai, building Hospio, Meridian, PACS and RestoQR.",
  locale: "en",
  /** Static so pages stay fully prerendered; update yearly or at launch. */
  copyrightYear: 2026,
  /**
   * Search engines are kept out until launch. Set SITE_INDEXABLE=true in the
   * production environment once content is approved (docs/deployment.md).
   */
  indexable: process.env.SITE_INDEXABLE === "true",
} as const;

/** Whether a pathname belongs to a nav item (exact for "/", prefix otherwise). */
export function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}
