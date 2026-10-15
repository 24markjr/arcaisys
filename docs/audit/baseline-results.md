# Phase 1 — Baseline results

_Commit `7953ae9`, production build (`next build` + `next start`), local machine, Chrome via
Playwright, 2026-10-15. Lighthouse 12.8.2 with default throttling (mobile = simulated slow 4G,
4× CPU). Local numbers exclude real network/CDN effects; re-measure on the deployed site in
Phase 10._

## Lighthouse

| Page     | Form    | Perf | A11y | BP  | SEO* | FCP    | LCP    | TBT   | CLS | JS (KB) | Total (KB) |
| -------- | ------- | ---- | ---- | --- | ---- | ------ | ------ | ----- | --- | ------- | ---------- |
| Home     | mobile  | 94   | 100  | 100 | 69   | 0.91 s | 3.00 s | 90 ms | 0   | 235     | 376        |
| About    | mobile  | 96   | 100  | 100 | 69   | 0.76 s | 2.78 s | 40 ms | 0   | 202     | 307        |
| Products | mobile  | 93   | 100  | 100 | 69   | 0.76 s | 3.20 s | 46 ms | 0   | 202     | 380        |
| Hospio   | mobile  | 95   | 100  | 100 | 69   | 0.76 s | 2.86 s | 50 ms | 0   | 235     | 369        |
| RestoQR† | mobile  | 94   | 100  | 100 | 69   | 0.76 s | 2.97 s | —     | 0   | 235     | 378        |
| Contact  | mobile  | 95   | 100  | 100 | 69   | 0.76 s | 3.00 s | 30 ms | 0   | 235     | 339        |
| Privacy  | mobile  | 96   | 100  | 100 | 69   | 0.76 s | 2.83 s | 58 ms | 0   | 202     | 304        |
| Home     | desktop | 100  | 100  | 100 | 69   | 0.25 s | 0.68 s | 0 ms  | 0   | 235     | 371        |
| About    | desktop | 100  | 100  | 100 | 69   | 0.21 s | 0.63 s | 0 ms  | 0   | 235     | 350        |
| Products | desktop | 100  | 100  | 100 | 69   | 0.22 s | 0.78 s | 0 ms  | 0   | 235     | 429        |
| Hospio   | desktop | 100  | 100  | 100 | 69   | 0.21 s | 0.64 s | 0 ms  | 0   | 235     | 372        |
| RestoQR  | desktop | 100  | 100  | 100 | 69   | 0.21 s | 0.64 s | 0 ms  | 0   | 235     | 381        |
| Contact  | desktop | 100  | 100  | 100 | 69   | 0.21 s | 0.64 s | 0 ms  | 0   | 235     | 350        |
| Privacy  | desktop | 100  | 100  | 100 | 69   | 0.21 s | 0.62 s | 0 ms  | 0   | 235     | 365        |

\* SEO 69 = only `is-crawlable` fails, by design until `SITE_INDEXABLE=true`.
† First RestoQR run showed FCP 2.03 s; a re-run gave 0.76 s — treated as measurement noise.

**Mobile LCP breakdown (home):** TTFB ~0.45 s, then ~2.5 s render delay on the headline.
Removing all entrance animation (experiment, Phase 7 of the build) changed LCP by only ~0.2 s;
the delay is font download under simulated slow 4G. Fonts: 2 × woff2 (23.1 KB, 24.5 KB).
Largest scripts: 70.9 KB (framework), 49.5 KB (GSAP + plugins), 35.8 KB, 33.7 KB (contact form,
prefetched).

## Automated and end-to-end suites

| Suite                                                            | Result                                                                                  |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `npm run check` (TypeScript, ESLint, Prettier)                   | Pass                                                                                    |
| `npm run build`                                                  | Pass — 0 warnings; all pages static/prerendered                                         |
| `npm run audit:browser` (axe + structure + links + privacy)      | 0 axe violations; 0 structure issues; 16 links OK; no cookies, storage or third parties |
| `npm run test:form`                                              | 17/17                                                                                   |
| `scripts/test-motion.mjs`                                        | 20/20                                                                                   |
| `scripts/screenshot.mjs` (10 pages × 360/390/768/1024/1440/1920) | 60/60, no overflow, no broken images, no console errors                                 |
| `npm run content:audit`                                          | 52 missing, 9 drafts                                                                    |

## Security checks

| Check                                                                                                      | Result                                                                                                                             |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Secret patterns in full git history (`re_…`, `sk_…`, AWS keys, private keys, password/api-key assignments) | None                                                                                                                               |
| Env files tracked by git                                                                                   | `.env.example` only                                                                                                                |
| Server secrets / env names in `.next/static` client bundles                                                | None                                                                                                                               |
| `npm audit --omit=dev`                                                                                     | 0 vulnerabilities                                                                                                                  |
| `npm audit` (incl. dev)                                                                                    | 5 high, all `braces` → `micromatch` → `fast-glob` → `eslint-config-next` (dev only)                                                |
| Server action replay, same origin                                                                          | 200, executed                                                                                                                      |
| Server action replay, `Origin: https://evil.example`                                                       | 500, **not executed**                                                                                                              |
| Response headers                                                                                           | HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy present; **CSP absent**; `X-Powered-By` removed |
| Unknown product slug                                                                                       | HTTP 200 + noindex (F-10)                                                                                                          |

## How to reproduce

```bash
npm run build && npm run start          # terminal 1 (port 3000)
npm run check
npm run audit:browser -- http://localhost:3000
npm run test:form
node scripts/test-motion.mjs http://localhost:3000
WIDTHS=360,390,768,1024,1440,1920 node scripts/screenshot.mjs http://localhost:3000 screenshots
npx lighthouse@12.8.2 http://localhost:3000/ --form-factor=mobile --view
```
