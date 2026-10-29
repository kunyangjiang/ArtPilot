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

test('the approved syllabus v2.1: 90 titles in eight stages with no gaps', () => {
  assert.equal(TOTAL_COURSES, 90);
  assert.equal(Object.keys(courseTitles).length, 90);
  assert.equal(stages.length, 8);
  assert.equal(stages[0].first, 1);
  assert.equal(stages[7].last, 90);
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

// Artist-series cards: listed once each, in series order, numbered after the whole core block (never a fixed No.084).
test('artist-series cards follow every course slot and extra card, and never collide with a course card', async () => {
  const { ARTIST_CARDS } = await import('../src/lib/publication.js');
  const { publishedCards } = await import('./published-cards.js');
  assert.ok(Array.isArray(ARTIST_CARDS));
  assert.equal(new Set(ARTIST_CARDS).size, ARTIST_CARDS.length, 'each artist card is listed once');
  const cards = publishedCards();
  const core = [...cards.values()].filter((c) => c.series === 'core');
  const artist = [...cards.values()].filter((c) => c.series === 'artist');
  assert.ok(artist.length >= 1);
  for (const a of artist) for (const c of core) assert.ok(Number(a.no) > Number(c.no), `artist No.${a.no} after course No.${c.no}`);
  assert.ok(Number(artist[0].no) > TOTAL_COURSES, 'after every course slot, published or not');
  // Never a fixed number: 90 course slots, then one more slot for every extra card a published course awards.
  const extras = [...cards].filter(([id, c]) => c.series === 'core' && c.group[0] !== id).length;
  assert.equal(Number(cards.get('art-osman-hamdi-tortoise-trainer-001').no), TOTAL_COURSES + extras + 1, 'course slots and extra cards, then the artist series');
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
    if (card) assert.ok(ARTIST_CARDS.includes(card), `${f}: its card ${card} is listed in the artist series`);
  }
});
