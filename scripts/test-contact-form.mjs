// End-to-end tests for the contact form against the production build (run `npm run build` first).
// Starts two servers (email unconfigured, and configured against a local mock of the Resend API)
// and drives the form in the installed Chrome. Usage: npm run test:form
import { chromium } from "playwright-core";
import { createServer } from "node:http";
import { spawn } from "node:child_process";

const results = [];
const check = (name, ok, detail = "") => {
  results.push(ok);
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? " — " + detail : ""}`);
};

// Mock Resend: mode "ok" or "fail"
let mockMode = "ok";
const received = [];
const mock = createServer((req, res) => {
  let body = "";
  req.on("data", (c) => (body += c));
  req.on("end", () => {
    received.push({ auth: req.headers.authorization, body: JSON.parse(body) });
    res.writeHead(mockMode === "ok" ? 200 : 500, { "content-type": "application/json" });
    res.end(mockMode === "ok" ? '{"id":"x"}' : '{"error":"boom"}');
  });
}).listen(4010);

function startServer(port, env) {
  const p = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(port)], {
    env: { ...process.env, ...env },
    stdio: "ignore",
  });
  return p;
}
async function waitFor(url) {
  for (let i = 0; i < 60; i++) {
    try {
      await fetch(url);
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  throw new Error("server did not start");
}

async function fill(page) {
  await page.fill("#contact-name", "Test Person");
  await page.fill("#contact-email", "test@example.com");
  await page.fill("#contact-company", "Example Ltd");
  await page.selectOption("#contact-interest", "meridian");
  await page.fill("#contact-message", "I would like to learn more about Meridian for our team.");
}

const browser = await chromium.launch({ channel: "chrome" });

// ---------- A: email not configured ----------
const a = startServer(3201, { RESEND_API_KEY: "", CONTACT_TO_EMAIL: "", CONTACT_FROM_EMAIL: "" });
await waitFor("http://localhost:3201/contact");
let page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
let actionPosts = 0;
page.on("request", (r) => {
  if (r.method() === "POST" && r.headers()["next-action"]) actionPosts++;
});
await page.goto("http://localhost:3201/contact?interest=pacs", { waitUntil: "networkidle" });
check("?interest=pacs pre-selects PACS", (await page.inputValue("#contact-interest")) === "pacs");
await page.click("button[type=submit]");
const errs = await page.locator("[id$=-error]").allTextContents();
check("empty submit shows inline errors", errs.length === 3, errs.join(" | "));
check(
  "empty submit focuses first invalid field",
  (await page.evaluate(() => document.activeElement?.id)) === "contact-name",
);
check("empty submit does not reach the server", actionPosts === 0);
check(
  "invalid fields marked aria-invalid",
  (await page.getAttribute("#contact-name", "aria-invalid")) === "true",
);
await page.fill("#contact-email", "not-an-email");
await page.click("button[type=submit]");
check(
  "bad email shows email error",
  (await page.textContent("#contact-email-error"))?.includes("valid email"),
);
await page.fill("#contact-email", "ok@example.com");
check(
  "fixing a field clears its error while typing",
  (await page.locator("#contact-email-error").count()) === 0,
);
await fill(page);
await page.waitForTimeout(3200);
await page.click("button[type=submit]");
await page.waitForSelector("[data-contact-alert]");
const alertA = await page.textContent("[data-contact-alert]");
check(
  "unconfigured: honest 'not connected' error, no success",
  alertA.includes("not connected to email") && (await page.locator("[data-contact-success]").count()) === 0,
  alertA,
);
check(
  "unconfigured: typed values preserved",
  (await page.inputValue("#contact-message")).startsWith("I would like") &&
    (await page.inputValue("#contact-interest")) === "meridian",
);

// Header-injection attempt: a crafted request with a line break in the name must be
// rejected by server-side validation (browsers can't type one into the field).
await page.route("**/contact**", async (route) => {
  const req = route.request();
  if (req.method() === "POST" && req.headers()["next-action"]) {
    const body = req
      .postDataBuffer()
      .toString("latin1")
      .replace("Test Person", "Test Person\r\nBcc: attacker@example.com");
    return route.continue({ postData: Buffer.from(body, "latin1") });
  }
  return route.continue();
});
await page.waitForTimeout(3200);
await page.click("button[type=submit]");
await page.waitForSelector("#contact-name-error");
check(
  "line break in name rejected server-side (header injection)",
  (await page.textContent("#contact-name-error"))?.includes("one line"),
);
await page.unroute("**/contact**");
await page.close();
a.kill();

// ---------- B: email configured (mock) ----------
const b = startServer(3202, {
  RESEND_API_KEY: "re_test",
  CONTACT_TO_EMAIL: "team@example.com",
  CONTACT_FROM_EMAIL: "Website <web@example.com>",
  RESEND_API_URL: "http://localhost:4010/emails",
});
await waitFor("http://localhost:3202/contact");
page = await browser.newPage({ viewport: { width: 390, height: 844 } });
// Arrive from a tagged campaign link (e.g. a LinkedIn post): the tags must reach the email.
await page.goto("http://localhost:3202/contact?utm_source=linkedin&utm_medium=social&utm_campaign=launch", {
  waitUntil: "networkidle",
});
await fill(page);
await page.click("button[type=submit]"); // too fast: < 3s after load
await page.waitForSelector("[data-contact-alert]");
check(
  "submitting within 3s is rejected as a bot",
  (await page.textContent("[data-contact-alert]")).includes("could not be sent") && received.length === 0,
);
await page.waitForTimeout(3200);
await fill(page);
await page.click("button[type=submit]");
await page.waitForSelector("[data-contact-success]");
check("configured: success shown only after provider accepted", received.length === 1);
const sent = received[0]?.body;
check(
  "email payload correct",
  sent?.reply_to === "test@example.com" &&
    sent?.to?.[0] === "team@example.com" &&
    sent?.subject.includes("Meridian") &&
    sent?.text.includes("Example Ltd") &&
    received[0].auth === "Bearer re_test",
  sent?.subject,
);
check(
  "campaign tags from the landing link included in the email",
  sent?.text.includes("Campaign: source=linkedin, medium=social, campaign=launch"),
);
check(
  "focus moves to success heading",
  (await page.evaluate(() => document.activeElement?.tagName)) === "H2",
);
await page.click("text=Send another message");
check("'Send another' returns an empty form", (await page.inputValue("#contact-name")) === "");

// honeypot
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(3200);
await fill(page);
await page.evaluate(() => {
  document.querySelector("#website_url").value = "http://spam";
});
await page.click("button[type=submit]");
await page.waitForSelector("[data-contact-alert]");
check("honeypot filled: rejected, nothing sent", received.length === 1);

// provider failure
mockMode = "fail";
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(3200);
await fill(page);
await page.click("button[type=submit]");
await page.waitForSelector("[data-contact-alert]");
const alertB = await page.textContent("[data-contact-alert]");
check(
  "provider failure: error shown, not success",
  alertB.includes("problem on our side") && (await page.locator("[data-contact-success]").count()) === 0,
  alertB,
);

// rate limit: already 4 submissions from this IP in this server (bot, success, honeypot, fail) → 5th ok, 6th blocked
mockMode = "ok";
for (let i = 0; i < 2; i++) {
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(3200);
  await fill(page);
  await page.click("button[type=submit]");
  await page.waitForSelector("[data-contact-alert], [data-contact-success]");
}
check(
  "rate limit blocks the 6th message in 10 minutes",
  (await page.textContent("[data-contact-alert]"))?.includes("Too many messages"),
);
await page.close();
b.kill();

await browser.close();
mock.close();
console.log(`\n${results.filter(Boolean).length}/${results.length} passed`);
process.exit(results.every(Boolean) ? 0 : 1);
