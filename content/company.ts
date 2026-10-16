import type { CopyField } from "./types";

/**
 * Every piece of company copy on the site, in one place.
 *
 * - `text: null`              → nothing supplied yet; the site shows a striped "Pending" marker.
 * - `text: "…", approved: false` → a draft; shown striped until Arcaisys approves it.
 * - `text: "…", approved: true`  → final; shown as normal copy.
 *
 * Copy below was written on 2026-10-15 from Arcaisys's company brief (motto, philosophy,
 * pillars, capabilities, products). Run `npm run content:audit` to list remaining gaps.
 */
function copy(need: string, text: string | null = null, approved = false): CopyField {
  return { need, text, approved };
}
const final = (need: string, text: string) => copy(need, text, true);

/** Company facts. null = not yet supplied (shown as Pending). */
export const companyFacts = {
  legalName: "Arcaisys Private Limited" as string | null,
  founded: "4 March 2026" as string | null,
  /** ISO form of the founding date, for structured data. */
  foundedIso: "2026-03-04",
  location: "Mumbai, India" as string | null,
  markets: "India and international",
  contactEmail: "pm.teams@arcaisys.com" as string | null,
  /** Shown as written; `phoneHref` is the dialable form. */
  phone: "+91 91378 15600" as string | null,
  phoneHref: "tel:+919137815600",
  /** Postal address, one line per entry. */
  address: ["G1603, Samarth Garden", "Bhandup (W)", "Mumbai 400078", "Maharashtra, India"] as string[] | null,
  /** Same address, structured for search engines (keep in sync with `address`). */
  postalAddress: {
    streetAddress: "G1603, Samarth Garden, Bhandup (W)",
    addressLocality: "Mumbai",
    postalCode: "400078",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  /** WhatsApp Business number, digits only with country code. */
  whatsapp: "919137815600" as string | null,
  /** Approximate office coordinates (Bhandup West, Mumbai) for the studio line. */
  coordinates: "19.14° N, 72.94° E",
  timeZone: "Asia/Kolkata",
  /** Business hours and expected response time — not supplied; nothing is shown until set. */
  hours: null as string | null,
  linkedin: "https://www.linkedin.com/company/arcaisys-private-limited" as string | null,
};

/** The company's lines, as they appear across the site. */
export const brand = {
  /** Motto — the homepage headline and the site's default title. */
  motto: "Intelligent software, built for the real world.",
  /** Brand tagline in the product family's style (Admit. Care. Heal. / Ask. Verify. Trust.). */
  tagline: "Understand. Build. Verify.",
  statement: "We don't just build software. We build systems that run the real world.",
  principle: "If we can't verify it, we don't ship it.",
};

export const homeCopy = {
  heroHeadline: final("Hero headline", brand.motto),
  heroLead: final(
    "Value proposition",
    "Arcaisys builds and runs AI-powered software platforms for hospitality, healthcare and software engineering, delivered by subscription and dependable enough for work that can't stop.",
  ),
  introHeading: final("Company statement", brand.statement),
  intro: final(
    "Why the company exists",
    "Restaurants, hospitals and engineering teams still run on disconnected tools, manual hand-offs and software that was never designed for the pressure of a real shift. Adding a chatbot doesn't fix that. We start with the workflow, build one dependable system around the people who run it, and add AI only where it saves real time or catches real mistakes.",
  ),
  portfolioIntro: final(
    "Portfolio introduction",
    "Four subscription platforms, each built for one industry's real workflow, with AI only where it earns its place.",
  ),
  capabilitiesHeading: "One platform beneath every product.",
  capabilitiesIntro: final(
    "Capabilities introduction",
    "Every Arcaisys product runs on the same foundation, so every subscriber gets the same reliability, security and intelligence, whichever product they use.",
  ),
  approachHeading: "Practical by design. Intelligent by default.",
  approachIntro: final(
    "Approach introduction",
    "Understand the work deeply, build the system around the people doing it, then let AI multiply what they can do.",
  ),
  principles: [
    {
      title: final("Principle 1", "Start on the floor"),
      body: final(
        "Principle 1 body",
        "We spend time where the work happens — the kitchen pass, the reading room, the ward desk, the code review — before we design a single screen.",
      ),
    },
    {
      title: final("Principle 2", "Design the whole system"),
      body: final(
        "Principle 2 body",
        "Every role gets a purpose-built tool, all sharing one source of truth, so information moves without re-keying and nothing falls between hand-offs.",
      ),
    },
    {
      title: final("Principle 3", "Add AI where it earns its place"),
      body: final(
        "Principle 3 body",
        "Intelligence goes where it saves real time or catches real mistakes — and its output is checked against real data, never trusted blindly.",
      ),
    },
    {
      title: final("Principle 4", "Ship, measure, improve"),
      body: final(
        "Principle 4 body",
        "We release early, watch how the product performs in production, and keep refining it with the people who depend on it.",
      ),
    },
  ],
  ctaLine: final(
    "Closing call to action",
    "See RestoQR in action, ask about subscription pricing, or register for early access to PACS, Hospio and Meridian.",
  ),
  footerDescriptor: final(
    "Footer descriptor",
    "AI-powered SaaS platforms for hospitality, healthcare and software engineering.",
  ),
};

/** The shared platform every Arcaisys product runs on. */
export const capabilities = [
  {
    title: "AI inside the workflow",
    body: "Forecasting, summaries, triage and verification built into the screens people already use, not bolted on as a chat box.",
  },
  {
    title: "Verified intelligence",
    body: "AI output is checked against real data, live telemetry and the code itself before anyone acts on it. Confidence is earned, not assumed.",
  },
  {
    title: "Real-time by default",
    body: "Sub-second synchronisation for high-pressure environments — kitchens at rush hour, scanning suites mid-study, wards mid-shift.",
  },
  {
    title: "Every role, every device",
    body: "Browser apps for the desk, native apps for staff on the move and a control panel for owners, all on one live record.",
  },
  {
    title: "Secure multi-tenant cloud",
    body: "Role-based access, encryption, tenant isolation and complete audit trails as standard, ready for sensitive, regulated data.",
  },
  {
    title: "Managed for you",
    body: "We host, monitor and update every product, so subscribers have nothing to install or maintain. Private deployment is available for those who need it.",
  },
];

/** Core pillars and values. */
export const pillars = [
  {
    title: "Innovation with purpose",
    body: "We experiment constantly, then ship only what makes someone's working day measurably faster or better.",
  },
  {
    title: "Real-world impact",
    body: "Faster table turns, quicker radiology reports, smoother ward flow, safer codebases. We judge ourselves by outcomes, not demos.",
  },
  {
    title: "Reliability and trust",
    body: "Our software runs critical operations, so it is built to be secure, auditable and transparent about what it knows — and what it doesn't.",
  },
];

/** Industries Arcaisys serves, and the products in each. */
export const sectors = [
  {
    name: final("Sector", "Hospitality"),
    description: final(
      "Hospitality",
      "One live system for guests, floor staff, kitchens and owners — so service keeps pace with a full house.",
    ),
    products: ["restoqr"],
  },
  {
    name: final("Sector", "Healthcare"),
    description: final(
      "Healthcare",
      "Connected hospital and imaging infrastructure, so clinicians spend less time chasing records and more time with patients.",
    ),
    products: ["hospio", "pacs"],
  },
  {
    name: final("Sector", "Software engineering"),
    description: final(
      "Software engineering",
      "AI assistance engineers can trust, because every answer is checked against the codebase before it is shown.",
    ),
    products: ["meridian"],
  },
];

export const aboutCopy = {
  headline: final("About headline", "Software for work that can't stop."),
  lead: final(
    "About lead",
    "Arcaisys is a product company. We build and run AI-powered software platforms, offered by subscription, for industries where work has to run on time, every time.",
  ),
  origin: final(
    "Why Arcaisys exists",
    "Critical operations deserve better than disconnected tools and AI demos.",
  ),
  story: final(
    "Company story",
    "Arcaisys began with a simple observation: the industries that most need dependable software are often served by tools that are fragmented, dated or built for a slide deck rather than a shift. Staff re-enter the same information in three places, managers learn about problems too late, and new AI features add risk instead of removing it.",
  ),
  story2: final(
    "Company story, second paragraph",
    "We build the other way round. Each product starts from the real workflow, unites every role on one live system, and uses AI only where its output can be verified. It is why our core principle is simple: if we can't verify it, we don't ship it.",
  ),
  direction: final(
    "Direction",
    "RestoQR is live today. Our focus now is to grow its subscriber base, and to bring PACS, Hospio and Meridian from development into production, held to the same standard of verification, for customers across India and internationally.",
  ),
  model: final(
    "Business model",
    "We build and run our own products; we don't take on custom development or consulting work. Every customer subscribes to the same continuously improving platforms, configured for their organisation, so every improvement reaches everyone.",
  ),
};

export const productsCopy = {
  lead: final(
    "Products lead",
    "Four subscription platforms across hospitality, healthcare and software engineering, each built around one industry's real workflow.",
  ),
};

export const contactCopy = {
  lead: final(
    "Contact lead",
    "Book a RestoQR demo, ask about subscription pricing, or register for early access to PACS, Hospio or Meridian. A member of our team will reply personally.",
  ),
};
