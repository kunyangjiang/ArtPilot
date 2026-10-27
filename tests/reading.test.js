import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  READING_KEY, KINDS, WRITE_STEP,
  progressAt, scrollFor, readReading, writeReading, clearReading, createTracker, resolveEntry,
} from '../src/lib/reading.js';
import { COLLECTION_KEY, collect, readCollection } from '../src/lib/collection.js';

const fakeStorage = (initial = {}) => {
  const data = { ...initial };
  return { getItem: (k) => (k in data ? data[k] : null), setItem: (k, v) => { data[k] = String(v); }, removeItem: (k) => { delete data[k]; }, data, writes: 0 };
};
const counting = (s) => { const set = s.setItem; s.setItem = (k, v) => { s.writes++; set(k, v); }; return s; };
const entry = (kind, id, p, at = '2026-10-26T00:00:00.000Z') => ({ v: 1, kind, id, p, at });
const stored = (s) => readReading(s);
// One page view: the positions the page observes, in order (the first is where the article opened).
const view = (storage, kind, id, positions) => {
  const tracker = createTracker({ storage, kind, id });
  for (const p of positions) tracker.observe(p);
  return tracker;
};

test('the stored entry must be exactly { v: 1, kind, id, p, at }', () => {
  const s = fakeStorage();
  assert.equal(readReading(s), null);
  writeReading(s, entry('lesson', 'stone-and-light', 0.4));
  assert.deepEqual(readReading(s), entry('lesson', 'stone-and-light', 0.4));
  for (const bad of ['not json', '[]', '{}', JSON.stringify({ ...entry('lesson', 'x', 0.4), v: 2 }), JSON.stringify(entry('poem', 'x', 0.4)),
    JSON.stringify(entry('lesson', '', 0.4)), JSON.stringify(entry('lesson', 'x', 1.5)), JSON.stringify(entry('lesson', 'x', -0.1)),
    JSON.stringify({ ...entry('lesson', 'x', 0.4), p: '0.4' }), JSON.stringify({ ...entry('lesson', 'x', 0.4), at: 5 })]) {
    assert.equal(readReading(fakeStorage({ [READING_KEY]: bad })), null, bad);
  }
  assert.equal(readReading(null), null);
  const blocked = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); }, removeItem() { throw new Error('blocked'); } };
  assert.equal(readReading(blocked), null);
  assert.equal(writeReading(blocked, entry('lesson', 'x', 0.4)), false);
  clearReading(blocked); // does not throw
  clearReading(s);
  assert.equal(readReading(s), null);
});

test('the three kinds share one contract', () => {
  assert.deepEqual(KINDS, ['lesson', 'artist-story', 'case']);
  for (const kind of KINDS) {
    const s = fakeStorage();
    view(s, kind, 'a-1', [0.1, 0.3]).commit('2026-10-26T01:00:00.000Z');
    assert.deepEqual(stored(s), entry(kind, 'a-1', 0.3, '2026-10-26T01:00:00.000Z'));
  }
});

test('opening an article makes it the one to continue, at once', () => {
  const s = fakeStorage();
  writeReading(s, entry('lesson', 'mountain-and-smallness', 0.6));
  const t = view(s, 'lesson', 'stone-and-light', [0]);
  assert.equal(t.commit('2026-10-26T02:00:00.000Z'), 'written');
  assert.deepEqual(stored(s), entry('lesson', 'stone-and-light', 0, '2026-10-26T02:00:00.000Z'));
});

test('any spot the reader stops at is stored, forward or back', () => {
  const s = counting(fakeStorage());
  const t = createTracker({ storage: s, kind: 'lesson', id: 'stone-and-light' });
  t.observe(0.1); assert.equal(t.commit(), 'written');
  t.observe(0.1 + WRITE_STEP / 2); assert.equal(t.commit(), 'none', 'the same place is not written again');
  t.observe(0.37); assert.equal(t.commit(), 'written');
  t.observe(0.05); assert.equal(t.commit(), 'written', 'scrolled back up to re-read: that is where they are now');
  assert.equal(stored(s).p, 0.05);
  assert.equal(s.writes, 3);
});

test('reopening the stored article keeps its place until the reader scrolls', () => {
  const s = fakeStorage();
  writeReading(s, entry('lesson', 'mountain-and-smallness', 0.6));
  // Opened again from the course book, which shows the top of the page: nothing is lost.
  const t = view(s, 'lesson', 'mountain-and-smallness', [0]);
  assert.equal(t.commit(), 'none');
  assert.equal(stored(s).p, 0.6);
  // Once they scroll, wherever they are is the new place.
  t.observe(0.2);
  assert.equal(t.commit(), 'written');
  assert.equal(stored(s).p, 0.2);
});

