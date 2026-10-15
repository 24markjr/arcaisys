import type { BrandImage } from "./types";

/** Arcaisys brand assets, generated from logos/Arcaisys-Logo.png. */
export const arcaisysBrand = {
  lockup: {
    src: "/brand/arcaisys-lockup.png",
    width: 692,
    height: 702,
    alt: "Arcaisys",
  },
  mark: {
    src: "/brand/arcaisys-mark.png",
    width: 692,
    height: 605,
    alt: "Arcaisys",
  },
  wordmark: {
    src: "/brand/arcaisys-wordmark.png",
    width: 649,
    height: 96,
    alt: "Arcaisys",
  },
} satisfies Record<string, BrandImage>;
