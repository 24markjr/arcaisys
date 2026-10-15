import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arcaisys.com";

/**
 * Content-Security-Policy.
 *
 * Scripts: 'self' + 'unsafe-inline'. Tested 2026-10-15: a strict hash-based policy
 * (with experimental SRI) blocks the inline scripts Next.js emits to hydrate
 * prerendered pages, and nonces would force every page to render per request.
 * The site renders no user-supplied HTML and its own inline scripts are fixed
 * strings, so the remaining XSS exposure is low; everything else below is strict.
 * Revisit if Next.js ships hash support for its inline scripts.
 * (docs/audit/findings.md F-06)
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  // Only on the real HTTPS site — it would break local production testing over http.
  ...(siteUrl.startsWith("https://") ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const isExport = process.env.OUTPUT_EXPORT?.trim() === "true";

const nextConfig: NextConfig = {
  ...(isExport ? { output: "export" } : { cacheComponents: true, partialPrefetching: true }),
  poweredByHeader: false,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  images: isExport
    ? { unoptimized: true }
    : {
        formats: ["image/avif", "image/webp"],
      },
  ...(!isExport && {
    async headers() {
      return [{ source: "/:path*", headers: securityHeaders }];
    },
  }),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
