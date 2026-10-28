// "Continue reading": the one article this device read most recently, kept only in this browser. A device record, not
// an account; nothing here knows about collected cards (src/lib/collection.js) and the two never share a key.
// Every function takes the storage object (usually localStorage) so it can be absent, blocked or faked in tests.
export const READING_KEY = 'artpilot.reading';
export const KINDS = ['lesson', 'artist-story', 'case'];

// Like an e-reader: opening an article makes it the one to continue, and wherever the reader is, that is stored, up
// to 100% at the end. The one exception keeps a place: reopening the article already stored (from the course book,
// say, which shows its top) changes nothing until the reader actually scrolls.
export const WRITE_STEP = 0.005; // positions closer than this to the stored one are not written again
export const READING_LINE = 0.4; // the point 40% down the window that counts as "where the reader is"

const clamp01 = (x) => (Number.isFinite(x) ? Math.min(1, Math.max(0, x)) : 0);

/** Where in the article the reading line is (0 at its top, 1 at its bottom). */
export const progressAt = (scrollY, articleTop, articleHeight, viewportHeight) =>
  articleHeight > 0 ? clamp01((scrollY + READING_LINE * viewportHeight - articleTop) / articleHeight) : 0;

/** The scroll position that puts the reading line at progress `p`: the inverse of progressAt. */
export const scrollFor = (p, articleTop, articleHeight, viewportHeight) =>
  Math.max(0, Math.round(articleTop + clamp01(p) * articleHeight - READING_LINE * viewportHeight));

/** The stored entry, or null when there is none or it is not a valid { v, kind, id, p, at }. */
export function readReading(storage) {
  try {
    const raw = JSON.parse(storage?.getItem(READING_KEY) ?? 'null');
    const ok = raw && raw.v === 1 && KINDS.includes(raw.kind) && typeof raw.id === 'string' && raw.id
      && typeof raw.p === 'number' && raw.p >= 0 && raw.p <= 1 && typeof raw.at === 'string';
    return ok ? { v: 1, kind: raw.kind, id: raw.id, p: raw.p, at: raw.at } : null;
  } catch {
    return null;
  }
}

export function writeReading(storage, entry) {
  if (!storage) return false;
  try {
    storage.setItem(READING_KEY, JSON.stringify(entry));
    return true;
  } catch {
    return false; // storage full or blocked: nothing to continue later, nothing else breaks
  }
}

export function clearReading(storage) {
  try {
    storage?.removeItem(READING_KEY);
  } catch {
    // Nothing stored or storage blocked.
  }
}

// Where each article was left, one place per article, so that opening an article any ordinary way (the course book,
// a link) goes back to it, as an e-reader reopens a book. Kept beside the single "continue reading" entry above, whose
// contract the homepage relies on, under its own key: { "<kind>:<id>": { p, at } }, the oldest dropped past MAX_PLACES.
export const PLACES_KEY = 'artpilot.places';
export const MAX_PLACES = 200;
export const FINISHED = 0.98; // read to the end: opening it again starts at the top

const placeKey = (kind, id) => `${kind}:${id}`;

/** Every valid stored place, as { "<kind>:<id>": { p, at } }; anything malformed is left out. */
export function readPlaces(storage) {
  try {
    const raw = JSON.parse(storage?.getItem(PLACES_KEY) ?? 'null');
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
    return Object.fromEntries(Object.entries(raw).filter(([k, v]) => KINDS.includes(k.split(':')[0]) && k.indexOf(':') > 0
      && v && typeof v.p === 'number' && v.p >= 0 && v.p <= 1 && typeof v.at === 'string'));
  } catch {
    return {};
  }
}

/** Where this article was left (0–1), or null when it has no place yet. */
export const placeOf = (storage, kind, id) => readPlaces(storage)[placeKey(kind, id)]?.p ?? null;

export function writePlace(storage, kind, id, p, at = new Date().toISOString()) {
  if (!storage) return false;
  const places = { ...readPlaces(storage), [placeKey(kind, id)]: { p: Math.round(clamp01(p) * 1000) / 1000, at } };
  const keep = Object.entries(places).sort((a, b) => (a[1].at < b[1].at ? 1 : -1)).slice(0, MAX_PLACES);
  try {
    storage.setItem(PLACES_KEY, JSON.stringify(Object.fromEntries(keep)));
    return true;
  } catch {
    return false;
  }
}

/**
 * Where opening this article should go, or null for its top: its own place; for an article read before places were
 * kept, the "continue reading" entry when that is this article. Not where it was finished, nor the first lines.
 */
export function startingPlace(storage, kind, id) {
  const entry = readReading(storage);
  const p = placeOf(storage, kind, id) ?? (entry && entry.kind === kind && entry.id === id ? entry.p : null);
  return p !== null && p >= 2 * WRITE_STEP && p < FINISHED ? p : null;
}

/**
 * Follows one article through one page view. The page calls `observe` often (it only updates numbers) and `commit`
 * after scrolling settles and when leaving (it alone writes), so scrolling never means a write per event.
 * `registry`-free on purpose: the title and address are looked up when the entry is shown, so they are never stale.
 */
export function createTracker({ storage, kind, id }) {
  let p = 0, start = null, moved = false;
  return {
    observe(progress) {
      p = clamp01(progress);
      if (start === null) start = p;
      else if (Math.abs(p - start) >= WRITE_STEP) moved = true;
    },
    /** Stores where the reader is, if that is new. Returns 'written' or 'none'. */
    commit(at = new Date().toISOString()) {
      if (start === null) return 'none';
      // The article's own place moves only when the reader has scrolled, so merely opening it never loses it.
      const place = moved ? placeOf(storage, kind, id) : null;
      if (moved && (place === null || Math.abs(place - p) >= WRITE_STEP)) writePlace(storage, kind, id, p, at);
      const stored = readReading(storage);
      const same = stored && stored.kind === kind && stored.id === id;
      if (same && !moved) return 'none'; // reopened and not scrolled yet: keep the place it was left at
      if (same && Math.abs(stored.p - p) < WRITE_STEP) return 'none';
      return writeReading(storage, { v: 1, kind, id, p: Math.round(p * 1000) / 1000, at }) ? 'written' : 'none';
    },
  };
}

/**
 * What the homepage shows for a stored entry: { label, title, href } or null. `registry` is what this build knows:
 * { [kind]: { label, items: { [id]: { title, href } } } }. An id the build does not know (an article removed or not yet
 * published) shows nothing.
 */
export function resolveEntry(entry, registry) {
  if (!entry) return null;
  const group = registry?.[entry.kind];
  const item = group?.items?.[entry.id];
  return item ? { label: group.label, title: item.title, href: item.href, p: entry.p } : null;
}
