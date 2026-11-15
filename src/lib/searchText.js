// Plain text for the site search (src/pages/search-index.json.ts), taken from a lesson's or an article's MDX source:
// what a reader can see on the page, split at its headings so a result can point to the section it was found in.
// Plain JS, so the tests can call it without a build step (tests/search.test.js).
//
// What stays: prose, headings, list items, link text, and the Chinese text inside components (an interactive's notes
// and labels are written in their props). What goes: imports, tags, prop names, URLs, code and markdown markup.

const CJK = /[㐀-鿿豈-﫿]/;

// Every JSX or HTML tag in the text, replaced by the visible strings it carries: quoted props with Chinese in them.
// A tag ends at the first '>' outside quotes and braces, so `items={[{ a: 1 }]}` and `note: '甲 > 乙'` do not end it.
function stripTags(src) {
  let out = '';
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (c === '<' && /[A-Za-z/!]/.test(src[i + 1] ?? '')) {
      let j = i + 1, depth = 0, quote = null, cur = '';
      const kept = [];
      for (; j < src.length; j++) {
        const d = src[j];
        if (quote) {
          if (d === '\\' && j + 1 < src.length) { cur += src[++j]; continue; }
          if (d === quote) { if (CJK.test(cur)) kept.push(cur); quote = null; cur = ''; } else cur += d;
          continue;
        }
        if (d === '"' || d === "'" || d === '`') { quote = d; cur = ''; }
        else if (d === '{') depth++;
        else if (d === '}') depth--;
        else if (d === '>' && depth <= 0) break;
      }
      out += kept.length ? ` ${kept.join(' ')} ` : ' ';
      i = j + 1;
      continue;
    }
    out += c;
    i++;
  }
  return out;
}

const clean = (s) => s
  .replace(/\{\/\*[\s\S]*?\*\/\}/g, ' ') // JSX comments
  .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1') // images: their alt text
  .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links: their text
  .replace(/https?:\/\/\S+/g, ' ')
  .replace(/`([^`]*)`/g, '$1')
  .replace(/\*|__/g, '')
  .replace(/^\s{0,3}(?:[-*+]|\d+\.)\s+/gm, '') // list markers
  .replace(/^\s{0,3}>\s?/gm, '') // quotes
  .replace(/^\s*-{3,}\s*$/gm, ' ') // scene breaks
  .replace(/\|/g, ' ')
  .replace(/[{}]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

/** Split an MDX body into sections: [{ h, t }] — the heading (empty before the first one) and its plain text. */
export function mdxSections(body) {
  const lines = body
    .replace(/^(?:import|export)\s.*$/gm, '')
    .split(/\r?\n/);
  const sections = [{ h: '', raw: [] }];
  for (const line of lines) {
    const m = line.match(/^(#{2,4})\s+(.+?)\s*#*\s*$/);
    if (m) sections.push({ h: clean(stripTags(m[2])), raw: [] });
    else sections.at(-1).raw.push(line);
  }
  return sections
    .map(({ h, raw }) => ({ h, t: clean(stripTags(raw.join('\n'))) }))
    .filter((s) => s.t || s.h);
}
