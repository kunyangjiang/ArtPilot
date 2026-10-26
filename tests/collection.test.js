import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { COLLECTION_KEY, readCollection, collect, clearCollection } from '../src/lib/collection.js';

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
test('every card face is complete and every card number is unique', () => {
  const dir = new URL('../src/content/artworks/', import.meta.url);
  const cards = readdirSync(dir).filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(readFileSync(new URL(f, dir), 'utf8')))
    .filter((art) => art.card);
  assert.deepEqual(cards.map((a) => a.id).sort(), ['art-chartres-cathedral-001', 'art-fan-kuan-travelers-001']);
  assert.equal(new Set(cards.map((a) => a.card.no)).size, cards.length, 'card numbers are unique');
  for (const art of cards) {
    assert.match(art.card.no, /^\d{3}$/);
    for (const k of ['type', 'period', 'blurb']) assert.ok(art.card[k], `${art.id}: card.${k}`);
    assert.ok(art.card.blurb.length <= 60, `${art.id}: blurb fits the no-image cover`);
    assert.ok(art.card.facets.length >= 1 && art.card.facets.length <= 4 && art.card.facets.every((f) => f.label && f.value));
    // A card image, when named, must be one of the artwork's own images.
    if (art.card.image) assert.ok(art.images.some((i) => i.key === art.card.image), `${art.id}: card image`);
    if (art.card.focus) assert.match(art.card.focus, /^\d{1,3}% \d{1,3}%$/);
    // The front's maker line: a painter, or for a building its place.
    assert.ok(art.kind === 'building' ? art.location : art.artist, `${art.id}: maker line`);
  }
});
