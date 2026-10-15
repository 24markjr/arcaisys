import { AscentGraphic } from "@/components/brand/ribbon";
import { PageTransition } from "@/components/motion/page-transition";
import { ButtonLink, ArrowLink } from "@/components/ui/button";
import { Container, Grid } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

export default function NotFound() {
  return (
    <PageTransition>
      <section className="overflow-hidden">
        <Container className="py-24 md:py-36">
          <Grid className="items-center gap-y-12">
            <div className="col-span-4 md:col-span-6">
              <Eyebrow index="404">Not found</Eyebrow>
              <h1 className="mt-8 text-h1 font-semibold">This page does not exist.</h1>
              <p className="mt-6 max-w-[40ch] text-lead text-ink-soft">
                The link may be out of date, or the address mistyped.
              </p>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
                <ButtonLink href="/">Back to home</ButtonLink>
                <ArrowLink href="/products">See the products</ArrowLink>
              </div>
            </div>
            <div className="col-span-4 md:col-span-6">
              <AscentGraphic className="opacity-60" />
            </div>
          </Grid>
        </Container>
      </section>
    </PageTransition>
  );
}
