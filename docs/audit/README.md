# Production-readiness audit

| Document                                   | Phase | Contents                                                                    |
| ------------------------------------------ | ----- | --------------------------------------------------------------------------- |
| [discovery.md](discovery.md)               | 0     | Architecture, routes, data flows, tooling, what doesn't apply               |
| [decisions.md](decisions.md)               | 0     | Owner decisions (minimal design, dark mode, analytics, WhatsApp, retention) |
| [findings.md](findings.md)                 | 1     | Findings register with severity, evidence and owner                         |
| [baseline-results.md](baseline-results.md) | 1     | Measured Lighthouse, accessibility, security and test results               |
| [data-inventory.md](data-inventory.md)     | 4     | Personal data, storage, processors, rights-request process                  |

## Baseline verdict (Phase 1)

**Code: ready for a private staging deployment. Not ready for public launch.**

No critical code defects were found. The one P0 (F-01) is an exposed credential to rotate.
The four P1s are business inputs — privacy/terms text, Resend domain verification, content and
the legal company name — not engineering defects. Engineering work remaining: P2 hardening
(CSP, subject sanitising), mobile LCP, strict 404s, breadcrumb data, CI; and the agreed P3
features (dark mode, WhatsApp, copy buttons, analytics).

## Next phases

2 Minimal tech layer + dark mode → 3 Practical features → 4 Privacy & legal drafts →
5 Security hardening → 6 Accessibility re-audit → 7 SEO & performance → 8 Analytics →
9 CI & regression → 10 Staging deploy (needs Vercel) → 11 Final audit & handover.
