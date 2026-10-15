import { ogSize, renderOg } from "@/lib/og";

export const alt = "Arcaisys — software products: Hospio, Meridian, PACS and RestoQR";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    eyebrow: "Software products",
    title: "Hospio. Meridian. PACS. RestoQR.",
  });
}
