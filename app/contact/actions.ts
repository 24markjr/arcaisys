"use server";

import { headers } from "next/headers";
import {
  HONEYPOT_FIELD,
  MIN_FILL_MS,
  STARTED_FIELD,
  interestLabel,
  readValues,
  validateContact,
  type ContactState,
} from "@/lib/contact";
import { sendEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { siteConfig } from "@/lib/site";
import { companyFacts } from "@/content/company";

const fallback = companyFacts.contactEmail
  ? `Please email us directly at ${companyFacts.contactEmail}.`
  : "Please try again later.";

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = readValues(formData);

  // Rate limit first, so spam attempts count towards it too.
  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "unknown";
  if (!rateLimit(`contact:${ip}`, 5, 10 * 60 * 1000)) {
    return {
      status: "error",
      message: "Too many messages from this connection. Please wait a few minutes and try again.",
      values,
    };
  }

  // Spam checks. Failures get a plain error, never a fake success.
  const honeypot = String(formData.get(HONEYPOT_FIELD) ?? "");
  const startedAt = Number(formData.get(STARTED_FIELD) ?? 0);
  if (honeypot || (startedAt && Date.now() - startedAt < MIN_FILL_MS)) {
    return { status: "error", message: `Your message could not be sent. ${fallback}`, values };
  }

  const result = validateContact(values);
  if (!result.ok) return { status: "invalid", errors: result.errors, values };

  const { name, email, company, interest, message } = result.data;
  const sent = await sendEmail({
    subject: `Website enquiry — ${interestLabel(interest)} — ${name}`,
    replyTo: email,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || "—"}`,
      `Interest: ${interestLabel(interest)}`,
      "",
      message,
      "",
      `— Sent from the contact form at ${siteConfig.url}/contact`,
    ].join("\n"),
  });

  if (!sent.ok) {
    return {
      status: "error",
      message:
        sent.reason === "not-configured"
          ? `The contact form is not connected to email yet, so your message was not sent. ${fallback}`
          : `Your message could not be sent because of a problem on our side. ${fallback}`,
      values,
    };
  }

  return { status: "sent" };
}
