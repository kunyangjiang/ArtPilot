import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { WINDOWS, ANCHORS, BANDS, CONTEXT } from '../src/data/atlas.ts';
import { astro, yearsBetween, yearLabel, yearParts, overlaps, relation, nearSpan } from '../src/lib/atlasTime.js';

// Phase 4.28, the Atlas (同时代的世界): data integrity, the BCE/CE arithmetic, and the built page.
const dir = new URL('../src/content/artworks/', import.meta.url);
const records = new Map(readdirSync(dir).map((f) => { const d = JSON.parse(readFileSync(new URL(f, dir), 'utf8')); return [d.id, d]; }));
const lessons = new Set(readdirSync(new URL('../src/content/lessons/', import.meta.url)).map((f) => f.replace(/\.mdx$/, '')));
const essays = new Set(readdirSync(new URL('../src/content/essays/', import.meta.url)).map((f) => f.replace(/\.mdx$/, '')));
const contexts = new Set(CONTEXT.map((c) => c.id));
const anchors = new Map(ANCHORS.map((a) => [a.id, a]));
const PRECISIONS = ['year', 'range', 'approx', 'century', 'period', 'disputed', 'deep'];

test('there is no year zero, and arithmetic crosses the BCE/CE boundary correctly', () => {
  assert.equal(astro(-1), 0);
  assert.equal(astro(1), 1);
  assert.equal(yearsBetween(-1, 1), 1);
  assert.equal(yearsBetween(-500, 299), 798);
  assert.throws(() => yearLabel(0));
  assert.equal(yearLabel(-2254), '公元前 2254 年');
  assert.equal(yearLabel(1072), '1072 年');
  assert.deepEqual(yearParts(-2254), ['公元前', '2254']);
  assert.deepEqual(yearParts(-42000), ['约公元前', '4.2 万']);
  assert.throws(() => yearParts(0));
  // The years around a year never sweep across later windows (deep time's ±10,000 stops 250 years into window II).
  const b = WINDOWS.map((w) => [w.from, w.to, ({ '01': 10000, '02': 250, '03': 100, '04': 100, '05': 50, '06': 50, '07': 25, '08': 10, '09': 10 })[w.no]]);
  assert.deepEqual(nearSpan(-6000, b), { i: 0, n: 10000, lo: -16000, hi: -2750 });
  assert.deepEqual(nearSpan(1150, b), { i: 4, n: 50, lo: 1100, hi: 1200 });
  assert.deepEqual(nearSpan(1395, b), { i: 4, n: 50, lo: 1345, hi: 1445 });
  assert.deepEqual(nearSpan(1850, b), { i: 7, n: 10, lo: 1840, hi: 1860 });
  assert.deepEqual(nearSpan(1849, b), { i: 6, n: 25, lo: 1824, hi: 1860 });
  assert.deepEqual(nearSpan(-1, b), { i: 2, n: 100, lo: -101, hi: 100 });
  assert.equal(nearSpan(2026, b).hi, 2026);
  assert.ok(overlaps({ from: -10, to: -1 }, { from: -1, to: 5 }));
  assert.ok(!overlaps({ from: -10, to: -2 }, { from: 1, to: 5 }));
  // 2 BCE and 1 CE are two years apart, not three.
  assert.equal(relation({ from: -2, to: -2, precision: 'year' }, { from: 1, to: 1, precision: 'year' }).years, 2);
});

test('relations never claim more than the dates allow', () => {
  const y = (a, b = a, precision = 'year') => ({ from: a, to: b, precision });
  assert.equal(relation(y(1905), y(1905)).kind, 'same-year');
  assert.equal(relation(y(1905), y(1906)).kind, 'same-decade');
  assert.equal(relation(y(1003, 1010, 'range'), y(1005, 1020, 'range')).kind, 'overlapping-ranges');
  assert.equal(relation(y(990, 1030, 'approx'), y(1003, 1010, 'range')).kind, 'shared-period');
  assert.equal(relation(y(1817, 1817, 'approx'), y(1830, 1832, 'approx')).kind, 'adjacent');
  assert.equal(relation(y(-1300, -901, 'century'), y(1950)).kind, 'apart');
});

