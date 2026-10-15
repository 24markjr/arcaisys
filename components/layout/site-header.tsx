import Link from "next/link";
import { Suspense } from "react";
import { contactCta, primaryNav } from "@/content/navigation";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { NavLinks, NavList } from "./nav-links";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header
      data-site-header
      style={{ viewTransitionName: "site-header" }}
      className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur-md"
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-action focus:px-4 focus:py-2 focus:text-on-action"
      >
        Skip to content
      </a>
      <Container className="flex h-(--header-h) items-center justify-between gap-8">
        <Link href="/" aria-label="Arcaisys — home" className="shrink-0">
          <Logo size="nav" preload />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
          <Suspense fallback={<NavList items={primaryNav} className="flex gap-8 text-small font-medium" />}>
            <NavLinks items={primaryNav} className="flex gap-8 text-small font-medium" />
          </Suspense>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <ButtonLink href={contactCta.href} className="h-10 px-5">
              {contactCta.label}
            </ButtonLink>
          </div>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <MobileMenu items={primaryNav} cta={contactCta} />
        </div>
      </Container>
      {/* Reading progress: a hairline in the ribbon gradient, driven by CSS scroll timelines. */}
      <div aria-hidden className="scroll-progress" />
    </header>
  );
}
