import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { courseIndex } from '../src/lib/publication.js';
import { stages, courseTitles, TOTAL_COURSES } from '../src/data/curriculum.ts';

const source = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');

// Published means a lesson says which course it is; everything else on the syllabus stays an unlinked title.
test('a course with a lesson is published; every other course is only listed', () => {
  const lessons = [{ id: 'one', course: 1 }, { id: 'thirty', course: 30 }];
  const index = courseIndex(lessons);
  assert.equal(index[1].id, 'one');
  assert.equal(index[30].id, 'thirty');
  assert.equal(index[2], undefined);
  assert.equal(courseIndex([])[1], undefined);
  const added = courseIndex([...lessons, { id: 'newcomer', course: 12 }]);
  assert.equal(added[12].id, 'newcomer', 'a new lesson becomes a published course with no other edit');
});

test('the approved syllabus v2.0: 83 titles in eight stages with no gaps', () => {
  assert.equal(TOTAL_COURSES, 83);
  assert.equal(Object.keys(courseTitles).length, 83);
  assert.equal(stages.length, 8);
  assert.equal(stages[0].first, 1);
  assert.equal(stages[7].last, 83);
  stages.forEach((s, i) => { if (i) assert.equal(s.first, stages[i - 1].last + 1); });
  assert.equal(courseTitles[1], '一座山，为什么让人感到如此渺小？');
  assert.equal(courseTitles[74], '战后艺术为什么突破既有绘画观念？');
});

test('the course catalogue and the homepage learn what is published from the lessons, not from a hand-kept list', () => {
  const catalogue = source('src/components/courses/CourseCatalogue.astro');
  assert.match(catalogue, /getCollection\('lessons'\)/);
  assert.doesNotMatch(catalogue, /\bimplemented\b/);
  assert.doesNotMatch(source('src/data/curriculum.ts'), /export const implemented/);
  const home = source('src/components/home/StudyTable.astro');
  assert.match(home, /getCollection\('lessons'\)/);
  assert.match(home, /l\.data\.featured/);
  assert.doesNotMatch(home, /fan-kuan-full|chartres-west|mountain-and-smallness|stone-and-light/);
});

test('the homepage card box shows only this browser\'s claims: empty places until the script finds them', () => {
  const table = source('src/components/home/StudyTable.astro');
  assert.match(table, /<span class="st-mini st-mini-empty"><\/span>/);
  assert.match(table, /readCollection\(deviceStorage\(\)\)/);
  assert.doesNotMatch(table, /No\.0\d\d/);
});

// Artist-series cards: from No.084 up with no fixed end, each number given once by hand, above every course number.
test('artist-series cards are numbered from 084, uniquely, and never collide with a course card', async () => {
  const { ARTIST_SERIES, ARTIST_CARDS, artistCardNumber, cardNumber } = await import('../src/lib/publication.js');
  assert.equal(ARTIST_SERIES.first, TOTAL_COURSES + 1);
  assert.equal(ARTIST_SERIES.last, undefined, 'the series has no fixed end');
  const numbers = Object.values(ARTIST_CARDS);
  assert.equal(new Set(numbers).size, numbers.length, 'no two artist cards share a number');
  for (const n of numbers) assert.ok(Number.isInteger(n) && n >= ARTIST_SERIES.first);
  assert.equal(artistCardNumber('art-osman-hamdi-tortoise-trainer-001'), '084');
  assert.equal(artistCardNumber('art-fan-kuan-travelers-001'), undefined, 'a course card has no artist number');
  assert.throws(() => artistCardNumber('x', { x: 83 }), /below/);
  assert.equal(artistCardNumber('x', { x: 120 }), '120', 'a long series may run past 099');
  assert.throws(() => artistCardNumber('x', { x: 90, y: 90 }), /twice/);
  assert.throws(() => cardNumber(84), 'course numbers stop at 083');
});

test('every essay names a real kind, and an artist story that awards a card awards an artist-series card', async () => {
  const { ARTIST_CARDS } = await import('../src/lib/publication.js');
  const { readdirSync } = await import('node:fs');
  const files = readdirSync(new URL('../src/content/essays/', import.meta.url)).filter((f) => f.endsWith('.mdx'));
  assert.ok(files.length >= 2);
  for (const f of files) {
    const fm = source(`src/content/essays/${f}`).split('---')[1];
    const kind = fm.match(/^kind:\s*(\S+)/m)?.[1];
    assert.ok(kind === 'artist-story' || kind === 'case', `${f}: kind`);
    const card = fm.match(/^card:\s*(\S+)/m)?.[1];
    if (kind === 'case') assert.equal(card, undefined, `${f}: a case awards no card`);
    if (card) assert.ok(ARTIST_CARDS[card], `${f}: its card ${card} has an artist-series number`);
  }
});
