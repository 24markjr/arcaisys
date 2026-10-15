// Motion checks against a running production server (default http://localhost:3000).
// Verifies: entrance completes, every revealable element ends visible after scrolling,
// reduced motion shows everything immediately, navigation + back/forward work, no errors.
// Usage: node scripts/test-motion.mjs [baseUrl] [screenshotDir]
import { chromium } from "playwright-core";

const [base = "http://localhost:3000", shots] = process.argv.slice(2);
const results = [];
const check = (name, ok, detail = "") => {
  results.push(ok);
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? " — " + detail : ""}`);
};
const browser = await chromium.launch({ channel: "chrome" });
const errors = [];
const watch = (page) => {
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
};

// Animated elements on the current page (Next keeps previous pages mounted but
// display:none for instant back navigation — those are skipped) that are still hidden.
const hiddenCount = (viewportOnly = false) =>
  [
    ...document.querySelectorAll(
      "[data-reveal]:not([data-reveal=stagger]), [data-reveal=stagger] > *, [data-reveal-lines], [data-ascent], [data-intro]",
    ),
  ].filter((el) => {
    if (!el.checkVisibility()) return false;
    if (viewportOnly && el.getBoundingClientRect().top > innerHeight) return false;
    const s = getComputedStyle(el);
    return s.visibility === "hidden" || Number(s.opacity) < 0.99;
  }).length;

async function scrollThrough(page) {
  await page.evaluate(async () => {
    for (let y = 0; y <= document.body.scrollHeight; y += 300) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
  });
  await page.waitForTimeout(1800);
}

// 1. Entrance sequence (frames for review) + completion
let page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
watch(page);
await page.goto(base + "/", { waitUntil: "commit" });
if (shots) {
  for (const t of [250, 700, 1300, 2600]) {
    await page.waitForTimeout(
      t === 250 ? 250 : t - [250, 700, 1300, 2600][[250, 700, 1300, 2600].indexOf(t) - 1],
    );
    await page.screenshot({ path: `${shots}/entrance-${t}ms.png` });
  }
} else await page.waitForTimeout(2600);
check(
  "motion-pending class removed after hydration",
  !(await page.evaluate(() => document.documentElement.classList.contains("motion-pending"))),
);
check(
  "hero headline animates in CSS (no JavaScript wait)",
  await page.evaluate(() => getComputedStyle(document.querySelector("h1")).animationName === "intro-unmask"),
);

for (const route of ["/", "/about", "/products", "/products/hospio", "/contact"]) {
  await page.goto(base + route, { waitUntil: "networkidle" });
  await scrollThrough(page);
  const left = await page.evaluate(hiddenCount);
  check(
    `${route}: every animated element visible after scrolling`,
    left === 0,
    left ? `${left} still hidden` : "",
  );
}

// 2. Navigation, view transition, back/forward
await page.goto(base + "/", { waitUntil: "networkidle" });
await page.click("header nav >> text=Products");
await page.waitForURL("**/products");
await page.waitForTimeout(1500);
check("nav link navigates (client-side)", page.url().endsWith("/products"));
check(
  "new page content above the fold visible after transition",
  (await page.evaluate(hiddenCount, true)) === 0,
);
await page.goBack();
await page.waitForURL(base + "/");
await page.waitForTimeout(1200);
check("browser back works", page.url() === base + "/");
check(
  "hero visible after going back",
  await page.evaluate(
    () =>
      Number(getComputedStyle(document.querySelector("h1")).opacity) === 1 &&
      getComputedStyle(document.querySelector("h1")).visibility === "visible",
  ),
);
await page.goForward();
await page.waitForURL("**/products");
check("browser forward works", page.url().endsWith("/products"));
await page.close();

// 2b. Keyboard: tabbing reaches links inside not-yet-revealed sections, and they become visible
page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
watch(page);
await page.goto(base + "/", { waitUntil: "networkidle" });
let reached = null;
for (let i = 0; i < 40 && !reached; i++) {
  await page.keyboard.press("Tab");
  reached = await page.evaluate(() => {
    const el = document.activeElement;
    return el?.closest("ol[data-reveal=stagger]") ? el.textContent.trim().slice(0, 30) : null;
  });
}
check("keyboard: Tab reaches product links below the fold", Boolean(reached), reached ?? "never focused");
await page.waitForTimeout(1500);
check(
  "keyboard: focused row is revealed",
  await page.evaluate(() => Number(getComputedStyle(document.activeElement.closest("li")).opacity) > 0.99),
);
await page.close();

// 3. Reduced motion: nothing hidden at any point, no transforms applied
page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
watch(page);
await page.goto(base + "/", { waitUntil: "commit" });
await page.waitForTimeout(150);
check(
  "reduced motion: no pending class",
  !(await page.evaluate(() => document.documentElement.classList.contains("motion-pending"))),
);
await page.waitForLoadState("networkidle");
check("reduced motion: everything visible without scrolling", (await page.evaluate(hiddenCount)) === 0);
check("reduced motion: headline not split", !(await page.evaluate(() => !!document.querySelector("h1 div"))));
if (shots) await page.screenshot({ path: `${shots}/reduced-motion.png` });
await page.close();

// 4. Mobile: no horizontal overflow after motion, menu still works
page = await browser.newPage({ viewport: { width: 390, height: 844 } });
watch(page);
await page.goto(base + "/", { waitUntil: "networkidle" });
await scrollThrough(page);
check(
  "mobile: no horizontal overflow with motion",
  (await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)) <= 0,
);
check("mobile: all animated elements visible", (await page.evaluate(hiddenCount)) === 0);
await page.close();

check("no console or page errors", errors.length === 0, [...new Set(errors)].join(" | "));
await browser.close();
console.log(`\n${results.filter(Boolean).length}/${results.length} passed`);
process.exit(results.every(Boolean) ? 0 : 1);
