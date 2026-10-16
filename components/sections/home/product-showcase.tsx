"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Check } from "lucide-react";
import { products } from "@/content/products";
import { ProductTile } from "@/components/brand/product-tile";
import { ButtonLink, ArrowLink } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tagline } from "@/components/ui/tagline";
import { cn } from "@/lib/cn";

/**
 * The product suite as tabs: pick a product, see what it is, its modules and how to get it.
 * WAI-ARIA tabs pattern — arrow keys move between products, Home/End jump to the ends.
 */
export function ProductShowcase() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const product = products[active] ?? products[0]!;

  const onKeyDown = (event: KeyboardEvent) => {
    const last = products.length - 1;
    const next =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? active === last
          ? 0
          : active + 1
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? active === 0
            ? last
            : active - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10 [&>*]:min-w-0">
      <div
        role="tablist"
        aria-label="Arcaisys products"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:col-span-4 lg:flex lg:flex-col lg:gap-3"
      >
        {products.map((item, i) => {
          const selected = i === active;
          return (
            <button
              key={item.slug}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={`${id}-tab-${item.slug}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                "group relative flex min-w-0 items-center gap-2.5 rounded-[4px] border p-2.5 text-left transition-[background-color,border-color,box-shadow] duration-(--dur-base) ease-out-expo sm:gap-3 sm:p-3 lg:gap-4 lg:p-4",
                selected
                  ? "border-line-strong bg-surface shadow-[0_18px_40px_-28px_rgb(15_22_34/0.45)]"
                  : "border-line bg-surface/60 hover:bg-surface lg:border-transparent lg:bg-transparent lg:hover:border-line",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "absolute inset-y-3 left-0 w-0.5 rounded-full bg-[image:var(--brand-gradient)] transition-opacity duration-(--dur-base)",
                  selected ? "opacity-100" : "opacity-0",
                )}
              />
              <ProductTile product={item} className="size-8 sm:size-10 lg:size-12" />
              <span className="flex min-w-0 flex-col gap-1.5">
                <span className="text-lead leading-none font-semibold">{item.name}</span>
                <span className="hidden truncate text-small text-ink-muted lg:block">{item.category}</span>
              </span>
              <span className="ml-auto hidden xl:block">
                <StatusBadge status={item.status} className="text-[0.625rem]" />
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${product.slug}`}
        tabIndex={0}
        className="relative overflow-hidden rounded-[4px] border border-line-strong bg-surface lg:col-span-8"
      >
        {/* Accent wash in the product's colour */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 size-96 rounded-full opacity-[0.12] blur-3xl transition-colors duration-700"
          style={{ backgroundColor: product.accent }}
        />
        <div
          key={product.slug}
          className="showcase-in relative grid gap-10 p-5 sm:p-8 md:p-10 xl:grid-cols-2 [&>*]:min-w-0"
        >
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="font-mono text-label text-ink-muted uppercase">
                {product.sector} · SaaS product
              </span>
              <StatusBadge status={product.status} />
            </div>
            <h3 className="mt-6 text-[clamp(1.625rem,1.3rem+1vw,2.25rem)] leading-[1.1] font-semibold tracking-[-0.025em]">
              {product.headline}
            </h3>
            <Tagline text={product.tagline} accent={product.accent} className="mt-4 text-ink-muted" />
            <p className="mt-6 text-ink-soft">{product.summary}</p>
            <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-4 pt-8">
              {product.externalUrl ? (
                <ButtonLink href={product.externalUrl} external>{`Open ${product.name}`}</ButtonLink>
              ) : (
                <ButtonLink href="/contact?interest=early-access">Join early access</ButtonLink>
              )}
              <ArrowLink href={`/products/${product.slug}`}>{`About ${product.name}`}</ArrowLink>
            </div>
          </div>

          <div className="self-start rounded-[4px] border border-line bg-surface-alt">
            <p className="flex items-center justify-between border-b border-line px-5 py-3.5 font-mono text-label text-ink-muted uppercase">
              <span>{product.capabilitiesHeading}</span>
              <span aria-hidden className="tabular-nums">
                {String(product.capabilities.length).padStart(2, "0")}
              </span>
            </p>
            <ul>
              {product.capabilities.map((capability, i) => (
                <li
                  key={capability.title}
                  className="showcase-row flex gap-3 border-b border-line px-5 py-4 last:border-b-0"
                  style={{ animationDelay: `${120 + i * 70}ms` }}
                >
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0" style={{ color: product.accent }} />
                  <span className="text-small font-semibold text-ink">{capability.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
