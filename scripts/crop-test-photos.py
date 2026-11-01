import hashlib
from pathlib import Path

import fitz
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "test"
DEST = ROOT / "public" / "images" / "life"
DEST.mkdir(parents=True, exist_ok=True)

NAMES = {
    "WhatsApp Image 2026-11-01 at 4.17.51 PM.jpeg": "garden.jpg",
    "WhatsApp Image 2026-11-01 at 4.17.52 PM.jpeg": "boys-garden.jpg",
    "WhatsApp Image 2026-11-01 at 4.17.52 PM (1).jpeg": "pond.jpg",
    "WhatsApp Image 2026-11-01 at 4.17.52 PM (2).jpeg": "maroon-yard.jpg",
    "WhatsApp Image 2026-11-01 at 4.17.53 PM.jpeg": "khaki-class.jpg",
    "WhatsApp Image 2026-11-01 at 4.17.53 PM (1).jpeg": "girls-hills.jpg",
    "WhatsApp Image 2026-11-01 at 4.17.53 PM (2).jpeg": "class-extra.jpg",
    "WhatsApp Image 2026-11-01 at 4.17.54 PM.jpeg": "blue-building.jpg",
    "WhatsApp Image 2026-11-01 at 4.17.54 PM (1).jpeg": "blue-line.jpg",
    "WhatsApp Image 2026-11-01 at 4.17.55 PM.jpeg": "young-blue.jpg",
    "WhatsApp Image 2026-11-01 at 4.17.55 PM (1).jpeg": "young-blue-2.jpg",
    "WhatsApp Image 2026-11-01 at 4.17.56 PM.jpeg": "maroon-group.jpg",
    "WhatsApp Image 2026-11-01 at 4.17.56 PM (1).jpeg": "maroon-group-2.jpg",
}


def white_fraction(pix, y, thresh=242):
    n = pix.n
    row = pix.samples[y * pix.width * n : (y + 1) * pix.width * n]
    white = 0
    count = 0
    for x in range(0, pix.width, 4):
        i = x * n
        if row[i] >= thresh and row[i + 1] >= thresh and row[i + 2] >= thresh:
            white += 1
        count += 1
    return white / max(count, 1)


def content_box(pix):
    w, h, n = pix.width, pix.height, pix.n
    data = pix.samples
    top = bottom = left = right = None
    for y in range(h):
        if white_fraction(pix, y) < 0.97:
            top = y
            break
    for y in range(h - 1, -1, -1):
        if white_fraction(pix, y) < 0.97:
            bottom = y
            break
    if top is None:
        return 0, 0, w - 1, h - 1
    for x in range(w):
        for y in range(top, bottom + 1, 4):
            i = (y * w + x) * n
            if data[i] < 242 or data[i + 1] < 242 or data[i + 2] < 242:
                left = x
                break
        if left is not None:
            break
    for x in range(w - 1, -1, -1):
        for y in range(top, bottom + 1, 4):
            i = (y * w + x) * n
            if data[i] < 242 or data[i + 1] < 242 or data[i + 2] < 242:
                right = x
                break
        if right is not None:
            break
    return left or 0, top, right or w - 1, bottom


def drop_caption(pix, box):
    left, top, right, bottom = box
    height = bottom - top + 1
    limit = top + int(height * 0.7)
    photo_bottom = None
    for y in range(bottom, limit, -1):
        if white_fraction(pix, y) < 0.2:
            photo_bottom = y
            break
    if photo_bottom is None or bottom - photo_bottom < 36:
        return box
    return left, top, right, photo_bottom


seen = set()
for filename, name in NAMES.items():
    path = SRC / filename
    if not path.exists():
        print("missing", filename)
        continue
    digest = hashlib.md5(path.read_bytes()).hexdigest()
    if digest in seen:
        print("dup", name)
        continue
    seen.add(digest)
    doc = fitz.open(path)
    page = doc[0]
    zoom = 1600 / page.rect.width
    pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), alpha=False)
    left, top, right, bottom = drop_caption(pix, content_box(pix))
    image = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    image = image.crop((left, top, right + 1, bottom + 1))
    if image.width > 1600:
        image = image.resize((1600, int(image.height * 1600 / image.width)), Image.Resampling.LANCZOS)
    image.save(DEST / name, "JPEG", quality=82, optimize=True)
    print(name, image.width, image.height)
    doc.close()
