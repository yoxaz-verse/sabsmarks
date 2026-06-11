const https = require('https');

const urls = [
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
];

function testUrl(url) {
  return new Promise((resolve) => {
    let transformedUrl = url.replace(/\.[a-zA-Z0-9]+$/, '.png');
    transformedUrl = transformedUrl.replace('/image/upload/', '/image/upload/e_make_transparent:10/');

    https.get(transformedUrl, (res) => {
      resolve({ url: transformedUrl, statusCode: res.statusCode });
    }).on('error', (e) => {
      resolve({ url: transformedUrl, error: e.message });
    });
  });
}

async function run() {
  console.log('Testing all transformed URLs...');
  for (const url of urls) {
    const res = await testUrl(url);
    console.log(`URL: ${res.url} -> Status: ${res.statusCode || 'ERROR: ' + res.error}`);
  }
}

run();
