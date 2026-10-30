import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ARTIST_CARDS } from '../src/lib/publication.js';
import { publishedCards } from './published-cards.js';

// Phase 4.23, Artist Stories Batch B: four stories appended to the artist series after Batch A.
const dir = new URL('../src/content/essays/', import.meta.url);
const story = (id) => readFileSync(new URL(`${id}.mdx`, dir), 'utf8');
const fm = (src) => src.match(/^---\r?\n([\s\S]*?)\r?\n---/)[1];
const artwork = (file) => JSON.parse(readFileSync(new URL(`../src/content/artworks/${file}.json`, import.meta.url), 'utf8'));
const BATCH = [
  ['su-shi-cold-food', 'art-su-shi-cold-food-001', 'su-shi-cold-food'],
  ['rembrandt-inventory', 'art-rembrandt-self-portrait-1660-001', 'rembrandt-self-portrait-1660'],
  ['zhang-daqian-after-the-ancients', 'art-zhang-daqian-after-shitao-001', 'zhang-daqian-after-shitao'],
  ['kingelez-city-from-the-future', 'art-kingelez-kimbembele-ihunga-001', 'kingelez-kimbembele-ihunga'],
];

test('Batch B follows Batch A in the artist series, in publication order', () => {
  assert.deepEqual(ARTIST_CARDS.slice(5, 9), BATCH.map(([, card]) => card));
  for (const [id, card] of BATCH) assert.match(fm(story(id)), new RegExp(`^card: ${card}$`, 'm'), `${id} awards ${card}`);
});

test('numbers: everything before Batch B keeps its number; the new cards are 137–140', () => {
  const cards = publishedCards();
  assert.equal(cards.get('art-howe-war-dancer-001').no, '136');
  BATCH.forEach(([, card], i) => assert.equal(cards.get(card).no, String(137 + i)));
  assert.ok(cards.size >= 140);
});

test('works under copyright are typographic cards with an official page; public-domain works show their own image', () => {
  for (const file of ['zhang-daqian-after-shitao', 'kingelez-kimbembele-ihunga']) {
    const a = artwork(file);
    assert.ok(a.officialPage?.url.startsWith('https://'), `${file}: official page`);
    assert.equal(a.card.image, null, `${file}: typographic card`);
    assert.ok(a.images.every((i) => i.subject), `${file}: every image is another thing, named by its subject`);
  }
  for (const file of ['su-shi-cold-food', 'rembrandt-self-portrait-1660']) {
    const a = artwork(file);
    assert.equal(a.officialPage, undefined, `${file}: shown in full`);
    assert.ok(a.images.every((i) => i.credit?.licence), `${file}: every image carries its licence`);
  }
});

test('each story tells, cites and ends the same way, without gates, and keeps its own engine', () => {
  for (const [id, card] of BATCH) {
    const src = story(id);
    assert.match(src, /<Band kind="prelude">/, `${id}: says how it is told`);
    assert.match(src, /<Band kind="sources">/, `${id}: sources`);
    assert.match(src, new RegExp(`<LessonComplete artwork="${card}" kind="story" />`), `${id}: awards its card at the end`);
    assert.ok((src.match(/^## /gm) ?? []).length >= 5, `${id}: several scenes`);
    assert.doesNotMatch(src, /\*\*[^*\n]*[。，；：！？]\*\*[一-鿿]/, `${id}: no CJK bold that markdown cannot close`);
  }
  assert.match(story('su-shi-cold-food'), /<ScrollUnroll/);
  assert.match(story('rembrandt-inventory'), /<InventoryRooms/);
  assert.match(story('rembrandt-inventory'), /<SamePlate/);
  assert.match(story('zhang-daqian-after-the-ancients'), /大千临/);
  // The speculative frame is marked as fiction wherever it appears, and never stands alone.
  const k = story('kingelez-city-from-the-future');
  assert.equal((k.match(/<Callout kind="fiction">/g) ?? []).length, 2);
});
