// Security checks against a production build.
// Usage: node scripts/test-security.mjs [baseUrl]   (server must be running; default :3000)
// Starts its own isolated server (email unconfigured) for the server-action checks.
import { execFileSync, spawn } from "node:child_process";
import { chromium } from "playwright-core";

const base = process.argv[2] ?? "http://localhost:3000";
const results = [];
const check = (name, ok, detail = "") => {
  results.push(Boolean(ok));
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? " — " + detail : ""}`);
};

// 1. Headers on pages, generated routes and static assets
const required = {
  "content-security-policy": (v) =>
    [
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "default-src 'self'",
    ].every((d) => v.includes(d)),
  "strict-transport-security": (v) => v.includes("max-age="),
  "x-content-type-options": (v) => v === "nosniff",
  "x-frame-options": (v) => v === "DENY",
  "referrer-policy": (v) => v === "strict-origin-when-cross-origin",
  "permissions-policy": (v) => v.includes("camera=()"),
  "cross-origin-opener-policy": (v) => v === "same-origin",
};
for (const path of ["/", "/contact", "/products/hospio", "/sitemap.xml", "/opengraph-image"]) {
  const res = await fetch(base + path);
  const missing = Object.entries(required)
    .filter(([h, ok]) => !ok(res.headers.get(h) ?? ""))
    .map(([h]) => h);
  check(`headers on ${path}`, res.ok && missing.length === 0, missing.join(", "));
  if (path === "/") check("no X-Powered-By header", !res.headers.has("x-powered-by"));
}

// 2. Server actions: foreign origin refused, no internals leaked
const srv = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", "3206"], {
  env: { ...process.env, RESEND_API_KEY: "", CONTACT_TO_EMAIL: "", CONTACT_FROM_EMAIL: "" },
  stdio: "ignore",
});
for (let i = 0; i < 60; i++) {
  try {
    await fetch("http://localhost:3206/contact");
    break;
  } catch {
    await new Promise((r) => setTimeout(r, 500));
  }
}
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage();
let captured;
page.on("request", (r) => {
  if (r.method() === "POST" && r.headers()["next-action"])
    captured = { url: r.url(), headers: r.headers(), body: r.postDataBuffer() };
});
await page.goto("http://localhost:3206/contact", { waitUntil: "networkidle" });
await page.fill("#contact-name", "Security Test");
await page.fill("#contact-email", "security@example.com");
await page.selectOption("#contact-interest", "general");
await page.fill("#contact-message", "Automated security check — not a real enquiry.");
await page.waitForTimeout(3200);
await page.click("button[type=submit]");
await page.waitForSelector("[data-contact-alert]");
await browser.close();
const headers = { ...captured.headers, origin: "https://evil.example" };
delete headers["content-length"];
const forged = await fetch(captured.url, { method: "POST", headers, body: captured.body });
const forgedBody = await forged.text();
check("forged-origin server action refused", !forgedBody.includes("not connected"), `HTTP ${forged.status}`);
check(
  "error response leaks no internals",
  !/node_modules|[A-Z]:\\|\/home\/|at .*\(.*:\d+:\d+\)|RESEND|stack/i.test(forgedBody),
);
srv.kill();

// 3. Repository contains no secrets
try {
  execFileSync(process.execPath, ["scripts/check-secrets.mjs", "--all"], { stdio: "pipe" });
  check("no secrets in tracked files", true);
} catch (e) {
  check("no secrets in tracked files", false, String(e.stderr));
}

console.log(`\n${results.filter(Boolean).length}/${results.length} passed`);
process.exit(results.every(Boolean) ? 0 : 1);
