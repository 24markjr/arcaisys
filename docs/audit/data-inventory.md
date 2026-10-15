# Phase 4 — Data and tracking inventory

_The privacy policy (`content/legal.ts`) is written from this inventory. Re-check it whenever a
form, integration, analytics tool or embed is added. Measured 2026-10-15 with
`npm run audit:browser` (light and dark themes) plus code review._

## Personal data

| Data                                                     | Source                    | Purpose                                       | Where it goes                                                   | Kept                                                     | Required?                                                             |
| -------------------------------------------------------- | ------------------------- | --------------------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------- | --------------------------------------------------------------------- |
| Name, business email, company (optional), topic, message | Enquiry form (`/contact`) | Read and reply to the enquiry                 | Server action → **Resend** (US) → `pm.teams@arcaisys.com` inbox | Proposed 24 months after last correspondence (D5, draft) | Name, email, topic, message: yes — needed to reply. Company: optional |
| Visitor's IP address                                     | Every form submission     | Abuse protection (5 submissions / 10 minutes) | Server memory only (`lib/rate-limit.ts`)                        | ≤ 10 minutes, then discarded                             | Yes, for security                                                     |
| IP address, user agent, request path                     | Every page request        | Deliver pages; security                       | Hosting provider's request logs                                 | Per the hosting provider's policy                        | Inherent to any website                                               |
| Anything sent by email, phone or WhatsApp                | Visitor-initiated         | Reply                                         | Mailbox provider / WhatsApp (Meta)                              | As above / WhatsApp's policy                             | Visitor's choice                                                      |

The website itself has **no database** and stores no submissions.

## Cookies and browser storage

| Item             | Type             | Purpose                                   | Essential?              | Sent to us?                   |
| ---------------- | ---------------- | ----------------------------------------- | ----------------------- | ----------------------------- |
| `arcaisys-theme` | `sessionStorage` | Remembers light/dark choice for the visit | Preference (functional) | No — never leaves the browser |

**Cookies: none. Analytics: none. Advertising or tracking pixels: none. Third-party requests on
page load: none** (measured on every route, both themes). Fonts are self-hosted.

→ **No cookie banner or consent manager is required** for the site as built. If analytics are
added (D3, Vercel Web Analytics is cookieless), update the privacy policy's "What we collect"
and "Who receives it" sections first.

## Processors

| Processor                                    | Role                                 | Location                    | Status                                         |
| -------------------------------------------- | ------------------------------------ | --------------------------- | ---------------------------------------------- |
| Resend                                       | Email delivery for the enquiry form  | United States               | Account exists; domain not yet verified (F-03) |
| Hosting provider                             | Serves the website                   | Global (Vercel recommended) | Not yet chosen                                 |
| Mailbox provider for `pm.teams@arcaisys.com` | Stores and displays enquiries        | Unknown                     | **Arcaisys to confirm**                        |
| WhatsApp (Meta)                              | Only if the visitor chooses WhatsApp | Global                      | Visitor-initiated                              |

## Rights requests (DPDP Act, 2023)

Process published in the privacy policy: email `pm.teams@arcaisys.com`, subject "Data
request" → verify the requester (reply from the same address they used) → access, correct or
erase → respond within the stated time (draft: 30 days) → grievances to the Data Protection
Board of India if unresolved.

Because the website stores nothing, an erasure request means: delete the enquiry thread(s)
from the mailbox, and delete the message from Resend's logs (Resend dashboard → Emails).

## Marketing

The enquiry form subscribes no one to anything; there is no mailing list. The form says so.

## Open questions for Arcaisys / legal review

1. Registered legal name (needed throughout both documents).
2. Retention period (draft: 24 months).
3. Mailbox provider and hosting provider names.
4. Response time for data requests (draft: 30 days) and named grievance contact.
5. Jurisdiction clause (draft: courts at Mumbai).
6. Whether any visitors' jurisdictions (e.g. EU/UK) need additional wording.
