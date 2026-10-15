# Phase 0 — Discovery

_Audit of commit `7953ae9`, 2026-10-15. No code was changed in this phase._

## What the site is

Corporate website for **Arcaisys**, a Mumbai-based software company with four products
(Hospio, Meridian, PACS, RestoQR). Purpose: present the company and products to clients and
investors, and capture enquiries. **No** logins, payments, shop, user accounts or database.

## Architecture

| Area       | Implementation                                                                                                                                     |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework  | Next.js 16.4.1 (App Router, Cache Components, Partial Prefetching, Turbopack), React 19.3                                                          |
| Language   | TypeScript 5.9, strict (+ `noUncheckedIndexedAccess`)                                                                                              |
| Styling    | Tailwind CSS v4, CSS-first tokens in `app/globals.css`                                                                                             |
| Motion     | GSAP 3.15 (ScrollTrigger, SplitText, DrawSVG) via `@gsap/react`; CSS for opening sequence, hovers, menu; React `<ViewTransition>` for page changes |
| Icons      | lucide-react                                                                                                                                       |
| Validation | Zod 4 (shared client/server)                                                                                                                       |
| Email      | Resend HTTP API via `fetch` (no SDK) — `lib/email.ts`                                                                                              |
| Fonts      | Manrope + Geist Mono via `next/font` (self-hosted); Manrope WOFF in `assets/fonts` for OG images                                                   |
| Hosting    | Not yet deployed. Vercel recommended (`docs/deployment.md`)                                                                                        |
| Repository | github.com/24markjr/arcaisys (`main`)                                                                                                              |

## Routes

| Route                                                  | Rendering                       | Notes                                                    |
| ------------------------------------------------------ | ------------------------------- | -------------------------------------------------------- |
| `/`                                                    | Static                          | Hero, company, portfolio, approach, sectors, closing CTA |
| `/about`                                               | Static                          |                                                          |
| `/products`                                            | Static                          |                                                          |
| `/products/[slug]` ×4                                  | Static (`generateStaticParams`) | `instant = false` documented                             |
| `/contact`                                             | Static shell + client form      | Server action `app/contact/actions.ts`                   |
| `/privacy`, `/terms`                                   | Static                          | Placeholder — text not supplied                          |
| `/styleguide`                                          | Static, noindex, unlinked       | Internal design reference                                |
| `/opengraph-image`, `/products/[slug]/opengraph-image` | Prerendered PNG                 |                                                          |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` | Generated                       | Indexing gated by `SITE_INDEXABLE`                       |

## Data flows (personal data)

```
Visitor ── contact form (name, email, company?, interest, message)
   └─► server action: rate limit → spam checks → Zod validation
          └─► Resend API (processor) ─► pm.teams@arcaisys.com inbox
```

Nothing is stored by the website itself. No cookies, no browser storage, no third-party
requests on any page (measured, see `baseline-results.md`). No analytics.

## Environment

`NEXT_PUBLIC_SITE_URL`, `SITE_INDEXABLE`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`,
`CONTACT_FROM_EMAIL` (`.env.example`). Only `NEXT_PUBLIC_SITE_URL` reaches the browser.
`.env.local` exists locally, is git-ignored and was never committed (history scanned).

## Existing quality tooling

| Command                        | Covers                                                                     |
| ------------------------------ | -------------------------------------------------------------------------- |
| `npm run check`                | TypeScript, ESLint (Next core-web-vitals + jsx-a11y), Prettier             |
| `npm run test:form`            | 17 end-to-end contact form checks (mock email API)                         |
| `node scripts/test-motion.mjs` | 20 motion, navigation, keyboard and reduced-motion checks                  |
| `node scripts/screenshot.mjs`  | Visual sweep + horizontal overflow + broken images                         |
| `npm run audit:browser`        | **New in Phase 1:** axe-core, headings, alt text, links, privacy inventory |
| `npm run content:audit`        | Missing / draft content                                                    |

No CI yet — all checks run manually.

## Requirements from the master prompt that do not apply

Authentication and authorisation, tenant isolation, payments/checkout/subscriptions,
ecommerce catalogue, shipping/refund policies, marketing email and unsubscribe flows,
database backups and migrations, site search (9 pages — a menu is enough), file uploads.
Recorded once here so they are not re-raised.
