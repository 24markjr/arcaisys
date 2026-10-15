# Content inventory

_Last updated: 2026-10-15 (Phase 0)_

> **Phase 5 status (2026-10-15):** the site is fully wired for content — every field lives in
> `content/company.ts` or `content/products.ts` (see `docs/content-guide.md`). No company content
> has been supplied yet; `npm run content:audit` lists the 54 missing items and 9 drafts.

This is the record of what has been supplied, what is confirmed, and what is still
missing. Nothing marked **Missing** or **Unconfirmed** may appear on the live site as fact.

## 1. Supplied files

| File                      | What it is                                         | Status                 | Notes                                                                                               |
| ------------------------- | -------------------------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------- |
| `logos/Arcaisys-Logo.png` | Arcaisys symbol + wordmark, 1024×1024, transparent | ✅ Usable              | Raster only. Split into mark / wordmark for the web.                                                |
| `logos/Hospio-logo.png`   | Hospio full logo with tagline, transparent         | ✅ Usable              | Navy wordmark: light backgrounds only.                                                              |
| `logos/Hospio-icon.png`   | Hospio app-icon tile (white rounded square)        | ✅ Usable              |                                                                                                     |
| `logos/Meridian-logo.png` | Meridian full logo with tagline, transparent       | ✅ Usable              | Navy wordmark: light backgrounds only.                                                              |
| `logos/Meridian-icon.png` | Meridian app-icon tile                             | ✅ Usable              |                                                                                                     |
| `logos/PACS-logo.png`     | PACS full logo with tagline, transparent           | ✅ Usable              | Navy wordmark: light backgrounds only.                                                              |
| `logos/PACS-icon.png`     | PACS app-icon tile                                 | ✅ Usable              |                                                                                                     |
| `logos/RestoQr-logo.png`  | RestoQR full logo, 962×756, **white background**   | ⚠️ Usable with caveats | Lower resolution, compression artefacts, different visual style from the other three. No icon file. |

No text content, screenshots, documents or contact details have been supplied yet.

### Web assets generated from these files

Generated into `public/brand/` (originals in `logos/` are untouched):

- `arcaisys-lockup.png`, `arcaisys-mark.png`, `arcaisys-wordmark.png`
- `{hospio,meridian,pacs}-logo.png` — trimmed
- `{hospio,meridian,pacs}-tile.png` — app-icon tiles, 512px
- `{hospio,meridian,pacs}-symbol.png` — symbol with the white tile removed
- `restoqr-logo.png` — white background removed
- `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico` — from the Arcaisys mark

## 2. What the files confirm

| Fact                                               | Source        |
| -------------------------------------------------- | ------------- |
| Company name: **Arcaisys**                         | Logo wordmark |
| Four products: **Hospio, Meridian, PACS, RestoQR** | Logo files    |
| Hospio tagline: "Admit. Care. Heal."               | Logo          |
| Meridian tagline: "Ask. Verify. Trust."            | Logo          |
| PACS tagline: "Capture. Store. View. Report."      | Logo          |
| RestoQR tagline: "Scan. Order. Serve. Grow."       | Logo          |

## 3. Reasonable inferences — need confirmation

These shape the design direction but **must not be published until confirmed**.

| Inference                                                                      | Based on                                                                                                            |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| Hospio is hospital / patient management software                               | Name, heartbeat symbol, "Admit. Care. Heal."                                                                        |
| PACS is a medical imaging system (Picture Archiving and Communication System)  | Name, tagline matches the PACS workflow                                                                             |
| RestoQR is QR-based restaurant ordering                                        | Name, chef/cloche/QR symbol, "Scan. Order. Serve. Grow."                                                            |
| Healthcare is a primary vertical                                               | Two of four products                                                                                                |
| Hospio, Meridian and PACS are one product family; RestoQR is separate or older | Shared navy, typeface, gradient and tagline layout                                                                  |
| Meridian — **purpose unknown**                                                 | Compass + globe, "Ask. Verify. Trust." could suggest AI Q&A, verification or compliance. Cannot be inferred safely. |

## 4. Missing — needed before pages can be written

Ordered by impact. See `docs/content-questionnaire.md` for the form to fill in.

1. **Domain spelling** — `acracsys.com` (as briefed) or `arcaisys.com` (matches the name)?
2. **What Arcaisys is** — one honest paragraph: what you do, for whom, since when, where.
3. **Each product** — description, audience, problem solved, key capabilities, status
   (live / pilot / in development), URL, screenshots.
4. **Meridian** — what it does.
5. **Services** — do you sell custom development / consulting, or only products?
6. **Client work** — any projects or clients you are permitted to name publicly.
7. **Contact** — enquiry email, phone (optional), registered address, company legal name.
8. **People** — founders/leadership to show, if any (names, roles, photos).
9. **Investor-facing material** — should the public site carry it, or stay product-led?
10. **Logo source files** — SVG / AI / Figma, if they exist (confirmed: only PNGs available).

## 5. Asset risks to resolve before investor launch

- **No vector logos.** PNGs are adequate for the web at the sizes used, but a designer should
  produce SVG masters for print, decks and large-format use.
- **RestoQR does not match the family.** Its raster quality and illustrative style are visibly
  weaker beside Hospio, Meridian and PACS. Recommend a redraw in the shared family style
  (navy wordmark, single-colour gradient symbol, dotted tagline) before the portfolio is
  presented together.
- **Product logos have no dark-background versions.** Phase 2 will either generate reversed
  versions or keep product logos on light surfaces only.
- **The product family uses navy; the Arcaisys mark does not.** The site will use the navy as
  its ink colour to tie the parent brand and products together.

## 6. Provisional sitemap (finalised in Phase 3)

| Route                 | Depends on                                   |
| --------------------- | -------------------------------------------- |
| `/`                   | Company paragraph, product summaries         |
| `/about`              | Company story, approach, (optional) people   |
| `/products`           | Product summaries                            |
| `/products/[slug]` ×4 | Full product content + screenshots           |
| `/services`           | **Only if** Arcaisys sells services          |
| `/work`               | **Only if** there is public client work      |
| `/contact`            | Contact details + email delivery credentials |
| `/privacy`, `/terms`  | Legal entity name, jurisdiction              |
