import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { courseTitles } from '../src/data/curriculum.ts';
import { diskLessons, publishedCards } from './published-cards.js';

// Stage 08 was published in three batches: 74–78 (Phase 4.19), 84–90 (Phase 4.20), then 79–83 (Phase 4.21), which
// completes the 90-course core syllabus. Each course awards its own card (some also an A+ card); its media are on disk.
const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');
const lessons = diskLessons();
const byCourse = Object.fromEntries(lessons.map((l) => [l.course, l]));
const artworks = Object.fromEntries(readdirSync(new URL('../src/content/artworks/', import.meta.url)).filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(read(`src/content/artworks/${f}`))).map((a) => [a.id, a]));
const NEW = {
  79: 'chinese-contemporary-book-from-the-sky', 80: 'japan-korea-holes-ecriture', 81: 'south-southeast-asia-behold-small-town',
  82: 'african-contemporary-anatsui', 83: 'americas-story-quilt-quipu',
  84: 'immersive-art-weather-project', 85: 'moving-image-refusal-of-time', 86: 'generative-art-aaron', 87: 'playable-art-passage',
  88: 'wearable-art-body-meets-dress', 89: 'net-art-boyfriend-war', 90: 'contemporary-painting-bigger-trees',
};

test('courses 79–90 are published under their approved titles, and every one of the 90 courses has a lesson', () => {
  for (const [n, id] of Object.entries(NEW)) {
    assert.equal(byCourse[n]?.id, id, `course ${n}`);
    const title = read(`src/content/lessons/${id}.mdx`).match(/^title:\s*(.+)$/m)[1].trim();
    assert.equal(title, courseTitles[n], `course ${n} keeps its syllabus title`);
  }
  for (let n = 1; n <= 90; n++) assert.ok(byCourse[n], `course ${n} has a lesson`);
  assert.equal(lessons.length, 90);
});

test('each Stage 08 course awards its own card, numbered in syllabus order after every earlier course and its extra cards', () => {
  const cards = publishedCards();
  const extrasBefore = (n) => [...cards].filter(([id, c]) => c.series === 'core' && c.course < n && c.group[0] !== id).length;
  for (const n of Object.keys(NEW).map(Number)) {
    const art = byCourse[n].artwork;
    assert.ok(artworks[art]?.card, `course ${n}: ${art} has a card face`);
    const c = cards.get(art);
    assert.equal(c.course, n);
    assert.equal(Number(c.no), n + extrasBefore(n), `course ${n}: one slot per course before it, plus the extra cards`);
  }
});

test('the new records: text-only cards link an official page; Passage, placed in the public domain by its maker, shows its own screenshot', () => {
  for (const n of [79, 80, 81, 82, 83, 84, 85, 86, 88, 89, 90]) {
    const a = artworks[byCourse[n].artwork];
    assert.match(a.officialPage?.url ?? '', /^https:\/\//, `${a.id}: official page`);
    assert.equal(a.card.image, null, `${a.id}: typographic card`);
  }
  const passage = artworks[byCourse[87].artwork];
  assert.equal(passage.officialPage, undefined);
  assert.ok(passage.images.some((i) => i.key === 'full'));
  assert.match(passage.rights.basis, /Placed in the public domain/);
});

test('every image and film clip the new lessons use is on disk, and every credited image says how it was changed', () => {
  for (const id of Object.values(NEW)) {
    const src = read(`src/content/lessons/${id}.mdx`);
    for (const m of src.matchAll(/src: '(\/media\/[^']+)'/g)) assert.ok(existsSync(new URL(`../public${m[1]}`, import.meta.url)), `${id}: ${m[1]}`);
    const art = artworks[src.match(/^artwork:\s*(\S+)/m)[1]];
    for (const img of art.images) {
      assert.ok(existsSync(new URL(`../public${img.src}`, import.meta.url)), `${art.id}: ${img.src}`);
      assert.ok(img.credit?.changes && img.credit?.sourceUrl && img.credit?.licence, `${art.id}/${img.key}: credit`);
    }
    assert.ok((src.match(/<Term id=/g) ?? []).length >= 3, `${id}: at least three glossary terms in the text`);
  }
});

test('Phase 4.21 A+ cards: the second works of courses 79–81 and the Powers quilt in 83, each awarded once, after its course card', () => {
  const cards = publishedCards();
  const extras = { 79: 'art-huang-yong-ping-washing-machine-001', 80: 'art-park-seo-bo-ecriture-22-77-001', 81: 'art-gill-small-town-001', 83: 'art-powers-bible-quilt-001' };
  for (const [n, id] of Object.entries(extras)) {
    assert.deepEqual(byCourse[n].cards, [id], `course ${n} lists its extra card`);
    assert.equal(Number(cards.get(id).no), Number(cards.get(byCourse[n].artwork).no) + 1, `${id} follows its course card`);
  }
  const powers = artworks['art-powers-bible-quilt-001'];
  assert.ok(powers.images.some((i) => i.key === 'full') && powers.card.image !== null, 'the Powers quilt card shows the quilt (CC0)');
  assert.equal(byCourse[82].cards.length, 0, 'course 82 awards its principal card only');
});
