import sharp from 'sharp';
import { readdir, unlink } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS = path.join(__dirname, 'src', 'assets');

const jobs = [
  // Hero background: resize to max 1920w, convert to WebP q=75
  {
    input: path.join(ASSETS, 'background.png'),
    output: path.join(ASSETS, 'background.webp'),
    width: 1920,
    quality: 75,
  },
  // Service images: resize to max 800w, convert to WebP q=80
  {
    input: path.join(ASSETS, 'haircut.jpeg'),
    output: path.join(ASSETS, 'haircut.webp'),
    width: 800,
    quality: 80,
  },
  {
    input: path.join(ASSETS, 'beardtrim.jpeg'),
    output: path.join(ASSETS, 'beardtrim.webp'),
    width: 800,
    quality: 80,
  },
  {
    input: path.join(ASSETS, 'shave.jpeg'),
    output: path.join(ASSETS, 'shave.webp'),
    width: 800,
    quality: 80,
  },
  {
    input: path.join(ASSETS, 'kidscut.jpeg'),
    output: path.join(ASSETS, 'kidscut.webp'),
    width: 800,
    quality: 80,
  },
];

let totalBefore = 0;
let totalAfter = 0;

for (const job of jobs) {
  const { input, output, width, quality } = job;
  const meta = await sharp(input).metadata();
  const inputStat = (await import('fs')).statSync(input);
  const beforeKB = (inputStat.size / 1024).toFixed(1);

  await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(output);

  const outputStat = (await import('fs')).statSync(output);
  const afterKB = (outputStat.size / 1024).toFixed(1);

  totalBefore += inputStat.size;
  totalAfter += outputStat.size;

  const saved = (((inputStat.size - outputStat.size) / inputStat.size) * 100).toFixed(0);
  console.log(`✅ ${path.basename(input)} → ${path.basename(output)}: ${beforeKB}KB → ${afterKB}KB (${saved}% smaller)`);
}

console.log(`\n🎯 Total: ${(totalBefore/1024).toFixed(0)}KB → ${(totalAfter/1024).toFixed(0)}KB`);
