// The reader's card collection, kept only in this browser (a device record, not an account).
// Every function takes the storage object (usually localStorage) so it can be absent, blocked or faked in tests.
export const COLLECTION_KEY = 'artpilot.collection';

/** Returns { [artworkId]: { at: ISO date } }; anything unreadable counts as an empty collection. */
export function readCollection(storage) {
  try {
    const raw = JSON.parse(storage?.getItem(COLLECTION_KEY) ?? '{}');
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
    return Object.fromEntries(Object.entries(raw).filter(([, v]) => v && typeof v.at === 'string'));
  } catch {
    return {};
  }
}

/** Adds a card once. `added` is false when it was already collected (the original date is kept). */
export function collect(storage, id, now = new Date().toISOString()) {
  const collection = readCollection(storage);
  if (collection[id]) return { added: false, collection };
  collection[id] = { at: now };
  try {
    storage?.setItem(COLLECTION_KEY, JSON.stringify(collection));
  } catch {
    // Storage full or blocked: the card still shows as collected for this visit.
  }
  return { added: true, collection };
}

export function clearCollection(storage) {
  try {
    storage?.removeItem(COLLECTION_KEY);
  } catch {
    // Nothing stored or storage blocked.
  }
}

/** localStorage when the browser allows it, otherwise null (private modes can throw on access). */
export function deviceStorage() {
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
}
