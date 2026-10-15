// Baseline browser audit (Phase 1). Run against a production server:
//   npm run build && npm run start   (then, in another terminal)
//   node scripts/audit/browser-audit.mjs http://localhost:3000 [outFile.json]
//
// For every public route, at phone and desktop widths:
// - axe-core accessibility scan (WCAG 2.0/2.1/2.2 A + AA rules), after scrolling so
//   scroll-revealed content is in its final state
// - heading outline, image alt text, empty links/buttons
// - every internal link resolves (HTTP 200); tel:/mailto: links well-formed
// - cookies, localStorage/sessionStorage and third-party requests (privacy inventory)
// - console errors
import { chromium } from "playwright-core";
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");

const [base = "http://localhost:3000", outFile] = process.argv.slice(2);
const routes = [
  "/",
  "/about",
  "/products",
  "/products/hospio",
  "/products/meridian",
  "/products/pacs",
  "/products/restoqr",
  "/contact",
  "/privacy",
  "/terms",
  "/missing-page",
];
const widths = [390, 1440];
const origin = new URL(base).origin;

const report = { base, generatedAt: new Date().toISOString(), pages: [], links: {}, privacy: {} };
const thirdParty = new Set();
const internalLinks = new Set();

const browser = await chromium.launch({ channel: "chrome" });
const context = await browser.newContext();
// THEME=dark|light audits that theme (stored choice set before any page script runs).
if (process.env.THEME) {
  await context.addInitScript((t) => sessionStorage.setItem("arcaisys-theme", t), process.env.THEME);
}

for (const width of widths) {
  for (const route of routes) {
    const page = await context.newPage();
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on("console", (m) => {
      if (m.type() === "error" && !(route === "/missing-page" && m.text().includes("404")))
        errors.push(m.text());
    });
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("request", (r) => {
      const u = new URL(r.url());
      if (u.origin !== origin && !u.protocol.startsWith("data")) thirdParty.add(u.origin);
    });

    await page.goto(base + route, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      for (let y = 0; y <= document.body.scrollHeight; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1600);

    await page.addScriptTag({ content: axeSource });
    const axe = await page.evaluate(async () => {
      // @ts-expect-error injected global
      const result = await window.axe.run(document, {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"],
        },
      });
      return result.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        help: v.help,
        nodes: v.nodes.length,
        targets: v.nodes.slice(0, 4).map((n) => n.target.join(" ")),
      }));
    });

    const structure = await page.evaluate(() => {
      const visible = (el) => el.checkVisibility();
      const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")]
        .filter(visible)
        .map((h) => ({ level: Number(h.tagName[1]), text: h.textContent.trim().slice(0, 60) }));
      const skips = [];
      headings.forEach((h, i) => {
        if (i > 0 && h.level > headings[i - 1].level + 1)
          skips.push(`${headings[i - 1].level}→${h.level} at "${h.text}"`);
      });
      const imgsNoAlt = [...document.images].filter((i) => !i.hasAttribute("alt")).map((i) => i.src);
      const emptyControls = [...document.querySelectorAll("a,button")]
        .filter(visible)
        .filter(
          (el) =>
            !(
              el.textContent.trim() ||
              el.getAttribute("aria-label") ||
              el.querySelector("img[alt]:not([alt=''])")
            ),
        )
        .map((el) => el.outerHTML.slice(0, 120));
      const links = [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href"));
      return {
        h1Count: headings.filter((h) => h.level === 1).length,
        headingSkips: skips,
        imgsNoAlt,
        emptyControls,
        links,
        pending: document.querySelectorAll(".pending").length,
        wireframes: [...document.querySelectorAll("p")].filter((p) =>
          /— text required|Primary screenshot/.test(p.textContent),
        ).length,
      };
    });
    structure.links.forEach((href) => {
      if (href.startsWith("/")) internalLinks.add(href.split("#")[0]);
      else if (/^(tel|mailto):/.test(href)) internalLinks.add(href);
    });

    report.pages.push({
      route,
      width,
      axe,
      h1Count: structure.h1Count,
      headingSkips: structure.headingSkips,
      imgsNoAlt: structure.imgsNoAlt,
      emptyControls: structure.emptyControls,
      pendingMarkers: structure.pending,
      consoleErrors: [...new Set(errors)],
    });
    await page.close();
  }
}

// Storage / cookies after visiting everything
const storagePage = await context.newPage();
await storagePage.goto(base + "/", { waitUntil: "networkidle" });
report.privacy = {
  cookies: (await context.cookies()).map((c) => ({ name: c.name, domain: c.domain, httpOnly: c.httpOnly })),
  localStorage: await storagePage.evaluate(() => Object.keys(localStorage)),
  sessionStorage: await storagePage.evaluate(() => Object.keys(sessionStorage)),
  thirdPartyOrigins: [...thirdParty],
};
await browser.close();

// Link check
for (const href of internalLinks) {
  if (href.startsWith("tel:"))
    report.links[href] = /^tel:\+\d{8,15}$/.test(href) ? "ok (format)" : "BAD FORMAT";
  else if (href.startsWith("mailto:"))
    report.links[href] = /^mailto:[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(href) ? "ok (format)" : "BAD FORMAT";
  else {
    const res = await fetch(base + href, { redirect: "manual" });
    report.links[href] = res.status;
  }
}

if (outFile) writeFileSync(outFile, JSON.stringify(report, null, 2));

// Console summary
const byRule = new Map();
for (const p of report.pages) {
  for (const v of p.axe) {
    const key = `${v.impact} ${v.id}`;
    const entry = byRule.get(key) ?? { help: v.help, where: new Set(), nodes: 0, sample: v.targets[0] };
    entry.where.add(`${p.route}@${p.width}`);
    entry.nodes += v.nodes;
    byRule.set(key, entry);
  }
}
console.log(`\naxe violations (${byRule.size} rules)`);
for (const [k, v] of byRule)
  console.log(`  ${k}: ${v.help} — ${v.nodes} nodes on ${[...v.where].join(", ")} — e.g. ${v.sample}`);
for (const p of report.pages) {
  const issues = [];
  if (p.h1Count !== 1) issues.push(`h1 count ${p.h1Count}`);
  if (p.headingSkips.length) issues.push(`heading skips: ${p.headingSkips.join("; ")}`);
  if (p.imgsNoAlt.length) issues.push(`imgs without alt: ${p.imgsNoAlt.length}`);
  if (p.emptyControls.length) issues.push(`unnamed controls: ${p.emptyControls.join(" | ")}`);
  if (p.consoleErrors.length) issues.push(`console: ${p.consoleErrors.join(" | ")}`);
  if (issues.length) console.log(`  ${p.route}@${p.width}: ${issues.join(" · ")}`);
}
console.log(
  `\npending markers per page: ${report.pages
    .filter((p) => p.width === 1440)
    .map((p) => `${p.route}=${p.pendingMarkers}`)
    .join(", ")}`,
);
const badLinks = Object.entries(report.links).filter(([, s]) => s !== 200 && !String(s).startsWith("ok"));
console.log(
  `links checked: ${Object.keys(report.links).length}; problems: ${badLinks.length ? JSON.stringify(badLinks) : "none"}`,
);
console.log(
  `privacy: cookies=${JSON.stringify(report.privacy.cookies)} localStorage=${JSON.stringify(report.privacy.localStorage)} sessionStorage=${JSON.stringify(report.privacy.sessionStorage)} thirdParty=${JSON.stringify(report.privacy.thirdPartyOrigins)}`,
);
