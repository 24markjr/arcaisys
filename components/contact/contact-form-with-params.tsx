"use client";

import { useSearchParams } from "next/navigation";
import { interestOptions } from "@/lib/contact";
import { ContactForm } from "./contact-form";

/** Reads ?interest=<slug> so product pages can pre-select the enquiry topic. */
export function ContactFormWithParams() {
  const requested = useSearchParams().get("interest");
  const valid = interestOptions.some((option) => option.value === requested);
  return <ContactForm defaultInterest={valid ? (requested ?? undefined) : undefined} />;
}
