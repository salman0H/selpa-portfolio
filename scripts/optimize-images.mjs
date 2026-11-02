import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';

// Keep originals; ship only the sizes each viewport needs.
await mkdir('public/images/optimized', { recursive: true });
await mkdir('src/data', { recursive: true });
const manifest = {};
const files = ['image_20812b', 'journal-raw', 'folio-raw', 'slider-final', 'slider-hide', 'slider-pattern', 'slider-stitch', 'image_208147', 'image_208183', 'image_20842c', 'image_2084aa', 'image_2084cb', 'image_208505'];
for (const file of files.map(name => `${name}.jpg`).sort()) {
  const source = `public/images/${file}`;
  const metadata = await sharp(source).rotate().metadata();
  const variants = [];
  for (const width of [480, 800, 1280]) {
    const name = `${file.replace('.jpg', '')}-${width}.webp`;
    const info = await sharp(source).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 78 }).toFile(`public/images/optimized/${name}`);
    variants.push({ src: `/images/optimized/${name}`, width: info.width });
  }
  manifest[`/images/${file}`] = { width: metadata.autoOrient.width, height: metadata.autoOrient.height, variants };
}
await writeFile('src/data/images.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`Optimized ${Object.keys(manifest).length} images.`);
