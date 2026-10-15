import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { cacheLife } from "next/cache";

/** Social share images (Open Graph / Twitter), 1200×630, in the site's visual language. */
export const ogSize = { width: 1200, height: 630 };

/**
 * Fonts and logos for the renderer. Cached so the image can be prerendered at build
 * time (plain async file reads would force it to render on every request). Paths are
 * scoped to their folders so the bundler doesn't trace the whole project.
 */
async function loadAssets(artPath: string | null) {
  "use cache";
  cacheLife("max");
  const font = (name: string) => readFile(join(process.cwd(), "assets", "fonts", name));
  const brand = async (name: string) =>
    `data:image/png;base64,${(await readFile(join(process.cwd(), "public", "brand", name))).toString("base64")}`;
  const [semibold, medium, mark, wordmark, art] = await Promise.all([
    font("manrope-600.woff"),
    font("manrope-500.woff"),
    brand("arcaisys-mark.png"),
    brand("arcaisys-wordmark.png"),
    artPath ? brand(artPath) : Promise.resolve(null),
  ]);
  return { semibold: semibold.toString("base64"), medium: medium.toString("base64"), mark, wordmark, art };
}

/** The signature ribbon, as a standalone SVG (CSS variables don't exist inside the renderer). */
const ribbonSvg = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 240" preserveAspectRatio="none">
    <defs><linearGradient id="g" x1="0" y1="220" x2="1600" y2="20" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#F89818"/><stop offset="0.35" stop-color="#F86810"/>
      <stop offset="0.72" stop-color="#D81018"/><stop offset="1" stop-color="#800010"/>
    </linearGradient></defs>
    <path d="M0 228 C 420 220, 700 150, 900 110 S 1300 30, 1600 18 C 1310 42, 1110 92, 920 136 S 430 232, 0 228 Z" fill="url(#g)"/>
  </svg>`,
)}`;

type OgOptions = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Optional artwork shown on a white panel at the right, e.g. a product logo. */
  art?: { src: string; width: number; height: number };
};

export async function renderOg({ eyebrow, title, subtitle, art }: OgOptions) {
  if (art && !art.src.startsWith("/brand/")) throw new Error(`OG art must live in public/brand: ${art.src}`);
  const assets = await loadAssets(art ? art.src.replace("/brand/", "") : null);
  const { mark, wordmark } = assets;
  const artUrl = assets.art;
  const semibold = Buffer.from(assets.semibold, "base64");
  const medium = Buffer.from(assets.medium, "base64");

  const artBox = 330;
  const artScale = art ? Math.min(artBox / art.width, artBox / art.height) : 1;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#FFFFFF",
        padding: "64px 72px 0",
        fontFamily: "Manrope",
        color: "#0F1622",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- rendered to PNG, not the DOM */}
        <img src={mark} width={60} height={52} alt="" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={wordmark} width={162} height={24} alt="" />
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 48 }}>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: art ? 640 : 960 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 20,
              fontWeight: 500,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#686D79",
            }}
          >
            <div style={{ width: 40, height: 2, background: "#D81018" }} />
            {eyebrow}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: art ? 84 : 76,
              fontWeight: 600,
              letterSpacing: -3,
              lineHeight: 1.02,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                marginTop: 22,
                fontSize: 24,
                fontWeight: 500,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#4A505C",
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>
        {art && artUrl ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 380,
              height: 380,
              border: "1px solid #EAE7E3",
              borderRadius: 6,
              background: "#FAF9F7",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={artUrl} width={art.width * artScale} height={art.height * artScale} alt="" />
          </div>
        ) : null}
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={ribbonSvg} width={1200} height={130} alt="" style={{ marginLeft: -72, marginTop: 36 }} />
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "Manrope", data: semibold, weight: 600, style: "normal" },
        { name: "Manrope", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
