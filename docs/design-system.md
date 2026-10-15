# Design system (Phase 2)

The live reference is **`/styleguide`** (not linked from the site). Tokens live in
`app/globals.css`; components in `components/ui` and `components/brand`.

## Principles

1. **Neutral first, brand second.** White and warm-white surfaces, navy-black ink. The logo's
   colours appear as accents and in one graphic, never as section backgrounds or text gradients.
2. **Editorial, not template.** Asymmetric 12-column grid: labels in columns 1–3, content from
   column 4. Lists and rows instead of card grids. Each section gets a different composition.
3. **Nothing unverified looks verified.** Missing content renders through `<Pending>` (striped,
   labelled). Planned-but-unbuilt blocks use `<Wireframe>`. Both must be gone before launch.

## Colour

| Role               | Token                               | Value     | Notes                                  |
| ------------------ | ----------------------------------- | --------- | -------------------------------------- |
| Page               | `surface`                           | `#FFFFFF` |                                        |
| Alternate section  | `surface-alt`                       | `#FAF9F7` | Warm white                             |
| Dark panel         | `surface-ink`                       | `#0E1726` | Closing CTA and footer only            |
| Text               | `ink`                               | `#0F1622` | Navy-tinted to match product wordmarks |
| Secondary text     | `ink-soft`                          | `#4A505C` |                                        |
| Meta text          | `ink-muted`                         | `#686D79` | 4.9:1 on warm white                    |
| Accent text, focus | `brand-red`                         | `#D81018` | Sampled from the S ribbon; AA on white |
| Graphics           | `brand-amber/orange/red/deep/ember` | sampled   | Ribbon gradient                        |
| Wordmark           | `brand-coral`                       | `#FC5454` | Decorative only — fails AA as text     |

## Typography

- **Manrope** for headings and body. Geometric like the wordmark; holds up at 17px.
- **Geist Mono** for indices, eyebrows and metadata only.
- Fluid scale (`text-display`, `text-h1`…`text-h3`, `text-lead`, `text-body`, `text-small`,
  `text-label`), each with its own line height and tracking. Headings balance; paragraphs
  use `text-wrap: pretty`.

## Components

| Component                     | File                     | Purpose                                           |
| ----------------------------- | ------------------------ | ------------------------------------------------- |
| `Container`, `Grid`           | `ui/container.tsx`       | Page frame and 12-column grid                     |
| `Section`                     | `ui/section.tsx`         | Tone (default / alt / ink) and vertical rhythm    |
| `Eyebrow`                     | `ui/eyebrow.tsx`         | Index + rule + label; echoes the product taglines |
| `Heading`, `Lead`             | `ui/heading.tsx`         | Type scale with independent semantic level        |
| `ButtonLink`, `ArrowLink`     | `ui/button.tsx`          | All calls to action are links; 3px corners        |
| `Tagline`                     | `ui/tagline.tsx`         | Product taglines set as in the logos              |
| `Pending`, `Wireframe`        | `ui/`                    | Content-not-yet-supplied markers                  |
| `Logo`                        | `brand/logo.tsx`         | Horizontal lockup from the original artwork       |
| `ProductTile`                 | `brand/product-tile.tsx` | Supplied app-icon tiles                           |
| `AscentGraphic`, `RibbonLine` | `brand/ribbon.tsx`       | Signature graphics                                |

## Signature graphic

The mark, abstracted: the ascending A becomes hairline construction lines with drafting marks
(an engineering drawing), the S becomes a single solid ribbon carrying the amber → ember
gradient, and the floating chevron is kept. Used in the hero and on the 404 page. The ribbon
alone (`RibbonLine`) opens every closing CTA. Paths carry `data-draw` / `data-ribbon` hooks for
the Phase 6 animation.

## Themes (Phase 2)

Light is the designed default; dark is offered through the header toggle and follows the
system setting until the visitor chooses. The choice is stored in `localStorage`
(`arcaisys-theme`) — a preference, not tracking. An inline script applies it before first
paint (`lib/theme.ts`), so there is no flash; without JavaScript the site stays light.

Components use **role tokens**, never raw colours, so both themes stay correct:

| Token                  | Role                                     | Light             | Dark              |
| ---------------------- | ---------------------------------------- | ----------------- | ----------------- |
| `accent`               | Accent text, focus ring, errors          | `#D81018` (5.2:1) | `#FF5C61` (6.3:1) |
| `action` / `on-action` | Primary button                           | ink / off-white   | off-white / ink   |
| `on-inverse`           | Text on light buttons in the dark panels | `#0F1622`         | `#0F1622`         |
| `field-border`         | Form field outlines (WCAG 1.4.11, 3:1)   | `#8A8F99`         | `#5F6876`         |
| `panel-art`            | Panel behind product artwork             | white             | `#0F1620`         |
| `chevron`              | Floating chevron in the hero mark        | brand deep        | brand red         |

Product logos switch to their reversed (white wordmark) versions in dark mode
(`components/brand/product-logo.tsx`). RestoQR has none yet, so it keeps a white plate.

## Technical detail (Phase 2, minimal by decision D1)

Blueprint grid behind the hero and page headers (`.blueprint`); corner ticks where sections
meet (`.section-ticks`); a reading-progress hairline under the header (CSS scroll timeline, no
JavaScript); product frames with a labelled outline until screenshots exist; the studio line
(Mumbai, coordinates, live IST). Nothing else was added.

## Motion (Phase 6)

One vocabulary, two engines, never both on the same element.

| Layer             | Engine                                                        | What moves                                                                                                                                                                |
| ----------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Opening sequence  | CSS (`[data-intro]`)                                          | Header (first load), hero and page-header eyebrow → headline (rises through a mask) → lead → actions, 90 ms apart. Starts on the first frame; never waits for JavaScript. |
| Scroll reveals    | GSAP + ScrollTrigger (`data-reveal`, `data-reveal="stagger"`) | Blocks fade and rise 24 px once, batched so neighbours stagger.                                                                                                           |
| Section headlines | GSAP SplitText (`data-reveal-lines`)                          | Line-by-line masked reveal, once. Real text stays in the DOM for screen readers.                                                                                          |
| Signature graphic | GSAP + DrawSVG (`data-ascent`)                                | Construction lines draw, ribbon sweeps bottom-left to top-right, chevron settles; gentle drift on scroll (wide screens).                                                  |
| Closing ribbon    | GSAP (`data-sweep`)                                           | Sweeps in once when the closing panel arrives.                                                                                                                            |
| Product imagery   | GSAP (`data-parallax`)                                        | Subtle vertical parallax, wide screens only.                                                                                                                              |
| Page transitions  | React `<ViewTransition>`                                      | Old page fades out (160 ms), new page fades and rises in (380 ms). Header stays still.                                                                                    |
| Hovers, menu      | CSS                                                           | Arrow nudge, underline wipe, tile tilt; mobile menu fades in with staggered links.                                                                                        |

Rules: only transform, opacity and clip-path animate. `components/motion/motion-root.tsx` is the
single GSAP controller, mounted inside each page (after it hydrates) and fully reverted on
navigation. With `prefers-reduced-motion`, nothing moves and nothing is ever hidden. If
JavaScript fails, a 2.5 s fallback reveals everything.

## Motion tokens (implemented in Phase 6)

Ease-out `cubic-bezier(0.22, 1, 0.36, 1)`, ease-in-out `cubic-bezier(0.65, 0, 0.35, 1)`;
durations 180 / 420 / 900 ms. Only transform and opacity animate. Hover states (arrow nudge,
underline wipe, tile tilt) are already live as CSS transitions.
