import type { Metadata, Viewport } from "next";
import { Geist_Mono, Manrope } from "next/font/google";
import { siteConfig } from "@/lib/site";
import { organizationJsonLd } from "@/lib/seo";
import { themeBootstrap } from "@/lib/theme";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BackToTop } from "@/components/layout/back-to-top";
import { JsonLd } from "@/components/seo/json-ld";
import "./globals.css";

// One family for headings and body (geometric, like the wordmark) plus a mono
// for indices and labels. See docs/design-system.md.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_IN",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  // Indexing stays off until launch: set SITE_INDEXABLE=true in production (docs/deployment.md).
  robots: siteConfig.indexable ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false, address: false, email: false },
  // Meta (Facebook/WhatsApp) business domain verification, if configured.
  ...(process.env.META_DOMAIN_VERIFICATION
    ? { other: { "facebook-domain-verification": process.env.META_DOMAIN_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  // Light by default regardless of the device setting; dark only via the toggle.
  themeColor: "#ffffff",
  colorScheme: "light",
};

/**
 * Runs before first paint: marks the document so revealable content starts
 * hidden (no flash of final state before the entrance). Skipped entirely for
 * reduced motion. The timeout is a safety net — if scripts never run, content
 * is shown anyway.
 */
const motionBootstrap = `(function(){try{var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('motion-pending');setTimeout(function(){d.classList.remove('motion-pending')},2500)}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={siteConfig.locale}
      className={`${manrope.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <script dangerouslySetInnerHTML={{ __html: motionBootstrap }} />
      </head>
      <body className="flex min-h-dvh flex-col bg-surface text-ink">
        <JsonLd data={organizationJsonLd()} />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
        <BackToTop />
      </body>
    </html>
  );
}
