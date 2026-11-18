import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { readdir, readFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { cardImage, thumbPath, THUMB_SIZE } from './src/lib/thumbs.js';

// Small copies of the artwork card images for the site search (src/lib/thumbs.js), written into the build. Without
// them the search shows each work's typographic tile instead, so a build where they cannot be made still works.
function thumbs() {
  return {
    name: 'artpilot-thumbs',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        let sharp;
        try { sharp = (await import('sharp')).default; } catch { logger.warn('sharp is not available: no search thumbnails'); return; }
        const root = new URL('./', import.meta.url);
        const records = new URL('src/content/artworks/', root);
        const out = new URL('img/thumbs/', dir);
        await mkdir(out, { recursive: true });
        let n = 0;
        for (const f of await readdir(records)) {
          if (!f.endsWith('.json')) continue;
          const img = cardImage(JSON.parse(await readFile(new URL(f, records), 'utf8')));
          if (!img) continue;
          await sharp(fileURLToPath(new URL(`public${img.src}`, root)))
            .resize(THUMB_SIZE, THUMB_SIZE, { fit: 'inside', withoutEnlargement: true })
            .webp({ quality: 72 })
            .toFile(fileURLToPath(new URL(thumbPath(img.src).slice(1), dir)));
          n++;
        }
        logger.info(`${n} search thumbnails`);
      },
    },
  };
}

export default defineConfig({
  integrations: [mdx(), thumbs()],
});
