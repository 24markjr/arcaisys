# Adding content (Phase 5)

All text on the site comes from two files. No layout code needs to change.

| What                                               | File                  |
| -------------------------------------------------- | --------------------- |
| Company facts, homepage, about, contact, sectors   | `content/company.ts`  |
| Products (description, capabilities, screenshots…) | `content/products.ts` |

Run `npm run content:audit` at any time for the full list of what is still missing.

## Copy fields

Every piece of copy looks like this:

```ts
heroLead: copy("One-sentence value proposition (B1)"),
```

- To add text: `copy("…need…", "Your text here")` — it shows on the site as a **draft**
  (striped) until approved.
- To approve it: `copy("…need…", "Your text here", true)` — it now shows as normal copy.

The letters in brackets (B1, C, G…) refer to `docs/content-questionnaire.md`.

## Company facts

Plain values — set them once supplied:

```ts
export const companyFacts = {
  legalName: "Arcaisys Private Limited",
  founded: "2024",
  ...
```

`contactEmail` also appears in the footer, on the contact page, and in the contact form's
fallback message.

## Products

In `content/products.ts`, fill `category`, `summary`, `audience`, `problem`,
`capabilities` (a list of short strings), `status` (`"live"`, `"pilot"` or
`"in-development"`) and optionally `externalUrl`. Set `confirmed: true` once the product
details are approved.

### Screenshots

1. Put the files in `public/products/<slug>/`, e.g. `public/products/hospio/dashboard.png`.
   The first screenshot is shown largest — use 16:10 and at least 2400px wide. PNG or JPG;
   Next.js converts them to modern formats automatically.
2. List them, with their pixel size and a description of what the screenshot shows:

```ts
screenshots: [
  { src: "/products/hospio/dashboard.png", width: 2880, height: 1800, alt: "Hospio ward overview showing bed occupancy" },
],
```

`npm run content:audit` reports missing files and missing alt text.

## Rules

- Never add numbers, client names, testimonials or claims that cannot be verified.
- Before launch, `npm run content:audit -- --strict` must pass (no missing items, no drafts).
