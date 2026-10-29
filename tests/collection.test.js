import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { COLLECTION_KEY, readCollection, collect, clearCollection, previewClaimed } from '../src/lib/collection.js';
import { cardIndex, TOTAL_COURSES } from '../src/lib/publication.js';
import { publishedCards } from './published-cards.js';

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
  // A card's number comes from the one lesson or artist story that awards it (cardIndex, src/lib/publication.js); it is
  // never stored on the card. Every card face is awarded, and everything awarded has a face.
  const awarded = publishedCards();
  for (const art of cards) assert.ok(awarded.has(art.id), `${art.id}: a lesson or story awards this card`);
  for (const id of awarded.keys()) assert.ok(have.includes(id), `${id} is awarded, so it needs a card face`);
  const numbers = cards.map((art) => awarded.get(art.id).no);
  assert.equal(new Set(numbers).size, cards.length, 'card numbers are unique');
  assert.equal(awarded.get('art-fan-kuan-travelers-001').no, '001', 'Fan Kuan (course 1) is No.001');
  assert.equal(awarded.get('art-chartres-cathedral-001').no, '042', 'Chartres (course 30) is No.042, after twelve extra cards in courses 4–25');
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

// Art Collection A+: a course may award more than one card. Numbers run in course order, each course's own card first
// and its extras after it; a course not yet published keeps one reserved slot and creates no card.
test('card numbers: course order, each course’s extras after its own card, one reserved slot per unpublished course', () => {
  const lessons = [
    { id: 'one', course: 1, artwork: 'a1' },
    { id: 'three', course: 3, artwork: 'a3', cards: ['x3', 'y3'] },
    { id: 'four', course: 4, artwork: 'a4' },
  ];
  const index = cardIndex(lessons, [], { total: 6, artistOrder: [] });
  assert.deepEqual([...index].map(([id, c]) => `${c.no} ${id}`), ['001 a1', '003 a3', '004 x3', '005 y3', '006 a4']);
  assert.equal(index.has('a2'), false, 'course 2 is unpublished: its slot (No.002) is kept, and no card exists for it');
  assert.deepEqual(index.get('y3').group, ['a3', 'x3', 'y3'], 'one claim awards the whole group, own card first');
  assert.equal(index.get('x3').course, 3);
  // Publishing course 2 with one card fills its reserved slot and moves nothing else.
  const later = cardIndex([...lessons, { id: 'two', course: 2, artwork: 'a2' }], [], { total: 6, artistOrder: [] });
  assert.equal(later.get('a2').no, '002');
  for (const id of ['a1', 'a3', 'x3', 'y3', 'a4']) assert.equal(later.get(id).no, index.get(id).no, `${id} keeps its number`);
});

test('card numbers: the artist series follows the whole core block, and a card is awarded once', () => {
  const lessons = [{ id: 'one', course: 1, artwork: 'a1', cards: ['x1'] }];
  const stories = [{ id: 's', card: 's1', cards: ['s2'] }];
  const index = cardIndex(lessons, stories, { total: 5, artistOrder: ['s1'] });
  assert.equal(index.get('s1').no, '007', 'five course slots plus one extra, then the artist series');
  assert.equal(index.get('s2').no, '008');
  assert.deepEqual(index.get('s2').group, ['s1', 's2']);
  assert.equal(index.get('s1').series, 'artist');
  assert.throws(() => cardIndex([{ id: 'one', course: 1, artwork: 'a1', cards: ['a2'] }, { id: 'two', course: 2, artwork: 'a2' }], [], { total: 5, artistOrder: [] }), /awarded by both/);
  assert.throws(() => cardIndex(lessons, stories, { total: 5, artistOrder: [] }), /not in ARTIST_CARDS/);
  assert.throws(() => cardIndex(lessons, [], { total: 5, artistOrder: ['s1'] }), /no story/);
  // The real site: the artist series starts right after the 90 course slots and every extra card.
  const real = publishedCards();
  const extras = [...real].filter(([id, c]) => c.series === 'core' && c.group[0] !== id).length;
  const firstArtist = [...real.values()].find((c) => c.series === 'artist');
  assert.equal(Number(firstArtist.no), TOTAL_COURSES + extras + 1);
});

// One click claims a lesson's whole group; a reader who already held some of it keeps those and gains the rest.
test('claiming a group: missing cards are added, cards already held keep their dates', () => {
  const s = fakeStorage({ [COLLECTION_KEY]: JSON.stringify({ 'art-velazquez-pareja-001': { at: '2026-10-20' } }) });
  const group = publishedCards().get('art-velazquez-pareja-001').group;
  assert.deepEqual(group, ['art-velazquez-pareja-001', 'art-velazquez-meninas-001']);
  const added = group.map((id) => collect(s, id, '2026-10-28').added);
  assert.deepEqual(added, [false, true]);
  assert.deepEqual(readCollection(s), { 'art-velazquez-pareja-001': { at: '2026-10-20' }, 'art-velazquez-meninas-001': { at: '2026-10-28' } });
  assert.deepEqual(group.map((id) => collect(s, id, '2026-10-29').added), [false, false], 'claiming again changes nothing');
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
