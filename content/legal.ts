import type { CopyField } from "./types";

/**
 * Privacy policy and terms of use — DRAFTS written from how this website actually
 * works (docs/audit/data-inventory.md). Not legal advice: both must be reviewed by
 * a qualified lawyer before launch. Set `reviewed: true` only after that review.
 *
 * Text may contain {tokens}. Company facts ({legalName}, {contactEmail}, {address})
 * come from content/company.ts; the rest are defined in `legalTerms` below, where
 * unconfirmed values are drafts and render as striped Pending markers.
 */

function term(need: string, text: string | null = null, approved = false): CopyField {
  return { need, text, approved };
}

export const legalTerms = {
  retention: term(
    "Enquiry retention period (decision D5 — proposed, needs confirmation)",
    "24 months after our last correspondence with you",
  ),
  // The site is deployed on Vercel (arcaisys-mu.vercel.app, 2026-10-15). Confirm it stays the host.
  hosting: term("Confirm Vercel remains the production host", "Vercel"),
  // Confirmed 2026-10-15: arcaisys.com mail is hosted by Hostinger (public MX records).
  mailbox: term("Provider of the pm.teams@arcaisys.com mailbox", "Hostinger", true),
  responseTime: term("Time to respond to data requests (legal review)", "within 30 days"),
  grievance: term(
    "Named grievance officer or team for DPDP purposes (legal review)",
    "the Arcaisys team at the email address above",
  ),
  jurisdiction: term("Courts with jurisdiction (legal review)", "the courts at Mumbai, Maharashtra"),
} satisfies Record<string, CopyField>;

export type LegalSection = {
  heading: string;
  /** Paragraphs before the list (or the whole body when there is no list). */
  paragraphs?: string[];
  items?: string[];
  /** Paragraphs after the list. */
  after?: string[];
};

export type LegalDocument = {
  title: string;
  /** ISO date this text was last changed. */
  lastUpdated: string;
  /** ISO date it takes effect — set at launch. */
  effectiveDate: string | null;
  /** Only true after review by a qualified lawyer. */
  reviewed: boolean;
  intro: string[];
  sections: LegalSection[];
};

export const privacyPolicy: LegalDocument = {
  title: "Privacy policy",
  lastUpdated: "2026-10-15",
  effectiveDate: null,
  reviewed: false,
  intro: [
    "This policy explains what personal data the Arcaisys website collects, why, who receives it, how long it is kept, and the rights you have. It is written for India's Digital Personal Data Protection Act, 2023.",
  ],
  sections: [
    {
      heading: "Who we are",
      paragraphs: [
        "This website, arcaisys.com, is operated by {legalName} (“Arcaisys”, “we”, “us”), {address}. For anything in this policy, contact us at {contactEmail}.",
        "This policy covers this website only. Our products (Hospio, Meridian, PACS and RestoQR) are governed by their own agreements and policies.",
      ],
    },
    {
      heading: "What we collect, and why",
      items: [
        "When you use the enquiry form: your name, business email, company (optional), the topic you choose and your message. We use these only to read and reply to your enquiry. You provide them voluntarily for that purpose.",
        "When you email, phone or message us on WhatsApp: the details you send, used only to reply.",
        "When you visit any page: like every website, our hosting provider receives your IP address and basic browser information in order to deliver pages and protect the service. To stop abuse of the enquiry form, we keep your IP address in server memory for up to 10 minutes.",
      ],
      after: [
        "To understand how the website is used, we use Vercel Web Analytics and Vercel Speed Insights. They count page visits and measure how fast pages load, without cookies and without identifying you; we see only aggregated figures.",
        "If you reach us through a link carrying campaign tags (for example from one of our LinkedIn posts), those tags are added to your enquiry so we know which campaign brought you. They describe the link, not you.",
        "We do not use cookies, advertising or cross-site tracking, and you do not need an account. If you switch to the dark theme, that choice is kept in your browser for your current visit only and is never sent to us.",
        "We do not sell your data, and we do not add you to any mailing list.",
      ],
    },
    {
      heading: "Who receives it",
      items: [
        "Resend, which delivers enquiry-form messages to our inbox on our behalf.",
        "{hosting}, which runs this website and provides the analytics described above.",
        "{mailbox}, which hosts the inbox where we read and answer your messages.",
        "WhatsApp (Meta), if you choose to contact us there — under WhatsApp's own privacy policy.",
      ],
      after: [
        "Each processes your data only to provide its service to us. We will disclose data to authorities only where the law requires it.",
      ],
    },
    {
      heading: "Where it is processed",
      paragraphs: [
        "Some of these providers process data outside India, including in the United States. We use them only where such transfers are permitted under Indian law.",
      ],
    },
    {
      heading: "How long we keep it",
      paragraphs: [
        "We keep enquiries and our replies for {retention}, then delete them — unless the law requires us to keep them longer, or your enquiry leads to a business relationship, in which case the relevant agreement applies.",
      ],
    },
    {
      heading: "How we protect it",
      paragraphs: [
        "The website is served only over encrypted connections (HTTPS). Form submissions are validated and rate-limited, and access to enquiries is limited to the people who handle them. No method of transmission or storage is completely secure, but we take reasonable measures to protect your data.",
      ],
    },
    {
      heading: "Your rights",
      paragraphs: ["Under the Digital Personal Data Protection Act, 2023, you can ask us to:"],
      items: [
        "tell you what personal data we hold about you and how we use it;",
        "correct, complete or update it;",
        "erase it;",
        "withdraw your consent — as easily as you gave it;",
        "address a grievance about how we handle your data;",
        "and you may nominate someone to exercise these rights for you if you are unable to.",
      ],
    },
    {
      heading: "How to make a request",
      paragraphs: [
        "Email {contactEmail} with the subject “Data request”. We may ask you to confirm your identity so that we never disclose someone else's data. We aim to respond {responseTime}.",
        "Grievances are handled by {grievance}. If you are not satisfied with our response, you may complain to the Data Protection Board of India.",
      ],
    },
    {
      heading: "Children",
      paragraphs: [
        "This website is intended for businesses and is not directed at children. We do not knowingly collect data from anyone under 18; if you believe we have, contact us and we will delete it.",
      ],
    },
    {
      heading: "Changes to this policy",
      paragraphs: [
        "If we change how we handle personal data, we will update this policy first and change the “last updated” date above.",
      ],
    },
  ],
};

