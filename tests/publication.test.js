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

test('the approved syllabus is untouched: 73 titles in seven stages with no gaps', () => {
  assert.equal(TOTAL_COURSES, 73);
  assert.equal(Object.keys(courseTitles).length, 73);
  assert.equal(stages.length, 7);
  assert.equal(stages[0].first, 1);
  assert.equal(stages[6].last, 73);
  stages.forEach((s, i) => { if (i) assert.equal(s.first, stages[i - 1].last + 1); });
  assert.equal(courseTitles[1], '一座山，为什么让人感到如此渺小？');
  assert.equal(courseTitles[67], '战后艺术为什么突破既有绘画观念？');
});

test('the course book and the homepage learn what is published from the lessons, not from a hand-kept list', () => {
  const book = source('src/components/courses/BookCatalogue.astro');
  assert.match(book, /courseIndex\(lessons\)/);
  assert.doesNotMatch(book, /\bimplemented\b/);
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
