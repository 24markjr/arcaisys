import "server-only";

/**
 * Email delivery through Resend's HTTP API (https://resend.com/docs/api-reference/emails/send-email).
 * Called directly with fetch — no SDK dependency. Server-only: the API key never reaches the browser.
 */

type Email = {
  subject: string;
  text: string;
  replyTo: string;
};

export type SendResult = { ok: true } | { ok: false; reason: "not-configured" | "provider-error" };

export function emailConfigured() {
  return Boolean(
    process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL,
  );
}

export async function sendEmail({ subject, text, replyTo }: Email): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) return { ok: false, reason: "not-configured" };

  try {
    // RESEND_API_URL is only overridden in tests (pointing at a local mock).
    const endpoint = process.env.RESEND_API_URL ?? "https://api.resend.com/emails";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((address) => address.trim()),
        subject,
        text,
        reply_to: replyTo,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error("[contact] Resend rejected the email", response.status, await response.text());
      return { ok: false, reason: "provider-error" };
    }
    return { ok: true };
  } catch (error) {
    console.error("[contact] Email request failed", error);
    return { ok: false, reason: "provider-error" };
  }
}
