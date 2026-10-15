import type { CopyField } from "./types";

/**
 * Every piece of company copy on the site, in one place.
 *
 * How to fill this in (Phase 5):
 * - `text: null`              → nothing supplied yet; the site shows a striped "Pending" marker.
 * - `text: "…", approved: false` → a draft; shown striped until Arcaisys approves it.
 * - `text: "…", approved: true`  → final; shown as normal copy.
 *
 * `need` describes what is required and points to the questionnaire item
 * (docs/content-questionnaire.md). Run `npm run content:audit` to list every gap.
 */
function copy(need: string, text: string | null = null, approved = false): CopyField {
  return { need, text, approved };
}

/** Company facts. null = not yet supplied (shown as Pending). Supplied by Arcaisys 2026-10-15. */
export const companyFacts = {
  legalName: null as string | null, // B4
  founded: null as string | null, // B2
  location: "Mumbai, India" as string | null, // B3
  contactEmail: "pm.teams@arcaisys.com" as string | null, // G1
  /** Shown as written; `phoneHref` is the dialable form. */
  phone: "+91 91378 15600" as string | null, // G2
  phoneHref: "tel:+919137815600",
  /** Postal address, one line per entry. */
  address: ["G1603, Samarth Garden", "Bhandup (W)", "Mumbai 400078", "Maharashtra, India"] as string[] | null, // G3
  /** Same address, structured for search engines (keep in sync with `address`). */
  postalAddress: {
    streetAddress: "G1603, Samarth Garden, Bhandup (W)",
    addressLocality: "Mumbai",
    postalCode: "400078",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  linkedin: null as string | null, // G4
};

export const homeCopy = {
  heroHeadline: copy("Approved hero headline (B1)", "Software that carries real work."),
  heroLead: copy("One-sentence value proposition (B1)"),
  intro: copy(
    "Two to three sentences: what Arcaisys does, for whom, and why (B1, B5)",
    "Arcaisys designs and builds software products. Statement to be written from your company description.",
  ),
  portfolioIntro: copy("One or two sentences on how the products relate to each other (C)"),
  approachIntro: copy("Short framing sentence for the approach (B6)"),
  principles: [1, 2, 3, 4].map((n) => ({
    title: copy(`Principle ${n} — title (B6)`),
    body: copy(`Principle ${n} — two sentences describing the practice (B6)`),
  })),
  sectorsHeadline: "Where the products work.",
  ctaLine: copy("Short line on who should get in touch and what happens next (G)"),
  footerDescriptor: copy("One-line company descriptor for the footer (B1)"),
};

/**
 * Sector grouping is INFERRED from product names and taglines — `approved`
 * stays false until Arcaisys confirms it. Meridian is not assigned.
 */
export const sectors = [
  {
    name: copy("Confirm sector: Healthcare (A, C)", "Healthcare"),
    description: copy("What Arcaisys offers the healthcare sector (C)"),
    products: ["hospio", "pacs"],
  },
  {
    name: copy("Confirm sector: Hospitality (A, C)", "Hospitality"),
    description: copy("What Arcaisys offers the hospitality sector (C)"),
    products: ["restoqr"],
  },
];

export const aboutCopy = {
  headline: copy("About page headline (B)", "A software company built around its products."),
  lead: copy("One-sentence company summary (B1)"),
  origin: copy("Why Arcaisys exists — the problem the founders set out to solve (B5)"),
  story: copy("Two short paragraphs of company story (B2, B5)"),
  sectorsFact: copy("Confirmed sectors (C)"),
  direction: copy("Where the company is heading in the next 2–3 years (B7)"),
};

export const productsCopy = {
  lead: copy("Portfolio overview sentence (C)"),
};

export const contactCopy = {
  lead: copy("Who should get in touch, and what happens after they do (G)"),
};
