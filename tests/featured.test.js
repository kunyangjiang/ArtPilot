import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { ASPECT_MIN, ASPECT_MAX, fitsWall, dayNumber, pickIndices, assignSlots, pickFeatured } from '../src/lib/featured.js';
import { courseIndex, inCourseOrder } from '../src/lib/publication.js';

const pool = (n) => Array.from({ length: n }, (_, i) => ({ id: `c${i}`, aspect: 0.5 + (i % 3) * 0.05 }));
const ids = (picked) => [picked.anchor?.id, picked.second?.id].filter(Boolean);

test('the day number is the local calendar date, stable all day and a step per day', () => {
  const morning = dayNumber(new Date(2026, 9, 26, 0, 0, 1)), night = dayNumber(new Date(2026, 9, 26, 23, 59, 59));
  assert.equal(morning, night);
  assert.equal(dayNumber(new Date(2026, 9, 27, 0, 0, 1)), morning + 1);
  // Daylight-saving days are still one step (a 23- or 25-hour day does not skip or repeat a number).
  assert.equal(dayNumber(new Date(2026, 2, 9)), dayNumber(new Date(2026, 2, 8)) + 1);
  assert.equal(dayNumber(new Date(2026, 10, 2)), dayNumber(new Date(2026, 10, 1)) + 1);
});

test('the same day always gives the same pair', () => {
  for (const n of [3, 4, 7, 12]) for (const d of [0, 1, 20000, 20752]) assert.deepEqual(pickIndices(n, d), pickIndices(n, d));
  assert.deepEqual(ids(pickFeatured(pool(7), 20752)), ids(pickFeatured(pool(7), 20752)));
});

test('with one or two candidates, every candidate is shown, every day', () => {
  assert.deepEqual(pickIndices(0, 5), []);
  assert.deepEqual(pickIndices(1, 5), [0]);
  for (let d = 20000; d < 20010; d++) assert.deepEqual(pickIndices(2, d).sort(), [0, 1]);
  assert.deepEqual(ids(pickFeatured(pool(1), 20000)), ['c0']);
  assert.equal(new Set(ids(pickFeatured(pool(2), 20001))).size, 2);
});

test('larger pools: two different candidates a day, even exposure, nothing on consecutive days from four up', () => {
  for (let n = 3; n <= 14; n++) {
    const shown = new Array(n).fill(0);
    let previous = [];
    const days = n * 40;
    for (let d = 20000; d < 20000 + days; d++) {
      const pair = pickIndices(n, d);
      assert.equal(pair.length, 2, `n=${n}`);
      assert.notEqual(pair[0], pair[1], `n=${n}: the same candidate twice on day ${d}`);
      pair.forEach((i) => { assert.ok(i >= 0 && i < n); shown[i]++; });
      if (n >= 4) assert.ok(!pair.some((i) => previous.includes(i)), `n=${n}: day ${d} repeats yesterday`);
      previous = pair;
    }
    // Over whole cycles every candidate is shown exactly twice per n days.
    assert.ok(shown.every((c) => c === 2 * (days / n)), `n=${n}: uneven exposure ${shown}`);
  }
});

test('the narrower image takes the tall position, the wider one the smaller position', () => {
  const tall = { id: 'tall', aspect: 0.5 }, wide = { id: 'wide', aspect: 0.67 };
  assert.deepEqual(assignSlots([wide, tall]), { anchor: tall, second: wide });
  assert.deepEqual(assignSlots([tall, wide]), { anchor: tall, second: wide });
  assert.deepEqual(assignSlots([tall]), { anchor: tall, second: undefined });
  const tie = [{ id: 'a', aspect: 0.6 }, { id: 'b', aspect: 0.6 }];
  assert.equal(assignSlots(tie).anchor.id, 'a', 'equal shapes keep the editorial order');
});

test('only tall, narrow images fit the two wall positions', () => {
  assert.ok(fitsWall(900, 1805) && fitsWall(1067, 1600));
  assert.ok(!fitsWall(1440, 946) && !fitsWall(1280, 1280) && !fitsWall(420, 1700 * 3) && !fitsWall(0, 0) && !fitsWall(NaN, 5));
  assert.ok(ASPECT_MIN < ASPECT_MAX);
});

// The homepage inlines src/lib/featured.js (without its `export` keywords) so the pair is chosen before first paint.
test('the inlined copy of the selection code behaves like the module', () => {
  const source = readFileSync(new URL('../src/lib/featured.js', import.meta.url), 'utf8').replace(/^\/\/.*\r?\n/gm, '').replace(/^export /gm, '');
  const inlined = new Function(`${source}\nreturn { dayNumber, pickFeatured };`)();
  const p = pool(9);
  for (const d of [0, 1, 19999, 20752, 20753]) assert.deepEqual(ids(inlined.pickFeatured(p, d)), ids(pickFeatured(p, d)));
  assert.equal(inlined.dayNumber(new Date(2026, 9, 26, 12)), dayNumber(new Date(2026, 9, 26, 12)));
});

