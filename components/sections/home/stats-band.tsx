import { companyFacts, sectors } from "@/content/company";
import { products } from "@/content/products";
import { Container } from "@/components/ui/container";

const pad = (n: number) => String(n).padStart(2, "0");

/** Company at a glance, in numbers. Every figure is derived from the content, never invented. */
export function StatsBand() {
  const live = products.filter((product) => product.status === "live").length;
  const stats = [
    { value: pad(products.length), label: "Subscription products" },
    { value: pad(sectors.length), label: "Industries served" },
    { value: pad(live), label: "Platform live in production" },
    {
      value: companyFacts.foundedIso.slice(0, 4),
      label: `Founded in ${companyFacts.location?.split(",")[0] ?? "India"}`,
    },
  ];
  return (
    <section aria-label="Arcaisys in numbers" className="border-b border-line bg-surface">
      <Container>
        <dl data-reveal="stagger" className="-mx-5 grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={
                "relative flex flex-col-reverse gap-3 border-line px-5 py-10 md:py-14" +
                (i % 2 === 1 ? " border-l" : "") +
                (i >= 2 ? " border-t lg:border-t-0" : "") +
                (i === 2 ? " lg:border-l" : "")
              }
            >
              <dt className="font-mono text-label text-ink-muted uppercase">{stat.label}</dt>
              <dd className="flex flex-col gap-6 text-h1 font-semibold text-ink tabular-nums before:block before:h-0.5 before:w-10 before:bg-[image:var(--brand-gradient)] before:content-['']">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
