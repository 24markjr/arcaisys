import { z } from "zod";
import { products } from "@/content/products";

/**
 * Contact form schema — shared by the client (instant feedback) and the
 * server action (the authoritative check).
 */

export const interestOptions = [
  ...products.map((product) => ({ value: product.slug, label: product.name })),
  { value: "pricing", label: "Pricing and subscriptions" },
  { value: "early-access", label: "Early access" },
  { value: "partnership", label: "Partnerships" },
  { value: "general", label: "Something else" },
] as const;

const interestValues = interestOptions.map((option) => option.value) as [string, ...string[]];

/**
 * Single-line fields (name, company) must not contain line breaks or other control
 * characters: they end up in the email subject, where a line break could be used to
 * inject extra mail headers. Browsers can't type them into a one-line input, so this
 * only rejects crafted requests. (docs/audit/findings.md F-07)
 */
const SINGLE_LINE = /^[^\p{Cc}\u2028\u2029]*$/u;

/** Collapse any control characters to spaces — a second guard for header values. */
export function oneLine(value: string) {
  return value.replace(/[\p{Cc}\u2028\u2029]+/gu, " ").trim();
}

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(120, "Please shorten your name.")
    .regex(SINGLE_LINE, "Please enter your name on one line."),
  email: z
    .string()
    .trim()
    .max(200, "Please use a shorter email address.")
    .pipe(z.email("Please enter a valid email address.")),
  company: z
    .string()
    .trim()
    .max(160, "Please shorten the company name.")
    .regex(SINGLE_LINE, "Please enter the company name on one line.")
    .optional()
    .default(""),
  interest: z.enum(interestValues, "Please choose what you would like to discuss."),
  message: z
    .string()
    .trim()
    .min(20, "Please add a little more detail (at least 20 characters).")
    .max(5000, "Please keep the message under 5,000 characters."),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;

export type ContactState =
  | { status: "idle" }
  | {
      status: "invalid";
      errors: Partial<Record<ContactField, string>>;
      values: Partial<Record<ContactField, string>>;
    }
  | { status: "error"; message: string; values: Partial<Record<ContactField, string>> }
  | { status: "sent" };

export const fieldNames: ContactField[] = ["name", "email", "company", "interest", "message"];

/** Spam-trap field. Named to look plausible to bots, hidden from people. */
export const HONEYPOT_FIELD = "website_url";
/** Hidden timestamp set when the form mounts; submissions faster than this are bots. */
export const STARTED_FIELD = "started_at";
export const MIN_FILL_MS = 3000;

export function readValues(formData: FormData) {
  return Object.fromEntries(fieldNames.map((name) => [name, String(formData.get(name) ?? "")])) as Record<
    ContactField,
    string
  >;
}

export function validateContact(values: Record<ContactField, string>) {
  const result = contactSchema.safeParse(values);
  if (result.success) return { ok: true as const, data: result.data };
  const errors: Partial<Record<ContactField, string>> = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as ContactField | undefined;
    if (field && !errors[field]) errors[field] = issue.message;
  }
  return { ok: false as const, errors };
}

export function interestLabel(value: string) {
  return interestOptions.find((option) => option.value === value)?.label ?? value;
}
