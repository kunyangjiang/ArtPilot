import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
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

test('the Fan Kuan artwork has a complete card face', () => {
  const art = JSON.parse(readFileSync(new URL('../src/content/artworks/fan-kuan-travelers.json', import.meta.url), 'utf8'));
  assert.match(art.card.no, /^\d{3}$/);
  for (const k of ['type', 'period', 'blurb']) assert.ok(art.card[k], `card.${k}`);
  assert.ok(art.card.blurb.length <= 60, 'blurb fits the no-image cover');
  assert.ok(art.card.facets.length >= 1 && art.card.facets.length <= 4 && art.card.facets.every((f) => f.label && f.value));
  // A card image, when named, must be one of the artwork's own images.
  if (art.card.image) assert.ok(art.images.some((i) => i.key === art.card.image));
  if (art.card.focus) assert.match(art.card.focus, /^\d{1,3}% \d{1,3}%$/);
});
