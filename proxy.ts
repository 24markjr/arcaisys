import { NextResponse, type NextRequest } from "next/server";
import { products } from "@/content/products";

const known = new Set(products.map((product) => product.slug));

/**
 * Unknown product URLs must return a real HTTP 404. Without this, /products/<slug>
 * streams the not-found page with status 200 (Next.js renders it after headers are
 * sent). Rewriting to a route that doesn't exist makes Next.js serve the custom 404
 * page with the correct status. (docs/audit/findings.md F-10)
 */
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && !known.has(slug)) {
    return NextResponse.rewrite(new URL("/__not-found", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/products/:slug",
};
