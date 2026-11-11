"""Turn raw screenshots into responsive WebP sets plus tiny blur placeholders.

Usage: python3 scripts/optimize_images.py <src_dir> <game_poster.png>
Writes public/img/<name>-<w>.webp and src/data/images.generated.json.
"""
import base64, io, json, sys
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "img"
OUT.mkdir(parents=True, exist_ok=True)

def process(src: Path, name: str, widths: list[int], crop_border=False):
    im = Image.open(src).convert("RGB")
    if crop_border:  # mobile captures have a dark device-frame margin
        bg = im.getpixel((2, im.height // 2))
        w, h = im.size
        l = next(x for x in range(w) if abs(sum(im.getpixel((x, h // 2))) - sum(bg)) > 30)
        r = next(x for x in range(w - 1, 0, -1) if abs(sum(im.getpixel((x, h // 2))) - sum(bg)) > 30)
        t = next(y for y in range(h) if abs(sum(im.getpixel((w // 2, y))) - sum(bg)) > 30)
        b = next(y for y in range(h - 1, 0, -1) if abs(sum(im.getpixel((w // 2, y))) - sum(bg)) > 30)
        im = im.crop((l, t, r + 1, b + 1))
    made = []
    for w in widths:
        if w > im.width:
            w = im.width
        h = round(im.height * w / im.width)
        im.resize((w, h), Image.LANCZOS).save(OUT / f"{name}-{w}.webp", "WEBP", quality=80, method=6)
        made.append(w)
    tiny = im.resize((20, max(1, round(im.height * 20 / im.width))), Image.LANCZOS)
    buf = io.BytesIO(); tiny.save(buf, "WEBP", quality=40)
    return {
        "widths": sorted(set(made)),
        "width": im.width, "height": im.height,
        "placeholder": "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode(),
    }

def main():
    src_dir, poster = Path(sys.argv[1]), Path(sys.argv[2])
    meta = {}
    for f in sorted(src_dir.glob("*.png")):
        stem = f.stem
        if stem.startswith("desktop"):
            meta[stem] = process(f, stem, [640, 1100, 1600])
        else:
            meta[stem] = process(f, stem, [300, 600], crop_border=True)
    meta["card-duel-poster"] = process(poster, "card-duel-poster", [430, 860])
    (ROOT / "src" / "data").mkdir(parents=True, exist_ok=True)
    (ROOT / "src" / "data" / "images.generated.json").write_text(json.dumps(meta, indent=1))

if __name__ == "__main__":
    main()