test('nine windows, contiguous, in order, none crossing year zero', () => {
  assert.equal(WINDOWS.length, 9);
  WINDOWS.forEach((w, i) => {
    assert.equal(w.no, String(i + 1).padStart(2, '0'));
    assert.ok(w.from < w.to && w.from !== 0 && w.to !== 0, w.no);
    if (i > 0) assert.equal(yearsBetween(WINDOWS[i - 1].to, w.from), 1, `${w.no} follows ${WINDOWS[i - 1].no}`);
  });
});

test('every entry is a real record or a context entry, dated within its window, placed honestly', () => {
  const seen = new Set();
  for (const w of WINDOWS) {
    assert.ok(w.orientation.length > 60, `${w.no} orientation`);
    assert.ok(w.entries.length >= 5, `${w.no} has entries`);
    assert.ok(w.comparisons.length >= 1, `${w.no} has a comparison`);
    assert.ok(w.gaps.length >= 1, `${w.no} names its gaps`);
    for (const e of w.entries) {
      assert.ok(records.has(e.id) || contexts.has(e.id), `${e.id} exists`);
      assert.ok(!seen.has(e.id), `${e.id} appears once in the Atlas`);
      seen.add(e.id);
      const { from, to, precision, label } = e.when;
      assert.ok(PRECISIONS.includes(precision), `${e.id} precision`);
      assert.ok(from <= to && from !== 0 && to !== 0, `${e.id} dates`);
      assert.ok(label, `${e.id} date label`);
      assert.ok(overlaps(e.when, w), `${e.id} falls in window ${w.no}`);
      if (e.place.anchor === null) assert.equal(e.place.precision, 'unknown', `${e.id} unplaced only when unknown`);
      else assert.ok(anchors.has(e.place.anchor), `${e.id} anchor ${e.place.anchor}`);
      assert.ok(e.note.length > 20 && e.form && e.tradition, `${e.id} text`);
      assert.ok(!/\*\*/.test(e.note), `${e.id} no markdown`);
    }
  }
});

test('the selection is not dominated by Europe', () => {
  const all = WINDOWS.flatMap((w) => w.entries.filter((e) => e.place.anchor));
  const europe = all.filter((e) => anchors.get(e.place.anchor).band === 'europe').length;
  assert.ok(europe / all.length < 0.3, `Europe ${europe} of ${all.length}`);
  for (const w of WINDOWS) {
    const bands = new Set(w.entries.filter((e) => e.place.anchor).map((e) => anchors.get(e.place.anchor).band));
    // Where the collection cannot reach three parts of the world (window 07 has only East Asia and Europe), the
    // window must say so, region by region, in its gaps rather than pass in silence.
    if (bands.size < 3) assert.ok(w.gaps.length >= 3 && w.gaps.some((g) => g.startsWith('非洲')), `${w.no} names what it lacks`);
  }
});

test('places: unique plan cells, known bands', () => {
  const cells = new Set();
  for (const a of ANCHORS) {
    assert.ok(BANDS.some((b) => b.id === a.band), a.id);
    const [c, r] = a.plan;
    assert.ok(c >= 0 && c < 26 && r >= 0 && r < 14, `${a.id} on the plan`);
    assert.ok(!cells.has(`${c},${r}`), `${a.id} has its own cell`);
    cells.add(`${c},${r}`);
  }
});

