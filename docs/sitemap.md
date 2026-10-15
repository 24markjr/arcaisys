# Sitemap and architecture (Phase 3)

## Routes

| Route                | Purpose                                        | Sections                                                                                                                             |
| -------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `/`                  | What Arcaisys is; route visitors to products   | Hero + product strip · 01 Company · 02 Portfolio · 03 Approach · 04 Sectors · Closing CTA                                            |
| `/about`             | Who, why, how, where next                      | Header · 01 Origin · 02 At a glance (facts table) · 03 Approach · 04 Direction · CTA                                                 |
| `/products`          | Portfolio overview                             | Header · one alternating row per product · CTA                                                                                       |
| `/products/[slug]`   | One page per product (4, statically generated) | Header (name, tagline, category, status, enquire) · 01 Problem · 02 Audience · 03 Capabilities · 04 Screenshots · Next product · CTA |
| `/contact`           | The single conversion point                    | Header · details · enquiry form (server action → Resend)                                                                             |
| `/privacy`, `/terms` | Legal                                          | Awaiting legal text from Arcaisys                                                                                                    |
| `/styleguide`        | Internal design-system review                  | Not linked, noindex                                                                                                                  |
| 404                  | Custom not-found                               |                                                                                                                                      |

### Deliberately not built

- **`/services`** — only if Arcaisys sells custom work (questionnaire D).
- **`/work`** — only if there is client work cleared for publication (questionnaire E). A thin
  case-study page would weaken the site more than its absence.
- **Team** — a section on `/about` if people are supplied (questionnaire F).

## Navigation

Header: Products · About · **Start a conversation** (button). Footer: all products, company,
legal. Product enquiries link to `/contact?interest=<slug>` so the form can pre-select it.

## Architecture

```
app/                    routes; each page composes section components
components/layout/      SiteHeader, NavLinks (client), MobileMenu (client, <dialog>), SiteFooter
components/sections/    PageHeader, ClosingCta, ProductIndex, LegalPage, home/*
components/ui/          design-system primitives
components/brand/       Logo, ProductTile, signature graphics
content/                typed content: products, navigation, brand assets
lib/                    site config, helpers
```

- Server Components by default. Client components: `NavLinks` (active state via
  `usePathname`), `MobileMenu` and the contact form.
- Every page is prerendered static HTML (`next build` output: ○).
- With Cache Components, `usePathname` needs a `<Suspense>` boundary; the header renders a static
  link list as the fallback, so navigation works before hydration.

## Known behaviour

An unknown product URL (e.g. `/products/xyz`) renders the 404 page with `noindex`, but returns
HTTP 200 because the response has started streaming. This is documented Next.js 16 behaviour.
If a strict 404 status is needed later, a `proxy.ts` check against the product list can return
it before rendering.
