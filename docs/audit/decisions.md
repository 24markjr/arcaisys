# Decisions log

| ID  | Date       | Decision                                                                                                     | Source   | Consequence                                                                                                             |
| --- | ---------- | ------------------------------------------------------------------------------------------------------------ | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| D1  | 2026-10-15 | **Keep the design minimal.** Add a technical character without adding much.                                  | Owner    | Phase 2 uses a reduced set — see below. WebGL ribbon dropped.                                                           |
| D2  | 2026-10-15 | **Add a light/dark theme toggle.**                                                                           | Owner    | Defaults to the visitor's system setting, remembers their choice, no flash on load. Light remains the designed default. |
| D3  | 2026-10-15 | **Analytics: Vercel Web Analytics (cookieless)** — recommended; owner unsure. Confirm before Phase 8.        | Proposed | No consent banner needed. Meta _Pixel_ not added (would need consent).                                                  |
| D4  | 2026-10-15 | **WhatsApp Business** on +91 91378 15600.                                                                    | Owner    | Add a click-to-chat link (`wa.me/919137815600`) on contact page and footer.                                             |
| D5  | 2026-10-15 | **Enquiry retention: 24 months** from last correspondence, then deleted — proposed default; owner undecided. | Proposed | Goes into the privacy-policy draft, marked for legal review.                                                            |

## D1 — what "minimal" means for Phase 2 (proposed)

Keep — quiet, structural, true:

1. **Blueprint detail, very faint** — a hairline grid behind the hero and page headers only;
   small corner ticks on section dividers. No new colours.
2. **Product interface frames** — each product shown in a thin browser frame (neutral skeleton
   until screenshots arrive).
3. **Studio line** — live Mumbai time (IST) and office coordinates in the footer / contact page.
4. **Scroll progress hairline** under the header in the ribbon gradient.

Dropped for minimalism: cursor-reactive hero, product-family network diagram, dark "how we
build" panel, WebGL ribbon.

## D3 — Meta (Facebook/WhatsApp) business verification

Meta's business verification does not need analytics or a pixel. It checks that the website:
shows the **legal business name**, address and phone matching your documents; has a reachable
**privacy policy**; and that you own the domain (a `<meta name="facebook-domain-verification">`
tag or a DNS TXT record). The site will support the meta tag through an environment variable
(no code change needed later). Missing for verification today: legal business name (F-05) and
privacy policy (F-02).
