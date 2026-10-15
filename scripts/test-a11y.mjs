// WCAG 2.2 AA checks that automated scanners (axe) don't cover. Production server required.
// Usage: node scripts/test-a11y.mjs [baseUrl] [snapshotDir]
//   snapshotDir (optional): writes each page's accessibility tree, as a screen reader sees it.
import { chromium } from "playwright-core";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [base = "http://localhost:3000", snapshotDir] = process.argv.slice(2);
const routes = [
  "/",
  "/about",
  "/products",
  "/products/hospio",
  "/contact",
  "/privacy",
  "/terms",
  "/missing-page",
];
const results = [];
const check = (name, ok, detail = "") => {
  results.push(Boolean(ok));
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? " — " + detail : ""}`);
};
if (snapshotDir) mkdirSync(snapshotDir, { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });
const titles = new Map();

for (const theme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  await ctx.addInitScript((t) => sessionStorage.setItem("arcaisys-theme", t), theme);
  const page = await ctx.newPage();

  for (const route of routes) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    const where = `${route} [${theme}]`;

    if (theme === "light") {
      // Document basics and landmarks (WCAG 2.4.2, 3.1.1, 1.3.1)
      const doc = await page.evaluate(() => ({
        lang: document.documentElement.lang,
        title: document.title,
        main: document.querySelectorAll("main").length,
        banner: document.querySelectorAll("body > header, [role=banner]").length,
        footer: document.querySelectorAll("body > footer, [role=contentinfo]").length,
        unlabelledNavs: [...document.querySelectorAll("nav")].filter(
          (n) => n.checkVisibility() && !n.getAttribute("aria-label") && !n.getAttribute("aria-labelledby"),
        ).length,
      }));
      check(
        `${route}: lang, title, one main/header/footer, labelled navs`,
        doc.lang === "en" &&
          doc.title &&
          doc.main === 1 &&
          doc.banner === 1 &&
          doc.footer === 1 &&
          doc.unlabelledNavs === 0,
        JSON.stringify(doc),
      );
      if (route !== "/missing-page") titles.set(doc.title, (titles.get(doc.title) ?? 0) + 1);
      if (snapshotDir) {
        const tree = await page.locator("body").ariaSnapshot();
        writeFileSync(
          join(snapshotDir, `${route === "/" ? "home" : route.slice(1).replaceAll("/", "_")}.yml`),
          tree,
        );
      }
    }

    // Keyboard pass (WCAG 2.1.1, 2.1.2, 2.4.3, 2.4.7, 2.4.11)
    await page.evaluate(() => {
      window.scrollTo(0, 0);
      document.querySelectorAll("[data-a11y-seen]").forEach((el) => el.removeAttribute("data-a11y-seen"));
    });
    await page.locator("body").click({ position: { x: 1, y: 1 } });
    const stops = [];
    for (let i = 0; i < 80; i++) {
      await page.keyboard.press("Tab");
      await page.waitForTimeout(40);
      const info = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;
        const s = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        const header = document.querySelector("[data-site-header]")?.getBoundingClientRect();
        const inHeader = !!el.closest("[data-site-header]");
        const hiddenAncestor = (() => {
          for (let n = el; n; n = n.parentElement) {
            const cs = getComputedStyle(n);
            if (
              cs.visibility === "hidden" ||
              Number(cs.opacity) === 0 ||
              n.getAttribute("aria-hidden") === "true"
            )
              return true;
          }
          return false;
        })();
        const seen = el.hasAttribute("data-a11y-seen");
        el.setAttribute("data-a11y-seen", "");
        return {
          seen,
          label: (el.getAttribute("aria-label") || el.textContent || el.tagName).trim().slice(0, 40),
          indicator:
            (s.outlineStyle !== "none" && parseFloat(s.outlineWidth) >= 2) ||
            (s.boxShadow && s.boxShadow !== "none") ||
            el.matches("input,select,textarea"),
          obscured: !inHeader && header ? r.top < header.bottom - 2 && r.bottom > 0 : false,
          hidden: hiddenAncestor,
          offscreen: r.width === 0 || r.height === 0,
        };
      });
      if (!info) break;
      if (info.seen) break; // wrapped round to an element already visited
      stops.push(info);
    }
    const noIndicator = stops.filter((s) => !s.indicator && !s.offscreen).map((s) => s.label);
    const obscured = stops.filter((s) => s.obscured).map((s) => s.label);
    const hidden = stops.filter((s) => s.hidden).map((s) => s.label);
    check(
      `${where}: ${stops.length} focus stops all show a focus indicator`,
      noIndicator.length === 0,
      noIndicator.join(" | "),
    );
    check(
      `${where}: no focused element hidden behind the sticky header`,
      obscured.length === 0,
      obscured.join(" | "),
    );
    check(`${where}: no focus on hidden content`, hidden.length === 0, hidden.join(" | "));
    check(
      `${where}: keyboard reaches the footer (no trap)`,
      stops.some((s) => /Privacy|Terms/.test(s.label)),
    );
  }
  await ctx.close();
}

const duplicateTitles = [...titles].filter(([, n]) => n > 1).map(([t]) => t);
check("every page has a unique title", duplicateTitles.length === 0, duplicateTitles.join(" | "));

// Skip link (WCAG 2.4.1)
let page = await browser.newPage();
await page.goto(base + "/about", { waitUntil: "networkidle" });
await page.keyboard.press("Tab");
const first = await page.evaluate(() => document.activeElement?.textContent?.trim());
await page.keyboard.press("Enter");
await page.waitForTimeout(200);
check(
  "first Tab is the skip link, and it moves focus to main",
  first === "Skip to content" && (await page.evaluate(() => document.activeElement?.id)) === "main",
  first,
);
await page.close();

// Reflow at 320 CSS px = 400% zoom on a 1280px screen (WCAG 1.4.10)
page = await browser.newPage({ viewport: { width: 320, height: 640 } });
const overflow = [];
for (const route of routes) {
  await page.goto(base + route, { waitUntil: "networkidle" });
  const o = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  if (o > 0) overflow.push(`${route} +${o}px`);
}
check("reflow: no horizontal scrolling at 320px", overflow.length === 0, overflow.join(", "));

// Text spacing overrides (WCAG 1.4.12): nothing overflows its line or the page
const spaced = [];
for (const route of routes) {
  await page.goto(base + route, { waitUntil: "networkidle" });
  await page.addStyleTag({
    content:
      "*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}p{margin-bottom:2em!important}",
  });
  await page.waitForTimeout(200);
  const res = await page.evaluate(() => {
    const pageOverflow = document.documentElement.scrollWidth - innerWidth;
    const clipped = [...document.querySelectorAll("h1,h2,h3,p,a,button,label,li")]
      .filter(
        (el) =>
          el.checkVisibility() &&
          !el.classList.contains("sr-only") &&
          !el.closest(".sr-only") &&
          el.scrollWidth > el.clientWidth + 2 &&
          getComputedStyle(el).overflow !== "visible",
      )
      .map((el) => el.textContent.trim().slice(0, 30));
    return { pageOverflow, clipped };
  });
  if (res.pageOverflow > 0 || res.clipped.length)
    spaced.push(`${route}: +${res.pageOverflow}px ${res.clipped.join(" | ")}`);
}
check("text spacing overrides: no clipping or overflow at 320px", spaced.length === 0, spaced.join("; "));
await page.close();

await browser.close();
console.log(`\n${results.filter(Boolean).length}/${results.length} passed`);
process.exit(results.every(Boolean) ? 0 : 1);