test('comparisons use works of their own window, say whether contact is known, and cite sources that exist', () => {
  for (const w of WINDOWS) {
    const ids = new Set(w.entries.map((e) => e.id));
    for (const c of w.comparisons) {
      assert.ok(c.works.length >= 2 && c.works.every((id) => ids.has(id)), c.id);
      assert.equal(c.look.length, c.works.length, `${c.id} look`);
      assert.ok(['none-known', 'documented', 'indirect'].includes(c.contact.kind), c.id);
      assert.ok(c.contact.text && c.contact.sources.length, `${c.id} contact sources`);
      if (c.contact.kind === 'documented') assert.ok(c.contact.sources.length >= 1);
      for (const s of c.contact.sources) {
        if (s.lesson) assert.ok(lessons.has(s.lesson), `${c.id} lesson ${s.lesson}`);
        else if (s.essay) assert.ok(essays.has(s.essay), `${c.id} essay ${s.essay}`);
        else assert.ok(s.label, `${c.id} source label`);
      }
    }
  }
  for (const c of CONTEXT) {
    assert.ok(c.sources.length, c.id);
    if (c.lesson) assert.ok(lessons.has(c.lesson), c.id);
  }
});

test('the Atlas reuses records and does not copy them', () => {
  const src = readFileSync(new URL('../src/data/atlas.ts', import.meta.url), 'utf8');
  assert.ok(!/titleZh|images:|rights:|officialPage/.test(src));
});

test('the built hall: all windows, all views, every work, no-JS content, the bar link', { skip: !existsSync(new URL('../dist/atlas/index.html', import.meta.url)) }, () => {
  const html = readFileSync(new URL('../dist/atlas/index.html', import.meta.url), 'utf8');
  for (const w of WINDOWS) {
    assert.ok(html.includes(`id="w${w.no}"`), w.no);
    for (const e of w.entries) assert.ok(html.includes(`id="e${w.no}-${e.id}"`), `${w.no} card ${e.id}`);
  }
  // One time control (the timeline), works first, the old views as optional tools, no decorative canvas.
  for (const t of ['a', 'c', 'd']) assert.ok(html.includes(`data-tool="${t}"`), `tool ${t}`);
  assert.ok(!html.includes('data-view='), 'no view switcher');
  assert.ok(!/data-from aria|data-narrow/.test(html), 'no second time slider');
  assert.ok(!/<canvas/.test(html), 'no background canvas');
  assert.ok(html.indexOf('data-river') < html.indexOf('data-grid') && html.indexOf('data-grid') < html.indexOf('data-tool='), 'time, then works, then tools');
  assert.equal((html.match(/data-card="/g) ?? []).length, WINDOWS.reduce((n, w) => n + w.entries.length, 0), 'a card per entry');
  // Text-only works never get a stand-in image.
  for (const w of WINDOWS) for (const e of w.entries) {
    const r = records.get(e.id);
    if (r?.officialPage) {
      const card = html.split(`id="e${w.no}-${e.id}"`)[1].split('</article>')[0];
      assert.ok(!card.includes('<img'), `${e.id} is text-only`);
    }
  }
  // The river at the top: one mark for every entry, a year with its list even without the script.
  const river = html.split('data-river')[1].split('data-js-only')[0];
  assert.equal((html.match(/data-mark="/g) ?? []).length, WINDOWS.reduce((n, w) => n + w.entries.length, 0), 'a mark per entry');
  assert.ok(river.includes('1150'), 'the river opens at 1150');
  // The opening interval, 1150 ± 50, is marked on the timeline by the same rule the page uses for its works.
  const nearIds = WINDOWS.flatMap((w) => w.entries).filter((e) => Math.max(e.when.from, 1100) <= Math.min(e.when.to, 1200)).map((e) => e.id);
  assert.ok(nearIds.length >= 3, 'the opening interval has works');
  for (const id of nearIds) assert.match(html, new RegExp(`class="rv-m[^"]*near[^"]*"[^>]*data-mark="${id}"`), `${id} marked near`);
  const home = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
  const lesson = readFileSync(new URL('../dist/lessons/stone-and-light/index.html', import.meta.url), 'utf8');
  assert.ok(lesson.includes('href="/atlas/"'), 'the site bar links the Atlas');
  assert.ok(home.length > 0);
});
