/**
 * Campaign attribution: the utm_* tags on the link a visitor arrived from (e.g. a
 * LinkedIn post). Captured once per visit in the browser and attached to an enquiry,
 * so Arcaisys can see which campaign it came from. Tags describe the link, not the
 * person, and are never sent anywhere except with an enquiry the visitor submits.
 */

import { oneLine } from "./contact";

export const CAMPAIGN_STORAGE_KEY = "arcaisys-campaign";
export const CAMPAIGN_FIELD = "campaign";
export const CAMPAIGN_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export type Campaign = Partial<Record<(typeof CAMPAIGN_KEYS)[number], string>>;

/** Strict parse of the hidden form field: known keys only, short single-line values. */
export function parseCampaign(raw: unknown): Campaign | null {
  if (typeof raw !== "string" || !raw || raw.length > 600) return null;
  try {
    const data: unknown = JSON.parse(raw);
    if (!data || typeof data !== "object") return null;
    const out: Campaign = {};
    for (const key of CAMPAIGN_KEYS) {
      const value = (data as Record<string, unknown>)[key];
      if (typeof value === "string" && value.trim()) {
        out[key] = oneLine(value).slice(0, 100);
      }
    }
    return Object.keys(out).length ? out : null;
  } catch {
    return null;
  }
}

export function formatCampaign(campaign: Campaign) {
  return CAMPAIGN_KEYS.filter((key) => campaign[key])
    .map((key) => `${key.replace("utm_", "")}=${campaign[key]}`)
    .join(", ");
}
