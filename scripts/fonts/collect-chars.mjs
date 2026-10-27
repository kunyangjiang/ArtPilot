// Every non-ASCII character a reader can see or hear on /, /courses/ and /collection/ in the built site: text,
// aria-label, title, alt, the book's page labels, and the homepage note card's labels (data-label, data-title).
// Run after `npm run build`:
//   node scripts/fonts/collect-chars.mjs > site-chars.txt
import { readFileSync } from 'node:fs';

const strip = (h) => h.replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<script(?![^>]*application\/json)[\s\S]*?<\/script>/g, ' ');
// Text the homepage's scripts write (src/components/home/StudyTable.astro): the card box count and the reading slip.
let text = '已收藏 件 · 陈列在 个展柜 继续阅读 · 课程';
for (const file of ['dist/index.html', 'dist/courses/index.html', 'dist/collection/index.html']) {
  const html = strip(readFileSync(file, 'utf8'));
  text += html.replace(/<[^>]+>/g, ' ');
  for (const m of html.matchAll(/(?:aria-label|title|alt|data-label|data-title)="([^"]*)"/g)) text += ' ' + m[1];
  for (const m of html.matchAll(/<script[^>]*application\/json[^>]*>([\s\S]*?)<\/script>/g)) {
    const labels = JSON.parse(m[1]);
    text += ' ' + (labels.spreads ?? []).join('') + (labels.pages ?? []).join('');
  }
}
text = text.replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&amp;/g, '&').replace(/&quot;/g, '"');
process.stdout.write([...new Set([...text].filter((c) => c.codePointAt(0) > 0x7f))].join(''));
