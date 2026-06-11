const https = require('https');

const originalUrl = 'https://res.cloudinary.com/zyotsm0a/image/upload/v1781170801/nqzdhrz8g9p5eovmydyy.jpg';

async function testUrl(transform) {
  const url = originalUrl.replace('/image/upload/', `/image/upload/${transform}/`).replace(/\.[a-zA-Z0-9]+$/, '.png');
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ transform, statusCode: res.statusCode, contentType: res.headers['content-type'] });
    });
  });
}

async function run() {
  console.log('Testing Cloudinary background removal options...');
  const results = await Promise.all([
    testUrl('e_background_removal'),
    testUrl('e_bgremoval'),
    testUrl('e_make_transparent:5'), // lower tolerance
    testUrl('e_make_transparent:2'), // extremely low tolerance
  ]);
  console.log('Results:', results);
}

run();
