// Schematic scale logic: the mountain is drawn at a fixed height and the figure
// shrinks as the "mountain is N times a person" ratio grows.
export const SCALE_MIN = 2;
export const SCALE_MAX = 60;
export const SCALE_DEFAULT = 10;

export function clampRatio(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return SCALE_DEFAULT;
  return Math.min(SCALE_MAX, Math.max(SCALE_MIN, Math.round(n)));
}

export function figureHeight(ratio, mountainHeight) {
  return mountainHeight / clampRatio(ratio);
}
