// Visual QA: full-page screenshots of each route at several widths, using the
// locally installed Chrome (no browser download). Also reports horizontal overflow.
// Usage: node scripts/screenshot.mjs <baseUrl> <outDir> [route ...]
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const [base = "http://localhost:3000", out = "screenshots", ...args] = process.argv.slice(2);
const routes = args.length
  ? args
  : ["/", "/about", "/products", "/products/hospio", "/contact", "/styleguide", "/privacy", "/missing-page"];
const widths = (process.env.WIDTHS ?? "390,768,1440").split(",").map(Number);

mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
let failures = 0;
for (const width of widths) {
  const page = await browser.newPage({
    viewport: { width, height: 900 },
    reducedMotion: process.env.REDUCED ? "reduce" : "no-preference",
  });
  // THEME=dark|light pre-sets the stored theme choice before any page script runs.
  if (process.env.THEME) {
    await page.addInitScript((t) => sessionStorage.setItem("arcaisys-theme", t), process.env.THEME);
  }
  const errors = [];
  let current = "";
  page.on("pageerror", (e) => errors.push(`${current}: ${e.message}`));
  page.on("console", (m) => {
    // The 404 test route's own document 404 is expected.
    if (m.type() === "error" && !(current === "/missing-page" && m.text().includes("404"))) {
      errors.push(`${current}: ${m.text()}`);
    }
  });
  for (const route of routes) {
    current = route;
    await page.goto(base + route, { waitUntil: "networkidle" });
    // Scroll through the page so lazy-loaded images below the fold load before capture.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight / 2) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForLoadState("networkidle");
    const broken = await page.evaluate(() =>
      [...document.images].filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.src),
    );
    if (broken.length) {
      failures += broken.length;
      console.log(`  broken images on ${route}: ${broken.join(", ")}`);
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    const name = `${route === "/" ? "home" : route.slice(1).replaceAll("/", "_")}-${width}${process.env.THEME ? `-${process.env.THEME}` : ""}.png`;
    await page.screenshot({ path: join(out, name), fullPage: true });
    const status = overflow > 0 ? `OVERFLOW ${overflow}px` : "ok";
    if (overflow > 0) failures++;
    console.log(`${String(width).padStart(4)} ${route.padEnd(20)} ${status}`);
  }
  if (errors.length) {
    failures += errors.length;
    console.log(`console errors at ${width}px:\n  ${[...new Set(errors)].join("\n  ")}`);
  }
  await page.close();
}
await browser.close();
process.exit(failures ? 1 : 0);
