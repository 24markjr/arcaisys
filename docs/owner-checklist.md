# What Arcaisys needs to provide

Everything the website still needs that only Arcaisys can supply or decide. Engineering work is
complete; these items gate the public launch. Check progress any time with
`npm run content:audit` (and `npm run content:audit -- --strict`, which must pass before launch).

Legend: 🔴 blocks launch · 🟠 needed soon · 🟢 recommended

---

## 1. 🔴 Email for the contact form (Resend)

Until this is done, the live form tells visitors it is not connected and shows the email address
instead. Nothing is lost, but no enquiry is delivered automatically.

1. **Replace the API key.** The current key was shared in a chat. In resend.com → API Keys,
   create a new key with _Sending access_, then delete the old one.
2. **Verify the domain.** resend.com → Domains → Add `arcaisys.com`. Resend shows DNS records
   (they live on a `send.arcaisys.com` subdomain plus a DKIM record).
3. **Add those records at Hostinger** (where arcaisys.com's DNS and email are). Do **not** remove
   or replace the existing MX or SPF records — they run `pm.teams@arcaisys.com`. Wait until
   Resend shows _Verified_.
4. **Set the variables in Vercel** (Project → Settings → Environment Variables → Production):

   | Name                   | Value                                     |
   | ---------------------- | ----------------------------------------- |
   | `RESEND_API_KEY`       | the new key                               |
   | `CONTACT_TO_EMAIL`     | `pm.teams@arcaisys.com`                   |
   | `CONTACT_FROM_EMAIL`   | `Arcaisys Website <website@arcaisys.com>` |
   | `NEXT_PUBLIC_SITE_URL` | `https://arcaisys.com`                    |

5. **Redeploy** (Vercel → Deployments → Redeploy) and send one test message from the live
   contact page. Confirm it arrives.

## 2. 🔴 The arcaisys.com domain

The site currently runs at `arcaisys-mu.vercel.app`.

1. Vercel → Project → Settings → Domains → add `arcaisys.com` and `www.arcaisys.com`.
2. At Hostinger, create the DNS records Vercel shows (an `A` record for `arcaisys.com`, a `CNAME`
   for `www`). Again: leave the mail records alone.
3. Set `arcaisys.com` as the primary domain so `www` redirects to it.

## 3. 🔴 Privacy policy and terms — decisions, then a lawyer

Both are drafted from how the site actually works and shown at `/privacy` and `/terms` with a
"Draft" notice. Please decide:

| #   | Question                                                                | Current draft                                |
| --- | ----------------------------------------------------------------------- | -------------------------------------------- |
| a   | How long do you keep enquiry emails?                                    | 24 months after the last correspondence      |
| b   | How quickly do you answer data requests (access, correction, deletion)? | Within 30 days                               |
| c   | Who handles privacy grievances? (a named person, or a role + email)     | "The Arcaisys team at pm.teams@arcaisys.com" |
| d   | Which courts have jurisdiction over disputes?                           | Courts at Mumbai, Maharashtra                |
| e   | Will Vercel stay the website host?                                      | Vercel                                       |

Then have a **qualified lawyer** review both documents (India DPDP Act, 2023; consumer and IT law).
After review, set `reviewed: true` and the `effectiveDate` in `content/legal.ts` — or send the
approved text and it will be updated.

## 4. 🔴 Review the website copy

The company, product, capability, approach, sector and about-page copy was written from your
brief on 15 Oct 2026 (`content/company.ts`, `content/products.ts`). Please read every page and
confirm or correct, in particular:

- **Taglines:** motto "Intelligent software, built for the real world." and brand line
  "Understand. Build. Verify."
- **Product statuses:** RestoQR _Live_; PACS, Hospio, Meridian _In development_.
- **Claims:** the site says RestoQR is live and that PACS, Hospio and Meridian are in development.
  It names no clients, numbers or certifications. Add any only if they are verifiable.
- **Direction** (About page): growing RestoQR and bringing the other three into production.

## 5. ✅ Product screenshots — not needed

Decision (15 Oct 2026): the site presents products through information only. The screenshot
slots were removed. If screenshots are wanted later, the `screenshots` field in
`content/products.ts` still exists.

## 6. 🟠 Turn on analytics in Vercel

The site already includes Vercel Web Analytics and Speed Insights (cookieless). In the Vercel
project, open the **Analytics** and **Speed Insights** tabs and click _Enable_. The "Enquiry
sent" conversion event appears in the dashboard on Vercel's Pro plan; page views work on all
plans.

## 7. 🟢 Brand assets

- **RestoQR logo redraw** in the family style (navy wordmark, gradient symbol, dotted tagline),
  plus an app-icon tile and a white-wordmark version for the dark theme. It is currently the
  weakest asset next to Hospio, Meridian and PACS.
- **Vector (SVG) versions** of all five logos, for print, decks and large formats.

## 8. 🟢 Optional details

- ~~Company **LinkedIn** URL~~ — done (footer, contact page, search-engine data).
- **Business hours** / expected reply time for the contact page.
- **Meta domain-verification code**, if you verify the business with Meta/WhatsApp: set
  `META_DOMAIN_VERIFICATION` in Vercel.

## 9. At launch (after 1–5)

1. `npm run content:audit -- --strict` passes.
2. In Vercel set `SITE_INDEXABLE=true` and redeploy — this lets search engines in.
3. Check `https://arcaisys.com/robots.txt` lists the sitemap.
4. Add the site to **Google Search Console** and submit `https://arcaisys.com/sitemap.xml`.
5. Share a page on LinkedIn/WhatsApp to confirm the preview image.
