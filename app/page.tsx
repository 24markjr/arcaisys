import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { HomeHero } from "@/components/sections/home/hero";
import { CompanyIntro } from "@/components/sections/home/company-intro";
import { Portfolio } from "@/components/sections/home/portfolio";
import { Approach } from "@/components/sections/home/approach";
import { Sectors } from "@/components/sections/home/sectors";
import { ClosingCta } from "@/components/sections/closing-cta";
import { PageTransition } from "@/components/motion/page-transition";

export const metadata: Metadata = {
  // The root layout supplies the full "Arcaisys — Software products" title.
  ...pageMetadata({ description: siteConfig.description, path: "/" }),
};

export default function HomePage() {
  return (
    <PageTransition>
      <HomeHero />
      <CompanyIntro />
      <Portfolio />
      <Approach />
      <Sectors />
      <ClosingCta />
    </PageTransition>
  );
}
