import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { ARTIST_CARDS } from '../src/lib/publication.js';
import { publishedCards } from './published-cards.js';

// Phase 4.22, Artist Stories Batch A: four stories appended to the artist series after The Tortoise Trainer.
const dir = new URL('../src/content/essays/', import.meta.url);
const story = (id) => readFileSync(new URL(`${id}.mdx`, dir), 'utf8');
const fm = (src) => src.match(/^---\r?\n([\s\S]*?)\r?\n---/)[1];
const artwork = (file) => JSON.parse(readFileSync(new URL(`../src/content/artworks/${file}.json`, import.meta.url), 'utf8'));
const BATCH = [
  ['van-gogh-letters-to-theo', 'art-van-gogh-bedroom-001'],
  ['hokusai-names', 'art-hokusai-great-wave-001'],
  ['pacita-abad-colour-across-borders', 'art-abad-new-kids-in-class-001'],
  ['oscar-howe-not-indian', 'art-howe-war-dancer-001'],
];

test('the artist series keeps The Tortoise Trainer first and appends the batch in publication order', () => {
  assert.deepEqual(ARTIST_CARDS, ['art-osman-hamdi-tortoise-trainer-001', ...BATCH.map(([, card]) => card)]);
  for (const [id, card] of BATCH) assert.match(fm(story(id)), new RegExp(`^card: ${card}$`, 'm'), `${id} awards ${card}`);
});

test('numbers: the core block and The Tortoise Trainer do not move; the new cards follow it', () => {
  const cards = publishedCards();
  assert.equal(cards.get('art-osman-hamdi-tortoise-trainer-001').no, '131');
  assert.equal(cards.get('art-van-gogh-bedroom-001').no, '132');
  assert.equal(cards.get('art-hokusai-great-wave-001').no, '133');
  assert.equal(cards.get('art-katsushika-oi-guan-yu-001').no, '134', "Ōi's A+ card follows her father's");
  assert.equal(cards.get('art-abad-new-kids-in-class-001').no, '135');
  assert.equal(cards.get('art-howe-war-dancer-001').no, '136');
  assert.deepEqual(cards.get('art-hokusai-great-wave-001').group, ['art-hokusai-great-wave-001', 'art-katsushika-oi-guan-yu-001'], 'one claim awards both');
  assert.equal(cards.size, 136);
});

test('a story whose work cannot be reproduced opens with a named illustration, and its card is typographic', () => {
  for (const [id, file] of [['pacita-abad-colour-across-borders', 'abad-new-kids-in-class'], ['oscar-howe-not-indian', 'howe-war-dancer']]) {
    const a = artwork(file);
    const head = fm(story(id));
    assert.ok(a.officialPage?.url.startsWith('https://'), `${file}: official page`);
    assert.equal(a.card.image, null, `${file}: typographic card`);
    const key = head.match(/^\s+image:\s*(\S+)/m)[1];
    const img = a.images.find((i) => i.key === key);
    assert.ok(img && img.subject, `${id}: the opening image is another thing, named by its subject`);
    assert.match(head, /^\s+role:\s*\S+/m, `${id}: the opening image is shown under its role`);
  }
  for (const file of ['van-gogh-bedroom', 'hokusai-great-wave', 'katsushika-oi-guan-yu']) {
    const a = artwork(file);
    assert.equal(a.officialPage, undefined, `${file}: public domain, shown in full`);
    assert.match(a.rights.basis, /CC0|isPublicDomain|is_public_domain/, `${file}: the open-access basis is recorded`);
  }
});

test('each story tells, cites and ends the same way, without gates', () => {
  for (const [id, card] of BATCH) {
    const src = story(id);
    assert.match(src, /<Band kind="prelude">/, `${id}: says how it is told`);
    assert.match(src, /<Band kind="sources">/, `${id}: sources`);
    assert.match(src, new RegExp(`<LessonComplete artwork="${card}" kind="story" />`), `${id}: awards its card at the end`);
    assert.ok((src.match(/^## /gm) ?? []).length >= 5, `${id}: several scenes`);
    assert.doesNotMatch(src, /\*\*[^*\n]*[。，；：！？]\*\*[一-鿿]/, `${id}: no CJK bold that markdown cannot close`);
  }
  // Each story has its own engine: a different signature interaction.
  assert.match(story('van-gogh-letters-to-theo'), /<LetterColours/);
  assert.match(story('hokusai-names'), /<NameLedger/);
  assert.match(story('pacita-abad-colour-across-borders'), /<TrapuntoLayers/);
  assert.match(story('oscar-howe-not-indian'), /<PointLine/);
});

test('the roster change: Dalí stays where the core lessons put him', () => {
  const lessons = readdirSync(new URL('../src/content/lessons/', import.meta.url)).map((f) => readFileSync(new URL(`../src/content/lessons/${f}`, import.meta.url), 'utf8'));
  assert.ok(lessons.some((src) => /达利/.test(src)), 'Dalí is still taught in the core curriculum');
  assert.equal(readdirSync(dir).filter((f) => /dali/i.test(f)).length, 0, 'no Dalí story');
});
