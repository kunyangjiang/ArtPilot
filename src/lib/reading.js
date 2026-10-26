// "Continue reading": the one article this device read most recently, kept only in this browser. A device record, not
// an account; nothing here knows about collected cards (src/lib/collection.js) and the two never share a key.
// Every function takes the storage object (usually localStorage) so it can be absent, blocked or faked in tests.
export const READING_KEY = 'artpilot.reading';
export const KINDS = ['lesson', 'artist-story', 'case'];

// An article counts as read, rather than visited, after 15 s of visible time in one page view and once the reading
// line has been 8% of the way down it. A shorter look never writes, so it cannot replace real progress elsewhere.
export const MIN_DWELL_MS = 15000;
export const MIN_PROGRESS = 0.08;
export const WRITE_STEP = 0.02; // a later position is stored only when it moved at least this far
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

/**
 * Follows one article through one page view. The page calls `observe` often (it only updates numbers) and `commit`
 * rarely (it alone writes), so scrolling never means a write per event.
 * `registry`-free on purpose: the title and address are looked up when the entry is shown, so they are never stale.
 */
export function createTracker({ storage, kind, id, now = () => Date.now() }) {
  let lastT = now(), lastVisible = true, dwell = 0, p = 0, maxP = 0, engaged = false;
  return {
    observe(progress, visible = true, t = now()) {
      if (lastVisible) dwell += Math.max(0, t - lastT);
      lastT = t; lastVisible = visible; p = clamp01(progress); maxP = Math.max(maxP, p);
      if (!engaged && dwell >= MIN_DWELL_MS && maxP >= MIN_PROGRESS) engaged = true;
    },
    /** Writes the position when this page view has been real reading and the position is new. Returns what it did. */
    commit(at = new Date().toISOString()) {
      if (!engaged) return 'none';
      const stored = readReading(storage);
      // Reaching the end is reading too: a finished article stays the most recent one until another is read.
      if (stored && stored.kind === kind && stored.id === id && Math.abs(stored.p - p) < WRITE_STEP) return 'none';
      return writeReading(storage, { v: 1, kind, id, p: Math.round(p * 1000) / 1000, at }) ? 'written' : 'none';
    },
    get engaged() { return engaged; },
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
