// Smaller copies of the images the homepage table shows (src/components/home/StudyTable.astro): each lesson's print
// (its featured image, else the full work) and every card's front (the full work), artist-series cards included.
// Whole images, only scaled down and recompressed: never cropped or recoloured. Writes public/img/table/ and the size
// list src/data/table-images.json.
// Run after adding a lesson or changing an image:  node scripts/table-images.mjs
// (sharp comes with Astro; nothing extra to install.)
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, basename } from 'node:path';
import sharp from 'sharp';
import { ARTIST_CARDS } from '../src/lib/publication.js';

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
const out = join(root, 'public/img/table');
mkdirSync(out, { recursive: true });
const artworks = Object.fromEntries(readdirSync(join(root, 'src/content/artworks')).filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(readFileSync(join(root, 'src/content/artworks', f), 'utf8'))).map((a) => [a.id, a]));
const wanted = new Set();
for (const f of readdirSync(join(root, 'src/content/lessons')).filter((x) => x.endsWith('.mdx'))) {
  const fm = readFileSync(join(root, 'src/content/lessons', f), 'utf8').split('---')[1];
  const art = artworks[fm.match(/^artwork:\s*(\S+)/m)?.[1]];
  if (!art) continue;
  const key = fm.match(/^featured:\s*\n\s+image:\s*(\S+)/m)?.[1] ?? 'full';
  for (const k of new Set([key, 'full'])) { const img = art.images.find((i) => i.key === k) ?? art.images[0]; wanted.add(img.src); }
  // The course's further cards (`cards: [id, …]`), whose fronts appear in the homepage card box too.
  for (const id of fm.match(/^cards:\s*\[(.*)\]/m)?.[1].split(',').map((x) => x.trim()).filter(Boolean) ?? []) {
    const extra = artworks[id];
    if (extra) wanted.add((extra.images.find((i) => i.key === 'full') ?? extra.images[0]).src);
  }
}
// Artist-series cards (their fronts appear in the homepage card box).
for (const id of ARTIST_CARDS) {
  const art = artworks[id];
  if (art) wanted.add((art.images.find((i) => i.key === 'full') ?? art.images[0]).src);
}
// The print: at most 1100 px on its long side (the largest place on the table, at twice the pixel density); the small
// copy, 260 px, for the stage stacks and the card box.
const sizes = { large: 1100, small: 260 };
const list = {};
for (const src of [...wanted].sort()) {
  const file = join(root, 'public', src);
  const entry = {};
  for (const [name, edge] of Object.entries(sizes)) {
    const dest = `/img/table/${name === 'small' ? 's-' : ''}${basename(src)}`;
    const info = await sharp(file).rotate().resize({ width: edge, height: edge, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: name === 'small' ? 78 : 82, mozjpeg: true, progressive: true }).toFile(join(root, 'public', dest));
    entry[name] = { src: dest, width: info.width, height: info.height };
  }
  list[src] = entry;
  console.log(src, entry.large.width + '×' + entry.large.height);
}
writeFileSync(join(root, 'src/data/table-images.json'), JSON.stringify(list, null, 2) + '\n');
