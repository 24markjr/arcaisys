import { notFound } from "next/navigation";
import { getProduct, products } from "@/content/products";
import { ogSize, renderOg } from "@/lib/og";

export const alt = "An Arcaisys product";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return renderOg({
    eyebrow: "An Arcaisys product",
    title: product.name,
    subtitle: product.tagline,
    art: product.tile ?? product.logo,
  });
}
