// Phase 2–3 feature checks against a running production server.
// Usage: node scripts/test-features.mjs [baseUrl]   (default http://localhost:3000)
import { chromium } from "playwright-core";

const base = process.argv[2] ?? "http://localhost:3000";
const results = [];
const check = (name, ok, detail = "") => {
  results.push(Boolean(ok));
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? " — " + detail : ""}`);
};
const browser = await chromium.launch({ channel: "chrome" });
const errors = [];
const watch = (page) => {
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
};

// ---- Theme ----------------------------------------------------------------
// 1. Light by default even when the device is set to dark (owner decision).
let ctx = await browser.newContext({ colorScheme: "dark" });
let page = await ctx.newPage();
watch(page);
await page.addInitScript(() => {
  document.addEventListener("DOMContentLoaded", () => {
    window.__themeAtDomReady = document.documentElement.dataset.theme;
  });
});
await page.goto(base + "/", { waitUntil: "networkidle" });
check(
  "device set to dark → site still light before first paint",
  (await page.evaluate(() => window.__themeAtDomReady)) === "light",
);
check(
  "light surface actually applied",
  (await page.evaluate(() => getComputedStyle(document.body).backgroundColor)) === "rgb(255, 255, 255)",
);

// 2. Toggle, aria-pressed, persistence across reload.
const toggle = page.locator("header nav button[aria-pressed]");
await toggle.click();
await page.waitForTimeout(400);
check(
  "toggle switches to dark",
  (await page.evaluate(() => document.documentElement.dataset.theme)) === "dark",
);
check("toggle reports aria-pressed=true", (await toggle.getAttribute("aria-pressed")) === "true");
await page.reload({ waitUntil: "networkidle" });
check("choice persists after reload", (await page.evaluate(() => window.__themeAtDomReady)) === "dark");
check(
  "dark surface actually applied",
  (await page.evaluate(() => getComputedStyle(document.body).backgroundColor)) === "rgb(11, 17, 25)",
);
await toggle.click();
await page.waitForTimeout(400);
await page.reload({ waitUntil: "networkidle" });
check("switching back to light persists", (await page.evaluate(() => window.__themeAtDomReady)) === "light");
await toggle.click();
await page.waitForTimeout(400);
// A new visit (fresh tab/session) must open in light even after choosing dark.
const visit2 = await ctx.newPage();
await visit2.goto(base + "/", { waitUntil: "networkidle" });
check(
  "a new visit always opens in light",
  (await visit2.evaluate(() => document.documentElement.dataset.theme)) === "light",
);
await visit2.close();
// A preference saved by the old version (localStorage) is ignored and cleared.
await page.evaluate(() => localStorage.setItem("arcaisys-theme", "dark"));
const visit3 = await ctx.newPage();
await visit3.goto(base + "/", { waitUntil: "networkidle" });
check(
  "old saved dark preference ignored and cleared",
  (await visit3.evaluate(() => document.documentElement.dataset.theme)) === "light" &&
    (await visit3.evaluate(() => localStorage.getItem("arcaisys-theme"))) === null,
);
await visit3.close();
await ctx.close();

// 4. Storage blocked: toggle still works for the visit.
ctx = await browser.newContext();
page = await ctx.newPage();
watch(page);
await page.addInitScript(() => {
  Object.defineProperty(window, "sessionStorage", {
    get() {
      throw new Error("blocked");
    },
  });
});
await page.goto(base + "/", { waitUntil: "networkidle" });
await page.locator("header nav button[aria-pressed]").click();
await page.waitForTimeout(400);
check(
  "toggle works with storage blocked",
  (await page.evaluate(() => document.documentElement.dataset.theme)) === "dark",
);
await ctx.close();

// ---- Contact features ---------------------------------------------------------
ctx = await browser.newContext({ permissions: ["clipboard-read", "clipboard-write"] });
page = await ctx.newPage();
watch(page);
await page.goto(base + "/contact", { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Copy email address" }).click();
check(
  "copy email → clipboard",
  (await page.evaluate(() => navigator.clipboard.readText())) === "pm.teams@arcaisys.com",
);
check(
  "copy confirmation announced",
  (await page.locator("[role=status]").first().textContent()) === "Copied",
);
await page.getByRole("button", { name: "Copy phone number" }).click();
check(
  "copy phone → clipboard",
  (await page.evaluate(() => navigator.clipboard.readText())) === "+919137815600",
);

const wa = page.locator("main a[href^='https://wa.me/']");
check(
  "WhatsApp link correct and opens safely",
  (await wa.getAttribute("href")) === "https://wa.me/919137815600" &&
    (await wa.getAttribute("target")) === "_blank" &&
    (await wa.getAttribute("rel"))?.includes("noopener"),
);

const expected = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Kolkata",
}).format(new Date());
const shown = await page.locator("main time").textContent();
check("studio clock shows current IST", shown === expected, `${shown} vs ${expected}`);
await ctx.close();

// ---- Back to top, scroll progress, print ------------------------------------
page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
watch(page);
await page.goto(base + "/", { waitUntil: "networkidle" });
const btt = page.getByRole("button", { name: "Back to top", includeHidden: true });
check(
  "back-to-top hidden and unfocusable at the top",
  (await btt.getAttribute("aria-hidden")) === "true" && (await btt.getAttribute("tabindex")) === "-1",
);
const scaleAt = async (y) => {
  await page.evaluate((top) => window.scrollTo(0, top), y);
  await page.waitForTimeout(300);
  return page.evaluate(
    () => new DOMMatrix(getComputedStyle(document.querySelector(".scroll-progress")).transform).a,
  );
};
const s1 = await scaleAt(0);
const s2 = await scaleAt(3000);
check("scroll progress grows with scroll", s2 > s1 + 0.2, `${s1.toFixed(2)} → ${s2.toFixed(2)}`);
check("back-to-top appears after scrolling", (await btt.getAttribute("aria-hidden")) === "false");
await btt.click();
await page.waitForTimeout(1500);
check("back-to-top returns to top", (await page.evaluate(() => window.scrollY)) < 5);
check("focus moved to main content", (await page.evaluate(() => document.activeElement?.id)) === "main");

await page.emulateMedia({ media: "print" });
check(
  "print hides header and footer",
  await page.evaluate(
    () =>
      getComputedStyle(document.querySelector("[data-site-header]")).display === "none" &&
      getComputedStyle(document.querySelector("footer")).display === "none",
  ),
);
await page.emulateMedia({ media: "screen" });
check(
  "no Meta verification tag unless configured",
  (await page.locator("meta[name='facebook-domain-verification']").count()) === 0,
);
await page.close();

check("no console or page errors", errors.length === 0, [...new Set(errors)].join(" | "));
await browser.close();
console.log(`\n${results.filter(Boolean).length}/${results.length} passed`);
process.exit(results.every(Boolean) ? 0 : 1);
