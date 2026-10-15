# Arcaisys website

Corporate website for Arcaisys. Next.js (App Router), TypeScript, Tailwind CSS v4.

## Requirements

- Node.js 20.9 or newer
- npm

## Commands

```bash
npm install          # install dependencies
npm run dev          # development server at http://localhost:3000
npm run build        # production build
npm run start        # serve the production build
npm run check        # typecheck + lint + formatting check
npm run format       # format all files
npm run content:audit  # list content still missing or awaiting approval
npm run test:form    # end-to-end contact form tests (after npm run build)
node scripts/test-motion.mjs http://localhost:3000   # motion + navigation checks (server running)
node scripts/test-features.mjs http://localhost:3000 # theme, copy, WhatsApp, back-to-top, print
node scripts/test-security.mjs http://localhost:3000 # headers, CSP, server-action origin, secrets
npm run check:secrets  # scan tracked files for credentials (also runs before every commit)
npm run audit:browser -- http://localhost:3000       # axe + links + privacy (THEME=dark for dark)
node scripts/screenshot.mjs http://localhost:3000 screenshots   # visual QA + overflow check (uses installed Chrome)
```

## Environment

Copy `.env.example` to `.env.local` and fill in values. See comments in that file.

## Project structure

```
app/            Routes, layouts, metadata, global styles and design tokens (globals.css)
components/     layout/, ui/, sections/, motion/ — added as the build progresses
content/        All site copy and facts (company.ts, products.ts) — see docs/content-guide.md
lib/            Site configuration and utilities
public/brand/   Web-ready logo assets generated from logos/
logos/          Original logo files as supplied — do not edit
docs/           Content inventory, questionnaire and brand notes
```

## Editing content

All copy lives in `content/`. Product fields left `null` are not yet supplied by Arcaisys and
must not be filled with invented text. Items with `confirmed: false` are not yet verified.

## Status

- Phase 0 — content inventory: done (`docs/content-inventory.md`, `docs/content-questionnaire.md`)
- Phase 1 — foundation: done
- Phase 2 — design system: done — review at `/styleguide` (`docs/design-system.md`)
- Phase 3 — sitemap, architecture and page structure: done (`docs/sitemap.md`)
- Phase 4 — core build: done — working contact form
- Phase 5 — content integration: structure done; contact details added; **company and product
  copy still to come** — see `docs/content-guide.md` and run `npm run content:audit`
- Phase 6 — motion: done (`docs/design-system.md` → Motion)
- Phase 7 — SEO and launch readiness: done — **deploy and launch steps in `docs/deployment.md`**
- Audit phases 0–1 (discovery, baseline findings): done — `docs/audit/`
- Audit phase 2 (minimal technical layer, dark mode) and 3 (copy, WhatsApp, back-to-top, print): done
- Audit phase 4 (privacy policy and terms — drafts for legal review) and 5 (CSP, input
  hardening, secret-scan hook): done

Striped markers on the site are content still needed from Arcaisys.

## Contact form

Validated on the client and server, spam-protected (honeypot, minimum fill time, per-IP rate
limit), and sends through Resend. It shows success only after Resend accepts the email. Until
`RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` are set, it tells visitors it is
not connected yet. The rate limit is in-memory per server instance (see `lib/rate-limit.ts`).
