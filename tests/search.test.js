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
  assert.equal(r.groups[0].type, 'artwork', 'a place search lists the works first');
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

test('every section a result points to exists on its page', { skip: !built }, () => {
  for (const d of index.docs) {
    if (d.type === 'artwork') continue;
    const html = readFileSync(new URL(`../dist${d.url}index.html`, import.meta.url), 'utf8');
    for (const s of d.s) if (s.a) assert.ok(html.includes(`id="${s.a}"`), `${d.url}#${s.a}`);
  }
});
