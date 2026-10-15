# Final audit and handover report (Phase 11)

_Arcaisys corporate website · 15 October 2026 · repository github.com/24markjr/arcaisys (`main`)
· live preview https://arcaisys-mu.vercel.app_

## A. Executive summary

**Before the audit:** a complete, well-tested build with placeholder content, no CSP, no legal
text, no analytics, no CI, and several accessibility gaps that automated scanners did not catch.

**Now:** all pages carry real content written from Arcaisys's brief; the privacy policy and terms
are drafted from the actual data flows; security, accessibility, SEO and analytics are in place;
every check runs automatically on each push; and the site is deployed on Vercel and verified
there.

**Verdict: CONDITIONALLY READY** — the code is production-ready. Public launch waits on owner
items: email delivery (Resend + domain), the arcaisys.com domain, legal decisions and review,
copy approval, and product screenshots (see `docs/owner-checklist.md`).

## B. Architecture

Next.js 16.4 (App Router, Cache Components, Partial Prefetching) · React 19.3 · TypeScript
(strict) · Tailwind CSS v4 · GSAP (ScrollTrigger, SplitText, DrawSVG) · Zod · Resend HTTP API
· Vercel Web Analytics and Speed Insights · hosted on Vercel. All pages are prerendered; the only
server code is the contact form's server action, the generated share images and `proxy.ts`
(strict 404s). No database, no accounts, no payments. Full detail: `docs/audit/discovery.md`.

## C. Findings register

24 findings recorded with evidence in `docs/audit/findings.md`. Summary:

| Status                              | Findings                                                                                                                                                                                                                                                                                              |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Resolved in code                    | F-05 legal name · F-07 header injection · F-10 strict 404 · F-12 breadcrumbs · F-13 CI · F-14 dark mode · F-15 WhatsApp · F-16 analytics · F-17 copy/back-to-top · F-20 field contrast · F-21 secret scanning · F-22 focus on hidden content · F-23 screen-reader noise · F-24 nav logo / CTA overlap |
| Resolved with documented limitation | F-06 CSP (`script-src` needs `'unsafe-inline'` on static pages — strict policy tested, breaks hydration)                                                                                                                                                                                              |
| Accepted with evidence              | F-08 per-instance rate limit · F-09 mobile LCP (real-throttled 2.17 s; simulated 2.9–3.2 s) · F-18 dev-only npm advisories · F-19 contact-form prefetch                                                                                                                                               |
| Largely resolved                    | F-04 content (screenshots remain)                                                                                                                                                                                                                                                                     |
| Owner action                        | F-01 rotate Resend key · F-02 legal decisions + lawyer review · F-03 Resend domain · F-11 RestoQR logo redraw                                                                                                                                                                                         |

## D. What was implemented (audit phases)

| Phase                     | Outcome                                                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 0–1 Discovery, baseline   | Architecture and data-flow map; 19 initial findings with evidence                                                  |
| 2 Minimal technical layer | Blueprint grid, section ticks, reading progress, product frames, studio line; dark theme (every visit opens light) |
| 3 Conveniences            | Copy email/phone, WhatsApp Business, back-to-top, print styles, Meta verification hook                             |
| 4 Privacy and legal       | DPDP-oriented privacy policy and terms drafted from real flows; data inventory                                     |
| 5 Security                | CSP, COOP, header-injection guard, secret-scanning pre-commit hook, security test suite                            |
| 6 Accessibility           | WCAG 2.2 suite (76 checks); fixed focus-on-hidden-content and screen-reader issues                                 |
| 7 SEO and performance     | Real 404s, breadcrumb data, LCP evidence; Organization data with founding date and slogan                          |
| 8 Analytics               | Cookieless Vercel analytics, conversion event, campaign tags in enquiry emails                                     |
| 9 CI                      | GitHub Actions running every suite on each push (first run green)                                                  |
| 10 Deployment             | Full suite run against the live Vercel site — all passing                                                          |
| Content                   | Company, product, capability, approach, sector and about copy from the brief; tagline "Understand. Build. Verify." |

## E. Feature status

| Feature                                                    | Status                                                                                       |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Pages, navigation, mobile menu, 404                        | Implemented and tested                                                                       |
| Contact form (validation, spam, rate limit, honest states) | Implemented and tested (mock provider) — **blocked on Resend credentials for live delivery** |
| Campaign attribution in enquiries                          | Implemented and tested                                                                       |
| Light/dark theme (light every visit)                       | Implemented and tested                                                                       |
| Motion and page transitions                                | Implemented and tested                                                                       |
| Analytics and Speed Insights                               | Implemented; **dashboard must be enabled by owner**                                          |
| Privacy policy, terms                                      | Drafted — **requires owner decisions and legal review**                                      |
| Product screenshots                                        | **Requires owner input** (framed placeholders shown)                                         |
| Search indexing                                            | Implemented, intentionally off until launch (`SITE_INDEXABLE`)                               |
| Authentication, payments, shop, search, cookie banner      | Not applicable (documented)                                                                  |

## F. Test results (15 Oct 2026)

| Suite                               | Local production build   | Live site (Vercel)              | CI   |
| ----------------------------------- | ------------------------ | ------------------------------- | ---- |
| Type check, lint, formatting        | Pass                     | —                               | Pass |
| Secret scan · prod dependency audit | Pass · 0 vulnerabilities | —                               | Pass |
| Contact form e2e                    | 19/19                    | not run (would send real email) | Pass |
| Security                            | 9/9                      | 9/9                             | Pass |
| Motion and keyboard                 | 20/20                    | 20/20                           | Pass |
| Features                            | 23/23                    | 23/23                           | Pass |
| WCAG 2.2 checks                     | 76/76                    | 76/76                           | Pass |
| axe (light, dark)                   | 0 / 0 violations         | 0 / 0                           | Pass |
| Visual sweep (6 widths, 2 themes)   | 120/120                  | 108/108 (no styleguide)         | Pass |
| Lighthouse desktop                  | 100 / 100 / 100 / 69*    | 100 / 100 / 96† / 69*           | —    |
| Lighthouse mobile (simulated)       | 92–95                    | 86–88                           | —    |

\* SEO 69 only because indexing is deliberately off; 100 with `SITE_INDEXABLE=true`.
† One "issues logged in DevTools" notice, no failing check.

## G. Remaining actions

**Arcaisys:** see `docs/owner-checklist.md` — Resend, domain, legal decisions and review, copy
approval, screenshots, enable analytics, logo work.
**Developer (on request):** add screenshots and approved legal text when supplied; switch on
indexing at launch; re-measure performance with real-visitor data from Speed Insights.

## H. Production-readiness verdict

**CONDITIONALLY READY.** Core functionality, security, accessibility, performance and
deployment are verified. The listed owner dependencies must be completed before the site is
announced publicly or opened to search engines.
