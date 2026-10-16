import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { HomeHero } from "@/components/sections/home/hero";
import { CompanyIntro } from "@/components/sections/home/company-intro";
import { Portfolio } from "@/components/sections/home/portfolio";
import { Capabilities } from "@/components/sections/home/capabilities";
import { StatsBand } from "@/components/sections/home/stats-band";
import { TaglineMarquee } from "@/components/sections/home/tagline-marquee";
import { Subscription } from "@/components/sections/home/subscription";
import { Faq } from "@/components/sections/faq";
import { ClosingCta } from "@/components/sections/closing-cta";
import { PageTransition } from "@/components/motion/page-transition";

export const metadata: Metadata = {
  // The root layout supplies the full "Arcaisys — <motto>" title.
  ...pageMetadata({ description: siteConfig.description, path: "/" }),
};

export default function HomePage() {
  return (
    <PageTransition>
      <HomeHero />
      <StatsBand />
      <TaglineMarquee />
      <Portfolio index="01" />
      <CompanyIntro index="02" />
      <Capabilities index="03" />
      <Subscription index="04" />
      <Faq index="05" />
      <ClosingCta />
    </PageTransition>
  );
}
