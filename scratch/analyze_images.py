import urllib.request
import os
from PIL import Image

url_vivek = 'https://res.cloudinary.com/zyotsm0a/image/upload/v1780902936/dpvxobz57ucvv1siztb5.jpg'
url_bg_removal = 'https://res.cloudinary.com/zyotsm0a/image/upload/e_background_removal/v1780902936/dpvxobz57ucvv1siztb5.png'
url_make_trans_10 = 'https://res.cloudinary.com/zyotsm0a/image/upload/e_make_transparent:10/v1780902936/dpvxobz57ucvv1siztb5.png'

os.makedirs('scratch/images', exist_ok=True)

print("Downloading images...")
urllib.request.urlretrieve(url_bg_removal, 'scratch/images/bg_removal.png')
print("Downloaded bg_removal.png")
urllib.request.urlretrieve(url_make_trans_10, 'scratch/images/make_trans_10.png')
print("Downloaded make_trans_10.png")

img_bg = Image.open('scratch/images/bg_removal.png').convert('RGBA')
img_trans = Image.open('scratch/images/make_trans_10.png').convert('RGBA')

width, height = img_bg.size
print(f"Image dimensions: {width}x{height}")

# Sample some coordinates:
# 1. Top left corner (should be background, i.e., transparent)
# 2. Center of the image (should be subject, i.e., opaque in AI removal, but possibly transparent in make_trans)
coords = [
    ("Top-left background", (10, 10)),
    ("Center (face/hair area)", (width // 2, height // 2)),
    ("Upper-middle (hair/head)", (width // 2, height // 4)),
    ("Lower-middle (suit/shirt)", (width // 2, 3 * height // 4))
]

print("\n--- Transparency Analysis (Alpha value: 0 = fully transparent, 255 = fully opaque) ---")
for label, (x, y) in coords:
    alpha_bg = img_bg.getpixel((x, y))[3]
    alpha_trans = img_trans.getpixel((x, y))[3]
    print(f"{label} at ({x}, {y}):")
    print(f"  AI Background Removal: {alpha_bg}")
    print(f"  e_make_transparent:10: {alpha_trans}")
