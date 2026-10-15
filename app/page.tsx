import Image from "next/image";
import { arcaisysBrand } from "@/content/brand";
import { products } from "@/content/products";

/**
 * Phase 1 holding page: verifies tokens, fonts and brand assets render.
 * Replaced by the real homepage in Phase 4.
 */
export default function Home() {
  const { mark, wordmark } = arcaisysBrand;

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-between gap-24 px-6 py-16 sm:px-10 sm:py-24">
      <div className="flex items-center gap-4">
        <Image
          src={mark.src}
          width={mark.width}
          height={mark.height}
          alt=""
          priority
          className="h-10 w-auto"
        />
        <Image
          src={wordmark.src}
          width={wordmark.width}
          height={wordmark.height}
          alt={wordmark.alt}
          priority
          className="h-4 w-auto"
        />
      </div>

      <section className="max-w-3xl">
        <p className="mb-6 text-xs font-medium tracking-[0.2em] text-ink-muted uppercase">Foundation build</p>
        <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] font-semibold tracking-[-0.03em] text-ink">
          The site is being built.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
          Brand system, pages and content follow in the next phases.
        </p>
      </section>

      <ul className="grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:grid-cols-4">
        {products.map((product) => (
          <li key={product.slug} className="flex flex-col gap-4 bg-surface p-6">
            <Image
              src={product.logo.src}
              width={product.logo.width}
              height={product.logo.height}
              alt={product.logo.alt}
              className="h-20 w-auto self-start"
            />
            <span className="text-xs tracking-[0.16em] text-ink-muted uppercase">{product.tagline}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
