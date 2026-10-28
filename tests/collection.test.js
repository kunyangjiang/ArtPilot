import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { COLLECTION_KEY, readCollection, collect, clearCollection, previewClaimed } from '../src/lib/collection.js';
import { cardNumber } from '../src/lib/publication.js';

const fakeStorage = (initial = {}) => {
  const data = { ...initial };
  return { getItem: (k) => (k in data ? data[k] : null), setItem: (k, v) => { data[k] = String(v); }, removeItem: (k) => { delete data[k]; }, data };
};

test('collect adds a card once and keeps the first date', () => {
  const s = fakeStorage();
  assert.equal(collect(s, 'art-a', '2026-01-01').added, true);
  assert.equal(collect(s, 'art-a', '2026-02-02').added, false);
  assert.deepEqual(readCollection(s), { 'art-a': { at: '2026-01-01' } });
});

test('unreadable or missing storage counts as an empty collection', () => {
  assert.deepEqual(readCollection(null), {});
  assert.deepEqual(readCollection(fakeStorage({ [COLLECTION_KEY]: 'not json' })), {});
  assert.deepEqual(readCollection(fakeStorage({ [COLLECTION_KEY]: '[1,2]' })), {});
  assert.deepEqual(readCollection(fakeStorage({ [COLLECTION_KEY]: '{"art-a":true,"art-b":{"at":"x"}}' })), { 'art-b': { at: 'x' } });
  const throwing = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); } };
  assert.equal(collect(throwing, 'art-a').added, true); // still reported for this visit
});

test('clearCollection empties the record', () => {
  const s = fakeStorage();
  collect(s, 'art-a');
  clearCollection(s);
  assert.deepEqual(readCollection(s), {});
});

test('claiming a second card keeps the first one and its date', () => {
  const s = fakeStorage({ [COLLECTION_KEY]: JSON.stringify({ 'art-fan-kuan-travelers-001': { at: '2026-10-25T08:00:00.000Z' } }) });
  assert.equal(collect(s, 'art-chartres-cathedral-001', '2026-10-26').added, true);
  assert.equal(collect(s, 'art-chartres-cathedral-001', '2026-10-27').added, false);
  assert.deepEqual(readCollection(s), {
    'art-fan-kuan-travelers-001': { at: '2026-10-25T08:00:00.000Z' },
    'art-chartres-cathedral-001': { at: '2026-10-26' },
  });
});

// One design for every card: a complete face, a unique issue number, and an image that belongs to the artwork.
test('every card face is complete and every card number is unique', async () => {
  const dir = new URL('../src/content/artworks/', import.meta.url);
  const cards = readdirSync(dir).filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(readFileSync(new URL(f, dir), 'utf8')))
    .filter((art) => art.card);
  // The archive grows with new lessons: the first two cards stay, and any further card is held to the same rules below.
  const have = cards.map((a) => a.id);
  for (const id of ['art-chartres-cathedral-001', 'art-fan-kuan-travelers-001']) assert.ok(have.includes(id), `${id} keeps its card`);
  assert.equal(new Set(have).size, have.length, 'one card per artwork');
  // A card's number is the course of the one lesson that awards it, or, for a card no lesson awards, its number in the
  // artist series (src/lib/publication.js); it is never stored on the card.
  const lessonDir = new URL('../src/content/lessons/', import.meta.url);
  const lessons = readdirSync(lessonDir).filter((f) => f.endsWith('.mdx')).map((f) => readFileSync(new URL(f, lessonDir), 'utf8'))
    .map((src) => ({ artwork: src.match(/^artwork: (\S+)$/m)?.[1], course: Number(src.match(/^course: (\d+)$/m)?.[1]) }));
  const { artistCardNumber } = await import('../src/lib/publication.js');
  const numbers = cards.map((art) => {
    const awarding = lessons.filter((l) => l.artwork === art.id);
    const artist = artistCardNumber(art.id);
    assert.equal(awarding.length + (artist ? 1 : 0), 1, `${art.id}: exactly one lesson, or one artist-series number, awards this card`);
    return artist ?? cardNumber(awarding[0].course);
  });
  assert.equal(new Set(numbers).size, cards.length, 'card numbers are unique');
  assert.equal(numbers[cards.findIndex((a) => a.id === 'art-fan-kuan-travelers-001')], '001', 'Fan Kuan (course 1) is No.001');
  assert.equal(numbers[cards.findIndex((a) => a.id === 'art-chartres-cathedral-001')], '030', 'Chartres (course 30) is No.030');
  for (const art of cards) {
    assert.equal(art.card.no, undefined, `${art.id}: no stored card number`);
    for (const k of ['type', 'period', 'blurb']) assert.ok(art.card[k], `${art.id}: card.${k}`);
    assert.ok(art.card.blurb.length <= 60, `${art.id}: blurb fits the no-image cover`);
    assert.ok(art.card.facets.length >= 1 && art.card.facets.length <= 4 && art.card.facets.every((f) => f.label && f.value));
    // A card image, when named, must be one of the artwork's own images.
    if (art.card.image) assert.ok(art.images.some((i) => i.key === art.card.image), `${art.id}: card image`);
    if (art.card.focus) assert.match(art.card.focus, /^\d{1,3}% \d{1,3}%$/);
    // The front's maker line: the card's own short line, else a painter, or for a building its place.
    assert.ok(art.card.maker ?? (art.kind === 'building' ? art.location : art.artist), `${art.id}: maker line`);
  }
});

