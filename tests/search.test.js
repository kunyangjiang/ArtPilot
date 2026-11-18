import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { placesOfArtwork, placeOverrides, placeById } from '../src/data/places.js';
import { mdxSections } from '../src/lib/searchText.js';
import { prepare, search } from '../src/lib/search.js';

// The site search (src/pages/search.astro): the place register, the text taken from the MDX, and the search itself on
// the built index. A place search must find a city's works and pages without the reader knowing its museums' names.
const artDir = new URL('../src/content/artworks/', import.meta.url);
const artworks = readdirSync(artDir).map((f) => JSON.parse(readFileSync(new URL(f, artDir), 'utf8')));
const indexFile = new URL('../dist/search-index.json', import.meta.url);
const built = existsSync(indexFile);
const index = built ? prepare(JSON.parse(readFileSync(indexFile, 'utf8'))) : null;
const urls = (r, type) => (r.groups.find((g) => g.type === type)?.items ?? []).map((x) => x.doc.url);

test('every artwork record is placed: its institution or site is in the register, or its override says why not', () => {
  const unplaced = artworks.filter((a) => !(a.id in placeOverrides) && placesOfArtwork(a.id, a).length === 0);
  assert.deepEqual(unplaced.map((a) => `${a.id}: ${a.collection ?? a.location}`), [],
    'add the institution or site to src/data/places.js (or an override when the record has no place)');
  for (const [id, list] of Object.entries(placeOverrides)) {
    assert.ok(artworks.some((a) => a.id === id), `override for a record that does not exist: ${id}`);
    for (const p of list) assert.ok(placeById(p.place), `${id}: unknown place ${p.place}`);
  }
});

test('the text for the search keeps what a reader sees and drops markup', () => {
  const s = mdxSections([
    "import Band from '../../components/Band.astro';",
    '<Band kind="prelude">',
    '开头一段，见[博物馆的页面](https://example.org/a)。',
    '</Band>',
    '## 第一节',
    "<SortGame items={[{ label: '甲 > 乙', note: '史密森尼学会的记录' }]} />",
    '**粗体**与<Term id="gl-x">术语</Term>。',
  ].join('\n'));
  assert.equal(s.length, 2);
  assert.equal(s[0].t, '开头一段，见博物馆的页面。');
  assert.equal(s[1].h, '第一节');
  assert.equal(s[1].t, '甲 > 乙 史密森尼学会的记录 粗体与 术语 。');
});

test('华盛顿 finds the works held there and the pages about them, including those that never write 华盛顿', { skip: !built }, () => {
  const r = search(index, '华盛顿');
  assert.deepEqual(r.places.map((p) => p.id), ['washington']);
  assert.equal(r.overview[0], 'artwork', 'a place search shows the works first in the overview');
  const held = artworks.filter((a) => placesOfArtwork(a.id, a).some((p) => p.place === 'washington' && p.role === 'held')).map((a) => `/artworks/${a.id}/`);
  assert.ok(held.length >= 7);
  for (const u of held) assert.ok(urls(r, 'artwork').includes(u), `work held in Washington: ${u}`);
  assert.ok(urls(r, 'artwork').includes('/artworks/art-benin-plaque-82-5-3-001/'), 'a work that has left is still found, as formerly held');
  for (const slug of ['pacific-ancestors-and-waves', 'high-renaissance-masters', 'venetian-colour', 'impressionism-light', 'americas-story-quilt-quipu', 'mughal-court-painting', 'brush-and-line']) {
    assert.ok(urls(r, 'lesson').includes(`/lessons/${slug}/`), `course ${slug}`);
  }
  assert.ok(urls(r, 'story').includes('/stories/pacita-abad-colour-across-borders/'));
  assert.ok(urls(r, 'story').includes('/stories/zhang-daqian-after-the-ancients/'));
  assert.ok(urls(r, 'case').includes('/cases/until-it-goes-home/'));
  // At least one course is found only through its museums' names: the word itself is nowhere in it.
  const viaMuseums = r.groups.find((g) => g.type === 'lesson').items.filter((x) => !JSON.stringify(x.doc).includes('华盛顿'));
  assert.ok(viaMuseums.length > 0);
});