export const termsOfUse: LegalDocument = {
  title: "Terms of use",
  lastUpdated: "2026-10-16",
  effectiveDate: null,
  reviewed: false,
  intro: [
    "These terms apply to your use of arcaisys.com, operated by {legalName}. By using the website you accept them. If you do not agree, please do not use the site.",
  ],
  sections: [
    {
      heading: "Using this website",
      items: [
        "Use the website lawfully and only for its intended purpose: learning about Arcaisys and its products and contacting us.",
        "Do not attempt to disrupt, overload or gain unauthorised access to the website or its systems.",
        "Do not send automated or bulk submissions through the enquiry form.",
      ],
    },
    {
      heading: "Content, names and logos",
      paragraphs: [
        "The content and design of this website, and the names and logos of Arcaisys, Hospio, Meridian, PACS and RestoQR, belong to Arcaisys or its licensors. You may view and share pages for personal or internal business purposes, but you may not copy, modify or use them commercially without our written permission.",
      ],
    },
    {
      heading: "Information on this website",
      paragraphs: [
        "The website describes Arcaisys and its products for general information. It is not an offer or a contract. Product features and availability may change.",
      ],
    },
    {
      heading: "Our products and subscriptions",
      paragraphs: [
        "Arcaisys products (RestoQR, PACS, Hospio and Meridian) are provided as software as a service, on a subscription basis. They are not sold as licences or as custom development.",
      ],
      items: [
        "Use of a product is governed by the subscription agreement or order form for that product, together with any product terms accepted in the product itself. Where those differ from these terms, they take precedence for the product.",
        "Subscriptions are billed in advance for the agreed period, monthly or annually, at the price stated in your order. Taxes are charged as applicable.",
        "Unless your agreement says otherwise, a subscription renews automatically for the same period until cancelled before the renewal date. Cancellation takes effect at the end of the paid period.",
        "We host, maintain and update the products. Updates are included in the subscription and may change or improve features over time.",
        "You remain responsible for the data you put into a product and for the people you give access to it. We process that data only to provide the service, as set out in your agreement.",
        "Products described as “in development” or offered as “early access” are not yet generally available. Registering interest does not create a subscription or any obligation for either party.",
      ],
    },
    {
      heading: "Links to other services",
      paragraphs: [
        "Some links take you to services we do not control, such as WhatsApp. Their own terms and policies apply, and we are not responsible for them.",
      ],
    },
    {
      heading: "No warranty and limitation of liability",
      paragraphs: [
        "We work to keep the website accurate and available, but provide it “as is”, without warranties, to the extent permitted by law. To the extent permitted by law, we are not liable for any loss arising from your use of the website.",
      ],
    },
    {
      heading: "Privacy",
      paragraphs: ["How we handle personal data is explained in our privacy policy."],
    },
    {
      heading: "Governing law",
      paragraphs: [
        "These terms are governed by the laws of India. Disputes are subject to the exclusive jurisdiction of {jurisdiction}.",
      ],
    },
    {
      heading: "Changes and contact",
      paragraphs: [
        "We may update these terms and will change the “last updated” date above when we do. Questions: {contactEmail}.",
      ],
    },
  ],
};
