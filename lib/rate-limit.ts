import "server-only";

/**
 * Best-effort, in-memory rate limiter (fixed window per key).
 *
 * Limits are per server instance: on serverless hosting each instance keeps its
 * own counts, so this slows abuse rather than guaranteeing a global cap. Swap in
 * a shared store (e.g. Upstash Redis) if the form is ever targeted.
 */
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
    }
    return true;
  }
  entry.count += 1;
  return entry.count <= limit;
}
