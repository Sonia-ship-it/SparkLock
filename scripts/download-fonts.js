const https = require('https');
const fs = require('fs');
const path = require('path');

const files = [
  {
    url: 'https://raw.githubusercontent.com/google/fonts/main/ofl/outfit/Outfit-Regular.ttf',
    dest: path.join(__dirname, '..', 'assets', 'fonts', 'Outfit-Regular.ttf')
  },
  {
    url: 'https://raw.githubusercontent.com/google/fonts/main/ofl/outfit/Outfit-Bold.ttf',
    dest: path.join(__dirname, '..', 'assets', 'fonts', 'Outfit-Bold.ttf')
  }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}. Status code: ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

(async () => {
  try {
    for (const f of files) {
      console.log(`Downloading ${f.url} -> ${f.dest}`);
      await download(f.url, f.dest);
      console.log(`Saved ${f.dest}`);
    }
    console.log('All fonts downloaded.');
  } catch (err) {
    console.error('Error downloading fonts:', err.message || err);
    process.exit(1);
  }
})();
