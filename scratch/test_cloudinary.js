const https = require('https');

const originalUrl = 'https://res.cloudinary.com/zyotsm0a/image/upload/v1781170801/nqzdhrz8g9p5eovmydyy.jpg';

// Transform url
let transformedUrl = originalUrl.replace(/\.[a-zA-Z0-9]+$/, '.png');
transformedUrl = transformedUrl.replace('/image/upload/', '/image/upload/e_make_transparent:10/');

console.log('Testing URL:', transformedUrl);

https.get(transformedUrl, (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', res.headers['content-type']);
  
  if (res.statusCode === 200) {
    console.log('Success! Cloudinary transformed the image.');
  } else {
    console.log('Failed! Status code is not 200.');
  }
}).on('error', (e) => {
  console.error('Error fetching image:', e);
});
