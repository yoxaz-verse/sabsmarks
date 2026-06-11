import urllib.request
import urllib.error
import concurrent.futures

urls = [
  "https://res.cloudinary.com/zyotsm0a/image/upload/v1780902936/dpvxobz57ucvv1siztb5.jpg",
  "https://res.cloudinary.com/zyotsm0a/image/upload/v1780901041/hdwxtclchn52zm30nzue.jpg",
  "https://res.cloudinary.com/zyotsm0a/image/upload/v1780900920/dxrfoe3dhcu11yjwvido.jpg",
  "https://res.cloudinary.com/zyotsm0a/image/upload/v1781167176/r3xrfzquw1b9a2rik5mi.jpg",
  "https://res.cloudinary.com/zyotsm0a/image/upload/v1781167386/f1mews3k2wjthp88xwvr.jpg",
  "https://res.cloudinary.com/zyotsm0a/image/upload/v1781090385/j7astf5aw53f5wo1hs4q.jpg",
  "https://res.cloudinary.com/zyotsm0a/image/upload/v1781090443/qqseuh0dnvkbdkae1ljl.png",
  "https://res.cloudinary.com/zyotsm0a/image/upload/v1781170801/nqzdhrz8g9p5eovmydyy.jpg",
  "https://res.cloudinary.com/zyotsm0a/image/upload/v1781165266/faqae9drjym2khufqcrd.jpg",
  "https://res.cloudinary.com/zyotsm0a/image/upload/v1780901788/wygzwb5o4w5rgm6h5vth.jpg",
  "https://res.cloudinary.com/zyotsm0a/image/upload/v1781090970/yqmnqthzuh79bplaproy.png",
  "https://res.cloudinary.com/zyotsm0a/image/upload/v1780901667/ey8h4ifswqbhal9aqqls.jpg",
  "https://res.cloudinary.com/zyotsm0a/image/upload/v1781166968/qhldrljitoqzl47o2lmk.jpg",
  "https://res.cloudinary.com/zyotsm0a/image/upload/v1780902602/ncvlz5x2lnfnqfc4djyk.jpg",
  "https://res.cloudinary.com/zyotsm0a/image/upload/v1780900963/jc0olaz5jrl3xtc1fnxy.jpg",
  "https://res.cloudinary.com/zyotsm0a/image/upload/v1780902770/aow25opk1zlezrwe5qwg.jpg",
  "https://res.cloudinary.com/zyotsm0a/image/upload/v1781090555/xobccbc4dplqytqikaix.jpg",
  "https://res.cloudinary.com/zyotsm0a/image/upload/v1781171035/edjwctfjkzmbhz8gm3wz.jpg"
]

def check_url(url):
    png_url = url
    if ".jpg" in png_url:
        png_url = png_url.replace(".jpg", ".png")
    elif ".jpeg" in png_url:
        png_url = png_url.replace(".jpeg", ".png")
    
    transformed_url = png_url.replace("/image/upload/", "/image/upload/e_background_removal/")
    
    try:
        req = urllib.request.Request(transformed_url, method='HEAD')
        with urllib.request.urlopen(req, timeout=15) as resp:
            return transformed_url, resp.status
    except Exception as e:
        # If HEAD fails, try GET since Cloudinary might process on GET
        try:
            req = urllib.request.Request(transformed_url, method='GET')
            with urllib.request.urlopen(req, timeout=15) as resp:
                return transformed_url, resp.status
        except Exception as e2:
            return transformed_url, f"Error: {e2}"

print("Checking all URLs with e_background_removal...")
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
    results = list(executor.map(check_url, urls))

success = True
for url, status in results:
    print(f"Status: {status} -> {url}")
    if status != 200:
        success = False

if success:
    print("\nAll URLs successfully returned 200 OK with e_background_removal!")
else:
    print("\nSome URLs failed to return 200 OK.")