// ---- The real content: every lesson that opts in can be shown, with rights, alt text and a fitting image ----
const read = (dir, ext) => readdirSync(new URL(dir, import.meta.url)).filter((f) => f.endsWith(ext)).map((f) => [f, readFileSync(new URL(dir + f, import.meta.url), 'utf8')]);
const artworks = Object.fromEntries(read('../src/content/artworks/', '.json').map(([, t]) => JSON.parse(t)).map((a) => [a.id, a]));
const lessons = read('../src/content/lessons/', '.mdx').map(([file, src]) => {
  const front = src.match(/^---\r?\n([\s\S]*?)\r?\n---/)[1];
  const get = (k) => front.match(new RegExp(`^${k}: (.+)$`, 'm'))?.[1].trim();
  return { id: file.replace(/\.mdx$/, ''), course: Number(get('course')), workLabel: get('workLabel'), title: get('title'), artwork: get('artwork'), featured: front.match(/^featured:\r?\n\s+image: (\S+)/m)?.[1] };
});

test('every lesson names a distinct course of the 73, and the courses sort in syllabus order', () => {
  const index = courseIndex(lessons);
  assert.equal(Object.keys(index).length, lessons.length);
  assert.deepEqual(inCourseOrder(lessons).map((l) => l.course), lessons.map((l) => l.course).sort((a, b) => a - b));
  for (const l of lessons) assert.ok(l.workLabel && l.title, `${l.id}: needs workLabel and title`);
});

test('course numbers must be unique and inside the syllabus', () => {
  assert.throws(() => courseIndex([{ id: 'a', course: 3 }, { id: 'b', course: 3 }]), /claimed by both/);
  assert.throws(() => courseIndex([{ id: 'a', course: 0 }]), /course number/);
  assert.throws(() => courseIndex([{ id: 'a', course: 74 }]), /course number/);
  assert.throws(() => courseIndex([{ id: 'a' }]), /course number/);
});

test('every featured lesson has an image with size, shape, alt text, credit and verified rights', () => {
  const featured = lessons.filter((l) => l.featured);
  assert.ok(featured.length >= 2, 'the rotation needs at least the two accepted works');
  for (const l of featured) {
    const art = artworks[l.artwork];
    assert.ok(art, `${l.id}: unknown artwork ${l.artwork}`);
    const img = art.images.find((i) => i.key === l.featured);
    assert.ok(img, `${l.id}: no image "${l.featured}"`);
    assert.ok(existsSync(new URL(`../public${img.src}`, import.meta.url)), `${l.id}: missing file ${img.src}`);
    assert.ok(img.width > 0 && img.height > 0 && fitsWall(img.width, img.height), `${l.id}: needs width and height, tall and narrow`);
    assert.ok(img.alt.length > 10, `${l.id}: alt text`);
    assert.ok(art.imageSource || (img.credit && img.credit.author && img.credit.licence && img.credit.sourceUrl), `${l.id}: image credit`);
    assert.ok(art.rights.status && art.rights.verifiedOn, `${l.id}: verified rights`);
    // The size on record is the size of the file: a JPEG's SOF marker holds it.
    const b = readFileSync(new URL(`../public${img.src}`, import.meta.url));
    let o = 2, w, h;
    while (o < b.length) { if (b[o] !== 0xff) { o++; continue; } const m = b[o + 1]; if (m >= 0xc0 && m <= 0xc3) { h = b.readUInt16BE(o + 5); w = b.readUInt16BE(o + 7); break; } o += 2 + b.readUInt16BE(o + 2); }
    assert.deepEqual([img.width, img.height], [w, h], `${l.id}: recorded size differs from the file`);
  }
});

// Without JavaScript the wall shows the first two featured lessons in course order, the narrower image in the tall place.
test('without JavaScript: the first two featured lessons by course, Fan Kuan in the tall place', () => {
  const featured = inCourseOrder(lessons).filter((l) => l.featured).map((l) => {
    const img = artworks[l.artwork].images.find((i) => i.key === l.featured);
    return { id: l.id, aspect: img.width / img.height };
  });
  const first = assignSlots(featured.slice(0, 2));
  assert.equal(first.anchor.id, 'mountain-and-smallness');
  assert.equal(first.second.id, inCourseOrder(lessons).filter((l) => l.featured)[1].id);
});

// The homepage credits whichever works it shows: each featured image's credit comes from its own record, and the page
// shows exactly the credits of the two works the chooser picked.
test('each featured image is credited from its own record', async () => {
  const { imageCredit } = await import('../src/lib/credits.js');
  for (const l of lessons.filter((x) => x.featured)) {
    const art = artworks[l.artwork];
    const img = art.images.find((i) => i.key === l.featured);
    const c = imageCredit(img, art);
    assert.equal(c.href, img.credit ? img.credit.sourceUrl : art.imageSource.url, `${l.id}: credit links to this image's own source`);
    assert.ok(c.by && c.licence, `${l.id}: credit names a source and a licence`);
  }
  const wall = readFileSync(new URL('../src/components/home/ExhibitionWall.astro', import.meta.url), 'utf8');
  assert.match(wall, /data-credit-for=\{c\.id\}/, 'one credit per candidate, keyed by lesson');
  assert.match(wall, /credits\(pick\)/, 'the chooser shows the credits of the works it picked');
  assert.doesNotMatch(wall, /范宽《溪山行旅图》与沙特尔主教座堂的图片/, 'no fixed credit naming two particular works');
});
