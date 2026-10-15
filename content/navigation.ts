import type { NavItem } from "./types";

/**
 * Provisional primary navigation (Phase 3 finalises the sitemap).
 * Routes are added to this list only once their page exists — no dead links.
 */
export const primaryNav: NavItem[] = [];

export const contactCta: NavItem = { label: "Start a conversation", href: "/contact" };
