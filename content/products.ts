import type { Product } from "./types";

/**
 * Product portfolio, in the order shown on the site.
 * Written 2026-10-15 from Arcaisys's product brief. Screenshots are still to come —
 * add them to `screenshots` (see docs/content-guide.md).
 */
export const products: Product[] = [
  {
    slug: "restoqr",
    name: "RestoQR",
    tagline: "Scan. Order. Serve. Grow.",
    headline: "The operating system for the modern restaurant.",
    sector: "Hospitality",
    category: "Restaurant operations",
    summary:
      "A complete restaurant operating system that unites guests, floor staff, kitchen crews and owners on one real-time, multi-tenant platform. Guests order from a QR code at the table, the kitchen sees tickets instantly, staff run the floor, and owners watch the business live.",
    audience: "Restaurants, cafés, cloud kitchens, food courts and multi-outlet dining chains.",
    problem:
      "During a rush, orders are shouted, re-keyed and lost between the table, the pass and the till. Owners see the night's numbers only after it is over. RestoQR replaces those hand-offs with one live system that every role works from.",
    capabilitiesHeading: "Five apps. One live restaurant.",
    capabilities: [
      {
        title: "TableOS — the guest's menu",
        body: "Zero-install QR menus: guests browse, order, add items mid-meal, call staff and view the live bill from their own phone.",
      },
      {
        title: "KitchenOS — the kitchen display",
        body: "Tickets arrive the moment a guest orders, move from preparing to ready with a tap, and add-ons are acknowledged on the line. Native app for busy kitchens.",
      },
      {
        title: "WaiterOS — the floor in your pocket",
        body: "Instant table alerts, service requests and a ping the second food is ready, so no table waits unnoticed.",
      },
      {
        title: "StaffOS — tables, sessions and payments",
        body: "Floor managers assign tables, open and close sessions, enter orders on a guest's behalf and settle bills.",
      },
      {
        title: "OwnerOS — the business at a glance",
        body: "Live revenue analytics, menu and pricing, inventory, a floor-plan designer and printable table QR codes.",
      },
    ],
    status: "live",
    externalUrl: "https://platform.restoqr-arcaisys.com",
    screenshots: [],
    logo: { src: "/brand/restoqr-logo.png", width: 933, height: 724, alt: "RestoQR" },
    logoReversed: null, // needs a redraw first (docs/audit/findings.md F-11)
    symbol: null,
    tile: null,
    accent: "#FC6C00",
    confirmed: true,
  },
  {
    slug: "pacs",
    name: "PACS",
    tagline: "Capture. Store. View. Report.",
    headline: "Imaging infrastructure for modern diagnostics.",
    sector: "Healthcare",
    category: "Medical imaging",
    summary:
      "A browser-based picture archiving and communication system that connects imaging equipment, radiologists, referring physicians and patients through a single, secure imaging workflow.",
    audience: "Diagnostic imaging centres, hospitals, radiology chains and teleradiology providers.",
    problem:
      "Studies sit on scanner workstations, reports travel by courier and CD, and referring doctors wait. PACS moves every study from the modality to the radiologist, the physician and the patient — securely, in the browser.",
    capabilitiesHeading: "From scanner to report.",
    capabilities: [
      {
        title: "Direct modality ingestion",
        body: "Receives studies over DICOM directly from CT, MRI, X-ray and ultrasound equipment.",
      },
      {
        title: "Zero-install diagnostic viewer",
        body: "Diagnostic-grade viewing in the browser for radiologists and referring doctors — no proprietary workstation required.",
      },
      {
        title: "Radiology workflow",
        body: "Structured worklists, standardised report templates and digital sign-off.",
      },
      {
        title: "Patient portal",
        body: "Secure, direct patient access to studies and reports, replacing burned CDs and physical pick-ups.",
      },
      {
        title: "Security and compliance",
        body: "Granular role-based access, end-to-end encryption and a complete audit trail of every access.",
      },
    ],
    status: "in-development",
    externalUrl: null,
    screenshots: [],
    logo: { src: "/brand/pacs-logo.png", width: 1200, height: 878, alt: "PACS" },
    logoReversed: { src: "/brand/pacs-logo-reversed.png", width: 1200, height: 878, alt: "PACS" },
    symbol: { src: "/brand/pacs-symbol.png", width: 594, height: 594, alt: "" },
    tile: { src: "/brand/pacs-tile.png", width: 512, height: 512, alt: "" },
    accent: "#F6721E",
    confirmed: true,
  },
  {
    slug: "hospio",
    name: "Hospio",
    tagline: "Admit. Care. Heal.",
    headline: "The operating system for the modern hospital.",
    sector: "Healthcare",
    category: "Hospital management",
    summary:
      "An AI-assisted hospital management system that brings clinical care, beds, billing and operations into one synchronised record — so care teams spend less time on paperwork and more time with patients.",
    audience: "Multi-specialty hospitals, nursing homes, clinics and healthcare networks.",
    problem:
      "Admissions run on phone calls, bed status lives on a whiteboard, and a patient's history is split across departments. Hospio gives every team the same live picture, from registration to discharge.",
    capabilitiesHeading: "One record, admission to discharge.",
    capabilities: [
      {
        title: "Unified patient record",
        body: "One timeline across registrations, visits, prescriptions, lab tests and imaging.",
      },
      {
        title: "Live bed and ward logistics",
        body: "Real-time occupancy across wards, so admissions, transfers and discharges happen without manual phone coordination.",
      },
      {
        title: "Front desk to final bill",
        body: "Smooth hand-offs from appointment check-in and insurance pre-authorisation through to settlement.",
      },
      {
        title: "AI clinical support",
        body: "Visit summaries, triage risk indicators and admission forecasting — always with a physician in the loop.",
      },
      {
        title: "Built-in imaging",
        body: "Two-way link with Arcaisys PACS, so scans and radiology impressions appear inside the patient's chart.",
      },
    ],
    status: "in-development",
    externalUrl: null,
    screenshots: [],
    logo: { src: "/brand/hospio-logo.png", width: 1200, height: 1011, alt: "Hospio" },
    logoReversed: { src: "/brand/hospio-logo-reversed.png", width: 1200, height: 1011, alt: "Hospio" },
    symbol: { src: "/brand/hospio-symbol.png", width: 640, height: 503, alt: "" },
    tile: { src: "/brand/hospio-tile.png", width: 512, height: 512, alt: "" },
    accent: "#CC1E30",
    confirmed: true,
  },
  {
    slug: "meridian",
    name: "Meridian",
    tagline: "Ask. Verify. Trust.",
    headline: "AI engineering answers you can verify.",
    sector: "Software engineering",
    category: "Developer tools",
    summary:
      "An evidence-grounded AI engineering assistant. Meridian answers questions about your codebase, then checks every claim against the code, dependency manifests, database schema and live runtime telemetry before you read it.",
    audience:
      "Software engineering teams, platform and SRE engineers, AI-assisted developers and code reviewers.",
    problem:
      "AI coding assistants answer confidently, even when they are wrong — and a plausible but false answer about your own system is expensive. Meridian refuses to guess: every claim is grounded in evidence or clearly marked.",
    capabilitiesHeading: "Answers with evidence.",
    capabilities: [
      {
        title: "Deterministic verification",
        body: "Claims about functions, API routes, schemas and dependencies are checked against the code's syntax tree and package manifests — not against another model.",
      },
      {
        title: "Three strict verdicts",
        body: "Every claim is Grounded, Refuted or Unverifiable. Meridian never presents a guess as an answer.",
      },
      {
        title: "Runtime awareness",
        body: "Reads OpenTelemetry traces to confirm latency, detect N+1 queries and surface real production bottlenecks.",
      },
      {
        title: "Impact and ownership",
        body: "Shows exactly what breaks when a signature or package changes, and who owns the affected code.",
      },
      {
        title: "Works with your AI tools",
        body: "An MCP server exposes Meridian's verification tools to agents such as Claude and Cursor.",
      },
      {
        title: "Local-first and private",
        body: "Runs on the developer's machine with no third-party cloud dependency — proprietary code never leaves it.",
      },
    ],
    status: "in-development",
    externalUrl: null,
    screenshots: [],
    logo: { src: "/brand/meridian-logo.png", width: 1200, height: 949, alt: "Meridian" },
    logoReversed: { src: "/brand/meridian-logo-reversed.png", width: 1200, height: 949, alt: "Meridian" },
    symbol: { src: "/brand/meridian-symbol.png", width: 592, height: 592, alt: "" },
    tile: { src: "/brand/meridian-tile.png", width: 512, height: 512, alt: "" },
    accent: "#EA541E",
    confirmed: true,
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
