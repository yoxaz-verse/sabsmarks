const https = require('https');
const fs = require('fs');
const path = require('path');

const urlVivek = 'https://res.cloudinary.com/zyotsm0a/image/upload/v1780902936/dpvxobz57ucvv1siztb5.jpg';

function download(url, filename) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download: ${res.statusCode}`));
        return;
      }
      const fileStream = fs.createWriteStream(filename);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded ${filename}`);
        resolve();
      });
    }).on('error', reject);
  });
}

async function run() {
  const dir = path.join(__dirname, '../scratch/images');
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }

  try {
    console.log('Downloading test images...');
    await download(
      urlVivek.replace('/image/upload/', '/image/upload/e_background_removal/').replace(/\.[a-zA-Z0-9]+$/, '.png'),
      path.join(dir, 'vivek_bg_removal.png')
    );
    await download(
      urlVivek.replace('/image/upload/', '/image/upload/e_make_transparent:2/').replace(/\.[a-zA-Z0-9]+$/, '.png'),
      path.join(dir, 'vivek_transparent_2.png')
    );
    await download(
      urlVivek,
      path.join(dir, 'vivek_original.jpg')
    );
    console.log('Done!');
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
