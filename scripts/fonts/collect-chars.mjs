// Every non-ASCII character a reader can see or hear on / and /courses/ in the built site: text, aria-label, title,
// alt, and the book's page labels. Run after `npm run build`:  node scripts/fonts/collect-chars.mjs > site-chars.txt
import { readFileSync } from 'node:fs';

const strip = (h) => h.replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<script(?![^>]*application\/json)[\s\S]*?<\/script>/g, ' ');
let text = '';
for (const file of ['dist/index.html', 'dist/courses/index.html']) {
  const html = strip(readFileSync(file, 'utf8'));
  text += html.replace(/<[^>]+>/g, ' ');
  for (const m of html.matchAll(/(?:aria-label|title|alt)="([^"]*)"/g)) text += ' ' + m[1];
  for (const m of html.matchAll(/<script[^>]*application\/json[^>]*>([\s\S]*?)<\/script>/g)) {
    const labels = JSON.parse(m[1]);
    text += ' ' + (labels.spreads ?? []).join('') + (labels.pages ?? []).join('');
  }
}
text = text.replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&amp;/g, '&').replace(/&quot;/g, '"');
process.stdout.write([...new Set([...text].filter((c) => c.codePointAt(0) > 0x7f))].join(''));
