import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  READING_KEY, KINDS, MIN_DWELL_MS, MIN_PROGRESS, WRITE_STEP,
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
const S = 1000;

// One page view: `steps` is [seconds, progress, visible?] — the page calls observe() at each of them.
const view = (storage, kind, id, steps, t0 = 1_000_000) => {
  const tracker = createTracker({ storage, kind, id, now: () => t0 });
  tracker.observe(steps[0][1], true, t0);
  for (const [sec, p, visible = true] of steps) tracker.observe(p, visible, t0 + sec * S);
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
    view(s, kind, 'a-1', [[0, 0.1], [20, 0.3]]).commit('2026-10-26T01:00:00.000Z');
    assert.deepEqual(stored(s), entry(kind, 'a-1', 0.3, '2026-10-26T01:00:00.000Z'));
  }
});

test('a short visit writes nothing and leaves earlier progress alone', () => {
  const s = fakeStorage();
  writeReading(s, entry('lesson', 'mountain-and-smallness', 0.6));
  // 14 s on a different article, well past the first lines: not yet reading.
  const t = view(s, 'lesson', 'stone-and-light', [[0, 0], [5, 0.3], [14, 0.5]]);
  assert.equal(t.engaged, false);
  assert.equal(t.commit(), 'none');
  assert.deepEqual(stored(s), entry('lesson', 'mountain-and-smallness', 0.6));
  // Long enough but never got past the opening lines: still just a visit.
  const u = view(s, 'lesson', 'stone-and-light', [[0, 0], [30, MIN_PROGRESS - 0.01]]);
  assert.equal(u.engaged, false);
  assert.equal(u.commit(), 'none');
  assert.deepEqual(stored(s), entry('lesson', 'mountain-and-smallness', 0.6));
  // Reopening the same article and scrolling to the top for a moment does not erase how far it was read.
  const v = view(s, 'lesson', 'mountain-and-smallness', [[0, 0], [8, 0]]);
  assert.equal(v.commit(), 'none');
  assert.equal(stored(s).p, 0.6);
});

test('real reading — 15 s of visible time and the first 8% — becomes the one entry, whatever the kind', () => {
  const s = fakeStorage();
  writeReading(s, entry('lesson', 'mountain-and-smallness', 0.6));
  const t = view(s, 'case', 'a-case', [[0, 0.02], [4, 0.1], [MIN_DWELL_MS / S, 0.12]]);
  assert.equal(t.engaged, true);
  assert.equal(t.commit('2026-10-26T02:00:00.000Z'), 'written');
  assert.deepEqual(stored(s), entry('case', 'a-case', 0.12, '2026-10-26T02:00:00.000Z'));
  // And back to the lesson: the most recently read article wins again.
  view(s, 'lesson', 'mountain-and-smallness', [[0, 0.5], [16, 0.7]]).commit('2026-10-26T03:00:00.000Z');
  assert.deepEqual(stored(s), entry('lesson', 'mountain-and-smallness', 0.7, '2026-10-26T03:00:00.000Z'));
});

test('time with the page hidden does not count as reading', () => {
  const s = fakeStorage();
  const t = view(s, 'lesson', 'stone-and-light', [[0, 0.2], [2, 0.2, false], [60, 0.2, false], [61, 0.2, true], [66, 0.2, true]]);
  assert.equal(t.engaged, false, 'only about 7 s were visible');
  assert.equal(t.commit(), 'none');
  assert.equal(stored(s), null);
});

test('once reading, later positions are stored only when they move, forward or back', () => {
  const s = counting(fakeStorage());
  const t = createTracker({ storage: s, kind: 'lesson', id: 'stone-and-light', now: () => 0 });
  t.observe(0.1, true, 0); t.observe(0.1, true, MIN_DWELL_MS);
  assert.equal(t.commit(), 'written');
  for (let i = 0; i < 100; i++) { t.observe(0.1 + (i % 2) * 0.005, true, MIN_DWELL_MS + i * S); assert.equal(t.commit(), 'none'); } // jitter inside one step
  assert.equal(s.writes, 1);
  t.observe(0.1 + WRITE_STEP, true, MIN_DWELL_MS + 200 * S);
  assert.equal(t.commit(), 'written');
  t.observe(0.05, true, MIN_DWELL_MS + 300 * S); // scrolled back up to re-read: that is where they are now
  assert.equal(t.commit(), 'written');
  assert.equal(stored(s).p, 0.05);
  assert.equal(s.writes, 3);
});

test('reaching the end keeps the article as the one to continue', () => {
  const s = fakeStorage();
  writeReading(s, entry('lesson', 'mountain-and-smallness', 0.6));
  const t = view(s, 'lesson', 'stone-and-light', [[0, 0.5], [20, 0.9], [40, 1]]);
  assert.equal(t.commit('2026-10-26T05:00:00.000Z'), 'written');
  assert.deepEqual(stored(s), entry('lesson', 'stone-and-light', 1, '2026-10-26T05:00:00.000Z'), 'a finished lesson does not disappear');
  assert.equal(t.commit(), 'none', 'and is not written again while it stays at the end');
  // A visit that never counted as reading changes nothing, even at the end of the page.
  writeReading(s, entry('lesson', 'mountain-and-smallness', 0.6));
  assert.equal(view(s, 'lesson', 'stone-and-light', [[0, 0.99], [3, 1]]).commit(), 'none');
  assert.equal(stored(s).id, 'mountain-and-smallness');
});

test('unreadable or blocked storage never breaks reading', () => {
  const blocked = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); }, removeItem() { throw new Error('blocked'); } };
  const t = view(blocked, 'lesson', 'stone-and-light', [[0, 0.2], [20, 0.4]]);
  assert.equal(t.commit(), 'none');
  assert.equal(view(null, 'lesson', 'stone-and-light', [[0, 0.2], [20, 0.4]]).commit(), 'none');
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
  view(s, 'lesson', 'stone-and-light', [[0, 0.2], [20, 0.97]]).commit(); // finishing a lesson by scrolling claims nothing
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
