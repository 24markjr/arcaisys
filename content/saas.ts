/**
 * How Arcaisys sells: its own products, by subscription (software as a service).
 * Written 2026-10-16. Arcaisys is a product company, not a development agency or
 * consultancy — keep every line here consistent with that.
 *
 * To confirm with Arcaisys before launch (docs/owner-checklist.md):
 * - billing periods (monthly and annual)
 * - what every subscription includes
 */

export const subscriptionModel = {
  summary: "Software as a service, by subscription",
  billing: "Billed monthly or annually",
  pricing: "Priced by product, modules and the size of your operation",
};

/** Four steps from first conversation to running on Arcaisys. */
export const subscriptionSteps = [
  {
    title: "Choose your product",
    body: "Pick the platform built for your industry and the modules your team needs.",
  },
  {
    title: "Get set up",
    body: "We configure your workspace and get every role, from the front desk to the owner, working on it.",
  },
  {
    title: "Run on one live system",
    body: "Everyone works from the same live record from day one. Nothing to install on servers, nothing to maintain.",
  },
  {
    title: "Improve automatically",
    body: "New features, fixes and security updates arrive continuously, included in your subscription.",
  },
];

/** Included with every subscription, across all products. */
export const subscriptionIncludes = [
  {
    title: "Hosting and maintenance",
    body: "We run, monitor and maintain the platform. Your team just uses it.",
  },
  {
    title: "Continuous updates",
    body: "Every improvement we ship reaches every subscriber, at no extra cost.",
  },
  {
    title: "Onboarding and support",
    body: "Help setting up, training for your team, and a person to talk to when you need one.",
  },
  {
    title: "Security built in",
    body: "Role-based access, encryption, tenant isolation and full audit trails as standard.",
  },
];

/** Questions buyers and reviewers ask. Also published as FAQPage structured data. */
export const faqs = [
  {
    question: "What does Arcaisys do?",
    answer:
      "Arcaisys is a product company. We design, build and operate our own AI-powered software platforms (RestoQR, PACS, Hospio and Meridian) and offer them to organisations by subscription.",
  },
  {
    question: "Do you take on custom development or consulting work?",
    answer:
      "No. We build and sell our own products only. Every customer subscribes to the same continuously improving platforms, configured for their organisation, which is how each product gets better for everyone.",
  },
  {
    question: "How is pricing structured?",
    answer:
      "Each product is a subscription, billed monthly or annually. The price depends on the product, the modules you choose and the size of your operation. Contact us for a quote.",
  },
  {
    question: "Which products can I use today?",
    answer:
      "RestoQR is live and open for subscription. PACS, Hospio and Meridian are in development, and organisations can register for early access now.",
  },
  {
    question: "Where do the products run?",
    answer:
      "Every product is delivered as a managed cloud service, so there is nothing to install or maintain. Organisations with stricter data requirements can discuss a private deployment.",
  },
];

export const pricingCopy = {
  headline: "Simple subscriptions. Software that keeps improving.",
  lead: "Every Arcaisys product is offered as a subscription, priced for the size of your operation, with hosting, updates and support included.",
};
