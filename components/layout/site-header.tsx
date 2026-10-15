import Link from "next/link";
import { Suspense } from "react";
import { contactCta, primaryNav } from "@/content/navigation";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { NavLinks, NavList } from "./nav-links";
import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  return (
    <header
      data-site-header
      style={{ viewTransitionName: "site-header" }}
      className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur-md"
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-ink-inverse"
      >
        Skip to content
      </a>
      <Container className="flex h-(--header-h) items-center justify-between gap-8">
        <Link href="/" aria-label="Arcaisys — home" className="shrink-0">
          <Logo size="sm" preload />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
          <Suspense fallback={<NavList items={primaryNav} className="flex gap-8 text-small font-medium" />}>
            <NavLinks items={primaryNav} className="flex gap-8 text-small font-medium" />
          </Suspense>
          <ButtonLink href={contactCta.href} className="h-10 px-5">
            {contactCta.label}
          </ButtonLink>
        </nav>

        <MobileMenu items={primaryNav} cta={contactCta} />
      </Container>
    </header>
  );
}