test('reaching the end keeps the article as the one to continue, at 100%', () => {
  const s = fakeStorage();
  writeReading(s, entry('lesson', 'mountain-and-smallness', 0.6));
  const t = view(s, 'lesson', 'stone-and-light', [0, 0.5, 0.9, 1]);
  assert.equal(t.commit('2026-10-26T05:00:00.000Z'), 'written');
  assert.deepEqual(stored(s), entry('lesson', 'stone-and-light', 1, '2026-10-26T05:00:00.000Z'), 'a finished lesson does not disappear');
  assert.equal(t.commit(), 'none', 'and is not written again while it stays at the end');
  const page = readFileSync(new URL('../src/components/ReadingTracker.astro', import.meta.url), 'utf8');
  assert.match(page, /atEnd\(\) \? 1 :/, 'the bottom of the page counts as 100%');
});

test('nothing observed, nothing written', () => {
  const s = fakeStorage();
  assert.equal(createTracker({ storage: s, kind: 'lesson', id: 'x' }).commit(), 'none');
  assert.equal(stored(s), null);
});

test('unreadable or blocked storage never breaks reading', () => {
  const blocked = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); }, removeItem() { throw new Error('blocked'); } };
  const t = view(blocked, 'lesson', 'stone-and-light', [0.2, 0.4]);
  assert.equal(t.commit(), 'none');
  assert.equal(view(null, 'lesson', 'stone-and-light', [0.2, 0.4]).commit(), 'none');
});

test('the homepage shows the entry only when this build still has that article', () => {
  const registry = {
    lesson: { label: '课程', items: { 'stone-and-light': { title: '哥特式教堂', href: '/lessons/stone-and-light/' } } },
    'artist-story': { label: '艺术家故事馆', items: { 'fan-kuan': { title: '范宽', href: '/stories/fan-kuan/' } } },
    case: { label: 'Cases', items: {} },
  };
  assert.deepEqual(resolveEntry(entry('lesson', 'stone-and-light', 0.4), registry), { label: '课程', title: '哥特式教堂', href: '/lessons/stone-and-light/', p: 0.4 });
  assert.equal(resolveEntry(entry('artist-story', 'fan-kuan', 0.2), registry).label, '艺术家故事馆');
  assert.equal(resolveEntry(entry('case', 'unbuilt', 0.2), registry), null, 'an article this build does not have');
  assert.equal(resolveEntry(entry('lesson', 'removed-lesson', 0.2), registry), null);
  assert.equal(resolveEntry(entry('lesson', 'stone-and-light', 0.4), {}), null);
  assert.equal(resolveEntry(null, registry), null);
});

test('progress and scroll position are inverses, and clamp at the ends', () => {
  const [top, height, vh] = [900, 8000, 800];
  for (const p of [0, 0.1, 0.5, 0.95, 1]) assert.ok(Math.abs(progressAt(scrollFor(p, top, height, vh), top, height, vh) - p) < 1 / height);
  assert.equal(progressAt(0, top, height, vh), 0);
  assert.equal(progressAt(1e6, top, height, vh), 1);
  assert.equal(progressAt(500, top, 0, vh), 0);
  assert.equal(scrollFor(0, 100, 5000, 1000), 0, 'never scrolls above the top of the page');
});

// Reading and COL-01 are separate: different keys, and neither module knows the other.
test('reading state is not coupled to collecting cards', () => {
  assert.notEqual(READING_KEY, COLLECTION_KEY);
  const s = fakeStorage();
  collect(s, 'art-a', '2026-01-01');
  view(s, 'lesson', 'stone-and-light', [0.2, 1]).commit(); // finishing a lesson by scrolling claims nothing
  assert.deepEqual(readCollection(s), { 'art-a': { at: '2026-01-01' } });
  writeReading(s, entry('lesson', 'stone-and-light', 0.4));
  clearReading(s);
  assert.deepEqual(readCollection(s), { 'art-a': { at: '2026-01-01' } }, 'clearing reading leaves cards alone');
  const code = (p) => readFileSync(new URL(p, import.meta.url), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
  assert.doesNotMatch(code('../src/lib/reading.js'), /collection|collect\(/i);
  assert.doesNotMatch(code('../src/components/ReadingTracker.astro'), /collection|collect\(|LessonComplete/i);
  assert.doesNotMatch(code('../src/components/LessonComplete.astro'), /reading/i);
});

// Wiring that a unit test can pin down without a browser.
test('the tracker is mounted once, by the lesson page, and only a resume link scrolls', () => {
  const page = readFileSync(new URL('../src/pages/lessons/[slug].astro', import.meta.url), 'utf8');
  assert.equal([...page.matchAll(/<ReadingTracker/g)].length, 1);
  const tracker = readFileSync(new URL('../src/components/ReadingTracker.astro', import.meta.url), 'utf8');
  assert.match(tracker, /#resume/);
  assert.match(tracker, /passive: true/);
});