test('a city does not take another city’s museum: 北京 does not count the Palace Museum in Taipei', { skip: !built }, () => {
  const r = search(index, '北京');
  for (const g of r.groups) for (const it of g.items) for (const p of it.passages) {
    assert.doesNotMatch(p.html, /台北<mark>|国立<mark>故宫/, `${it.doc.url}: ${p.html}`);
  }
});

test('every word must match, and the suggested searches all find something', { skip: !built }, () => {
  const both = search(index, '美国 青铜');
  const quilt = search(index, '青铜');
  const total = (r) => r.groups.reduce((n, g) => n + g.items.length, 0);
  assert.ok(total(both) > 0 && total(both) < total(quilt));
  assert.equal(total(search(index, '水星人')), 0);
  const page = readFileSync(new URL('../src/pages/search.astro', import.meta.url), 'utf8');
  const tries = JSON.parse(page.match(/const tries = (\[[^\]]*\])/)[1].replace(/'/g, '"'));
  for (const t of tries) assert.ok(total(search(index, t)) > 0, `suggested search finds nothing: ${t}`);
});

test('a query typed without spaces is read as its words, and other spellings of a name find the same pages', { skip: !built }, () => {
  const total = (r) => r.groups.reduce((n, g) => n + g.items.length, 0);
  for (const q of ['华盛顿青铜', '华盛顿的青铜', '青铜华盛顿']) {
    const r = search(index, q);
    assert.ok(total(r) > 0, `${q} finds nothing`);
    assert.ok(r.split, `${q} should say how it was read`);
  }
  assert.equal(search(index, '水星人').groups.length, 0, 'a split must not invent words');
  const same = (a, b) => assert.deepEqual(urls(search(index, a), 'lesson').sort(), urls(search(index, b), 'lesson').sort(), `${a} ≠ ${b}`);
  same('凡高', '梵高');
  same('Monet', '莫奈');
  same('Cezanne', 'Cézanne');
});

test('a plain word is found wherever it stands, a museum’s name only for its own city', { skip: !built }, () => {
  const total = (r) => r.groups.reduce((n, g) => n + g.items.length, 0);
  assert.ok(total(search(index, '故宫')) >= total(search(index, '故宫博物院')), '故宫 must find at least what 故宫博物院 finds');
  // 故宫博物院 is Beijing's: a page that only names Taipei's 国立故宫博物院 is not found for it.
  for (const g of search(index, '故宫博物院').groups) for (const it of g.items) for (const p of it.passages) {
    assert.doesNotMatch(p.html, /国立<mark>|台北<mark>/, `${it.doc.url}: ${p.html}`);
  }
});

test('the kinds keep one order, and passages come from what a page tells, not its source list', { skip: !built }, () => {
  for (const q of ['华盛顿', '青铜', '大都会', '张大千']) {
    const kinds = search(index, q).groups.map((g) => g.type);
    assert.deepEqual(kinds, ['lesson', 'story', 'case', 'artwork'].filter((t) => kinds.includes(t)), q);
  }
  for (const q of ['华盛顿', '大都会', '美国国家美术馆']) for (const g of search(index, q).groups) for (const it of g.items) {
    const told = it.doc.s.some((s) => !/出处|链接|来源|参考|延伸阅读|注释|图片说明|致谢/.test(s.h) && s.t.includes(q));
    if (told) for (const p of it.passages) assert.doesNotMatch(p.h, /出处|链接/, `${q} ${it.doc.url}`);
  }
});

test('an artwork result has the small copy of its card image, and only a card that shows an image has one', { skip: !built }, () => {
  for (const d of index.docs.filter((x) => x.type === 'artwork')) {
    const a = artworks.find((x) => x.id === d.id);
    const hasImage = a.card?.image !== null && (a.images ?? []).some((i) => i.key === (a.card?.image ?? 'full'));
    assert.equal(Boolean(d.img), hasImage, d.id);
    if (d.img) assert.ok(existsSync(new URL(`../dist${d.img}`, import.meta.url)), `missing ${d.img}`);
  }
});

test('every section a result points to exists on its page', { skip: !built }, () => {
  for (const d of index.docs) {
    if (d.type === 'artwork') continue;
    const html = readFileSync(new URL(`../dist${d.url}index.html`, import.meta.url), 'utf8');
    for (const s of d.s) if (s.a) assert.ok(html.includes(`id="${s.a}"`), `${d.url}#${s.a}`);
  }
});
