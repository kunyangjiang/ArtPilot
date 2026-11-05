import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';

// The previous / next course at the foot of every lesson (LessonPager.astro), checked on the built pages: each lesson
// links to its neighbours in syllabus order; the first course has no previous, the last no next.
const dir = new URL('../src/content/lessons/', import.meta.url);
const lessons = readdirSync(dir)
  .map((f) => ({ id: f.replace(/\.mdx$/, ''), course: Number(readFileSync(new URL(f, dir), 'utf8').match(/^course:\s*(\d+)/m)[1]) }))
  .sort((a, b) => a.course - b.course);
const built = existsSync(new URL('../dist/lessons/', import.meta.url));

test('every lesson links to the previous and next course in syllabus order', { skip: !built }, () => {
  lessons.forEach((l, i) => {
    const html = readFileSync(new URL(`../dist/lessons/${l.id}/index.html`, import.meta.url), 'utf8');
    const prev = html.match(/href="\/lessons\/([^/"]+)\/" rel="prev"/)?.[1];
    const next = html.match(/href="\/lessons\/([^/"]+)\/" rel="next"/)?.[1];
    assert.equal(prev, lessons[i - 1]?.id, `${l.id}: previous`);
    assert.equal(next, lessons[i + 1]?.id, `${l.id}: next`);
  });
});
