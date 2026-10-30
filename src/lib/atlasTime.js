// Time for the Atlas (同时代的世界): historical years as people write them, with no year zero — 1 BCE is -1, 1 CE is 1
// — and a way to say how two dated works stand to each other without promising more than their dates allow.
// Plain JS so the tests can import it without a build step (tests/atlas.test.js).

/** The astronomical year (1 BCE = 0, 2 BCE = -1), for arithmetic only. */
export const astro = (y) => (y < 0 ? y + 1 : y);

/** Years between two historical years, counting across the BCE/CE boundary correctly (from -1 to 1 is one year). */
export const yearsBetween = (a, b) => astro(b) - astro(a);

/** A historical year written out: 公元前 2254 年, 1072 年. */
export function yearLabel(y) {
  if (y === 0) throw new Error('There is no year 0');
  if (y <= -10000) return `约公元前 ${String(Math.round(-y / 1000) / 10)} 万年`;
  return y < 0 ? `公元前 ${-y} 年` : `${y} 年`;
}

/** A year split for a large display, era and number: ['公元前', '2254'], ['公元', '1072'], ['约公元前', '4.2 万']. */
export function yearParts(y) {
  if (y === 0) throw new Error('There is no year 0');
  if (y <= -10000) return ['约公元前', `${String(Math.round(-y / 1000) / 10)} 万`];
  return y < 0 ? ['公元前', String(-y)] : ['公元', String(y)];
}

/**
 * The years around year y, for the Atlas timeline. `bounds` lists the windows as [from, to, n], n being how near counts
 * as "around" in that window. The span is y ± its own window's n, but it reaches no further into a neighbouring window
 * than that window's own n: deep time's ±10,000 years must not sweep across the eighty years after 1945.
 * Returns the window's index, its n, and the span in historical years.
 */
export function nearSpan(y, bounds) {
  const last = bounds.length - 1;
  let i = bounds.findIndex(([, to]) => y <= to);
  if (i === -1) i = last;
  const n = bounds[i][2], a = astro(y);
  let lo = a - n, hi = a + n;
  if (i > 0) lo = Math.max(lo, astro(bounds[i][0]) - bounds[i - 1][2]);
  if (i < last) hi = Math.min(hi, astro(bounds[i + 1][0]) + bounds[i + 1][2]);
  lo = Math.max(lo, astro(bounds[0][0]));
  hi = Math.min(hi, astro(bounds[last][1]));
  const hist = (x) => (x <= 0 ? x - 1 : x);
  return { i, n, lo: hist(lo), hi: hist(hi) };
}

// Precisions that state the years themselves, against those that only bracket an estimate.
const FIRM = new Set(['year', 'range']);

/** Whether two spans share at least one year. */
export const overlaps = (a, b) => Math.max(a.from, b.from) <= Math.min(a.to, b.to);

/** Years from the end of the earlier span to the start of the later; 0 or less when they overlap. */
export function gap(a, b) {
  const [first, second] = a.from <= b.from ? [a, b] : [b, a];
  return yearsBetween(first.to, second.from) - 1;
}

/**
 * How two dated works stand to each other in time. Kinds, from the strongest claim to the weakest:
 * - same-year: both dated to one year, the same year;
 * - same-decade: both dated to single years, less than ten years apart;
 * - overlapping-ranges: both dated by documented years, and the spans share years;
 * - shared-period: the spans share years, but at least one is an estimate (approximate, a century, a period, disputed);
 * - adjacent: they do not overlap, but less than a century lies between them;
 * - apart: further apart than that.
 */
export function relation(a, b) {
  const firm = FIRM.has(a.precision) && FIRM.has(b.precision);
  const single = (w) => w.from === w.to;
  if (firm && single(a) && single(b)) {
    if (a.from === b.from) return { kind: 'same-year', years: 0 };
    const d = Math.abs(yearsBetween(a.from, b.from));
    if (d < 10) return { kind: 'same-decade', years: d };
  }
  if (overlaps(a, b)) return { kind: firm ? 'overlapping-ranges' : 'shared-period', years: 0 };
  const g = gap(a, b);
  return { kind: g < 100 ? 'adjacent' : 'apart', years: g };
}

export const RELATION_LABEL = {
  'same-year': '同一年',
  'same-decade': '相隔不到十年',
  'overlapping-ranges': '有记录的年代相互重叠',
  'shared-period': '大致同一时期（至少一方的年代是估计）',
  adjacent: '相邻，但并不同时',
  apart: '相隔很远',
};

/** A sentence for a relation, with the years when they matter. */
export function relationText(r) {
  if (r.kind === 'same-decade') return `${RELATION_LABEL[r.kind]}（${r.years} 年）`;
  if (r.kind === 'adjacent' || r.kind === 'apart') return `${RELATION_LABEL[r.kind]}：中间约隔 ${r.years} 年`;
  return RELATION_LABEL[r.kind];
}
