/** localStorage when the browser allows it, otherwise null (private modes can throw on access). */
export function deviceStorage() {
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
}
