# Deployment and launch (Phase 7)

The site is a standard Next.js 16 app. Every page is prerendered; the only server code is the
contact form's server action and the generated images. Vercel is the recommended host (it runs
Next.js without configuration); any Node.js 20.9+ host that supports Next.js also works.

## 1. Deploy to Vercel

1. Sign in at vercel.com with the GitHub account that owns `24markjr/arcaisys`.
2. **Add New → Project →** import `arcaisys`. Framework preset: Next.js (detected). Leave the
   build settings at their defaults (`npm run build`).
3. Under **Environment Variables**, add the values from the table below for the **Production**
   environment. Preview deployments can use the same values without `SITE_INDEXABLE`.
4. Deploy. Vercel gives you a `*.vercel.app` URL to review before the domain is connected.

## 2. Environment variables

| Variable                   | Production value                          | Notes                                                                                 |
| -------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`     | `https://arcaisys.com`                    | Canonical URLs, sitemap, social images. No trailing slash.                            |
| `RESEND_API_KEY`           | from resend.com                           | Secret. **Create a new key before launch** — the current one was shared in chat.      |
| `CONTACT_TO_EMAIL`         | `pm.teams@arcaisys.com`                   | Where enquiries arrive. Comma-separate to add more.                                   |
| `CONTACT_FROM_EMAIL`       | `Arcaisys Website <website@arcaisys.com>` | Only works after the domain is verified in Resend (step 4).                           |
| `META_DOMAIN_VERIFICATION` | code from Meta Business Suite             | Optional. Adds the `facebook-domain-verification` tag for Meta business verification. |
| `SITE_INDEXABLE`           | `true` — **only at launch**               | Until set, every page is `noindex` and robots.txt disallows all.                      |

Never commit these values. Locally they live in `.env.local` (git-ignored).

## 3. Connect arcaisys.com

In Vercel: **Project → Settings → Domains →** add `arcaisys.com` and `www.arcaisys.com`. Vercel
shows the DNS records to create at your domain registrar (typically an `A` record for the apex
and a `CNAME` for `www`). Set `arcaisys.com` as the primary domain so `www` redirects to it.
HTTPS certificates are issued automatically.

## 4. Verify arcaisys.com in Resend (required for the contact form)

As of 2026-10-15 the Resend account has **no domains added**. Until one is verified, Resend only
sends from its test address (`onboarding@resend.dev`) and only to the account owner's own email.

1. resend.com → **Domains → Add domain →** `arcaisys.com` (a subdomain such as
   `mail.arcaisys.com` keeps website mail separate from your main mailbox's reputation).
2. Add the DNS records Resend shows (SPF `TXT`, DKIM `TXT`/`CNAME`, and the `MX` for the sending
   subdomain) at your registrar. Do not remove existing MX records for `pm.teams@arcaisys.com`.
3. Wait for **Verified**, then set `CONTACT_FROM_EMAIL` to an address on that domain and redeploy.
4. Submit the contact form once on the live site and confirm the email arrives.

## 5. Launch checklist

- [ ] `npm run content:audit -- --strict` passes (no missing content, no unapproved drafts)
- [ ] No striped "Pending" markers anywhere on the site
- [ ] Privacy policy and terms supplied and approved (legal entity, jurisdiction)
- [ ] New Resend API key created; old one deleted
- [ ] arcaisys.com verified in Resend; live form test received at `pm.teams@arcaisys.com`
- [ ] Domain connected, HTTPS working, `www` redirects to the apex
- [ ] `SITE_INDEXABLE=true` set in Production and redeployed
- [ ] Check `https://arcaisys.com/robots.txt` allows crawling and lists the sitemap
- [ ] Submit `https://arcaisys.com/sitemap.xml` in Google Search Console
- [ ] Share a page on LinkedIn/WhatsApp to confirm the preview image appears

## 6. Verification commands

```bash
npm run check            # typecheck + lint + formatting
npm run build            # production build
npm run start            # serve it on :3000, then in another terminal:
npm run test:form        # contact form end-to-end (17 checks; uses a mock email API)
node scripts/test-motion.mjs http://localhost:3000            # motion + navigation (18 checks)
node scripts/screenshot.mjs http://localhost:3000 screenshots  # visual sweep + overflow check
npm run content:audit    # outstanding content
```

## 7. Notes and known limitations

- **Rate limiting** of the contact form is per server instance (in memory). On serverless
  hosting it slows abuse rather than enforcing a hard global cap. If the form is ever targeted,
  move it to a shared store (e.g. Upstash Redis) — see `lib/rate-limit.ts`.
- **Content-Security-Policy** is set (`next.config.ts`): same-origin only for scripts, styles,
  images, fonts and connections; no plugins, framing or foreign form targets. Scripts also need
  `'unsafe-inline'`: a strict hash-based policy was tested and blocks the inline scripts Next.js
  uses to hydrate prerendered pages (nonces would make every page dynamic). If analytics are
  added, extend `script-src`/`connect-src` for that provider only.
- **Static export** (`OUTPUT_EXPORT=true`, optional `NEXT_PUBLIC_BASE_PATH`) builds plain files
  for static hosts. In that mode response headers (including CSP) are not applied and the
  contact form's server action cannot run — use it for previews only, not for production.
- **Analytics** are not installed. If wanted, Vercel Web Analytics is cookie-free and needs no
  consent banner; anything that sets cookies needs the privacy policy updated first.
- **Unknown product URLs** (e.g. `/products/xyz`) show the 404 page with `noindex` but return
  HTTP 200 — documented Next.js 16 streaming behaviour.
- **Lighthouse (simulated mobile, slow 4G)**: performance 94–96, accessibility 100, best
  practices 100. LCP is ~2.8–3.0 s, almost entirely web-font download time in that simulation
  (measured: disabling all entrance animation changes it by ~0.2 s). SEO shows 69 only because
  indexing is deliberately off until launch; it is 100 with `SITE_INDEXABLE=true`.
