"""Turn the supplied logo PNGs into trimmed, web-ready brand assets.

Usage (from project root): python -I scripts/process-logos.py logos public/brand app
Never redraws artwork: only trims, removes flat white backgrounds and pads.
"""
import sys
from collections import deque
from pathlib import Path

from PIL import Image

src, out, app = (Path(p) for p in sys.argv[1:4])
out.mkdir(parents=True, exist_ok=True)
PAD = 8


def trim(im, pad=PAD):
    box = im.split()[3].point(lambda v: 255 if v > 8 else 0).getbbox()
    im = im.crop(box)
    canvas = Image.new("RGBA", (im.width + pad * 2, im.height + pad * 2), (0, 0, 0, 0))
    canvas.paste(im, (pad, pad))
    return canvas


def remove_white(im, tol=18, band=3):
    """Flood-fill near-white from the outer edges to transparent, then apply
    colour-to-alpha on a thin band so anti-aliased edges keep no white halo.
    Enclosed white areas (e.g. inside rings) are intentionally preserved."""
    im = im.convert("RGBA")
    w, h = im.size
    px = im.load()
    bg = bytearray(w * h)

    def is_white(p):
        return p[3] == 0 or min(p[:3]) >= 255 - tol

    q = deque()
    for x in range(w):
        q.extend([(x, 0), (x, h - 1)])
    for y in range(h):
        q.extend([(0, y), (w - 1, y)])
    while q:
        x, y = q.popleft()
        i = y * w + x
        if bg[i] or not is_white(px[x, y]):
            continue
        bg[i] = 1
        if x > 0: q.append((x - 1, y))
        if x < w - 1: q.append((x + 1, y))
        if y > 0: q.append((x, y - 1))
        if y < h - 1: q.append((x, y + 1))

    # distance (in px, chebyshev) from the background region, capped at band
    near = bytearray(w * h)
    frontier = [i for i in range(w * h) if bg[i]]
    for d in range(1, band + 1):
        nxt = []
        for i in frontier:
            x, y = i % w, i // w
            for dx in (-1, 0, 1):
                for dy in (-1, 0, 1):
                    xx, yy = x + dx, y + dy
                    if 0 <= xx < w and 0 <= yy < h:
                        j = yy * w + xx
                        if not bg[j] and not near[j]:
                            near[j] = d
                            nxt.append(j)
        frontier = nxt

    for i in range(w * h):
        x, y = i % w, i // w
        r, g, b, a = px[x, y]
        if bg[i]:
            px[x, y] = (0, 0, 0, 0)
        elif near[i]:
            # colour-to-alpha against white
            alpha = max(255 - r, 255 - g, 255 - b) / 255
            if alpha <= 0:
                px[x, y] = (0, 0, 0, 0)
                continue
            un = lambda c: max(0, min(255, round(255 - (255 - c) / alpha)))
            px[x, y] = (un(r), un(g), un(b), round(a * alpha))
    return im


def save(im, name, max_w=None):
    if max_w and im.width > max_w:
        im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)
    im.save(out / name, optimize=True)
    print(f"{name:32s} {im.width}x{im.height}")


# --- Arcaisys -------------------------------------------------------------
logo = Image.open(src / "Arcaisys-Logo.png").convert("RGBA")
save(trim(logo), "arcaisys-lockup.png")
save(trim(logo.crop((0, 0, 1024, 744))), "arcaisys-mark.png")
save(trim(logo.crop((0, 744, 1024, 1024))), "arcaisys-wordmark.png")

# Square app icons from the mark (transparent favicon, solid apple icon)
mark = trim(logo.crop((0, 0, 1024, 744)), pad=0)


def square(img, size, fill, inset):
    canvas = Image.new("RGBA", (size, size), fill)
    inner = size - inset * 2
    scale = inner / max(img.width, img.height)
    m = img.resize((round(img.width * scale), round(img.height * scale)), Image.LANCZOS)
    canvas.paste(m, ((size - m.width) // 2, (size - m.height) // 2), m)
    return canvas


square(mark, 512, (0, 0, 0, 0), 24).save(app / "icon.png", optimize=True)
square(mark, 180, (255, 255, 255, 255), 22).convert("RGB").save(app / "apple-icon.png", optimize=True)
square(mark, 48, (0, 0, 0, 0), 2).save(
    app / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)]
)
print("app icons written")

# --- Products -------------------------------------------------------------
for name in ("Hospio", "Meridian", "PACS"):
    slug = name.lower()
    save(trim(Image.open(src / f"{name}-logo.png").convert("RGBA")), f"{slug}-logo.png", 1200)
    tile = Image.open(src / f"{name}-icon.png").convert("RGBA")
    save(tile, f"{slug}-tile.png", 512)
    save(trim(remove_white(tile)), f"{slug}-symbol.png", 640)

resto = remove_white(Image.open(src / "RestoQr-logo.png"))
save(trim(resto), "restoqr-logo.png")


# --- Reversed (for dark surfaces) ----------------------------------------
def reverse_navy(im):
    """Recolour the dark navy ink to white; keep gradient accents and greys.
    Opaque white "gap" pixels (knock-outs drawn in white) become transparent,
    via colour-to-alpha so their anti-aliased edges don't leave a light fringe."""
    im = im.copy()
    px = im.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a = px[x, y]
            if not a:
                continue
            if max(r, g, b) < 90:
                px[x, y] = (255, 255, 255, a)
            elif min(r, g, b) >= 140 and max(r, g, b) - min(r, g, b) > 25 or min(r, g, b) >= 225:
                alpha = max(255 - r, 255 - g, 255 - b) / 255
                if alpha <= 0.02:
                    px[x, y] = (0, 0, 0, 0)
                    continue
                un = lambda c: max(0, min(255, round(255 - (255 - c) / alpha)))
                px[x, y] = (un(r), un(g), un(b), round(a * alpha))
    return im


for slug in ("hospio", "meridian", "pacs"):
    save(reverse_navy(Image.open(out / f"{slug}-logo.png").convert("RGBA")), f"{slug}-logo-reversed.png")