test('card numbers follow the course: three digits, from 001 to 083', () => {
  for (const [course, no] of [[1, '001'], [8, '008'], [11, '011'], [24, '024'], [30, '030'], [48, '048'], [73, '073'], [83, '083']]) assert.equal(cardNumber(course), no);
  for (const bad of [0, 84, 1.5, '1', undefined]) assert.throws(() => cardNumber(bad));
});

// The homepage previews this browser's own cards only: never one merely because its record exists.
const published = [{ id: 'art-fan-kuan-travelers-001' }, { id: 'art-c08' }, { id: 'art-c11' }, { id: 'art-chartres-cathedral-001' }]; // card-number order
test('homepage preview: no claims shows no cards', () => {
  assert.deepEqual(previewClaimed({}, published), { shown: [], total: 0 });
  assert.deepEqual(previewClaimed(readCollection(fakeStorage()), published), { shown: [], total: 0 });
});
test('homepage preview: one or two claims are all shown, lowest number first', () => {
  assert.deepEqual(previewClaimed({ 'art-chartres-cathedral-001': { at: 'x' } }, published).shown.map((c) => c.id), ['art-chartres-cathedral-001']);
  const two = previewClaimed({ 'art-chartres-cathedral-001': { at: '2026-01-01' }, 'art-fan-kuan-travelers-001': { at: '2026-02-02' } }, published);
  assert.deepEqual(two.shown.map((c) => c.id), ['art-fan-kuan-travelers-001', 'art-chartres-cathedral-001'], 'card-number order, not claim order');
  assert.equal(two.total, 2);
});
test('homepage preview: more claims show two and count them all; unknown ids are ignored', () => {
  const all = Object.fromEntries(published.map((c) => [c.id, { at: 'x' }]));
  const many = previewClaimed({ ...all, 'art-removed': { at: 'x' } }, published);
  assert.deepEqual(many.shown.map((c) => c.id), ['art-fan-kuan-travelers-001', 'art-c08']);
  assert.equal(many.total, 4, 'a claim for a card this build does not have is not counted');
});

// The collection is a personal gallery in cabinets: only collected cards are shown, in card-number order, grouped by
// stage, with one placeholder in the overview and no locked or sample cards.
test('the collection shows this browser\'s cards only, in cabinets, with one placeholder', () => {
  const page = readFileSync(new URL('../src/pages/collection.astro', import.meta.url), 'utf8');
  assert.match(page, /<CollectionCabinets \/>/);
  assert.match(page, /data-archive-clear/, 'the clear control stays');
  const cc = readFileSync(new URL('../src/components/CollectionCabinets.astro', import.meta.url), 'utf8');
  assert.match(cc, /<div class="cc-pool" hidden>/, 'every card starts hidden');
  assert.equal([...cc.matchAll(/<ArtworkCard /g)].length, 1, 'each published card is rendered once (thumbnails are copies)');
  assert.equal([...cc.matchAll(/class="cc-more"/g)].length, 1, 'exactly one placeholder');
  assert.match(cc, /\.sort\(\(a, b\) => a\.no\.localeCompare\(b\.no\)\)/, 'card-number order (the course cards, then the artist series)');
  assert.match(cc, /mine = cards\.filter\(\(c\) => claimed\[c\.id\]\)/, 'only claimed cards are shown');
  assert.doesNotMatch(cc, /sample|\?set=|示例/, 'no preview fixtures in production');
});
