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
node scripts/screenshot.mjs http://localhost:3000 screenshots   # visual QA + overflow check (uses installed Chrome)
```

## Environment

Copy `.env.example` to `.env.local` and fill in values. See comments in that file.

## Project structure

```
app/            Routes, layouts, metadata, global styles and design tokens (globals.css)
components/     layout/, ui/, sections/, motion/ — added as the build progresses
content/        Editable, typed site content (products, navigation, brand assets)
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
- Phase 4 — core build (contact form, polish of components): next

Striped markers on the site are content still needed from Arcaisys — see the questionnaire.
