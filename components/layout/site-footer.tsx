import Link from "next/link";
import { companyFacts, homeCopy } from "@/content/company";
import { footerNav } from "@/content/navigation";
import { siteConfig } from "@/lib/site";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { Copy } from "@/components/ui/copy";
import { Pending } from "@/components/ui/pending";

export function SiteFooter() {
  return (
    <footer className="bg-surface-ink text-ink-inverse">
      <Container className="grid gap-16 pt-20 pb-10 md:grid-cols-12 md:gap-8 md:pt-28">
        <div className="md:col-span-5">
          <Link href="/" aria-label="Arcaisys — home" className="inline-block">
            <Logo size="md" />
          </Link>
          <p className="mt-8 max-w-[34ch] text-small text-ink-inverse-soft">
            <Copy field={homeCopy.footerDescriptor} />
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7">
          {footerNav.map((group) => (
            <div key={group.title}>
              <h2 className="font-mono text-label text-ink-inverse-soft uppercase">{group.title}</h2>
              <ul className="mt-5 space-y-3 text-small">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="link-underline pb-0.5">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="flex flex-col gap-4 border-t border-line-ink pt-8 text-[0.8125rem] text-ink-inverse-soft sm:flex-row sm:justify-between md:col-span-12">
          <p>
            © {siteConfig.copyrightYear}{" "}
            {companyFacts.legalName ?? <Pending need="Registered company name (B4)">Arcaisys</Pending>}
          </p>
          <p className="flex flex-wrap gap-x-6 gap-y-2">
            {companyFacts.contactEmail ? (
              <a href={`mailto:${companyFacts.contactEmail}`} className="link-underline">
                {companyFacts.contactEmail}
              </a>
            ) : (
              <Pending need="Public contact email (G1)" />
            )}
            {companyFacts.phone ? (
              <a href={companyFacts.phoneHref} className="link-underline">
                {companyFacts.phone}
              </a>
            ) : null}
            {companyFacts.linkedin ? (
              <a
                href={companyFacts.linkedin}
                className="link-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            ) : null}
          </p>
        </div>
      </Container>
    </footer>
  );
}
