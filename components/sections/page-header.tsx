import type { ReactNode } from "react";
import { Container, Grid } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { intro } from "@/lib/motion";

type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Right-hand column content on wide screens (e.g. a logo panel). */
  aside?: ReactNode;
  children?: ReactNode;
};

/** Opening block for inner pages. The homepage has its own hero. */
export function PageHeader({ eyebrow, title, lead, aside, children }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-line bg-surface pt-16 pb-20 md:pt-24 md:pb-28">
      <div aria-hidden className="blueprint pointer-events-none absolute inset-0" />
      <Container className="relative">
        <Grid className="items-end gap-y-12">
          <div className={aside ? "col-span-4 md:col-span-7" : "col-span-4 md:col-span-10"}>
            <Eyebrow intro={0}>{eyebrow}</Eyebrow>
            <Heading as="h1" size="h1" intro={1} className="mt-8">
              {title}
            </Heading>
            {lead ? (
              <div {...intro(2)} className="mt-8 max-w-[44ch] text-lead text-ink-soft">
                {lead}
              </div>
            ) : null}
            {children ? (
              <div {...intro(3)} className="mt-10">
                {children}
              </div>
            ) : null}
          </div>
          {aside ? (
            <div {...intro(2)} className="col-span-4 md:col-span-5">
              {aside}
            </div>
          ) : null}
        </Grid>
      </Container>
    </header>
  );
}
