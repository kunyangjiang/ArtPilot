import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { publishedCards } from './published-cards.js';

// Phase 4.26, Narrative Case 02: two versions of Elegant Gathering in the Apricot Garden (the Met and Zhenjiang scrolls).
const ID = 'two-scrolls-one-gathering';
const src = readFileSync(new URL(`../src/content/essays/${ID}.mdx`, import.meta.url), 'utf8');
const fm = src.match(/^---\r?\n([\s\S]*?)\r?\n---/)[1];
const art = JSON.parse(readFileSync(new URL('../src/content/artworks/apricot-garden-met.json', import.meta.url), 'utf8'));

// Narrative Han characters, counted as for the artist stories: the body before the sources, without frontmatter,
// imports, headings, datelines and component blocks. Callout prose counts.
const narrativeHan = (s) => {
  let t = s.replace(/^---[\s\S]*?\n---\n/, '').split('<Band kind="sources">')[0];
  t = t.replace(/^<([A-Z]\w*)[\s\S]*?(\/>|<\/\1>)\s*$/gm, (m, name) => (name === 'Callout' || name === 'Band' ? m.replace(/<\/?\w+[^>]*>/g, '') : ''));
  const body = t.split('\n').filter((l) => !/^\s*(#|import |<)/.test(l)).join('\n');
  return (body.match(/\p{Script=Han}/gu) ?? []).length;
};

test('Case 02 is a case: it awards no card, and the collection stays at 151', () => {
  assert.match(fm, /^kind: case$/m);
  assert.doesNotMatch(fm, /^cards?:/m, 'a case awards no card');
  assert.equal(art.card, undefined, 'the scroll has no card face');
  assert.equal(publishedCards().size, 151);
});

test('the cases hall lists it after Chartres (hall order is by file name)', () => {
  const cases = readdirSync(new URL('../src/content/essays/', import.meta.url))
    .filter((f) => /^kind: case$/m.test(readFileSync(new URL(`../src/content/essays/${f}`, import.meta.url), 'utf8')))
    .map((f) => f.replace(/\.mdx$/, '')).sort();
  assert.deepEqual(cases.slice(0, 2), ['chartres-glass', ID]);
});

test('Case Production Standard v1: at least 7,000 Han characters of narrative', () => {
  const n = narrativeHan(src);
  assert.ok(n >= 7000, `${n} narrative Han characters`);
});

test('the fictional frame is declared at the start and accounted for at the end', () => {
  assert.match(src, /<Band kind="prelude">[\s\S]*?是虚构的[\s\S]*?<\/Band>/);
  assert.match(src, /<Callout kind="fiction">/);
  assert.match(src, /## 这个故事里哪些是真的[\s\S]*\*\*真实的：\*\*[\s\S]*\*\*虚构的：\*\*[\s\S]*\*\*至今没有答案的：\*\*/);
  assert.match(src, /<Band kind="sources">/);
  assert.doesNotMatch(src, /\*\*[^*\n]*[。，；：！？]\*\*[一-鿿]/, 'no CJK bold that markdown cannot close');
});

test('both scrolls and the competing scholarship are present, attributed by name', () => {
  for (const s of ['何慕文', '吴诵芬', '陆九皋', '宋后楣', '班宗华', '铃木敬', '李东阳', '翁同龢']) assert.match(src, new RegExp(s), s);
  assert.match(src, /画师谢庭循佚焉/);
  assert.match(src, /After Xie Huan/);
  assert.match(src, /1989\.141\.3/);
  assert.match(src, /镇江博物馆/);
});

test('visual teaching and interactions: real images, at most three questions an exercise, a find game before its answers', () => {
  for (const c of ['<ScrollUnroll', '<FindOnImage', '<FeatureCompare', '<InferenceChain', '<SortGame', '<LabelDraft']) assert.ok(src.includes(c), c);
  assert.ok((src.match(/<ArtworkFigure /g) ?? []).length >= 5, 'at least five figures');
  const find = src.indexOf('<FindOnImage');
  assert.ok(find > 0 && find < src.indexOf('画师谢庭循佚焉。'), 'the find game comes before the line that reveals its answer');
  const chain = src.match(/<InferenceChain[\s\S]*?\/>/)[0];
  assert.equal((chain.match(/claim: /g) ?? []).length, 3);
  assert.match(chain, /verdict: 'justified'/);
  assert.match(chain, /verdict: 'plausible'/);
  assert.match(chain, /verdict: 'unknowable'/);
});

test('no component but the ReadingTracker carries data-reading (the tracker looks it up document-wide)', () => {
  const dir = new URL('../src/components/', import.meta.url);
  for (const f of readdirSync(dir).filter((n) => n.endsWith('.astro') && n !== 'ReadingTracker.astro')) {
    assert.doesNotMatch(readFileSync(new URL(f, dir), 'utf8'), /\sdata-reading[=\s>]/, f);
  }
});

test('rights: only open images are copied; the Zhenjiang scroll is linked, never reproduced', () => {
  assert.equal(art.kind, 'painting');
  assert.ok(art.artist && art.medium && art.dimensionsCm && art.collection, 'painting contract');
  assert.equal(art.artist, '传谢环', 'the maker line does not claim Xie Huan himself');
  for (const img of art.images) {
    assert.ok(img.credit?.licence && img.credit?.sourceUrl, `${img.key}: licence and source`);
    assert.ok(/^https:\/\/(www\.metmuseum\.org|www\.loc\.gov)\//.test(img.credit.sourceUrl), `${img.key}: an open collection`);
    assert.ok(existsSync(new URL(`../public${img.src}`, import.meta.url)), `${img.key}: file exists`);
    if (img.credit.sourceUrl.includes('loc.gov')) assert.ok(img.subject, `${img.key}: the print names itself, it is not the scroll`);
  }
  assert.doesNotMatch(JSON.stringify(art), /zhenjiang|镇江本\.jpg/i, 'no Zhenjiang image');
  assert.ok(readdirSync(new URL('../public/img/', import.meta.url)).every((f) => !/zhenjiang/i.test(f)));
  assert.match(src, /<Callout kind="look">[\s\S]*?zj-museum\.com\.cn[\s\S]*?<\/Callout>/, 'the Zhenjiang scroll has a viewing guide with its museum page');
});
