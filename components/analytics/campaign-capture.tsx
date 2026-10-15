"use client";

import { useEffect } from "react";
import { CAMPAIGN_KEYS, CAMPAIGN_STORAGE_KEY } from "@/lib/campaign";

/**
 * Remembers the utm_* tags of the link a visitor arrived from, for this visit only
 * (sessionStorage). The first tagged landing wins. Renders nothing.
 */
export function CampaignCapture() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(CAMPAIGN_STORAGE_KEY)) return;
      const params = new URLSearchParams(window.location.search);
      const tags = Object.fromEntries(
        CAMPAIGN_KEYS.flatMap((key) => {
          const value = params.get(key);
          return value ? [[key, value.slice(0, 100)]] : [];
        }),
      );
      if (Object.keys(tags).length) sessionStorage.setItem(CAMPAIGN_STORAGE_KEY, JSON.stringify(tags));
    } catch {
      // Storage unavailable: attribution is simply skipped.
    }
  }, []);
  return null;
}
