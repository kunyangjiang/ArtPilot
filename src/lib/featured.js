// The homepage's two featured artworks, chosen by the visitor's local calendar day: no server, no scheduler.
// Written without imports and with every export at the start of a line, because the homepage also inlines this file
// (minus the `export` keywords) so the choice is made before the page first paints.

// Both homepage positions are tall and narrow: the works are hung uncropped, and a landscape image would shrink to a
// strip. Width ÷ height of an image used there must stay within this band (today: 0.50 and 0.67).
export const ASPECT_MIN = 0.45;
export const ASPECT_MAX = 0.8;

export const fitsWall = (width, height) => {
  const a = width / height;
  return Number.isFinite(a) && a >= ASPECT_MIN && a <= ASPECT_MAX;
};

/** Whole days since 1970 for the local calendar date: the same all day, whatever the time zone or daylight saving. */
export const dayNumber = (date = new Date()) => Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000);

/**
 * Which two of `n` candidates (listed in a fixed order) to show on a given day. One or two candidates: all of them.
 * Otherwise the pair is i and i + ⌊n/2⌋ for i = day mod n: never the same one twice, every candidate shown on exactly
 * 2 of every n days, and (from four candidates up) nothing shown on two consecutive days.
 */
export const pickIndices = (n, day) => {
  if (n <= 0) return [];
  if (n <= 2) return Array.from({ length: n }, (_, k) => k);
  const i = ((day % n) + n) % n;
  return [i, (i + Math.floor(n / 2)) % n];
};

/** The narrower image hangs in the tall middle position, the wider one in the smaller position beside it. */
export const assignSlots = (picked) => {
  const [first, second] = picked;
  if (!second) return { anchor: first, second: undefined };
  return second.aspect < first.aspect ? { anchor: second, second: first } : { anchor: first, second };
};

/** `pool`: [{ id, aspect }] in the fixed editorial order. Returns { anchor, second } (entries of the pool). */
export const pickFeatured = (pool, day) => assignSlots(pickIndices(pool.length, day).map((i) => pool[i]));
