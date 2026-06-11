const fs = require('fs');

const filePath = '/Users/jacoob/.gemini/antigravity-ide/brain/c2f34bb7-3ba1-45e2-b1b2-c12b0962a493/.system_generated/steps/135/content.md';
const content = fs.readFileSync(filePath, 'utf8');

console.log('File length:', content.length);
console.log('First 500 chars:', content.substring(0, 500));

// Find script tags containing JSON
const scripts = [];
const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
let match;
while ((match = scriptRegex.exec(content)) !== null) {
  const inner = match[1];
  if (inner.includes('viewerModel') || inner.includes('wix-essential-viewer-model') || inner.includes('masterPage')) {
    console.log('Found Wix state script, length:', inner.length);
    scripts.push(inner);
  }
}

// Let's search if there are any readable strings
const matches = content.match(/"text":"([^"]+)"/g);
if (matches) {
  console.log('Found JSON text properties:', matches.length);
  const uniqueTexts = Array.from(new Set(matches.map(m => {
    try {
      return JSON.parse('{' + m + '}').text;
    } catch(e) {
      return m;
    }
  })));
  console.log(uniqueTexts.slice(0, 40).join('\n'));
} else {
  console.log('No "text" JSON properties found.');
}
