import { ogSize, renderOg } from "@/lib/og";

export const alt = "Arcaisys — Intelligent software, built for the real world.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    eyebrow: "Understand. Build. Verify.",
    title: "Intelligent software, built for the real world.",
  });
}
