import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ARTIST_CARDS } from '../src/lib/publication.js';
import { publishedCards } from './published-cards.js';

// Phase 4.24, Artist Stories Batch C: five stories appended to the artist series after Batch B.
const dir = new URL('../src/content/essays/', import.meta.url);
const story = (id) => readFileSync(new URL(`${id}.mdx`, dir), 'utf8');
const fm = (src) => src.match(/^---\r?\n([\s\S]*?)\r?\n---/)[1];
const artwork = (file) => JSON.parse(readFileSync(new URL(`../src/content/artworks/${file}.json`, import.meta.url), 'utf8'));
const BATCH = [
  ['zhao-mengfu-between-dynasties', 'art-zhao-mengfu-twin-pines-001', 'zhao-mengfu-twin-pines'],
  ['artemisia-not-a-confession', 'art-artemisia-judith-uffizi-001', 'artemisia-judith-uffizi'],
  ['monet-he-built-a-pond', 'art-monet-water-lily-pond-1900-001', 'monet-water-lily-pond-1900'],
  ['gaudi-fragments-of-a-church', 'art-gaudi-sagrada-familia-001', 'gaudi-sagrada-familia'],
  ['nek-chand-secret-kingdom', 'art-nek-chand-bangle-man-001', 'nek-chand-bangle-man'],
];

// Narrative Han characters: the body before the sources, without frontmatter, imports, headings, datelines and
// component blocks (their props are UI text, not narrative). Callout prose counts.
const narrativeHan = (src) => {
  let t = src.replace(/^---[\s\S]*?\n---\n/, '').split('<Band kind="sources">')[0];
  t = t.replace(/^<([A-Z]\w*)[\s\S]*?(\/>|<\/\1>)\s*$/gm, (m, name) => (name === 'Callout' || name === 'Band' ? m.replace(/<\/?\w+[^>]*>/g, '') : ''));
  const body = t.split('\n').filter((l) => !/^\s*(#|import |<)/.test(l)).join('\n');
  return (body.match(/\p{Script=Han}/gu) ?? []).length;
};

test('Batch C follows Batch B in the artist series, in publication order', () => {
  assert.deepEqual(ARTIST_CARDS.slice(9, 14), BATCH.map(([, card]) => card));
  for (const [id, card] of BATCH) assert.match(fm(story(id)), new RegExp(`^card: ${card}$`, 'm'), `${id} awards ${card}`);
});

test('numbers: everything before Batch C keeps its number; the new cards are 141–145', () => {
  const cards = publishedCards();
  assert.equal(cards.get('art-kingelez-kimbembele-ihunga-001').no, '140');
  BATCH.forEach(([, card], i) => assert.equal(cards.get(card).no, String(141 + i)));
  assert.ok(cards.size >= 145); // later batches append after these
});

test('Production Standard v2: every story carries at least 5,000 Han characters of narrative', () => {
  for (const [id] of BATCH) {
    const n = narrativeHan(story(id));
    assert.ok(n >= 5000, `${id}: ${n} narrative Han characters`);
  }
});

test('rights: works under copyright are typographic cards; public-domain works show their own image', () => {
  const nek = artwork('nek-chand-bangle-man');
  assert.ok(nek.officialPage?.url.startsWith('https://'), 'Nek Chand: official page');
  assert.equal(nek.card.image, null, 'Nek Chand: typographic card');
  assert.ok(nek.images.every((i) => i.subject), 'Nek Chand: the only image is this site’s diagram, named by its subject');
  for (const file of ['zhao-mengfu-twin-pines', 'artemisia-judith-uffizi', 'monet-water-lily-pond-1900', 'gaudi-sagrada-familia']) {
    const a = artwork(file);
    assert.equal(a.officialPage, undefined, `${file}: shown in full`);
    assert.ok(a.images.some((i) => i.key === 'full'), `${file}: a full image`);
    assert.ok(a.images.every((i) => i.credit?.licence && i.credit?.sourceUrl), `${file}: every image carries its licence and source`);
  }
});

test('each story is told, cited and ended the same way, with its own engine and interactions', () => {
  for (const [id, card] of BATCH) {
    const src = story(id);
    assert.match(src, /<Band kind="prelude">/, `${id}: says how it is told`);
    assert.match(src, /<Band kind="sources">/, `${id}: sources`);
    assert.match(src, new RegExp(`<LessonComplete artwork="${card}" kind="story" />`), `${id}: awards its card at the end`);
    assert.ok((src.match(/^## /gm) ?? []).length >= 6, `${id}: several scenes`);
    assert.doesNotMatch(src, /\*\*[^*\n]*[。，；：！？]\*\*[一-鿿]/, `${id}: no CJK bold that markdown cannot close`);
  }
  assert.match(story('zhao-mengfu-between-dynasties'), /<ScrollUnroll/);
  assert.match(story('zhao-mengfu-between-dynasties'), /<FindOnImage/);
  assert.match(story('artemisia-not-a-confession'), /<PaintingReadings/);
  assert.match(story('monet-he-built-a-pond'), /<FeatureCompare/);
  assert.match(story('gaudi-fragments-of-a-church'), /<CatenaryModel/);
  assert.match(story('nek-chand-secret-kingdom'), /<SourceDates/);
  // The trial is told from the record, and the Judith is not read as a confession without saying so.
  const art = story('artemisia-not-a-confession');
  assert.match(art, /不描写过程/);
  assert.match(art, /<Callout kind="interpretation">/);
  // Gaudí: the official construction status is dated, and later work is told apart from his own.
  const g = story('gaudi-fragments-of-a-church');
  assert.match(g, /2026 年 10 月 29 日查阅/);
  assert.match(g, /后人按高迪的方案建造/);
});
