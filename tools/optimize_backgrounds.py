"""Create web backgrounds from the original root PNGs. Requires Pillow."""

from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "assets" / "backgrounds"


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    original_bytes = 0
    web_bytes = 0
    for number in (1, 2):
        source = ROOT / f"{number}.png"
        destination = OUTPUT / f"{number}.webp"
        with Image.open(source) as image:
            image.save(destination, format="WEBP", quality=82, method=6)
        original_bytes += source.stat().st_size
        web_bytes += destination.stat().st_size
        print(f"{source.name}: {source.stat().st_size:,} -> {destination.stat().st_size:,} bytes")
    print(f"Total reduction: {100 * (1 - web_bytes / original_bytes):.1f}%")


if __name__ == "__main__":
    main()
