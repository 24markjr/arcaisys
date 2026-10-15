import { HomeHero } from "@/components/sections/home/hero";
import { CompanyIntro } from "@/components/sections/home/company-intro";
import { Portfolio } from "@/components/sections/home/portfolio";
import { Approach } from "@/components/sections/home/approach";
import { Sectors } from "@/components/sections/home/sectors";
import { ClosingCta } from "@/components/sections/closing-cta";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <CompanyIntro />
      <Portfolio />
      <Approach />
      <Sectors />
      <ClosingCta />
    </>
  );
}
